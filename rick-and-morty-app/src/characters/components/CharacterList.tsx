import type { Character } from "../interfaces/character.interface";

interface Props {
  characters: Character[];
  onCharacterSelected: (char: Character) => void;
}

export const CharacterList = ({ characters, onCharacterSelected }: Props) => {
  return (
    <div className="character-grid">
      {characters.map((char) => (
        <div 
          key={char.id} 
          className="character-card"
          onClick={() => onCharacterSelected(char)}
        >
          <img src={char.image} alt={char.name} />
          <p>{char.name}</p>
          <p>{char.status} {char.species}</p>
        </div>
      ))}
    </div>
  );
};