// progress-bar-fixed.js - Progress bar positioned above content with text inside

class FixedProgressBar {
    constructor() {
        this.sections = [];
        this.totalLevels = 0;
        this.currentIndex = 0;
        
        this.initializeSections();
        this.createProgressBar();
        this.updateProgress();
        
        // Listen for window resize
        window.addEventListener('resize', () => this.updateProgress());
    }
    
    initializeSections() {
        // Flatten navigation and track section boundaries
        this.sections = [];
        let levelCount = 0;
        
        NAVIGATION_CONFIG.sections.forEach((section, sectionIndex) => {
            const sectionStart = levelCount;
            const sectionLevels = section.items.length;
            
            this.sections.push({
                name: section.name,
                start: sectionStart,
                end: sectionStart + sectionLevels - 1,
                levels: sectionLevels,
                percentage: (sectionLevels / NAVIGATION_CONFIG.sections.reduce((acc, s) => acc + s.items.length, 0)) * 100,
                color: this.getSectionColor(sectionIndex)
            });
            
            levelCount += sectionLevels;
        });
        
        this.totalLevels = levelCount;
    }
    
    getSectionColor(index) {
        const colors = [
            '#4285f4', // Blue
            '#ea4335', // Red
            '#fbbc04', // Yellow
            '#34a853', // Green
            '#9333ea', // Purple
            '#ec4899', // Pink
            '#f97316', // Orange
        ];
        return colors[index % colors.length];
    }
    
    createProgressBar() {
        // Create wrapper that will position above current-level
        const wrapper = document.createElement('div');
        wrapper.id = 'progress-bar-wrapper';
        wrapper.style.cssText = `
            position: absolute;
            top: -60px;
            left: 0;
            right: 0;
            height: 50px;
            z-index: 100;
            pointer-events: none;
        `;
        
        // Create the actual progress bar container
        const container = document.createElement('div');
        container.id = 'fixed-progress-bar';
        container.style.cssText = `
            position: relative;
            width: 100%;
            height: 50px;
            background: transparent;
            display: flex;
            align-items: center;
        `;
        
        // Create track
        const track = document.createElement('div');
        track.style.cssText = `
            position: relative;
            width: 100%;
            height: 35px;
            background: rgba(255, 255, 255, 0.25);
            border-radius: 20px;
            overflow: visible;
            backdrop-filter: blur(10px);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1), inset 0 1px 3px rgba(0, 0, 0, 0.2);
            pointer-events: auto;
            display: flex;
            align-items: center;
        `;
        
        // Create filled progress
        const fill = document.createElement('div');
        fill.id = 'progress-fill-fixed';
        fill.style.cssText = `
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 0%;
            background: linear-gradient(90deg, 
                rgba(66, 133, 244, 0.8) 0%, 
                rgba(52, 168, 83, 0.8) 100%);
            border-radius: 20px;
            transition: width 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
            box-shadow: 0 2px 8px rgba(66, 133, 244, 0.4);
            z-index: 1;
        `;
        track.appendChild(fill);
        
        // Create section labels and markers
        this.sections.forEach((section, index) => {
            // Calculate position
            const startPercent = (section.start / this.totalLevels) * 100;
            const endPercent = ((section.end + 1) / this.totalLevels) * 100;
            const centerPercent = (startPercent + endPercent) / 2;
            
            // Add section label inside the bar
            const label = document.createElement('div');
            label.className = 'section-label-fixed';
            label.style.cssText = `
                position: absolute;
                left: ${centerPercent}%;
                top: 50%;
                transform: translate(-50%, -50%);
                font-size: 11px;
                color: rgba(255, 255, 255, 0.95);
                font-style: italic;
                font-weight: 500;
                white-space: nowrap;
                text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
                z-index: 3;
                pointer-events: auto;
                cursor: pointer;
                transition: all 0.3s ease;
                user-select: none;
                letter-spacing: 0.3px;
            `;
            label.textContent = section.name;
            label.title = `${section.levels} ${section.levels === 1 ? 'level' : 'levels'}`;
            
            // Add hover effect
            label.onmouseover = () => {
                label.style.transform = 'translate(-50%, -50%) scale(1.15)';
                label.style.textShadow = '0 2px 5px rgba(0, 0, 0, 0.6)';
            };
            label.onmouseout = () => {
                label.style.transform = 'translate(-50%, -50%) scale(1)';
                label.style.textShadow = '0 1px 3px rgba(0, 0, 0, 0.4)';
            };
            
            // Click to jump to section
            label.onclick = () => this.jumpToSection(index);
            
            track.appendChild(label);
            
            // Add section marker (circle) at section boundaries
            if (index > 0) {
                const marker = document.createElement('div');
                marker.className = 'section-marker-fixed';
                marker.style.cssText = `
                    position: absolute;
                    left: ${startPercent}%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    width: 14px;
                    height: 14px;
                    background: white;
                    border: 2px solid rgba(255, 255, 255, 0.8);
                    border-radius: 50%;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
                    z-index: 2;
                `;
                track.appendChild(marker);
            }
        });
        
        // Create current position indicator
        const indicator = document.createElement('div');
        indicator.id = 'progress-indicator-fixed';
        indicator.style.cssText = `
            position: absolute;
            left: 0%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 22px;
            height: 22px;
            background: white;
            border: 3px solid #4285f4;
            border-radius: 50%;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
            transition: left 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
            z-index: 4;
            cursor: pointer;
            pointer-events: auto;
        `;
        track.appendChild(indicator);
        
        // Create percentage tooltip
        const percentLabel = document.createElement('div');
        percentLabel.id = 'progress-percent-fixed';
        percentLabel.style.cssText = `
            position: absolute;
            left: 50%;
            bottom: 100%;
            margin-bottom: 8px;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.85);
            color: white;
            padding: 4px 10px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 600;
            white-space: nowrap;
            opacity: 0;
            transition: all 0.3s ease;
            pointer-events: none;
        `;
        percentLabel.textContent = '0%';
        indicator.appendChild(percentLabel);
        
        // Show percentage on hover
        indicator.onmouseover = () => {
            percentLabel.style.opacity = '1';
        };
        indicator.onmouseout = () => {
            percentLabel.style.opacity = '0';
        };
        
        container.appendChild(track);
        wrapper.appendChild(container);
        
        // Store references
        this.wrapper = wrapper;
        this.container = container;
        this.fill = fill;
        this.indicator = indicator;
        this.percentLabel = percentLabel;
        
        // Will attach to current-level when it exists
        this.attachToContent();
    }
    
    attachToContent() {
        // Wait for current-level to exist
        const checkForContent = () => {
            const currentLevel = document.querySelector('.current-level');
            if (currentLevel && !this.wrapper.parentNode) {
                // Insert the progress bar as a sibling before current-level
                currentLevel.parentNode.insertBefore(this.wrapper, currentLevel);
                
                // Position it relatively to the current-level
                const rect = currentLevel.getBoundingClientRect();
                const parentRect = currentLevel.parentNode.getBoundingClientRect();
                
                this.wrapper.style.position = 'absolute';
                this.wrapper.style.top = '-70px';
                this.wrapper.style.left = '0';
                this.wrapper.style.right = '0';
                
                this.updateProgress();
            } else if (!currentLevel) {
                // Try again
                setTimeout(checkForContent, 100);
            }
        };
        
        checkForContent();
    }
    
    updateProgress() {
        const currentIndex = getCurrentPageIndex();
        if (currentIndex < 0) return;
        
        this.currentIndex = currentIndex;
        const percentage = ((currentIndex + 1) / this.totalLevels) * 100;
        
        // Update fill width
        if (this.fill) {
            this.fill.style.width = `${percentage}%`;
        }
        
        // Update indicator position
        if (this.indicator) {
            this.indicator.style.left = `${percentage}%`;
        }
        
        // Update percentage label
        if (this.percentLabel) {
            this.percentLabel.textContent = `${Math.round(percentage)}%`;
        }
        
        // Update current section highlighting
        this.updateSectionHighlight();
        
        // Update fill gradient based on current section
        const currentSection = this.getCurrentSection();
        if (currentSection && this.fill) {
            const nextSection = this.sections[this.sections.indexOf(currentSection) + 1];
            const color1 = currentSection.color;
            const color2 = nextSection ? nextSection.color : color1;
            this.fill.style.background = `linear-gradient(90deg, ${color1}cc 0%, ${color2}cc 100%)`;
            if (this.indicator) {
                this.indicator.style.borderColor = color1;
            }
        }
    }
    
    getCurrentSection() {
        return this.sections.find(section => 
            this.currentIndex >= section.start && this.currentIndex <= section.end
        );
    }
    
    updateSectionHighlight() {
        const labels = document.querySelectorAll('.section-label-fixed');
        const currentSection = this.getCurrentSection();
        
        labels.forEach((label, index) => {
            if (this.sections[index] === currentSection) {
                label.style.fontWeight = '700';
                label.style.fontSize = '12px';
                label.style.color = '#fff';
            } else {
                label.style.fontWeight = '500';
                label.style.fontSize = '11px';
                label.style.color = 'rgba(255, 255, 255, 0.95)';
            }
        });
    }
    
    jumpToSection(sectionIndex) {
        const section = this.sections[sectionIndex];
        if (!section) return;
        
        const flattened = getFlattenedNavigation();
        const targetItem = flattened[section.start];
        
        if (targetItem && window[targetItem.func]) {
            if (window.fastTransitions) {
                window.fastTransitions.quickTransition(() => {
                    window[targetItem.func]();
                }, this.currentIndex < section.start ? 'next' : 'prev');
            } else {
                window[targetItem.func]();
            }
            
            setTimeout(() => this.updateProgress(), 100);
        }
    }
}

// Initialize fixed progress bar
document.addEventListener('DOMContentLoaded', () => {
    // Remove any old progress bars
    const oldBars = document.querySelectorAll('#progress-bar-container, #aligned-progress-bar, #progress-bar-wrapper');
    oldBars.forEach(bar => bar.remove());
    
    window.fixedProgressBar = new FixedProgressBar();
    
    // Update on navigation
    const originalNavigateNext = window.navigateNext;
    const originalNavigatePrev = window.navigatePrev;
    
    window.navigateNext = function() {
        const result = originalNavigateNext.apply(this, arguments);
        setTimeout(() => {
            if (window.fixedProgressBar) {
                window.fixedProgressBar.updateProgress();
            }
        }, 100);
        return result;
    };
    
    window.navigatePrev = function() {
        const result = originalNavigatePrev.apply(this, arguments);
        setTimeout(() => {
            if (window.fixedProgressBar) {
                window.fixedProgressBar.updateProgress();
            }
        }, 100);
        return result;
    };
    
    // Re-attach on any major DOM changes
    const observer = new MutationObserver(() => {
        if (window.fixedProgressBar) {
            window.fixedProgressBar.attachToContent();
        }
    });
    
    observer.observe(document.getElementById('app'), {
        childList: true,
        subtree: false
    });
});

// Add styles
const fixedStyles = document.createElement('style');
fixedStyles.textContent = `
    /* Ensure app container has relative positioning for absolute children */
    #app {
        position: relative;
    }
    
    /* Make room for progress bar above current-level */
    .current-level {
        margin-top: 80px !important;
    }
    
    /* Pulse animation for indicator */
    @keyframes pulse-indicator-fixed {
        0%, 100% {
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
        }
        50% {
            box-shadow: 0 3px 20px rgba(66, 133, 244, 0.5);
        }
    }
    
    #progress-indicator-fixed {
        animation: pulse-indicator-fixed 2s infinite;
    }
    
    #progress-indicator-fixed:hover {
        animation: none;
        transform: translate(-50%, -50%) scale(1.2);
    }
    
    /* Ensure labels are readable */
    .section-label-fixed {
        mix-blend-mode: normal;
    }
    
    /* Mobile responsive */
    @media (max-width: 768px) {
        .section-label-fixed {
            font-size: 9px !important;
        }
        
        #progress-bar-wrapper {
            top: -50px !important;
        }
        
        .current-level {
            margin-top: 60px !important;
        }
    }
`;
document.head.appendChild(fixedStyles);
