# Debug and Fix Issues Prompt Template

## Prompt Structure

Debug and fix the issue in [LEVEL_NAME] where [ISSUE_DESCRIPTION].

### Common Issues and Solutions:

## 1. Navigation Issues

### Problem: "undefined is not a function"
```
Error: Uncaught TypeError: window.createLevelName is not a function
```

### Diagnosis Steps:
```javascript
// 1. Check if function exists
console.log(typeof window.createLevelName); // Should be "function"

// 2. Check if file is loaded
// Look in Network tab for the script file

// 3. Check function name matches navigation config
// Compare navigation-config.js with actual function name
```

### Solution:
```javascript
// At the end of the level file, add:
window.createLevelName = createLevelName;
window.setupLevelName = setupLevelName; // If exists

// Verify in index.html:
<script src="levels/level-name.js"></script>

// Verify in navigation-config.js:
{
    id: "level-id",
    name: "Level Name",
    func: "createLevelName", // Must match exactly
    // ...
}
```

## 2. DOM Element Not Found

### Problem: "Cannot read property of null"
```
Error: Uncaught TypeError: Cannot read property 'innerHTML' of null
```

### Diagnosis:
```javascript
// Check if element exists
const element = document.getElementById('element-id');
console.log('Element exists:', element !== null);

// Check timing - element might not be created yet
console.log('DOM ready:', document.readyState);
```

### Solution:
```javascript
// Always check before using:
const element = document.getElementById('element-id');
if (element) {
    element.innerHTML = content;
} else {
    console.warn('Element not found: element-id');
    // Optionally create it or use fallback
}

// For timing issues:
function setupAfterDOM() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setup);
    } else {
        setup();
    }
}
```

## 3. State Not Persisting

### Problem: Parameters reset on page refresh

### Diagnosis:
```javascript
// Check localStorage
console.log('Saved state:', localStorage.getItem('gameState'));

// Check if state management is available
console.log('Has state management:', 
    typeof GameStateStore !== 'undefined');

// Check if level uses state management
console.log('Track progress:', this.config.trackProgress);
```

### Solution:
```javascript
// In level constructor:
constructor() {
    super({
        // ...
        trackProgress: true // Enable state tracking
    });
}

// Manual state save:
saveState() {
    if (typeof GameStateStore !== 'undefined') {
        GameStateStore.updateParameters(
            this.config.id, 
            this.getParameters()
        );
    }
}

// Manual state restore:
restoreState() {
    if (typeof GameStateStore !== 'undefined') {
        const saved = GameStateStore.getParameters(this.config.id);
        if (saved) {
            this.updateParameters(saved);
        }
    }
}
```

## 4. Memory Leaks

### Problem: Performance degrades over time, memory usage increases

### Diagnosis:
```javascript
// Check for event listeners not removed
// In Chrome DevTools:
// 1. Memory tab -> Take heap snapshot
// 2. Navigate away and back
// 3. Take another snapshot
// 4. Compare snapshots

// Check for animations still running
console.log('Animation frame:', this.animationId);

// Check for intervals/timeouts
console.log('Active timeouts:', this._timeouts);
```

### Solution:
```javascript
// Proper cleanup implementation:
async onTeardown() {
    // 1. Cancel animations
    if (this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
    }
    
    // 2. Clear intervals
    if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
    }
    
    // 3. Clear timeouts
    this._timeouts.forEach(id => clearTimeout(id));
    this._timeouts.clear();
    
    // 4. Remove event listeners
    this._eventListeners.forEach(({ element, event, handler }) => {
        element.removeEventListener(event, handler);
    });
    this._eventListeners = [];
    
    // 5. Clear heavy references
    this.chart = null;
    this.visualization = null;
    this.data = null;
    
    // 6. Call parent cleanup
    await super.onTeardown();
}
```

## 5. Animation Performance Issues

### Problem: Choppy animations, low FPS

### Diagnosis:
```javascript
// Measure FPS
let lastTime = performance.now();
let frames = 0;

function measureFPS() {
    frames++;
    const currentTime = performance.now();
    
    if (currentTime >= lastTime + 1000) {
        console.log('FPS:', frames);
        frames = 0;
        lastTime = currentTime;
    }
    
    requestAnimationFrame(measureFPS);
}
```

### Solution:
```javascript
// 1. Use requestAnimationFrame properly
function animate() {
    // Do work
    updateAnimation();
    
    // Schedule next frame
    if (shouldContinue) {
        requestAnimationFrame(animate);
    }
}

// 2. Debounce rapid updates
const debouncedUpdate = debounce(updateVisualization, 16);
slider.addEventListener('input', debouncedUpdate);

// 3. Optimize DOM operations
// Batch DOM updates
function updateDOM(updates) {
    // Use DocumentFragment for multiple elements
    const fragment = document.createDocumentFragment();
    
    updates.forEach(update => {
        const element = document.createElement(update.type);
        element.textContent = update.content;
        fragment.appendChild(element);
    });
    
    container.appendChild(fragment);
}

// 4. Use CSS transforms instead of position
element.style.transform = `translateX(${x}px)`;
// Instead of:
// element.style.left = x + 'px';
```

## 6. Event Handler Issues

### Problem: Events firing multiple times or not at all

### Diagnosis:
```javascript
// Check if handler is attached multiple times
element._listeners = element._listeners || [];
console.log('Listeners:', element._listeners);

// Check event bubbling
element.addEventListener('click', (e) => {
    console.log('Target:', e.target);
    console.log('CurrentTarget:', e.currentTarget);
    console.log('Bubbling:', e.bubbles);
});
```

### Solution:
```javascript
// 1. Remove before adding (prevent duplicates)
element.removeEventListener('click', this.handleClick);
element.addEventListener('click', this.handleClick);

// 2. Use once option for single-fire events
element.addEventListener('click', handler, { once: true });

// 3. Proper event delegation
container.addEventListener('click', (e) => {
    if (e.target.matches('.button-class')) {
        handleButtonClick(e);
    }
});

// 4. Bind context properly
constructor() {
    // Bind once in constructor
    this.handleClick = this.handleClick.bind(this);
}

setupEvents() {
    // Use bound version
    element.addEventListener('click', this.handleClick);
}

cleanup() {
    // Can remove using same reference
    element.removeEventListener('click', this.handleClick);
}
```

## 7. Service Availability Issues

### Problem: Service is undefined

### Diagnosis:
```javascript
console.log('Service available:', 
    typeof GradientDescentService !== 'undefined');

// Check script load order in index.html
// Services should load before levels
```

### Solution:
```javascript
// Always check before using:
if (typeof GradientDescentService !== 'undefined') {
    const result = GradientDescentService.calculate();
} else {
    console.warn('GradientDescentService not available');
    // Use fallback or skip feature
    this.useFallbackCalculation();
}

// Progressive enhancement pattern:
setupFeatures() {
    // Core features (always available)
    this.setupBasicControls();
    
    // Enhanced features (check availability)
    if (typeof GradientDescentService !== 'undefined') {
        this.setupGradientDescent();
    }
    
    if (typeof AnimationService !== 'undefined') {
        this.setupAnimations();
    }
}
```

## Debug Tools and Techniques

### Console Debugging:
```javascript
// Detailed logging in development
if (this.config.debug) {
    console.group('Level State');
    console.log('Parameters:', this.getParameters());
    console.log('Validation:', this.validateParameters());
    console.log('Config:', this.config);
    console.groupEnd();
}

// Breakpoint debugging
debugger; // Pauses execution here

// Conditional breakpoints
if (value > 100) {
    debugger;
}
```

### Performance Profiling:
```javascript
// Measure function performance
console.time('functionName');
expensiveFunction();
console.timeEnd('functionName');

// Memory profiling
console.log('Memory used:', performance.memory.usedJSHeapSize);

// Mark timeline events
performance.mark('myOperation-start');
// ... operation ...
performance.mark('myOperation-end');
performance.measure('myOperation', 
    'myOperation-start', 'myOperation-end');
```

### Error Boundaries:
```javascript
// Wrap risky operations
try {
    riskyOperation();
} catch (error) {
    console.error('Operation failed:', error);
    console.error('Stack:', error.stack);
    
    // Log additional context
    console.error('Level state:', {
        id: this.config.id,
        parameters: this.getParameters(),
        attempts: this.attempts
    });
    
    // Show user-friendly error
    this.showError('Something went wrong. Please refresh.');
    
    // Report to error tracking (if available)
    if (typeof errorReporter !== 'undefined') {
        errorReporter.log(error);
    }
}
```

## Testing Checklist After Fix:

- [ ] Original issue is resolved
- [ ] No new console errors
- [ ] Navigation still works
- [ ] State persists correctly
- [ ] Performance acceptable
- [ ] Memory usage stable
- [ ] Works on mobile
- [ ] Edge cases handled