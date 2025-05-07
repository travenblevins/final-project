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

// Login
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await loginUser(email, password);

    // Decode the token to get user details
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Check if the user exists in MongoDB
    const { uid, name } = decodedToken;
    const user = await User.findOneAndUpdate(
      { uid },
      { email, displayName: name || email.split("@")[0], uid },
      { upsert: true, new: true }
    );

    res.json({ token, user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: error.message });
  }
});

// Signup
app.post("/api/auth/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await signupUser(email, password);

    // Decode the token to get user details
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Check if the user exists in MongoDB
    const { uid, name } = decodedToken;
    const user = await User.findOneAndUpdate(
      { uid },
      { email, displayName: name || email.split("@")[0], uid },
      { upsert: true, new: true }
    );

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