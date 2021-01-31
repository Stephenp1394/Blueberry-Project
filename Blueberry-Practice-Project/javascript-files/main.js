// SECTION #1  <------>  "page flipping" experience for mobile

let traitBoxesOuterContainer = document.querySelector(".outer-flex-container");
let traitBoxesInnerContainer = document.querySelector(".inner-flex-container");
let firstPage = document.getElementById("trait-1");
let emptyTraitBox = document.createElement("div");
let arrowIcon = document.createElement("img");
let userInstructionsBook = document.createElement("p");
/* NOTE:  I use the term "book", "page", "page flip", etc. quite bit during this section.... when you load the document at 400px viewport width and lower, and you click on gradient bordered box, the elements transform: rotateY(180deg); to mimic a page in a book flipping/turning from one side to the other. So the "book" is the entire operation as a whole including all 6 gradient bordered boxes but also the empty white box and the curved arrow icon... "page" is an individual gradient bordered box, and a "page flip" is when an individual gradient bordered box does a transform: rotateY(180deg); */
// firstPage   -->   first gradient bordered box - ref needed to toggle visibility
// emptyTraitBox   -->   empty white box with just box shadow that "pages" flip onto
// arrowIcon   -->   img right above "book" to show instructions to user
// userInstructionsBook    -->    black box that also show's user instructions but with an animation



window.addEventListener("load", () => {
  if (window.innerWidth <= 400) {
    emptyTraitBox.style.position = "absolute";
    emptyTraitBox.style.width = "calc(120px + 10vw)";
    emptyTraitBox.style.height = "calc(120px + 10vw)";
    emptyTraitBox.style.borderRadius = "10px";
    emptyTraitBox.style.boxShadow = "1px 1px 7px #c0c0c088, -1px -0.5px 7px #c0c0c088, 1px -0.5px 7px #c0c0c088, -1px 1px 7px #c0c0c088";
    traitBoxesInnerContainer.appendChild(emptyTraitBox);
    firstPage.classList.remove("invisible-pre-load");
    arrowIcon.setAttribute("id", "arrow-icon");
    arrowIcon.setAttribute("src", "/images/curved-arrow-icon.jpg");
    arrowIcon.setAttribute("alt", "A curved arrow pointing left");
    traitBoxesInnerContainer.appendChild(arrowIcon);
    setTimeout(() => {
      userInstructionsBook.textContent = "Click the box!";
      userInstructionsBook.className = "show-instructions";
      traitBoxesInnerContainer.appendChild(userInstructionsBook);
    }, 3000);
    // apply styles to empty white box and add it into DOM
    // firstPage.classList.remove("invisible-pre-load");   -->   toggle visibility on first "page" element to keep it in sync with empty white box and curved arrow icon
    // apply necessary attr's to img and add it into DOM
    // setTimeout()   -->   apply animation for userInstructionsBook 3 seconds after page load





    let allTraitBoxes = document.getElementsByClassName("bb-trait-boxes");
    let incrementer = 0;
    let traitBoxIndex = allTraitBoxes[incrementer];

    let allTraitBoxesNum2 = document.querySelectorAll(".bb-trait-boxes");
    let incrementerNum2 = 0;
    let traitBoxIdxTrack2 = allTraitBoxesNum2[incrementerNum2];

    let allTraitBoxHeadings = document.querySelectorAll("h3.bb-trait-headings");
    let traitBoxHeadingsIdx = allTraitBoxHeadings[incrementerNum2];
    let allTraitBoxPars = document.querySelectorAll("p.bb-trait-description");
    let traitBoxParsIdx = allTraitBoxPars[incrementerNum2];

    let traitBoxesIncludeEmpty = traitBoxesInnerContainer.children;
    // initialize variables needed for click handler directly below  –  traitBoxClick()
    // incrementer & incrementerNum2   -->   create references for counters to iterate through collection objects
    // allTraitBoxHeadings & allTraitBoxPars  -->  need ref's for all headings and description text (<p>'s) within gradient bordered boxes to control their visibility 
    // traitBoxesIncludeEmpty  -->  needed to access empty white box & arrow icon elements
    



    
    function traitBoxClick() {
      traitBoxIndex.style.transform = "rotateY(180deg) perspective(225px)";
      traitBoxIndex.style.transformOrigin = "left center";
      setTimeout(() => {
        traitBoxHeadingsIdx.style.display = "none";
        traitBoxParsIdx.style.display = "none";
        traitBoxIdxTrack2.style.boxShadow = "initial";
        setTimeout(() => {
          incrementerNum2++;
          if (incrementerNum2 === 6) {incrementerNum2--;}
          traitBoxHeadingsIdx = allTraitBoxHeadings[incrementerNum2];
          traitBoxParsIdx = allTraitBoxPars[incrementerNum2];
          traitBoxIdxTrack2 = allTraitBoxesNum2[incrementerNum2];
        }, 50);
      }, 500);
      if (incrementer === 5) {
        traitBoxIndex.addEventListener("transitionend", function hideTraitBoxes() {
          if (event.propertyName === "transform") {
            for (let i = 0; i < traitBoxesIncludeEmpty.length; i++) {
              if (i === 0) {traitBoxIndex.removeEventListener("transitionend", hideTraitBoxes);}
              if (i === 6) {
                traitBoxesIncludeEmpty[i].className = "remove-box-shadow";
                traitBoxesIncludeEmpty[7].className = "arrow-invisible";
                break;
              } 
              traitBoxesIncludeEmpty[i].style.transition = "opacity 1.5s, transform 1s linear";
              traitBoxesIncludeEmpty[i].style.opacity = 0;
            } 
          }    
        });
        function resetStyles() {
          if (event.propertyName === "opacity") {
            allTraitBoxesNum2.forEach(el => el.setAttribute("style", ""));
            traitBoxesIncludeEmpty[0].style.transition = "opacity 4s 0.25s";
            allTraitBoxHeadings.forEach(el => el.setAttribute("style", ""));
            allTraitBoxPars.forEach(el => el.setAttribute("style", ""));
          }
        }
        traitBoxesIncludeEmpty[0].ontransitionend = resetStyles;
        emptyTraitBox.onanimationend = () => {
          if (event.animationName === "fade-box-shadow") {
            emptyTraitBox.className = "add-box-shadow";
            setTimeout(() => traitBoxesIncludeEmpty[7].className = "display-arrow", 250);
          }
          emptyTraitBox.onanimationend = () => {
            if (event.animationName === "implement-box-shadow") {
              incrementer = 0;
              incrementerNum2 = 0;
              traitBoxIndex = allTraitBoxes[incrementer]; 
              traitBoxIdxTrack2 = allTraitBoxesNum2[incrementerNum2];
              traitBoxHeadingsIdx = allTraitBoxHeadings[incrementerNum2];
              traitBoxParsIdx = allTraitBoxPars[incrementerNum2];
              traitBoxIndex.addEventListener("click", traitBoxClick);
              traitBoxIndex.style.transition = "transform 1s linear";
            } 
          }
        }
      }     
      traitBoxIndex.removeEventListener("click", traitBoxClick);
      if (incrementer === 5) {return;}
      incrementer++; 
      traitBoxIndex = allTraitBoxes[incrementer];
      setTimeout(() => traitBoxIndex.onclick = traitBoxClick, 500);
      traitBoxIndex.style.transition = "opacity 0.5s linear, transform 1s linear";
      setTimeout(() => traitBoxIndex.style.opacity = 1, 350);
    }


    traitBoxIndex.addEventListener("click", traitBoxClick);
  }
});
/* function for entire page flipping experience */
/* Full explanantion for FIRST time user flips through "book" (reset logic explained after): */
/* setTimeout() containing nested setTimeout()   -->   remove text & box shadows from the gradient bordered boxes when they are halfway through their transform transition after clicked  –  text will show through "back of the page" if not removed and box shadow will be too pronounced if they all accumulate/pile up  –  next, implement another setTimeout() to increment counter and reassign values of the indexes within their respective collection objects  –  wait 50ms to update variables in question in order to ensure execution is reliable in terms of the timing */
/* traitBoxIndex.removeEventListener("click", traitBoxClick);   -->   remove click listener after element/page clicked to deactivate pages that have been flipped */
/* traitBoxIndex = allTraitBoxes[incrementer];   -->   update traitBoxIndex to refer to next item in collection and then bind click listener to that element to be able to flip the next page */
/* setTimeout(() => traitBoxIndex.style.opacity = 1, 350);   -->   delay execution of toggling visibility of the upcoming "page" to center the user's attention on the active page while it's still in process of flipping */
/* if (incrementer === 5) {return;}   -->   stop execution of final portion of click handler when the last "page" is clicked (because no more pages left) */


/* Full explanation of reset of the "book": */
/* if (incrementer === 5) {} (first one, theres 2)  –  contains all logic needed for reset */
/* remove transitionend listener (transform) for the final element/page immediately upon event firing to prevent it from firing a second time when all elements transform back over to default/starting positions */
/* traitBoxesIncludeEmpty[0].ontransitionend = resetStyles;   -->   listen for transitionend for opacity when book becomes fully invisible, then clear all inline styles applied to gradient bordered boxes (and their children, which is boxes text content) to restore default setup of book, but re-apply an opacity transition for first "page" (only one visible by default) */
/* add 250ms delay to re-appearance of first gradient bordered box (first "page") and curved arrow icon to synchronize re-appearance of the book */
/* 2nd animationend listener: if (event.animationName === "implement-box-shadow") {}   -->   when book becomes fully visible, reset all vars needed to their defaults and attach click listener to first page/element to allow user to flip through pages again (and again, etc.) */













// <--------------------------------------------------------------------->


// SECTION #2  <-------->  "Scroll To Top" button

let scrollToTopBtn = document.getElementsByTagName("button")[0];
let scrollToTopIcon = document.querySelector('[class^="material-icons"]');
let verticalOffset = window.pageYOffset;
let continuousScroll;
let hasFired;
let hasFinePointer = window.matchMedia("(pointer: fine)").matches;
let hasListeners = false;
let buttonVisible = false;
let targetRule = document.styleSheets[0].cssRules[20];   // scroll btn rule
let targetRule2 = document.styleSheets[0].cssRules[21];   // scroll btn icon (up arrow) rule





window.addEventListener("load", () => {
  targetRule.style.setProperty("transition", "opacity 0.5s ease 0s");
  targetRule2.style.setProperty("transition", "opacity 0.5s linear, transform 0.5s");
});
/* on page load, the scroll btn and its icon were transitioning from the initial value of opacity to the opacity values defined in their respective rules (they were supposed to just remain invisible, only scroll activity adds a class that makes them visible at a pageYOffset breakpoint)  –  may have possibly been a browser bug because it’s not the default behavior for an element that has opacity: 0; and a transition specified on the opacity to have a transition from the initial value to the programmer defined value on page load... Nonetheless, it was an issue in a few browsers so I solved it by simply appending the opacity transitions after page load */
/* need to be explicit with transition-timing-function & transition-delay properties to avoid browser inconsistencies related to how they treat transition shorthand written WITHOUT transition-timing-function/transition-property declared  -  I needed to test for the transition value in toggleBtnStates func below */


function setIntCallBack() {
  verticalOffset = window.pageYOffset;
  if (verticalOffset <= 0) {clearInterval(continuousScroll);}
  window.scrollBy(0, -500);
}

let scrollBackUp = () => {
  scrollToTopBtn.style.display = "none";
  scrollToTopIcon.style.display = "none";
  continuousScroll = setInterval(setIntCallBack, 100);
}

function showArrow() {
  scrollToTopIcon.classList.add("show-arrow");
}

function hideArrow() {
  scrollToTopIcon.classList.remove("show-arrow");
}





window.onscroll = () => hasFired = true;

function toggleBtnStates() {
  if (hasFired) {
    hasFired = false; 
    if (window.pageYOffset >= 400) {
      if (buttonVisible === false && hasListeners === false) {
        scrollToTopBtn.classList.add("btn-visible");
        scrollToTopBtn.addEventListener("click", scrollBackUp);
        if (window.innerWidth < 1050 && targetRule.style.getPropertyValue("transition") === "opacity 0.5s ease 0s") {
          setTimeout(() => targetRule.style.removeProperty("transition"), 550);
        }
        if (hasFinePointer === true) {
          scrollToTopBtn.addEventListener("mouseenter", showArrow);
          scrollToTopBtn.addEventListener("mouseleave", hideArrow);
        }
        buttonVisible = true;
        hasListeners = true;
      }  
    } 
    if (window.pageYOffset < 400) { 
      if (buttonVisible === true && hasListeners === true) {
        if (window.innerWidth >= 1050 && targetRule.style.length === 6) {
          targetRule.style.setProperty("transition", "opacity 0.5s ease 0s");
        }
        scrollToTopBtn.classList.remove("btn-visible");
        scrollToTopBtn.removeEventListener("click", scrollBackUp);
        if (scrollToTopIcon.className.includes("show-arrow")) {
          scrollToTopIcon.style.display = "none";
          scrollToTopIcon.classList.remove("show-arrow");
          setTimeout(() => scrollToTopIcon.style.display = "inline-block", 550);
        }
        if (window.innerWidth < 1050 && targetRule.style.getPropertyValue("transition") === "") {
          setTimeout(() => targetRule.style.setProperty("transition", "opacity 0.5s ease 0s"), 50);
        }
        if (hasFinePointer === true) {
          scrollToTopBtn.removeEventListener("mouseenter", showArrow);
          scrollToTopBtn.removeEventListener("mouseleave", hideArrow);
        }  
        buttonVisible = false;
        hasListeners = false;
      }
      if (scrollToTopBtn.style.display === "none") {
        scrollToTopBtn.style.display = "block";
        scrollToTopIcon.style.display = "inline-block";
      }
    } 
  }  
}
let checkPageOffset = setInterval(toggleBtnStates, 250);
/* Full explanation:  function to make scroll btn active & inactive */
/* hasFired = false;   -->   event throttler for scroll event  -  think it works fine without being throttled, but best practice to do so */
/* buttonVisible & hasListeners   -->   dont allow the two conditionals that check pageYOffset to evaluate to true if there not actually needed (i.e. dont make scroll btn visible when its already visible  –  dont make scroll btn invisible when its not visible in the first place) */
/* if (hasFinePointer === true) {}   -->   ignore mouseenter/mouseleave events for mobile screen sizes */
/* if (scrollToTopBtn.style.display === "none") {}  -->   restore default display values for scroll btn and its hover icon if user clicked btn so that we can control visibility of btn again with opacity */
/* if (window.innerWidth < 1050) {}   -->   two separate conditionals testing for viewport width below 1050px  –  for smaller viewport widths, take away transition on opacity prop after scroll btn initially becomes visible so that btn goes from visible to invisible instantly when doc scrolled back up  –  use setTimeout() to slightly delay removal and adding back of transition on opacity, otherwise could cause issues/may not be 100% reliable  –  creates better experience on mobile, scroll btn goes away sooner at pageYOffset breakpoint and doesnt continuing displaying too high up in the layout viewport height  –  also wrote this logic to minimize time the scroll btn is overlapping page content when scrolling back up... this actually wouldnt be something very practical on a real webpage with more content that extends a lot further down the page because overlap would probably be unavoidable, but it made sense for this webpage/project */
/* if (window.innerWidth >= 1050 && targetRule.style.length === 6) {}   -->   this is a fallback that would only be relevant if user was resizing window, so its an edge case, but it was good practice to write it  –  idea is we always want transitions on opacity of scroll btn (both directions) above a certain viewport width, so if user just "came from" screen size below 1050px (width) and scrolled doc past pageYOffset breakpoint and KEPT IT THERE, if we did not have this logic in place for this, scroll btn would become invisible without a transition when we scroll back up... and we don't want that, so this adds a transition back for that edge case  -  we test for length of the target rule which tells us if transition prop is present or not */
/* if (scrollToTopIcon.className.includes("show-arrow")) {}   -->   fallback for this scenario: scroll btn visible, user invokes mouseenter event by entering scroll btn, scroll btn icon (arrow) becomes visible. User KEEPS cursor on btn and scrolls back up past the 400px pageYOffset breakpoint... if we did not have this fallback, scroll btn icon would still be visible even after scroll btn has become invisible  -  scroll btn icon is not “listening” for page offset breakpoints to be crossed like the scroll btn itself is, its only paying attention to btn visibility  -   setTimeout() needed to avoid showing the transition on the transform that translates the arrow up and down.  Need to wait until that transform transition completes until restoring the previous display value again because it looks silly to show the transition on the transform in this case.  Technically, I could have re-declared transition property on the scroll btn icon so that it would only have an opacity transition in this state (i.e. no transition on the transform) so that the scroll icon would also fade away with a transition like the scroll btn does, but that would’ve been seemingly unnecessary code because it honestly looked fine without the transition and just using display: none; */
/* In desktop Safari ONLY, there is 2 minor bugs with scroll btn (NO issues in any other browsers, desktop or mobile)  –  I’m not 100% positive but these bugs honestly appear to be BROWSER BUGS and not any fault of my own (hence why its working in all other browsers). Nonetheless, the issues are pretty minor though and they do not break the experience in my opinion: */
/* Bug #1: after clicking scroll btn, scroll btn does not have transition on opacity when it first becomes visible again, but after that, transitions on the opacity are restored in both directions, (unless the user clicks on the button again, same thing will happen again if so)... the issue makes no sense because I clearly see in Safari developer tools that the class that applies the opacity transition is still present in the HTML (its never removed in the first place) for scroll btn before reaching the visibility breakpoint and the inspector also showcases that the proper display value has been dynamically applied via style attribute before reaching the visibility breakpoint */
/* Bug #2: After clicking scroll btn, there is an issue with how the scroll btn icon (up arrow) is displayed when hovering over it (appears without a transition on either the transform or opacity). The issue goes away as soon as a second mouseenter event is invoked... makes no sense once again because the class that contains the transition property that gives us the opacity & transform transition for the arrow icon is still present in the HTML (its never removed at any point in the first place) when you hover over the visible scroll btn. Also shows nothing about individual transition prop being overridden in the style inspector, yet it’s not being applied */


















// <--------------------------------------------------------------------->


// SECTION #3  <-------->  YouTube video embedded via iframe

let fullScreenOverlay = document.getElementById("theater-mode");
let iframeOverlay = document.querySelector("#section-2 #invisible-overlay");
let iframeWrapper = document.querySelector(".outer-flex-container > #inner-flx-wrapper");
let iframeVideo = document.querySelector("iframe");
let playBtnBackground = iframeWrapper.children[2];
let playBtnIcon = iframeWrapper.children[3];
let deletedOverlay;
let deletedPlayBtnBackground;
let deletedPlayBtnIcon;
let exitIcon = document.createElement("span");
let iframeVertOffset;
let iframeHeight;
let spaceToDistribute;
/* main references for iframe functionality */
/* iframeOverlay  -->  invisible overlay <div> positioned on top iframe, dimensions identical to iframe wrapper  –  needed as a substitute to attaching a click listener to iframe directly since disallowed from attaching event listeners to iframe with external resource linked  –  when click event fires for this overlay element, it brings user into "theater mode" of the video (i.e. video dimensions scale up and video becomes fixed to viewport, doc becomes read-only with dark full screen overlay, etc.) */
/* iframeWrapper  -->  wrapper for iframe needed to create "picture frame" like appearance of the iframe by rounding its corners, wrapper always 10px bigger than iframe in both dimensions no matter what to give the appearance of a 5px border on all 4 sides of iframe */
/* playBtnBackground & playBtnIcon  -->  due to the fact we now have an element positioned on top of iframe, default hover styles for the youtube video are eliminated  –  create our own custom youtube play button/icon and position it in default YT play btn's place in order to retain hover styles for youtube video (youtube play btn becomes red on hover) */
/* "deleted" group of var's  -->  initialize var's as undefined and then have them refer to deleted elements so we can bring them back in when needed (these elements are deleted upon entering "theater mode" and restored when user exits theater mode) */
/* last 3 var's   -->   needed to programmatically scroll doc so that when exiting "theater mode", the video will always be perfectly centered within visual viewport height, no matter where the user entered theater mode from (in terms of pageYOffset) */



let visViewportHeight = visualViewport.height;
let visViewportWidth = visualViewport.width;
let iframeAspectRatio = 1.75;
let viewportAspectRatio;
let viewportToIframeRatio;
let iframeWrapperHeightCalc; 
let iframeWrapperWidthCalc;
let vwBelow750;
let checkViewportStats;
let iframeWrapperWidthNoTheater;
let iframeWrapperWidthTheater;
let iframeWrapperWidthTheater2;
let windowResized = false;
let inTheaterMode = false;
const closingMessage = document.querySelector("#section-2 ~ section.closing-message");
/* references (mostly) needed for iframe responsiveness in "theater mode"  –  discussed at length below in explanation for sizeIframeTheaterMode() */
/* closingMessage  -->  store reference for it to be able to toggle visibility depending on if we're in theater mode or not */
/* 3 var's immediately after checkViewportStats  -->  needed to compare dimensions of the iframe in "default mode" (i.e. before entering theater mode) versus theater mode. If the dimensions in both modes are the same, remove transitions (because transitionend event handler that normally removes them will not fire in this case) so there is no transitions on the iframe dimensions when window is resized (in theater mode or not in theater mode)... also need to compare iframe dimensions for both modes in order to conditionally prevent removal of the iframe border (wrapper) when entering theater mode  -  more on this in the comments below */



let ctrlBorderVisibility;
let windowResized2 = false;
let width1;
let width2;
let height1;
let height2;
let resizeCounter = 0;
let lockedIn2ndDimensions;
let iframeBorderRemoved = false;
let timestamp1;
let timestamp2;
let restoreIframeBorder;
/* all references here needed to toggle iframe border (wrapper) visibility onresize in theater mode  -  explained at length in the toggleIframeWrapper() function comments below */






function makeScrollBtnInactive() {
  if (buttonVisible === true && hasListeners === true) {
    if (targetRule.style.getPropertyValue("transition") === "") {
      targetRule.style.setProperty("transition", "opacity 0.5s ease 0s");
      setTimeout(() => targetRule.style.removeProperty("transition"), 550);
    }
    scrollToTopBtn.classList.remove("btn-visible");
    scrollToTopBtn.removeEventListener("click", scrollBackUp);
    if (hasFinePointer === true) {
      scrollToTopBtn.removeEventListener("mouseenter", showArrow);
      scrollToTopBtn.removeEventListener("mouseleave", hideArrow);
    }  
    buttonVisible = false;
    hasListeners = false;
  }
}
/* force scroll btn to disappear/become inactive (if currently visible) when "theater mode" invoked  –  function is called in handler that bring us into theater mode */
/* if (targetRule.style.getPropertyValue("transition") === "") {}   -->   this conditional is a fallback to solve an issue that can occur only on mobile.  As explained above in the scroll btn function comments, there is no transition on the scroll button opacity (for mobile viewports) when the button is removed from UI.  This creates two very minor issues.  The first issue being that (if scroll btn currently visible) there no longer is a transition on scroll button opacity when entering theater mode (scroll btn is made invisible when entering theater mode).  The second issue is that on mobile viewports, once you exit theater mode (assuming you entered theater mode from pageYoffset > 400px)  and then re-scroll the document back down past the breakpoint where the scroll btn becomes visible, it becomes visible without a transition for the first time (every other time proceeding that, there will be a transition though, it resets), which we don’t want to happen. To solve the first issue, I added in the conditional above to check if there is a transition prop present or not right before the scroll btn is removed upon entering theater mode, if it’s not there, we add it. Note we remove the transition after it completes even though we actually did not have to do this, but in my mind, it was cleaner to reset it to the previous state rather than keeping it there. Moving on, in order to solve the second issue, after the programmatic scroll of the document occurs upon exiting theater mode, we have a conditional that checks if  pageYoffset < 400px and if so, it appends a transition if one is not present already (note that this conditional is at the very bottom of the exitIcon click handler, not in makeScrollBtnInactive). Technically, the default functionality of the main scroll button function (toggleBtnStates) should have been able to solve this on its own but because of a unique edge case, it was unable to. The edge case here being that since the scroll button was actually removed “synthetically” when entering theater mode (i.e. it was removed by “force”, not by scroll activity that toggles scroll btn visibility when 400px pageYoffset breakpoint is crossed in either direction).  Because it was removed by “force”,  it caused buttonVisible variable to be reassigned to false while in the “button visibility zone”, which in turn through the main scroll btn function (toggleBtnStates) out of sync and prevented it from adding back the transition when the document was scrolled back up to a pageYoffset < 400px...  buttonVisible = false; causes a conditional to evaluate to false instead of true  -  Also, on a  separate note, in the scenario just listed above, even though the document starts at a pageYoffset  > 400px when the programmatic scroll upwards starts to occur (and the button is not visible), this does not trigger button visibility because the setInterval does not run fast enough to detect the document being in the “button visibility zone”  -  keep in mind that this is not an actual issue, I’m just mentioning it to recognize the fact that that I did consider whether or not it would have been an issue and caused a flickering appearance of the button... but it’s not */




function makeScrollBtnActive() {
  if (buttonVisible === false && hasListeners === false) {
    scrollToTopBtn.classList.add("btn-visible");
    scrollToTopBtn.addEventListener("click", scrollBackUp);
    if (hasFinePointer === true) {
      scrollToTopBtn.addEventListener("mouseenter", showArrow);
      scrollToTopBtn.addEventListener("mouseleave", hideArrow);
    } 
    buttonVisible = true;
    hasListeners = true;
  }
}
/* this is actually kind of a fallback for an edge case... when user exits "theater mode" (at most screen sizes), the scroll btn will naturally re-appear because the doc is programmatically scrolled past the 400px pageYOffset breakpoint that were "listening" for in the setInterval() associated with the scroll event... but you have to be careful... if you exit theater mode and then do NOT scroll the doc at all (manually) and then proceed to go right back into theater mode again, if we did not use this fallback makeScrollBtnActive() function above, the scroll btn would NOT re-appear because even though doc is past 400px pageYOffset breakpoint, there has been no scroll event fired and thus nothing in the scroll btn setInterval() runs and thus you get no scroll btn appearing. So what we have to do in an edge case such as this is we have to actually force the btn to re-appear regardless if scroll event fired or not after exiting theater mode  –  but theres another thing you have to be careful with as well now that we're forcing btn to re-appear... on mobile viewports, where the iframe default dimensions (i.e. not in theater mode) start to fluidly scale down, the scaling down of the iframe dimensions actually effects the amount of pixels the doc is programmatically scrolled after exiting theater mode. So in some mobile viewports, the programmatic scroll actually takes you down to a pageYOffset that is less than the 400px or greater breakpoint that causes the scroll btn to appear. So due to this, we don't want to force the scroll btn to appear unconditionally after exiting theater mode, but rather, conditionally. So we wrap makeScrollBtnActive() in a conditional... lastly, note that we delayed execution of makeScrollBtnActive() with setTimeout() because in most other cases after exiting theater mode, scroll btn comes back with ever so slight delay due 250ms delay associated with setInterval(), so we keep it in sync with that (it looks better to have slight delay as well because you see transition on opacity of btn when it re-appears) */



function removeInlineSizing() {
  if (iframeWrapper.style.getPropertyValue("height") != "") {
    iframeWrapper.style.removeProperty("height");
    iframeWrapper.style.removeProperty("width");
    iframeVideo.style.removeProperty("height");
    iframeVideo.style.removeProperty("width");
  }
}
/* Remove the code that makes the iframe responsive in theater mode (upon exiting theater) and revert back to default set up for iframe dimensions (i.e. static dimensions up until 750px breakpoint)  –  sizeIframeTheaterMode() is the function that makes the iframe responsive in theater mode, much more on that below  –  once again, don't let this functions conditional evaluate to true when we don't even have any inline sizing of the iframe in the first place (in theater mode)... so test to make sure there is values present on these aforementioned properties (note: inline CSS width & height is removed/never applied even in theater mode at 750px viewport width and below, media query kicks in) */


window.addEventListener("load", () => iframeWrapper.className += " video-gradient");
/* don't apply gradient "picture frame" like border (i.e. iframe wrapper) to the iframe until the iframe actually has a visual presence in the UI */
/* this prevents the iframe wrapper (i.e. gradient picture frame) from being shown on its own for a split second (or a touch more) before the iframe has a visual presence in the UI and loads  –  goal is to keep them in sync to give the appearance to the user that the iframe has an actual border/frame around it (when in reality it doesn't and there's just an element beneath it) */





window.onresize = () => {
  windowResized = true;
  windowResized2 = true;
  inTheaterMode = fullScreenOverlay.className.includes("fullscreen-overlay");
}
// throttle the resize event 
// two separate handlers for resize event, thats why 2 windowResized var's needed  -  much more on that below
// test if we are in theater mode (when resizing) by checking if particular class has been applied


function sizeIframeTheaterMode() { 
  if (windowResized && inTheaterMode) {
    windowResized = false;
    visViewportHeight = visualViewport.height;
    visViewportWidth = visualViewport.width;
    vwBelow750 = window.matchMedia("screen and (max-width: 750px)").matches;
    if (visViewportWidth > 750) {
      viewportAspectRatio = visViewportWidth / visViewportHeight;
      viewportToIframeRatio = viewportAspectRatio / iframeAspectRatio;
      iframeWrapperHeightCalc = (visViewportHeight - 130) * viewportToIframeRatio;
      iframeWrapperWidthCalc = iframeWrapperHeightCalc * 1.75;
      if (viewportToIframeRatio > 1) {
        iframeWrapperHeightCalc = visViewportHeight - 130;
        iframeWrapperWidthCalc = iframeWrapperHeightCalc * 1.75;
        iframeWrapper.style.height =  `${iframeWrapperHeightCalc}px`;
        iframeWrapper.style.width = `${iframeWrapperWidthCalc}px`;
        iframeVideo.style.height = `${iframeWrapperHeightCalc - 10}px`;
        iframeVideo.style.width = `${iframeWrapperWidthCalc - 10}px`;
      }
      if (iframeWrapperWidthCalc <= 700 && viewportToIframeRatio < 1) {
        iframeWrapper.style.width =  "700px";
        iframeWrapper.style.height = "400px";
        iframeVideo.style.width = "690px";
        iframeVideo.style.height = "390px";
      }
      if (iframeWrapperWidthCalc > 700) {
        iframeWrapper.style.height =  `${iframeWrapperHeightCalc}px`;
        iframeWrapper.style.width = `${iframeWrapperWidthCalc}px`;
        iframeVideo.style.height = `${iframeWrapperHeightCalc - 10}px`;
        iframeVideo.style.width = `${iframeWrapperWidthCalc - 10}px`;
      }
    } else if (vwBelow750 === true) {
      if (iframeWrapper.style.getPropertyValue("height") != "") {
        iframeWrapper.style.removeProperty("height");
        iframeWrapper.style.removeProperty("width");
        iframeVideo.style.removeProperty("height");
        iframeVideo.style.removeProperty("width");
      }  
    }
  }  
}
/* Full explanation: */
/* Main goal of function:   -->   In "theater mode" of the iframe, provide the largest 1.75 aspect ratio iframe that the current viewport dimensions can support (comfortably)  –  "comfortably" = always maintain 65px between viewport edges and the iframe on all 4 sides of iframe.... in other words, provide the biggest iframe that current viewport can support WHILE always maintaining a 1.75 aspect ratio for the iframe itself */


/* EXPLANATION, PART ONE: MAIN LOGIC   -->   if (visViewportWidth > 750) {}  –  first 4 lines of the body of this conditional */
/* NOTE: keep in mind that when I say “iframe height” (or width), I’m actually talking about the iframe wrapper height in reality, it’s just easier to refer to it as just “iframe height” though */
/*  in order to calculate the largest 1.75 aspect ratio iframe that the current viewport dimensions can support comfortably, we need to compare the current viewport aspect ratio to the desired iframe aspect ratio to calculate the difference between the two. Once we know the difference, we can then calculate the height of the iframe (which will then give us the width) */
/* to start off, if we take an example where the viewport aspect ratio happened to be completely identical to the desired iframe aspect ratio (both 1.75 to 1)... we would size the iframe height to the absolute max, which would be 130 pixels smaller than the viewport height (i.e. to maintain safe/comfortable distance between viewport edges and the iframe) knowing that and we would be able to multiply that computed iframe height by 1.75 to calculate the iframe width and the iframe width would not overflow the viewport (or be positioned uncomfortably close to viewport edges) because the aspect ratios are exactly the same between iframe and viewport */
/*  in terms of the equation to calculate iframe height, we always start with a base component of:    -->    visViewportHeight - 130   -->    knowing that this component of the equation would equate to the absolute maximum height that there could ever be for the iframe (at all screen sizes) */
/*  but if the viewport aspect ratio and the iframe aspect ratio are different, we must know that difference in order to calculate the proper iframe height */
/* so what you need to actually do is take the maximum height the iframe could ever be (visViewportHeight - 130) and then scale it down based on however much smaller the viewport aspect ratio is compared to the desired iframe aspect ratio */
/*   so if the current viewport aspect ratio is 85% or 0.85 of the desired iframe aspect ratio (e.g. 1.5 to 1 versus 1.75 to 1), the iframe height needs to be scaled down to the point where it would be 85% or 0.85 of the maximum height */
/*  so the JS height formula above  would interpolate like this for this specific example:    -->    iframeWrapperHeightCalc = (visViewportHeight - 130) * 0.85; */
/* continuing on with the example above, if the number 1.5 is 85% of 1.75, we then need to know what 85% of 1 is because these are aspect ratios where we are comparing against the number 1 */
/*  another way to look at the formula is this:   -->    viewport AR / ? = iframe AR   */
/*  if we substitute in the corresponding numbers into the above equation we get:   -->   1.5 / ? = 1.75 */
/* We find out the divisor by calculating the difference between viewport aspect ratio and desired iframe aspect ratio:    1.5 / 1.75 = ~ 0.85    -->    1.5 / 0.85 = ~ 1.75 */
/*  note that the numbers are rounded/approximated here for exemplary purposes (which is why we used the tilde) */
/*  now that we have the iframe height, just multiply the height by 1.75 in order to calculate the width for the iframe */


/* EXPLANATION, PART 2: FALLBACK LOGIC    -->   if (viewportToIframeRatio > 1) {} */
/* whenever the viewport aspect ratio compared against the desired iframe aspect ratio (1.75) is greater than 1, we need to adjust the formula that calculates iframe dimensions to account for that, otherwise iframe will be too large for the current viewport, because you would be multiplying computed value of  visViewportHeight - 130  by number greater than and thus no longer maintaining comfortable distance between viewport edge or potentially causing overflow */
/*  iframeWrapperHeightCalc = visViewportHeight - 130;    -->    the formula that calculates the iframe height is adjusted so that it always maintains the absolute maximum height that the viewport height can support, because we know that whenever:  viewportToIframeRatio > 1   –   the viewport width will always be able to support a iframe width that is 1.75 times greater than the iframe height */


/* EXPLANATION, PART 3: FALLBACK LOGIC CONTINUED    -->   if (iframeWrapperWidthCalc <= 700 && viewportToIframeRatio < 1) {} */
/* first test condition:    iframeWrapperWidthCalc <= 700   -->   the additional fallback here is needed due to the fact that (in a very small range of viewports widths), the iframe will actually become smaller in theater mode compared to its default dimensions when its outside of theater mode. So when this happens, we step in and apply the same static dimensions that the iframe has by default for theater mode so that iframe does not scale down in size when transitioning from default mode to theater mode */
/* second test condition:   viewportToIframeRatio < 1    -->    but theres an additional component that I factored into the overall logic for this... the idea is, yes, we would prefer for iframe to not scale down when entering theater mode (only increase in size or stay the same), but the thing is at certain viewports this is not possible (that is, if we don't want iframe to overflow viewport). So we have to include an additional test condition to check the aspect ratio of the viewport, because if viewport aspect ratio is significantly greater then the desired iframe ratio, we cannot implement those static dimensions and need to let it continue to scale down to ensure it fits comfortably in the current viewport */
/* Note: keep in mind that I know these particular screen sizes I refer to in the comment directly above from here don't really exist (e.g. 1900 x 500). Devices with similar types of viewport heights would either invoke the media query that takes full control of iframe dimensions in theater mode below 750px viewport width (sizeIframeTheaterMode() mostly ignored) OR even if the device renders the document at a viewport width a little bit greater than 750px (MQ not invoked), that device would be a tablet and the viewport aspect ratio of that device is much smaller than the desired iframe aspect ratio which would cause at different JS formula to size the iframe instead. In other words, the problem I am solving here with this  additional fallback would not be present on a tablet size screen... I knew that this portion of the sizeIframeTheaterMode() wasn't very practical, but as I stated at the beginning, it was good practice to write it, and it's good to have attention to detail. Not everything in this project was meant to be practical because its not actual production code */


/* EXPLANATION, PART 4:    -->    if (vwBelow750 === true) {} */
/* let the:   screen and (max-width: 750px) {}    media query run and take full control of the iframe’s dimensions in theater mode (this MQ also handles iframe responsiveness in “default mode”) */






function toggleIframeWrapper() {
  if (windowResized2 && inTheaterMode) {
    windowResized2 = false;
    timestamp2 = performance.now();
    if (timestamp2 - timestamp1 < 400) {clearTimeout(restoreIframeBorder);}
    if (resizeCounter === 0) {
      width1 = visualViewport.width;
      height1 = visualViewport.height;
      lockedIn2ndDimensions = false;
    }
    if (resizeCounter === 1) {
      width2 = visualViewport.width;
      height2 = visualViewport.height;
      lockedIn2ndDimensions = true;
      resizeCounter--;
    }
    if (resizeCounter === 0 && !lockedIn2ndDimensions) {resizeCounter++;}
    if (lockedIn2ndDimensions) {
      if ((width1 < width2 || height1 < height2) && (!iframeWrapper.getAttribute("style").includes("hidden"))) {
        iframeWrapper.style.visibility = "hidden";
        iframeVideo.style.visibility = "visible";
        iframeBorderRemoved = true;
      }
    }  
    if (iframeBorderRemoved) {
      timestamp1 = performance.now();
      restoreIframeBorder = setTimeout(() => {
        iframeWrapper.style.visibility = "initial";
        iframeBorderRemoved = false;
      }, 400);
    }
  }   
}
/* Full explanation   -->   */
/* Overview: function to toggle visibility of iframe border onresize while in theater mode, this is the callback to the ctrlBorderVisibility setInterval() */
/* main goal and reason for the function: remove iframe border when resizing the width OR height of the window to a greater length.... the reason I needed to do this was in desktop chrome, edge, and opera, when resizing the window upwards (but not downwards), the iframe itself and the iframe wrapper are not in sync with each other when the dimensions of each of those two elements are increasing, creating a poor looking effect. If we remove the iframe border whenever the iframe dimensions increase (and then restore immediately upon resize stopping), we can avoid this issue */
/* windowResized2     -->     a second variable that detects a resize event is needed since the resize event is being throttled by two separate setIntervals that listen for resize events... If we only had one variable detecting resize events, the setInterval() that runs first will reassign windowResized variable to false and thus not allowing the proceeding (separate) setInterval() to run because the conditional that “listens” for resize events at the very top of the callbacks function body will evaluate to false  -  so if we have 2 separate variables, we will always be able to accurately detect if resize events have occurred, regardless if a resize event has already been handled by the other setInterval() */
/* since we need a way to detect if the width or height is increasing onresize, we need to compare the current dimensions of the viewport from one resize event to the next. (i.e. compare viewport dimensions every other time resize event is handled)  -  so we log the first set of viewport dimensions on the first resize event, and then log the second set of viewport dimensions on the second resize event... in order to do this properly, we need variables defined with booleans to detect when the second set of viewport dimensions has been locked in and a counter variable  that increments upwards and downwards at the proper times */
/* if (width1 < width2 || height1 < height2)   –->   once the second set of viewport dimensions has been locked in, we compare them against each other and if the second set of dimensions is ever greater than the first set (width or height), we remove iframe border (i.e. iframe wrapper) and denote as so by reassigning iframeBorderRemoved to true */
/* iframeVideo.style.visibility = "visible";   –->    the actual iframe itself will inherit the visibility property value of its parent, so we need to explicitly set it back to its initial value in order to keep the actual iframe itself visible while the user is resizing the window in theater mode */
/* !iframeWrapper.getAttribute("style").includes("hidden")    –->    Also note that we don’t unnecessarily keep adding  visibility: hidden;  to the iframe wrapper if it already contains this declaration.... So we test for the presence of the value in the style attribute. And you have to be careful because you can’t test just simply for the presence of a visibility property with any value in the elements inline styles, you actually need to test for the string “hidden” itself because it’s going to be toggled back and forth between visibility: initial  and  visibility: hidden;  after the first restoration of the iframe border */
/* if (iframeBorderRemoved)    –->    once we get the signal that the iframes border has been removed, we need code for its restoration to immediately follow it  -  so we set a timer that restores the iframe border but only if at least 400ms have elapsed since the previous resize event handler stopped running, otherwise we clearTimeout() and iframe border remains invisible  -  In reality, the only time this is going to evaluate to true is when the user actually stops resizing the window, because when they are resizing, the events are firing and being handled by the setInterval far too quickly.. So technically, we didn’t truly need the performance.now() timestamps here, we could’ve just tested for iframeBorderRemoved at the top of the function and then used clearTimeout() inside the conditional body, but felt like a best practice to compare the timestamps anyway */
/* ctrlBorderVisibility = setInterval(toggleIframeWrapper, 75);    –->   note that we had to decrease the delays between callback executions because it waited longer, user would see that out of sync affect I mentioned previously between the iframe wrapper in the iframe itself when resizing, so it’s imperative to execute callbacks a little bit faster then we did for the other setInterval() that listens for resize events  -  but on the other hand, didn’t want it to run too quick because then were not really throttling the event anymore... Also on a side note, note that we start the setInterval() upon entering theater mode and clear it upon exiting theater mode so that it’s not running when it’s no longer needed */
/* The setInterval() is only running while in theater mode. That being said, the issue this function solves can also occur below 750px width viewports in default mode, but if the document is being viewed on that type of device, the user is on mobile and thus they can’t resize the screen unless they go into to landscape orientation... the issue did not seem to persist when transitioning into landscape orientation when I tested it on mobile.... Also the 2 YouTube play button structure that I have on the iframe can also get out of sync when resizing the window on viewport widths < 750  -  once again not really an issue for the same aforementioned reasons  */







iframeOverlay.addEventListener("click", () => {
  iframeWrapperWidthNoTheater = iframeWrapper.offsetWidth;
  visualViewport.height = visualViewport.height;
  iframeVertOffset = iframeWrapper.offsetTop;
  iframeHeight = iframeWrapper.offsetHeight;
  spaceToDistribute = visViewportHeight - iframeHeight;
  checkViewportStats = setInterval(sizeIframeTheaterMode, 125);
  ctrlBorderVisibility = setInterval(toggleIframeWrapper, 75);
  closingMessage.style.display = "none";
  deletedOverlay = iframeWrapper.removeChild(iframeOverlay);
  deletedPlayBtnBackground = iframeWrapper.removeChild(playBtnBackground);
  deletedPlayBtnIcon = iframeWrapper.removeChild(playBtnIcon);
  iframeWrapper.style.transition = "width 0.75s, height 0.75s";
  iframeVideo.style.transition = "width 0.75s, height 0.75s";
  fullScreenOverlay.classList.add("fullscreen-overlay");
  iframeWrapper.classList.add("iframe-wrapper-fixed");
  iframeVideo.classList.add("iframe-video-fixed");
  windowResized = true;
  inTheaterMode = true;
  sizeIframeTheaterMode();
  windowResized = false;
  inTheaterMode = false;
  iframeWrapperWidthTheater = iframeWrapper.style.width.includes("700"); 
  if ((iframeWrapperWidthTheater) || (iframeWrapperWidthNoTheater < 700)) {
    iframeWrapper.style.transition = "initial";
    iframeVideo.style.transition = "initial";
  } else {
    setTimeout(() => iframeWrapper.style.visibility = "initial", 800);
    iframeWrapper.style.visibility = "hidden";
    iframeVideo.style.visibility = "visible";
  }
  exitIcon.classList.add("material-icons", "exit-icon");
  exitIcon.id = "x-icon-font-size";
  exitIcon.textContent = "disabled_by_default";
  iframeWrapper.appendChild(exitIcon);
  makeScrollBtnInactive();
  clearInterval(checkPageOffset);
});
/* Full explanation  -->  */ 
/* Overview: click handler that invokes theater mode */
/* lines 2 - 5   -->  needed to programmatically scroll the document upon exiting theater mode, we test for these values in the handler for exiting theater mode below  –  Note that we have to query these values upon entering theater mode, not store references for them upon page load, because if the user resizes the window before entering theater mode, the amount it would be programmatically scrolled would be out of sync because it doesn’t reflect the current values of some of those variables  -  explained in detail in the exitIcon handler comments below */
/* checkViewportStats = setInterval(sizeIframeTheaterMode, 125);   -->    although the resize event is being throttled, setInterval() here is still running very quickly because I need it to in order to have it respond quick enough to resize events  –  if user resizes window somewhat quickly, the iframe dimensions won’t respond quick enough to the viewport changes if we had a higher timeout between executions of the callback */
/* if ((iframeWrapperWidthTheater) || (iframeWrapperWidthNoTheater < 700))   -->    we add a transition to width and height upon entering theater mode and then remove them on transitionend, same exact thing goes for when exiting theater mode, add and then remove transition (handlers for these at the bottom of the file). Reason for this is we don’t want transitions on iframe dimensions when resizing the window... problem is at viewport widths ~ 800px and under, the size of the iframe in “default mode” and theater mode is equivalent and thus there is no transition for the width or height upon entering or exiting theater mode... This means that transitionend event does NOT fire and thus, were not able to remove the transition on the iframe width and height via the transitionend event... this conditional here is our fallback for that scenario. It determines if the iframe dimensions in default mode will be the exact same thing in theater mode. It’s important to note that there’s two separate ways that the iframe could have the exact same dimensions in default mode versus theater mode, so we must have two separate test conditions in order to properly detect in all scenarios if the iframes dimensions will be the same in both modes  -  the first way the iframe could have the same dimensions is via inline styles applied dynamically via JS, second way is via media query styles. We need to test for the presence of the same dimensions in those two separate ways because offsetWidth prop does not reflect the up-to-date current value if there is a transition on the width, the transition must complete before it’s able to reflect the edited dimensions when they are queried... in this case, we can’t afford to wait for transitionend, we need to know what the iframe’s final dimensions are in theater mode immediately right after the new dimensions are applied (i.e. as soon as sizeIframeTheaterMode runs).  So instead of using offsetWidth, I test for the presence of a certain value in the inline width property that immediately indicates that, in theater mode, the iframe’s dimensions are going to be the exact same as they were in default mode, and thus no transition is going to occur (and thus we need to remove the transition that was added earlier on in the handler). For the other test condition that we have here that queries offsetWidth, for this test condition, we actually can use and rely on offsetWidth to give us an accurate reading of what the iframes width in theater mode will be because if the iframes width is below 700px in default mode, we know with 100% certainty that the iframe will have the exact same dimensions in theater mode as well because-dimensions below 700 indicate that a particular media query has kicked in which always applies the same dimensions for the iframe in both modes.  So we remove transition if this is the case as well... Also on a side note, it’s important to query offsetWidth for default mode dimensions upon entering theater mode versus on page load, the former will always give the up-to-date accurate dimensions where as page load reference may store an incorrect value (i.e. if user resizes window before entering theater mode)  */
/* else {} block for conditional mention in the comments above:    -->     this else block here is actually unrelated to the code that is applied when the conditional evaluates to true, but still completely necessary  -  Just like how the iframe wrapper in iframe itself are out of sync when they are resized upwards and we had to remove the iframe border, we need to do the same thing when entering theater mode whenever the iframe scales up from the default dimensions to theater mode dimensions, if there’s any increase in size we need to remove the iframe border, but when there’s zero increase in size, it’s unnecessary to remove the iframe border because nothing is “out of sync” if the iframe dimensions stay the same... So when the conditional in the code comment directly above from this one evaluates to true, we don’t need to remove the iframe border when entering theater mode, but if it evaluates to false we do indeed need to remove it because that indicates that there will be a scale up of the iframe dimensions when comparing default mode to theater mode... Also, setTimeout() there to restore the iframe border at the at the proper time */
/* windowResized = true;   sizeIframeTheaterMode();   -->    gain access to the iframe responsiveness in theater mode provided by this function WITHOUT resizing the window... “Synthetically” reassign windowResized & inTheaterMode to true even though the resize event did not fire... then immediately re-assign them again back to initial values to restore default setup   –   I realize I could’ve created a whole new function with all the same contents as sizeIframeTheaterMode() and simply given it a different identifier but felt a little repetitive and wanted to conserve space in the file */
/* clearInterval(checkPageOffset);   -->    stop listening for scroll events/checking pageYoffset for the scroll button if we’ve entered theater mode, user does not need scroll button in theater mode... invoking makeScrollBtnInactive() makes the button invisible upon entering theater mode but it does nothing to prevent it from coming back if you stay in theater mode and start scrolling   –   we need to clearInterval() */






exitIcon.addEventListener("click", () => {
  checkPageOffset = setInterval(toggleBtnStates, 250);
  clearInterval(ctrlBorderVisibility);
  clearInterval(checkViewportStats);
  iframeWrapper.style.transition = "width 0.75s, height 0.75s";
  iframeVideo.style.transition = "width 0.75s, height 0.75s";
  iframeWrapperWidthTheater = iframeWrapper.style.width.includes("700");
  iframeWrapperWidthTheater2 = iframeWrapper.offsetWidth;
  if ((iframeWrapperWidthTheater) || (iframeWrapperWidthTheater2 < 700)) {
    iframeWrapper.style.transition = "initial";
    iframeVideo.style.transition = "initial";
  }
  removeInlineSizing();
  closingMessage.style.display = "block";
  fullScreenOverlay.classList.add("apply-transition-linear");
  fullScreenOverlay.style.backgroundColor = "initial";
  setTimeout(() => {
    fullScreenOverlay.classList.remove("fullscreen-overlay");
    fullScreenOverlay.classList.remove("apply-transition-linear");
    fullScreenOverlay.removeAttribute("style");
    if (navigator.vendor != "Apple Computer, Inc.") {iframeWrapper.style.visibility = "initial";}
  }, 800);
  iframeWrapper.classList.remove("iframe-wrapper-fixed");
  iframeVideo.classList.remove("iframe-video-fixed");
  iframeWrapper.append(deletedOverlay);
  iframeWrapper.append(deletedPlayBtnBackground);
  iframeWrapper.append(deletedPlayBtnIcon);
  if (navigator.vendor != "Apple Computer, Inc.") {
    iframeWrapper.style.visibility = "hidden";
    iframeVideo.style.visibility = "visible";
  }
  iframeVideo.src = iframeVideo.src;
  exitIcon.remove();
  if (visualViewport.height != undefined) {
    window.scrollTo(0, iframeVertOffset - (spaceToDistribute / 2));
  }
  if (window.pageYOffset >= 400) {
    setTimeout(makeScrollBtnActive, 150);
  } else if (targetRule.style.getPropertyValue("transition") === "") {
    targetRule.style.setProperty("transition", "opacity 0.5s ease 0s");  
  }
});
/* Full explanation:  -->  */
/* Overview: click handler for exiting theater mode */
/* clearInterval(checkViewportStats);   -->   were exiting out of theater mode... stop listening for resize events that are handled by applying responsive dimensions to the iframe */
/*  if ((iframeWrapperWidthTheater) || (iframeWrapperWidthTheater2 < 700))   -->     user may have resized the window after entering theater mode, so we re-query the necessary values before the conditional... We actually use a different variable in this conditional (for the second test condition) because it didn’t make sense to use iframeWidthNoTheater for an identifier, because right before you exit  theater mode, by definition, you’re in your still in theater mode, but just like in the previous handler, we need a way to detect the two separate ways mentioned previously when the dimensions of the iframe will be exactly the same in both modes */
/* removeInlineSizing();    -->    remove any inline CSS width and height props applied to the iframe (via sizeIframeTheaterMode) when exiting theater mode in order to to revert back to the default set up for iframe dimensions... but don’t do it unnecessarily, check if there’s any inline width or height on iframe (because won’t be anything there if the users exiting theater mode from a viewport width below 750px)   -   Also, have to be careful, you must remove inline width and height applied via sizeIframeTheaterMode() AFTER checking if the inline width includes(“700”), otherwise we wouldn’t always be able to detect if the iframe dimensions in both modes are the same because the inline styles would have been removed before querying them (i.e. would only be able to detect same iframe dimensions in both modes when the media query styles takeover at  < 750px viewport width, but not when the dimensions are specified via inline CSS) */
/* classList.add("apply-transition-linear");   -->    linear timing function for the transition of the background color of the full screen overlay back to the default appears smoother to the eye and more in sync with the background color transition to the dark color when user enters theater mode */
/* first setTimeout(), removes classes   -->   we have to wait until the end of the transition of the background color to the default white color upon exiting theater mode, to remove fullscreen overlay class because that class has styles applied to the full screen overlay element that are needed to complete the transition properly (e.g. top and left offset props)  –  so instead we simply change the background color of the full screen overlay element with an inline style as substitute... remove transition that applies linear timing function so that the ease timing function is restored when user re-enters theater mode again... must also clear for the style attribute for the full screen overlay element once background color is finished transitioning because it has higher specificity than CSS class and the when the CSS classes applied the next time, the background-color declaration in that rule will have no effect, and we don’t want that */
/* if (navigator.vendor != "Apple Computer, Inc.") {}   -->   we test for this condition 2 separate times,  most of this explanation will be for the second time we test for it (i.e. the one with 2 lines of code in the conditional body, not 1 line like the other one)  -  in desktop chrome, edge, and opera, there was a slight issue/inconsistency when exiting theater mode compared to Firefox and Safari.  What happened was when the iframe src was refreshed, for a split second,  the iframe would have no visual presence in the UI, it actually would be invisible and thus it exposed the iframe wrapper sitting beneath it,  so you would get a flash of the of the iframe wrapper for a split second,  which I did not ever intend for the user to see. In order to solve this issue,  I needed to remove the iframe wrapper upon exiting theater mode as well and then restore after the transition on the iframe dimensions has completed.   There’s a couple things to mention though   -   since the issue was only present in 3 out of the 5 main desktop browsers, it actually would’ve been ideal to only remove the iframe border upon exiting theater mode in the offending browsers, but since it’s not a good practice to do “user agent sniffing”  and I don’t think there was any other way to identify the offending browsers because it was a very specific and particular issue), I was unable to only conditionally remove it when I originally intended to.  Then after doing some browser testing, a separate issue arised upon exiting theater mode in Safari. It was related to how it treated the visibility property on the iframe wrapper. Bottom line is for some very strange reason, using  visibility: visible; on the iframe itself was not overriding  it’s parents visibility value of hidden when exiting theater mode in Safari. This honestly felt like a browser bug because using visibility: visible; on the iframe itself  absolutely did override the parent visibility value when entering theater mode and when resizing the window in theater mode... Bottom line is I would’ve had to conjure up a significantly different structure for one very minor browser inconsistency so I decided to use the navigator object to test for browser vendor nonetheless... so the iframe border never gets removed upon exiting theater mode in Safari, and as I said earlier, because Safari was NOT one of the offending browsers where the iframe became invisible for a split second upon the iframe source being refreshed, it was perfectly fine to keep the iframe border there the whole time upon exiting theater mode anyway... Lastly, the other time the navigator object is tested for in a conditional (inside the setTimeout) is just simply to be more efficient and prevent adding the default value of visibility when it already has it */
/* iframeVideo.src = iframeVideo.src;   -->    since we are disallowed from using event listeners on the iframe due to the external resource linked, we have to use a workaround in order to control the experience for the user. The idea was if the video was playing in theater mode and then they exited out and the video was then still playing in default mode, it’s a bit of a hassle/nuisance to not be able to just click the video right then and there to pause it. You would have to actually enter theater mode again just to pause it. This is not good for UX. Consequently, we make sure that the video will always be paused by refreshing the src attribute of the iframe... I realize that this is not necessarily an ideal solution because the user does not want the video to start over from the beginning after exiting theater mode, they probably would rather the video just kept its current position and pick up where they left off in terms of the timestamp. And the same thing goes if the video is already paused in theater mode, still not ideal to have video start from the beginning. That being said, I think this was the only solution we could use for this instance... in a real production project,  I would’ve used the YouTube API to have greater control/functionality but it was good practice once again to try and provide the best video experience possible given the constraints and limitations of the scenario */
/* window.scrollTo()    -->    when the user exits theater mode, programmatically scroll the document so that the video is always perfectly centered within the visual viewport height... We first need to see how much the iframe is offset from the top of the document. Then from there,  query the amount of “leftover/empty space” between the iframe vertical edge and the edge of the visual viewport height. In order to get the iframe-centered within the visual viewport height we need the same amount of space on both sides of the iframe obviously, so we divide the computed value of that “leftover space” calculation by 2... Once again, it’s important to query all the values needed for the programmatic scroll “in the moment” (i.e. when user first enters theater mode, not on page load) so that all references accurately reflect the values that are present for those properties when the user enters theater mode */




iframeVideo.addEventListener("transitionend", () => {
  if (iframeVideo.getAttribute("class") === "iframe-dimensions iframe-video-fixed") {
    iframeWrapper.style.transition = "initial";
    iframeVideo.style.transition = "initial";
  }
});

iframeVideo.addEventListener("transitionend", () => {
  if (iframeVideo.getAttribute("class") === "iframe-dimensions") {
    iframeWrapper.style.transition = "initial";
    iframeVideo.style.transition = "initial";
  }
});









  




































