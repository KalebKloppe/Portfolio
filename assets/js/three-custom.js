//////////////////
// WEBGL CURSOR //
//////////////////
var rotationValue = 0; //for spinning cursor


// Convert degrees to radians
THREE.deg = function(deg) {
  return THREE.Math.degToRad(deg);
};

// SCENE SETUP
var mouse = new THREE.Scene();
var parallax = new THREE.Group();
var click = new THREE.Group();
var tetra = new THREE.Object3D();

// RENDERER SETUP
var cursorWrapper = document.getElementById("cursorWrapper");
var container = document.getElementById("cursorContainer");

container.style.width = '100%';
container.style.height = '100%';
container.width = cursorWrapper.clientWidth / window.devicePixelRatio;
container.height = cursorWrapper.clientHeight / window.devicePixelRatio;

var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: container });


// CAMERA SETUP
var camera = new THREE.OrthographicCamera(-4, 4, 4, -4, 0, 1000);


function initThree(){

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(container.width, container.height);
  camera.updateProjectionMatrix();

  // temp hack - fix display scaling
  /*document.onload = function(){
    container.width = cursorWrapper.clientWidth;
    container.height = cursorWrapper.clientHeight;
    renderer.setSize(container.width, container.height);
    camera.updateProjectionMatrix();
  };*/

  // resize everything when the viewport changes
  window.addEventListener("resize", onWindowResize, false);
  function onWindowResize(){
    container.width = cursorWrapper.clientWidth;
    container.height = cursorWrapper.clientHeight;
    renderer.setSize(container.width, container.height);
    camera.updateProjectionMatrix();
  };

  // LIGHT SETUP
  var spotlight = new THREE.SpotLight( 0xffffff );
  spotlight.position.set( 0, 0, 40 );
  mouse.add( spotlight );

  var spotlight2 = new THREE.SpotLight( 0xffffff );
  spotlight2.position.set( 40, 40, -20 );
  mouse.add( spotlight2 );

  var spotlight3 = new THREE.SpotLight( 0xdddddd );
  spotlight3.position.set( -20, -20, -20 );
  mouse.add( spotlight3 );

  // CREATE GEOMETRY
  var geometry = new THREE.TetrahedronGeometry(1);

  // CREATE MATERIALS
  var materials = new THREE.MeshLambertMaterial({ vertexColors: THREE.VertexColors });

  var colorA = 0xd88b92; // hue 7
  var colorB = 0x6faf6d; // hue 127
  var colorC = 0x7ba2d6; // hue 247

  geometry.faces[0].vertexColors[1] = new THREE.Color(colorA); // Vertex One
  geometry.faces[1].vertexColors[2] = new THREE.Color(colorC); // Vertex One
  geometry.faces[2].vertexColors[1] = new THREE.Color(colorB); // Vertex One

  geometry.faces[0].vertexColors[2] = new THREE.Color(colorC); // Vertex Two
  geometry.faces[1].vertexColors[1] = new THREE.Color(colorA); // Vertex Two
  geometry.faces[3].vertexColors[2] = new THREE.Color(colorB); // Vertex Two

  geometry.faces[0].vertexColors[0] = new THREE.Color(colorB); // Vertex Three
  geometry.faces[2].vertexColors[2] = new THREE.Color(colorA); // Vertex Three
  geometry.faces[3].vertexColors[1] = new THREE.Color(colorC); // Vertex Three

  geometry.faces[1].vertexColors[0] = new THREE.Color(colorB); // Vertex Four
  geometry.faces[2].vertexColors[0] = new THREE.Color(colorC); // Vertex Four
  geometry.faces[3].vertexColors[0] = new THREE.Color(colorA); // Vertex Four

  // for better lighting and dithering
  materials.dithering = true;

  // CREATE SHAPE
  var shape = new THREE.Mesh(geometry, materials);

  //shape.geometry.colorsNeedUpdate = true;
  tetra.applyMatrix( new THREE.Matrix4().makeTranslation( 0.71, -0.71, 0 ) );

  // POSITIONING AND ROTATION
  shape.rotation.x = THREE.deg(35.25);
  shape.rotation.y = THREE.deg(-45);
  tetra.rotation.x = THREE.deg(90);
  tetra.rotation.y = THREE.deg(225);
  click.rotation.x = THREE.deg(-14.25);
  click.rotation.y = THREE.deg(-13.75);
  click.rotation.z = THREE.deg(-1.75);
  parallax.position.z = -20;
  parallax.scale.x = 0.62;
  parallax.scale.y = 0.62;
  parallax.scale.z = 0.62;

  // ADD EVERTYHTING TO THE SCENE
  mouse.add(camera);
  tetra.add(shape);
  click.add(tetra);
  parallax.add(click);
  mouse.add(parallax);


  //////////////////////
  // CURSOR TRANSFORM //
  //////////////////////

  var cursorTransform;
  var cursorPositionX;
  var cursorPositionY;

  var cursor = document.getElementById("cursor");

  document.addEventListener("mousemove", function(e) {

    cursorTransform = 'translate3d(' + e.pageX + 'px, ' + e.pageY + 'px, 0)';

    cursorPositionX = e.pageX
    cursorPositionY = e.pageY
    

  });

  function updateCursorPosition(){
    
    cursor.style.transform = cursorTransform;

  };

  ///////////////////////
  // CURSOR AND LABELS //
  ///////////////////////

  var title = document.getElementById( "cursorTitle" );
  var indexTitles = document.getElementsByClassName( "index-title" );
  var titles = [];




  var tlzoom = new TimelineMax();

  tlzoom
  .to(parallax.scale, 3.333, { x: 2.5, y: 2.5, z: 2.5, ease: CustomEase.create("custom", "M0,0 C0.466,0 0.524,0.046 0.625,0.152 0.73,0.263 0.819,0.582 0.912,0.896 0.922,0.93 0.94,1 1,1") } )
  .pause();



  var tlHoverLink = new TimelineMax();

  tlHoverLink
  .to(click.rotation, 0.167, { x: THREE.deg(-90), y: THREE.deg(-13.75), z: THREE.deg(-45) })
  .to(parallax.scale, 0.167, { x: 12, y: 12, z: 12 } )
  .to(title, 0.167, { css:{ opacity: 1 }} )
  .pause();


  var createTitles = function (){

    for ( i = 0; i < indexTitles.length; i++ ) {

      html = {

        category: indexTitles[i].children[0].innerHTML,

        title: indexTitles[i].children[1].innerHTML,

        subtitle: indexTitles[i].children[2].innerHTML

      }

      titles.push(html);

    }

  }

  createTitles();



  var replaceTitle = function(i){

    title.children[0].innerHTML = titles[i].category;

    title.children[1].innerHTML = titles[i].title;

    title.children[2].innerHTML = titles[i].subtitle;

  };



  var cursorLinks = function(){

    var links = [];

    var links = document.getElementsByClassName("index-display-link");

    for (var i = links.length - 1; i > -1; i--) {

      var link = links[i];

      (function(i){

        link.onmouseenter = function(e){

          replaceTitle(i);

          tlHoverLink.play();

        }

      })(i);

      link.onmouseleave = function(){

        tlHoverLink.reverse();

      };

    };

  };

  cursorLinks();


  var resetCursor = function(){

    tlHoverLink.reverse();

  };

  // RENDER SCENE
  var render = function() {
    renderer.render(mouse, camera);
  };

  // ANIMATE
  var animate = function() {

    requestAnimationFrame(animate);

    TweenMax.to(tetra.rotation, 1,{ ease: Sine.easeOut, z: rotationValue });

    render();

    updateCursorPosition();

  };

  // ENTER PAGE
  document.addEventListener('swup:pageView', function(event){


    if (document.getElementById("horizontalScroll")){

      // cursor
      createTitles();
      cursorLinks();

    }
  
});

  // LEAVE PAGE
  document.addEventListener('swup:willReplaceContent', function(event){

    // destroy cursor transforms
    resetCursor();

  });
  
  animate();

};


// Only initialize and render WebGL IF (1) WebGl HAS support AND (2) device HAS touchscreen AND does NOT HAVE a mouse.
if ( (!matchMedia("(pointer:coarse)").matches) && (!matchMedia("(hover:none)").matches) ) {
  
  initThree();

  //set the cursor back to normal
  var pointerCSS = " *, *::after, *::before { cursor:none; } ";
  var head = document.head || document.getElementsByTagName( "head" )[0];
  var style = document.createElement( "style" );
  head.appendChild( style );
  style.type = "text/css";
  style.appendChild( document.createTextNode( pointerCSS ) );

} else {}
