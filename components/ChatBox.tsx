import { useState } from "react";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Message } from "@/components/type";

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle sending the message
  const handleSendMessage = async () => {
    if (!userInput.trim()) return; // Prevent sending empty messages

    const userMessage: Message = { role: "user", content: userInput };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput(""); // Clear the input field
    setIsLoading(true);

    try {
      console.log("Sending message:", userMessage); // Debug log for the message being sent

      // Fetch API call to the backend
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      console.log("API response status:", res.status); // Debug log for response status

      const data = await res.json();
      console.log("API response data:", data); // Debug log for response data

      // Process the response and update messages
      if (data?.reply) {
        const assistantMessage: Message = {
          role: "assistant",
          content: data.reply,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        console.error("No reply from AI:", data); // Log if no reply is returned
      }
    } catch (error) {
      console.error("Error sending message:", error); // Log errors during the API call
    } finally {
      setIsLoading(false); // Reset the loading state
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded-2xl shadow-md">
      {/* Chat Messages */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-xl whitespace-pre-wrap ${
              msg.role === "user"
                ? "bg-blue-100 text-right"
                : "bg-gray-100 text-left"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {isLoading && <div className="text-gray-400">Typing...</div>}
      </div>

      {/* Input and Send Button */}
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
