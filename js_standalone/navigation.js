/**
 * @fileoverview Enhanced navigation system for the MLTEACH application.
 * Handles page navigation, button states, navigation flow, and integration
 * with the new modular level loading system.
 * 
 * Features:
 * - Integration with LevelLoader for dynamic script loading
 * - Enhanced UI with loading states and progress indicators
 * - Rich metadata display for levels
 * - Preloading for smoother navigation
 * 
 * @author MLTEACH Team
 * @version 2.0.0
 */

// Initialize level loader if available - DISABLED FOR NOW
// let levelLoader = null;
// if (typeof window !== 'undefined' && window.levelLoader) {
//     levelLoader = window.levelLoader;
//     levelLoader.setDebugMode(false); // Set to true for development
// }

/**
 * Flattens the nested navigation configuration into a linear sequence
 * @function getFlattenedNavigation
 * @returns {Object[]} Array of navigation items in linear order
 */
function getFlattenedNavigation() {
    const flattened = [];
    NAVIGATION_CONFIG.sections.forEach(section => {
        section.items.forEach(item => {
            flattened.push(item);
        });
    });
    return flattened;
}

/**
 * Gets the current page index in the linear navigation sequence
 * @function getCurrentPageIndex
 * @returns {number} Current page index or -1 if not found
 */
function getCurrentPageIndex() {
    const flattened = getFlattenedNavigation();
    const currentFunc = window.currentPageFunction || 'createIntroduction';
    return flattened.findIndex(item => item.func === currentFunc);
}

/**
 * Scrolls the content box to the top
 * @function scrollAppToTop
 * @description Utility function to ensure content starts at top when navigating
 * @returns {void}
 */
function scrollAppToTop() {
    // Small delay to ensure content is rendered first
    setTimeout(() => {
        const contentBox = document.querySelector('.current-level');
        if (contentBox) {
            contentBox.scrollTop = 0;
        }
    }, 50);
}

/**
 * Checks if navigation to next page is possible
 * @function canGoNext
 * @returns {boolean} True if there is a next page available
 */
function canGoNext() {
    const flattened = getFlattenedNavigation();
    const currentIndex = getCurrentPageIndex();
    return currentIndex >= 0 && currentIndex < flattened.length - 1;
}

/**
 * Checks if navigation to previous page is possible
 * @function canGoPrev
 * @returns {boolean} True if there is a previous page available
 */
function canGoPrev() {
    const currentIndex = getCurrentPageIndex();
    return currentIndex > 0;
}

/**
 * Navigates to the next page in the sequence with enhanced loading
 * @function navigateNext
 * @description Moves to next page if available and calls the appropriate creation function
 * @returns {Promise<void>} Promise resolving when navigation is complete
 */
async function navigateNext() {
    if (!canGoNext()) return;
    
    const flattened = getFlattenedNavigation();
    const currentIndex = getCurrentPageIndex();
    const nextItem = flattened[currentIndex + 1];
    
    // Show navigation progress
    updateNavigationProgress(currentIndex + 1, flattened.length);
    
    try {
        // Just use traditional loading - levelLoader is causing issues
        if (window[nextItem.func]) {
            window[nextItem.func]();
        } else {
            throw new Error(`Function ${nextItem.func} not found`);
        }
        
        scrollAppToTop();
        
    } catch (error) {
        console.error('Navigation failed:', error);
        showNavigationError(`Failed to load: ${nextItem.name}`, error.message);
    }
}

/**
 * Navigates to the previous page in the sequence with enhanced loading
 * @function navigatePrev
 * @description Moves to previous page if available and calls the appropriate creation function
 * @returns {Promise<void>} Promise resolving when navigation is complete
 */
async function navigatePrev() {
    if (!canGoPrev()) return;
    
    const flattened = getFlattenedNavigation();
    const currentIndex = getCurrentPageIndex();
    const prevItem = flattened[currentIndex - 1];
    
    // Show navigation progress
    updateNavigationProgress(currentIndex - 1, flattened.length);
    
    try {
        // Just use traditional loading - levelLoader is causing issues
        if (window[prevItem.func]) {
            window[prevItem.func]();
        } else {
            throw new Error(`Function ${prevItem.func} not found`);
        }
        
        scrollAppToTop();
        
    } catch (error) {
        console.error('Navigation failed:', error);
        showNavigationError(`Failed to load: ${prevItem.name}`, error.message);
    }
}

/**
 * Creates standardized navigation buttons HTML
 * @function createStandardNavigation
 * @param {boolean} first - Whether this is the first page (default: false)
 * @param {boolean} last - Whether this is the last page (default: false)
 * @returns {string} Empty string (buttons are now injected directly)
 * @deprecated Buttons are now injected directly into #app container
 */
function createStandardNavigation(first = false, last = false) {
    // Buttons are now injected directly into #app container, so return empty string
    return '';
}

/**
 * Injects navigation buttons directly into the #app container
 * @function injectNavigationButtons
 * @param {boolean} first - Whether this is the first page (default: false)
 * @param {boolean} last - Whether this is the last page (default: false)
 * @returns {void}
 */
function injectNavigationButtons(first = false, last = false) {
    // Remove any existing navigation buttons
    const existingButtons = document.querySelectorAll('.prev-btn, .next-btn');
    existingButtons.forEach(btn => btn.remove());
    
    const appContainer = document.getElementById('app');
    if (!appContainer) return;
    
    // Add previous button unless it's the first page
    if (!first && canGoPrev()) {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'prev-btn';
        prevBtn.textContent = '‹ Back';
        prevBtn.onclick = navigatePrev;
        appContainer.appendChild(prevBtn);
    }
    
    // Add next button unless it's the last page
    if (!last && canGoNext()) {
        const nextBtn = document.createElement('button');
        nextBtn.className = 'next-btn';
        nextBtn.textContent = 'Next ›';
        nextBtn.onclick = navigateNext;
        appContainer.appendChild(nextBtn);
    }
}

/**
 * Gets current page information for debugging purposes
 * @function getCurrentPageInfo
 * @returns {Object} Object containing current page index, total pages, and navigation state
 */
function getCurrentPageInfo() {
    const flattened = getFlattenedNavigation();
    const currentIndex = getCurrentPageIndex();
    const currentItem = flattened[currentIndex];
    
    return {
        index: currentIndex,
        total: flattened.length,
        current: currentItem,
        canPrev: canGoPrev(),
        canNext: canGoNext(),
        progress: Math.round(((currentIndex + 1) / flattened.length) * 100),
        metadata: currentItem ? getLevelMetadata(currentItem) : null
    };
}

/**
 * Gets enhanced level metadata
 * @function getLevelMetadata
 * @param {Object} item - Navigation item
 * @returns {Object} Enhanced metadata
 */
function getLevelMetadata(item) {
    if (!item) return null;
    
    return {
        id: item.id,
        name: item.name,
        difficulty: item.difficulty || 'unknown',
        estimatedTime: item.estimatedTime || 0,
        type: item.type || 'content',
        description: item.description || '',
        icon: item.icon || '📄',
        tags: item.tags || [],
        prerequisites: item.prerequisites || [],
        isLoaded: levelLoader ? levelLoader.isCached(item.levelId || item.id) : false,
        isLoading: levelLoader ? levelLoader.isLoading(item.levelId || item.id) : false
    };
}

/**
 * Updates navigation progress indicator
 * @function updateNavigationProgress
 * @param {number} currentIndex - Current page index
 * @param {number} totalPages - Total number of pages
 */
function updateNavigationProgress(currentIndex, totalPages) {
    if (!NAVIGATION_CONFIG.config?.showProgress) return;
    
    const progress = Math.round(((currentIndex + 1) / totalPages) * 100);
    
    // Update progress bar if it exists
    const progressBar = document.querySelector('.navigation-progress-bar');
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
        progressBar.setAttribute('aria-valuenow', progress);
    }
    
    // Update progress text if it exists
    const progressText = document.querySelector('.navigation-progress-text');
    if (progressText) {
        progressText.textContent = `${currentIndex + 1} of ${totalPages}`;
    }
    
    // Update browser title with progress
    const currentItem = getFlattenedNavigation()[currentIndex];
    if (currentItem) {
        document.title = `${currentItem.name} (${progress}%) - MLTEACH`;
    }
}

/**
 * Shows navigation error message
 * @function showNavigationError
 * @param {string} title - Error title
 * @param {string} message - Error message
 */
function showNavigationError(title, message) {
    const appContainer = document.getElementById('app');
    if (!appContainer) return;
    
    const errorElement = document.createElement('div');
    errorElement.className = 'navigation-error';
    errorElement.innerHTML = `
        <div style="
            background: rgba(255, 99, 71, 0.1);
            border: 2px solid rgba(255, 99, 71, 0.3);
            border-radius: 15px;
            padding: 30px;
            margin: 20px;
            text-align: center;
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
        ">
            <div style="font-size: 48px; margin-bottom: 20px;">⚠️</div>
            <h3 style="color: #d32f2f; margin: 0 0 15px 0;">${title}</h3>
            <p style="color: #666; margin: 0 0 20px 0;">${message}</p>
            <button onclick="location.reload()" style="
                background: #667eea;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 8px;
                font-size: 1rem;
                cursor: pointer;
            ">Reload Page</button>
        </div>
    `;
    
    appContainer.innerHTML = '';
    appContainer.appendChild(errorElement);
}

/**
 * Creates enhanced progress indicator HTML
 * @function createProgressIndicator
 * @returns {string} HTML for progress indicator
 */
function createProgressIndicator() {
    if (!NAVIGATION_CONFIG.config?.showProgress) return '';
    
    const pageInfo = getCurrentPageInfo();
    
    return `
        <div class="navigation-progress" style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: rgba(255, 255, 255, 0.2);
            z-index: 1000;
        ">
            <div class="navigation-progress-bar" style="
                height: 100%;
                background: linear-gradient(90deg, #667eea, #764ba2);
                width: ${pageInfo.progress}%;
                transition: width 0.3s ease;
            " role="progressbar" aria-valuenow="${pageInfo.progress}" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <div class="navigation-progress-info" style="
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 8px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            z-index: 1001;
        ">
            <span class="navigation-progress-text">${pageInfo.index + 1} of ${pageInfo.total}</span>
            <span style="margin-left: 10px;">${pageInfo.progress}%</span>
        </div>
    `;
}

/**
 * Initializes enhanced navigation for any page
 * @function initializeNavigation
 * @param {string} pageId - Unique identifier for the page
 * @param {string} functionName - Name of the function that creates this page
 * @param {boolean} first - Whether this is the first page (default: false)
 * @param {boolean} last - Whether this is the last page (default: false)
 * @returns {void}
 */
function initializeNavigation(pageId, functionName, first = false, last = false) {
    // Update global state and gameState
    gameState.currentNavigationId = pageId;
    gameState.currentPageFunction = functionName;
    window.currentPageFunction = functionName; // Keep for backward compatibility
    
    // Inject hamburger navigation
    injectNavigation();
    updateNavigationHighlight(pageId);
    
    // Inject enhanced navigation buttons into app container
    injectNavigationButtons(first, last);
    
    // Inject progress indicator if enabled
    injectProgressIndicator();
    
    // Update navigation progress
    const flattened = getFlattenedNavigation();
    const currentIndex = getCurrentPageIndex();
    updateNavigationProgress(currentIndex, flattened.length);
    
    // Scroll to top of app container
    scrollAppToTop();
    
    // Log enhanced navigation info
    const pageInfo = getCurrentPageInfo();
    console.log('Enhanced navigation initialized:', {
        ...pageInfo,
        levelLoader: false, // Disabled for now
        lazyLoadEnabled: false // Disabled for now
    });
}

/**
 * Injects progress indicator into the page
 * @function injectProgressIndicator
 */
function injectProgressIndicator() {
    // Remove existing progress indicator
    const existing = document.querySelector('.navigation-progress');
    if (existing) {
        existing.remove();
    }
    
    const existingInfo = document.querySelector('.navigation-progress-info');
    if (existingInfo) {
        existingInfo.remove();
    }
    
    // Add new progress indicator
    const progressHTML = createProgressIndicator();
    if (progressHTML) {
        document.body.insertAdjacentHTML('beforeend', progressHTML);
    }
}

/**
 * Gets the total number of pages in navigation
 * @function getTotalPages
 * @returns {number} Total number of pages
 */
function getTotalPages() {
    const flattened = getFlattenedNavigation();
    return flattened.length;
}

// Make navigation functions globally accessible for other scripts
// This ensures compatibility with existing code that expects these functions
if (typeof window !== 'undefined') {
    window.getFlattenedNavigation = getFlattenedNavigation;
    window.getCurrentPageIndex = getCurrentPageIndex;
    window.getTotalPages = getTotalPages;
    window.getCurrentPageInfo = getCurrentPageInfo;
    window.getLevelMetadata = getLevelMetadata;
    window.canGoNext = canGoNext;
    window.canGoPrev = canGoPrev;
    window.navigateNext = navigateNext;
    window.navigatePrev = navigatePrev;
    window.updateNavigationProgress = updateNavigationProgress;
    window.showNavigationError = showNavigationError;
    window.createProgressIndicator = createProgressIndicator;
    window.injectProgressIndicator = injectProgressIndicator;
    window.initializeNavigation = initializeNavigation;
    window.createStandardNavigation = createStandardNavigation;
    window.injectNavigationButtons = injectNavigationButtons;
    window.scrollAppToTop = scrollAppToTop;
}
