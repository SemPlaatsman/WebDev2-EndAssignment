import axios from 'axios';

const axiosMySQL = axios.create({
    baseURL: 'http://localhost/'
});

const axiosCatAPI = axios.create({
    baseURL: 'https://api.thecatapi.com/v1/',
    headers: { 'X-Api-Key': 'live_JK88rjTccdUAGChLDEGxkv0szRwkhweRzXbbNQEaAkvtGyg6vKjpObtUEom7FRHO' }
})

export { axiosMySQL, axiosCatAPI };