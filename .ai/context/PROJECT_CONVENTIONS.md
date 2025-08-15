# Project Conventions Guide

This document outlines the coding standards, naming conventions, and architectural patterns used throughout the MLTEACH project.

## File Structure and Organization

### Directory Structure
```
MLTEACH/
├── .ai/                     # AI assistance documentation
│   ├── context/            # Documentation for AI context
│   └── snippets.json       # Common code snippets
├── components/             # Reusable UI components
│   ├── base/              # Base component classes
│   ├── ui/                # Specific UI components
│   └── examples/          # Component usage examples
├── content/               # Legacy content files
├── css/                   # Stylesheets organized by purpose
├── js_standalone/         # Core JavaScript modules
├── levels/                # Individual level implementations
├── pictures/              # Image assets
├── scripts/               # Build and utility scripts
├── services/              # Business logic services
├── state/                 # State management system
├── templates/             # Level and component templates
│   └── generators/        # Code generation utilities
└── index.html             # Main entry point
```

### File Naming Conventions

#### JavaScript Files
- **PascalCase** for classes: `InteractiveLevelTemplate.js`
- **camelCase** for utilities: `navigationHelpers.js`
- **kebab-case** for levels: `gradient-descent-intro.js`
- **SCREAMING_SNAKE_CASE** for constants: `ANIMATION_CONSTANTS.js`

#### Folders
- **kebab-case** for all folders: `js-standalone/`, `ui-components/`
- **camelCase** for namespace folders: `levelTemplates/`

#### CSS Files
- **kebab-case**: `button-styles.css`, `form-controls.css`
- Purpose-based naming: `layout.css`, `typography.css`, `components.css`

## JavaScript Conventions

### Class Naming and Structure

#### Classes
```javascript
/**
 * PascalCase for class names
 * Clear, descriptive names that indicate purpose
 */
class InteractiveLevelTemplate extends BaseLevelTemplate {
    /**
     * Constructor should validate inputs and set defaults
     */
    constructor(config) {
        super(config);
        
        // Private properties with underscore prefix
        this._internalState = {};
        
        // Public properties without prefix
        this.isActive = false;
    }
    
    /**
     * Public methods: camelCase, descriptive names
     */
    updateParameters(params) {
        // Implementation
    }
    
    /**
     * Protected methods: underscore prefix, used by subclasses
     */
    _generateContent() {
        // Implementation
    }
    
    /**
     * Private methods: double underscore prefix, internal only
     */
    __internalHelper() {
        // Implementation
    }
}
```

#### Functions
```javascript
/**
 * Function names should be verbs describing what they do
 * camelCase for regular functions
 */
function calculateGradient(parameters, data) {
    return result;
}

/**
 * Factory functions: create + PascalCase
 */
function createBalloonLevel() {
    return new BalloonInflationLevel();
}

/**
 * Boolean functions: is/has/can + descriptive name
 */
function isValidParameter(value) {
    return typeof value === 'number' && !isNaN(value);
}

function hasRequiredServices() {
    return typeof GradientDescentService !== 'undefined';
}
```

#### Variables and Constants
```javascript
// Constants: SCREAMING_SNAKE_CASE
const MAX_ITERATIONS = 1000;
const DEFAULT_LEARNING_RATE = 0.01;
const ANIMATION_DURATION = 300;

// Variables: camelCase, descriptive names
const currentLevel = new Level();
const userParameters = { w: 1.0, b: 0.5 };
const validationResult = validateInputs(params);

// Boolean variables: is/has/can prefix
const isActive = true;
const hasValidInput = checkInput(data);
const canProceed = isActive && hasValidInput;
```

### Documentation Standards

#### JSDoc Comments
All functions and classes must have JSDoc comments:

```javascript
/**
 * Calculates the gradient for gradient descent optimization
 * 
 * @param {number} w - Weight parameter
 * @param {number} b - Bias parameter  
 * @param {Array<Object>} data - Training data points
 * @param {string} [lossType='L1'] - Type of loss function to use
 * @returns {Object} Gradient object with dw and db properties
 * 
 * @example
 * const gradient = calculateGradient(2.5, 1.0, trainingData, 'L2');
 * console.log(gradient.dw, gradient.db);
 * 
 * @throws {Error} When data array is empty
 * @since 1.0.0
 */
function calculateGradient(w, b, data, lossType = 'L1') {
    // Implementation
}
```

#### Code Comments
```javascript
// Single line comments for clarification
const normalizedValue = value / maxValue; // Normalize to 0-1 range

/*
 * Multi-line comments for complex logic explanation
 * This algorithm implements gradient descent with momentum
 * to accelerate convergence and reduce oscillations
 */
function gradientDescentWithMomentum(params, gradients, momentum) {
    // Implementation
}
```

### Error Handling Patterns

#### Standard Error Handling
```javascript
/**
 * Always use try-catch for async operations
 */
async function createLevel() {
    try {
        const level = await initializeLevel();
        return level;
    } catch (error) {
        console.error('Failed to create level:', error);
        throw new Error(`Level creation failed: ${error.message}`);
    }
}

/**
 * Validate inputs early
 */
function updateParameter(name, value) {
    if (typeof name !== 'string' || name.length === 0) {
        throw new Error('Parameter name must be a non-empty string');
    }
    
    if (typeof value !== 'number' || isNaN(value)) {
        throw new Error('Parameter value must be a valid number');
    }
    
    // Proceed with update
    this.parameters[name] = value;
}

/**
 * Graceful degradation for optional features
 */
function initializeAdvancedFeatures() {
    if (typeof OptionalService === 'undefined') {
        console.warn('Optional service not available, using basic features');
        return this.initializeBasicFeatures();
    }
    
    return OptionalService.initialize();
}
```

#### Error Messages
- Use descriptive, user-friendly messages
- Include context about what was being attempted
- Suggest possible solutions when appropriate

```javascript
// Good error messages
throw new Error('Failed to validate parameter "weight": value 15.5 exceeds maximum allowed value of 10.0');

throw new Error('Level template not found: InteractiveLevelTemplate. Make sure templates/InteractiveLevelTemplate.js is included in index.html');

// Poor error messages (avoid these)
throw new Error('Invalid input');
throw new Error('Something went wrong');
```

## HTML/CSS Conventions

### HTML Structure
```html
<!-- Use semantic HTML elements -->
<main role="main" class="level-content">
    <header class="level-header">
        <h1 id="level-title">Level Name</h1>
        <p class="level-description">Level description</p>
    </header>
    
    <section class="level-controls" aria-label="Interactive controls">
        <!-- Controls content -->
    </section>
    
    <section class="level-visualization" aria-label="Visualization">
        <!-- Visualization content -->
    </section>
</main>

<!-- Use consistent ID and class naming -->
<div id="balloon-visualization" class="visualization-container">
    <canvas id="balloon-canvas" class="visualization-canvas"></canvas>
    <div class="controls-panel">
        <input id="weight-slider" class="parameter-slider" type="range">
    </div>
</div>
```

### CSS Naming (BEM-inspired)
```css
/* Component-based naming */
.level-content { /* Block */ }
.level-content__header { /* Element */ }
.level-content__header--highlighted { /* Modifier */ }

/* Utility classes */
.text-center { text-align: center; }
.margin-bottom-20 { margin-bottom: 20px; }
.hidden { display: none; }

/* Component-specific styles */
.slider-control {
    width: 100%;
    margin: 10px 0;
}

.slider-control__label {
    font-weight: bold;
    color: #333;
}

.slider-control__input {
    width: 100%;
    height: 8px;
}

.slider-control--disabled {
    opacity: 0.5;
    pointer-events: none;
}
```

## Architecture Patterns

### Modular Design
```javascript
// Each module should have a single responsibility
// Export only what's needed
// Use clear interfaces

// Good modular design
class GradientDescentService {
    static calculateGradient(params, data) { /* ... */ }
    static performStep(params, gradients, lr) { /* ... */ }
    static calculateLoss(predicted, actual) { /* ... */ }
}

// Export specific functions
export { GradientDescentService };
```

### Component Architecture
```javascript
// Base class defines interface
class BaseComponent {
    constructor(container, config) { /* ... */ }
    mount() { /* ... */ }
    unmount() { /* ... */ }
    render() { throw new Error('Must implement render()'); }
}

// Specific implementations extend base
class SliderComponent extends BaseComponent {
    render() {
        return `<input type="range" ... />`;
    }
    
    // Component-specific methods
    updateValue(value) { /* ... */ }
    onChange(callback) { /* ... */ }
}
```

### Service Layer Pattern
```javascript
// Services are stateless and contain business logic
class LevelValidationService {
    /**
     * Pure functions only - no side effects
     */
    static validateParameters(params, constraints) {
        // Validation logic
        return { isValid: boolean, errors: array };
    }
    
    static generateFeedback(validation) {
        // Feedback generation logic
        return feedbackMessage;
    }
}

// Services are available globally
window.LevelValidationService = LevelValidationService;
```

### State Management Pattern
```javascript
// State is immutable and centralized
class Store {
    constructor(initialState = {}) {
        this.state = { ...initialState };
        this.listeners = [];
    }
    
    // Only way to update state
    setState(updates, actionName = 'UPDATE') {
        const newState = { ...this.state, ...updates };
        
        if (this._hasChanged(this.state, newState)) {
            this.state = newState;
            this.notify(actionName, updates);
        }
    }
    
    // Subscription pattern
    subscribe(listener) {
        this.listeners.push(listener);
        return () => this.unsubscribe(listener);
    }
}
```

## Event Handling Conventions

### Event Naming
Use consistent prefixes and structure:
```javascript
// Format: mlteach:category:action
'mlteach:component:mounted'
'mlteach:component:stateChanged'
'mlteach:level:levelCompleted'
'mlteach:level:parameterUpdated'
'mlteach:navigation:pageChanged'
'mlteach:user:actionTracked'
```

### Event Dispatching
```javascript
class Component {
    dispatchEvent(eventType, data = {}) {
        const event = new CustomEvent(`mlteach:component:${eventType}`, {
            detail: {
                componentId: this.id,
                timestamp: Date.now(),
                ...data
            },
            bubbles: true,
            cancelable: true
        });
        
        window.dispatchEvent(event);
    }
}
```

### Event Listening
```javascript
// Use descriptive handler names
function handleLevelCompletion(event) {
    const { levelId, score, solutions } = event.detail;
    console.log(`Level ${levelId} completed with score ${score}`);
}

// Always clean up listeners
class MyComponent {
    setupEvents() {
        this.boundHandlers = {
            onResize: this.handleResize.bind(this),
            onKeyDown: this.handleKeyDown.bind(this)
        };
        
        window.addEventListener('resize', this.boundHandlers.onResize);
        document.addEventListener('keydown', this.boundHandlers.onKeyDown);
    }
    
    cleanup() {
        window.removeEventListener('resize', this.boundHandlers.onResize);
        document.removeEventListener('keydown', this.boundHandlers.onKeyDown);
    }
}
```

## Testing Conventions

### Unit Test Structure
```javascript
// Test files: *.test.js or *.spec.js
describe('GradientDescentService', () => {
    describe('calculateGradient', () => {
        it('should calculate correct gradient for L1 loss', () => {
            // Arrange
            const w = 2.0;
            const b = 1.0;
            const data = [{ x: 1, y: 3 }, { x: 2, y: 5 }];
            
            // Act
            const result = GradientDescentService.calculateGradient(w, b, data, 'L1');
            
            // Assert
            expect(result.dw).toBeCloseTo(expectedDw, 2);
            expect(result.db).toBeCloseTo(expectedDb, 2);
        });
        
        it('should throw error for empty data array', () => {
            expect(() => {
                GradientDescentService.calculateGradient(1, 0, []);
            }).toThrow('Data array cannot be empty');
        });
    });
});
```

### Integration Test Patterns
```javascript
// Test component integration
describe('InteractiveLevelTemplate', () => {
    let container, level;
    
    beforeEach(() => {
        container = document.createElement('div');
        container.id = 'test-container';
        document.body.appendChild(container);
    });
    
    afterEach(() => {
        if (level) {
            level.unmount();
        }
        document.body.removeChild(container);
    });
    
    it('should create and mount successfully', async () => {
        level = new TestLevel();
        await level.create();
        
        expect(container.innerHTML).toContain('level-content');
        expect(level.state.mounted).toBe(true);
    });
});
```

## Performance Guidelines

### Optimization Patterns
```javascript
// Debounce rapid events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Use debounced handlers for sliders
const debouncedUpdate = debounce((value) => {
    this.updateVisualization(value);
}, 16); // ~60fps

// Cache DOM queries
class Component {
    constructor() {
        this.domCache = new Map();
    }
    
    getElement(id) {
        if (!this.domCache.has(id)) {
            this.domCache.set(id, document.getElementById(id));
        }
        return this.domCache.get(id);
    }
    
    clearCache() {
        this.domCache.clear();
    }
}

// Efficient array operations
// Use map/filter/reduce instead of for loops when appropriate
const validData = data
    .filter(point => point.x != null && point.y != null)
    .map(point => ({ x: point.x, y: point.y, predicted: predict(point.x) }));
```

### Memory Management
```javascript
// Clean up resources in unmount/teardown
class Level {
    async teardown() {
        // Cancel animations
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        // Clear intervals
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        
        // Remove heavy objects
        this.chart = null;
        this.visualization = null;
        
        // Clear DOM cache
        this.clearDOMCache();
        
        // Remove event listeners
        this.cleanupEventListeners();
    }
}
```

## Security Guidelines

### Input Validation
```javascript
// Always validate and sanitize inputs
function updateParameter(name, value) {
    // Type validation
    if (typeof name !== 'string') {
        throw new TypeError('Parameter name must be a string');
    }
    
    // Content validation
    if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(name)) {
        throw new Error('Invalid parameter name format');
    }
    
    // Range validation
    if (typeof value !== 'number' || value < 0 || value > 100) {
        throw new RangeError('Parameter value must be between 0 and 100');
    }
    
    this.parameters[name] = value;
}

// Sanitize HTML content
function sanitizeHTML(html) {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
}
```

### Avoid Dangerous Patterns
```javascript
// DON'T use eval or innerHTML with user data
// DON'T: eval(userInput);
// DON'T: element.innerHTML = userInput;

// DO use safe alternatives
element.textContent = userInput;
element.insertAdjacentText('beforeend', userInput);

// DON'T create functions from strings
// DON'T: new Function(userCode)();

// DO use structured data and predefined functions
const allowedFunctions = {
    'linear': (x, w, b) => w * x + b,
    'quadratic': (x, a, b, c) => a * x * x + b * x + c
};

const result = allowedFunctions[functionType](x, ...params);
```

## Git Commit Conventions

### Commit Message Format
```
type(scope): brief description

Detailed explanation of changes if needed.

- List any breaking changes
- Reference issues: Fixes #123
```

### Commit Types
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes

### Examples
```
feat(levels): add gravity challenge interactive level

Implement physics simulation level where users adjust gravity
to make objects land in target zones.

- Add GravityChallengeLevel class
- Integrate with InteractiveLevelTemplate
- Include real-time physics calculations
- Update navigation config

Closes #45
```

```
fix(components): prevent memory leak in slider cleanup

Event listeners were not being properly removed in SliderComponent
unmount method, causing memory leaks in long-running sessions.

- Add proper event listener cleanup
- Clear DOM references in unmount
- Add test for cleanup verification
```

## Code Review Guidelines

### What to Look For

#### Functionality
- [ ] Does the code do what it's supposed to do?
- [ ] Are edge cases handled properly?
- [ ] Is error handling appropriate?
- [ ] Are there any obvious bugs?

#### Code Quality
- [ ] Is the code readable and well-structured?
- [ ] Are variables and functions named descriptively?
- [ ] Is the code DRY (Don't Repeat Yourself)?
- [ ] Are functions reasonably sized and focused?

#### Architecture
- [ ] Does the code follow established patterns?
- [ ] Is it properly modularized?
- [ ] Are dependencies managed correctly?
- [ ] Does it integrate well with existing code?

#### Performance
- [ ] Are there any performance bottlenecks?
- [ ] Is memory usage reasonable?
- [ ] Are DOM operations efficient?
- [ ] Is caching used appropriately?

#### Security
- [ ] Is input properly validated?
- [ ] Are there any XSS vulnerabilities?
- [ ] Is user data handled safely?
- [ ] Are external dependencies secure?

### Review Process
1. **Automated Checks**: Linting, type checking, tests must pass
2. **Manual Review**: Code structure, logic, and integration
3. **Testing**: Verify functionality works as expected
4. **Documentation**: Ensure changes are properly documented

These conventions ensure consistency, maintainability, and quality across the MLTEACH codebase.