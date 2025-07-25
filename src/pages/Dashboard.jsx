import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { useTemplates, useTemplate } from '../hooks/useTemplates';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { Select } from '../components/ui/Select';
import { FileStructureView } from '../components/dashboard/FileStructureView';
import { CodeFlowView } from '../components/dashboard/CodeFlowView';
import { DependenciesView } from '../components/dashboard/DependenciesView';
import { GlossaryView } from '../components/glossary/GlossaryView';
import { QuickTips } from '../components/dashboard/QuickTips';
import { getTemplateById } from '../data/projectTemplates';

export const Dashboard = () => {
  const { user, mode, loading: userLoading } = useUser();
  const [selectedTemplate, setSelectedTemplate] = useState('mern-stack');
  const [activeTab, setActiveTab] = useState('structure');
  
  // Try to fetch from API first, fallback to local data
  const { templates, loading: templatesLoading } = useTemplates();
  const { template: apiTemplate, loading: templateLoading } = useTemplate(selectedTemplate);
  
  // Use API data if available, otherwise fallback to local data
  const template = apiTemplate || getTemplateById(selectedTemplate);
  const templateOptions = templates.length > 0 
    ? templates.map(t => ({ value: t._id || t.id, label: t.name }))
    : [
        { value: 'mern-stack', label: 'MERN Stack Project' },
        { value: 'frontend-website', label: 'Frontend Website' }
      ];

  const tabs = [
    { id: 'structure', label: 'File Structure', icon: '📁' },
    { id: 'flow', label: 'Code Flow', icon: '🔄' },
    { id: 'dependencies', label: 'Dependencies', icon: '🔗' },
    { id: 'glossary', label: 'Glossary', icon: '📚' }
  ];

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (templatesLoading || templateLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
          <div className="flex items-center justify-center h-64">
            <LoadingSpinner size="xl" />
          </div>
        </div>
      </div>
    );
  }

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
                  onClick={() => setActiveTab(tab.id)}
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
            {template ? (
              <>
                {activeTab === 'structure' && (
                  <FileStructureView 
                    files={template.fileStructure} 
                    templateId={template._id || template.id}
                  />
                )}
                {activeTab === 'flow' && (
                  <CodeFlowView steps={template.codeFlow} />
                )}
                {activeTab === 'dependencies' && (
                  <DependenciesView dependencies={template.dependencies} />
                )}
                {activeTab === 'glossary' && <GlossaryView />}
              </>
            ) : (
              <ErrorMessage 
                message="Template not found. Please select a different template."
                onRetry={() => window.location.reload()}
              />
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