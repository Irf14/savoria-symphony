
import React from 'react';
import { Loader2 } from 'lucide-react';
import { Message } from '@/types/chat';

interface MessagesListProps {
  messages: Message[];
  isProcessing: boolean;
}

const MessagesList: React.FC<MessagesListProps> = ({ messages, isProcessing }) => {
  return (
    <div className="space-y-4 font-lato">
      {messages.map((message, index) => {
        // Use role or sender to determine message type
        const isUserMessage = (message.role === 'user' || message.sender === 'user');
        // Use content or text to get message content
        const messageContent = message.content || message.text || '';
        
        return (
          <div
            key={message.id || `msg-${index}`}
            className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-lg ${
                isUserMessage
                  ? 'bg-gradient-to-r from-gold/80 to-gold/90 text-black font-medium'
                  : 'bg-zinc-900 border border-zinc-700 text-white'
              }`}
            >
              <p className="text-sm">{messageContent}</p>
            </div>
          </div>
        );
      })}
      
      {isProcessing && (
        <div className="flex justify-start">
          <div className="max-w-[80%] px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white">
            <div className="flex items-center space-x-2">
              <Loader2 size={16} className="animate-spin text-gold" />
              <p className="text-sm text-gray-400 font-medium">Thinking...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesList;
