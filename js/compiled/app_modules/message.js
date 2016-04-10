var msg_answered, msg_button, msg_input, send_msg, show_answer;

msg_input = $('#sendmsg input');

msg_button = $('#sendmsg button');

msg_answered = false;

$('input, textarea').focusin(function() {
  return $(this).parent().addClass('active');
});

$('input, textarea').focusout(function() {
  return $(this).parent().removeClass('active');
});

show_answer = function(msg) {
  $('#chat').append("<div class=\"msg from_me animated fadeInUp\" style=\"animation-delay:0s;\">\n	<div class=\"ava\"></div>\n	<span>\n		<div class=\"triangle\"></div>\n		" + msg + "\n	</span>\n</div>");
  return msg_answered = true;
};

send_msg = function() {
  var text;
  text = msg_input.val();
  if (text !== "") {
    emailjs.init("user_oLSfdYi3FPUnn5ipPzusf");
    emailjs.send("gmail", "emails_from_github", {
      msg: text
    }).then(function(response) {
      if (msg_answered === false) {
        return show_answer("Your message has been sent! Thank you!<br>I'll reply to your message as soon as possible");
      }
    }, function(err) {
      return show_answer("Sorry, your message hasn't been sent.<br>Please feel free to send me an e-mail.");
    });
    $('#chat').append("<div class=\"msg from_you animated fadeInUp\">\n	<span>\n		<div class=\"triangle\"></div>\n		" + text + "\n	</span>\n	<div class=\"ava\"></div>\n</div>");
    return msg_input.val("");
  }
};

msg_button.on('click', function(event) {
  event.preventDefault();
  return send_msg();
});
