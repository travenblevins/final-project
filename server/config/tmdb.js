// server/config/tmdb.js
import axios from 'axios';

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3', // TMDB base URL
  params: {
    api_key: process.env.TMDB_API_KEY,      // Always include API key
    language: 'en-US'                       // Default language
  },
  timeout: 5000                             // Optional: 5 second timeout
});

module.exports = tmdb;
