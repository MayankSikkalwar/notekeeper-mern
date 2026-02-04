// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDL3jUbsoULMwA76GoEynP7YVfrBJ940LQ",
  authDomain: "notekeeper-527d1.firebaseapp.com",
  projectId: "notekeeper-527d1",
  storageBucket: "notekeeper-527d1.firebasestorage.app",
  messagingSenderId: "958659476562",
  appId: "1:958659476562:web:1916ba7c537763de82b38b",
  measurementId: "G-4VZVJSP0YG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Analytics is optional; guard for environments where it's unavailable.
let analytics;
try {
  analytics = getAnalytics(app);
} catch (error) {
  analytics = null;
}

export { app, auth, googleProvider, analytics };
