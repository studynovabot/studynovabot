import { useState, useRef, useEffect } from 'react'
import ChatBubble from '../components/ChatBubble'

export default function Home() {
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hi there! Ask me anything ✨' },
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)

  const handleSend = () => {
    if (!input.trim()) return
    const newMessages = [...messages, { role: 'user', content: input }]
    setMessages(newMessages)
    setInput('')
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', content: 'You said: ' + input }])
    }, 500)
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="p-4 bg-white shadow text-xl font-bold text-gray-800">StudyNova AI</header>
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg, i) => (
          <ChatBubble key={i} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-white flex gap-2">
        <input
          className="flex-1 border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask me anything..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  )
}
