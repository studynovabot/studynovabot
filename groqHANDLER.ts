import axios from "axios";

// Validate and assert GROQ_API_URL as a string
const GROQ_API_URL = process.env.GROQ_API_URL as string;
if (!GROQ_API_URL) {
  throw new Error("GROQ_API_URL is not defined in the environment variables.");
}

// Validate and assert GROQ_API_KEY as a string
const GROQ_API_KEY = process.env.GROQ_API_KEY as string;
if (!GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY is not defined in the environment variables.");
}

/**
 * Function to handle Groq API requests
 * @param prompt - The user input prompt to send to the Groq API
 * @returns - The response data from the Groq API
 */
export async function groqHandler(prompt: string): Promise<any> {
  try {
    const response = await axios.post(
      GROQ_API_URL, // GROQ_API_URL is now guaranteed to be a string
      {
        model: "mixtral-8x7b-32768", // Or another Groq-supported model
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error calling GROQ API:", error);
    throw new Error("Failed to fetch response from Groq API.");
  }
}
