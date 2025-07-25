import React from 'react';
import { GlossaryView } from '../components/glossary/GlossaryView';

export const Glossary = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Programming Glossary
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Essential programming terms and concepts explained clearly for developers at all levels
          </p>
        </div>

        <GlossaryView />
      </div>
    </div>
  );
};