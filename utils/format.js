/**
 * Formatting Utility Functions
 * 
 * Collection of helper functions for formatting numbers, formulas, text,
 * and other display values used throughout the MLTEACH application.
 * 
 * @fileoverview Formatting utilities for display and presentation
 * @author MLTEACH Team
 * @version 1.0.0
 * 
 * Features:
 * - Mathematical formula formatting
 * - Number formatting with precision control
 * - Percentage and ratio formatting
 * - Time and duration formatting
 * - Text processing and display utilities
 */

/**
 * Formats a linear function formula in readable mathematical notation
 * 
 * @param {number} w - Weight/slope parameter
 * @param {number} [b=0] - Bias/intercept parameter
 * @param {string} [variable='x'] - Independent variable name
 * @param {string} [result='y'] - Result variable name
 * @returns {string} Formatted formula string
 * 
 * @example
 * formatFormula(2, 3);           // Returns "y = 2x + 3"
 * formatFormula(2, 0);           // Returns "y = 2x"
 * formatFormula(2, -3);          // Returns "y = 2x - 3"
 * formatFormula(1, 0, 'size');   // Returns "y = 1×size"
 * formatFormula(7, 0, 'x', 'air'); // Returns "air = 7x"
 * 
 * @description
 * Creates human-readable mathematical formulas for display in the UI.
 * Handles special cases like zero bias, negative values, and custom variable names.
 * Automatically chooses appropriate operators and formatting for clarity.
 */
export function formatFormula(w, b = 0, variable = 'x', result = 'y') {
    if (typeof w !== 'number' || isNaN(w)) {
        console.warn('formatFormula: w must be a valid number');
        return `${result} = ${variable}`;
    }
    
    if (typeof b !== 'number' || isNaN(b)) {
        b = 0;
    }
    
    // Format the weight coefficient
    let wStr = '';
    if (w === 1) {
        wStr = '';
    } else if (w === -1) {
        wStr = '-';
    } else {
        wStr = formatNumber(w);
    }
    
    // Use × symbol for multiplication when coefficient is shown
    const multiplySymbol = wStr && wStr !== '-' ? '×' : '';
    
    // Build the formula parts
    const wTerm = `${wStr}${multiplySymbol}${variable}`;
    
    if (b === 0) {
        // Simple case: y = wx
        return `${result} = ${wTerm}`;
    } else if (b > 0) {
        // Positive bias: y = wx + b
        return `${result} = ${wTerm} + ${formatNumber(b)}`;
    } else {
        // Negative bias: y = wx - b
        return `${result} = ${wTerm} - ${formatNumber(Math.abs(b))}`;
    }
}

/**
 * Formats a number with specified decimal places and optional thousands separators
 * 
 * @param {number} num - Number to format
 * @param {number} [decimals=1] - Number of decimal places
 * @param {Object} [options={}] - Formatting options
 * @param {boolean} [options.useThousands=false] - Add thousands separators
 * @param {string} [options.thousandsSeparator=','] - Thousands separator character
 * @param {string} [options.decimalSeparator='.'] - Decimal separator character
 * @param {boolean} [options.stripTrailingZeros=true] - Remove trailing zeros
 * @returns {string} Formatted number string
 * 
 * @example
 * formatNumber(3.14159, 2);                     // Returns "3.14"
 * formatNumber(1234.5, 1, {useThousands: true}); // Returns "1,234.5"
 * formatNumber(5.00, 2);                        // Returns "5" (strips zeros)
 * formatNumber(5.00, 2, {stripTrailingZeros: false}); // Returns "5.00"
 * 
 * @description
 * Provides flexible number formatting with customizable precision and separators.
 * Handles special cases like NaN, Infinity, and very large/small numbers.
 * Used throughout the application for consistent number display.
 */
export function formatNumber(num, decimals = 1, options = {}) {
    if (typeof num !== 'number') {
        console.warn('formatNumber: Input must be a number');
        return String(num);
    }
    
    if (isNaN(num)) {
        return 'NaN';
    }
    
    if (!isFinite(num)) {
        return num > 0 ? '∞' : '-∞';
    }
    
    const {
        useThousands = false,
        thousandsSeparator = ',',
        decimalSeparator = '.',
        stripTrailingZeros = true
    } = options;
    
    // Handle very large or very small numbers with scientific notation
    const absNum = Math.abs(num);
    if (absNum >= 1e15 || (absNum > 0 && absNum < 1e-6)) {
        return num.toExponential(Math.max(0, decimals));
    }
    
    // Round to specified decimal places
    const multiplier = Math.pow(10, Math.max(0, decimals));
    const rounded = Math.round(num * multiplier) / multiplier;
    
    // Convert to fixed decimal string
    let result = rounded.toFixed(Math.max(0, decimals));
    
    // Strip trailing zeros if requested
    if (stripTrailingZeros && decimals > 0) {
        result = result.replace(/\.?0+$/, '');
    }
    
    // Add thousands separators if requested
    if (useThousands && thousandsSeparator) {
        const parts = result.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
        result = parts.join(decimalSeparator);
    } else if (decimalSeparator !== '.') {
        result = result.replace('.', decimalSeparator);
    }
    
    return result;
}

/**
 * Formats a percentage value with optional decimal places
 * 
 * @param {number} value - Value to convert to percentage
 * @param {number} total - Total value (denominator)
 * @param {number} [decimals=0] - Number of decimal places
 * @param {boolean} [includeSymbol=true] - Whether to include % symbol
 * @returns {string} Formatted percentage string
 * 
 * @example
 * formatPercent(75, 100);        // Returns "75%"
 * formatPercent(1, 3, 1);        // Returns "33.3%"
 * formatPercent(0.75, 1);        // Returns "75%"
 * formatPercent(75, 100, 0, false); // Returns "75"
 * 
 * @description
 * Calculates and formats percentage values with proper rounding and display.
 * Handles edge cases like division by zero and provides consistent formatting
 * across the application for progress indicators and statistics.
 */
export function formatPercent(value, total, decimals = 0, includeSymbol = true) {
    if (typeof value !== 'number' || typeof total !== 'number') {
        console.warn('formatPercent: value and total must be numbers');
        return '0' + (includeSymbol ? '%' : '');
    }
    
    if (total === 0) {
        return '0' + (includeSymbol ? '%' : '');
    }
    
    const percentage = (value / total) * 100;
    const formatted = formatNumber(percentage, decimals);
    
    return formatted + (includeSymbol ? '%' : '');
}

/**
 * Formats a duration in milliseconds to human-readable format
 * 
 * @param {number} milliseconds - Duration in milliseconds
 * @param {Object} [options={}] - Formatting options
 * @param {boolean} [options.showMilliseconds=false] - Include milliseconds
 * @param {boolean} [options.compact=false] - Use compact format (1m 30s vs 1:30)
 * @param {number} [options.maxUnits=3] - Maximum number of units to show
 * @returns {string} Formatted duration string
 * 
 * @example
 * formatDuration(5000);                    // Returns "5s"
 * formatDuration(65000);                   // Returns "1m 5s"
 * formatDuration(3661000);                 // Returns "1h 1m 1s"
 * formatDuration(5000, {compact: false});  // Returns "0:05"
 * formatDuration(5123, {showMilliseconds: true}); // Returns "5s 123ms"
 * 
 * @description
 * Converts millisecond durations to readable time formats. Supports both
 * compact (1m 30s) and colon-separated (1:30) formats. Used for timing
 * displays, progress tracking, and performance measurements.
 */
export function formatDuration(milliseconds, options = {}) {
    if (typeof milliseconds !== 'number' || milliseconds < 0) {
        console.warn('formatDuration: milliseconds must be a non-negative number');
        return '0s';
    }
    
    const {
        showMilliseconds = false,
        compact = true,
        maxUnits = 3
    } = options;
    
    const ms = Math.floor(milliseconds % 1000);
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    
    if (compact) {
        const parts = [];
        let unitCount = 0;
        
        if (days > 0 && unitCount < maxUnits) {
            parts.push(`${days}d`);
            unitCount++;
        }
        if (hours > 0 && unitCount < maxUnits) {
            parts.push(`${hours}h`);
            unitCount++;
        }
        if (minutes > 0 && unitCount < maxUnits) {
            parts.push(`${minutes}m`);
            unitCount++;
        }
        if (seconds > 0 && unitCount < maxUnits) {
            parts.push(`${seconds}s`);
            unitCount++;
        }
        if (showMilliseconds && ms > 0 && unitCount < maxUnits) {
            parts.push(`${ms}ms`);
            unitCount++;
        }
        
        return parts.length > 0 ? parts.join(' ') : '0s';
    } else {
        // Colon-separated format
        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    }
}

/**
 * Formats a score with optional total and percentage
 * 
 * @param {number} score - Achieved score
 * @param {number} [maxScore] - Maximum possible score
 * @param {Object} [options={}] - Formatting options
 * @param {boolean} [options.showPercentage=true] - Show percentage when maxScore provided
 * @param {boolean} [options.showFraction=true] - Show score/maxScore fraction
 * @param {number} [options.decimals=0] - Decimal places for percentage
 * @returns {string} Formatted score string
 * 
 * @example
 * formatScore(85);                    // Returns "85"
 * formatScore(85, 100);               // Returns "85/100 (85%)"
 * formatScore(17, 20);                // Returns "17/20 (85%)"
 * formatScore(85, 100, {showFraction: false}); // Returns "85%"
 * 
 * @description
 * Formats score values with optional context like maximum score and percentage.
 * Provides consistent score display across levels and progress indicators.
 * Handles edge cases and provides flexible formatting options.
 */
export function formatScore(score, maxScore, options = {}) {
    if (typeof score !== 'number') {
        console.warn('formatScore: score must be a number');
        return '0';
    }
    
    const {
        showPercentage = true,
        showFraction = true,
        decimals = 0
    } = options;
    
    const formattedScore = formatNumber(score, 0);
    
    if (typeof maxScore !== 'number' || maxScore <= 0) {
        return formattedScore;
    }
    
    const parts = [];
    
    if (showFraction) {
        parts.push(`${formattedScore}/${formatNumber(maxScore, 0)}`);
    }
    
    if (showPercentage) {
        const percentage = formatPercent(score, maxScore, decimals);
        parts.push(`(${percentage})`);
    }
    
    if (parts.length === 0) {
        return formattedScore;
    }
    
    return showFraction ? parts.join(' ') : parts[parts.length - 1].replace(/[()]/g, '');
}

/**
 * Formats a list of values as a comma-separated string with proper conjunction
 * 
 * @param {Array} items - Array of items to format
 * @param {Object} [options={}] - Formatting options
 * @param {string} [options.conjunction='and'] - Conjunction word ('and', 'or')
 * @param {boolean} [options.oxfordComma=true] - Use Oxford comma
 * @param {Function} [options.formatter] - Function to format each item
 * @returns {string} Formatted list string
 * 
 * @example
 * formatList(['apple', 'banana', 'orange']);     // Returns "apple, banana, and orange"
 * formatList(['a', 'b'], {conjunction: 'or'});   // Returns "a or b"
 * formatList(['x'], {conjunction: 'and'});       // Returns "x"
 * formatList([1, 2, 3], {formatter: x => `${x}x`}); // Returns "1x, 2x, and 3x"
 * 
 * @description
 * Creates properly formatted lists with appropriate conjunctions and commas.
 * Handles different list lengths and provides customizable formatting.
 * Used for displaying multiple values, error lists, and enumerations.
 */
export function formatList(items, options = {}) {
    if (!Array.isArray(items)) {
        console.warn('formatList: items must be an array');
        return '';
    }
    
    const {
        conjunction = 'and',
        oxfordComma = true,
        formatter = (item) => String(item)
    } = options;
    
    const formattedItems = items.map(formatter);
    
    if (formattedItems.length === 0) {
        return '';
    }
    
    if (formattedItems.length === 1) {
        return formattedItems[0];
    }
    
    if (formattedItems.length === 2) {
        return `${formattedItems[0]} ${conjunction} ${formattedItems[1]}`;
    }
    
    const lastItem = formattedItems.pop();
    const comma = oxfordComma ? ',' : '';
    
    return `${formattedItems.join(', ')}${comma} ${conjunction} ${lastItem}`;
}

/**
 * Truncates text to specified length with ellipsis
 * 
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length including ellipsis
 * @param {Object} [options={}] - Truncation options
 * @param {string} [options.ellipsis='...'] - Ellipsis string
 * @param {boolean} [options.wordBoundary=true] - Truncate at word boundaries
 * @returns {string} Truncated text
 * 
 * @example
 * truncateText('This is a long sentence', 10);           // Returns "This is..."
 * truncateText('Short', 10);                             // Returns "Short"
 * truncateText('OneVeryLongWord', 10, {wordBoundary: false}); // Returns "OneVeryL..."
 * 
 * @description
 * Intelligently truncates text while preserving readability. Can truncate
 * at word boundaries to avoid breaking words. Used for displaying long
 * descriptions, error messages, and content that needs to fit in limited space.
 */
export function truncateText(text, maxLength, options = {}) {
    if (typeof text !== 'string') {
        console.warn('truncateText: text must be a string');
        return '';
    }
    
    if (typeof maxLength !== 'number' || maxLength <= 0) {
        console.warn('truncateText: maxLength must be a positive number');
        return text;
    }
    
    const {
        ellipsis = '...',
        wordBoundary = true
    } = options;
    
    if (text.length <= maxLength) {
        return text;
    }
    
    const truncateLength = maxLength - ellipsis.length;
    
    if (truncateLength <= 0) {
        return ellipsis.substring(0, maxLength);
    }
    
    let truncated = text.substring(0, truncateLength);
    
    if (wordBoundary) {
        // Find the last space to avoid breaking words
        const lastSpace = truncated.lastIndexOf(' ');
        if (lastSpace > 0) {
            truncated = truncated.substring(0, lastSpace);
        }
    }
    
    return truncated + ellipsis;
}

/**
 * Formats file size in bytes to human-readable format
 * 
 * @param {number} bytes - Size in bytes
 * @param {Object} [options={}] - Formatting options
 * @param {number} [options.decimals=1] - Number of decimal places
 * @param {boolean} [options.binary=false] - Use binary (1024) vs decimal (1000) units
 * @returns {string} Formatted file size string
 * 
 * @example
 * formatFileSize(1024);                    // Returns "1.0 KB"
 * formatFileSize(1024, {binary: true});    // Returns "1.0 KiB"
 * formatFileSize(1536, {decimals: 2});     // Returns "1.54 KB"
 * formatFileSize(0);                       // Returns "0 B"
 * 
 * @description
 * Converts byte values to appropriate units (B, KB, MB, GB, etc.) with
 * proper decimal formatting. Supports both decimal (1000-based) and
 * binary (1024-based) unit systems.
 */
export function formatFileSize(bytes, options = {}) {
    if (typeof bytes !== 'number' || bytes < 0) {
        console.warn('formatFileSize: bytes must be a non-negative number');
        return '0 B';
    }
    
    const {
        decimals = 1,
        binary = false
    } = options;
    
    const base = binary ? 1024 : 1000;
    const units = binary 
        ? ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB'] 
        : ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
    
    if (bytes === 0) {
        return '0 B';
    }
    
    const unitIndex = Math.floor(Math.log(bytes) / Math.log(base));
    const clampedIndex = Math.min(unitIndex, units.length - 1);
    const value = bytes / Math.pow(base, clampedIndex);
    
    const formattedValue = formatNumber(value, clampedIndex === 0 ? 0 : decimals);
    
    return `${formattedValue} ${units[clampedIndex]}`;
}

/**
 * Capitalizes the first letter of a string
 * 
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 * 
 * @example
 * capitalize('hello world');  // Returns "Hello world"
 * capitalize('HELLO');        // Returns "HELLO"
 * capitalize('');             // Returns ""
 * 
 * @description
 * Simple utility to capitalize the first letter while preserving
 * the case of remaining characters. Used for formatting labels,
 * titles, and user interface text.
 */
export function capitalize(str) {
    if (typeof str !== 'string') {
        console.warn('capitalize: Input must be a string');
        return '';
    }
    
    if (str.length === 0) {
        return str;
    }
    
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts a string to title case
 * 
 * @param {string} str - String to convert
 * @param {Array<string>} [exceptions] - Words to keep lowercase
 * @returns {string} Title case string
 * 
 * @example
 * titleCase('hello world');                    // Returns "Hello World"
 * titleCase('the quick brown fox');            // Returns "The Quick Brown Fox"
 * titleCase('a tale of two cities', ['of']);   // Returns "A Tale of Two Cities"
 * 
 * @description
 * Converts strings to title case with proper capitalization of each word.
 * Supports exceptions for articles, prepositions, and other words that
 * should remain lowercase. Used for formatting titles and headings.
 */
export function titleCase(str, exceptions = []) {
    if (typeof str !== 'string') {
        console.warn('titleCase: Input must be a string');
        return '';
    }
    
    const commonExceptions = ['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'if', 'in', 'nor', 'of', 'on', 'or', 'so', 'the', 'to', 'up', 'yet'];
    const allExceptions = [...commonExceptions, ...exceptions];
    
    return str.toLowerCase().split(' ').map((word, index) => {
        // Always capitalize first word
        if (index === 0) {
            return capitalize(word);
        }
        
        // Check if word is in exceptions list
        if (allExceptions.includes(word.toLowerCase())) {
            return word.toLowerCase();
        }
        
        return capitalize(word);
    }).join(' ');
}

// Export all functions as a grouped object
export const FORMAT = {
    formatFormula,
    formatNumber,
    formatPercent,
    formatDuration,
    formatScore,
    formatList,
    truncateText,
    formatFileSize,
    capitalize,
    titleCase
};