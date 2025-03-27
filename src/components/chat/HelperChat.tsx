
import React from 'react';
import { ChatProvider } from './ChatContext';
import ChatButton from './ChatButton';
import ChatDialog from './ChatDialog';

const HelperChat: React.FC = () => {
  return (
    <ChatProvider>
      <ChatButton />
      <ChatDialog />
    </ChatProvider>
  );
};

export default HelperChat;
