<!DOCTYPE html>
<html lang="en-US">
  <?php include "php-modules/head.php";?>
  <body>
    <?php include "php-modules/svg-defs.php";?>
    <?php include "php-modules/menu.php";?>
    <main class="main" id="swup">
      <article id="verticalScroll" class="vertical-scroll">
        <header class="project-header">
          <div class="project-title">
            <div>
              <h5 class="animate-text-color">Cinematography</h5>
            </div>
            <div>
              <h1 class="animate-text-color">Spotify</h1>
            </div>
            <div>
              <h3 class="animate-text-color">spec commercial</h3>
            </div>
          </div>
        </header>
        <section class="project-gallery">
          <figure class="project-container">
            <div class="project-video-wrapper">
              <iframe id="frame" class="project-video" src="https://player.vimeo.com/video/223235252?quality=1080p&autoplay=false" frameborder="0" allow="fullscreen" allowfullscreen></iframe>
            </div>
          </figure>
        </section>
        <footer class="project-footer">
          <a class="footer-link" href="/waterfire">
            <div class="footer-title-wrapper">
              <div class="footer-title">
                <h2>WaterFire</h2>
                <h6>explore next project</h6>
              </div>
            </div>
            <picture class="footer-picture">
              <source media="(min-height:2304px)" type="image/webp" srcset="/assets/img/thumb/thumb-6-960.webp">
              <source media="(min-height:2304px)"                   srcset="/assets/img/thumb/thumb-6-960.jpg">
              <source media="(min-height:1536px)" type="image/webp" srcset="/assets/img/thumb/thumb-6-480.webp, /assets/img/thumb/thumb-6-960.webp 2x">
              <source media="(min-height:1536px)"                   srcset="/assets/img/thumb/thumb-6-480.jpg, /assets/img/thumb/thumb-6-960.jpg 2x">
              <source media="(min-height:768px)" type="image/webp" srcset="/assets/img/thumb/thumb-6-240.webp, /assets/img/thumb/thumb-6-480.webp 2x, /assets/img/thumb/thumb-6-960.webp 3x">
              <source media="(min-height:768px)"                   srcset="/assets/img/thumb/thumb-6-240.jpg, /assets/img/thumb/thumb-6-480.jpg 2x, /assets/img/thumb/thumb-6-960.jpg 3x">
              <source media="(min-height:0px)" type="image/webp" srcset="/assets/img/thumb/thumb-6-120.webp, /assets/img/thumb/thumb-6-240.webp 2x, /assets/img/thumb/thumb-6-480.webp 4x">
              <source media="(min-height:0px)"                   srcset="/assets/img/thumb/thumb-6-120.jpg, /assets/img/thumb/thumb-6-240.jpg 2x, /assets/img/thumb/thumb-6-480.jpg 4x">
              <img class="footer-img" src="/assets/img/thumb/thumb-6-240.jpg" alt=""/>
            </picture>
          </a>
        </footer>
        
      </article>
    </main>
    <?php include "php-modules/lightbox.php";?>
    <?php include "php-modules/cursor.php";?>
    <?php include "php-modules/end-scripts.php";?>
  </body>
  <?php include "php-modules/footer.php";?>
</html>
