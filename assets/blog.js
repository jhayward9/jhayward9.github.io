import { getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Function to load blog posts from Firestore
async function loadPosts() {
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

    // Load comments for the post
    loadComments(post.id);
  });

  attachCommentFormHandlers(); // Attach event handlers to comment forms
}

// Function to handle comment submission
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

      await addDoc(collection(db, "comments"), {
        postId,
        content: commentContent,
        author: user.displayName,
        timestamp: serverTimestamp(),
      });

      alert("Comment added successfully!");
      form.reset();
      loadComments(postId); // Refresh comments
    });
  });
}

// Function to load comments for a post
async function loadComments(postId) {
  const commentsCollection = collection(db, "comments");
  const commentsSnapshot = await getDocs(commentsCollection);
  const comments = commentsSnapshot.docs
    .map(doc => doc.data())
    .filter(comment => comment.postId === postId);

  const commentsDiv = document.getElementById(`comments-${postId}`);
  commentsDiv.innerHTML = comments
    .map(comment => `<p>${comment.author}: ${comment.content}</p>`)
    .join("");
}

// Load posts on page load
loadPosts();