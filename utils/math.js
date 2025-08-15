/**
 * Mathematical Utility Functions
 * 
 * Collection of mathematical helper functions for calculations, interpolation,
 * and numerical operations commonly used throughout the MLTEACH application.
 * 
 * @fileoverview Mathematical utilities for calculations and numerical operations
 * @author MLTEACH Team
 * @version 1.0.0
 * 
 * Features:
 * - Linear interpolation and easing functions
 * - Number clamping and rounding utilities
 * - Random number generation with ranges
 * - Statistical calculations
 * - Gradient descent mathematical helpers
 * - Accuracy and error calculations
 */

/**
 * Linear interpolation between two values
 * 
 * @param {number} start - Starting value
 * @param {number} end - Ending value
 * @param {number} progress - Progress from 0 to 1
 * @returns {number} Interpolated value
 * 
 * @example
 * // Basic interpolation
 * lerp(0, 100, 0.5); // Returns 50
 * lerp(10, 20, 0.25); // Returns 12.5
 * 
 * // Animation usage
 * const currentFrame = lerp(startPosition, endPosition, animationProgress);
 * 
 * @description
 * Performs linear interpolation between two values based on a progress value.
 * Commonly used for animations, gradual value changes, and smooth transitions.
 * Progress values outside 0-1 will extrapolate beyond the start/end range.
 */
export function lerp(start, end, progress) {
    if (typeof start !== 'number' || typeof end !== 'number' || typeof progress !== 'number') {
        console.warn('lerp: All parameters must be numbers');
        return start;
    }
    
    if (isNaN(start) || isNaN(end) || isNaN(progress)) {
        console.warn('lerp: NaN values detected');
        return start;
    }
    
    return start + (end - start) * progress;
}

/**
 * Clamps a value between minimum and maximum bounds
 * 
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum allowed value
 * @param {number} max - Maximum allowed value
 * @returns {number} Clamped value
 * 
 * @example
 * clamp(15, 0, 10);   // Returns 10
 * clamp(-5, 0, 10);   // Returns 0
 * clamp(5, 0, 10);    // Returns 5
 * 
 * // Parameter validation
 * const userInput = clamp(parseFloat(input.value), slider.min, slider.max);
 * 
 * @description
 * Ensures a value stays within specified bounds. Essential for parameter
 * validation, slider controls, and preventing out-of-range calculations.
 * Handles edge cases where min > max by swapping the values.
 */
export function clamp(value, min, max) {
    if (typeof value !== 'number' || typeof min !== 'number' || typeof max !== 'number') {
        console.warn('clamp: All parameters must be numbers');
        return value;
    }
    
    if (isNaN(value) || isNaN(min) || isNaN(max)) {
        console.warn('clamp: NaN values detected');
        return value;
    }
    
    // Handle case where min > max
    if (min > max) {
        [min, max] = [max, min];
    }
    
    return Math.min(Math.max(value, min), max);
}

/**
 * Rounds a number to specified decimal places
 * 
 * @param {number} value - Number to round
 * @param {number} [decimals=0] - Number of decimal places
 * @returns {number} Rounded number
 * 
 * @example
 * roundTo(3.14159, 2);    // Returns 3.14
 * roundTo(3.14159, 0);    // Returns 3
 * roundTo(3.14159);       // Returns 3 (default 0 decimals)
 * roundTo(1234.5678, -1); // Returns 1230 (negative decimals)
 * 
 * @description
 * Provides precise decimal rounding using the standard rounding method.
 * Supports negative decimal places for rounding to tens, hundreds, etc.
 * More reliable than toFixed() for mathematical operations.
 */
export function roundTo(value, decimals = 0) {
    if (typeof value !== 'number') {
        console.warn('roundTo: value must be a number');
        return value;
    }
    
    if (typeof decimals !== 'number' || !Number.isInteger(decimals)) {
        console.warn('roundTo: decimals must be an integer');
        return value;
    }
    
    if (isNaN(value)) {
        return NaN;
    }
    
    const multiplier = Math.pow(10, decimals);
    return Math.round(value * multiplier) / multiplier;
}

/**
 * Generates a random number between min and max (inclusive)
 * 
 * @param {number} min - Minimum value (inclusive)
 * @param {number} max - Maximum value (inclusive)
 * @param {number} [decimals] - Number of decimal places (optional)
 * @returns {number} Random number in range
 * 
 * @example
 * // Integer range
 * randomBetween(1, 10);      // Returns integer 1-10
 * 
 * // Float range
 * randomBetween(0, 1, 2);    // Returns float 0.00-1.00 with 2 decimals
 * 
 * // Negative ranges
 * randomBetween(-5, 5, 1);   // Returns float -5.0 to 5.0
 * 
 * @description
 * Generates random numbers within specified ranges. Supports both integer
 * and floating-point generation. Useful for test data, initial values,
 * and randomized demonstrations.
 */
export function randomBetween(min, max, decimals) {
    if (typeof min !== 'number' || typeof max !== 'number') {
        console.warn('randomBetween: min and max must be numbers');
        return min;
    }
    
    if (isNaN(min) || isNaN(max)) {
        console.warn('randomBetween: NaN values detected');
        return min;
    }
    
    // Swap if min > max
    if (min > max) {
        [min, max] = [max, min];
    }
    
    const randomValue = Math.random() * (max - min) + min;
    
    if (typeof decimals === 'number') {
        return roundTo(randomValue, decimals);
    }
    
    return randomValue;
}

/**
 * Maps a value from one range to another range
 * 
 * @param {number} value - Value to map
 * @param {number} fromMin - Source range minimum
 * @param {number} fromMax - Source range maximum
 * @param {number} toMin - Target range minimum
 * @param {number} toMax - Target range maximum
 * @returns {number} Mapped value
 * 
 * @example
 * // Map 0-100 range to 0-1 range
 * mapRange(50, 0, 100, 0, 1); // Returns 0.5
 * 
 * // Map slider value to parameter range
 * const parameter = mapRange(sliderValue, 0, 100, -10, 10);
 * 
 * @description
 * Linear mapping between two ranges. Commonly used for converting slider
 * values to parameter ranges, scaling coordinates, and range conversions.
 */
export function mapRange(value, fromMin, fromMax, toMin, toMax) {
    const params = [value, fromMin, fromMax, toMin, toMax];
    if (params.some(p => typeof p !== 'number' || isNaN(p))) {
        console.warn('mapRange: All parameters must be valid numbers');
        return value;
    }
    
    if (fromMin === fromMax) {
        console.warn('mapRange: Source range cannot have zero width');
        return toMin;
    }
    
    const fromRange = fromMax - fromMin;
    const toRange = toMax - toMin;
    const scaleFactor = toRange / fromRange;
    
    return toMin + (value - fromMin) * scaleFactor;
}

/**
 * Calculates the percentage difference between two values
 * 
 * @param {number} value - Current value
 * @param {number} target - Target value
 * @returns {number} Percentage difference (can be negative)
 * 
 * @example
 * percentageDifference(90, 100);  // Returns -10 (10% below target)
 * percentageDifference(110, 100); // Returns 10 (10% above target)
 * percentageDifference(100, 100); // Returns 0 (exact match)
 * 
 * @description
 * Calculates how much a value differs from a target as a percentage.
 * Positive values indicate above target, negative values below target.
 * Used for accuracy calculations and progress measurements.
 */
export function percentageDifference(value, target) {
    if (typeof value !== 'number' || typeof target !== 'number') {
        console.warn('percentageDifference: Both parameters must be numbers');
        return 0;
    }
    
    if (isNaN(value) || isNaN(target)) {
        console.warn('percentageDifference: NaN values detected');
        return 0;
    }
    
    if (target === 0) {
        return value === 0 ? 0 : Infinity;
    }
    
    return ((value - target) / Math.abs(target)) * 100;
}

/**
 * Calculates accuracy percentage between actual and target values
 * 
 * @param {number} actual - Actual value
 * @param {number} target - Target/expected value
 * @param {number} [maxError=Infinity] - Maximum allowed error
 * @returns {number} Accuracy percentage from 0-100
 * 
 * @example
 * calculateAccuracy(9.5, 10);     // Returns 95% (5% error)
 * calculateAccuracy(10, 10);      // Returns 100% (perfect match)
 * calculateAccuracy(5, 10, 2);    // Returns 0% (error exceeds maxError)
 * 
 * @description
 * Calculates how accurate a value is compared to a target, returning
 * a percentage from 0-100. Used for scoring and validation in levels.
 */
export function calculateAccuracy(actual, target, maxError = Infinity) {
    if (typeof actual !== 'number' || typeof target !== 'number') {
        console.warn('calculateAccuracy: actual and target must be numbers');
        return 0;
    }
    
    if (isNaN(actual) || isNaN(target)) {
        return 0;
    }
    
    if (target === 0) {
        return actual === 0 ? 100 : 0;
    }
    
    const error = Math.abs(actual - target);
    const relativeError = error / Math.abs(target);
    
    if (error > maxError) {
        return 0;
    }
    
    const accuracy = Math.max(0, 100 * (1 - relativeError));
    return roundTo(accuracy, 2);
}

/**
 * Calculates the distance between two points
 * 
 * @param {number} x1 - First point x coordinate
 * @param {number} y1 - First point y coordinate
 * @param {number} x2 - Second point x coordinate
 * @param {number} y2 - Second point y coordinate
 * @returns {number} Distance between points
 * 
 * @example
 * distance(0, 0, 3, 4); // Returns 5 (3-4-5 triangle)
 * distance(1, 1, 4, 5); // Returns 5
 * 
 * @description
 * Calculates Euclidean distance between two 2D points using the
 * Pythagorean theorem. Useful for collision detection, proximity
 * calculations, and geometric operations.
 */
export function distance(x1, y1, x2, y2) {
    const params = [x1, y1, x2, y2];
    if (params.some(p => typeof p !== 'number' || isNaN(p))) {
        console.warn('distance: All coordinates must be valid numbers');
        return 0;
    }
    
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Normalizes a value to 0-1 range based on min/max bounds
 * 
 * @param {number} value - Value to normalize
 * @param {number} min - Minimum bound
 * @param {number} max - Maximum bound
 * @returns {number} Normalized value between 0-1
 * 
 * @example
 * normalize(50, 0, 100);   // Returns 0.5
 * normalize(75, 50, 100);  // Returns 0.5
 * normalize(0, -10, 10);   // Returns 0.5
 * 
 * @description
 * Converts a value to a 0-1 normalized range based on its position
 * between min and max bounds. Essential for progress bars, animations,
 * and standardizing values for calculations.
 */
export function normalize(value, min, max) {
    const params = [value, min, max];
    if (params.some(p => typeof p !== 'number' || isNaN(p))) {
        console.warn('normalize: All parameters must be valid numbers');
        return 0;
    }
    
    if (min === max) {
        return 0;
    }
    
    return clamp((value - min) / (max - min), 0, 1);
}

/**
 * Calculates mean (average) of an array of numbers
 * 
 * @param {number[]} values - Array of numbers
 * @returns {number} Mean value
 * 
 * @example
 * mean([1, 2, 3, 4, 5]); // Returns 3
 * mean([10, 20, 30]);    // Returns 20
 * mean([]);              // Returns 0
 * 
 * @description
 * Calculates the arithmetic mean of a dataset. Handles empty arrays
 * and filters out invalid values. Used for statistical analysis
 * and progress calculations.
 */
export function mean(values) {
    if (!Array.isArray(values)) {
        console.warn('mean: Input must be an array');
        return 0;
    }
    
    const validValues = values.filter(v => typeof v === 'number' && !isNaN(v));
    
    if (validValues.length === 0) {
        return 0;
    }
    
    const sum = validValues.reduce((acc, val) => acc + val, 0);
    return sum / validValues.length;
}

/**
 * Calculates standard deviation of an array of numbers
 * 
 * @param {number[]} values - Array of numbers
 * @param {boolean} [sample=false] - Use sample standard deviation
 * @returns {number} Standard deviation
 * 
 * @example
 * standardDeviation([1, 2, 3, 4, 5]);        // Population std dev
 * standardDeviation([1, 2, 3, 4, 5], true);  // Sample std dev
 * 
 * @description
 * Calculates the standard deviation of a dataset. Supports both
 * population and sample standard deviation calculations. Used for
 * statistical analysis and data quality assessment.
 */
export function standardDeviation(values, sample = false) {
    if (!Array.isArray(values)) {
        console.warn('standardDeviation: Input must be an array');
        return 0;
    }
    
    const validValues = values.filter(v => typeof v === 'number' && !isNaN(v));
    
    if (validValues.length === 0) {
        return 0;
    }
    
    if (validValues.length === 1) {
        return 0;
    }
    
    const meanValue = mean(validValues);
    const squaredDifferences = validValues.map(v => Math.pow(v - meanValue, 2));
    const variance = squaredDifferences.reduce((acc, val) => acc + val, 0) / 
                    (validValues.length - (sample ? 1 : 0));
    
    return Math.sqrt(variance);
}

/**
 * Easing function for smooth animations (ease-in-out cubic)
 * 
 * @param {number} t - Time parameter (0-1)
 * @returns {number} Eased value (0-1)
 * 
 * @example
 * // Smooth animation progress
 * const easedProgress = easeInOutCubic(linearProgress);
 * const currentValue = lerp(start, end, easedProgress);
 * 
 * @description
 * Provides smooth easing for animations with slow start, fast middle,
 * and slow end. Creates more natural-feeling transitions than linear
 * interpolation. Commonly used for UI animations and value transitions.
 */
export function easeInOutCubic(t) {
    if (typeof t !== 'number' || isNaN(t)) {
        return 0;
    }
    
    t = clamp(t, 0, 1);
    
    return t < 0.5 
        ? 4 * t * t * t 
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Calculates greatest common divisor of two numbers
 * 
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Greatest common divisor
 * 
 * @example
 * gcd(12, 8);  // Returns 4
 * gcd(17, 13); // Returns 1 (coprime)
 * gcd(0, 5);   // Returns 5
 * 
 * @description
 * Uses Euclidean algorithm to find GCD. Useful for fraction simplification,
 * ratio calculations, and mathematical operations requiring reduced forms.
 */
export function gcd(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        console.warn('gcd: Both parameters must be numbers');
        return 1;
    }
    
    a = Math.abs(Math.floor(a));
    b = Math.abs(Math.floor(b));
    
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    
    return a || 1;
}

/**
 * Checks if a number is within a tolerance of another number
 * 
 * @param {number} value - Value to check
 * @param {number} target - Target value
 * @param {number} tolerance - Tolerance (absolute difference)
 * @returns {boolean} True if within tolerance
 * 
 * @example
 * isWithinTolerance(9.95, 10, 0.1);  // Returns true
 * isWithinTolerance(9.8, 10, 0.1);   // Returns false
 * isWithinTolerance(10, 10, 0);      // Returns true
 * 
 * @description
 * Checks if two numbers are approximately equal within a specified tolerance.
 * Essential for floating-point comparisons and success criteria in levels.
 */
export function isWithinTolerance(value, target, tolerance) {
    const params = [value, target, tolerance];
    if (params.some(p => typeof p !== 'number' || isNaN(p))) {
        console.warn('isWithinTolerance: All parameters must be valid numbers');
        return false;
    }
    
    if (tolerance < 0) {
        console.warn('isWithinTolerance: Tolerance must be non-negative');
        return false;
    }
    
    return Math.abs(value - target) <= tolerance;
}

// Export all functions as a grouped object
export const MATH = {
    lerp,
    clamp,
    roundTo,
    randomBetween,
    mapRange,
    percentageDifference,
    calculateAccuracy,
    distance,
    normalize,
    mean,
    standardDeviation,
    easeInOutCubic,
    gcd,
    isWithinTolerance
};