var $ = jQuery.noConflict();

// Plugin

$.fn.parallax = function(type) {

	var lastScrollY   = 0,
			ticking       = false,
			element       = this,
			elementHeight = this.height(),
			velocity      = this.attr('data-velocity');

	// Update position

	var updatePosition = function() {

	  var value     = lastScrollY * velocity;
		var translate = 'translate3d(0px,' + value + 'px, 0px)';

		$(element).css({
			'-webkit-transform': translate,
			'-moz-transform': translate,
			'-ms-transform': translate,
			'-o-transform': translate,
			'transform': translate
		});
		ticking = false;

	};

	// Update height

	var updateHeight = function() {

		var value  = lastScrollY * velocity;
		var height = value;

		$(element).css('margin-bottom', height);
		ticking = false;

	};

	// Update scroll value and request tick

	var doScroll = function() {
		lastScrollY = window.pageYOffset.toFixed(2);
		if (!ticking) {
			switch (type) {
				case 'height':
					window.requestAnimationFrame(updateHeight);
					break;
				default:
					window.requestAnimationFrame(updatePosition);
					break;
			}
			ticking = true;
		}
	};

	// Scroll event listener

	window.addEventListener('scroll', doScroll, false);

};

$(document).ready(function(){
	$('.parallax').parallax();
	$('.parallax-height').parallax('height');
});
