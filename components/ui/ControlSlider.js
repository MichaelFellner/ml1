/**
 * ControlSlider Component
 * 
 * A reusable slider control component with:
 * - Real-time value display
 * - Customizable styling and colors
 * - Min/max labels
 * - Step control
 * - Change callbacks
 * - Keyboard support
 * 
 * Features:
 * - Smooth value updates
 * - Custom color themes
 * - Responsive design
 * - Accessibility support
 * 
 * @example
 * const slider = new ControlSlider({
 *   min: 0,
 *   max: 100,
 *   value: 50,
 *   step: 1,
 *   label: 'Learning Rate',
 *   color: '#667eea',
 *   onChange: (value) => console.log('New value:', value)
 * });
 * slider.mount('#slider-container');
 */

// Ensure Component class is available
if (typeof Component === 'undefined') {
    console.error('ControlSlider requires Component class. Include components/base/Component.js first.');
}

/**
 * Control Slider Component for numeric input
 * 
 * @extends Component
 */
class ControlSlider extends Component {
    /**
     * Creates a new ControlSlider component
     * 
     * @param {Object} props - Component properties
     * @param {number} [props.min=0] - Minimum value
     * @param {number} [props.max=100] - Maximum value
     * @param {number} [props.value=0] - Current value
     * @param {number} [props.step=1] - Step increment
     * @param {string} [props.label='Value'] - Label text
     * @param {string} [props.color='#667eea'] - Primary color for the slider
     * @param {boolean} [props.showValue=true] - Whether to show current value
     * @param {boolean} [props.showMinMax=true] - Whether to show min/max labels
     * @param {string} [props.valueFormat=''] - Format suffix for value (e.g., '%', 'px')
     * @param {boolean} [props.disabled=false] - Whether slider is disabled
     * @param {string} [props.className=''] - Additional CSS classes
     * @param {Function} [props.onChange] - Callback when value changes
     * @param {Function} [props.onInput] - Callback during drag (real-time)
     */
    constructor(props = {}) {
        super(props);
        
        const defaultProps = {
            min: 0,
            max: 100,
            value: 0,
            step: 1,
            label: 'Value',
            color: '#667eea',
            showValue: true,
            showMinMax: true,
            valueFormat: '',
            disabled: false,
            className: '',
            onChange: null,
            onInput: null
        };
        
        this.props = Object.freeze({ ...defaultProps, ...props });
        
        // Clamp initial value to valid range
        const clampedValue = Math.max(this.props.min, Math.min(this.props.max, this.props.value));
        
        this.state = {
            currentValue: clampedValue,
            isDragging: false,
            hasInteracted: false
        };
    }
    
    /**
     * Renders the control slider HTML
     * 
     * @returns {string} HTML string for the control slider
     */
    render() {
        const { 
            min, max, step, label, color, showValue, showMinMax, 
            valueFormat, disabled, className 
        } = this.props;
        const { currentValue, isDragging } = this.state;
        
        // Calculate percentage for visual progress
        const percentage = ((currentValue - min) / (max - min)) * 100;
        
        return `
            <div class="control-slider-container ${className} ${disabled ? 'disabled' : ''} ${isDragging ? 'dragging' : ''}">
                <div class="slider-header">
                    <label class="slider-label">${label}</label>
                    ${showValue ? `<span class="slider-value" style="color: ${color}">${this._formatValue(currentValue)}</span>` : ''}
                </div>
                
                <div class="slider-track-container">
                    <div class="slider-track">
                        <div 
                            class="slider-progress" 
                            style="width: ${percentage}%; background: ${color};"
                        ></div>
                        <input 
                            type="range" 
                            class="slider-input"
                            min="${min}"
                            max="${max}"
                            step="${step}"
                            value="${currentValue}"
                            ${disabled ? 'disabled' : ''}
                            aria-label="${label}"
                        />
                        <div 
                            class="slider-thumb" 
                            style="left: ${percentage}%; background: ${color}; border-color: ${color};"
                        ></div>
                    </div>
                </div>
                
                ${showMinMax ? `
                    <div class="slider-scale">
                        <span class="scale-min">${this._formatValue(min)}</span>
                        <span class="scale-max">${this._formatValue(max)}</span>
                    </div>
                ` : ''}
                
                <style>
                    .control-slider-container {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                        margin: 15px 0;
                        transition: opacity 0.3s ease;
                    }
                    
                    .control-slider-container.disabled {
                        opacity: 0.6;
                        pointer-events: none;
                    }
                    
                    .slider-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 10px;
                    }
                    
                    .slider-label {
                        font-weight: 600;
                        color: #333;
                        font-size: 0.95rem;
                        margin: 0;
                    }
                    
                    .slider-value {
                        font-weight: bold;
                        font-size: 1.1rem;
                        transition: all 0.2s ease;
                    }
                    
                    .control-slider-container.dragging .slider-value {
                        transform: scale(1.1);
                    }
                    
                    .slider-track-container {
                        position: relative;
                        margin: 8px 0;
                    }
                    
                    .slider-track {
                        position: relative;
                        height: 8px;
                        background: #e0e0e0;
                        border-radius: 4px;
                        overflow: hidden;
                    }
                    
                    .slider-progress {
                        position: absolute;
                        top: 0;
                        left: 0;
                        height: 100%;
                        border-radius: 4px;
                        transition: width 0.15s ease;
                        opacity: 0.8;
                    }
                    
                    .slider-input {
                        position: absolute;
                        top: -6px;
                        left: 0;
                        width: 100%;
                        height: 20px;
                        opacity: 0;
                        cursor: pointer;
                        margin: 0;
                    }
                    
                    .slider-input:disabled {
                        cursor: not-allowed;
                    }
                    
                    .slider-thumb {
                        position: absolute;
                        top: -6px;
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        border: 2px solid;
                        background: white;
                        transform: translateX(-50%);
                        transition: all 0.15s ease;
                        pointer-events: none;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                    }
                    
                    .control-slider-container:hover .slider-thumb,
                    .control-slider-container.dragging .slider-thumb {
                        transform: translateX(-50%) scale(1.2);
                        box-shadow: 0 3px 8px rgba(0,0,0,0.3);
                    }
                    
                    .slider-input:focus + .slider-thumb {
                        transform: translateX(-50%) scale(1.2);
                        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
                    }
                    
                    .slider-scale {
                        display: flex;
                        justify-content: space-between;
                        margin-top: 5px;
                        font-size: 0.8rem;
                        color: #666;
                    }
                    
                    .scale-min, .scale-max {
                        font-weight: 500;
                    }
                    
                    /* Hover effects */
                    .control-slider-container:hover .slider-track {
                        background: #d5d5d5;
                    }
                    
                    .control-slider-container:hover .slider-progress {
                        opacity: 1;
                    }
                    
                    /* Active/dragging state */
                    .control-slider-container.dragging .slider-progress {
                        opacity: 1;
                        box-shadow: 0 0 10px rgba(102, 126, 234, 0.4);
                    }
                    
                    /* Responsive adjustments */
                    @media (max-width: 480px) {
                        .slider-header {
                            flex-direction: column;
                            align-items: flex-start;
                            gap: 4px;
                        }
                        
                        .slider-thumb {
                            width: 24px;
                            height: 24px;
                            top: -8px;
                        }
                        
                        .slider-input {
                            top: -8px;
                            height: 24px;
                        }
                    }
                    
                    /* Animation for value changes */
                    @keyframes valueUpdate {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.15); }
                        100% { transform: scale(1); }
                    }
                    
                    .slider-value.updating {
                        animation: valueUpdate 0.3s ease;
                    }
                </style>
            </div>
        `;
    }
    
    /**
     * Sets up event listeners for the control slider
     */
    attachEventListeners() {
        const input = this.querySelector('.slider-input');
        if (!input) return;
        
        // Input event (real-time during drag)
        this.addEventDelegate('.slider-input', 'input', (event) => {
            const newValue = parseFloat(event.target.value);
            this.setState({ currentValue: newValue, isDragging: true });
            
            if (this.props.onInput) {
                this.props.onInput(newValue);
            }
        });
        
        // Change event (when drag ends or value committed)
        this.addEventDelegate('.slider-input', 'change', (event) => {
            const newValue = parseFloat(event.target.value);
            this.setState({ 
                currentValue: newValue, 
                isDragging: false, 
                hasInteracted: true 
            });
            
            if (this.props.onChange) {
                this.props.onChange(newValue);
            }
            
            // Add animation to value display
            const valueElement = this.querySelector('.slider-value');
            if (valueElement) {
                valueElement.classList.add('updating');
                setTimeout(() => valueElement.classList.remove('updating'), 300);
            }
        });
        
        // Mouse events for visual feedback
        this.addEventDelegate('.slider-input', 'mousedown', () => {
            this.setState({ isDragging: true });
        });
        
        this.addEventDelegate('.slider-input', 'mouseup', () => {
            this.setState({ isDragging: false });
        });
        
        // Keyboard support
        this.addEventDelegate('.slider-input', 'keydown', (event) => {
            const { min, max, step } = this.props;
            const currentValue = this.state.currentValue;
            let newValue = currentValue;
            
            switch (event.key) {
                case 'ArrowLeft':
                case 'ArrowDown':
                    newValue = Math.max(min, currentValue - step);
                    break;
                case 'ArrowRight':
                case 'ArrowUp':
                    newValue = Math.min(max, currentValue + step);
                    break;
                case 'Home':
                    newValue = min;
                    break;
                case 'End':
                    newValue = max;
                    break;
                case 'PageDown':
                    newValue = Math.max(min, currentValue - (step * 10));
                    break;
                case 'PageUp':
                    newValue = Math.min(max, currentValue + (step * 10));
                    break;
                default:
                    return; // Don't prevent default for other keys
            }
            
            if (newValue !== currentValue) {
                event.preventDefault();
                this.setValue(newValue);
                
                if (this.props.onChange) {
                    this.props.onChange(newValue);
                }
            }
        });
    }
    
    /**
     * Sets the slider value programmatically
     * 
     * @param {number} value - New value to set
     * @param {boolean} [triggerCallback=false] - Whether to trigger onChange
     */
    setValue(value, triggerCallback = false) {
        const clampedValue = Math.max(this.props.min, Math.min(this.props.max, value));
        
        if (clampedValue !== this.state.currentValue) {
            this.setState({ 
                currentValue: clampedValue,
                hasInteracted: true
            });
            
            if (triggerCallback && this.props.onChange) {
                this.props.onChange(clampedValue);
            }
        }
    }
    
    /**
     * Gets the current slider value
     * 
     * @returns {number} Current slider value
     */
    getValue() {
        return this.state.currentValue;
    }
    
    /**
     * Checks if user has interacted with the slider
     * 
     * @returns {boolean} True if user has moved the slider
     */
    hasBeenInteracted() {
        return this.state.hasInteracted;
    }
    
    /**
     * Enables/disables the slider
     * 
     * @param {boolean} enabled - Whether slider should be enabled
     */
    setEnabled(enabled) {
        const input = this.querySelector('.slider-input');
        if (input) {
            input.disabled = !enabled;
            
            const container = this.getContainer();
            if (container) {
                if (enabled) {
                    container.classList.remove('disabled');
                } else {
                    container.classList.add('disabled');
                }
            }
        }
    }
    
    /**
     * Updates slider properties
     * 
     * @param {Object} newProps - New properties to apply
     */
    updateProps(newProps) {
        this.props = Object.freeze({ ...this.props, ...newProps });
        
        // Clamp value if range changed
        if (newProps.min !== undefined || newProps.max !== undefined || newProps.value !== undefined) {
            const newValue = newProps.value !== undefined ? newProps.value : this.state.currentValue;
            const clampedValue = Math.max(this.props.min, Math.min(this.props.max, newValue));
            this.setState({ currentValue: clampedValue });
        }
        
        if (this.isMounted()) {
            this._rerender();
        }
    }
    
    /**
     * Formats value for display
     * 
     * @private
     * @param {number} value - Value to format
     * @returns {string} Formatted value string
     */
    _formatValue(value) {
        const { step, valueFormat } = this.props;
        
        // Determine decimal places based on step
        let decimalPlaces = 0;
        if (step < 1) {
            decimalPlaces = Math.max(0, -Math.floor(Math.log10(step)));
        }
        
        const formattedNumber = value.toFixed(decimalPlaces);
        return `${formattedNumber}${valueFormat}`;
    }
}

// Export for both ES6 modules and global usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ControlSlider;
} else {
    window.ControlSlider = ControlSlider;
}

/*
 * USAGE EXAMPLES:
 * 
 * 1. Basic Slider:
 * ===============
 * const slider = new ControlSlider({
 *   min: 0,
 *   max: 10,
 *   value: 5,
 *   label: 'Learning Rate'
 * });
 * slider.mount('#slider-container');
 * 
 * 2. Percentage Slider with Callbacks:
 * ===================================
 * const percentSlider = new ControlSlider({
 *   min: 0,
 *   max: 100,
 *   value: 75,
 *   step: 5,
 *   label: 'Confidence',
 *   valueFormat: '%',
 *   color: '#2dd573',
 *   onChange: (value) => console.log('Final value:', value),
 *   onInput: (value) => console.log('Live value:', value)
 * });
 * percentSlider.mount('#confidence-slider');
 * 
 * 3. Fine-tuned Decimal Slider:
 * ============================
 * const precisionSlider = new ControlSlider({
 *   min: 0,
 *   max: 1,
 *   value: 0.5,
 *   step: 0.01,
 *   label: 'Alpha Value',
 *   color: '#764ba2'
 * });
 * precisionSlider.mount('#alpha-slider');
 * 
 * 4. Programmatic Control:
 * =======================
 * const controlledSlider = new ControlSlider({
 *   min: -100,
 *   max: 100,
 *   value: 0,
 *   label: 'Bias Term'
 * });
 * controlledSlider.mount('#bias-slider');
 * 
 * // Set value programmatically
 * controlledSlider.setValue(25);
 * 
 * // Get current value
 * console.log('Current:', controlledSlider.getValue());
 * 
 * // Check if user has interacted
 * console.log('Interacted:', controlledSlider.hasBeenInteracted());
 * 
 * 5. Dynamic Property Updates:
 * ===========================
 * const dynamicSlider = new ControlSlider({
 *   min: 0,
 *   max: 10,
 *   value: 5
 * });
 * dynamicSlider.mount('#dynamic');
 * 
 * // Update properties
 * dynamicSlider.updateProps({ 
 *   max: 20, 
 *   label: 'Updated Range',
 *   color: '#ff6347' 
 * });
 */