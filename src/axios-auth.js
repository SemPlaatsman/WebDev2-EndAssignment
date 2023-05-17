import axios from 'axios';

const axiosTFFDB = axios.create({
    baseURL: 'http://localhost/'
});

const axiosCatAPI = axios.create({
    baseURL: 'https://api.thecatapi.com/v1/',
    headers: { 'X-Api-Key': import.meta.env.VITE_CAT_API_KEY }
})

export { axiosTFFDB, axiosCatAPI };