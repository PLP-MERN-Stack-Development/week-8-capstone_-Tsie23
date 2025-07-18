import React from 'react';
import { X } from 'lucide-react';

function FileDetailModal({ isOpen, onClose, file }) {
  if (!isOpen || !file) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl max-w-lg w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>
        <h2 className="text-xl font-bold text-white mb-2">{file.name}</h2>
        <pre className="bg-gray-800 rounded-lg p-4 text-gray-200 text-sm overflow-x-auto">
          {file.content}
        </pre>
      </div>
    </div>
  );
}

export default FileDetailModal;