// scroll-fix.js - Automatically wraps content for proper scrolling with rounded corners

function wrapLevelContent() {
    // Find the current-level element
    const currentLevel = document.querySelector('.current-level');
    if (!currentLevel) return;
    
    // Check if content is already wrapped
    if (currentLevel.querySelector('.level-wrapper')) return;
    
    // Get all children of current-level
    const children = Array.from(currentLevel.children);
    
    // Create wrapper div
    const wrapper = document.createElement('div');
    wrapper.className = 'level-wrapper';
    
    // Move all children into wrapper
    children.forEach(child => {
        wrapper.appendChild(child);
    });
    
    // Append wrapper back to current-level
    currentLevel.appendChild(wrapper);
}

// Override existing navigation functions to add wrapper after render
const originalInitializeNavigation = window.initializeNavigation;
window.initializeNavigation = function(...args) {
    const result = originalInitializeNavigation.apply(this, args);
    
    // Small delay to ensure DOM is ready
    setTimeout(() => {
        wrapLevelContent();
        
        // Update scroll function to target wrapper instead
        const wrapper = document.querySelector('.level-wrapper');
        if (wrapper) {
            wrapper.scrollTop = 0;
        }
    }, 10);
    
    return result;
};

// Also override the scrollAppToTop function
const originalScrollAppToTop = window.scrollAppToTop;
window.scrollAppToTop = function() {
    setTimeout(() => {
        const wrapper = document.querySelector('.level-wrapper');
        if (wrapper) {
            wrapper.scrollTop = 0;
        } else {
            // Fallback to original behavior
            const contentBox = document.querySelector('.current-level');
            if (contentBox) {
                contentBox.scrollTop = 0;
            }
        }
    }, 50);
};

// Listen for dynamic content changes
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.target.id === 'app') {
            setTimeout(wrapLevelContent, 10);
        }
    });
});

// Start observing the app container
document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app');
    if (appContainer) {
        observer.observe(appContainer, { childList: true, subtree: false });
    }
    
    // Initial wrap
    setTimeout(wrapLevelContent, 100);
});
