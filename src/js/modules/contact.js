export default function contact() {

	// Variables

	var send_button = $('#sendmsg button')

	// Email JS init

	emailjs.init("user_oLSfdYi3FPUnn5ipPzusf")

	// Respond

	function respond(status) {
		if (status == "wait")    var response = "<span class='icon-spin2'></span> Send message"
		if (status == "success") var response = "<span class='icon-ok'></span> Message Sent"
		if (status == "error")   var response = "<span class='icon-cancel'></span> Error"
		send_button.html(response)
	}

	// Send

	function send() {

		var from_name = $("#name").val()
		var from_mail = $("#mail").val()
		var message   = $("#msg").val()
		var body      = from_name + ' ===== ' + from_mail + ' ===== ' + message

		respond('wait')

		if (from_name != "undefined" && from_mail != "undefined" && message != "undefined") {
			emailjs.send( "gmail", "emails_from_github", {msg: body} )
				.then( (response) => {
					respond('success')
				}, (err) => {
					respond('error')
					console.log("FAILED. error=", err);
				})
		}
	}

	// Validate / Submit

	$('#sendmsg').parsley().on('field:validated', function() {
		var ok = $('.parsley-error').length === 0
		$('.bs-callout-info').toggleClass('hidden', !ok)
		$('.bs-callout-warning').toggleClass('hidden', ok)
	}).on('form:submit', function() {
		send()
	})

	// Send button prevent default

	send_button.click((e) => {
		e.preventDefault()
		send()
	})

}
