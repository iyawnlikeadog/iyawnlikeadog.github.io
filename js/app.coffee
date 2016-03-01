$ = jQuery.noConflict()

# hide preloader

$(window).load ->
	$('#cover').fadeOut(1000).css('','').delay(1200).remove()

$(document).ready ->



	# $('section').not('.active').find('.animated').removeClass('animated').addClass('frozen')



	# resize stuff



	resize_stuff = () ->

		win_w = $(window).width()
		win_h = $(window).height()

		# glitch font-size

		if win_w < 365
			$('h1.glitch').css('font-size', Math.round((win_w-10) / 4) )
		else
			$('h1.glitch').css('font-size','')

	resize_stuff()
	$(window).resize -> resize_stuff()



	# restart animationTop



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



	# navigation



	navnext = $('.section-next')
	navprev = $('.section-prev')

	# update navigation

	update_nav = () ->

		section = $('section.active')

		if $(section).is(':first-of-type')
			$(navprev).addClass('inactive')
		else
			$(navprev).removeClass('inactive')

		if $(section).is(':last-of-type')
			$(navnext).addClass('inactive')
		else
			$(navnext).removeClass('inactive')

	# start/stop/restart animations

	reanimate = (to_hide, to_show) ->

		animations  = $('#' + to_show + ' .animated')

		update_nav()
		restart_animation(animations)

		switch (to_show)
			when 'intro'
				pJSDom[0].pJS.particles.move.enable = true
				pJSDom[0].pJS.fn.particlesRefresh()

		switch (to_hide)
			when 'intro' then pJSDom[0].pJS.particles.move.enable = false

	# next

	$(navnext).click ->

		section = $('section.active')
		secnext = $('section.active').next()
		this_id = $(section).attr('id')
		next_id = $(secnext).attr('id')

		if !$(section).is(':last-of-type')

			$(section).css
				'transform': 'scale(.5, .5)',
				'opacity'  : '0',
				'top'      : '0'

			$(secnext).css
				'top' : '0'

			$(secnext).addClass('active').siblings().removeClass('active')
			reanimate(this_id, next_id)

	# prev

	$(navprev).click ->

		section = $('section.active')
		secprev = $('section.active').prev()
		this_id = $(section).attr('id')
		prev_id = $(secprev).attr('id')

		if !$(section).is(':first-of-type')

			$(section).css
				'top': '100%'

			$(secprev).css
				'transform' : 'scale(1, 1)',
				'top'       : '0',
				'opacity'   : '1'

			$(secprev).addClass('active').siblings().removeClass('active')
			reanimate(this_id, prev_id)



	# noise



	makeSomeNoise = () ->

		# random time interval between 1.5s and 6s
		time = Math.floor(Math.random() * 6000) + 1500
		# random duration between 0.05s and 0.3s
		duration = Math.floor(Math.random() * 300) + 50
		# random hue rotation 20 and 100 deg
		hue = Math.floor(Math.random() * 100) + 20

		setTimeout ->

			$('#bgx').css
				'opacity'        : '.8',
				'filter'         : 'hue-rotate(' + hue + 'deg)',
				'-webkit-filter' : 'hue-rotate(' + hue + 'deg)',
				'-moz-filter'    : 'hue-rotate(' + hue + 'deg)',
				'-o-filter'      : 'hue-rotate(' + hue + 'deg)',
				'-ms-filter'     : 'hue-rotate(' + hue + 'deg)'

			$('#noise').css
				'opacity': '0.03'

			setTimeout ->

				$('#bgx').css
					'opacity'        : '.75',
					'filter'         : 'hue-rotate(0deg)',
					'-webkit-filter' : 'hue-rotate(0deg)',
					'-moz-filter'    : 'hue-rotate(0deg)',
					'-o-filter'      : 'hue-rotate(0deg)',
					'-ms-filter'     : 'hue-rotate(0deg)'

				$('#noise').css
					'opacity': '0'

				makeSomeNoise()

			, duration

		, time

	makeSomeNoise()



	# sending message



	msg_input    = $('#sendmsg input')
	msg_button   = $('#sendmsg button')
	msg_answered = false

	send_msg = () ->

		text = msg_input.val()

		if (text != "")
			# send mail
			$.ajax
				url: 'http://maestroapps.byethost31.com/api-sendmail/mail.php'
				type: 'GET'
				dataType: 'json'
				data:
					"from_name"     : "iyawnlikeadog.github.io admin@maestroapps.byethost31.com"
					"subject"       : "Сообщение с сайта iyawnlikeadog.github.io"
					"receiver_mail" : "iyawnlikeadog@gmail.com"
					"body"          : text
				success: (data) ->
					if data.status      == 'success' then alert("Message sent!")
					else if data.status == 'error'   then alert("Error!")
					else alert("Error!")
				error: (data) ->
					# alert(xhr.status + "|||||" + thrownError)
					console.log(data)
			# show msg
			$('#chat').append """
				<div class="msg from_you animated fadeInUp">
					<span>
						<div class="triangle"></div>
						#{text}
					</span>
					<div class="ava"></div>
				</div>
			"""
			# clear input
			msg_input.val("")
			# answer once
			if (msg_answered == false)
				$('#chat').append """
					<div class="msg from_me animated fadeInUp" style="animation-delay:1.5s;">
						<div class="ava"></div>
						<span>
							<div class="triangle"></div>
							Thank you for dropping a line!<br>
							I'll reply to your message as soon as possible
						</span>
					</div>
				"""
				msg_answered = true


	# send message on pressing enter

	# msg_input.on 'keydown', (event) ->
	#   e = event or window.event
	#   if e.keyCode is 13 then send_msg()

	# send message on button click

	msg_button.on 'click', (event) ->
		event.preventDefault()
		send_msg()
