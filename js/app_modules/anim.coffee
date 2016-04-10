# restart animation

restart_animation = (selector) ->

	dom = $(selector)

	dom.css
		'transform': 'translateZ(0) scale(1, 1)',
		'-webkit-animation-name': 'none',
		'-moz-animation-name': 'none',
		'-ms-animation-name': 'none',
		'-o-animation-name': 'none',
		'animation-name': 'none'

	setTimeout ->
		dom.css
		  '-webkit-animation-name': '',
		  '-moz-animation-name': '',
		  '-ms-animation-name': '',
		  '-o-animation-name': '',
		  'animation-name': ''
	, 0



# first slide typing effect

type_introducing = (delay_off) ->

	$('#hello h3').empty()

	$('#hello h1.glitch').attr('data-content', lang_array['hello_world'])

	text_to_type = lang_array['greetings']
	if delay_off then delay = 0 else delay = 1

	for letter in text_to_type

		time = Math.random() * (0.20 - 0.06) + 0.06
		delay += time
		if letter == " " then letter = "&nbsp;"

		$('#hello h3').append """
			<span class='animated fadeIn' style='animation-delay:#{delay}s;animation-duration:0s;'>#{letter}</span>
			"""
