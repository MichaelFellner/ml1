// progress-bar-aligned.js - Progress bar aligned with content width

class AlignedProgressBar {
    constructor() {
        this.sections = [];
        this.totalLevels = 0;
        this.currentIndex = 0;
        
        this.initializeSections();
        this.createProgressBar();
        this.updateProgress();
        this.alignWithContent();
        
        // Listen for window resize
        window.addEventListener('resize', () => this.alignWithContent());
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
                color: this.getSectionColor(sectionIndex)
            });
            
            levelCount += sectionLevels;
        });
        
        this.totalLevels = levelCount;
    }
    
    getSectionColor(index) {
        // Assign colors to different sections
        const colors = [
            '#4285f4', // Blue - Introduction
            '#ea4335', // Red - Story
            '#fbbc04', // Yellow - Instructions
            '#34a853', // Green - Gradient Descent
            '#9333ea', // Purple - Training
            '#ec4899', // Pink - Advanced
            '#f97316', // Orange - Conclusion
        ];
        return colors[index % colors.length];
    }
    
    createProgressBar() {
        // Create main container
        const container = document.createElement('div');
        container.id = 'aligned-progress-bar';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            height: 80px;
            background: transparent;
            z-index: 999;
            display: flex;
            flex-direction: column;
            pointer-events: none;
            transition: all 0.3s ease;
        `;
        
        // Create section labels row
        const labelsRow = document.createElement('div');
        labelsRow.style.cssText = `
            height: 35px;
            display: flex;
            align-items: flex-end;
            position: relative;
            width: 100%;
            padding-bottom: 5px;
        `;
        
        // Add section labels
        this.sections.forEach((section, index) => {
            const labelWrapper = document.createElement('div');
            labelWrapper.style.cssText = `
                position: absolute;
                left: ${(section.start / this.totalLevels) * 100}%;
                transform: translateX(-50%);
                display: flex;
                flex-direction: column;
                align-items: center;
                pointer-events: auto;
            `;
            
            const label = document.createElement('div');
            label.className = 'section-label-aligned';
            label.style.cssText = `
                font-size: 13px;
                color: rgba(255, 255, 255, 0.9);
                font-style: italic;
                font-weight: 400;
                white-space: nowrap;
                padding: 0 8px;
                cursor: pointer;
                transition: all 0.3s ease;
                text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
                user-select: none;
                letter-spacing: 0.5px;
            `;
            label.textContent = section.name;
            label.title = `${section.levels} ${section.levels === 1 ? 'level' : 'levels'}`;
            
            // Add hover effect
            label.onmouseover = () => {
                label.style.color = '#fff';
                label.style.transform = 'scale(1.1)';
                label.style.textShadow = '0 2px 5px rgba(0, 0, 0, 0.5)';
            };
            label.onmouseout = () => {
                label.style.color = 'rgba(255, 255, 255, 0.9)';
                label.style.transform = 'scale(1)';
                label.style.textShadow = '0 1px 3px rgba(0, 0, 0, 0.3)';
            };
            
            // Click to jump to section
            label.onclick = () => this.jumpToSection(index);
            
            labelWrapper.appendChild(label);
            labelsRow.appendChild(labelWrapper);
        });
        
        container.appendChild(labelsRow);
        
        // Create progress bar row
        const progressRow = document.createElement('div');
        progressRow.style.cssText = `
            height: 45px;
            position: relative;
            width: 100%;
            display: flex;
            align-items: center;
        `;
        
        // Create track
        const track = document.createElement('div');
        track.style.cssText = `
            position: absolute;
            left: 0;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            height: 12px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 6px;
            overflow: visible;
            backdrop-filter: blur(10px);
            box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
            pointer-events: auto;
        `;
        
        // Create filled progress
        const fill = document.createElement('div');
        fill.id = 'progress-fill-aligned';
        fill.style.cssText = `
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 0%;
            background: linear-gradient(90deg, 
                rgba(66, 133, 244, 0.8) 0%, 
                rgba(52, 168, 83, 0.8) 100%);
            border-radius: 6px;
            transition: width 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
            box-shadow: 0 2px 8px rgba(66, 133, 244, 0.4);
        `;
        track.appendChild(fill);
        
        // Create section markers
        this.sections.forEach((section, index) => {
            if (index > 0) { // Don't add marker at the very start
                const marker = document.createElement('div');
                marker.className = 'section-marker-aligned';
                marker.style.cssText = `
                    position: absolute;
                    left: ${(section.start / this.totalLevels) * 100}%;
                    top: -8px;
                    bottom: -8px;
                    width: 2px;
                    background: rgba(255, 255, 255, 0.4);
                    transform: translateX(-50%);
                    z-index: 1;
                `;
                track.appendChild(marker);
                
                // Add dot on the marker
                const dot = document.createElement('div');
                dot.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 12px;
                    height: 12px;
                    background: rgba(255, 255, 255, 0.9);
                    border: 2px solid rgba(255, 255, 255, 0.5);
                    border-radius: 50%;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                `;
                marker.appendChild(dot);
            }
        });
        
        // Create current position indicator
        const indicator = document.createElement('div');
        indicator.id = 'progress-indicator-aligned';
        indicator.style.cssText = `
            position: absolute;
            left: 0%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 20px;
            height: 20px;
            background: white;
            border: 3px solid #4285f4;
            border-radius: 50%;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
            transition: left 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
            z-index: 2;
            cursor: pointer;
            pointer-events: auto;
        `;
        track.appendChild(indicator);
        
        // Create percentage label
        const percentLabel = document.createElement('div');
        percentLabel.id = 'progress-percent-aligned';
        percentLabel.style.cssText = `
            position: absolute;
            left: 0%;
            bottom: -30px;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 4px 10px;
            border-radius: 4px;
            font-size: 12px;
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
            percentLabel.style.bottom = '-35px';
        };
        indicator.onmouseout = () => {
            percentLabel.style.opacity = '0';
            percentLabel.style.bottom = '-30px';
        };
        
        progressRow.appendChild(track);
        container.appendChild(progressRow);
        
        // Add to page
        document.body.appendChild(container);
        
        // Store references
        this.container = container;
        this.fill = fill;
        this.indicator = indicator;
        this.percentLabel = percentLabel;
        this.track = track;
    }
    
    alignWithContent() {
        // Get the current-level div width and position
        const currentLevel = document.querySelector('.current-level');
        if (!currentLevel) {
            // Try again after a short delay
            setTimeout(() => this.alignWithContent(), 100);
            return;
        }
        
        const rect = currentLevel.getBoundingClientRect();
        const containerWidth = rect.width;
        
        // Update progress bar width and position
        this.container.style.width = `${containerWidth}px`;
        this.container.style.left = `${rect.left + (containerWidth / 2)}px`;
        this.container.style.transform = 'translateX(-50%)';
    }
    
    updateProgress() {
        const currentIndex = getCurrentPageIndex();
        if (currentIndex < 0) return;
        
        this.currentIndex = currentIndex;
        const percentage = ((currentIndex + 1) / this.totalLevels) * 100;
        
        // Update fill width
        this.fill.style.width = `${percentage}%`;
        
        // Update indicator position
        this.indicator.style.left = `${percentage}%`;
        
        // Update percentage label
        this.percentLabel.textContent = `${Math.round(percentage)}%`;
        
        // Update current section highlighting
        this.updateSectionHighlight();
        
        // Update fill gradient based on current section
        const currentSection = this.getCurrentSection();
        if (currentSection) {
            const nextSection = this.sections[this.sections.indexOf(currentSection) + 1];
            const color1 = currentSection.color;
            const color2 = nextSection ? nextSection.color : color1;
            this.fill.style.background = `linear-gradient(90deg, ${color1}cc 0%, ${color2}cc 100%)`;
            this.indicator.style.borderColor = color1;
        }
        
        // Realign with content
        this.alignWithContent();
    }
    
    getCurrentSection() {
        return this.sections.find(section => 
            this.currentIndex >= section.start && this.currentIndex <= section.end
        );
    }
    
    updateSectionHighlight() {
        const labels = this.container.querySelectorAll('.section-label-aligned');
        const currentSection = this.getCurrentSection();
        
        labels.forEach((label, index) => {
            if (this.sections[index] === currentSection) {
                label.style.fontWeight = '600';
                label.style.color = '#fff';
                label.style.fontSize = '14px';
            } else {
                label.style.fontWeight = '400';
                label.style.color = 'rgba(255, 255, 255, 0.9)';
                label.style.fontSize = '13px';
            }
        });
    }
    
    jumpToSection(sectionIndex) {
        const section = this.sections[sectionIndex];
        if (!section) return;
        
        // Get the first item in the section
        const flattened = getFlattenedNavigation();
        const targetItem = flattened[section.start];
        
        if (targetItem && window[targetItem.func]) {
            // Use transition if available
            if (window.fastTransitions) {
                window.fastTransitions.quickTransition(() => {
                    window[targetItem.func]();
                }, this.currentIndex < section.start ? 'next' : 'prev');
            } else {
                window[targetItem.func]();
            }
            
            // Update progress after navigation
            setTimeout(() => this.updateProgress(), 100);
        }
    }
}

// Initialize aligned progress bar
document.addEventListener('DOMContentLoaded', () => {
    // Remove the old progress bar if it exists
    const oldBar = document.getElementById('progress-bar-container');
    if (oldBar) oldBar.remove();
    
    window.alignedProgressBar = new AlignedProgressBar();
    
    // Update on navigation
    const originalNavigateNext = window.navigateNext;
    const originalNavigatePrev = window.navigatePrev;
    
    window.navigateNext = function() {
        const result = originalNavigateNext.apply(this, arguments);
        setTimeout(() => {
            if (window.alignedProgressBar) {
                window.alignedProgressBar.updateProgress();
            }
        }, 100);
        return result;
    };
    
    window.navigatePrev = function() {
        const result = originalNavigatePrev.apply(this, arguments);
        setTimeout(() => {
            if (window.alignedProgressBar) {
                window.alignedProgressBar.updateProgress();
            }
        }, 100);
        return result;
    };
    
    // Also update on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (window.alignedProgressBar) {
                window.alignedProgressBar.alignWithContent();
            }
        }, 100);
    });
});

// Add styles for the aligned progress bar
const alignedStyles = document.createElement('style');
alignedStyles.textContent = `
    /* Remove top padding since bar is transparent */
    body {
        padding-top: 20px !important;
    }
    
    /* Smooth animations */
    #aligned-progress-bar * {
        box-sizing: border-box;
    }
    
    /* Hover effect for track */
    #aligned-progress-bar:hover #progress-fill-aligned {
        box-shadow: 0 2px 15px rgba(66, 133, 244, 0.6);
    }
    
    /* Pulse animation for indicator */
    @keyframes pulse-indicator {
        0% {
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
        }
        50% {
            box-shadow: 0 3px 20px rgba(66, 133, 244, 0.5);
        }
        100% {
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
        }
    }
    
    #progress-indicator-aligned {
        animation: pulse-indicator 2s infinite;
    }
    
    #progress-indicator-aligned:hover {
        animation: none;
        transform: translate(-50%, -50%) scale(1.15);
    }
    
    /* Section labels with elegant styling */
    .section-label-aligned {
        position: relative;
    }
    
    .section-label-aligned::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 50%;
        transform: translateX(-50%) scaleX(0);
        width: 100%;
        height: 2px;
        background: rgba(255, 255, 255, 0.8);
        transition: transform 0.3s ease;
    }
    
    .section-label-aligned:hover::after {
        transform: translateX(-50%) scaleX(1);
    }
    
    /* Track with glass effect */
    #aligned-progress-bar .track {
        position: relative;
    }
    
    /* Responsive for mobile */
    @media (max-width: 768px) {
        #aligned-progress-bar {
            height: 70px !important;
        }
        
        .section-label-aligned {
            font-size: 11px !important;
        }
        
        #progress-indicator-aligned {
            width: 16px !important;
            height: 16px !important;
        }
    }
`;
document.head.appendChild(alignedStyles);
