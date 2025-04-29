const express = require('express');
const router = express.Router();
const tmdb = require('../config/tmdb');

// GET /api/movies/popular
router.get('/popular', async (req, res) => {
  try {
    const response = await tmdb.get('/movie/popular', {
      params: { page: 1 } // You can still override/add params
    });

    res.json(response.data);
  } catch (err) {
    console.error('TMDB API error:', err.message);
    res.status(500).send('Failed to fetch popular movies');
  }
});

module.exports = router;
