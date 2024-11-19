import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Firebase configuration with your new credentials
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
const db = getFirestore();
const auth = getAuth();

// Admin Login with Google
async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  if (user.email !== "jesseianhayward@gmail.com") {
    alert("You are not authorized to post!");
    throw new Error("Unauthorized user");
  }
  return user;
}

// Add a new blog post
async function addPost(title, content) {
  await loginWithGoogle(); // Authenticate the admin
  await addDoc(collection(db, "posts"), {
    title,
    content,
    author: "Admin", // Hardcoded author name
    timestamp: serverTimestamp(), // Firestore timestamp
  });
  alert("Post added successfully!");
}

// Handle form submission for new posts
document.getElementById("postForm").addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent form from refreshing the page
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  try {
    await addPost(title, content); // Add post to Firestore
    document.getElementById("postForm").reset(); // Clear the form
  } catch (error) {
    console.error("Error adding post:", error);
    alert("Failed to add post. Please try again.");
  }
});