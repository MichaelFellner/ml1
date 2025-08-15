/**
 * Level Validation Service
 * 
 * Pure functions for validating user inputs and calculating scores
 * in MLTEACH educational levels. No DOM manipulation or side effects.
 * 
 * This service provides:
 * - Answer validation with tolerance
 * - Score calculation
 * - Feedback generation
 * - Performance metrics
 */

// Make LevelValidationService available globally
window.LevelValidationService = class LevelValidationService {
    
    /**
     * Checks if balloon inflation is correct within tolerance
     * 
     * Validates if the given air amount is within acceptable range
     * of the needed amount for balloon inflation challenges.
     * 
     * @param {number} given - Amount of air given by user
     * @param {number} needed - Correct amount of air needed
     * @param {number} [tolerance=0.05] - Acceptable error as percentage (0.05 = 5%)
     * @returns {{isCorrect: boolean, percentDiff: number, status: string}} Validation result
     * @throws {Error} If inputs are invalid
     * 
     * @example
     * // Check if 7.2 is close enough to 7.0 (within 5% tolerance)
     * const result = LevelValidationService.checkBalloonInflation(7.2, 7.0);
     * console.log(result); 
     * // {isCorrect: true, percentDiff: 2.86, status: 'perfect'}
     * 
     * @example
     * // Check with custom tolerance
     * const result = LevelValidationService.checkBalloonInflation(8, 7, 0.1);
     * console.log(result); 
     * // {isCorrect: true, percentDiff: 14.29, status: 'acceptable'}
     */
    static checkBalloonInflation(given, needed, tolerance = 0.05) {
        // Input validation
        if (typeof given !== 'number' || isNaN(given)) {
            throw new Error('Invalid given value: must be a valid number');
        }
        
        if (typeof needed !== 'number' || isNaN(needed) || needed <= 0) {
            throw new Error('Invalid needed value: must be a positive number');
        }
        
        if (typeof tolerance !== 'number' || tolerance < 0 || tolerance > 1) {
            throw new Error('Invalid tolerance: must be between 0 and 1');
        }
        
        // Calculate percentage difference
        const percentDiff = Math.abs((given - needed) / needed);
        const percentDiffDisplay = percentDiff * 100;
        
        // Determine status
        let status;
        if (percentDiff <= tolerance) {
            status = 'perfect';
        } else if (percentDiff <= tolerance * 2) {
            status = 'acceptable';
        } else if (given < needed) {
            status = 'underinflated';
        } else {
            status = 'overinflated';
        }
        
        return {
            isCorrect: percentDiff <= tolerance,
            percentDiff: Math.round(percentDiffDisplay * 100) / 100, // Round to 2 decimal places
            status: status,
            ratio: given / needed
        };
    }
    
    /**
     * Checks if bunny feeding amount is correct
     * 
     * Validates if the given hay amount matches the needed amount
     * for bunny feeding challenges. Uses absolute difference.
     * 
     * @param {number} given - Amount of hay given by user
     * @param {number} needed - Correct amount of hay needed
     * @param {number} [maxError=0.5] - Maximum acceptable absolute error
     * @returns {{isCorrect: boolean, error: number, status: string}} Validation result
     * @throws {Error} If inputs are invalid
     * 
     * @example
     * // Check if 20.3 hay units is correct for 20 needed
     * const result = LevelValidationService.checkBunnyFeeding(20.3, 20);
     * console.log(result);
     * // {isCorrect: true, error: 0.3, status: 'perfect'}
     * 
     * @example
     * // Check with stricter tolerance
     * const result = LevelValidationService.checkBunnyFeeding(20.3, 20, 0.1);
     * console.log(result);
     * // {isCorrect: false, error: 0.3, status: 'overfed'}
     */
    static checkBunnyFeeding(given, needed, maxError = 0.5) {
        // Input validation
        if (typeof given !== 'number' || isNaN(given) || given < 0) {
            throw new Error('Invalid given value: must be a non-negative number');
        }
        
        if (typeof needed !== 'number' || isNaN(needed) || needed < 0) {
            throw new Error('Invalid needed value: must be a non-negative number');
        }
        
        if (typeof maxError !== 'number' || maxError < 0) {
            throw new Error('Invalid maxError: must be a non-negative number');
        }
        
        // Calculate absolute error
        const error = Math.abs(given - needed);
        
        // Determine status
        let status;
        if (error <= maxError) {
            status = 'perfect';
        } else if (error <= maxError * 2) {
            status = 'close';
        } else if (given < needed) {
            status = 'underfed';
        } else {
            status = 'overfed';
        }
        
        return {
            isCorrect: error <= maxError,
            error: Math.round(error * 100) / 100, // Round to 2 decimal places
            status: status,
            percentError: needed > 0 ? Math.round((error / needed) * 10000) / 100 : 0
        };
    }
    
    /**
     * Calculates user score based on performance metrics
     * 
     * Computes a score from 0-100 based on attempts, time spent, and accuracy.
     * 
     * @param {number} attempts - Number of attempts made
     * @param {number} timeSpent - Time spent in seconds
     * @param {number} accuracy - Accuracy as percentage (0-100)
     * @param {Object} [weights] - Custom weights for scoring
     * @param {number} [weights.accuracyWeight=0.5] - Weight for accuracy (0-1)
     * @param {number} [weights.attemptsWeight=0.3] - Weight for attempts (0-1)
     * @param {number} [weights.timeWeight=0.2] - Weight for time (0-1)
     * @returns {{score: number, grade: string, breakdown: Object}} Score result
     * @throws {Error} If inputs are invalid
     * 
     * @example
     * // Calculate score for perfect accuracy, 3 attempts, 45 seconds
     * const result = LevelValidationService.calculateScore(3, 45, 100);
     * console.log(result);
     * // {score: 85, grade: 'B', breakdown: {...}}
     * 
     * @example
     * // Calculate with custom weights
     * const result = LevelValidationService.calculateScore(
     *   5, 120, 80,
     *   {accuracyWeight: 0.7, attemptsWeight: 0.2, timeWeight: 0.1}
     * );
     */
    static calculateScore(attempts, timeSpent, accuracy, weights = {}) {
        // Input validation
        if (typeof attempts !== 'number' || attempts < 1) {
            throw new Error('Invalid attempts: must be at least 1');
        }
        
        if (typeof timeSpent !== 'number' || timeSpent < 0) {
            throw new Error('Invalid timeSpent: must be non-negative');
        }
        
        if (typeof accuracy !== 'number' || accuracy < 0 || accuracy > 100) {
            throw new Error('Invalid accuracy: must be between 0 and 100');
        }
        
        // Default weights
        const {
            accuracyWeight = 0.5,
            attemptsWeight = 0.3,
            timeWeight = 0.2
        } = weights;
        
        // Validate weights sum to 1
        const totalWeight = accuracyWeight + attemptsWeight + timeWeight;
        if (Math.abs(totalWeight - 1) > 0.01) {
            throw new Error('Weights must sum to 1');
        }
        
        // Calculate component scores
        
        // Accuracy score (0-100)
        const accuracyScore = accuracy;
        
        // Attempts score (100 for 1 attempt, decreases with more attempts)
        const attemptsScore = Math.max(0, 100 - (attempts - 1) * 15);
        
        // Time score (100 for < 30s, decreases linearly)
        let timeScore;
        if (timeSpent <= 30) {
            timeScore = 100;
        } else if (timeSpent <= 180) {
            timeScore = 100 - ((timeSpent - 30) / 150) * 50; // Linear from 100 to 50
        } else {
            timeScore = Math.max(0, 50 - ((timeSpent - 180) / 180) * 50); // Linear from 50 to 0
        }
        
        // Calculate weighted score
        const score = Math.round(
            accuracyScore * accuracyWeight +
            attemptsScore * attemptsWeight +
            timeScore * timeWeight
        );
        
        // Determine grade
        let grade;
        if (score >= 90) grade = 'A';
        else if (score >= 80) grade = 'B';
        else if (score >= 70) grade = 'C';
        else if (score >= 60) grade = 'D';
        else grade = 'F';
        
        return {
            score: Math.max(0, Math.min(100, score)),
            grade: grade,
            breakdown: {
                accuracyScore: Math.round(accuracyScore),
                attemptsScore: Math.round(attemptsScore),
                timeScore: Math.round(timeScore),
                weights: {
                    accuracy: accuracyWeight,
                    attempts: attemptsWeight,
                    time: timeWeight
                }
            }
        };
    }
    
    /**
     * Formats feedback message based on validation results
     * 
     * Generates user-friendly feedback text based on correctness and values.
     * 
     * @param {boolean} isCorrect - Whether the answer is correct
     * @param {number} given - User's answer
     * @param {number} expected - Expected answer
     * @param {Object} [options] - Formatting options
     * @param {string} [options.unit=''] - Unit of measurement (e.g., 'units', 'kg')
     * @param {string} [options.context=''] - Context for the feedback (e.g., 'balloon', 'bunny')
     * @param {boolean} [options.showHint=true] - Whether to include hints
     * @returns {{title: string, message: string, hint: string}} Formatted feedback
     * 
     * @example
     * // Generate feedback for incorrect balloon inflation
     * const feedback = LevelValidationService.formatFeedback(
     *   false, 5, 7,
     *   {unit: 'units of air', context: 'balloon'}
     * );
     * console.log(feedback.title);   // "Too Little Air!"
     * console.log(feedback.message); // "You gave 5 units of air, but needed 7 units of air."
     * console.log(feedback.hint);    // "Try increasing the air pressure."
     */
    static formatFeedback(isCorrect, given, expected, options = {}) {
        const {
            unit = '',
            context = '',
            showHint = true
        } = options;
        
        // Format numbers for display
        const givenStr = this._formatNumber(given);
        const expectedStr = this._formatNumber(expected);
        const unitStr = unit ? ` ${unit}` : '';
        
        let title, message, hint = '';
        
        if (isCorrect) {
            // Success messages
            const successTitles = [
                '🎉 Perfect!',
                '✨ Excellent!',
                '🌟 Great Job!',
                '👏 Well Done!'
            ];
            title = successTitles[Math.floor(Math.random() * successTitles.length)];
            
            message = `You got it exactly right! ${givenStr}${unitStr} is perfect.`;
            
            if (context === 'balloon') {
                hint = 'The balloon is perfectly inflated!';
            } else if (context === 'bunny') {
                hint = 'The bunny is happily fed!';
            } else {
                hint = 'You found the correct value!';
            }
        } else {
            const difference = given - expected;
            const absDiff = Math.abs(difference);
            const percentDiff = expected !== 0 ? Math.abs(difference / expected) * 100 : 100;
            
            if (difference < 0) {
                // Too low
                title = context === 'balloon' ? '😟 Not Enough Air!' : 
                        context === 'bunny' ? '😢 Bunny Still Hungry!' : 
                        '📉 Too Low!';
                
                message = `You gave ${givenStr}${unitStr}, but needed ${expectedStr}${unitStr}.`;
                
                if (showHint) {
                    if (percentDiff > 50) {
                        hint = `You need significantly more - try increasing by ${this._formatNumber(absDiff)}${unitStr}.`;
                    } else if (percentDiff > 20) {
                        hint = `Getting closer! Increase by about ${this._formatNumber(absDiff)}${unitStr}.`;
                    } else {
                        hint = `Almost there! Just a bit more.`;
                    }
                }
            } else {
                // Too high
                title = context === 'balloon' ? '💥 Too Much Air!' : 
                        context === 'bunny' ? '😵 Bunny Overfed!' : 
                        '📈 Too High!';
                
                message = `You gave ${givenStr}${unitStr}, but only needed ${expectedStr}${unitStr}.`;
                
                if (showHint) {
                    if (percentDiff > 50) {
                        hint = `Way too much! Try decreasing by ${this._formatNumber(absDiff)}${unitStr}.`;
                    } else if (percentDiff > 20) {
                        hint = `Getting closer! Decrease by about ${this._formatNumber(absDiff)}${unitStr}.`;
                    } else {
                        hint = `Almost there! Just a bit less.`;
                    }
                }
            }
        }
        
        return {
            title,
            message,
            hint: showHint ? hint : ''
        };
    }
    
    /**
     * Validates parameter ranges for gradient descent
     * 
     * Checks if parameters are within reasonable ranges for the level.
     * 
     * @param {Object} params - Parameters to validate {w, b}
     * @param {Object} expectedParams - Expected parameters {w, b}
     * @param {Object} [ranges] - Valid ranges
     * @returns {{valid: boolean, warnings: string[]}} Validation result
     * 
     * @example
     * const result = LevelValidationService.validateParameters(
     *   {w: 7.1, b: 0.2},
     *   {w: 7, b: 0},
     *   {wRange: [0, 10], bRange: [-5, 5]}
     * );
     */
    static validateParameters(params, expectedParams, ranges = {}) {
        const {
            wRange = [-100, 100],
            bRange = [-100, 100],
            tolerance = 0.1
        } = ranges;
        
        const warnings = [];
        let valid = true;
        
        // Check w parameter
        if (params.w < wRange[0] || params.w > wRange[1]) {
            warnings.push(`w (${params.w}) is outside valid range [${wRange[0]}, ${wRange[1]}]`);
            valid = false;
        }
        
        // Check b parameter if present
        if ('b' in params && (params.b < bRange[0] || params.b > bRange[1])) {
            warnings.push(`b (${params.b}) is outside valid range [${bRange[0]}, ${bRange[1]}]`);
            valid = false;
        }
        
        // Check if close to expected
        const wError = Math.abs(params.w - expectedParams.w);
        const bError = 'b' in params ? Math.abs(params.b - (expectedParams.b || 0)) : 0;
        
        if (wError < tolerance && bError < tolerance) {
            warnings.push('Parameters are very close to optimal!');
        }
        
        return { valid, warnings };
    }
    
    /**
     * Calculates performance metrics for a training session
     * 
     * @param {Array} history - Training history from gradient descent
     * @returns {Object} Performance metrics
     * 
     * @example
     * const metrics = LevelValidationService.calculatePerformanceMetrics(trainingHistory);
     * console.log(metrics.convergenceRate);
     * console.log(metrics.finalAccuracy);
     */
    static calculatePerformanceMetrics(history) {
        if (!Array.isArray(history) || history.length === 0) {
            throw new Error('Invalid history: must be non-empty array');
        }
        
        const initialLoss = history[0].loss;
        const finalLoss = history[history.length - 1].loss;
        const iterations = history.length;
        
        // Calculate convergence rate (loss reduction per iteration)
        const convergenceRate = initialLoss > 0 
            ? (initialLoss - finalLoss) / (initialLoss * iterations)
            : 0;
        
        // Calculate stability (variance in loss reduction)
        let lossChanges = [];
        for (let i = 1; i < history.length; i++) {
            lossChanges.push(history[i - 1].loss - history[i].loss);
        }
        
        const avgChange = lossChanges.reduce((a, b) => a + b, 0) / lossChanges.length;
        const variance = lossChanges.reduce((sum, change) => {
            return sum + Math.pow(change - avgChange, 2);
        }, 0) / lossChanges.length;
        
        const stability = 1 / (1 + Math.sqrt(variance)); // Higher is more stable
        
        // Calculate final accuracy (based on how close to zero the loss is)
        const finalAccuracy = Math.max(0, 100 * (1 - finalLoss / initialLoss));
        
        return {
            iterations,
            initialLoss: Math.round(initialLoss * 1000) / 1000,
            finalLoss: Math.round(finalLoss * 1000) / 1000,
            lossReduction: Math.round((initialLoss - finalLoss) * 1000) / 1000,
            convergenceRate: Math.round(convergenceRate * 10000) / 10000,
            stability: Math.round(stability * 100) / 100,
            finalAccuracy: Math.round(finalAccuracy * 100) / 100
        };
    }
    
    /**
     * Helper to format numbers for display
     * @private
     */
    static _formatNumber(num) {
        if (Math.abs(num) >= 1000) {
            return num.toLocaleString();
        }
        if (Math.abs(num) < 0.01 && num !== 0) {
            return num.toExponential(2);
        }
        return Math.round(num * 100) / 100;
    }
}

// Export for both ES6 modules and CommonJS
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LevelValidationService;
} else if (typeof window !== 'undefined') {
    window.LevelValidationService = LevelValidationService;
}

/*
 * USAGE EXAMPLES:
 * 
 * 1. Balloon Validation:
 * =====================
 * const result = LevelValidationService.checkBalloonInflation(7.3, 7.0, 0.05);
 * if (result.isCorrect) {
 *   console.log('Perfect inflation!');
 * } else {
 *   console.log(`Status: ${result.status}, off by ${result.percentDiff}%`);
 * }
 * 
 * 2. Bunny Feeding Validation:
 * ===========================
 * const result = LevelValidationService.checkBunnyFeeding(25, 24);
 * const feedback = LevelValidationService.formatFeedback(
 *   result.isCorrect, 25, 24,
 *   {unit: 'hay units', context: 'bunny'}
 * );
 * console.log(feedback.title);
 * console.log(feedback.message);
 * 
 * 3. Score Calculation:
 * ====================
 * const score = LevelValidationService.calculateScore(
 *   2,    // attempts
 *   65,   // seconds
 *   95    // accuracy percentage
 * );
 * console.log(`Score: ${score.score} (Grade: ${score.grade})`);
 * console.log('Breakdown:', score.breakdown);
 * 
 * 4. Performance Metrics:
 * ======================
 * const metrics = LevelValidationService.calculatePerformanceMetrics(trainingHistory);
 * console.log(`Converged in ${metrics.iterations} iterations`);
 * console.log(`Final accuracy: ${metrics.finalAccuracy}%`);
 */