// progress-bar-inline.js - Progress bar with text inside, positioned above content

// Ensure navigation functions exist before using them
// These are temporary fallbacks that will be replaced by actual functions from navigation.js
if (typeof getCurrentPageIndex !== 'function') {
    window.getCurrentPageIndex = function() {
        // Fallback implementation
        if (window.NAVIGATION_CONFIG && window.NAVIGATION_CONFIG.sections) {
            const currentFunc = window.currentPageFunction || 'createIntroduction';
            let index = 0;
            for (const section of window.NAVIGATION_CONFIG.sections) {
                for (const item of section.items) {
                    if (item.func === currentFunc) {
                        return index;
                    }
                    index++;
                }
            }
        }
        return 0;
    };
}

if (typeof getFlattenedNavigation !== 'function') {
    window.getFlattenedNavigation = function() {
        // Fallback implementation
        if (window.NAVIGATION_CONFIG && window.NAVIGATION_CONFIG.sections) {
            const flattened = [];
            window.NAVIGATION_CONFIG.sections.forEach(section => {
                section.items.forEach(item => {
                    flattened.push(item);
                });
            });
            return flattened;
        }
        return [];
    };
}

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
                name: section.title || section.name,  // Use title from NAVIGATION_CONFIG
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
            overflow: visible;
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
            overflow: visible;
            pointer-events: auto;
        `;
        
        // Create a clipping container for the fill
        const fillContainer = document.createElement('div');
        fillContainer.style.cssText = `
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            border-radius: 25px;
            overflow: hidden;
            z-index: 1;
        `;
        
        // Create filled progress (no border-radius)
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
        fillContainer.appendChild(fill);
        track.appendChild(fillContainer);
        
        // Add section labels and markers
        this.sections.forEach((section, index) => {
            // Markers should align with where the progress indicator IS
            // when you're AT the first item of each section
            const markerPercent = ((section.start + 1) / this.totalLevels) * 100;
            const endPercent = ((section.end + 1) / this.totalLevels) * 100;
            // For centering the label, use the progress positions
            const startProgressPercent = ((section.start + 1) / this.totalLevels) * 100;
            const centerPercent = (startProgressPercent + endPercent) / 2;
            
            // Add vertical separator line between sections (not for the first section)
            if (index > 0) {
                const separator = document.createElement('div');
                separator.style.cssText = `
                    position: absolute;
                    left: ${markerPercent}%;
                    top: 10%;
                    bottom: 10%;
                    width: 2px;
                    background: rgba(255, 255, 255, 0.5);
                    z-index: 2;
                `;
                track.appendChild(separator);
            }
            
            // Add circle marker with unique ID
            const marker = document.createElement('div');
            marker.className = 'section-marker';
            marker.id = `section-marker-${index}`;
            marker.dataset.color = section.color;
            marker.dataset.index = index;
            marker.innerHTML = `
                <div class="marker-inner" style="
                    width: 16px;
                    height: 16px;
                    background: white;
                    border: 2px solid ${section.color};
                    border-radius: 50%;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                    transition: all 0.3s ease;
                "></div>
            `;
            marker.style.cssText = `
                position: absolute;
                left: ${markerPercent}%;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                pointer-events: auto;
                z-index: 3;
            `;
            
            // Click to jump to section
            marker.onclick = () => this.jumpToSection(index);
            
            track.appendChild(marker);
            
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
                transition: font-size 0.3s ease, text-shadow 0.3s ease, font-weight 0.3s ease;
                user-select: none;
            `;
            label.textContent = section.name;
            label.title = `${section.levels} level${section.levels === 1 ? '' : 's'}`;
            
            // Hover effect - using font-size
            label.onmouseover = () => {
                label.style.fontSize = '14px';
                label.style.textShadow = '0 2px 6px rgba(0, 0, 0, 0.7)';
                label.style.fontWeight = '600';
            };
            label.onmouseout = () => {
                const isCurrentSection = this.sections[index] === this.getCurrentSection();
                label.style.fontSize = isCurrentSection ? '14px' : '13px';
                label.style.textShadow = '0 1px 4px rgba(0, 0, 0, 0.5)';
                label.style.fontWeight = isCurrentSection ? '700' : '500';
            };
            
            // Click to jump
            label.onclick = () => this.jumpToSection(index);
            
            track.appendChild(label);
        });
        
        // Create position indicator with opacity
        const indicator = document.createElement('div');
        indicator.id = 'inline-progress-indicator';
        indicator.innerHTML = `
            <div class="indicator-inner" style="
                width: 26px;
                height: 26px;
                background: white;
                border: 3px solid #4285f4;
                border-radius: 50%;
                box-shadow: 0 3px 12px rgba(0, 0, 0, 0.4);
                transition: all 0.3s ease;
            "></div>
        `;
        indicator.style.cssText = `
            position: absolute;
            left: 0%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: left 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
            z-index: 5;
            cursor: pointer;
            pointer-events: auto;
        `;
        
        track.appendChild(indicator);
        container.appendChild(track);
        document.body.appendChild(container);
        
        // Store references
        this.container = container;
        this.fill = fill;
        this.indicator = indicator;
        
        // Set up hover effects using CSS classes
        this.setupHoverEffects();
    }
    
    setupHoverEffects() {
        // Add hover effects for markers
        const markers = document.querySelectorAll('.section-marker');
        markers.forEach(marker => {
            const inner = marker.querySelector('.marker-inner');
            const color = marker.dataset.color;
            
            marker.addEventListener('mouseenter', () => {
                inner.style.width = '20px';
                inner.style.height = '20px';
                inner.style.background = color;
                inner.style.borderColor = color;
                inner.style.borderWidth = '3px';
                inner.style.boxShadow = '0 3px 12px rgba(0, 0, 0, 0.4)';
            });
            
            marker.addEventListener('mouseleave', () => {
                inner.style.width = '16px';
                inner.style.height = '16px';
                inner.style.background = 'white';
                inner.style.borderColor = color;
                inner.style.borderWidth = '2px';
                inner.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
            });
        });
        
        // Add hover effects for indicator
        const indicator = document.getElementById('inline-progress-indicator');
        const indicatorInner = indicator.querySelector('.indicator-inner');
        
        indicator.addEventListener('mouseenter', () => {
            indicatorInner.style.width = '30px';
            indicatorInner.style.height = '30px';
            indicatorInner.style.background = 'white';
            indicatorInner.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.5)';
        });
        
        indicator.addEventListener('mouseleave', () => {
            indicatorInner.style.width = '26px';
            indicatorInner.style.height = '26px';
            indicatorInner.style.background = 'white';
            indicatorInner.style.boxShadow = '0 3px 12px rgba(0, 0, 0, 0.4)';
        });
    }
    
    updateProgress() {
        // Add safety check for missing function
        const currentIndex = (typeof getCurrentPageIndex === 'function') 
            ? getCurrentPageIndex() 
            : 0;
        
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
                
                // Update indicator border color
                if (this.indicator) {
                    const indicatorInner = this.indicator.querySelector('.indicator-inner');
                    if (indicatorInner) {
                        indicatorInner.style.borderColor = color1;
                    }
                }
            }
        }
        
        // Update indicator position
        if (this.indicator) {
            this.indicator.style.left = `${percentage}%`;
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
    
    // Hook into navigation - with safety checks
    const originalNext = window.navigateNext || function() {};
    const originalPrev = window.navigatePrev || function() {};
    
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
    /* Animation for progress indicator */
    @keyframes pulse-inline {
        0%, 100% {
            box-shadow: 0 3px 12px rgba(0, 0, 0, 0.4);
        }
        50% {
            box-shadow: 0 3px 20px rgba(66, 133, 244, 0.6);
        }
    }
    
    #inline-progress-indicator .indicator-inner {
        animation: pulse-inline 2s infinite;
    }
    
    #inline-progress-indicator:hover .indicator-inner {
        animation: none;
    }
    
    /* Ensure markers and indicators stay centered */
    .section-marker,
    #inline-progress-indicator {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
    }
    
    /* Ensure inner elements stay centered */
    .marker-inner,
    .indicator-inner {
        flex-shrink: 0;
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
        
        .marker-inner {
            width: 12px !important;
            height: 12px !important;
        }
        
        .indicator-inner {
            width: 20px !important;
            height: 20px !important;
        }
    }
`;
document.head.appendChild(inlineStyles);
