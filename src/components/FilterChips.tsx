import React from 'react';

interface FilterChipsProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export const FilterChips: React.FC<FilterChipsProps> = ({
  label,
  options,
  selected,
  onChange,
}) => {
  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(item => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">{label}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => toggleOption(option)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
              selected.includes(option)
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};