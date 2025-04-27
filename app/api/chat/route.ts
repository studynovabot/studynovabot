import { NextRequest, NextResponse } from "next/server";

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };
type GroqResponse = { choices: { message: { content: string } }[] };

export async function POST(req: NextRequest) {
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
    let externalRes: Response;
    try {
      externalRes = await fetch(process.env.GROQ_API_URL!, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model: process.env.GROQ_MODEL!, messages }),
      });
    } catch (fetchError) {
      console.error("Error fetching Groq API:", fetchError);
      return NextResponse.json(
        { error: "Failed to connect to AI service." },
        { status: 502 }
      );
    }

    // Handle external API errors
    if (!externalRes.ok) {
      let errorMsg = 'Failed to fetch response from AI service.';
      const errorText = await externalRes.text();
      try {
        const parsed = JSON.parse(errorText);
        if (parsed.error) {
          if (typeof parsed.error === 'string') {
            errorMsg = parsed.error;
          } else if (typeof parsed.error === 'object') {
            errorMsg = (parsed.error.message as string) || JSON.stringify(parsed.error);
          }
        } else if ((parsed as any).message) {
          errorMsg = (parsed as any).message;
        } else {
          errorMsg = JSON.stringify(parsed);
        }
      } catch {
        errorMsg = errorText;
      }
      return NextResponse.json(
        { error: errorMsg },
        { status: externalRes.status }
      );
    }

    // Parse and return the successful response
    const data: GroqResponse = (await externalRes.json()) as GroqResponse;
    return NextResponse.json({ reply: data.choices[0]?.message?.content || "No response from AI." });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}