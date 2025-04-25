import { NextResponse } from "next/server";

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };
type GroqError = { error?: string };
type GroqResponse = { choices: { message: { content: string } }[] };

export async function POST(req: Request) {
  try {
    // Parse the request body
    const body = (await req.json()) as { messages: ChatMessage[] };
    const { messages } = body;

    // Validate the `messages` array
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format. It must be an array." },
        { status: 400 }
      );
    }

    // Validate each message's structure
    const validRoles = ["user", "assistant", "system"];
    for (const message of messages) {
      if (!message.role || !message.content) {
        return NextResponse.json(
          { error: "Each message must have a 'role' and 'content'." },
          { status: 400 }
        );
      }
      if (!validRoles.includes(message.role)) {
        return NextResponse.json(
          { error: `Invalid role: ${message.role}. Valid roles are ${validRoles.join(", ")}.` },
          { status: 400 }
        );
      }
    }

    // Forward the request to the external AI service
    const response = await fetch(process.env.GROQ_API_URL!, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`, // Use your Groq API key
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL!,
        messages,
      }),
    });

    // Handle external API errors
    if (!response.ok) {
      let errorData: { error?: string } = {};
      try {
        const rawErr: unknown = await response.json();
        errorData = rawErr as GroqError;
      } catch {
        const errorText = await response.text();
        errorData = { error: errorText };
      }
      return NextResponse.json(
        { error: errorData.error || "Failed to fetch response from Groq API." },
        { status: response.status }
      );
    }

    // Parse and return the successful response
    const rawData: unknown = await response.json();
    const data: GroqResponse = rawData as GroqResponse;
    return NextResponse.json({ reply: data.choices[0]?.message?.content || "No response from AI." });
  } catch (error) {
    console.error("Error occurred:", error); // Fixed unused variable error
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}