/**
 * @fileoverview Event manager to prevent memory leaks in the MLTEACH application.
 * Tracks and cleans up event listeners when navigating between levels.
 */

/**
 * EventManager handles event listener lifecycle management
 * @class EventManager
 */
class EventManager {
    /**
     * Creates a new EventManager instance
     * @constructor
     */
    constructor() {
        this.listeners = new Map();
        this.activeListeners = [];
    }
    
    /**
     * Adds an event listener and tracks it for cleanup
     * @param {HTMLElement} element - DOM element to attach listener to
     * @param {string} event - Event type (e.g., 'click', 'input')
     * @param {Function} handler - Event handler function
     * @returns {void}
     */
    add(element, event, handler) {
        if (!element) return;
        
        const key = Symbol('listener');
        this.listeners.set(key, { element, event, handler });
        this.activeListeners.push(key);
        element.addEventListener(event, handler);
    }
    
    /**
     * Removes all tracked event listeners
     * @returns {void}
     */
    cleanup() {
        this.activeListeners.forEach(key => {
            const listener = this.listeners.get(key);
            if (listener && listener.element) {
                listener.element.removeEventListener(listener.event, listener.handler);
            }
            this.listeners.delete(key);
        });
        this.activeListeners = [];
        console.log('Event listeners cleaned up');
    }
    
    /**
     * Gets the count of active listeners
     * @returns {number} Number of active event listeners
     */
    getActiveCount() {
        return this.activeListeners.length;
    }
}

// Create global instance
const eventManager = new EventManager();
