// progress-bar-inline.js - Progress bar with text inside, positioned above content

class InlineProgressBar {
    constructor() {
        this.sections = [];
        this.totalLevels = 0;
        this.currentIndex = 0;
        
        this.initializeSections();
        this.createProgressBar();
        
        // Delay initial update to ensure DOM is ready
        setTimeout(() => {
            this.updateProgress();
        }, 100);
    }
    
    initializeSections() {
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
        // Create container that sits at the top of the page
        const container = document.createElement('div');
        container.id = 'inline-progress-bar';
        container.style.cssText = `
            position: fixed;
            top: 25px;
            left: 50%;
            transform: translateX(-50%);
            width: min(calc(100vw - 200px), 1200px);
            max-width: 1200px;
            height: 45px;
            z-index: 900;
            pointer-events: none;
        `;
        
        // Create track with labels inside
        const track = document.createElement('div');
        track.style.cssText = `
            position: relative;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(10px);
            border-radius: 25px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15), inset 0 2px 4px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            pointer-events: auto;
        `;
        
        // Create filled progress
        const fill = document.createElement('div');
        fill.id = 'inline-progress-fill';
        fill.style.cssText = `
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 0%;
            background: linear-gradient(90deg, 
                ${this.sections[0]?.color || '#4285f4'} 0%, 
                ${this.sections[1]?.color || '#34a853'} 100%);
            transition: width 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
            opacity: 0.8;
        `;
        track.appendChild(fill);
        
        // Add section labels and markers
        this.sections.forEach((section, index) => {
            const startPercent = (section.start / this.totalLevels) * 100;
            const endPercent = ((section.end + 1) / this.totalLevels) * 100;
            const centerPercent = (startPercent + endPercent) / 2;
            
            // Add vertical separator line between sections (except at start)
            if (index > 0) {
                const separator = document.createElement('div');
                separator.style.cssText = `
                    position: absolute;
                    left: ${startPercent}%;
                    top: 10%;
                    bottom: 10%;
                    width: 2px;
                    background: rgba(255, 255, 255, 0.5);
                    z-index: 2;
                `;
                track.appendChild(separator);
                
                // Add circle marker on the separator
                const marker = document.createElement('div');
                marker.style.cssText = `
                    position: absolute;
                    left: ${startPercent}%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    width: 16px;
                    height: 16px;
                    background: white;
                    border: 2px solid rgba(255, 255, 255, 0.8);
                    border-radius: 50%;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                    z-index: 3;
                `;
                track.appendChild(marker);
            }
            
            // Add section label centered in its section
            const label = document.createElement('div');
            label.className = 'inline-section-label';
            label.style.cssText = `
                position: absolute;
                left: ${centerPercent}%;
                top: 50%;
                transform: translate(-50%, -50%);
                color: white;
                font-size: 13px;
                font-style: italic;
                font-weight: 500;
                text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
                white-space: nowrap;
                z-index: 4;
                pointer-events: auto;
                cursor: pointer;
                transition: all 0.3s ease;
                user-select: none;
            `;
            label.textContent = section.name;
            label.title = `${section.levels} level${section.levels === 1 ? '' : 's'}`;
            
            // Hover effect
            label.onmouseover = () => {
                label.style.transform = 'translate(-50%, -50%) scale(1.1)';
                label.style.textShadow = '0 2px 6px rgba(0, 0, 0, 0.7)';
            };
            label.onmouseout = () => {
                label.style.transform = 'translate(-50%, -50%) scale(1)';
                label.style.textShadow = '0 1px 4px rgba(0, 0, 0, 0.5)';
            };
            
            // Click to jump
            label.onclick = () => this.jumpToSection(index);
            
            track.appendChild(label);
        });
        
        // Create position indicator
        const indicator = document.createElement('div');
        indicator.id = 'inline-progress-indicator';
        indicator.style.cssText = `
            position: absolute;
            left: 0%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 26px;
            height: 26px;
            background: white;
            border: 3px solid #4285f4;
            border-radius: 50%;
            box-shadow: 0 3px 12px rgba(0, 0, 0, 0.4);
            transition: left 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
            z-index: 5;
            cursor: pointer;
            pointer-events: auto;
        `;
        
        // Percentage tooltip
        const tooltip = document.createElement('div');
        tooltip.style.cssText = `
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            margin-bottom: 8px;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 4px 10px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 600;
            white-space: nowrap;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        `;
        tooltip.textContent = '0%';
        indicator.appendChild(tooltip);
        
        // Show tooltip on hover
        indicator.onmouseover = () => {
            tooltip.style.opacity = '1';
        };
        indicator.onmouseout = () => {
            tooltip.style.opacity = '0';
        };
        
        track.appendChild(indicator);
        container.appendChild(track);
        document.body.appendChild(container);
        
        // Store references
        this.container = container;
        this.fill = fill;
        this.indicator = indicator;
        this.tooltip = tooltip;
    }
    
    updateProgress() {
        const currentIndex = getCurrentPageIndex();
        if (currentIndex < 0) return;
        
        this.currentIndex = currentIndex;
        const percentage = ((currentIndex + 1) / this.totalLevels) * 100;
        
        // Update fill
        if (this.fill) {
            this.fill.style.width = `${percentage}%`;
            
            // Update gradient based on current section
            const currentSection = this.getCurrentSection();
            if (currentSection) {
                const nextSection = this.sections[this.sections.indexOf(currentSection) + 1];
                const color1 = currentSection.color;
                const color2 = nextSection ? nextSection.color : color1;
                this.fill.style.background = `linear-gradient(90deg, ${color1} 0%, ${color2} 100%)`;
                
                if (this.indicator) {
                    this.indicator.style.borderColor = color1;
                }
            }
        }
        
        // Update indicator position
        if (this.indicator) {
            this.indicator.style.left = `${percentage}%`;
        }
        
        // Update tooltip
        if (this.tooltip) {
            this.tooltip.textContent = `${Math.round(percentage)}%`;
        }
        
        // Update section highlighting
        this.updateSectionHighlight();
    }
    
    getCurrentSection() {
        return this.sections.find(section => 
            this.currentIndex >= section.start && this.currentIndex <= section.end
        );
    }
    
    updateSectionHighlight() {
        const labels = document.querySelectorAll('.inline-section-label');
        const currentSection = this.getCurrentSection();
        
        labels.forEach((label, index) => {
            if (this.sections[index] === currentSection) {
                label.style.fontWeight = '700';
                label.style.fontSize = '14px';
            } else {
                label.style.fontWeight = '500';
                label.style.fontSize = '13px';
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Clean up old progress bars
    const oldBars = document.querySelectorAll('#progress-bar-container, #aligned-progress-bar, #progress-bar-wrapper, #fixed-progress-bar, #inline-progress-bar');
    oldBars.forEach(bar => bar.remove());
    
    // Create new progress bar
    window.inlineProgressBar = new InlineProgressBar();
    
    // Hook into navigation
    const originalNext = window.navigateNext;
    const originalPrev = window.navigatePrev;
    
    window.navigateNext = function() {
        const result = originalNext.apply(this, arguments);
        setTimeout(() => window.inlineProgressBar?.updateProgress(), 100);
        return result;
    };
    
    window.navigatePrev = function() {
        const result = originalPrev.apply(this, arguments);
        setTimeout(() => window.inlineProgressBar?.updateProgress(), 100);
        return result;
    };
});

// Styles
const inlineStyles = document.createElement('style');
inlineStyles.textContent = `
    /* Animation */
    @keyframes pulse-inline {
        0%, 100% {
            box-shadow: 0 3px 12px rgba(0, 0, 0, 0.4);
        }
        50% {
            box-shadow: 0 3px 20px rgba(66, 133, 244, 0.6);
        }
    }
    
    #inline-progress-indicator {
        animation: pulse-inline 2s infinite;
    }
    
    #inline-progress-indicator:hover {
        animation: none;
        transform: translate(-50%, -50%) scale(1.15);
    }
    
    /* Ensure labels stay visible */
    .inline-section-label {
        mix-blend-mode: normal;
    }
    
    /* Mobile adjustments */
    @media (max-width: 768px) {
        #inline-progress-bar {
            width: calc(100% - 40px) !important;
            top: 20px !important;
        }
        
        .inline-section-label {
            font-size: 10px !important;
        }
    }
`;
document.head.appendChild(inlineStyles);
