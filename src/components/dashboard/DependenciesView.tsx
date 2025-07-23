import React from 'react';
import { ArrowRight, Link2, Database, Code, Layers } from 'lucide-react';
import { Dependency } from '../../types';
import { useUser } from '../../contexts/UserContext';

interface DependenciesViewProps {
  dependencies: Dependency[];
}

export const DependenciesView: React.FC<DependenciesViewProps> = ({ dependencies }) => {
  const { mode } = useUser();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'import':
        return <Code size={16} className="text-blue-500" />;
      case 'component':
        return <Layers size={16} className="text-green-500" />;
      case 'api':
        return <Link2 size={16} className="text-purple-500" />;
      case 'data':
        return <Database size={16} className="text-orange-500" />;
      default:
        return <ArrowRight size={16} className="text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'import':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300';
      case 'component':
        return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300';
      case 'api':
        return 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300';
      case 'data':
        return 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          File Dependencies
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {mode === 'beginner' 
            ? "Visual map showing which files depend on each other. Follow the arrows to understand connections."
            : "Dependency graph showing imports, API calls, and data flow between modules."}
        </p>
      </div>

      <div className="space-y-4">
        {dependencies.map((dep, index) => (
          <div key={index} className="relative">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-mono bg-white dark:bg-gray-800 px-2 py-1 rounded border text-gray-700 dark:text-gray-300">
                    {dep.from}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-1">
                {getTypeIcon(dep.type)}
                <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(dep.type)}`}>
                  {dep.type}
                </span>
                <ArrowRight size={16} className="text-gray-400" />
              </div>

              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-mono bg-white dark:bg-gray-800 px-2 py-1 rounded border text-gray-700 dark:text-gray-300">
                    {dep.to}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-2 pl-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {dep.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {mode === 'beginner' && (
        <div className="mt-6 space-y-3">
          <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <h4 className="text-sm font-medium text-purple-900 dark:text-purple-400 mb-1">🔗 Dependency Types</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center space-x-1">
                <Code size={12} className="text-blue-500" />
                <span className="text-purple-800 dark:text-purple-300">Import: File imports another</span>
              </div>
              <div className="flex items-center space-x-1">
                <Layers size={12} className="text-green-500" />
                <span className="text-purple-800 dark:text-purple-300">Component: Uses React component</span>
              </div>
              <div className="flex items-center space-x-1">
                <Link2 size={12} className="text-purple-500" />
                <span className="text-purple-800 dark:text-purple-300">API: Makes server requests</span>
              </div>
              <div className="flex items-center space-x-1">
                <Database size={12} className="text-orange-500" />
                <span className="text-purple-800 dark:text-purple-300">Data: Shares data/state</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};