import { useEffect, useState, type KeyboardEvent, useRef } from "react";

interface Props {
  placeholder?: string;
  onQuery: (query: string) => void;
}

export const SearchBar = ({ placeholder = "Buscar", onQuery }: Props) => {
  const [query, setQuery] = useState('');
  
  // Añadimos useRef para cumplir el requisito 4 de la práctica: Foco automático
  const inputRef = useRef<HTMLInputElement>(null);

  // Requisito 4: Enfoque automático sin provocar re-renders innecesarios
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Lógica de la profesora: Debouncer para buscar automáticamente
  useEffect(() => {
    if (query.trim().length === 0) return; // Evitamos búsquedas vacías automáticas

    const timeoutId = setTimeout(() => {
      onQuery(query);
      // Nota: Si quieres que el texto NO se borre mientras escribes, 
      // podrías comentar la siguiente línea, pero la pongo porque así lo tiene ella.
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