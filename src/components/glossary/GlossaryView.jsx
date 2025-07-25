import React, { useState } from 'react';
import { Search, BookOpen, Tag } from 'lucide-react';
import { glossaryTerms, searchTerms, getTermsByCategory } from '../../data/glossaryTerms';
import { useUser } from '../../contexts/UserContext';

export const GlossaryView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedTerm, setExpandedTerm] = useState(null);
  const { mode } = useUser();

  const categories = ['all', 'Frontend', 'Backend', 'Database', 'General'];

  const filteredTerms = React.useMemo(() => {
    let terms = searchQuery ? searchTerms(searchQuery) : glossaryTerms;
    
    if (selectedCategory !== 'all') {
      terms = terms.filter(term => term.category === selectedCategory);
    }
    
    return terms.sort((a, b) => a.term.localeCompare(b.term));
  }, [searchQuery, selectedCategory]);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
          <BookOpen className="mr-2" size={20} />
          Programming Glossary
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {mode === 'beginner' 
            ? "Essential programming terms explained in simple language. Click any term to see examples and related concepts."
            : "Comprehensive reference of programming terminology and concepts."}
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search terms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
      </div>

      {/* Terms List */}
      <div className="space-y-3">
        {filteredTerms.map((term) => (
          <div
            key={term.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
          >
            <button
              className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-800 transition-colors"
              onClick={() => setExpandedTerm(expandedTerm === term.id ? null : term.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <h4 className="text-base font-medium text-gray-900 dark:text-white">
                    {term.term}
                  </h4>
                  <span className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full">
                    <Tag size={12} className="mr-1" />
                    {term.category}
                  </span>
                </div>
                <div className={`transform transition-transform ${expandedTerm === term.id ? 'rotate-180' : ''}`}>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </button>

            {expandedTerm === term.id && (
              <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
                <div className="pt-3 space-y-3">
                  <p className="text-gray-600 dark:text-gray-400">
                    {term.definition}
                  </p>

                  {term.examples && (
                    <div>
                      <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Examples:</h5>
                      <div className="space-y-1">
                        {term.examples.map((example, index) => (
                          <pre key={index} className="text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded font-mono">
                            <code className="text-gray-800 dark:text-gray-200">{example}</code>
                          </pre>
                        ))}
                      </div>
                    </div>
                  )}

                  {term.relatedTerms && (
                    <div>
                      <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Related Terms:</h5>
                      <div className="flex flex-wrap gap-1">
                        {term.relatedTerms.map((relatedTerm, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-blue-100 dark:hover:bg-blue-900/20 cursor-pointer transition-colors"
                            onClick={() => setSearchQuery(relatedTerm)}
                          >
                            {relatedTerm}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <div className="text-center py-8">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500 dark:text-gray-400">
            No terms found matching your search.
          </p>
        </div>
      )}
    </div>
  );
};