document.addEventListener('DOMContentLoaded', () => {
    // Prevent iframe recursion
    if (window.location.search.includes('embed=true')) {
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual) heroVisual.style.display = 'none';
        const cookieBanner = document.getElementById('cookie-banner');
        if (cookieBanner) cookieBanner.style.display = 'none';
        document.body.style.overflow = 'hidden';
    }

    // 1. Scroll Reveal functionality
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    setTimeout(revealOnScroll, 100);
    window.addEventListener('scroll', revealOnScroll);

    // 2. Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = 70;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // 4. Apple-style 3D Hover effect on Portfolio Cards
    const cards3D = document.querySelectorAll('.3d-card');
    cards3D.forEach(card => {
        const mockup = card.querySelector('.portfolio-mockup');
        if (!mockup) return;

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            mockup.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            mockup.style.transition = 'none';
        });

        card.addEventListener('mouseleave', () => {
            mockup.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            mockup.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
        });
    });

    // 5. Animated Number Counters
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const animateNumbers = () => {
        if (hasAnimated) return;
        
        const triggerBottom = window.innerHeight * 0.8;
        let shouldAnimate = false;

        statNumbers.forEach(stat => {
            const statTop = stat.getBoundingClientRect().top;
            if (statTop < triggerBottom) {
                shouldAnimate = true;
            }
        });

        if (shouldAnimate) {
            hasAnimated = true;
            statNumbers.forEach(stat => {
                const target = +stat.getAttribute('data-target');
                const duration = 2000; // ms
                const increment = target / (duration / 16); // 60fps
                
                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        stat.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.innerText = target;
                    }
                };
                updateCounter();
            });
        }
    };

    window.addEventListener('scroll', animateNumbers);

    // 6. Reservar Demo — scroll to top
    const reservarBtn = document.getElementById('btn-reservar-demo');
    if (reservarBtn) {
        reservarBtn.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 7. Cookie Consent Banner
    const cookieBanner = document.getElementById('cookie-banner');
    const cookieAccept = document.getElementById('cookie-accept');
    const cookieReject = document.getElementById('cookie-reject');

    if (cookieBanner) {
        let cookieChoice = null;
        try {
            cookieChoice = localStorage.getItem('cookie-consent');
        } catch (e) {
            console.warn('Storage blocked:', e);
        }

        if (cookieChoice) {
            // User already made a choice, hide banner immediately
            cookieBanner.style.display = 'none';
        }

        if (cookieAccept) {
            cookieAccept.addEventListener('click', () => {
                try {
                    localStorage.setItem('cookie-consent', 'accepted');
                } catch (e) {
                    console.warn('Storage blocked:', e);
                }
                cookieBanner.style.display = 'none';
            });
        }

        if (cookieReject) {
            cookieReject.addEventListener('click', () => {
                try {
                    localStorage.setItem('cookie-consent', 'rejected');
                } catch (e) {
                    console.warn('Storage blocked:', e);
                }
                cookieBanner.style.display = 'none';
            });
        }
    }
});
