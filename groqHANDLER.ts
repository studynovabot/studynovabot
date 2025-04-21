import axios from "axios";

const GROQ_API_URL = process.env.GROQ_API_URL || "";
if (!GROQ_API_URL) {
  throw new Error("GROQ_API_URL is not defined in the environment variables.");
}

const GROQ_API_KEY = process.env.GROQ_API_KEY || "";
if (!GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY is not defined in the environment variables.");
}

interface GroqApiResponse {
  data?: string;
  choices?: Array<{
    message: { role: string; content: string };
  }>;
}

export async function groqHandler(prompt: string): Promise<GroqApiResponse> {
  try {
    const response = await axios.post<GroqApiResponse>(GROQ_API_URL, {
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
    }, {
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error communicating with Groq API:", error);
    throw new Error("Failed to fetch response from Groq API.");
  }
}