var restart_animation,type_introducing;restart_animation=function(n){var a;return a=$(n),a.css({transform:"translateZ(0) scale(1, 1)","-webkit-animation-name":"none","-moz-animation-name":"none","-ms-animation-name":"none","-o-animation-name":"none","animation-name":"none"}),setTimeout(function(){return a.css({"-webkit-animation-name":"","-moz-animation-name":"","-ms-animation-name":"","-o-animation-name":"","animation-name":""})},0)},type_introducing=function(n){var a,i,t,e,o,m,r,s,l,u;for($("#hello h3").empty(),l=lang_array.greetings,i=n?0:1,"en"===lang&&(r=17),"ru"===lang&&(r=12),s=[],t=e=0,o=l.length;o>e;t=++e)m=l[t],u=.14*Math.random()+.06,i+=u," "===m&&(m="&nbsp;"),a="",t===r&&mobile&&(a="<br>"),s.push($("#hello h3").append("<span class='animated fadeIn' style='animation-delay:"+i+"s;animation-duration:0s;'>"+m+"</span>"+a));return s};