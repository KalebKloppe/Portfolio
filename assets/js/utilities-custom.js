///////////////
// UTILITIES //
///////////////



// GET CSS UNITS
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

window.addEventListener("resize", function(event){

  windowWidth = window.innerWidth;

  windowHeight = window.innerHeight;

});
// VIEW WIDTH TO PIXELS
function vWFromPx(vw){
  
  var pixels = (vw / windowWidth)  * 100;

  return pixels;

}

// VIEW WIDTH
function vwUnits(pixels){

  var vw = (windowWidth / 100) * pixels;

  return vw;

};

// VIEW HEIGHT
function vhUnits(pixels){

  var vh = (windowHeight / 100) * pixels;

  return vh;

};

// REM UNITS
function remUnits(pixels){

  var rem =  ((windowWidth + windowHeight) / 83.333) * pixels;

  return rem;

};

// CLAMP
function clamp(num, min, max){

  return num <= min ? min : num >= max ? max : num;

};

// DEGREES FROM POINTS
function angle(cx, cy, ex, ey) {

  var dy = ey - cy;

  var dx = ex - cx;

  var theta = Math.atan2(dy, dx); // range (-PI, PI]

  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]

  return theta;

}

function angle360(cx, cy, ex, ey) {

  var theta = angle(cx, cy, ex, ey); // range (-180, 180]

  if (theta < 0) theta = 360 + theta; // range [0, 360)

  return theta;

}

// VIBRATION
function hapticButtonPress(){

  window.navigator.vibrate([8,16,8,16,8]);
  
}
