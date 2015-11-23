$(document).ready(function() {

  // Check to see if the window is top if not then display button.
  $(window).scroll(function(){
    if ($(this).scrollTop() > 100) {
      $('.scroll-to-top').show();
    } else {
      $('.scroll-to-top').hide();
    }
  });
});
