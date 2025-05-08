import admin from "firebase-admin";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const serviceAccount = require("../config/serviceAccountKey.json");

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}


const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = { email: decodedToken.email }; // Attach email to req.user
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

export default verifyToken;