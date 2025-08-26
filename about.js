// About Page Specific JavaScript

// Timeline Animation on Scroll
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = entry.target.querySelector('.timeline-content').style.marginLeft ? 'translateX(50px)' : 'translateX(-50px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, 100);
                
                timelineObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// Values Cards Animation
function initValuesAnimation() {
    const valueCards = document.querySelectorAll('.value-card');
    
    const valuesObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }, 100);
                
                valuesObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    valueCards.forEach(card => {
        valuesObserver.observe(card);
    });
}

// Founders Cards Hover Effect
function initFoundersCards() {
    const founderCards = document.querySelectorAll('.founder-card');
    
    founderCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Stats Counter Animation
function initStatsCounter() {
    const stats = document.querySelectorAll('.about-stats .stat-value');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = target.textContent;
                
                if (value === '2013') {
                    animateValue(target, 2000, 2013, 1500);
                } else if (value === '2') {
                    animateValue(target, 0, 2, 1000);
                } else if (value === '100%') {
                    animatePercentage(target, 0, 100, 1500);
                }
                
                statsObserver.unobserve(target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Animate numeric value
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            element.textContent = end;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Animate percentage value
function animatePercentage(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end + '%';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '%';
        }
    }, 16);
}

// Hero Section Parallax Effect
function initHeroParallax() {
    const heroVisual = document.querySelector('.about-hero-visual');
    
    if (heroVisual) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (scrolled < window.innerHeight) {
                heroVisual.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }
}

// Initialize all animations when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initTimelineAnimation();
    initValuesAnimation();
    initFoundersCards();
    initStatsCounter();
    initHeroParallax();
    
    // Smooth fade-in for hero content
    const heroContent = document.querySelector('.about-hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});