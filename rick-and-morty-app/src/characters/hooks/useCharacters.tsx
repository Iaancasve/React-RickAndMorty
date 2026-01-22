import { useRef, useState } from "react";
import { getCharactersAction } from "../actions/get-characters.actions";
import type { Character } from "../interfaces/character.interface";

export const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  // Con useRef mantenemos la referencia entre renderizados (no se pierde al hacer rerender)
  const charCache = useRef<Record<string, Character[]>>({});

  const handleTermClicked = async (term: string = "") => {
    if (charCache.current[term]) {
      setCharacters(charCache.current[term]);
      return;
    }
    const chars = await getCharactersAction(term);
    setCharacters(chars);
  };

  const handleSearch = async (query: string) => {
    // Comprobar si query es vacío
    query = query.trim().toLowerCase();
    if (query.length === 0) return;

    // Comprobar si el término ya existe en previousTerms
    if (previousTerms.includes(query)) return;
    
    // Mantenemos los últimos 7 términos
    setPreviousTerms([query, ...previousTerms].slice(0, 7));

    const chars = await getCharactersAction(query);
    setCharacters(chars);

    // Guardar en caché
    charCache.current[query] = chars;
  };

  return {
    // Properties / Values
    characters,
    previousTerms,
    // Methods / Actions
    handleSearch,
    handleTermClicked,
  };
};