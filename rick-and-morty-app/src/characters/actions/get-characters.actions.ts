import { rickMortyApi } from '../api/rickmorty.api';
import type { Character } from '../interfaces/character.interface';

export const getCharactersAction = async (name: string = '', status: string = '',): Promise<Character[]> => {
    
    const response = await rickMortyApi.get('/character', {
        params: {
            name: name,
            status: status,
        }
    });

    // Mapeamos los datos para limpiar la respuesta
    return response.data.results.map((char: any) => ({
        id: char.id,
        name: char.name,
        status: char.status,
        species: char.species,
        image: char.image,
        location: char.location
    }));
};