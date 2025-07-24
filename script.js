// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuOverlay.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link or button
const mobileNavItems = document.querySelectorAll('.mobile-nav-link, .mobile-menu-content .btn');
mobileNavItems.forEach(item => {
    item.addEventListener('click', () => {
        mobileMenuOverlay.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenuOverlay.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        mobileMenuOverlay.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
// Benefits scroll animation
function initBenefitsScroll() {
    const benefitItems = document.querySelectorAll('.benefit-item');
    const benefitImages = document.querySelectorAll('.benefit-img');
    
    // Activer la première image par défaut
    if (benefitImages.length > 0) {
        benefitImages[0].classList.add('active');
    }
    
    const benefitsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trouver l'index de l'item actuel
                const currentIndex = Array.from(benefitItems).indexOf(entry.target);
                
                // Masquer tous les autres items de texte
                benefitItems.forEach(item => {
                    if (item !== entry.target) {
                        item.classList.remove('visible');
                    }
                });
                
                // Afficher l'item de texte actuel
                entry.target.classList.add('visible');
                
                // Gérer les images : toutes en gris sauf celle correspondante
                benefitImages.forEach((img, index) => {
                    if (index === currentIndex) {
                        img.classList.add('active');
                    } else {
                        img.classList.remove('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-20% 0px -20% 0px'
    });

    benefitItems.forEach(item => {
        benefitsObserver.observe(item);
    });
}

// Intersection Observer for other scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation (excluding benefit-items which have their own logic)
const animateElements = document.querySelectorAll('.feature-card, .faq-item');
animateElements.forEach(el => observer.observe(el));

// Initialize benefits scroll when DOM is loaded
document.addEventListener('DOMContentLoaded', initBenefitsScroll);

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    .feature-card,
    .benefit-item,
    .faq-item {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});