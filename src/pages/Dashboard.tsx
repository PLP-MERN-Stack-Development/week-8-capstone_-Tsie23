import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { projectTemplates, getTemplateById } from '../data/projectTemplates';
import { useUser } from '../contexts/UserContext';
import { Select } from '../components/ui/Select';
import { FileStructureView } from '../components/dashboard/FileStructureView';
import { CodeFlowView } from '../components/dashboard/CodeFlowView';
import { DependenciesView } from '../components/dashboard/DependenciesView';
import { GlossaryView } from '../components/glossary/GlossaryView';
import { QuickTips } from '../components/dashboard/QuickTips';

export const Dashboard: React.FC = () => {
  const { user, mode } = useUser();
  const [selectedTemplate, setSelectedTemplate] = useState('mern-stack');
  const [activeTab, setActiveTab] = useState<'structure' | 'flow' | 'dependencies' | 'glossary'>('structure');

  const template = getTemplateById(selectedTemplate);
  const templateOptions = projectTemplates.map(t => ({ value: t.id, label: t.name }));

  const tabs = [
    { id: 'structure', label: 'File Structure', icon: '📁' },
    { id: 'flow', label: 'Code Flow', icon: '🔄' },
    { id: 'dependencies', label: 'Dependencies', icon: '🔗' },
    { id: 'glossary', label: 'Glossary', icon: '📚' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {user ? `Welcome back, ${user.name}!` : 'Welcome to Code Compass!'}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            {user 
              ? "Let's continue building your coding project step by step with detailed explanations"
              : "Start learning how to structure coding projects step by step with detailed explanations"
            }
          </p>
        </div>

        {/* Project Type Selection */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Choose Your Project Type
          </h2>
          <Select
            options={templateOptions}
            value={selectedTemplate}
            onChange={setSelectedTemplate}
            placeholder="Select a project template"
            className="w-full sm:max-w-md"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Left Column - Navigation Tabs */}
          <div className="lg:col-span-1">
            <div className="grid grid-cols-4 lg:grid-cols-1 gap-2 lg:space-y-2 mb-4 sm:mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex flex-col lg:flex-row items-center lg:space-x-3 px-2 sm:px-4 py-2 sm:py-3 rounded-lg text-center lg:text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="text-base sm:text-lg">{tab.icon}</span>
                  <span className="text-xs sm:text-sm lg:text-base font-medium mt-1 lg:mt-0">{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="hidden lg:block">
              <QuickTips />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-3">
            {template && (
              <>
                {activeTab === 'structure' && (
                  <FileStructureView files={template.fileStructure} />
                )}
                {activeTab === 'flow' && (
                  <CodeFlowView steps={template.codeFlow} />
                )}
                {activeTab === 'dependencies' && (
                  <DependenciesView dependencies={template.dependencies} />
                )}
                {activeTab === 'glossary' && <GlossaryView />}
              </>
            )}
          </div>
        </div>

        {/* Mobile Quick Tips */}
        <div className="lg:hidden mt-6">
          <QuickTips />
        </div>
      </div>
    </div>
  );
};