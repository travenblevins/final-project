// filepath: /Users/admin/Documents/angular/final-project/server/middleware/auth.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from "../config/firebase.js"; // Import your Firebase config

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const getToken = async (email, password) => {
  try {
    const auth = getAuth(app); // Pass the initialized app to getAuth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    return token;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to retrieve token");
  }
};