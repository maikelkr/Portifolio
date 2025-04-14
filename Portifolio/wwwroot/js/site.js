document.addEventListener('DOMContentLoaded', function () {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const toggleSwitch = document.querySelector('#checkbox');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.body.classList.add(currentTheme);
        if (currentTheme === 'dark-mode') {
            toggleSwitch.checked = true;
        }
    }
    function switchTheme(e) {
        if (e.target.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', '');
        }
    }
    toggleSwitch.addEventListener('change', switchTheme);
    function updateThemeText() {
        const themeText = document.querySelector('.theme-text');
        if (document.body.classList.contains('dark-mode')) {
            themeText.textContent = 'Modo Claro';
        } else {
            themeText.textContent = 'Modo Escuro';
        }
    }
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.attributeName === 'class') {
                updateThemeText();
            }
        });
    });

    observer.observe(document.body, {
        attributes: true
    });
    updateThemeText();

    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function () {
            navbarCollapse.style.display =
                navbarCollapse.style.display === 'block' ? 'none' : 'block';
        });
    }
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                if (navbarCollapse && navbarCollapse.style.display === 'block') {
                    navbarCollapse.style.display = 'none';
                }
            }
        });
    });

    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.project-card, .tech-item');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});