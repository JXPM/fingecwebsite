import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configurer le transporteur d'email
// Pour une configuration de production, vous devrez utiliser un service SMTP réel
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER || 'smtp.example.com',
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@example.com',
    pass: process.env.EMAIL_PASSWORD || 'your-password',
  },
});

export async function POST(request: Request) {
  try {
    // Récupérer les données du formulaire
    const data = await request.json();
    const { name, email, phone, company, subject, message } = data;

    // Vérifier que tous les champs requis sont présents
    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }

    // Configurer le contenu de l'email
    const mailOptions = {
      from: `"Site FINGEC" <${process.env.EMAIL_FROM || 'contact@fingec.fr'}>`,
      to: process.env.EMAIL_TO || 'contact@fingec.fr',
      replyTo: email,
      subject: `Nouveau message: ${subject}`,
      text: `
        Nouveau message du site web FINGEC:
        
        Nom: ${name}
        Email: ${email}
        Téléphone: ${phone}
        Entreprise: ${company || 'Non spécifiée'}
        
        Sujet: ${subject}
        
        Message:
        ${message}
      `,
      html: `
        <h2>Nouveau message du site web FINGEC</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Téléphone:</strong> ${phone}</p>
        <p><strong>Entreprise:</strong> ${company || 'Non spécifiée'}</p>
        <p><strong>Sujet:</strong> ${subject}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Envoyer l'email
    await transporter.sendMail(mailOptions);

    // Retourner une réponse de succès
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    
    // Retourner une réponse d'erreur
    return NextResponse.json(
      { error: 'Une erreur s\'est produite lors de l\'envoi de l\'email' },
      { status: 500 }
    );
  }
}