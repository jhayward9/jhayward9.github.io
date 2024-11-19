import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBfXfAsFSzom-_2kIcb-NmC4_uYPb91fTk",
  authDomain: "jhayward9githubio.firebaseapp.com",
  projectId: "jhayward9githubio",
  storageBucket: "jhayward9githubio.firebasestorage.app",
  messagingSenderId: "132008042281",
  appId: "1:132008042281:web:28ff5718df36e286d8a138",
  measurementId: "G-Q7B6FWMPE0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Sign in with Google
document.getElementById("signin-btn").addEventListener("click", async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if the signed-in email is allowed
    if (user.email === "jesseianhayward@gmail.com") {
      sessionStorage.setItem("adminSignedIn", "true"); // Store admin status in session storage
      window.location.href = "/blog_admin.html"; // Redirect to admin page
    } else {
      document.getElementById("error-message").textContent =
        "You are not authorized to access this page.";
      await auth.signOut(); // Sign out unauthorized users
    }
  } catch (error) {
    console.error("Error during sign-in:", error);
    document.getElementById("error-message").textContent =
      "Sign-in failed. Please try again.";
  }
});