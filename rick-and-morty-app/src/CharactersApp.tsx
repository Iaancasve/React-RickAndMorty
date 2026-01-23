import { useState } from "react";
import { CharacterList } from "./characters/components/CharacterList";
import { CharacterDetail } from "./characters/components/CharacterDetail";
import { StatusFilters } from "./characters/components/StatusFilters";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/searchBar";
import { useCharacters } from "./characters/hooks/useCharacters";
import { PreviousSearches } from "./characters/components/PreviousSearch";
import type { Character } from "./characters/interfaces/character.interface";

export const CharactersApp = () => {
  
  const { 
    characters, 
    previousTerms, 
    handleSearch, 
    handleTermClicked,
    loadNextPage, 
    isLoading,
    error 
  } = useCharacters();

  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  return (
    <div className="app-container">
      <div className="main-content">
        
        <CustomHeader 
          title="Rick and Morty Explorer"
          description="Encuentra a tus personajes favoritos de la serie"
        />

        <SearchBar
          placeholder="Busca un personaje..."
          onQuery={handleSearch}
        />

        <PreviousSearches 
          searches={previousTerms} 
          onLabelClicked={handleTermClicked} 
        />
        
        <StatusFilters 
          onStatusChange={(status) => handleSearch('', status)} 
          currentStatus="" 
        />

        { isLoading && <p className="loading-text">Cargando...</p> }
        { error && <p className="error-text">{ error }</p> }

        <CharacterList 
          characters={characters} 
          onCharacterSelected={setSelectedCharacter}
        />

        { !isLoading && characters.length > 0 && (
          <button className="load-more-btn" onClick={loadNextPage}>
            Cargar más personajes
          </button>
        )}
      </div>

      <aside className="sidebar">
        <CharacterDetail character={selectedCharacter} />
      </aside>
    </div>
  );
};