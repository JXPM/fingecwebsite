import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

// Configurer les limites pour les uploads
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_FILE_TYPES = ['.pdf', '.doc', '.docx'];

// Configurer le transporteur d'email
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
    // On utilise FormData pour récupérer à la fois les champs textuels et les fichiers
    const formData = await request.formData();

    // Extraction des champs du formulaire
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const position = formData.get('position') as string;
    const experience = formData.get('experience') as string;
    const message = formData.get('message') as string;

    // Récupération du fichier CV
    const resumeFile = formData.get('resume') as File | null;

    // Vérifier que tous les champs requis sont présents
    if (!firstName || !lastName || !email || !phone || !position || !experience || !message) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }

    // Informations sur le fichier de CV pour l'email
    let fileInfo = 'Aucun CV n\'a été joint à cette candidature.';
    let filePath = '';

    // Traiter le fichier CV s'il existe
    if (resumeFile) {
      try {
        // Vérifier la taille du fichier
        if (resumeFile.size > MAX_FILE_SIZE) {
          return NextResponse.json(
            { error: 'Le fichier est trop volumineux. La taille maximale autorisée est de 5 MB.' },
            { status: 400 }
          );
        }

        // Extraire l'extension du fichier
        const fileName = resumeFile.name;
        const fileExtension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();

        // Vérifier le type de fichier
        if (!ALLOWED_FILE_TYPES.includes(fileExtension)) {
          return NextResponse.json(
            { error: 'Type de fichier non autorisé. Les formats acceptés sont PDF, DOC et DOCX.' },
            { status: 400 }
          );
        }

        // Créer un nom de fichier unique
        const uniqueFileName = `${uuidv4()}${fileExtension}`;
        filePath = join(process.cwd(), 'public', 'uploads', 'cv', uniqueFileName);

        // Lire le contenu du fichier
        const buffer = Buffer.from(await resumeFile.arrayBuffer());

        // Écrire le fichier sur le serveur
        await writeFile(filePath, buffer);

        // URL publique du fichier
        const publicPath = `/uploads/cv/${uniqueFileName}`;

        fileInfo = `Le candidat a joint un CV: ${fileName} (sauvegardé comme ${uniqueFileName})`;
      } catch (error) {
        console.error('Erreur lors de la sauvegarde du CV:', error);
        fileInfo = `Le candidat a joint un CV (${resumeFile.name}), mais il n'a pas pu être sauvegardé.`;
      }
    }

    // Configurer le contenu de l'email
    const mailOptions = {
      from: `"Recrutement FINGEC" <${process.env.EMAIL_FROM || 'contact@fingec.fr'}>`,
      // On utilisera une adresse email spécifique au recrutement
      to: process.env.RECRUITMENT_EMAIL || process.env.EMAIL_TO || 'recrutement@fingec.fr',
      replyTo: email,
      subject: `Nouvelle candidature: ${position}`,
      text: `
        Nouvelle candidature reçue du site web FINGEC:

        Nom complet: ${firstName} ${lastName}
        Email: ${email}
        Téléphone: ${phone}

        Poste recherché: ${position}
        Expérience: ${experience}

        Lettre de motivation:
        ${message}

        ${fileInfo}
      `,
      html: `
        <h2>Nouvelle candidature reçue du site web FINGEC</h2>
        <p><strong>Nom complet:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Téléphone:</strong> ${phone}</p>
        <p><strong>Poste recherché:</strong> ${position}</p>
        <p><strong>Expérience:</strong> ${experience}</p>
        <h3>Lettre de motivation:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <p><em>${fileInfo}</em></p>
      `,
      attachments: resumeFile ? [
        {
          filename: resumeFile.name,
          path: filePath
        }
      ] : []
    };

    // Envoyer l'email
    await transporter.sendMail(mailOptions);

    // Retourner une réponse de succès
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la candidature:', error);

    // Retourner une réponse d'erreur
    return NextResponse.json(
      { error: 'Une erreur s\'est produite lors de l\'envoi de la candidature' },
      { status: 500 }
    );
  }
}
