import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const GROQ_API_URL = process.env.GROQ_API_URL; // Set this in your .env file
const GROQ_API_KEY = process.env.GROQ_API_KEY; // Set this in your .env file

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const { message } = req.body;

  try {
    // Send the message to Groq's API
    const response = await axios.post(
      GROQ_API_URL,
      {
        query: message, // Adjust as per Groq's API documentation
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Return the AI's response
    res.status(200).json({ reply: response.data.reply });
  } catch (error) {
    console.error("Error communicating with Groq API:", error);
    res.status(500).json({ error: "Failed to fetch response from AI." });
  }
}