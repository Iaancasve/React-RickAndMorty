import { useEffect, useRef, useState } from "react";
import { getCharactersAction } from "../actions/get-characters.actions";
import type { Character } from "../interfaces/character.interface";

export const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [currentParams, setCurrentParams] = useState({ query: "", status: "" });

  const charCache = useRef<Record<string, Character[]>>({});
  
  // Lo usamos para contar cuántas veces hemos ido a la API de verdad
  const apiCallCount = useRef(0);

  useEffect(() => {
    handleSearch("", "");
  }, []);

  const handleTermClicked = async (term: string = "", status: string = "") => {
    handleSearch(term, status);
  };

  const handleSearch = async (query: string, status: string = "") => {
    const cleanQuery = query.trim().toLowerCase();
    
    // Gestión de términos previos (historial)
    if (cleanQuery.length > 0 && !previousTerms.includes(cleanQuery)) {
      setPreviousTerms([cleanQuery, ...previousTerms].slice(0, 7));
    }

    // Al buscar de nuevo, reseteamos a la página 1 y guardamos los parámetros actuales
    setPage(1);
    setCurrentParams({ query: cleanQuery, status });

    const cacheKey = `${cleanQuery}-${status}-p1`;
    
    if (charCache.current[cacheKey]) {
        setCharacters(charCache.current[cacheKey]);
        return;
    }

    try {
        setIsLoading(true);
        setError(null);
        const chars = await getCharactersAction(cleanQuery, status, 1);
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


  const loadNextPage = async () => {
    if (isLoading) return; 

    const nextPage = page + 1;
    const { query, status } = currentParams;

    try {
      setIsLoading(true);
      const newChars = await getCharactersAction(query, status, nextPage);
      
      apiCallCount.current++;
      console.log(`Peticiones realizadas a la API (Paginación): ${apiCallCount.current}`);

    
      setCharacters(prev => [...prev, ...newChars]);
      setPage(nextPage);
    } catch (err) {
      console.error("No se pudieron cargar más personajes");
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
    loadNextPage, 
  };
};