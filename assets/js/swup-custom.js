//////////////
// SWUP SPA //
//////////////
var slideUpIn = function(next){

  var horizontal = document.getElementById("horizontalScroll");

  horizontal.style.overflowX = "hidden";
  TweenMax.from(horizontal, 1.25, { y: vhUnits(-100), ease: Power3.easeOut })
  .eventCallback("onComplete", function(){

    horizontal.style.overflowX = "scroll";
    horizontal.style.overflowX = "overlay";

    next();
  });
}

var slideUpOut = function(next){
  
  var vertical = document.getElementById("verticalScroll");
  
  //vertical.style.overflowY = "hidden";

  var tlscroll = new TimelineMax();
  tlscroll.to(vertical, 0.666, { scrollTo: 0, ease: Power1.easeIn })
  .to(vertical, 1.25, { y: vhUnits(100), ease: Power3.easeOut }, "-=0.167")
  .eventCallback("onComplete", function(){

    vertical.style.overflowY = "scroll";
    vertical.style.overflowY = "overlay";

    next();

  });
};

var slideDownIn = function(next){

  var vertical = document.getElementById("verticalScroll");

  vertical.style.overflowY = "hidden";

  TweenMax.from(vertical, 1.25, { y: vhUnits(100), ease: Power3.easeOut })
  .eventCallback("onComplete", function(){

    vertical.style.overflowY = "scroll";
    vertical.style.overflowY = "overlay";

    next();

  });
}

var slideDownOut = function(next){

  var horizontal = document.getElementById("horizontalScroll");

  horizontal.style.overflowX = "hidden";

  TweenMax.to(horizontal, 1.25, { y: vhUnits(-100), ease: Power3.easeIn })
  .eventCallback("onComplete", function(){

    horizontal.style.overflowX = "scroll";
    horizontal.style.overflowX = "overlay";

    next();

  });
}

var slideRightIn = function(next){

  var vertical = document.getElementById("verticalScroll");

  if ((!matchMedia("(pointer:coarse)").matches) && (!matchMedia("(hover:none)").matches)) { vertical.style.overflowY = "hidden"; }

  TweenMax.from(vertical, 1.25, { x: vwUnits(100), ease: Power3.easeOut })
  .eventCallback("onComplete", function(){

    vertical.style.overflowY = "scroll";
    vertical.style.overflowY = "overlay";

    next();

  });
}

var slideRightOut = function(next){

  var vertical = document.getElementById("verticalScroll");

  if ((!matchMedia("(pointer:coarse)").matches) && (!matchMedia("(hover:none)").matches)) { vertical.style.overflowY = "hidden"; }

  TweenMax.to(vertical, 1.25, { x: vwUnits(-100), ease: Power3.easeIn })
  .eventCallback("onComplete", function(){

    vertical.style.overflowY = "scroll";
    vertical.style.overflowY = "overlay";

    next();

  });
}

var slideLeftIn = function(next){

  var vertical = document.getElementById("verticalScroll");

  if ((!matchMedia("(pointer:coarse)").matches) && (!matchMedia("(hover:none)").matches)) { vertical.style.overflowY = "hidden"; }

  TweenMax.from(vertical, 1.25, { x: vwUnits(-100), ease: Power3.easeOut })
  .eventCallback("onComplete", function(){

    vertical.style.overflowY = "scroll";
    vertical.style.overflowY = "overlay";

    next();

  });
}

var slideLeftOut = function(next){

  var vertical = document.getElementById("verticalScroll");

  if ((!matchMedia("(pointer:coarse)").matches) && (!matchMedia("(hover:none)").matches)) { vertical.style.overflowY = "hidden"; }

  TweenMax.to(vertical, 1.25, { x: vwUnits(100), ease: Power3.easeIn })
  .eventCallback("onComplete", function(){

    vertical.style.overflowY = "scroll";
    vertical.style.overflowY = "overlay";

    next();

  });
}

var options = {
  //LINK_SELECTOR: 'a[href^="' + window.location.origin + '"]:not([data-no-swup]), a[href^="/"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])',
  elements: ["#swup"],
  cache: true,
  support: true,
  debugMode: false,
  animateHistoryBrowsing: false,
  animations: {
    '*': {
      in: function(next){ next(); },
      out: function(next){ next(); }
    },
    
    // slide up
    '*>homepage': {
      in: function(next){ slideUpIn(next); },
      out: function(next){ slideUpOut(next); }
    },

    //slide down
    'homepage>*': {
      in: function(next){ slideDownIn(next); },
      out: function(next){ slideDownOut(next); }
    },


    // waterfire
    'waterfire>avocado': {
      in: function(next){ slideRightIn(next); },
      out: function(next){ slideRightOut(next); }
    },
    'waterfire>social-ore': {
      in: function(next){ slideRightIn(next); },
      out: function(next){ slideRightOut(next); }
    },
    'waterfire>big-data': {
      in: function(next){ slideRightIn(next); },
      out: function(next){ slideRightOut(next); }
    },
    'waterfire>herman-miller': {
      in: function(next){ slideRightIn(next); },
      out: function(next){ slideRightOut(next); }
    },
    'waterfire>append': {
      in: function(next){ slideRightIn(next); },
      out: function(next){ slideRightOut(next); }
    },
    'waterfire>portraiture': {
      in: function(next){ slideRightIn(next); },
      out: function(next){ slideRightOut(next); }
    },
    'waterfire>thirtyfivemm': {
      in: function(next){ slideRightIn(next); },
      out: function(next){ slideRightOut(next); }
    },
    'waterfire>spotify': {
      in: function(next){ slideRightIn(next); },
      out: function(next){ slideRightOut(next); }
    },

    // avocado
    'avocado>waterfire': {
      in: function(next){ slideLeftIn(next); },
      out: function(next){ slideLeftOut(next); }
    },
    'avocado>social-ore': {
      in: function(next){ slideRightIn(next); },
      out: function(next){ slideRightOut(next); }
    },
    'avocado>big-data': {
      in: function(next){ slideRightIn(next); },
      out: function(next){ slideRightOut(next); }
    },
    'avocado>herman-miller': {
      in: function(next){ slideRightIn(next); },
      out: function(next){ slideRightOut(next); }
    },
    'avocado>append': {
      in: function(next){ slideRightIn(next); },
      out: function(next){ slideRightOut(next); }
    },
    'avocado>portraiture': {
      in: function(next){ slideRightIn(next); },
      out: function(next){ slideRightOut(next); }
    },
    'avocado>thirtyfivemm': {
      in: function(next){ slideRightIn(next); },
      out: function(next){ slideRightOut(next); }
    },
    'avocado>spotify': {
      in: function(next){ slideRightIn(next); },
      out: function(next){ slideRightOut(next); }
    },

    // social-ore
    'social-ore>waterfire': {
      in: function(next){ slideLeftIn(next); },
      out: function(next){ slideLeftOut(next); }
    },
    'social-ore>avocado': {
      in: function(next){ slideLeftIn(next); },
      out: function(next){ slideLeftOut(next); }
    },
    'social-ore>big-data': {
      in: function(next){ slideRightIn(next); },
      out: function(next){ slideRightOut(next); }
    },
    'social-ore>herman-miller': {
      in: function(next){ slideRightIn(next); },
      out: function(next){ slideRightOut(next); }
    },
    'social-ore>append': {
      in: function(next){ slideRightIn(next); },
      out: function(next){ slideRightOut(next); }
    },
    'social-ore>portraiture': {
      in: function(next){ slideRightIn(next); },
      out: function(next){ slideRightOut(next); }
    },
    'social-ore>thirtyfivemm': {
      in: function(next){ slideRightIn(next); },
      out: function(next){ slideRightOut(next); }
    },
    'social-ore>spotify': {
      in: function(next){ slideRightIn(next); },
      out: function(next){ slideRightOut(next); }
    },

    // big-data
    'big-data>waterfire': {
      in: function(next){ slideLeftIn(next); },
      out: function(next){ slideLeftOut(next); }
    },
    'big-data>avocado': {
      in: function(next){ slideLeftIn(next); },
      out: function(next){ slideLeftOut(next); }
    },
    'big-data>social-ore': {
      in: function(next){ slideLeftIn(next); },
      out: function(next){ slideLeftOut(next); }
    },
    'big-data>herman-miller': {
      in: function(next){ slideRightIn(next); },
      out: function(next){ slideRightOut(next); }
    },
    'big-data>append': {
      in: function(next){ slideRightIn(next); },
      out: function(next){ slideRightOut(next); }
    },
    'big-data>portraiture': {
      in: function(next){ slideRightIn(next); },
      out: function(next){ slideRightOut(next); }
    },
    'big-data>thirtyfivemm': {
      in: function(next){ slideRightIn(next); },
      out: function(next){ slideRightOut(next); }
    },
    'big-data>spotify': {
      in: function(next){ slideRightIn(next); },
      out: function(next){ slideRightOut(next); }
    },

    // herman-miller
    'herman-miller>waterfire': {
      in: function(next){ slideLeftIn(next); },
      out: function(next){ slideLeftOut(next); }
    },
    'herman-miller>avocado': {
      in: function(next){ slideLeftIn(next); },
      out: function(next){ slideLeftOut(next); }
    },
    'herman-miller>social-ore': {
      in: function(next){ slideLeftIn(next); },
      out: function(next){ slideLeftOut(next); }
    },
    'herman-miller>big-data': {
      in: function(next){ slideLeftIn(next); },
      out: function(next){ slideLeftOut(next); }
    },
    'herman-miller>append': {
      in: function(next){ slideRightIn(next); },
      out: function(next){ slideRightOut(next); }
    },
    'herman-miller>portraiture': {
      in: function(next){ slideRightIn(next); },
      out: function(next){ slideRightOut(next); }
    },
    'herman-miller>thirtyfivemm': {
      in: function(next){ slideRightIn(next); },
      out: function(next){ slideRightOut(next); }
    },
    'herman-miller>spotify': {
      in: function(next){ slideRightIn(next); },
      out: function(next){ slideRightOut(next); }
    },

    // append
    'append>waterfire': {
      in: function(next){ slideLeftIn(next); },
      out: function(next){ slideLeftOut(next); }
    },
    'append>avocado': {
      in: function(next){ slideLeftIn(next); },
      out: function(next){ slideLeftOut(next); }
    },
    'append>social-ore': {
      in: function(next){ slideLeftIn(next); },
      out: function(next){ slideLeftOut(next); }
    },
    'append>big-data': {
      in: function(next){ slideLeftIn(next); },
      out: function(next){ slideLeftOut(next); }
    },
    'append>herman-miller': {
      in: function(next){ slideLeftIn(next); },
      out: function(next){ slideLeftOut(next); }
    },
    'append>portraiture': {
      in: function(next){ slideRightIn(next); },
      out: function(next){ slideRightOut(next); }
    },
    'append>thirtyfivemm': {
      in: function(next){ slideRightIn(next); },
      out: function(next){ slideRightOut(next); }
    },
    'append>spotify': {
      in: function(next){ slideRightIn(next); },
      out: function(next){ slideRightOut(next); }
    },

    // portraiture
    'portraiture>waterfire': {
      in: function(next){ slideLeftIn(next); },
      out: function(next){ slideLeftOut(next); }
    },
    'portraiture>avocado': {
      in: function(next){ slideLeftIn(next); },
      out: function(next){ slideLeftOut(next); }
    },
    'portraiture>social-ore': {
      in: function(next){ slideLeftIn(next); },
      out: function(next){ slideLeftOut(next); }
    },
    'portraiture>big-data': {
      in: function(next){ slideLeftIn(next); },
      out: function(next){ slideLeftOut(next); }
    },
    'portraiture>herman-miller': {
      in: function(next){ slideLeftIn(next); },
      out: function(next){ slideLeftOut(next); }
    },
    'portraiture>append': {
      in: function(next){ slideLeftIn(next); },
      out: function(next){ slideLeftOut(next); }
    },
    'portraiture>thirtyfivemm': {
      in: function(next){ slideRightIn(next); },
      out: function(next){ slideRightOut(next); }
    },
    'portraiture>spotify': {
      in: function(next){ slideRightIn(next); },
      out: function(next){ slideRightOut(next); }
    },

    // thirtyfivemm
    'thirtyfivemm>waterfire': {
      in: function(next){ slideLeftIn(next); },
      out: function(next){ slideLeftOut(next); }
    },
    'thirtyfivemm>avocado': {
      in: function(next){ slideLeftIn(next); },
      out: function(next){ slideLeftOut(next); }
    },
    'thirtyfivemm>social-ore': {
      in: function(next){ slideLeftIn(next); },
      out: function(next){ slideLeftOut(next); }
    },
    'thirtyfivemm>big-data': {
      in: function(next){ slideLeftIn(next); },
      out: function(next){ slideLeftOut(next); }
    },
    'thirtyfivemm>herman-miller': {
      in: function(next){ slideLeftIn(next); },
      out: function(next){ slideLeftOut(next); }
    },
    'thirtyfivemm>append': {
      in: function(next){ slideLeftIn(next); },
      out: function(next){ slideLeftOut(next); }
    },
    'thirtyfivemm>portraiture': {
      in: function(next){ slideLeftIn(next); },
      out: function(next){ slideLeftOut(next); }
    },
    'thirtyfivemm>spotify': {
      in: function(next){ slideRightIn(next); },
      out: function(next){ slideRightOut(next); }
    },

    // spotify
    'spotify>waterfire': {
      in: function(next){ slideLeftIn(next); },
      out: function(next){ slideLeftOut(next); }
    },
    'spotify>avocado': {
      in: function(next){ slideLeftIn(next); },
      out: function(next){ slideLeftOut(next); }
    },
    'spotify>social-ore': {
      in: function(next){ slideLeftIn(next); },
      out: function(next){ slideLeftOut(next); }
    },
    'spotify>big-data': {
      in: function(next){ slideLeftIn(next); },
      out: function(next){ slideLeftOut(next); }
    },
    'spotify>herman-miller': {
      in: function(next){ slideLeftIn(next); },
      out: function(next){ slideLeftOut(next); }
    },
    'spotify>append': {
      in: function(next){ slideLeftIn(next); },
      out: function(next){ slideLeftOut(next); }
    },
    'spotify>portraiture': {
      in: function(next){ slideLeftIn(next); },
      out: function(next){ slideLeftOut(next); }
    },
    'spotify>thirtyfivemm': {
      in: function(next){ slideLeftIn(next); },
      out: function(next){ slideLeftOut(next); }
    }
  }
}
var swupjs = new Swupjs(options);


