"use client";
import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Analytics } from '@vercel/analytics/react';

// Types (reuse from your original page.tsx)
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

type Block = { type: 'image'; url: string } | { type: 'text'; content: string };

function parseBotMessage(raw: string): Block[] {
  try {
    if (typeof raw !== 'string') return [{ type: 'text', content: 'Invalid message format' }];
    
    const lines = raw.split(/\r?\n/).filter(line => line.trim() !== '');
    const blocks: Block[] = [];
    
    for (const line of lines) {
      try {
        // Handle images
        const imgMatch = line.match(/!\[.*?]\((.*?)\)/) || line.match(/(https?:\/\/\S+\.(jpg|jpeg|png|gif))/);
        if (imgMatch) {
          blocks.push({ type: 'image', url: imgMatch[1] || imgMatch[0] });
          continue;
        }
        
        // Handle text content - preserve original formatting
        blocks.push({ 
          type: 'text', 
          content: line 
        });
      } catch (e) {
        console.error('Error parsing line:', e);
      }
    }
    return blocks;
  } catch (e) {
    console.error('Error parsing message:', e);
    return [{ type: 'text', content: raw }];
  }
}

function BotMessageRenderer({ message, animate }: { message: string, animate?: boolean }) {
  const [displayed, setDisplayed] = React.useState<Array<string | { type: 'image'; url: string }>>([]);
  const blocks = React.useMemo<Block[]>(() => parseBotMessage(message), [message]);

  useEffect(() => {
    if (!animate) {
      const allBlocks: Array<string | { type: 'image'; url: string }> = blocks.map(b => b.type === 'text' ? b.content : { type: 'image', url: b.url });
      setDisplayed(allBlocks);
      return;
    }
    setDisplayed([]);
    let i = 0;
    function showNext() {
      if (i >= blocks.length) return;
      const b = blocks[i];
      setDisplayed(prev => [...prev, b.type === 'text' ? b.content : { type: 'image', url: b.url }]);
      i++;
      setTimeout(showNext, 400);
    }
    showNext();
  }, [blocks, animate]);

  return (
    <div>
      {displayed.map((block, idx) => {
        if (typeof block === 'string') {
          return <div key={idx} style={{ whiteSpace: 'pre-line', marginBottom: 4 }}>{block}</div>;
        } else if (typeof block.url === 'string') {
          return (
            <div key={idx} className="my-4 flex justify-center">
              <img
                src={block.url}
                alt="Generated visual"
                className="max-w-sm w-full object-contain rounded-lg"
              />
            </div>
          );
        } else {
          // If not a valid image URL, render as text for debugging
          return <div key={idx} style={{ color: 'red', marginBottom: 4 }}>[Image generation failed or invalid image]</div>;
        }
      })}
    </div>
  );
}

export default function ChatUI({ user }: { user: any }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFolder, setActiveFolder] = useState<string>("all");
  const [folders, setFolders] = useState<Folder[]>([
    { id: "all", name: "All chats", icon: "📁", chats: [] },
    { id: "study", name: "Study", icon: "📚", chats: [] },
    { id: "code", name: "Code", icon: "💻", chats: [] },
    { id: "image", name: "Generate Image", icon: "🖼️", chats: [] },
  ]);
  const [lastImagePrompt, setLastImagePrompt] = useState<string | null>(null);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [lastImageData, setLastImageData] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Sidebar keyboard close
  useEffect(() => {
    if (!sidebarOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSidebarOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [sidebarOpen]);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
  }, [sidebarOpen]);

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

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const filteredMessages = [...messages];
    const newMessages: Message[] = [...filteredMessages, { role: 'user', content: input }];
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput("");
    setShowWelcome(false);
    setIsLoading(true);

    const isImagePrompt = !isProcessingImage && /(?:\bcreate\b|\brecreate\b|\bmake\b|\bgenerate\b|\bdraw\b|\bimage\b)/i.test(input);
    const isUpgradePrompt = /(?:edit|change|fix|adjust|modify|improve|upgrade|should|more\s+cute|cute)/i.test(input);
    const updatedMessages = [...newMessages];

    if (isUpgradePrompt && lastImagePrompt) {
      setIsProcessingImage(true);
      const prompt = `${lastImagePrompt}, ${input}`;
      try {
        const imgRes = await fetch('/api/genImage', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ input: prompt }) });
        const imgData = await imgRes.json();
        if (imgData.image) {
          const imageUrl = `data:image/png;base64,${imgData.image}`;
          setLastImagePrompt(prompt);
          setLastImageData(imageUrl);
          // Add the image to the messages as markdown
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: `![Generated image](${imageUrl})\n\nI've updated the image based on your request.` 
          }]);
        } else if (imgData.error) {
          setMessages(prev => [...prev, { role: 'assistant', content: `[Image generation failed: ${imgData.error}]` }]);
        } else {
          setMessages(prev => [...prev, { role: 'assistant', content: `[Image generation failed]` }]);
        }
      } catch (err) {
        const msgErr = err instanceof Error ? err.message : JSON.stringify(err);
        setMessages(prev => [...prev, { role: 'assistant', content: `[Image generation failed: ${msgErr}]` }]);
      }
      setIsProcessingImage(false);
      setIsLoading(false);
      return;
    }

    if (isImagePrompt) {
      setIsProcessingImage(true);
      try {
        const imgRes = await fetch('/api/genImage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ input }),
        });
        const imgData = await imgRes.json();
        if (imgData?.image) {
          const imageUrl = `data:image/png;base64,${imgData.image}`;
          setLastImagePrompt(input);
          setLastImageData(imageUrl);
          // Add the image to the messages as markdown
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: `![Generated image](${imageUrl})\n\nHere's the image you requested.` 
          }]);
        } else if (imgData?.error) {
          setMessages(prev => [...prev, { role: 'assistant', content: `[Image generation failed: ${imgData.error}]` }]);
        } else {
          setMessages(prev => [...prev, { role: 'assistant', content: `[Image generation failed or invalid image]` }]);
        }
      } catch (err) {
        const msgErr2 = err instanceof Error ? err.message : JSON.stringify(err);
        setMessages(prev => [...prev, { role: 'assistant', content: `[Image generation failed: ${msgErr2}]` }]);
      }
      setIsProcessingImage(false);
      setIsLoading(false);
      return;
    }

    // Keep last 3 messages + current input to avoid token limits
    const optimizedMessages = messages
      .filter(msg => msg.role === 'user' || msg.role === 'assistant')
      .slice(-3)
      .map(msg => ({
        role: msg.role,
        content: msg.content.replace(/!\[.*?]\(.*?\)/g, '[image]')
      }));
    optimizedMessages.push({ role: 'user', content: input });

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: optimizedMessages }),
      });
      const data = await response.json();
      if (!response.ok) {
        let errorMsg = "Unknown error occurred";
        if (data && data.error) {
          if (typeof data.error === "string") {
            errorMsg = data.error;
          } else if (typeof data.error === "object") {
            errorMsg = JSON.stringify(data.error);
          }
        } else if (typeof data === "object") {
          errorMsg = JSON.stringify(data);
        }
        setMessages(prev => [...prev, { role: "assistant", content: `Error: ${errorMsg}` }]);
        setIsLoading(false);
        return;
      }
      const reply = data.reply || "No response from AI.";
      const newAssistantMessage: Message = { role: "assistant", content: reply };
      const finalMessages: Message[] = [...updatedMessages, newAssistantMessage];
      setMessages(finalMessages);
      setFolders(prev =>
        prev.map(folder =>
          folder.id === activeFolder || (folder.id === 'all' && activeFolder !== 'all')
            ? { ...folder, chats: [...folder.chats, finalMessages as Message[]] }
            : folder
        )
      );
      setIsLoading(false);
    } catch (error) {
      console.error("Error occurred:", error);
      const errorMessage = (error instanceof Error && error.message) || "Unknown error occurred";
      setMessages(prev => [...prev, { role: "assistant", content: `Error: ${errorMessage}` }]);
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <button
        className="hamburger"
        aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        onClick={() => setSidebarOpen(s => !s)}
      >
        {sidebarOpen ? '✖' : '☰'}
      </button>
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          style={{
            position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', zIndex: 999
          }}
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar overlay"
        />
      )}
      <aside className={`sidebar${sidebarOpen ? ' open' : ''} bg-[#18181c] border-r border-[#23232a] flex flex-col justify-between`}>
        <div>
          <div className="flex items-center gap-2 px-4 py-4 border-b border-[#23232a]">
            <span className="font-bold text-lg text-white tracking-wide">Study Nova</span>
          </div>
          <div className="px-3 py-2">
            <button 
              onClick={() => {
                setMessages([]);
                setShowWelcome(true);
                setInput("");
                setLastImageData(null);
                setLastImagePrompt(null);
              }}
              className="w-full bg-[#222227] text-white rounded-lg py-2 px-3 flex items-center gap-2 mb-2 hover:bg-[#23232a] transition font-medium"
            >
              <span className="text-xl">＋</span> New Chat
            </button>
            <input className="w-full rounded-md px-3 py-2 bg-[#23232a] text-white placeholder:text-[#7a7a8c] mb-3 outline-none border border-[#23232a] focus:border-[#39394a]" placeholder="Search chats..." />
          </div>
          <div className="folder-list">
            {folders.map(folder => (
              <div
                key={folder.id}
                className={`folder flex items-center px-4 py-2 cursor-pointer rounded-md gap-2 text-white mb-1 hover:bg-[#23232a] ${activeFolder === folder.id ? 'bg-[#23232a] font-semibold' : ''}`}
                onClick={() => handleFolderClick(folder.id)}
              >
                <span className="folder-icon text-xl">{folder.icon}</span>
                <span className="folder-name text-base">{folder.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center py-4 gap-2 border-t border-[#23232a]">
          <span className="text-xs text-[#555]">N</span>
        </div>
      </aside>
      <div className="main-content flex-1 flex flex-col bg-[#19191e]">
        <header className="chat-header flex items-center justify-between px-6 py-3 border-b border-[#23232a]">
          <span className="text-white text-lg font-semibold">Chatbot UI</span>
          <span className="text-xs text-[#aaa]">GPT-4 Turbo</span>
        </header>
        <main className="main-container flex-1 flex flex-col items-center justify-center">
          <div className="flex-1 w-full flex flex-col items-center justify-center">
            {activeFolder !== 'image' && showWelcome && (
              <div className="flex flex-col items-center justify-center h-full select-none">
                <div className="flex flex-col items-center mb-6">
                  <div className="rounded-full bg-[#23232a] text-white w-20 h-20 flex items-center justify-center mb-4 text-2xl font-extrabold border border-[#23232a] shadow-lg">
                    <span className="font-extrabold tracking-wide" style={{fontFamily: 'Inter, sans-serif'}}>Nova</span>
                  </div>
                  <h1 className="text-3xl font-bold text-white mb-2 tracking-tight" style={{fontFamily: 'Inter, sans-serif'}}>Study Nova</h1>
                </div>
                <div className="w-full max-w-2xl grid grid-cols-2 gap-4 mb-8">
                  <button 
                    className="bg-[#222227] hover:bg-[#23232a] text-white rounded-lg p-4 text-left border border-[#23232a] transition"
                    onClick={() => handleSuggestionClick("Teach me why the sky is blue")}
                  >
                    <div className="font-semibold">Teach me</div>
                    <div className="text-xs text-[#aaa]">why the sky is blue</div>
                  </button>
                  <button 
                    className="bg-[#222227] hover:bg-[#23232a] text-white rounded-lg p-4 text-left border border-[#23232a] transition"
                    onClick={() => handleSuggestionClick("Create a course about the periodic table")}
                  >
                    <div className="font-semibold">Create a course</div>
                    <div className="text-xs text-[#aaa]">about the periodic table</div>
                  </button>
                  <button 
                    className="bg-[#222227] hover:bg-[#23232a] text-white rounded-lg p-4 text-left border border-[#23232a] transition"
                    onClick={() => handleSuggestionClick("Help me study for my biology exam")}
                  >
                    <div className="font-semibold">Help me study</div>
                    <div className="text-xs text-[#aaa]">for my biology exam</div>
                  </button>
                  <button 
                    className="bg-[#222227] hover:bg-[#23232a] text-white rounded-lg p-4 text-left border border-[#23232a] transition"
                    onClick={() => handleSuggestionClick("Explain how the internet works")}
                  >
                    <div className="font-semibold">Explain how</div>
                    <div className="text-xs text-[#aaa]">the internet works</div>
                  </button>
                </div>
              </div>
            )}

            <div className="chat-interface flex flex-col flex-1 w-full max-w-2xl mx-auto px-2">
              <div className="messages-container flex-1 overflow-y-auto pb-4">
                {activeFolder !== 'image' && !showWelcome && messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2 mb-4`}
                  >
                    {msg.role === 'assistant' ? (
                      <div className="flex items-end">
                        <img
                          src="/studynova-bot.png"
                          alt="StudyNova Bot"
                          className="w-10 h-10 rounded-full shadow border-2 border-white bg-white object-cover mr-3"
                          style={{ flexShrink: 0 }}
                        />
                        <div className="bg-[#23272f] text-white rounded-3xl px-6 py-4 shadow-lg max-w-[70%] text-base leading-relaxed font-normal">
                          {typeof msg.content === 'string' ? (
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={{
                                img: ({ node, ...props }: { node: unknown, [key: string]: any }) => (
                                  <img {...props} className="max-w-full h-auto rounded-lg" />
                                ),
                                code: ({ node, ...props }: { node: unknown, [key: string]: any }) => (
                                  <code {...props} className="bg-gray-800 text-white px-2 py-1 rounded" />
                                )
                              }}
                            >
                              {msg.content}
                            </ReactMarkdown>
                          ) : (
                            <div className="text-red-400">Error: Invalid message format</div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-row-reverse items-end">
                        <div className="ml-3 flex items-center justify-center w-10 h-10 rounded-full bg-purple-500 text-white font-bold text-lg shadow select-none">
                          Y
                        </div>
                        <div className="bg-blue-600 text-white rounded-3xl px-6 py-4 shadow-lg max-w-[70%] text-base leading-relaxed font-normal flex flex-col items-end">
                          {msg.content}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {activeFolder === 'image' && lastImageData && (
                  <div className="flex justify-start mb-4">
                    <div className="max-w-[80%] rounded-lg bg-gray-100 text-gray-800 px-4 py-3 shadow-md">
                      <img src={lastImageData} alt="Generated image" className="max-w-full h-auto rounded-lg" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
            <form onSubmit={handleSend} className="input-container mt-4 border-t border-gray-300 pt-4">
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder={activeFolder === 'image' ? "Generate an image..." : "Send a message..."}
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
                <button type="submit" disabled={!input.trim() || isLoading} className="send-button">
                  {isLoading ? '...' : '→'}
                </button>
              </div>
            </form>
            {activeFolder !== 'image' && (
              <div className="suggestions mt-4">
                <button className="suggestion-btn" onClick={() => handleSuggestionClick("Create an image of a ")}> <span className="icon">🎨</span> Create image </button>
                <button className="suggestion-btn" onClick={() => handleSuggestionClick("Help me brainstorm ideas for a ")}> <span className="icon">💡</span> Brainstorm </button>
                <button className="suggestion-btn" onClick={() => handleSuggestionClick("Help me write a ")}> <span className="icon">✍️</span> Help me write </button>
                <button className="suggestion-btn" onClick={() => handleSuggestionClick("Summarize this text: [paste your text here]")}> <span className="icon">📝</span> Summarize text </button>
              </div>
            )}
          </div>
        </main>
      </div>
      <Analytics />
    </div>
  );
}