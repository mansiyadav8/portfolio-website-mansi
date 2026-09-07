// ===== VIDEO LOADING =====
const video = document.getElementById('heroVideo');
const fallback = document.getElementById('videoFallback');

function onVideoLoaded() {
    video.setAttribute('data-loaded', 'true');
    fallback.classList.add('hidden');
    console.log('Video loaded successfully');
}

function onVideoError(e) {
    console.error('Video failed to load:', e);
}

if (video) {
    video.addEventListener('loadeddata', onVideoLoaded);
    video.addEventListener('canplay', onVideoLoaded);
    video.addEventListener('error', onVideoError);

    video.play().catch(function(error) {
        console.log('Autoplay prevented:', error);
        document.addEventListener('click', function() {
            video.play().catch(() => {});
        }, { once: true });
    });
}

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let dotX = 0, dotY = 0;
const isTouch = window.matchMedia('(pointer: coarse)').matches;

if (!isTouch && cursor && cursorDot) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.12;
        cursorY += (mouseY - cursorY) * 0.12;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        dotX += (mouseX - dotX) * 0.25;
        dotY += (mouseY - dotY) * 0.25;
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const interactives = document.querySelectorAll('a, button, .marquee-item span, .skill-card, .exp-item');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// ===== HEADER SCROLL =====
const header = document.getElementById('header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ===== MENU TOGGLE =====
const menuBtn = document.getElementById('menuBtn');
let menuOpen = false;

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        menuOpen = !menuOpen;
        const spans = menuBtn.querySelectorAll('span');
        if (menuOpen) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));
