
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useChat } from './ChatContext';

const ChatMessages: React.FC = () => {
  const { messages, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[80%] p-3 rounded-lg ${
              message.sender === 'user'
                ? 'bg-gold/20 text-white rounded-tr-none'
                : 'bg-gold/10 text-white rounded-tl-none'
            }`}
          >
            <p className="text-sm md:text-base">{message.content}</p>
            <div className="text-xs text-right mt-1 opacity-60">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </motion.div>
      ))}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-start"
        >
          <div className="bg-gold/10 text-white rounded-lg rounded-tl-none max-w-[80%] p-3">
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-gold/60 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-gold/60 animate-pulse delay-150" />
              <div className="w-2 h-2 rounded-full bg-gold/60 animate-pulse delay-300" />
            </div>
          </div>
        </motion.div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
