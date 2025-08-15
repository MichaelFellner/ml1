# Component Patterns Guide

This document describes the component patterns used in the MLTEACH project for AI assistants and developers.

## Overview

MLTEACH uses a vanilla JavaScript component system with lifecycle management, event delegation, and state management integration. All components follow consistent patterns for maintainability and developer experience.

## Base Component System

### Component Class (`components/base/Component.js`)

The base `Component` class provides the foundation for all components:

```javascript
class Component {
    constructor(container, config = {}) {
        this.container = typeof container === 'string' ? document.getElementById(container) : container;
        this.config = { ...this.defaultConfig, ...config };
        this.state = { ...this.initialState };
        this.eventListeners = [];
        this._mounted = false;
    }

    // Lifecycle methods
    mount() { /* Setup and render */ }
    unmount() { /* Cleanup */ }
    setState(newState) { /* State updates with re-render */ }
    render() { /* Abstract method - implement in subclasses */ }
}
```

**Key Features:**
- Lifecycle management (mount, unmount, setState, render)
- Event delegation with automatic cleanup
- State management with immutable updates
- Configuration system with defaults
- Memory leak prevention

### Usage Pattern

1. **Extend the base class:**
```javascript
class MyComponent extends Component {
    get defaultConfig() {
        return { theme: 'light', size: 'medium' };
    }
    
    get initialState() {
        return { count: 0, active: false };
    }
    
    render() {
        return `<div>My Component Content</div>`;
    }
}
```

2. **Create and mount:**
```javascript
const component = new MyComponent('#container', { theme: 'dark' });
component.mount();
```

## UI Component Patterns

### Control Components

#### ControlSlider (`components/ui/ControlSlider.js`)
For parameter adjustment with visual feedback:

```javascript
const slider = new ControlSlider('#slider-container', {
    id: 'weight',
    label: 'Weight Parameter',
    min: 0,
    max: 10,
    value: 5,
    step: 0.1,
    onChange: (value) => console.log(`Weight: ${value}`)
});
```

**When to use:** Parameter adjustment, live controls, interactive demonstrations

#### FormulaDisplay (`components/ui/FormulaDisplay.js`)
For mathematical formula visualization:

```javascript
const formula = new FormulaDisplay('#formula-container', {
    variables: { w: 7.5, b: 2.3 },
    template: 'y = {w} × x + {b}',
    target: 'y = 7 × x + 2'
});
```

**When to use:** Showing mathematical relationships, parameter visualization, educational content

### Feedback Components

#### ResultMessage (`components/ui/ResultMessage.js`)
For user feedback and validation results:

```javascript
const result = new ResultMessage('#result-container');
result.showSuccess('Great job! You found the solution!', { score: 95 });
result.showError('Try again - you\'re close!', { attempts: 3 });
```

**When to use:** Success/error feedback, validation results, user guidance

#### LossBar (`components/ui/LossBar.js`)
For progress and performance visualization:

```javascript
const lossBar = new LossBar('#loss-container', {
    maxValue: 100,
    threshold: 10,
    showTarget: true
});
lossBar.updateValue(25); // Shows current performance
```

**When to use:** Progress tracking, performance metrics, goal visualization

### Navigation Components

#### NavigationButtons (`components/ui/NavigationButtons.js`)
For level navigation and flow control:

```javascript
const nav = new NavigationButtons('#nav-container', {
    showNext: true,
    showPrevious: false,
    showReset: true,
    onNext: () => navigateToNextLevel(),
    onReset: () => resetCurrentLevel()
});
```

**When to use:** Level navigation, flow control, action buttons

## Level Templates

### BaseLevelTemplate (`templates/BaseLevelTemplate.js`)

Foundation for all levels with common functionality:

```javascript
class MyLevel extends BaseLevelTemplate {
    constructor() {
        super({
            id: 'my-level',
            name: 'My Level',
            type: 'tutorial',
            trackProgress: true
        });
    }
    
    async setup() {
        await super.setup();
        // Custom setup logic
    }
    
    _generateMainContent() {
        return `<div>Level content HTML</div>`;
    }
}
```

### InteractiveLevelTemplate (`templates/InteractiveLevelTemplate.js`)

Specialized for interactive parameter adjustment:

```javascript
class InteractiveLevel extends InteractiveLevelTemplate {
    constructor() {
        super({
            id: 'interactive-level',
            name: 'Interactive Challenge',
            type: 'interactive',
            targetFunction: { w: 7.0, b: 0 },
            controls: [
                {
                    id: 'w',
                    label: 'Weight',
                    min: 0,
                    max: 15,
                    step: 0.1,
                    default: 1.0
                }
            ],
            validation: { tolerance: 0.05 }
        });
    }
    
    _generateVisualizationContent() {
        return `<div id="visualization">Custom visualization</div>`;
    }
}
```

## Service Integration Patterns

### Gradient Descent Service

```javascript
// Available globally as window.GradientDescentService
if (typeof GradientDescentService !== 'undefined') {
    const loss = GradientDescentService.calculateL1Loss(predicted, actual);
    const gradients = GradientDescentService.calculateGradient(w, b, data);
    const newParams = GradientDescentService.performStep(params, gradients, 0.01);
}
```

### State Management Integration

```javascript
// Check availability
if (typeof LevelProgressStore !== 'undefined') {
    // Track progress
    LevelProgressStore.completeLevel('my-level', {
        score: 95,
        solutions: { w: 7.0 },
        timeSpent: 120000
    });
    
    // Save parameters
    GameStateStore.updateParameters('my-level', { w: 5.5, b: 1.2 });
}
```

## Event Patterns

### Component Events

All components emit standardized events:

```javascript
// Listen for component events
window.addEventListener('mlteach:component:stateChanged', (event) => {
    console.log('Component state changed:', event.detail);
});

// Component lifecycle events
window.addEventListener('mlteach:component:mounted', (event) => {
    console.log('Component mounted:', event.detail.componentId);
});
```

### Level Events

```javascript
// Level completion
window.addEventListener('mlteach:level:levelCompleted', (event) => {
    const { levelId, score, solutions } = event.detail;
    console.log(`Level ${levelId} completed with score ${score}`);
});

// Parameter changes
window.addEventListener('mlteach:level:parameterUpdated', (event) => {
    const { levelId, parameter, value } = event.detail;
    console.log(`${parameter} updated to ${value}`);
});
```

### Custom Events

```javascript
// In your component
this.dispatchEvent('myCustomEvent', { data: 'value' });

// Listening
window.addEventListener('mlteach:component:myCustomEvent', (event) => {
    console.log('Custom event:', event.detail);
});
```

## Error Handling Patterns

### Component Error Handling

```javascript
class MyComponent extends Component {
    mount() {
        try {
            super.mount();
            // Component-specific mounting
        } catch (error) {
            console.error(`Error mounting ${this.constructor.name}:`, error);
            this.handleError(error);
        }
    }
    
    handleError(error) {
        // Show user-friendly error message
        this.container.innerHTML = `
            <div class="error-message">
                Something went wrong. Please refresh the page.
            </div>
        `;
    }
}
```

### Service Availability Checks

Always check for service availability:

```javascript
// Check before using services
const hasServices = typeof GradientDescentService !== 'undefined';
const hasStateManagement = typeof LevelProgressStore !== 'undefined';

if (hasServices) {
    // Use gradient descent services
} else {
    console.warn('GradientDescentService not available - running in basic mode');
}
```

## Performance Patterns

### Event Cleanup

Always clean up event listeners:

```javascript
class MyComponent extends Component {
    setupEvents() {
        // Use the built-in cleanup system
        this.addEventDelegate('.button', 'click', this.handleClick.bind(this));
        
        // Or manual cleanup
        const handler = this.handleResize.bind(this);
        window.addEventListener('resize', handler);
        this.eventListeners.push(() => window.removeEventListener('resize', handler));
    }
}
```

### Memory Management

```javascript
class MyComponent extends Component {
    unmount() {
        // Clear references to prevent memory leaks
        this.animation = null;
        this.chart = null;
        
        // Call parent cleanup
        super.unmount();
    }
}
```

## Testing Patterns

### Component Testing

```javascript
// Test component creation and mounting
const component = new MyComponent('#test-container');
component.mount();

// Test state updates
component.setState({ active: true });
console.assert(component.state.active === true);

// Test events
let eventFired = false;
window.addEventListener('mlteach:component:stateChanged', () => {
    eventFired = true;
});
component.setState({ test: 'value' });
console.assert(eventFired === true);

// Cleanup
component.unmount();
```

### Level Testing

```javascript
// Create level instance
const level = new MyLevel();
await level.create();

// Test parameter updates
level.updateParameters({ w: 5.0 });
console.assert(level.getParameters().w === 5.0);

// Test validation
const validation = level.validateParameters();
console.assert(typeof validation.success === 'boolean');

// Cleanup
await level.teardown();
```

## Best Practices

### Component Design

1. **Single Responsibility:** Each component should have one clear purpose
2. **Configuration:** Use config objects for customization
3. **State Immutability:** Always create new state objects
4. **Event Naming:** Use consistent `mlteach:category:action` format
5. **Error Boundaries:** Handle errors gracefully with fallbacks

### Level Creation

1. **Template Usage:** Always extend BaseLevelTemplate or InteractiveLevelTemplate
2. **Service Checks:** Check for service availability before use
3. **State Management:** Integrate with stores for persistence
4. **Progressive Enhancement:** Work without advanced features if unavailable
5. **User Feedback:** Provide clear feedback for all actions

### Performance

1. **Event Cleanup:** Always clean up event listeners
2. **Memory Management:** Clear references in unmount methods
3. **Efficient Rendering:** Minimize DOM manipulations
4. **Lazy Loading:** Load components only when needed
5. **Debouncing:** Debounce rapid events like slider changes

## Common Patterns

### Loading States

```javascript
class MyComponent extends Component {
    showLoading() {
        this.container.innerHTML = '<div class="loading">Loading...</div>';
    }
    
    hideLoading() {
        // Render actual content
        this.render();
    }
}
```

### Conditional Rendering

```javascript
render() {
    const { showAdvanced } = this.state;
    return `
        <div>
            <div class="basic-controls">Basic controls</div>
            ${showAdvanced ? '<div class="advanced-controls">Advanced</div>' : ''}
        </div>
    `;
}
```

### Animation Integration

```javascript
class AnimatedComponent extends Component {
    animateIn() {
        this.container.style.opacity = '0';
        this.container.style.transform = 'translateY(20px)';
        
        requestAnimationFrame(() => {
            this.container.style.transition = 'all 0.3s ease';
            this.container.style.opacity = '1';
            this.container.style.transform = 'translateY(0)';
        });
    }
}
```

This guide provides the foundation for creating consistent, maintainable components in the MLTEACH project.