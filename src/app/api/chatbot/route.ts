import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userMessage = body.message;
    if (!userMessage) {
      return NextResponse.json({ error: 'Message requis' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Clé OpenAI API manquante' }, { status: 500 });
    }

    // Règle de prompts : assistant du cabinet FINGEC, répondre dans la langue du client
    const systemPrompt =
      "Tu es l'assistant virtuel du cabinet FINGEC. Si le message de l'utilisateur est en français, réponds uniquement en français avec précision et courtoisie. Sinon, réponds dans la langue utilisée. Si la question concerne le cabinet ou un service, réponds de façon professionnelle et utile.";

    // Appel à OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
        max_tokens: 512,
        temperature: 0.6
      })
    });
    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json({ error: data.error?.message || 'Erreur OpenAI' }, { status: 500 });
    }
    const botMessage = data.choices?.[0]?.message?.content || 'Je suis désolé, je n’ai pas de réponse.';
    return NextResponse.json({ message: botMessage });
  } catch (err) {
    return NextResponse.json({ error: 'Erreur lors de la génération de la réponse.' }, { status: 500 });
  }
}
