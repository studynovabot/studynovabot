import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Parse the request body
    const body = await req.json();
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
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`, // Use your Groq API key
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant", // Replace with the correct model if needed
        messages,
      }),
    });

    // Handle external API errors
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error || "Failed to fetch response from Groq API." },
        { status: response.status }
      );
    }

    // Parse and return the successful response
    const data = await response.json();
    return NextResponse.json({ reply: data.choices[0]?.message?.content || "No response from AI." });
  } catch (error) {
    console.error("Error processing the request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}