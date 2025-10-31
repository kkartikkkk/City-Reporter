import React, { useState, useRef, useEffect } from 'react'

const ChatbotWithSidebar = () => {
    const [messages, setMessages] = useState([])
    const [question, setQuestion] = useState('')
    const [loading, setLoading] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [darkMode, setDarkMode] = useState(false)
    const [chatHistory, setChatHistory] = useState([])
    const [activeChat, setActiveChat] = useState(null)
    const [searchHistory, setSearchHistory] = useState('')
    const [showSettings, setShowSettings] = useState(false)
    const chatContainerRef = useRef(null)

    // Generate answer function
    const generateAnswer = async () => {
        if (!question.trim()) return
        
        const userMessage = {
            id: Date.now(),
            type: 'user',
            content: question,
            timestamp: new Date().toLocaleTimeString()
        }
        
        setMessages(prev => [...prev, userMessage])
        const currentQuestion = question
        setQuestion('')
        setLoading(true)
        
        try {
            const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyC3oG131WC5tpRkDY2_kMIz4WXxdmoEi4U", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "contents": [{
                        "parts": [{ "text": currentQuestion }]
                    }]
                })
            })
            
            const data = await response.json()
            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No answer found."
            
            const aiMessage = {
                id: Date.now() + 1,
                type: 'ai',
                content: text,
                timestamp: new Date().toLocaleTimeString()
            }
            
            setMessages(prev => [...prev, aiMessage])
        } catch (err) {
            const errorMessage = {
                id: Date.now() + 1,
                type: 'error',
                content: '⚠️ Failed to fetch answer. Please try again.',
                timestamp: new Date().toLocaleTimeString()
            }
            setMessages(prev => [...prev, errorMessage])
        } finally {
            setLoading(false)
        }
    }

    // Handle key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            generateAnswer()
        }
    }

    // Copy to clipboard
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
        // Could add a toast notification here
    }

    // Save current chat
    const saveChat = () => {
        if (messages.length > 0) {
            const chatTitle = messages.find(m => m.type === 'user')?.content.substring(0, 50) || `Chat ${Date.now()}`
            const newChat = {
                id: Date.now(),
                title: chatTitle,
                messages: [...messages],
                timestamp: new Date().toISOString(),
                lastMessage: new Date().toLocaleString()
            }
            setChatHistory(prev => [newChat, ...prev])
            setActiveChat(newChat.id)
        }
    }

    // Start new chat
    const startNewChat = () => {
        if (messages.length > 0) {
            saveChat()
        }
        setMessages([])
        setActiveChat(null)
    }

    // Load chat from history
    const loadChat = (chat) => {
        setMessages(chat.messages)
        setActiveChat(chat.id)
    }

    // Delete chat
    const deleteChat = (chatId) => {
        setChatHistory(prev => prev.filter(chat => chat.id !== chatId))
        if (activeChat === chatId) {
            setMessages([])
            setActiveChat(null)
        }
    }

    // Auto-scroll to bottom
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
        }
    }, [messages])

    const theme = darkMode ? 'dark' : 'light'
    const bgClass = darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-100 to-blue-50'
    const textClass = darkMode ? 'text-white' : 'text-gray-900'
    const cardClass = darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
    const sidebarClass = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'

    return (
        <div className={`flex h-screen ${bgClass} ${textClass}`}>
            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden ${sidebarClass} border-r`}>
                <div className="p-4 h-full flex flex-col">
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Chats</h2>
                        <button
                            onClick={startNewChat}
                            className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                            title="New Chat"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    </div>

                    {/* Search */}
                    <div className="relative mb-4">
                        <input
                            type="text"
                            placeholder="Search chats..."
                            value={searchHistory}
                            onChange={(e) => setSearchHistory(e.target.value)}
                            className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        <svg className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    {/* Chat History */}
                    <div className="flex-1 overflow-y-auto space-y-2">
                        {chatHistory
                            .filter(chat => chat.title.toLowerCase().includes(searchHistory.toLowerCase()))
                            .map(chat => (
                            <div
                                key={chat.id}
                                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                                    activeChat === chat.id
                                        ? 'bg-blue-500 text-white'
                                        : darkMode
                                        ? 'bg-gray-700 hover:bg-gray-600'
                                        : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                                onClick={() => loadChat(chat)}
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="font-medium truncate">{chat.title}</h3>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            deleteChat(chat.id)
                                        }}
                                        className="text-red-500 hover:text-red-600 p-1"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                                <p className="text-xs opacity-75 mt-1">{chat.lastMessage}</p>
                            </div>
                        ))}
                    </div>

                    {/* Settings */}
                    <div className="border-t pt-4 mt-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Theme</span>
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className={`w-12 h-6 rounded-full p-1 transition-colors ${darkMode ? 'bg-blue-600' : 'bg-gray-300'}`}
                            >
                                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0'}`} />
                            </button>
                        </div>
                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className={`w-full p-2 rounded-lg text-left ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
                        >
                            <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>Settings</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className={`${cardClass} px-6 py-4 shadow-md`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" />
                                    </svg>
                                </div>
                                <h1 className="text-xl font-bold">AI Assistant</h1>
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {messages.length / 2} messages
                            </span>
                            {messages.length > 0 && (
                                <button
                                    onClick={saveChat}
                                    className="px-3 py-1 text-sm bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                                >
                                    Save Chat
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-hidden">
                    <div 
                        ref={chatContainerRef}
                        className="h-full overflow-y-auto p-4 space-y-4"
                    >
                        {messages.length === 0 && (
                            <div className="text-center text-gray-500 mt-20">
                                <svg className="mx-auto w-20 h-20 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" />
                                </svg>
                                <p className="text-lg font-medium">Start a conversation</p>
                                <p className="text-sm">Ask me anything and I'll help you!</p>
                            </div>
                        )}
                        
                        {messages.map((message) => (
                            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`flex max-w-xs lg:max-w-md ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                        message.type === 'user' 
                                            ? 'bg-blue-500 text-white' 
                                            : message.type === 'error'
                                            ? 'bg-red-500 text-white'
                                            : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                                    }`}>
                                        {message.type === 'user' ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        ) : message.type === 'error' ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12c0 4.918-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        )}
                                    </div>
                                    <div className={`relative px-4 py-2 rounded-lg ${
                                        message.type === 'user' 
                                            ? 'bg-blue-500 text-white rounded-tr-none' 
                                            : message.type === 'error'
                                            ? 'bg-red-100 text-red-900 border border-red-200 rounded-tl-none'
                                            : darkMode
                                            ? 'bg-gray-700 text-white rounded-tl-none'
                                            : 'bg-gray-100 text-gray-900 rounded-tl-none'
                                    }`}>
                                        <div className="whitespace-pre-line text-sm leading-relaxed">{message.content}</div>
                                        <div className={`text-xs mt-1 opacity-70 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                                            {message.timestamp}
                                        </div>
                                        {message.type === 'ai' && (
                                            <button
                                                onClick={() => copyToClipboard(message.content)}
                                                className="absolute -top-2 -right-2 w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xs transition-colors"
                                                title="Copy message"
                                            >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        {loading && (
                            <div className="flex justify-start">
                                <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                    </div>
                                    <span className="text-sm text-gray-500">AI is thinking...</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Input Area */}
                <div className={`${cardClass} p-4 shadow-lg`}>
                    <div className="flex items-center space-x-3">
                        <div className="flex-1 relative">
                            <textarea
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your message here..."
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                                    darkMode 
                                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                        : 'bg-gray-50 border-gray-300 text-gray-700'
                                }`}
                                rows="1"
                                disabled={loading}
                            />
                        </div>
                        <button
                            onClick={generateAnswer}
                            disabled={loading || !question.trim()}
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                        >
                            {loading ? (
                                <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            )}
                            <span>{loading ? 'Sending...' : 'Send'}</span>
                        </button>
                    </div>
                    <div className={`text-xs mt-2 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Press Enter to send • Shift+Enter for new line
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatbotWithSidebar