import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import User from "../models/User.js";
import Interaction from "../models/Interaction.js";

const router = express.Router();

router.use(verifyToken);

// Get a user
router.get("/", async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.user.uid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Create or update an interaction
router.post("/movies/interact", async (req, res) => {
  const { userId, movieId, rating, comment, seen, interested } = req.body;

  try {
    // Find and update the interaction, or create it if it doesn't exist
    const interaction = await Interaction.findOneAndUpdate(
      { userId, movieId }, // Query to find the interaction
      { rating, comment, seen, interested }, // Fields to update
      { upsert: true, new: true } // Create if not found, return the updated document
    );

    res.json(interaction);
  } catch (error) {
    console.error("Error creating/updating interaction:", error.message);
    res.status(500).json({ message: "Failed to create or update interaction" });
  }
});

export default router;