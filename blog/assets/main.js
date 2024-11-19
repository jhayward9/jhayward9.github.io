// Import Firebase modules (only the ones you need)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBfXfAsFSzom-_2kIcb-NmC4_uYPb91fTk",
  authDomain: "jhayward9githubio.firebaseapp.com",
  projectId: "jhayward9githubio",
  storageBucket: "jhayward9githubio.appspot.com",
  messagingSenderId: "132008042281",
  appId: "1:132008042281:web:28ff5718df36e286d8a138",
  measurementId: "G-Q7B6FWMPE0"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics
const analytics = getAnalytics(app);

// Optional: Log success message to verify Firebase initialization
console.log("Firebase initialized successfully:", app);