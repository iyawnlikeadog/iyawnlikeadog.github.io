document.addEventListener('DOMContentLoaded', function() {

	// Get my age

	function calculateAge(dateString) {
		var birthday = +new Date(dateString);
		return ~~((Date.now() - birthday) / (31557600000));
	};

	var age = calculateAge('1990-05-30');
	document.getElementById('age').innerHTML = age;

	// Masonry

	var elem = document.querySelector('.works');

	var msnry = new Masonry(elem, {
		itemSelector: '.works-item'
	});

});
