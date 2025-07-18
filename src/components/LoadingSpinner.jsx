import React from 'react';

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-b-4 border-purple-500"></div>
      <span className="ml-4 text-white text-lg">Loading...</span>
    </div>
  );
}

export default LoadingSpinner;