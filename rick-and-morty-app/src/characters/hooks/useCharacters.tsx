import { useEffect, useRef, useState } from "react";
import { getCharactersAction } from "../actions/get-characters.actions";
import type { Character } from "../interfaces/character.interface";

export const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Con useRef mantenemos la referencia entre renderizados
  const charCache = useRef<Record<string, Character[]>>({});

  // Carga inicial (Requisito 1 de la práctica)
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
      setCharacters(chars);
      charCache.current[cacheKey] = chars;
    } catch (err) {
      setError("Error al cargar personajes");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query: string, status: string = "") => {
    // Comprobar si query es vacío (solo para el historial de términos previos)
    const cleanQuery = query.trim().toLowerCase();
    
    // Gestión de términos previos igual que la profesora
    if (cleanQuery.length > 0 && !previousTerms.includes(cleanQuery)) {
      setPreviousTerms([cleanQuery, ...previousTerms].slice(0, 7));
    }

    const cacheKey = `${cleanQuery}-${status}`;
    
    // Verificación de caché
    if (charCache.current[cacheKey]) {
        setCharacters(charCache.current[cacheKey]);
        return;
    }

    try {
        setIsLoading(true);
        setError(null);
        const chars = await getCharactersAction(cleanQuery, status);
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
    // Properties / Values
    characters,
    previousTerms,
    isLoading,
    error,
    // Methods / Actions
    handleSearch,
    handleTermClicked,
  };
};