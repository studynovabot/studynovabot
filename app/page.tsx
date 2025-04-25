'use client';

import React, { useEffect, useState, useRef } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Folder = {
  id: string;
  name: string;
  icon: string;
  chats: Message[][];
};

// --- Typewriter animation and bot reply formatting helpers ---
type Block = { type: 'image'; url: string } | { type: 'text'; content: string };

function parseBotMessage(raw: string): Block[] {
  // Split lines, look for bullet/number patterns, and image URLs
  const lines = raw.split(/\r?\n/).filter(line => line.trim() !== '');
  const blocks: Block[] = [];
  for (const line of lines) {
    // Simple image detection (e.g., if line contains [Image: ...](url) or starts with http...jpg/png)
    const imgMatch = line.match(/!\[.*?\]\((.*?)\)/) || line.match(/(https?:\/\/\S+\.(jpg|jpeg|png|gif))/);
    if (imgMatch) {
      blocks.push({ type: 'image', url: imgMatch[1] || imgMatch[0] });
      continue;
    }
    // Emoji-rich bullets/numbers
    if (/^\d+[.)]/.test(line)) {
      // Numbered list
      blocks.push({ type: 'text', content: `🔢 ${line.replace(/^\d+[.)]\s*/, '')}` });
    } else if (/^[-*•]/.test(line)) {
      // Bullet list
      blocks.push({ type: 'text', content: `👉 ${line.replace(/^[-*•]\s*/, '')}` });
    } else {
      // Add some default emoji for general lines
      blocks.push({ type: 'text', content: `🤖 ${line}` });
    }
  }
  return blocks;
}

function BotMessageRenderer({ message, animate }: { message: string, animate?: boolean }) {
  const [displayed, setDisplayed] = React.useState<Array<string | { type: 'image'; url: string }>>([]);
  const blocks = React.useMemo<Block[]>(() => parseBotMessage(message), [message]);
  React.useEffect(() => {
    if (!animate) {
      const allBlocks: Array<string | { type: 'image'; url: string }> = [];
      for (const b of blocks) {
        if (b.type === 'text') {
          allBlocks.push(b.content);
        } else {
          allBlocks.push({ type: 'image', url: b.url });
        }
      }
      setDisplayed(allBlocks);
      return;
    }
    setDisplayed([]);
    let i = 0;
    function showNext() {
      if (i >= blocks.length) return;
      const b = blocks[i];
      if (b.type === 'text') {
        setDisplayed(prev => [...prev, b.content]);
      } else {
        setDisplayed(prev => [...prev, { type: 'image', url: b.url }]);
      }
      i++;
      setTimeout(showNext, 400);
    }
    showNext();
  }, [message, animate]);

  return (
    <div>
      {displayed.map((block, idx) =>
        typeof block === 'string' ? (
          <div key={idx} style={{whiteSpace: 'pre-line', marginBottom: 4}}>{block}</div>
        ) : (
          <div key={idx} style={{margin: '10px 0'}}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={block.url} alt="Generated visual" style={{maxWidth: '100%', borderRadius: 8}} />
          </div>
        )
      )}
    </div>
  );
}

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFolder, setActiveFolder] = useState<string>("all");
  const [folders, setFolders] = useState<Folder[]>([
    { id: "all", name: "All chats", icon: "📁", chats: [] },
    { id: "study", name: "Study", icon: "📚", chats: [] },
    { id: "code", name: "Code", icon: "💻", chats: [] },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSuggestionClick = (prompt: string) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  const handleFolderClick = (folderId: string) => {
    setActiveFolder(folderId);
    const folder = folders.find(f => f.id === folderId);
    if (folder && folder.chats.length > 0) {
      setMessages(folder.chats[folder.chats.length - 1]);
      setShowWelcome(false);
    } else {
      setMessages([]);
      setShowWelcome(true);
    }
  };

  const handleSend = async (e: React.FormEvent | undefined = undefined) => {
    if (e) {
      e.preventDefault();
    }
    if (!input.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user" as const, content: input },
    ];
    setMessages(newMessages);
    setInput("");
    setShowWelcome(false);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = typeof data.error === "string" ? data.error : JSON.stringify(data.error);
        throw new Error(errorMsg || "Unknown error occurred");
      }

      // --- Image generation logic ---
      let reply = data.reply || "No response from AI.";
      // If reply looks like an image prompt or contains a special marker, call /api/genImage
      if (/image|draw|picture|visual|photo|generate|create.*image/i.test(input) || /\[image\]/i.test(reply)) {
        const imgRes = await fetch('/api/genImage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ input }),
        });
        const imgData = await imgRes.json();
        if (imgData && imgData.image) {
          reply += `\n![Generated Image](${imgData.image})`;
        }
      }
      const newAssistantMessage = { role: "assistant" as const, content: reply };
      const updatedMessages = [...messages, newAssistantMessage];
      setMessages(updatedMessages);
      
      // Update the current folder's chats
      setFolders(prevFolders => {
        return prevFolders.map(folder => {
          if (folder.id === activeFolder) {
            return {
              ...folder,
              chats: [...folder.chats, updatedMessages]
            };
          }
          if (folder.id === 'all' && activeFolder !== 'all') {
            return {
              ...folder,
              chats: [...folder.chats, updatedMessages]
            };
          }
          return folder;
        });
      });
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error occurred:", error);

      const errorMessage =
        (error instanceof Error && error.message) || "Unknown error occurred";

      setMessages((prev) => [
        ...prev,
        { role: "assistant" as const, content: `Error: ${errorMessage}` },
      ]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current && messages.length > 0) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Study Nova</h2>
        </div>
        <div className="folder-list">
          {folders.map((folder) => (
            <div
              key={folder.id}
              className={`folder ${activeFolder === folder.id ? 'active' : ''}`}
              onClick={() => handleFolderClick(folder.id)}
            >
              <span className="folder-icon">{folder.icon}</span>
              <span className="folder-name">{folder.name}</span>
              {folder.chats.length > 0 && (
                <span className="chat-count">{folder.chats.length}</span>
              )}
            </div>
          ))}
        </div>
      </aside>
      
      <div className="main-content">
        <header className="chat-header">
          <h1 className="site-title">Study Nova Bot</h1>
        </header>
        
        <main className="main-container">
            <div className={`chat-interface${showWelcome ? ' welcome-mode' : ''}`}>
              <div className="messages-container">
                {showWelcome ? (
                  <div className="welcome-container">
                    <h1>What can I help with?</h1>
                  </div>
                ) : null}
                {messages.map((message, index) => (
  <div
    key={index}
    className={`message ${message.role === 'user' ? 'user-message' : 'bot-message'}`}
  >
    <div className="message-content">
      {message.role === 'assistant' ? (
        <BotMessageRenderer message={message.content} animate={index === messages.length - 1 && isLoading} />
      ) : (
        message.content
      )}
    </div>
  </div>
))}
                <div ref={messagesEndRef} />
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="input-container"
              >
                <div className="input-wrapper">
                  <input
                    type="text"
                    placeholder="Send a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    className="chat-input"
                    disabled={isLoading}
                    ref={inputRef}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="send-button"
                  >
                    {isLoading ? '...' : '→'}
                  </button>
                </div>
              </form>
            </div>
            <div className="suggestions">
                <button 
                  className="suggestion-btn"
                  onClick={() => handleSuggestionClick("Create an image of a beautiful sunset over mountains")}>
                  <span className="icon">🎨</span> Create image
                </button>
                <button 
                  className="suggestion-btn"
                  onClick={() => handleSuggestionClick("Help me brainstorm ideas for a science fiction story")}
                >
                  <span className="icon">💡</span> Brainstorm
                </button>
                <button 
                  className="suggestion-btn"
                  onClick={() => handleSuggestionClick("Help me write a professional email to schedule a meeting")}
                >
                  <span className="icon">✍️</span> Help me write
                </button>
                <button 
                  className="suggestion-btn"
                  onClick={() => handleSuggestionClick("Summarize this text: [paste your text here]")}
                >
                  <span className="icon">📝</span> Summarize text
                </button>
              </div>
           </main>
        </div>
      </div>
  );
}