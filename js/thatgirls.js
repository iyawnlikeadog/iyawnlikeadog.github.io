window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           window.msRequestAnimationFrame ||
           function(callback) { window.setTimeout(callback, 1000 / 60); };
})();

var support = {animations : Modernizr.cssanimations},
  animEndEventNames = {'WebkitAnimation' : 'webkitAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend'},
  animEndEventName = animEndEventNames[Modernizr.prefixed('animation')],
  onEndAnimation = function(el, callback) {
    var onEndCallbackFn = function(ev) {
      if(support.animations) {
        if(ev.target != this) return;
        this.removeEventListener(animEndEventName, onEndCallbackFn);
      }
      if(callback && typeof callback === 'function') callback.call();
    };
    if(support.animations) el.addEventListener(animEndEventName, onEndCallbackFn);
    else onEndCallbackFn();
  },
  eventtype = mobileCheck() ? 'touchend' : 'click';

var $hackIntervals = [];

var $currentScreen = 0;
var $maxScreens = $(".screen").length;

var $scrollProgress = 0;
var $scrollingAllowed = false;

var $domClone;
var $name = "";

var $timelines = {
    screen1: {
        in: function() { return blurIn("#screen1"); },
        out: function() { return smokeOut("#screen1"); },
        idle: function() { return new TimelineMax(); }
    },
    screen2: {
        in: function() { return smokeIn("#screen2"); },
        out: function() { return screen2_out(); },
        idle: function() { return screen2_idle(); }
    },
    screen3: {
        in: function() { return screen3_in(); },
        out: function() { return screen3_out(); },
        idle: function() { return screen3_idle(); }
    },
    screen4: {
        in: function() { return screen4_in(); },
        out: function() { return screen4_out(); },
        idle: function() { return screen4_idle(); }
    },
    screen5: {
        in: function() { return blurIn("#screen5"); },
        out: function() {
            var timeline = smokeOut("#screen5");
            timeline.call(function() { colorSwitch(true); }, [], null, 2);

            return timeline;
        },
        idle: function() { return new TimelineMax(); }
    },
    screen6: {
        in: function() { return screen6_in(); },
        out: function() { return screen6_out(); },
        idle: function() { return new TimelineMax(); }
    },
    screen7: {
        in: function() { return screen7_in(); },
        out: function() { return screen7_out(); },
        idle: function() { return new TimelineMax(); }
    },
    screen8: {
        in: function() { return screen8_in(); },
        out: function() { return screen8_out(); },
        idle: function() { return screen8_idle(); }
    },
    screen9: {
        in: function() {
            var timeline = blurIn("#screen9");
            timeline.add(screen9_in(), 0);

            return timeline;
        },
        out: function() {
            var timeline = smokeOut("#screen9");
            timeline.add(screen9_out(), 0);

            return timeline;
        },
        idle: function() { return screen9_idle(); }
    },
    screen10: {
        in: function() {
            var timeline = smokeIn("#screen10");
            timeline.add(screen10_in(), 0);

            return timeline;
        },
        out: function() {
            var timeline = smokeOut("#screen10");
            timeline.add(screen10_out(), 0);
            timeline.call(function() { colorSwitch(false); });

            return timeline;
        },
        idle: function() { return screen10_idle(); }
    }
}

var $audioEngine;

$(document).ready(function() {
    if(mobileCheck()) $("html").addClass("isMobile");
    if(phoneCheck()) $("html").addClass("isPhone");
    if(tabletCheck()) $("html").addClass("isTablet");

    if(navigator.appName == "Microsoft Internet Explorer") {
      var agent = navigator.userAgent;

      if(agent.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/) != null) {
          var version = parseFloat(RegExp.$1);
          $("html").addClass("ie"+version);
      }
    };

    if(navigator.userAgent.match(/Firefox/)) $("html").addClass("isFirefox");

    TweenMax.to("#loading", 1, { opacity:1 });

    var hash = document.location.hash.indexOf("?") == -1 ? document.location.hash : document.location.hash.slice(0, document.location.hash.indexOf("?"));
    var hashName = hash.replace("#!/With/","");
    hashName = unescape(hashName);

    var welcomeText = $("#screen1 h1").text();
    var aboutText = $("#about p").eq(0).html();

    if(hash.indexOf("#!/With/") == 0 && hashName.length > 0 && hashName != "You") {
        $name = hashName;

        var startsWithVowel = function(string) {
            var check = false;
            var vowels = ["A", "E", "I", "O", "U"];

            for(var i = 0; i < vowels.length; i++) {
                if(string.charAt(0).toUpperCase() == vowels[i]) {
                    check = true;
                    break;
                }
            }

            return check;
        }

        welcomeText += " "+$name;


        if($("html").attr("lang") == "fr") {
            aboutText += " l'équipe ";
            aboutText += startsWithVowel($name) ? "d'" : "de ";
            aboutText += $name+" !";
        }
        else
            aboutText += " "+$name+"'s team!";

        document.title = "I Want To Work With "+$name+" - Victoria Nine";
    }
    else aboutText += $("html").attr("lang") == "fr" ? " vous !" : " you!";

    $("#screen1 h1").text(welcomeText);
    $("#about p").eq(0).html(aboutText);

    $(".letterize").each(function() { letterize($(this)); });

    $("#menu").on(eventtype, function() {
        $("#about").toggleClass("open");

        if($("#about").hasClass("open"))
            $audioEngine.SFX.play("open");
        else
            $audioEngine.SFX.play("close");
    });

    $("#soundSwitch").on(eventtype, function() { soundSwitch("toggle"); $audioEngine.BGM.userMuted = !$audioEngine.BGM.userMuted; });
    $("#languageSwitch a").each(function() { var href = $(this).attr("href"); href += document.location.hash; $(this).attr("href", href); });

    var myElement = document.getElementById('presentation');

    // create a simple instance
    // by default, it only adds horizontal recognizers
    // var mc = new Hammer(myElement);

    // let the pan gesture support all directions.
    // this will block the vertical scrolling on a touch-device while on the element
    // mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

    // listen to events...
    // mc.on("swipedown swiperight", function(e) {
    //     if($scrollProgress >= 1 || !$scrollingAllowed) return;
    //     if($currentScreen < $maxScreens) switchScreens(true);
    // });

    $domClone = $("#content").html();

    // Add event listeners on the loaded audio files
    $(document).on("loadingBGM loadingSFX", loadingScreen);

    // Initialize the audio engine
    // $audioEngine = AudioEngine.getInstance();
    // $audioEngine.BGM.setFile("bgs");

    $("#loading .letter").each(function(index) { hackString($(this), index) });
});

$(window).on("mousewheel", $.throttle( 250, function(e) {
    var deltaY = e.originalEvent.deltaY;
    var deltaX = e.originalEvent.deltaX;
    var delta = Math.abs(deltaY) > Math.abs(deltaX) ? deltaY : deltaX;
    if(delta == 0 || $scrollProgress >= 1 || !$scrollingAllowed) return;

    $scrollProgress += $("html").hasClass("isFirefox") ? delta / 2 : delta / 20;
    if($scrollProgress < 0) $scrollProgress = 0;
    if($scrollProgress > 1) $scrollProgress = 1;

    if($scrollProgress == 0 && $currentScreen > 1) return; //switchScreens(false);
    if($scrollProgress == 1 && $currentScreen < $maxScreens) switchScreens(true);
})).on("resize", positionTitle).on("blur", function() {
    // if($audioEngine.ready && !$audioEngine.BGM.userMuted) soundSwitch(false);
}).on("focus", function() {
    // if($audioEngine.ready && !$audioEngine.BGM.userMuted) soundSwitch(true);
}).on("keypress", function(e) {
    if(e.which == 13 && $scrollingAllowed && !$("#about").hasClass("open")) {
        e.preventDefault();

        switchScreens(true);
    }
});

function loadingScreen() {
  var percentBGM = $audioEngine.loadBGM * 100 / $audioEngine.BGM.files.length;
  var percentSFX = $audioEngine.loadSFX * 100 / $audioEngine.SFX.files.length;

  if(isNaN(percentBGM) || !isFinite(percentBGM)) percentBGM = 0;
  if(isNaN(percentSFX) || !isFinite(percentSFX)) percentSFX = 0;

  var totalLoad = $audioEngine.loadBGMTotal + $audioEngine.loadSFXTotal;
  var coeffBGM = $audioEngine.loadBGMTotal / totalLoad;
  var coeffSFX = $audioEngine.loadSFXTotal / totalLoad;
  var totalPercent = parseFloat((coeffBGM * percentBGM).toFixed(2)) + parseFloat((coeffSFX * percentSFX).toFixed(2));

  var letterIndex = Math.floor($("#loading .letter").length * totalPercent / 100);

  $("#loading .letter").each(function(index) {
    if(index <= letterIndex && !$(this).hasClass("passed")) {
        cancelAnimationFrame($hackIntervals[index]);

        var initialLetter = $(this).data("letter");
        $(this).html(initialLetter);
        $(this).addClass("passed");
    }
  });

  if(totalPercent == 100) {
    $(document).off("loadingBGM loadingSFX", loadingScreen);
    $("body").addClass("loaded");
    if(mobileCheck()) $("#loading").addClass("tap");

    checkFocus(function() {
        if(mobileCheck()) $(window).on(eventtype, start);
        else setTimeout(start, 1000);
    });
  }
}

function start() {
    if(mobileCheck()) {
        $(window).off(eventtype, start);
        $("#loading").removeClass("tap");
    }

    TweenMax.staggerTo(shuffleArray($("#loading .letter")), 1, { opacity:0 }, .1, function() {
        TweenMax.set("#loading", { display:"none" });

        $audioEngine.BGM.play();

        TweenMax.staggerFromTo(["#menu", "#soundSwitch", "#languageSwitch", "#progressBar"], 1, { opacity:0, visibility:"visible" }, { opacity:.5, clearProps:"opacity", delay:2 }, .5);
        init();
    });
}

function init() {
    $currentScreen = 0;
    $progress = 0;

    $("#bt_retry").on(eventtype, function() {
        if(!$scrollingAllowed) return;

        $(this).off(eventtype);
        reset();
    });

    TweenMax.killAll(false, false, true, false);
    TweenMax.set("#scroll", { opacity:0 });
    switchScreens(true);
}

function reset() {
    var timeline = new TimelineMax();
    timeline = $timelines.screen10.out();
    timeline.call(function() {
        $("#presentation").find("#content").empty();
        $("#content").html($domClone);

        init();
    }, [], null, "+=1");
}

function switchScreens(direction) {
    var prevScreen = $currentScreen;

    if(direction) {
        $currentScreen++;

        var prevIdle;

        if(prevScreen > 0) {
            clearProps($timelines["screen"+prevScreen].out());
            prevIdle = $timelines["screen"+prevScreen].idle();
        }
        clearProps($timelines["screen"+$currentScreen].in());

        var timeline = new TimelineMax({ onStart:disableScroll, onComplete:enableScroll });
        if(prevScreen > 0) {
            timeline.add($timelines["screen"+prevScreen].out());
            timeline.call(function() { hideScreen(prevScreen); prevIdle.kill(); clearProps(prevIdle); });
        }
        timeline.call(function() { showScreen($currentScreen); }, [], null, "-=2");
        timeline.add($timelines["screen"+$currentScreen].in(), "-=1");

        if($currentScreen == 4)
            timeline.call($timelines["screen"+$currentScreen].idle, [], null, 0);
        else if($currentScreen == 8)
            timeline.call($timelines["screen"+$currentScreen].idle, [], null, "-=1");
        else if($currentScreen == 10)
            timeline.call($timelines["screen"+$currentScreen].idle, [], null, "-=2");
        else
            timeline.call($timelines["screen"+$currentScreen].idle);
    }
    else {
        $currentScreen--;

        var prevIdle = $timelines["screen"+prevScreen].idle();

        if(prevScreen > 0) clearProps($timelines["screen"+prevScreen].in());
        clearProps($timelines["screen"+$currentScreen].out());

        var timeline = new TimelineMax({ onStart:disableScroll, onComplete:enableScroll });
        timeline.add($timelines["screen"+prevScreen].in().reverse());
        timeline.call(function() { hideScreen(prevScreen); prevIdle.kill(); clearProps(prevIdle); });
        if(prevScreen > 0) {
            timeline.call(function() { showScreen($currentScreen); }, [], null, "-=1");
            timeline.add($timelines["screen"+$currentScreen].out().reverse());
        }

        if(prevScreen == 4)
            timeline.call($timelines["screen"+prevScreen].idle, [], null, 0);
        else if(prevScreen == 8)
            timeline.call($timelines["screen"+prevScreen].idle, [], null, "-=1");
        else if(prevScreen == 10)
            timeline.call($timelines["screen"+prevScreen].idle, [], null, "-=2");
        else
            timeline.call($timelines["screen"+prevScreen].idle);
    }

    var progressRatio = $currentScreen / $maxScreens;
    var progressText = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

    $("#progressBar").css("height", "calc((100vh - 5vw - 165px - 2em) * "+progressRatio+")");
    $("#progressBar").attr("data-progress", "- "+progressText[$currentScreen - 1]+" / "+progressText[$maxScreens - 1]+" -");

    $scrollProgress = 0;
}

function enableScroll() { $scrollingAllowed = true; if($currentScreen < $maxScreens) TweenMax.to("#scroll", 1, { opacity:1 }); }
function disableScroll() { $scrollingAllowed = false; TweenMax.to("#scroll", 1, { opacity:0 }); }
function toggleScroll() { $scrollingAllowed ? disableScroll() : enableScroll(); }

function showScreen(screenNb) { $("#screen"+screenNb).addClass("active"); }
function hideScreen(screenNb) { $("#screen"+screenNb).removeClass("active"); }
function toggleScreen(screenNb) { $("#screen"+screenNb).toggleClass("active"); }

function soundSwitch(state) {
  if(state == true) { $audioEngine.unMute(); $("#soundSwitch").removeClass("off").addClass("on"); }
  else if(state == false) { $audioEngine.mute(); $("#soundSwitch").removeClass("on").addClass("off"); }
  else { $audioEngine.toggleMute(); $("#soundSwitch").toggleClass("on off"); }
}

function blurIn(screen) {
    var letters = shuffleArray($(screen+" .letter"));
    var textShadowColor = $("body").hasClass("white") ? "34, 34, 34" : "255, 255, 255";
    var textShadow = "0 24px 8px rgba("+textShadowColor+", 0), 0 -24px 8px rgba("+textShadowColor+", 0)";
    var sound = (screen == "#screen9") ? "reveal2" : (screen == "#screen5") ? "swooshIn" : "reveal1";

    var timeline = new TimelineMax();
    timeline.call(function() { $audioEngine.SFX.play(sound); }, [], null, .25);
    timeline.staggerFrom(letters, 1, { color:"transparent", scale:1.5 }, .1);
    timeline.staggerFrom(letters, 1, { textShadow:textShadow }, .1, .5);

    return timeline;
}

function smokeIn(screen) {
    var textShadowColor = $("body").hasClass("white") ? "34, 34, 34" : "255, 255, 255";

    var timeline = new TimelineMax();
    timeline.call(function() { $audioEngine.SFX.play("swooshIn"); }, [], null, .25);
    timeline.set(screen+" .letter", { color:"transparent" });
    timeline.staggerFrom(screen+" .letter", 2, { transform: "translate3d(15rem,-8rem,0) rotate(-40deg) skewX(70deg) scale(1.5)", opacity: 0, ease:Power0.none }, -.075);
    timeline.staggerFromTo(screen+" .letter", 1, { textShadow: "0 0 40px rgb("+textShadowColor+")" }, { textShadow: "0 0 0px rgb("+textShadowColor+")", ease:Power0.none }, -.075, 0);

    if(screen == "#screen2") {
        timeline.call(positionTitle, [], null, "-=1");
        timeline.call(function() { $audioEngine.SFX.play("slideIn"); });
        timeline.from(screen+" h2", 1, { x: -40, opacity:0 });
    }

    return timeline;
}

function smokeOut(screen) {
    var textShadowColor = $("body").hasClass("white") ? "34, 34, 34" : "255, 255, 255";

    var timeline = new TimelineMax();
    if(screen == "#screen10") timeline.call(function() { $audioEngine.SFX.play("reset"); });
    else timeline.call(function() { $audioEngine.SFX.play("swooshOut"); }, [], null, .25);
    timeline.set(screen+" .letter", { color:"transparent" });
    timeline.staggerFromTo(screen+" .letter", 1, { textShadow: "0 0 0px rgb("+textShadowColor+")" }, { textShadow: "0 0 40px rgb("+textShadowColor+")", ease:Power0.none }, .075);
    timeline.staggerTo(screen+" .letter", 2, { transform: "translate3d(15rem,-8rem,0) rotate(-40deg) skewX(70deg) scale(1.5)", opacity: 0, ease:Power0.none }, .075, 0);

    return timeline;
}

function screen2_out() {
    var timeline = new TimelineMax();
    timeline.call(positionTitle);
    timeline.to("#screen2 h2", 1, { x: 40, opacity:0 });
    timeline.set("#screen2 h1", { fontSize:"7vw" }, .5);
    timeline.call(function() { $audioEngine.SFX.play("swooshOut"); });
    timeline.to("#screen2 h1", 2, { fontSize:"200vw", opacity:0, ease:Expo.easeInOut });
    timeline.set("#screen2 h1", { fontSize:"200vw" });

    return timeline;
}

function screen2_idle() {
    var timeline = new TimelineMax();
    timeline.to("#screen2 .glitch-text", 3, { y:-15, repeat:-1, yoyo:true, ease: Sine.easeInOut });

    return timeline;
}

function screen3_in() {
    var timeline = new TimelineMax();
    timeline.add("start");
    timeline.call(function() { $audioEngine.SFX.play("swooshIn"); }, [], null, "start+=1");
    timeline.set("#screen3 h1.first", { fontSize:"200vw" }, "start");
    timeline.fromTo("#screen3 h1.first", 3, { fontSize:"200vw", opacity:0 }, { fontSize:"7vw", opacity:1, ease:Expo.easeInOut }, "start+=.25");
    timeline.set("#screen3 h1.first", { fontSize:"7vw" });

    timeline.from("#screen3 h1.first .word:nth-of-type(2)", 1, { transform:"rotate(90deg)", opacity:0, ease:Bounce.easeOut }, "-=.5");
    timeline.from("#screen3 h1.first .word:nth-of-type(3)", 1, { y:20, opacity:0, ease:Bounce.easeOut }, "-=.5");
    timeline.from("#screen3 h1.first .word:nth-of-type(4)", 1, { x:20, opacity:0, ease:Bounce.easeOut }, "-=.5");

    timeline.add("glitch1", "-=.75");
    timeline.call(function() { $audioEngine.SFX.play("interference1"); }, [], null, "glitch1+=2.5");
    timeline.set("#screen3 h1.first .word", { opacity:1, textShadow: "0 0 0 rgba(255, 0, 0, 0), 0 0 0 rgba(0, 255, 255, 0)" }, "glitch1");
    timeline.to("#screen3 h1.first .word", 2, {
        opacity:0,
        color: "transparent",
        textShadow: "12px 0 0 rgba(255, 0, 0, .5), -12px 0 0 rgba(0, 255, 255, .5)",
        ease: RoughEase.ease.config({ template: Bounce.easeOut, strength: 1, points: 20, taper: "none", randomize: true, clamp: true })
    });

    timeline.add("glitch2");
    timeline.from("#screen3 h1.second", 2, {
        opacity: 0,
        color: "transparent",
        textShadow: "12px 0 0 rgba(255, 0, 0, .5), -12px 0 0 rgba(0, 255, 255, .5)",
        ease: RoughEase.ease.config({ template: Bounce.easeOut, strength: 1, points: 20, taper: "none", randomize: true, clamp: true })
    });
    timeline.call(function() { $audioEngine.SFX.play("interference2"); }, [], null, "glitch2");

    return timeline;
}

function screen3_out() {
    TweenMax.killTweensOf("#screen3 h1.second");

    var timeline = new TimelineMax();
    timeline.call(function() { $audioEngine.SFX.play("noise"); });
    timeline.set("#screen3 h1.second", { webkitAnimation:"none", animation:"none" });
    timeline.set("#screen3 h1.second", { transform:"scale(4)" });
    timeline.set("#screen3 h1.second", { transform:"scale(2) translateX(-15vw)" }, "+=.2");
    timeline.set("#screen3 h1.second", { transform:"scale(8) translateX(20vw)" }, "+=.2");
    timeline.set("#screen3 h1.second", {}, "+=.2"); // Dummy wait

    return timeline;
}

function screen3_idle() {
    var tween = TweenMax.to("#screen3 h1.second", 2, {
        opacity: 0,
        color: "transparent",
        textShadow: "12px 0 0 rgba(255, 0, 0, 0), -12px 0 0 rgba(0, 255, 255, 0)",
        ease: RoughEase.ease.config({ template: Bounce.easeOut, strength: 1, points: 20, taper: "none", randomize: true, clamp: true })
    });

    var timeline = new TimelineMax({ repeat:-1, repeatDelay:2, delay:2 });
    timeline.call(function() { if($("#screen3").hasClass("active")) $audioEngine.SFX.play("interference"+Math.ceil(Math.random() * 2)); });
    timeline.add(tween.reverse());
    timeline.add(tween);

    return timeline;
}

function screen4_in() {
    var textShadow = "0 24px 8px rgba(255, 255, 255, 0), 0 -24px 8px rgba(255, 255, 255, .0)";

    var timeline = new TimelineMax({ delay:1.25 });
    timeline.call(function() {
        TweenMax.to("#screen4 .glitch-text", 3, { y:-25, repeat:-1, yoyo:true, ease: Sine.easeInOut }, .5);
    });
    timeline.call(function() { $audioEngine.SFX.play("slideOut"); }, [], null, .25);
    timeline.staggerFrom("#cube .face", 1, { opacity:0 }, .25);
    timeline.call(function() { $audioEngine.SFX.play("slideIn"); }, [], null, "-=.5");
    timeline.from("#screen4 h2.first", .5, { opacity:0, color:"transparent" });

    timeline.add("solid", "+=2");
    timeline.call(function() { $("#cube").addClass("solid"); }, [], null, "solid");
    timeline.to("#screen4 h2.first", 1, { opacity:0, color:"transparent" }, "solid");
    timeline.call(function() { $audioEngine.SFX.play("swooshIn"); });
    timeline.call(function() { $audioEngine.SFX.play("slideOut"); });
    timeline.staggerFrom($("h2.second .letter"), .5, { fontWeight:100, opacity:0, textShadow:textShadow }, .075);

    return timeline;
}

function screen4_out() {
    var timeline = new TimelineMax();
    timeline.call(function() { $("#cube").removeClass("solid"); });
    timeline.call(function() { $audioEngine.SFX.play("swooshOut"); });
    timeline.to("#screen4 h2.second", 1, { opacity:0, left:"2.5vw" });
    timeline.staggerTo("#cube .face", 1, { opacity:0 }, .25, "-=.5");
    timeline.to("#scene", 1, { opacity:0 }, "-=1");
    timeline.set("#scene", {}, "+=1"); // Dummy wait

    return timeline;
}

function screen4_idle() {
    var rotate = new TimelineMax({ repeat:-1 });
    rotate.to("#cube", 2, { rotationX:"+=90_cw" }, 0);
    rotate.to("#cube", 2, { rotationY:"+=90_cw" }, 2);
    rotate.to("#cube", 2, { rotationX:"+=90_cw" }, 4);
    rotate.to("#cube", 2, { rotationY:"+=90_cw" }, 6);
    rotate.to("#cube", 2, { rotationX:"+=90_cw" }, 8);
    rotate.to("#cube", 2, { rotationY:"+=90_cw" }, 10);
    rotate.to("#cube", 2, { rotationX:"+=90_cw" }, 12);
    rotate.to("#cube", 2, { rotationY:"+=90_cw" }, 14);

    var timeline = new TimelineMax();
    timeline.set("#cube", { rotationX:"30_ccw", rotationY:"30_cw" });
    timeline.add(rotate);
    timeline.to("#scene", 3, { y:-25, repeat:-1, yoyo:true, ease: Sine.easeInOut }, 0);

    return timeline;
}

function screen6_in() {
    var timeline = new TimelineMax();
    timeline.call(function() { $audioEngine.SFX.play("swell"); });
    timeline.call(function() { $audioEngine.SFX.play("slideIn"); });
    timeline.set("#charas", { scale:.5, xPercent:50, x:-240 });
    timeline.from("#screen6 h1", 2, { opacity:0, top:"-3em", ease:Elastic.easeOut });
    timeline.fromTo(".me", 2, { opacity:0, y:-80 }, { opacity:1, y:0, ease:Elastic.easeOut }, "-=1");

    return timeline;
}

function screen6_out() {
    var timeline = new TimelineMax();
    timeline.call(function() { $audioEngine.SFX.play("slideOut"); });
    timeline.to("#screen6 h1", 1, { opacity:0, right:"-3em" });

    return timeline;
}

function screen7_in() {
    var timeline = new TimelineMax();
    timeline.set("#charas", { scale:.5, xPercent:50, x:-240 });
    timeline.call(function() { $audioEngine.SFX.play("slideIn"); }, [], null, .5);
    timeline.from("#screen7 h1", 2, { opacity:0, top:"-3em", ease:Elastic.easeOut });
    timeline.fromTo("#charas", 1, { scale:.5, xPercent:50, x:-240 }, { scale:1, xPercent:50, x:-96, ease:Elastic.easeOut }, .5);

    return timeline;
}

function screen7_out() {
    var timeline = new TimelineMax();
    timeline.call(function() { $audioEngine.SFX.play("slideOut"); });
    timeline.to("#screen7 h1", 1, { opacity:0, right:"-3em" });

    return timeline;
}

function screen8_in() {
    var timeline = new TimelineMax();
    timeline.call(function() { $audioEngine.SFX.play("slideIn"); }, [], null, .5);
    timeline.from("#screen8 h1", 2, { opacity:0, top:"-0.5em", ease:Elastic.easeOut });

    timeline.call(function() { $(".speech").html("level up!"); });
    timeline.fromTo(".speech", 2, { opacity:0, y:"-10em" }, { opacity:1, y:0, ease:Elastic.easeOut }, "-=1");

    return timeline;
}

function screen8_out() {
    var bounce = $timelines.screen8.idle().getChildren()[0];

    var timeline = new TimelineMax();
    timeline.call(function() { $audioEngine.SFX.play("slideOut"); });
    timeline.to("#screen8 h1", 1, { opacity:0, right:"-3em" });
    timeline.call(function() {
        bounce.kill();

        var reset = new TimelineMax();
        reset.set(bounce.target, { opacity:1 });
        reset.to(bounce.target, .75, { y:0 });
    }, [], null, "-=1");
    timeline.to(".speech", 1, { opacity:0, y:"-10em" }, "+=.75");

    return timeline;
}

function screen8_idle() {
    var timeline = new TimelineMax();
    timeline.to([".me", ".speech"], .75, { y:-50, repeat:-1, yoyo:true, ease:Bounce.easeIn });

    return timeline;
}

function screen9_in() {
    var timeline = new TimelineMax();
    timeline.fromTo("#charas", 1, { xPercent:50, x:-96 }, { xPercent:0, x:0, ease:Circ.easeInOut });
    timeline.staggerTo([".npc1", ".npc2", ".npc3"], .5, { opacity:1 }, .25);
    timeline.fromTo("#screen9 .question", 2, { opacity:0 }, { opacity:1, ease:Elastic.easeOut }, "-=1");

    return timeline;
}

function screen9_out() {
    var blink = $timelines.screen9.idle().getChildren()[0];

    var timeline = new TimelineMax();
    timeline.call(function() { blink.kill(); TweenMax.to(blink.target, .75, { opacity:1 }); });
    timeline.fromTo("#screen9 .question", 1, { opacity:1 }, { opacity:0 }, "+=.75");

    return timeline;
}

function screen9_idle() {
    var timeline = new TimelineMax();
    timeline.to("#screen9 .question", .75, { opacity:.5, repeat:-1, yoyo:true, ease:Bounce.easeIn });

    return timeline;
}

function screen10_in() {
    var timeline = new TimelineMax();
    timeline.set(".chara", { opacity:1 });
    timeline.call(function() { $(".speech").html("Hi!"); });
    timeline.call(function() { $audioEngine.SFX.play("speech"); }, [], null, 2);
    timeline.fromTo(".speech", 2, { opacity:0, y:"-10em" }, { opacity:1, y:0, ease:Elastic.easeOut }, 2);
    timeline.staggerTo([".npc1", ".npc2", ".npc3"], .5, { scaleX:-1, x:96*2, ease:Bounce.easeOut }, .25, "-=1");
    timeline.fromTo("#screen10 .question", 2, { opacity:0 }, { opacity:1, ease:Elastic.easeOut });
    timeline.call(function() { $("#menu").trigger(eventtype); });

    return timeline;
}

function screen10_out() {
    var blink = $timelines.screen10.idle().getChildren()[1];

    var timeline = new TimelineMax();
    timeline.call(function() { blink.kill(); TweenMax.to(blink.target, .75, { opacity:1 }); });
    timeline.fromTo("#screen10 .question", 1, { opacity:1 }, { opacity:0 }, "+=.75");
    timeline.set("#screen10", { opacity:0 }, "+=1");
    timeline.to("#charas", 2, { opacity:0 }, "-=1");

    return timeline;
}

function screen10_idle() {
    var timeline = new TimelineMax();
    timeline.staggerTo([[".me",".speech"],".npc1", ".npc2", ".npc3"], .75, { y:-50, repeat:-1, yoyo:true, ease:Bounce.easeIn }, .25);
    timeline.to("#screen10 .question", .75, { opacity:.5, repeat:-1, yoyo:true, ease:Bounce.easeIn }, 4);

    return timeline;
}

function positionTitle() {
    var offset = Math.round($("#screen2 .letter").last().offset().left + $("#screen2 .letter").last().width());
    $("#screen2 h2").css("right", $(window).width() - offset);
}

function colorSwitch(toWhite) {
    var particlesColors = toWhite ? [255, 0] : [0, 255];
    var textColors = toWhite ? [255, 34] : [34, 255];

    if(toWhite) {
        $("body").addClass("white");

        $audioEngine.BGM.setCrossfade("glitch", 0, 5);
        $audioEngine.BGM.setCrossfade("data", 1, 5);
    }
    else {
        $("body").removeClass("white");

        $audioEngine.BGM.setCrossfade("glitch", 1, 5);
        $audioEngine.BGM.setCrossfade("data", 0, 5);
    }

    TweenMax.to(".letter", 1, { color:"rgb("+textColors[1]+", "+textColors[1]+", "+textColors[1]+")" });

    if($("html").hasClass("isFirefox")) return;

    var tween = TweenMax.to($({ someValue: particlesColors[0] }), 2, { someValue: particlesColors[1], ease:Power3.easeInOut,
        onUpdate:function(tween) {
            var newValue = Math.floor(tween.target[0].someValue);
            firefliesColors[0] = newValue+", "+newValue+", "+newValue;
        },
        onUpdateParams:["{self}"]
    });
}

function letterize(string) {
    var html = string.html();
    var newHTML = "";

    var escapeArray = [];
    var escaping = false;

    $.each(html.split(''), function(i, l) {
       if(l == "<") escaping = true;

       if(escaping) {
            escapeArray.push(l);

            if(l == ">") {
                newHTML += escapeArray.join("");

                escaping = false;
                escapeArray = [];
            }

            return;
       }

       var classList = "letter";
       if(l == " ") classList += " space";

       if(string.hasClass("letterData"))
         newHTML += "<span class=\""+classList+"\" data-letter=\""+l+"\">" + l + "</span>";
       else
         newHTML += "<span class=\""+classList+"\">" + l + "</span>";
    });

    string.html(newHTML);
}

function hackString(string, index) {
    $hackIntervals[index] = requestAnimationFrame(function() {
        hackString(string, index);
    });

    var hack = Math.floor(Math.random() * 36).toString(36);
    string.html(hack);
}


//===============================
// TOOLBOX
//===============================
function checkFocus(callback) {
  var waitForFocus = function() {
    $(window).off("focus", waitForFocus);
    callback();
  };

  if(document["hasFocus"]()) callback();
  else $(window).on("focus", waitForFocus);
}

function shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while(0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function clearProps(timeline) {
    var targets = timeline.getChildren();
    timeline.kill();

    for (var i = 0; i < targets.length; i++) {
    if(targets[i].target != null)
      TweenMax.set(targets[i].target, { clearProps:"all" });
    }
}


//===============================
// MOBILE DETECTION
// http://stackoverflow.com/a/11381730/989439
//===============================
function mobileCheck() {
  var check = false;
  (function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

function phoneCheck() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

function tabletCheck() {
  var check = false;
  if(!phoneCheck() && mobileCheck()) check = true;
  return check;
}

//===============================
// GOOGLE ANALYTICS
(function(b,o,i,l,e,r){
//===============================
    b.GoogleAnalyticsObject=l;b[l]||(b[l]=function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
    e=o.createElement(i);r=o.getElementsByTagName(i)[0];
    e.src='//www.google-analytics.com/analytics.js';
    r.parentNode.insertBefore(e,r)
}(window,document,'script','ga'));
ga('create','UA-43190815-1');ga('send','pageview');
