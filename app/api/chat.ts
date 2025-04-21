import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" });
  }

  try {
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt },
        ],
        stream: true,
      }),
    });

    if (!groqRes.ok || !groqRes.body) {
      return res.status(500).json({ message: "Failed to connect to Groq API" });
    }

    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });

    const reader = groqRes.body.getReader();
    let done = false;

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;

      if (value) {
        const chunk = new TextDecoder().decode(value, { stream: true });
        const lines = chunk.split("\n").filter((line) => line.trim().startsWith("data:"));

        for (const line of lines) {
          const json = line.replace(/^data:\s*/, "");
          if (json === "[DONE]") {
            res.write("data: [DONE]\n\n");
            res.end();
            return;
          }

          try {
            const data = JSON.parse(json);
            const token = data.choices?.[0]?.delta?.content;
            if (token) {
              res.write(`data: ${JSON.stringify(token)}\n\n`);
            }
          } catch (err) {
            console.error("Error parsing JSON:", err);
          }
        }
      }
    }
  } catch (error) {
    console.error("Error communicating with Groq API:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}