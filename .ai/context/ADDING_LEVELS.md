# Adding New Levels Guide

This document explains how to create new levels for the MLTEACH platform, including manual creation and using the automated CLI tool.

## Quick Start with CLI Tool

The fastest way to create a new level is using the `create-level.js` script:

```bash
# Create an interactive level
node scripts/create-level.js "Gravity Challenge" interactive

# Create a tutorial level
node scripts/create-level.js "ML Basics Tutorial" tutorial

# Create a demonstration level
node scripts/create-level.js "AI Optimization Demo" demonstration
```

The CLI tool will:
- Generate complete level code from templates
- Create the level file in `levels/` folder
- Update `levels/index.js` automatically
- Update navigation configuration
- Provide usage instructions

## Manual Level Creation

### Step 1: Choose Your Template

#### BaseLevelTemplate
Use for general-purpose levels, tutorials, and custom implementations:

```javascript
class MyLevel extends BaseLevelTemplate {
    constructor() {
        super({
            id: 'my-level-id',
            name: 'My Level Name',
            type: 'tutorial', // or 'demonstration', 'custom'
            description: 'Brief description of the level',
            trackProgress: true,
            debug: false
        });
    }
}
```

#### InteractiveLevelTemplate
Use for levels where users adjust parameters to reach target values:

```javascript
class MyInteractiveLevel extends InteractiveLevelTemplate {
    constructor() {
        super({
            id: 'my-interactive-level',
            name: 'My Interactive Challenge',
            type: 'interactive',
            description: 'Adjust parameters to reach the target!',
            
            // Define target function
            targetFunction: { w: 7.0, b: 0 },
            
            // Define user controls
            controls: [
                {
                    id: 'w',
                    label: 'Weight Parameter',
                    min: 0,
                    max: 15,
                    step: 0.1,
                    default: 1.0
                },
                {
                    id: 'b',
                    label: 'Bias Parameter', 
                    min: -5,
                    max: 5,
                    step: 0.1,
                    default: 0
                }
            ],
            
            // Validation settings
            validation: {
                tolerance: 0.05 // 5% tolerance
            }
        });
    }
}
```

### Step 2: Implement Required Methods

#### For All Levels

```javascript
class MyLevel extends BaseLevelTemplate {
    // Required: Generate the main content HTML
    _generateMainContent() {
        return `
            <div class="level-content">
                <h3>Welcome to My Level</h3>
                <p>Instructions and content go here</p>
                
                <button onclick="currentLevel.completeLevel({score: 100})">
                    Complete Level
                </button>
            </div>
        `;
    }
    
    // Optional: Custom setup logic
    async setup() {
        await super.setup();
        
        // Your custom setup code
        this.setupCustomControls();
        this.initializeVisualization();
        
        this.log('My level setup complete');
    }
    
    // Optional: Custom cleanup
    async onTeardown() {
        await super.onTeardown();
        
        // Your cleanup code
        this.clearVisualization();
        
        this.log('My level cleanup complete');
    }
}
```

#### For Interactive Levels

```javascript
class MyInteractiveLevel extends InteractiveLevelTemplate {
    // Override for custom visualization
    _generateVisualizationContent() {
        return `
            <div class="custom-visualization" style="height: 300px;">
                <canvas id="my-canvas" width="400" height="300"></canvas>
                <div id="visual-feedback"></div>
            </div>
        `;
    }
    
    // Optional: Custom parameter update handling
    updateControl(controlId, value, validate = false) {
        super.updateControl(controlId, value, validate);
        
        // Custom logic after parameter update
        this.updateVisualization();
        this.updateCustomDisplay();
    }
    
    // Optional: Custom validation logic
    validateParameters(testParameters = null) {
        const params = testParameters || this.getParameters();
        
        // Custom validation logic here
        // Return: { success: boolean, accuracy: number, details: array }
        
        // Or use default validation
        return super.validateParameters(testParameters);
    }
}
```

### Step 3: Create the Level File

Create a file in the `levels/` folder with a descriptive kebab-case name:

**File: `levels/gravity-challenge.js`**

```javascript
/**
 * Gravity Challenge Level
 * 
 * Interactive level where users adjust gravity to make objects land correctly.
 * 
 * @fileoverview Interactive physics simulation level
 * @author Your Name
 * @version 1.0.0
 * @type interactive
 */

// Check dependencies
if (typeof InteractiveLevelTemplate === 'undefined') {
    console.error('InteractiveLevelTemplate not loaded');
}

if (typeof GradientDescentService === 'undefined') {
    console.warn('GradientDescentService not available');
}

/**
 * Gravity Challenge Implementation
 */
class GravityChallengeLevel extends InteractiveLevelTemplate {
    
    constructor() {
        super({
            id: 'gravity-challenge',
            name: 'Gravity Challenge',
            type: 'interactive',
            description: 'Adjust gravity to make the ball land in the target zone!',
            
            targetFunction: { gravity: 9.8 },
            
            controls: [
                {
                    id: 'gravity',
                    label: 'Gravity (m/s²)',
                    min: 0,
                    max: 20,
                    step: 0.1,
                    default: 10.0
                }
            ],
            
            validation: {
                tolerance: 0.1 // 10% tolerance for physics
            },
            
            trackProgress: true,
            debug: false
        });
    }
    
    async setup() {
        await super.setup();
        
        this.initializePhysics();
        this.startAnimation();
        
        this.log('Gravity challenge setup complete');
    }
    
    _generateVisualizationContent() {
        return `
            <div class="physics-simulation" style="position: relative; height: 300px; background: linear-gradient(to bottom, #87CEEB, #98FB98); border-radius: 10px; overflow: hidden;">
                <!-- Ball -->
                <div id="ball" style="position: absolute; width: 20px; height: 20px; background: red; border-radius: 50%; top: 50px; left: 50px; transition: none;"></div>
                
                <!-- Target -->
                <div id="target" style="position: absolute; width: 80px; height: 20px; background: gold; bottom: 20px; left: 300px; border-radius: 10px;"></div>
                
                <!-- Ground -->
                <div style="position: absolute; bottom: 0; width: 100%; height: 20px; background: brown;"></div>
            </div>
        `;
    }
    
    initializePhysics() {
        this.ball = {
            x: 50,
            y: 50,
            vx: 5,
            vy: 0,
            gravity: this.getParameters().gravity
        };
        
        this.target = { x: 300, y: 260, width: 80, height: 20 };
    }
    
    updateControl(controlId, value, validate = false) {
        super.updateControl(controlId, value, validate);
        
        if (controlId === 'gravity') {
            this.ball.gravity = value;
            this.resetBall();
        }
    }
    
    resetBall() {
        this.ball.x = 50;
        this.ball.y = 50;
        this.ball.vy = 0;
        
        const ballElement = document.getElementById('ball');
        if (ballElement) {
            ballElement.style.left = '50px';
            ballElement.style.top = '50px';
        }
    }
    
    startAnimation() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        const animate = () => {
            this.updatePhysics();
            this.renderBall();
            
            if (this.ball.y < 260) {
                this.animationId = requestAnimationFrame(animate);
            } else {
                this.checkLanding();
            }
        };
        
        animate();
    }
    
    updatePhysics() {
        this.ball.vy += this.ball.gravity * 0.016; // 60fps
        this.ball.x += this.ball.vx * 0.016 * 60;
        this.ball.y += this.ball.vy * 0.016 * 60;
    }
    
    renderBall() {
        const ballElement = document.getElementById('ball');
        if (ballElement) {
            ballElement.style.left = `${this.ball.x}px`;
            ballElement.style.top = `${this.ball.y}px`;
        }
    }
    
    checkLanding() {
        const landed = this.ball.x >= this.target.x && 
                     this.ball.x <= this.target.x + this.target.width;
        
        if (landed) {
            this.showSuccess('Perfect landing! 🎯', 3000);
        } else {
            this.showError('Missed the target! Try adjusting gravity.', 3000);
        }
        
        // Reset after delay
        this.createTimeout(() => {
            this.resetBall();
            this.startAnimation();
        }, 2000);
    }
    
    async onTeardown() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        await super.onTeardown();
        this.log('Gravity challenge cleanup complete');
    }
}

/**
 * Creates the Gravity Challenge level
 */
async function createGravityChallengeLevel() {
    try {
        const level = new GravityChallengeLevel();
        await level.create();
        
        window.currentLevel = level;
        return level;
        
    } catch (error) {
        console.error('Failed to create Gravity Challenge:', error);
        
        const container = document.getElementById('app');
        if (container) {
            container.innerHTML = `
                <div style="padding: 40px; text-align: center; color: #ff6347;">
                    <h2>⚠️ Level Loading Error</h2>
                    <p>Failed to load Gravity Challenge. Please refresh the page.</p>
                    <button onclick="location.reload()" style="padding: 10px 20px; margin-top: 20px;">
                        🔄 Refresh Page
                    </button>
                </div>
            `;
        }
        
        throw error;
    }
}

// Export for modules and global usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createGravityChallengeLevel };
} else {
    window.createGravityChallengeLevel = createGravityChallengeLevel;
}
```

### Step 4: Register the Level

#### Update `levels/index.js`

Add your level to the index file:

```javascript
// Add import
import { createGravityChallengeLevel } from './gravity-challenge.js';

// Add to exports
export {
    // ... existing exports
    createGravityChallengeLevel
};

// Add to levels registry
export const levels = {
    // ... existing levels
    'gravity-challenge': createGravityChallengeLevel
};

// Add metadata
export const levelMetadata = {
    // ... existing metadata
    'gravity-challenge': {
        id: 'gravity-challenge',
        name: 'Gravity Challenge',
        type: 'interactive',
        description: 'Adjust gravity to make the ball land in the target zone!',
        created: '2024-01-01T00:00:00.000Z',
        version: '1.0.0'
    }
};
```

#### Update `index.html`

Add the script tag to include your level:

```html
<!-- Level files from the levels/ folder -->
<script src="levels/gravity-challenge.js"></script>
```

#### Update Navigation Config

Add your level to `js_standalone/navigation-config.js`:

```javascript
const levels = {
    // ... existing levels
    'gravity-challenge': {
        name: 'Gravity Challenge',
        function: 'createGravityChallengeLevel',
        type: 'interactive',
        description: 'Adjust gravity to make the ball land in the target zone!'
    }
};
```

## Level Types and Patterns

### Interactive Levels
**Best for:** Parameter adjustment, optimization challenges, hands-on learning

**Features:**
- Parameter sliders with real-time feedback
- Target function validation
- Visual feedback and scoring
- Built-in hint system

**Example Use Cases:**
- Balloon inflation optimization
- Function fitting challenges
- Physics simulations
- ML hyperparameter tuning

### Tutorial Levels
**Best for:** Step-by-step instruction, concept introduction

**Features:**
- Sequential steps with navigation
- Progress tracking
- Content-rich instruction pages
- Built-in completion tracking

**Example Use Cases:**
- Gradient descent explanation
- Algorithm walkthroughs
- Concept introductions
- Theory explanations

### Demonstration Levels
**Best for:** Showing AI in action, automated processes

**Features:**
- Automated optimization display
- Real-time parameter updates
- Progress visualization
- Start/stop/reset controls

**Example Use Cases:**
- AI optimization showcase
- Algorithm demonstrations
- Automated training processes
- Performance comparisons

### Custom Levels
**Best for:** Unique implementations, special requirements

**Features:**
- Full control over implementation
- Access to all base template features
- Custom interaction patterns
- Flexible content structure

## Service Integration

### Gradient Descent Service

Use for ML-related calculations:

```javascript
// Check availability first
if (typeof GradientDescentService !== 'undefined') {
    const loss = GradientDescentService.calculateL1Loss(predicted, actual);
    const gradients = GradientDescentService.calculateGradient(w, b, data, 'L2');
    const newParams = GradientDescentService.performStep(params, gradients, 0.01);
}
```

### Level Validation Service

Use for complex validation logic:

```javascript
if (typeof LevelValidationService !== 'undefined') {
    const isValid = LevelValidationService.validateParameters(params, constraints);
    const feedback = LevelValidationService.generateFeedback(results);
}
```

### Animation Service

Use for smooth animations:

```javascript
if (typeof AnimationService !== 'undefined') {
    AnimationService.smoothTransition(element, { opacity: 0 }, { opacity: 1 }, 300);
    AnimationService.animateValue(0, 100, 1000, (value) => updateDisplay(value));
}
```

## State Management Integration

### Progress Tracking

```javascript
// Automatically handled by templates, but you can customize:
this.completeLevel({
    score: 95,
    solutions: { gravity: 9.8 },
    timeSpent: 120000,
    attempts: 3,
    customData: { landingDistance: 2.5 }
});
```

### Parameter Persistence

```javascript
// Save current state
if (typeof GameStateStore !== 'undefined') {
    GameStateStore.updateParameters(this.config.id, this.getParameters());
}

// Restore previous state
const savedParams = GameStateStore.getParameters(this.config.id);
if (savedParams) {
    this.updateParameters(savedParams);
}
```

## Testing Your Level

### Manual Testing Checklist

1. **Loading**
   - [ ] Level loads without errors
   - [ ] All dependencies are available
   - [ ] UI renders correctly

2. **Interaction**
   - [ ] Controls work as expected
   - [ ] Parameter updates are reflected
   - [ ] Validation logic functions correctly

3. **Completion**
   - [ ] Level can be completed successfully
   - [ ] Progress is saved correctly
   - [ ] Navigation to next level works

4. **Error Handling**
   - [ ] Graceful degradation without services
   - [ ] Error messages are user-friendly
   - [ ] Recovery mechanisms work

### Automated Testing

```javascript
// Test level creation
const level = new MyLevel();
await level.create();

// Test parameter updates
level.updateParameters({ param: 5.0 });
console.assert(level.getParameters().param === 5.0);

// Test validation
const validation = level.validateParameters();
console.assert(typeof validation.success === 'boolean');

// Test completion
let completionFired = false;
window.addEventListener('mlteach:level:levelCompleted', () => {
    completionFired = true;
});

level.completeLevel({ score: 100 });
console.assert(completionFired === true);

// Cleanup
await level.teardown();
```

## Common Patterns and Best Practices

### Progressive Enhancement
Always check for feature availability:

```javascript
// Check for advanced features
const hasServices = typeof GradientDescentService !== 'undefined';
const hasStateManagement = typeof LevelProgressStore !== 'undefined';

if (hasServices) {
    this.setupAdvancedFeatures();
} else {
    this.setupBasicFeatures();
}
```

### Error Boundaries
Handle errors gracefully:

```javascript
async setup() {
    try {
        await super.setup();
        await this.setupCustomFeatures();
    } catch (error) {
        console.error('Setup failed:', error);
        this.showFallbackUI();
    }
}

showFallbackUI() {
    this.container.innerHTML = `
        <div class="error-state">
            <h3>Oops! Something went wrong</h3>
            <p>Please refresh the page to try again.</p>
            <button onclick="location.reload()">Refresh</button>
        </div>
    `;
}
```

### Performance Optimization
Clean up resources properly:

```javascript
async onTeardown() {
    // Cancel animations
    if (this.animationId) {
        cancelAnimationFrame(this.animationId);
    }
    
    // Clear intervals and timeouts
    if (this.updateInterval) {
        clearInterval(this.updateInterval);
    }
    
    // Remove heavy objects
    this.visualization = null;
    this.chart = null;
    
    await super.onTeardown();
}
```

### Accessibility
Make levels accessible:

```javascript
_generateMainContent() {
    return `
        <div role="main" aria-label="Level content">
            <h2 id="level-title">${this.config.name}</h2>
            
            <button 
                aria-describedby="level-title"
                onclick="this.attemptSolution()"
            >
                Try Solution
            </button>
            
            <div 
                role="region" 
                aria-label="Results"
                id="results-section"
            ></div>
        </div>
    `;
}
```

## Debugging Tips

### Enable Debug Mode
Set `debug: true` in your level config to get detailed logging:

```javascript
constructor() {
    super({
        // ... other config
        debug: true // Enable detailed logging
    });
}
```

### Use Browser DevTools
- Check console for errors and warnings
- Use Network tab to verify all resources load
- Use Elements tab to inspect generated HTML
- Use Application tab to check localStorage

### Level-Specific Debugging
Access the current level from console:

```javascript
// In browser console
console.log(window.currentLevel);
console.log(window.currentLevel.getParameters());
console.log(window.currentLevel.config);
```

## CLI Tool Reference

### Basic Usage
```bash
node scripts/create-level.js "<Level Name>" <type> [options]
```

### Types
- `interactive` - Parameter adjustment levels
- `tutorial` - Step-by-step guided levels  
- `demonstration` - AI showcase levels
- `custom` - Basic template for custom implementation

### Options
- `--debug` - Enable debug mode
- `--no-services` - Exclude service integrations
- `--no-state` - Exclude state management
- `--interactive` - Use interactive configuration prompts
- `--author <name>` - Set author name

### Examples
```bash
# Interactive level with prompts
node scripts/create-level.js "Custom Challenge" interactive --interactive

# Tutorial without state management
node scripts/create-level.js "Learning Module" tutorial --no-state

# Debug-enabled demonstration
node scripts/create-level.js "AI Demo" demonstration --debug
```

The CLI tool automatically:
- Generates complete, functional level code
- Creates proper file structure
- Updates all necessary registry files
- Provides next steps and integration instructions

This guide should help you create engaging, educational levels for the MLTEACH platform!