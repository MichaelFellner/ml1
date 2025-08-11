/**
 * @fileoverview Main initialization file for the MLTEACH application.
 * Handles application startup and initialization.
 */

/**
 * Initializes the application when DOM is ready
 * @function init
 * @description Sets up the game state, creates optimizer instances, and loads the introduction screen
 * @returns {void}
 */
function init() {
    console.log('Initializing...');
    
    // Check if all dependencies are loaded
    if (typeof gameState === 'undefined' || typeof OptimizationEngine === 'undefined') {
        setTimeout(init, 100);
        return;
    }
    
    // Initialize optimizers in game state
    gameState.optimizer = new OptimizationEngine(gameState.constants.LEARNING_RATE);
    gameState.featureOptimizer = new OptimizationEngine(gameState.constants.LEARNING_RATE);
    
    // Attempt to load saved state
    const stateLoaded = gameState.loadState();
    if (stateLoaded) {
        console.log('Previous game state restored');
    }
    
    // Start with introduction screen
    createIntroduction();
}

/**
 * Initialize application when DOM content is loaded
 */
document.addEventListener('DOMContentLoaded', init);