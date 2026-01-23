import { useEffect, useRef, useState } from "react";
import { getCharactersAction } from "../actions/get-characters.actions";
import type { Character } from "../interfaces/character.interface";

export const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const charCache = useRef<Record<string, Character[]>>({});
  
  
  // Lo usamos para contar cuántas veces hemos ido a la API de verdad
  const apiCallCount = useRef(0);

  useEffect(() => {
    handleSearch("", "");
  }, []);

  const handleTermClicked = async (term: string = "", status: string = "") => {
    const cacheKey = `${term}-${status}`;

    if (charCache.current[cacheKey]) {
      setCharacters(charCache.current[cacheKey]);
      return;
    }

    try {
      setIsLoading(true);
      const chars = await getCharactersAction(term, status);
      
      // Incrementamos la persistencia
      apiCallCount.current++;
      console.log(`Peticiones realizadas a la API: ${apiCallCount.current}`);
      
      setCharacters(chars);
      charCache.current[cacheKey] = chars;
    } catch (err) {
      setError("Error al cargar personajes");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query: string, status: string = "") => {
    const cleanQuery = query.trim().toLowerCase();
    
    if (cleanQuery.length > 0 && !previousTerms.includes(cleanQuery)) {
      setPreviousTerms([cleanQuery, ...previousTerms].slice(0, 7));
    }

    const cacheKey = `${cleanQuery}-${status}`;
    
    if (charCache.current[cacheKey]) {
        setCharacters(charCache.current[cacheKey]);
        return;
    }

    try {
        setIsLoading(true);
        setError(null);
        const chars = await getCharactersAction(cleanQuery, status);
        
        // Actualizamos el valor persistente
        apiCallCount.current++;
        console.log(`Peticiones realizadas a la API: ${apiCallCount.current}`);

        setCharacters(chars);
        charCache.current[cacheKey] = chars;
    } catch (err) {
        setError("No se encontraron personajes");
        setCharacters([]);
    } finally {
        setIsLoading(false);
    }
  };

  return {
    characters,
    previousTerms,
    isLoading,
    error,
    handleSearch,
    handleTermClicked,
  };
};