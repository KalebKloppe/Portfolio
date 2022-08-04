///////////////////////
// MOUSEWHEEL EVENTS //
///////////////////////
var wheelEvent;
var scrollValue = 0;

if ( "onwheel" in window ){

  wheelEvent = "wheel";

} else if ( window.onmousewheel == undefined ){

  wheelEvent = "mousewheel";

} else {

  wheelEvent = "DOMMouseScroll";

}

// default values
var PIXEL_STEP  = 10;
var LINE_HEIGHT = 40;
var PAGE_HEIGHT = 800;

function normalizeWheel(event){
  var sX = 0, sY = 0, // spinX, spinY
      pX = 0, pY = 0; // pixelX, pixelY

  // Legacy
  if ('detail'      in event) { sY = event.detail; }
  if ('wheelDelta'  in event) { sY = -event.wheelDelta / 120; }
  if ('wheelDeltaY' in event) { sY = -event.wheelDeltaY / 120; }
  if ('wheelDeltaX' in event) { sX = -event.wheelDeltaX / 120; }

  // side scrolling on FF with DOMMouseScroll
  if ( 'axis' in event && event.axis === event.HORIZONTAL_AXIS ) {
    sX = sY;
    sY = 0;
  }

  pX = sX * PIXEL_STEP;
  pY = sY * PIXEL_STEP;

  if ('deltaY' in event) { pY = event.deltaY; }
  if ('deltaX' in event) { pX = event.deltaX; }

  if ((pX || pY) && event.deltaMode) {
    if (event.deltaMode == 1) { // delta in LINE units
      pX *= LINE_HEIGHT;
      pY *= LINE_HEIGHT;
    } else { // delta in PAGE units
      pX *= PAGE_HEIGHT;
      pY *= PAGE_HEIGHT;
    }
  }

  // Fall-back if spin cannot be determined
  if (pX && !sX) { sX = (pX < 1) ? -1 : 1; }
  if (pY && !sY) { sY = (pY < 1) ? -1 : 1; }

  return {  spinX  : sX,
            spinY  : sY,
            pixelX : pX,
            pixelY : pY   };
}

normalizeWheel.getEventType = function() {
  return (UserAgent_DEPRECATED.firefox())
          ? 'DOMMouseScroll'
          : (isEventSupported('wheel'))
              ? 'wheel'
              : 'mousewheel';
};


if ("onwheel" in window) {

  wheelEvent = "wheel"; // standard

} else if (window.onmousewheel == undefined) {

  wheelEvent = "mousewheel";  // legacy

} else {

  wheelEvent = "DOMMouseScroll";  // legacy Firefox

}

function horizontalScroll(){

    var scrollMe = document.getElementById("horizontalScroll");

    document.addEventListener(wheelEvent, function(event){

      var normalized = normalizeWheel(event);

      if (scrollMe){

        scrollMe.scrollLeft += normalized.spinY * vwUnits(12.5);

      } 

    });

};
horizontalScroll();


function scrollRotate( event ){

  var normalized = normalizeWheel( event );

  rotationValue += THREE.deg( normalized.spinY * 120 );

};

document.addEventListener( wheelEvent, scrollRotate );



//////////
// MENU //
//////////
var menuButton = document.getElementById( "mobileMenuButton" );
var menuDOM = document.getElementById( "menu" );
var svgMenuTopBar = document.getElementById( "menuTopBar" );
var svgMenuMiddleBar = document.getElementById( "menuMiddleBar" );
var svgMenuBottomBar = document.getElementById( "menuBottomBar" );


tlMenuButton = new TimelineMax();

tlMenuButton
.to( svgMenuTopBar, 0.333, { morphSVG:"#closeLineOne"})
.to( svgMenuBottomBar, 0.333, { morphSVG:"#closeLineTwo"}, "-=0.333")
.reversed( true )
.pause();

// switching menu button states
function toggleMenu(){

  menuButton.classList.toggle( "active" );

  if ( menuDOM.classList.contains( "active" ) ) {

    menuDOM.classList.toggle( "active" );
    menuDOM.classList.add( "inactive" );

  } else {
    
    menuDOM.classList.toggle( "active" );
    menuDOM.classList.remove( "inactive" );

  }

  tlMenuButton.reversed() ? tlMenuButton.play() : tlMenuButton.reverse()

  window.navigator.vibrate([8,16,8,16,8]);

}

function closeMenuOnSwup(){

  if ( menuDOM.classList.contains( "active" ) ) {

    menuDOM.classList.remove( "active" );

    menuDOM.classList.add( "inactive" );

  } if ( menuButton.classList.contains( "active" ) ) {

    menuButton.classList.remove( "active" );

    tlMenuButton.reversed() ? tlMenuButton.play() : tlMenuButton.reverse()

  }

};
// toggle menu when user clicks on menu button
menuButton.addEventListener( "click", toggleMenu);

// close menu when user presses esc key
document.addEventListener("keyup", function(e) {

  if (e.keyCode == 27 && menuButton.classList.contains( "active" ) && menuDOM.classList.contains( "active" ) ) {

      menuButton.classList.remove( "active" );

      menuDOM.classList.remove( "active" );
  
      tlMenuButton.reversed() ? tlMenuButton.play() : tlMenuButton.reverse()

  }

});


// add active class to current page
var menuActiveClass = function() {
  
  var all_links = document.getElementsByClassName("menu-link");

  var len = all_links.length;

  var full_path = location.href;

  // Loop through each link.
  for(i=0; i<len; i++) {

    if( all_links[i].href == full_path ) {

      // add active class if it matches current page url
      all_links[i].classList.add("active");

    } else {

      // remove active classes if it doesnt match
      all_links[i].classList.remove("active");

    }

  }

};

window.onload = menuActiveClass();


var iframe = function(){

  var frame = document.getElementById("frame");

  function hideCursor(){
    var cursor = document.getElementById("cursor");
    cursor.style.opacity = "0";
  }

  function showCursor() {
    var cursor = document.getElementById("cursor");
    cursor.style.opacity = "1";
  }


  if (frame){

    // when mouse enters iframe, hide it
    frame.addEventListener("mouseenter", hideCursor);

    frame.addEventListener("mouseleave", showCursor);

  }

};

iframe();


var removeiFrame = function(){

  var cursor = document.getElementById("cursor");

  cursor.removeAttribute("style");
  
}
