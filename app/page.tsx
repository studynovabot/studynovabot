'use client';

import React, { useEffect, useState } from "react";

export default function Home() {
  const [input, setInput] = useState(""); // State to manage user input
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi there! Ask me anything ✨" },
  ]); // State to manage chat messages

  // Function to handle sending messages
  const handleSend = async () => {
    if (!input.trim()) return; // Prevent sending empty messages

    // Add the user's message to the messages array
    const newMessages = [
      ...messages,
      { role: "user", content: input } // Ensure "role" is "user" for user messages
    ];
    setMessages(newMessages);
    setInput(""); // Clear the input field

    try {
      // Call the backend API to get the AI's response
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }), // Send the messages array
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unknown error occurred");
      }

      // Add the AI's response to the messages array
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "No response from AI." } // Ensure "role" is "assistant" for bot messages
      ]);
    } catch (error) {
      console.error("Error fetching response from backend:", error);

      const errorMessage =
        (error instanceof Error && error.message) || "Unknown error occurred";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Error: ${errorMessage}` },
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
    <div className="p-6 text-center bg-gray-900 text-white min-h-screen">
      <h1 className="text-4xl font-bold text-blue-400">Welcome to StudyNova Bot</h1>

      {/* Chat Container */}
      <div
        id="chat-container"
        className="border rounded p-4 my-4 h-64 overflow-y-auto flex flex-col gap-2 bg-gray-800"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-[70%] ${
              msg.role === "assistant"
                ? "self-start bg-blue-100 text-blue-800"
                : "self-end bg-gray-200 text-gray-800"
            }`}
          >
            <strong>{msg.role === "assistant" ? "Bot" : "You"}:</strong> {msg.content}
          </div>
        ))}
      </div>

      {/* Input and Send Button */}
      <div className="flex items-center">
        <input
          id="user-input"
          className="flex-1 border rounded-l px-4 py-2 focus:outline-none text-gray-900"
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