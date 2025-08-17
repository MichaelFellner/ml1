import { createLearningRateWarmup } from './learning-rate-warmup';
import { createExampleStagingLevel } from './example-staging-level';
import { createColorPatternMemory } from './color-pattern-memory';
import { createStepSizeTeaching } from './step-size-teaching';
import { createGradientDescentOverview } from './gradient-descent-overview';
import { createIntroductionToSteps } from './introduction-to-steps';
import { createPizzaProduction } from './pizza-production';
import { createMusicStudioMixer } from './music-studio-mixer';
import { createGradientDescentMathSimple } from './gradient-descent-math-simple';
import { createGradientDescentMathBias } from './gradient-descent-math-bias';
import { createGradientDescentMathMultiple } from './gradient-descent-math-multiple';
import { createGradientDescentMathQuiz } from './gradient-descent-math-quiz';

/**
 * MLTEACH Levels - Central Index
 * 
 * Makes all level functions globally available for the navigation system.
 * This file maintains compatibility with the vanilla JavaScript architecture.
 */

// For browser compatibility - attach all level functions to window object
// These need to be loaded via script tags in index.html
if (typeof window !== 'undefined') {
    // Wait for all level scripts to load
    document.addEventListener('DOMContentLoaded', function() {
        // Level registry for navigation and management
        window.MLTeachLevels = {
            levels: {
                'gradient-descent-intro': window.createGradientDescentPart1,
                'balloon-inflation': window.createBalloonInflationLevel,
                'balloon-gradient': window.createBalloonGradientDescent,
                'bunny-feeding': window.createBunnyFeedingLevel,
                'bunny-gradient': window.createBunnyGradientDescent,
                'test-integration-level': window.createTestIntegrationLevel,
                'example-staging-level': window.createExampleStagingLevel,
                'learning-rate-warmup': window.createLearningRateWarmup,
                'color-pattern-memory': window.createColorPatternMemory,
                'step-size-teaching': window.createStepSizeTeaching,
                'gradient-descent-overview': window.createGradientDescentOverview,
                'introduction-to-steps': window.createIntroductionToSteps,
                'pizza-production': window.createPizzaProduction,
                'balloon-inflation-behind-scenes': window.createBalloonInflationBehindScenes,
                'pizza-production-behind-scenes': window.createPizzaProductionBehindScenes,
                'music-studio-mixer': window.createMusicStudioMixer,
                'gradient-descent-math-simple': window.createGradientDescentMathSimple,
                'gradient-descent-math-bias': window.createGradientDescentMathBias,
                'gradient-descent-math-multiple': window.createGradientDescentMathMultiple,
                'gradient-descent-math-quiz': window.createGradientDescentMathQuiz,
                'training-data-intro': window.createTrainingDataIntro,
                'training-data-spreadsheet': window.createTrainingDataSpreadsheet,
                'training-data-interactive': window.createTrainingDataInteractive
            },
            
            // Level metadata registry
            levelMetadata: {
                'gradient-descent-intro': {
                    id: 'gradient-descent-intro',
                    name: 'Gradient Descent Introduction',
                    type: 'tutorial',
                    description: 'Introduction to gradient descent concepts',
                    created: '2024-01-01T00:00:00.000Z',
                    version: '1.0.0'
                },
                'test-integration-level': {
                    id: 'test-integration-level',
                    name: 'Test Integration Level',
                    type: 'interactive',
                    description: 'A simple test level to verify the integration system works',
                    created: '2025-08-13T00:51:52.367465Z',
                    version: '1.0.0'
                },
                'balloon-inflation': {
                    id: 'balloon-inflation',
                    name: 'Balloon Inflation Challenge',
                    type: 'interactive',
                    description: 'Learn to adjust parameters for balloon inflation',
                    created: '2024-01-01T00:00:00.000Z',
                    version: '1.0.0'
                },
                'balloon-gradient': {
                    id: 'balloon-gradient',
                    name: 'AI Balloon Optimizer',
                    type: 'demonstration',
                    description: 'Watch AI optimize balloon inflation parameters',
                    created: '2024-01-01T00:00:00.000Z',
                    version: '1.0.0'
                },
                'bunny-feeding': {
                    id: 'bunny-feeding',
                    name: 'Bunny Feeding Challenge',
                    type: 'interactive',
                    description: 'Learn to feed bunnies with the right parameters',
                    created: '2024-01-01T00:00:00.000Z',
                    version: '1.0.0'
                },
                'bunny-gradient': {
                    id: 'bunny-gradient',
                    name: 'AI Bunny Feeder',
                    type: 'demonstration',
                    description: 'Watch AI optimize bunny feeding parameters',
                    created: '2024-01-01T00:00:00.000Z',
                    version: '1.0.0'
                },
                'example-staging-level': {
                    id: 'example-staging-level',
                    name: 'Example Staging Level',
                    type: 'interactive',
                    description: 'A simple example level to test the staging integration workflow',
                    created: '2025-08-13T17:23:59.000Z',
                    version: '1.0.0'
                },
                'learning-rate-warmup': {
                    id: 'learning-rate-warmup',
                    name: 'Learning Rate Warmup',
                    type: 'interactive',
                    description: 'Learn about learning rates in gradient descent',
                    created: '2025-08-14T00:00:00.000Z',
                    version: '1.0.0'
                },
                'color-pattern-memory': {
                    id: 'color-pattern-memory',
                    name: 'Color Pattern Memory',
                    type: 'interactive',
                    description: 'New level integrated from staging',
                    created: '2025-08-14T00:02:13.543598Z',
                    version: '1.0.0'
                },
                'step-size-teaching': {
                    id: 'step-size-teaching',
                    name: 'Step Size Teaching',
                    type: 'interactive',
                    description: 'New level integrated from staging',
                    created: '2025-08-14T11:40:11.037494Z',
                    version: '1.0.0'
                },
                'gradient-descent-overview': {
                    id: 'gradient-descent-overview',
                    name: 'How Gradient Descent Works: Quick Overview',
                    type: 'tutorial',
                    description: 'Learn how gradient descent iteratively finds the correct parameters',
                    created: '2025-08-15T00:00:00.000Z',
                    version: '1.0.0'
                },
                'introduction-to-steps': {
                    id: 'introduction-to-steps',
                    name: 'Introduction to Steps',
                    type: 'interactive',
                    description: 'Learn about gradient descent step sizes through balloon pumping',
                    created: new Date().toISOString(),
                    version: '1.0.0'
                },
                'pizza-production': {
                    id: 'pizza-production',
                    name: 'Pizza Production Challenge',
                    type: 'interactive',
                    description: 'Optimize pizza production with two parameters',
                    created: new Date().toISOString(),
                    version: '1.0.0'
                },
                'balloon-inflation-behind-scenes': {
                    id: 'balloon-inflation-behind-scenes',
                    name: 'Balloon Inflation: Behind the Scenes',
                    type: 'interactive',
                    description: 'See the mathematical details of gradient descent for balloon inflation',
                    created: new Date().toISOString(),
                    version: '1.0.0'
                },
                'pizza-production-behind-scenes': {
                    id: 'pizza-production-behind-scenes',
                    name: 'Pizza Production: Behind the Scenes',
                    type: 'interactive',
                    description: 'Visualize two-parameter gradient descent with detailed math',
                    created: new Date().toISOString(),
                    version: '1.0.0'
                },
                'music-studio-mixer': {
                    id: 'music-studio-mixer',
                    name: 'Music Studio Mixer Challenge',
                    type: 'interactive',
                    description: 'Master 11-parameter gradient descent through audio mixing',
                    created: new Date().toISOString(),
                    version: '1.0.0'
                },
                'gradient-descent-math-simple': {
                    id: 'gradient-descent-math-simple',
                    name: 'Gradient Descent Math: Simple Case',
                    type: 'tutorial',
                    description: 'Understanding parameter updates for f(x) = wx',
                    created: new Date().toISOString(),
                    version: '1.0.0'
                },
                'gradient-descent-math-bias': {
                    id: 'gradient-descent-math-bias',
                    name: 'Gradient Descent Math: Adding Bias',
                    type: 'tutorial',
                    description: 'Understanding parameter updates for f(x) = wx + b',
                    created: new Date().toISOString(),
                    version: '1.0.0'
                },
                'gradient-descent-math-multiple': {
                    id: 'gradient-descent-math-multiple',
                    name: 'Gradient Descent Math: Multiple Parameters',
                    type: 'tutorial',
                    description: 'Understanding updates for f(x) = w1x1 + w2x2 + w3x3 + b',
                    created: new Date().toISOString(),
                    version: '1.0.0'
                },
                'gradient-descent-math-quiz': {
                    id: 'gradient-descent-math-quiz',
                    name: 'Gradient Descent Math Quiz',
                    type: 'interactive',
                    description: 'Test your understanding by calculating parameter updates',
                    created: new Date().toISOString(),
                    version: '1.0.0'
                },
                'training-data-intro': {
                    id: 'training-data-intro',
                    name: 'Training Data Introduction',
                    type: 'tutorial',
                    description: 'Understanding the role of training data in gradient descent',
                    created: new Date().toISOString(),
                    version: '1.0.0'
                },
                'training-data-spreadsheet': {
                    id: 'training-data-spreadsheet',
                    name: 'Training Data Spreadsheet',
                    type: 'demonstration',
                    description: 'Explore what training data looks like in practice',
                    created: new Date().toISOString(),
                    version: '1.0.0'
                },
                'training-data-interactive': {
                    id: 'training-data-interactive',
                    name: 'Interactive Weight Adjustment',
                    type: 'interactive',
                    description: 'Adjust weights to minimize prediction error',
                    created: new Date().toISOString(),
                    version: '1.0.0'
                }
            },
            
            /**
             * Gets a level function by ID
             */
            getLevel: function(levelId) {
                return window.MLTeachLevels.levels[levelId] || null;
            },
            
            /**
             * Gets all available level IDs
             */
            getAllLevelIds: function() {
                return Object.keys(window.MLTeachLevels.levels);
            },
            
            /**
             * Gets levels filtered by type
             */
            getLevelsByType: function(type) {
                return Object.entries(window.MLTeachLevels.levelMetadata)
                    .filter(([id, meta]) => meta.type === type)
                    .map(([id]) => id);
            },
            
            /**
             * Gets level metadata by ID
             */
            getLevelMetadata: function(levelId) {
                return window.MLTeachLevels.levelMetadata[levelId] || null;
            },
            
            /**
             * Checks if a level exists
             */
            levelExists: function(levelId) {
                return levelId in window.MLTeachLevels.levels;
            },
            
            /**
             * Gets all levels with their metadata
             */
            getAllLevelsWithMetadata: function() {
                return Object.keys(window.MLTeachLevels.levels).map(id => ({
                    id,
                    metadata: window.MLTeachLevels.levelMetadata[id],
                    createLevel: window.MLTeachLevels.levels[id]
                }));
            },
            
            /**
             * Creates a level registry for dynamic loading
             */
            createLevelRegistry: function() {
                return {
                    levels: { ...window.MLTeachLevels.levels },
                    metadata: { ...window.MLTeachLevels.levelMetadata },
                    count: Object.keys(window.MLTeachLevels.levels).length,
                    types: [...new Set(Object.values(window.MLTeachLevels.levelMetadata).map(m => m.type))],
                    created: new Date().toISOString()
                };
            },
            
            /**
             * Gets level statistics
             */
            getLevelStatistics: function() {
                const allMetadata = Object.values(window.MLTeachLevels.levelMetadata);
                const byType = {};
                
                allMetadata.forEach(metadata => {
                    byType[metadata.type] = (byType[metadata.type] || 0) + 1;
                });
                
                return {
                    total: allMetadata.length,
                    byType,
                    types: Object.keys(byType),
                    hasLevels: allMetadata.length > 0
                };
            }
        };
        
        console.log('MLTeachLevels registry initialized with', window.MLTeachLevels.getLevelStatistics());
    });
}

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.MLTeachLevels;
}