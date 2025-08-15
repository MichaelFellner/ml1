/**
 * Animation Service
 * 
 * Pure functions and utilities for smooth animations and visual feedback
 * in MLTEACH educational levels. Provides consistent animation patterns
 * across all levels without direct DOM dependencies.
 * 
 * This service provides:
 * - Value transition animations
 * - Element shake effects
 * - Fade in/out transitions
 * - Progress bar updates
 * - Color transitions
 * - Easing functions
 */

// Make AnimationService available globally
window.AnimationService = class AnimationService {
    
    /**
     * Animates a value change on an element with smooth transitions
     * 
     * Creates a smooth transition between two values, updating the element's
     * text content or style properties during the animation.
     * 
     * @param {HTMLElement} element - Element to animate
     * @param {number} fromValue - Starting value
     * @param {number} toValue - Target value
     * @param {number} [duration=500] - Animation duration in milliseconds
     * @param {Object} [options] - Animation options
     * @param {string} [options.property='textContent'] - Element property to update
     * @param {Function} [options.formatter=(v) => v.toFixed(2)] - Value formatting function
     * @param {string} [options.easing='easeOutQuart'] - Easing function name
     * @param {Function} [options.onUpdate] - Callback during animation
     * @param {Function} [options.onComplete] - Callback when animation completes
     * @returns {Promise<void>} Resolves when animation completes
     * @throws {Error} If element is invalid or values are not numbers
     * 
     * @example
     * // Animate text content from 0 to 100
     * await AnimationService.animateValueChange(element, 0, 100, 1000);
     * 
     * @example
     * // Animate CSS width with custom formatting
     * await AnimationService.animateValueChange(element, 0, 50, 800, {
     *   property: 'style.width',
     *   formatter: (v) => `${v}%`,
     *   easing: 'easeInOut'
     * });
     */
    static animateValueChange(element, fromValue, toValue, duration = 500, options = {}) {
        return new Promise((resolve, reject) => {
            // Input validation
            if (!element || !element.nodeType) {
                reject(new Error('Invalid element: must be a DOM element'));
                return;
            }
            
            if (typeof fromValue !== 'number' || typeof toValue !== 'number') {
                reject(new Error('Invalid values: fromValue and toValue must be numbers'));
                return;
            }
            
            if (typeof duration !== 'number' || duration <= 0) {
                reject(new Error('Invalid duration: must be a positive number'));
                return;
            }
            
            const {
                property = 'textContent',
                formatter = (v) => v.toFixed(2),
                easing = 'easeOutQuart',
                onUpdate = null,
                onComplete = null
            } = options;
            
            // Get easing function
            const easingFunc = this._getEasingFunction(easing);
            if (!easingFunc) {
                reject(new Error(`Invalid easing: ${easing} is not a supported easing function`));
                return;
            }
            
            const startTime = performance.now();
            const valueRange = toValue - fromValue;
            
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Apply easing
                const easedProgress = easingFunc(progress);
                const currentValue = fromValue + (valueRange * easedProgress);
                
                // Update element property
                try {
                    this._setElementProperty(element, property, formatter(currentValue));
                } catch (error) {
                    reject(new Error(`Failed to update element property: ${error.message}`));
                    return;
                }
                
                // Call update callback
                if (onUpdate) {
                    onUpdate(currentValue, progress);
                }
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    // Animation complete
                    if (onComplete) {
                        onComplete(toValue);
                    }
                    resolve();
                }
            };
            
            requestAnimationFrame(animate);
        });
    }
    
    /**
     * Creates a shake animation effect on an element
     * 
     * Applies a horizontal shake effect to provide visual feedback,
     * commonly used for errors or attention-getting effects.
     * 
     * @param {HTMLElement} element - Element to shake
     * @param {number} [intensity=5] - Shake distance in pixels
     * @param {number} [duration=300] - Animation duration in milliseconds
     * @param {number} [frequency=4] - Number of shake cycles
     * @returns {Promise<void>} Resolves when animation completes
     * @throws {Error} If element is invalid
     * 
     * @example
     * // Basic shake effect
     * await AnimationService.shakeElement(errorMessage);
     * 
     * @example
     * // Intense shake for critical errors
     * await AnimationService.shakeElement(element, 10, 500, 6);
     */
    static shakeElement(element, intensity = 5, duration = 300, frequency = 4) {
        return new Promise((resolve, reject) => {
            // Input validation
            if (!element || !element.nodeType) {
                reject(new Error('Invalid element: must be a DOM element'));
                return;
            }
            
            if (typeof intensity !== 'number' || intensity < 0) {
                reject(new Error('Invalid intensity: must be non-negative number'));
                return;
            }
            
            if (typeof duration !== 'number' || duration <= 0) {
                reject(new Error('Invalid duration: must be positive number'));
                return;
            }
            
            // Store original transform
            const originalTransform = element.style.transform || '';
            
            const startTime = performance.now();
            const cycleTime = duration / frequency;
            
            const shake = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = elapsed / duration;
                
                if (progress >= 1) {
                    // Restore original transform
                    element.style.transform = originalTransform;
                    resolve();
                    return;
                }
                
                // Calculate shake position
                const cycle = (elapsed % cycleTime) / cycleTime;
                const shakeProgress = Math.sin(cycle * Math.PI * 2);
                const currentIntensity = intensity * (1 - progress); // Fade out intensity
                const xOffset = shakeProgress * currentIntensity;
                
                // Apply transform
                const transform = originalTransform + ` translateX(${xOffset}px)`;
                element.style.transform = transform;
                
                requestAnimationFrame(shake);
            };
            
            requestAnimationFrame(shake);
        });
    }
    
    /**
     * Fades an element in or out with smooth opacity transition
     * 
     * Animates the opacity of an element for smooth show/hide effects.
     * Automatically handles display property for complete hiding.
     * 
     * @param {HTMLElement} element - Element to fade
     * @param {'in'|'out'} direction - Fade direction
     * @param {number} [duration=300] - Animation duration in milliseconds
     * @param {Object} [options] - Fade options
     * @param {string} [options.display='block'] - Display value when fading in
     * @param {Function} [options.onComplete] - Callback when fade completes
     * @returns {Promise<void>} Resolves when animation completes
     * @throws {Error} If element or direction is invalid
     * 
     * @example
     * // Fade in a hidden element
     * await AnimationService.fadeInOut(hiddenDiv, 'in', 500);
     * 
     * @example
     * // Fade out with callback
     * await AnimationService.fadeInOut(element, 'out', 400, {
     *   onComplete: () => console.log('Element hidden')
     * });
     */
    static fadeInOut(element, direction, duration = 300, options = {}) {
        return new Promise((resolve, reject) => {
            // Input validation
            if (!element || !element.nodeType) {
                reject(new Error('Invalid element: must be a DOM element'));
                return;
            }
            
            if (!['in', 'out'].includes(direction)) {
                reject(new Error('Invalid direction: must be "in" or "out"'));
                return;
            }
            
            if (typeof duration !== 'number' || duration <= 0) {
                reject(new Error('Invalid duration: must be positive number'));
                return;
            }
            
            const {
                display = 'block',
                onComplete = null
            } = options;
            
            const startOpacity = direction === 'in' ? 0 : 1;
            const targetOpacity = direction === 'in' ? 1 : 0;
            
            // Setup initial state
            if (direction === 'in') {
                element.style.display = display;
                element.style.opacity = '0';
            }
            
            // Animate opacity
            this.animateValueChange(element, startOpacity, targetOpacity, duration, {
                property: 'style.opacity',
                formatter: (v) => v.toString(),
                onComplete: () => {
                    if (direction === 'out') {
                        element.style.display = 'none';
                    }
                    if (onComplete) {
                        onComplete();
                    }
                }
            })
            .then(resolve)
            .catch(reject);
        });
    }
    
    /**
     * Updates a progress bar with smooth animation and color transitions
     * 
     * Animates a progress bar's width and optionally changes colors
     * based on the progress percentage.
     * 
     * @param {HTMLElement} element - Progress bar element
     * @param {number} percent - Target percentage (0-100)
     * @param {Object} [colorScheme] - Color scheme configuration
     * @param {string} [colorScheme.good='#2dd573'] - Color for high percentages
     * @param {string} [colorScheme.warning='#f3960a'] - Color for medium percentages
     * @param {string} [colorScheme.danger='#ff6347'] - Color for low percentages
     * @param {number} [colorScheme.goodThreshold=70] - Threshold for good color
     * @param {number} [colorScheme.warningThreshold=30] - Threshold for warning color
     * @param {number} [duration=500] - Animation duration in milliseconds
     * @returns {Promise<void>} Resolves when animation completes
     * @throws {Error} If element is invalid or percent is out of range
     * 
     * @example
     * // Basic progress bar update
     * await AnimationService.updateProgressBar(progressElement, 75);
     * 
     * @example
     * // Custom color scheme
     * await AnimationService.updateProgressBar(progressElement, 45, {
     *   good: '#4caf50',
     *   warning: '#ff9800',
     *   danger: '#f44336',
     *   goodThreshold: 80,
     *   warningThreshold: 40
     * }, 800);
     */
    static updateProgressBar(element, percent, colorScheme = {}, duration = 500) {
        return new Promise((resolve, reject) => {
            // Input validation
            if (!element || !element.nodeType) {
                reject(new Error('Invalid element: must be a DOM element'));
                return;
            }
            
            if (typeof percent !== 'number' || percent < 0 || percent > 100) {
                reject(new Error('Invalid percent: must be between 0 and 100'));
                return;
            }
            
            const {
                good = '#2dd573',
                warning = '#f3960a',
                danger = '#ff6347',
                goodThreshold = 70,
                warningThreshold = 30
            } = colorScheme;
            
            // Determine color based on percentage
            let targetColor;
            if (percent >= goodThreshold) {
                targetColor = good;
            } else if (percent >= warningThreshold) {
                targetColor = warning;
            } else {
                targetColor = danger;
            }
            
            // Get current width
            const currentWidth = parseFloat(element.style.width) || 0;
            
            // Animate width and color simultaneously
            Promise.all([
                // Animate width
                this.animateValueChange(element, currentWidth, percent, duration, {
                    property: 'style.width',
                    formatter: (v) => `${v}%`
                }),
                
                // Animate color if supported
                this._animateColor(element, targetColor, duration)
            ])
            .then(() => resolve())
            .catch(reject);
        });
    }
    
    /**
     * Creates a smooth color transition on an element
     * 
     * Animates background color or border color with smooth transitions.
     * 
     * @param {HTMLElement} element - Element to animate
     * @param {string} targetColor - Target color (hex, rgb, or named)
     * @param {number} [duration=300] - Animation duration in milliseconds
     * @param {string} [property='backgroundColor'] - CSS property to animate
     * @returns {Promise<void>} Resolves when animation completes
     * 
     * @example
     * // Animate background color
     * await AnimationService.colorTransition(element, '#ff6347', 500);
     * 
     * @example
     * // Animate border color
     * await AnimationService.colorTransition(element, 'red', 300, 'borderColor');
     */
    static colorTransition(element, targetColor, duration = 300, property = 'backgroundColor') {
        return new Promise((resolve, reject) => {
            if (!element || !element.nodeType) {
                reject(new Error('Invalid element: must be a DOM element'));
                return;
            }
            
            this._animateColor(element, targetColor, duration, property)
                .then(resolve)
                .catch(reject);
        });
    }
    
    /**
     * Creates a pulsing effect on an element
     * 
     * Animates the scale or opacity in a pulsing pattern to draw attention.
     * 
     * @param {HTMLElement} element - Element to pulse
     * @param {Object} [options] - Pulse options
     * @param {number} [options.scale=1.1] - Maximum scale factor
     * @param {number} [options.duration=800] - Duration of one pulse cycle
     * @param {number} [options.pulses=3] - Number of pulse cycles
     * @param {'scale'|'opacity'} [options.type='scale'] - Type of pulse effect
     * @returns {Promise<void>} Resolves when all pulses complete
     * 
     * @example
     * // Basic scale pulse
     * await AnimationService.pulseElement(button);
     * 
     * @example
     * // Opacity pulse effect
     * await AnimationService.pulseElement(notification, {
     *   type: 'opacity',
     *   duration: 600,
     *   pulses: 5
     * });
     */
    static pulseElement(element, options = {}) {
        return new Promise((resolve, reject) => {
            if (!element || !element.nodeType) {
                reject(new Error('Invalid element: must be a DOM element'));
                return;
            }
            
            const {
                scale = 1.1,
                duration = 800,
                pulses = 3,
                type = 'scale'
            } = options;
            
            const originalTransform = element.style.transform || '';
            const originalOpacity = element.style.opacity || '1';
            
            let currentPulse = 0;
            
            const doPulse = async () => {
                if (currentPulse >= pulses) {
                    // Restore original state
                    element.style.transform = originalTransform;
                    element.style.opacity = originalOpacity;
                    resolve();
                    return;
                }
                
                try {
                    if (type === 'scale') {
                        // Scale up
                        element.style.transform = `${originalTransform} scale(${scale})`;
                        await this._delay(duration / 2);
                        // Scale down
                        element.style.transform = originalTransform;
                        await this._delay(duration / 2);
                    } else if (type === 'opacity') {
                        // Fade out
                        await this.animateValueChange(element, 1, 0.3, duration / 2, {
                            property: 'style.opacity'
                        });
                        // Fade in
                        await this.animateValueChange(element, 0.3, 1, duration / 2, {
                            property: 'style.opacity'
                        });
                    }
                    
                    currentPulse++;
                    doPulse();
                } catch (error) {
                    reject(error);
                }
            };
            
            doPulse();
        });
    }
    
    /**
     * Helper function to set element property by path
     * @private
     */
    static _setElementProperty(element, propertyPath, value) {
        const parts = propertyPath.split('.');
        let obj = element;
        
        for (let i = 0; i < parts.length - 1; i++) {
            obj = obj[parts[i]];
            if (!obj) {
                throw new Error(`Property path '${propertyPath}' is invalid`);
            }
        }
        
        obj[parts[parts.length - 1]] = value;
    }
    
    /**
     * Gets easing function by name
     * @private
     */
    static _getEasingFunction(name) {
        const easingFunctions = {
            linear: t => t,
            easeIn: t => t * t,
            easeOut: t => t * (2 - t),
            easeInOut: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
            easeInQuart: t => t * t * t * t,
            easeOutQuart: t => 1 - (--t) * t * t * t,
            easeInOutQuart: t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
            easeInBack: t => t * t * (2.7 * t - 1.7),
            easeOutBack: t => 1 + (--t) * t * (2.7 * t + 1.7),
            easeInElastic: t => {
                const p = 0.3;
                return t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1 - p / 4) * (2 * Math.PI) / p);
            },
            easeOutElastic: t => {
                const p = 0.3;
                return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t - p / 4) * (2 * Math.PI) / p) + 1;
            }
        };
        
        return easingFunctions[name];
    }
    
    /**
     * Animates color transitions (simplified implementation)
     * @private
     */
    static _animateColor(element, targetColor, duration, property = 'backgroundColor') {
        return new Promise((resolve) => {
            // Simple color transition using CSS transition
            element.style.transition = `${property} ${duration}ms ease`;
            element.style[property] = targetColor;
            
            setTimeout(() => {
                element.style.transition = '';
                resolve();
            }, duration);
        });
    }
    
    /**
     * Simple delay utility
     * @private
     */
    static _delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    /**
     * Batch animate multiple elements
     * 
     * Animates multiple elements simultaneously with the same or different animations.
     * 
     * @param {Array<{element: HTMLElement, animation: string, ...options}>} animations - Array of animation configurations
     * @returns {Promise<void[]>} Resolves when all animations complete
     * 
     * @example
     * // Animate multiple elements
     * await AnimationService.batchAnimate([
     *   { element: div1, animation: 'fadeIn', duration: 300 },
     *   { element: div2, animation: 'shake', intensity: 8 },
     *   { element: progressBar, animation: 'updateProgress', percent: 80 }
     * ]);
     */
    static batchAnimate(animations) {
        const promises = animations.map(config => {
            const { element, animation, ...options } = config;
            
            switch (animation) {
                case 'fadeIn':
                    return this.fadeInOut(element, 'in', options.duration, options);
                case 'fadeOut':
                    return this.fadeInOut(element, 'out', options.duration, options);
                case 'shake':
                    return this.shakeElement(element, options.intensity, options.duration, options.frequency);
                case 'pulse':
                    return this.pulseElement(element, options);
                case 'updateProgress':
                    return this.updateProgressBar(element, options.percent, options.colorScheme, options.duration);
                case 'colorTransition':
                    return this.colorTransition(element, options.targetColor, options.duration, options.property);
                case 'valueChange':
                    return this.animateValueChange(element, options.fromValue, options.toValue, options.duration, options);
                default:
                    return Promise.reject(new Error(`Unknown animation type: ${animation}`));
            }
        });
        
        return Promise.all(promises);
    }
}

// Export for both ES6 modules and CommonJS
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationService;
} else if (typeof window !== 'undefined') {
    window.AnimationService = AnimationService;
}

/*
 * USAGE EXAMPLES:
 * 
 * 1. Value Animation:
 * ==================
 * // Animate score counter
 * await AnimationService.animateValueChange(
 *   scoreElement, 
 *   0, 
 *   95, 
 *   1000,
 *   {
 *     formatter: (v) => Math.round(v).toString(),
 *     onUpdate: (value) => console.log(`Score: ${Math.round(value)}`)
 *   }
 * );
 * 
 * 2. Error Feedback:
 * =================
 * // Shake input field on error
 * await AnimationService.shakeElement(inputField, 8, 400);
 * 
 * 3. Smooth Transitions:
 * =====================
 * // Fade in success message
 * await AnimationService.fadeInOut(successMessage, 'in', 500);
 * 
 * // Update progress with color coding
 * await AnimationService.updateProgressBar(progressBar, 85, {
 *   good: '#4caf50',
 *   warning: '#ff9800', 
 *   danger: '#f44336'
 * });
 * 
 * 4. Attention Effects:
 * ====================
 * // Pulse notification
 * await AnimationService.pulseElement(notification, {
 *   pulses: 3,
 *   duration: 600
 * });
 * 
 * 5. Batch Animations:
 * ===================
 * // Animate multiple elements at once
 * await AnimationService.batchAnimate([
 *   { element: title, animation: 'fadeIn', duration: 300 },
 *   { element: errorMsg, animation: 'shake', intensity: 5 },
 *   { element: progress, animation: 'updateProgress', percent: 100 }
 * ]);
 * 
 * 6. Integration with Level Validation:
 * ====================================
 * // Animate feedback based on validation result
 * const result = LevelValidationService.checkBalloonInflation(given, needed);
 * 
 * if (result.isCorrect) {
 *   await AnimationService.pulseElement(balloonElement, { type: 'scale' });
 *   await AnimationService.fadeInOut(successMessage, 'in');
 * } else {
 *   await AnimationService.shakeElement(inputElement);
 *   await AnimationService.colorTransition(inputElement, '#ff6347');
 * }
 * 
 * 7. Progress Bar with Loss Updates:
 * =================================
 * // Animate loss reduction progress
 * const metrics = LevelValidationService.calculatePerformanceMetrics(history);
 * await AnimationService.updateProgressBar(
 *   lossProgressBar, 
 *   metrics.finalAccuracy,
 *   {
 *     good: '#2dd573',
 *     warning: '#f3960a',
 *     danger: '#ff6347',
 *     goodThreshold: 80,
 *     warningThreshold: 50
 *   },
 *   1000
 * );
 */