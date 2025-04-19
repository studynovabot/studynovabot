'use client';

import React, { useEffect, useState } from "react";
import { app } from "../firebase/firebase";

export default function Home() {
  const [input, setInput] = useState(""); // State to manage user input
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hi there! Ask me anything ✨" },
  ]); // State to manage chat messages

  // Function to handle sending messages
  const handleSend = async () => {
    if (!input.trim()) return; // Prevent sending empty messages
  
    // Add the user's message to the chat
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput(""); // Clear the input field
  
    try {
      // Call Groq API to get the AI's response
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
  
      // Add the AI's response to the chat
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: data.reply || "No response from AI." },
      ]);
    } catch (error) {
      console.error("Error fetching response from Groq:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Error: Unable to fetch a response." },
      ]);
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the chat when messages change
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-4xl font-bold">Welcome to StudyNova Bot</h1>

      {/* Chat Container */}
      <div
        id="chat-container"
        className="border rounded p-4 my-4 h-64 overflow-y-auto"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 ${
              msg.role === "bot" ? "text-left text-blue-600" : "text-right text-gray-800"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      {/* Input and Send Button */}
      <div className="flex items-center">
        <input
          className="flex-1 border rounded-l px-4 py-2 focus:outline-none"
          type="text"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}