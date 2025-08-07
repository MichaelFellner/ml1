// level-preloader.js - Intelligent preloading system for faster transitions

class LevelPreloader {
    constructor() {
        this.cache = new Map();
        this.preloadQueue = [];
        this.isPreloading = false;
        this.maxCacheSize = 5; // Keep 5 levels in memory
        
        // Preload images for all levels on page load
        this.preloadAllImages();
    }
    
    // Preload all images used in the app
    preloadAllImages() {
        const imagesToPreload = [
            'pictures/robot.png',
            'pictures/robot-active.png',
            'pictures/dog.png',
            'pictures/dog-happy.png',
            'pictures/dog-sad.png',
            'pictures/witch.png'
        ];
        
        imagesToPreload.forEach(src => {
            const img = new Image();
            img.src = src;
        });
        
        console.log('Preloading images...');
    }
    
    // Generate and cache level HTML
    generateLevelHTML(functionName) {
        // If already cached, return it
        if (this.cache.has(functionName)) {
            return this.cache.get(functionName);
        }
        
        // Create a temporary container to generate HTML
        const tempContainer = document.createElement('div');
        tempContainer.id = 'app';
        
        // Store original app element
        const originalApp = document.getElementById('app');
        document.getElementById('app').id = 'app-temp';
        document.body.appendChild(tempContainer);
        
        // Call the level function to generate HTML
        if (window[functionName]) {
            window[functionName]();
        }
        
        // Extract the generated HTML
        const html = tempContainer.innerHTML;
        
        // Cleanup
        tempContainer.remove();
        document.getElementById('app-temp').id = 'app';
        
        // Cache it
        this.cache.set(functionName, html);
        
        // Manage cache size
        if (this.cache.size > this.maxCacheSize) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        
        return html;
    }
    
    // Preload adjacent levels (next and previous)
    preloadAdjacent(currentFunction) {
        const flattened = getFlattenedNavigation();
        const currentIndex = flattened.findIndex(item => item.func === currentFunction);
        
        // Clear existing queue
        this.preloadQueue = [];
        
        // Add next level to queue
        if (currentIndex < flattened.length - 1) {
            const nextItem = flattened[currentIndex + 1];
            if (!this.cache.has(nextItem.func)) {
                this.preloadQueue.push(nextItem.func);
            }
        }
        
        // Add previous level to queue
        if (currentIndex > 0) {
            const prevItem = flattened[currentIndex - 1];
            if (!this.cache.has(prevItem.func)) {
                this.preloadQueue.push(prevItem.func);
            }
        }
        
        // Start preloading
        this.processPreloadQueue();
    }
    
    // Process preload queue asynchronously
    async processPreloadQueue() {
        if (this.isPreloading || this.preloadQueue.length === 0) {
            return;
        }
        
        this.isPreloading = true;
        
        while (this.preloadQueue.length > 0) {
            const functionName = this.preloadQueue.shift();
            
            // Use requestIdleCallback for non-blocking preload
            if ('requestIdleCallback' in window) {
                requestIdleCallback(() => {
                    this.generateLevelHTML(functionName);
                    console.log(`Preloaded: ${functionName}`);
                });
            } else {
                // Fallback for browsers without requestIdleCallback
                setTimeout(() => {
                    this.generateLevelHTML(functionName);
                    console.log(`Preloaded: ${functionName}`);
                }, 100);
            }
            
            // Small delay between preloads to avoid blocking
            await new Promise(resolve => setTimeout(resolve, 50));
        }
        
        this.isPreloading = false;
    }
    
    // Get cached HTML or generate on demand
    getLevel(functionName) {
        if (this.cache.has(functionName)) {
            console.log(`Using cached: ${functionName}`);
            return this.cache.get(functionName);
        }
        
        console.log(`Generating fresh: ${functionName}`);
        return this.generateLevelHTML(functionName);
    }
    
    // Clear cache
    clearCache() {
        this.cache.clear();
    }
}

// Initialize global preloader
window.levelPreloader = new LevelPreloader();

// Monkey-patch navigation functions to use preloader
const originalNavigateNext = window.navigateNext;
window.navigateNext = function() {
    if (canGoNext()) {
        const flattened = getFlattenedNavigation();
        const currentIndex = getCurrentPageIndex();
        const nextItem = flattened[currentIndex + 1];
        
        // Use preloaded content if available
        const cachedHTML = window.levelPreloader.cache.get(nextItem.func);
        if (cachedHTML) {
            const app = document.getElementById('app');
            app.innerHTML = cachedHTML;
            
            // Re-run setup functions
            if (window[nextItem.func.replace('create', 'setup')]) {
                window[nextItem.func.replace('create', 'setup')]();
            }
            
            // Update navigation state
            window.currentPageFunction = nextItem.func;
            initializeNavigation(nextItem.id || nextItem.func, nextItem.func);
            
            // Preload next adjacent levels
            window.levelPreloader.preloadAdjacent(nextItem.func);
        } else {
            // Fallback to original behavior
            originalNavigateNext.apply(this, arguments);
        }
    }
};

// Same for navigatePrev
const originalNavigatePrev = window.navigatePrev;
window.navigatePrev = function() {
    if (canGoPrev()) {
        const flattened = getFlattenedNavigation();
        const currentIndex = getCurrentPageIndex();
        const prevItem = flattened[currentIndex - 1];
        
        // Use preloaded content if available
        const cachedHTML = window.levelPreloader.cache.get(prevItem.func);
        if (cachedHTML) {
            const app = document.getElementById('app');
            app.innerHTML = cachedHTML;
            
            // Re-run setup functions
            if (window[prevItem.func.replace('create', 'setup')]) {
                window[prevItem.func.replace('create', 'setup')]();
            }
            
            // Update navigation state
            window.currentPageFunction = prevItem.func;
            initializeNavigation(prevItem.id || prevItem.func, prevItem.func);
            
            // Preload next adjacent levels
            window.levelPreloader.preloadAdjacent(prevItem.func);
        } else {
            // Fallback to original behavior
            originalNavigatePrev.apply(this, arguments);
        }
    }
};

// Start preloading after initial page load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const currentFunc = window.currentPageFunction || 'createIntroduction';
        window.levelPreloader.preloadAdjacent(currentFunc);
    }, 1000); // Wait 1 second after page load to start preloading
});
