// fingec-website/src/app/api/newsletter/push-subscribe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: 'utf8mb4'
};

export async function POST(request: NextRequest) {
  try {
    const { subscriberId, subscription } = await request.json();

    if (!subscriberId || !subscription) {
      return NextResponse.json({
        success: false,
        message: 'Subscriber ID and subscription are required'
      }, { status: 400 });
    }

    const connection = await mysql.createConnection(dbConfig);
    
    await connection.execute(
      'INSERT INTO newsletter_push_subscriptions (subscriber_id, endpoint, keys_p256dh, keys_auth) VALUES (?, ?, ?, ?)',
      [
        subscriberId,
        subscription.endpoint,
        subscription.keys.p256dh,
        subscription.keys.auth
      ]
    );

    await connection.end();

    return NextResponse.json({
      success: true,
      message: 'Push subscription saved'
    });

  } catch (error: any) {
    console.error('Error saving push subscription:', error);
    
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({
        success: false,
        message: 'This device is already subscribed'
      }, { status: 409 });
    }
    
    return NextResponse.json({
      success: false,
      message: 'Error saving push subscription'
    }, { status: 500 });
  }
}