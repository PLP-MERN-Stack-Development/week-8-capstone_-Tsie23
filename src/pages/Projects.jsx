import React from 'react';
import { projectTemplates } from '../data/projectTemplates';
import { Button } from '../components/ui/Button';
import { ExternalLink, Clock, BarChart3 } from 'lucide-react';

export const Projects = () => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300';
      case 'intermediate':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300';
      case 'advanced':
        return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'frontend':
        return '🎨';
      case 'backend':
        return '⚙️';
      case 'fullstack':
        return '🌐';
      case 'mobile':
        return '📱';
      case 'testing':
        return '🧪';
      default:
        return '💻';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Project Templates
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Choose from our curated collection of project templates to get started with structured learning
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{getCategoryIcon(template.category)}</span>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {template.name}
                    </h3>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(template.difficulty)}`}>
                    {template.difficulty}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                  {template.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock size={14} />
                    <span>{template.fileStructure.length} files</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BarChart3 size={14} />
                    <span>{template.codeFlow.length} steps</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1"
                    onClick={() => window.location.href = `/dashboard?template=${template.id}`}
                  >
                    Start Learning
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open('#', '_blank')}
                  >
                    <ExternalLink size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Templates */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Coming Soon
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Firebase Project', icon: '🔥', category: 'Backend' },
              { name: 'Static Tailwind Site', icon: '🎨', category: 'Frontend' },
              { name: 'Testing & Debugging', icon: '🧪', category: 'Testing' },
              { name: 'Flutter Mobile App', icon: '📱', category: 'Mobile' },
            ].map((template, index) => (
              <div
                key={index}
                className="bg-gray-100 dark:bg-gray-800/50 rounded-lg p-4 border-2 border-dashed border-gray-300 dark:border-gray-600"
              >
                <div className="text-center">
                  <span className="text-3xl mb-2 block opacity-50">{template.icon}</span>
                  <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {template.name}
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {template.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};