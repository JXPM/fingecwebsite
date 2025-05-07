import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

// Configuration
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];
const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads', 'cv');

// Transporteur email (configuration directe Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "christian.nkatta@gmail.com",
    pass: "xyfmwacskohdcshk",
  },
});

export async function POST(request: Request) {
  let tempFilePath = '';
  
  try {
    const formData = await request.formData();

    // Extraction des données
    const fields = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      position: formData.get('position') as string,
      experience: formData.get('experience') as string,
      message: formData.get('message') as string,
    };

    // Validation des champs
    const requiredFields = Object.entries(fields)
      .filter(([key]) => key !== 'experience')
      .map(([key, val]) => val ? null : key)
      .filter(Boolean);

    if (requiredFields.length > 0) {
      return NextResponse.json(
        { error: `Champs requis manquants: ${requiredFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Traitement du fichier CV
    const resumeFile = formData.get('resume') as File | null;
    let attachment = null;

    if (resumeFile && resumeFile.size > 0) {
      // Validation du fichier
      if (resumeFile.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: 'Le fichier dépasse la taille maximale de 5MB' },
          { status: 400 }
        );
      }

      if (!ALLOWED_MIME_TYPES.includes(resumeFile.type)) {
        return NextResponse.json(
          { error: 'Type de fichier non autorisé (PDF, DOC, DOCX uniquement)' },
          { status: 400 }
        );
      }

      // Sauvegarde temporaire
      const fileExt = resumeFile.name.split('.').pop();
      const uniqueName = `${uuidv4()}.${fileExt}`;
      tempFilePath = join(UPLOAD_DIR, uniqueName);
      const buffer = Buffer.from(await resumeFile.arrayBuffer());
      
      await writeFile(tempFilePath, buffer);
      attachment = {
        filename: resumeFile.name,
        path: tempFilePath
      };
    }

    // Construction de l'email
const mailOptions = {
  from: '"Recrutement FINGEC" <christian.nkatta@gmail.com>',
  to: "expert@fingec.fr",
  replyTo: fields.email,
  subject: `Candidature: ${fields.position} - ${fields.firstName} ${fields.lastName}`,
  text: generateTextContent(fields, attachment),  // Removed 'this.'
  html: generateHtmlContent(fields, attachment),   // Removed 'this.'
  attachments: attachment ? [attachment] : []
};

    // Envoi de l'email
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors du traitement de votre candidature' },
      { status: 500 }
    );
  } finally {
    // Nettoyage du fichier temporaire
    if (tempFilePath) {
      await unlink(tempFilePath).catch(console.error);
    }
  }
}

// Helpers
function generateTextContent(fields: any, attachment: any): string {
  return `
    NOUVELLE CANDIDATURE - ${fields.position}
    ========================================
    Candidat: ${fields.firstName} ${fields.lastName}
    Email: ${fields.email}
    Téléphone: ${fields.phone}
    
    Expérience: ${fields.experience}
    
    Message:
    ${fields.message}
    
    CV: ${attachment?.filename || 'Non joint'}
  `;
}

function generateHtmlContent(fields: any, attachment: any): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px;">
      <h2 style="color: #1a365d;">Nouvelle candidature - ${fields.position}</h2>
      
      <div style="background: #f7fafc; padding: 16px; border-radius: 8px;">
        <p><strong>Nom:</strong> ${fields.firstName} ${fields.lastName}</p>
        <p><strong>Email:</strong> ${fields.email}</p>
        <p><strong>Téléphone:</strong> ${fields.phone}</p>
      </div>
      
      <h3 style="margin-top: 24px;">Expérience professionnelle</h3>
      <p>${fields.experience}</p>
      
      <h3>Message du candidat</h3>
      <p style="white-space: pre-line;">${fields.message}</p>
      
      <div style="margin-top: 24px; padding: 12px; background: #ebf8ff; border-radius: 4px;">
        <strong>CV:</strong> ${attachment?.filename || 'Aucun fichier joint'}
      </div>
    </div>
  `;
}