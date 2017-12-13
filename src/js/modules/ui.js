export default function ui() {

  // Show my age

  function calculateAge(dateString) {
    var birthday = +new Date(dateString)
    return ~~((Date.now() - birthday) / (31557600000))
  }

  $('#age').text( calculateAge('1990-05-30') )

  // Show current year

  $('#year').text( (new Date()).getFullYear() )

  // Contact form lines animation

  $('input, textarea').focusin( () => {
    $(this).parent().addClass('active')
  }).focusout( () => {
    $(this).parent().removeClass('active')
  })

  // Smooth scroll to div

  $('header li a').click(function() {

    var shift  = 0
    var target = $(this).attr('href')

    if (target == "#contact") shift = 240
    if (target == "#works") shift = 12

  	$('html, body').animate({
  		scrollTop: $(target).offset().top + shift
  	}, 500)

  })

  // Wow

  new WOW().init()

}
