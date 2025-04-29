import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import User from "../models/User.js";

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

// ✅ POST /api/user – Create or update user by Firebase UID
router.post("/", async (req, res) => {
  const { name, email } = req.body;

  try {
    const updated = await User.findOneAndUpdate(
      { uid: req.user.uid },
      { name, email, uid: req.user.uid },
      { upsert: true, new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).send("Error saving user");
  }
});

export default router;