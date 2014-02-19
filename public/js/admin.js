(function() {
  $('.markdown-source').keyup(function() {
    var $this = $(this);
    var $preview = $('.markdown-target:first');
    $preview.html(marked($this.val()));
  });
  $('.markdown-source').trigger('keyup');
}());
