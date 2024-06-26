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


//replaces list element when clicked 
$(document).ready(function() {
  $('li').click(function() {
    // Overwrite the current navbar
    $('.navbar').replaceWith(`
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <div class="row w-100">
            <div class="col-4"></div> <!-- First column blank -->
            <div class="col-4 d-flex justify-content-center align-items-center">
              <p>Hello World</p> <!-- Second column with 'Hello World' -->
            </div>
            <div class="col-4"></div> <!-- Third column blank -->
          </div>
        </div>
      </nav>
    `);
  });
});
