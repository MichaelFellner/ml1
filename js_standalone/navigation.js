// navigation.js - Centralized navigation system

// Flatten the nested navigation config into a linear sequence
function getFlattenedNavigation() {
    const flattened = [];
    NAVIGATION_CONFIG.sections.forEach(section => {
        section.items.forEach(item => {
            flattened.push(item);
        });
    });
    return flattened;
}

// Get current page index in the linear sequence
function getCurrentPageIndex() {
    const flattened = getFlattenedNavigation();
    const currentFunc = window.currentPageFunction || 'createIntroduction';
    return flattened.findIndex(item => item.func === currentFunc);
}

// Navigation functions
function canGoNext() {
    const flattened = getFlattenedNavigation();
    const currentIndex = getCurrentPageIndex();
    return currentIndex >= 0 && currentIndex < flattened.length - 1;
}

function canGoPrev() {
    const currentIndex = getCurrentPageIndex();
    return currentIndex > 0;
}

function navigateNext() {
    if (canGoNext()) {
        const flattened = getFlattenedNavigation();
        const currentIndex = getCurrentPageIndex();
        const nextItem = flattened[currentIndex + 1];
        
        if (window[nextItem.func]) {
            window[nextItem.func]();
        }
    }
}

function navigatePrev() {
    if (canGoPrev()) {
        const flattened = getFlattenedNavigation();
        const currentIndex = getCurrentPageIndex();
        const prevItem = flattened[currentIndex - 1];
        
        if (window[prevItem.func]) {
            window[prevItem.func]();
        }
    }
}

// Create standardized navigation buttons
function createStandardNavigation(first = false, last = false) {
    let navigationHTML = '<div class="navigation-buttons">';
    
    // Add previous button unless it's the first page
    if (!first) {
        const prevDisabled = !canGoPrev() ? 'disabled' : '';
        const prevText = canGoPrev() ? '‹ Previous' : '‹';
        navigationHTML += `<button class="prev-btn" ${prevDisabled} onclick="navigatePrev()">${prevText}</button>`;
    }
    
    // Add next button unless it's the last page
    if (!last) {
        const nextDisabled = !canGoNext() ? 'disabled' : '';
        const nextText = canGoNext() ? 'Next ›' : '›';
        navigationHTML += `<button class="next-btn" ${nextDisabled} onclick="navigateNext()">${nextText}</button>`;
    }
    
    navigationHTML += '</div>';
    return navigationHTML;
}

// Get current page info for debugging
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

// Initialize navigation for any page
function initializeNavigation(pageId, functionName) {
    // Update global state
    currentNavigationId = pageId;
    window.currentPageFunction = functionName;
    
    // Inject hamburger navigation
    injectNavigation();
    updateNavigationHighlight(pageId);
    
    console.log('Navigation initialized:', getCurrentPageInfo());
}
