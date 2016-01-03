var $ = jQuery.noConflict();

// hide preloader cover

$(window).load(function(){
    $('#cover').fadeOut(1000).css('','').delay(1200).remove();
});

$(document).ready(function(){

	var win_w, win_h, isMobile;
	var movementStrength = 60;
	var moveHeight, moveWidth;

	// adjust stuff

	function resizeStuff() {

		win_w = $(window).width();
		win_h = $(window).height();

		// isMobile true false

		if (win_w > 600) {
			isMobile = false;
		} else {
			isMobile = true;
		}

		// ILDAR font-size
		if (win_w < 365) {
			$('h1.glitch').css('font-size', Math.round((win_w-10) / 4) );
		} else {
			$('h1.glitch').css('font-size','');
		}

		// center vertically .central
		var central_h = $('#intro > .central').height();
		$('#intro > .central').css('margin-top', - central_h/2 - 37);

		// section#intro height 100%
		$('#intro').height(win_h);

		// background size
		$('#bgx').css('background-size', (win_w + 60) + 'px ' + (win_h + 60) + 'px');

		//background movement stuff

		moveWidth = movementStrength / win_w;
		moveHeight = movementStrength / win_h;

	}

	resizeStuff();

	$(window).resize(function() {
		resizeStuff();
	});

	// background movement

	$('body').on('mousemove', function(e){

		var pageX = e.clientX - win_w / 2;
		var pageY = e.clientY - win_h / 2;
		var newvalueX = moveWidth * pageX * -1 - 30;
		var newvalueY = moveHeight * pageY * -1 - 30;

		$('#bgx').css("background-position", newvalueX + "px " + newvalueY + "px");

	});

	// Audio

	var pp = $('#playPause');
	var audio = $('#music');
	audio[0].src = 'mp3/ridersOnTheStorm.mp3';

	// Bind class changing

	$(pp).on('classChanged', function() {
		if ( $(this).hasClass('paused') ) {
			$(this).find('.icon-volume-off').removeClass('fadeOutUp' ).addClass('animated fadeInDown');
			$(this).find('.icon-volume-up' ).removeClass('fadeInDown').addClass('animated fadeOutUp' );
		} else {
			$(this).find('.icon-volume-off').removeClass('fadeInDown').addClass('animated fadeOutUp' );
			$(this).find('.icon-volume-up' ).removeClass('fadeOutUp' ).addClass('animated fadeInDown');
		}
	});

	// Autoplay for desktops

	if ( isMobile == false ) {
		$(pp).removeClass('paused').trigger('classChanged');
		audio[0].play();
	} else {
		$(pp).addClass('paused').trigger('classChanged');
	}

	// Play/Pause

	function playPause() {

		if (	$(pp).hasClass('paused') ) {

			// Visual feedback
			$(pp).removeClass('paused').trigger('classChanged');

			// Play
			audio[0].play();
			audio.stop().animate({volume: 1}, 500);

    } else {

			// Visual feedback
			$(pp).addClass('paused').trigger('classChanged');

			//Pause
			audio.stop().animate({volume: 0}, 500, function() {
				if ( $(pp).hasClass('paused') ) {
					audio[0].pause();
				}
			});

     }
	}

	// Play/Pause button click

	$('body').on('click', '#playPause', function() {
		playPause();
	});

	// Scroll down

	$('body').on('click', '.icon-down-open', function() {
		$('#wrapper').animate({
			scrollTop: win_h + 1
			// scrollTop: $( $.attr(this, 'href') ).offset().top
		}, 500);
		return false;
	});

	// var timer;
	// var refresh_time = 250;
	// var x = 0;
	//
	// $('body').mousemove(function(e) {
	//   if (timer)
	//     clearTimeout(timer);
	//     timer = setTimeout(function(){
	//       var mouse_x = e.clientX;
	//       if(mouse_x != x){
	//         x = mouse_x;
	//
	// 				var pageX = e.clientX - win_w / 2;
	// 				var pageY = e.clientY - win_h / 2;
	// 				var newvalueX = width * pageX * -1 - 30;
	// 				var newvalueY = height * pageY * -1 - 30;
	//
	// 				$('#bgx').animate({
	// 					backgroundPositionX: newvalueX,
	// 					backgroundPositionY: newvalueY
	// 				}, 250);
	//
	//       }
	//     }, refresh_time);
	// });





	// Parallax

//	var scene = document.getElementById('header');
//	var parallax = new Parallax(scene);



	// Parallax Background

	// $('*[data-type="parallax"]').each(function(){
	// 	var $bgobj = $(this); // создаем объект
	// 	$(window).scroll(function() {
	// 		var yPos = -($(window).scrollTop() / $bgobj.data('speed')); // вычисляем коэффициент
	// 		// Присваиваем значение background-position
	// 		var coords = 'center '+ yPos + 'px';
	// 		// Создаем эффект Parallax Scrolling
	// 		$bgobj.css({ backgroundPosition: coords });
	// 	});
	// });



	// Match Height

//	$('#features .col').matchHeight();



	// Enable animation on scroll

	new WOW().init();



	// Smooth scrolling to anchor

	// $('a.scroll').click(function(){
	// 	$('html, body').animate({
	// 		scrollTop: $( $.attr(this, 'href') ).offset().top
	// 	}, 500);
	// 	return false;
	// });



	// Lists

	// $('ul.check li').prepend('<span class="icon-ok"></span>');
	// $('ul.star li').prepend('<span class="icon-star"></span>');



	// MSG

	// if ( document.location.href.indexOf('success') > -1 ) {
	// 	alert('Сообщение успешно отправлено');
	// }
	//
	// if ( document.location.href.indexOf('error') > -1 ) {
	// 	alert('Не удалось отправить сообщение');
	// }



	// Caption

	$('.img-wrapper').hover(function(){
		$(this).find('.caption').stop().animate({
			opacity: '1'
		}, 200);
	}, function() {
		$(this).find('.caption').stop().animate({
			opacity: '0'
		}, 200);
	});



	// Noise



	(function makeSomeNoise() {

		// random time interval between 1.5s and 6s
		var time = Math.floor(Math.random() * 6000) + 1500;
		// random duration between 0.05s and 0.3s
		var duration = Math.floor(Math.random() * 300) + 50;
		// random hue rotation 20 and 100 deg
		var hue = Math.floor(Math.random() * 100) + 20;

		setTimeout(function() {

			$('#bgx').css({
				'filter'         : 'hue-rotate(' + hue + 'deg)',
				'-webkit-filter' : 'hue-rotate(' + hue + 'deg)',
				'-moz-filter'    : 'hue-rotate(' + hue + 'deg)',
				'-o-filter'      : 'hue-rotate(' + hue + 'deg)',
				'-ms-filter'     : 'hue-rotate(' + hue + 'deg)'
			});
			$('#noise').css('opacity','0.03');

			setTimeout(function() {

				$('#bgx').css({
					'filter'         : 'hue-rotate(0deg)',
					'-webkit-filter' : 'hue-rotate(0deg)',
					'-moz-filter'    : 'hue-rotate(0deg)',
					'-o-filter'      : 'hue-rotate(0deg)',
					'-ms-filter'     : 'hue-rotate(0deg)'
				});
				$('#noise').animate({'opacity':'0'}, 300);

				makeSomeNoise();

			}, duration);

		}, time);

	}());



	// anonimizer

	// $('#portfolio a').click(function(event) {
	// 	event.preventDefault();
	// 	$url = $(this).attr('href');
	// 	window.open('http://gotocode.tk/?'+$url, '_blank')
	// });


	// portfolio

	$.ajax({
		dataType: "json",
		url: "js/works.json",
		success: function(data){
			$.each(data, function(k,v) {
				$('#works').append('<img src="img/works/' + v + '.jpg">')
			});
		}
	});

	// Skills

	var skills = [
		['Design','9'],
		['HTML/CSS','9.5','<img src="img/icon-html5.svg">'],
		['JS','8'],
		['PHP/MySQL','6'],
		['Python','5'],
		['WordPress','8']
	];

	$.each(skills, function(k,v){

		$('#graphic').append('<div class="graphic-column"><div></div><i>' + v[0] + '</i></div>');

		var empties = 10 - v[1];
		var divtoadd = $('#graphic > div:last-of-type > div');

//		for (var i = 0; i < v[1]; i++) {
//			$(divtoadd).append('<div class="graphic-cell"></div');
//		}
		$(divtoadd).height(0).css({
			'margin-top': empties*10 + 'px',
			'height': v[1]*10 + 'px'
		});
	});

	// Technologies

	var technologies = [
		['HTML5','CSS3','Less','SASS','SCSS','Stylus','Jade'],
		['jQuery','Vanilla.js','Angular.js','node.js','node-webkit','gulp'],
		['Adobe Photoshop','Adobe Illustrator','Corel Draw'],
		['PHP','MySQL','NoSQL','Python'],
		['Cockpit','WordPress']
	];

	$.each(technologies, function(k,v){
		$.each(v, function(key,val) {
			$('#tech').append('<span class="tag">' + val + '</span>');
		});
	});

});
