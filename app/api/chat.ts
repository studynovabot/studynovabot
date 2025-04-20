import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { prompt } = req.body;

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ message: "Invalid prompt provided. A valid string is required." });
  }

  const decoder = new TextDecoder();

  try {
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768", // Or another Groq-supported model
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt },
        ],
        stream: false, // Set to false if streaming is not required
      }),
    });

    if (!groqRes.ok) {
      console.error("Groq API Error:", groqRes.statusText);
      return res.status(500).json({ message: "Failed to connect to Groq API" });
    }

    const responseData = await groqRes.json();

    // Extract the AI's response from the API response
    const reply = responseData.choices?.[0]?.message?.content || "No response from AI.";
    res.status(200).json({ reply });
  } catch (error) {
    console.error("Error communicating with Groq API:", error);
    res.status(500).json({ message: "Internal Server Error. Please try again later." });
  }
}