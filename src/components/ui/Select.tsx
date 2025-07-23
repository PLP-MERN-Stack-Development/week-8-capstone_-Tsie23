import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({ 
  options, 
  value, 
  onChange, 
  placeholder = "Select an option",
  className 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className={clsx('relative', className)} ref={selectRef}>
      <button
        type="button"
        className="relative w-full cursor-pointer rounded-lg bg-white dark:bg-gray-800 py-3 pl-4 pr-10 text-left shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:ring-gray-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="block truncate text-gray-900 dark:text-white">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronDown
            className={clsx(
              'h-5 w-5 text-gray-400 transition-transform',
              isOpen && 'transform rotate-180'
            )}
          />
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {options.map((option) => (
            <div
              key={option.value}
              className={clsx(
                'relative cursor-pointer select-none py-2 pl-4 pr-4 hover:bg-gray-100 dark:hover:bg-gray-700',
                value === option.value && 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
              )}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              <span className="block truncate font-medium">{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};