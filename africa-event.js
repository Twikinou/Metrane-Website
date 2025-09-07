// Africa Event Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Gestion des cartes flottantes pour qu'elles restent au premier plan
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Retirer la classe hovered de toutes les cartes
            floatingCards.forEach(c => c.classList.remove('hovered'));
            // Ajouter la classe hovered à la carte survolée
            this.classList.add('hovered');
        });
    });
    
    // Mobile menu toggle (using same system as main page)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    
    if (mobileMenuToggle && mobileMenuOverlay) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            mobileMenuOverlay.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking on overlay
        mobileMenuOverlay.addEventListener('click', function(e) {
            if (e.target === mobileMenuOverlay) {
                mobileMenuToggle.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });

        // Close menu when clicking on a nav link
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }

    // Video interactions
    const videoContainer = document.querySelector('.video-container');
    const video = document.querySelector('.event-video');
    const playBtn = document.querySelector('.play-btn');
    const fullscreenBtn = document.querySelector('.fullscreen-btn');
    const pipBtn = document.querySelector('.pip-btn');
    const videoOverlay = document.querySelector('.video-overlay');

    if (video && videoContainer) {
        // Play/pause on hover
        videoContainer.addEventListener('mouseenter', () => {
            video.play();
            videoOverlay.style.opacity = '0';
        });

        videoContainer.addEventListener('mouseleave', () => {
            video.pause();
            videoOverlay.style.opacity = '1';
        });

        // Play button click
        if (playBtn) {
            playBtn.addEventListener('click', () => {
                if (video.paused) {
                    video.play();
                    videoOverlay.style.opacity = '0';
                } else {
                    video.pause();
                    videoOverlay.style.opacity = '1';
                }
            });
        }

        // Fullscreen button
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => {
                if (video.requestFullscreen) {
                    video.requestFullscreen();
                } else if (video.webkitRequestFullscreen) {
                    video.webkitRequestFullscreen();
                } else if (video.msRequestFullscreen) {
                    video.msRequestFullscreen();
                }
            });
        }

        // Picture in Picture
        if (pipBtn && document.pictureInPictureEnabled) {
            pipBtn.addEventListener('click', async () => {
                try {
                    if (document.pictureInPictureElement) {
                        await document.exitPictureInPicture();
                    } else {
                        await video.requestPictureInPicture();
                    }
                } catch (error) {
                    console.log('PiP not supported');
                }
            });
        } else if (pipBtn) {
            pipBtn.style.display = 'none';
        }
    }

    // Photo Gallery
    const galleryTrack = document.querySelector('.gallery-track');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const prevBtn = document.querySelector('.gallery-nav.prev');
    const nextBtn = document.querySelector('.gallery-nav.next');
    const viewAllBtn = document.querySelector('.view-all-btn');
    const galleryDots = document.querySelector('.gallery-dots');
    
    let currentIndex = 0;
    const itemsPerView = window.innerWidth > 768 ? 5 : 1;
    const totalItems = galleryItems.length;
    const maxIndex = Math.max(0, totalItems - itemsPerView);

    // Create dots
    if (galleryDots && galleryItems.length > 0) {
        const dotsCount = Math.ceil(totalItems / itemsPerView);
        for (let i = 0; i < dotsCount; i++) {
            const dot = document.createElement('span');
            dot.classList.add('gallery-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateGallery();
            });
            galleryDots.appendChild(dot);
        }
    }

    function updateGallery() {
        if (galleryTrack) {
            const itemWidth = 100 / itemsPerView; // Width of each item in percentage
            const offset = currentIndex * itemWidth;
            galleryTrack.style.transform = `translateX(-${offset}%)`;
            
            // Update dots
            const dots = document.querySelectorAll('.gallery-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === Math.floor(currentIndex / 1));
            });

            // Update navigation buttons
            if (prevBtn) {
                prevBtn.disabled = currentIndex === 0;
                prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
            }
            if (nextBtn) {
                nextBtn.disabled = currentIndex >= maxIndex;
                nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
            }
        }
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex = Math.max(0, currentIndex - 1);
                updateGallery();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentIndex < maxIndex) {
                currentIndex = Math.min(maxIndex, currentIndex + 1);
                updateGallery();
            }
        });
    }

    // Initialize gallery
    updateGallery();

    // View all photos
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', () => {
            // Create modal for all photos
            const modal = document.createElement('div');
            modal.className = 'photo-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <button class="modal-close">&times;</button>
                    <div class="modal-grid">
                        ${Array.from(galleryItems).map(item => 
                            `<div class="modal-item">
                                ${item.innerHTML}
                            </div>`
                        ).join('')}
                    </div>
                </div>
            `;
            
            // Add modal styles
            const style = document.createElement('style');
            style.textContent = `
                .photo-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.9);
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                    animation: fadeIn 0.3s ease;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .modal-content {
                    background: white;
                    border-radius: 20px;
                    padding: 2rem;
                    max-width: 1200px;
                    max-height: 90vh;
                    overflow-y: auto;
                    position: relative;
                }
                .modal-close {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: none;
                    border: none;
                    font-size: 2rem;
                    cursor: pointer;
                    color: #333;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                }
                .modal-close:hover {
                    background: #f0f0f0;
                }
                .modal-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 1rem;
                    margin-top: 2rem;
                }
                .modal-item {
                    border-radius: 10px;
                    overflow: hidden;
                    aspect-ratio: 4/3;
                    cursor: pointer;
                    transition: transform 0.3s ease;
                }
                .modal-item:hover {
                    transform: scale(1.05);
                }
                .modal-item img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            `;
            document.head.appendChild(style);
            document.body.appendChild(modal);
            
            // Close modal
            modal.querySelector('.modal-close').addEventListener('click', () => {
                modal.remove();
                style.remove();
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                    style.remove();
                }
            });
        });
    }

    // Form submission
    const registrationForm = document.querySelector('.registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(registrationForm);
            const data = Object.fromEntries(formData);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <circle cx="30" cy="30" r="30" fill="#4CAF50"/>
                    <path d="M20 30L26 36L40 22" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <h3>Inscription réussie!</h3>
                <p>Nous avons bien reçu votre inscription. Un email de confirmation vous sera envoyé prochainement.</p>
            `;
            
            // Add success styles
            const style = document.createElement('style');
            style.textContent = `
                .success-message {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: white;
                    padding: 3rem;
                    border-radius: 20px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    text-align: center;
                    z-index: 10000;
                    animation: successPop 0.5s ease;
                }
                @keyframes successPop {
                    0% {
                        transform: translate(-50%, -50%) scale(0.8);
                        opacity: 0;
                    }
                    50% {
                        transform: translate(-50%, -50%) scale(1.05);
                    }
                    100% {
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 1;
                    }
                }
                .success-message svg {
                    margin-bottom: 1rem;
                }
                .success-message h3 {
                    color: #4CAF50;
                    margin-bottom: 0.5rem;
                }
                .success-message p {
                    color: #666;
                }
            `;
            document.head.appendChild(style);
            document.body.appendChild(successMessage);
            
            // Reset form
            registrationForm.reset();
            
            // Remove message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
                style.remove();
            }, 3000);
            
            // Log data (in production, send to server)
            console.log('Registration data:', data);
        });
    }

    // Smooth scroll for anchor links
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

    // Add parallax effect to hero
    const heroSection = document.querySelector('.hero-africa');
    const earthContainer = document.querySelector('.earth-container');
    
    if (heroSection && earthContainer) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled < window.innerHeight) {
                earthContainer.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // Add hover effect to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0) scale(1)';
        });
    });

    // Load all images for gallery
    const allPhotos = [
        'DSC01155.jpg', 'DSC01157.jpg', 'DSC01162.jpg', 'DSC01164.jpg', 'DSC01168.jpg',
        'DSC01169.jpg', 'DSC01172.jpg', 'DSC01176.jpg', 'DSC01177.jpg', 'DSC01179.jpg',
        'DSC01181.jpg', 'DSC01182.jpg', 'DSC01184.jpg', 'DSC01185.jpg', 'DSC01186.jpg',
        'DSC01188.jpg', 'DSC01190.jpg', 'DSC01191.jpg', 'DSC01192.jpg', 'DSC01193.jpg',
        'DSC01195.jpg', 'DSC01196.jpg', 'DSC01199.jpg', 'DSC01200.jpg', 'DSC01201.jpg',
        'DSC01204.jpg', 'DSC01210.jpg', 'DSC01211.jpg', 'DSC01213.jpg', 'DSC01214.jpg',
        'DSC01216.jpg', 'DSC01217.jpg', 'DSC01221.jpg', 'DSC01223.jpg', 'DSC01225.jpg',
        'DSC01227.jpg', 'DSC01230.jpg', 'DSC01233.jpg', 'DSC01234.jpg', 'DSC01239.jpg',
        'DSC01242.jpg', 'DSC01243.jpg', 'DSC01245.jpg', 'DSC01249.jpg', 'DSC01250.jpg',
        'DSC01253.jpg', 'DSC01259.jpg', 'DSC01262.jpg', 'DSC01267.jpg', 'DSC01270.jpg',
        'DSC01275.jpg', 'DSC01279.jpg', 'DSC01282.jpg', 'DSC01285.jpg', 'DSC01288.jpg',
        'DSC01290.jpg', 'DSC01292.jpg', 'DSC01293.jpg'
    ];

    // Update view all button to show all photos
    if (viewAllBtn && allPhotos.length > 5) {
        viewAllBtn.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.className = 'photo-modal';
            // Get current language and translations
            const currentLang = localStorage.getItem('selectedLanguage') || 'fr';
            const modalTitle = translations[currentLang]['africa.gallery.modal.title'] || 'Toutes les photos de l\'événement';
            const altText = translations[currentLang]['africa.gallery.modal.alt'] || 'Photo événement';
            
            modal.innerHTML = `
                <div class="modal-content">
                    <button class="modal-close">&times;</button>
                    <h2 style="margin-bottom: 2rem;">${modalTitle}</h2>
                    <div class="modal-grid">
                        ${allPhotos.map(photo => 
                            `<div class="modal-item">
                                <img src="assets/africa-event/photos/${photo}" alt="${altText}" loading="lazy">
                            </div>`
                        ).join('')}
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            modal.querySelector('.modal-close').addEventListener('click', () => {
                modal.remove();
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        });
    }
});