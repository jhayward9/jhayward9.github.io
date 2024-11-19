import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBfXfAsFSzom-_2kIcb-NmC4_uYPb91fTk",
    authDomain: "jhayward9githubio.firebaseapp.com",
    projectId: "jhayward9githubio",
    storageBucket: "jhayward9githubio.firebasestorage.app",
    messagingSenderId: "132008042281",
    appId: "1:132008042281:web:28ff5718df36e286d8a138",
    measurementId: "G-Q7B6FWMPE0"
  };

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
  await loginWithGoogle();
  await addDoc(collection(db, "posts"), {
    title,
    content,
    author: "Admin",
    timestamp: serverTimestamp(),
  });
  alert("Post added successfully!");
}

// Handle form submission for new posts
document.getElementById("postForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  try {
    await addPost(title, content);
    document.getElementById("postForm").reset();
  } catch (error) {
    console.error("Error adding post:", error);
  }
}); 

posts.forEach(post => {
    const postElement = document.createElement("article");
    postElement.className = "blogpost";
    postElement.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.content}</p>
      <p class="author">Posted by: ${post.author}</p>
      <p class="timedatestamp">${post.timestamp.toDate().toLocaleString()}</p>
      <div class="comment-section">
        <form class="comment-form" data-post-id="${post.id}">
          <textarea placeholder="Write a comment..." required></textarea>
          <button type="submit">Post Comment</button>
        </form>
        <div class="comment-feed" id="comments-${post.id}">
          <!-- Comments will be dynamically added here -->
        </div>
      </div>
    `;
    blogArea.appendChild(postElement);
  });