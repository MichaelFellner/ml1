// fast-transitions.js - Optimized fast & smooth level transitions

class FastTransitions {
    constructor() {
        this.preloadedImages = new Set();
        this.contentCache = new Map();
        this.transitionTimeout = null;
        this.navigationQueue = [];
        this.isProcessingQueue = false;
        
        // Preload all images immediately
        this.preloadImages();
        
        // Add smooth transition styles
        this.addStyles();
        
        // Enhance navigation
        this.enhanceNavigation();
    }
    
    preloadImages() {
        const images = [
            'pictures/robot.png',
            'pictures/robot-active.png', 
            'pictures/dog.png',
            'pictures/dog-happy.png',
            'pictures/dog-sad.png',
            'pictures/witch.png'
        ];
        
        images.forEach(src => {
            if (!this.preloadedImages.has(src)) {
                const img = new Image();
                img.src = src;
                this.preloadedImages.add(src);
            }
        });
    }
    
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Fast smooth transitions with better easing */
            .level-transition-out {
                animation: quickFadeOut 0.25s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
            }
            
            .level-transition-in {
                animation: quickFadeIn 0.25s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
            }
            
            @keyframes quickFadeOut {
                0% { 
                    opacity: 1; 
                    transform: translateX(0) scale(1);
                }
                100% { 
                    opacity: 0; 
                    transform: translateX(-40px) scale(0.97);
                }
            }
            
            @keyframes quickFadeIn {
                0% { 
                    opacity: 0; 
                    transform: translateX(40px) scale(0.97);
                }
                100% { 
                    opacity: 1; 
                    transform: translateX(0) scale(1);
                }
            }
            
            /* Reverse for previous */
            .level-transition-out-reverse {
                animation: quickFadeOutReverse 0.25s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
            }
            
            .level-transition-in-reverse {
                animation: quickFadeInReverse 0.25s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
            }
            
            @keyframes quickFadeOutReverse {
                0% { 
                    opacity: 1; 
                    transform: translateX(0) scale(1);
                }
                100% { 
                    opacity: 0; 
                    transform: translateX(40px) scale(0.97);
                }
            }
            
            @keyframes quickFadeInReverse {
                0% { 
                    opacity: 0; 
                    transform: translateX(-40px) scale(0.97);
                }
                100% { 
                    opacity: 1; 
                    transform: translateX(0) scale(1);
                }
            }
            
            /* Ensure smooth rendering */
            .current-level {
                will-change: transform, opacity;
                -webkit-backface-visibility: hidden;
                backface-visibility: hidden;
                transform: translateZ(0);
            }
            
            /* Instant transitions option */
            .instant-transition .level-transition-out,
            .instant-transition .level-transition-out-reverse {
                animation: none !important;
                display: none !important;
            }
            
            .instant-transition .level-transition-in,
            .instant-transition .level-transition-in-reverse {
                animation: none !important;
            }
            
            /* Prevent interaction during transition */
            #app.transitioning {
                pointer-events: none;
                position: relative;
                overflow: hidden;
            }
            
            /* Smooth scrollbar appearance */
            .level-wrapper {
                animation: fadeIn 0.3s ease-out;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    async quickTransition(newContentGenerator, direction = 'next') {
        // Add to queue if currently processing
        if (this.isProcessingQueue) {
            this.navigationQueue = [{ newContentGenerator, direction }]; // Keep only latest
            return;
        }
        
        this.isProcessingQueue = true;
        
        // Cancel any pending transition
        if (this.transitionTimeout) {
            clearTimeout(this.transitionTimeout);
        }
        
        const app = document.getElementById('app');
        const currentLevel = app.querySelector('.current-level');
        
        // Remove ALL previous animation classes immediately
        if (currentLevel) {
            currentLevel.classList.remove(
                'level-transition-out',
                'level-transition-out-reverse',
                'level-transition-in',
                'level-transition-in-reverse'
            );
            
            // Force a reflow to ensure the removal takes effect
            void currentLevel.offsetHeight;
        }
        
        // Add transitioning class
        app.classList.add('transitioning');
        
        // Clone current content for smooth transition
        const currentClone = currentLevel ? currentLevel.cloneNode(true) : null;
        
        if (currentClone) {
            // Position clone absolutely
            currentClone.style.position = 'absolute';
            currentClone.style.top = '0';
            currentClone.style.left = '0';
            currentClone.style.width = '100%';
            currentClone.style.zIndex = '1';
            
            // Add exit animation to clone
            currentClone.classList.add(
                direction === 'next' ? 'level-transition-out' : 'level-transition-out-reverse'
            );
            
            // Add clone to container
            app.appendChild(currentClone);
            
            // Remove clone after animation
            setTimeout(() => {
                if (currentClone.parentNode) {
                    currentClone.remove();
                }
            }, 300);
        }
        
        // Generate new content
        newContentGenerator();
        
        // Get the newly created level
        const newLevel = app.querySelector('.current-level');
        if (newLevel) {
            // Remove any lingering animation classes
            newLevel.classList.remove(
                'level-transition-out',
                'level-transition-out-reverse',
                'level-transition-in',
                'level-transition-in-reverse'
            );
            
            // Force reflow
            void newLevel.offsetHeight;
            
            // Add entrance animation
            newLevel.classList.add(
                direction === 'next' ? 'level-transition-in' : 'level-transition-in-reverse'
            );
            
            // Set z-index to appear above clone
            newLevel.style.position = 'relative';
            newLevel.style.zIndex = '2';
        }
        
        // Cleanup after animation completes
        this.transitionTimeout = setTimeout(() => {
            app.classList.remove('transitioning');
            
            // Clean up any remaining animation classes
            const allLevels = app.querySelectorAll('.current-level');
            allLevels.forEach(level => {
                level.classList.remove(
                    'level-transition-out',
                    'level-transition-out-reverse',
                    'level-transition-in',
                    'level-transition-in-reverse'
                );
                level.style.position = '';
                level.style.zIndex = '';
            });
            
            // Wrap content for scrollbar
            if (window.wrapLevelContent) {
                window.wrapLevelContent();
            }
            
            this.isProcessingQueue = false;
            
            // Process next in queue if any
            if (this.navigationQueue.length > 0) {
                const next = this.navigationQueue.shift();
                setTimeout(() => {
                    this.quickTransition(next.newContentGenerator, next.direction);
                }, 50);
            }
        }, 300);
    }
    
    enhanceNavigation() {
        // Store original functions
        const originalNext = window.navigateNext;
        const originalPrev = window.navigatePrev;
        
        // Enhanced next navigation
        window.navigateNext = () => {
            if (!canGoNext()) return;
            
            const flattened = getFlattenedNavigation();
            const currentIndex = getCurrentPageIndex();
            const nextItem = flattened[currentIndex + 1];
            
            this.quickTransition(() => {
                if (window[nextItem.func]) {
                    window[nextItem.func]();
                }
            }, 'next');
            
            // Preload the next-next level
            if (currentIndex + 2 < flattened.length) {
                const nextNextItem = flattened[currentIndex + 2];
                this.preloadLevel(nextNextItem.func);
            }
        };
        
        // Enhanced previous navigation
        window.navigatePrev = () => {
            if (!canGoPrev()) return;
            
            const flattened = getFlattenedNavigation();
            const currentIndex = getCurrentPageIndex();
            const prevItem = flattened[currentIndex - 1];
            
            this.quickTransition(() => {
                if (window[prevItem.func]) {
                    window[prevItem.func]();
                }
            }, 'prev');
            
            // Preload the prev-prev level
            if (currentIndex - 2 >= 0) {
                const prevPrevItem = flattened[currentIndex - 2];
                this.preloadLevel(prevPrevItem.func);
            }
        };
    }
    
    // Preload a level in the background
    preloadLevel(funcName) {
        if (this.contentCache.has(funcName)) return;
        
        // Use requestIdleCallback for non-blocking preload
        const preload = () => {
            // This is a simplified preload - just ensure images are loaded
            // Full HTML preloading could be added if needed
            console.log(`Preloading assets for ${funcName}`);
            this.contentCache.set(funcName, true);
        };
        
        if ('requestIdleCallback' in window) {
            requestIdleCallback(preload);
        } else {
            setTimeout(preload, 100);
        }
    }
    
    // Enable instant mode (no animations)
    setInstantMode(enabled) {
        const app = document.getElementById('app');
        if (enabled) {
            app.classList.add('instant-transition');
        } else {
            app.classList.remove('instant-transition');
        }
    }
}

// Initialize fast transitions
document.addEventListener('DOMContentLoaded', () => {
    window.fastTransitions = new FastTransitions();
    
    // Preload adjacent levels after initial load
    setTimeout(() => {
        const flattened = getFlattenedNavigation();
        const currentIndex = getCurrentPageIndex();
        
        // Preload next level
        if (currentIndex + 1 < flattened.length) {
            window.fastTransitions.preloadLevel(flattened[currentIndex + 1].func);
        }
        
        // Preload previous level
        if (currentIndex - 1 >= 0) {
            window.fastTransitions.preloadLevel(flattened[currentIndex - 1].func);
        }
    }, 500);
});

// Keyboard shortcuts for faster navigation
document.addEventListener('keydown', (e) => {
    // Don't trigger if user is typing in an input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        if (window.navigateNext) window.navigateNext();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (window.navigatePrev) window.navigatePrev();
    } else if (e.key === 'i' && e.ctrlKey) {
        // Ctrl+I to toggle instant mode
        e.preventDefault();
        const isInstant = document.getElementById('app').classList.contains('instant-transition');
        window.fastTransitions.setInstantMode(!isInstant);
        console.log(`Instant mode: ${!isInstant ? 'ON' : 'OFF'}`);
    }
});

// Add visual feedback for preloading (optional)
window.showPreloadStatus = function() {
    const status = document.createElement('div');
    status.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 10px 15px;
        border-radius: 5px;
        font-size: 12px;
        z-index: 10000;
    `;
    status.innerHTML = `
        <div>Cache: ${window.fastTransitions.contentCache.size} levels</div>
        <div>Images: ${window.fastTransitions.preloadedImages.size} loaded</div>
        <div>Press Ctrl+I for instant mode</div>
    `;
    document.body.appendChild(status);
    
    setTimeout(() => status.remove(), 3000);
};
