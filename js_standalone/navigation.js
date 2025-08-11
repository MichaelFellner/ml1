/**
 * @fileoverview Centralized navigation system for the MLTEACH application.
 * Handles page navigation, button states, and navigation flow.
 */

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
 * Navigates to the next page in the sequence
 * @function navigateNext
 * @description Moves to next page if available and calls the appropriate creation function
 * @returns {void}
 */
function navigateNext() {
    if (canGoNext()) {
        const flattened = getFlattenedNavigation();
        const currentIndex = getCurrentPageIndex();
        const nextItem = flattened[currentIndex + 1];
        
        if (window[nextItem.func]) {
            window[nextItem.func]();
            scrollAppToTop();
        }
    }
}

/**
 * Navigates to the previous page in the sequence
 * @function navigatePrev
 * @description Moves to previous page if available and calls the appropriate creation function
 * @returns {void}
 */
function navigatePrev() {
    if (canGoPrev()) {
        const flattened = getFlattenedNavigation();
        const currentIndex = getCurrentPageIndex();
        const prevItem = flattened[currentIndex - 1];
        
        if (window[prevItem.func]) {
            window[prevItem.func]();
            scrollAppToTop();
        }
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
        canNext: canGoNext()
    };
}

/**
 * Initializes navigation for any page
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
    
    // Inject navigation buttons into app container
    injectNavigationButtons(first, last);
    
    // UNUSED: Custom scrollbar initialization was removed
    // Previously checked for window.initializeCustomScrollbar function
    // which no longer exists in the codebase
    
    // Scroll to top of app container
    scrollAppToTop();
    
    console.log('Navigation initialized:', getCurrentPageInfo());
}
