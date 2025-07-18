import React from 'react';

function CodeFlowPanel({ steps, currentStep, onStepSelect }) {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-bold text-white mb-3">Code Flow</h3>
      <ul>
        {steps.map((step, idx) => (
          <li key={step.id}>
            <button
              onClick={() => onStepSelect(step.id)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                currentStep === step.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              {idx + 1}. {step.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CodeFlowPanel;