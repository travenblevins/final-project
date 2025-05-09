import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import { loginUser } from "./middleware/auth.js";
import { signupUser } from "./middleware/auth.js";
import admin from "firebase-admin"; // Import Firebase Admin
import { createRequire } from "module"; // Import createRequire for dynamic JSON import
import User from "./models/User.js"; // Import the User model
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

// Connect to MongoDB
connectDB();

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

    // Check if the user exists in MongoDB, or create a new user if not
    const user = await User.findOneAndUpdate(
      { email }, // Use email as the unique identifier
      { email, displayName: name || email.split("@")[0] }, // Update user details
      { upsert: true, new: true } // Create if not found
    );

    // Generate a backend session token (this is the token you use to keep the user logged in)
    const sessionToken = generateSessionToken(user._id); // You should create a function for session token generation

    res.json({ token: sessionToken, user }); // Send the session token back to the frontend
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

    // Check if the user exists in MongoDB, or create a new user if not
    const user = await User.findOneAndUpdate(
      { email }, // Use email as the unique identifier
      { email, displayName: name || email.split("@")[0] }, // Update user details
      { upsert: true, new: true } // Create if not found
    );

    // Generate a backend session token (you could create a JWT or similar token)
    const sessionToken = generateSessionToken(user._id); // Generate session token

    res.json({ token: sessionToken, user }); // Send the session token back to the frontend
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: error.message });
  }
});

// Function to generate a session token (you can use JWT or any other token generation logic)
function generateSessionToken(userId) {
  // Example using JWT (you should install 'jsonwebtoken' if you want to use JWT)
  const jwt = require('jsonwebtoken');
  const sessionToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Use a secret stored in your env
  return sessionToken;
}

// Routes
app.use("/api/user", userRoutes);
app.use("/api/movies", moviesRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
