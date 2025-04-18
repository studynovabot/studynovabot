// components/ChatBubble.jsx
export default function ChatBubble({ message }) {
  const isUser = message.role === 'user'
  return (
    <div className={`max-w-lg px-4 py-2 rounded-lg ${isUser ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-200 text-gray-800'}`}>
      {message.content}
    </div>
  )
}
