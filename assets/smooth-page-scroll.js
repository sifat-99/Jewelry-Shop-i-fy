/**
 * Global subtle smooth page scrolling controller.
 * Driven by Theme Settings > Animations (`enable_smooth_scroll`,
 * `smooth_scroll_strength`, `smooth_scroll_anchors`).
 *
 * Uses native window scroll coordinates so CSS `position: sticky`, modals,
 * drawers, inner scroll containers, AOS reveal triggers, and horizontal tracks
 * continue operating naturally.
 */
(() => {
  const themeSettings = (window.theme && window.theme.settings) || {};
  if (themeSettings.smooth_scroll === false) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches) return;

  const rawStrength = Number(themeSettings.smooth_scroll_strength);
  const strength = Number.isFinite(rawStrength)
    ? Math.max(1, Math.min(10, rawStrength))
    : 3;

  // Frame-rate-independent decay factor (higher = snappier, lower = softer glide).
  // Strength 3 yields decay ~15.5 (~280ms settle): subtle luxury smoothness without lag.
  const decay = 26 / (1 + (strength - 1) * 0.34);
  const anchorSmooth = themeSettings.smooth_scroll_anchors !== false;

  let currentY = window.scrollY;
  let targetY = window.scrollY;
  let lastAppliedY = window.scrollY;
  let rafId = null;
  let lastTime = 0;

  const getMaxScroll = () =>
    Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

  const clampTarget = (value) => Math.max(0, Math.min(getMaxScroll(), value));

  const stop = (resync = true) => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    lastTime = 0;
    if (resync) {
      currentY = window.scrollY;
      targetY = window.scrollY;
      lastAppliedY = window.scrollY;
    }
  };

  const applyScroll = (y) => {
    lastAppliedY = y;
    try {
      window.scrollTo({ top: y, left: window.scrollX, behavior: 'instant' });
    } catch {
      window.scrollTo(window.scrollX, y);
    }
  };

  const isPageScrollLocked = () => {
    const htmlOverflow = getComputedStyle(document.documentElement).overflowY;
    const bodyOverflow = getComputedStyle(document.body).overflowY;
    if (htmlOverflow === 'hidden' || bodyOverflow === 'hidden') return true;
    if (
      document.documentElement.classList.contains('scroll-lock') ||
      document.body.classList.contains('scroll-lock')
    ) {
      return true;
    }
    return Boolean(
      document.querySelector('.qv-modal.is-open, .drawer--visible')
    );
  };

  const step = (now) => {
    if (reducedMotion.matches || isPageScrollLocked()) {
      stop(true);
      return;
    }

    // Abort cleanly if user/browser jumped scroll externally (e.g. scrollbar drag, Tab focus, Theme Editor).
    if (Math.abs(window.scrollY - lastAppliedY) > 2) {
      stop(true);
      return;
    }

    if (!lastTime) lastTime = now;
    const dt = Math.min(48, Math.max(1, now - lastTime));
    lastTime = now;

    targetY = clampTarget(targetY);
    const diff = targetY - currentY;

    if (Math.abs(diff) <= 0.35) {
      applyScroll(targetY);
      stop(true);
      return;
    }

    const alpha = 1 - Math.exp((-decay * dt) / 1000);
    currentY += diff * alpha;
    applyScroll(currentY);
    rafId = requestAnimationFrame(step);
  };

  const start = () => {
    if (rafId === null) {
      lastTime = 0;
      rafId = requestAnimationFrame(step);
    }
  };

  const shouldBypassForTarget = (startTarget, deltaY) => {
    let el =
      startTarget && startTarget.nodeType === 3
        ? startTarget.parentElement
        : startTarget;

    while (el && el !== document.body && el !== document.documentElement) {
      if (el instanceof Element) {
        if (el.matches('[role="dialog"], [aria-modal="true"], dialog[open]')) {
          return true;
        }
        const style = getComputedStyle(el);
        const oy = style.overflowY;
        const isScrollableStyle =
          oy === 'auto' || oy === 'scroll' || oy === 'overlay';

        if (isScrollableStyle && el.scrollHeight > el.clientHeight + 1) {
          const canScrollUp = deltaY < 0 && el.scrollTop > 0;
          const canScrollDown =
            deltaY > 0 && el.scrollTop + el.clientHeight < el.scrollHeight - 1;
          if (canScrollUp || canScrollDown) return true;
          if (
            style.overscrollBehaviorY === 'contain' ||
            style.overscrollBehaviorY === 'none' ||
            style.overscrollBehavior === 'contain'
          ) {
            return true;
          }
        }
      }
      el = el.parentElement;
    }

    return false;
  };

  const normalizeWheelDelta = (event) => {
    let delta = event.deltaY;
    if (event.deltaMode === 1) {
      delta *= 16;
    } else if (event.deltaMode === 2) {
      delta *= window.innerHeight * 0.85;
    }
    return delta;
  };

  window.addEventListener(
    'wheel',
    (event) => {
      if (
        reducedMotion.matches ||
        event.defaultPrevented ||
        event.ctrlKey ||
        event.metaKey ||
        event.deltaY === 0 ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
      ) {
        return;
      }

      if (isPageScrollLocked()) {
        stop(true);
        return;
      }

      const delta = normalizeWheelDelta(event);
      if (shouldBypassForTarget(event.target, delta)) return;

      event.preventDefault();

      if (rafId === null) {
        currentY = window.scrollY;
        targetY = window.scrollY;
        lastAppliedY = window.scrollY;
      }

      targetY = clampTarget(targetY + delta);
      start();
    },
    { passive: false }
  );

  // Stop custom animation cleanly on manual touch, key navigation, resize, or OS change.
  window.addEventListener('touchstart', () => stop(true), { passive: true });
  window.addEventListener(
    'keydown',
    (event) => {
      const scrollKeys = [
        'Space',
        'PageUp',
        'PageDown',
        'Home',
        'End',
        'ArrowUp',
        'ArrowDown',
      ];
      if (scrollKeys.includes(event.code)) stop(true);
    },
    { passive: true }
  );
  window.addEventListener('resize', () => {
    targetY = clampTarget(targetY);
  });
  window.addEventListener(
    'scroll',
    () => {
      if (rafId === null) {
        currentY = window.scrollY;
        targetY = window.scrollY;
        lastAppliedY = window.scrollY;
      }
    },
    { passive: true }
  );

  reducedMotion.addEventListener('change', (event) => {
    if (event.matches) stop(true);
  });

  if (anchorSmooth) {
    document.addEventListener('click', (event) => {
      if (event.defaultPrevented || reducedMotion.matches) return;
      const target =
        event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!target) return;

      const href = target.getAttribute('href') || '';
      if (
        !href.startsWith('#') ||
        href === '#' ||
        target.hasAttribute('data-toggle') ||
        target.hasAttribute('data-modal') ||
        target.getAttribute('role') === 'tab'
      ) {
        return;
      }

      const dest = document.getElementById(href.slice(1));
      if (!dest) return;

      event.preventDefault();

      const stickyHeader = document.querySelector(
        '[data-header-sticky="sticky"] [data-header-height]'
      );
      const headerOffset = stickyHeader
        ? stickyHeader.getBoundingClientRect().height + 12
        : 0;
      const destTop =
        dest.getBoundingClientRect().top + window.scrollY - headerOffset;

      currentY = window.scrollY;
      lastAppliedY = window.scrollY;
      targetY = clampTarget(destTop);
      start();

      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', href);
      }
    });
  }
})();
