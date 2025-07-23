import React from 'react';
import { Lightbulb, MousePointer, Eye, Search, BookOpen } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

export const QuickTips: React.FC = () => {
  const { mode } = useUser();

  const beginnerTips = [
    { icon: <MousePointer size={16} />, text: "Click on files to see their code" },
    { icon: <Eye size={16} />, text: "Follow the order numbers" },
    { icon: <Search size={16} />, text: "Check dependencies first" },
    { icon: <BookOpen size={16} />, text: "Use the glossary for terms" }
  ];

  const intermediateTips = [
    { icon: <MousePointer size={16} />, text: "Inspect file relationships" },
    { icon: <Eye size={16} />, text: "Analyze dependency patterns" },
    { icon: <Search size={16} />, text: "Review module exports/imports" },
    { icon: <BookOpen size={16} />, text: "Reference advanced concepts" }
  ];

  const tips = mode === 'beginner' ? beginnerTips : intermediateTips;

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
      <div className="flex items-center space-x-2 mb-3">
        <Lightbulb className="text-green-600 dark:text-green-400" size={18} />
        <h4 className="font-medium text-green-900 dark:text-green-400">
          Quick Tips
        </h4>
      </div>
      
      <ul className="space-y-2">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-center space-x-2 text-sm text-green-800 dark:text-green-300">
            <span className="text-green-600 dark:text-green-400">{tip.icon}</span>
            <span>• {tip.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};