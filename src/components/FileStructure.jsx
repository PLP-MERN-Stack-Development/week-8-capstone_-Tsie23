import React from 'react';

function FileStructure({ files, onFileClick, selectedFile }) {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-bold text-white mb-3">Project Files</h3>
      <ul>
        {files.map(file => (
          <li key={file.id}>
            <button
              onClick={() => onFileClick(file.id)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                selectedFile === file.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              {file.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileStructure;