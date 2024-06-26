$(document).ready(function() {
    $('li').click(function() {
      // Hide all list elements
      $('li').hide();
      // Show the clicked one
      $(this).show();
    });
  });
  