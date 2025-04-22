"use client";

import React, { useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();

      setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    }

    setInput("");
  };

  return (
    <div style={{ backgroundColor: "#0d0d0d", color: "white", minHeight: "100vh", padding: "20px" }}>
      <div style={{ maxWidth: "600px", margin: "auto", backgroundColor: "#1a1a2e", padding: "20px", borderRadius: "10px" }}>
        <h1 style={{ textAlign: "center", color: "#e94560" }}>Welcome to StudyNova Bot</h1>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            minHeight: "300px",
            marginBottom: "10px",
            overflowY: "scroll",
            backgroundColor: "#16213e",
            color: "white",
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                textAlign: msg.role === "user" ? "right" : "left",
                margin: "10px 0",
              }}
            >
              <strong>{msg.role === "user" ? "You" : "Bot"}:</strong> {msg.content}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            id="user-input"
            name="userMessage"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            style={{ flex: 1, padding: "10px", backgroundColor: "#0f3460", color: "white", border: "1px solid #ccc" }}
          />
          <button onClick={sendMessage} style={{ padding: "10px 20px", backgroundColor: "#e94560", color: "white", border: "none" }}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}