/**
 * Gradient Descent Service
 * 
 * Pure functions for machine learning calculations used in MLTEACH levels.
 * No DOM manipulation or side effects - just mathematical computations.
 * 
 * This service provides:
 * - Loss calculation functions (L1, L2)
 * - Gradient computation
 * - Parameter updates
 * - Convergence checking
 * - Batch processing utilities
 */

// Make GradientDescentService available globally
window.GradientDescentService = class GradientDescentService {
    
    /**
     * Calculates L1 (Mean Absolute Error) loss between predicted and actual values
     * 
     * L1 loss is the absolute difference between predicted and actual values.
     * Less sensitive to outliers compared to L2 loss.
     * 
     * @param {number|number[]} predicted - Predicted value(s)
     * @param {number|number[]} actual - Actual/target value(s)
     * @returns {number} L1 loss value
     * @throws {Error} If inputs are invalid or mismatched
     * 
     * @example
     * // Single value
     * const loss = GradientDescentService.calculateL1Loss(5, 3); // Returns 2
     * 
     * @example
     * // Array of values
     * const loss = GradientDescentService.calculateL1Loss([5, 10], [3, 8]); // Returns 4 (mean of [2, 2])
     */
    static calculateL1Loss(predicted, actual) {
        // Input validation
        if (predicted === null || predicted === undefined || actual === null || actual === undefined) {
            throw new Error('Invalid input: predicted and actual values are required');
        }
        
        // Handle single values
        if (typeof predicted === 'number' && typeof actual === 'number') {
            return Math.abs(predicted - actual);
        }
        
        // Handle arrays
        if (Array.isArray(predicted) && Array.isArray(actual)) {
            if (predicted.length !== actual.length) {
                throw new Error('Array length mismatch: predicted and actual must have same length');
            }
            
            if (predicted.length === 0) {
                throw new Error('Empty arrays provided');
            }
            
            let totalLoss = 0;
            for (let i = 0; i < predicted.length; i++) {
                if (typeof predicted[i] !== 'number' || typeof actual[i] !== 'number') {
                    throw new Error(`Invalid array element at index ${i}: must be numbers`);
                }
                totalLoss += Math.abs(predicted[i] - actual[i]);
            }
            
            return totalLoss / predicted.length; // Return mean absolute error
        }
        
        throw new Error('Input type mismatch: both inputs must be numbers or arrays');
    }
    
    /**
     * Calculates L2 (Mean Squared Error) loss between predicted and actual values
     * 
     * L2 loss is the squared difference between predicted and actual values.
     * More sensitive to outliers, penalizes large errors more heavily.
     * 
     * @param {number|number[]} predicted - Predicted value(s)
     * @param {number|number[]} actual - Actual/target value(s)
     * @returns {number} L2 loss value
     * @throws {Error} If inputs are invalid or mismatched
     * 
     * @example
     * // Single value
     * const loss = GradientDescentService.calculateL2Loss(5, 3); // Returns 4 (2²)
     * 
     * @example
     * // Array of values
     * const loss = GradientDescentService.calculateL2Loss([5, 10], [3, 8]); // Returns 4 (mean of [4, 4])
     */
    static calculateL2Loss(predicted, actual) {
        // Input validation
        if (predicted === null || predicted === undefined || actual === null || actual === undefined) {
            throw new Error('Invalid input: predicted and actual values are required');
        }
        
        // Handle single values
        if (typeof predicted === 'number' && typeof actual === 'number') {
            const diff = predicted - actual;
            return diff * diff;
        }
        
        // Handle arrays
        if (Array.isArray(predicted) && Array.isArray(actual)) {
            if (predicted.length !== actual.length) {
                throw new Error('Array length mismatch: predicted and actual must have same length');
            }
            
            if (predicted.length === 0) {
                throw new Error('Empty arrays provided');
            }
            
            let totalLoss = 0;
            for (let i = 0; i < predicted.length; i++) {
                if (typeof predicted[i] !== 'number' || typeof actual[i] !== 'number') {
                    throw new Error(`Invalid array element at index ${i}: must be numbers`);
                }
                const diff = predicted[i] - actual[i];
                totalLoss += diff * diff;
            }
            
            return totalLoss / predicted.length; // Return mean squared error
        }
        
        throw new Error('Input type mismatch: both inputs must be numbers or arrays');
    }
    
    /**
     * Calculates gradients for gradient descent optimization
     * 
     * Computes the gradient (direction and magnitude of change) for parameters
     * based on the loss function and training data.
     * 
     * @param {number} w - Current weight/slope parameter
     * @param {number} [b=0] - Current bias/intercept parameter (optional)
     * @param {Array<{x: number, y: number}>} data - Training data points
     * @param {string} [lossType='L1'] - Type of loss function ('L1' or 'L2')
     * @returns {{gradW: number, gradB: number}} Gradients for w and b
     * @throws {Error} If inputs are invalid
     * 
     * @example
     * // Calculate gradients for simple linear regression
     * const data = [
     *   {x: 1, y: 7},
     *   {x: 2, y: 14},
     *   {x: 3, y: 21}
     * ];
     * const gradients = GradientDescentService.calculateGradient(5, 0, data, 'L1');
     * console.log(gradients); // {gradW: -6, gradB: -3}
     * 
     * @example
     * // With bias term
     * const gradients = GradientDescentService.calculateGradient(3, 10, data, 'L2');
     */
    static calculateGradient(w, b = 0, data, lossType = 'L1') {
        // Input validation
        if (typeof w !== 'number') {
            throw new Error('Invalid w parameter: must be a number');
        }
        
        if (typeof b !== 'number') {
            throw new Error('Invalid b parameter: must be a number');
        }
        
        if (!Array.isArray(data) || data.length === 0) {
            throw new Error('Invalid data: must be non-empty array');
        }
        
        if (!['L1', 'L2'].includes(lossType)) {
            throw new Error('Invalid lossType: must be "L1" or "L2"');
        }
        
        // Validate data points
        for (let i = 0; i < data.length; i++) {
            if (!data[i] || typeof data[i].x !== 'number' || typeof data[i].y !== 'number') {
                throw new Error(`Invalid data point at index ${i}: must have numeric x and y properties`);
            }
        }
        
        let gradW = 0;
        let gradB = 0;
        
        // Calculate gradients based on loss type
        if (lossType === 'L1') {
            // L1 gradient (using sign function for derivative of absolute value)
            for (const point of data) {
                const predicted = w * point.x + b;
                const error = predicted - point.y;
                const sign = error > 0 ? 1 : (error < 0 ? -1 : 0);
                
                gradW += sign * point.x;
                gradB += sign;
            }
        } else { // L2
            // L2 gradient (derivative of squared error)
            for (const point of data) {
                const predicted = w * point.x + b;
                const error = predicted - point.y;
                
                gradW += 2 * error * point.x;
                gradB += 2 * error;
            }
        }
        
        // Average gradients over data points
        gradW /= data.length;
        gradB /= data.length;
        
        return { gradW, gradB };
    }
    
    /**
     * Performs a gradient descent step to update parameters
     * 
     * Updates parameters in the direction opposite to the gradient,
     * scaled by the learning rate.
     * 
     * @param {Object} params - Current parameters {w: number, b: number}
     * @param {Object} gradients - Gradients {gradW: number, gradB: number}
     * @param {number|Object} learningRate - Learning rate (number or {w: number, b: number} for different rates)
     * @returns {{w: number, b: number}} Updated parameters
     * @throws {Error} If inputs are invalid
     * 
     * @example
     * // Simple update with single learning rate
     * const params = {w: 5, b: 0};
     * const gradients = {gradW: 2, gradB: 1};
     * const newParams = GradientDescentService.performStep(params, gradients, 0.1);
     * console.log(newParams); // {w: 4.8, b: -0.1}
     * 
     * @example
     * // Different learning rates for w and b
     * const learningRates = {w: 0.01, b: 0.1};
     * const newParams = GradientDescentService.performStep(params, gradients, learningRates);
     */
    static performStep(params, gradients, learningRate) {
        // Input validation
        if (!params || typeof params.w !== 'number') {
            throw new Error('Invalid params: must have numeric w property');
        }
        
        if (!gradients || typeof gradients.gradW !== 'number') {
            throw new Error('Invalid gradients: must have numeric gradW property');
        }
        
        // Handle optional bias
        const hasB = 'b' in params;
        if (hasB && typeof params.b !== 'number') {
            throw new Error('Invalid params.b: must be a number if provided');
        }
        
        if (hasB && typeof gradients.gradB !== 'number') {
            throw new Error('Invalid gradients.gradB: must be a number if b is in params');
        }
        
        // Parse learning rate
        let lrW, lrB;
        if (typeof learningRate === 'number') {
            if (learningRate <= 0) {
                throw new Error('Learning rate must be positive');
            }
            lrW = lrB = learningRate;
        } else if (typeof learningRate === 'object') {
            lrW = learningRate.w;
            lrB = learningRate.b;
            
            if (typeof lrW !== 'number' || lrW <= 0) {
                throw new Error('Learning rate for w must be a positive number');
            }
            if (hasB && (typeof lrB !== 'number' || lrB <= 0)) {
                throw new Error('Learning rate for b must be a positive number');
            }
        } else {
            throw new Error('Invalid learningRate: must be number or object with w and b properties');
        }
        
        // Perform gradient descent step
        const newParams = {
            w: params.w - lrW * gradients.gradW
        };
        
        if (hasB) {
            newParams.b = params.b - lrB * gradients.gradB;
        }
        
        return newParams;
    }
    
    /**
     * Checks if the optimization has converged
     * 
     * Determines if the loss is below a threshold or if parameters
     * have stopped changing significantly.
     * 
     * @param {number} currentLoss - Current loss value
     * @param {number} [threshold=0.01] - Convergence threshold
     * @param {number} [previousLoss=null] - Previous loss for change detection
     * @param {number} [minImprovement=0.0001] - Minimum improvement to continue
     * @returns {{converged: boolean, reason: string}} Convergence status and reason
     * 
     * @example
     * // Check absolute convergence
     * const status = GradientDescentService.checkConvergence(0.005, 0.01);
     * console.log(status); // {converged: true, reason: 'Loss below threshold'}
     * 
     * @example
     * // Check relative improvement
     * const status = GradientDescentService.checkConvergence(10, 0.01, 10.001);
     * console.log(status); // {converged: true, reason: 'Insufficient improvement'}
     */
    static checkConvergence(currentLoss, threshold = 0.01, previousLoss = null, minImprovement = 0.0001) {
        // Input validation
        if (typeof currentLoss !== 'number' || currentLoss < 0) {
            throw new Error('Invalid currentLoss: must be non-negative number');
        }
        
        if (typeof threshold !== 'number' || threshold <= 0) {
            throw new Error('Invalid threshold: must be positive number');
        }
        
        // Check absolute convergence
        if (currentLoss < threshold) {
            return {
                converged: true,
                reason: 'Loss below threshold'
            };
        }
        
        // Check relative improvement if previous loss provided
        if (previousLoss !== null) {
            if (typeof previousLoss !== 'number' || previousLoss < 0) {
                throw new Error('Invalid previousLoss: must be non-negative number');
            }
            
            const improvement = previousLoss - currentLoss;
            const relativeImprovement = previousLoss > 0 ? improvement / previousLoss : 0;
            
            if (improvement < minImprovement || relativeImprovement < minImprovement) {
                return {
                    converged: true,
                    reason: 'Insufficient improvement'
                };
            }
            
            // Check if loss is increasing (diverging)
            if (improvement < 0) {
                return {
                    converged: false,
                    reason: 'Loss increasing - consider reducing learning rate'
                };
            }
        }
        
        return {
            converged: false,
            reason: 'Optimization in progress'
        };
    }
    
    /**
     * Calculates the optimal learning rate using line search
     * 
     * Finds a learning rate that minimizes the loss for the current gradient.
     * 
     * @param {Object} params - Current parameters {w, b}
     * @param {Object} gradients - Current gradients {gradW, gradB}
     * @param {Array<{x: number, y: number}>} data - Training data
     * @param {string} [lossType='L1'] - Loss function type
     * @param {number} [maxRate=1] - Maximum learning rate to try
     * @param {number} [steps=10] - Number of rates to test
     * @returns {number} Optimal learning rate
     * 
     * @example
     * const optimalRate = GradientDescentService.findOptimalLearningRate(
     *   {w: 5, b: 0},
     *   {gradW: 2, gradB: 1},
     *   data,
     *   'L2'
     * );
     */
    static findOptimalLearningRate(params, gradients, data, lossType = 'L1', maxRate = 1, steps = 10) {
        let bestRate = 0.001; // Default small rate
        let bestLoss = Infinity;
        
        for (let i = 1; i <= steps; i++) {
            const rate = (maxRate * i) / steps;
            
            // Calculate new parameters with this rate
            const newParams = this.performStep(params, gradients, rate);
            
            // Calculate loss with new parameters
            let totalLoss = 0;
            for (const point of data) {
                const predicted = newParams.w * point.x + (newParams.b || 0);
                const loss = lossType === 'L1' 
                    ? this.calculateL1Loss(predicted, point.y)
                    : this.calculateL2Loss(predicted, point.y);
                totalLoss += loss;
            }
            
            if (totalLoss < bestLoss) {
                bestLoss = totalLoss;
                bestRate = rate;
            }
        }
        
        return bestRate;
    }
    
    /**
     * Performs batch gradient descent for multiple iterations
     * 
     * Runs gradient descent for a specified number of iterations or until convergence.
     * 
     * @param {Object} initialParams - Starting parameters {w, b}
     * @param {Array<{x: number, y: number}>} data - Training data
     * @param {Object} options - Training options
     * @param {number} [options.maxIterations=100] - Maximum iterations
     * @param {number} [options.learningRate=0.01] - Learning rate
     * @param {string} [options.lossType='L1'] - Loss function type
     * @param {number} [options.convergenceThreshold=0.01] - Convergence threshold
     * @param {boolean} [options.verbose=false] - Log progress
     * @returns {{params: Object, history: Array, converged: boolean}} Training results
     * 
     * @example
     * const result = GradientDescentService.train(
     *   {w: 0, b: 0},
     *   trainingData,
     *   {maxIterations: 50, learningRate: 0.1, verbose: true}
     * );
     * console.log('Final params:', result.params);
     * console.log('Converged:', result.converged);
     */
    static train(initialParams, data, options = {}) {
        const {
            maxIterations = 100,
            learningRate = 0.01,
            lossType = 'L1',
            convergenceThreshold = 0.01,
            verbose = false
        } = options;
        
        let params = { ...initialParams };
        const history = [];
        let previousLoss = null;
        let converged = false;
        
        for (let iteration = 0; iteration < maxIterations; iteration++) {
            // Calculate current loss
            let currentLoss = 0;
            for (const point of data) {
                const predicted = params.w * point.x + (params.b || 0);
                const loss = lossType === 'L1' 
                    ? this.calculateL1Loss(predicted, point.y)
                    : this.calculateL2Loss(predicted, point.y);
                currentLoss += loss;
            }
            currentLoss /= data.length;
            
            // Check convergence
            const convergenceStatus = this.checkConvergence(
                currentLoss, 
                convergenceThreshold, 
                previousLoss
            );
            
            if (convergenceStatus.converged) {
                converged = true;
                if (verbose) {
                    console.log(`Converged at iteration ${iteration}: ${convergenceStatus.reason}`);
                }
                history.push({ iteration, params: { ...params }, loss: currentLoss });
                break;
            }
            
            // Calculate gradients
            const gradients = this.calculateGradient(
                params.w, 
                params.b || 0, 
                data, 
                lossType
            );
            
            // Update parameters
            params = this.performStep(params, gradients, learningRate);
            
            // Record history
            history.push({ 
                iteration, 
                params: { ...params }, 
                loss: currentLoss,
                gradients: { ...gradients }
            });
            
            if (verbose && iteration % 10 === 0) {
                console.log(`Iteration ${iteration}: Loss = ${currentLoss.toFixed(4)}, w = ${params.w.toFixed(4)}, b = ${(params.b || 0).toFixed(4)}`);
            }
            
            previousLoss = currentLoss;
        }
        
        return {
            params,
            history,
            converged
        };
    }
}

// Export for both ES6 modules and CommonJS
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GradientDescentService;
} else if (typeof window !== 'undefined') {
    window.GradientDescentService = GradientDescentService;
}

/*
 * USAGE EXAMPLES:
 * 
 * 1. Basic Loss Calculation:
 * =========================
 * const loss1 = GradientDescentService.calculateL1Loss(10, 7); // 3
 * const loss2 = GradientDescentService.calculateL2Loss(10, 7); // 9
 * 
 * 2. Gradient Calculation:
 * =======================
 * const data = [
 *   {x: 1, y: 3},
 *   {x: 2, y: 5},
 *   {x: 3, y: 7}
 * ];
 * const gradients = GradientDescentService.calculateGradient(1, 1, data, 'L2');
 * 
 * 3. Parameter Update:
 * ===================
 * const params = {w: 2, b: 1};
 * const gradients = {gradW: 0.5, gradB: 0.2};
 * const newParams = GradientDescentService.performStep(params, gradients, 0.1);
 * 
 * 4. Full Training:
 * ================
 * const trainingData = [
 *   {x: 1, y: 7},
 *   {x: 2, y: 14},
 *   {x: 3, y: 21},
 *   {x: 4, y: 28}
 * ];
 * 
 * const result = GradientDescentService.train(
 *   {w: 0, b: 0},
 *   trainingData,
 *   {
 *     maxIterations: 100,
 *     learningRate: 0.01,
 *     lossType: 'L2',
 *     verbose: true
 *   }
 * );
 * 
 * console.log('Learned parameters:', result.params);
 * console.log('Training converged:', result.converged);
 */