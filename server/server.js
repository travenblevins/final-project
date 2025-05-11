import "dotenv/config";
import express from "express";
import cors from "cors";
import { loginUser } from "./middleware/auth.js";
import { signupUser } from "./middleware/auth.js";
import admin from "firebase-admin"; // Import Firebase Admin
import { createRequire } from "module"; // Import createRequire for dynamic JSON import
import db from "./config/firebase.js"; // Import Firestore instance
import moviesRoutes from "./routes/movies.js"; // Import movies routes
import userRoutes from "./routes/user.js";

const require = createRequire(import.meta.url);
const serviceAccount = require("./config/serviceAccountKey.json"); // Dynamically load JSON

const app = express();

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Global middleware
app.use(cors());
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Login with Firebase ID token
app.post("/api/auth/login", async (req, res) => {
  const { token } = req.body; // Receive Firebase ID token from the frontend
  try {
    // Verify the Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { email, name } = decodedToken;

    // Check if the user exists in Firestore
    const { name } = decodedToken;
    const userRef = db.collection("users").doc(email);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      // Create a new user if not found
      await userRef.set({
        email,
        displayName: name || email.split("@")[0],
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    } else {
      // Update user details if already exists
      await userRef.update({
        displayName: name || email.split("@")[0],
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    const user = (await userRef.get()).data(); // Fetch the updated user data
    res.json({ token, user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: error.message });
  }
});

// Signup (if you need a signup endpoint, similar to login)
app.post("/api/auth/signup", async (req, res) => {
  const { token } = req.body; // Receive Firebase ID token from the frontend
  try {
    // Verify the Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { email, name } = decodedToken;

    // Check if the user exists in Firestore
    const { name } = decodedToken;
    const userRef = db.collection("users").doc(email);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      // Create a new user if not found
      await userRef.set({
        email,
        displayName: name || email.split("@")[0],
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    } else {
      // Update user details if already exists
      await userRef.update({
        displayName: name || email.split("@")[0],
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    const user = (await userRef.get()).data(); // Fetch the updated user data
    res.json({ token, user });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: error.message });
  }
});

// Routes
app.use("/api/user", userRoutes);
app.use("/api/movies", moviesRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
