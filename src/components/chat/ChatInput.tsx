
import React, { forwardRef } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isProcessing: boolean;
}

const ChatInput = forwardRef<HTMLInputElement, ChatInputProps>(
  ({ value, onChange, onSubmit, isProcessing }, ref) => {
    return (
      <div className="p-3 border-t border-gold/20 bg-black">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="flex space-x-2"
        >
          <input
            ref={ref}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-gold/50"
          />
          <button
            type="submit"
            disabled={isProcessing || !value.trim()}
            className="bg-gold hover:bg-gold/90 text-black p-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2 text-center">
          How can I help with your dining experience today?
        </p>
      </div>
    );
  }
);

ChatInput.displayName = 'ChatInput';

export default ChatInput;
