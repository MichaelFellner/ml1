# MLTEACH Project Context

## Project Overview
MLTEACH is an interactive educational platform for teaching AI/ML concepts through gamified levels. Pure vanilla JavaScript with no build tools or external dependencies.

## Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **No Build Tools**: Script tags only, functions must be global
- **No Dependencies**: Pure JavaScript for maximum compatibility
- **State**: localStorage-based persistence

## Critical Design Rules

### 🎯 #1: VIEWPORT-FRIENDLY LAYOUTS (MOST IMPORTANT)
- **ALL content must fit within viewport (no scrolling)**
- Max height: 80vh for content containers
- Use grid/flexbox for side-by-side layouts
- Instructions: 1-2 sentences maximum
- Test at 1920x1080 and 1366x768

### #2: Global Function Pattern
```javascript
// REQUIRED: All navigation functions must be global
window.createLevelName = createLevelName;
```

### #3: Template System
All content extends either:
- `BaseLevelTemplate` - For tutorials, demonstrations, custom content
- `InteractiveLevelTemplate` - For parameter adjustment challenges

### #4: Standard Navigation
Every level MUST include:
```javascript
${createStandardNavigation()}  // In HTML
initializeNavigation(id, functionName);  // In setup
```

## Project Structure
```
/levels/          - All level implementations
/components/      - Reusable UI components
/services/        - Business logic (gradient descent, validation)
/state/           - State management stores
/js_standalone/   - Core navigation and config
/css/             - Stylesheets
```

## Adding New Content

### Essential Steps (ALL REQUIRED):
1. Create file in `/levels/`
2. Update `navigation-config.js`
3. Update `levels/index.js`
4. Add script tag to `index.html`
5. Include standard navigation
6. Use viewport-friendly layout

See **ADD_NEW_CONTENT.md** for detailed instructions.

## Common Patterns

### Service Usage
```javascript
// Always check availability first
if (typeof ServiceName !== 'undefined') {
    // Use service
} else {
    // Graceful fallback
}
```

### State Management
```javascript
if (typeof LevelProgressStore !== 'undefined') {
    LevelProgressStore.completeLevel(id, data);
    GameStateStore.updateParameters(id, params);
}
```

### Error Handling
```javascript
try {
    // Risky operation
} catch (error) {
    console.error('Context:', error);
    // Show user-friendly message
}
```

## Performance Budget
- Initial load: < 3 seconds
- Animation: 60fps target
- Memory: < 50MB per level
- **Content visibility: 100% (no scrolling)**

## Common Pitfalls

❌ **DON'T:**
- Create tall layouts requiring scrolling
- Use ES6 import/export
- Forget to update navigation config
- Use innerHTML with user data
- Create files over 500 lines

✅ **DO:**
- Keep content within viewport
- Use script tags and global functions
- Update ALL config files when adding content
- Use textContent for user data
- Keep files focused and modular

## Quick Reference
- **Documentation**: `/.ai/ADD_NEW_CONTENT.md`
- **Code Patterns**: `/.ai/patterns.js`
- **Validation**: Run through checklist in ADD_NEW_CONTENT.md

---
*When creating content, viewport-friendly layout is the #1 priority. All content must be visible without scrolling.*