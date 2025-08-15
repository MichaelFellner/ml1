/**
 * LossBar Component
 * 
 * A reusable progress bar component that automatically colors based on percentage:
 * - Red (high loss/bad performance): 70-100%
 * - Orange (medium loss): 30-70%
 * - Green (low loss/good performance): 0-30%
 * 
 * Features:
 * - Smooth animations on value changes
 * - Automatic gradient coloring based on performance
 * - Customizable labels and max values
 * - Responsive design
 * 
 * @example
 * const lossBar = new LossBar({
 *   value: 42,
 *   maxValue: 100,
 *   label: 'Total Loss',
 *   showValue: true
 * });
 * lossBar.mount('#loss-container');
 */

// Ensure Component class is available
if (typeof Component === 'undefined') {
    console.error('LossBar requires Component class. Include components/base/Component.js first.');
}

/**
 * Loss Bar Component for visualizing progress/loss values
 * 
 * @extends Component
 */
class LossBar extends Component {
    /**
     * Creates a new LossBar component
     * 
     * @param {Object} props - Component properties
     * @param {number} [props.value=0] - Current value (0 to maxValue)
     * @param {number} [props.maxValue=100] - Maximum value for the bar
     * @param {string} [props.label='Progress'] - Label to display above the bar
     * @param {boolean} [props.showValue=true] - Whether to show the numeric value
     * @param {string} [props.valueFormat=''] - Format string for value display (e.g., '%', '$')
     * @param {boolean} [props.animated=true] - Whether to animate value changes
     * @param {string} [props.className=''] - Additional CSS classes
     * @param {Function} [props.onClick] - Callback when bar is clicked
     */
    constructor(props = {}) {
        super(props);
        
        const defaultProps = {
            value: 0,
            maxValue: 100,
            label: 'Progress',
            showValue: true,
            valueFormat: '',
            animated: true,
            className: '',
            onClick: null
        };
        
        this.props = Object.freeze({ ...defaultProps, ...props });
        this.state = {
            displayValue: this.props.value,
            animationId: null
        };
    }
    
    /**
     * Renders the loss bar HTML
     * 
     * @returns {string} HTML string for the loss bar
     */
    render() {
        const { label, showValue, valueFormat, className } = this.props;
        const { displayValue } = this.state;
        
        const percentage = Math.max(0, Math.min(100, (displayValue / this.props.maxValue) * 100));
        const { backgroundColor, textColor } = this._getColorForPercentage(percentage);
        
        return `
            <div class="loss-bar-container ${className}">
                <div class="loss-bar-header">
                    <span class="loss-bar-label">${label}</span>
                    ${showValue ? `<span class="loss-bar-value">${displayValue}${valueFormat}</span>` : ''}
                </div>
                
                <div class="loss-bar-track" data-clickable="${this.props.onClick ? 'true' : 'false'}">
                    <div 
                        class="loss-bar-fill" 
                        style="width: ${percentage}%; background: ${backgroundColor}; transition: ${this.props.animated ? 'all 0.5s ease' : 'none'};"
                    ></div>
                    
                    <div class="loss-bar-text" style="color: ${textColor};">
                        ${showValue ? `${Math.round(displayValue)}${valueFormat}` : ''}
                    </div>
                </div>
                
                <div class="loss-bar-scale">
                    <span class="scale-min">0${valueFormat}</span>
                    <span class="scale-max">${this.props.maxValue}${valueFormat}</span>
                </div>
                
                <style>
                    .loss-bar-container {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                        margin: 10px 0;
                    }
                    
                    .loss-bar-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 8px;
                        font-size: 0.9rem;
                    }
                    
                    .loss-bar-label {
                        font-weight: 600;
                        color: #333;
                    }
                    
                    .loss-bar-value {
                        font-weight: bold;
                        color: #667eea;
                        font-size: 1rem;
                    }
                    
                    .loss-bar-track {
                        position: relative;
                        height: 30px;
                        background: #f0f0f0;
                        border-radius: 15px;
                        overflow: hidden;
                        border: 2px solid #e0e0e0;
                    }
                    
                    .loss-bar-track[data-clickable="true"] {
                        cursor: pointer;
                    }
                    
                    .loss-bar-track[data-clickable="true"]:hover {
                        border-color: #ccc;
                    }
                    
                    .loss-bar-fill {
                        position: absolute;
                        left: 0;
                        top: 0;
                        height: 100%;
                        min-width: 2px; /* Ensure visibility even at 0% */
                        border-radius: 13px;
                    }
                    
                    .loss-bar-text {
                        position: absolute;
                        width: 100%;
                        text-align: center;
                        line-height: 26px;
                        font-weight: bold;
                        font-size: 0.9rem;
                        text-shadow: 0 0 3px rgba(255,255,255,0.8);
                        pointer-events: none;
                    }
                    
                    .loss-bar-scale {
                        display: flex;
                        justify-content: space-between;
                        margin-top: 4px;
                        font-size: 0.75rem;
                        color: #666;
                    }
                    
                    .scale-min, .scale-max {
                        font-weight: 500;
                    }
                    
                    /* Animation for bar changes */
                    .loss-bar-fill {
                        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                    }
                    
                    /* Responsive adjustments */
                    @media (max-width: 480px) {
                        .loss-bar-header {
                            flex-direction: column;
                            gap: 4px;
                            align-items: flex-start;
                        }
                        
                        .loss-bar-track {
                            height: 25px;
                        }
                        
                        .loss-bar-text {
                            line-height: 21px;
                            font-size: 0.8rem;
                        }
                    }
                </style>
            </div>
        `;
    }
    
    /**
     * Sets up event listeners for the loss bar
     */
    attachEventListeners() {
        if (this.props.onClick) {
            this.addEventDelegate('.loss-bar-track', 'click', (event, target) => {
                const rect = target.getBoundingClientRect();
                const clickX = event.clientX - rect.left;
                const percentage = (clickX / rect.width) * 100;
                const clickValue = (percentage / 100) * this.props.maxValue;
                
                this.props.onClick({
                    value: Math.max(0, Math.min(this.props.maxValue, clickValue)),
                    percentage: Math.max(0, Math.min(100, percentage)),
                    component: this
                });
            });
        }
    }
    
    /**
     * Updates the bar value with optional animation
     * 
     * @param {number} newValue - New value to display
     * @param {boolean} [animate=true] - Whether to animate the change
     */
    setValue(newValue, animate = this.props.animated) {
        const clampedValue = Math.max(0, Math.min(this.props.maxValue, newValue));
        
        if (!animate) {
            this.setState({ displayValue: clampedValue });
            return;
        }
        
        // Cancel any existing animation
        if (this.state.animationId) {
            cancelAnimationFrame(this.state.animationId);
        }
        
        // Animate the value change
        const startValue = this.state.displayValue;
        const endValue = clampedValue;
        const duration = 500; // ms
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = startValue + (endValue - startValue) * easedProgress;
            
            this.setState({ 
                displayValue: currentValue,
                animationId: progress < 1 ? requestAnimationFrame(animate) : null
            });
            
            if (progress < 1) {
                this.state.animationId = requestAnimationFrame(animate);
            }
        };
        
        this.state.animationId = requestAnimationFrame(animate);
    }
    
    /**
     * Gets the current bar value
     * 
     * @returns {number} Current value
     */
    getValue() {
        return this.state.displayValue;
    }
    
    /**
     * Gets color scheme based on percentage (lower is better for loss)
     * 
     * @private
     * @param {number} percentage - Percentage value (0-100)
     * @returns {Object} Color scheme with backgroundColor and textColor
     */
    _getColorForPercentage(percentage) {
        let backgroundColor, textColor;
        
        if (percentage <= 30) {
            // Good performance (low loss) - Green gradient
            backgroundColor = 'linear-gradient(90deg, #2dd573, #1cb85c)';
            textColor = 'white';
        } else if (percentage <= 70) {
            // Medium performance - Orange gradient  
            backgroundColor = 'linear-gradient(90deg, #ffa500, #ff8c00)';
            textColor = 'white';
        } else {
            // Poor performance (high loss) - Red gradient
            backgroundColor = 'linear-gradient(90deg, #ff6347, #ff4500)';
            textColor = 'white';
        }
        
        return { backgroundColor, textColor };
    }
    
    /**
     * Updates bar properties and re-renders
     * 
     * @param {Object} newProps - New properties to apply
     */
    updateProps(newProps) {
        this.props = Object.freeze({ ...this.props, ...newProps });
        if (newProps.value !== undefined) {
            this.setValue(newProps.value);
        } else if (this.isMounted()) {
            this._rerender();
        }
    }
    
    /**
     * Cleanup method - cancels any running animations
     */
    unmount() {
        if (this.state.animationId) {
            cancelAnimationFrame(this.state.animationId);
        }
        super.unmount();
    }
}

// Export for both ES6 modules and global usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LossBar;
} else {
    window.LossBar = LossBar;
}

/*
 * USAGE EXAMPLES:
 * 
 * 1. Basic Loss Bar:
 * ==================
 * const lossBar = new LossBar({
 *   value: 75,
 *   maxValue: 100,
 *   label: 'Training Loss'
 * });
 * lossBar.mount('#loss-container');
 * 
 * 2. Customized Bar with Click Handler:
 * ====================================
 * const progressBar = new LossBar({
 *   value: 65,
 *   maxValue: 200,
 *   label: 'Score Progress',
 *   valueFormat: ' pts',
 *   onClick: (data) => {
 *     console.log('Clicked at value:', data.value);
 *   }
 * });
 * progressBar.mount('#score-bar');
 * 
 * 3. Animated Updates:
 * ===================
 * const lossBar = new LossBar({ value: 0, label: 'Current Loss' });
 * lossBar.mount('#container');
 * 
 * // Animate to new value
 * setTimeout(() => lossBar.setValue(80), 1000);
 * 
 * // Update without animation
 * setTimeout(() => lossBar.setValue(20, false), 2000);
 * 
 * 4. Dynamic Property Updates:
 * ===========================
 * const bar = new LossBar({ value: 50, label: 'Dynamic Bar' });
 * bar.mount('#dynamic');
 * 
 * bar.updateProps({ 
 *   maxValue: 200, 
 *   value: 120, 
 *   label: 'Updated Bar' 
 * });
 */