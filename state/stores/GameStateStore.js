/**
 * Game State Store
 * 
 * Manages current game state including parameter values, optimization settings,
 * and UI state across all MLTEACH levels. This store handles the "live" state
 * of the current session while LevelProgressStore handles historical progress.
 * 
 * State Structure:
 * {
 *   currentLevel: 'balloon-inflation',
 *   parameters: {
 *     'balloon-inflation': { w: 7.2, b: 0 },
 *     'bunny-feeding': { w: 4.8, b: 12.1 }
 *   },
 *   settings: {
 *     learningRate: { w: 0.01, b: 0.02 },
 *     autoOptimize: false,
 *     animationSpeed: 'normal',
 *     showHints: true
 *   },
 *   optimization: {
 *     'balloon-gradient': {
 *       isRunning: false,
 *       currentIteration: 15,
 *       maxIterations: 100,
 *       convergenceThreshold: 0.01,
 *       history: [...]
 *     }
 *   },
 *   ui: {
 *     sidebarOpen: false,
 *     debugMode: false,
 *     theme: 'light',
 *     volume: 0.8
 *   },
 *   session: {
 *     startTime: 1634567890123,
 *     lastActivity: 1634567990123,
 *     isActive: true
 *   }
 * }
 */

// Default parameter ranges and settings for each level
const LEVEL_DEFAULTS = {
    'gradient-descent-intro': {
        parameters: {},
        settings: {
            showSteps: true,
            autoPlay: false
        }
    },
    'balloon-inflation': {
        parameters: { w: 1.0, b: 0 },
        settings: {
            balloonSize: 1,
            showFormula: true,
            tolerance: 0.05
        }
    },
    'balloon-gradient': {
        parameters: { w: 0.0, b: 0 },
        settings: {
            learningRate: 0.02,
            autoOptimize: false,
            stepDelay: 500
        },
        optimization: {
            isRunning: false,
            currentIteration: 0,
            maxIterations: 100,
            convergenceThreshold: 0.01,
            history: []
        }
    },
    'bunny-feeding': {
        parameters: { w: 1.0, b: 5.0 },
        settings: {
            bunnyWeight: 2,
            showFormula: true,
            maxError: 0.5
        }
    },
    'bunny-gradient': {
        parameters: { w: 1.0, b: 3.0 },
        settings: {
            learningRate: { w: 0.003, b: 0.02 },
            autoOptimize: false,
            stepDelay: 400
        },
        optimization: {
            isRunning: false,
            currentIteration: 0,
            maxIterations: 200,
            convergenceThreshold: 2,
            history: []
        }
    }
};

// Global application settings
const DEFAULT_GLOBAL_SETTINGS = {
    learningRate: { w: 0.01, b: 0.02 },
    autoOptimize: false,
    animationSpeed: 'normal', // slow, normal, fast
    showHints: true,
    showDebugInfo: false,
    autoSave: true,
    soundEnabled: true,
    theme: 'light',
    language: 'en'
};

/**
 * Creates and configures the Game State Store
 * 
 * @returns {Store} Configured store instance with game state methods
 */
function createGameStateStore() {
    const initialState = {
        currentLevel: null,
        parameters: {},
        settings: { ...DEFAULT_GLOBAL_SETTINGS },
        optimization: {},
        ui: {
            sidebarOpen: false,
            debugMode: false,
            theme: 'light',
            volume: 0.8,
            notifications: [],
            loading: false
        },
        session: {
            startTime: Date.now(),
            lastActivity: Date.now(),
            isActive: true,
            totalClicks: 0,
            totalKeystrokes: 0
        },
        cache: {
            calculations: {},
            lastCleared: Date.now()
        }
    };
    
    const store = new Store(initialState, {
        name: 'GameStateStore',
        debug: false // Set to true for development
    });
    
    /**
     * Sets the current active level
     * 
     * @param {string} levelId - ID of the level to activate
     * @param {boolean} [resetParameters=false] - Whether to reset parameters to defaults
     * 
     * @example
     * GameStateStore.setCurrentLevel('balloon-inflation', true);
     */
    store.setCurrentLevel = function(levelId, resetParameters = false) {
        if (!LEVEL_DEFAULTS[levelId]) {
            throw new Error(`Unknown level: ${levelId}`);
        }
        
        return this.setState(state => {
            const levelDefaults = LEVEL_DEFAULTS[levelId];
            const existingParams = state.parameters[levelId] || {};
            const existingOptimization = state.optimization[levelId] || {};
            
            const newParameters = resetParameters 
                ? { ...levelDefaults.parameters }
                : { ...levelDefaults.parameters, ...existingParams };
            
            const newOptimization = resetParameters
                ? { ...levelDefaults.optimization }
                : { ...levelDefaults.optimization, ...existingOptimization };
            
            return {
                currentLevel: levelId,
                parameters: {
                    ...state.parameters,
                    [levelId]: newParameters
                },
                optimization: {
                    ...state.optimization,
                    [levelId]: newOptimization
                },
                session: {
                    ...state.session,
                    lastActivity: Date.now()
                }
            };
        }, 'SET_CURRENT_LEVEL');
    };
    
    /**
     * Updates parameters for a specific level
     * 
     * @param {string} levelId - ID of the level
     * @param {Object} parameterUpdates - Parameter values to update
     * @param {boolean} [merge=true] - Whether to merge with existing parameters
     * 
     * @example
     * GameStateStore.updateParameters('balloon-inflation', { w: 7.2 });
     */
    store.updateParameters = function(levelId, parameterUpdates, merge = true) {
        return this.setState(state => {
            const existing = state.parameters[levelId] || {};
            const newParams = merge 
                ? { ...existing, ...parameterUpdates }
                : { ...parameterUpdates };
            
            return {
                parameters: {
                    ...state.parameters,
                    [levelId]: newParams
                },
                session: {
                    ...state.session,
                    lastActivity: Date.now()
                }
            };
        }, 'UPDATE_PARAMETERS');
    };
    
    /**
     * Gets parameters for a specific level
     * 
     * @param {string} levelId - ID of the level
     * @returns {Object} Current parameters for the level
     */
    store.getParameters = function(levelId) {
        const state = this.getState();
        return state.parameters[levelId] || LEVEL_DEFAULTS[levelId]?.parameters || {};
    };
    
    /**
     * Updates optimization state for gradient descent levels
     * 
     * @param {string} levelId - ID of the level
     * @param {Object} optimizationUpdates - Optimization state updates
     * 
     * @example
     * GameStateStore.updateOptimization('balloon-gradient', {
     *   isRunning: true,
     *   currentIteration: 5,
     *   history: [...]
     * });
     */
    store.updateOptimization = function(levelId, optimizationUpdates) {
        return this.setState(state => {
            const existing = state.optimization[levelId] || {};
            
            return {
                optimization: {
                    ...state.optimization,
                    [levelId]: {
                        ...existing,
                        ...optimizationUpdates
                    }
                },
                session: {
                    ...state.session,
                    lastActivity: Date.now()
                }
            };
        }, 'UPDATE_OPTIMIZATION');
    };
    
    /**
     * Starts optimization for a gradient descent level
     * 
     * @param {string} levelId - ID of the level
     * @param {Object} [config={}] - Optimization configuration
     * 
     * @example
     * GameStateStore.startOptimization('balloon-gradient', {
     *   maxIterations: 50,
     *   learningRate: 0.01
     * });
     */
    store.startOptimization = function(levelId, config = {}) {
        const defaults = LEVEL_DEFAULTS[levelId]?.optimization || {};
        
        return this.updateOptimization(levelId, {
            isRunning: true,
            currentIteration: 0,
            startTime: Date.now(),
            ...defaults,
            ...config
        });
    };
    
    /**
     * Stops optimization for a gradient descent level
     * 
     * @param {string} levelId - ID of the level
     * @param {string} [reason='manual'] - Reason for stopping
     */
    store.stopOptimization = function(levelId, reason = 'manual') {
        return this.updateOptimization(levelId, {
            isRunning: false,
            stopTime: Date.now(),
            stopReason: reason
        });
    };
    
    /**
     * Adds an iteration to the optimization history
     * 
     * @param {string} levelId - ID of the level
     * @param {Object} iterationData - Data for this iteration
     * 
     * @example
     * GameStateStore.addOptimizationStep('balloon-gradient', {
     *   iteration: 5,
     *   parameters: { w: 3.2, b: 0 },
     *   loss: 15.7,
     *   gradients: { gradW: -2.1, gradB: 0 }
     * });
     */
    store.addOptimizationStep = function(levelId, iterationData) {
        return this.setState(state => {
            const optimization = state.optimization[levelId] || {};
            const history = optimization.history || [];
            
            // Limit history size to prevent memory issues
            const newHistory = [...history, {
                timestamp: Date.now(),
                ...iterationData
            }];
            
            if (newHistory.length > 1000) {
                newHistory.shift(); // Remove oldest entry
            }
            
            return {
                optimization: {
                    ...state.optimization,
                    [levelId]: {
                        ...optimization,
                        history: newHistory,
                        currentIteration: iterationData.iteration || (optimization.currentIteration + 1)
                    }
                }
            };
        }, 'ADD_OPTIMIZATION_STEP');
    };
    
    /**
     * Updates global application settings
     * 
     * @param {Object} settingUpdates - Settings to update
     * 
     * @example
     * GameStateStore.updateSettings({
     *   showHints: false,
     *   animationSpeed: 'fast'
     * });
     */
    store.updateSettings = function(settingUpdates) {
        return this.setState(state => ({
            settings: {
                ...state.settings,
                ...settingUpdates
            }
        }), 'UPDATE_SETTINGS');
    };
    
    /**
     * Updates UI state
     * 
     * @param {Object} uiUpdates - UI state updates
     * 
     * @example
     * GameStateStore.updateUI({ debugMode: true, loading: false });
     */
    store.updateUI = function(uiUpdates) {
        return this.setState(state => ({
            ui: {
                ...state.ui,
                ...uiUpdates
            }
        }), 'UPDATE_UI');
    };
    
    /**
     * Adds a notification to the UI
     * 
     * @param {Object} notification - Notification details
     * @param {string} notification.type - Type: 'success', 'error', 'warning', 'info'
     * @param {string} notification.message - Notification message
     * @param {number} [notification.duration=5000] - Auto-dismiss duration in ms
     * 
     * @example
     * GameStateStore.addNotification({
     *   type: 'success',
     *   message: 'Level completed!',
     *   duration: 3000
     * });
     */
    store.addNotification = function(notification) {
        const id = Date.now() + Math.random();
        const fullNotification = {
            id,
            timestamp: Date.now(),
            duration: 5000,
            ...notification
        };
        
        this.setState(state => ({
            ui: {
                ...state.ui,
                notifications: [...state.ui.notifications, fullNotification]
            }
        }), 'ADD_NOTIFICATION');
        
        // Auto-remove notification after duration
        if (fullNotification.duration > 0) {
            setTimeout(() => {
                this.removeNotification(id);
            }, fullNotification.duration);
        }
        
        return id;
    };
    
    /**
     * Removes a notification from the UI
     * 
     * @param {string} notificationId - ID of the notification to remove
     */
    store.removeNotification = function(notificationId) {
        return this.setState(state => ({
            ui: {
                ...state.ui,
                notifications: state.ui.notifications.filter(n => n.id !== notificationId)
            }
        }), 'REMOVE_NOTIFICATION');
    };
    
    /**
     * Clears all notifications
     */
    store.clearNotifications = function() {
        return this.setState(state => ({
            ui: {
                ...state.ui,
                notifications: []
            }
        }), 'CLEAR_NOTIFICATIONS');
    };
    
    /**
     * Updates session activity tracking
     * 
     * @param {string} [activity='general'] - Type of activity
     * @param {Object} [data={}] - Additional activity data
     */
    store.updateActivity = function(activity = 'general', data = {}) {
        return this.setState(state => {
            const updates = { lastActivity: Date.now() };
            
            if (activity === 'click') {
                updates.totalClicks = (state.session.totalClicks || 0) + 1;
            } else if (activity === 'keystroke') {
                updates.totalKeystrokes = (state.session.totalKeystrokes || 0) + 1;
            }
            
            return {
                session: {
                    ...state.session,
                    ...updates,
                    ...data
                }
            };
        }, 'UPDATE_ACTIVITY');
    };
    
    /**
     * Caches calculation results to improve performance
     * 
     * @param {string} key - Cache key
     * @param {*} value - Value to cache
     * @param {number} [ttl=300000] - Time to live in milliseconds (5 minutes default)
     */
    store.cacheResult = function(key, value, ttl = 300000) {
        const expiry = Date.now() + ttl;
        
        return this.setState(state => ({
            cache: {
                ...state.cache,
                calculations: {
                    ...state.cache.calculations,
                    [key]: { value, expiry }
                }
            }
        }), 'CACHE_RESULT');
    };
    
    /**
     * Gets a cached calculation result
     * 
     * @param {string} key - Cache key
     * @returns {*} Cached value or null if not found/expired
     */
    store.getCachedResult = function(key) {
        const state = this.getState();
        const cached = state.cache.calculations[key];
        
        if (!cached) return null;
        if (Date.now() > cached.expiry) {
            // Remove expired entry
            this.setState(state => {
                const newCalculations = { ...state.cache.calculations };
                delete newCalculations[key];
                return {
                    cache: {
                        ...state.cache,
                        calculations: newCalculations
                    }
                };
            }, 'REMOVE_EXPIRED_CACHE');
            return null;
        }
        
        return cached.value;
    };
    
    /**
     * Clears all cached results
     */
    store.clearCache = function() {
        return this.setState(state => ({
            cache: {
                calculations: {},
                lastCleared: Date.now()
            }
        }), 'CLEAR_CACHE');
    };
    
    /**
     * Resets all state for a specific level
     * 
     * @param {string} levelId - ID of the level to reset
     */
    store.resetLevel = function(levelId) {
        const defaults = LEVEL_DEFAULTS[levelId] || {};
        
        return this.setState(state => {
            const newParameters = { ...state.parameters };
            const newOptimization = { ...state.optimization };
            
            if (defaults.parameters) {
                newParameters[levelId] = { ...defaults.parameters };
            } else {
                delete newParameters[levelId];
            }
            
            if (defaults.optimization) {
                newOptimization[levelId] = { ...defaults.optimization };
            } else {
                delete newOptimization[levelId];
            }
            
            return {
                parameters: newParameters,
                optimization: newOptimization
            };
        }, 'RESET_LEVEL');
    };
    
    /**
     * Gets a summary of the current game state
     * 
     * @returns {Object} State summary
     */
    store.getStateSummary = function() {
        const state = this.getState();
        
        return {
            currentLevel: state.currentLevel,
            parameterCount: Object.keys(state.parameters).length,
            activeOptimizations: Object.values(state.optimization).filter(o => o.isRunning).length,
            notificationCount: state.ui.notifications.length,
            sessionDuration: Date.now() - state.session.startTime,
            cacheSize: Object.keys(state.cache.calculations).length,
            lastActivity: state.session.lastActivity
        };
    };
    
    return store;
}

// Make the store creator available globally
window.createGameStateStore = createGameStateStore;
window.LEVEL_DEFAULTS = LEVEL_DEFAULTS;
window.DEFAULT_GLOBAL_SETTINGS = DEFAULT_GLOBAL_SETTINGS;

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        createGameStateStore, 
        LEVEL_DEFAULTS, 
        DEFAULT_GLOBAL_SETTINGS 
    };
}

/*
 * USAGE EXAMPLES:
 * 
 * 1. Initialize Store:
 * ===================
 * const gameStore = createGameStateStore();
 * 
 * 2. Set Current Level:
 * ====================
 * gameStore.setCurrentLevel('balloon-inflation');
 * 
 * 3. Update Parameters:
 * ====================
 * gameStore.updateParameters('balloon-inflation', { w: 7.2 });
 * 
 * 4. Handle Gradient Descent:
 * ==========================
 * gameStore.startOptimization('balloon-gradient');
 * gameStore.addOptimizationStep('balloon-gradient', {
 *   iteration: 1,
 *   parameters: { w: 0.5, b: 0 },
 *   loss: 42.1,
 *   gradients: { gradW: -21.0, gradB: 0 }
 * });
 * gameStore.stopOptimization('balloon-gradient', 'converged');
 * 
 * 5. Manage UI State:
 * ==================
 * gameStore.updateUI({ loading: true });
 * gameStore.addNotification({
 *   type: 'success',
 *   message: 'Parameter updated!'
 * });
 * 
 * 6. Track Activity:
 * =================
 * gameStore.updateActivity('click', { element: 'inflate-button' });
 * gameStore.updateActivity('keystroke');
 * 
 * 7. Performance Caching:
 * ======================
 * gameStore.cacheResult('loss-calculation-w5-b10', 15.7);
 * const cachedLoss = gameStore.getCachedResult('loss-calculation-w5-b10');
 * 
 * 8. Listen to Changes:
 * ====================
 * gameStore.subscribe((newState, prevState) => {
 *   if (newState.currentLevel !== prevState.currentLevel) {
 *     console.log('Level changed to:', newState.currentLevel);
 *   }
 * });
 */