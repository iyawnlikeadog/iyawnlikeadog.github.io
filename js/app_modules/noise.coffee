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
