/**
 * @fileoverview Centralized state management for the MLTEACH application.
 * This class consolidates all global state variables that were previously
 * scattered across multiple files.
 */

/**
 * GameState class manages all application state in a centralized manner
 * @class GameState
 */
class GameState {
    /**
     * Creates a new GameState instance with default values
     * @constructor
     */
    constructor() {
        // Navigation and level progression
        this.currentLevel = 0;
        this.currentNavigationId = 'intro';
        this.currentPageFunction = 'createIntroduction';
        
        // Game mechanics
        this.userMoney = 10;
        this.trueBoneSize = null;
        this.userFirstGuess = null;
        this.dogBonesPurchased = 0;
        
        // Machine learning parameters
        this.featureWeights = { A: 0.5, B: 0.3, C: 0.2 };
        this.featureData = [];
        this.currentLoss = 0;
        
        // Robot grid states (1000 robots)
        this.robotGridStates = new Array(1000).fill(false);
        
        // Optimizer instances
        this.optimizer = null;
        this.featureOptimizer = null;
        
        // UI state
        this.isAutoRunning = false;
        this.autoRunInterval = null;
        this.steps = 0;
        
        // Constants (could be moved to a separate constants file)
        this.constants = {
            OPTIMAL_ENERGY: 75,
            OPTIMAL_ENERGY_AI: 90,
            OPTIMAL_YELLOW: 60,
            OPTIMAL_BLUE: 40,
            LEARNING_RATE: 0.1,
            OPTIMAL_RED: 70,
            OPTIMAL_YELLOW_MULTI: 60,
            OPTIMAL_GREEN: 10,
            OPTIMAL_BLUE_MULTI: 40,
            OPTIMAL_PURPLE: 30,
            OPTIMAL_ORANGE: 90
        };
        
        // Level configuration
        this.levels = [
            {
                title: "Energy Control",
                goal: "Minimize the loss by tuning the robot to its optimal energy level."
            },
            {
                title: "Gradient Descent 1", 
                goal: "Keep pressing the gradient descent button to automatically find the optimal energy level!",
            },
            {
                title: "Two Loss Terms",
                goal: "Help the witch create the perfect magical brew by balancing yellow and blue potions."
            },
            {
                title: "Multi-Potion Mastery",
                description: "Luckily we have gradient descent now, tuning all of these by hand would be tricky (but feel free to still experiment tuning by hand and seeing what happens if you want).",
                goal: "Help the witch make a more complicated potion."
            },
            {
                title: "Real-World Challenge",
                goal: "Purchase a bone for Max (any size)."
            },
            {
                title: "Training Data Power",
                goal: "Use the training data to buy Max a better bone!"
            },
            {
                title: "Large Scale Prediction",
                description: "Tuning 1000 robots would take a long time, lets just try predicting all of their optimal energy levels at once.",
                goal: "We need to turn each of these robots on by tuning their optimal energy level." 
            },
            {
                title: "Feature Engineering",
                goal: "Improve the prediction function by using gradient descent on training data."
            },
            {
                title: "Improved Predictions",
                goal: "Use the improved prediction model on all the robots again."
            },
            {
                title: "Congratulations!",
                description: "You've learned how A.I works!",
                goal: "Celebrate your journey through the fundamentals of AI optimization!"
            }
        ];
        
        // Image paths
        this.images = {
            robot: "pictures/robot.png",
            robotActive: "pictures/robot-active.png", 
            witch: "pictures/witch.png",
            dog: "pictures/dog.png",
            dogHappy: "pictures/dog-happy.png",
            dogSad: "pictures/dog-sad.png",
        };
    }
    
    /**
     * Gets the current level configuration
     * @returns {Object} Current level object with title, goal, etc.
     */
    getCurrentLevel() {
        return this.levels[this.currentLevel];
    }
    
    /**
     * Advances to the next level
     * @returns {boolean} True if successfully advanced, false if already at last level
     */
    nextLevel() {
        if (this.currentLevel < this.levels.length - 1) {
            this.currentLevel++;
            return true;
        }
        return false;
    }
    
    /**
     * Goes back to the previous level
     * @returns {boolean} True if successfully went back, false if already at first level
     */
    previousLevel() {
        if (this.currentLevel > 0) {
            this.currentLevel--;
            return true;
        }
        return false;
    }
    
    /**
     * Resets the game state to initial values
     * @param {boolean} preserveProgress - If true, keeps level progress
     */
    reset(preserveProgress = false) {
        if (!preserveProgress) {
            this.currentLevel = 0;
        }
        
        // Reset game mechanics
        this.userMoney = 10;
        this.trueBoneSize = null;
        this.userFirstGuess = null;
        this.dogBonesPurchased = 0;
        
        // Reset ML parameters
        this.featureWeights = { A: 0.5, B: 0.3, C: 0.2 };
        this.featureData = [];
        this.currentLoss = 0;
        
        // Reset robot states
        this.robotGridStates = new Array(1000).fill(false);
        
        // Reset UI state
        this.isAutoRunning = false;
        if (this.autoRunInterval) {
            clearInterval(this.autoRunInterval);
            this.autoRunInterval = null;
        }
        this.steps = 0;
        
        // Reset optimizers
        if (this.optimizer) {
            this.optimizer.reset();
        }
        if (this.featureOptimizer) {
            this.featureOptimizer.reset();
        }
    }
    
    /**
     * Updates feature weights
     * @param {Object} newWeights - Object containing A, B, C weight values
     */
    updateFeatureWeights(newWeights) {
        this.featureWeights = { ...this.featureWeights, ...newWeights };
    }
    
    /**
     * Updates a single robot's state in the grid
     * @param {number} index - Robot index (0-999)
     * @param {boolean} state - New state for the robot
     */
    updateRobotState(index, state) {
        if (index >= 0 && index < 1000) {
            this.robotGridStates[index] = state;
        }
    }
    
    /**
     * Gets the count of active robots
     * @returns {number} Number of active robots
     */
    getActiveRobotCount() {
        return this.robotGridStates.filter(state => state).length;
    }
    
    /**
     * Saves the current state to localStorage
     */
    saveState() {
        const stateToSave = {
            currentLevel: this.currentLevel,
            userMoney: this.userMoney,
            dogBonesPurchased: this.dogBonesPurchased,
            featureWeights: this.featureWeights,
            robotGridStates: this.robotGridStates
        };
        
        try {
            localStorage.setItem('mlteach_gamestate', JSON.stringify(stateToSave));
            console.log('Game state saved successfully');
        } catch (e) {
            console.error('Failed to save game state:', e);
        }
    }
    
    /**
     * Loads state from localStorage
     * @returns {boolean} True if state was loaded successfully
     */
    loadState() {
        try {
            const savedState = localStorage.getItem('mlteach_gamestate');
            if (savedState) {
                const parsedState = JSON.parse(savedState);
                
                // Restore saved values
                this.currentLevel = parsedState.currentLevel || 0;
                this.userMoney = parsedState.userMoney || 10;
                this.dogBonesPurchased = parsedState.dogBonesPurchased || 0;
                this.featureWeights = parsedState.featureWeights || { A: 0.5, B: 0.3, C: 0.2 };
                this.robotGridStates = parsedState.robotGridStates || new Array(1000).fill(false);
                
                console.log('Game state loaded successfully');
                return true;
            }
        } catch (e) {
            console.error('Failed to load game state:', e);
        }
        return false;
    }
    
    /**
     * Clears saved state from localStorage
     */
    clearSavedState() {
        try {
            localStorage.removeItem('mlteach_gamestate');
            console.log('Saved game state cleared');
        } catch (e) {
            console.error('Failed to clear saved state:', e);
        }
    }
}

// Create global instance
const gameState = new GameState();

// Export for use in other files (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameState;
}
