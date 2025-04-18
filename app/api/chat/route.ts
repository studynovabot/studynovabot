import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { messages } = body;

  if (!messages) {
    return NextResponse.json({ error: 'No messages provided.' }, { status: 400 });
  }

  // Use GROQ API or OpenAI API logic here (pull from .env.local)
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "mixtral-8x7b-32768",
      messages,
    }),
  });

  const data = await response.json();
  return NextResponse.json(data);
}
