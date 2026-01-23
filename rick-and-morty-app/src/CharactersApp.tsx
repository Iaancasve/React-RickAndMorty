import { useState } from "react";
import { useCharacters } from "./characters/hooks/useCharacters";
import { SearchBar } from "./shared/components/searchBar";
import { StatusFilters } from "./characters/components/StatusFilters";

export const CharactersApp = () => {
  const { characters, handleSearch, isLoading, error } = useCharacters();
  const [filterStatus, setFilterStatus] = useState('');
  const [currentName, setCurrentName] = useState('');

  const onSearchQuery = (name: string) => {
    setCurrentName(name);
    handleSearch(name, filterStatus); // Combinamos nombre y filtro
  };

  const onStatusChange = (status: string) => {
    setFilterStatus(status);
    handleSearch(currentName, status); // Combinamos nombre y filtro
  };

  return (
    <>
      <h1>Rick and Morty Explorer</h1>
      
      <SearchBar 
        placeholder="Busca un personaje..." 
        onQuery={onSearchQuery} 
      />

      <StatusFilters 
        currentStatus={filterStatus}
        onStatusChange={onStatusChange}
      />

      { isLoading && <p className="loading-text">Cargando personajes...</p> }
      { error && <p className="error-text">{ error }</p> }

      <div className="character-grid">
        { !isLoading && characters.map((char) => (
          <div key={char.id} className="character-card">
            <img src={char.image} alt={char.name} />
            <p>{char.name}</p>
            <small style={{display: 'block', paddingBottom: '10px'}}>
               {char.status} - {char.species}
            </small>
          </div>
        ))}
      </div>
    </>
  );
};