$(document).ready(function() {
    $('li').click(function() {
      $('li').hide();
      $(this).show();
    });
  });
  
//shows a div when a list element is clicked
$(document).ready(function() {
  $('li').click(function() {
    $('.content-div').hide();
    var divToShow = $(this).data('target');
    $('#' + divToShow).show();
  });
});


//replaces list element when clicked 
$(document).ready(function() {
  $('li').click(function() {
    $('.navbar').replaceWith(`
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <div class="row mt-2 mb-4">
            <a id="navbar_brand_JH" class="navbar-brand" href="index.html">JESSE HAYWARD</a>
        </div>
      </nav>
    `);
  });
});

$(document).ready(function() {
  $('#div1').click(function() {
      $('main img').replaceWith(`
          <div class="row">
              <div class="col">
                  <p>HELLO DIV1</p>
              </div>
          </div>
      `);
  });
});

$(document).ready(function() {
  $('#div3').click(function() {
      $('main img').replaceWith(`
          <div class="row">
              <div class="col">
                  <p>HELLO DIV3</p>
              </div>
          </div>
      `);
  });
});

$(document).ready(function() {
  $('#div1, #div3').click(function() {
      $('#site_guide').hide();
  });
});

