import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Buscar...",
  value,
  onChange,
  className = ''
}) => {
  return (
    <div className={`relative flex-1 max-w-md ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-gray w-5 h-5" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full bg-dark-light border border-dark-border rounded-lg pl-10 pr-4 py-2 text-light placeholder-light-gray focus:outline-none focus:border-primary"
      />
    </div>
  );
};

export default SearchBar;