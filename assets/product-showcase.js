/**
 * Product showcase controllers (<product-showcase-slider>, <showcase-video>,
 * <split-showcase-banner>, and sticky header offset), used by
 * sections/product-showcase.liquid and sections/collection-split.liquid.
 */
class ProductShowcaseSlider extends HTMLElement {
  /** @type {AbortController | undefined} */
  #abortController;

  /** @type {ResizeObserver | undefined} */
  #resizeObserver;

  connectedCallback() {
    this.#abortController?.abort();
    this.#abortController = new AbortController();
    const { signal } = this.#abortController;

    const track = this.track;
    if (!track) return;

    this.prevButton?.addEventListener('click', () => this.#step(-1), { signal });
    this.nextButton?.addEventListener('click', () => this.#step(1), { signal });
    track.addEventListener('scroll', () => this.#update(), { signal, passive: true });

    this.#resizeObserver?.disconnect();
    this.#resizeObserver = new ResizeObserver(() => this.#update());
    this.#resizeObserver.observe(track);

    this.#update();
    requestAnimationFrame(() => this.#update());
  }

  disconnectedCallback() {
    this.#abortController?.abort();
    this.#resizeObserver?.disconnect();
  }

  get track() {
    const track = this.querySelector('[data-showcase-track]');
    return track instanceof HTMLElement ? track : null;
  }

  get prevButton() {
    const button = this.querySelector('[data-showcase-prev]');
    return button instanceof HTMLButtonElement ? button : null;
  }

  get nextButton() {
    const button = this.querySelector('[data-showcase-next]');
    return button instanceof HTMLButtonElement ? button : null;
  }

  /**
   * Scrolls one card towards the end (1) or the start (-1).
   * @param {1 | -1} direction
   */
  #step(direction) {
    const track = this.track;
    if (!track) return;

    const item = track.querySelector('[data-showcase-item]');
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const distance = (item instanceof HTMLElement ? item.offsetWidth : track.clientWidth) + gap;
    const rtl = getComputedStyle(track).direction === 'rtl' ? -1 : 1;

    track.scrollBy({ left: distance * direction * rtl });
  }

  /** Arrow states and the pagination thumb (size = visible share, offset = scroll progress). */
  #update() {
    const track = this.track;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    const fromStart = Math.abs(track.scrollLeft);
    const scrollable = maxScroll > 1;

    this.toggleAttribute('data-static', !scrollable);

    if (this.prevButton) this.prevButton.disabled = !scrollable || fromStart <= 1;
    if (this.nextButton) this.nextButton.disabled = !scrollable || fromStart >= maxScroll - 1;

    const size = scrollable ? track.clientWidth / track.scrollWidth : 1;
    const progress = scrollable ? Math.min(1, fromStart / maxScroll) : 0;
    this.style.setProperty('--showcase-thumb-size', size.toFixed(4));
    this.style.setProperty('--showcase-thumb-offset', (progress * (1 - size)).toFixed(4));
  }
}

if (!customElements.get('product-showcase-slider')) {
  customElements.define('product-showcase-slider', ProductShowcaseSlider);
}

class ShowcaseVideo extends HTMLElement {
  /** @type {AbortController | undefined} */
  #abortController;

  connectedCallback() {
    this.#abortController?.abort();
    this.#abortController = new AbortController();
    const { signal } = this.#abortController;

    const video = this.querySelector('video');
    const toggle = this.querySelector('[data-showcase-video-toggle]');
    if (!(video instanceof HTMLVideoElement) || !(toggle instanceof HTMLButtonElement)) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) video.pause();

    const sync = () => {
      const paused = video.paused;
      toggle.setAttribute('aria-pressed', `${paused}`);
      toggle.setAttribute('aria-label', paused ? toggle.dataset.labelPlay ?? '' : toggle.dataset.labelPause ?? '');
      this.toggleAttribute('paused', paused);
    };

    toggle.addEventListener(
      'click',
      async () => {
        if (video.paused) {
          try {
            await video.play();
          } catch {
            // Playback can be blocked (e.g. data saver); keep the paused state.
          }
        } else {
          video.pause();
        }
      },
      { signal }
    );

    video.addEventListener('play', sync, { signal });
    video.addEventListener('pause', sync, { signal });
    sync();
  }

  disconnectedCallback() {
    this.#abortController?.abort();
  }
}

if (!customElements.get('showcase-video')) {
  customElements.define('showcase-video', ShowcaseVideo);
}

class SplitShowcaseBanner extends HTMLElement {
  /** @type {AbortController | undefined} */
  #abortController;

  /** @type {IntersectionObserver | undefined} */
  #observer;

  /** @type {number | null} */
  #timer = null;

  connectedCallback() {
    this.#abortController?.abort();
    this.#abortController = new AbortController();
    const { signal } = this.#abortController;

    const slides = Array.from(this.querySelectorAll('[data-showcase-slide]'));
    if (slides.length <= 1) return;

    const dots = Array.from(this.querySelectorAll('[data-showcase-dot]'));
    const speed = parseInt(this.dataset.speed || '4500', 10) || 4500;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let current = 0;
    let visible = true;
    let hovering = false;

    const show = (index) => {
      const next = (index + slides.length) % slides.length;
      if (next === current) return;

      slides.forEach((el, i) => {
        el.classList.toggle('is-active', i === next);
        el.classList.toggle('is-prev', i === current);
        const link = el.querySelector('a');
        if (link) link.tabIndex = i === next ? 0 : -1;
      });
      dots.forEach((d, i) => d.classList.toggle('is-active', i === next));
      current = next;
    };

    const stop = () => {
      if (this.#timer !== null) {
        clearInterval(this.#timer);
        this.#timer = null;
      }
    };

    const start = () => {
      stop();
      if (this.dataset.autoplay !== 'true' || reduced || !visible || hovering || document.hidden) return;
      this.#timer = window.setInterval(() => show(current + 1), speed);
    };

    dots.forEach((d) => {
      d.addEventListener(
        'click',
        (e) => {
          e.preventDefault();
          e.stopPropagation();
          show(parseInt(d.dataset.showcaseDot || '0', 10));
          start();
        },
        { signal }
      );
    });

    let sx = 0;
    let sy = 0;
    let dragging = false;
    let moved = false;

    this.addEventListener(
      'pointerdown',
      (e) => {
        if (e.target instanceof Element && e.target.closest('[data-showcase-dot]')) return;
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        dragging = true;
        moved = false;
        sx = e.clientX;
        sy = e.clientY;
      },
      { signal }
    );

    this.addEventListener(
      'pointermove',
      (e) => {
        if (dragging && Math.abs(e.clientX - sx) > 8) moved = true;
      },
      { signal }
    );

    const end = (e) => {
      if (!dragging) return;
      dragging = false;
      const dx = e.clientX - sx;
      const dy = e.clientY - sy;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        show(current + (dx < 0 ? 1 : -1));
        start();
      }
    };

    this.addEventListener('pointerup', end, { signal });
    this.addEventListener(
      'pointercancel',
      () => {
        dragging = false;
      },
      { signal }
    );
    this.addEventListener('dragstart', (e) => e.preventDefault(), { signal });
    this.addEventListener(
      'click',
      (e) => {
        if (moved) {
          e.preventDefault();
          e.stopPropagation();
          moved = false;
        }
      },
      { signal, capture: true }
    );

    this.addEventListener(
      'mouseenter',
      () => {
        hovering = true;
        stop();
      },
      { signal }
    );
    this.addEventListener(
      'mouseleave',
      () => {
        hovering = false;
        start();
      },
      { signal }
    );
    document.addEventListener('visibilitychange', start, { signal });

    this.#observer?.disconnect();
    if ('IntersectionObserver' in window) {
      this.#observer = new IntersectionObserver(
        (entries) => {
          visible = entries[0].isIntersecting;
          start();
        },
        { threshold: 0.2 }
      );
      this.#observer.observe(this);
    }

    start();
  }

  disconnectedCallback() {
    this.#abortController?.abort();
    this.#observer?.disconnect();
    if (this.#timer !== null) {
      clearInterval(this.#timer);
      this.#timer = null;
    }
  }
}

if (!customElements.get('split-showcase-banner')) {
  customElements.define('split-showcase-banner', SplitShowcaseBanner);
}

function syncShowcaseStickyOffsets() {
  const stickyHeaderRoot = document.querySelector('[data-header-sticky="sticky"]');
  const headerEl = stickyHeaderRoot ? stickyHeaderRoot.querySelector('[data-header-height]') : null;
  const top = headerEl ? Math.round(headerEl.getBoundingClientRect().height) : 0;

  document.querySelectorAll('.showcase--image').forEach((el) => {
    if (el instanceof HTMLElement) {
      el.style.setProperty('--showcase-sticky-top', `${top}px`);
    }
  });
}

if (!window.__lvShowcaseStickyBound) {
  window.__lvShowcaseStickyBound = true;
  window.addEventListener('resize', syncShowcaseStickyOffsets, { passive: true });
  document.addEventListener('shopify:section:load', syncShowcaseStickyOffsets);
}
syncShowcaseStickyOffsets();
