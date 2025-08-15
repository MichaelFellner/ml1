/**
 * Base Level Template
 * 
 * Standard template that all MLTEACH levels should follow. Provides consistent
 * structure, built-in state management integration, and standardized lifecycle methods.
 * 
 * This template includes:
 * - Standard HTML structure with predefined sections
 * - State management integration (LevelProgressStore & GameStateStore)
 * - Lifecycle methods (setup, teardown, cleanup)
 * - Navigation integration
 * - Error handling and fallback behavior
 * - Activity tracking and progress monitoring
 */

// Make BaseLevelTemplate available globally
window.BaseLevelTemplate = class BaseLevelTemplate {
    
    /**
     * Creates a new base level instance
     * 
     * @param {Object} config - Level configuration
     * @param {string} config.id - Unique level identifier (e.g., 'gravity-challenge')
     * @param {string} config.name - Display name (e.g., 'Gravity Challenge')
     * @param {string} config.type - Level type ('tutorial', 'interactive', 'demonstration')
     * @param {string} [config.description] - Level description for instructions
     * @param {Object} [config.parameters={}] - Default parameters for this level
     * @param {Object} [config.settings={}] - Level-specific settings
     * @param {boolean} [config.trackProgress=true] - Whether to track progress in state
     * @param {boolean} [config.debug=false] - Enable debug logging
     */
    constructor(config) {
        // Validate required config
        if (!config.id || !config.name) {
            throw new Error('Level config must include id and name');
        }
        
        this.config = {
            type: 'interactive',
            description: '',
            parameters: {},
            settings: {},
            trackProgress: true,
            debug: false,
            ...config
        };
        
        // State management
        this.hasStateManagement = false;
        this.sessionStartTime = Date.now();
        this.attempts = 0;
        this.isSetup = false;
        this.isDestroyed = false;
        
        // Event listeners for cleanup
        this._eventListeners = [];
        this._timeouts = new Set();
        this._intervals = new Set();
        
        this.log('Base level template created', this.config);
        
        // Initialize state management if available
        this._initializeStateManagement();
    }
    
    /**
     * Creates and renders the level HTML
     * 
     * This method should be called to display the level. It creates the complete
     * HTML structure and then calls the setup method.
     * 
     * @returns {Promise<void>} Resolves when level is fully created
     */
    async create() {
        if (this.isDestroyed) {
            throw new Error('Cannot create destroyed level');
        }
        
        try {
            this.log('Creating level');
            
            // Create HTML structure
            this._createHTML();
            
            // Initialize navigation
            this._initializeNavigation();
            
            // Setup level-specific logic
            await this.setup();
            
            this.isSetup = true;
            this.log('Level created successfully');
            
            // Track level start in state management
            if (this.hasStateManagement) {
                this._trackLevelStart();
            }
            
        } catch (error) {
            console.error(`Failed to create level ${this.config.id}:`, error);
            this._showError('Failed to load level. Please refresh the page.');
            throw error;
        }
    }
    
    /**
     * Sets up level-specific logic
     * 
     * Override this method in your level implementation to add custom setup logic.
     * This is called after the HTML is created but before the level is shown.
     * 
     * @returns {Promise<void>} Should resolve when setup is complete
     * 
     * @example
     * async setup() {
     *   await super.setup();
     *   this.slider = document.getElementById('my-slider');
     *   this.addEventListenerWithCleanup(this.slider, 'input', this.handleSliderChange.bind(this));
     * }
     */
    async setup() {
        this.log('Setting up level (override this method for custom setup)');
        
        // Load saved state if available
        this._restoreSavedState();
        
        // Set up common event listeners
        this._setupCommonEvents();
    }
    
    /**
     * Tears down the level and cleans up resources
     * 
     * This method should be called when leaving the level. It cleans up
     * event listeners, timers, and saves final state.
     * 
     * @returns {Promise<void>} Resolves when cleanup is complete
     */
    async teardown() {
        if (this.isDestroyed) {
            return;
        }
        
        try {
            this.log('Tearing down level');
            
            // Save current state before cleanup
            if (this.hasStateManagement) {
                this._saveCurrentState();
            }
            
            // Clean up resources
            this._cleanup();
            
            // Call custom teardown logic
            await this.onTeardown();
            
            this.isSetup = false;
            this.log('Level torn down successfully');
            
        } catch (error) {
            console.error(`Error during level teardown:`, error);
        }
    }
    
    /**
     * Custom teardown logic - override in your level implementation
     * 
     * @returns {Promise<void>} Should resolve when custom teardown is complete
     */
    async onTeardown() {
        this.log('Custom teardown (override this method for cleanup)');
    }
    
    /**
     * Destroys the level completely
     * 
     * This is a more aggressive cleanup that should be called when the level
     * will never be used again.
     */
    destroy() {
        this.teardown();
        this.isDestroyed = true;
        this.log('Level destroyed');
    }
    
    /**
     * Updates level parameters
     * 
     * @param {Object} newParameters - Parameters to update
     * @param {boolean} [save=true] - Whether to save to state management
     */
    updateParameters(newParameters, save = true) {
        this.config.parameters = { ...this.config.parameters, ...newParameters };
        
        if (save && this.hasStateManagement) {
            try {
                GameStateStore.updateParameters(this.config.id, newParameters);
            } catch (error) {
                this.log('Could not save parameters', error);
            }
        }
        
        // Trigger parameter update event
        this._dispatchEvent('parametersUpdated', { parameters: newParameters });
    }
    
    /**
     * Gets current level parameters
     * 
     * @returns {Object} Current parameters
     */
    getParameters() {
        return { ...this.config.parameters };
    }
    
    /**
     * Tracks an attempt or user action
     * 
     * @param {string} action - Type of action ('attempt', 'parameter_change', etc.)
     * @param {Object} [data={}] - Additional data about the action
     */
    trackAction(action, data = {}) {
        this.attempts++;
        
        if (this.hasStateManagement) {
            try {
                GameStateStore.updateActivity(action, {
                    levelId: this.config.id,
                    attempt: this.attempts,
                    timestamp: Date.now(),
                    ...data
                });
            } catch (error) {
                this.log('Could not track action', error);
            }
        }
        
        this.log(`Action tracked: ${action}`, data);
    }
    
    /**
     * Completes the level with a score
     * 
     * @param {Object} completionData - Completion details
     * @param {number} completionData.score - Score from 0-100
     * @param {Object} [completionData.solutions] - Final parameter values
     * @param {boolean} [completionData.showNotification=true] - Show success notification
     */
    completeLevel(completionData) {
        const {
            score,
            solutions = this.getParameters(),
            showNotification = true
        } = completionData;
        
        if (typeof score !== 'number' || score < 0 || score > 100) {
            throw new Error('Score must be a number between 0 and 100');
        }
        
        const timeSpent = Date.now() - this.sessionStartTime;
        
        this.log(`Level completed! Score: ${score}, Time: ${Math.round(timeSpent/1000)}s`);
        
        if (this.hasStateManagement) {
            try {
                LevelProgressStore.completeLevel(this.config.id, {
                    score,
                    solutions,
                    timeSpent
                });
                
                if (showNotification) {
                    GameStateStore.addNotification({
                        type: 'success',
                        message: `${this.config.name} completed! Score: ${score}/100`,
                        duration: 5000
                    });
                }
            } catch (error) {
                this.log('Could not save level completion', error);
            }
        }
        
        // Trigger completion event
        this._dispatchEvent('levelCompleted', {
            score,
            solutions,
            timeSpent,
            attempts: this.attempts
        });
    }
    
    /**
     * Shows an error message to the user
     * 
     * @param {string} message - Error message to display
     * @param {boolean} [persistent=false] - Whether error should stay visible
     */
    showError(message, persistent = false) {
        this._showError(message, persistent);
        
        if (this.hasStateManagement) {
            try {
                GameStateStore.addNotification({
                    type: 'error',
                    message: message,
                    duration: persistent ? 0 : 5000
                });
            } catch (error) {
                this.log('Could not show error notification', error);
            }
        }
    }
    
    /**
     * Shows a success message to the user
     * 
     * @param {string} message - Success message to display
     * @param {number} [duration=3000] - How long to show the message
     */
    showSuccess(message, duration = 3000) {
        if (this.hasStateManagement) {
            try {
                GameStateStore.addNotification({
                    type: 'success',
                    message: message,
                    duration: duration
                });
            } catch (error) {
                this.log('Could not show success notification', error);
            }
        }
        
        // Also show in UI if there's a result section
        const resultSection = document.getElementById(`${this.config.id}-result`);
        if (resultSection) {
            resultSection.innerHTML = `
                <div class="success-message" style="color: #2dd573; font-weight: bold;">
                    ${message}
                </div>
            `;
            resultSection.style.display = 'block';
        }
    }
    
    /**
     * Adds an event listener with automatic cleanup
     * 
     * @param {Element} element - Element to attach listener to
     * @param {string} event - Event type
     * @param {Function} handler - Event handler
     * @param {Object} [options] - Event listener options
     */
    addEventListenerWithCleanup(element, event, handler, options) {
        element.addEventListener(event, handler, options);
        this._eventListeners.push({ element, event, handler });
    }
    
    /**
     * Creates a timeout with automatic cleanup
     * 
     * @param {Function} callback - Callback function
     * @param {number} delay - Delay in milliseconds
     * @returns {number} Timeout ID
     */
    createTimeout(callback, delay) {
        const timeoutId = setTimeout(() => {
            this._timeouts.delete(timeoutId);
            callback();
        }, delay);
        
        this._timeouts.add(timeoutId);
        return timeoutId;
    }
    
    /**
     * Creates an interval with automatic cleanup
     * 
     * @param {Function} callback - Callback function
     * @param {number} interval - Interval in milliseconds
     * @returns {number} Interval ID
     */
    createInterval(callback, interval) {
        const intervalId = setInterval(callback, interval);
        this._intervals.add(intervalId);
        return intervalId;
    }
    
    // Private methods
    
    /**
     * Initializes state management integration
     * @private
     */
    _initializeStateManagement() {
        if (typeof LevelProgressStore !== 'undefined' && typeof GameStateStore !== 'undefined') {
            this.hasStateManagement = true;
            this.log('State management initialized');
        } else {
            this.log('State management not available');
        }
    }
    
    /**
     * Creates the HTML structure for the level
     * @private
     */
    _createHTML() {
        const container = document.getElementById('app');
        if (!container) {
            throw new Error('Could not find app container');
        }
        
        container.innerHTML = this._generateHTML();
    }
    
    /**
     * Generates the HTML template - override in subclasses
     * @private
     */
    _generateHTML() {
        return `
            <div class="current-level" id="${this.config.id}-level">
                <div class="level-header">
                    ${this._generateHeader()}
                </div>
                <div class="level-content">
                    ${this._generateInstructions()}
                    ${this._generateMainContent()}
                    ${this._generateNavigation()}
                </div>
            </div>
        `;
    }
    
    /**
     * Generates the level header
     * @private
     */
    _generateHeader() {
        return this.config.name;
    }
    
    /**
     * Generates the instructions section
     * @private
     */
    _generateInstructions() {
        if (!this.config.description) return '';
        
        return `
            <div class="level-instructions" style="background: rgba(102,126,234,0.1); border-radius: 10px; padding: 15px; margin-bottom: 20px; border: 2px solid rgba(102,126,234,0.3); text-align: center;">
                <p style="font-size: 1rem; color: #555; margin: 0;">
                    ${this.config.description}
                </p>
            </div>
        `;
    }
    
    /**
     * Generates the main content area - override in subclasses
     * @private
     */
    _generateMainContent() {
        return `
            <div class="level-main-content">
                <div class="placeholder-content" style="padding: 40px; text-align: center; color: #666;">
                    <h3>Level Content</h3>
                    <p>Override _generateMainContent() method to add your level content here.</p>
                </div>
            </div>
        `;
    }
    
    /**
     * Generates the navigation section
     * @private
     */
    _generateNavigation() {
        // Check if createStandardNavigation is available
        if (typeof createStandardNavigation === 'function') {
            return createStandardNavigation();
        }
        
        // Fallback navigation
        return `
            <div class="level-navigation" style="margin-top: 30px; text-align: center;">
                <button onclick="history.back()" style="padding: 10px 20px; margin: 5px;">
                    ← Back
                </button>
            </div>
        `;
    }
    
    /**
     * Initializes navigation system
     * @private
     */
    _initializeNavigation() {
        if (typeof initializeNavigation === 'function') {
            try {
                initializeNavigation(this.config.id, `create${this._toPascalCase(this.config.id)}Level`);
            } catch (error) {
                this.log('Could not initialize navigation', error);
            }
        }
    }
    
    /**
     * Sets up common event listeners
     * @private
     */
    _setupCommonEvents() {
        // Track window unload to save state
        this.addEventListenerWithCleanup(window, 'beforeunload', () => {
            if (this.hasStateManagement) {
                this._saveCurrentState();
            }
        });
        
        // Track page visibility changes
        this.addEventListenerWithCleanup(document, 'visibilitychange', () => {
            if (this.hasStateManagement) {
                try {
                    GameStateStore.updateActivity('visibility_change', {
                        hidden: document.hidden,
                        timestamp: Date.now()
                    });
                } catch (error) {
                    this.log('Could not track visibility change', error);
                }
            }
        });
    }
    
    /**
     * Tracks level start in state management
     * @private
     */
    _trackLevelStart() {
        try {
            LevelProgressStore.startLevel(this.config.id);
            GameStateStore.setCurrentLevel(this.config.id);
        } catch (error) {
            this.log('Could not track level start', error);
        }
    }
    
    /**
     * Restores saved state from state management
     * @private
     */
    _restoreSavedState() {
        if (!this.hasStateManagement) return;
        
        try {
            // Restore parameters from GameStateStore
            const savedParameters = GameStateStore.getParameters(this.config.id);
            if (savedParameters && Object.keys(savedParameters).length > 0) {
                this.config.parameters = { ...this.config.parameters, ...savedParameters };
                this.log('Restored saved parameters', savedParameters);
            }
            
            // Restore progress from LevelProgressStore
            const levelProgress = LevelProgressStore.getLevelProgress(this.config.id);
            if (levelProgress && levelProgress.attempts > 0) {
                this.attempts = levelProgress.attempts;
                this.log('Restored progress', { attempts: this.attempts });
            }
        } catch (error) {
            this.log('Could not restore saved state', error);
        }
    }
    
    /**
     * Saves current state to state management
     * @private
     */
    _saveCurrentState() {
        if (!this.hasStateManagement) return;
        
        try {
            GameStateStore.updateParameters(this.config.id, this.config.parameters);
            LevelProgressStore.updateProgress(this.config.id, {
                solutions: this.config.parameters,
                attempts: this.attempts,
                lastActivity: Date.now()
            });
        } catch (error) {
            this.log('Could not save current state', error);
        }
    }
    
    /**
     * Cleans up all resources
     * @private
     */
    _cleanup() {
        // Remove event listeners
        this._eventListeners.forEach(({ element, event, handler }) => {
            try {
                element.removeEventListener(event, handler);
            } catch (error) {
                this.log('Error removing event listener', error);
            }
        });
        this._eventListeners = [];
        
        // Clear timeouts
        this._timeouts.forEach(timeoutId => {
            clearTimeout(timeoutId);
        });
        this._timeouts.clear();
        
        // Clear intervals
        this._intervals.forEach(intervalId => {
            clearInterval(intervalId);
        });
        this._intervals.clear();
    }
    
    /**
     * Shows an error message in the UI
     * @private
     */
    _showError(message, persistent = false) {
        const container = document.getElementById('app');
        if (container) {
            const errorDiv = document.createElement('div');
            errorDiv.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #ff6347;
                color: white;
                padding: 15px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                z-index: 1000;
                max-width: 300px;
            `;
            errorDiv.textContent = message;
            
            container.appendChild(errorDiv);
            
            if (!persistent) {
                this.createTimeout(() => {
                    if (errorDiv.parentNode) {
                        errorDiv.parentNode.removeChild(errorDiv);
                    }
                }, 5000);
            }
        }
    }
    
    /**
     * Dispatches a custom event
     * @private
     */
    _dispatchEvent(eventName, detail) {
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent(`mlteach:level:${eventName}`, {
                detail: {
                    levelId: this.config.id,
                    ...detail
                }
            }));
        }
    }
    
    /**
     * Converts kebab-case to PascalCase
     * @private
     */
    _toPascalCase(str) {
        return str.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join('');
    }
    
    /**
     * Debug logging
     * @private
     */
    log(message, data = null) {
        if (this.config.debug) {
            const prefix = `[${this.config.id}]`;
            if (data) {
                console.log(`${prefix} ${message}`, data);
            } else {
                console.log(`${prefix} ${message}`);
            }
        }
    }
}

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BaseLevelTemplate;
}

/*
 * USAGE EXAMPLE:
 * 
 * class MyLevel extends BaseLevelTemplate {
 *   constructor() {
 *     super({
 *       id: 'my-level',
 *       name: 'My Custom Level',
 *       type: 'interactive',
 *       description: 'Learn something cool!',
 *       parameters: { w: 1.0, b: 0 },
 *       debug: true
 *     });
 *   }
 * 
 *   async setup() {
 *     await super.setup();
 *     
 *     // Your custom setup code
 *     const slider = document.getElementById('my-slider');
 *     this.addEventListenerWithCleanup(slider, 'input', (e) => {
 *       this.updateParameters({ w: parseFloat(e.target.value) });
 *     });
 *   }
 * 
 *   _generateMainContent() {
 *     return `
 *       <div class="my-level-content">
 *         <input type="range" id="my-slider" min="0" max="10" value="1" step="0.1">
 *         <button onclick="level.completeLevel({score: 100})">Complete</button>
 *       </div>
 *     `;
 *   }
 * }
 * 
 * // Usage
 * const level = new MyLevel();
 * level.create();
 */