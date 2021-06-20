/*
*   MultiSlider | MIT License
*
*   Copyright (c) 2017 Trevor Blackman
*   http://www.multislider.info
*
*/

(function ($) {
  // ==== BEGINS PLUGGIN ====
  $.fn.multislider = function (data, callback) {
    // ==== CACHE DOM ====
    const $multislider = $(this);
    const $msContent = $multislider.find('.MS-content');
    const $msRight = $multislider.find('button.MS-right');
    const $msLeft = $multislider.find('button.MS-left');
    let $imgFirst = $msContent.find('.item:first');

    // === DETERMINE ACTION ====
    // string = method | object or nothing is to initialize
    if (typeof data === 'string') {
      getStringArgs(data);
      return $multislider;
    } if (typeof data === 'object' || typeof data === 'undefined') {
      init();
    }

    // ==== PLUGGIN VARIABLES ====
    let $imgLast;
    let totalWidth;
    let numberVisibleSlides;
    let animateDistance;
    let animateSlideRight;
    let animateSlideLeft;
    let defaults;
    let settings;
    let animateDuration;
    let autoSlideInterval;

    // = INITIALIZE =
    function init() {
      minifyContent(); // minify html
      createSettings(); // merge defaults and user provided options
      saveData(); // add data object to DOM el with reference to animation functions, allows for methods to reference at any time
      selectAnimations(); // choose default animation
    }

    // ==== EVENT HANDLERS ====
    $msRight.on('click', animateSlideLeft);
    $msLeft.on('click', animateSlideRight);
    $multislider.on('click', '.MS-right, .MS-left', resetInterval);
    $(window).on('resize', findItemWidth);

    // ==== FUNCTIONS (for days...) ====
    // =================================

    function pauseAbove() {
      if (window.innerWidth > settings.pauseAbove) { $multislider.addClass('ms-PAUSE'); }
      $(window).on('resize', () => {
        if (window.innerWidth > settings.pauseAbove) {
          $multislider.addClass('ms-PAUSE');
        } else {
          $multislider.removeClass('ms-PAUSE');
        }
      });
    }

    function pauseBelow() {
      if (window.innerWidth < settings.pauseBelow) { $multislider.addClass('ms-PAUSE'); }
      $(window).on('resize', () => {
        if (window.innerWidth < settings.pauseBelow) {
          $multislider.addClass('ms-PAUSE');
        } else {
          $multislider.removeClass('ms-PAUSE');
        }
      });
    }

    // used if method is called after initialization
    function getStringArgs(str) {
      if (typeof $multislider.data(str) !== 'undefined') {
        $multislider.data(str)();
      } else {
        console.error('Multislider currently only accepts the following methods: next, prev, pause, play');
      }
    }

    // saves data object to DOM element
    function saveData() {
      $multislider.data({
        pause() { $multislider.addClass('ms-PAUSE'); },
        unPause() { $multislider.removeClass('ms-PAUSE'); },
        continuous() { $multislider.removeClass('ms-PAUSE'); continuousLeft(); },
        next() { overRidePause(singleLeft); },
        nextAll() { overRidePause(allLeft); },
        prev() { overRidePause(singleRight); },
        prevAll() { overRidePause(allRight); },
        settings,
      });
    }

    // used when calling 'next', 'prev' methods
    function overRidePause(animation) {
      if ($multislider.hasClass('ms-PAUSE')) {
        $multislider.removeClass('ms-PAUSE');
        animation();
        $multislider.addClass('ms-PAUSE');
      } else {
        animation();
      }
      resetInterval();
    }

    // CRITICAL for items to be perfectly side-by-side without floating them
    function minifyContent() {
      $msContent.contents().filter(function () {
        return (this.nodeType == 3 && !/\S/.test(this.nodeValue));
      }).remove();
    }

    // updated options with defaults, measure slide widths for animation calculations, carry out setting implementations
    function createSettings() {
      defaults = settings || {
    			continuous: false,	// endless scrolling with no pauses
    			slideAll: false,	// slide all visible slides, or just one at a time
    			// autoSlide: true,	// DEPRECATED
    			interval: 2000,		// time bewteen slide animation, 0 or 'false' prevents auto-sliding
    			duration: 500, // duration of slide animation
    			hoverPause: true,	// pause slideshow on hover
        pauseAbove: null, // pause above specified screen width
        pauseBelow: null, // pause below specified screen width
    		};

    		settings = $.extend({}, defaults, data);

      findItemWidth();
      animateDuration = settings.duration;

      if (settings.hoverPause) { pauseHover(); }
      // autoSlide is being depricated | Feb 2 2017
      if (settings.continuous !== true && settings.interval !== 0 && settings.interval !== false && settings.autoSlide !== false) { autoSlide(); }
      if (settings.pauseAbove !== null && typeof settings.pauseAbove === 'number') { pauseAbove(); }
      if (settings.pauseBelow !== null && typeof settings.pauseBelow === 'number') { pauseBelow(); }
    }

    // determine between single and multi-slide animations
    function selectAnimations() {
      if (settings.continuous) {
        settings.autoSlide = false;
        continuousLeft();
      } else if (settings.slideAll) {
        animateSlideRight = $multislider.data('prevAll');
        animateSlideLeft = $multislider.data('nextAll');
      } else {
        animateSlideRight = $multislider.data('prev');
        animateSlideLeft = $multislider.data('next');
      }
    }

    // measure slide width, for animation calculations
    function findItemWidth() {
      reTargetSlides();
      animateDistance = $imgFirst.width();
      const left = parseInt($msContent.find('.item:first').css('padding-left'));
      const right = parseInt($msContent.find('.item:first').css('padding-right'));
      if (left !== 0) { animateDistance += left; }
      if (right !== 0) { animateDistance += right; }
    }

    // recursive auto-slide loop
    function autoSlide() {
      autoSlideInterval = setInterval(() => {
        if (!$multislider.hasClass('ms-PAUSE')) {
          animateSlideLeft();
        }
      }, settings.interval);
    }

    function resetInterval() {
      if (settings.interval !== 0 && settings.interval !== false && settings.continuous !== true) {
        clearInterval(autoSlideInterval);
        autoSlide();
      }
    }

    // target first and last visible slides before each new animation
    function reTargetSlides() {
      $imgFirst = $msContent.find('.item:first');
      $imgLast = $msContent.find('.item:last');
    }

    // prevent animation firing if multislider is currently animating
    // all animations pass through this function, which emits events, and adds/removes animating class
    function isItAnimating(callback) {
      if (!$multislider.hasClass('ms-animating')
               && !$multislider.hasClass('ms-HOVER')
               && !$multislider.hasClass('ms-PAUSE')) {
        $multislider.trigger('ms.before.animate'); // event!
        $multislider.addClass('ms-animating');
        callback(); // callback is animation
      }
    }

    // update multislider at the end of each animation
    function doneAnimating() {
      if ($multislider.hasClass('ms-animating')) {
        $multislider.removeClass('ms-animating');
        $multislider.trigger('ms.after.animate'); // event!
      }
    }

    // logic for pausing and restarting the multislider on hover
    function pauseHover() {
      // continuous scroll pause slightly different
      if (settings.continuous) {
        $msContent.on('mouseover', () => {
          doneAnimating();
          $msContent.children('.item:first').stop();
        });
        $msContent.on('mouseout', () => {
          continuousLeft();
        });
      } else {
        // regular animation pausing
        $msContent.on('mouseover', () => {
          $multislider.addClass('ms-HOVER');
        });
        $msContent.on('mouseout', () => {
          $multislider.removeClass('ms-HOVER');
        });
      }
    }

    // calculate remaining animation, if stopped mid-animation and resuming
    function midAnimateResume() {
      animateDuration = settings.duration;
      const currentMargin = parseFloat($msContent.find('.item:first').css('margin-left'));
      const percentageRemaining = 1 - (currentMargin / -(animateDistance - 1));
      animateDuration = percentageRemaining * animateDuration;
    }

    // determine how many slides need to be moved over, if slideAll is true
    function calcNumSlidesToMove() {
      totalWidth = $msContent.width(); // total width of .MS-content containing all visible slides
		    numberVisibleSlides = Math.floor(totalWidth / animateDistance); // number of (visible) slides needed to be moved in each animation
    }

    // ==== ANIMATION FUNCTIONS ====
    // =============================
    function continuousLeft() {
      isItAnimating(() => {
        reTargetSlides();
        midAnimateResume();
        $imgFirst.animate(
          { marginLeft: -(animateDistance + 1) },
          {
            duration: animateDuration,
            easing: 'linear',
            complete() {
              $imgFirst.insertAfter($imgLast).removeAttr('style');
              doneAnimating();
              continuousLeft();
            },
          },
        );
      });
    }

    function allLeft() {
      isItAnimating(() => {
        reTargetSlides();
        calcNumSlidesToMove();

        const $clonedItemSet = $msContent.children('.item').clone();
        const filteredClones = $clonedItemSet.splice(0, numberVisibleSlides);

        $msContent.append(filteredClones);

        $imgFirst.animate(
          { marginLeft: -totalWidth }, {
            duration: animateDuration,
            easing: 'swing',
            complete() {
              $($msContent.children('.item').splice(0, numberVisibleSlides)).remove();
              doneAnimating();
            },
          },
        );
      });
    }

    function allRight() {
      isItAnimating(() => {
        reTargetSlides();
        calcNumSlidesToMove();

        let numberTotalSlides = $msContent.children('.item').length;
        const $clonedItemSet = $msContent.children('.item').clone();
        const filteredClones = $clonedItemSet.splice(numberTotalSlides - numberVisibleSlides, numberTotalSlides);

        $($(filteredClones)[0]).css('margin-left', -totalWidth); // give clone array negative margin before preppending
        $msContent.prepend(filteredClones);

        reTargetSlides();

        $imgFirst.animate(
          {
            marginLeft: 0,
          }, {
            duration: animateDuration,
            easing: 'swing',
            complete() {
              numberTotalSlides = $msContent.find('.item').length;
              $($msContent.find('.item').splice(numberTotalSlides - numberVisibleSlides, numberTotalSlides)).remove();
              $imgFirst.removeAttr('style');
              doneAnimating();
            },
          },
        );
      });
    }

    function singleLeft() {
      isItAnimating(() => {
        reTargetSlides();
        $imgFirst.animate(
          {
            marginLeft: -animateDistance,
          }, {
            duration: animateDuration,
            easing: 'swing',
            complete() {
              $imgFirst.detach().removeAttr('style').appendTo($msContent);
              doneAnimating();
            },
          },
        );
      });
    }

    function singleRight() {
      isItAnimating(() => {
        reTargetSlides();
        $imgLast.css('margin-left', -animateDistance).prependTo($msContent);
        $imgLast.animate(
          {
            marginLeft: 0,
          }, {
            duration: animateDuration,
            easing: 'swing',
            complete() {
              $imgLast.removeAttr('style');
              doneAnimating();
            },
          },
        );
      });
    }
    return $multislider;
  };
}(jQuery));
