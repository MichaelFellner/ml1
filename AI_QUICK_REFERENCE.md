# MLTEACH AI Development Quick Reference

## 🚀 Quick Start for AI Tools

When making edits to MLTEACH, use this guide to write more precise prompts and understand the codebase structure.

## 📁 Where to Find Things

| What You Need | Where It Is | Example File |
|--------------|-------------|--------------|
| **Level Logic** | `/levels/` or `/content/` | `levels/balloon-inflation.js` |
| **Navigation Config** | `js_standalone/navigation-config.js` | Add new levels here |
| **UI Utilities** | `utils/ui-patterns.js` | Reusable UI components |
| **Styles** | `/css/` folder | `css/main.css` |
| **Main Entry** | `index.html` | Add script tags here |

## 🎯 Common AI Prompts

### Create a New Level
```
Create a new interactive level called "[Level Name]" that teaches [concept].
It should:
1. Have a slider to control [parameter]
2. Show a visualization of [what to show]
3. Calculate loss when [action happens]
4. Use the standard navigation pattern

Save it as levels/[level-name].js and update navigation-config.js
```

### Modify Existing Level
```
In the file [filename], modify the [function name] function to:
- Change [specific thing]
- Add [new feature]
- Fix [bug description]

Keep the existing structure and patterns.
```

### Add UI Component
```
Add a [component type] to the [level name] level that:
- Shows [what to display]
- Updates when [trigger]
- Uses UIPatterns utilities for consistency
```

## 🔧 Available Utilities

### UIPatterns (utils/ui-patterns.js)
```javascript
// Create slider with label
UIPatterns.createSlider({
    id: 'my-slider',
    label: 'Parameter',
    min: 0, max: 10, value: 5
})

// Show result with styling
UIPatterns.showResult({
    success: true,
    message: 'Perfect!',
    yourAnswer: 5,
    correctAnswer: 5,
    loss: 0
})

// Update loss bar
UIPatterns.updateLossBar(currentLoss, maxLoss)

// Add hover effects
UIPatterns.addHoverEffect('button-id')

// Show success message
UIPatterns.showSuccess('Level Complete!', ['btn-1', 'btn-2'])
```

### DOM Utilities (utils/dom.js)
```javascript
getElementById('id')           // Safe element access
createElement('div', props)    // Create with attributes
addClass(element, 'class')    // Add CSS class
removeClass(element, 'class') // Remove CSS class
```

### Math Utilities (utils/math.js)
```javascript
clamp(value, min, max)        // Constrain value
lerp(start, end, progress)    // Linear interpolation
roundTo(value, decimals)      // Round to decimals
randomBetween(min, max)       // Random in range
```

### Format Utilities (utils/format.js)
```javascript
formatNumber(num, decimals)    // Format with decimals
formatFormula(w, b, x)        // Create formula string
formatPercent(value, total)   // Format as percentage
```

## 📝 Code Patterns

### Standard Level Structure
```javascript
function createLevelName() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-header">Title</div>
            <div class="level-content">
                <!-- Content here -->
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    initializeNavigation('level-id', 'createLevelName');
    setupLevelName(); // If interactive
}

function setupLevelName() {
    // Interactive logic here
}

// Make globally available
window.createLevelName = createLevelName;
window.setupLevelName = setupLevelName;
```

### Adding to Navigation
```javascript
// In navigation-config.js, add to appropriate section:
{
    id: "level-id",
    name: "Level Display Name", 
    func: "createLevelName",
    difficulty: "beginner|intermediate|advanced",
    estimatedTime: 10, // minutes
    type: "interactive|content|quiz"
}
```

### HTML Script Tag
```html
<!-- In index.html, add in the appropriate section: -->
<script src="levels/level-name.js"></script>
```

## ⚠️ Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| **"undefined is not a function"** | Add `window.functionName = functionName` at end of file |
| **"Cannot read property of null"** | Check element ID spelling, add null check |
| **Navigation breaks** | Check function name matches navigation-config.js |
| **Styles not applying** | Make sure CSS classes exist in /css/ files |
| **State not persisting** | Use GameState.saveState() and loadState() |

## 🎨 Styling Guidelines

### Color Palette
- Primary: `#667eea` (purple)
- Secondary: `#764ba2` (darker purple)
- Success: `#2dd573` (green)
- Warning: `#ffa500` (orange)
- Error: `#ff6347` (red)
- Background: `rgba(102,126,234,0.1)` (light purple)

### Container Styles
```css
/* Standard container */
background: rgba(255,255,255,0.9);
border-radius: 15px;
padding: 20px;
box-shadow: 0 4px 6px rgba(0,0,0,0.1);

/* Instruction box */
background: rgba(102,126,234,0.1);
border: 2px solid rgba(102,126,234,0.3);
```

## 📊 Project Statistics

- **Total Levels**: 20+
- **Lines of Code**: ~10,000
- **File Count**: 50+
- **Architecture**: Vanilla JS, No build tools
- **Dependencies**: TensorFlow.js (for ML calculations)

## 🔍 Debugging Tips

1. **Check Console**: F12 → Console tab for errors
2. **Element Inspector**: F12 → Elements to verify HTML
3. **Network Tab**: F12 → Network to check script loading
4. **Add Console Logs**: `console.log('Debug:', variable)`
5. **Check localStorage**: F12 → Application → Local Storage

## 📚 Further Documentation

- **Full Structure**: `/docs/PROJECT_STRUCTURE.md`
- **Code Patterns**: `/.ai/patterns.js`
- **AI Instructions**: `/.ai-instructions`
- **Component Examples**: `/components/examples/`

---

## Example AI Prompt for New Feature

```
Add a new "Momentum Optimizer" level that teaches momentum in gradient descent.

Requirements:
1. Create file: levels/momentum-optimizer.js
2. Use two sliders: learning rate (0-1) and momentum (0-1)
3. Show a ball rolling down a hill visualization
4. Display current velocity and position
5. Use UIPatterns.createSlider for controls
6. Use UIPatterns.updateLossBar for loss display
7. Add to navigation-config.js after the bunny-gradient level
8. Follow the standard level structure pattern

The level should demonstrate how momentum helps avoid local minima.
```

This prompt gives AI tools everything needed to create consistent, working code!
