import type { Character } from "../interfaces/character.interface";

interface Props {
  character: Character | null;
}

export const CharacterDetail = ({ character }: Props) => {
  // Si no hay personaje seleccionado, no mostramos nada
  if (!character) return <div className="detail-placeholder">Selecciona un personaje para ver su detalle</div>;

  return (
    <div className="character-detail-card">
      <h2>Detalle del Personaje</h2>
      <img src={character.image} alt={character.name} />
      <div className="detail-info">
        <h3>{character.name}</h3>
        <p><strong>Estado:</strong> {character.status}</p>
        <p><strong>Especie:</strong> {character.species}</p>
        <p><strong>Ubicación:</strong> {character.location.name}</p>
      </div>
    </div>
  );
};