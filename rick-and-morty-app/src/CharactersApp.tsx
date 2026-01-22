import { useCharacters } from "./characters/hooks/useCharacters";
import { SearchBar } from "../src/shared/components/searchBar";

export const CharactersApp = () => {
  const { characters, handleSearch } = useCharacters();

  return (
    <>
      <h1>Rick and Morty Explorer</h1>
      
      <SearchBar 
        placeholder="Busca un personaje (ej. Rick, Morty...)" 
        onQuery={handleSearch} 
      />

      <div className="character-grid">
        {characters.map((char) => (
          <div key={char.id} className="character-card">
            <img src={char.image} alt={char.name} />
            <p>{char.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};