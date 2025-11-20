(() => {
  function getGroupFromAny(el) {
    const section = el.closest('.sri-prod-feature');
    return section ? section.querySelector('.sri-prod-feature__thumbs') : null;
  }

  function applyImage(img, src, alt) {
    if (!img || !src) return;
    img.setAttribute('src', src);
    img.setAttribute('srcset', src); 
    img.removeAttribute('sizes');
    if (alt) img.setAttribute('alt', alt);
  }

  function updateByIndex(group, index) {
    if (!group) return;
    const thumbs = Array.from(group.querySelectorAll('.sri-prod-feature__thumb'));
    if (!thumbs.length) return;

    const clamped = (index + thumbs.length) % thumbs.length;
    const btn = thumbs[clamped];

    const targetSel = group.getAttribute('data-target');
    const img = document.querySelector(targetSel);
    if (!img || !btn) return;

    const src = btn.getAttribute('data-src');
    const alt = btn.getAttribute('data-alt') || '';

    applyImage(img, src, alt);

    thumbs.forEach((t, i) => {
      t.classList.toggle('is-active', i === clamped);
      t.setAttribute('aria-pressed', i === clamped ? 'true' : 'false');
    });

    group.dataset.activeIndex = clamped;
  }

  // Thumbnail click
  document.addEventListener('click', (e) => {
    const thumb = e.target.closest('.sri-prod-feature__thumb');
    if (thumb) {
      const group = thumb.closest('.sri-prod-feature__thumbs');
      const index = parseInt(thumb.getAttribute('data-index'), 10) || 0;
      updateByIndex(group, index);
    }
  });

  // Prev / Next
  document.addEventListener('click', (e) => {
    const nav = e.target.closest('.sri-prod-feature__nav');
    if (!nav) return;
    const group = getGroupFromAny(nav);
    if (!group) return;

    const dir = parseInt(nav.getAttribute('data-dir'), 10) || 1;
    const current = parseInt(group.dataset.activeIndex || '0', 10);
    updateByIndex(group, current + dir);
  });

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.sri-prod-feature__thumbs').forEach((group) => {
      const targetSel = group.getAttribute('data-target');
      const img = document.querySelector(targetSel);

      const active = group.querySelector('.sri-prod-feature__thumb.is-active') || group.querySelector('.sri-prod-feature__thumb');
      const idx = active ? parseInt(active.getAttribute('data-index'), 10) : 0;
      group.dataset.activeIndex = isNaN(idx) ? 0 : idx;

      if (active && img) {
        applyImage(img, active.getAttribute('data-src'), active.getAttribute('data-alt') || '');
      }
    });
  });
})();
