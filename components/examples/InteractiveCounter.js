/**
 * InteractiveCounter Component Example
 * 
 * Demonstrates the MLTEACH Component system with:
 * - State management (counter value)
 * - Event handling (button clicks)
 * - Props usage (initial value, step size)
 * - Proper component lifecycle
 * 
 * This example shows how to create a reusable, interactive component
 * that manages its own state and responds to user interactions.
 * 
 * @example
 * // Basic usage
 * const counter = new InteractiveCounter();
 * counter.mount('#app');
 * 
 * @example
 * // With custom props
 * const counter = new InteractiveCounter({
 *   initialValue: 10,
 *   step: 5,
 *   title: 'Score Counter',
 *   showReset: true
 * });
 * counter.mount(document.getElementById('counter-container'));
 * 
 * @example
 * // Multiple counters
 * const counters = [
 *   new InteractiveCounter({ title: 'Counter A', initialValue: 0 }),
 *   new InteractiveCounter({ title: 'Counter B', initialValue: 100, step: 10 })
 * ];
 * counters.forEach((counter, index) => {
 *   counter.mount(`#counter-${index}`);
 * });
 */

// Ensure Component class is available
if (typeof Component === 'undefined') {
    console.error('InteractiveCounter requires Component class. Include components/base/Component.js first.');
}

/**
 * Interactive Counter Component
 * 
 * A demonstration component that shows a counter with increment/decrement
 * buttons and optional reset functionality.
 * 
 * @extends Component
 */
class InteractiveCounter extends Component {
    /**
     * Creates a new InteractiveCounter
     * 
     * @param {Object} props - Component properties
     * @param {number} [props.initialValue=0] - Starting counter value
     * @param {number} [props.step=1] - Amount to increment/decrement
     * @param {string} [props.title='Counter'] - Display title
     * @param {boolean} [props.showReset=false] - Whether to show reset button
     * @param {string} [props.className=''] - Additional CSS classes
     * @param {Function} [props.onChange] - Callback when counter value changes
     */
    constructor(props = {}) {
        super(props);
        
        // Set default props
        const defaultProps = {
            initialValue: 0,
            step: 1,
            title: 'Counter',
            showReset: false,
            className: '',
            onChange: null
        };
        
        // Merge with provided props
        this.props = Object.freeze({ ...defaultProps, ...props });
        
        // Initialize state
        this.state = {
            count: this.props.initialValue,
            lastAction: null // Track what button was last pressed
        };
    }
    
    /**
     * Renders the counter component HTML
     * 
     * @returns {string} HTML string for the counter
     */
    render() {
        const { count, lastAction } = this.state;
        const { title, showReset, className } = this.props;
        
        // Determine if buttons should be highlighted based on last action
        const incrementClass = lastAction === 'increment' ? 'highlight' : '';
        const decrementClass = lastAction === 'decrement' ? 'highlight';
        const resetClass = lastAction === 'reset' ? 'highlight' : '';
        
        return `
            <div class="interactive-counter ${className}">
                <div class="counter-header">
                    <h3 class="counter-title">${title}</h3>
                </div>
                
                <div class="counter-display">
                    <span class="counter-value" data-count="${count}">${count}</span>
                </div>
                
                <div class="counter-controls">
                    <button 
                        class="counter-btn decrement-btn ${decrementClass}" 
                        data-action="decrement"
                        title="Decrease by ${this.props.step}"
                    >
                        <span class="btn-symbol">−</span>
                        <span class="btn-label">Decrease</span>
                    </button>
                    
                    <button 
                        class="counter-btn increment-btn ${incrementClass}" 
                        data-action="increment"
                        title="Increase by ${this.props.step}"
                    >
                        <span class="btn-symbol">+</span>
                        <span class="btn-label">Increase</span>
                    </button>
                    
                    ${showReset ? `
                        <button 
                            class="counter-btn reset-btn ${resetClass}" 
                            data-action="reset"
                            title="Reset to ${this.props.initialValue}"
                        >
                            <span class="btn-symbol">↻</span>
                            <span class="btn-label">Reset</span>
                        </button>
                    ` : ''}
                </div>
                
                <div class="counter-info">
                    <small>Step: ${this.props.step}</small>
                    ${lastAction ? `<small class="last-action">Last: ${lastAction}</small>` : ''}
                </div>
                
                <style>
                    .interactive-counter {
                        display: inline-block;
                        padding: 20px;
                        border: 2px solid #667eea;
                        border-radius: 12px;
                        background: linear-gradient(135deg, #f8f9ff 0%, #e3f2fd 100%);
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                        text-align: center;
                        box-shadow: 0 4px 6px rgba(102, 126, 234, 0.1);
                        transition: all 0.3s ease;
                        min-width: 200px;
                    }
                    
                    .interactive-counter:hover {
                        box-shadow: 0 6px 12px rgba(102, 126, 234, 0.15);
                        transform: translateY(-2px);
                    }
                    
                    .counter-header {
                        margin-bottom: 15px;
                    }
                    
                    .counter-title {
                        margin: 0;
                        color: #333;
                        font-size: 1.2rem;
                        font-weight: 600;
                    }
                    
                    .counter-display {
                        margin: 20px 0;
                        padding: 15px;
                        background: white;
                        border-radius: 8px;
                        border: 1px solid #ddd;
                    }
                    
                    .counter-value {
                        font-size: 2rem;
                        font-weight: bold;
                        color: #667eea;
                        transition: all 0.3s ease;
                    }
                    
                    .counter-value[data-count="0"] {
                        color: #666;
                    }
                    
                    .counter-controls {
                        display: flex;
                        gap: 8px;
                        justify-content: center;
                        margin-bottom: 15px;
                        flex-wrap: wrap;
                    }
                    
                    .counter-btn {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 4px;
                        padding: 10px 15px;
                        border: 2px solid #667eea;
                        border-radius: 8px;
                        background: white;
                        color: #667eea;
                        cursor: pointer;
                        transition: all 0.2s ease;
                        font-family: inherit;
                        min-width: 70px;
                    }
                    
                    .counter-btn:hover {
                        background: #667eea;
                        color: white;
                        transform: translateY(-1px);
                        box-shadow: 0 2px 4px rgba(102, 126, 234, 0.2);
                    }
                    
                    .counter-btn:active {
                        transform: translateY(0);
                        box-shadow: 0 1px 2px rgba(102, 126, 234, 0.2);
                    }
                    
                    .counter-btn.highlight {
                        background: #667eea;
                        color: white;
                        animation: pulse 0.3s ease;
                    }
                    
                    .btn-symbol {
                        font-size: 1.2rem;
                        font-weight: bold;
                    }
                    
                    .btn-label {
                        font-size: 0.75rem;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }
                    
                    .decrement-btn:hover,
                    .decrement-btn.highlight {
                        background: #ff6b6b;
                        border-color: #ff6b6b;
                    }
                    
                    .increment-btn:hover,
                    .increment-btn.highlight {
                        background: #51cf66;
                        border-color: #51cf66;
                    }
                    
                    .reset-btn:hover,
                    .reset-btn.highlight {
                        background: #ffa726;
                        border-color: #ffa726;
                    }
                    
                    .counter-info {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        font-size: 0.8rem;
                        color: #666;
                        margin-top: 10px;
                    }
                    
                    .last-action {
                        font-style: italic;
                        color: #667eea;
                    }
                    
                    @keyframes pulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                        100% { transform: scale(1); }
                    }
                    
                    /* Responsive adjustments */
                    @media (max-width: 300px) {
                        .counter-controls {
                            flex-direction: column;
                        }
                        
                        .counter-btn {
                            min-width: auto;
                        }
                    }
                </style>
            </div>
        `;
    }
    
    /**
     * Sets up event listeners for the counter buttons
     * 
     * Uses event delegation to handle clicks on increment, decrement,
     * and reset buttons. Demonstrates proper event handling patterns.
     */
    attachEventListeners() {
        // Handle all button clicks with event delegation
        this.addEventDelegate('.counter-btn', 'click', this.handleButtonClick.bind(this));
        
        // Optional: Add keyboard support
        this.addEventDelegate('.interactive-counter', 'keydown', this.handleKeyboard.bind(this));
        
        // Make component focusable for keyboard navigation
        const container = this.getContainer();
        if (container) {
            container.setAttribute('tabindex', '0');
        }
    }
    
    /**
     * Handles button click events
     * 
     * @param {Event} event - Click event
     * @param {HTMLElement} target - The clicked button element
     */
    handleButtonClick(event, target) {
        event.preventDefault();
        
        const action = target.getAttribute('data-action');
        
        switch (action) {
            case 'increment':
                this.increment();
                break;
            case 'decrement':
                this.decrement();
                break;
            case 'reset':
                this.reset();
                break;
            default:
                console.warn('Unknown action:', action);
        }
    }
    
    /**
     * Handles keyboard navigation
     * 
     * @param {KeyboardEvent} event - Keyboard event
     */
    handleKeyboard(event) {
        switch (event.key) {
            case 'ArrowUp':
            case '+':
                event.preventDefault();
                this.increment();
                break;
            case 'ArrowDown':
            case '-':
                event.preventDefault();
                this.decrement();
                break;
            case 'r':
            case 'R':
                if (this.props.showReset) {
                    event.preventDefault();
                    this.reset();
                }
                break;
            case 'Enter':
            case ' ':
                event.preventDefault();
                this.increment(); // Default action
                break;
        }
    }
    
    /**
     * Increments the counter value
     */
    increment() {
        const newCount = this.state.count + this.props.step;
        this.setState({
            count: newCount,
            lastAction: 'increment'
        });
        
        this.triggerChangeCallback(newCount, 'increment');
    }
    
    /**
     * Decrements the counter value
     */
    decrement() {
        const newCount = this.state.count - this.props.step;
        this.setState({
            count: newCount,
            lastAction: 'decrement'
        });
        
        this.triggerChangeCallback(newCount, 'decrement');
    }
    
    /**
     * Resets the counter to initial value
     */
    reset() {
        const newCount = this.props.initialValue;
        this.setState({
            count: newCount,
            lastAction: 'reset'
        });
        
        this.triggerChangeCallback(newCount, 'reset');
    }
    
    /**
     * Triggers the onChange callback if provided
     * 
     * @param {number} newValue - New counter value
     * @param {string} action - Action that caused the change
     */
    triggerChangeCallback(newValue, action) {
        if (typeof this.props.onChange === 'function') {
            this.props.onChange({
                value: newValue,
                action: action,
                component: this
            });
        }
    }
    
    /**
     * Gets the current counter value
     * 
     * @returns {number} Current counter value
     */
    getValue() {
        return this.state.count;
    }
    
    /**
     * Sets the counter value programmatically
     * 
     * @param {number} value - New counter value
     */
    setValue(value) {
        if (typeof value !== 'number') {
            throw new Error('setValue expects a number');
        }
        
        this.setState({
            count: value,
            lastAction: 'programmatic'
        });
        
        this.triggerChangeCallback(value, 'programmatic');
    }
}

// Export for both ES6 modules and global usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InteractiveCounter;
} else {
    window.InteractiveCounter = InteractiveCounter;
}

/* 
 * USAGE EXAMPLES:
 * 
 * 1. Basic Counter:
 * ================
 * const counter = new InteractiveCounter();
 * counter.mount('#app');
 * 
 * 2. Customized Counter:
 * =====================
 * const counter = new InteractiveCounter({
 *   title: 'Score',
 *   initialValue: 100,
 *   step: 10,
 *   showReset: true,
 *   onChange: (data) => console.log('Counter changed:', data)
 * });
 * counter.mount('#score-container');
 * 
 * 3. Multiple Synchronized Counters:
 * =================================
 * const counters = [];
 * const totalDisplay = document.getElementById('total');
 * 
 * ['A', 'B', 'C'].forEach((name, index) => {
 *   const counter = new InteractiveCounter({
 *     title: `Counter ${name}`,
 *     onChange: () => {
 *       const total = counters.reduce((sum, c) => sum + c.getValue(), 0);
 *       totalDisplay.textContent = `Total: ${total}`;
 *     }
 *   });
 *   counter.mount(`#counter-${index}`);
 *   counters.push(counter);
 * });
 * 
 * 4. Programmatic Control:
 * =======================
 * const counter = new InteractiveCounter();
 * counter.mount('#app');
 * 
 * // Control programmatically
 * setTimeout(() => counter.setValue(50), 2000);
 * 
 * // Get current value
 * console.log('Current value:', counter.getValue());
 * 
 * // Cleanup when done
 * // counter.unmount();
 */