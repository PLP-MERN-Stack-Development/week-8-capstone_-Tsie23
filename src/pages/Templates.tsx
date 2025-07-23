import React from 'react';
import { Link } from 'react-router-dom';
import { projectTemplates } from '../data/projectTemplates';
import { Button } from '../components/ui/Button';
import { ArrowRight, FileText, Users, Star } from 'lucide-react';

export const Templates: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Project Templates
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Professional project templates with complete file structures, dependencies, and step-by-step guides 
            to help you build real-world applications
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-sm border border-gray-200 dark:border-gray-700">
            <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {projectTemplates.length}+
            </div>
            <div className="text-gray-600 dark:text-gray-400">Templates Available</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-sm border border-gray-200 dark:border-gray-700">
            <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">10K+</div>
            <div className="text-gray-600 dark:text-gray-400">Developers Learning</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-sm border border-gray-200 dark:border-gray-700">
            <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">4.9/5</div>
            <div className="text-gray-600 dark:text-gray-400">Average Rating</div>
          </div>
        </div>

        {/* Template Categories */}
        <div className="space-y-12">
          {['fullstack', 'frontend', 'backend', 'mobile', 'testing'].map((category) => {
            const categoryTemplates = projectTemplates.filter(t => t.category === category);
            if (categoryTemplates.length === 0) return null;

            const categoryTitles = {
              fullstack: 'Full-Stack Applications',
              frontend: 'Frontend Development',
              backend: 'Backend Services',
              mobile: 'Mobile Development',
              testing: 'Testing & QA'
            };

            return (
              <div key={category}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {categoryTitles[category as keyof typeof categoryTitles]}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {categoryTemplates.map((template) => (
                    <div
                      key={template.id}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                              {template.name}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              {template.description}
                            </p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            template.difficulty === 'beginner' 
                              ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                              : template.difficulty === 'intermediate'
                              ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300'
                              : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                          }`}>
                            {template.difficulty}
                          </span>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {template.fileStructure.length} files • {template.codeFlow.length} steps
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {template.dependencies.length} dependencies
                          </div>
                        </div>

                        <Link to={`/dashboard?template=${template.id}`}>
                          <Button className="w-full group">
                            Start Building
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Building?</h2>
          <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
            Choose a template that matches your goals and start learning with our interactive, 
            step-by-step guidance system.
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              Go to Dashboard
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};