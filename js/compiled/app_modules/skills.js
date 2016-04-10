var skills, technologies;

skills = [['Design', 'design', '8.6', '#6EDF95'], ['HTML/CSS', 'html', '9.5', '#6EDF95'], ['Front End', 'front', '8.0', '#ECC160'], ['Back End', 'back', '6.5', '#EE6255'], ['CMS', 'cms', '7.5', '#ECC160']];

technologies = [['Photoshop', 'Illustrator', 'Corel Draw', '3ds Max'], ['HTML5', 'CSS3', 'Less', 'SASS', 'SCSS', 'Stylus', 'Jade'], ['jQuery', 'Vanilla.js', 'AngularJS', 'CoffeeScript'], ['PHP', 'MySQL', 'NoSQL', 'Python', 'Node.js', 'nw.js'], ['WordPress', 'Cockpit', 'CS Cart', 'More+']];

$.each(skills, function(k, v) {
  var even_odd;
  if (k % 2 === 0) {
    even_odd = "Left";
  } else {
    even_odd = "Right";
  }
  return $('#skills-list').append("<div class=\"item " + even_odd + " " + v[1] + " animated fadeIn\" style=\"animation-delay:" + (1 + k / 2) + "s;\">\n	<h4>" + v[0] + " (" + v[2] + ")</h4>\n	<h5>" + (technologies[k].join(', ')) + "</h5>\n	<div class=\"progress-bar\">\n		<div class=\"progress animated\" style=\"background:" + v[3] + ";\"></div>\n	</div>\n</div>");
});
