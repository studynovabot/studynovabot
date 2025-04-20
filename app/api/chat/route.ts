import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { messages } = body;

  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json({ error: 'Invalid messages format. It must be an array.' }, { status: 400 });
  }

  try {
    // Use GROQ API or OpenAI API logic here (pull from .env)
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768", // Replace with appropriate Groq model
        messages,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.error || "Failed to fetch response from Groq API." }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error communicating with Groq API:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}