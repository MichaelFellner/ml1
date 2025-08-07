// scrollbar-wrapper.js - Adds scrollable wrapper with custom scrollbar

function enableCustomScrollbar() {
    const currentLevel = document.querySelector('.current-level');
    if (!currentLevel) return;
    
    // Check if wrapper already exists
    if (currentLevel.querySelector('.level-wrapper')) return;
    
    // Store the current content
    const originalContent = currentLevel.innerHTML;
    
    // Clear the current level and add the wrapper structure
    currentLevel.innerHTML = `
        <div class="level-wrapper">
            ${originalContent}
        </div>
    `;
    
    // Ensure the current-level has proper styling for rounded corners
    currentLevel.style.overflow = 'hidden';
    currentLevel.style.padding = '0';
}

// Automatically enable custom scrollbar after level creation
function initializeCustomScrollbar() {
    // Use a small delay to ensure the level content is fully rendered
    setTimeout(() => {
        enableCustomScrollbar();
    }, 100);
}

// Update the scrollAppToTop function to work with wrapper
function scrollAppToTop() {
    setTimeout(() => {
        const wrapper = document.querySelector('.level-wrapper');
        if (wrapper) {
            wrapper.scrollTop = 0;
        } else {
            const contentBox = document.querySelector('.current-level');
            if (contentBox) {
                contentBox.scrollTop = 0;
            }
        }
    }, 50);
}