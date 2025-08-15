/**
 * Common UI Patterns Utility Library
 * 
 * Consolidates frequently repeated UI patterns to reduce code duplication
 * and make AI-assisted development more efficient.
 */

(function(window) {
    'use strict';
    
    /**
     * UI Patterns namespace
     */
    const UIPatterns = {};
    
    // =========================================================================
    // SLIDER CONTROLS
    // =========================================================================
    
    /**
     * Creates a complete slider control with label and value display
     * @param {Object} config - Configuration object
     * @param {string} config.id - Unique identifier for the slider
     * @param {string} config.label - Label text
     * @param {number} config.min - Minimum value
     * @param {number} config.max - Maximum value
     * @param {number} config.value - Initial value
     * @param {number} config.step - Step increment
     * @param {string} config.color - Color for value display (default: #667eea)
     * @param {Function} config.onChange - Callback when value changes
     * @returns {string} HTML string for the slider control
     */
    UIPatterns.createSlider = function(config) {
        const {
            id,
            label,
            min = 0,
            max = 10,
            value = 5,
            step = 0.1,
            color = '#667eea',
            onChange
        } = config;
        
        // Register the onChange handler if provided
        if (onChange && typeof onChange === 'function') {
            // Store handler for later attachment
            if (!window._sliderHandlers) {
                window._sliderHandlers = {};
            }
            window._sliderHandlers[id] = onChange;
        }
        
        return `
            <div class="slider-control" style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px; color: #333; font-weight: bold;">
                    ${label}: <span id="${id}-value" style="color: ${color};">${value}</span>
                </label>
                <input type="range" id="${id}-slider" 
                       min="${min}" max="${max}" value="${value}" step="${step}"
                       style="width: 100%; height: 8px; border-radius: 4px; background: #ddd; outline: none;">
                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #999; margin-top: 5px;">
                    <span>${min}</span>
                    <span>${(min + max) / 2}</span>
                    <span>${max}</span>
                </div>
            </div>
        `;
    };
    
    /**
     * Attaches event handlers to sliders created with createSlider
     * Call this after the HTML has been inserted into the DOM
     * @param {string} sliderId - The slider ID to attach handlers to
     */
    UIPatterns.attachSliderHandlers = function(sliderId) {
        const slider = document.getElementById(`${sliderId}-slider`);
        const display = document.getElementById(`${sliderId}-value`);
        
        if (!slider || !display) {
            console.warn(`Slider elements not found for ID: ${sliderId}`);
            return;
        }
        
        // Update display when slider moves
        slider.addEventListener('input', function(e) {
            const value = parseFloat(e.target.value);
            display.textContent = value.toFixed(1);
            
            // Call custom handler if provided
            if (window._sliderHandlers && window._sliderHandlers[sliderId]) {
                window._sliderHandlers[sliderId](value);
            }
        });
    };
    
    // =========================================================================
    // RESULT DISPLAYS
    // =========================================================================
    
    /**
     * Updates a result display with success/error styling
     * @param {Object} results - Results to display
     * @param {boolean} results.success - Whether the result was successful
     * @param {string} results.message - Main message to display
     * @param {number} results.yourAnswer - User's answer
     * @param {number} results.correctAnswer - Correct answer
     * @param {number} results.loss - Loss/difference value
     * @param {string} containerId - ID of the result container element
     */
    UIPatterns.showResult = function(results, containerId = 'result-display') {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`Result container not found: ${containerId}`);
            return;
        }
        
        const { success, message, yourAnswer, correctAnswer, loss } = results;
        
        // Set styling based on success
        if (success) {
            container.style.background = 'rgba(45,213,115,0.1)';
            container.style.border = '2px solid rgba(45,213,115,0.3)';
        } else if (loss < 50) {
            container.style.background = 'rgba(255,215,0,0.1)';
            container.style.border = '2px solid rgba(255,215,0,0.3)';
        } else {
            container.style.background = 'rgba(255,99,71,0.1)';
            container.style.border = '2px solid rgba(255,99,71,0.3)';
        }
        
        // Update content
        const messageEl = container.querySelector('#result-message');
        if (messageEl) {
            messageEl.textContent = message;
            messageEl.style.color = success ? '#2dd573' : (loss < 50 ? '#f3960a' : '#ff6347');
        }
        
        // Update values
        const yourAnswerEl = container.querySelector('#your-answer');
        const correctAnswerEl = container.querySelector('#correct-answer');
        const lossEl = container.querySelector('#loss-value');
        
        if (yourAnswerEl) yourAnswerEl.textContent = yourAnswer.toFixed(1);
        if (correctAnswerEl) correctAnswerEl.textContent = correctAnswer.toFixed(1);
        if (lossEl) lossEl.textContent = loss.toFixed(1);
        
        // Show container
        container.style.display = 'block';
        
        // Add shake animation
        UIPatterns.shake(container);
    };
    
    // =========================================================================
    // LOSS BAR
    // =========================================================================
    
    /**
     * Updates a loss bar visualization
     * @param {number} loss - Current loss value
     * @param {number} maxLoss - Maximum possible loss
     * @param {string} barId - ID of the loss bar element (default: 'loss-bar')
     * @param {string} textId - ID of the loss text element (default: 'total-loss')
     */
    UIPatterns.updateLossBar = function(loss, maxLoss, barId = 'loss-bar', textId = 'total-loss') {
        const bar = document.getElementById(barId);
        const text = document.getElementById(textId);
        
        if (!bar) {
            console.warn(`Loss bar not found: ${barId}`);
            return;
        }
        
        // Calculate percentage
        const percent = Math.max(0, Math.min(100, (loss / maxLoss) * 100));
        bar.style.width = `${percent}%`;
        
        // Update color based on loss amount
        if (loss < maxLoss * 0.2) {
            bar.style.background = 'linear-gradient(90deg, #2dd573, #1cb85c)';
        } else if (loss < maxLoss * 0.6) {
            bar.style.background = 'linear-gradient(90deg, #ffa500, #ff8c00)';
        } else {
            bar.style.background = 'linear-gradient(90deg, #ff6347, #ff4500)';
        }
        
        // Update text
        if (text) {
            text.textContent = Math.round(loss);
        }
    };
    
    // =========================================================================
    // ANIMATIONS
    // =========================================================================
    
    /**
     * Adds hover effect to an element
     * @param {HTMLElement|string} element - Element or element ID
     */
    UIPatterns.addHoverEffect = function(element) {
        if (typeof element === 'string') {
            element = document.getElementById(element);
        }
        
        if (!element) {
            console.warn('Element not found for hover effect');
            return;
        }
        
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    };
    
    /**
     * Adds shake animation to an element
     * @param {HTMLElement|string} element - Element or element ID
     * @param {number} duration - Duration in milliseconds (default: 300)
     */
    UIPatterns.shake = function(element, duration = 300) {
        if (typeof element === 'string') {
            element = document.getElementById(element);
        }
        
        if (!element) {
            console.warn('Element not found for shake animation');
            return;
        }
        
        // Ensure shake animation CSS exists
        UIPatterns.ensureAnimationCSS();
        
        element.style.animation = `shake ${duration}ms`;
        setTimeout(() => {
            element.style.animation = '';
        }, duration);
    };
    
    /**
     * Ensures animation CSS is loaded
     */
    UIPatterns.ensureAnimationCSS = function() {
        if (!document.getElementById('ui-patterns-animations')) {
            const style = document.createElement('style');
            style.id = 'ui-patterns-animations';
            style.textContent = `
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideIn {
                    from { transform: translateY(-20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
    };
    
    // =========================================================================
    // FORMULA DISPLAY
    // =========================================================================
    
    /**
     * Creates a formula display box
     * @param {Object} config - Configuration
     * @param {number} config.w - Weight parameter
     * @param {number} config.b - Bias parameter (optional)
     * @param {string} config.id - ID prefix for elements
     * @returns {string} HTML string for formula display
     */
    UIPatterns.createFormulaDisplay = function(config) {
        const { w = 1, b, id = 'formula' } = config;
        
        let formulaHTML = `f(x) = <span id="${id}-w" style="color: #667eea; font-weight: bold;">${w}</span> × x`;
        
        if (b !== undefined) {
            formulaHTML += ` + <span id="${id}-b" style="color: #764ba2; font-weight: bold;">${b}</span>`;
        }
        
        return `
            <div style="background: white; border: 2px solid #667eea; border-radius: 8px; padding: 15px; margin-bottom: 20px; text-align: center; font-family: 'Courier New', monospace;">
                <div style="font-size: 1.2rem; color: #333;">
                    ${formulaHTML}
                </div>
                <div style="font-size: 0.9rem; color: #666; margin-top: 8px;">
                    <span id="${id}-result-label">Result:</span> 
                    <span id="${id}-result" style="font-weight: bold;">0</span>
                </div>
            </div>
        `;
    };
    
    /**
     * Updates formula display values
     * @param {Object} values - Values to update
     * @param {number} values.w - Weight value
     * @param {number} values.b - Bias value (optional)
     * @param {number} values.result - Result value
     * @param {string} idPrefix - ID prefix used when creating the display
     */
    UIPatterns.updateFormulaDisplay = function(values, idPrefix = 'formula') {
        const { w, b, result } = values;
        
        const wEl = document.getElementById(`${idPrefix}-w`);
        const bEl = document.getElementById(`${idPrefix}-b`);
        const resultEl = document.getElementById(`${idPrefix}-result`);
        
        if (wEl && w !== undefined) wEl.textContent = w.toFixed(2);
        if (bEl && b !== undefined) bEl.textContent = b.toFixed(2);
        if (resultEl && result !== undefined) resultEl.textContent = result.toFixed(2);
    };
    
    // =========================================================================
    // SUCCESS MESSAGES
    // =========================================================================
    
    /**
     * Shows a success message and optionally disables controls
     * @param {string} message - Success message to display
     * @param {Array<string>} disableIds - IDs of elements to disable
     */
    UIPatterns.showSuccess = function(message, disableIds = []) {
        // Try to find or create success message container
        let successEl = document.getElementById('success-message');
        
        if (!successEl) {
            // Create success element if it doesn't exist
            const container = document.querySelector('.level-content');
            if (container) {
                const successHTML = `
                    <div id="success-message" style="display: none; margin-top: 20px; padding: 15px; 
                         background: rgba(45,213,115,0.1); border-radius: 8px; 
                         border: 2px solid rgba(45,213,115,0.3); text-align: center;">
                        <div style="color: #2dd573; font-weight: bold; font-size: 1.1rem;">
                            ${message}
                        </div>
                    </div>
                `;
                container.insertAdjacentHTML('beforeend', successHTML);
                successEl = document.getElementById('success-message');
            }
        } else {
            // Update existing message
            successEl.querySelector('div').textContent = message;
        }
        
        if (successEl) {
            successEl.style.display = 'block';
            UIPatterns.ensureAnimationCSS();
            successEl.style.animation = 'slideIn 0.5s';
        }
        
        // Disable specified controls
        disableIds.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.disabled = true;
                element.style.opacity = '0.5';
                element.style.cursor = 'not-allowed';
            }
        });
    };
    
    // =========================================================================
    // UTILITY HELPERS
    // =========================================================================
    
    /**
     * Safely gets multiple elements by ID
     * @param {Array<string>} ids - Array of element IDs
     * @returns {Object} Object with ID as key and element as value
     */
    UIPatterns.getElements = function(ids) {
        const elements = {};
        ids.forEach(id => {
            elements[id] = document.getElementById(id);
            if (!elements[id]) {
                console.warn(`Element not found: ${id}`);
            }
        });
        return elements;
    };
    
    /**
     * Updates multiple element text contents
     * @param {Object} updates - Object with elementId: textContent pairs
     */
    UIPatterns.updateElements = function(updates) {
        Object.entries(updates).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        });
    };
    
    /**
     * Creates a styled container div
     * @param {string} title - Container title
     * @param {string} content - HTML content
     * @param {string} style - Additional CSS styles
     * @returns {string} HTML string
     */
    UIPatterns.createContainer = function(title, content, style = '') {
        return `
            <div style="background: rgba(255,255,255,0.9); border-radius: 15px; 
                 padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); ${style}">
                ${title ? `<h3 style="margin: 0 0 15px 0; color: #333; text-align: center;">${title}</h3>` : ''}
                ${content}
            </div>
        `;
    };
    
    // =========================================================================
    // INITIALIZATION
    // =========================================================================
    
    /**
     * Initializes UI patterns (call once on page load)
     */
    UIPatterns.init = function() {
        // Ensure animation CSS is loaded
        UIPatterns.ensureAnimationCSS();
        
        // Log initialization
        console.log('UIPatterns initialized');
    };
    
    // Export to global scope
    window.UIPatterns = UIPatterns;
    
    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', UIPatterns.init);
    } else {
        UIPatterns.init();
    }
    
})(window);
