import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfXfAsFSzom-_2kIcb-NmC4_uYPb91fTk",
  authDomain: "jhayward9githubio.firebaseapp.com",
  projectId: "jhayward9githubio",
  storageBucket: "jhayward9githubio.firebasestorage.app",
  messagingSenderId: "132008042281",
  appId: "1:132008042281:web:28ff5718df36e286d8a138",
  measurementId: "G-Q7B6FWMPE0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Function to load blog posts from Firestore
async function loadPosts() {
  try {
    const postsCollection = collection(db, "posts");
    const postsSnapshot = await getDocs(postsCollection);
    const posts = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const blogArea = document.getElementById("blogarea");
    blogArea.innerHTML = ""; // Clear existing posts

    posts.forEach(post => {
      const postElement = document.createElement("article");
      postElement.className = "blogpost";
      postElement.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <p class="author">Posted by: ${post.author}</p>
        <p class="timedatestamp">${new Date(post.timestamp.seconds * 1000).toLocaleString()}</p>
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

      // Load comments for the post
      loadComments(post.id);
    });

    attachCommentFormHandlers(); // Attach event handlers to comment forms
  } catch (error) {
    console.error("Error loading posts:", error);
  }
}

// Function to attach form event handlers for comments
function attachCommentFormHandlers() {
  document.querySelectorAll(".comment-form").forEach(form => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const postId = form.getAttribute("data-post-id");
      const commentContent = form.querySelector("textarea").value;

      const user = auth.currentUser;
      if (!user) {
        alert("You must log in with Facebook to comment.");
        return;
      }

      try {
        await addDoc(collection(db, "comments"), {
          postId,
          content: commentContent,
          author: user.displayName,
          timestamp: serverTimestamp(),
        });

        alert("Comment added successfully!");
        form.reset();
        loadComments(postId); // Refresh comments for the current post
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    });
  });
}

// Function to load comments for a specific post
async function loadComments(postId) {
  try {
    const commentsCollection = collection(db, "comments");
    const commentsSnapshot = await getDocs(commentsCollection);
    const comments = commentsSnapshot.docs
      .map(doc => doc.data())
      .filter(comment => comment.postId === postId);

    const commentsDiv = document.getElementById(`comments-${postId}`);
    commentsDiv.innerHTML = comments
      .map(comment => `<p><strong>${comment.author}:</strong> ${comment.content}</p><span>${new Date(comment.timestamp.seconds * 1000).toLocaleString()}</span>`)
      .join("");
  } catch (error) {
    console.error("Error loading comments:", error);
  }
}

// Load posts when the page loads
document.addEventListener("DOMContentLoaded", loadPosts);