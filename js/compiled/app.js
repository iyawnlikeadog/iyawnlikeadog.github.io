var $,lang,lang_array,lang_en,lang_ru,project_classes,projects;$=jQuery,lang_en=null,lang_ru=null,lang_array=null,lang="en",projects=null,project_classes=[],$(window).load(function(){return $("#cover").css("opacity","0"),setTimeout(function(){return $("#cover").remove()},1600)}),$(document).ready(function(){var a;return a=function(a,n){return lang=a,"en"===a&&(lang_array=lang_en),"ru"===a&&(lang_array=lang_ru),$("body").removeClass("en, ru").addClass(lang),$("lang").each(function(){var a;return a=$(this).attr("text"),$(this).html(lang_array[a])}),$(".glitch").each(function(){var a;return a=$(this).attr("data-lang"),$(this).attr("data-content",lang_array[a])}),type_introducing(n),$("input, textarea").each(function(){var a;return a=$(this).attr("id"),$(this).attr("placeholder",lang_array[a])})},$.ajax({dataType:"json",url:"js/projects.json",success:function(a){return projects=a,load_projects(a),$.each(a,function(a,n){return project_classes[a]=n["class"]})}}),$.ajax({dataType:"json",url:"langs/en.json",success:function(n){return lang_en=n,a("en")}}),$.ajax({dataType:"json",url:"langs/ru.json",success:function(a){return lang_ru=a}}),$(".langs span").on("click",function(){var n;return n=$(this).attr("data-lang"),n!==lang?($(this).addClass("active").siblings().removeClass("active"),a(n,!0)):void 0})});