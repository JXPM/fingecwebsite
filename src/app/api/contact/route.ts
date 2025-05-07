import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configuration directe pour Gmail (plus fiable que les variables d'environnement dans ce cas)
const transporter = nodemailer.createTransport({
  service: 'gmail', // Utilise le service prédéfini Gmail
  auth: {
    user: "christian.nkatta@gmail.com",
    pass: "xyfmwacskohdcshk",
  },
});

export async function POST(request: Request) {
  try {
    // Récupérer les données du formulaire
    const data = await request.json();
    const { name, email, phone, company, subject, message } = data;

    // Validation des champs
    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }

    // Configuration de l'email
    const mailOptions = {
      from: '"Site FINGEC" <christian.nkatta@gmail.com>', // Doit correspondre à l'email auth
      to: "expert@fingec.fr", // Email de destination fixe
      replyTo: email,
      subject: `Nouveau message: ${subject}`,
      text: `Message de ${name} (${email}, ${phone}):
${message}`,
      html: `
        <h2>Nouveau message du site FINGEC</h2>
        <p><strong>De:</strong> ${name} (${email})</p>
        <p><strong>Téléphone:</strong> ${phone}</p>
        ${company ? `<p><strong>Entreprise:</strong> ${company}</p>` : ''}
        <p><strong>Sujet:</strong> ${subject}</p>
        <div>${message.replace(/\n/g, '<br>')}</div>
      `,
    };

    // Envoi de l'email
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Erreur SMTP:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi. Veuillez réessayer ou nous contacter par téléphone.' },
      { status: 500 }
    );
  }
}