
import React from 'react';
import { Menu, Calendar, PhoneCall, Home } from 'lucide-react';
import { ActionButton, ActionType } from '@/types/chat';

interface SuggestedActionsProps {
  suggestedActions: ActionButton[];
  onActionClick: (action: ActionType, param?: string) => void;
}

const SuggestedActions: React.FC<SuggestedActionsProps> = ({ 
  suggestedActions, 
  onActionClick 
}) => {
  return (
    <div className="px-4 py-2 border-t border-zinc-800 flex gap-2 overflow-x-auto">
      {suggestedActions.map((action, index) => (
        <button
          key={`${action.type}-${index}`}
          onClick={() => onActionClick(action.type, action.parameter)}
          className="flex items-center space-x-1 px-3 py-1.5 bg-gold/20 hover:bg-gold/30 text-white text-sm rounded whitespace-nowrap transition-colors"
        >
          {action.type === 'viewMenu' && <Menu className="w-4 h-4 mr-1" />}
          {action.type === 'makeReservation' && <Calendar className="w-4 h-4 mr-1" />}
          {action.type === 'contact' && <PhoneCall className="w-4 h-4 mr-1" />}
          {action.type === 'viewGallery' && <Calendar className="w-4 h-4 mr-1" />}
          {action.type === 'viewVenues' && <Home className="w-4 h-4 mr-1" />}
          <span>{action.label}</span>
        </button>
      ))}
    </div>
  );
};

export default SuggestedActions;
