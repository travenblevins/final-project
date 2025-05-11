import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "../config/firebase.js"; // Import the correct Firebase client config
import { createUserWithEmailAndPassword } from "firebase/auth";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Login function to get token
export const loginUser = async (email, password) => {
  try {
    const auth = getAuth(app);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    return token;
  } catch (error) {
    console.error("Error in loginUser:", error.code, error.message);
    throw new Error("Failed to retrieve token");
  }
};

// Signup function to create a new user and get token
export const signupUser = async (email, password) => {
  try {
    const auth = getAuth(app);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    return token;
  } catch (error) {
    console.error("Error in signupUser:", error);
    throw new Error("Failed to sign up user");
  }
};