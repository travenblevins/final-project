require("dotenv").config(); // Loads .env variables
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Connect to MongoDB
connectDB();

// Global middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/user", require("./routes/user"));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
