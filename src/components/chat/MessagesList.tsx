
import React from 'react';
import { Loader2 } from 'lucide-react';
import { Message } from '@/types/chat';

interface MessagesListProps {
  messages: Message[];
  isProcessing: boolean;
}

const MessagesList: React.FC<MessagesListProps> = ({ messages, isProcessing }) => {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[80%] px-4 py-2 rounded-lg ${
              message.sender === 'user'
                ? 'bg-gradient-to-r from-gold/80 to-gold/90 text-black'
                : 'bg-zinc-900 border border-zinc-700 text-white'
            }`}
          >
            <p className="text-sm">{message.text}</p>
          </div>
        </div>
      ))}
      
      {isProcessing && (
        <div className="flex justify-start">
          <div className="max-w-[80%] px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white">
            <div className="flex items-center space-x-2">
              <Loader2 size={16} className="animate-spin text-gold" />
              <p className="text-sm text-gray-400">Thinking...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesList;
