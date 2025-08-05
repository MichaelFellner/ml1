// level-transitions.js - Smooth animated transitions between levels

class LevelTransitions {
    constructor() {
        this.transitionDuration = 300; // ms
        this.currentTransition = 'fade'; // default transition
        
        // Available transition types
        this.transitions = {
            fade: this.fadeTransition.bind(this),
            slide: this.slideTransition.bind(this),
            scale: this.scaleTransition.bind(this),
            flip: this.flipTransition.bind(this),
            blur: this.blurTransition.bind(this),
            morph: this.morphTransition.bind(this)
        };
        
        this.injectStyles();
    }
    
    // Inject CSS for transitions
    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Transition container styles */
            #app {
                position: relative;
                perspective: 1000px;
            }
            
            /* Fade transition */
            .fade-out {
                animation: fadeOut 0.3s ease-out forwards;
            }
            
            .fade-in {
                animation: fadeIn 0.3s ease-out forwards;
            }
            
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            /* Slide transition */
            .slide-out-left {
                animation: slideOutLeft 0.3s ease-in-out forwards;
            }
            
            .slide-in-right {
                animation: slideInRight 0.3s ease-in-out forwards;
            }
            
            .slide-out-right {
                animation: slideOutRight 0.3s ease-in-out forwards;
            }
            
            .slide-in-left {
                animation: slideInLeft 0.3s ease-in-out forwards;
            }
            
            @keyframes slideOutLeft {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(-100%); opacity: 0; }
            }
            
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            
            @keyframes slideInLeft {
                from { transform: translateX(-100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            /* Scale transition */
            .scale-out {
                animation: scaleOut 0.3s ease-in-out forwards;
            }
            
            .scale-in {
                animation: scaleIn 0.3s ease-in-out forwards;
            }
            
            @keyframes scaleOut {
                from { transform: scale(1); opacity: 1; }
                to { transform: scale(0.8); opacity: 0; }
            }
            
            @keyframes scaleIn {
                from { transform: scale(1.2); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
            
            /* Flip transition */
            .flip-out {
                animation: flipOut 0.4s ease-in-out forwards;
                transform-style: preserve-3d;
            }
            
            .flip-in {
                animation: flipIn 0.4s ease-in-out forwards;
                transform-style: preserve-3d;
            }
            
            @keyframes flipOut {
                from { transform: rotateY(0); opacity: 1; }
                to { transform: rotateY(90deg); opacity: 0; }
            }
            
            @keyframes flipIn {
                from { transform: rotateY(-90deg); opacity: 0; }
                to { transform: rotateY(0); opacity: 1; }
            }
            
            /* Blur transition */
            .blur-out {
                animation: blurOut 0.3s ease-out forwards;
            }
            
            .blur-in {
                animation: blurIn 0.3s ease-out forwards;
            }
            
            @keyframes blurOut {
                from { filter: blur(0); opacity: 1; }
                to { filter: blur(10px); opacity: 0; }
            }
            
            @keyframes blurIn {
                from { filter: blur(10px); opacity: 0; }
                to { filter: blur(0); opacity: 1; }
            }
            
            /* Morph transition */
            .morph-out {
                animation: morphOut 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
            }
            
            .morph-in {
                animation: morphIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
            }
            
            @keyframes morphOut {
                0% { transform: scale(1) rotate(0); opacity: 1; }
                50% { transform: scale(1.1) rotate(5deg); }
                100% { transform: scale(0) rotate(10deg); opacity: 0; }
            }
            
            @keyframes morphIn {
                0% { transform: scale(0) rotate(-10deg); opacity: 0; }
                50% { transform: scale(1.1) rotate(-5deg); }
                100% { transform: scale(1) rotate(0); opacity: 1; }
            }
            
            /* Prevent layout shifts during transitions */
            .transitioning {
                overflow: hidden;
                pointer-events: none;
            }
            
            /* Loading spinner for slow loads */
            .loading-spinner {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 50px;
                height: 50px;
                border: 3px solid rgba(255, 255, 255, 0.3);
                border-top-color: #4285f4;
                border-radius: 50%;
                animation: spin 0.8s linear infinite;
                z-index: 1000;
                display: none;
            }
            
            .loading .loading-spinner {
                display: block;
            }
            
            @keyframes spin {
                to { transform: translate(-50%, -50%) rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        // Add loading spinner to app
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        document.getElementById('app').appendChild(spinner);
    }
    
    // Fade transition
    async fadeTransition(currentContent, newContent, container) {
        currentContent.classList.add('fade-out');
        await this.wait(this.transitionDuration);
        
        container.innerHTML = newContent;
        const newElement = container.querySelector('.current-level');
        if (newElement) {
            newElement.classList.add('fade-in');
        }
    }
    
    // Slide transition
    async slideTransition(currentContent, newContent, container, direction = 'next') {
        if (direction === 'next') {
            currentContent.classList.add('slide-out-left');
        } else {
            currentContent.classList.add('slide-out-right');
        }
        
        await this.wait(this.transitionDuration);
        
        container.innerHTML = newContent;
        const newElement = container.querySelector('.current-level');
        if (newElement) {
            if (direction === 'next') {
                newElement.classList.add('slide-in-right');
            } else {
                newElement.classList.add('slide-in-left');
            }
        }
    }
    
    // Scale transition
    async scaleTransition(currentContent, newContent, container) {
        currentContent.classList.add('scale-out');
        await this.wait(this.transitionDuration);
        
        container.innerHTML = newContent;
        const newElement = container.querySelector('.current-level');
        if (newElement) {
            newElement.classList.add('scale-in');
        }
    }
    
    // Flip transition
    async flipTransition(currentContent, newContent, container) {
        currentContent.classList.add('flip-out');
        await this.wait(this.transitionDuration * 1.3);
        
        container.innerHTML = newContent;
        const newElement = container.querySelector('.current-level');
        if (newElement) {
            newElement.classList.add('flip-in');
        }
    }
    
    // Blur transition
    async blurTransition(currentContent, newContent, container) {
        currentContent.classList.add('blur-out');
        await this.wait(this.transitionDuration);
        
        container.innerHTML = newContent;
        const newElement = container.querySelector('.current-level');
        if (newElement) {
            newElement.classList.add('blur-in');
        }
    }
    
    // Morph transition
    async morphTransition(currentContent, newContent, container) {
        currentContent.classList.add('morph-out');
        await this.wait(this.transitionDuration * 1.3);
        
        container.innerHTML = newContent;
        const newElement = container.querySelector('.current-level');
        if (newElement) {
            newElement.classList.add('morph-in');
        }
    }
    
    // Utility function to wait
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // Main transition method
    async transition(newContent, direction = 'next', type = null) {
        const container = document.getElementById('app');
        const currentContent = container.querySelector('.current-level');
        
        if (!currentContent) {
            // No current content, just load the new content
            container.innerHTML = newContent;
            return;
        }
        
        // Add transitioning class to prevent interactions
        container.classList.add('transitioning');
        
        // Use specified transition type or default
        const transitionType = type || this.currentTransition;
        const transitionFunc = this.transitions[transitionType];
        
        if (transitionFunc) {
            await transitionFunc(currentContent, newContent, container, direction);
        } else {
            // Fallback to fade
            await this.fadeTransition(currentContent, newContent, container);
        }
        
        // Remove transitioning class
        container.classList.remove('transitioning');
        
        // Trigger wrapper for scrollbar fix
        if (window.wrapLevelContent) {
            setTimeout(window.wrapLevelContent, 10);
        }
    }
    
    // Set default transition type
    setTransitionType(type) {
        if (this.transitions[type]) {
            this.currentTransition = type;
        }
    }
    
    // Show loading state
    showLoading() {
        document.getElementById('app').classList.add('loading');
    }
    
    // Hide loading state
    hideLoading() {
        document.getElementById('app').classList.remove('loading');
    }
}

// Initialize global transition manager
window.levelTransitions = new LevelTransitions();

// Override navigation with smooth transitions
const enhanceNavigation = () => {
    const originalNext = window.navigateNext;
    const originalPrev = window.navigatePrev;
    
    window.navigateNext = async function() {
        if (canGoNext()) {
            const flattened = getFlattenedNavigation();
            const currentIndex = getCurrentPageIndex();
            const nextItem = flattened[currentIndex + 1];
            
            // Generate or get cached content
            const tempDiv = document.createElement('div');
            tempDiv.id = 'temp-app';
            const originalApp = document.getElementById('app');
            
            // Temporarily swap IDs to generate content
            originalApp.id = 'app-temp';
            document.body.appendChild(tempDiv);
            tempDiv.id = 'app';
            
            // Generate content
            if (window[nextItem.func]) {
                window[nextItem.func]();
            }
            
            const newContent = tempDiv.innerHTML;
            
            // Restore original app
            tempDiv.remove();
            originalApp.id = 'app';
            
            // Perform transition
            await window.levelTransitions.transition(newContent, 'next', 'slide');
            
            // Update state
            window.currentPageFunction = nextItem.func;
            
            // Re-run setup if exists
            const setupFunc = nextItem.func.replace('create', 'setup');
            if (window[setupFunc]) {
                window[setupFunc]();
            }
            
            // Scroll to top
            scrollAppToTop();
        }
    };
    
    window.navigatePrev = async function() {
        if (canGoPrev()) {
            const flattened = getFlattenedNavigation();
            const currentIndex = getCurrentPageIndex();
            const prevItem = flattened[currentIndex - 1];
            
            // Generate or get cached content
            const tempDiv = document.createElement('div');
            tempDiv.id = 'temp-app';
            const originalApp = document.getElementById('app');
            
            // Temporarily swap IDs to generate content
            originalApp.id = 'app-temp';
            document.body.appendChild(tempDiv);
            tempDiv.id = 'app';
            
            // Generate content
            if (window[prevItem.func]) {
                window[prevItem.func]();
            }
            
            const newContent = tempDiv.innerHTML;
            
            // Restore original app
            tempDiv.remove();
            originalApp.id = 'app';
            
            // Perform transition
            await window.levelTransitions.transition(newContent, 'prev', 'slide');
            
            // Update state
            window.currentPageFunction = prevItem.func;
            
            // Re-run setup if exists
            const setupFunc = prevItem.func.replace('create', 'setup');
            if (window[setupFunc]) {
                window[setupFunc]();
            }
            
            // Scroll to top
            scrollAppToTop();
        }
    };
};

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhanceNavigation);
} else {
    enhanceNavigation();
}

// Add transition type selector (optional UI)
window.addTransitionSelector = function() {
    const selector = document.createElement('div');
    selector.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: rgba(255, 255, 255, 0.9);
        padding: 10px;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 1000;
        font-size: 14px;
    `;
    
    selector.innerHTML = `
        <label style="margin-right: 10px;">Transition:</label>
        <select id="transitionSelector" style="padding: 5px; border-radius: 5px; border: 1px solid #ddd;">
            <option value="fade">Fade</option>
            <option value="slide" selected>Slide</option>
            <option value="scale">Scale</option>
            <option value="flip">Flip</option>
            <option value="blur">Blur</option>
            <option value="morph">Morph</option>
        </select>
    `;
    
    document.body.appendChild(selector);
    
    document.getElementById('transitionSelector').addEventListener('change', (e) => {
        window.levelTransitions.setTransitionType(e.target.value);
    });
};

// Uncomment to add transition selector UI
// window.addTransitionSelector();
