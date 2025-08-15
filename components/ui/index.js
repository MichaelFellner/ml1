/**
 * MLTEACH UI Components - Export Module
 * 
 * This module exports all UI components for easy importing
 * and provides a central location for component management.
 */

// Import all UI components
import LossBar from './LossBar.js';
import FormulaDisplay from './FormulaDisplay.js';
import ControlSlider from './ControlSlider.js';
import ResultMessage from './ResultMessage.js';
import NavigationButtons from './NavigationButtons.js';

// Export for ES6 modules
export {
    LossBar,
    FormulaDisplay,
    ControlSlider,
    ResultMessage,
    NavigationButtons
};

// For CommonJS compatibility
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        LossBar,
        FormulaDisplay,
        ControlSlider,
        ResultMessage,
        NavigationButtons
    };
}

// Make available globally for script tag usage
if (typeof window !== 'undefined') {
    window.MLTeachUI = {
        LossBar,
        FormulaDisplay,
        ControlSlider,
        ResultMessage,
        NavigationButtons
    };
}