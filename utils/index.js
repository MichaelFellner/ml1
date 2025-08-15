/**
 * MLTEACH Utilities - Main Index
 * 
 * Central export point for all utility functions organized by category.
 * Provides both individual function exports and grouped category exports
 * for flexible importing throughout the application.
 * 
 * @fileoverview Main utilities index with organized exports
 * @author MLTEACH Team
 * @version 1.0.0
 * 
 * Usage Examples:
 * 
 * // Import individual functions
 * import { getElementById, formatFormula, clamp } from './utils';
 * 
 * // Import by category
 * import { DOM, MATH, FORMAT, VALIDATION } from './utils';
 * 
 * // Import specific categories
 * import { DOM } from './utils/dom';
 * import { MATH } from './utils/math';
 * 
 * // Use in browser (global)
 * const element = MLTeachUtils.DOM.getElementById('my-element');
 * const formula = MLTeachUtils.FORMAT.formatFormula(2, 3);
 */

// Import all utility modules
import { 
    DOM,
    getElementById,
    createElement,
    setAttributes,
    addClass,
    removeClass,
    toggleClass,
    animateCSS,
    scrollIntoView,
    shake,
    fade,
    show,
    hide
} from './dom.js';

import {
    MATH,
    lerp,
    clamp,
    roundTo,
    randomBetween,
    mapRange,
    percentageDifference,
    calculateAccuracy,
    distance,
    normalize,
    mean,
    standardDeviation,
    easeInOutCubic,
    gcd,
    isWithinTolerance
} from './math.js';

import {
    FORMAT,
    formatFormula,
    formatNumber,
    formatPercent,
    formatDuration,
    formatScore,
    formatList,
    truncateText,
    formatFileSize,
    capitalize,
    titleCase
} from './format.js';

import {
    VALIDATION,
    isInRange,
    validateNumber,
    sanitizeInput,
    validateEmail,
    validateURL,
    validateArray,
    createCompositeValidator,
    validateForm
} from './validation.js';

// Re-export individual functions for convenient importing
export {
    // DOM utilities
    getElementById,
    createElement,
    setAttributes,
    addClass,
    removeClass,
    toggleClass,
    animateCSS,
    scrollIntoView,
    shake,
    fade,
    show,
    hide,
    
    // Math utilities
    lerp,
    clamp,
    roundTo,
    randomBetween,
    mapRange,
    percentageDifference,
    calculateAccuracy,
    distance,
    normalize,
    mean,
    standardDeviation,
    easeInOutCubic,
    gcd,
    isWithinTolerance,
    
    // Format utilities
    formatFormula,
    formatNumber,
    formatPercent,
    formatDuration,
    formatScore,
    formatList,
    truncateText,
    formatFileSize,
    capitalize,
    titleCase,
    
    // Validation utilities
    isInRange,
    validateNumber,
    sanitizeInput,
    validateEmail,
    validateURL,
    validateArray,
    createCompositeValidator,
    validateForm
};

// Re-export grouped utilities
export { DOM, MATH, FORMAT, VALIDATION };

// Create a comprehensive utilities object for global use
export const MLTeachUtils = {
    DOM,
    MATH,
    FORMAT,
    VALIDATION,
    
    // Quick access to commonly used functions
    $: getElementById,
    create: createElement,
    show,
    hide,
    clamp,
    lerp,
    formatNumber,
    formatFormula,
    isInRange,
    validateNumber
};

/**
 * Common utility combinations and shortcuts
 */
export const Utils = {
    
    /**
     * DOM manipulation shortcuts
     */
    dom: {
        get: getElementById,
        make: createElement,
        attr: setAttributes,
        show,
        hide,
        shake,
        fade,
        ...DOM
    },
    
    /**
     * Mathematical operations shortcuts
     */
    math: {
        constrain: clamp,
        mix: lerp,
        round: roundTo,
        random: randomBetween,
        accuracy: calculateAccuracy,
        ...MATH
    },
    
    /**
     * Formatting shortcuts
     */
    format: {
        num: formatNumber,
        percent: formatPercent,
        formula: formatFormula,
        time: formatDuration,
        ...FORMAT
    },
    
    /**
     * Validation shortcuts
     */
    validate: {
        range: isInRange,
        number: validateNumber,
        clean: sanitizeInput,
        ...VALIDATION
    }
};

/**
 * Level-specific utility functions
 * Common patterns used specifically in interactive levels
 */
export const LevelUtils = {
    
    /**
     * Creates a parameter slider with validation and formatting
     * 
     * @param {string} containerId - Container element ID
     * @param {Object} config - Slider configuration
     * @returns {Object} Slider interface with getValue, setValue, onChange methods
     * 
     * @example
     * const wSlider = LevelUtils.createParameterSlider('w-container', {
     *   id: 'w',
     *   label: 'Weight Parameter',
     *   min: 0,
     *   max: 15,
     *   value: 1,
     *   step: 0.5,
     *   onChange: (value) => updateFormula(value)
     * });
     */
    createParameterSlider(containerId, config) {
        const container = getElementById(containerId);
        if (!container) {
            console.warn(`createParameterSlider: Container ${containerId} not found`);
            return null;
        }
        
        const {
            id,
            label,
            min = 0,
            max = 10,
            value = 0,
            step = 0.1,
            onChange = () => {},
            formatValue = (v) => formatNumber(v, 1)
        } = config;
        
        // Create slider HTML
        const sliderHTML = `
            <div class="parameter-slider" data-slider="${id}">
                <label style="display: block; margin-bottom: 8px; color: #333; font-weight: bold;">
                    ${label}: <span id="${id}-value" style="color: #667eea;">${formatValue(value)}</span>
                </label>
                <input 
                    type="range" 
                    id="${id}-slider" 
                    min="${min}" 
                    max="${max}" 
                    value="${value}" 
                    step="${step}"
                    style="width: 100%; height: 8px; border-radius: 4px; background: #ddd; outline: none;"
                >
                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #999; margin-top: 5px;">
                    <span>${min}</span>
                    <span>${formatValue((max + min) / 2)}</span>
                    <span>${max}</span>
                </div>
            </div>
        `;
        
        container.innerHTML = sliderHTML;
        
        const slider = getElementById(`${id}-slider`);
        const valueDisplay = getElementById(`${id}-value`);
        
        const updateValue = (newValue) => {
            const clampedValue = clamp(parseFloat(newValue), min, max);
            if (slider) slider.value = clampedValue;
            if (valueDisplay) valueDisplay.textContent = formatValue(clampedValue);
            return clampedValue;
        };
        
        if (slider) {
            slider.addEventListener('input', (e) => {
                const newValue = updateValue(e.target.value);
                onChange(newValue);
            });
        }
        
        return {
            getValue: () => parseFloat(slider?.value || value),
            setValue: updateValue,
            onChange: (callback) => { onChange = callback; },
            element: slider,
            container: container
        };
    },
    
    /**
     * Creates a formula display that updates with parameters
     * 
     * @param {string} containerId - Container element ID
     * @param {Object} config - Formula configuration
     * @returns {Object} Formula display interface
     * 
     * @example
     * const formula = LevelUtils.createFormulaDisplay('formula-container', {
     *   template: (w, b) => `y = ${w}x + ${b}`,
     *   target: 'y = 7x + 0'
     * });
     */
    createFormulaDisplay(containerId, config) {
        const container = getElementById(containerId);
        if (!container) {
            console.warn(`createFormulaDisplay: Container ${containerId} not found`);
            return null;
        }
        
        const {
            template = (w, b = 0) => formatFormula(w, b),
            target = '',
            showTarget = true,
            id = 'formula'
        } = config;
        
        const formulaHTML = `
            <div class="formula-display" style="background: white; border: 2px solid #667eea; border-radius: 8px; padding: 15px; text-align: center; font-family: 'Courier New', monospace;">
                <div id="${id}-text" style="font-size: 1.2rem; color: #333;">
                    <!-- Formula will be inserted here -->
                </div>
                ${showTarget && target ? `
                    <div id="${id}-target" style="font-size: 0.9rem; color: #666; margin-top: 8px;">
                        Target: ${target}
                    </div>
                ` : ''}
            </div>
        `;
        
        container.innerHTML = formulaHTML;\n        \n        const formulaText = getElementById(`${id}-text`);\n        \n        return {\n            update: (params) => {\n                if (!formulaText) return;\n                const formulaString = typeof template === 'function' ? template(params) : template;\n                formulaText.innerHTML = formulaString;\n            },\n            setTarget: (newTarget) => {\n                const targetElement = getElementById(`${id}-target`);\n                if (targetElement) {\n                    targetElement.textContent = `Target: ${newTarget}`;\n                }\n            },\n            element: formulaText,\n            container: container\n        };\n    },\n    \n    /**\n     * Creates a result display for showing validation feedback\n     * \n     * @param {string} containerId - Container element ID\n     * @param {Object} config - Result display configuration\n     * @returns {Object} Result display interface\n     * \n     * @example\n     * const result = LevelUtils.createResultDisplay('result-container');\n     * result.showSuccess('Perfect!', {score: 95, details: ['Great work!']});\n     */\n    createResultDisplay(containerId, config = {}) {\n        const container = getElementById(containerId);\n        if (!container) {\n            console.warn(`createResultDisplay: Container ${containerId} not found`);\n            return null;\n        }\n        \n        const { id = 'result' } = config;\n        \n        const resultHTML = `\n            <div id=\"${id}-display\" class=\"result-display\" style=\"display: none; padding: 15px; border-radius: 8px; margin-top: 15px; text-align: center;\">\n                <div id=\"${id}-message\" class=\"result-message\" style=\"font-size: 1rem; font-weight: bold; margin-bottom: 10px;\"></div>\n                <div id=\"${id}-details\" class=\"result-details\" style=\"font-size: 0.9rem; color: #666;\"></div>\n            </div>\n        `;\n        \n        container.innerHTML = resultHTML;\n        \n        const display = getElementById(`${id}-display`);\n        const message = getElementById(`${id}-message`);\n        const details = getElementById(`${id}-details`);\n        \n        const showResult = (type, text, options = {}) => {\n            if (!display || !message) return;\n            \n            const { score, details: detailsArray = [], duration = 0 } = options;\n            \n            display.style.display = 'block';\n            message.textContent = text;\n            \n            // Style based on type\n            switch (type) {\n                case 'success':\n                    display.style.background = 'rgba(45,213,115,0.1)';\n                    display.style.border = '2px solid rgba(45,213,115,0.3)';\n                    message.style.color = '#2dd573';\n                    break;\n                case 'error':\n                    display.style.background = 'rgba(255,99,71,0.1)';\n                    display.style.border = '2px solid rgba(255,99,71,0.3)';\n                    message.style.color = '#ff6347';\n                    break;\n                case 'warning':\n                    display.style.background = 'rgba(255,215,0,0.1)';\n                    display.style.border = '2px solid rgba(255,215,0,0.3)';\n                    message.style.color = '#f3960a';\n                    break;\n                default:\n                    display.style.background = 'rgba(102,126,234,0.1)';\n                    display.style.border = '2px solid rgba(102,126,234,0.3)';\n                    message.style.color = '#667eea';\n            }\n            \n            // Add details\n            if (details && detailsArray.length > 0) {\n                details.innerHTML = detailsArray.join('<br>');\n            } else if (details && score !== undefined) {\n                details.innerHTML = `Score: ${score}%`;\n            } else if (details) {\n                details.innerHTML = '';\n            }\n            \n            // Auto-hide if duration specified\n            if (duration > 0) {\n                setTimeout(() => {\n                    hide(display, true);\n                }, duration);\n            }\n            \n            // Add shake animation\n            shake(display, 300);\n        };\n        \n        return {\n            showSuccess: (text, options) => showResult('success', text, options),\n            showError: (text, options) => showResult('error', text, options),\n            showWarning: (text, options) => showResult('warning', text, options),\n            showInfo: (text, options) => showResult('info', text, options),\n            hide: () => hide(display, true),\n            element: display,\n            container: container\n        };\n    },\n    \n    /**\n     * Validates level parameters against targets\n     * \n     * @param {Object} current - Current parameters\n     * @param {Object} target - Target parameters\n     * @param {Object} config - Validation configuration\n     * @returns {Object} Validation result\n     * \n     * @example\n     * const result = LevelUtils.validateParameters(\n     *   {w: 6.8, b: 0.1},\n     *   {w: 7.0, b: 0.0},\n     *   {tolerance: 0.05}\n     * );\n     */\n    validateParameters(current, target, config = {}) {\n        const { tolerance = 0.05 } = config;\n        \n        let totalError = 0;\n        let errorCount = 0;\n        const details = [];\n        \n        for (const [param, targetValue] of Object.entries(target)) {\n            const currentValue = current[param];\n            \n            if (currentValue !== undefined && typeof targetValue === 'number') {\n                const accuracy = calculateAccuracy(currentValue, targetValue);\n                const error = Math.abs(currentValue - targetValue);\n                const relativeError = Math.abs(error / targetValue);\n                \n                totalError += relativeError;\n                errorCount++;\n                \n                const status = relativeError <= tolerance ? '✅' : '❌';\n                details.push(`${param}: ${formatNumber(currentValue)} (target: ${targetValue}) ${status}`);\n            }\n        }\n        \n        const avgRelativeError = errorCount > 0 ? totalError / errorCount : 0;\n        const success = avgRelativeError <= tolerance;\n        const accuracy = Math.max(0, 100 * (1 - avgRelativeError));\n        \n        return {\n            success,\n            accuracy: Math.round(accuracy),\n            avgRelativeError,\n            parameters: current,\n            target: target,\n            details: details\n        };\n    },\n    \n    /**\n     * Creates a scoring system for level completion\n     * \n     * @param {Object} config - Scoring configuration\n     * @returns {Function} Scoring function\n     * \n     * @example\n     * const scorer = LevelUtils.createScorer({\n     *   baseScore: 70,\n     *   attemptBonus: 20,\n     *   speedBonus: 10\n     * });\n     * \n     * const score = scorer({attempts: 2, timeSpent: 45000, success: true});\n     */\n    createScorer(config = {}) {\n        const {\n            baseScore = 70,\n            attemptBonus = 20,\n            speedBonus = 10,\n            maxAttempts = 10,\n            speedThresholds = [30, 60, 120] // seconds\n        } = config;\n        \n        return function calculateScore({ attempts = 1, timeSpent = 0, success = false, accuracy = 100 }) {\n            if (!success) return 0;\n            \n            const timeInSeconds = timeSpent / 1000;\n            \n            // Base score for completion\n            let score = baseScore;\n            \n            // Attempt bonus (decreasing with more attempts)\n            const attemptPenalty = Math.min(attempts - 1, maxAttempts - 1) / (maxAttempts - 1);\n            score += attemptBonus * (1 - attemptPenalty);\n            \n            // Speed bonus based on thresholds\n            let speedMultiplier = 0;\n            if (timeInSeconds < speedThresholds[0]) {\n                speedMultiplier = 1;\n            } else if (timeInSeconds < speedThresholds[1]) {\n                speedMultiplier = 0.5;\n            } else if (timeInSeconds < speedThresholds[2]) {\n                speedMultiplier = 0.2;\n            }\n            \n            score += speedBonus * speedMultiplier;\n            \n            // Accuracy modifier\n            score *= (accuracy / 100);\n            \n            return Math.min(100, Math.max(0, Math.round(score)));\n        };\n    }\n};\n\n/**\n * Animation helpers for common level animations\n */\nexport const AnimationUtils = {\n    \n    /**\n     * Animate a value change with easing\n     * \n     * @param {number} from - Starting value\n     * @param {number} to - Ending value\n     * @param {number} duration - Duration in milliseconds\n     * @param {Function} callback - Function called with current value\n     * @param {Function} [easing=easeInOutCubic] - Easing function\n     * @returns {Promise} Promise that resolves when animation completes\n     */\n    async animateValue(from, to, duration, callback, easing = easeInOutCubic) {\n        return new Promise((resolve) => {\n            const startTime = performance.now();\n            \n            const animate = (currentTime) => {\n                const elapsed = currentTime - startTime;\n                const progress = Math.min(elapsed / duration, 1);\n                \n                const easedProgress = easing(progress);\n                const currentValue = lerp(from, to, easedProgress);\n                \n                callback(currentValue);\n                \n                if (progress < 1) {\n                    requestAnimationFrame(animate);\n                } else {\n                    resolve();\n                }\n            };\n            \n            requestAnimationFrame(animate);\n        });\n    },\n    \n    /**\n     * Animate element scale with bounce effect\n     * \n     * @param {HTMLElement} element - Element to animate\n     * @param {number} targetScale - Target scale value\n     * @param {number} duration - Duration in milliseconds\n     * @returns {Promise} Promise that resolves when animation completes\n     */\n    async bounceScale(element, targetScale = 1.2, duration = 600) {\n        if (!element) return;\n        \n        const originalTransform = element.style.transform || '';\n        \n        await this.animateValue(1, targetScale, duration * 0.4, (scale) => {\n            element.style.transform = `${originalTransform} scale(${scale})`;\n        });\n        \n        await this.animateValue(targetScale, 1, duration * 0.6, (scale) => {\n            element.style.transform = `${originalTransform} scale(${scale})`;\n        });\n        \n        element.style.transform = originalTransform;\n    },\n    \n    /**\n     * Create a pulsing effect\n     * \n     * @param {HTMLElement} element - Element to pulse\n     * @param {Object} config - Pulse configuration\n     * @returns {Function} Function to stop pulsing\n     */\n    startPulse(element, config = {}) {\n        if (!element) return () => {};\n        \n        const {\n            minOpacity = 0.3,\n            maxOpacity = 1,\n            duration = 1000\n        } = config;\n        \n        let animationId;\n        let startTime;\n        \n        const pulse = (currentTime) => {\n            if (!startTime) startTime = currentTime;\n            \n            const elapsed = (currentTime - startTime) % duration;\n            const progress = elapsed / duration;\n            const opacity = lerp(minOpacity, maxOpacity, Math.sin(progress * Math.PI * 2) * 0.5 + 0.5);\n            \n            element.style.opacity = opacity;\n            animationId = requestAnimationFrame(pulse);\n        };\n        \n        animationId = requestAnimationFrame(pulse);\n        \n        return () => {\n            if (animationId) {\n                cancelAnimationFrame(animationId);\n                element.style.opacity = '';\n            }\n        };\n    }\n};\n\n// Make utilities available globally for browser usage\nif (typeof window !== 'undefined') {\n    window.MLTeachUtils = MLTeachUtils;\n    window.Utils = Utils;\n    window.LevelUtils = LevelUtils;\n    window.AnimationUtils = AnimationUtils;\n}\n\n// Default export for convenience\nexport default MLTeachUtils;