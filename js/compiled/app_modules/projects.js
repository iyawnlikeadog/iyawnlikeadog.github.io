var load_projects;

load_projects = function(data) {
  $.each(data, function(k, v) {
    if (k % 3 === 0) {
      $('#carousel').append("<div class=\"slide\">\n	<div class=\"container\">\n		<div class=\"row\"></div>\n	</div>\n</div>");
    }
    return $('#carousel .slide:last-of-type .row').append("<div class=\"col lg-4\">\n	<div class=\"item animated fadeIn\">\n		<div class=\"img-caption\">\n			<img src=\"img/works/" + v["class"] + ".jpg\">\n			<a href=\"" + v.link + "\">\n				<div class=\"caption\">\n					<div class=\"inner-caption\">\n						<span class=\"icon-link\"></span>\n						<p>\n							<project_lang class=\"en\">" + v.desc_en + "</project_lang>\n							<project_lang class=\"ru\">" + v.desc_ru + "</project_lang>\n						</p>\n					</div>\n				</div>\n			</a>\n		</div>\n		<div class=\"name\">\n			<h4>\n				<project_lang class=\"en\">" + v.name_en + "</project_lang>\n				<project_lang class=\"ru\">" + v.name_ru + "</project_lang>\n			</h4>\n		</div>\n	</div>\n</div>");
  });
  $('#carousel').owlCarousel({
    items: 1,
    onDrag: function() {
      $('.swipe-active').removeClass('active').addClass('active');
      return setTimeout(function() {
        return $('.swipe-active').removeClass('active');
      }, 500);
    }
  });
  return $('.caption').hover(function() {
    return $(this).parent().find('img').addClass('blurred');
  }, function() {
    return $(this).parent().find('img').removeClass('blurred');
  });
};
