//////////////
// LIGHTBOX //
//////////////
var supportsWebp;
// check for Webp support
function testWebP(callback) {

	var webP = new Image();

	webP.src = "data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wAiMw" + "AgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA";

	webP.onload = webP.onerror = function () {

		callback(webP.height == 2);

	};

}

testWebP(function (supported) {

	if (supported) { 

		supportsWebp = true;
		
	} else {

		console.log("webp not supported")

		supportsWebp = false;
		
	}

});


var closeGallery;

var initPhotoSwipeFromDOM = function(gallerySelector, closeGallery) {
	var galleryElements = document.getElementsByClassName(gallerySelector);
	var items = [];
	var src;  	// path to image
	var w;    	// width
	var h;    	// height
	var msrc; 	// placeholder image
	var index;	// slide index
	
	// start photoswipe on click
	var click = function(i){
		var pswpElement = document.getElementsByClassName('pswp')[0];
		var options = {
			index: items[i].index,
			getThumbBoundsFn: function(i) {
				var thumbnail = document.getElementsByClassName(gallerySelector)[i];
				var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
				var rect = thumbnail.getBoundingClientRect();
				return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};},
			showHideOpacity: false,
			showAnimationDuration: 333,
			hideAnimationDuration: 333,
			bgOpacity: 1,
			spacing: 0.12,
			allowPanToNext: true,
			maxpSpreadZoom: 1,
			// getDoubleTapZoom: function(){return 1},
			loop: true,
			pinchToClose: true,
			closeOnScroll: true,
			closeOnVerticalDrag: true,
			mouseUsed: false,
			escKey: true,
			arrowKeys: true,
			history: false,
			errorMsg: "",
			preload: [1,1],
			mainClass: "",
			// getNumItemsFn:,
			focus: true,
			// isClickableElement: function(element){return el.tagName === 'A';},
			modal: true
		}

		var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
		gallery.init();

		document.addEventListener('swup:willReplaceContent', function(event){

			gallery.close();
			
		});

		gallery.listen('gettingData', function(index, item) {
			if (supportsWebp) {
			  item.src = item.src.replace('.jpg', '.webp');
			  item.msrc = item.msrc.replace('.jpg', '.webp');
			} 
		  });

	}

	// Parse DOM to retrieve thumbnails, links, and dimensions
	var parsePhotoswipe = function() {
		for (i=0; i < galleryElements.length; i++) {
			element = galleryElements[i];
			size = element.getAttribute('data-size').split('x');
			img = element.getElementsByTagName('img');
			galleryItem = {
				src: element.getAttribute('href'),
				w: parseInt(size[0], 10),
				h: parseInt(size[1], 10),
				msrc: img[0].getAttribute('src'),
				index: i
			};
			
			items.push(galleryItem);
			
			(function(i) {
				galleryElements[i].onclick = function(e) {
					e = e || window.event;
					e.preventDefault ? e.preventDefault() : e.returnValue = false;
					click(i);
				};
			})(i);
		}
	};
	parsePhotoswipe();

};

initPhotoSwipeFromDOM( "project-display-link" );











