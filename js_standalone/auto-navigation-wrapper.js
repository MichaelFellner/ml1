// auto-navigation-wrapper.js - Automatically wraps all level functions with navigation

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // List of functions that need automatic navigation wrapping
    const functionsToWrap = [
        'createLevel3', 'createLevel4', 'createLevel5', 'createLevel8', 
        'createLevel9', 'createLevel10', 'createLevel11',
        'createInstructionPart1', 'createInstructionPart2', 'createInstructionPart3',
        'createInstructionPart4', 'createInstructionPart5', 'createInstructionPart6'
    ];
    
    // Store original functions
    const originalFunctions = {};
    
    // Wrap each function with navigation
    functionsToWrap.forEach(functionName => {
        if (window[functionName]) {
            // Store the original function
            originalFunctions[functionName] = window[functionName];
            
            // UNUSED: findNavItemByFunction is not defined in the codebase
            // Previously tried to get navigation ID from config
            // Now using a simplified approach
            const navId = functionName.toLowerCase().replace('create', '');
            
            // Create wrapped version
            window[functionName] = function() {
                // Call the original function
                originalFunctions[functionName]();
                
                // Add navigation after a short delay to ensure DOM is ready
                setTimeout(() => {
                    initializeNavigation(navId, functionName);
                }, 10);
            };
            
            console.log(`✅ Wrapped ${functionName} with navigation (ID: ${navId})`);
        } else {
            console.warn(`⚠️ Function ${functionName} not found, skipping navigation wrapper`);
        }
    });
    
    console.log('🚀 Navigation wrapper initialized for', Object.keys(originalFunctions).length, 'functions');
});

// UNUSED: ensureNavigation function was defined but never called
// Previously intended to ensure navigation was added to function calls
// function ensureNavigation() {
//     // Small delay to ensure content is loaded
//     setTimeout(() => {
//         if (!document.querySelector('.hamburger-nav')) {
//             injectNavigation();
//         }
//     }, 50);
// }
