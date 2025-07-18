import React, { useState } from 'react';
import { ChevronDown, Database, Layout, Flame, Code, Layers } from 'lucide-react';

const iconMap = {
  Database,
  Layout,
  Flame,
  Code,
  Layers
};

function ProjectSelector({
  projectTypes,
  selectedProject,
  onProjectSelect,
  isBeginnerMode
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = projectTypes.find(p => p.id === selectedProject);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg px-4 py-3 flex items-center justify-between transition-colors"
      >
        <div className="flex items-center space-x-3">
          {selected && (
            <>
              {React.createElement(iconMap[selected.icon], {
                className: "w-5 h-5 text-gray-400"
              })}
              <div className="text-left">
                <div className="text-white font-medium">{selected.name}</div>
                {isBeginnerMode && (
                  <div className="text-gray-400 text-sm">{selected.description}</div>
                )}
              </div>
            </>
          )}
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10">
          {projectTypes.map((project) => {
            const Icon = iconMap[project.icon];
            return (
              <button
                key={project.id}
                onClick={() => {
                  onProjectSelect(project.id);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 hover:bg-gray-700 transition-colors flex items-center space-x-3 text-left"
              >
                <Icon className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <div className="text-white font-medium">{project.name}</div>
                  <div className="text-gray-400 text-sm">{project.description}</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-900 text-gray-300 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProjectSelector;