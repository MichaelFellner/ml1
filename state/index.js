/**
 * State Management System - Main Index
 * 
 * Initializes all stores, provides localStorage persistence, and exports
 * store instances for use throughout the MLTEACH application.
 * 
 * This module:
 * - Creates and configures all store instances
 * - Provides automatic localStorage persistence
 * - Handles state hydration on app startup
 * - Exports global store references
 * - Manages state synchronization between stores
 */

// Storage keys for localStorage persistence
const STORAGE_KEYS = {
    LEVEL_PROGRESS: 'mlteach_level_progress',
    GAME_STATE: 'mlteach_game_state',
    SETTINGS: 'mlteach_settings',
    VERSION: 'mlteach_state_version'
};

// Current state schema version (increment when making breaking changes)
const STATE_VERSION = '1.0.0';

/**
 * State Persistence Manager
 * 
 * Handles saving and loading state from localStorage with
 * versioning, error handling, and data validation.
 */
class StatePersistenceManager {
    
    constructor(options = {}) {
        this.enablePersistence = options.enablePersistence !== false; // Default true
        this.autoSaveDelay = options.autoSaveDelay || 1000; // 1 second delay
        this.maxRetries = options.maxRetries || 3;
        this.debug = options.debug || false;
        
        this._saveTimeouts = new Map();
        this._retryCounters = new Map();
        
        this.log('Persistence manager initialized', {
            enabled: this.enablePersistence,
            autoSaveDelay: this.autoSaveDelay
        });
    }
    
    /**
     * Saves data to localStorage with error handling
     * 
     * @param {string} key - Storage key
     * @param {*} data - Data to save
     * @param {boolean} [immediate=false] - Skip debouncing
     * @returns {boolean} Success status
     */
    save(key, data, immediate = false) {
        if (!this.enablePersistence) {
            this.log('Persistence disabled, skipping save');
            return false;
        }
        
        const saveOperation = () => {
            try {
                const serializedData = JSON.stringify({
                    version: STATE_VERSION,
                    timestamp: Date.now(),
                    data: data
                });
                
                localStorage.setItem(key, serializedData);
                this._retryCounters.delete(key);
                this.log(`Saved data to ${key}`, { size: serializedData.length });
                return true;
                
            } catch (error) {
                this.handleSaveError(key, error, data);
                return false;
            }
        };
        
        if (immediate) {
            return saveOperation();
        }
        
        // Debounce saves to prevent excessive localStorage writes
        if (this._saveTimeouts.has(key)) {
            clearTimeout(this._saveTimeouts.get(key));
        }
        
        this._saveTimeouts.set(key, setTimeout(() => {
            saveOperation();
            this._saveTimeouts.delete(key);
        }, this.autoSaveDelay));
        
        return true;
    }
    
    /**
     * Loads data from localStorage with validation
     * 
     * @param {string} key - Storage key
     * @param {*} [defaultValue=null] - Default value if not found
     * @returns {*} Loaded data or default value
     */
    load(key, defaultValue = null) {
        if (!this.enablePersistence) {
            this.log('Persistence disabled, returning default');
            return defaultValue;
        }
        
        try {
            const serializedData = localStorage.getItem(key);
            
            if (!serializedData) {
                this.log(`No data found for ${key}`);
                return defaultValue;
            }
            
            const parsed = JSON.parse(serializedData);
            
            // Version check
            if (parsed.version !== STATE_VERSION) {
                this.log(`Version mismatch for ${key}`, {
                    stored: parsed.version,
                    current: STATE_VERSION
                });
                
                // Handle migration or return default
                return this.migrateData(parsed, defaultValue) || defaultValue;
            }
            
            // Age check (optional - could warn about very old data)
            const age = Date.now() - (parsed.timestamp || 0);
            if (age > 30 * 24 * 60 * 60 * 1000) { // 30 days
                this.log(`Old data detected for ${key}`, { ageInDays: Math.floor(age / (24 * 60 * 60 * 1000)) });
            }
            
            this.log(`Loaded data from ${key}`, { timestamp: parsed.timestamp });
            return parsed.data;
            
        } catch (error) {
            console.error(`Error loading data from ${key}:`, error);
            return defaultValue;
        }
    }
    
    /**
     * Removes data from localStorage
     * 
     * @param {string} key - Storage key to remove
     */
    remove(key) {
        if (!this.enablePersistence) return;
        
        try {
            localStorage.removeItem(key);
            this.log(`Removed data for ${key}`);
        } catch (error) {
            console.error(`Error removing data for ${key}:`, error);
        }
    }
    
    /**
     * Clears all MLTEACH data from localStorage
     */
    clear() {
        if (!this.enablePersistence) return;
        
        Object.values(STORAGE_KEYS).forEach(key => {
            this.remove(key);
        });
        
        this.log('Cleared all stored data');
    }
    
    /**
     * Gets storage usage statistics
     * 
     * @returns {Object} Storage statistics
     */
    getStorageStats() {
        if (!this.enablePersistence) {
            return { enabled: false };
        }
        
        const stats = {
            enabled: true,
            keys: {},
            totalSize: 0,
            quota: this.getStorageQuota()
        };
        
        Object.entries(STORAGE_KEYS).forEach(([name, key]) => {
            const data = localStorage.getItem(key);
            const size = data ? data.length : 0;
            
            stats.keys[name] = {
                key,
                size,
                exists: !!data
            };
            
            stats.totalSize += size;
        });
        
        stats.usagePercent = stats.quota > 0 ? (stats.totalSize / stats.quota) * 100 : 0;
        
        return stats;
    }
    
    /**
     * Estimates localStorage quota
     * 
     * @returns {number} Estimated quota in characters
     */
    getStorageQuota() {
        try {
            // Simple test to estimate quota
            const testKey = '_mlteach_quota_test';
            let size = 0;
            const increment = 1024 * 1024; // 1MB chunks
            
            while (size < 10 * 1024 * 1024) { // Max 10MB test
                try {
                    localStorage.setItem(testKey, 'x'.repeat(size + increment));
                    size += increment;
                } catch {
                    break;
                }
            }
            
            localStorage.removeItem(testKey);
            return size;
            
        } catch {
            return 5 * 1024 * 1024; // Default estimate: 5MB
        }
    }
    
    /**
     * Handles save errors with retry logic
     * @private
     */
    handleSaveError(key, error, data) {
        const retryCount = this._retryCounters.get(key) || 0;
        
        console.error(`Error saving to ${key} (attempt ${retryCount + 1}):`, error);
        
        if (retryCount < this.maxRetries) {
            this._retryCounters.set(key, retryCount + 1);
            
            // Try again with a delay
            setTimeout(() => {
                this.save(key, data, true);
            }, 1000 * (retryCount + 1));
        } else {
            console.error(`Failed to save ${key} after ${this.maxRetries} attempts`);
            this._retryCounters.delete(key);
        }
    }
    
    /**
     * Handles data migration between versions
     * @private
     */
    migrateData(parsedData, defaultValue) {
        // TODO: Implement migration logic when needed
        // For now, just log and return null to use default
        this.log('Data migration not implemented, using defaults');
        return null;
    }
    
    /**
     * Debug logging
     * @private
     */
    log(message, data = null) {
        if (this.debug) {
            if (data) {
                console.log(`[StatePersistence] ${message}`, data);
            } else {
                console.log(`[StatePersistence] ${message}`);
            }
        }
    }
}

/**
 * State Manager - Main orchestrator
 * 
 * Coordinates all stores and handles cross-store synchronization
 */
class StateManager {
    
    constructor() {
        this.persistence = new StatePersistenceManager({
            enablePersistence: true,
            debug: false // Set to true for development
        });
        
        this.stores = {};
        this.initialized = false;
        this._unsubscribers = [];
        
        this.log('StateManager created');
    }
    
    /**
     * Initializes all stores with persistence
     */
    initialize() {
        if (this.initialized) {
            this.log('Already initialized');
            return;
        }
        
        try {
            // Initialize stores
            this.initializeLevelProgressStore();
            this.initializeGameStateStore();
            
            // Set up cross-store synchronization
            this.setupSynchronization();
            
            // Set up auto-save
            this.setupAutoSave();
            
            this.initialized = true;
            this.log('StateManager initialized successfully');
            
            // Trigger initial state event
            this.notifyStateReady();
            
        } catch (error) {
            console.error('Failed to initialize StateManager:', error);
            throw error;
        }
    }
    
    /**
     * Initializes the Level Progress Store with persistence
     */
    initializeLevelProgressStore() {
        // Load saved progress
        const savedProgress = this.persistence.load(STORAGE_KEYS.LEVEL_PROGRESS);
        
        // Create store
        this.stores.levelProgress = createLevelProgressStore();
        
        // Hydrate with saved data if available
        if (savedProgress && Object.keys(savedProgress).length > 0) {
            this.stores.levelProgress.setState(savedProgress);
            this.log('Level progress hydrated from storage');
        }
        
        this.log('Level Progress Store initialized');
    }
    
    /**
     * Initializes the Game State Store with persistence
     */
    initializeGameStateStore() {
        // Load saved game state
        const savedGameState = this.persistence.load(STORAGE_KEYS.GAME_STATE);
        
        // Create store
        this.stores.gameState = createGameStateStore();
        
        // Hydrate with saved data if available (excluding session data)
        if (savedGameState && Object.keys(savedGameState).length > 0) {
            const { session, cache, ...persistentState } = savedGameState;
            this.stores.gameState.setState({
                ...persistentState,
                session: {
                    startTime: Date.now(),
                    lastActivity: Date.now(),
                    isActive: true,
                    totalClicks: session?.totalClicks || 0,
                    totalKeystrokes: session?.totalKeystrokes || 0
                }
            });
            this.log('Game state hydrated from storage');
        }
        
        this.log('Game State Store initialized');
    }
    
    /**
     * Sets up cross-store synchronization
     */
    setupSynchronization() {
        // Sync current level between stores
        const syncCurrentLevel = (gameState) => {
            if (gameState.currentLevel) {
                const levelProgress = this.stores.levelProgress.getState();
                if (levelProgress.currentLevel !== gameState.currentLevel) {
                    this.stores.levelProgress.setState({
                        currentLevel: gameState.currentLevel
                    });
                }
            }
        };
        
        const unsubscribeGameState = this.stores.gameState.subscribe((newState) => {
            syncCurrentLevel(newState);
        });
        
        this._unsubscribers.push(unsubscribeGameState);
        
        this.log('Cross-store synchronization set up');
    }
    
    /**
     * Sets up automatic persistence
     */
    setupAutoSave() {
        // Save level progress when it changes
        const unsubscribeLevelProgress = this.stores.levelProgress.subscribe((newState) => {
            this.persistence.save(STORAGE_KEYS.LEVEL_PROGRESS, newState);
        });
        
        // Save game state when it changes (excluding temporary session data)
        const unsubscribeGameState = this.stores.gameState.subscribe((newState) => {
            const { cache, session, ui, ...persistentState } = newState;
            
            // Keep some session data but not temporary cache
            const cleanedSession = {
                totalClicks: session.totalClicks,
                totalKeystrokes: session.totalKeystrokes
            };
            
            this.persistence.save(STORAGE_KEYS.GAME_STATE, {
                ...persistentState,
                session: cleanedSession
            });
        });
        
        this._unsubscribers.push(unsubscribeLevelProgress, unsubscribeGameState);
        
        this.log('Auto-save set up');
    }
    
    /**
     * Notifies that the state system is ready
     */
    notifyStateReady() {
        // Dispatch custom event for other parts of the app
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('mlteach:state:ready', {
                detail: {
                    stores: this.stores,
                    persistence: this.persistence
                }
            }));
        }
        
        this.log('State ready event dispatched');
    }
    
    /**
     * Gets all store instances
     * 
     * @returns {Object} Object containing all store instances
     */
    getStores() {
        return { ...this.stores };
    }
    
    /**
     * Gets the persistence manager
     * 
     * @returns {StatePersistenceManager} Persistence manager instance
     */
    getPersistence() {
        return this.persistence;
    }
    
    /**
     * Exports all state data
     * 
     * @returns {Object} Complete state export
     */
    exportState() {
        return {
            version: STATE_VERSION,
            timestamp: Date.now(),
            levelProgress: this.stores.levelProgress.getState(),
            gameState: this.stores.gameState.getState()
        };
    }
    
    /**
     * Imports state data
     * 
     * @param {Object} stateData - State data to import
     * @param {boolean} [merge=true] - Whether to merge with existing state
     */
    importState(stateData, merge = true) {
        if (stateData.version !== STATE_VERSION) {
            throw new Error('State version mismatch');
        }
        
        if (stateData.levelProgress) {
            if (merge) {
                this.stores.levelProgress.setState(stateData.levelProgress);
            } else {
                this.stores.levelProgress.reset(stateData.levelProgress);
            }
        }
        
        if (stateData.gameState) {
            if (merge) {
                this.stores.gameState.setState(stateData.gameState);
            } else {
                this.stores.gameState.reset(stateData.gameState);
            }
        }
        
        this.log('State imported successfully');
    }
    
    /**
     * Clears all state and storage
     */
    clearAll() {
        this.stores.levelProgress.reset();
        this.stores.gameState.reset();
        this.persistence.clear();
        
        this.log('All state cleared');
    }
    
    /**
     * Cleanup when shutting down
     */
    destroy() {
        // Force immediate save
        if (this.initialized) {
            const levelProgressState = this.stores.levelProgress.getState();
            const gameState = this.stores.gameState.getState();
            
            this.persistence.save(STORAGE_KEYS.LEVEL_PROGRESS, levelProgressState, true);
            this.persistence.save(STORAGE_KEYS.GAME_STATE, gameState, true);
        }
        
        // Clean up subscriptions
        this._unsubscribers.forEach(unsubscribe => unsubscribe());
        this._unsubscribers = [];
        
        // Clear stores
        if (this.stores.levelProgress) {
            this.stores.levelProgress.clearListeners();
        }
        if (this.stores.gameState) {
            this.stores.gameState.clearListeners();
        }
        
        this.initialized = false;
        
        this.log('StateManager destroyed');
    }
    
    /**
     * Debug logging
     * @private
     */
    log(message, data = null) {
        if (data) {
            console.log(`[StateManager] ${message}`, data);
        } else {
            console.log(`[StateManager] ${message}`);
        }
    }
}

// Create global state manager instance
const stateManager = new StateManager();

// Make everything globally available
window.StateManager = stateManager;
window.StatePersistenceManager = StatePersistenceManager;
window.STORAGE_KEYS = STORAGE_KEYS;
window.STATE_VERSION = STATE_VERSION;

// Export store references for easy access
let LevelProgressStore = null;
let GameStateStore = null;

// Initialize on DOM ready or immediately if DOM is already ready
function initializeStores() {
    try {
        stateManager.initialize();
        
        // Export store references
        const stores = stateManager.getStores();
        LevelProgressStore = stores.levelProgress;
        GameStateStore = stores.gameState;
        
        // Make stores globally available
        window.LevelProgressStore = LevelProgressStore;
        window.GameStateStore = GameStateStore;
        
        console.log('✅ MLTEACH State Management System initialized');
        
    } catch (error) {
        console.error('❌ Failed to initialize state management:', error);
    }
}

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeStores);
    } else {
        // DOM is already ready
        setTimeout(initializeStores, 0);
    }
} else {
    // Non-browser environment
    initializeStores();
}

// Handle page unload to save state
if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
        stateManager.destroy();
    });
}

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        stateManager,
        StatePersistenceManager,
        STORAGE_KEYS,
        STATE_VERSION,
        // These will be null until initialized
        get LevelProgressStore() { return LevelProgressStore; },
        get GameStateStore() { return GameStateStore; }
    };
}

/*
 * USAGE EXAMPLES:
 * 
 * 1. Access Stores (after initialization):
 * ========================================
 * // Global access
 * LevelProgressStore.startLevel('balloon-inflation');
 * GameStateStore.updateParameters('balloon-inflation', { w: 7.2 });
 * 
 * // Via StateManager
 * const stores = StateManager.getStores();
 * stores.levelProgress.completeLevel('balloon-inflation', { score: 95 });
 * 
 * 2. Listen for State Ready Event:
 * ===============================
 * window.addEventListener('mlteach:state:ready', (event) => {
 *   const { stores, persistence } = event.detail;
 *   console.log('State system ready!');
 * });
 * 
 * 3. Export/Import State:
 * ======================
 * const exportedState = StateManager.exportState();
 * // Save to file or send to server
 * 
 * // Later, import state
 * StateManager.importState(exportedState);
 * 
 * 4. Storage Management:
 * =====================
 * const persistence = StateManager.getPersistence();
 * const stats = persistence.getStorageStats();
 * console.log('Storage usage:', stats);
 * 
 * 5. Clear All Data:
 * =================
 * StateManager.clearAll(); // Clears stores and localStorage
 */