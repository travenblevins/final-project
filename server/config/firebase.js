const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
};

export default firebaseConfig;

export const initializeFirebase = async () => {
    const { initializeApp } = await import("firebase/app");
    const { getAnalytics } = await import("firebase/analytics");

    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    return { app, analytics };
};