var check_containers_height, resize_elements;

check_containers_height = function() {
  return $('.container-outer').each(function() {
    var content, content_height, this_height;
    content = $(this).find('.container');
    this_height = $(this).height();
    content_height = $(this).find('.center').height();
    if (content_height > this_height) {
      return $(content).addClass('hasScrollbar');
    } else {
      return $(content).removeClass('hasScrollbar');
    }
  });
};

resize_elements = function() {
  var win_h, win_w;
  win_w = $(window).width();
  win_h = $(window).height();
  if (win_w < 365) {
    $('h1.glitch').css('font-size', Math.round((win_w - 10) / 4));
  } else {
    $('h1.glitch').css('font-size', '');
  }
  return check_containers_height();
};
