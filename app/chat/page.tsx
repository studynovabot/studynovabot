"use client";

import React, { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return; // Prevent sending empty messages

    setIsLoading(true);
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
      setIsLoading(false);
    } catch (error) {
      console.error("Error sending message:", error);
      botMessage = { role: "assistant", content: "Sorry, something went wrong." }; // Fallback bot message
      setMessages((prev) => [...prev, botMessage]); // Add fallback message to state
      setIsLoading(false);
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
      <header className="chat-header">
        <h1 className="site-title">Study Nova Bot</h1>
      </header>
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
        <div ref={messagesEndRef} />
      </div>
      {messages.length === 0 ? (
        <div className="welcome-container">
          <h1>What can I help with?</h1>
          <div className="search-box">
            <input
              type="text"
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="chat-input"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="send-button"
            >
              {isLoading ? '...' : '→'}
            </button>
          </div>
        </div>
      ) : (
        <div className="input-container">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Send a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="chat-input"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="send-button"
            >
              {isLoading ? '...' : '→'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}