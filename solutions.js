// Solutions Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(element => {
        observer.observe(element);
    });

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-solutions');
    const shapes = document.querySelectorAll('.shape');
    
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled < window.innerHeight) {
                shapes.forEach((shape, index) => {
                    const speed = 0.5 + (index * 0.1);
                    shape.style.transform = `translateY(${scrolled * speed}px)`;
                });
            }
        });
    }

    // Hover effect on diagram points
    const diagramPoints = document.querySelectorAll('.point');
    
    diagramPoints.forEach(point => {
        point.addEventListener('mouseenter', function() {
            const title = this.getAttribute('data-title');
            if (title) {
                const tooltip = document.createElement('div');
                tooltip.className = 'point-tooltip';
                tooltip.textContent = title;
                tooltip.style.cssText = `
                    position: absolute;
                    background: #0099FF;
                    color: white;
                    padding: 8px 12px;
                    border-radius: 8px;
                    font-size: 14px;
                    white-space: nowrap;
                    top: -40px;
                    left: 50%;
                    transform: translateX(-50%);
                    animation: fadeIn 0.3s ease;
                `;
                this.appendChild(tooltip);
            }
        });
        
        point.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.point-tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 100; // Account for fixed navbar
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Dynamic background animation
    const animatedBg = document.querySelector('.animated-bg');
    if (animatedBg) {
        // Create additional animated elements
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particle-float ${Math.random() * 10 + 10}s linear infinite;
            `;
            animatedBg.appendChild(particle);
        }
    }

    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particle-float {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    // Schema image interaction
    const schemaImg = document.querySelector('.schema-img');
    if (schemaImg) {
        schemaImg.addEventListener('mouseenter', () => {
            schemaImg.style.transform = 'scale(1.05)';
        });
        
        schemaImg.addEventListener('mouseleave', () => {
            schemaImg.style.transform = 'scale(1)';
        });
    }

    // Engagement cards hover effect
    const engagementCards = document.querySelectorAll('.engagement-card');
    engagementCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateY(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateY(0)';
        });
    });

    // Benefits section animation
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            ripple.style.cssText = `
                position: absolute;
                width: 100%;
                height: 100%;
                background: radial-gradient(circle, rgba(0, 153, 255, 0.3) 0%, transparent 70%);
                border-radius: 20px;
                top: 0;
                left: 0;
                animation: ripple-effect 0.6s ease-out;
                pointer-events: none;
            `;
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple-effect {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(1.5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // CTA buttons animation
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 300) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // Add active class to current nav link
    const currentPath = window.location.pathname;
    if (currentPath.includes('solutions')) {
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.getAttribute('href') === 'solutions.html') {
                link.classList.add('active');
            }
        });
    }

    // Mobile menu specific for solutions page
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    
    if (mobileMenuToggle && mobileMenuOverlay) {
        // Close menu when clicking on a nav link
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }

    // Floating animation for images
    const floatingElements = document.querySelectorAll('.floating');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });

    // Counter animation for statistics
    const animateCounter = (element, target, duration = 2000) => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    };

    // Initialize counters when in viewport
    const counters = document.querySelectorAll('[data-counter]');
    counters.forEach(counter => {
        const observerCounter = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    const target = parseInt(entry.target.getAttribute('data-counter'));
                    animateCounter(entry.target, target);
                }
            });
        });
        observerCounter.observe(counter);
    });
});