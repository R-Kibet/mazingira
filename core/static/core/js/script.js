document.addEventListener('DOMContentLoaded', function () {

    // Scroll-reveal (fade-up / fade-in) — applies to any .reveal element
    (function () {
        var prefersReducedMotion = window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Auto-stagger: give direct .reveal children of a .reveal-group
        // an incrementing data-delay so cards/rows cascade in.
        document.querySelectorAll('.reveal-group').forEach(function (group) {
            var children = group.querySelectorAll(':scope > .reveal');
            children.forEach(function (child, i) {
                if (!child.hasAttribute('data-delay')) {
                    child.setAttribute('data-delay', i * 90);
                }
            });
        });

        var revealEls = document.querySelectorAll('.reveal');
        if (!revealEls.length) return;

        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            revealEls.forEach(function (el) { el.classList.add('is-visible'); });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var el = entry.target;
                    var delay = el.getAttribute('data-delay');
                    if (delay) {
                        el.style.transitionDelay = delay + 'ms';
                    }
                    el.classList.add('is-visible');
                    observer.unobserve(el);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -60px 0px'
        });

        revealEls.forEach(function (el) { observer.observe(el); });
    })();

    // Counter-up — animates numbers with data-count-to when revealed
    (function () {
        var counters = document.querySelectorAll('[data-count-to]');
        if (!counters.length) return;

        var prefersReducedMotion = window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        function animateCounter(el) {
            var target = parseFloat(el.getAttribute('data-count-to'));
            var suffix = el.getAttribute('data-count-suffix') || '';
            var noGroup = el.hasAttribute('data-count-no-group');
            var duration = 2200;
            var start = null;

            function format(n) {
                return noGroup ? String(n) : n.toLocaleString();
            }

            if (prefersReducedMotion || isNaN(target)) {
                el.textContent = format(target) + suffix;
                return;
            }

            function step(timestamp) {
                if (!start) start = timestamp;
                var progress = Math.min((timestamp - start) / duration, 1);
                var eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
                var current = Math.floor(eased * target);
                el.textContent = format(current) + suffix;
                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    el.textContent = format(target) + suffix;
                }
            }
            requestAnimationFrame(step);
        }

        if (!('IntersectionObserver' in window)) {
            counters.forEach(animateCounter);
            return;
        }

        var counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        counters.forEach(function (el) { counterObserver.observe(el); });
    })();

    // Marquee — duplicates the track content once so the CSS scroll
    // animation (translateX -50%) loops seamlessly with no visible seam.
    document.querySelectorAll('.marquee-track').forEach(function (track) {
        if (track.dataset.duplicated) return;
        var clone = track.innerHTML;
        track.insertAdjacentHTML('beforeend', clone);
        track.dataset.duplicated = 'true';
    });

    // Back-to-top button — shows after scrolling down, scrolls to top on click
    var backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        var showAfter = 480;
        window.addEventListener('scroll', function () {
            backToTop.classList.toggle('visible', window.scrollY > showAfter);
        });
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    var toggle = document.getElementById('nav-toggle');
    var nav = document.getElementById('main-nav');

    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            var isOpen = nav.classList.toggle('open');
            toggle.classList.toggle('open', isOpen);
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            if (!isOpen) {
                closeProgramsDropdown();
            }

        });

        // Close the mobile menu after tapping a link
        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                nav.classList.remove('open');
                toggle.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
                closeProgramsDropdown();
            });
        });
    }

        // Header "Programs" dropdown
    var programsDropdown = document.getElementById('programs-dropdown');
    var programsToggle = document.getElementById('programs-toggle');
 
    function closeProgramsDropdown() {
        if (programsDropdown && programsToggle) {
            programsDropdown.classList.remove('open');
            programsToggle.setAttribute('aria-expanded', 'false');
        }
    }
 
    if (programsDropdown && programsToggle) {
        programsToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            var isOpen = programsDropdown.classList.toggle('open');
            programsToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
 
        // Click anywhere outside the dropdown closes it
        document.addEventListener('click', function (e) {
            if (!programsDropdown.contains(e.target)) {
                closeProgramsDropdown();
            }
        });
 
        // Escape key closes it
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeProgramsDropdown();
            }
        });
    }


    // Marathon countdown timer — targets 10 Oct 2026, 7:00 AM EAT
    var countdownEl = document.getElementById('marathon-countdown');
    if (countdownEl) {
        var targetDate = new Date('2026-10-10T07:00:00+03:00').getTime();

        var daysEl = countdownEl.querySelector('[data-unit="days"]');
        var hoursEl = countdownEl.querySelector('[data-unit="hours"]');
        var minutesEl = countdownEl.querySelector('[data-unit="minutes"]');
        var secondsEl = countdownEl.querySelector('[data-unit="seconds"]');

        function pad(num) {
            return String(num).padStart(2, '0');
        }

        function updateCountdown() {
            var now = new Date().getTime();
            var distance = targetDate - now;

            if (distance <= 0) {
                daysEl.textContent = '00';
                hoursEl.textContent = '00';
                minutesEl.textContent = '00';
                secondsEl.textContent = '00';
                clearInterval(timerId);
                return;
            }

            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            daysEl.textContent = pad(days);
            hoursEl.textContent = pad(hours);
            minutesEl.textContent = pad(minutes);
            secondsEl.textContent = pad(seconds);
        }

        updateCountdown();
        var timerId = setInterval(updateCountdown, 1000);
    }

    // Gallery auto-slider — supports multiple independent galleries per page
    document.querySelectorAll('.gallery-slider').forEach(function (slider) {
        var track = slider.querySelector('.gallery-track');
        if (!track) return;

        var section = slider.closest('.gallery');
        var slides = track.querySelectorAll('.gallery-slide');
        var dots = section
            ? section.querySelectorAll('.gallery-dot')
            : slider.parentElement.querySelectorAll('.gallery-dot');
        var prevBtn = slider.querySelector('.gallery-nav-prev');
        var nextBtn = slider.querySelector('.gallery-nav-next');
        var current = 0;
        var autoDelay = 3500;
        var autoTimer = null;

        function slidesPerView() {
            var w = window.innerWidth;
            if (w <= 420) return 1;
            if (w <= 720) return 2;
            if (w <= 1024) return 3;
            return 4;
        }

        function maxIndex() {
            return Math.max(slides.length - slidesPerView(), 0);
        }

        function goTo(index) {
            var max = maxIndex();
            if (index > max) index = 0;
            if (index < 0) index = max;
            current = index;
            var slideWidthPct = 100 / slidesPerView();
            track.style.transform = 'translateX(-' + (current * slideWidthPct) + '%)';

            dots.forEach(function (dot, i) {
                dot.classList.toggle('active', i === current);
            });
        }

        function next() { goTo(current + 1); }
        function prev() { goTo(current - 1); }

        function startAuto() {
            stopAuto();
            if (slides.length > slidesPerView()) {
                autoTimer = setInterval(next, autoDelay);
            }
        }
        function stopAuto() {
            if (autoTimer) clearInterval(autoTimer);
        }

        if (nextBtn) nextBtn.addEventListener('click', function () { next(); startAuto(); });
        if (prevBtn) prevBtn.addEventListener('click', function () { prev(); startAuto(); });

        dots.forEach(function (dot) {
            dot.addEventListener('click', function () {
                goTo(parseInt(dot.dataset.index, 10));
                startAuto();
            });
        });

        slider.addEventListener('mouseenter', stopAuto);
        slider.addEventListener('mouseleave', startAuto);

        window.addEventListener('resize', function () {
            goTo(0);
        });

        goTo(0);
        startAuto();
    });


    // Newsletter subscribe (Mailchimp via Django backend)
    var newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        var newsletterMessage = document.getElementById('newsletter-message');
        var newsletterSubmit = newsletterForm.querySelector('.newsletter-submit');

        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var formData = new FormData(newsletterForm);
            var csrfToken = newsletterForm.querySelector('[name=csrfmiddlewaretoken]').value;

            newsletterMessage.textContent = '';
            newsletterMessage.classList.remove('is-error', 'is-success');
            newsletterSubmit.disabled = true;
            newsletterSubmit.textContent = 'Subscribing…';

            fetch(newsletterForm.dataset.action, {
                method: 'POST',
                headers: { 'X-CSRFToken': csrfToken },
                body: formData,
            })
                .then(function (response) {
                    return response.json().then(function (data) {
                        return { ok: response.ok, data: data };
                    });
                })
                .then(function (result) {
                    newsletterMessage.textContent = result.data.message;
                    newsletterMessage.classList.add(result.ok ? 'is-success' : 'is-error');
                    if (result.ok) newsletterForm.reset();
                })
                .catch(function () {
                    newsletterMessage.textContent = 'Something went wrong. Please try again.';
                    newsletterMessage.classList.add('is-error');
                })
                .finally(function () {
                    newsletterSubmit.disabled = false;
                    newsletterSubmit.textContent = 'Subscribe';
                });
        });
    }
});