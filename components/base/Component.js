/**
 * Base Component Class for MLTEACH Project
 * 
 * A vanilla JavaScript component system that provides:
 * - State management with automatic re-rendering
 * - Event delegation and lifecycle management
 * - DOM mounting and unmounting
 * - Extensible architecture for custom components
 * 
 * Component Lifecycle:
 * 1. constructor() - Initialize props and state
 * 2. render() - Generate HTML string (must be implemented by subclass)
 * 3. mount() - Insert HTML into DOM and setup event listeners
 * 4. attachEventListeners() - Setup component-specific event handlers
 * 5. setState() - Update state and trigger re-render (can happen multiple times)
 * 6. unmount() - Cleanup event listeners and remove from DOM
 * 
 * @example
 * class MyComponent extends Component {
 *   constructor(props) {
 *     super(props);
 *     this.state = { count: 0 };
 *   }
 * 
 *   render() {
 *     return `<div>Count: ${this.state.count}</div>`;
 *   }
 * 
 *   attachEventListeners() {
 *     this.addEventDelegate('button', 'click', () => {
 *       this.setState({ count: this.state.count + 1 });
 *     });
 *   }
 * }
 * 
 * const component = new MyComponent({ title: 'Counter' });
 * component.mount(document.getElementById('app'));
 */
class Component {
    /**
     * Creates a new Component instance
     * 
     * @param {Object} props - Component properties passed from parent
     * @param {string} [props.id] - Unique identifier for the component
     * @param {string} [props.className] - CSS class names for the component
     */
    constructor(props = {}) {
        /**
         * Component properties (immutable after construction)
         * @type {Object}
         * @readonly
         */
        this.props = Object.freeze({ ...props });
        
        /**
         * Component state (mutable via setState)
         * @type {Object}
         */
        this.state = {};
        
        /**
         * Reference to the DOM container element
         * @type {HTMLElement|null}
         * @private
         */
        this._container = null;
        
        /**
         * Collection of event listeners for cleanup
         * @type {Array<{element: HTMLElement, event: string, handler: Function}>}
         * @private
         */
        this._eventListeners = [];
        
        /**
         * Flag to track if component is mounted
         * @type {boolean}
         * @private
         */
        this._mounted = false;
        
        /**
         * Unique component ID for event delegation
         * @type {string}
         * @private
         */
        this._componentId = `component_${Math.random().toString(36).substr(2, 9)}`;
    }
    
    /**
     * Updates component state and triggers re-render
     * 
     * This method merges the new state with the existing state and
     * automatically re-renders the component if it's mounted.
     * 
     * @param {Object} newState - Partial state object to merge
     * @throws {Error} If newState is not an object
     * 
     * @example
     * this.setState({ count: this.state.count + 1 });
     * // or
     * this.setState({ user: { ...this.state.user, name: 'John' } });
     */
    setState(newState) {
        if (typeof newState !== 'object' || newState === null) {
            throw new Error('setState expects an object as parameter');
        }
        
        // Merge new state with existing state
        const prevState = { ...this.state };
        this.state = { ...this.state, ...newState };
        
        // Re-render if component is mounted and state actually changed
        if (this._mounted && JSON.stringify(prevState) !== JSON.stringify(this.state)) {
            this._rerender();
        }
    }
    
    /**
     * Renders the component to an HTML string
     * 
     * This method MUST be implemented by subclasses. It should return
     * a string of HTML that represents the component's current state.
     * 
     * @abstract
     * @returns {string} HTML string representation of the component
     * @throws {Error} If not implemented by subclass
     * 
     * @example
     * render() {
     *   return `
     *     <div class="my-component">
     *       <h1>${this.props.title}</h1>
     *       <p>Count: ${this.state.count}</p>
     *     </div>
     *   `;
     * }
     */
    render() {
        throw new Error('render() method must be implemented by subclass');
    }
    
    /**
     * Mounts the component to a DOM container
     * 
     * This method renders the component HTML and inserts it into the
     * specified container, then sets up event listeners.
     * 
     * @param {HTMLElement|string} container - DOM element or selector to mount to
     * @throws {Error} If container is not found or component is already mounted
     * 
     * @example
     * component.mount('#app');
     * // or
     * component.mount(document.getElementById('app'));
     */
    mount(container) {
        if (this._mounted) {
            throw new Error('Component is already mounted. Call unmount() first.');
        }
        
        // Resolve container if it's a string selector
        if (typeof container === 'string') {
            container = document.querySelector(container);
        }
        
        if (!container || !(container instanceof HTMLElement)) {
            throw new Error('Invalid container: must be an HTMLElement or valid selector');
        }
        
        this._container = container;
        
        // Render and insert HTML
        const html = this.render();
        this._container.innerHTML = html;
        
        // Add component ID to container for scoped queries
        this._container.setAttribute('data-component-id', this._componentId);
        
        this._mounted = true;
        
        // Setup event listeners
        this.attachEventListeners();
    }
    
    /**
     * Unmounts the component and cleans up resources
     * 
     * This method removes all event listeners and clears the container.
     * Should be called when the component is no longer needed.
     * 
     * @example
     * component.unmount(); // Clean up before page navigation
     */
    unmount() {
        if (!this._mounted) {
            return; // Already unmounted
        }
        
        // Remove all event listeners
        this._eventListeners.forEach(({ element, event, handler }) => {
            element.removeEventListener(event, handler);
        });
        this._eventListeners = [];
        
        // Clear container
        if (this._container) {
            this._container.innerHTML = '';
            this._container.removeAttribute('data-component-id');
        }
        
        this._mounted = false;
        this._container = null;
    }
    
    /**
     * Attaches event listeners to the component
     * 
     * This method is called after mounting and should be overridden
     * by subclasses to setup component-specific event handlers.
     * Use addEventDelegate() for adding event listeners.
     * 
     * @example
     * attachEventListeners() {
     *   this.addEventDelegate('button.increment', 'click', this.handleIncrement.bind(this));
     *   this.addEventDelegate('input', 'change', this.handleInputChange.bind(this));
     * }
     */
    attachEventListeners() {
        // Override in subclasses
    }
    
    /**
     * Finds an element within the component's container
     * 
     * @param {string} selector - CSS selector to search for
     * @returns {HTMLElement|null} Found element or null
     * 
     * @example
     * const button = this.querySelector('.my-button');
     * const inputs = this.querySelectorAll('input'); // Use container.querySelectorAll directly
     */
    querySelector(selector) {
        if (!this._mounted || !this._container) {
            return null;
        }
        return this._container.querySelector(selector);
    }
    
    /**
     * Adds an event listener with automatic cleanup
     * 
     * This method adds event delegation within the component's container
     * and automatically tracks listeners for cleanup on unmount.
     * 
     * @param {string} selector - CSS selector for target elements
     * @param {string} event - Event type (e.g., 'click', 'change')
     * @param {Function} handler - Event handler function
     * @param {Object} [options] - Event listener options
     * 
     * @example
     * this.addEventDelegate('button', 'click', (e) => {
     *   console.log('Button clicked:', e.target);
     * });
     */
    addEventDelegate(selector, event, handler, options = {}) {
        if (!this._mounted || !this._container) {
            console.warn('Cannot add event listener: component not mounted');
            return;
        }
        
        // Create delegated event handler
        const delegatedHandler = (e) => {
            // Check if the event target matches the selector
            const target = e.target.closest(selector);
            if (target && this._container.contains(target)) {
                handler.call(this, e, target);
            }
        };
        
        // Add event listener to container
        this._container.addEventListener(event, delegatedHandler, options);
        
        // Track for cleanup
        this._eventListeners.push({
            element: this._container,
            event,
            handler: delegatedHandler
        });
    }
    
    /**
     * Re-renders the component (internal method)
     * 
     * @private
     */
    _rerender() {
        if (!this._mounted || !this._container) {
            return;
        }
        
        // Store current scroll position and focus
        const scrollTop = this._container.scrollTop;
        const activeElement = document.activeElement;
        const activeElementSelector = this._getElementSelector(activeElement);
        
        // Remove existing event listeners
        this._eventListeners.forEach(({ element, event, handler }) => {
            element.removeEventListener(event, handler);
        });
        this._eventListeners = [];
        
        // Re-render HTML
        const html = this.render();
        this._container.innerHTML = html;
        
        // Restore scroll position
        this._container.scrollTop = scrollTop;
        
        // Restore focus if possible
        if (activeElementSelector) {
            const newActiveElement = this.querySelector(activeElementSelector);
            if (newActiveElement && typeof newActiveElement.focus === 'function') {
                newActiveElement.focus();
            }
        }
        
        // Re-attach event listeners
        this.attachEventListeners();
    }
    
    /**
     * Generates a CSS selector for an element (helper for focus restoration)
     * 
     * @private
     * @param {HTMLElement} element 
     * @returns {string|null}
     */
    _getElementSelector(element) {
        if (!element || !this._container || !this._container.contains(element)) {
            return null;
        }
        
        // Try to create a simple selector
        if (element.id) {
            return `#${element.id}`;
        }
        
        if (element.className) {
            return `.${element.className.split(' ').join('.')}`;
        }
        
        // Fallback to tag name with index
        const siblings = Array.from(element.parentNode.children);
        const index = siblings.indexOf(element);
        return `${element.tagName.toLowerCase()}:nth-child(${index + 1})`;
    }
    
    /**
     * Gets the component's current mount status
     * 
     * @returns {boolean} True if component is mounted
     */
    isMounted() {
        return this._mounted;
    }
    
    /**
     * Gets the component's container element
     * 
     * @returns {HTMLElement|null} Container element or null if not mounted
     */
    getContainer() {
        return this._container;
    }
    
    /**
     * Gets the component's unique ID
     * 
     * @returns {string} Component ID
     */
    getComponentId() {
        return this._componentId;
    }
}

// Export for both ES6 modules and global usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Component;
} else {
    window.Component = Component;
}