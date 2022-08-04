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
              <h5 class="animate-text-color">UX Design</h5>
            </div>
            <div>
              <h1 class="animate-text-color">Stirista Append</h1>
            </div>
            <div>
              <h3 class="animate-text-color">web-app</h3>
            </div>
          </div>
        </header>
        <section class="project-gallery">

          <div class="project-description-container">
            <div class="project-description-wrapper">
              <h5 class="project-description-header">Background</h5>
              <p> Stirista Append is a service that allows clients to add information to their existing marketing lists.
                  For example, a marketing manager sends Stirista an Excel spreadsheet containing a list of customer names and emails. 
                  Stirista adds age, gender, and zip code from their proprietary database to the customer’s file. 
                  This provides the marketing manager with the ability to segment their audience and better target their communications.
              </p>
            </div>
          </div>

          <figure class="project-container">
            <a class="project-display-link two-to-one" href="/assets/img/append/append-1-fullsize.png" data-size="4320x2160" data-no-swup>
              <picture class="project-picture">
                <source media="(min-height:2304px)" type="image/webp" srcset="/assets/img/append/append-1-1024.webp">
                <source media="(min-height:2304px)"                   srcset="/assets/img/append/append-1-1024.png">
                <source media="(min-height:1536px)" type="image/webp" srcset="/assets/img/append/append-1-768.webp, /assets/img/append/append-1-1024.webp 2x">
                <source media="(min-height:1536px)"                   srcset="/assets/img/append/append-1-768.png, /assets/img/append/append-1-1024.png 2x">
                <source media="(min-height:768px)" type="image/webp" srcset="/assets/img/append/append-1-512.webp, /assets/img/append/append-1-768.webp 2x, /assets/img/append/append-1-1024.webp 3x">
                <source media="(min-height:768px)"                   srcset="/assets/img/append/append-1-512.png, /assets/img/append/append-1-768.png 2x, /assets/img/append/append-1-1024.png 3x">
                <source media="(min-height:0px)" type="image/webp" srcset="/assets/img/append/append-1-256.webp, /assets/img/append/append-1-512.webp 2x, /assets/img/append/append-1-768.webp 4x">
                <source media="(min-height:0px)"                   srcset="/assets/img/append/append-1-256.png, /assets/img/append/append-1-512.png 2x, /assets/img/append/append-1-768.png 4x">
                <img class="project-img" src="/assets/img/append/append-1-512.png" alt=""/>
              </picture>
            </a>
          </figure>

          <div class="project-description-container">
            <div class="project-description-wrapper">
              <p> For Stirista, Append was a time-consuming service.
                  Each customer request had to be processed by staff.
                  The company had invested in a web-app that allowed customers to complete an append themselves. 
                  However, despite multiple advertising campaigns use of the web-app was only a fraction of the email and phone requests. 
                  I was asked to design a new user interface for Append.
              </p>
            </div>
          </div>

          <div class="project-description-container">
            <div class="project-description-wrapper">
              <h5 class="project-description-header">Evaluation</h5>
              <p> The existing interface was tested and then the the user flow was mapped.
                  Three primary problem areas were identified: how the app dealt with choice, vague and technical language, and obscured information.
              </p>
            </div>
          </div>

          <figure class="project-container">
            <a class="project-display-link two-to-one" href="/assets/img/append/append-2-fullsize.png" data-size="4320x2160" data-no-swup>
              <picture class="project-picture">
                <source media="(min-height:2304px)" type="image/webp" srcset="/assets/img/append/append-2-1024.webp">
                <source media="(min-height:2304px)"                   srcset="/assets/img/append/append-2-1024.png">
                <source media="(min-height:1536px)" type="image/webp" srcset="/assets/img/append/append-2-768.webp, /assets/img/append/append-2-1024.webp 2x">
                <source media="(min-height:1536px)"                   srcset="/assets/img/append/append-2-768.png, /assets/img/append/append-2-1024.png 2x">
                <source media="(min-height:768px)" type="image/webp" srcset="/assets/img/append/append-2-512.webp, /assets/img/append/append-2-768.webp 2x, /assets/img/append/append-2-1024.webp 3x">
                <source media="(min-height:768px)"                   srcset="/assets/img/append/append-2-512.png, /assets/img/append/append-2-768.png 2x, /assets/img/append/append-2-1024.png 3x">
                <source media="(min-height:0px)" type="image/webp" srcset="/assets/img/append/append-2-256.webp, /assets/img/append/append-2-512.webp 2x, /assets/img/append/append-2-768.webp 4x">
                <source media="(min-height:0px)"                   srcset="/assets/img/append/append-2-256.png, /assets/img/append/append-2-512.png 2x, /assets/img/append/append-2-768.png 4x">
                <img class="project-img" src="/assets/img/append/append-2-512.png" alt=""/>
              </picture>
              <p class="caption">original flow</p>
            </a>
          </figure>

          <div class="project-description-container">
            <div class="project-description-wrapper">
              <p> First, the app's choices made cognitive load unnecessarily high. 
                  After uploading a file, users were asked to choose the type of append. 
                  This question combined two dimensions: the presence of email addresses in the file, and the type of data (consumer or business).
              </p>
              <p> Cognitive load could be reduced by asking one question for each dimension. 
                  (1) if they would like business data or consumer data. 
                  (2) if they already have email information. 
              </p>
            </div>
          </div>

          <figure class="project-container">
            <a class="project-display-link two-to-one" href="/assets/img/append/append-5-fullsize.png" data-size="1936x968" data-no-swup>
              <picture class="project-picture">
                <source media="(min-height:768px)" type="image/webp" srcset="/assets/img/append/append-5-512.webp">
                <source media="(min-height:768px)"                   srcset="/assets/img/append/append-5-512.png ">
                <source media="(min-height:0px)" type="image/webp" srcset="/assets/img/append/append-5-256.webp, /assets/img/append/append-5-512.webp 2x">
                <source media="(min-height:0px)"                   srcset="/assets/img/append/append-5-256.png, /assets/img/append/append-5-512.png 2x">
                <img class="project-img" src="/assets/img/append/append-5-512.png" alt=""/>
              </picture>
              <p class="caption">answering this question requires making two choices at once</p>
            </a>
          </figure>

          <div class="project-description-container">
            <div class="project-description-wrapper">
              <p> The second problem was language.
                  Users needed to tell the application what the contents of each column was, a process vaguely referred to as “mapping.”
              </p>
              <p> The label "define your own mapping" was located at the top of the page, but the description was placed at the bottom. 
                  In addition, the description contained technical shorthand like "field+." 
                  It also relied on confusing and repetitive language like "append fields on the basis of fields."
              </p>
            </div>
          </div>

          <figure class="project-container">
            <a class="project-display-link" href="/assets/img/append/append-4-fullsize.png" data-size="1436x1911" data-no-swup>
              <picture class="project-picture">
                <source media="(min-height:2304px)" type="image/webp" srcset="/assets/img/append/append-4-1024.webp">
                <source media="(min-height:2304px)"                   srcset="/assets/img/append/append-4-1024.png">
                <source media="(min-height:1536px)" type="image/webp" srcset="/assets/img/append/append-4-768.webp, /assets/img/append/append-4-1024.webp 2x">
                <source media="(min-height:1536px)"                   srcset="/assets/img/append/append-4-768.png, /assets/img/append/append-4-1024.png 2x">
                <source media="(min-height:768px)" type="image/webp" srcset="/assets/img/append/append-4-512.webp, /assets/img/append/append-4-768.webp 2x, /assets/img/append/append-4-1024.webp 3x">
                <source media="(min-height:768px)"                   srcset="/assets/img/append/append-4-512.png, /assets/img/append/append-4-768.png 2x, /assets/img/append/append-4-1024.png 3x">
                <source media="(min-height:0px)" type="image/webp" srcset="/assets/img/append/append-4-256.webp, /assets/img/append/append-4-512.webp 2x, /assets/img/append/append-4-768.webp 4x">
                <source media="(min-height:0px)"                   srcset="/assets/img/append/append-4-256.png, /assets/img/append/append-4-512.png 2x, /assets/img/append/append-4-768.png 4x">
                <img class="project-img" src="/assets/img/append/append-4-512.png" alt=""/>
              </picture>
              <p class="caption">language makes the purpose of this page difficult to discern</p>
            </a>
          </figure>

          <div class="project-description-container">
            <div class="project-description-wrapper">
              <p> Third, critical pricing information was hidden. 
                  A pricing estimate wasn’t shown until after the user had uploaded a file and completed the lengthy "mapping" process. 
                  In addition, price was based on the number of matches. 
                  And, because typical match rates weren’t displayed, price estimates were useless. 
                  Also, real prices were hidden behind a credit system. 
                  Users needed accurate estimates as soon as possible.
              </p>
            </div>
          </div>

          <figure class="project-container">
            <a class="project-display-link two-to-one" href="/assets/img/append/append-3-fullsize.png" data-size="2180x1092" data-no-swup>
              <picture class="project-picture">
                <source media="(min-height:2304px)" type="image/webp" srcset="/assets/img/append/append-3-1024.webp">
                <source media="(min-height:2304px)"                   srcset="/assets/img/append/append-3-1024.png">
                <source media="(min-height:1536px)" type="image/webp" srcset="/assets/img/append/append-3-768.webp, /assets/img/append/append-3-1024.webp 2x">
                <source media="(min-height:1536px)"                   srcset="/assets/img/append/append-3-768.png, /assets/img/append/append-3-1024.png 2x">
                <source media="(min-height:768px)" type="image/webp" srcset="/assets/img/append/append-3-512.webp, /assets/img/append/append-3-768.webp 2x, /assets/img/append/append-3-1024.webp 3x">
                <source media="(min-height:768px)"                   srcset="/assets/img/append/append-3-512.png, /assets/img/append/append-3-768.png 2x, /assets/img/append/append-3-1024.png 3x">
                <source media="(min-height:0px)" type="image/webp" srcset="/assets/img/append/append-3-256.webp, /assets/img/append/append-3-512.webp 2x, /assets/img/append/append-3-768.webp 4x">
                <source media="(min-height:0px)"                   srcset="/assets/img/append/append-3-256.png, /assets/img/append/append-3-512.png 2x, /assets/img/append/append-3-768.png 4x">
                <img class="project-img" src="/assets/img/append/append-3-512.png" alt=""/>
              </picture>
              <p class="caption">without an estimation of match rate and the value of a credit, this cost summary is not useful</p>
            </a>
          </figure>

          <div class="project-description-container">
            <div class="project-description-wrapper">
              <h5 class="project-description-header">Prototype</h5>
              <p> The problems identified in the initial evaluation were incorporated into a new user flow. 
                  From that user flow, a greybox mockup was built.
                  The greybox was tested on subjects from Stirista's Business Development and Marketing teams.
                  The feedback from this testing was incorporated into the final model and presented to the developers for implementaiton.
              </p>
            </div>
          </div>

          <figure class="project-container">
            <a class="project-display-link two-to-one" href="/assets/img/append/append-6-fullsize.png" data-size="4320x2160" data-no-swup>
              <picture class="project-picture">
                <source media="(min-height:2304px)" type="image/webp" srcset="/assets/img/append/append-6-1024.webp">
                <source media="(min-height:2304px)"                   srcset="/assets/img/append/append-6-1024.png">
                <source media="(min-height:1536px)" type="image/webp" srcset="/assets/img/append/append-6-768.webp, /assets/img/append/append-6-1024.webp 2x">
                <source media="(min-height:1536px)"                   srcset="/assets/img/append/append-6-768.png, /assets/img/append/append-6-1024.png 2x">
                <source media="(min-height:768px)" type="image/webp" srcset="/assets/img/append/append-6-512.webp, /assets/img/append/append-6-768.webp 2x, /assets/img/append/append-6-1024.webp 3x">
                <source media="(min-height:768px)"                   srcset="/assets/img/append/append-6-512.png, /assets/img/append/append-6-768.png 2x, /assets/img/append/append-6-1024.png 3x">
                <source media="(min-height:0px)" type="image/webp" srcset="/assets/img/append/append-6-256.webp, /assets/img/append/append-6-512.webp 2x, /assets/img/append/append-6-768.webp 4x">
                <source media="(min-height:0px)"                   srcset="/assets/img/append/append-6-256.png, /assets/img/append/append-6-512.png 2x, /assets/img/append/append-6-768.png 4x">
                <img class="project-img" src="/assets/img/append/append-6-512.png" alt=""/>
              </picture>
              <p class="caption">updated user flow</p>
            </a>
          </figure>

          <div class="project-description-container">
            <div class="project-description-wrapper">
              <p> Critical information, like match rate and cost per match is displayed before the user uploads a file.
                  In addition, the application can determine if the user needed an append or "reverse append" later on.
              </p>
            </div>
          </div>

          <figure class="project-container">
            <a class="project-display-link two-to-one" href="/assets/img/append/append-7-fullsize.png" data-size="1436x2160" data-no-swup>
              <picture class="project-picture">
                <source media="(min-height:2304px)" type="image/webp" srcset="/assets/img/append/append-7-1024.webp">
                <source media="(min-height:2304px)"                   srcset="/assets/img/append/append-7-1024.png">
                <source media="(min-height:1536px)" type="image/webp" srcset="/assets/img/append/append-7-768.webp, /assets/img/append/append-7-1024.webp 2x">
                <source media="(min-height:1536px)"                   srcset="/assets/img/append/append-7-768.png, /assets/img/append/append-7-1024.png 2x">
                <source media="(min-height:768px)" type="image/webp" srcset="/assets/img/append/append-7-512.webp, /assets/img/append/append-7-768.webp 2x, /assets/img/append/append-7-1024.webp 3x">
                <source media="(min-height:768px)"                   srcset="/assets/img/append/append-7-512.png, /assets/img/append/append-7-768.png 2x, /assets/img/append/append-7-1024.png 3x">
                <source media="(min-height:0px)" type="image/webp" srcset="/assets/img/append/append-7-256.webp, /assets/img/append/append-7-512.webp 2x, /assets/img/append/append-7-768.webp 4x">
                <source media="(min-height:0px)"                   srcset="/assets/img/append/append-7-256.png, /assets/img/append/append-7-512.png 2x, /assets/img/append/append-7-768.png 4x">
                <img class="project-img" src="/assets/img/append/append-7-512.png" alt=""/>
              </picture>
              <p class="caption">critical information like pricing and match rate is displayed</p>
            </a>
          </figure>

          <div class="project-description-container">
            <div class="project-description-wrapper">
              <p> The upload action is given it's own page, further reducing cognitive load.
                  After a user has uploaded a file, a more precise cost estimate is made based on the number of records in the file.
              </p>
            </div>
          </div>

          <figure class="project-container">
            <a class="project-display-link two-to-one" href="/assets/img/append/append-8-fullsize.png" data-size="1277x2560" data-no-swup>
              <picture class="project-picture">
                <source media="(min-height:2304px)" type="image/webp" srcset="/assets/img/append/append-8-1024.webp">
                <source media="(min-height:2304px)"                   srcset="/assets/img/append/append-8-1024.png">
                <source media="(min-height:1536px)" type="image/webp" srcset="/assets/img/append/append-8-768.webp, /assets/img/append/append-8-1024.webp 2x">
                <source media="(min-height:1536px)"                   srcset="/assets/img/append/append-8-768.png, /assets/img/append/append-8-1024.png 2x">
                <source media="(min-height:768px)" type="image/webp" srcset="/assets/img/append/append-8-512.webp, /assets/img/append/append-8-768.webp 2x, /assets/img/append/append-8-1024.webp 3x">
                <source media="(min-height:768px)"                   srcset="/assets/img/append/append-8-512.png, /assets/img/append/append-8-768.png 2x, /assets/img/append/append-8-1024.png 3x">
                <source media="(min-height:0px)" type="image/webp" srcset="/assets/img/append/append-8-256.webp, /assets/img/append/append-8-512.webp 2x, /assets/img/append/append-8-768.webp 4x">
                <source media="(min-height:0px)"                   srcset="/assets/img/append/append-8-256.png, /assets/img/append/append-8-512.png 2x, /assets/img/append/append-8-768.png 4x">
                <img class="project-img" src="/assets/img/append/append-8-512.png" alt=""/>
              </picture>
              <p class="caption">new upload pages and more accurate pricing estimates</p>
            </a>
          </figure>

          <div class="project-description-container">
            <div class="project-description-wrapper">
              <p> User testing revealed the horizontal arrangement of the dropdown menus aligned better with the user’s mental model of a spreadsheet.
                  Using this feedback a new pattern was deveveloped.
                  This pattern uses a preview of the user's file, but replaced the first row with a series of dropdowns.
              </p>
            </div>
          </div>

          <figure class="project-container">
            <a class="project-display-link two-to-one" href="/assets/img/append/append-11-fullsize.png" data-size="4320x2160" data-no-swup>
              <picture class="project-picture">
                <source media="(min-height:2304px)" type="image/webp" srcset="/assets/img/append/append-11-1024.webp">
                <source media="(min-height:2304px)"                   srcset="/assets/img/append/append-11-1024.png">
                <source media="(min-height:1536px)" type="image/webp" srcset="/assets/img/append/append-11-768.webp, /assets/img/append/append-11-1024.webp 2x">
                <source media="(min-height:1536px)"                   srcset="/assets/img/append/append-11-768.png, /assets/img/append/append-11-1024.png 2x">
                <source media="(min-height:768px)" type="image/webp" srcset="/assets/img/append/append-11-512.webp, /assets/img/append/append-11-768.webp 2x, /assets/img/append/append-11-1024.webp 3x">
                <source media="(min-height:768px)"                   srcset="/assets/img/append/append-11-512.png, /assets/img/append/append-11-768.png 2x, /assets/img/append/append-11-1024.png 3x">
                <source media="(min-height:0px)" type="image/webp" srcset="/assets/img/append/append-11-256.webp, /assets/img/append/append-11-512.webp 2x, /assets/img/append/append-11-768.webp 4x">
                <source media="(min-height:0px)"                   srcset="/assets/img/append/append-11-256.png, /assets/img/append/append-11-512.png 2x, /assets/img/append/append-11-768.png 4x">
                <img class="project-img" src="/assets/img/append/append-11-512.png" alt=""/>
              </picture>
            </a>
          </figure>

          <figure class="project-container">
            <a class="project-display-link two-to-one" href="/assets/img/append/append-9-fullsize.png" data-size="1464x3000" data-no-swup>
              <picture class="project-picture">
                <source media="(min-height:2304px)" type="image/webp" srcset="/assets/img/append/append-9-1024.webp">
                <source media="(min-height:2304px)"                   srcset="/assets/img/append/append-9-1024.png">
                <source media="(min-height:1536px)" type="image/webp" srcset="/assets/img/append/append-9-768.webp, /assets/img/append/append-9-1024.webp 2x">
                <source media="(min-height:1536px)"                   srcset="/assets/img/append/append-9-768.png, /assets/img/append/append-9-1024.png 2x">
                <source media="(min-height:768px)" type="image/webp" srcset="/assets/img/append/append-9-512.webp, /assets/img/append/append-9-768.webp 2x, /assets/img/append/append-9-1024.webp 3x">
                <source media="(min-height:768px)"                   srcset="/assets/img/append/append-9-512.png, /assets/img/append/append-9-768.png 2x, /assets/img/append/append-9-1024.png 3x">
                <source media="(min-height:0px)" type="image/webp" srcset="/assets/img/append/append-9-256.webp, /assets/img/append/append-9-512.webp 2x, /assets/img/append/append-9-768.webp 4x">
                <source media="(min-height:0px)"                   srcset="/assets/img/append/append-9-256.png, /assets/img/append/append-9-512.png 2x, /assets/img/append/append-9-768.png 4x">
                <img class="project-img" src="/assets/img/append/append-9-512.png" alt=""/>
              </picture>
              <p class="caption">mapping pages look like a spreadsheet</p>
            </a>
          </figure>

          <div class="project-description-container">
            <div class="project-description-wrapper">
              <p> This pattern was also adopted for the new Append pages.
                  Instead of a series of checkboxes, users added information using the same familiar dropdowns and preview.
              </p>
            </div>
          </div>

          <figure class="project-container">
            <a class="project-display-link" href="/assets/img/append/append-12-fullsize.png" data-size="1440x3240" data-no-swup>
              <picture class="project-picture">
                <source media="(min-height:2304px)" type="image/webp" srcset="/assets/img/append/append-12-1024.webp">
                <source media="(min-height:2304px)"                   srcset="/assets/img/append/append-12-1024.png">
                <source media="(min-height:1536px)" type="image/webp" srcset="/assets/img/append/append-12-768.webp, /assets/img/append/append-12-1024.webp 2x">
                <source media="(min-height:1536px)"                   srcset="/assets/img/append/append-12-768.png, /assets/img/append/append-12-1024.png 2x">
                <source media="(min-height:768px)" type="image/webp" srcset="/assets/img/append/append-12-512.webp, /assets/img/append/append-12-768.webp 2x, /assets/img/append/append-12-1024.webp 3x">
                <source media="(min-height:768px)"                   srcset="/assets/img/append/append-12-512.png, /assets/img/append/append-12-768.png 2x, /assets/img/append/append-12-1024.png 3x">
                <source media="(min-height:0px)" type="image/webp" srcset="/assets/img/append/append-12-256.webp, /assets/img/append/append-12-512.webp 2x, /assets/img/append/append-12-768.webp 4x">
                <source media="(min-height:0px)"                   srcset="/assets/img/append/append-12-256.png, /assets/img/append/append-12-512.png 2x, /assets/img/append/append-12-768.png 4x">
                <img class="project-img" src="/assets/img/append/append-12-512.png" alt=""/>
              </picture>
              <p class="caption">(1) original append page, (2) initial revision, (3) final revision</p>
            </a>
          </figure>

          <div class="project-description-container">
            <div class="project-description-wrapper">
              <p> As the user provides more information about the file by identifying the columns, a more precise pricing estimate can be made.
                  The most accurate estimate is made immediately before the user makes a purchase.
              </p>
            </div>
          </div>

          <figure class="project-container">
            <a class="project-display-link" href="/assets/img/append/append-10-fullsize.png" data-size="2180x2560" data-no-swup>
              <picture class="project-picture">
                <source media="(min-height:2304px)" type="image/webp" srcset="/assets/img/append/append-10-1024.webp">
                <source media="(min-height:2304px)"                   srcset="/assets/img/append/append-10-1024.png">
                <source media="(min-height:1536px)" type="image/webp" srcset="/assets/img/append/append-10-768.webp, /assets/img/append/append-10-1024.webp 2x">
                <source media="(min-height:1536px)"                   srcset="/assets/img/append/append-10-768.png, /assets/img/append/append-10-1024.png 2x">
                <source media="(min-height:768px)" type="image/webp" srcset="/assets/img/append/append-10-512.webp, /assets/img/append/append-10-768.webp 2x, /assets/img/append/append-10-1024.webp 3x">
                <source media="(min-height:768px)"                   srcset="/assets/img/append/append-10-512.png, /assets/img/append/append-10-768.png 2x, /assets/img/append/append-10-1024.png 3x">
                <source media="(min-height:0px)" type="image/webp" srcset="/assets/img/append/append-10-256.webp, /assets/img/append/append-10-512.webp 2x, /assets/img/append/append-10-768.webp 4x">
                <source media="(min-height:0px)"                   srcset="/assets/img/append/append-10-256.png, /assets/img/append/append-10-512.png 2x, /assets/img/append/append-10-768.png 4x">
                <img class="project-img" src="/assets/img/append/append-10-512.png" alt=""/>
              </picture>
              <p class="caption">more precise cost estimates are made as more information becomes available</p>
            </a>
          </figure>

          <div class="project-description-container">
            <div class="project-description-wrapper">
              <p> The final Append interface is easier to use. 
                  The user isn't overloaded with confusing choices. 
                  Conventional language replaces technical terms. 
                  Descriptions are short and informative. 
                  The final interface is also transparent. 
                  It helps estimate costs instead of trying to hide them. 
                  Through prototyping and testing, a UI pattern was developed that matches user’s mental model of a spreadsheet. 
                  These improvements, along with basic design knowledge, give Stirista Append a newfound credibility as a service.
              </p>
            </div>
          </div>

          <div class="project-invision-container">
            <h5 class="project-description-header">Demo</h5>
            <div class="project-invision-wrapper">
              <iframe id="frame" class="project-invision" src="https://invis.io/S8SSR41CB39#/373400459_Invision-Intro-Page" frameborder="0" allowfullscreen="false" sandbox="allow-forms allow-pointer-lock allow-popups	allow-same-origin allow-scripts"></iframe>
            </div>
          </div>
        
        </section>
        <footer class="project-footer">
          <a class="footer-link" href="/portraiture">
            <div class="footer-title-wrapper">
              <div class="footer-title">
                <h2>Portraiture</h2>
                <h6>explore next project</h6>
              </div>
            </div>
            <picture class="footer-picture">
              <source media="(min-height:2304px)" type="image/webp" srcset="/assets/img/thumb/thumb-1-960.webp">
              <source media="(min-height:2304px)"                   srcset="/assets/img/thumb/thumb-1-960.jpg">
              <source media="(min-height:1536px)" type="image/webp" srcset="/assets/img/thumb/thumb-1-480.webp, /assets/img/thumb/thumb-1-960.webp 2x">
              <source media="(min-height:1536px)"                   srcset="/assets/img/thumb/thumb-1-480.jpg, /assets/img/thumb/thumb-1-960.jpg 2x">
              <source media="(min-height:768px)" type="image/webp" srcset="/assets/img/thumb/thumb-1-240.webp, /assets/img/thumb/thumb-1-480.webp 2x, /assets/img/thumb/thumb-1-960.webp 3x">
              <source media="(min-height:768px)"                   srcset="/assets/img/thumb/thumb-1-240.jpg, /assets/img/thumb/thumb-1-480.jpg 2x, /assets/img/thumb/thumb-1-960.jpg 3x">
              <source media="(min-height:0px)" type="image/webp" srcset="/assets/img/thumb/thumb-1-120.webp, /assets/img/thumb/thumb-1-240.webp 2x, /assets/img/thumb/thumb-1-480.webp 4x">
              <source media="(min-height:0px)"                   srcset="/assets/img/thumb/thumb-1-120.jpg, /assets/img/thumb/thumb-1-240.jpg 2x, /assets/img/thumb/thumb-1-480.jpg 4x">
              <img class="footer-img" src="/assets/img/thumb/thumb-1-240.jpg" alt=""/>
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
