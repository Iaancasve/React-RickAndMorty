import { useEffect, useRef, useState } from "react";
import { getCharactersAction } from "../actions/get-characters.actions";
import type { Character } from "../interfaces/character.interface";

export const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);
  
  // Añadimos estados de carga y error
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const charCache = useRef<Record<string, Character[]>>({});

  // Función interna para centralizar la carga de datos
  const fetchCharacters = async (query: string) => {
    try {
      setIsLoading(true);
      setError(null);

      if (charCache.current[query]) {
        setCharacters(charCache.current[query]);
        setIsLoading(false);
        return;
      }

      const chars = await getCharactersAction(query);
      setCharacters(chars);
      charCache.current[query] = chars;
    } catch (err) {
      setError("No se encontraron personajes o hubo un error en la API");
      setCharacters([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Carga inicial de datos al montar el componente
  useEffect(() => {
    fetchCharacters(""); 
  }, []);

  const handleTermClicked = async (term: string = "") => {
    await fetchCharacters(term);
  };

  const handleSearch = async (query: string) => {
    query = query.trim().toLowerCase();
    if (query.length === 0) return;
    
    // Evitamos duplicados en búsquedas previas
    if (!previousTerms.includes(query)) {
        setPreviousTerms([query, ...previousTerms].slice(0, 7));
    }

    await fetchCharacters(query);
  };

  return {
    // Properties
    characters,
    previousTerms,
    isLoading, 
    error,     
    // Methods
    handleSearch,
    handleTermClicked,
  };
};