import axios from 'axios';

const GROQ_API_URL = process.env.GROQ_API_URL;
const API_KEY = process.env.GROQ_API_KEY;

/**
 * Function to send a query to Groq AI and retrieve a response.
 * @param {string} userMessage - The user's question or input.
 * @returns {Promise<string>} - The AI's response.
 */
export async function queryGroq(userMessage: string): Promise<string> {
  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        query: userMessage, // Replace "query" with the correct parameter name from Groq's API docs
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Assuming the response contains a field called "reply" with the AI's answer
    return response.data.reply;
  } catch (error) {
    console.error('Error querying Groq AI:', error);
    return 'Sorry, I encountered an error while processing your request.';
  }
}