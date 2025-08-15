# Create Interactive Level Prompt Template

## Prompt Structure

Create an interactive level called "[LEVEL_NAME]" that teaches [CONCEPT].

### Requirements:

1. **🎯 VIEWPORT-FRIENDLY LAYOUT (CRITICAL)**
   - **ALL content must fit within viewport (no scrolling)**
   - Use `max-height: 80vh` for level content container
   - Prefer side-by-side layouts (grid or flexbox)
   - Keep instructions to 1-2 concise sentences
   - Test at 1920x1080 and 1366x768 resolutions
   - Mobile can stack vertically (scrolling acceptable on mobile)

2. **Extend InteractiveLevelTemplate**
   - Use the class-based template system
   - Include proper constructor configuration

3. **Define Target Function**
   ```javascript
   targetFunction: { 
       [PARAM1]: [TARGET_VALUE1],
       [PARAM2]: [TARGET_VALUE2] 
   }
   ```

4. **Create Controls**
   ```javascript
   controls: [
       {
           id: '[PARAM_ID]',
           label: '[DISPLAY_NAME]',
           min: [MIN_VALUE],
           max: [MAX_VALUE],
           step: [STEP_SIZE],
           default: [DEFAULT_VALUE]
       }
   ]
   ```

5. **Validation Settings**
   - Set appropriate tolerance (usually 0.05 for 5%)
   - Include success/failure messages

6. **Custom Visualization** (if needed)
   - Override `_generateVisualizationContent()`
   - Keep visualization height under 60vh
   - Use grid layout for side-by-side panels

7. **File Structure**
   - Save as: `levels/[kebab-case-name].js`
   - Add to: `navigation-config.js` after [PREVIOUS_LEVEL]
   - Include in: `index.html` with script tag

8. **Standard Patterns**
   - Use global function pattern
   - Include proper error handling
   - Implement cleanup in `onTeardown()`
   - Check service availability

### 📐 Compact Layout Pattern (Use This!):

```html
<!-- Container with viewport constraint -->
<div class="visualization-container" style="
    max-height: 70vh;  /* Leave room for header and navigation */
    display: grid;
    grid-template-columns: 1fr 1fr;  /* Side-by-side layout */
    gap: 20px;
    padding: 15px;
">
    <!-- Compact instruction bar (spans both columns) -->
    <div style="grid-column: 1 / -1; 
                background: rgba(102,126,234,0.1); 
                border-radius: 8px; 
                padding: 8px 15px;
                margin-bottom: 10px;">
        <p style="margin: 0; text-align: center; font-size: 0.95rem; color: #555;">
            Brief instruction - keep to one sentence!
        </p>
    </div>
    
    <!-- Left panel: Visualization -->
    <div style="background: white; 
                border-radius: 10px; 
                padding: 15px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                overflow: hidden;">
        <h4 style="margin: 0 0 10px 0;">Visualization</h4>
        <!-- Keep content compact -->
    </div>
    
    <!-- Right panel: Controls -->
    <div style="background: white; 
                border-radius: 10px; 
                padding: 15px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                display: flex;
                flex-direction: column;
                gap: 15px;">
        <h4 style="margin: 0;">Controls</h4>
        <!-- Stack controls vertically in this panel -->
    </div>
</div>
```

### Example Usage:

```
Create an interactive level called "Temperature Control" that teaches optimization through finding the perfect room temperature.

Requirements:
1. Extend InteractiveLevelTemplate
2. Target temperature: 22°C (comfort zone)
3. Control: Temperature slider (15-30°C, step 0.5)
4. Show a room visualization that changes color based on temperature
5. Calculate "discomfort" as loss (too hot = red, too cold = blue)
6. Tolerance: 1°C (about 5%)
7. IMPORTANT: Use grid layout to keep everything visible without scrolling
8. Save as levels/temperature-control.js
9. Add after the balloon-inflation level in navigation
```

### Code Structure Template:

```javascript
/**
 * [Level Name] Level
 * 
 * [Description of what the level teaches]
 * 
 * @fileoverview Interactive level implementation
 * @author [Your Name]
 * @version 1.0.0
 * @type interactive
 */

// Dependency checks
if (typeof InteractiveLevelTemplate === 'undefined') {
    console.error('InteractiveLevelTemplate not loaded');
}

/**
 * [Level Name] Implementation
 */
class [ClassName]Level extends InteractiveLevelTemplate {
    
    constructor() {
        super({
            id: '[level-id]',
            name: '[Display Name]',
            type: 'interactive',
            description: '[Keep this to 1-2 sentences max]',
            
            targetFunction: { 
                // Define target parameters
            },
            
            controls: [
                // Define user controls
            ],
            
            validation: {
                tolerance: 0.05 // 5% tolerance
            },
            
            trackProgress: true,
            debug: false
        });
    }
    
    async setup() {
        await super.setup();
        // Custom setup logic
        this.log('[Level Name] setup complete');
    }
    
    _generateVisualizationContent() {
        return `
            <div class="visualization-container" style="
                max-height: 70vh;
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
                padding: 15px;
            ">
                <!-- Compact instruction -->
                <div style="grid-column: 1 / -1; 
                            background: rgba(102,126,234,0.1); 
                            border-radius: 8px; 
                            padding: 8px 15px;
                            margin-bottom: 10px;">
                    <p style="margin: 0; text-align: center; font-size: 0.95rem; color: #555;">
                        [One sentence instruction]
                    </p>
                </div>
                
                <!-- Left: Visualization -->
                <div style="background: white; 
                            border-radius: 10px; 
                            padding: 15px;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <h4 style="margin: 0 0 10px 0; color: #333;">Visualization</h4>
                    <!-- Your visualization here (canvas, svg, etc.) -->
                    <canvas id="viz-canvas" width="400" height="300"
                            style="width: 100%; max-height: 50vh;">
                    </canvas>
                </div>
                
                <!-- Right: Controls & Status -->
                <div style="background: white; 
                            border-radius: 10px; 
                            padding: 15px;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                            display: flex;
                            flex-direction: column;
                            gap: 15px;">
                    <h4 style="margin: 0; color: #333;">Controls</h4>
                    
                    <!-- Parameter controls -->
                    <div id="controls-container">
                        <!-- Controls will be inserted here -->
                    </div>
                    
                    <!-- Compact status display -->
                    <div style="background: #f8f9fa; 
                                border-radius: 8px; 
                                padding: 10px;">
                        <div style="display: flex; justify-content: space-between;">
                            <span>Loss:</span>
                            <span id="loss-display" style="font-weight: bold;">0.00</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span>Accuracy:</span>
                            <span id="accuracy-display" style="font-weight: bold;">0%</span>
                        </div>
                    </div>
                    
                    <!-- Action buttons -->
                    <button onclick="currentLevel.checkSolution()"
                            style="padding: 10px; 
                                   background: linear-gradient(135deg, #667eea, #764ba2); 
                                   color: white; 
                                   border: none; 
                                   border-radius: 8px; 
                                   cursor: pointer;
                                   font-weight: bold;">
                        Check Solution
                    </button>
                </div>
            </div>
        `;
    }
    
    updateControl(controlId, value, validate = false) {
        super.updateControl(controlId, value, validate);
        // Update visualization based on parameter changes
        this.updateCompactDisplay();
    }
    
    updateCompactDisplay() {
        // Update displays efficiently without causing layout shifts
        const lossDisplay = document.getElementById('loss-display');
        const accuracyDisplay = document.getElementById('accuracy-display');
        
        if (lossDisplay) {
            const loss = this.calculateLoss();
            lossDisplay.textContent = loss.toFixed(2);
        }
        
        if (accuracyDisplay) {
            const validation = this.validateParameters();
            accuracyDisplay.textContent = `${validation.accuracy}%`;
        }
    }
    
    async onTeardown() {
        // Custom cleanup
        await super.onTeardown();
        this.log('[Level Name] cleanup complete');
    }
}

/**
 * Creates the [Level Name] level
 */
async function create[ClassName]Level() {
    try {
        const level = new [ClassName]Level();
        await level.create();
        
        window.currentLevel = level;
        return level;
        
    } catch (error) {
        console.error('Failed to create [Level Name]:', error);
        
        const container = document.getElementById('app');
        if (container) {
            container.innerHTML = `
                <div style="padding: 40px; text-align: center; color: #ff6347;">
                    <h2>⚠️ Level Loading Error</h2>
                    <p>Failed to load [Level Name]. Please refresh the page.</p>
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
    module.exports = { create[ClassName]Level };
} else {
    window.create[ClassName]Level = create[ClassName]Level;
}
```

### 📏 Viewport Testing Checklist:
- [ ] All content visible at 1920x1080 without scrolling
- [ ] All content visible at 1366x768 without scrolling
- [ ] Instructions are concise (1-2 sentences max)
- [ ] Uses grid or flexbox for side-by-side layout
- [ ] Visualization height is constrained (max 60vh)
- [ ] Controls are organized in compact panels
- [ ] No vertical stacking of major sections
- [ ] Mobile layout gracefully degrades (stacking OK on mobile)

### 🚫 Avoid These Patterns:
- Long vertical lists of controls
- Multiple stacked sections
- Large headers or spacing
- Verbose instructions
- Full-width layouts that waste horizontal space
- Unnecessary decorative elements that take up space