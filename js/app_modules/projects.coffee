# load projects

load_projects = (data) ->

	$.each data, (k,v) ->

		# create row
		if k % 3 == 0
			$('#carousel').append """
				<div class="slide">
					<div class="container">
						<div class="row"></div>
					</div>
				</div>
			"""

		# fill the row with columns
		$('#carousel .slide:last-of-type .row').append """
			<div class="col lg-4">
				<div class="item animated fadeIn">
					<div class="img-caption">
						<img src="img/works/#{v.class}.jpg">
						<a href="#{v.link}">
							<div class="caption">
								<div class="inner-caption">
									<span class="icon-link"></span>
									<p>
										<project_lang class="en">#{v.desc_en}</project_lang>
										<project_lang class="ru">#{v.desc_ru}</project_lang>
									</p>
								</div>
							</div>
						</a>
					</div>
					<div class="name">
						<h4>
							<project_lang class="en">#{v.name_en}</project_lang>
							<project_lang class="ru">#{v.name_ru}</project_lang>
						</h4>
					</div>
				</div>
			</div>
		"""



	# carousel

	$('#carousel').owlCarousel(
		items: 1,
		onDrag: ->
			$('.swipe-active').removeClass('active').addClass('active')
			setTimeout ->
				$('.swipe-active').removeClass('active')
			, 500
	)



	# mobile carousel



	# caption hover blur
	$('.caption').hover( ->
		$(this).parent().find('img').addClass('blurred')
	, ->
		$(this).parent().find('img').removeClass('blurred')
	)
