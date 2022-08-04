/////////////////////////////
// INITIALIZE ON EACH PAGE //
/////////////////////////////

// ENTER PAGE
document.addEventListener('swup:contentReplaced', function(event){

  menuActiveClass();

  iframe();

  if (document.getElementById("verticalScroll")){

    // photoswipe gallery
    initPhotoSwipeFromDOM("project-display-link");

    
  } else if (document.getElementById("horizontalScroll")){

    // add horizontal scrolling
    horizontalScroll();

  }

});

// LEAVE PAGE
document.addEventListener('swup:willReplaceContent', function(event){
  
  //close navabar
  closeMenuOnSwup();

  removeiFrame();

});
document.addEventListener('swup:clickLink', function(event){

  closeMenuOnSwup();

  removeiFrame();

});