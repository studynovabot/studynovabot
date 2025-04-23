"use client";

import React, { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [input, setInput] = useState<string>(""); // State for user input
  const [messages, setMessages] = useState<Message[]>([]); // State for chat messages

  const handleSend = async () => {
    if (!input.trim()) return; // Prevent sending empty messages

    const userMessage: Message = { role: "user", content: input }; // User message object
    setMessages((prev) => [...prev, userMessage]); // Add user message to state
    setInput(""); // Clear input field

    let botMessage: Message; // Declare botMessage to use in both try and catch blocks

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();
      botMessage = { role: "assistant", content: data.message }; // Create bot message
      setMessages((prev) => [...prev, botMessage]); // Add bot message to state
    } catch (error) {
      console.error("Error sending message:", error);
      botMessage = { role: "assistant", content: "Sorry, something went wrong." }; // Fallback bot message
      setMessages((prev) => [...prev, botMessage]); // Add fallback message to state
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <h1 style={{ 
        fontSize: '2rem', 
        fontWeight: 600, 
        marginBottom: '2rem',
        textAlign: 'center',
        color: 'var(--text-primary)'
      }}>
        💬 StudyNova Bot
      </h1>
      <div className="messages-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.role === 'user' ? 'user-message' : 'bot-message'}`}
          >
            <div className="message-content">
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="chat-input"
        />
        <button
          onClick={handleSend}
          className="send-button"
        >
          Send
        </button>
      </div>
    </div>
  );
}