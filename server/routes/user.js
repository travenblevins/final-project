import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import User from "../models/User.js";
import mongoose from "mongoose";

const router = express.Router();

router.use(verifyToken);

// Get a user
router.get("/", async (req, res) => {
  try {
    // Use the email from the decoded token (set by verifyToken middleware)
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add a movie to the interested list
router.post("/:userId/interested", async (req, res) => {
  const { movieId, title, comment } = req.body;
  console.log("Request body:", req.body);
  console.log("User ID:", req.params.userId);

  try {
    const result = await User.updateOne(
      { _id: new mongoose.Types.ObjectId(req.params.userId), "interestedMovies.movieId": { $ne: movieId } },
      {
        $push: {
          interestedMovies: { movieId, title, comment },
        },
      }
    );
    console.log("Update result:", result);
    res.sendStatus(200);
  } catch (err) {
    console.error("Error updating interestedMovies:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Add a movie to the seen list (and remove from interested)
router.post("/:userId/seen", async (req, res) => {
  const { movieId, title, rating, comment } = req.body;
  try {
    const result = await User.updateOne(
      { _id: new mongoose.Types.ObjectId(req.params.userId) },
      {
        $pull: { interestedMovies: { movieId } },
        $push: {
          seenMovies: { movieId, title, rating, comment },
        },
      }
    );
    console.log("Update result:", result);
    res.sendStatus(200);
  } catch (err) {
    console.error("Error updating seenMovies:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Remove a movie from the interested list
router.delete("/:userId/interested", async (req, res) => {
  const { movieId } = req.body;
  try {
    const result = await User.updateOne(
      { _id: new mongoose.Types.ObjectId(req.params.userId) },
      { $pull: { interestedMovies: { movieId } } }
    );
    console.log("Update result:", result);
    res.sendStatus(200);
  } catch (err) {
    console.error("Error removing from interestedMovies:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Remove a movie from the seen list
router.delete("/:userId/seen", async (req, res) => {
  const { movieId } = req.body;
  try {
    const result = await User.updateOne(
      { _id: new mongoose.Types.ObjectId(req.params.userId) },
      { $pull: { seenMovies: { movieId } } }
    );
    console.log("Update result:", result);
    res.sendStatus(200);
  } catch (err) {
    console.error("Error removing from seenMovies:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;