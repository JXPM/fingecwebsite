// src/app/api/newsletter/campaign/route.ts
import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import nodemailer from 'nodemailer';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'fingec_newsletter',
  charset: 'utf8mb4'
};

const emailTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { titre, sujet, contenu, contenu_html, type_campagne = 'newsletter', cible_source } = body;

    // Validation simple (vous pouvez ajouter une authentification admin ici)
    if (!titre || !sujet || !contenu_html) {
      return NextResponse.json({
        success: false,
        message: 'Titre, sujet et contenu HTML requis'
      }, { status: 400 });
    }

    const connection = await mysql.createConnection(dbConfig);

    // Créer la campagne
    const [campaignResult] = await connection.execute(
      'INSERT INTO newsletter_campaigns (titre, contenu, contenu_html, sujet, type_campagne, cible_source, statut) VALUES (?, ?, ?, ?, ?, ?, "programmee")',
      [titre, contenu, contenu_html, sujet, type_campagne, cible_source]
    ) as any;

    const campaignId = campaignResult.insertId;

    // Récupérer les abonnés actifs
    let query = 'SELECT * FROM newsletter_subscribers WHERE statut = "actif"';
    let params: any[] = [];

    if (cible_source) {
      query += ' AND source = ?';
      params.push(cible_source);
    }

    const [subscribers] = await connection.execute(query, params) as any;

    // Envoyer les emails
    let envoyesReussis = 0;
    for (const subscriber of subscribers) {
      try {
        await envoyerEmail(subscriber, sujet, contenu_html, campaignId);
        
        // Enregistrer l'envoi réussi
        await connection.execute(
          'INSERT INTO newsletter_envois (campaign_id, subscriber_id, statut) VALUES (?, ?, "envoye")',
          [campaignId, subscriber.id]
        );
        
        envoyesReussis++;
      } catch (emailError: any) {
        console.error(`Erreur envoi à ${subscriber.email}:`, emailError);
        
        // Enregistrer l'échec
        await connection.execute(
          'INSERT INTO newsletter_envois (campaign_id, subscriber_id, statut, erreur_message) VALUES (?, ?, "echec", ?)',
          [campaignId, subscriber.id, emailError.message]
        );
      }
    }

    // Mettre à jour le statut de la campagne
    await connection.execute(
      'UPDATE newsletter_campaigns SET statut = "envoyee", date_envoi = NOW(), nombre_destinataires = ? WHERE id = ?',
      [envoyesReussis, campaignId]
    );

    await connection.end();

    return NextResponse.json({
      success: true,
      message: `Campagne envoyée à ${envoyesReussis} abonnés`,
      campaignId,
      destinataires: envoyesReussis
    });

  } catch (error) {
    console.error('Erreur campagne:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Erreur lors de l\'envoi' 
    }, { status: 500 });
  }
}

async function envoyerEmail(subscriber: any, sujet: string, contenuHtml: string, campaignId: number) {
  const lienDesabonnement = `${process.env.NEXT_PUBLIC_BASE_URL}/api/newsletter/unsubscribe/${subscriber.token_desabonnement}`;
  
  // Remplacer les variables dans le contenu
  const contenuFinal = contenuHtml
    .replace(/{{prenom}}/g, subscriber.prenom || '')
    .replace(/{{email}}/g, subscriber.email)
    .replace(/{{lien_desabonnement}}/g, lienDesabonnement);

  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: subscriber.email,
    subject: sujet,
    html: contenuFinal,
    headers: {
      'X-Campaign-ID': campaignId.toString()
    }
  };

  return emailTransporter.sendMail(mailOptions);
}