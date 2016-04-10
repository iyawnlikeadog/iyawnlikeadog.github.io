$          = jQuery
lang_en    = null
lang_ru    = null
lang_array = null
lang       = 'en'
projects   = null


# hide preloader

$(window).load ->
	$('#cover').css('opacity','0')
	setTimeout ->
		$('#cover').remove()
	, 1600



$(document).ready ->



	# translate
	translate = (new_lang, delay_off) ->
		# lang variable
		lang = new_lang
		# lang array
		if new_lang == "en" then lang_array = lang_en
		if new_lang == "ru" then lang_array = lang_ru
		# body class
		$('body').removeClass('en, ru').addClass(lang)
		# translate
		$('lang').each ->
			text = $(this).attr('text')
			$(this).html(lang_array[text])
		# type introducing
		type_introducing(delay_off)



	# get projects
	$.ajax
		dataType: "json"
		url: "projects.json"
		success: (data) ->
			projects = data
			load_projects(data)

	# get language file (en)
	$.ajax
		dataType: "json"
		url: "langs/en.json"
		success: (data) ->
			lang_en = data
			translate('en')

	# get language file (ru)
	$.ajax
		dataType: "json"
		url: "langs/ru.json"
		success: (data) ->
			lang_ru = data



	# switch language
	$('.langs span').on 'click', () ->
		new_lang = $(this).attr('data-lang')
		if new_lang != lang
			$(this).addClass('active').siblings().removeClass('active')
			translate(new_lang, true)



	# resize elements on window resize and on start
	resize_elements()
	$(window).resize -> resize_elements()
