# Modify Existing Level Prompt Template

## Prompt Structure

In the file `[FILE_PATH]`, modify the `[FUNCTION_NAME]` function to [DESCRIPTION_OF_CHANGE].

### Requirements:

1. **Maintain existing structure and patterns**
2. **Keep the same function signatures**
3. **Preserve navigation compatibility**
4. **Update without breaking dependencies**

### Common Modification Types:

## 1. Add New Parameter/Control

```
In levels/[level-name].js, add a new parameter control for [PARAMETER_NAME]:
- Add to controls array in constructor
- Update targetFunction with target value
- Modify visualization to reflect parameter
- Update validation logic if needed
```

### Template:
```javascript
// In constructor, add to controls array:
{
    id: '[param-id]',
    label: '[Display Name]',
    min: [MIN],
    max: [MAX],
    step: [STEP],
    default: [DEFAULT]
}

// Add to targetFunction:
targetFunction: {
    // ... existing
    [param-id]: [TARGET_VALUE]
}

// In updateControl method:
if (controlId === '[param-id]') {
    // Update visualization based on new parameter
    this.updateVisualization();
}
```

## 2. Modify Visualization

```
In levels/[level-name].js, update the visualization to show [NEW_VISUAL_ELEMENT]:
- Modify _generateVisualizationContent() method
- Update rendering logic
- Add animation if needed
```

### Template:
```javascript
_generateVisualizationContent() {
    return `
        <div class="visualization-container">
            <!-- Existing visualization -->
            
            <!-- New visual element -->
            <div id="[element-id]" style="[styles]">
                [Content]
            </div>
        </div>
    `;
}

// Add update logic in updateControl or separate method:
updateVisualization() {
    const element = document.getElementById('[element-id]');
    if (element) {
        // Update visual based on parameters
        element.style.transform = `scale(${this.parameters.value})`;
    }
}
```

## 3. Change Validation Logic

```
In levels/[level-name].js, modify validation to [NEW_VALIDATION_RULE]:
- Update tolerance settings
- Modify success criteria
- Change feedback messages
```

### Template:
```javascript
// In constructor:
validation: {
    tolerance: [NEW_TOLERANCE], // e.g., 0.1 for 10%
    customValidation: true // Flag for custom logic
}

// Override validateParameters:
validateParameters(testParameters = null) {
    const params = testParameters || this.getParameters();
    
    // Custom validation logic
    const isValid = [VALIDATION_CONDITION];
    const accuracy = [ACCURACY_CALCULATION];
    
    return {
        success: isValid,
        accuracy: Math.round(accuracy),
        details: [
            `Parameter: ${params.value} (target: ${target})`,
            isValid ? '✅ Success!' : '❌ Try again'
        ]
    };
}
```

## 4. Add Animation

```
In levels/[level-name].js, add animation for [ELEMENT]:
- Create animation loop
- Update on parameter change
- Clean up properly
```

### Template:
```javascript
// In setup method:
async setup() {
    await super.setup();
    this.startAnimation();
}

startAnimation() {
    const animate = () => {
        // Update animation based on parameters
        this.updateAnimationFrame();
        
        if (!this.stopAnimation) {
            this.animationId = requestAnimationFrame(animate);
        }
    };
    
    this.animationId = requestAnimationFrame(animate);
}

updateAnimationFrame() {
    const element = document.getElementById('[element-id]');
    if (element) {
        // Animation logic
        const progress = this.calculateProgress();
        element.style.transform = `translateX(${progress}px)`;
    }
}

// In onTeardown:
async onTeardown() {
    this.stopAnimation = true;
    if (this.animationId) {
        cancelAnimationFrame(this.animationId);
    }
    await super.onTeardown();
}
```

## 5. Fix Bug

```
In [FILE_PATH], fix the bug where [BUG_DESCRIPTION]:
- Identify root cause
- Apply minimal fix
- Test edge cases
- Add error handling
```

### Common Bug Fixes:

#### Null Reference Error:
```javascript
// Before:
const element = document.getElementById('id');
element.innerHTML = 'content'; // Error if null

// After:
const element = document.getElementById('id');
if (element) {
    element.innerHTML = 'content';
} else {
    console.warn('Element not found: id');
}
```

#### Navigation Function Not Found:
```javascript
// Add at end of file:
window.functionName = functionName;
```

#### Memory Leak:
```javascript
// Add cleanup:
async onTeardown() {
    // Clear intervals
    if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
    }
    
    // Remove event listeners
    if (this.boundHandler) {
        element.removeEventListener('event', this.boundHandler);
        this.boundHandler = null;
    }
    
    // Clear references
    this.heavyObject = null;
    
    await super.onTeardown();
}
```

## 6. Improve Performance

```
In levels/[level-name].js, optimize performance by:
- Debouncing rapid updates
- Caching DOM queries
- Reducing reflows
- Using requestAnimationFrame
```

### Template:
```javascript
// Debounce slider updates:
constructor() {
    super({...});
    
    // Create debounced update function
    this.debouncedUpdate = this.debounce(
        this.updateVisualization.bind(this), 
        16 // ~60fps
    );
}

debounce(func, wait) {
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

updateControl(controlId, value, validate = false) {
    super.updateControl(controlId, value, validate);
    
    // Use debounced update instead of direct update
    this.debouncedUpdate();
}
```

## 7. Add Feature

```
In levels/[level-name].js, add feature for [FEATURE_DESCRIPTION]:
- Plan integration points
- Add UI elements
- Implement logic
- Update state management
```

### Example: Add Reset Button
```javascript
// In _generateVisualizationContent or _generateMainContent:
<button id="reset-btn" onclick="currentLevel.resetParameters()"
        style="padding: 8px 16px; background: #ff6347; color: white; 
               border: none; border-radius: 5px; cursor: pointer;">
    Reset to Defaults
</button>

// Add method to class:
resetParameters() {
    // Reset to default values
    this.config.controls.forEach(control => {
        this.updateControl(control.id, control.default, false);
        
        // Update slider UI
        const slider = document.getElementById(`${control.id}-slider`);
        if (slider) {
            slider.value = control.default;
        }
    });
    
    // Show feedback
    this.showSuccess('Parameters reset to defaults', 2000);
}
```

## Testing After Modifications

Always verify:
1. No console errors
2. Navigation still works
3. State persists correctly
4. Mobile responsive
5. Performance acceptable
6. Edge cases handled

## Example Full Prompt:

```
In levels/balloon-inflation.js, modify the setupBalloonLevel function to:
1. Add a "wind resistance" parameter (0-10, default 5)
2. Update the balloon animation to wobble based on wind
3. Make the optimal inflation harder with wind
4. Show wind effect visually with particles

Keep the existing structure and ensure navigation still works.
```