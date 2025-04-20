import axios, { AxiosResponse } from "axios";

const GROQ_API_URL = process.env.GROQ_API_URL;
if (!GROQ_API_URL) {
  throw new Error("GROQ_API_URL is not defined in the environment variables.");
}

const GROQ_API_KEY = process.env.GROQ_API_KEY;
if (!GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY is not defined in the environment variables.");
}

interface GroqApiResponse {
  data?: string; // Example field
  status?: string; // Example field
  choices?: Array<{
    message: { role: string; content: string };
  }>;
  [key: string]: any; // Allow additional fields
}

/**
 * Function to handle Groq API requests
 * @param prompt - The user input prompt to send to the Groq API
 * @returns - The response data from the Groq API
 */
export async function groqHandler(prompt: string): Promise<GroqApiResponse> {
  try {
    const response = await axios.post<GroqApiResponse>(
      GROQ_API_URL,
      {
        model: "llama-3.1-8b-instant",
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
      }
    );
    
    // Log the response structure for debugging
    console.log(JSON.stringify(response.data, null, 2));

    return response.data;
  } catch (error) {
    console.error("Error calling GROQ API:", error);
    throw new Error("Failed to fetch response from Groq API.");
  }
}