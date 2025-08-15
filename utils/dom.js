/**
 * DOM Utility Functions
 * 
 * Collection of helper functions for DOM manipulation, element creation,
 * and common UI operations. Provides error checking and consistent behavior
 * across the MLTEACH application.
 * 
 * @fileoverview DOM manipulation utilities with error handling
 * @author MLTEACH Team
 * @version 1.0.0
 * 
 * Features:
 * - Safe element selection with error checking
 * - Element creation with attributes and children
 * - CSS class manipulation utilities
 * - CSS animation helpers
 * - Common DOM patterns abstracted
 */

/**
 * Safely gets an element by ID with error checking and logging
 * 
 * @param {string} id - The element ID to find
 * @param {boolean} [required=true] - Whether to log error if element not found
 * @returns {HTMLElement|null} The element if found, null otherwise
 * 
 * @example
 * // Get required element (logs error if not found)
 * const button = getElementById('my-button');
 * 
 * // Get optional element (no error logging)
 * const optional = getElementById('optional-element', false);
 * 
 * @description
 * This function provides safe element selection with consistent error handling.
 * When an element is not found and required=true, it logs a descriptive warning
 * to help with debugging. Returns null instead of throwing errors.
 */
export function getElementById(id, required = true) {
    if (typeof id !== 'string' || id.length === 0) {
        console.warn('getElementById: Invalid ID provided:', id);
        return null;
    }
    
    const element = document.getElementById(id);
    
    if (!element && required) {
        console.warn(`getElementById: Element with ID '${id}' not found. Check that the element exists in the DOM.`);
    }
    
    return element;
}

/**
 * Creates an HTML element with optional attributes and children
 * 
 * @param {string} tag - HTML tag name (e.g., 'div', 'button', 'span')
 * @param {Object} [attributes={}] - Object containing element attributes
 * @param {string|Node|Array<Node|string>} [children] - Child elements or text content
 * @returns {HTMLElement} The created element
 * 
 * @example
 * // Simple element
 * const div = createElement('div');
 * 
 * // Element with attributes
 * const button = createElement('button', {
 *   id: 'my-button',
 *   className: 'btn btn-primary',
 *   onclick: 'handleClick()'
 * });
 * 
 * // Element with text content
 * const span = createElement('span', { style: 'color: red' }, 'Error message');
 * 
 * // Element with child elements
 * const container = createElement('div', { className: 'container' }, [
 *   createElement('h2', {}, 'Title'),
 *   createElement('p', {}, 'Content')
 * ]);
 * 
 * @description
 * Creates elements programmatically with a clean API. Handles attribute setting
 * and child element/text insertion. Supports both single children and arrays
 * of children for complex element construction.
 */
export function createElement(tag, attributes = {}, children = null) {
    if (typeof tag !== 'string' || tag.length === 0) {
        throw new Error('createElement: tag must be a non-empty string');
    }
    
    const element = document.createElement(tag);
    
    // Set attributes
    if (attributes && typeof attributes === 'object') {
        setAttributes(element, attributes);
    }
    
    // Add children
    if (children !== null && children !== undefined) {
        appendChildren(element, children);
    }
    
    return element;
}

/**
 * Sets multiple attributes on an element
 * 
 * @param {HTMLElement} element - The target element
 * @param {Object} attributes - Object with attribute name/value pairs
 * @returns {HTMLElement} The element (for chaining)
 * 
 * @example
 * const button = document.createElement('button');
 * setAttributes(button, {
 *   id: 'submit-btn',
 *   className: 'btn btn-primary',
 *   disabled: true,
 *   'data-action': 'submit'
 * });
 * 
 * @description
 * Efficiently sets multiple attributes on an element. Handles special cases
 * like 'className' for CSS classes and boolean attributes. Provides a clean
 * API for bulk attribute assignment.
 */
export function setAttributes(element, attributes) {
    if (!element || typeof attributes !== 'object') {
        console.warn('setAttributes: Invalid element or attributes provided');
        return element;
    }
    
    for (const [name, value] of Object.entries(attributes)) {
        try {
            if (name === 'className' || name === 'class') {
                element.className = value;
            } else if (typeof value === 'boolean') {
                if (value) {
                    element.setAttribute(name, '');
                } else {
                    element.removeAttribute(name);
                }
            } else if (value !== null && value !== undefined) {
                element.setAttribute(name, String(value));
            }
        } catch (error) {
            console.warn(`setAttributes: Failed to set attribute '${name}':`, error);
        }
    }
    
    return element;
}

/**
 * Appends children to an element (helper for createElement)
 * 
 * @param {HTMLElement} parent - Parent element
 * @param {string|Node|Array<Node|string>} children - Children to append
 * @returns {void}
 * @private
 */
function appendChildren(parent, children) {
    if (Array.isArray(children)) {
        children.forEach(child => {
            if (typeof child === 'string') {
                parent.appendChild(document.createTextNode(child));
            } else if (child instanceof Node) {
                parent.appendChild(child);
            }
        });
    } else if (typeof children === 'string') {
        parent.appendChild(document.createTextNode(children));
    } else if (children instanceof Node) {
        parent.appendChild(children);
    }
}

/**
 * Adds CSS class to an element if not already present
 * 
 * @param {HTMLElement} element - Target element
 * @param {string} className - CSS class name to add
 * @returns {boolean} True if class was added, false if already present
 * 
 * @example
 * const button = getElementById('my-button');
 * addClass(button, 'active'); // Returns true if added
 * addClass(button, 'active'); // Returns false (already present)
 * 
 * @description
 * Safely adds CSS classes with duplicate checking. Returns boolean to
 * indicate whether the class was actually added or was already present.
 */
export function addClass(element, className) {
    if (!element || typeof className !== 'string' || className.length === 0) {
        console.warn('addClass: Invalid element or className provided');
        return false;
    }
    
    if (!element.classList.contains(className)) {
        element.classList.add(className);
        return true;
    }
    
    return false;
}

/**
 * Removes CSS class from an element if present
 * 
 * @param {HTMLElement} element - Target element
 * @param {string} className - CSS class name to remove
 * @returns {boolean} True if class was removed, false if not present
 * 
 * @example
 * const button = getElementById('my-button');
 * removeClass(button, 'active'); // Returns true if removed
 * removeClass(button, 'active'); // Returns false (not present)
 */
export function removeClass(element, className) {
    if (!element || typeof className !== 'string' || className.length === 0) {
        console.warn('removeClass: Invalid element or className provided');
        return false;
    }
    
    if (element.classList.contains(className)) {
        element.classList.remove(className);
        return true;
    }
    
    return false;
}

/**
 * Toggles CSS class on an element
 * 
 * @param {HTMLElement} element - Target element
 * @param {string} className - CSS class name to toggle
 * @param {boolean} [force] - Force add (true) or remove (false)
 * @returns {boolean} True if class is now present, false otherwise
 * 
 * @example
 * const menu = getElementById('mobile-menu');
 * toggleClass(menu, 'open'); // Toggles open class
 * toggleClass(menu, 'open', true); // Forces add
 * toggleClass(menu, 'open', false); // Forces remove
 */
export function toggleClass(element, className, force) {
    if (!element || typeof className !== 'string' || className.length === 0) {
        console.warn('toggleClass: Invalid element or className provided');
        return false;
    }
    
    return element.classList.toggle(className, force);
}

/**
 * Applies CSS animation to an element with optional completion callback
 * 
 * @param {HTMLElement} element - Target element
 * @param {string} animation - CSS animation class name
 * @param {number} [duration] - Animation duration in milliseconds
 * @param {Function} [callback] - Function to call when animation completes
 * @returns {Promise<void>} Promise that resolves when animation completes
 * 
 * @example
 * // Simple animation
 * await animateCSS(button, 'bounce');
 * 
 * // Animation with duration and callback
 * await animateCSS(element, 'fadeIn', 500, () => {
 *   console.log('Animation completed!');
 * });
 * 
 * // Chain animations
 * await animateCSS(box, 'slideIn');
 * await animateCSS(box, 'pulse');
 * 
 * @description
 * Provides a Promise-based interface for CSS animations. Automatically
 * removes animation classes after completion to prevent interference with
 * subsequent animations. Supports both duration-based and event-based
 * animation completion detection.
 */
export function animateCSS(element, animation, duration = null, callback = null) {
    if (!element || typeof animation !== 'string') {
        console.warn('animateCSS: Invalid element or animation provided');
        return Promise.resolve();
    }
    
    return new Promise((resolve) => {
        let completed = false;
        
        const cleanup = () => {
            if (completed) return;
            completed = true;
            
            removeClass(element, animation);
            element.removeEventListener('animationend', onAnimationEnd);
            
            if (callback && typeof callback === 'function') {
                try {
                    callback();
                } catch (error) {
                    console.warn('animateCSS: Callback error:', error);
                }
            }
            
            resolve();
        };
        
        const onAnimationEnd = (event) => {
            if (event.target === element) {
                cleanup();
            }
        };
        
        // Add animation class
        addClass(element, animation);
        
        // Listen for animation end event
        element.addEventListener('animationend', onAnimationEnd, { once: true });
        
        // Fallback timeout if duration is provided
        if (duration && typeof duration === 'number' && duration > 0) {
            setTimeout(cleanup, duration);
        } else {
            // Default fallback timeout (10 seconds)
            setTimeout(cleanup, 10000);
        }
    });
}

/**
 * Smoothly scrolls element into view with optional callback
 * 
 * @param {HTMLElement} element - Element to scroll into view
 * @param {Object} [options] - Scroll options
 * @param {string} [options.behavior='smooth'] - Scroll behavior
 * @param {string} [options.block='start'] - Vertical alignment
 * @param {string} [options.inline='nearest'] - Horizontal alignment
 * @param {Function} [callback] - Function to call after scrolling
 * @returns {void}
 * 
 * @example
 * // Simple smooth scroll
 * scrollIntoView(getElementById('target-section'));
 * 
 * // Scroll with options and callback
 * scrollIntoView(getElementById('form-error'), {
 *   behavior: 'smooth',
 *   block: 'center'
 * }, () => {
 *   console.log('Scrolled to error');
 * });
 */
export function scrollIntoView(element, options = {}, callback = null) {
    if (!element) {
        console.warn('scrollIntoView: Invalid element provided');
        return;
    }
    
    const defaultOptions = {
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
    };
    
    const scrollOptions = { ...defaultOptions, ...options };
    
    try {
        element.scrollIntoView(scrollOptions);
        
        if (callback && typeof callback === 'function') {
            // Estimate scroll duration and call callback
            const duration = scrollOptions.behavior === 'smooth' ? 500 : 0;
            setTimeout(callback, duration);
        }
    } catch (error) {
        console.warn('scrollIntoView: Error scrolling element:', error);
    }
}

/**
 * Creates a shake animation effect using CSS transforms
 * 
 * @param {HTMLElement} element - Element to shake
 * @param {number} [duration=300] - Shake duration in milliseconds
 * @param {number} [intensity=5] - Shake intensity in pixels
 * @returns {Promise<void>} Promise that resolves when shake completes
 * 
 * @example
 * // Shake an element to indicate error
 * await shake(getElementById('invalid-input'));
 * 
 * // Custom shake with more intensity
 * await shake(errorMessage, 500, 10);
 */
export function shake(element, duration = 300, intensity = 5) {
    if (!element) {
        console.warn('shake: Invalid element provided');
        return Promise.resolve();
    }
    
    return new Promise((resolve) => {
        const originalTransform = element.style.transform || '';
        let startTime = null;
        
        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            if (progress < 1) {
                // Create shake effect with decreasing intensity
                const currentIntensity = intensity * (1 - progress);
                const offset = Math.sin(elapsed * 0.05) * currentIntensity;
                element.style.transform = `${originalTransform} translateX(${offset}px)`;
                requestAnimationFrame(animate);
            } else {
                // Restore original transform
                element.style.transform = originalTransform;
                resolve();
            }
        };
        
        requestAnimationFrame(animate);
    });
}

/**
 * Creates a fade transition effect
 * 
 * @param {HTMLElement} element - Element to fade
 * @param {'in'|'out'|'toggle'} direction - Fade direction
 * @param {number} [duration=300] - Fade duration in milliseconds
 * @returns {Promise<void>} Promise that resolves when fade completes
 * 
 * @example
 * // Fade element in
 * await fade(element, 'in');
 * 
 * // Fade element out
 * await fade(element, 'out', 500);
 * 
 * // Toggle fade based on current visibility
 * await fade(element, 'toggle');
 */
export function fade(element, direction, duration = 300) {
    if (!element) {
        console.warn('fade: Invalid element provided');
        return Promise.resolve();
    }
    
    return new Promise((resolve) => {
        const currentOpacity = parseFloat(window.getComputedStyle(element).opacity);
        let targetOpacity;
        
        switch (direction) {
            case 'in':
                targetOpacity = 1;
                break;
            case 'out':
                targetOpacity = 0;
                break;
            case 'toggle':
                targetOpacity = currentOpacity > 0.5 ? 0 : 1;
                break;
            default:
                console.warn('fade: Invalid direction. Use "in", "out", or "toggle"');
                resolve();
                return;
        }
        
        if (currentOpacity === targetOpacity) {
            resolve();
            return;
        }
        
        const startOpacity = currentOpacity;
        const opacityChange = targetOpacity - startOpacity;
        let startTime = null;
        
        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentValue = startOpacity + (opacityChange * progress);
            element.style.opacity = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                if (targetOpacity === 0) {
                    element.style.display = 'none';
                } else if (element.style.display === 'none') {
                    element.style.display = '';
                }
                resolve();
            }
        };
        
        // Show element if fading in from hidden state
        if (targetOpacity > 0 && element.style.display === 'none') {
            element.style.display = '';
        }
        
        requestAnimationFrame(animate);
    });
}

/**
 * Shows element with optional fade-in effect
 * 
 * @param {HTMLElement} element - Element to show
 * @param {boolean} [animate=false] - Whether to use fade-in animation
 * @param {number} [duration=300] - Animation duration if animated
 * @returns {Promise<void>} Promise that resolves when showing completes
 * 
 * @example
 * // Show element immediately
 * show(getElementById('success-message'));
 * 
 * // Show with fade-in animation
 * await show(getElementById('modal'), true, 400);
 */
export function show(element, animate = false, duration = 300) {
    if (!element) {
        console.warn('show: Invalid element provided');
        return Promise.resolve();
    }
    
    if (animate) {
        element.style.opacity = '0';
        element.style.display = '';
        return fade(element, 'in', duration);
    } else {
        element.style.display = '';
        element.style.opacity = '';
        return Promise.resolve();
    }
}

/**
 * Hides element with optional fade-out effect
 * 
 * @param {HTMLElement} element - Element to hide
 * @param {boolean} [animate=false] - Whether to use fade-out animation
 * @param {number} [duration=300] - Animation duration if animated
 * @returns {Promise<void>} Promise that resolves when hiding completes
 * 
 * @example
 * // Hide element immediately
 * hide(getElementById('error-message'));
 * 
 * // Hide with fade-out animation
 * await hide(getElementById('modal'), true, 400);
 */
export function hide(element, animate = false, duration = 300) {
    if (!element) {
        console.warn('hide: Invalid element provided');
        return Promise.resolve();
    }
    
    if (animate) {
        return fade(element, 'out', duration);
    } else {
        element.style.display = 'none';
        return Promise.resolve();
    }
}

// Export all functions for module usage
export const DOM = {
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
};