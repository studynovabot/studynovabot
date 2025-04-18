import { useState } from "react";

type Message = {
  role: string;
  content: string;
};

export default function ChatBox() {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = () => {
    const userMessage: Message = { role: "user", content: userInput };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setIsLoading(false);
  };

  return (
    <div>
      {messages.map((msg, i) => (
        <div key={i}>
          <b>{msg.role}:</b> {msg.content}
        </div>
      ))}
      <input
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type message"
      />
      <button onClick={handleSend} disabled={isLoading}>
        Send
      </button>
    </div>
  );
}
