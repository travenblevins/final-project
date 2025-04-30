import express from "express";
import tmdb from "../config/tmdb.js"; // Use ES Module import for tmdb

const router = express.Router();

// GET popular movies
router.get("/popular", async (req, res) => {
  try {
    const response = await tmdb.get("/movie/popular", {
      params: { page: 1 }, // You can still override/add params
    });

    res.json(response.data);
  } catch (err) {
    console.error("TMDB API error:", err.message);
    res.status(500).send("Failed to fetch popular movies");
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


export default router; // Use ES Module export
