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
              <h5 class="animate-text-color">project category</h5>
            </div>
            <div>
              <h1 class="animate-text-color">project title</h1>
            </div>
            <div>
              <h3 class="animate-text-color">project subtitle</h3>
            </div>
          </div>
          <!--<div class="project-description">
            <h5>description</h5>
          </div>
          <div class="project-description">
            <p class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>-->
        </header>
        <section class="project-gallery">
          <figure class="project-container">
            <a class="project-display-link" href="/assets/img/default/default-fullscreen.jpg" data-size="5760x4320" data-no-swup>
              <picture class="project-picture">
                <source media="(min-height: 5120px)" srcset="
                  /assets/img/default/default-5120.jpg
                " />
                <source media="(min-height: 3840px)" srcset="
                  /assets/img/default/default-3840.jpg,
                  /assets/img/default/default-3840-12x.jpg 1.25x,
                  /assets/img/default/default-3840-15x.jpg 1.5x,
                  /assets/img/default/default-3840-20x.jpg 2x
                " />
                <source media="(min-height: 2560px)" srcset="
                  /assets/img/default/default-2560.jpg,
                  /assets/img/default/default-2560-12x.jpg 1.25x,
                  /assets/img/default/default-2560-15x.jpg 1.5x,
                  /assets/img/default/default-2560-20x.jpg 2x
                " />
                <source media="(min-height: 2160px)" srcset="
                  /assets/img/default/default-2160.jpg,
                  /assets/img/default/default-2160-12x.jpg 1.25x,
                  /assets/img/default/default-2160-15x.jpg 1.5x,
                  /assets/img/default/default-2160-20x.jpg 2x
                " />
                <source media="(min-height: 1680px)" srcset="
                  /assets/img/default/default-1680.jpg,
                  /assets/img/default/default-1680-12x.jpg 1.25x,
                  /assets/img/default/default-1680-15x.jpg 1.5x,
                  /assets/img/default/default-1680-20x.jpg 2x,
                  /assets/img/default/default-1680-25x.jpg 2.5x,
                  /assets/img/default/default-1680-30x.jpg 3x
                " />
                <source media="(min-height: 1440px)" srcset="
                  /assets/img/default/default-1440.jpg,
                  /assets/img/default/default-1440-12x.jpg 1.25x,
                  /assets/img/default/default-1440-15x.jpg 1.5x,
                  /assets/img/default/default-1440-20x.jpg 2x,
                  /assets/img/default/default-1440-25x.jpg 2.5x,
                  /assets/img/default/default-1440-30x.jpg 3x
                " />
                <source media="(min-height: 1320px)" srcset="
                  /assets/img/default/default-1320.jpg,
                  /assets/img/default/default-1320-12x.jpg 1.25x,
                  /assets/img/default/default-1320-15x.jpg 1.5x,
                  /assets/img/default/default-1320-20x.jpg 2x,
                  /assets/img/default/default-1320-25x.jpg 2.5x,
                  /assets/img/default/default-1320-30x.jpg 3x,
                  /assets/img/default/default-1320-25x.jpg 3.5x,
                  /assets/img/default/default-1320-40x.jpg 4x
                " />
                <source media="(min-height: 1200px)" srcset="
                  /assets/img/default/default-1200.jpg,
                  /assets/img/default/default-1200-12x.jpg 1.25x,
                  /assets/img/default/default-1200-15x.jpg 1.5x,
                  /assets/img/default/default-1200-20x.jpg 2x,
                  /assets/img/default/default-1200-25x.jpg 2.5x,
                  /assets/img/default/default-1200-30x.jpg 3x,
                  /assets/img/default/default-1200-25x.jpg 3.5x,
                  /assets/img/default/default-1200-40x.jpg 4x
                " />
                <source media="(min-height: 1080px)" srcset="
                  /assets/img/default/default-1080.jpg,
                  /assets/img/default/default-1080-12x.jpg 1.25x,
                  /assets/img/default/default-1080-15x.jpg 1.5x,
                  /assets/img/default/default-1080-20x.jpg 2x,
                  /assets/img/default/default-1080-25x.jpg 2.5x,
                  /assets/img/default/default-1080-30x.jpg 3x,
                  /assets/img/default/default-1080-25x.jpg 3.5x,
                  /assets/img/default/default-1080-40x.jpg 4x
                " />
                <source media="(min-height: 960px)" srcset="
                  /assets/img/default/default-960.jpg,
                  /assets/img/default/default-960-12x.jpg 1.25x,
                  /assets/img/default/default-960-15x.jpg 1.5x,
                  /assets/img/default/default-960-20x.jpg 2x,
                  /assets/img/default/default-960-25x.jpg 2.5x,
                  /assets/img/default/default-960-30x.jpg 3x,
                  /assets/img/default/default-960-25x.jpg 3.5x,
                  /assets/img/default/default-960-40x.jpg 4x
                " />
                <source media="(min-height: 880px)" srcset="
                  /assets/img/default/default-880.jpg,
                  /assets/img/default/default-880-12x.jpg 1.25x,
                  /assets/img/default/default-880-15x.jpg 1.5x,
                  /assets/img/default/default-880-20x.jpg 2x,
                  /assets/img/default/default-880-25x.jpg 2.5x,
                  /assets/img/default/default-880-30x.jpg 3x,
                  /assets/img/default/default-880-25x.jpg 3.5x,
                  /assets/img/default/default-880-40x.jpg 4x
                " />
                <source media="(min-height: 800px)" srcset="
                  /assets/img/default/default-800.jpg,
                  /assets/img/default/default-800-12x.jpg 1.25x,
                  /assets/img/default/default-800-15x.jpg 1.5x,
                  /assets/img/default/default-800-20x.jpg 2x,
                  /assets/img/default/default-800-25x.jpg 2.5x,
                  /assets/img/default/default-800-30x.jpg 3x,
                  /assets/img/default/default-800-25x.jpg 3.5x,
                  /assets/img/default/default-800-40x.jpg 4x
                " />
                <source media="(min-height: 720px)" srcset="
                  /assets/img/default/default-720.jpg,
                  /assets/img/default/default-720-12x.jpg 1.25x,
                  /assets/img/default/default-720-15x.jpg 1.5x,
                  /assets/img/default/default-720-20x.jpg 2x,
                  /assets/img/default/default-720-25x.jpg 2.5x,
                  /assets/img/default/default-720-30x.jpg 3x,
                  /assets/img/default/default-720-25x.jpg 3.5x,
                  /assets/img/default/default-720-40x.jpg 4x
                " />
                <source media="(min-height: 640px)" srcset="
                  /assets/img/default/default-640.jpg,
                  /assets/img/default/default-640-12x.jpg 1.25x,
                  /assets/img/default/default-640-15x.jpg 1.5x,
                  /assets/img/default/default-640-20x.jpg 2x,
                  /assets/img/default/default-640-25x.jpg 2.5x,
                  /assets/img/default/default-640-30x.jpg 3x,
                  /assets/img/default/default-640-25x.jpg 3.5x,
                  /assets/img/default/default-640-40x.jpg 4x
                " />
                <source media="(min-height: 560px)" srcset="
                  /assets/img/default/default-560.jpg,
                  /assets/img/default/default-560-12x.jpg 1.25x,
                  /assets/img/default/default-560-15x.jpg 1.5x,
                  /assets/img/default/default-560-20x.jpg 2x,
                  /assets/img/default/default-560-25x.jpg 2.5x,
                  /assets/img/default/default-560-30x.jpg 3x,
                  /assets/img/default/default-560-35x.jpg 3.5x,
                  /assets/img/default/default-560-40x.jpg 4x
                " />
                <source media="(min-height: 560px)" srcset="
                  /assets/img/default/default-560.jpg,
                  /assets/img/default/default-560-12x.jpg 1.25x,
                  /assets/img/default/default-560-15x.jpg 1.5x,
                  /assets/img/default/default-560-20x.jpg 2x,
                  /assets/img/default/default-560-25x.jpg 2.5x,
                  /assets/img/default/default-560-30x.jpg 3x,
                  /assets/img/default/default-560-35x.jpg 3.5x,
                  /assets/img/default/default-560-40x.jpg 4x
                " />
                <source media="(min-height: 480px)" srcset="
                  /assets/img/default/default-480.jpg,
                  /assets/img/default/default-480-12x.jpg 1.25x,
                  /assets/img/default/default-480-15x.jpg 1.5x,
                  /assets/img/default/default-480-20x.jpg 2x,
                  /assets/img/default/default-480-25x.jpg 2.5x,
                  /assets/img/default/default-480-30x.jpg 3x,
                  /assets/img/default/default-480-35x.jpg 3.5x,
                  /assets/img/default/default-480-40x.jpg 4x
                " />
                <source media="(min-height: 400px)" srcset="
                  /assets/img/default/default-400.jpg,
                  /assets/img/default/default-400-12x.jpg 1.25x,
                  /assets/img/default/default-400-15x.jpg 1.5x,
                  /assets/img/default/default-400-20x.jpg 2x,
                  /assets/img/default/default-400-25x.jpg 2.5x,
                  /assets/img/default/default-400-30x.jpg 3x, 
                  /assets/img/default/default-400-35x.jpg 3.5x,
                  /assets/img/default/default-400-40x.jpg 4x
                " />
                <source media="(min-height: 320px)" srcset="
                  /assets/img/default/default.jpg,
                  /assets/img/default/default-12x.jpg 1.25x,
                  /assets/img/default/default-15x.jpg 1.5x,
                  /assets/img/default/default-20x.jpg 2x,
                  /assets/img/default/default-25x.jpg 2.5x,
                  /assets/img/default/default-30x.jpg 3x, 
                  /assets/img/default/default-35x.jpg 3.5x,
                  /assets/img/default/default-40x.jpg 4x
                " />
                <img class="project-img" src="/assets/img/default/default.jpg" alt=""/>
              </picture>
              <p class="caption">a caption</p>
            </a>
          </figure>

          <div class="project-container">
            <div class="project-description-wrapper">
              <div class="project-description-container">
                <h2>description heading</h2>
              </div>
              <div class="project-description-container">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </div>
            </div>
          </div>

          <figure class="project-container">
            <a class="project-display-link" href="/assets/img/default/default-fullscreen.jpg" data-size="5760x4320" data-no-swup>
            <picture class="project-picture">
                <source media="(min-height: 5120px)" srcset="/assets/img/default/default-5120.jpg" />
                <source media="(min-height: 3840px)" srcset="/assets/img/default/default-3840.jpg, /assets/img/default/default-3840-12x.jpg 1.25x, /assets/img/default/default-3840-15x.jpg 1.5x, /assets/img/default/default-3840-20x.jpg 2x" />
                <source media="(min-height: 2560px)" srcset="/assets/img/default/default-2560.jpg, /assets/img/default/default-2560-12x.jpg 1.25x, /assets/img/default/default-2560-15x.jpg 1.5x, /assets/img/default/default-2560-20x.jpg 2x" />
                <source media="(min-height: 2160px)" srcset="/assets/img/default/default-2160.jpg, /assets/img/default/default-2160-12x.jpg 1.25x, /assets/img/default/default-2160-15x.jpg 1.5x, /assets/img/default/default-2160-20x.jpg 2x" />
                <source media="(min-height: 1680px)" srcset="/assets/img/default/default-1680.jpg, /assets/img/default/default-1680-12x.jpg 1.25x, /assets/img/default/default-1680-15x.jpg 1.5x, /assets/img/default/default-1680-20x.jpg 2x, /assets/img/default/default-1680-25x.jpg 2.5x,/assets/img/default/default-1680-30x.jpg 3x" />
                <source media="(min-height: 1440px)" srcset="/assets/img/default/default-1440.jpg, /assets/img/default/default-1440-12x.jpg 1.25x, /assets/img/default/default-1440-15x.jpg 1.5x, /assets/img/default/default-1440-20x.jpg 2x, /assets/img/default/default-1440-25x.jpg 2.5x,/assets/img/default/default-1440-30x.jpg 3x" />
                <source media="(min-height: 1320px)" srcset="/assets/img/default/default-1320.jpg, /assets/img/default/default-1320-12x.jpg 1.25x, /assets/img/default/default-1320-15x.jpg 1.5x, /assets/img/default/default-1320-20x.jpg 2x, /assets/img/default/default-1320-25x.jpg 2.5x,/assets/img/default/default-1320-30x.jpg 3x, /assets/img/default/default-1320-25x.jpg 3.5x, /assets/img/default/default-1320-40x.jpg 4x" />
                <source media="(min-height: 1200px)" srcset="/assets/img/default/default-1200.jpg, /assets/img/default/default-1200-12x.jpg 1.25x, /assets/img/default/default-1200-15x.jpg 1.5x, /assets/img/default/default-1200-20x.jpg 2x, /assets/img/default/default-1200-25x.jpg 2.5x,/assets/img/default/default-1200-30x.jpg 3x, /assets/img/default/default-1200-25x.jpg 3.5x, /assets/img/default/default-1200-40x.jpg 4x" />
                <source media="(min-height: 1080px)" srcset="/assets/img/default/default-1080.jpg, /assets/img/default/default-1080-12x.jpg 1.25x, /assets/img/default/default-1080-15x.jpg 1.5x, /assets/img/default/default-1080-20x.jpg 2x, /assets/img/default/default-1080-25x.jpg 2.5x,/assets/img/default/default-1080-30x.jpg 3x, /assets/img/default/default-1080-25x.jpg 3.5x, /assets/img/default/default-1080-40x.jpg 4x" />
                <source media="(min-height: 960px)" srcset="/assets/img/default/default-960.jpg, /assets/img/default/default-960-12x.jpg 1.25x, /assets/img/default/default-960-15x.jpg 1.5x, /assets/img/default/default-960-20x.jpg 2x, /assets/img/default/default-960-25x.jpg 2.5x, /assets/img/default/default-960-30x.jpg 3x, /assets/img/default/default-960-25x.jpg 3.5x, /assets/img/default/default-960-40x.jpg 4x" />
                <source media="(min-height: 880px)" srcset="/assets/img/default/default-880.jpg, /assets/img/default/default-880-12x.jpg 1.25x, /assets/img/default/default-880-15x.jpg 1.5x, /assets/img/default/default-880-20x.jpg 2x, /assets/img/default/default-880-25x.jpg 2.5x, /assets/img/default/default-880-30x.jpg 3x, /assets/img/default/default-880-25x.jpg 3.5x, /assets/img/default/default-880-40x.jpg 4x" />
                <source media="(min-height: 800px)" srcset="/assets/img/default/default-800.jpg, /assets/img/default/default-800-12x.jpg 1.25x, /assets/img/default/default-800-15x.jpg 1.5x, /assets/img/default/default-800-20x.jpg 2x, /assets/img/default/default-800-25x.jpg 2.5x, /assets/img/default/default-800-30x.jpg 3x, /assets/img/default/default-800-25x.jpg 3.5x, /assets/img/default/default-800-40x.jpg 4x" />
                <source media="(min-height: 720px)" srcset="/assets/img/default/default-720.jpg, /assets/img/default/default-720-12x.jpg 1.25x, /assets/img/default/default-720-15x.jpg 1.5x, /assets/img/default/default-720-20x.jpg 2x, /assets/img/default/default-720-25x.jpg 2.5x, /assets/img/default/default-720-30x.jpg 3x, /assets/img/default/default-720-25x.jpg 3.5x, /assets/img/default/default-720-40x.jpg 4x" />
                <source media="(min-height: 640px)" srcset="/assets/img/default/default-640.jpg, /assets/img/default/default-640-12x.jpg 1.25x, /assets/img/default/default-640-15x.jpg 1.5x, /assets/img/default/default-640-20x.jpg 2x, /assets/img/default/default-640-25x.jpg 2.5x, /assets/img/default/default-640-30x.jpg 3x, /assets/img/default/default-640-25x.jpg 3.5x, /assets/img/default/default-640-40x.jpg 4x" />
                <source media="(min-height: 560px)" srcset="/assets/img/default/default-560.jpg, /assets/img/default/default-560-12x.jpg 1.25x, /assets/img/default/default-560-15x.jpg 1.5x, /assets/img/default/default-560-20x.jpg 2x, /assets/img/default/default-560-25x.jpg 2.5x, /assets/img/default/default-560-30x.jpg 3x, /assets/img/default/default-560-35x.jpg 3.5x, /assets/img/default/default-560-40x.jpg 4x" />
                <source media="(min-height: 560px)" srcset="/assets/img/default/default-560.jpg, /assets/img/default/default-560-12x.jpg 1.25x, /assets/img/default/default-560-15x.jpg 1.5x, /assets/img/default/default-560-20x.jpg 2x, /assets/img/default/default-560-25x.jpg 2.5x, /assets/img/default/default-560-30x.jpg 3x, /assets/img/default/default-560-35x.jpg 3.5x, /assets/img/default/default-560-40x.jpg 4x" />
                <source media="(min-height: 480px)" srcset="/assets/img/default/default-480.jpg, /assets/img/default/default-480-12x.jpg 1.25x, /assets/img/default/default-480-15x.jpg 1.5x, /assets/img/default/default-480-20x.jpg 2x, /assets/img/default/default-480-25x.jpg 2.5x, /assets/img/default/default-480-30x.jpg 3x, /assets/img/default/default-480-35x.jpg 3.5x, /assets/img/default/default-480-40x.jpg 4x" />
                <source media="(min-height: 400px)" srcset="/assets/img/default/default-400.jpg, /assets/img/default/default-400-12x.jpg 1.25x, /assets/img/default/default-400-15x.jpg 1.5x, /assets/img/default/default-400-20x.jpg 2x, /assets/img/default/default-400-25x.jpg 2.5x, /assets/img/default/default-400-30x.jpg 3x, /assets/img/default/default-400-35x.jpg 3.5x, /assets/img/default/default-400-40x.jpg 4x" />
                <source media="(min-height: 320px)" srcset="/assets/img/default/default.jpg, /assets/img/default/default-12x.jpg 1.25x, /assets/img/default/default-15x.jpg 1.5x, /assets/img/default/default-20x.jpg 2x, /assets/img/default/default-25x.jpg 2.5x, /assets/img/default/default-30x.jpg 3x, /assets/img/default/default-35x.jpg 3.5x,/assets/img/default/default-40x.jpg 4x" />
                <img class="project-img" src="/assets/img/default/default.jpg" alt="image that loads when no image is available"/>
              </picture>
              <p class="caption">a caption</p>
            </a>
          </figure>
        
          <figure class="project-container">
            <a class="project-display-link" href="/assets/img/default/default-fullscreen.jpg" data-size="5760x4320" data-no-swup>
              <picture class="project-picture">
                  <source media="(min-height: 5120px)" srcset="/assets/img/default/default-5120.jpg" />
                  <source media="(min-height: 3840px)" srcset="/assets/img/default/default-3840.jpg, /assets/img/default/default-3840-12x.jpg 1.25x, /assets/img/default/default-3840-15x.jpg 1.5x, /assets/img/default/default-3840-20x.jpg 2x" />
                  <source media="(min-height: 2560px)" srcset="/assets/img/default/default-2560.jpg, /assets/img/default/default-2560-12x.jpg 1.25x, /assets/img/default/default-2560-15x.jpg 1.5x, /assets/img/default/default-2560-20x.jpg 2x" />
                  <source media="(min-height: 2160px)" srcset="/assets/img/default/default-2160.jpg, /assets/img/default/default-2160-12x.jpg 1.25x, /assets/img/default/default-2160-15x.jpg 1.5x, /assets/img/default/default-2160-20x.jpg 2x" />
                  <source media="(min-height: 1680px)" srcset="/assets/img/default/default-1680.jpg, /assets/img/default/default-1680-12x.jpg 1.25x, /assets/img/default/default-1680-15x.jpg 1.5x, /assets/img/default/default-1680-20x.jpg 2x, /assets/img/default/default-1680-25x.jpg 2.5x,/assets/img/default/default-1680-30x.jpg 3x" />
                  <source media="(min-height: 1440px)" srcset="/assets/img/default/default-1440.jpg, /assets/img/default/default-1440-12x.jpg 1.25x, /assets/img/default/default-1440-15x.jpg 1.5x, /assets/img/default/default-1440-20x.jpg 2x, /assets/img/default/default-1440-25x.jpg 2.5x,/assets/img/default/default-1440-30x.jpg 3x" />
                  <source media="(min-height: 1320px)" srcset="/assets/img/default/default-1320.jpg, /assets/img/default/default-1320-12x.jpg 1.25x, /assets/img/default/default-1320-15x.jpg 1.5x, /assets/img/default/default-1320-20x.jpg 2x, /assets/img/default/default-1320-25x.jpg 2.5x,/assets/img/default/default-1320-30x.jpg 3x, /assets/img/default/default-1320-25x.jpg 3.5x, /assets/img/default/default-1320-40x.jpg 4x" />
                  <source media="(min-height: 1200px)" srcset="/assets/img/default/default-1200.jpg, /assets/img/default/default-1200-12x.jpg 1.25x, /assets/img/default/default-1200-15x.jpg 1.5x, /assets/img/default/default-1200-20x.jpg 2x, /assets/img/default/default-1200-25x.jpg 2.5x,/assets/img/default/default-1200-30x.jpg 3x, /assets/img/default/default-1200-25x.jpg 3.5x, /assets/img/default/default-1200-40x.jpg 4x" />
                  <source media="(min-height: 1080px)" srcset="/assets/img/default/default-1080.jpg, /assets/img/default/default-1080-12x.jpg 1.25x, /assets/img/default/default-1080-15x.jpg 1.5x, /assets/img/default/default-1080-20x.jpg 2x, /assets/img/default/default-1080-25x.jpg 2.5x,/assets/img/default/default-1080-30x.jpg 3x, /assets/img/default/default-1080-25x.jpg 3.5x, /assets/img/default/default-1080-40x.jpg 4x" />
                  <source media="(min-height: 960px)" srcset="/assets/img/default/default-960.jpg, /assets/img/default/default-960-12x.jpg 1.25x, /assets/img/default/default-960-15x.jpg 1.5x, /assets/img/default/default-960-20x.jpg 2x, /assets/img/default/default-960-25x.jpg 2.5x, /assets/img/default/default-960-30x.jpg 3x, /assets/img/default/default-960-25x.jpg 3.5x, /assets/img/default/default-960-40x.jpg 4x" />
                  <source media="(min-height: 880px)" srcset="/assets/img/default/default-880.jpg, /assets/img/default/default-880-12x.jpg 1.25x, /assets/img/default/default-880-15x.jpg 1.5x, /assets/img/default/default-880-20x.jpg 2x, /assets/img/default/default-880-25x.jpg 2.5x, /assets/img/default/default-880-30x.jpg 3x, /assets/img/default/default-880-25x.jpg 3.5x, /assets/img/default/default-880-40x.jpg 4x" />
                  <source media="(min-height: 800px)" srcset="/assets/img/default/default-800.jpg, /assets/img/default/default-800-12x.jpg 1.25x, /assets/img/default/default-800-15x.jpg 1.5x, /assets/img/default/default-800-20x.jpg 2x, /assets/img/default/default-800-25x.jpg 2.5x, /assets/img/default/default-800-30x.jpg 3x, /assets/img/default/default-800-25x.jpg 3.5x, /assets/img/default/default-800-40x.jpg 4x" />
                  <source media="(min-height: 720px)" srcset="/assets/img/default/default-720.jpg, /assets/img/default/default-720-12x.jpg 1.25x, /assets/img/default/default-720-15x.jpg 1.5x, /assets/img/default/default-720-20x.jpg 2x, /assets/img/default/default-720-25x.jpg 2.5x, /assets/img/default/default-720-30x.jpg 3x, /assets/img/default/default-720-25x.jpg 3.5x, /assets/img/default/default-720-40x.jpg 4x" />
                  <source media="(min-height: 640px)" srcset="/assets/img/default/default-640.jpg, /assets/img/default/default-640-12x.jpg 1.25x, /assets/img/default/default-640-15x.jpg 1.5x, /assets/img/default/default-640-20x.jpg 2x, /assets/img/default/default-640-25x.jpg 2.5x, /assets/img/default/default-640-30x.jpg 3x, /assets/img/default/default-640-25x.jpg 3.5x, /assets/img/default/default-640-40x.jpg 4x" />
                  <source media="(min-height: 560px)" srcset="/assets/img/default/default-560.jpg, /assets/img/default/default-560-12x.jpg 1.25x, /assets/img/default/default-560-15x.jpg 1.5x, /assets/img/default/default-560-20x.jpg 2x, /assets/img/default/default-560-25x.jpg 2.5x, /assets/img/default/default-560-30x.jpg 3x, /assets/img/default/default-560-35x.jpg 3.5x, /assets/img/default/default-560-40x.jpg 4x" />
                  <source media="(min-height: 560px)" srcset="/assets/img/default/default-560.jpg, /assets/img/default/default-560-12x.jpg 1.25x, /assets/img/default/default-560-15x.jpg 1.5x, /assets/img/default/default-560-20x.jpg 2x, /assets/img/default/default-560-25x.jpg 2.5x, /assets/img/default/default-560-30x.jpg 3x, /assets/img/default/default-560-35x.jpg 3.5x, /assets/img/default/default-560-40x.jpg 4x" />
                  <source media="(min-height: 480px)" srcset="/assets/img/default/default-480.jpg, /assets/img/default/default-480-12x.jpg 1.25x, /assets/img/default/default-480-15x.jpg 1.5x, /assets/img/default/default-480-20x.jpg 2x, /assets/img/default/default-480-25x.jpg 2.5x, /assets/img/default/default-480-30x.jpg 3x, /assets/img/default/default-480-35x.jpg 3.5x, /assets/img/default/default-480-40x.jpg 4x" />
                  <source media="(min-height: 400px)" srcset="/assets/img/default/default-400.jpg, /assets/img/default/default-400-12x.jpg 1.25x, /assets/img/default/default-400-15x.jpg 1.5x, /assets/img/default/default-400-20x.jpg 2x, /assets/img/default/default-400-25x.jpg 2.5x, /assets/img/default/default-400-30x.jpg 3x, /assets/img/default/default-400-35x.jpg 3.5x, /assets/img/default/default-400-40x.jpg 4x" />
                  <source media="(min-height: 320px)" srcset="/assets/img/default/default.jpg, /assets/img/default/default-12x.jpg 1.25x, /assets/img/default/default-15x.jpg 1.5x, /assets/img/default/default-20x.jpg 2x, /assets/img/default/default-25x.jpg 2.5x, /assets/img/default/default-30x.jpg 3x, /assets/img/default/default-35x.jpg 3.5x,/assets/img/default/default-40x.jpg 4x" />
                  <img class="project-img" src="/assets/img/default/default.jpg" alt="image that loads when no image is available"/>
                </picture>                  
              <p class="caption">a caption</p>
            </a>
          </figure>

          <figure class="project-container">
            <a class="project-display-link" href="/assets/img/default/default-fullscreen.jpg" data-size="5760x4320" data-no-swup>
            <picture class="project-picture">
                <source media="(min-height: 5120px)" srcset="/assets/img/default/default-5120.jpg" />
                <source media="(min-height: 3840px)" srcset="/assets/img/default/default-3840.jpg, /assets/img/default/default-3840-12x.jpg 1.25x, /assets/img/default/default-3840-15x.jpg 1.5x, /assets/img/default/default-3840-20x.jpg 2x" />
                <source media="(min-height: 2560px)" srcset="/assets/img/default/default-2560.jpg, /assets/img/default/default-2560-12x.jpg 1.25x, /assets/img/default/default-2560-15x.jpg 1.5x, /assets/img/default/default-2560-20x.jpg 2x" />
                <source media="(min-height: 2160px)" srcset="/assets/img/default/default-2160.jpg, /assets/img/default/default-2160-12x.jpg 1.25x, /assets/img/default/default-2160-15x.jpg 1.5x, /assets/img/default/default-2160-20x.jpg 2x" />
                <source media="(min-height: 1680px)" srcset="/assets/img/default/default-1680.jpg, /assets/img/default/default-1680-12x.jpg 1.25x, /assets/img/default/default-1680-15x.jpg 1.5x, /assets/img/default/default-1680-20x.jpg 2x, /assets/img/default/default-1680-25x.jpg 2.5x,/assets/img/default/default-1680-30x.jpg 3x" />
                <source media="(min-height: 1440px)" srcset="/assets/img/default/default-1440.jpg, /assets/img/default/default-1440-12x.jpg 1.25x, /assets/img/default/default-1440-15x.jpg 1.5x, /assets/img/default/default-1440-20x.jpg 2x, /assets/img/default/default-1440-25x.jpg 2.5x,/assets/img/default/default-1440-30x.jpg 3x" />
                <source media="(min-height: 1320px)" srcset="/assets/img/default/default-1320.jpg, /assets/img/default/default-1320-12x.jpg 1.25x, /assets/img/default/default-1320-15x.jpg 1.5x, /assets/img/default/default-1320-20x.jpg 2x, /assets/img/default/default-1320-25x.jpg 2.5x,/assets/img/default/default-1320-30x.jpg 3x, /assets/img/default/default-1320-25x.jpg 3.5x, /assets/img/default/default-1320-40x.jpg 4x" />
                <source media="(min-height: 1200px)" srcset="/assets/img/default/default-1200.jpg, /assets/img/default/default-1200-12x.jpg 1.25x, /assets/img/default/default-1200-15x.jpg 1.5x, /assets/img/default/default-1200-20x.jpg 2x, /assets/img/default/default-1200-25x.jpg 2.5x,/assets/img/default/default-1200-30x.jpg 3x, /assets/img/default/default-1200-25x.jpg 3.5x, /assets/img/default/default-1200-40x.jpg 4x" />
                <source media="(min-height: 1080px)" srcset="/assets/img/default/default-1080.jpg, /assets/img/default/default-1080-12x.jpg 1.25x, /assets/img/default/default-1080-15x.jpg 1.5x, /assets/img/default/default-1080-20x.jpg 2x, /assets/img/default/default-1080-25x.jpg 2.5x,/assets/img/default/default-1080-30x.jpg 3x, /assets/img/default/default-1080-25x.jpg 3.5x, /assets/img/default/default-1080-40x.jpg 4x" />
                <source media="(min-height: 960px)" srcset="/assets/img/default/default-960.jpg, /assets/img/default/default-960-12x.jpg 1.25x, /assets/img/default/default-960-15x.jpg 1.5x, /assets/img/default/default-960-20x.jpg 2x, /assets/img/default/default-960-25x.jpg 2.5x, /assets/img/default/default-960-30x.jpg 3x, /assets/img/default/default-960-25x.jpg 3.5x, /assets/img/default/default-960-40x.jpg 4x" />
                <source media="(min-height: 880px)" srcset="/assets/img/default/default-880.jpg, /assets/img/default/default-880-12x.jpg 1.25x, /assets/img/default/default-880-15x.jpg 1.5x, /assets/img/default/default-880-20x.jpg 2x, /assets/img/default/default-880-25x.jpg 2.5x, /assets/img/default/default-880-30x.jpg 3x, /assets/img/default/default-880-25x.jpg 3.5x, /assets/img/default/default-880-40x.jpg 4x" />
                <source media="(min-height: 800px)" srcset="/assets/img/default/default-800.jpg, /assets/img/default/default-800-12x.jpg 1.25x, /assets/img/default/default-800-15x.jpg 1.5x, /assets/img/default/default-800-20x.jpg 2x, /assets/img/default/default-800-25x.jpg 2.5x, /assets/img/default/default-800-30x.jpg 3x, /assets/img/default/default-800-25x.jpg 3.5x, /assets/img/default/default-800-40x.jpg 4x" />
                <source media="(min-height: 720px)" srcset="/assets/img/default/default-720.jpg, /assets/img/default/default-720-12x.jpg 1.25x, /assets/img/default/default-720-15x.jpg 1.5x, /assets/img/default/default-720-20x.jpg 2x, /assets/img/default/default-720-25x.jpg 2.5x, /assets/img/default/default-720-30x.jpg 3x, /assets/img/default/default-720-25x.jpg 3.5x, /assets/img/default/default-720-40x.jpg 4x" />
                <source media="(min-height: 640px)" srcset="/assets/img/default/default-640.jpg, /assets/img/default/default-640-12x.jpg 1.25x, /assets/img/default/default-640-15x.jpg 1.5x, /assets/img/default/default-640-20x.jpg 2x, /assets/img/default/default-640-25x.jpg 2.5x, /assets/img/default/default-640-30x.jpg 3x, /assets/img/default/default-640-25x.jpg 3.5x, /assets/img/default/default-640-40x.jpg 4x" />
                <source media="(min-height: 560px)" srcset="/assets/img/default/default-560.jpg, /assets/img/default/default-560-12x.jpg 1.25x, /assets/img/default/default-560-15x.jpg 1.5x, /assets/img/default/default-560-20x.jpg 2x, /assets/img/default/default-560-25x.jpg 2.5x, /assets/img/default/default-560-30x.jpg 3x, /assets/img/default/default-560-35x.jpg 3.5x, /assets/img/default/default-560-40x.jpg 4x" />
                <source media="(min-height: 560px)" srcset="/assets/img/default/default-560.jpg, /assets/img/default/default-560-12x.jpg 1.25x, /assets/img/default/default-560-15x.jpg 1.5x, /assets/img/default/default-560-20x.jpg 2x, /assets/img/default/default-560-25x.jpg 2.5x, /assets/img/default/default-560-30x.jpg 3x, /assets/img/default/default-560-35x.jpg 3.5x, /assets/img/default/default-560-40x.jpg 4x" />
                <source media="(min-height: 480px)" srcset="/assets/img/default/default-480.jpg, /assets/img/default/default-480-12x.jpg 1.25x, /assets/img/default/default-480-15x.jpg 1.5x, /assets/img/default/default-480-20x.jpg 2x, /assets/img/default/default-480-25x.jpg 2.5x, /assets/img/default/default-480-30x.jpg 3x, /assets/img/default/default-480-35x.jpg 3.5x, /assets/img/default/default-480-40x.jpg 4x" />
                <source media="(min-height: 400px)" srcset="/assets/img/default/default-400.jpg, /assets/img/default/default-400-12x.jpg 1.25x, /assets/img/default/default-400-15x.jpg 1.5x, /assets/img/default/default-400-20x.jpg 2x, /assets/img/default/default-400-25x.jpg 2.5x, /assets/img/default/default-400-30x.jpg 3x, /assets/img/default/default-400-35x.jpg 3.5x, /assets/img/default/default-400-40x.jpg 4x" />
                <source media="(min-height: 320px)" srcset="/assets/img/default/default.jpg, /assets/img/default/default-12x.jpg 1.25x, /assets/img/default/default-15x.jpg 1.5x, /assets/img/default/default-20x.jpg 2x, /assets/img/default/default-25x.jpg 2.5x, /assets/img/default/default-30x.jpg 3x, /assets/img/default/default-35x.jpg 3.5x,/assets/img/default/default-40x.jpg 4x" />
                <img class="project-img" src="/assets/img/default/default.jpg" alt="image that loads when no image is available"/>
              </picture>
              <p class="caption">a caption</p>
            </a>
          </figure>

        </section>
        <footer class="project-footer">
          <a class="footer-link" href="/">
            <div class="footer-title-wrapper">
              <div class="footer-title">
                <h4>project title</h4>
                <h6>explore project</h6>
              </div>
            </div>
            <img class="footer-img" src="/assets/img/photography/thumbnails/flickr-2.jpg" alt=""/>
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
