// Hides/shows list elements
$(document).ready(function() {
    $('li').click(function() {
      // Hide all list elements
      $('li').hide();
      // Show the clicked one
      $(this).show();
    });
  });
  
//shows a div when a list element is clicked
$(document).ready(function() {
  $('li').click(function() {
    // Hide all divs
    $('.content-div').hide();
    
    // Get the ID of the div to show from the data attribute of the clicked li
    var divToShow = $(this).data('target');
    
    // Show the corresponding div
    $('#' + divToShow).show();
  });
});