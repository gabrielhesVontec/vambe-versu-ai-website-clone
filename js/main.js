// Main JavaScript file for Vambe AI & Versu AI combined website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initImageErrorHandling();
    initFAQ();
    initModal();
    initSmoothScrolling();
    initFormValidation();
    
    console.log('Website initialized successfully');
});

// Navigation functionality
function initNavigation() {
    try {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (navToggle && navMenu) {
            // Toggle mobile menu
            navToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                
                // Animate hamburger menu
                const bars = navToggle.querySelectorAll('.bar');
                bars.forEach((bar, index) => {
                    if (navMenu.classList.contains('active')) {
                        if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                        if (index === 1) bar.style.opacity = '0';
                        if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                    } else {
                        bar.style.transform = 'none';
                        bar.style.opacity = '1';
                    }
                });
            });

            // Close mobile menu when clicking on links
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    navMenu.classList.remove('active');
                    
                    // Reset hamburger menu
                    const bars = navToggle.querySelectorAll('.bar');
                    bars.forEach(bar => {
                        bar.style.transform = 'none';
                        bar.style.opacity = '1';
                    });
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', function(event) {
                if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                    navMenu.classList.remove('active');
                    
                    // Reset hamburger menu
                    const bars = navToggle.querySelectorAll('.bar');
                    bars.forEach(bar => {
                        bar.style.transform = 'none';
                        bar.style.opacity = '1';
                    });
                }
            });
        }

        // Header scroll effect
        const header = document.querySelector('.header');
        if (header) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 100) {
                    header.style.background = 'rgba(255, 255, 255, 0.98)';
                    header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                } else {
                    header.style.background = 'rgba(255, 255, 255, 0.95)';
                    header.style.boxShadow = 'none';
                }
            });
        }

    } catch (error) {
        console.error('Error initializing navigation:', error);
    }
}

// Image error handling
function initImageErrorHandling() {
    try {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Set up error handling for each image
            img.addEventListener('error', function() {
                console.warn('Failed to load image:', this.src);
                
                // Create fallback element
                const fallback = document.createElement('div');
                fallback.className = 'image-fallback';
                fallback.style.cssText = `
                    width: ${this.offsetWidth || 200}px;
                    height: ${this.offsetHeight || 150}px;
                    background-color: #f3f4f6;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #6b7280;
                    font-size: 14px;
                    border-radius: 8px;
                    border: 2px dashed #d1d5db;
                `;
                fallback.textContent = this.alt || 'Image not available';
                
                // Replace image with fallback
                if (this.parentNode) {
                    this.parentNode.replaceChild(fallback, this);
                }
            });

            // Add loading state
            img.addEventListener('load', function() {
                this.classList.add('fade-in');
            });
        });

    } catch (error) {
        console.error('Error setting up image error handling:', error);
    }
}

// FAQ functionality
function initFAQ() {
    try {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            if (question) {
                question.addEventListener('click', function() {
                    const isActive = item.classList.contains('active');
                    
                    // Close all other FAQ items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // Toggle current item
                    if (isActive) {
                        item.classList.remove('active');
                    } else {
                        item.classList.add('active');
                    }
                });
            }
        });

    } catch (error) {
        console.error('Error initializing FAQ:', error);
    }
}

// Modal functionality
function initModal() {
    try {
        const modal = document.getElementById('demo-modal');
        const videoThumbnail = document.querySelector('.video-thumbnail');
        const closeBtn = document.querySelector('.modal-close');

        if (modal && videoThumbnail) {
            // Open modal when clicking video thumbnail
            videoThumbnail.addEventListener('click', function() {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
                
                // Focus trap for accessibility
                const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                if (focusableElements.length > 0) {
                    focusableElements[0].focus();
                }
            });

            // Close modal
            function closeModal() {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                videoThumbnail.focus(); // Return focus to trigger element
            }

            if (closeBtn) {
                closeBtn.addEventListener('click', closeModal);
            }

            // Close modal when clicking outside
            modal.addEventListener('click', function(event) {
                if (event.target === modal) {
                    closeModal();
                }
            });

            // Close modal with Escape key
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape' && modal.style.display === 'block') {
                    closeModal();
                }
            });
        }

    } catch (error) {
        console.error('Error initializing modal:', error);
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    try {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(event) {
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    event.preventDefault();
                    
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

    } catch (error) {
        console.error('Error initializing smooth scrolling:', error);
    }
}

// Form validation (for future contact forms)
function initFormValidation() {
    try {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                
                const formData = new FormData(form);
                const errors = validateForm(formData);
                
                if (errors.length === 0) {
                    // Form is valid
                    showSuccessMessage('Form submitted successfully!');
                    form.reset();
                } else {
                    // Show errors
                    showFormErrors(form, errors);
                }
            });
        });

    } catch (error) {
        console.error('Error initializing form validation:', error);
    }
}

// Form validation helper
function validateForm(formData) {
    const errors = [];
    
    try {
        // Email validation
        const email = formData.get('email');
        if (email && !isValidEmail(email)) {
            errors.push({ field: 'email', message: 'Please enter a valid email address' });
        }
        
        // Required field validation
        const requiredFields = ['name', 'email', 'message'];
        requiredFields.forEach(field => {
            const value = formData.get(field);
            if (!value || value.trim() === '') {
                errors.push({ field: field, message: `${field.charAt(0).toUpperCase() + field.slice(1)} is required` });
            }
        });

    } catch (error) {
        console.error('Error validating form:', error);
        errors.push({ field: 'general', message: 'An error occurred while validating the form' });
    }
    
    return errors;
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show form errors
function showFormErrors(form, errors) {
    try {
        // Clear previous errors
        const existingErrors = form.querySelectorAll('.error-message');
        existingErrors.forEach(error => error.remove());
        
        const errorFields = form.querySelectorAll('.error');
        errorFields.forEach(field => field.classList.remove('error'));
        
        // Show new errors
        errors.forEach(error => {
            const field = form.querySelector(`[name="${error.field}"]`);
            if (field) {
                field.classList.add('error');
                
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = error.message;
                
                field.parentNode.insertBefore(errorMessage, field.nextSibling);
            }
        });

    } catch (error) {
        console.error('Error showing form errors:', error);
    }
}

// Show success message
function showSuccessMessage(message) {
    try {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #10b981;
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;
        successDiv.textContent = message;
        
        document.body.appendChild(successDiv);
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.parentNode.removeChild(successDiv);
            }
        }, 3000);

    } catch (error) {
        console.error('Error showing success message:', error);
    }
}

// Intersection Observer for animations
function initScrollAnimations() {
    try {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.product-card, .feature-card, .use-case-card, .testimonial-card');
        animatedElements.forEach(el => observer.observe(el));

    } catch (error) {
        console.error('Error initializing scroll animations:', error);
    }
}

// Initialize scroll animations after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Delay to ensure all elements are rendered
    setTimeout(initScrollAnimations, 100);
});

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance monitoring
function initPerformanceMonitoring() {
    try {
        // Monitor page load performance
        window.addEventListener('load', function() {
            const loadTime = performance.now();
            console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
            
            // Report slow loading
            if (loadTime > 3000) {
                console.warn('Page load time is slower than expected');
            }
        });

        // Monitor resource loading errors
        window.addEventListener('error', function(event) {
            if (event.target !== window) {
                console.error('Resource loading error:', event.target.src || event.target.href);
            }
        });

    } catch (error) {
        console.error('Error initializing performance monitoring:', error);
    }
}

// Initialize performance monitoring
initPerformanceMonitoring();

// Global error handler
window.addEventListener('error', function(event) {
    console.error('Global error:', event.error);
    
    // Show user-friendly error message for critical errors
    if (event.error && event.error.message) {
        const isNetworkError = event.error.message.includes('fetch') || event.error.message.includes('network');
        if (isNetworkError) {
            showErrorMessage('Network error. Please check your connection and try again.');
        }
    }
});

// Show error message to user
function showErrorMessage(message) {
    try {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-notification';
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #ef4444;
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            max-width: 300px;
        `;
        errorDiv.textContent = message;
        
        document.body.appendChild(errorDiv);
        
        // Remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);

    } catch (error) {
        console.error('Error showing error message:', error);
    }
}

// Lazy loading for images (optional enhancement)
function initLazyLoading() {
    try {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }

    } catch (error) {
        console.error('Error initializing lazy loading:', error);
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateForm,
        isValidEmail,
        debounce
    };
}
