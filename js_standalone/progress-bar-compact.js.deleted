// progress-bar-compact.js - Simplified progress bar option

class CompactProgressBar {
    constructor() {
        this.createCompactBar();
        this.updateProgress();
    }
    
    createCompactBar() {
        // Create simple progress line at very top
        const bar = document.createElement('div');
        bar.id = 'compact-progress-bar';
        bar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: rgba(0, 0, 0, 0.1);
            z-index: 10000;
            transition: opacity 0.3s ease;
        `;
        
        // Progress fill
        const fill = document.createElement('div');
        fill.id = 'compact-progress-fill';
        fill.style.cssText = `
            height: 100%;
            width: 0%;
            background: linear-gradient(90deg, #4285f4 0%, #34a853 50%, #fbbc04 100%);
            transition: width 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
            box-shadow: 0 0 10px rgba(66, 133, 244, 0.5);
        `;
        
        bar.appendChild(fill);
        document.body.appendChild(bar);
        
        // Store reference
        this.fill = fill;
        this.bar = bar;
    }
    
    updateProgress() {
        const flattened = getFlattenedNavigation();
        const currentIndex = getCurrentPageIndex();
        if (currentIndex < 0) return;
        
        const percentage = ((currentIndex + 1) / flattened.length) * 100;
        this.fill.style.width = `${percentage}%`;
        
        // Pulse when complete
        if (percentage === 100) {
            this.fill.style.animation = 'pulse-bar 1s ease';
        }
    }
    
    show() {
        this.bar.style.opacity = '1';
    }
    
    hide() {
        this.bar.style.opacity = '0';
    }
}

// Add CSS for compact bar
const compactStyles = document.createElement('style');
compactStyles.textContent = `
    @keyframes pulse-bar {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    }
    
    #compact-progress-bar:hover #compact-progress-fill {
        height: 6px !important;
        box-shadow: 0 0 20px rgba(66, 133, 244, 0.7);
    }
`;
document.head.appendChild(compactStyles);

// Option to use compact bar instead
window.useCompactProgressBar = function() {
    // Hide full progress bar if it exists
    const fullBar = document.getElementById('progress-bar-container');
    if (fullBar) {
        fullBar.style.display = 'none';
        document.body.style.paddingTop = '20px';
    }
    
    // Create compact bar
    window.compactProgressBar = new CompactProgressBar();
    
    // Hook into navigation
    const originalNavigateNext = window.navigateNext;
    const originalNavigatePrev = window.navigatePrev;
    
    window.navigateNext = function() {
        const result = originalNavigateNext.apply(this, arguments);
        setTimeout(() => window.compactProgressBar.updateProgress(), 100);
        return result;
    };
    
    window.navigatePrev = function() {
        const result = originalNavigatePrev.apply(this, arguments);
        setTimeout(() => window.compactProgressBar.updateProgress(), 100);
        return result;
    };
};
