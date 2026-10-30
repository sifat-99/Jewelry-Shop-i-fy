/* ==========================================================================
   Banner module runtime (homepage banner + collection banner)
   1. Video playback: plays only the video that matches the breakpoint, is in the
      viewport and belongs to the active slide. Respects reduced-motion / data-saver.
   2. Full-screen sizing: banner height = 100vh minus whatever sits above it
      (announcement bar + header), so header + banner exactly fill the first screen.
   3. Smooth "hero -> next section" scrolling for the full-screen homepage banner.
   ========================================================================== */
(function () {
  'use strict';
  if (window.__lvBanner) {
    window.__lvBanner.init(document);
    return;
  }

  var MOBILE_MQ = window.matchMedia('(max-width: 767px)');
  var REDUCED_MQ = window.matchMedia('(prefers-reduced-motion: reduce)');
  var DESIGN_MODE = !!(window.Shopify && window.Shopify.designMode);
  var heroes = [];
  var animating = false;

  function saveData() {
    var c = navigator.connection;
    return !!(c && c.saveData);
  }

  /* ------------------------------------------------------------------ videos */
  var videoObserver = null;
  var visibleVideos = new WeakSet();

  function videoShouldPlay(video) {
    if (REDUCED_MQ.matches || saveData()) return false;
    if (document.hidden) return false;
    var device = video.getAttribute('data-banner-device');
    if (device === 'mobile' && !MOBILE_MQ.matches) return false;
    if (device === 'desktop' && MOBILE_MQ.matches) return false;
    if (!visibleVideos.has(video)) return false;
    var slide = video.closest('[data-slideshow-index]');
    if (slide && slide.closest('.flickity-enabled') && !slide.classList.contains('is-selected')) return false;
    return true;
  }

  function syncVideo(video) {
    if (videoShouldPlay(video)) {
      var p = video.play();
      if (p && typeof p.catch === 'function') p.catch(function () {});
    } else if (!video.paused) {
      video.pause();
    }
  }

  function syncAllVideos() {
    document.querySelectorAll('[data-banner-video]').forEach(syncVideo);
  }

  function initVideos(root) {
    var videos = root.querySelectorAll('[data-banner-video]:not([data-banner-ready])');
    if (!videos.length) return;
    if (!videoObserver && 'IntersectionObserver' in window) {
      videoObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) visibleVideos.add(entry.target);
          else visibleVideos.delete(entry.target);
          syncVideo(entry.target);
        });
      }, { threshold: 0.15 });
    }
    videos.forEach(function (video) {
      video.setAttribute('data-banner-ready', '');
      video.muted = true; // required for autoplay in all browsers
      if (videoObserver) {
        videoObserver.observe(video);
      } else {
        visibleVideos.add(video);
        syncVideo(video);
      }
      // Re-evaluate when the slideshow changes the selected slide
      var wrapper = video.closest('[data-slideshow-wrapper]');
      if (wrapper && !wrapper.__bannerMo && 'MutationObserver' in window) {
        wrapper.__bannerMo = new MutationObserver(syncAllVideos);
        wrapper.__bannerMo.observe(wrapper, { attributes: true, attributeFilter: ['class'], subtree: true });
      }
    });
  }

  /* -------------------------------------------------------------- full screen */
  function headerSection() {
    var h = document.querySelector('[data-header-wrapper]');
    return h ? h.closest('.shopify-section') : null;
  }

  function stickyHeaderHeight() {
    var sec = headerSection();
    if (!sec) return 0;
    var pos = window.getComputedStyle(sec).position;
    return pos === 'sticky' || pos === 'fixed' ? sec.offsetHeight : 0;
  }

  function docTop(el) {
    return el.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop);
  }

  function sizeHero(hero) {
    var wrap = hero.closest('.shopify-section') || hero;
    var isFirst = hero.hasAttribute('data-banner-first');
    var offset = isFirst ? docTop(wrap) : stickyHeaderHeight();
    hero.style.setProperty('--banner-offset', Math.max(0, Math.round(offset)) + 'px');
    // Banner shorter than ~60% of the screen (mobile ratio layouts): no glide, no scroll arrow
    if (wrap.offsetHeight < window.innerHeight * 0.6) hero.setAttribute('data-banner-short', '');
    else hero.removeAttribute('data-banner-short');
  }

  function sizeAllHeroes() {
    heroes.forEach(sizeHero);
  }

  /* ------------------------------------------------------------ smooth scroll */
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function animateTo(targetY, done) {
    var startY = window.pageYOffset || document.documentElement.scrollTop;
    var dist = targetY - startY;
    if (Math.abs(dist) < 2) { if (done) done(); return; }
    if (REDUCED_MQ.matches) {
      window.scrollTo({ top: targetY, left: 0, behavior: 'instant' });
      if (done) done();
      return;
    }
    animating = true;
    var duration = Math.min(1100, Math.max(650, Math.abs(dist) * 0.9));
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var t = Math.min(1, (ts - start) / duration);
      window.scrollTo({ top: startY + dist * easeInOutCubic(t), left: 0, behavior: 'instant' });
      if (t < 1) {
        window.requestAnimationFrame(step);
      } else {
        animating = false;
        if (done) done();
      }
    }
    window.requestAnimationFrame(step);
  }

  function snapHero() {
    return heroes.filter(function (h) {
      return h.hasAttribute('data-banner-first') && !h.hasAttribute('data-banner-short') &&
        h.getAttribute('data-banner-scroll') === 'smooth_snap';
    })[0];
  }

  function heroBottomTarget(hero) {
    var wrap = hero.closest('.shopify-section') || hero;
    return Math.max(0, Math.round(docTop(wrap) + wrap.offsetHeight - stickyHeaderHeight()));
  }

  function scrollLocked() {
    var cs = window.getComputedStyle(document.body);
    var hs = window.getComputedStyle(document.documentElement);
    return cs.overflow === 'hidden' || hs.overflow === 'hidden' || cs.position === 'fixed';
  }

  function scrollY() {
    return window.pageYOffset || document.documentElement.scrollTop;
  }

  // dir: 1 = scrolling down, -1 = scrolling up. Returns true if we took over the gesture.
  function handleGesture(dir, e) {
    var hero = snapHero();
    if (!hero || animating || scrollLocked()) return false;
    var target = heroBottomTarget(hero);
    var y = scrollY();
    var TOL = 3;
    if (dir > 0 && y < target - TOL) {
      if (e && e.cancelable) e.preventDefault();
      animateTo(target);
      return true;
    }
    if (dir < 0 && y > 0 && y <= target + TOL) {
      if (e && e.cancelable) e.preventDefault();
      animateTo(0);
      return true;
    }
    return false;
  }

  var wheelAccum = 0;
  var wheelTimer = null;
  function onWheel(e) {
    if (e.ctrlKey || DESIGN_MODE) return;
    var hero = snapHero();
    if (!hero) return;
    if (animating) { if (e.cancelable) e.preventDefault(); return; }
    // Let inner scrollers (drawers, menus, textareas) keep their own scrolling
    if (e.target.closest && e.target.closest('[data-modal], .cart-drawer, .drawer, textarea, select')) return;
    wheelAccum += e.deltaY;
    window.clearTimeout(wheelTimer);
    wheelTimer = window.setTimeout(function () { wheelAccum = 0; }, 160);
    if (Math.abs(e.deltaY) < 4 && Math.abs(wheelAccum) < 12) return;
    handleGesture(e.deltaY > 0 ? 1 : -1, e);
  }

  var touchStartY = 0;
  var touchLock = null; // null = undecided, true = we own this gesture, false = native
  function onTouchStart(e) {
    if (DESIGN_MODE || !snapHero() || e.touches.length !== 1) { touchLock = false; return; }
    touchStartY = e.touches[0].clientY;
    touchLock = null;
  }
  function onTouchMove(e) {
    if (touchLock === false || !snapHero() || animating) {
      if (animating && e.cancelable) e.preventDefault();
      return;
    }
    var dy = touchStartY - e.touches[0].clientY; // > 0 = finger moving up = scrolling down
    if (touchLock === null) {
      if (Math.abs(dy) < 12) return;
      if (scrollLocked()) { touchLock = false; return; }
      var hero = snapHero();
      var target = heroBottomTarget(hero);
      var y = scrollY();
      var own = (dy > 0 && y < target - 3) || (dy < 0 && y > 0 && y <= target + 3);
      touchLock = own;
      if (own) handleGesture(dy > 0 ? 1 : -1, e);
    } else if (touchLock && e.cancelable) {
      e.preventDefault();
    }
  }
  function onTouchEnd() { touchLock = null; }

  function bindScrollHandlers() {
    if (bindScrollHandlers.done) return;
    bindScrollHandlers.done = true;
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('touchcancel', onTouchEnd, { passive: true });
  }

  function initHeroes(root) {
    root.querySelectorAll('[data-banner-fullscreen]:not([data-banner-ready])').forEach(function (hero) {
      hero.setAttribute('data-banner-ready', '');
      var wrap = hero.closest('.shopify-section') || hero;
      var main = document.getElementById('MainContent');
      var firstSection = main ? main.querySelector('.shopify-section') : null;
      if (firstSection === wrap) hero.setAttribute('data-banner-first', ''); else hero.removeAttribute('data-banner-first');
      heroes.push(hero);
      sizeHero(hero);

      var cue = hero.querySelector('[data-banner-scroll-cue]');
      if (cue) {
        cue.addEventListener('click', function () {
          if (!animating) animateTo(heroBottomTarget(hero));
        });
      }
    });
    bindScrollHandlers();
  }

  /* -------------------------------------------------------------------- init */
  function init(root) {
    root = root || document;
    heroes = heroes.filter(function (h) { return document.contains(h); });
    initHeroes(root);
    initVideos(root);
    syncAllVideos();
  }

  var resizeTimer = null;
  function onResize() {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () {
      sizeAllHeroes();
      syncAllVideos();
    }, 80);
  }

  window.addEventListener('resize', onResize);
  window.addEventListener('orientationchange', onResize);
  window.addEventListener('load', function () { sizeAllHeroes(); syncAllVideos(); });
  document.addEventListener('visibilitychange', syncAllVideos);
  if (MOBILE_MQ.addEventListener) MOBILE_MQ.addEventListener('change', syncAllVideos);

  // Header height can change after fonts / logo load or when the announcement bar rotates
  if ('ResizeObserver' in window) {
    var ro = new ResizeObserver(onResize);
    var watch = function () {
      document.querySelectorAll('.shopify-section-group-group-header, [data-header-wrapper]').forEach(function (el) { ro.observe(el); });
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', watch); else watch();
  }

  // Theme editor support
  document.addEventListener('shopify:section:load', function (e) { init(e.target); sizeAllHeroes(); });
  document.addEventListener('shopify:section:unload', function () {
    heroes = heroes.filter(function (h) { return document.contains(h); });
  });
  document.addEventListener('shopify:section:reorder', function () {
    heroes.forEach(function (h) {
      var wrap = h.closest('.shopify-section') || h;
      var main = document.getElementById('MainContent');
      var first = main ? main.querySelector('.shopify-section') : null;
      if (first === wrap) h.setAttribute('data-banner-first', ''); else h.removeAttribute('data-banner-first');
    });
    sizeAllHeroes();
  });

  window.__lvBanner = { init: init, size: sizeAllHeroes };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { init(document); });
  } else {
    init(document);
  }
})();
