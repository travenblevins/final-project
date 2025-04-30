import express from "express";
import tmdb from "../config/tmdb.js"; // Use ES Module import for tmdb

const router = express.Router();

// GET top-rated movies
router.get("/top-rated", async (req, res) => {
  try {
    const response = await tmdb.get("/movie/top_rated", {
      params: { page: 1 },
    });

    res.json(response.data);
  } catch (err) {
    console.error("TMDB API error for top-rated movies:", err.message);
    res.status(500).send("Failed to fetch top-rated movies");
  }
});

// GET movie details by ID
router.get("/movie/:id", async (req, res) => {
  const movieId = req.params.id;

  try {
    const response = await tmdb.get(`/movie/${movieId}`);

    res.json(response.data);
  } catch (err) {
    console.error(`TMDB API error for movie ID ${movieId}:`, err.message);
    res.status(500).send("Failed to fetch movie details");
  }
});

// Search movies
router.get("/search", async (req, res) => {
  const query = req.query.q;
  console.log("Search query:", query);

  if (!query) {
    return res.status(400).send("Query parameter 'q' is required");
  }

  try {
    const response = await tmdb.get("/search/movie", {
      params: { query, page: 1 },
    });

    res.json(response.data);
  } catch (err) {
    console.error("TMDB API error during search:", err.message);
    res.status(500).send("Failed to search movies");
  }
});


export default router; // Use ES Module export
