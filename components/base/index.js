/**
 * MLTEACH Component System - Base Components Export
 * 
 * This module exports the core Component class and any other base
 * components or utilities for the component system.
 * 
 * @example
 * // ES6 Import
 * import { Component } from './components/base/index.js';
 * 
 * // CommonJS Import
 * const { Component } = require('./components/base/index.js');
 * 
 * // Script tag usage (Component available globally)
 * <script src="components/base/Component.js"></script>
 */

// Import the base Component class
import Component from './Component.js';

// Export for ES6 modules
export { Component };

// For CommonJS compatibility
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Component };
}

// Make available globally for script tag usage
if (typeof window !== 'undefined') {
    window.MLTeachComponents = {
        Component
    };
}