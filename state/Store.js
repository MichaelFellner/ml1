/**
 * Lightweight State Management Store
 * 
 * A simple reactive state container for managing application state
 * across MLTEACH levels. Provides subscription-based updates and
 * immutable state management patterns.
 * 
 * Features:
 * - Immutable state updates
 * - Subscription-based reactivity
 * - Automatic change detection
 * - Deep merge capabilities
 * - Debug logging
 */

// Make Store available globally
window.Store = class Store {
    
    /**
     * Creates a new Store instance
     * 
     * @param {Object} [initialState={}] - Initial state object
     * @param {Object} [options={}] - Store configuration options
     * @param {string} [options.name='Store'] - Store name for debugging
     * @param {boolean} [options.debug=false] - Enable debug logging
     * @param {boolean} [options.deepMerge=true] - Enable deep merging of nested objects
     * 
     * @example
     * const store = new Store({ count: 0, user: { name: 'Alice' } }, {
     *   name: 'CounterStore',
     *   debug: true
     * });
     */
    constructor(initialState = {}, options = {}) {
        // Store configuration
        this.name = options.name || 'Store';
        this.debug = options.debug || false;
        this.deepMerge = options.deepMerge !== false; // Default true
        
        // State management
        this._state = this._deepClone(initialState);
        this._listeners = new Set();
        this._isNotifying = false;
        
        // Track state history for debugging
        this._history = [];
        if (this.debug) {
            this._history.push({
                state: this._deepClone(this._state),
                timestamp: Date.now(),
                action: 'INIT'
            });
        }
        
        this._log('Store initialized', this._state);
    }
    
    /**
     * Gets the current state
     * 
     * Returns a deep clone of the current state to prevent
     * accidental mutations from outside the store.
     * 
     * @returns {Object} Deep clone of current state
     * 
     * @example
     * const currentState = store.getState();
     * console.log(currentState.count); // Safe to read
     * // currentState.count = 10; // This won't affect the store
     */
    getState() {
        return this._deepClone(this._state);
    }
    
    /**
     * Updates the state with new values
     * 
     * Merges the provided updates into the current state and
     * notifies all subscribers if changes were made.
     * 
     * @param {Object|Function} updates - Object with updates or updater function
     * @param {string} [actionName] - Optional action name for debugging
     * @returns {boolean} True if state actually changed
     * @throws {Error} If updates parameter is invalid
     * 
     * @example
     * // Object updates
     * store.setState({ count: 5, loading: true });
     * 
     * @example
     * // Function updates (receives current state)
     * store.setState(state => ({ count: state.count + 1 }));
     * 
     * @example
     * // With action name for debugging
     * store.setState({ count: 0 }, 'RESET_COUNT');
     */
    setState(updates, actionName = 'UPDATE') {
        // Input validation
        if (updates === null || updates === undefined) {
            throw new Error('setState requires a valid updates parameter');
        }
        
        let newUpdates;
        
        // Handle function updates
        if (typeof updates === 'function') {
            try {
                newUpdates = updates(this.getState());
            } catch (error) {
                throw new Error(`State updater function failed: ${error.message}`);
            }
            
            if (typeof newUpdates !== 'object' || newUpdates === null) {
                throw new Error('State updater function must return an object');
            }
        } else if (typeof updates === 'object') {
            newUpdates = updates;
        } else {
            throw new Error('setState expects an object or function');
        }
        
        // Calculate new state
        const previousState = this._deepClone(this._state);
        const newState = this.deepMerge 
            ? this._deepMerge(this._state, newUpdates)
            : { ...this._state, ...newUpdates };
        
        // Check if state actually changed
        const hasChanged = !this._deepEqual(previousState, newState);
        
        if (hasChanged) {
            this._state = newState;
            
            // Add to history for debugging
            if (this.debug) {
                this._history.push({
                    state: this._deepClone(newState),
                    previousState: previousState,
                    updates: this._deepClone(newUpdates),
                    timestamp: Date.now(),
                    action: actionName
                });
                
                // Limit history size
                if (this._history.length > 50) {
                    this._history.shift();
                }
            }
            
            this._log(`State updated (${actionName})`, {
                previous: previousState,
                updates: newUpdates,
                new: newState
            });
            
            // Notify subscribers
            this.notify();
        } else {
            this._log(`State unchanged (${actionName})`, newUpdates);
        }
        
        return hasChanged;
    }
    
    /**
     * Subscribes to state changes
     * 
     * Adds a listener function that will be called whenever the state changes.
     * The listener receives the new state and previous state as arguments.
     * 
     * @param {Function} listener - Function to call on state changes
     * @returns {Function} Unsubscribe function
     * @throws {Error} If listener is not a function
     * 
     * @example
     * const unsubscribe = store.subscribe((newState, prevState) => {
     *   console.log('State changed:', newState);
     *   console.log('Previous:', prevState);
     * });
     * 
     * // Later, stop listening
     * unsubscribe();
     */
    subscribe(listener) {
        if (typeof listener !== 'function') {
            throw new Error('Listener must be a function');
        }
        
        this._listeners.add(listener);
        this._log('Subscriber added', { totalListeners: this._listeners.size });
        
        // Return unsubscribe function
        return () => this.unsubscribe(listener);
    }
    
    /**
     * Unsubscribes a listener from state changes
     * 
     * @param {Function} listener - The listener function to remove
     * @returns {boolean} True if listener was found and removed
     * 
     * @example
     * const listener = (state) => console.log(state);
     * store.subscribe(listener);
     * store.unsubscribe(listener); // Remove listener
     */
    unsubscribe(listener) {
        const wasRemoved = this._listeners.delete(listener);
        if (wasRemoved) {
            this._log('Subscriber removed', { totalListeners: this._listeners.size });
        }
        return wasRemoved;
    }
    
    /**
     * Notifies all subscribers of state changes
     * 
     * Called automatically by setState, but can be called manually
     * if needed. Prevents recursive notifications.
     * 
     * @returns {number} Number of listeners notified
     */
    notify() {
        // Prevent recursive notifications
        if (this._isNotifying) {
            this._log('Skipping recursive notification');
            return 0;
        }
        
        this._isNotifying = true;
        let notifiedCount = 0;
        
        try {
            const currentState = this.getState();
            const previousState = this.debug && this._history.length > 1 
                ? this._history[this._history.length - 2].state 
                : null;
            
            for (const listener of this._listeners) {
                try {
                    listener(currentState, previousState);
                    notifiedCount++;
                } catch (error) {
                    console.error(`${this.name}: Listener error:`, error);
                }
            }
            
            this._log(`Notified ${notifiedCount} listeners`);
        } finally {
            this._isNotifying = false;
        }
        
        return notifiedCount;
    }
    
    /**
     * Clears all listeners
     * 
     * Useful for cleanup when destroying components or levels.
     * 
     * @returns {number} Number of listeners removed
     */
    clearListeners() {
        const count = this._listeners.size;
        this._listeners.clear();
        this._log(`Cleared ${count} listeners`);
        return count;
    }
    
    /**
     * Resets the store to its initial state
     * 
     * @param {Object} [newInitialState] - Optional new initial state
     * @param {boolean} [notifyListeners=true] - Whether to notify listeners
     * 
     * @example
     * store.reset(); // Reset to original initial state
     * store.reset({ count: 0 }); // Reset to new state
     */
    reset(newInitialState = null, notifyListeners = true) {
        const initialState = newInitialState || (this._history.length > 0 ? this._history[0].state : {});
        
        this._state = this._deepClone(initialState);
        
        if (this.debug) {
            this._history.push({
                state: this._deepClone(this._state),
                timestamp: Date.now(),
                action: 'RESET'
            });
        }
        
        this._log('Store reset', this._state);
        
        if (notifyListeners) {
            this.notify();
        }
    }
    
    /**
     * Gets debug information about the store
     * 
     * @returns {Object} Debug information including history and listeners
     */
    getDebugInfo() {
        return {
            name: this.name,
            currentState: this.getState(),
            listenerCount: this._listeners.size,
            history: this.debug ? [...this._history] : 'Debug mode disabled',
            isNotifying: this._isNotifying
        };
    }
    
    /**
     * Deep clones an object
     * @private
     */
    _deepClone(obj) {
        if (obj === null || typeof obj !== 'object') return obj;
        if (obj instanceof Date) return new Date(obj);
        if (obj instanceof Array) return obj.map(item => this._deepClone(item));
        if (typeof obj === 'object') {
            const cloned = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    cloned[key] = this._deepClone(obj[key]);
                }
            }
            return cloned;
        }
        return obj;
    }
    
    /**
     * Deep merges two objects
     * @private
     */
    _deepMerge(target, source) {
        const result = this._deepClone(target);
        
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                if (typeof source[key] === 'object' && 
                    source[key] !== null && 
                    !Array.isArray(source[key]) &&
                    typeof result[key] === 'object' && 
                    result[key] !== null && 
                    !Array.isArray(result[key])) {
                    result[key] = this._deepMerge(result[key], source[key]);
                } else {
                    result[key] = this._deepClone(source[key]);
                }
            }
        }
        
        return result;
    }
    
    /**
     * Deep equality check
     * @private
     */
    _deepEqual(a, b) {
        if (a === b) return true;
        if (a === null || b === null) return false;
        if (typeof a !== typeof b) return false;
        
        if (typeof a === 'object') {
            if (Array.isArray(a) !== Array.isArray(b)) return false;
            
            const keysA = Object.keys(a);
            const keysB = Object.keys(b);
            
            if (keysA.length !== keysB.length) return false;
            
            for (const key of keysA) {
                if (!keysB.includes(key)) return false;
                if (!this._deepEqual(a[key], b[key])) return false;
            }
            
            return true;
        }
        
        return false;
    }
    
    /**
     * Debug logging
     * @private
     */
    _log(message, data = null) {
        if (this.debug) {
            if (data) {
                console.log(`[${this.name}] ${message}`, data);
            } else {
                console.log(`[${this.name}] ${message}`);
            }
        }
    }
}

// Export for both ES6 modules and CommonJS
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Store;
} else if (typeof window !== 'undefined') {
    window.Store = Store;
}

/*
 * USAGE EXAMPLES:
 * 
 * 1. Basic Usage:
 * ==============
 * const store = new Store({ count: 0, name: 'Alice' });
 * 
 * // Get state
 * const state = store.getState();
 * console.log(state.count); // 0
 * 
 * // Update state
 * store.setState({ count: 5 });
 * 
 * // Listen to changes
 * const unsubscribe = store.subscribe((newState, prevState) => {
 *   console.log('Count changed:', newState.count);
 * });
 * 
 * 2. Function Updates:
 * ===================
 * store.setState(state => ({ count: state.count + 1 }));
 * 
 * 3. Debug Mode:
 * =============
 * const debugStore = new Store({ items: [] }, { 
 *   name: 'ItemStore', 
 *   debug: true 
 * });
 * 
 * 4. Deep Merging:
 * ===============
 * const store = new Store({ 
 *   user: { name: 'Alice', settings: { theme: 'dark' } } 
 * });
 * 
 * // This will merge deeply
 * store.setState({ 
 *   user: { settings: { fontSize: 14 } } 
 * });
 * // Result: { user: { name: 'Alice', settings: { theme: 'dark', fontSize: 14 } } }
 * 
 * 5. Cleanup:
 * ==========
 * store.clearListeners(); // Remove all listeners
 * store.reset(); // Reset to initial state
 */