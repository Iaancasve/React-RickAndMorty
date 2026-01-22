import { useCharacters } from "./characters/hooks/useCharacters";
import { SearchBar } from "./shared/components/searchBar";

export const CharactersApp = () => {
  const { characters, handleSearch, isLoading, error } = useCharacters();

  return (
    <>
      <h1>Rick and Morty Explorer</h1>
      
      <SearchBar 
        placeholder="Busca un personaje..." 
        onQuery={handleSearch} 
      />

      { isLoading && <p className="loading-text">Cargando personajes...</p> }

      { error && <p className="error-text">{ error }</p> }

      <div className="character-grid">
        { !isLoading && characters.map((char) => (
          <div key={char.id} className="character-card">
            <img src={char.image} alt={char.name} />
            <p>{char.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};