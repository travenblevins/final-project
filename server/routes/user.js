import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import db from "../config/firebase.js"; // Import Firestore instance
import admin from "firebase-admin"; // For Firestore FieldValue operations

const router = express.Router();

router.use(verifyToken);

// Get a user
router.get("/", async (req, res) => {
  try {
    const userDoc = await db.collection("users").doc(req.user.email).get();
    if (!userDoc.exists) {
      console.log("User document does not exist:", req.user.email);
      return res.status(404).json({ message: "User not found" });
    }
    console.log("User document data:", userDoc.data());
    res.json(userDoc.data());
  } catch (error) {
    console.error("Error fetching user document:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add a movie to the interested list
router.post("/:userId/interested", async (req, res) => {
  const { movieId, title, comment } = req.body;

  try {
    const userRef = db.collection("users").doc(req.params.userId);
    const interestedMoviesRef = userRef.collection("interestedMovies");

    // Use movieId as the document ID
    await interestedMoviesRef.doc(movieId).set({
      title,
      comment,
      addedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({ message: "Movie added to interested list." });
  } catch (err) {
    console.error("Error adding to interestedMovies:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Add a movie to the seen list
router.post("/:userId/seen", async (req, res) => {
  const { movieId, title, rating, comment } = req.body;

  try {
    const userRef = db.collection("users").doc(req.params.userId);
    const seenMoviesRef = userRef.collection("seenMovies");

    // Use movieId as the document ID
    await seenMoviesRef.doc(movieId).set({
      title,
      rating,
      comment,
      addedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({ message: "Movie added to seen list." });
  } catch (err) {
    console.error("Error adding to seenMovies:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Delete a movie from the interested list
router.delete("/:userId/interested/:movieId", async (req, res) => {
  const { userId, movieId } = req.params;

  console.log(`Deleting movie with movieId: ${movieId} from user: ${userId}`); // Debugging log

  try {
    const userRef = db.collection("users").doc(userId);
    const interestedMoviesRef = userRef.collection("interestedMovies");

    // Directly delete the document by its ID
    const movieDoc = await interestedMoviesRef.doc(movieId).get();

    if (!movieDoc.exists) {
      console.log("Movie document does not exist:", movieId);
      return res.status(404).json({ message: "Movie not found in interested list." });
    }

    await interestedMoviesRef.doc(movieId).delete();

    res.status(200).json({ message: "Movie removed from interested list." });
  } catch (err) {
    console.error("Error removing from interestedMovies:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Delete a movie from the seen list
router.delete("/:userId/seen/:movieId", async (req, res) => {
  const { userId, movieId } = req.params;

  console.log(`Deleting movie with movieId: ${movieId} from user: ${userId}`); // Debugging log

  try {
    const userRef = db.collection("users").doc(userId);
    const seenMoviesRef = userRef.collection("seenMovies");

    // Directly delete the document by its ID
    const movieDoc = await seenMoviesRef.doc(movieId).get();

    if (!movieDoc.exists) {
      console.log("Movie document does not exist:", movieId);
      return res.status(404).json({ message: "Movie not found in seen list." });
    }

    await seenMoviesRef.doc(movieId).delete();

    res.status(200).json({ message: "Movie removed from seen list." });
  } catch (err) {
    console.error("Error removing from seenMovies:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Get movies from both subcollections (interestedMovies and seenMovies)
router.get("/:userId/movies", async (req, res) => {
  const { userId } = req.params;

  try {
    const userRef = db.collection("users").doc(userId);

    // Fetch interestedMovies
    const interestedMoviesSnapshot = await userRef.collection("interestedMovies").get();
    const interestedMovies = interestedMoviesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Fetch seenMovies
    const seenMoviesSnapshot = await userRef.collection("seenMovies").get();
    const seenMovies = seenMoviesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({ interestedMovies, seenMovies });
  } catch (err) {
    console.error("Error fetching movies:", err.message);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});


export default router;