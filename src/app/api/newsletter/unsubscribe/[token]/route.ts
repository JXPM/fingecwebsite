// src/app/api/newsletter/unsubscribe/[token]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'fingec_newsletter',
  charset: 'utf8mb4'
};

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  const token = params.token;

  try {
    const connection = await mysql.createConnection(dbConfig);
    
    const [result] = await connection.execute(
      'UPDATE newsletter_subscribers SET statut = "inactif" WHERE token_desabonnement = ?',
      [token]
    ) as any;

    await connection.end();

    if (result.affectedRows > 0) {
      // Rediriger vers une page de confirmation
      return NextResponse.redirect(new URL('/newsletter/unsubscribed', request.url));
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'Token invalide' 
      }, { status: 404 });
    }

  } catch (error) {
    console.error('Erreur désabonnement:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Erreur serveur' 
    }, { status: 500 });
  }
}