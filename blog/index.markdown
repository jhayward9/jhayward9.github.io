---
layout: default
title: "Blog"
---
<div id="blogarea">
  {% for post in site.posts %}
  <article class="blogpost">
    <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
    <p>{{ post.excerpt }}</p>
    <p class="author">Posted by: {{ post.author }}</p>
    <p class="timedatestamp">{{ post.date | date: "%l:%M%P %Z, %a %b %e, %Y" }}</p>
    
    <div class="btn-bar">
      <button class="reactbtns">Like</button>
      <button class="reactbtns">Dislike</button>
      <button class="replybtn">Reply</button>
    </div>
    
    <div class="commentfeed">
      <!-- You can add dynamic comments here using JavaScript -->
    </div>
  </article>
  {% endfor %}
</div>