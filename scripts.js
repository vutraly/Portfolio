function initLucide() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        try {
            window.lucide.createIcons();
        } catch (e) {
            console.warn('Lucide init:', e);
        }
    }
}

initLucide();
window.addEventListener('load', initLucide);

function initializeEffects() {
    if (window.AOS) {
        AOS.init({ once: true, duration: 700, easing: 'ease-out-quart', offset: 120 });
    }

    if (window.Typed && document.getElementById('typed-subtitle')) {
        try {
            new Typed('#typed-subtitle', {
                strings: ['', 'International Communications Student^2200', 'Storyteller • Digital Content Creator • Media Storyteller', 'Videographer • Video Editor • Field Reporter', ' Broadcast Anchor • Visual Storyteller • Video Jockey'],
                typeSpeed: 68,
                backSpeed: 36,
                backDelay: 900,
                loop: true,
                smartBackspace: true,
                showCursor: true
            });
        } catch (e) {
            console.warn('Typed.js init failed', e);
        }
    }

    if (window.VanillaTilt) {
        VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
            max: 4,
            speed: 300,
            glare: false,
            'max-glare': 0.05,
            scale: 1.005
        });
    }

    function getYouTubeVideoId(url) {
        if (!url) return '';

        try {
            const parsed = new URL(url, window.location.origin);
            const host = parsed.hostname.replace(/^www\./, '').toLowerCase();
            let id = '';

            if (host === 'youtu.be') {
                id = parsed.pathname.slice(1).split('/')[0] || '';
            } else if (host === 'youtube.com' || host === 'm.youtube.com') {
                if (parsed.pathname === '/watch') {
                    id = parsed.searchParams.get('v') || '';
                } else {
                    const parts = parsed.pathname.split('/').filter(Boolean);
                    if (parts[0] === 'shorts' || parts[0] === 'embed' || parts[0] === 'live') {
                        id = parts[1] || '';
                    }
                }
            }

            return /^[A-Za-z0-9_-]{11}$/.test(id) ? id : '';
        } catch (_) {
            return '';
        }
    }

    function toYouTubeEmbed(url) {
        const videoId = getYouTubeVideoId(url);
        if (!videoId) return '';
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&rel=0&playsinline=1`;
    }

    const canHoverPreview = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    document.querySelectorAll('.video-overlay').forEach(btn => {
        const src = btn.getAttribute('data-video-src');

        if (canHoverPreview) {
            const mediaWrap = btn.closest('.relative.overflow-hidden');
            const embedSrc = toYouTubeEmbed(src || '');
            let previewLayer = null;
            let hoverTimer = null;

            function stopPreview() {
                if (hoverTimer) {
                    clearTimeout(hoverTimer);
                    hoverTimer = null;
                }
                if (previewLayer && mediaWrap && mediaWrap.contains(previewLayer)) {
                    mediaWrap.removeChild(previewLayer);
                }
                if (mediaWrap) {
                    mediaWrap.classList.remove('is-previewing-video');
                }
                previewLayer = null;
            }

            function startPreview() {
                if (!mediaWrap || !embedSrc || previewLayer) return;

                hoverTimer = setTimeout(() => {
                    mediaWrap.classList.add('is-previewing-video');
                    previewLayer = document.createElement('div');
                    previewLayer.className = 'video-hover-preview';
                    previewLayer.innerHTML = `<iframe src="${embedSrc}" title="Video preview" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
                    mediaWrap.appendChild(previewLayer);
                }, 220);
            }

            mediaWrap.addEventListener('mouseenter', startPreview);
            mediaWrap.addEventListener('mouseleave', stopPreview);
            btn.addEventListener('focus', startPreview);
            btn.addEventListener('blur', stopPreview);
            btn.addEventListener('click', stopPreview);
        }

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (!src) return;
            try {
                const instance = GLightbox({
                    autoplayVideos: false,
                    elements: [{ href: src, type: 'video' }]
                });
                instance.open();
            } catch (err) {
                window.open(src, '_blank');
            }
        });
    });
}

function setupArtisticEffects() {
    const body = document.body;
    if (!body) return;

    let progressBar = document.getElementById('scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.id = 'scroll-progress';
        body.appendChild(progressBar);
    }

    function updateScrollProgress() {
        const scrollTop = window.scrollY || window.pageYOffset;
        const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
        progressBar.style.transform = `scaleX(${progress.toFixed(4)})`;
    }

    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress);
}

const carouselData = {
    thp: [
        { src: "VTL_img/thp/Hosting experiential segments-2.png", caption: "Hosting experiential segment" },
        { src: "VTL_img/thp/Conducting field reporting to gather on-site information.jpg", caption: "Conducting field reporting to gather on-site information" },
        { src: "VTL_img/thp/Hosting experiential segments(1).png", caption: "Hosting experiential segment" },
        { src: "VTL_img/thp/Hosting experiential segments.jpg", caption: "Hosting experiential segment" },
        { src: "VTL_img/thp/Interviewing featured individuals(1).jpg", caption: "Interviewing featured individuals" },
        { src: "VTL_img/thp/Interviewing featured individuals.jpg", caption: "Interviewing featured individuals" },
        { src: "VTL_img/thp/Participated in on-stage performance at THP(1).jpg", caption: "Participated in on-stage performance at THP" },
        { src: "VTL_img/thp/Participated in on-stage performance at THP.jpg", caption: "Participated in on-stage performance at THP" },
        { src: "VTL_img/thp/Providing voice-over for videos and performing post-production editing using Adobe Premiere and CapCut PC.jpg", caption: "Providing voice-over for videos and performing post-production editing using Adobe Premiere and CapCut PC" },
        { src: "VTL_img/thp/Supported the organization of a live broadcast event at Military Region 3 Command.jpg", caption: "Supported the organization of a live broadcast event at Military Region 3 Command" },
    ],
    elcom: [
        { src: "VTL_img/elcom/2.png", caption: "Supporting communication operations, including social media scheduling and on-site coverage during events" },
        { src: "VTL_img/elcom/3.jpg", caption: "Coordinating  with departments and stakeholders to collect information and conduct interviews for communication stories" },
        { src: "VTL_img/elcom/4.jpg", caption: "Producing  multimedia communication materials, including supporting filming and photography, editing short-form videos, and designing visual assets", focusBottomHalf: true },
        { src: "VTL_img/elcom/5.png", caption: "Producing written communication content (articles, event news, project features, scripts for content series)", focusBottomHalf: true },
        { src: "VTL_img/elcom/6.jpg", caption: "Providing administrative and logistical support for communication activities when required" },
        { src: "VTL_img/elcom/7.jpg", caption: "Supporting communication operations, including social media scheduling and on-site coverage during events", focusY: 65 },
        { src: "VTL_img/elcom/8.webp", caption: "Producing  multimedia communication materials, including supporting filming and photography, editing short-form videos, and designing visual assets" }
    ]
};

let currentSlides = {
    thp: 0,
    elcom: 0
};

function renderCarousel(id) {
    const data = carouselData[id];
    const slidesContainer = document.getElementById(`${id}-carousel-slides`);
    if (!slidesContainer) return;

    let slidesHTML = data.map((item, index) => {
        const caption = typeof item.caption === 'string' ? item.caption.trim() : '';
        const hasCaption = caption.length > 0;
        return `
                <div class="carousel-slide ${index === 0 ? 'active' : ''}${hasCaption ? ' has-caption' : ' no-caption'}">
                    <div class="carousel-image-wrapper">
                        <img src="${item.src}" alt="${hasCaption ? caption : ''}" data-focus-bottom-half="${item.focusBottomHalf ? 'true' : 'false'}" data-focus-top-half="${item.focusTopHalf ? 'true' : 'false'}" data-focus-y="${item.focusY || ''}" onerror="this.onerror=null; this.src='https://placehold.co/600x300/e0e7ff/4338ca?text=Image+Error+${index + 1}'">
                    </div>
                    ${hasCaption ? `<p class="carousel-caption">${caption}</p>` : ''}
                </div>
            `;
    }).join('');
    slidesContainer.innerHTML = slidesHTML;

    slidesContainer.querySelectorAll('img').forEach(img => {
        const classifyImage = () => {
            img.classList.remove('carousel-image-portrait', 'carousel-image-landscape', 'carousel-image-bottom-half', 'carousel-image-top-half');
            img.classList.add('carousel-image-landscape');
            if (img.dataset.focusBottomHalf === 'true') {
                img.classList.add('carousel-image-bottom-half');
            }
            if (img.dataset.focusTopHalf === 'true') {
                img.classList.add('carousel-image-top-half');
            }
            if (img.dataset.focusY) {
                img.style.objectPosition = `center ${img.dataset.focusY}%`;
            }
        };
        if (img.complete) {
            classifyImage();
        } else {
            img.addEventListener('load', classifyImage, { once: true });
        }
    });
}

function navigateCarousel(id, direction) {
    const data = carouselData[id];
    let currentIndex = currentSlides[id];
    let newIndex = currentIndex + direction;

    if (newIndex < 0) {
        newIndex = data.length - 1;
    } else if (newIndex >= data.length) {
        newIndex = 0;
    }

    // TV static effect for THP only
    if (id === 'thp') {
        const staticEl = document.getElementById('tv-static-effect');
        const slides = document.querySelectorAll(`#${id}-carousel-slides .carousel-slide`);
        if (staticEl && slides.length) {
            staticEl.classList.remove('active');
            void staticEl.offsetWidth;
            staticEl.classList.add('active');
            setTimeout(() => {
                staticEl.classList.remove('active');
                slides[currentIndex].classList.remove('active');
                slides[newIndex].classList.add('active');
                currentSlides[id] = newIndex;
            }, 380);
            return;
        }
    }
    const slides = document.querySelectorAll(`#${id}-carousel-slides .carousel-slide`);
    slides[currentIndex].classList.remove('active');
    slides[newIndex].classList.add('active');
    currentSlides[id] = newIndex;
}

let carouselIntervals = {};
function startCarouselAutoplay(id, ms = 5000) {
    if (carouselIntervals[id]) clearInterval(carouselIntervals[id]);
    carouselIntervals[id] = setInterval(() => navigateCarousel(id, 1), ms);
}
function stopCarouselAutoplay(id) {
    if (carouselIntervals[id]) clearInterval(carouselIntervals[id]);
}

function initializeCarousels() {
    renderCarousel('thp');
    renderCarousel('elcom');
    initLucide();
}

const heroSection = document.getElementById('hero-section');
const heroContent = document.getElementById('hero-content');
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;

    if (heroSection) heroSection.style.backgroundPositionY = `${-scrollPosition * 0.5}px`;

    if (heroContent) {
        const opacity = 1 - (scrollPosition / 500);
        heroContent.style.opacity = opacity < 0 ? 0 : opacity;

        const scale = 1 - (scrollPosition * 0.0005);
        heroContent.style.transform = `scale(${scale < 0.8 ? 0.8 : scale})`;
    }

    if (backToTopButton) {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

let heroIntroStarted = false;
let heroIntroFinished = false;
function waitForImageReady(img, timeout = 1600) {
    if (!(img instanceof HTMLImageElement)) return Promise.resolve();
    if (img.complete && img.naturalWidth > 0) return Promise.resolve();

    return new Promise(resolve => {
        let done = false;
        const finish = () => {
            if (done) return;
            done = true;
            resolve();
        };

        img.addEventListener('load', finish, { once: true });
        img.addEventListener('error', finish, { once: true });
        setTimeout(finish, timeout);
    });
}

function getVisibleHeroImages(heroImages) {
    return heroImages.filter(el => {
        if (!(el instanceof HTMLElement)) return false;
        return window.getComputedStyle(el).display !== 'none';
    });
}

function orderHeroImagesLeftToRight(heroImages) {
    return [...heroImages].sort((a, b) => {
        const rectA = a.getBoundingClientRect();
        const rectB = b.getBoundingClientRect();
        const leftDiff = rectA.left - rectB.left;

        if (Math.abs(leftDiff) < 8) {
            return rectA.top - rectB.top;
        }

        return leftDiff;
    });
}

function startHeroIntro(heroImages) {
    if (heroIntroStarted || !heroImages.length) return;
    heroIntroStarted = true;

    const visibleImages = orderHeroImagesLeftToRight(getVisibleHeroImages(heroImages));
    const revealStep = window.innerWidth <= 768 ? 400 : (window.innerWidth <= 1024 ? 320 : 260);

    (async () => {
        for (const el of visibleImages) {
            await waitForImageReady(el, 1200);
            el.style.animationDelay = '0s';
            el.classList.add('hero-init');
            await new Promise(resolve => setTimeout(resolve, revealStep));
        }

        const toFloat = visibleImages.length ? visibleImages : heroImages;
        toFloat.forEach(el => el.classList.add('hero-float'));
        heroIntroFinished = true;
    })();
}

window.addEventListener('load', () => {
    initializeCarousels();
    initializeEffects();
    setupArtisticEffects();
    if (window.AOS && typeof AOS.refresh === 'function') {
        setTimeout(() => AOS.refresh(), 120);
    }
    const heroImages = Array.from(document.querySelectorAll('.hero-img'));
    startHeroIntro(heroImages);

    const startHeroFloat = () => {
        if (!heroIntroFinished) return;
        heroImages.forEach(el => el.classList.add('hero-float'));
        window.removeEventListener('scroll', startHeroFloat);
        window.removeEventListener('pointermove', startHeroFloat);
        window.removeEventListener('touchstart', startHeroFloat);
    };

    window.addEventListener('scroll', startHeroFloat, { passive: true, once: true });
    window.addEventListener('pointermove', startHeroFloat, { once: true });
    window.addEventListener('touchstart', startHeroFloat, { passive: true, once: true });
});

function setupCarousel(id, itemsPerPage = 4) {
    const track = document.getElementById(`track-${id}`);
    const nextBtn = document.getElementById(`next-${id}`);
    const prevBtn = document.getElementById(`prev-${id}`);
    if (!track) return;

    const items = Array.from(track.querySelectorAll('.flex-shrink-0'));
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    let currentPage = 0;

    const visibleItems = Math.max(1, Math.min(itemsPerPage, totalItems || itemsPerPage));
    const itemWidth = `${100 / visibleItems}%`;
    items.forEach((item) => {
        item.style.flex = `0 0 ${itemWidth}`;
        item.style.maxWidth = itemWidth;
    });

    function setNavHidden(hidden) {
        if (prevBtn) prevBtn.classList.toggle('hidden', hidden);
        if (nextBtn) nextBtn.classList.toggle('hidden', hidden);
    }

    if (totalItems <= itemsPerPage) {
        setNavHidden(true);
    } else {
        setNavHidden(false);
    }

    function update() {
        track.style.transform = `translateX(${-currentPage * 100}%)`;
        if (prevBtn) {
            prevBtn.disabled = currentPage === 0;
            prevBtn.classList.toggle('opacity-50', currentPage === 0);
            prevBtn.classList.toggle('cursor-not-allowed', currentPage === 0);
        }
        if (nextBtn) {
            nextBtn.disabled = currentPage >= totalPages - 1;
            nextBtn.classList.toggle('opacity-50', currentPage >= totalPages - 1);
            nextBtn.classList.toggle('cursor-not-allowed', currentPage >= totalPages - 1);
        }
    }

    function openImageZoom(src, alt) {
        const overlay = document.createElement('div');
        overlay.className = 'image-zoom-overlay';
        overlay.tabIndex = -1;

        const img = document.createElement('img');
        img.alt = alt || '';

        const caption = document.createElement('div');
        caption.className = 'image-zoom-caption';
        caption.textContent = alt || '';

        function close() {
            if (!overlay) return;
            overlay.classList.add('hidden');
            setTimeout(() => {
                if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            }, 220);
            window.removeEventListener('keydown', onKey);
        }

        function onKey(e) {
            if (e.key === 'Escape') close();
        }

        overlay.addEventListener('click', close);
        window.addEventListener('keydown', onKey);

        img.style.opacity = '0';
        img.style.transform = 'scale(0.98)';
        img.style.transition = 'transform 320ms cubic-bezier(.2,.9,.2,1), opacity 220ms ease';
        overlay.appendChild(img);
        if (caption.textContent.trim()) {
            overlay.appendChild(caption);
        }
        document.body.appendChild(overlay);

        const pre = new Image();
        pre.onload = function () {
            const naturalW = pre.naturalWidth || pre.width;
            const naturalH = pre.naturalHeight || pre.height;
            const multiplier = 3.5;
            const maxVW = Math.max(window.innerWidth * 0.98, 200);
            const maxVH = Math.max(window.innerHeight * 0.98, 200);
            let desiredW = naturalW * multiplier;
            let desiredH = naturalH * multiplier;
            const clampRatio = Math.min(1, maxVW / desiredW, maxVH / desiredH);
            desiredW = Math.round(desiredW * clampRatio);
            desiredH = Math.round(desiredH * clampRatio);
            img.src = src;
            img.style.width = desiredW + 'px';
            img.style.height = desiredH + 'px';
            img.style.maxWidth = '98vw';
            img.style.maxHeight = '98vh';
            requestAnimationFrame(() => {
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
            });
        };
        pre.onerror = function () {
            img.src = src;
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        };
        pre.src = src;
    }

    Array.from(track.querySelectorAll('img')).forEach(imgEl => {
        imgEl.style.cursor = 'zoom-in';
        imgEl.addEventListener('click', () => {
            openImageZoom(imgEl.dataset.large || imgEl.src, '');
        });
    });

    if (id === '3e') {
        const images = Array.from(track.querySelectorAll('img'));
        images.forEach((imgEl, index) => {
            if (index >= 2) {
                imgEl.style.objectPosition = 'center 80%';
            } else {
                imgEl.style.objectPosition = '';
            }
        });
    }

    if (totalItems > itemsPerPage) {
        if (nextBtn) nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages - 1) { currentPage++; update(); }
        });
        if (prevBtn) prevBtn.addEventListener('click', () => {
            if (currentPage > 0) { currentPage--; update(); }
        });
    }

    update();
}

function setupLogosScroll() {
    const track = document.getElementById('logos-track');
    if (!track) return;

    const logosHTML = track.innerHTML;
    track.innerHTML = logosHTML + logosHTML;

    let position = 0;
    const speed = 90;
    let lastTime = performance.now();
    let isHovered = false;

    function animate(currentTime) {
        if (!isHovered) {
            const deltaTime = (currentTime - lastTime) / 1000;
            lastTime = currentTime;

            position -= speed * deltaTime;

            const trackWidth = track.scrollWidth / 2;
            if (Math.abs(position) >= trackWidth) {
                position = 0;
            }

            track.style.transform = `translateX(${position}px)`;
        }

        requestAnimationFrame(animate);
    }

    // Pause on hover
    track.addEventListener('mouseenter', () => {
        isHovered = true;
    });

    track.addEventListener('mouseleave', () => {
        isHovered = false;
        lastTime = performance.now();
    });

    // Start animation
    requestAnimationFrame(animate);
}

function setupInterpreterZoom() {
    const links = Array.from(document.querySelectorAll('.inter-showcase .inter-photo-link'));
    if (!links.length) return;

    function openImageZoom(src, alt) {
        const overlay = document.createElement('div');
        overlay.className = 'image-zoom-overlay';
        overlay.tabIndex = -1;

        const img = document.createElement('img');
        img.alt = alt || '';

        const caption = document.createElement('div');
        caption.className = 'image-zoom-caption';
        caption.textContent = alt || '';

        function close() {
            if (!overlay) return;
            overlay.classList.add('hidden');
            setTimeout(() => {
                if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            }, 220);
            window.removeEventListener('keydown', onKey);
        }

        function onKey(e) {
            if (e.key === 'Escape') close();
        }

        overlay.addEventListener('click', close);
        window.addEventListener('keydown', onKey);

        img.style.opacity = '0';
        img.style.transform = 'scale(0.98)';
        img.style.transition = 'transform 320ms cubic-bezier(.2,.9,.2,1), opacity 220ms ease';
        overlay.appendChild(img);
        if (caption.textContent.trim()) {
            overlay.appendChild(caption);
        }
        document.body.appendChild(overlay);

        const pre = new Image();
        pre.onload = function () {
            const naturalW = pre.naturalWidth || pre.width;
            const naturalH = pre.naturalHeight || pre.height;
            const multiplier = 3.5;
            const maxVW = Math.max(window.innerWidth * 0.98, 200);
            const maxVH = Math.max(window.innerHeight * 0.98, 200);
            let desiredW = naturalW * multiplier;
            let desiredH = naturalH * multiplier;
            const clampRatio = Math.min(1, maxVW / desiredW, maxVH / desiredH);
            desiredW = Math.round(desiredW * clampRatio);
            desiredH = Math.round(desiredH * clampRatio);
            img.src = src;
            img.style.width = desiredW + 'px';
            img.style.height = desiredH + 'px';
            img.style.maxWidth = '98vw';
            img.style.maxHeight = '98vh';
            requestAnimationFrame(() => {
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
            });
        };
        pre.onerror = function () {
            img.src = src;
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        };
        pre.src = src;
    }

    links.forEach((link) => {
        const img = link.querySelector('img');
        if (img) {
            img.style.cursor = 'zoom-in';
        }

        link.addEventListener('click', (e) => {
            e.preventDefault();
            const src = link.getAttribute('href');
            if (!src) return;
            openImageZoom(src, '');
        });
    });
}

function setupStaticImageZoom() {
    const images = Array.from(document.querySelectorAll('.js-static-zoom'));
    if (!images.length) return;

    function openImageZoom(src, alt) {
        const overlay = document.createElement('div');
        overlay.className = 'image-zoom-overlay';
        overlay.tabIndex = -1;

        const img = document.createElement('img');
        img.alt = alt || '';

        const caption = document.createElement('div');
        caption.className = 'image-zoom-caption';
        caption.textContent = alt || '';

        function close() {
            if (!overlay) return;
            overlay.classList.add('hidden');
            setTimeout(() => {
                if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            }, 220);
            window.removeEventListener('keydown', onKey);
        }

        function onKey(e) {
            if (e.key === 'Escape') close();
        }

        overlay.addEventListener('click', close);
        window.addEventListener('keydown', onKey);

        img.style.opacity = '0';
        img.style.transform = 'scale(0.98)';
        img.style.transition = 'transform 320ms cubic-bezier(.2,.9,.2,1), opacity 220ms ease';
        overlay.appendChild(img);
        if (caption.textContent.trim()) {
            overlay.appendChild(caption);
        }
        document.body.appendChild(overlay);

        const pre = new Image();
        pre.onload = function () {
            const naturalW = pre.naturalWidth || pre.width;
            const naturalH = pre.naturalHeight || pre.height;
            const multiplier = 3.5;
            const maxVW = Math.max(window.innerWidth * 0.98, 200);
            const maxVH = Math.max(window.innerHeight * 0.98, 200);
            let desiredW = naturalW * multiplier;
            let desiredH = naturalH * multiplier;
            const clampRatio = Math.min(1, maxVW / desiredW, maxVH / desiredH);
            desiredW = Math.round(desiredW * clampRatio);
            desiredH = Math.round(desiredH * clampRatio);
            img.src = src;
            img.style.width = desiredW + 'px';
            img.style.height = desiredH + 'px';
            img.style.maxWidth = '98vw';
            img.style.maxHeight = '98vh';
            requestAnimationFrame(() => {
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
            });
        };
        pre.onerror = function () {
            img.src = src;
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        };
        pre.src = src;
    }

    images.forEach((img) => {
        img.addEventListener('click', () => {
            openImageZoom(img.currentSrc || img.src, '');
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    startHeroIntro(Array.from(document.querySelectorAll('.hero-img')));
    setupCarousel('3h');
    setupCarousel('3c', 3);
    setupCarousel('3i', 1);
    setupCarousel('3j', 3);
    setupLogosScroll();
    setupInterpreterZoom();
    setupStaticImageZoom();
});

(function () {
    function animateCount(el, target, duration) {
        const start = 1;
        const change = target - start;
        const startTime = performance.now();

        function step(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(start + change * progress);
            el.textContent = String(current);

            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = String(target);
        }

        requestAnimationFrame(step);
    }

    function initCountUps() {
        const nodes = document.querySelectorAll('.count-up');
        if (!nodes.length) return;

        const obs = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const target = Math.max(0, parseInt(el.dataset.target, 10) || 0);
                const duration = Math.min(900, Math.max(500, Math.round(350 + target * 10)));
                el.textContent = '1';
                animateCount(el, target, duration);
                if (el.closest('.creator-stat-item') && el.closest('.creator-stat-item').querySelector('.creator-stat-label')?.textContent?.trim() === 'Reach') {
                    setTimeout(function () {
                        var eng = document.getElementById('creator-engagement-rate');
                        if (eng) {
                            eng.style.opacity = 1;
                            eng.style.transform = 'scale(1.15)';
                            setTimeout(function () {
                                eng.style.transform = 'scale(1)';
                            }, 350);
                        }
                    }, duration + 100);
                }
                observer.unobserve(el);
            });
        }, {
            threshold: 0.25,
            rootMargin: '0px 0px -8% 0px'
        });

        nodes.forEach(n => {
            n.textContent = '1';
            obs.observe(n);
        });
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initCountUps();
    } else {
        document.addEventListener('DOMContentLoaded', initCountUps, { once: true });
    }
})();