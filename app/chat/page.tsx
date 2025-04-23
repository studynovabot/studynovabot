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
      console.error("Error sending message:", error); // Fixed unused variable error
      botMessage = { role: "assistant", content: "Sorry, something went wrong." }; // Fallback bot message
      setMessages((prev) => [...prev, botMessage]); // Add fallback message to state
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
      <h1>Chat with StudyNova Bot</h1>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px",
          height: "400px",
          overflowY: "auto",
          marginBottom: "20px",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.role === "user" ? "right" : "left", margin: "5px 0" }}>
            <strong>{msg.role === "user" ? "You" : "Bot"}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          marginBottom: "10px",
        }}
      />
      <button
        onClick={handleSend}
        style={{
          padding: "10px 20px",
          border: "none",
          borderRadius: "4px",
          background: "#007BFF",
          color: "#fff",
        }}
      >
        Send
      </button>
    </div>
  );
}