import { useCharacters } from "./characters/hooks/useCharacters";

export const CharactersApp = () => {
  // Usamos el hook 
  const { characters, handleSearch } = useCharacters();

  return (
    <>
      <h1>Rick and Morty App</h1>
      
      {/* Botón temporal para probar que la API funciona */}
      <button onClick={() => handleSearch('rick')}>
        Probar búsqueda (Rick)
      </button>

      <ul>
        {characters.map(char => (
          <li key={char.id}>{char.name}</li>
        ))}
      </ul>
    </>
  );
};