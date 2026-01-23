import { useEffect, useState, type KeyboardEvent, useRef } from "react";

interface Props {
  placeholder?: string;
  onQuery: (query: string) => void;
}

export const SearchBar = ({ placeholder = "Buscar", onQuery }: Props) => {
  const [query, setQuery] = useState('');
  
  
  const inputRef = useRef<HTMLInputElement>(null);

  
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  
  useEffect(() => {
    if (query.trim().length === 0) return; 

    const timeoutId = setTimeout(() => {
      onQuery(query);
      
      setQuery(""); 
    }, 700);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query, onQuery]);

  const handleSearch = () => {
    if (query.trim().length === 0) return;
    onQuery(query);
    setQuery("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};