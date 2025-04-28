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
      <aside className={`sidebar${sidebarOpen ? ' open' : ''} bg-[#0f0f10] border-r border-[#1f1f23] flex flex-col justify-between`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 px-4 py-4 border-b border-[#1f1f23]">
            <span className="font-bold text-lg text-white tracking-wide">Study Nova</span>
          </div>
          <div className="px-3 py-3">
            <button 
              onClick={() => {
                setMessages([]);
                setShowWelcome(true);
                setInput("");
                setLastImageData(null);
                setLastImagePrompt(null);
              }}
              className="w-full bg-[#2662d9] text-white rounded-md py-2 px-3 flex items-center justify-center gap-2 mb-3 hover:bg-[#2258c0] transition font-medium"
            >
              <span className="text-sm">＋</span> New Chat
            </button>
            <div className="relative mb-3">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#666]">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
              <input 
                className="w-full rounded-md pl-10 pr-3 py-2 bg-[#1a1a1c] text-white placeholder:text-[#666] outline-none border border-[#333] focus:border-[#2662d9] transition-colors" 
                placeholder="Search chats..." 
              />
            </div>
          </div>
          <div className="folder-list px-2 overflow-y-auto flex-1">
            <div className="text-xs font-medium text-[#666] px-2 py-2 uppercase tracking-wider">Folders</div>
            {folders.map(folder => (
              <div
                key={folder.id}
                className={`folder flex items-center px-3 py-2 cursor-pointer rounded-md gap-2 text-[#ddd] mb-1 hover:bg-[#1a1a1c] ${activeFolder === folder.id ? 'bg-[#1a1a1c] text-white' : ''}`}
                onClick={() => handleFolderClick(folder.id)}
              >
                <span className="folder-icon text-lg">{folder.icon}</span>
                <span className="folder-name text-sm">{folder.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col p-3 gap-2 border-t border-[#1f1f23]">
          <div className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-[#1a1a1c] cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-[#2662d9] flex items-center justify-center text-white font-medium">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="text-sm text-[#ddd]">Settings</div>
          </div>
        </div>
      </aside>
      <div className="main-content flex-1 flex flex-col bg-[#0a0a0b]">
        <header className="chat-header flex items-center justify-between px-6 py-3 border-b border-[#1f1f23]">
          <div className="flex items-center gap-2">
            <span className="text-white text-sm font-medium">Current Chat</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-[#1a1a1c] px-3 py-1 rounded-md border border-[#333] cursor-pointer">
              <span className="text-xs text-[#ddd]">GPT-4 Turbo</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#666]">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </header>
        <main className="main-container flex-1 flex flex-col">
          <div className="flex-1 w-full flex flex-col">
            {activeFolder !== 'image' && showWelcome && (
              <div className="flex flex-col items-center justify-center h-full select-none px-4">
                <div className="flex flex-col items-center mb-8">
                  <div className="rounded-full bg-[#1a1a1c] text-white w-20 h-20 flex items-center justify-center mb-4 text-2xl font-extrabold border border-[#333] shadow-lg">
                    <span className="font-extrabold tracking-wide" style={{fontFamily: 'Inter, sans-serif'}}>Nova</span>
                  </div>
                  <h1 className="text-3xl font-bold text-white mb-2 tracking-tight" style={{fontFamily: 'Inter, sans-serif'}}>Study Nova</h1>
                  <p className="text-[#888] text-center max-w-md mb-8">Your AI-powered study assistant. Ask questions, create courses, and learn anything.</p>
                </div>
                <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                  <button 
                    className="bg-[#1a1a1c] hover:bg-[#222] text-white rounded-lg p-4 text-left border border-[#333] transition"
                    onClick={() => handleSuggestionClick("Teach me why the sky is blue")}
                  >
                    <div className="font-medium">Teach me</div>
                    <div className="text-xs text-[#888]">why the sky is blue</div>
                  </button>
                  <button 
                    className="bg-[#1a1a1c] hover:bg-[#222] text-white rounded-lg p-4 text-left border border-[#333] transition"
                    onClick={() => handleSuggestionClick("Create a course about the periodic table")}
                  >
                    <div className="font-medium">Create a course</div>
                    <div className="text-xs text-[#888]">about the periodic table</div>
                  </button>
                  <button 
                    className="bg-[#1a1a1c] hover:bg-[#222] text-white rounded-lg p-4 text-left border border-[#333] transition"
                    onClick={() => handleSuggestionClick("Help me study for my biology exam")}
                  >
                    <div className="font-medium">Help me study</div>
                    <div className="text-xs text-[#888]">for my biology exam</div>
                  </button>
                  <button 
                    className="bg-[#1a1a1c] hover:bg-[#222] text-white rounded-lg p-4 text-left border border-[#333] transition"
                    onClick={() => handleSuggestionClick("Explain how the internet works")}
                  >
                    <div className="font-medium">Explain how</div>
                    <div className="text-xs text-[#888]">the internet works</div>
                  </button>
                </div>
              </div>
            )}

            <div className={`chat-interface flex flex-col flex-1 w-full max-w-3xl mx-auto ${!showWelcome ? 'px-4' : ''}`}>
              <div className="messages-container flex-1 overflow-y-auto pb-4">
                {activeFolder !== 'image' && !showWelcome && messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className="border-b border-[#1f1f23] py-6 first:pt-8"
                  >
                    <div className="max-w-3xl mx-auto flex gap-4">
                      {msg.role === 'assistant' ? (
                        <>
                          <div className="w-8 h-8 rounded-full bg-[#1a1a1c] border border-[#333] flex items-center justify-center text-white text-xs">
                            AI
                          </div>
                          <div className="flex-1 text-[#ddd] text-sm leading-relaxed">
                            {typeof msg.content === 'string' ? (
                              <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                  img: ({ node, ...props }: { node: unknown, [key: string]: any }) => {
                                    // Check if src is empty string and replace with null
                                    const imgProps = {...props};
                                    if (imgProps.src === '') {
                                      imgProps.src = null;
                                    }
                                    return <img {...imgProps} className="max-w-full h-auto rounded-lg my-4" />;
                                  },
                                  code: ({ node, ...props }: { node: unknown, [key: string]: any }) => (
                                    <code {...props} className="bg-[#1a1a1c] text-[#ddd] px-2 py-1 rounded text-xs" />
                                  ),
                                  pre: ({ node, ...props }: { node: unknown, [key: string]: any }) => (
                                    <pre {...props} className="bg-[#1a1a1c] text-[#ddd] p-3 rounded-md my-3 overflow-auto text-xs" />
                                  )
                                }}
                              >
                                {msg.content}
                              </ReactMarkdown>
                            ) : (
                              <div className="text-red-400">Error: Invalid message format</div>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-8 h-8 rounded-full bg-[#2662d9] flex items-center justify-center text-white text-xs">
                            {user?.name?.charAt(0) || 'U'}
                          </div>
                          <div className="flex-1 text-white text-sm">
                            {msg.content}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
                {activeFolder === 'image' && lastImageData && (
                  <div className="border-b border-[#1f1f23] py-6">
                    <div className="max-w-3xl mx-auto flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#1a1a1c] border border-[#333] flex items-center justify-center text-white text-xs">
                        AI
                      </div>
                      <div className="flex-1">
                        <img src={lastImageData} alt="Generated image" className="max-w-full h-auto rounded-lg my-4" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            <div className="fixed bottom-0 left-0 right-0 w-full bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b] to-[rgba(10,10,11,0.8)] pt-8 pb-6 backdrop-blur-sm z-10 fixed-input-container">
              <div className="max-w-5xl mx-auto px-6">
                <form onSubmit={handleSend} className="w-full">
                  <div className="relative bg-[#1e1e24] rounded-2xl shadow-2xl border border-[#2a2a30] hover:border-[#3a3a45] focus-within:border-[#2662d9] transition-all duration-300 overflow-hidden">
                    <div className="flex items-center">
                      <div className="pl-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#666] group-focus-within:text-[#2662d9]">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="16"></line>
                          <line x1="8" y1="12" x2="16" y2="12"></line>
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder={activeFolder === 'image' ? "Describe the image you want to generate..." : "Ask me anything..."}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                          }
                        }}
                        className="flex-grow bg-transparent text-white px-4 py-5 outline-none text-base placeholder:text-[#666] font-medium"
                        disabled={isLoading}
                        ref={inputRef}
                      />
                      <div className="pr-4">
                        <button 
                          type="submit" 
                          disabled={!input.trim() || isLoading} 
                          className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#2662d9] to-[#1e4eb8] text-white disabled:opacity-50 disabled:from-[#333] disabled:to-[#222] hover:from-[#2b6ae6] hover:to-[#2255c5] transition-all duration-300 shadow-lg transform hover:scale-105 active:scale-95"
                        >
                          {isLoading ? (
                            <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="22" y1="2" x2="11" y2="13"></line>
                              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#2662d9] to-transparent opacity-0 focus-within:opacity-100"></div>
                  </div>
                </form>
                
                {activeFolder !== 'image' && !showWelcome && (
                  <div className="flex justify-center gap-3 mt-4 suggestion-buttons">
                    <button className="text-sm text-[#aaa] hover:text-white bg-[#1e1e24] hover:bg-[#252530] px-5 py-2.5 rounded-xl border border-[#333] hover:border-[#444] transition-all duration-200 shadow-md hover:shadow-lg transform hover:translate-y-[-2px]" onClick={() => handleSuggestionClick("Create an image of a ")}>
                      <span className="flex items-center gap-2">
                        <span>🎨</span> Create image
                      </span>
                    </button>
                    <button className="text-sm text-[#aaa] hover:text-white bg-[#1e1e24] hover:bg-[#252530] px-5 py-2.5 rounded-xl border border-[#333] hover:border-[#444] transition-all duration-200 shadow-md hover:shadow-lg transform hover:translate-y-[-2px]" onClick={() => handleSuggestionClick("Help me brainstorm ideas for a ")}>
                      <span className="flex items-center gap-2">
                        <span>💡</span> Brainstorm
                      </span>
                    </button>
                    <button className="text-sm text-[#aaa] hover:text-white bg-[#1e1e24] hover:bg-[#252530] px-5 py-2.5 rounded-xl border border-[#333] hover:border-[#444] transition-all duration-200 shadow-md hover:shadow-lg transform hover:translate-y-[-2px]" onClick={() => handleSuggestionClick("Summarize this text: ")}>
                      <span className="flex items-center gap-2">
                        <span>📝</span> Summarize
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Add padding at the bottom to prevent content from being hidden behind the fixed input bar */}
            <div className="h-32"></div>
          </div>
        </main>
      </div>
      <Analytics />
    </div>
  );
}