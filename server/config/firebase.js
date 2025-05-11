import admin from "firebase-admin";
import { createRequire } from "module";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" }); // Load environment variables

const require = createRequire(import.meta.url);
const serviceAccount = require("./serviceAccountKey.json"); // Import Firebase Admin SDK credentials

// Firebase client configuration
export const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase Admin
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`, // Optional: For Realtime Database
    });
}

// Initialize Firestore
const db = admin.firestore();

export default db;