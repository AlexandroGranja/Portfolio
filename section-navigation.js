(function () {
    'use strict';
    function selectSection(items, height, atEnd = false) {
        if (!items.length) return null;
        if (atEnd) return items[items.length - 1].id;
        const readingLine = height * 0.3;
        return items.reduce((current, item) => item.top <= readingLine ? item.id : current, items[0].id);
    }
    if (typeof module !== 'undefined') module.exports = { selectSection };
    if (typeof document === 'undefined') return;

    const main = document.querySelector('main');
    const panels = Array.from(main.querySelectorAll('.section-content'));
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let current = null;
    let frame = 0;
    const targetFor = hash => panels.find(panel => '#' + panel.id === hash);

    window.showSection = function (hash) {
        const target = targetFor(hash);
        if (!target) return;
        target.scrollIntoView({ behavior: motion.matches ? 'instant' : 'smooth', block: 'start' });
        history.pushState(null, '', hash);
    };

    function update() {
        frame = 0;
        const origin = main.getBoundingClientRect().top;
        const id = selectSection(panels.map(panel => ({ id: panel.id, top: panel.getBoundingClientRect().top - origin })), main.clientHeight,
            main.scrollTop + main.clientHeight >= main.scrollHeight - 3);
        if (id === current) return;
        current = id;
        panels.forEach(panel => panel.classList.toggle('is-current', panel.id === id));
        document.querySelectorAll('.nav-link-sidebar').forEach(link => {
            const selected = link.getAttribute('href') === '#' + id || link.dataset.section === id;
            [link, link.querySelector('.material-icons-round'), link.querySelector('span:last-child')].filter(Boolean).forEach(el => {
                el.classList.toggle('text-primary', selected);
                el.classList.toggle('text-slate-400', !selected);
            });
            if (selected) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        panels.forEach(panel => panel.classList.add('active'));
        document.querySelectorAll('#about .relative.pl-5').forEach(job => job.classList.add('exp-expanded'));
        const initial = targetFor(location.hash) || panels[0];
        initial.scrollIntoView({ behavior: 'instant', block: 'start' });
        update();
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => entry.target.classList.toggle('in-view', entry.isIntersecting));
        }, { root: main, threshold: 0, rootMargin: '0px 0px -30px 0px' });
        panels.forEach(panel => observer.observe(panel));
        main.addEventListener('scroll', () => { if (!frame) frame = requestAnimationFrame(update); }, { passive: true });
        window.addEventListener('resize', update);
        window.addEventListener('popstate', () => {
            (targetFor(location.hash) || panels[0]).scrollIntoView({ behavior: 'instant', block: 'start' });
        });
        main.addEventListener('click', event => {
            const link = event.target.closest('a[href^="#"]');
            if (!link || !targetFor(link.hash)) return;
            event.preventDefault();
            window.showSection(link.hash);
        });
    });
})();
