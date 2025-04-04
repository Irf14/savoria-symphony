
import React from 'react';
// The loader styles are now in menu.css, which is imported in App.css

type LoadingOverlayProps = {
  isLoading: boolean;
};

const LoadingOverlay = ({ isLoading }: LoadingOverlayProps) => {
  if (!isLoading) return null;
  
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="loader"></div>
    </div>
  );
};

export default LoadingOverlay;
