document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const nav = document.querySelector('.main-nav');
    const mobile = window.matchMedia('(max-width: 768px)');

    function setOpen(open) {
        menuToggle.classList.toggle('active', open);
        menuToggle.setAttribute('aria-expanded', String(open));
        navMenu.classList.toggle('active', open);
    }

    menuToggle.addEventListener('click', function() {
        setOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
            setOpen(false);
            menuToggle.focus();
        }
    });

    nav.addEventListener('focusout', function(event) {
        if (!nav.contains(event.relatedTarget)) {
            setOpen(false);
        }
    });

    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target)) {
            if (mobile.matches && navMenu.contains(document.activeElement)) {
                menuToggle.focus();
            }
            setOpen(false);
        }
    });

    mobile.addEventListener('change', function() {
        if (mobile.matches && navMenu.contains(document.activeElement)) {
            menuToggle.focus();
        } else if (!mobile.matches && document.activeElement === menuToggle) {
            navMenu.querySelector('[aria-current="page"], a').focus();
        }
        setOpen(false);
    });
});
