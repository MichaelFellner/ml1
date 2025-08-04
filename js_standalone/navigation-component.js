// navigation-component.js - Reusable hamburger navigation component

// Global variable to track current level for navigation highlighting
let currentNavigationId = 'intro';

function createNavigationHTML() {
    return `
        <div class="hamburger-nav">
            <button class="hamburger-btn" id="hamburgerBtn" aria-label="Open navigation menu">
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
            </button>
            
            <nav class="nav-menu" id="navMenu">
                <div class="nav-header">
                    <h3>AI Learning Journey</h3>
                    <button class="nav-close" id="navCloseBtn">&times;</button>
                </div>
                
                <div class="nav-content">
                    ${generateNavigationSections()}
                </div>
                
                <div class="nav-footer">
                    <div class="progress-indicator">
                        <span id="progressText">Progress: Loading...</span>
                        <div class="progress-bar">
                            <div class="progress-fill" id="progressFill" style="width: 0%"></div>
                        </div>
                    </div>
                </div>
            </nav>
            
            <div class="nav-overlay" id="navOverlay"></div>
        </div>
    `;
}

function generateNavigationSections() {
    return NAVIGATION_CONFIG.sections.map(section => `
        <div class="nav-section">
            <h4 class="nav-section-title">${section.title}</h4>
            <ul class="nav-section-items">
                ${section.items.map(item => `
                    <li class="nav-item ${item.id === currentNavigationId ? 'current' : ''}" 
                        data-id="${item.id}" 
                        data-func="${item.func}">
                        <span class="nav-item-text">${item.name}</span>
                        ${item.id === currentNavigationId ? '<span class="current-indicator">●</span>' : ''}
                    </li>
                `).join('')}
            </ul>
        </div>
    `).join('');
}

function setupNavigationEvents() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navCloseBtn = document.getElementById('navCloseBtn');
    const navOverlay = document.getElementById('navOverlay');
    const navItems = document.querySelectorAll('.nav-item');
    
    if (!hamburgerBtn || !navMenu) return; // Safety check
    
    // Open menu
    hamburgerBtn.addEventListener('click', () => {
        navMenu.classList.add('open');
        navOverlay.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
    
    // Close menu
    function closeMenu() {
        navMenu.classList.remove('open');
        navOverlay.classList.remove('open');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    navCloseBtn.addEventListener('click', closeMenu);
    navOverlay.addEventListener('click', closeMenu);
    
    // Handle navigation item clicks
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const functionName = item.dataset.func;
            const itemId = item.dataset.id;
            
            // Update current navigation
            currentNavigationId = itemId;
            window.currentPageFunction = functionName;
            
            // Call the appropriate function
            if (window[functionName]) {
                closeMenu();
                window[functionName]();
            } else {
                console.warn(`Function ${functionName} not found`);
            }
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('open')) {
            closeMenu();
        }
    });
    
    // Update progress indicator
    updateProgressIndicator();
}

function updateProgressIndicator() {
    const progressText = document.getElementById('progressText');
    const progressFill = document.getElementById('progressFill');
    
    if (!progressText || !progressFill) return;
    
    // Calculate progress based on completed levels
    const totalItems = NAVIGATION_CONFIG.sections.reduce((total, section) => total + section.items.length, 0);
    const currentIndex = findCurrentItemIndex();
    const progressPercentage = Math.round((currentIndex / totalItems) * 100);
    
    progressText.textContent = `Progress: ${currentIndex}/${totalItems} (${progressPercentage}%)`;
    progressFill.style.width = `${progressPercentage}%`;
}

function findCurrentItemIndex() {
    let index = 0;
    for (const section of NAVIGATION_CONFIG.sections) {
        for (const item of section.items) {
            if (item.id === currentNavigationId) {
                return index + 1; // +1 because we want 1-based counting
            }
            index++;
        }
    }
    return 0;
}

// Helper function to inject navigation into any level
function injectNavigation(containerId = 'app') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Check if navigation already exists
    if (container.querySelector('.hamburger-nav')) {
        return; // Already exists
    }
    
    // Create a wrapper for the navigation
    const navWrapper = document.createElement('div');
    navWrapper.innerHTML = createNavigationHTML();
    
    // Insert navigation at the beginning of the container
    container.insertBefore(navWrapper.firstElementChild, container.firstChild);
    
    // Set up event listeners
    setupNavigationEvents();
}

// Function to update navigation highlighting when switching levels
function updateNavigationHighlight(newId) {
    currentNavigationId = newId;
    
    // Update the navigation if it exists
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const indicator = item.querySelector('.current-indicator');
        if (item.dataset.id === newId) {
            item.classList.add('current');
            if (!indicator) {
                item.innerHTML += '<span class="current-indicator">●</span>';
            }
        } else {
            item.classList.remove('current');
            if (indicator) {
                indicator.remove();
            }
        }
    });
    
    updateProgressIndicator();
}

// Helper function to create levels with navigation
function createLevelWithNav(levelId, contentHTML, setupFunction) {
    const container = document.getElementById('app');
    
    // Set the content
    container.innerHTML = contentHTML;
    
    // Inject navigation
    injectNavigation();
    
    // Update navigation highlighting
    updateNavigationHighlight(levelId);
    
    // Store current page function for navigation
    window.currentPageFunction = findFunctionNameById(levelId);
    
    // Run the setup function if provided
    if (setupFunction) {
        setupFunction();
    }
}

// Helper function to find function name by level id
function findFunctionNameById(levelId) {
    for (const section of NAVIGATION_CONFIG.sections) {
        for (const item of section.items) {
            if (item.id === levelId) {
                return item.func;
            }
        }
    }
    return 'createIntroduction';
}