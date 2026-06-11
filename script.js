document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // Mobile Navigation Menu Toggle
    // ==========================================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const toggleIcon = navToggle.querySelector('i');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('open');
            
            // Toggle hamburger / close icon
            if (navMenu.classList.contains('open')) {
                toggleIcon.classList.remove('fa-bars');
                toggleIcon.classList.add('fa-xmark');
            } else {
                toggleIcon.classList.remove('fa-xmark');
                toggleIcon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('open');
                toggleIcon.classList.remove('fa-xmark');
                toggleIcon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking a nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                toggleIcon.classList.remove('fa-xmark');
                toggleIcon.classList.add('fa-bars');
            });
        });
    }

    // ==========================================
    // Header Style change on Scroll
    // ==========================================
    const header = document.querySelector('.header');
    
    const handleScrollHeader = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScrollHeader);
    // Initial check in case of page reload already scrolled
    handleScrollHeader();

    // ==========================================
    // Active Menu Link on Scroll
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    
    const handleActiveLinkOnScroll = () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 160; // Offset for fixed header
            const sectionId = current.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
            
            if (correspondingNavLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    correspondingNavLink.classList.add('active');
                } else {
                    correspondingNavLink.classList.remove('active');
                }
            }
        });
    };

    window.addEventListener('scroll', handleActiveLinkOnScroll);

    // ==========================================
    // Scroll Reveal (Entrance Animations)
    // ==========================================
    const revealElements = document.querySelectorAll('.scroll-reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Stagger sibling components by adding a tiny delay
                    entry.target.classList.add('reveal-visible');
                    observer.unobserve(entry.target); // Animate only once
                }
            });
        }, {
            threshold: 0.12, // Reveal when 12% is visible
            rootMargin: '0px 0px -50px 0px' // Offset slightly for better visual timing
        });

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => {
            el.classList.add('reveal-visible');
        });
    }
});
