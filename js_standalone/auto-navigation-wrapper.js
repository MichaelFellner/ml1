// auto-navigation-wrapper.js - Automatically wraps all level functions with navigation

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // List of all level functions that need navigation
    const levelFunctions = [
        { name: 'createLevel3', id: 'level3' },
        { name: 'createLevel4', id: 'level4' },
        { name: 'createLevel5', id: 'level5' },
        { name: 'createLevel7', id: 'level7' },
        { name: 'createLevel8', id: 'level8' },
        { name: 'createLevel9', id: 'level9' },
        { name: 'createLevel10', id: 'level10' },
        { name: 'createLevel11', id: 'level11' },
        { name: 'createGradientDescentPart1', id: 'gd1' },
        { name: 'createGradientDescentPart2', id: 'gd2' },
        { name: 'createGradientDescentPart3', id: 'gd3' },
        { name: 'createMultivariatePart1', id: 'multi1' },
        { name: 'createMultivariatePart2', id: 'multi2' },
        { name: 'createStoryPart4', id: 'story4' },
        { name: 'createStoryPart5', id: 'story5' },
        { name: 'createStoryPart6', id: 'story6' },
        { name: 'createStoryPart7', id: 'story7' },
        { name: 'createStoryPart8', id: 'story8' },
        { name: 'createFinalCompletion', id: 'final' }
    ];
    
    // Store original functions
    const originalFunctions = {};
    
    // Wrap each function with navigation
    levelFunctions.forEach(({name, id}) => {
        if (window[name]) {
            // Store the original function
            originalFunctions[name] = window[name];
            
            // Create wrapped version
            window[name] = function() {
                // Call the original function
                originalFunctions[name]();
                
                // Add navigation after a short delay to ensure DOM is ready
                setTimeout(() => {
                    injectNavigation();
                    updateNavigationHighlight(id);
                    window.currentPageFunction = name;
                }, 10);
            };
            
            console.log(`✅ Wrapped ${name} with navigation (ID: ${id})`);
        } else {
            console.warn(`⚠️ Function ${name} not found, skipping navigation wrapper`);
        }
    });
    
    console.log('🚀 Navigation wrapper initialized for', Object.keys(originalFunctions).length, 'functions');
    
    // Initialize with intro if no page is loaded
    if (!window.currentPageFunction) {
        createIntroduction();
    }
});

// Helper function to ensure navigation is added to any function call
function ensureNavigation() {
    // Small delay to ensure content is loaded
    setTimeout(() => {
        if (!document.querySelector('.hamburger-nav')) {
            injectNavigation();
        }
    }, 50);
}