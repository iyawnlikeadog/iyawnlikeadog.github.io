(function() {
  var $;

  $ = jQuery.noConflict();

  $(window).load(function() {
    return $('#cover').fadeOut(1000).css('', '').delay(1200).remove();
  });

  $(document).ready(function() {
    var makeSomeNoise, msg_answered, msg_button, msg_input, navnext, navprev, reanimate, resize_stuff, restart_animation, send_msg, update_nav;
    resize_stuff = function() {
      var win_h, win_w;
      win_w = $(window).width();
      win_h = $(window).height();
      if (win_w < 365) {
        return $('h1.glitch').css('font-size', Math.round((win_w - 10) / 4));
      } else {
        return $('h1.glitch').css('font-size', '');
      }
    };
    resize_stuff();
    $(window).resize(function() {
      return resize_stuff();
    });
    restart_animation = function(selector) {
      var dom;
      dom = $(selector);
      dom.css({
        'transform': 'translateZ(0) scale(1, 1)',
        '-webkit-animation-name': 'none',
        '-moz-animation-name': 'none',
        '-ms-animation-name': 'none',
        '-o-animation-name': 'none',
        'animation-name': 'none'
      });
      return setTimeout(function() {
        return dom.css({
          '-webkit-animation-name': '',
          '-moz-animation-name': '',
          '-ms-animation-name': '',
          '-o-animation-name': '',
          'animation-name': ''
        });
      }, 0);
    };
    navnext = $('.section-next');
    navprev = $('.section-prev');
    update_nav = function() {
      var section;
      section = $('section.active');
      if ($(section).is(':first-of-type')) {
        $(navprev).addClass('inactive');
      } else {
        $(navprev).removeClass('inactive');
      }
      if ($(section).is(':last-of-type')) {
        return $(navnext).addClass('inactive');
      } else {
        return $(navnext).removeClass('inactive');
      }
    };
    reanimate = function(to_hide, to_show) {
      var animations;
      animations = $('#' + to_show + ' .animated');
      update_nav();
      restart_animation(animations);
      switch (to_show) {
        case 'intro':
          pJSDom[0].pJS.particles.move.enable = true;
          pJSDom[0].pJS.fn.particlesRefresh();
      }
      switch (to_hide) {
        case 'intro':
          return pJSDom[0].pJS.particles.move.enable = false;
      }
    };
    $(navnext).click(function() {
      var next_id, secnext, section, this_id;
      section = $('section.active');
      secnext = $('section.active').next();
      this_id = $(section).attr('id');
      next_id = $(secnext).attr('id');
      if (!$(section).is(':last-of-type')) {
        $(section).css({
          'transform': 'scale(.5, .5)',
          'opacity': '0',
          'top': '0'
        });
        $(secnext).css({
          'top': '0'
        });
        $(secnext).addClass('active').siblings().removeClass('active');
        return reanimate(this_id, next_id);
      }
    });
    $(navprev).click(function() {
      var prev_id, secprev, section, this_id;
      section = $('section.active');
      secprev = $('section.active').prev();
      this_id = $(section).attr('id');
      prev_id = $(secprev).attr('id');
      if (!$(section).is(':first-of-type')) {
        $(section).css({
          'top': '100%'
        });
        $(secprev).css({
          'transform': 'scale(1, 1)',
          'top': '0',
          'opacity': '1'
        });
        $(secprev).addClass('active').siblings().removeClass('active');
        return reanimate(this_id, prev_id);
      }
    });
    makeSomeNoise = function() {
      var duration, hue, time;
      time = Math.floor(Math.random() * 6000) + 1500;
      duration = Math.floor(Math.random() * 300) + 50;
      hue = Math.floor(Math.random() * 100) + 20;
      return setTimeout(function() {
        $('#bgx').css({
          'opacity': '.8',
          'filter': 'hue-rotate(' + hue + 'deg)',
          '-webkit-filter': 'hue-rotate(' + hue + 'deg)',
          '-moz-filter': 'hue-rotate(' + hue + 'deg)',
          '-o-filter': 'hue-rotate(' + hue + 'deg)',
          '-ms-filter': 'hue-rotate(' + hue + 'deg)'
        });
        $('#noise').css({
          'opacity': '0.03'
        });
        return setTimeout(function() {
          $('#bgx').css({
            'opacity': '.75',
            'filter': 'hue-rotate(0deg)',
            '-webkit-filter': 'hue-rotate(0deg)',
            '-moz-filter': 'hue-rotate(0deg)',
            '-o-filter': 'hue-rotate(0deg)',
            '-ms-filter': 'hue-rotate(0deg)'
          });
          $('#noise').css({
            'opacity': '0'
          });
          return makeSomeNoise();
        }, duration);
      }, time);
    };
    makeSomeNoise();
    msg_input = $('#sendmsg input');
    msg_button = $('#sendmsg button');
    msg_answered = false;
    send_msg = function() {
      var text;
      text = msg_input.val();
      if (text !== "") {
        $.ajax({
          url: 'http://maestroapps.byethost31.com/api-sendmail/mail.php',
          type: 'GET',
          dataType: 'json',
          data: {
            "from_name": "iyawnlikeadog.github.io admin@maestroapps.byethost31.com",
            "subject": "Сообщение с сайта iyawnlikeadog.github.io",
            "receiver_mail": "iyawnlikeadog@gmail.com",
            "body": text
          },
          success: function(data) {
            if (data.status === 'success') {
              return alert("Message sent!");
            } else if (data.status === 'error') {
              return alert("Error!");
            } else {
              return alert("Error!");
            }
          },
          error: function(data) {
            return console.log(data);
          }
        });
        $('#chat').append("<div class=\"msg from_you animated fadeInUp\">\n	<span>\n		<div class=\"triangle\"></div>\n		" + text + "\n	</span>\n	<div class=\"ava\"></div>\n</div>");
        msg_input.val("");
        if (msg_answered === false) {
          $('#chat').append("<div class=\"msg from_me animated fadeInUp\" style=\"animation-delay:1.5s;\">\n	<div class=\"ava\"></div>\n	<span>\n		<div class=\"triangle\"></div>\n		Thank you for dropping a line!<br>\n		I'll reply to your message as soon as possible\n	</span>\n</div>");
          return msg_answered = true;
        }
      }
    };
    return msg_button.on('click', function(event) {
      event.preventDefault();
      return send_msg();
    });
  });

}).call(this);
