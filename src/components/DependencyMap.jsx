import React from 'react';

function DependencyMap({ dependencies }) {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-bold text-white mb-3">Dependencies</h3>
      <ul>
        {dependencies.map(dep => (
          <li key={dep.name} className="mb-2">
            <span className="text-white font-medium">{dep.name}</span>
            <span className="text-gray-400 ml-2">{dep.version}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DependencyMap;