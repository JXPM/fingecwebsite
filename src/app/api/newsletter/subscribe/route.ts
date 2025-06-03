// src/app/api/newsletter/subscribe/route.ts
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
    const { email, nom, prenom, telephone, source = 'website' } = body;

    // Validation
    if (!email || !email.includes('@')) {
      return NextResponse.json({ 
        success: false, 
        message: 'Email invalide' 
      }, { status: 400 });
    }

    const connection = await mysql.createConnection(dbConfig);
    
    // Appel de la procédure stockée
    const [results] = await connection.execute(
      'CALL AjouterAbonne(?, ?, ?, ?, ?)',
      [email, nom || '', prenom || '', telephone || '', source]
    ) as any;

    const subscriberId = results[0][0].subscriber_id;
    const token = results[0][0].token;

    // Envoi email de confirmation
    await envoyerEmailConfirmation(email, prenom, token);

    await connection.end();

    return NextResponse.json({
      success: true,
      message: 'Inscription réussie ! Vérifiez votre email.',
      subscriberId
    });

  } catch (error: any) {
    console.error('Erreur inscription:', error);
    
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({
        success: false,
        message: 'Cet email est déjà inscrit'
      }, { status: 409 });
    }
    
    return NextResponse.json({
      success: false,
      message: 'Erreur lors de l\'inscription'
    }, { status: 500 });
  }
}

async function envoyerEmailConfirmation(email: string, prenom: string, token: string) {
  const lienDesabonnement = `${process.env.NEXT_PUBLIC_BASE_URL}/api/newsletter/unsubscribe/${token}`;
  
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: email,
    subject: 'Confirmation d\'inscription à notre newsletter FINGEC',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Bienvenue ${prenom || ''} !</h2>
        <p>Merci de vous être inscrit à notre newsletter FINGEC. Vous recevrez nos dernières actualités juridiques, comptables et fiscales.</p>
        <p>Si vous souhaitez vous désabonner, <a href="${lienDesabonnement}" style="color: #2563eb;">cliquez ici</a>.</p>
        <hr style="margin: 20px 0;">
        <small style="color: #666;">FINGEC - Cabinet d'expertise comptable</small>
      </div>
    `
  };

  return emailTransporter.sendMail(mailOptions);
}