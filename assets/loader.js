$(document).ready(function() {
  $('code').each(function() {
    var html = $(this).attr('data-html');
    $(this).html(html);
  });
});
