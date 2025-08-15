/**
 * NavigationButtons Component
 * 
 * A reusable wrapper component for the existing MLTEACH navigation system.
 * This component integrates the existing createStandardNavigation() function
 * into the component system pattern while maintaining full compatibility.
 * 
 * Features:
 * - Uses existing navigation logic and styling
 * - Integrates with current navigation configuration
 * - Maintains backward compatibility
 * - Adds component lifecycle management
 * 
 * @example
 * const nav = new NavigationButtons();
 * nav.mount('#navigation-container');
 */

// Ensure Component class is available
if (typeof Component === 'undefined') {
    console.error('NavigationButtons requires Component class. Include components/base/Component.js first.');
}

// Ensure navigation functions are available
if (typeof createStandardNavigation === 'undefined') {
    console.error('NavigationButtons requires createStandardNavigation function. Include navigation components first.');
}

/**
 * Navigation Buttons Component wrapper
 * 
 * @extends Component
 */
class NavigationButtons extends Component {
    /**
     * Creates a new NavigationButtons component
     * 
     * @param {Object} props - Component properties
     * @param {boolean} [props.showProgress=true] - Whether to show progress bar
     * @param {boolean} [props.showButtons=true] - Whether to show navigation buttons
     * @param {string} [props.className=''] - Additional CSS classes
     * @param {Function} [props.onNavigate] - Callback when navigation occurs
     */
    constructor(props = {}) {
        super(props);
        
        const defaultProps = {
            showProgress: true,
            showButtons: true,
            className: '',
            onNavigate: null
        };
        
        this.props = Object.freeze({ ...defaultProps, ...props });
        
        this.state = {
            navigationHtml: '',
            isInitialized: false
        };
    }
    
    /**
     * Renders the navigation buttons HTML
     * 
     * @returns {string} HTML string for the navigation buttons
     */
    render() {
        const { className } = this.props;
        
        // Generate navigation HTML using existing function
        let navigationHtml = '';
        try {
            if (typeof createStandardNavigation === 'function') {
                navigationHtml = createStandardNavigation();
            } else {
                navigationHtml = this._getFallbackNavigation();
            }
        } catch (error) {
            console.warn('Error generating navigation, using fallback:', error);
            navigationHtml = this._getFallbackNavigation();
        }
        
        return `
            <div class="navigation-buttons-container ${className}">
                ${navigationHtml}
                
                <style>
                    .navigation-buttons-container {
                        margin-top: 20px;
                    }
                    
                    /* Ensure existing navigation styles are preserved */
                    .navigation-buttons-container .progress-container {
                        margin-bottom: 20px;
                    }
                    
                    .navigation-buttons-container .nav-buttons {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        gap: 15px;
                        flex-wrap: wrap;
                    }
                    
                    .navigation-buttons-container .nav-btn {
                        padding: 10px 20px;
                        border: 2px solid #667eea;
                        border-radius: 8px;
                        background: white;
                        color: #667eea;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        text-decoration: none;
                        display: inline-flex;
                        align-items: center;
                        gap: 8px;
                    }
                    
                    .navigation-buttons-container .nav-btn:hover {
                        background: #667eea;
                        color: white;
                        transform: translateY(-1px);
                        box-shadow: 0 4px 8px rgba(102, 126, 234, 0.2);
                    }
                    
                    .navigation-buttons-container .nav-btn:disabled {
                        opacity: 0.5;
                        cursor: not-allowed;
                        transform: none;
                        box-shadow: none;
                    }
                    
                    .navigation-buttons-container .nav-btn:disabled:hover {
                        background: white;
                        color: #667eea;
                    }
                    
                    /* Progress bar styling */
                    .navigation-buttons-container .progress-bar {
                        width: 100%;
                        height: 8px;
                        background: #e0e0e0;
                        border-radius: 4px;
                        overflow: hidden;
                        margin-bottom: 10px;
                    }
                    
                    .navigation-buttons-container .progress-fill {
                        height: 100%;
                        background: linear-gradient(90deg, #667eea, #764ba2);
                        border-radius: 4px;
                        transition: width 0.5s ease;
                    }
                    
                    /* Responsive adjustments */
                    @media (max-width: 600px) {
                        .navigation-buttons-container .nav-buttons {
                            flex-direction: column;
                            gap: 10px;
                        }
                        
                        .navigation-buttons-container .nav-btn {
                            width: 100%;
                            justify-content: center;
                        }
                    }
                </style>
            </div>
        `;
    }
    
    /**
     * Sets up event listeners for navigation buttons
     */
    attachEventListeners() {
        // Add click tracking for navigation events
        if (this.props.onNavigate) {
            this.addEventDelegate('.nav-btn', 'click', (event, target) => {
                const buttonText = target.textContent.trim();
                const isNext = buttonText.toLowerCase().includes('next') || buttonText.includes('→');
                const isPrev = buttonText.toLowerCase().includes('prev') || buttonText.includes('←');
                
                this.props.onNavigate({
                    direction: isNext ? 'next' : isPrev ? 'prev' : 'unknown',
                    buttonText: buttonText,
                    element: target,
                    component: this
                });
            });
        }
        
        // Initialize existing navigation functionality if available
        this._initializeExistingNavigation();
    }
    
    /**
     * Initializes the existing MLTEACH navigation system
     * 
     * @private
     */
    _initializeExistingNavigation() {
        try {
            // Try to call the existing navigation initialization if available
            if (typeof initializeNavigation === 'function' && window.currentPageFunction) {
                // This maintains compatibility with the existing navigation system
                setTimeout(() => {
                    initializeNavigation(window.currentNavigationId || 'unknown', window.currentPageFunction);
                }, 0);
            }
        } catch (error) {
            console.warn('Could not initialize existing navigation system:', error);
        }
    }
    
    /**
     * Updates navigation state (useful for progress updates)
     * 
     * @param {Object} updates - Navigation updates
     * @param {number} [updates.progress] - Progress percentage (0-100)
     * @param {string} [updates.currentLevel] - Current level identifier
     */
    updateNavigation(updates) {
        if (updates.progress !== undefined) {
            const progressFill = this.querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.width = `${Math.max(0, Math.min(100, updates.progress))}%`;
            }
        }
        
        if (updates.currentLevel !== undefined) {
            // Update any level indicators if present
            const levelIndicators = this.querySelectorAll('[data-level]');
            levelIndicators.forEach(indicator => {
                if (indicator.dataset.level === updates.currentLevel) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }
        
        // Re-render if major changes
        if (Object.keys(updates).length > 0) {
            this.setState({ lastUpdate: Date.now() });
        }
    }
    
    /**
     * Gets current navigation state
     * 
     * @returns {Object} Current navigation information
     */
    getNavigationState() {
        return {
            currentId: window.currentNavigationId || null,
            currentFunction: window.currentPageFunction || null,
            progress: this._getCurrentProgress(),
            hasNext: this._hasNext(),
            hasPrev: this._hasPrev()
        };
    }
    
    /**
     * Enables/disables navigation buttons
     * 
     * @param {Object} options - Enable/disable options
     * @param {boolean} [options.next=true] - Enable next button
     * @param {boolean} [options.prev=true] - Enable previous button
     */
    setEnabled(options) {
        const { next = true, prev = true } = options;
        
        const nextBtn = this.querySelector('.nav-btn[onclick*="next"], .nav-btn:contains("Next")');
        const prevBtn = this.querySelector('.nav-btn[onclick*="prev"], .nav-btn:contains("Prev")');
        
        if (nextBtn) {
            nextBtn.disabled = !next;
        }
        
        if (prevBtn) {
            prevBtn.disabled = !prev;
        }
    }
    
    /**
     * Fallback navigation HTML when createStandardNavigation is not available
     * 
     * @private
     * @returns {string} Fallback HTML
     */
    _getFallbackNavigation() {
        return `
            <div class="progress-container">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 50%;"></div>
                </div>
                <div style="text-align: center; color: #666; font-size: 0.9rem;">
                    Progress: Learning in progress...
                </div>
            </div>
            
            <div class="nav-buttons">
                <button class="nav-btn" onclick="history.back()">
                    ← Previous
                </button>
                
                <div style="flex: 1; text-align: center; color: #666;">
                    Navigation
                </div>
                
                <button class="nav-btn" onclick="window.location.reload()">
                    Continue →
                </button>
            </div>
        `;
    }
    
    /**
     * Gets current progress percentage
     * 
     * @private
     * @returns {number} Progress percentage
     */
    _getCurrentProgress() {
        const progressFill = this.querySelector('.progress-fill');
        if (progressFill) {
            const width = progressFill.style.width;
            return parseInt(width) || 0;
        }
        return 0;
    }
    
    /**
     * Checks if next navigation is available
     * 
     * @private
     * @returns {boolean} True if next is available
     */
    _hasNext() {
        const nextBtn = this.querySelector('.nav-btn[onclick*="next"]');
        return nextBtn && !nextBtn.disabled;
    }
    
    /**
     * Checks if previous navigation is available
     * 
     * @private
     * @returns {boolean} True if previous is available
     */
    _hasPrev() {
        const prevBtn = this.querySelector('.nav-btn[onclick*="prev"]');
        return prevBtn && !prevBtn.disabled;
    }
}

// Export for both ES6 modules and global usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NavigationButtons;
} else {
    window.NavigationButtons = NavigationButtons;
}

/*
 * USAGE EXAMPLES:
 * 
 * 1. Basic Navigation:
 * ===================
 * const nav = new NavigationButtons();
 * nav.mount('#navigation-area');
 * 
 * 2. Navigation with Callback:
 * ===========================
 * const nav = new NavigationButtons({
 *   onNavigate: (data) => {
 *     console.log('Navigation:', data.direction, data.buttonText);
 *     // Track navigation events
 *     analytics.track('navigation', data);
 *   }
 * });
 * nav.mount('#nav-container');
 * 
 * 3. Controlled Navigation:
 * ========================
 * const nav = new NavigationButtons();
 * nav.mount('#nav');
 * 
 * // Update progress
 * nav.updateNavigation({ progress: 75 });
 * 
 * // Disable next button until conditions are met
 * nav.setEnabled({ next: false, prev: true });
 * 
 * // Get current state
 * console.log('Nav state:', nav.getNavigationState());
 * 
 * 4. Custom Styling:
 * =================
 * const styledNav = new NavigationButtons({
 *   className: 'custom-nav-theme'
 * });
 * styledNav.mount('#styled-nav');
 * 
 * // Add custom CSS:
 * // .custom-nav-theme .nav-btn { border-color: #ff6347; }
 * 
 * 5. Integration with Level System:
 * ================================
 * class MyLevel extends Component {
 *   constructor(props) {
 *     super(props);
 *     this.navigation = new NavigationButtons({
 *       onNavigate: this.handleNavigation.bind(this)
 *     });
 *   }
 * 
 *   render() {
 *     return `
 *       <div class="level-content">
 *         <!-- Level content here -->
 *         <div id="level-navigation"></div>
 *       </div>
 *     `;
 *   }
 * 
 *   attachEventListeners() {
 *     this.navigation.mount(this.querySelector('#level-navigation'));
 *   }
 * 
 *   handleNavigation(data) {
 *     if (data.direction === 'next') {
 *       this.goToNextLevel();
 *     }
 *   }
 * }
 */