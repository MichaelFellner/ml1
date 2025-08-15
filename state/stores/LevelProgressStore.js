/**
 * Level Progress Store
 * 
 * Manages student progress through MLTEACH levels including completion status,
 * scores, time tracking, and performance metrics.
 * 
 * State Structure:
 * {
 *   levels: {
 *     'gradient-descent-intro': {
 *       id: 'gradient-descent-intro',
 *       name: 'Gradient Descent Introduction',
 *       completed: true,
 *       score: 85,
 *       timeSpent: 120000, // milliseconds
 *       attempts: 3,
 *       completedAt: 1634567890123,
 *       startedAt: 1634567770123,
 *       bestScore: 85,
 *       solutions: { w: 7.0, b: 0 }
 *     }
 *   },
 *   currentLevel: 'balloon-inflation',
 *   totalScore: 340,
 *   totalTimeSpent: 480000,
 *   completionRate: 0.6,
 *   lastUpdated: 1634567890123
 * }
 */

// Level configuration with metadata
const LEVEL_CONFIG = {
    'gradient-descent-intro': {
        name: 'Gradient Descent Introduction',
        type: 'tutorial',
        order: 1,
        maxScore: 100
    },
    'balloon-inflation': {
        name: 'Balloon Inflation Challenge',
        type: 'interactive',
        order: 2,
        maxScore: 100
    },
    'balloon-gradient': {
        name: 'AI Balloon Optimizer',
        type: 'demonstration',
        order: 3,
        maxScore: 100
    },
    'bunny-feeding': {
        name: 'Bunny Feeding Challenge',
        type: 'interactive',
        order: 4,
        maxScore: 100
    },
    'bunny-gradient': {
        name: 'AI Bunny Feeder',
        type: 'demonstration',
        order: 5,
        maxScore: 100
    }
};

/**
 * Creates and configures the Level Progress Store
 * 
 * @returns {Store} Configured store instance with level progress methods
 */
function createLevelProgressStore() {
    const initialState = {
        levels: {},
        currentLevel: null,
        totalScore: 0,
        totalTimeSpent: 0,
        completionRate: 0,
        lastUpdated: Date.now(),
        statistics: {
            totalLevels: Object.keys(LEVEL_CONFIG).length,
            completedLevels: 0,
            averageScore: 0,
            averageTime: 0,
            fastestCompletion: null,
            slowestCompletion: null
        }
    };
    
    const store = new Store(initialState, {
        name: 'LevelProgressStore',
        debug: false // Set to true for development
    });
    
    /**
     * Starts a level session
     * 
     * @param {string} levelId - ID of the level to start
     * @returns {Object} Level session data
     * 
     * @example
     * LevelProgressStore.startLevel('balloon-inflation');
     */
    store.startLevel = function(levelId) {
        if (!LEVEL_CONFIG[levelId]) {
            throw new Error(`Unknown level: ${levelId}`);
        }
        
        const now = Date.now();
        const config = LEVEL_CONFIG[levelId];
        
        return this.setState(state => {
            const existingLevel = state.levels[levelId] || {};
            
            return {
                currentLevel: levelId,
                levels: {
                    ...state.levels,
                    [levelId]: {
                        id: levelId,
                        name: config.name,
                        type: config.type,
                        order: config.order,
                        maxScore: config.maxScore,
                        completed: existingLevel.completed || false,
                        score: existingLevel.score || 0,
                        timeSpent: existingLevel.timeSpent || 0,
                        attempts: (existingLevel.attempts || 0) + 1,
                        startedAt: existingLevel.startedAt || now,
                        lastStartedAt: now,
                        completedAt: existingLevel.completedAt || null,
                        bestScore: existingLevel.bestScore || 0,
                        solutions: existingLevel.solutions || {},
                        sessionStartTime: now
                    }
                }
            };
        }, 'START_LEVEL');
    };
    
    /**
     * Completes a level with score and solution data
     * 
     * @param {string} levelId - ID of the level to complete
     * @param {Object} completionData - Completion details
     * @param {number} completionData.score - Score achieved (0-100)
     * @param {Object} completionData.solutions - Solution parameters (e.g., {w: 7, b: 0})
     * @param {number} [completionData.timeSpent] - Override time spent calculation
     * 
     * @example
     * LevelProgressStore.completeLevel('balloon-inflation', {
     *   score: 95,
     *   solutions: { w: 7.2 },
     *   timeSpent: 120000
     * });
     */
    store.completeLevel = function(levelId, completionData = {}) {
        const { score = 0, solutions = {}, timeSpent } = completionData;
        
        if (typeof score !== 'number' || score < 0 || score > 100) {
            throw new Error('Score must be a number between 0 and 100');
        }
        
        return this.setState(state => {
            const level = state.levels[levelId];
            if (!level) {
                throw new Error(`Level ${levelId} not started`);
            }
            
            const now = Date.now();
            const sessionTime = timeSpent || (now - level.sessionStartTime);
            const totalTime = level.timeSpent + sessionTime;
            const bestScore = Math.max(level.bestScore, score);
            const wasAlreadyCompleted = level.completed;
            
            // Calculate new statistics
            const completedLevels = wasAlreadyCompleted 
                ? state.statistics.completedLevels 
                : state.statistics.completedLevels + 1;
            
            const newTotalScore = state.totalScore + (wasAlreadyCompleted 
                ? (score - level.score) 
                : score);
            
            const newTotalTime = state.totalTimeSpent + sessionTime;
            
            const updatedLevel = {
                ...level,
                completed: true,
                score: score,
                timeSpent: totalTime,
                completedAt: now,
                bestScore: bestScore,
                solutions: { ...level.solutions, ...solutions },
                sessionStartTime: undefined // Remove session tracking
            };
            
            return {
                levels: {
                    ...state.levels,
                    [levelId]: updatedLevel
                },
                totalScore: newTotalScore,
                totalTimeSpent: newTotalTime,
                completionRate: completedLevels / state.statistics.totalLevels,
                lastUpdated: now,
                statistics: {
                    ...state.statistics,
                    completedLevels,
                    averageScore: completedLevels > 0 ? newTotalScore / completedLevels : 0,
                    averageTime: completedLevels > 0 ? newTotalTime / completedLevels : 0,
                    fastestCompletion: this._updateFastestTime(state.statistics.fastestCompletion, sessionTime, levelId),
                    slowestCompletion: this._updateSlowestTime(state.statistics.slowestCompletion, sessionTime, levelId)
                }
            };
        }, 'COMPLETE_LEVEL');
    };
    
    /**
     * Updates the current level progress without completing it
     * 
     * @param {string} levelId - ID of the level to update
     * @param {Object} updates - Progress updates
     * 
     * @example
     * LevelProgressStore.updateProgress('balloon-inflation', {
     *   solutions: { w: 6.8 }, // User's current attempt
     *   partialScore: 75
     * });
     */
    store.updateProgress = function(levelId, updates = {}) {
        return this.setState(state => {
            const level = state.levels[levelId];
            if (!level) {
                console.warn(`Attempting to update progress for unstarted level: ${levelId}`);
                return state;
            }
            
            return {
                levels: {
                    ...state.levels,
                    [levelId]: {
                        ...level,
                        ...updates
                    }
                },
                lastUpdated: Date.now()
            };
        }, 'UPDATE_PROGRESS');
    };
    
    /**
     * Gets progress for a specific level
     * 
     * @param {string} levelId - ID of the level
     * @returns {Object|null} Level progress data or null if not found
     */
    store.getLevelProgress = function(levelId) {
        const state = this.getState();
        return state.levels[levelId] || null;
    };
    
    /**
     * Gets all completed levels
     * 
     * @returns {Object[]} Array of completed level data
     */
    store.getCompletedLevels = function() {
        const state = this.getState();
        return Object.values(state.levels)
            .filter(level => level.completed)
            .sort((a, b) => a.order - b.order);
    };
    
    /**
     * Gets the next available level
     * 
     * @returns {string|null} Next level ID or null if all complete
     */
    store.getNextLevel = function() {
        const state = this.getState();
        const completedLevels = this.getCompletedLevels();
        const completedOrders = new Set(completedLevels.map(l => l.order));
        
        const allLevels = Object.values(LEVEL_CONFIG).sort((a, b) => a.order - b.order);
        
        for (const config of allLevels) {
            if (!completedOrders.has(config.order)) {
                return Object.keys(LEVEL_CONFIG).find(id => LEVEL_CONFIG[id] === config);
            }
        }
        
        return null; // All levels completed
    };
    
    /**
     * Calculates overall performance metrics
     * 
     * @returns {Object} Performance summary
     */
    store.getPerformanceMetrics = function() {
        const state = this.getState();
        const completedLevels = this.getCompletedLevels();
        
        if (completedLevels.length === 0) {
            return {
                overallGrade: 'N/A',
                efficiency: 0,
                consistency: 0,
                improvement: 0,
                recommendations: ['Complete some levels to see performance metrics']
            };
        }
        
        const averageScore = state.statistics.averageScore;
        const averageAttempts = completedLevels.reduce((sum, l) => sum + l.attempts, 0) / completedLevels.length;
        const scoreVariance = this._calculateVariance(completedLevels.map(l => l.score));
        
        // Grade calculation
        let overallGrade = 'F';
        if (averageScore >= 90) overallGrade = 'A';
        else if (averageScore >= 80) overallGrade = 'B';
        else if (averageScore >= 70) overallGrade = 'C';
        else if (averageScore >= 60) overallGrade = 'D';
        
        // Efficiency (inverse of attempts - fewer attempts = more efficient)
        const efficiency = Math.max(0, 100 - (averageAttempts - 1) * 20);
        
        // Consistency (inverse of score variance - lower variance = more consistent)
        const consistency = Math.max(0, 100 - Math.sqrt(scoreVariance));
        
        // Improvement (comparing first half vs second half of completed levels)
        const improvement = this._calculateImprovement(completedLevels);
        
        const recommendations = this._generateRecommendations({
            averageScore,
            averageAttempts,
            efficiency,
            consistency,
            improvement
        });
        
        return {
            overallGrade,
            averageScore: Math.round(averageScore),
            efficiency: Math.round(efficiency),
            consistency: Math.round(consistency),
            improvement: Math.round(improvement),
            totalTime: state.totalTimeSpent,
            completionRate: Math.round(state.completionRate * 100),
            recommendations
        };
    };
    
    /**
     * Resets progress for a specific level
     * 
     * @param {string} levelId - ID of the level to reset
     */
    store.resetLevel = function(levelId) {
        return this.setState(state => {
            if (!state.levels[levelId]) {
                return state;
            }
            
            const newLevels = { ...state.levels };
            delete newLevels[levelId];
            
            // Recalculate totals
            const remaining = Object.values(newLevels).filter(l => l.completed);
            const newTotalScore = remaining.reduce((sum, l) => sum + l.score, 0);
            const newTotalTime = remaining.reduce((sum, l) => sum + l.timeSpent, 0);
            const completedCount = remaining.length;
            
            return {
                levels: newLevels,
                totalScore: newTotalScore,
                totalTimeSpent: newTotalTime,
                completionRate: completedCount / state.statistics.totalLevels,
                lastUpdated: Date.now(),
                statistics: {
                    ...state.statistics,
                    completedLevels: completedCount,
                    averageScore: completedCount > 0 ? newTotalScore / completedCount : 0,
                    averageTime: completedCount > 0 ? newTotalTime / completedCount : 0
                }
            };
        }, 'RESET_LEVEL');
    };
    
    // Helper methods
    store._updateFastestTime = function(current, newTime, levelId) {
        if (!current || newTime < current.time) {
            return { time: newTime, levelId, date: Date.now() };
        }
        return current;
    };
    
    store._updateSlowestTime = function(current, newTime, levelId) {
        if (!current || newTime > current.time) {
            return { time: newTime, levelId, date: Date.now() };
        }
        return current;
    };
    
    store._calculateVariance = function(scores) {
        if (scores.length < 2) return 0;
        const mean = scores.reduce((sum, score) => sum + score, 0) / scores.length;
        const variance = scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / scores.length;
        return variance;
    };
    
    store._calculateImprovement = function(levels) {
        if (levels.length < 2) return 0;
        
        const sortedByCompletion = [...levels].sort((a, b) => a.completedAt - b.completedAt);
        const midPoint = Math.floor(sortedByCompletion.length / 2);
        
        const firstHalf = sortedByCompletion.slice(0, midPoint);
        const secondHalf = sortedByCompletion.slice(midPoint);
        
        if (firstHalf.length === 0 || secondHalf.length === 0) return 0;
        
        const firstHalfAvg = firstHalf.reduce((sum, l) => sum + l.score, 0) / firstHalf.length;
        const secondHalfAvg = secondHalf.reduce((sum, l) => sum + l.score, 0) / secondHalf.length;
        
        return secondHalfAvg - firstHalfAvg;
    };
    
    store._generateRecommendations = function(metrics) {
        const recommendations = [];
        
        if (metrics.averageScore < 70) {
            recommendations.push('Focus on understanding the concepts better - review tutorial materials');
        }
        
        if (metrics.averageAttempts > 3) {
            recommendations.push('Take more time to plan your approach before attempting solutions');
        }
        
        if (metrics.efficiency < 50) {
            recommendations.push('Try to solve problems in fewer attempts by being more methodical');
        }
        
        if (metrics.consistency < 60) {
            recommendations.push('Work on maintaining consistent performance across all levels');
        }
        
        if (metrics.improvement < 0) {
            recommendations.push('Review earlier concepts - your performance may be declining');
        }
        
        if (recommendations.length === 0) {
            recommendations.push('Excellent work! Keep up the great performance!');
        }
        
        return recommendations;
    };
    
    return store;
}

// Make the store creator available globally
window.createLevelProgressStore = createLevelProgressStore;
window.LEVEL_CONFIG = LEVEL_CONFIG;

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createLevelProgressStore, LEVEL_CONFIG };
}

/*
 * USAGE EXAMPLES:
 * 
 * 1. Initialize Store:
 * ===================
 * const progressStore = createLevelProgressStore();
 * 
 * 2. Start a Level:
 * ================
 * progressStore.startLevel('balloon-inflation');
 * 
 * 3. Update Progress:
 * ==================
 * progressStore.updateProgress('balloon-inflation', {
 *   solutions: { w: 6.8 },
 *   partialScore: 75
 * });
 * 
 * 4. Complete a Level:
 * ===================
 * progressStore.completeLevel('balloon-inflation', {
 *   score: 95,
 *   solutions: { w: 7.0 },
 *   timeSpent: 120000
 * });
 * 
 * 5. Get Progress Info:
 * ====================
 * const levelData = progressStore.getLevelProgress('balloon-inflation');
 * const nextLevel = progressStore.getNextLevel();
 * const metrics = progressStore.getPerformanceMetrics();
 * 
 * 6. Listen to Changes:
 * ====================
 * progressStore.subscribe((newState, prevState) => {
 *   if (newState.completionRate > prevState.completionRate) {
 *     console.log('Level completed!');
 *   }
 * });
 */