var makeSomeNoise;

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
