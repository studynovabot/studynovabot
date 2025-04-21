import { useState } from "react";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Message } from "@/components/type";  // Ensure @components alias is set in tsconfig.json

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage: Message = { role: "user", content: userInput };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await res.json();
      if (data?.reply) {
        const assistantMessage: Message = { role: "assistant", content: data.reply };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded-2xl shadow-md">
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-xl whitespace-pre-wrap ${
              msg.role === "user" ? "bg-blue-100 text-right" : "bg-gray-100 text-left"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {isLoading && <div className="text-gray-400">Typing...</div>}
      </div>
      <div className="flex gap-2 mt-4">
        <input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Ask me anything..."
          className="flex-1 border px-3 py-2 rounded"
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading || !userInput.trim()}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-1"
        >
          <PaperPlaneIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}