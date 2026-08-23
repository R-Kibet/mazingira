document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.getElementById('nav-toggle');
    var nav = document.getElementById('main-nav');

    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            var isOpen = nav.classList.toggle('open');
            toggle.classList.toggle('open', isOpen);
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // Close the mobile menu after tapping a link
        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                nav.classList.remove('open');
                toggle.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            });
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

    // Gallery auto-slider
    var track = document.getElementById('gallery-track');
    var slider = document.getElementById('gallery-slider');
    if (track && slider) {
        var slides = track.querySelectorAll('.gallery-slide');
        var dots = document.querySelectorAll('.gallery-dot');
        var prevBtn = document.getElementById('gallery-prev');
        var nextBtn = document.getElementById('gallery-next');
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
            autoTimer = setInterval(next, autoDelay);
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
    }
});