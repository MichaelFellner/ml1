# 🎯 MLTEACH Content Creation Guide

## Critical Requirements Checklist

When creating ANY new level or instructional part, you MUST:

### ✅ ESSENTIAL STEPS (DO ALL OF THESE)
1. **Create the content file** in `/levels/` folder
2. **Update navigation-config.js** - Add entry in appropriate section
3. **Update levels/index.js** - Register the level
4. **Add script tag to index.html** - Include the file
5. **Include standard navigation** - Add `${createStandardNavigation()}` 
6. **Initialize navigation** - Call `initializeNavigation(levelId, functionName)`
7. **Make function global** - Add `window.functionName = functionName`
8. **Use viewport-friendly layout** - Content must fit without scrolling

### 🚫 CRITICAL CONSTRAINTS
- **NO SCROLLING** - All content must fit within viewport (max-height: 80vh)
- **BRIEF INSTRUCTIONS** - Maximum 1-2 sentences
- **SIDE-BY-SIDE LAYOUT** - Use grid/flexbox for desktop
- **NO ES6 MODULES** - Use script tags and global functions

## Quick Template

```javascript
/**
 * [Content Name]
 * 
 * [Brief description]
 */

window.create[ContentName] = function() {
    
    class [ContentName]Level extends window.[TemplateType] {
        constructor() {
            super({
                id: '[content-id]',
                name: '[Display Name]',
                type: '[type]', // 'interactive', 'tutorial', 'demonstration'
                description: '', // Keep empty or 1 sentence max
                // ... additional config based on template
            });
        }
        
        async setup() {
            await super.setup();
            
            // CRITICAL: Initialize navigation
            if (typeof initializeNavigation === 'function') {
                initializeNavigation('[content-id]', 'create[ContentName]');
            }
            
            // Your setup code
        }
        
        _generateMainContent() {
            return `
                <div style="max-height: 80vh; display: flex; flex-direction: column; gap: 15px;">
                    <!-- Your content here - use grids/columns! -->
                </div>
                
                <!-- CRITICAL: Include standard navigation -->
                ${typeof createStandardNavigation === 'function' ? createStandardNavigation() : ''}
            `;
        }
    }
    
    const level = new [ContentName]Level();
    level.create().catch(error => {
        console.error('Failed to create [Content Name]:', error);
    });
    
    return level;
};

// Export for modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.create[ContentName];
}
```

## Navigation Config Update

Add to `js_standalone/navigation-config.js`:

```javascript
{
    id: "[content-id]",
    name: "📊 [Display Name]",
    func: "create[ContentName]",
    levelId: "[content-id]",
    difficulty: "beginner|intermediate|advanced",
    estimatedTime: 5,
    type: "interactive|tutorial|demonstration",
    description: "[One sentence description]",
    prerequisites: ["previous-level-id"],
    tags: ["tag1", "tag2"],
    lazyLoad: true,
    scriptPath: "levels/[content-file].js",
    icon: "📊",
    completionCriteria: "completion|viewed|observation"
}
```

Also update dependencies:
```javascript
dependencies: {
    core: {
        "[content-id]": ["prerequisite-id"]
    }
}
```

## Update levels/index.js

```javascript
// Import
import { create[ContentName] } from './[content-file]';

// Add to registry
window.MLTeachLevels = {
    levels: {
        '[content-id]': window.create[ContentName]
    },
    levelMetadata: {
        '[content-id]': {
            id: '[content-id]',
            name: '[Display Name]',
            type: '[type]',
            description: '[Brief description]',
            created: new Date().toISOString(),
            version: '1.0.0'
        }
    }
}
```

## Update index.html

```html
<!-- Add in appropriate section with other level scripts -->
<script src="levels/[content-file].js"></script>
```

## Template Selection Guide

### Use InteractiveLevelTemplate when:
- Users adjust parameters to reach target values
- Has sliders, controls, validation
- Optimization challenges
- Parameter tuning exercises

### Use BaseLevelTemplate when:
- Content-focused (tutorials, explanations)
- Step-by-step instructions
- Demonstrations
- Custom implementations

## Compact Layout Patterns

### Interactive Side-by-Side
```html
<div style="max-height: 70vh; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    <!-- Left: Visualization -->
    <div style="background: white; border-radius: 10px; padding: 15px;">
        <!-- Visual content -->
    </div>
    
    <!-- Right: Controls -->
    <div style="background: white; border-radius: 10px; padding: 15px;">
        <!-- Control elements -->
    </div>
</div>
```

### Tutorial with Sections
```html
<div style="max-height: 75vh; display: flex; flex-direction: column; gap: 15px;">
    <!-- Brief intro -->
    <div style="background: rgba(102,126,234,0.1); padding: 10px; border-radius: 8px;">
        <p style="margin: 0; text-align: center;">One sentence description</p>
    </div>
    
    <!-- Main content in columns -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
        <!-- Content sections -->
    </div>
</div>
```

## Common Pitfalls to Avoid

❌ **DON'T:**
- Create tall layouts requiring scrolling
- Forget to update navigation-config.js
- Use long instructions or descriptions
- Stack many elements vertically
- Forget standard navigation
- Use ES6 import/export

✅ **DO:**
- Keep everything visible in viewport
- Update ALL configuration files
- Use brief, concise text
- Use grid layouts for side-by-side
- Include navigation in every level
- Use global functions

## Testing Checklist

After creating new content:
1. [ ] Level loads without errors
2. [ ] No scrollbar appears at 1920x1080
3. [ ] No scrollbar appears at 1366x768
4. [ ] Navigation buttons work (Previous/Next)
5. [ ] Level appears in navigation menu
6. [ ] Parameters save on refresh (if interactive)
7. [ ] Console has no errors

## Example Prompt for AI

```
Create a new [interactive level/tutorial] called "[Name]" that teaches [concept].

Requirements:
1. Use [InteractiveLevelTemplate/BaseLevelTemplate]
2. [Specific requirements for the content]
3. No scrolling - use compact grid layout
4. Update navigation-config.js after [previous-level-id]
5. Update levels/index.js with registration
6. Add script tag to index.html
7. Include standard navigation
8. File: levels/[kebab-case-name].js
```

---

*This single guide replaces all separate level/tutorial creation documents. There is NO difference between "levels" and "instructional parts" - they all follow the same patterns.*