import React from 'react';

function Glossary({ terms }) {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-bold text-white mb-3">Glossary</h3>
      <ul>
        {terms.map(term => (
          <li key={term.word} className="mb-2">
            <span className="text-white font-medium">{term.word}</span>
            <span className="text-gray-400 ml-2">{term.definition}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Glossary;