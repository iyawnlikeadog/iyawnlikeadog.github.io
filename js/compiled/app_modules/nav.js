var disableScrolling, navnext, navprev, reanimate, update_nav;

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
  var animations, i, j, len, ref;
  animations = $('#' + to_show + ' .animated');
  update_nav();
  restart_animation(animations);
  switch (to_show) {
    case 'intro':
      pJSDom[0].pJS.particles.move.enable = true;
      pJSDom[0].pJS.fn.particlesRefresh();
      break;
    case 'projects':
      ref = [1, 2, 3];
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        $("#projects .owl-item.active .col:nth-of-type(" + i + ") .item").css('animation-delay', 100 + 300 * i + 'ms');
      }
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

disableScrolling = false;

$(window).on('mousewheel', function(e) {
  var content_height, scrolled, section_height;
  if (disableScrolling === true) {
    e.preventDefault();
  }
  if (disableScrolling === false) {
    if ($('section.active:has(div.hasScrollbar)').length === 0) {
      if (e.originalEvent.wheelDelta > 5) {
        $(navprev).click();
      } else {
        $(navnext).click();
      }
      disableScrolling = true;
      return setTimeout(function() {
        return disableScrolling = false;
      }, 1500);
    } else {
      content_height = $('section.active .center').height();
      section_height = $('section.active').height();
      scrolled = $('section.active .container-outer').scrollTop();
      if (e.originalEvent.wheelDelta > 5) {
        if (scrolled === 0) {
          $(navprev).click();
          disableScrolling = true;
          return setTimeout(function() {
            return disableScrolling = false;
          }, 1500);
        }
      } else {
        if (scrolled + section_height >= content_height + 60) {
          $(navnext).click();
          disableScrolling = true;
          return setTimeout(function() {
            return disableScrolling = false;
          }, 1500);
        }
      }
    }
  }
});
