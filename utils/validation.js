/**
 * Validation Utility Functions
 * 
 * Collection of helper functions for input validation, data sanitization,
 * and constraint checking used throughout the MLTEACH application.
 * 
 * @fileoverview Input validation and sanitization utilities
 * @author MLTEACH Team
 * @version 1.0.0
 * 
 * Features:
 * - Numeric range and type validation
 * - Input sanitization and cleaning
 * - Parameter constraint checking
 * - Custom validation rules
 * - Error message generation
 */

/**
 * Checks if a value is within a specified numeric range
 * 
 * @param {any} value - Value to check
 * @param {number} min - Minimum allowed value (inclusive)
 * @param {number} max - Maximum allowed value (inclusive)
 * @param {Object} [options={}] - Validation options
 * @param {boolean} [options.inclusive=true] - Whether bounds are inclusive
 * @param {boolean} [options.allowNaN=false] - Whether to allow NaN values
 * @param {boolean} [options.allowInfinity=false] - Whether to allow Infinity values
 * @returns {boolean} True if value is in range, false otherwise
 * 
 * @example
 * isInRange(5, 0, 10);        // Returns true
 * isInRange(15, 0, 10);       // Returns false
 * isInRange('5', 0, 10);      // Returns false (not a number)
 * isInRange(10, 0, 10, {inclusive: false}); // Returns false
 * 
 * @description
 * Validates that a numeric value falls within specified bounds. Performs
 * strict type checking to ensure the value is actually a number.
 * Supports options for inclusive/exclusive bounds and special value handling.
 */
export function isInRange(value, min, max, options = {}) {
    const {
        inclusive = true,
        allowNaN = false,
        allowInfinity = false
    } = options;
    
    // Type check
    if (typeof value !== 'number') {
        return false;
    }
    
    // Handle special numeric values
    if (isNaN(value)) {
        return allowNaN;
    }
    
    if (!isFinite(value)) {
        return allowInfinity;
    }
    
    // Validate min/max parameters
    if (typeof min !== 'number' || typeof max !== 'number') {
        console.warn('isInRange: min and max must be numbers');
        return false;
    }
    
    // Swap if min > max
    if (min > max) {
        [min, max] = [max, min];
    }
    
    // Range check
    if (inclusive) {
        return value >= min && value <= max;
    } else {
        return value > min && value < max;
    }
}

/**
 * Validates a numeric value against multiple constraints
 * 
 * @param {any} value - Value to validate
 * @param {Object} constraints - Validation constraints
 * @param {number} [constraints.min] - Minimum value
 * @param {number} [constraints.max] - Maximum value
 * @param {boolean} [constraints.required=false] - Whether value is required
 * @param {boolean} [constraints.integer=false] - Whether value must be integer
 * @param {boolean} [constraints.positive=false] - Whether value must be positive
 * @param {boolean} [constraints.negative=false] - Whether value must be negative
 * @param {Array<number>} [constraints.allowedValues] - Specific allowed values
 * @param {Array<number>} [constraints.excludedValues] - Specific excluded values
 * @returns {Object} Validation result with isValid, errors, and sanitizedValue
 * 
 * @example
 * validateNumber(5, {min: 0, max: 10});               // {isValid: true, ...}
 * validateNumber('abc', {required: true});            // {isValid: false, errors: [...]}
 * validateNumber(3.14, {integer: true});              // {isValid: false, ...}
 * validateNumber(-5, {positive: true});               // {isValid: false, ...}
 * validateNumber(7, {allowedValues: [1, 3, 5, 7]});  // {isValid: true, ...}
 * 
 * @description
 * Comprehensive numeric validation with multiple constraint types.
 * Returns detailed validation results including specific error messages
 * and sanitized values. Used for parameter validation in interactive levels.
 */
export function validateNumber(value, constraints = {}) {
    const {
        min,
        max,
        required = false,
        integer = false,
        positive = false,
        negative = false,
        allowedValues,
        excludedValues
    } = constraints;
    
    const result = {
        isValid: true,
        errors: [],
        warnings: [],
        sanitizedValue: value,
        originalValue: value
    };
    
    // Handle null/undefined
    if (value === null || value === undefined) {
        if (required) {
            result.isValid = false;
            result.errors.push('Value is required');
        }
        return result;
    }
    
    // Convert string numbers
    let numValue = value;
    if (typeof value === 'string' && value.trim() !== '') {
        const parsed = parseFloat(value);
        if (!isNaN(parsed)) {
            numValue = parsed;
            result.sanitizedValue = numValue;
        }
    }
    
    // Type validation
    if (typeof numValue !== 'number') {
        result.isValid = false;
        result.errors.push('Value must be a number');
        return result;
    }
    
    // NaN check
    if (isNaN(numValue)) {
        result.isValid = false;
        result.errors.push('Value cannot be NaN');
        return result;
    }
    
    // Infinity check
    if (!isFinite(numValue)) {
        result.isValid = false;
        result.errors.push('Value cannot be infinite');
        return result;
    }
    
    // Integer constraint
    if (integer && !Number.isInteger(numValue)) {
        result.isValid = false;
        result.errors.push('Value must be a whole number');
    }
    
    // Sign constraints
    if (positive && numValue <= 0) {
        result.isValid = false;
        result.errors.push('Value must be positive');
    }
    
    if (negative && numValue >= 0) {
        result.isValid = false;
        result.errors.push('Value must be negative');
    }
    
    // Range constraints
    if (typeof min === 'number' && numValue < min) {
        result.isValid = false;
        result.errors.push(`Value must be at least ${min}`);
    }
    
    if (typeof max === 'number' && numValue > max) {
        result.isValid = false;
        result.errors.push(`Value must be at most ${max}`);
    }
    
    // Allowed values constraint
    if (Array.isArray(allowedValues) && !allowedValues.includes(numValue)) {
        result.isValid = false;
        result.errors.push(`Value must be one of: ${allowedValues.join(', ')}`);
    }
    
    // Excluded values constraint
    if (Array.isArray(excludedValues) && excludedValues.includes(numValue)) {
        result.isValid = false;
        result.errors.push(`Value cannot be: ${excludedValues.join(', ')}`);
    }
    
    return result;
}

/**
 * Sanitizes user input by removing dangerous characters and normalizing format
 * 
 * @param {any} input - Input to sanitize
 * @param {Object} [options={}] - Sanitization options
 * @param {boolean} [options.trim=true] - Trim whitespace
 * @param {boolean} [options.removeHTML=true] - Remove HTML tags
 * @param {boolean} [options.removeScripts=true] - Remove script tags and content
 * @param {number} [options.maxLength] - Maximum allowed length
 * @param {RegExp} [options.allowedChars] - Regex for allowed characters
 * @param {Array<string>} [options.forbiddenWords] - Words to remove/replace
 * @returns {string} Sanitized input string
 * 
 * @example
 * sanitizeInput('  Hello World  ');                    // Returns "Hello World"
 * sanitizeInput('<script>alert("xss")</script>text'); // Returns "text"
 * sanitizeInput('User123!@#', {allowedChars: /^[a-zA-Z0-9]+$/}); // Returns "User123"
 * sanitizeInput('Very long text...', {maxLength: 10}); // Returns "Very long "
 * 
 * @description
 * Comprehensive input sanitization for security and data quality.
 * Removes potentially dangerous content, normalizes formatting,
 * and applies length and character restrictions. Essential for
 * processing user input safely.
 */
export function sanitizeInput(input, options = {}) {
    const {
        trim = true,
        removeHTML = true,
        removeScripts = true,
        maxLength,
        allowedChars,
        forbiddenWords = []
    } = options;
    
    // Convert to string
    let sanitized = String(input || '');
    
    // Trim whitespace
    if (trim) {
        sanitized = sanitized.trim();
    }
    
    // Remove script tags and content (security)
    if (removeScripts) {
        sanitized = sanitized.replace(/<script[^>]*>.*?<\/script>/gis, '');
        sanitized = sanitized.replace(/javascript:/gi, '');
        sanitized = sanitized.replace(/on\w+\s*=/gi, '');
    }
    
    // Remove HTML tags
    if (removeHTML) {
        sanitized = sanitized.replace(/<[^>]*>/g, '');
    }
    
    // Apply character restrictions
    if (allowedChars instanceof RegExp) {
        sanitized = sanitized.replace(new RegExp(`[^${allowedChars.source.slice(2, -2)}]`, 'g'), '');
    }
    
    // Remove forbidden words
    if (forbiddenWords.length > 0) {
        forbiddenWords.forEach(word => {
            const regex = new RegExp(word, 'gi');\n            sanitized = sanitized.replace(regex, '***');\n        });\n    }\n    \n    // Apply length limit\n    if (typeof maxLength === 'number' && maxLength > 0) {\n        sanitized = sanitized.substring(0, maxLength);\n    }\n    \n    return sanitized;\n}\n\n/**\n * Validates email address format\n * \n * @param {string} email - Email address to validate\n * @param {Object} [options={}] - Validation options\n * @param {boolean} [options.allowEmpty=false] - Allow empty email\n * @param {boolean} [options.requireTLD=true] - Require top-level domain\n * @param {Array<string>} [options.allowedDomains] - Specific allowed domains\n * @param {Array<string>} [options.blockedDomains] - Blocked domains\n * @returns {Object} Validation result\n * \n * @example\n * validateEmail('user@example.com');           // {isValid: true, ...}\n * validateEmail('invalid-email');              // {isValid: false, ...}\n * validateEmail('user@test', {requireTLD: false}); // {isValid: true, ...}\n * \n * @description\n * Validates email addresses using regex patterns and additional constraints.\n * Supports custom domain allowlists/blocklists and flexible validation rules.\n * Returns detailed validation results with specific error messages.\n */\nexport function validateEmail(email, options = {}) {\n    const {\n        allowEmpty = false,\n        requireTLD = true,\n        allowedDomains = [],\n        blockedDomains = []\n    } = options;\n    \n    const result = {\n        isValid: true,\n        errors: [],\n        sanitizedValue: email\n    };\n    \n    // Handle empty email\n    if (!email || email.trim() === '') {\n        if (allowEmpty) {\n            return result;\n        } else {\n            result.isValid = false;\n            result.errors.push('Email address is required');\n            return result;\n        }\n    }\n    \n    const trimmedEmail = email.trim().toLowerCase();\n    result.sanitizedValue = trimmedEmail;\n    \n    // Basic format validation\n    const emailRegex = requireTLD \n        ? /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/\n        : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$/;\n    \n    if (!emailRegex.test(trimmedEmail)) {\n        result.isValid = false;\n        result.errors.push('Invalid email format');\n        return result;\n    }\n    \n    // Extract domain\n    const domain = trimmedEmail.split('@')[1];\n    \n    // Check allowed domains\n    if (allowedDomains.length > 0 && !allowedDomains.includes(domain)) {\n        result.isValid = false;\n        result.errors.push(`Email domain must be one of: ${allowedDomains.join(', ')}`);\n    }\n    \n    // Check blocked domains\n    if (blockedDomains.includes(domain)) {\n        result.isValid = false;\n        result.errors.push('Email domain is not allowed');\n    }\n    \n    return result;\n}\n\n/**\n * Validates URL format and accessibility\n * \n * @param {string} url - URL to validate\n * @param {Object} [options={}] - Validation options\n * @param {Array<string>} [options.allowedProtocols=['http', 'https']] - Allowed protocols\n * @param {boolean} [options.requireProtocol=true] - Require protocol in URL\n * @param {Array<string>} [options.allowedDomains] - Specific allowed domains\n * @param {Array<string>} [options.blockedDomains] - Blocked domains\n * @returns {Object} Validation result\n * \n * @example\n * validateURL('https://example.com');          // {isValid: true, ...}\n * validateURL('ftp://example.com');            // {isValid: false, ...} (protocol not allowed)\n * validateURL('example.com', {requireProtocol: false}); // {isValid: true, ...}\n * \n * @description\n * Validates URL format, protocol, and domain constraints. Supports\n * flexible protocol requirements and domain filtering. Used for\n * validating user-provided links and resources.\n */\nexport function validateURL(url, options = {}) {\n    const {\n        allowedProtocols = ['http', 'https'],\n        requireProtocol = true,\n        allowedDomains = [],\n        blockedDomains = []\n    } = options;\n    \n    const result = {\n        isValid: true,\n        errors: [],\n        sanitizedValue: url\n    };\n    \n    if (!url || typeof url !== 'string') {\n        result.isValid = false;\n        result.errors.push('URL is required');\n        return result;\n    }\n    \n    let urlToValidate = url.trim();\n    \n    // Add protocol if missing and not required\n    if (!requireProtocol && !/^\\w+:\\/\\//.test(urlToValidate)) {\n        urlToValidate = 'https://' + urlToValidate;\n    }\n    \n    result.sanitizedValue = urlToValidate;\n    \n    // Parse URL\n    let parsedURL;\n    try {\n        parsedURL = new URL(urlToValidate);\n    } catch (error) {\n        result.isValid = false;\n        result.errors.push('Invalid URL format');\n        return result;\n    }\n    \n    // Check protocol\n    const protocol = parsedURL.protocol.replace(':', '');\n    if (!allowedProtocols.includes(protocol)) {\n        result.isValid = false;\n        result.errors.push(`Protocol must be one of: ${allowedProtocols.join(', ')}`);\n    }\n    \n    // Check allowed domains\n    if (allowedDomains.length > 0 && !allowedDomains.includes(parsedURL.hostname)) {\n        result.isValid = false;\n        result.errors.push(`Domain must be one of: ${allowedDomains.join(', ')}`);\n    }\n    \n    // Check blocked domains\n    if (blockedDomains.includes(parsedURL.hostname)) {\n        result.isValid = false;\n        result.errors.push('Domain is not allowed');\n    }\n    \n    return result;\n}\n\n/**\n * Validates array data with element constraints\n * \n * @param {any} value - Value to validate as array\n * @param {Object} constraints - Array validation constraints\n * @param {number} [constraints.minLength] - Minimum array length\n * @param {number} [constraints.maxLength] - Maximum array length\n * @param {Function} [constraints.elementValidator] - Function to validate each element\n * @param {boolean} [constraints.unique=false] - Whether elements must be unique\n * @param {boolean} [constraints.required=false] - Whether array is required\n * @returns {Object} Validation result\n * \n * @example\n * validateArray([1, 2, 3], {minLength: 2, maxLength: 5});     // {isValid: true}\n * validateArray([1, 1, 2], {unique: true});                  // {isValid: false}\n * validateArray(['a', 'b'], {elementValidator: v => typeof v === 'string'}); // {isValid: true}\n * \n * @description\n * Validates array structure, length constraints, and element validation.\n * Supports uniqueness checking and custom element validators.\n * Used for validating lists, datasets, and collection inputs.\n */\nexport function validateArray(value, constraints = {}) {\n    const {\n        minLength,\n        maxLength,\n        elementValidator,\n        unique = false,\n        required = false\n    } = constraints;\n    \n    const result = {\n        isValid: true,\n        errors: [],\n        sanitizedValue: value\n    };\n    \n    // Handle null/undefined\n    if (value === null || value === undefined) {\n        if (required) {\n            result.isValid = false;\n            result.errors.push('Array is required');\n        }\n        return result;\n    }\n    \n    // Type check\n    if (!Array.isArray(value)) {\n        result.isValid = false;\n        result.errors.push('Value must be an array');\n        return result;\n    }\n    \n    // Length constraints\n    if (typeof minLength === 'number' && value.length < minLength) {\n        result.isValid = false;\n        result.errors.push(`Array must have at least ${minLength} elements`);\n    }\n    \n    if (typeof maxLength === 'number' && value.length > maxLength) {\n        result.isValid = false;\n        result.errors.push(`Array must have at most ${maxLength} elements`);\n    }\n    \n    // Uniqueness check\n    if (unique) {\n        const seen = new Set();\n        const duplicates = [];\n        \n        for (let i = 0; i < value.length; i++) {\n            const item = value[i];\n            const key = JSON.stringify(item);\n            \n            if (seen.has(key)) {\n                duplicates.push(item);\n            } else {\n                seen.add(key);\n            }\n        }\n        \n        if (duplicates.length > 0) {\n            result.isValid = false;\n            result.errors.push('Array elements must be unique');\n        }\n    }\n    \n    // Element validation\n    if (typeof elementValidator === 'function') {\n        const invalidElements = [];\n        \n        for (let i = 0; i < value.length; i++) {\n            try {\n                if (!elementValidator(value[i], i)) {\n                    invalidElements.push(i);\n                }\n            } catch (error) {\n                invalidElements.push(i);\n            }\n        }\n        \n        if (invalidElements.length > 0) {\n            result.isValid = false;\n            result.errors.push(`Invalid elements at positions: ${invalidElements.join(', ')}`);\n        }\n    }\n    \n    return result;\n}\n\n/**\n * Creates a composite validator that runs multiple validation functions\n * \n * @param {Array<Function>} validators - Array of validator functions\n * @param {Object} [options={}] - Validation options\n * @param {boolean} [options.stopOnFirst=false] - Stop on first validation failure\n * @param {boolean} [options.combineErrors=true] - Combine all error messages\n * @returns {Function} Composite validator function\n * \n * @example\n * const validator = createCompositeValidator([\n *   (value) => validateNumber(value, {min: 0, max: 100}),\n *   (value) => value % 2 === 0 ? {isValid: true} : {isValid: false, errors: ['Must be even']}\n * ]);\n * \n * validator(42); // Validates that value is 0-100 AND even\n * \n * @description\n * Combines multiple validators into a single validation function.\n * Supports different combination strategies like fail-fast or collect-all-errors.\n * Used for complex validation scenarios requiring multiple constraints.\n */\nexport function createCompositeValidator(validators, options = {}) {\n    const {\n        stopOnFirst = false,\n        combineErrors = true\n    } = options;\n    \n    if (!Array.isArray(validators) || validators.length === 0) {\n        console.warn('createCompositeValidator: validators must be a non-empty array');\n        return (value) => ({ isValid: true, errors: [] });\n    }\n    \n    return function compositeValidator(value) {\n        const result = {\n            isValid: true,\n            errors: [],\n            warnings: [],\n            results: []\n        };\n        \n        for (const validator of validators) {\n            if (typeof validator !== 'function') {\n                console.warn('createCompositeValidator: All validators must be functions');\n                continue;\n            }\n            \n            try {\n                const validationResult = validator(value);\n                result.results.push(validationResult);\n                \n                if (validationResult && !validationResult.isValid) {\n                    result.isValid = false;\n                    \n                    if (combineErrors && validationResult.errors) {\n                        result.errors.push(...validationResult.errors);\n                    }\n                    \n                    if (validationResult.warnings) {\n                        result.warnings.push(...validationResult.warnings);\n                    }\n                    \n                    if (stopOnFirst) {\n                        break;\n                    }\n                }\n            } catch (error) {\n                result.isValid = false;\n                result.errors.push(`Validator error: ${error.message}`);\n                \n                if (stopOnFirst) {\n                    break;\n                }\n            }\n        }\n        \n        return result;\n    };\n}\n\n/**\n * Validates form data against a schema\n * \n * @param {Object} data - Form data to validate\n * @param {Object} schema - Validation schema\n * @returns {Object} Validation result with field-specific errors\n * \n * @example\n * const schema = {\n *   name: { required: true, minLength: 2 },\n *   age: { required: true, min: 0, max: 120, integer: true },\n *   email: { validator: validateEmail }\n * };\n * \n * validateForm({name: 'John', age: 25, email: 'john@example.com'}, schema);\n * \n * @description\n * Validates entire form objects against defined schemas. Provides\n * field-specific error reporting and supports custom validators.\n * Used for comprehensive form validation in user interfaces.\n */\nexport function validateForm(data, schema) {\n    const result = {\n        isValid: true,\n        errors: {},\n        warnings: {},\n        sanitizedData: {}\n    };\n    \n    if (!data || typeof data !== 'object') {\n        result.isValid = false;\n        result.errors._form = ['Form data must be an object'];\n        return result;\n    }\n    \n    if (!schema || typeof schema !== 'object') {\n        console.warn('validateForm: schema must be an object');\n        return result;\n    }\n    \n    // Validate each field\n    for (const [fieldName, fieldSchema] of Object.entries(schema)) {\n        const fieldValue = data[fieldName];\n        let fieldResult;\n        \n        if (fieldSchema.validator && typeof fieldSchema.validator === 'function') {\n            // Custom validator\n            try {\n                fieldResult = fieldSchema.validator(fieldValue, fieldSchema);\n            } catch (error) {\n                fieldResult = {\n                    isValid: false,\n                    errors: [`Validation error: ${error.message}`]\n                };\n            }\n        } else {\n            // Built-in validation\n            fieldResult = validateNumber(fieldValue, fieldSchema);\n        }\n        \n        // Process field result\n        if (fieldResult) {\n            if (!fieldResult.isValid) {\n                result.isValid = false;\n                result.errors[fieldName] = fieldResult.errors || ['Validation failed'];\n            }\n            \n            if (fieldResult.warnings && fieldResult.warnings.length > 0) {\n                result.warnings[fieldName] = fieldResult.warnings;\n            }\n            \n            if (fieldResult.sanitizedValue !== undefined) {\n                result.sanitizedData[fieldName] = fieldResult.sanitizedValue;\n            } else {\n                result.sanitizedData[fieldName] = fieldValue;\n            }\n        } else {\n            result.sanitizedData[fieldName] = fieldValue;\n        }\n    }\n    \n    return result;\n}\n\n// Export all functions as a grouped object\nexport const VALIDATION = {\n    isInRange,\n    validateNumber,\n    sanitizeInput,\n    validateEmail,\n    validateURL,\n    validateArray,\n    createCompositeValidator,\n    validateForm\n};