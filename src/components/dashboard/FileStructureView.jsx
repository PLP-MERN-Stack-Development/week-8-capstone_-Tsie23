import React, { useState } from 'react';
import { ChevronRight, ChevronDown, File, Folder, Info } from 'lucide-react';
import { Tooltip } from '../ui/Tooltip';
import { Modal } from '../ui/Modal';
import { useUser } from '../../contexts/UserContext';

export const FileStructureView = ({ files, templateId }) => {
  const [expandedFolders, setExpandedFolders] = useState(new Set(['root']));
  const [selectedFile, setSelectedFile] = useState(null);
  const [completedFiles, setCompletedFiles] = useState(new Set());
  const { mode, user, updateProgress, getUserProgress } = useUser();

  React.useEffect(() => {
    if (templateId && user) {
      const progress = getUserProgress(templateId);
      if (progress) {
        setCompletedFiles(new Set(progress.completedSteps));
      }
    }
  }, [templateId, user, getUserProgress]);

  const toggleFileCompletion = (fileId) => {
    if (!user || !templateId) return;
    
    const newCompleted = new Set(completedFiles);
    if (newCompleted.has(fileId)) {
      newCompleted.delete(fileId);
    } else {
      newCompleted.add(fileId);
    }
    
    setCompletedFiles(newCompleted);
    updateProgress(templateId, Array.from(newCompleted));
  };

  const toggleFolder = (nodeId) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedFolders(newExpanded);
  };

  const renderFileNode = (node, depth = 0) => {
    const isExpanded = expandedFolders.has(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const isCompleted = completedFiles.has(node.id);

    return (
      <div key={node.id} className="select-none">
        <div 
          className={`flex items-center py-2 px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors ${
            isCompleted ? 'bg-green-50 dark:bg-green-900/20' : ''
          }`}
          style={{ paddingLeft: `${depth * 20 + 8}px` }}
          onClick={() => {
            if (node.type === 'folder' && hasChildren) {
              toggleFolder(node.id);
            } else if (node.type === 'file') {
              setSelectedFile(node);
            }
          }}
        >
          <div className="flex items-center space-x-2 flex-1">
            {node.type === 'folder' && hasChildren && (
              <>
                {isExpanded ? (
                  <ChevronDown size={16} className="text-gray-500" />
                ) : (
                  <ChevronRight size={16} className="text-gray-500" />
                )}
              </>
            )}
            
            <div className="flex items-center space-x-2">
              {node.type === 'folder' ? (
                <Folder size={16} className="text-blue-500" />
              ) : (
                <File size={16} className="text-gray-500" />
              )}
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {node.name}
              </span>
              <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                {node.order}
              </span>
              {user && node.type === 'file' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFileCompletion(node.id);
                  }}
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                    isCompleted 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
                  }`}
                >
                  {isCompleted && <span className="text-xs">✓</span>}
                </button>
              )}
            </div>
          </div>

          <Tooltip content={mode === 'beginner' ? node.description : `${node.description} (${node.tool})`}>
            <Info size={14} className="text-gray-400 hover:text-blue-500" />
          </Tooltip>
        </div>

        {node.type === 'folder' && hasChildren && isExpanded && (
          <div>
            {node.children.map(child => renderFileNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Project File Structure
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {mode === 'beginner' 
              ? `Numbers show the order files should be created. Click files to see their code and purpose.${user ? ' Check off files as you complete them!' : ''}`
              : `File creation order with dependencies. Click for boilerplate code.${user ? ' Track your progress with checkboxes.' : ''}`}
          </p>
        </div>

        <div className="space-y-1">
          {files.map(file => renderFileNode(file))}
        </div>

        {mode === 'beginner' && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 dark:text-blue-400 mb-1">💡 Tip</h4>
            <p className="text-xs text-blue-800 dark:text-blue-300">
              Start with configuration files (package.json) before creating source files. This ensures dependencies are available when needed.
              {user && ' Sign in to track your progress and save your learning journey!'}
            </p>
          </div>
        )}
      </div>

      {/* File Details Modal */}
      {selectedFile && (
        <Modal
          isOpen={!!selectedFile}
          onClose={() => setSelectedFile(null)}
          title={selectedFile.name}
          size="lg"
        >
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Description</h4>
              <p className="text-gray-600 dark:text-gray-400">{selectedFile.description}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Tool/Platform</h4>
              <span className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-sm">
                {selectedFile.tool}
              </span>
            </div>

            {selectedFile.boilerplate && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Boilerplate Code</h4>
                <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                  <code className="text-gray-800 dark:text-gray-200">
                    {selectedFile.boilerplate}
                  </code>
                </pre>
              </div>
            )}

            {(selectedFile.imports || selectedFile.exports) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedFile.imports && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Imports</h4>
                    <div className="space-y-1">
                      {selectedFile.imports.map((imp, index) => (
                        <span key={index} className="block text-sm text-red-600 dark:text-red-400">
                          ← {imp}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedFile.exports && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Exports</h4>
                    <div className="space-y-1">
                      {selectedFile.exports.map((exp, index) => (
                        <span key={index} className="block text-sm text-green-600 dark:text-green-400">
                          → {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};