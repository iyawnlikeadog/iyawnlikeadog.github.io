var $, lang, lang_array, lang_en, lang_ru, projects;

$ = jQuery;

lang_en = null;

lang_ru = null;

lang_array = null;

lang = 'en';

projects = null;

$(window).load(function() {
  $('#cover').css('opacity', '0');
  return setTimeout(function() {
    return $('#cover').remove();
  }, 1600);
});

$(document).ready(function() {
  var translate;
  translate = function(new_lang, delay_off) {
    lang = new_lang;
    if (new_lang === "en") {
      lang_array = lang_en;
    }
    if (new_lang === "ru") {
      lang_array = lang_ru;
    }
    $('body').removeClass('en, ru').addClass(lang);
    $('lang').each(function() {
      var text;
      text = $(this).attr('text');
      return $(this).html(lang_array[text]);
    });
    return type_introducing(delay_off);
  };
  $.ajax({
    dataType: "json",
    url: "projects.json",
    success: function(data) {
      projects = data;
      return load_projects(data);
    }
  });
  $.ajax({
    dataType: "json",
    url: "langs/en.json",
    success: function(data) {
      lang_en = data;
      return translate('en');
    }
  });
  $.ajax({
    dataType: "json",
    url: "langs/ru.json",
    success: function(data) {
      return lang_ru = data;
    }
  });
  $('.langs span').on('click', function() {
    var new_lang;
    new_lang = $(this).attr('data-lang');
    if (new_lang !== lang) {
      $(this).addClass('active').siblings().removeClass('active');
      return translate(new_lang, true);
    }
  });
  resize_elements();
  return $(window).resize(function() {
    return resize_elements();
  });
});
