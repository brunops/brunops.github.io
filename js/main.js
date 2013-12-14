;(function($) {

  $(function() {
    var mobileMenu = $('.mobile-menu');

    $('.show-menu-icon').on('click', function() {
      mobileMenu.toggleClass('active');
    });
  });
})(jQuery);

