import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant. Ask me anything about our knowledge base!',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [knowledgeFiles, setKnowledgeFiles] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Fetch knowledge base files on mount
    fetchKnowledgeFiles();
  }, []);

  const fetchKnowledgeFiles = async () => {
    try {
      const response = await axios.get(`${API_URL}/knowledge-base`);
      setKnowledgeFiles(response.data.files);
    } catch (error) {
      console.error('Error fetching knowledge files:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');

    // Add user message to chat
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Prepare conversation history for API
      const conversationHistory = newMessages.slice(1).map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await axios.post(`${API_URL}/chat`, {
        message: userMessage,
        conversationHistory: conversationHistory.slice(-10), // Keep last 10 messages
      });

      // Add assistant response
      setMessages([
        ...newMessages,
        { role: 'assistant', content: response.data.response },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please make sure the backend server is running and your OpenAI API key is configured.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: 'Chat cleared! How can I help you?',
      },
    ]);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div>
          <h1>🤖 AI Knowledge Base Assistant</h1>
          {knowledgeFiles.length > 0 && (
            <p className="knowledge-files">
              Knowledge base: {knowledgeFiles.join(', ')}
            </p>
          )}
        </div>
        <button onClick={clearChat} className="clear-button">
          Clear Chat
        </button>
      </div>

      <div className="messages-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
          >
            <div className="message-avatar">
              {message.role === 'user' ? '👤' : '🤖'}
            </div>
            <div className="message-content">
              <div className="message-text">{message.content}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message assistant-message">
            <div className="message-avatar">🤖</div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="input-form">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
          className="message-input"
        />
        <button type="submit" disabled={isLoading || !inputMessage.trim()} className="send-button">
          {isLoading ? '...' : '➤'}
        </button>
      </form>
    </div>
  );
}

export default App;
