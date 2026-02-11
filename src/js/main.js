// Main JavaScript file for TerraBlitz 3D Website

// Global variables
let currentModel = 'cube';
let isLoading = true;
let isScrolling = false;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('TerraBlitz 3D Website loaded');
    
    // Initialize the website
    initWebsite();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize loading screen
    initLoadingScreen();
});

// Initialize website
function initWebsite() {
    console.log('Initializing TerraBlitz website...');
    
    // Add resize event listener
    window.addEventListener('resize', handleWindowResize);
    
    // add smooth scrolling
    initSmoothScrolling();

    // Initialize video autoplay functionality
    initVideoAutoplay();
}

// Initialize loading screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Simulate loading time (you can replace this with actual loading logic)
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            isLoading = false;
        }, 500);
    }, 2000);
}

// Initialize navigation
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        if (window.innerWidth > 768) {
            hamburger.classList.add('active');
            navMenu.classList.add('active');
        }
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
}

// Initialize smooth scrolling
function initSmoothScrolling() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                smoothScrollTo(target, 1000);
            }
        });
    });
}

// Smooth scroll function
function smoothScrollTo(element, duration = 1000) {
    // Prevent multiple scroll animations from running simultaneously
    if (isScrolling) {
        return;
    }
    
    isScrolling = true;
    
    const targetPosition = element.offsetTop;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        } else {
            isScrolling = false; // Reset flag when animation completes
        }
    }

    // Easing function for smooth animation
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Scroll to section function (for CTA button)
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        smoothScrollTo(section, 1000);
    }
}

// Handle window resize
function handleWindowResize() {
    // Call Three.js background resize function if available
    if (typeof resizeThreeBackground === 'function') {
        resizeThreeBackground();
    }
}

// Initialize video autoplay functionality
function initVideoAutoplay() {
    const firstVideo = document.getElementById('first-video');
    
    if (!firstVideo) {
        console.log('First video element not found');
        return;
    }
    
    // Create intersection observer for the first video
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When video comes into view, add autoplay parameter
                const currentSrc = firstVideo.src;
                if (!currentSrc.includes('autoplay=1')) {
                    // YouTube requires mute=1 for autoplay to work reliably
                    const newSrc = currentSrc.includes('?') 
                        ? currentSrc + '&autoplay=1&mute=1' 
                        : currentSrc + '?autoplay=1&mute=1';
                    firstVideo.src = newSrc;
                    console.log('Autoplay enabled for first video');
                }
                // Unobserve after triggering autoplay
                videoObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5, // Trigger when 30% of video is visible
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Start observing the first video
    videoObserver.observe(firstVideo);
}

// Export functions for use in other modules
window.TerraBlitz = {
    scrollToSection,
    currentModel
};

console.log('Studios main.js loaded successfully'); 