/**
 * FormulaDisplay Component
 * 
 * A reusable component for displaying mathematical formulas with color-coded parameters:
 * - w parameter highlighted in blue (#667eea)
 * - b parameter highlighted in purple (#764ba2)
 * - x parameter in standard color
 * - Result value emphasized
 * 
 * Supports various formula formats:
 * - f(x) = w·x (linear without bias)
 * - f(x) = w·x + b (linear with bias)
 * - Custom variable names and formats
 * 
 * @example
 * const formula = new FormulaDisplay({
 *   w: 5,
 *   b: 10,
 *   x: 3,
 *   result: 25,
 *   variableName: 'y'
 * });
 * formula.mount('#formula-container');
 */

// Ensure Component class is available
if (typeof Component === 'undefined') {
    console.error('FormulaDisplay requires Component class. Include components/base/Component.js first.');
}

/**
 * Formula Display Component for mathematical expressions
 * 
 * @extends Component
 */
class FormulaDisplay extends Component {
    /**
     * Creates a new FormulaDisplay component
     * 
     * @param {Object} props - Component properties
     * @param {number} [props.w=1] - Weight/slope parameter (highlighted in blue)
     * @param {number} [props.b=null] - Bias parameter (highlighted in purple, null = don't show)
     * @param {string|number} [props.x='x'] - Input variable (can be name or value)
     * @param {number} [props.result=null] - Calculated result to display
     * @param {string} [props.variableName='f(x)'] - Left side of equation (e.g., 'y', 'output')
     * @param {string} [props.inputName='x'] - Input variable name
     * @param {string} [props.operation='×'] - Operation symbol (×, *, ·)
     * @param {boolean} [props.showResult=false] - Whether to show result calculation
     * @param {string} [props.resultLabel='Result'] - Label for result section
     * @param {string} [props.className=''] - Additional CSS classes
     * @param {Function} [props.onParameterClick] - Callback when parameter is clicked
     */
    constructor(props = {}) {
        super(props);
        
        const defaultProps = {
            w: 1,
            b: null,
            x: 'x',
            result: null,
            variableName: 'f(x)',
            inputName: 'x',
            operation: '×',
            showResult: false,
            resultLabel: 'Result',
            className: '',
            onParameterClick: null
        };
        
        this.props = Object.freeze({ ...defaultProps, ...props });
        
        // Calculate result if x is numeric and result not provided
        const calculatedResult = this._calculateResult();
        
        this.state = {
            displayW: this.props.w,
            displayB: this.props.b,
            displayResult: this.props.result !== null ? this.props.result : calculatedResult
        };
    }
    
    /**
     * Renders the formula display HTML
     * 
     * @returns {string} HTML string for the formula display
     */
    render() {
        const { 
            variableName, inputName, operation, showResult, 
            resultLabel, className, x 
        } = this.props;
        const { displayW, displayB, displayResult } = this.state;
        
        const hasB = displayB !== null && displayB !== undefined;
        const isXNumeric = typeof x === 'number';
        const showCalculatedResult = showResult && displayResult !== null;
        
        return `
            <div class="formula-display-container ${className}">
                <div class="formula-main">
                    <div class="formula-equation">
                        <span class="formula-output">${variableName}</span>
                        <span class="formula-equals"> = </span>
                        <span class="formula-parameter w-param" 
                              data-param="w" 
                              data-clickable="${this.props.onParameterClick ? 'true' : 'false'}">
                            ${this._formatNumber(displayW)}
                        </span>
                        <span class="formula-operation">${operation}</span>
                        <span class="formula-input">${isXNumeric ? this._formatNumber(x) : inputName}</span>
                        ${hasB ? `
                            <span class="formula-operator"> + </span>
                            <span class="formula-parameter b-param" 
                                  data-param="b"
                                  data-clickable="${this.props.onParameterClick ? 'true' : 'false'}">
                                ${this._formatNumber(displayB)}
                            </span>
                        ` : ''}
                    </div>
                    
                    ${showCalculatedResult ? `
                        <div class="formula-result">
                            <span class="result-label">${resultLabel}:</span>
                            <span class="result-value">${this._formatNumber(displayResult)}</span>
                        </div>
                    ` : ''}
                </div>
                
                <style>
                    .formula-display-container {
                        font-family: 'Courier New', Monaco, 'Lucida Console', monospace;
                        background: white;
                        border: 2px solid #667eea;
                        border-radius: 12px;
                        padding: 20px;
                        margin: 10px 0;
                        text-align: center;
                        box-shadow: 0 2px 8px rgba(102, 126, 234, 0.1);
                        transition: all 0.3s ease;
                    }
                    
                    .formula-display-container:hover {
                        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
                    }
                    
                    .formula-main {
                        display: flex;
                        flex-direction: column;
                        gap: 15px;
                    }
                    
                    .formula-equation {
                        font-size: 1.4rem;
                        line-height: 1.6;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-wrap: wrap;
                        gap: 0.2em;
                    }
                    
                    .formula-output {
                        color: #333;
                        font-weight: 600;
                        font-size: 1.1em;
                    }
                    
                    .formula-equals {
                        color: #666;
                        font-weight: 500;
                        margin: 0 0.2em;
                    }
                    
                    .formula-parameter {
                        font-weight: bold;
                        padding: 0.1em 0.3em;
                        border-radius: 6px;
                        transition: all 0.2s ease;
                    }
                    
                    .formula-parameter[data-clickable="true"] {
                        cursor: pointer;
                    }
                    
                    .formula-parameter[data-clickable="true"]:hover {
                        transform: scale(1.1);
                        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
                    }
                    
                    .w-param {
                        color: #667eea;
                        background: rgba(102, 126, 234, 0.1);
                        border: 1px solid rgba(102, 126, 234, 0.3);
                    }
                    
                    .w-param[data-clickable="true"]:hover {
                        background: rgba(102, 126, 234, 0.2);
                    }
                    
                    .b-param {
                        color: #764ba2;
                        background: rgba(118, 75, 162, 0.1);
                        border: 1px solid rgba(118, 75, 162, 0.3);
                    }
                    
                    .b-param[data-clickable="true"]:hover {
                        background: rgba(118, 75, 162, 0.2);
                    }
                    
                    .formula-operation {
                        color: #444;
                        font-weight: 500;
                        margin: 0 0.1em;
                    }
                    
                    .formula-input {
                        color: #333;
                        font-style: italic;
                        font-weight: 500;
                    }
                    
                    .formula-operator {
                        color: #666;
                        font-weight: 500;
                        margin: 0 0.2em;
                    }
                    
                    .formula-result {
                        padding: 12px 16px;
                        background: linear-gradient(135deg, #f8f9ff, #e8f2ff);
                        border: 1px solid rgba(102, 126, 234, 0.2);
                        border-radius: 8px;
                        font-size: 1.1rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 0.5em;
                    }
                    
                    .result-label {
                        color: #666;
                        font-weight: 500;
                    }
                    
                    .result-value {
                        color: #667eea;
                        font-weight: bold;
                        font-size: 1.2em;
                    }
                    
                    /* Responsive adjustments */
                    @media (max-width: 480px) {
                        .formula-display-container {
                            padding: 15px;
                        }
                        
                        .formula-equation {
                            font-size: 1.2rem;
                        }
                        
                        .formula-result {
                            flex-direction: column;
                            gap: 0.2em;
                        }
                    }
                    
                    /* Animation for parameter updates */
                    @keyframes parameterUpdate {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.15); }
                        100% { transform: scale(1); }
                    }
                    
                    .formula-parameter.updating {
                        animation: parameterUpdate 0.4s ease;
                    }
                </style>
            </div>
        `;
    }
    
    /**
     * Sets up event listeners for the formula display
     */
    attachEventListeners() {
        if (this.props.onParameterClick) {
            this.addEventDelegate('.formula-parameter[data-clickable="true"]', 'click', (event, target) => {
                const paramName = target.getAttribute('data-param');
                const currentValue = paramName === 'w' ? this.state.displayW : this.state.displayB;
                
                this.props.onParameterClick({
                    parameter: paramName,
                    value: currentValue,
                    component: this
                });
                
                // Add animation class
                target.classList.add('updating');
                setTimeout(() => target.classList.remove('updating'), 400);
            });
        }
    }
    
    /**
     * Updates formula parameters
     * 
     * @param {Object} params - Parameters to update
     * @param {number} [params.w] - New w value
     * @param {number} [params.b] - New b value
     * @param {number} [params.result] - New result value
     * @param {boolean} [animate=true] - Whether to animate the update
     */
    updateParameters(params, animate = true) {
        const newState = { ...this.state };
        let hasChanges = false;
        
        if (params.w !== undefined && params.w !== newState.displayW) {
            newState.displayW = params.w;
            hasChanges = true;
        }
        
        if (params.b !== undefined && params.b !== newState.displayB) {
            newState.displayB = params.b;
            hasChanges = true;
        }
        
        if (params.result !== undefined && params.result !== newState.displayResult) {
            newState.displayResult = params.result;
            hasChanges = true;
        } else if ((params.w !== undefined || params.b !== undefined) && this.props.result === null) {
            // Recalculate result if parameters changed and no explicit result provided
            const calculatedResult = this._calculateResult(newState.displayW, newState.displayB);
            if (calculatedResult !== null) {
                newState.displayResult = calculatedResult;
                hasChanges = true;
            }
        }
        
        if (hasChanges) {
            this.setState(newState);
            
            if (animate && this.isMounted()) {
                // Add animation to changed parameters
                setTimeout(() => {
                    if (params.w !== undefined) {
                        const wParam = this.querySelector('.w-param');
                        if (wParam) {
                            wParam.classList.add('updating');
                            setTimeout(() => wParam.classList.remove('updating'), 400);
                        }
                    }
                    if (params.b !== undefined) {
                        const bParam = this.querySelector('.b-param');
                        if (bParam) {
                            bParam.classList.add('updating');
                            setTimeout(() => bParam.classList.remove('updating'), 400);
                        }
                    }
                }, 50);
            }
        }
    }
    
    /**
     * Gets current parameter values
     * 
     * @returns {Object} Current parameters {w, b, result}
     */
    getParameters() {
        return {
            w: this.state.displayW,
            b: this.state.displayB,
            result: this.state.displayResult
        };
    }
    
    /**
     * Calculates result if x is numeric
     * 
     * @private
     * @param {number} [w] - Optional w override
     * @param {number} [b] - Optional b override
     * @returns {number|null} Calculated result or null
     */
    _calculateResult(w = this.state?.displayW || this.props.w, b = this.state?.displayB || this.props.b) {
        if (typeof this.props.x !== 'number') {
            return null;
        }
        
        const result = w * this.props.x + (b || 0);
        return Math.round(result * 100) / 100; // Round to 2 decimal places
    }
    
    /**
     * Formats number for display
     * 
     * @private
     * @param {number} num - Number to format
     * @returns {string} Formatted number string
     */
    _formatNumber(num) {
        if (num === null || num === undefined) {
            return '0';
        }
        
        // Round to reasonable precision
        if (Math.abs(num) < 0.01 && num !== 0) {
            return num.toExponential(2);
        }
        
        if (Math.abs(num) >= 1000) {
            return num.toLocaleString();
        }
        
        // Round to 2 decimal places if needed
        return Math.round(num * 100) / 100;
    }
}

// Export for both ES6 modules and global usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FormulaDisplay;
} else {
    window.FormulaDisplay = FormulaDisplay;
}

/*
 * USAGE EXAMPLES:
 * 
 * 1. Simple Linear Formula:
 * ========================
 * const formula = new FormulaDisplay({
 *   w: 2.5,
 *   variableName: 'y'
 * });
 * formula.mount('#formula1');
 * 
 * 2. Formula with Bias:
 * ====================
 * const formula = new FormulaDisplay({
 *   w: 3,
 *   b: 10,
 *   showResult: true,
 *   x: 5,
 *   resultLabel: 'Predicted Value'
 * });
 * formula.mount('#formula2');
 * 
 * 3. Interactive Formula:
 * ======================
 * const formula = new FormulaDisplay({
 *   w: 1,
 *   b: 0,
 *   onParameterClick: (data) => {
 *     console.log(`Clicked ${data.parameter}: ${data.value}`);
 *     // Could open a parameter adjustment dialog
 *   }
 * });
 * formula.mount('#interactive-formula');
 * 
 * 4. Dynamic Updates:
 * ==================
 * const formula = new FormulaDisplay({ w: 1, b: 2, x: 3 });
 * formula.mount('#dynamic');
 * 
 * // Update parameters with animation
 * formula.updateParameters({ w: 4, b: 1 });
 * 
 * // Get current values
 * console.log(formula.getParameters());
 * 
 * 5. Custom Variable Names:
 * ========================
 * const formula = new FormulaDisplay({
 *   w: 0.8,
 *   b: 5,
 *   variableName: 'price',
 *   inputName: 'size',
 *   operation: '·'
 * });
 * formula.mount('#price-formula');
 */