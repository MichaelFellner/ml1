# 🎯 MASTER PROMPT - Copy & Edit This

Copy this entire prompt, replace [X], [Y], and [Z] with your values, then paste into Claude:

---

## Create New MLTEACH Content

**Create a new level called "[X]" that [Y]. Add it after [Z] in the navigation.**

### PROJECT CONTEXT
You're working on MLTEACH, an educational platform teaching AI/ML concepts through interactive levels. The project uses:
- Pure vanilla JavaScript (no build tools, no npm)
- Script tags only (no ES6 modules/imports)
- All functions must be global (`window.functionName = functionName`)
- Templates: `InteractiveLevelTemplate` for parameter adjustment, `BaseLevelTemplate` for tutorials/content

### CRITICAL REQUIREMENTS

#### 1. VIEWPORT-FRIENDLY LAYOUT (MOST IMPORTANT!)
- **ALL content must fit within viewport - NO SCROLLING**
- Use `max-height: 80vh` for main container
- Use grid (`display: grid; grid-template-columns: 1fr 1fr`) for side-by-side layout
- Instructions: 1-2 sentences maximum
- Test at 1920x1080 and 1366x768 resolutions

#### 2. FILE STRUCTURE
Create file: `levels/[kebab-case-name].js` with this structure:

```javascript
/**
 * [X]
 * 
 * [Brief description of what this teaches]
 */

window.create[PascalCaseName] = function() {
    
    class [PascalCaseName]Level extends window.[TemplateType] {
        constructor() {
            super({
                id: '[kebab-case-id]',
                name: '[X]',
                type: '[interactive|tutorial|demonstration]',
                description: '', // Keep empty or 1 sentence max
                // ... additional config
            });
        }
        
        async setup() {
            await super.setup();
            
            // CRITICAL: Initialize navigation
            if (typeof initializeNavigation === 'function') {
                initializeNavigation('[kebab-case-id]', 'create[PascalCaseName]');
            }
        }
        
        _generateMainContent() {
            return `
                <div style="max-height: 80vh; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; padding: 15px;">
                    <!-- Content here - NO VERTICAL STACKING -->
                </div>
                
                <!-- CRITICAL: Standard navigation -->
                \${typeof createStandardNavigation === 'function' ? createStandardNavigation() : ''}
            `;
        }
    }
    
    const level = new [PascalCaseName]Level();
    level.create().catch(error => {
        console.error('Failed to create [X]:', error);
    });
    
    return level;
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.create[PascalCaseName];
}
```

#### 3. UPDATE navigation-config.js
Add this entry after [Z]:

```javascript
{
    id: "[kebab-case-id]",
    name: "📊 [X]",
    func: "create[PascalCaseName]",
    levelId: "[kebab-case-id]",
    difficulty: "beginner", // or intermediate/advanced
    estimatedTime: 5,
    type: "interactive", // or tutorial/demonstration
    description: "[One sentence description]",
    prerequisites: ["[previous-level-id]"],
    tags: ["tag1", "tag2"],
    lazyLoad: true,
    scriptPath: "levels/[kebab-case-name].js",
    icon: "📊",
    completionCriteria: "completion"
}
```

Also update dependencies.core:
```javascript
"[kebab-case-id]": ["[previous-level-id]"]
```

#### 4. UPDATE levels/index.js
```javascript
import { create[PascalCaseName] } from './[kebab-case-name]';

// In window.MLTeachLevels.levels:
'[kebab-case-id]': window.create[PascalCaseName]

// In window.MLTeachLevels.levelMetadata:
'[kebab-case-id]': {
    id: '[kebab-case-id]',
    name: '[X]',
    type: 'interactive',
    description: '[Brief description]',
    created: new Date().toISOString(),
    version: '1.0.0'
}
```

#### 5. UPDATE index.html
Add script tag with other level scripts:
```html
<script src="levels/[kebab-case-name].js"></script>
```

### STYLE GUIDELINES

#### Compact Layout Pattern:
```html
<div style="max-height: 70vh; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    <!-- Left Panel -->
    <div style="background: white; border-radius: 10px; padding: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <h4 style="margin: 0 0 10px 0;">Visualization</h4>
        <!-- Keep height constrained -->
    </div>
    
    <!-- Right Panel -->
    <div style="background: white; border-radius: 10px; padding: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <h4 style="margin: 0 0 10px 0;">Controls</h4>
        <!-- Stack controls vertically within panel -->
    </div>
</div>
```

#### For Interactive Levels (InteractiveLevelTemplate):
- Define `targetFunction: { param: targetValue }`
- Define `controls: [{ id, label, min, max, step, default }]`
- Set `validation: { tolerance: 0.05 }`
- Override `_generateVisualizationContent()` for custom visuals

#### For Tutorial/Content (BaseLevelTemplate):
- Override `_generateMainContent()` with your content
- Use tabs or accordion for multiple sections
- Keep text concise and scannable

### COMMON PATTERNS TO USE

#### Service Check:
```javascript
if (typeof ServiceName !== 'undefined') {
    // Use service
} else {
    // Graceful fallback
}
```

#### State Management:
```javascript
if (typeof LevelProgressStore !== 'undefined') {
    LevelProgressStore.completeLevel(id, { score, solutions });
    GameStateStore.updateParameters(id, params);
}
```

### DO NOT:
- Create scrolling layouts
- Use ES6 import/export statements
- Forget navigation config updates
- Use long instructions or descriptions
- Stack elements vertically (use grid)
- Use innerHTML with user data
- Forget standard navigation

### DELIVERABLES:
1. Complete level file: `levels/[kebab-case-name].js`
2. Updated `navigation-config.js` with new entry after [Z]
3. Updated `levels/index.js` with registration
4. Updated `index.html` with script tag
5. Confirmation that all files use the compact, viewport-friendly layout

---

# 📝 Quick Edit Guide

Before pasting into Claude, replace:
- **[X]** = Name of your content (e.g., "Temperature Optimizer")
- **[Y]** = What it does/teaches (e.g., "teaches optimization by finding the perfect room temperature")
- **[Z]** = Previous level ID in navigation (e.g., "gradient-descent-overview") or "at the end" for last position

Example filled out:
- [X] = "Temperature Optimizer"
- [Y] = "teaches optimization by finding the perfect room temperature"
- [Z] = "gradient-descent-overview"