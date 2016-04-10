msg_input    = $('#sendmsg input')
msg_button   = $('#sendmsg button')
msg_answered = false



# sending message

# show line under inputs and textarea on focus
$('input, textarea').focusin ->
	$(this).parent().addClass('active')
$('input, textarea').focusout ->
	$(this).parent().removeClass('active')








show_answer = (msg) ->
	$('#chat').append """
		<div class="msg from_me animated fadeInUp" style="animation-delay:0s;">
			<div class="ava"></div>
			<span>
				<div class="triangle"></div>
				#{msg}
			</span>
		</div>
	"""
	msg_answered = true

send_msg = () ->

	text = msg_input.val()

	if (text != "")
		# send mail
		emailjs.init("user_oLSfdYi3FPUnn5ipPzusf")
		emailjs.send("gmail", "emails_from_github", {msg: text} )
					 .then( (response) ->
							# console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
							if (msg_answered == false)
								show_answer("Your message has been sent! Thank you!<br>I'll reply to your message as soon as possible")
						, (err) ->
							# console.log("FAILED. error=", err);
							show_answer("Sorry, your message hasn't been sent.<br>Please feel free to send me an e-mail.")
						)
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



# send message on pressing enter

# msg_input.on 'keydown', (event) ->
#   e = event or window.event
#   if e.keyCode is 13 then send_msg()

# send message on button click

msg_button.on 'click', (event) ->
	event.preventDefault()
	send_msg()
