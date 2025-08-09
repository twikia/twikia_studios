// Typing Animation for TerraBlitz 3D Website

// Initialize typing effect
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const text = "Welcome to Twikia Studios";
    heroTitle.textContent = '';
    
    // Create cursor element
    const cursor = document.createElement('span');
    cursor.style.cssText = `
        display: inline-block;
        width: 2px;
        height: 1.2em;
        background: white;
        margin-left: 2px;
        animation: blink 1s infinite;
    `;
    heroTitle.appendChild(cursor);
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            const charSpan = document.createElement('span');
            charSpan.textContent = text.charAt(i);
            heroTitle.insertBefore(charSpan, cursor);
            i++;
            setTimeout(typeWriter, 170);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                cursor.remove();
            }, 1000);
        }
    };
    
    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);
}

// Add CSS for typing animation
const typingStyle = document.createElement('style');
typingStyle.textContent = `
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(typingStyle);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTypingEffect();
});

console.log('Typing animation module loaded'); 