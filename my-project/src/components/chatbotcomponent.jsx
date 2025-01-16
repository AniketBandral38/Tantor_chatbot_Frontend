import React, { useState, useEffect } from 'react';
import { FaRobot, FaChevronDown, FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';

function ChatbotComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      text: "Hey, I am Tentor AI assistant! I can help you with information about our services. How can I assist you today?", 
      sender: 'bot',
      isTyping: false,
      fullText: "Hey, I am Tentor AI assistant! I can help you with information about our services. How can I assist you today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const messagesEndRef = React.useRef(null);

  // Auto scroll on message end ref
  const scrollToBottom = () => {
    if (shouldAutoScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
    }
  };

  // Handle manual scroll
  const handleScroll = (e) => {
    const element = e.target;
    const isScrolledToBottom = 
      Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 50;
    setShouldAutoScroll(isScrolledToBottom);
  };

  // Reset auto-scroll when new message arrives
  useEffect(() => {
    setShouldAutoScroll(true);
  }, [messages.length]); // Only reset when message count changes

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check connection if ok if its 200
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await axios.get('http://localhost:8000/health');
        setIsConnected(response.status === 200);
      } catch (error) {
        setIsConnected(false);
      }
    };

    checkConnection();
    const interval = setInterval(checkConnection, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle submit flow
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessage = input.trim();
      setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
      setInput('');
      setIsLoading(true);

      if (!isConnected) {
        setMessages(prev => [...prev, { 
          text: "I'm currently offline. Please check your connection and try again.", 
          sender: 'bot',
          isTyping: false
        }]);
        setIsLoading(false);
        return;
      }

      // Add typing indicator message immediately
      setMessages(prev => [...prev, {
        text: "Typing ...",
        sender: 'bot',
        isTyping: true,
        fullText: "Typing.."
      }]);

      try {
        // Send question to backend with fixed username
        const response = await axios.post('http://localhost:8000/ask/', {
          username: "user1", // Fixed username
          question: userMessage
        });

        if (response.status === 200) {
          const botResponse = response.data.answer;
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = {
              text: "",
              sender: 'bot',
              isTyping: true,
              fullText: botResponse
            };
            return newMessages;
          });
        }
      } catch (error) {
        console.error('Error:', error);
        setMessages(prev => {
          // Remove typing message first
          const newMessages = prev.slice(0, -1);
          return [...newMessages, { 
            text: error.response?.status === 404 
              ? "I apologize, I don't have enough information to answer that question." 
              : "I apologize, there was an error processing your request.", 
            sender: 'bot',
            isTyping: false
          }];
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

//Toggle Chat Window
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };


  //Rendering the Chatbot UI
  return (
    <>
      {/* Bot Icon Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-700 transition-all z-50 ${
          isOpen ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <FaRobot className={`${isLoading ? 'animate-spin' : 'animate-pulse'}`} size={24} />
      </button>

        {/* Chat Interface */}
        <div
        className={`fixed bottom-0 right-0 w-[380px] h-[600px] bg-[#111b21] shadow-lg transition-transform duration-300 transform ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        } z-50`}
        >
        {/* Chat Header */}
        <div className="flex justify-between items-center p-4 bg-[#202c33] text-white">
          <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#00a884] flex items-center justify-center">
            <FaRobot size={24} />
          </div>
          <div>
            <div className="font-medium">Tantor Assistant</div>
            <div className="text-xs text-gray-400">
              {isLoading ? 'typing...' : (isConnected ? 'online' : 'offline')}
            </div>
          </div>
          </div>
            <button onClick={toggleChat} className="hover:bg-[#374045] p-2 rounded-full"> 
            <FaChevronDown size={20} /> 
            </button>
        </div>

        {/* Messages Container */}
        <div 
          className="flex-1 overflow-y-auto p-4 h-[calc(600px-8rem)] bg-[#0b141a] scrollbar-thin scrollbar-thumb-[#374045] scrollbar-track-transparent hover:scrollbar-thumb-[#475157]"
          onScroll={handleScroll}
        >
          {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
          >
            <div
            className={`p-3 rounded-lg max-w-[80%] ${
              message.sender === 'user'
              ? 'bg-[#005c4b] text-white rounded-tr-none'
              : 'bg-[#202c33] text-white rounded-tl-none'
            }`}
            >
            {message.isTyping ? (
              <TypewriterEffect 
              text={message.fullText} 
              scrollToBottom={scrollToBottom}
              onComplete={() => {
                setMessages(messages.map((msg, i) => 
                i === index ? { ...msg, isTyping: false, text: msg.fullText } : msg
                ));
              }} 
              />
            ) : (
                <div>
                {message.text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\n)/).map((part, i) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i}>{part.slice(2, -2)}</strong>;
                }
                if (part === '\n') {
                return <br key={i} />;
                }
                return part;
              })}
              </div>
            )}
            </div>
          </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="absolute bottom-0 left-0 right-0 p-3 bg-[#202c33]">
            <div className="flex items-center gap-2 bg-[#2a3942] rounded-lg px-4 py-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none border-none ring-0 focus:ring-0"
              placeholder="Type a message"
              disabled={isLoading}
            />
            <button
              type="submit"
              className={`w-10 h-10 rounded-full flex items-center justify-center bg-[#00a884] hover:bg-[#00cc9f] disabled:bg-gray-500 ${
              isLoading ? 'cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              <FaPaperPlane className={`text-white ${isLoading ? 'animate-spin' : ''}`} size={16} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

// Typewriter Effect Component
function TypewriterEffect({ text, onComplete, scrollToBottom }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        scrollToBottom();
        setCurrentIndex(prev => prev + 1);
      }, 30);

      return () => clearTimeout(timeout);
    } else {
      onComplete();
      scrollToBottom();
    }
  }, [currentIndex, text, onComplete, scrollToBottom]);

  // Parse and render bold text during typing
  const renderFormattedText = (text) => {
    return text.split(/(\*\*[^*]+\*\*|\n)/).map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      if (part === '\n') {
        return <br key={i} />;
      }
      return part;
    });
  };

  return (
    <span>
      {renderFormattedText(displayText)}
      {currentIndex < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
}

export default ChatbotComponent;