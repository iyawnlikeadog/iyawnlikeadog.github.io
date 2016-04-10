navnext = $('.section-next')
navprev = $('.section-prev')



# update navigation buttons

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
	# restart_animation('#' + to_show)
	restart_animation(animations)

	switch (to_show)
		when 'intro'
			# restart particles
			pJSDom[0].pJS.particles.move.enable = true
			pJSDom[0].pJS.fn.particlesRefresh()
		when 'projects'
			# add delay for 3 visible items
			for i in [1,2,3]
				$("#projects .owl-item.active .col:nth-of-type(#{i}) .item").css('animation-delay', 100 + 300 * i + 'ms')

	switch (to_hide)
		when 'intro'
			pJSDom[0].pJS.particles.move.enable = false



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



# navigate using scroll

disableScrolling = false

$(window).on 'mousewheel', (e) ->

	if disableScrolling == true
		e.preventDefault()

	if disableScrolling == false

		# if active section has no scrollbar
		if $('section.active:has(div.hasScrollbar)').length == 0

			if e.originalEvent.wheelDelta > 5
				$(navprev).click()
			else
				$(navnext).click()

			disableScrolling = true
			setTimeout ->
				disableScrolling = false
			, 1500

		# if active section has scrollbar
		else

			content_height = $('section.active .center').height()
			section_height = $('section.active').height()
			scrolled       = $('section.active .container-outer').scrollTop()
			if e.originalEvent.wheelDelta > 5
				if scrolled == 0
					$(navprev).click()
					disableScrolling = true
					setTimeout ->
						disableScrolling = false
					, 1500
			else
				if scrolled + section_height >= content_height + 60
					$(navnext).click()
					disableScrolling = true
					setTimeout ->
						disableScrolling = false
					, 1500
