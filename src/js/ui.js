// UI Interactions and Enhancements for TerraBlitz 3D Website

// Global UI variables
let isMobileMenuOpen = false;
let currentSection = 'home';

// Initialize UI enhancements
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing UI enhancements...');
    
    // Initialize interactive elements
    initInteractiveElements();
    
    // Initialize performance optimizations
    initPerformanceOptimizations();
    
    // Initialize accessibility features
    initAccessibilityFeatures();
});

// Initialize interactive elements
function initInteractiveElements() {
    // Add hover and click effects to all clickable elements
    const clickableElements = document.querySelectorAll('a, button, .feature, .social-link, .video-feature-card, .cta-button');
    
    clickableElements.forEach(element => {
        // Skip navbar links for hover effects and background resets
        if (element.classList.contains('nav-link')) {
            // Only add ripple effect for navbar links
            element.addEventListener('click', function(event) {
                createRippleEffect(this, event);
            });
            return;
        }
        
        // Add hover effects for all other elements
        element.addEventListener('mouseenter', function() {
            this.style.setProperty('transform', 'translateY(-2px) scale(1.02)', 'important');
            this.style.setProperty('transition', 'transform 0.2s ease', 'important');
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.setProperty('transform', 'translateY(0) scale(1)', 'important');
            // Reset CSS hover effects (but not for nav links)
            if (!this.classList.contains('nav-link')) {
                this.style.background = '';
                this.style.boxShadow = '';
                this.style.color = '';
                this.style.zIndex = '';
            }
        });
        
        // Add click animation effect for all other elements
        element.addEventListener('click', function(event) {
            // Create scale animation for all buttons
            this.style.setProperty('transform', 'translateY(-2px) scale(1.1)', 'important');
            this.style.setProperty('transition', 'transform 0.1s ease', 'important');
            
            setTimeout(() => {
                this.style.setProperty('transform', 'translateY(0) scale(0.95)', 'important');
                this.style.setProperty('transition', 'transform 0.1s ease', 'important');
            }, 100);
            
            setTimeout(() => {
                this.style.setProperty('transform', 'translateY(0) scale(1)', 'important');
                this.style.setProperty('transition', 'transform 0.1s ease', 'important');
            }, 200);
            
            // Create ripple effect for all buttons except logo
            if (!this.classList.contains('logo-link')) {
                createRippleEffect(this, event);
            }
            
            // Force return to normal state for all buttons after click
            setTimeout(() => {
                this.style.setProperty('transform', 'translateY(0) scale(1)', 'important');
                this.style.setProperty('transition', 'transform 0.1s ease', 'important');
                // Reset CSS hover effects (but not for nav links)
                if (!this.classList.contains('nav-link')) {
                    this.style.background = '';
                    this.style.boxShadow = '';
                    this.style.color = '';
                    this.style.zIndex = '';
                }
            }, 300);
        });
    });
    
    // Add home button click handler to clear navigation highlights
    const homeButton = document.querySelector('.logo-link');
    if (homeButton) {
        homeButton.addEventListener('click', function() {
            // Clear all active navigation states
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            currentSection = 'home';
        });
    }
    
    // Navbar links are handled separately to avoid interference with CSS hover states
}

// Create ripple effect on button click
function createRippleEffect(element, event) {
    // Skip ripple effect for logo link
    if (element.classList.contains('logo-link')) {
        return;
    }
    
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 1000;
    `;
    
    // Ensure element has relative positioning and proper overflow
    if (getComputedStyle(element).position === 'static') {
        element.style.position = 'relative';
    }
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    // Clean up ripple after animation
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
        
        // Force return to normal state for all buttons
        element.style.setProperty('transform', 'translateY(0) scale(1)', 'important');
        element.style.setProperty('transition', 'transform 0.1s ease', 'important');
        // Reset CSS hover effects (but not for nav links)
        if (!element.classList.contains('nav-link')) {
            element.style.background = '';
            element.style.boxShadow = '';
            element.style.color = '';
            element.style.zIndex = '';
        }
    }, 600);
}

// Add CSS for ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Ensure all clickable elements have proper positioning for effects */
    a, button, .feature, .social-link, .video-feature-link, .cta-button {
        position: relative;
        overflow: hidden;
        transition: transform 0.2s ease;
    }
    
    /* Force CTA button to have proper animations */
    .cta-button {
        position: relative;
        overflow: hidden;
        transition: transform 0.2s ease;
    }
`;
document.head.appendChild(rippleStyle);

// Initialize performance optimizations
function initPerformanceOptimizations() {
    // Optimize images with lazy loading
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
        // Add error handling for images
        img.addEventListener('error', function() {
            this.style.display = 'none';
        });
    });
}

// Initialize accessibility features
function initAccessibilityFeatures() {
    // Add keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Add ARIA labels
    addAriaLabels();
}

// Handle keyboard navigation
function handleKeyboardNavigation(event) {
    switch(event.key) {
        case 'Escape':
            // Close mobile menu
            const mobileMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
            break;
            
        case 'Tab':
            // Add focus indicators
            document.body.classList.add('keyboard-navigation');
            break;
    }
}

// Add ARIA labels
function addAriaLabels() {
    // Add ARIA labels to navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const section = link.getAttribute('href').substring(1);
        link.setAttribute('aria-label', `Navigate to ${section} section`);
    });
}

// Add smooth section transitions
function initSectionTransitions() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                updateActiveNavigation(sectionId);
                currentSection = sectionId;
            }
        });
    }, {
        threshold: 0.4,
        rootMargin: '5% 0px 5% 0px'
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Update active navigation
function updateActiveNavigation(sectionId) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        // Only add active class if we're not on the home section
        if (sectionId !== 'home' && link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
}

// Add scroll to top functionality
function addScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #667eea;
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 1.5rem;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide based on scroll position with throttling
    let scrollToTopTicking = false;
    
    function updateScrollToTop() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
        scrollToTopTicking = false;
    }
    
    function requestScrollToTopUpdate() {
        if (!scrollToTopTicking) {
            requestAnimationFrame(updateScrollToTop);
            scrollToTopTicking = true;
        }
    }
    
    window.addEventListener('scroll', requestScrollToTopUpdate, { passive: true });
    
    // Scroll to top on click
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize all UI features
function initAllUI() {
    initSectionTransitions();
    addScrollToTop();
}

// Call initialization when DOM is ready
document.addEventListener('DOMContentLoaded', initAllUI);

// Export UI functions
window.UI = {
    createRippleEffect,
    updateActiveNavigation
};

console.log('UI enhancements loaded successfully'); 