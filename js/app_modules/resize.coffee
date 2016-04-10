# detect if container has scrollbar

check_containers_height = () ->

	$('.container-outer').each ->

		content        = $(this).find('.container')
		this_height    = $(this).height()
		content_height = $(this).find('.center').height()

		if content_height > this_height
			$(content).addClass('hasScrollbar')
		else
			$(content).removeClass('hasScrollbar')



# resize stuff

resize_elements = () ->

	win_w = $(window).width()
	win_h = $(window).height()

	# glitch font-size
	if win_w < 365
		$('h1.glitch').css('font-size', Math.round((win_w-10) / 4) )
	else
		$('h1.glitch').css('font-size','')

	# check containers height
	check_containers_height();
