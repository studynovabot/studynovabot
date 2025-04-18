
"use client";

import { useState, useRef } from "react";

export default function ChatBox() {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const aiMessageRef = useRef("");

  const handleSend = async () => {
    if (!userInput.trim()) return;
    const userMessage = { role: "user", content: userInput };

    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setIsLoading(true);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [...messages, userMessage] })
    });

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || "No response";
    aiMessageRef.current = text;

    setMessages((prev) =>
      [...prev, { role: "assistant", content: aiMessageRef.current }]
    );
    setIsLoading(false);
  };

  return (
    <div className="bg-white p-4 rounded shadow max-w-2xl mx-auto">
      <div className="mb-4 space-y-2 max-h-96 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={`p-2 rounded ${msg.role === "user" ? "bg-blue-100" : "bg-gray-100"}`}>
            <strong>{msg.role}:</strong> {msg.content}
          </div>
        ))}
        {isLoading && <div className="italic text-gray-500">Bot is typing...</div>}
      </div>
      <div className="flex space-x-2">
        <input
          className="flex-1 border p-2 rounded"
          placeholder="Ask me anything..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button onClick={handleSend} className="bg-blue-600 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
}
