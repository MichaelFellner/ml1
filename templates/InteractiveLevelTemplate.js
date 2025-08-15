/**
 * Interactive Level Template
 * 
 * Extends BaseLevelTemplate to provide common interactive level patterns including:
 * - Slider controls for parameter adjustment
 * - Formula display with live updates
 * - Result feedback with success/error states
 * - Attempt validation and scoring
 * - Common event handling patterns
 * 
 * Perfect for levels where users adjust parameters to achieve target values.
 */

// Make InteractiveLevelTemplate available globally
window.InteractiveLevelTemplate = class InteractiveLevelTemplate extends BaseLevelTemplate {
    
    /**
     * Creates a new interactive level instance
     * 
     * @param {Object} config - Level configuration (extends BaseLevelTemplate config)
     * @param {Object} config.targetFunction - Target function definition
     * @param {number} [config.targetFunction.w] - Target w parameter
     * @param {number} [config.targetFunction.b] - Target b parameter
     * @param {Function} [config.targetFunction.fn] - Custom target function
     * @param {Array<Object>} config.controls - Control definitions
     * @param {string} config.controls[].id - Control identifier ('w', 'b', etc.)
     * @param {string} config.controls[].label - Display label
     * @param {number} config.controls[].min - Minimum value
     * @param {number} config.controls[].max - Maximum value
     * @param {number} config.controls[].step - Step size
     * @param {number} config.controls[].default - Default value
     * @param {Object} [config.validation] - Validation settings
     * @param {number} [config.validation.tolerance=0.05] - Tolerance for success (5%)
     * @param {Function} [config.validation.customValidator] - Custom validation function
     * @param {Array<Object>} [config.testCases] - Test cases for validation
     * @param {boolean} [config.showFormula=true] - Show formula display
     * @param {boolean} [config.showResult=true] - Show result feedback
     * @param {string} [config.formulaVariable='y'] - Variable name for formula display
     */
    constructor(config) {
        // Validate interactive-specific config
        if (!config.controls || !Array.isArray(config.controls)) {
            throw new Error('Interactive level must define controls array');
        }
        
        if (!config.targetFunction) {
            throw new Error('Interactive level must define targetFunction');
        }
        
        // Set defaults
        const interactiveConfig = {
            validation: {
                tolerance: 0.05,
                ...config.validation
            },
            testCases: config.testCases || [],
            showFormula: config.showFormula !== false,
            showResult: config.showResult !== false,
            formulaVariable: config.formulaVariable || 'y',
            ...config
        };
        
        super(interactiveConfig);
        
        // Interactive-specific state
        this.currentResults = {};
        this.lastValidation = null;
        this.isValidating = false;
        
        // Set default parameters from controls
        this.config.controls.forEach(control => {
            if (this.config.parameters[control.id] === undefined) {
                this.config.parameters[control.id] = control.default;
            }
        });
        
        this.log('Interactive level template created');
    }
    
    /**
     * Sets up interactive level-specific logic
     */
    async setup() {
        await super.setup();
        
        this.log('Setting up interactive level');
        
        // Set up control event listeners
        this._setupControlListeners();
        
        // Set up action buttons
        this._setupActionButtons();
        
        // Initialize display
        this._updateFormulaDisplay();
        this._updateResultDisplay();
        
        this.log('Interactive level setup complete');
    }
    
    /**
     * Validates the current parameter values
     * 
     * @param {Object} [testParameters] - Parameters to test (defaults to current)
     * @returns {Object} Validation result with success, accuracy, and feedback
     */
    validateParameters(testParameters = null) {
        if (this.isValidating) {
            return this.lastValidation;
        }
        
        this.isValidating = true;
        
        try {
            const params = testParameters || this.getParameters();
            
            // Use custom validator if provided
            if (this.config.validation.customValidator) {
                const result = this.config.validation.customValidator(params, this.config.targetFunction);
                this.lastValidation = result;
                return result;
            }
            
            // Default validation logic
            const result = this._performDefaultValidation(params);
            this.lastValidation = result;
            
            this.log('Parameters validated', result);
            return result;
            
        } finally {
            this.isValidating = false;
        }
    }
    
    /**
     * Attempts to solve with current parameters
     * 
     * This method is called when the user clicks "Try" or similar button.
     * It validates parameters and provides feedback.
     * 
     * @returns {Object} Attempt result
     */
    attemptSolution() {
        this.trackAction('solution_attempt', { parameters: this.getParameters() });
        
        const validation = this.validateParameters();
        
        this.log('Solution attempted', validation);
        
        // Update result display
        this._showValidationResult(validation);
        
        // Check for level completion
        if (validation.success) {
            this._handleSuccessfulSolution(validation);
        }
        
        return validation;
    }
    
    /**
     * Updates a specific control parameter
     * 
     * @param {string} controlId - ID of the control to update
     * @param {number} value - New value
     * @param {boolean} [validate=false] - Whether to validate immediately
     */
    updateControl(controlId, value, validate = false) {
        const control = this.config.controls.find(c => c.id === controlId);
        if (!control) {
            throw new Error(`Unknown control: ${controlId}`);
        }
        
        // Clamp value to control bounds
        const clampedValue = Math.max(control.min, Math.min(control.max, value));
        
        // Update parameters
        this.updateParameters({ [controlId]: clampedValue });
        
        // Update UI
        this._updateControlDisplay(controlId, clampedValue);
        this._updateFormulaDisplay();
        
        // Validate if requested
        if (validate) {
            this.validateParameters();
        }
        
        this.log(`Control updated: ${controlId} = ${clampedValue}`);
    }
    
    /**
     * Resets all controls to their default values
     */
    resetControls() {
        const defaultParams = {};
        
        this.config.controls.forEach(control => {
            defaultParams[control.id] = control.default;
            
            // Update slider in UI
            const slider = document.getElementById(`${control.id}-slider`);
            if (slider) {
                slider.value = control.default;
            }
        });
        
        this.updateParameters(defaultParams);
        this._updateFormulaDisplay();
        this._clearResultDisplay();
        
        this.trackAction('controls_reset');
        this.log('Controls reset to defaults');
    }
    
    /**
     * Shows a hint to help the user
     * 
     * @param {string} [hintText] - Custom hint text
     */
    showHint(hintText = null) {
        let hint = hintText;
        
        if (!hint) {
            // Generate hint based on current state
            const validation = this.validateParameters();
            hint = this._generateHint(validation);
        }
        
        this.showSuccess(hint, 5000);
        this.trackAction('hint_requested');
        
        this.log('Hint shown', hint);
    }
    
    // Protected methods for customization
    
    /**
     * Generates the main content HTML - includes all interactive elements
     * @protected
     */
    _generateMainContent() {
        return `
            <div class="interactive-level-content" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 1000px; margin: 0 auto;">
                ${this._generateVisualizationSection()}
                ${this._generateControlsSection()}
            </div>
        `;
    }
    
    /**
     * Generates the visualization section (left side)
     * Override this for custom visualization
     * @protected
     */
    _generateVisualizationSection() {
        return `
            <div class="visualization-section" style="background: rgba(255,255,255,0.9); border-radius: 15px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <h3 style="margin: 0 0 15px 0; color: #333; text-align: center;">Visualization</h3>
                
                ${this._generateVisualizationContent()}
                
                ${this.config.showResult ? `
                <div id="${this.config.id}-result" class="result-section" style="margin-top: 20px; display: none;">
                    <div id="${this.config.id}-result-message" class="result-message"></div>
                    <div id="${this.config.id}-result-details" class="result-details" style="margin-top: 10px; font-size: 0.9rem; color: #666;"></div>
                </div>
                ` : ''}
            </div>
        `;
    }
    
    /**
     * Generates the visualization content (override for custom visuals)
     * @protected
     */
    _generateVisualizationContent() {
        return `
            <div class="visualization-placeholder" style="height: 200px; background: linear-gradient(to bottom, #e3f2fd, #bbdefb); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #666;">
                <div style="text-align: center;">
                    <div style="font-size: 2rem; margin-bottom: 10px;">📊</div>
                    <div>Override _generateVisualizationContent() for custom visualization</div>
                </div>
            </div>
        `;
    }
    
    /**
     * Generates the controls section (right side)
     * @protected
     */
    _generateControlsSection() {
        return `
            <div class="controls-section" style="background: rgba(255,255,255,0.9); border-radius: 15px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <h3 style="margin: 0 0 15px 0; color: #333; text-align: center;">Controls</h3>
                
                ${this.config.showFormula ? this._generateFormulaDisplay() : ''}
                
                ${this._generateControlSliders()}
                
                ${this._generateActionButtons()}
            </div>
        `;
    }
    
    /**
     * Generates the formula display
     * @protected
     */
    _generateFormulaDisplay() {
        return `
            <div id="${this.config.id}-formula" class="formula-display" style="background: white; border: 2px solid #667eea; border-radius: 8px; padding: 15px; margin-bottom: 20px; text-align: center; font-family: 'Courier New', monospace;">
                <div id="${this.config.id}-formula-text" style="font-size: 1.2rem; color: #333;">
                    ${this._generateFormulaText()}
                </div>
                <div id="${this.config.id}-formula-target" style="font-size: 0.9rem; color: #666; margin-top: 8px;">
                    ${this._generateTargetText()}
                </div>
            </div>
        `;
    }
    
    /**
     * Generates the formula text
     * @protected
     */
    _generateFormulaText() {
        const params = this.getParameters();
        const parts = [];
        
        this.config.controls.forEach(control => {
            const value = params[control.id] || control.default;
            const displayValue = typeof value === 'number' ? value.toFixed(2) : value;
            parts.push(`<span style="color: #667eea; font-weight: bold;">${displayValue}</span>`);
        });
        
        if (this.config.controls.length === 1) {
            return `${this.config.formulaVariable} = ${parts[0]} × x`;
        } else if (this.config.controls.length === 2) {
            return `${this.config.formulaVariable} = ${parts[0]} × x + ${parts[1]}`;
        } else {
            return `${this.config.formulaVariable} = f(${parts.join(', ')})`;
        }
    }
    
    /**
     * Generates the target text
     * @protected
     */
    _generateTargetText() {
        const target = this.config.targetFunction;
        
        if (target.w !== undefined && target.b !== undefined) {
            return `Target: ${this.config.formulaVariable} = ${target.w} × x + ${target.b}`;
        } else if (target.w !== undefined) {
            return `Target: ${this.config.formulaVariable} = ${target.w} × x`;
        } else {
            return 'Find the correct parameters!';
        }
    }
    
    /**
     * Generates control sliders
     * @protected
     */
    _generateControlSliders() {
        return this.config.controls.map(control => `
            <div class="control-slider" style="margin-bottom: 25px;">
                <label style="display: block; margin-bottom: 8px; color: #333; font-weight: bold;">
                    ${control.label}: <span id="${control.id}-value" style="color: #667eea;">${control.default}</span>
                </label>
                <input 
                    type="range" 
                    id="${control.id}-slider" 
                    min="${control.min}" 
                    max="${control.max}" 
                    value="${control.default}" 
                    step="${control.step}"
                    style="width: 100%; height: 8px; border-radius: 4px; background: #ddd; outline: none;"
                >
                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #999; margin-top: 5px;">
                    <span>${control.min}</span>
                    <span>${((control.max - control.min) / 2 + control.min).toFixed(1)}</span>
                    <span>${control.max}</span>
                </div>
            </div>
        `).join('');
    }
    
    /**
     * Generates action buttons
     * @protected
     */
    _generateActionButtons() {
        return `
            <div class="action-buttons" style="margin-top: 20px;">
                <button 
                    id="${this.config.id}-try-btn" 
                    class="try-button"
                    style="width: 100%; padding: 12px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 8px; font-size: 1.1rem; font-weight: bold; cursor: pointer; transition: all 0.3s; margin-bottom: 10px;"
                >
                    🎯 Try Solution
                </button>
                
                <div style="display: flex; gap: 10px;">
                    <button 
                        id="${this.config.id}-reset-btn" 
                        class="reset-button"
                        style="flex: 1; padding: 10px; background: #6c757d; color: white; border: none; border-radius: 8px; font-size: 0.9rem; cursor: pointer; transition: all 0.3s;"
                    >
                        🔄 Reset
                    </button>
                    
                    <button 
                        id="${this.config.id}-hint-btn" 
                        class="hint-button"
                        style="flex: 1; padding: 10px; background: #ffc107; color: #333; border: none; border-radius: 8px; font-size: 0.9rem; cursor: pointer; transition: all 0.3s;"
                    >
                        💡 Hint
                    </button>
                </div>
            </div>
        `;
    }
    
    // Private methods
    
    /**
     * Sets up control event listeners
     * @private
     */
    _setupControlListeners() {
        this.config.controls.forEach(control => {
            const slider = document.getElementById(`${control.id}-slider`);
            if (slider) {
                this.addEventListenerWithCleanup(slider, 'input', (e) => {
                    this.updateControl(control.id, parseFloat(e.target.value));
                });
            }
        });
    }
    
    /**
     * Sets up action button listeners
     * @private
     */
    _setupActionButtons() {
        // Try button
        const tryBtn = document.getElementById(`${this.config.id}-try-btn`);
        if (tryBtn) {
            this.addEventListenerWithCleanup(tryBtn, 'click', () => {
                this.attemptSolution();
            });
            
            // Add hover effects
            this.addEventListenerWithCleanup(tryBtn, 'mouseenter', () => {
                tryBtn.style.transform = 'translateY(-2px)';
                tryBtn.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            });
            this.addEventListenerWithCleanup(tryBtn, 'mouseleave', () => {
                tryBtn.style.transform = 'translateY(0)';
                tryBtn.style.boxShadow = 'none';
            });
        }
        
        // Reset button
        const resetBtn = document.getElementById(`${this.config.id}-reset-btn`);
        if (resetBtn) {
            this.addEventListenerWithCleanup(resetBtn, 'click', () => {
                this.resetControls();
            });
        }
        
        // Hint button
        const hintBtn = document.getElementById(`${this.config.id}-hint-btn`);
        if (hintBtn) {
            this.addEventListenerWithCleanup(hintBtn, 'click', () => {
                this.showHint();
            });
        }
    }
    
    /**
     * Performs default validation logic
     * @private
     */
    _performDefaultValidation(params) {
        const target = this.config.targetFunction;
        const tolerance = this.config.validation.tolerance;
        
        let totalError = 0;
        let errorCount = 0;
        
        // Check each parameter if target values are defined
        this.config.controls.forEach(control => {
            const paramValue = params[control.id];
            const targetValue = target[control.id];
            
            if (targetValue !== undefined) {
                const error = Math.abs(paramValue - targetValue);
                const relativeError = Math.abs(error / targetValue);
                
                totalError += relativeError;
                errorCount++;
            }
        });
        
        // Calculate average relative error
        const avgRelativeError = errorCount > 0 ? totalError / errorCount : 0;
        const success = avgRelativeError <= tolerance;
        const accuracy = Math.max(0, 100 * (1 - avgRelativeError));
        
        return {
            success,
            accuracy: Math.round(accuracy),
            avgRelativeError,
            parameters: params,
            target: target,
            details: this._generateValidationDetails(params, target, avgRelativeError)
        };
    }
    
    /**
     * Generates detailed validation feedback
     * @private
     */
    _generateValidationDetails(params, target, avgError) {
        const details = [];
        
        this.config.controls.forEach(control => {
            const paramValue = params[control.id];
            const targetValue = target[control.id];
            
            if (targetValue !== undefined) {
                const error = Math.abs(paramValue - targetValue);
                const status = error <= targetValue * this.config.validation.tolerance ? '✅' : '❌';
                details.push(`${control.label}: ${paramValue.toFixed(2)} (target: ${targetValue}) ${status}`);
            }
        });
        
        return details;
    }
    
    /**
     * Updates the formula display
     * @private
     */
    _updateFormulaDisplay() {
        const formulaText = document.getElementById(`${this.config.id}-formula-text`);
        if (formulaText) {
            formulaText.innerHTML = this._generateFormulaText();
        }
    }
    
    /**
     * Updates a specific control display
     * @private
     */
    _updateControlDisplay(controlId, value) {
        const valueDisplay = document.getElementById(`${controlId}-value`);
        if (valueDisplay) {
            valueDisplay.textContent = typeof value === 'number' ? value.toFixed(2) : value;
        }
        
        const slider = document.getElementById(`${controlId}-slider`);
        if (slider && parseFloat(slider.value) !== value) {
            slider.value = value;
        }
    }
    
    /**
     * Shows validation result in the UI
     * @private
     */
    _showValidationResult(validation) {
        const resultSection = document.getElementById(`${this.config.id}-result`);
        const messageDiv = document.getElementById(`${this.config.id}-result-message`);
        const detailsDiv = document.getElementById(`${this.config.id}-result-details`);
        
        if (!resultSection || !messageDiv) return;
        
        resultSection.style.display = 'block';
        
        if (validation.success) {
            resultSection.style.background = 'rgba(45,213,115,0.1)';
            resultSection.style.border = '2px solid rgba(45,213,115,0.3)';
            messageDiv.style.color = '#2dd573';
            messageDiv.textContent = `🎉 Excellent! Accuracy: ${validation.accuracy}%`;
        } else {
            resultSection.style.background = 'rgba(255,215,0,0.1)';
            resultSection.style.border = '2px solid rgba(255,215,0,0.3)';
            messageDiv.style.color = '#f3960a';
            messageDiv.textContent = `📊 Close! Accuracy: ${validation.accuracy}% - Keep trying!`;
        }
        
        if (detailsDiv && validation.details) {
            detailsDiv.innerHTML = validation.details.join('<br>');
        }
        
        // Add shake animation
        resultSection.style.animation = 'shake 0.3s';
        this.createTimeout(() => {
            resultSection.style.animation = '';
        }, 300);
    }
    
    /**
     * Handles successful solution
     * @private
     */
    _handleSuccessfulSolution(validation) {
        // Calculate score based on accuracy and attempts
        const baseScore = validation.accuracy;
        const attemptBonus = Math.max(0, 20 - (this.attempts - 1) * 2);
        const finalScore = Math.min(100, baseScore + attemptBonus);
        
        // Complete the level
        this.completeLevel({
            score: finalScore,
            solutions: validation.parameters
        });
        
        this.log('Level completed successfully', { score: finalScore, attempts: this.attempts });
    }
    
    /**
     * Updates the result display
     * @private
     */
    _updateResultDisplay() {
        // Override in subclass if needed
    }
    
    /**
     * Clears the result display
     * @private
     */
    _clearResultDisplay() {
        const resultSection = document.getElementById(`${this.config.id}-result`);
        if (resultSection) {
            resultSection.style.display = 'none';
        }
    }
    
    /**
     * Generates a helpful hint
     * @private
     */
    _generateHint(validation) {
        if (validation.success) {
            return "You've got it! Click 'Try Solution' to complete the level.";
        }
        
        const target = this.config.targetFunction;
        const params = this.getParameters();
        
        // Find the parameter that's furthest from target
        let maxError = 0;
        let hintControl = null;
        
        this.config.controls.forEach(control => {
            const paramValue = params[control.id];
            const targetValue = target[control.id];
            
            if (targetValue !== undefined) {
                const error = Math.abs(paramValue - targetValue);
                if (error > maxError) {
                    maxError = error;
                    hintControl = control;
                }
            }
        });
        
        if (hintControl) {
            const paramValue = params[hintControl.id];
            const targetValue = target[hintControl.id];
            
            if (paramValue < targetValue) {
                return `Try increasing ${hintControl.label} - you're too low!`;
            } else {
                return `Try decreasing ${hintControl.label} - you're too high!`;
            }
        }
        
        return "Adjust the parameters to match the target function. Look at the differences!";
    }
}

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InteractiveLevelTemplate;
}

/*
 * USAGE EXAMPLE:
 * 
 * class BalloonInflationLevel extends InteractiveLevelTemplate {
 *   constructor() {
 *     super({
 *       id: 'balloon-inflation',
 *       name: 'Balloon Inflation Challenge',
 *       type: 'interactive',
 *       description: 'Find the right amount of air for different sized balloons!',
 *       targetFunction: { w: 7, b: 0 },
 *       controls: [
 *         {
 *           id: 'w',
 *           label: 'Air Multiplier (w)',
 *           min: 0,
 *           max: 15,
 *           step: 0.5,
 *           default: 1.0
 *         }
 *       ],
 *       validation: {
 *         tolerance: 0.05
 *       },
 *       debug: true
 *     });
 *   }
 * 
 *   _generateVisualizationContent() {
 *     return `
 *       <div class="balloon-display">
 *         <div id="balloon-emoji" style="font-size: 80px;">🎈</div>
 *       </div>
 *     `;
 *   }
 * }
 * 
 * // Usage
 * const level = new BalloonInflationLevel();
 * level.create();
 */