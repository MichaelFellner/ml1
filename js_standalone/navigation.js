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

// Utility function to scroll content box to top
function scrollAppToTop() {
    // Small delay to ensure content is rendered first
    setTimeout(() => {
        const contentBox = document.querySelector('.current-level');
        if (contentBox) {
            contentBox.scrollTop = 0;
        }
    }, 50);
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
            scrollAppToTop();
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
            scrollAppToTop();
        }
    }
}

// Create standardized navigation buttons (returns empty string since buttons are injected separately)
function createStandardNavigation(first = false, last = false) {
    // Buttons are now injected directly into #app container, so return empty string
    return '';
}

// Inject navigation buttons directly into #app container
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
function initializeNavigation(pageId, functionName, first = false, last = false) {
    // Update global state
    currentNavigationId = pageId;
    window.currentPageFunction = functionName;
    
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
