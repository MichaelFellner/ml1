// progress-bar.js - Horizontal progress bar with section markers

class ProgressBar {
    constructor() {
        this.sections = [];
        this.totalLevels = 0;
        this.currentIndex = 0;
        
        this.initializeSections();
        this.createProgressBar();
        this.updateProgress();
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
        container.id = 'progress-bar-container';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 60px;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            z-index: 999;
            display: flex;
            flex-direction: column;
            transition: transform 0.3s ease;
        `;
        
        // Create section labels row
        const labelsRow = document.createElement('div');
        labelsRow.style.cssText = `
            height: 25px;
            display: flex;
            align-items: center;
            padding: 0 20px;
            position: relative;
        `;
        
        // Add section labels
        this.sections.forEach((section, index) => {
            const label = document.createElement('div');
            label.className = 'section-label';
            label.style.cssText = `
                position: absolute;
                left: ${(section.start / this.totalLevels) * 100}%;
                transform: translateX(-50%);
                font-size: 11px;
                color: #666;
                white-space: nowrap;
                padding: 0 5px;
                background: rgba(255, 255, 255, 0.9);
                border-radius: 3px;
                transition: all 0.3s ease;
                cursor: pointer;
                user-select: none;
            `;
            label.textContent = section.name;
            label.title = `${section.levels} ${section.levels === 1 ? 'level' : 'levels'}`;
            
            // Add hover effect
            label.onmouseover = () => {
                label.style.color = section.color;
                label.style.fontWeight = '600';
                label.style.transform = 'translateX(-50%) scale(1.1)';
            };
            label.onmouseout = () => {
                label.style.color = '#666';
                label.style.fontWeight = '400';
                label.style.transform = 'translateX(-50%) scale(1)';
            };
            
            // Click to jump to section
            label.onclick = () => this.jumpToSection(index);
            
            labelsRow.appendChild(label);
        });
        
        container.appendChild(labelsRow);
        
        // Create progress bar row
        const progressRow = document.createElement('div');
        progressRow.style.cssText = `
            height: 35px;
            padding: 10px 20px;
            position: relative;
        `;
        
        // Create track
        const track = document.createElement('div');
        track.style.cssText = `
            position: absolute;
            left: 20px;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            height: 8px;
            background: #e5e7eb;
            border-radius: 4px;
            overflow: hidden;
        `;
        
        // Create filled progress
        const fill = document.createElement('div');
        fill.id = 'progress-fill';
        fill.style.cssText = `
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 0%;
            background: linear-gradient(90deg, #4285f4 0%, #34a853 100%);
            border-radius: 4px;
            transition: width 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
            box-shadow: 0 0 10px rgba(66, 133, 244, 0.3);
        `;
        track.appendChild(fill);
        
        // Create section markers
        this.sections.forEach((section, index) => {
            if (index > 0) { // Don't add marker at the very start
                const marker = document.createElement('div');
                marker.className = 'section-marker';
                marker.style.cssText = `
                    position: absolute;
                    left: ${(section.start / this.totalLevels) * 100}%;
                    top: -5px;
                    bottom: -5px;
                    width: 2px;
                    background: rgba(0, 0, 0, 0.2);
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
                    width: 10px;
                    height: 10px;
                    background: white;
                    border: 2px solid rgba(0, 0, 0, 0.3);
                    border-radius: 50%;
                `;
                marker.appendChild(dot);
            }
        });
        
        // Create current position indicator
        const indicator = document.createElement('div');
        indicator.id = 'progress-indicator';
        indicator.style.cssText = `
            position: absolute;
            left: 0%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 16px;
            height: 16px;
            background: white;
            border: 3px solid #4285f4;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            transition: left 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
            z-index: 2;
            cursor: pointer;
        `;
        track.appendChild(indicator);
        
        // Create percentage label
        const percentLabel = document.createElement('div');
        percentLabel.id = 'progress-percent';
        percentLabel.style.cssText = `
            position: absolute;
            left: 0%;
            top: -25px;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 4px 8px;
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
            percentLabel.style.top = '-30px';
        };
        indicator.onmouseout = () => {
            percentLabel.style.opacity = '0';
            percentLabel.style.top = '-25px';
        };
        
        progressRow.appendChild(track);
        container.appendChild(progressRow);
        
        // Add minimize button
        const minimizeBtn = document.createElement('button');
        minimizeBtn.innerHTML = '▲';
        minimizeBtn.style.cssText = `
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.1);
            border: none;
            cursor: pointer;
            font-size: 10px;
            transition: all 0.3s ease;
            z-index: 3;
        `;
        minimizeBtn.onclick = () => this.toggleMinimize();
        container.appendChild(minimizeBtn);
        
        // Add to page
        document.body.appendChild(container);
        
        // Adjust body padding to account for progress bar
        document.body.style.paddingTop = '60px';
        
        // Store references
        this.container = container;
        this.fill = fill;
        this.indicator = indicator;
        this.percentLabel = percentLabel;
        this.minimizeBtn = minimizeBtn;
        this.isMinimized = false;
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
            this.fill.style.background = `linear-gradient(90deg, ${color1} 0%, ${color2} 100%)`;
            this.indicator.style.borderColor = color1;
        }
    }
    
    getCurrentSection() {
        return this.sections.find(section => 
            this.currentIndex >= section.start && this.currentIndex <= section.end
        );
    }
    
    updateSectionHighlight() {
        const labels = this.container.querySelectorAll('.section-label');
        const currentSection = this.getCurrentSection();
        
        labels.forEach((label, index) => {
            if (this.sections[index] === currentSection) {
                label.style.fontWeight = '600';
                label.style.color = currentSection.color;
            } else {
                label.style.fontWeight = '400';
                label.style.color = '#666';
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
    
    toggleMinimize() {
        this.isMinimized = !this.isMinimized;
        
        if (this.isMinimized) {
            this.container.style.transform = 'translateY(-35px)';
            this.minimizeBtn.innerHTML = '▼';
            this.minimizeBtn.style.background = '#4285f4';
            this.minimizeBtn.style.color = 'white';
            document.body.style.paddingTop = '25px';
        } else {
            this.container.style.transform = 'translateY(0)';
            this.minimizeBtn.innerHTML = '▲';
            this.minimizeBtn.style.background = 'rgba(0, 0, 0, 0.1)';
            this.minimizeBtn.style.color = 'black';
            document.body.style.paddingTop = '60px';
        }
    }
}

// Initialize progress bar
document.addEventListener('DOMContentLoaded', () => {
    window.progressBar = new ProgressBar();
    
    // Update on navigation
    const originalNavigateNext = window.navigateNext;
    const originalNavigatePrev = window.navigatePrev;
    
    window.navigateNext = function() {
        const result = originalNavigateNext.apply(this, arguments);
        setTimeout(() => window.progressBar.updateProgress(), 100);
        return result;
    };
    
    window.navigatePrev = function() {
        const result = originalNavigatePrev.apply(this, arguments);
        setTimeout(() => window.progressBar.updateProgress(), 100);
        return result;
    };
    
    // Also hook into any direct navigation functions
    const navFunctions = getFlattenedNavigation().map(item => item.func);
    navFunctions.forEach(funcName => {
        const originalFunc = window[funcName];
        if (originalFunc) {
            window[funcName] = function() {
                const result = originalFunc.apply(this, arguments);
                setTimeout(() => window.progressBar.updateProgress(), 100);
                return result;
            };
        }
    });
});

// Add styles for better visual integration
const progressStyles = document.createElement('style');
progressStyles.textContent = `
    /* Adjust app container to account for progress bar */
    #app {
        transition: padding-top 0.3s ease;
    }
    
    /* Smooth animations for progress bar */
    #progress-bar-container * {
        box-sizing: border-box;
    }
    
    /* Hover effect for track */
    #progress-bar-container:hover #progress-fill {
        box-shadow: 0 0 20px rgba(66, 133, 244, 0.5);
    }
    
    /* Pulse animation for current indicator */
    @keyframes pulse {
        0% {
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
        50% {
            box-shadow: 0 2px 15px rgba(66, 133, 244, 0.4);
        }
        100% {
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
    }
    
    #progress-indicator {
        animation: pulse 2s infinite;
    }
    
    #progress-indicator:hover {
        animation: none;
        transform: translate(-50%, -50%) scale(1.2);
    }
`;
document.head.appendChild(progressStyles);
