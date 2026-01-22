import axios from 'axios';

export const rickMortyApi = axios.create({
    baseURL: 'https://rickandmortyapi.com/api'
});