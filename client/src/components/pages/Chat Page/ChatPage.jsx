'use client'
import React, { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import ReactMarkdown from 'react-markdown'
import axios from "axios"


export default function ChatPage() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [threadId, setThreadId] = useState(null)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const product = localStorage.getItem('product');
    if (!sessionStorage.getItem('asked') || sessionStorage.getItem('asked') == undefined) {
      chat(`Hello! What do you think about ${product}?`)
      sessionStorage.setItem('asked', true)
    }
  }, [])

  useEffect(() => {
    if (threadId) {
      setInterval(() => {
        const fetchMessages = async () => {
          const response = await axios.get(`http://localhost:6001/chat/${threadId}`);
          if (response.data.length > messages.length) {
            setMessages(response.data);
            setIsLoading(false);
          }
        }
        fetchMessages();
      }, 1000);  
    }
  }, [threadId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const chat = async (input) => {
    setMessages([
      ...messages,
      { role: 'user', content: input }
    ]);

    const message = input
    setInput('')
    setIsLoading(true)
    const personaFromLocalStorage = localStorage.getItem('personaId');
    const response = await axios.post('http://localhost:6001/chat', { personaId: personaFromLocalStorage, threadId, message });
    setThreadId(response.data.threadId);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return
    chat(input)    
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <nav className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-800">Chat App</h1>
        </div>
      </nav>
      <main className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-800 shadow'
                }`}
              >
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 rounded-lg p-3 shadow">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md">
          <div className="flex space-x-4">
            <textarea
              ref={inputRef}
              className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
              value={input}
              disabled={isLoading}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={isLoading}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}