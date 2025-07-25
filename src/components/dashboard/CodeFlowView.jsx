import React from 'react';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

export const CodeFlowView = ({ steps }) => {
  const { mode } = useUser();

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Code Flow & Data Movement
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {mode === 'beginner' 
            ? "Step-by-step explanation of how your code flows and data moves between files."
            : "Data flow and execution order between components and modules."}
        </p>
      </div>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={step.id} className="relative">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {step.order}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="text-base font-medium text-gray-900 dark:text-white">
                    {step.title}
                  </h4>
                  <PlayCircle size={16} className="text-blue-500" />
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {step.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {step.files.map((file, fileIndex) => (
                    <React.Fragment key={file}>
                      <span className="inline-flex items-center px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-md font-mono">
                        {file}
                      </span>
                      {fileIndex < step.files.length - 1 && (
                        <ArrowRight size={14} className="text-gray-400 self-center" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Connecting line to next step */}
            {index < steps.length - 1 && (
              <div className="absolute left-4 top-8 w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
            )}
          </div>
        ))}
      </div>

      {mode === 'beginner' && (
        <div className="mt-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <h4 className="text-sm font-medium text-green-900 dark:text-green-400 mb-1">🎯 Understanding Flow</h4>
          <p className="text-xs text-green-800 dark:text-green-300">
            Follow the numbers to understand the logical order of building your project. Each step builds upon the previous ones.
          </p>
        </div>
      )}
    </div>
  );
};