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

// Benefits Mobile scroll animation
function initBenefitsMobile() {
    const mobileBenefitItems = document.querySelectorAll('.mobile-benefit-item');
    const mobileBenefitImgs = document.querySelectorAll('.mobile-benefit-img');
    
    if (mobileBenefitItems.length === 0) return; // Pas de section mobile
    
    // Activer la première image et le premier texte par défaut
    if (mobileBenefitImgs.length > 0) {
        mobileBenefitImgs[0].classList.add('active');
    }
    if (mobileBenefitItems.length > 0) {
        mobileBenefitItems[0].classList.add('visible');
    }
    
    // Observer pour changer d'image selon le scroll (dans les deux sens)
    const changeImageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const currentIndex = Array.from(mobileBenefitItems).indexOf(entry.target);
            
            if (entry.isIntersecting) {
                // Élément entre dans la zone - activer son image et son texte
                mobileBenefitImgs.forEach((img, index) => {
                    if (index === currentIndex) {
                        img.classList.add('active');
                    } else {
                        img.classList.remove('active');
                    }
                });
                mobileBenefitItems.forEach((item, index) => {
                    if (index === currentIndex) {
                        item.classList.add('visible');
                    } else {
                        item.classList.remove('visible');
                    }
                });
            } else {
                // Élément sort de la zone - vérifier quelle image et texte activer
                const rect = entry.boundingClientRect;
                const isScrollingUp = rect.top > window.innerHeight * 0.08;
                
                if (isScrollingUp && currentIndex > 0) {
                    // Scroll vers le haut - activer l'image et texte précédents
                    const prevIndex = currentIndex - 1;
                    mobileBenefitImgs.forEach((img, index) => {
                        if (index === prevIndex) {
                            img.classList.add('active');
                        } else {
                            img.classList.remove('active');
                        }
                    });
                    mobileBenefitItems.forEach((item, index) => {
                        if (index === prevIndex) {
                            item.classList.add('visible');
                        } else {
                            item.classList.remove('visible');
                        }
                    });
                } else if (!isScrollingUp && currentIndex < mobileBenefitItems.length - 1) {
                    // Scroll vers le bas - activer l'image et texte suivants
                    const nextIndex = currentIndex + 1;
                    mobileBenefitImgs.forEach((img, index) => {
                        if (index === nextIndex) {
                            img.classList.add('active');
                        } else {
                            img.classList.remove('active');
                        }
                    });
                    mobileBenefitItems.forEach((item, index) => {
                        if (index === nextIndex) {
                            item.classList.add('visible');
                        } else {
                            item.classList.remove('visible');
                        }
                    });
                }
            }
        });
    }, {
        threshold: 0.01,
        rootMargin: '0px'
    });

    mobileBenefitItems.forEach(item => {
        changeImageObserver.observe(item);
    });
    
    // Cache toujours visible - pas besoin de JavaScript
}

// Initialize benefits scroll when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initBenefitsScroll(); // Desktop
    initBenefitsMobile(); // Mobile
    initProductSwitch(); // Product page switch
});

// Product Switch (Tools / Conseil) - Floating Draggable
function initProductSwitch() {
    const floatingSwitch = document.getElementById('productSwitchFloating');
    const switchHalves = document.querySelectorAll('.switch-half');
    const toolsContent = document.getElementById('tools-content');
    const conseilContent = document.getElementById('conseil-content');

    if (!floatingSwitch || !toolsContent || !conseilContent) return;

    let isDragging = false;
    let dragStarted = false;
    let startX, startY, initialX, initialY;

    // Check URL hash on load and set initial glow state
    const hash = window.location.hash;
    if (hash === '#conseil') {
        switchToConseil();
    } else {
        // Default to tools-active glow
        floatingSwitch.classList.add('tools-active');
    }

    // Handle switch half clicks
    switchHalves.forEach(half => {
        half.addEventListener('click', (e) => {
            // Don't switch if we just finished dragging
            if (dragStarted) {
                dragStarted = false;
                return;
            }

            const product = half.dataset.product;
            if (product === 'conseil') {
                switchToConseil();
            } else {
                switchToTools();
            }
        });
    });

    // Drag functionality
    floatingSwitch.addEventListener('mousedown', startDrag);
    floatingSwitch.addEventListener('touchstart', startDrag, { passive: false });

    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag, { passive: false });

    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);

    function startDrag(e) {
        isDragging = true;
        dragStarted = false;
        floatingSwitch.classList.add('dragging');

        if (e.type === 'touchstart') {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        } else {
            startX = e.clientX;
            startY = e.clientY;
        }

        const rect = floatingSwitch.getBoundingClientRect();
        initialX = rect.left;
        initialY = rect.top;
    }

    function drag(e) {
        if (!isDragging) return;

        let currentX, currentY;
        if (e.type === 'touchmove') {
            currentX = e.touches[0].clientX;
            currentY = e.touches[0].clientY;
            e.preventDefault();
        } else {
            currentX = e.clientX;
            currentY = e.clientY;
        }

        const deltaX = currentX - startX;
        const deltaY = currentY - startY;

        // Only consider it a drag if moved more than 5px
        if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
            dragStarted = true;
        }

        let newX = initialX + deltaX;
        let newY = initialY + deltaY;

        // Keep within viewport bounds
        const switchWidth = floatingSwitch.offsetWidth;
        const switchHeight = floatingSwitch.offsetHeight;
        const maxX = window.innerWidth - switchWidth;
        const maxY = window.innerHeight - switchHeight;

        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        floatingSwitch.style.left = newX + 'px';
        floatingSwitch.style.top = newY + 'px';
        floatingSwitch.style.right = 'auto';
        floatingSwitch.style.bottom = 'auto';
    }

    function endDrag() {
        if (!isDragging) return;
        isDragging = false;
        floatingSwitch.classList.remove('dragging');

        // Reset dragStarted after a small delay to allow click to be ignored
        if (dragStarted) {
            setTimeout(() => {
                dragStarted = false;
            }, 100);
        }
    }

    // Handle hash change
    window.addEventListener('hashchange', () => {
        if (window.location.hash === '#conseil') {
            switchToConseil();
        } else if (window.location.hash === '#tools' || window.location.hash === '') {
            switchToTools();
        }
    });

    function switchToTools() {
        switchHalves.forEach(h => h.classList.remove('active'));
        document.querySelector('.switch-tools').classList.add('active');
        toolsContent.classList.add('active');
        conseilContent.classList.remove('active');
        // Update glow effect
        floatingSwitch.classList.remove('conseil-active');
        floatingSwitch.classList.add('tools-active');
        // Update navbar mode
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.classList.remove('conseil-mode');
        }
        history.replaceState(null, null, window.location.pathname);
    }

    function switchToConseil() {
        switchHalves.forEach(h => h.classList.remove('active'));
        document.querySelector('.switch-conseil').classList.add('active');
        conseilContent.classList.add('active');
        toolsContent.classList.remove('active');
        // Update glow effect
        floatingSwitch.classList.remove('tools-active');
        floatingSwitch.classList.add('conseil-active');
        // Update navbar mode
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.classList.add('conseil-mode');
        }
        history.replaceState(null, null, '#conseil');
    }
}

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