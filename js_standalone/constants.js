/**
 * @fileoverview Constants used throughout the MLTEACH application.
 * Centralized location for all magic numbers and configuration values.
 */

const APP_CONSTANTS = {
    // Energy optimization targets
    ENERGY: {
        ROBOT_OPTIMAL: 75,
        ROBOT_AI_OPTIMAL: 90,
        MIN: 0,
        MAX: 100,
        STEP: 1
    },
    
    // Potion mixing targets
    POTIONS: {
        YELLOW_OPTIMAL: 60,
        BLUE_OPTIMAL: 40,
        RED_OPTIMAL: 70,
        GREEN_OPTIMAL: 10,
        PURPLE_OPTIMAL: 30,
        ORANGE_OPTIMAL: 90,
        YELLOW_MULTI_OPTIMAL: 60,
        BLUE_MULTI_OPTIMAL: 40
    },
    
    // Machine learning parameters
    ML: {
        LEARNING_RATE: 0.1,
        CONVERGENCE_TOLERANCE: 0,
        ROBOT_GRID_SIZE: 1000,
        FEATURE_COUNT: 3
    },
    
    // UI Configuration
    UI: {
        ANIMATION_DURATION: 500,
        AUTO_RUN_INTERVAL: 350,
        SCROLL_DELAY: 50,
        MAX_LOSS_DISPLAY: 100
    },
    
    // Game mechanics
    GAME: {
        STARTING_MONEY: 10,
        BONE_PRICES: {
            SMALL: 5,
            MEDIUM: 15,
            LARGE: 30
        }
    },
    
    // Visual thresholds
    THRESHOLDS: {
        PERFECT: 0,
        VERY_HOT: 5,
        HOT: 15,
        WARM: 30,
        COLD: 50
    }
};
