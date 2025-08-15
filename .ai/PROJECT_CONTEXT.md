# MLTEACH Project Context

## Project Overview
MLTEACH is an interactive educational platform for teaching AI/ML concepts through gamified levels. The focus is on making complex machine learning concepts accessible through hands-on interactive experiences.

## Current State
- **Total Levels**: 23 interactive and content levels
- **Architecture**: Vanilla JavaScript with no build tools
- **Dependencies**: None - pure JavaScript for maximum compatibility
- **Browser Support**: Modern browsers with ES6+ support
- **Framework**: Custom component system without external dependencies
- **State Management**: localStorage-based persistence
- **Target Audience**: Beginners learning AI/ML concepts

## Technology Stack
- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with consistent design system
- **Graphics**: Canvas API for visualizations
- **Math**: Custom gradient descent implementations
- **Testing**: Manual testing (no automated test suite yet)
- **Version Control**: Git

## Key Design Decisions

### 0. **Compact, Viewport-Friendly Levels**
- **Decision**: All level content should fit within the viewport without scrolling
- **Reason**: Better user experience, all information visible at once
- **Impact**: Use responsive grids, compact layouts, avoid vertical stacking
- **Guidelines**: 
  - Target max height: 100vh - navigation height (~80vh safe zone)
  - Use side-by-side layouts for desktop (grid or flexbox)
  - Stack only on mobile where scrolling is expected
  - Keep instructions concise (1-2 sentences)
  - Use collapsible sections for optional content

### 1. **No Build Tools**
- **Decision**: Use vanilla JS without webpack/babel
- **Reason**: Keep it simple for educational purposes and easy deployment
- **Impact**: Must use script tags, no ES6 modules, functions must be global

### 2. **Global Function Pattern**
- **Decision**: All navigation functions must be globally available
- **Reason**: Navigation system requires function names as strings
- **Pattern**: `window.functionName = functionName` at end of files

### 3. **Template System**
- **Decision**: Use class-based templates (BaseLevelTemplate, InteractiveLevelTemplate)
- **Reason**: Consistency across levels, reusable patterns
- **Impact**: All levels should extend these templates

### 4. **Component Architecture**
- **Decision**: Custom component system without Shadow DOM
- **Reason**: Simplicity and full control over styling
- **Impact**: Manual lifecycle management required

### 5. **State Persistence**
- **Decision**: Use localStorage for state management
- **Reason**: Simple, synchronous, works offline
- **Impact**: Must handle JSON serialization, storage limits

## Project Structure Philosophy

### Separation of Concerns
```
/levels/          - Individual level implementations (game logic)
/components/      - Reusable UI components (sliders, buttons, displays)
/services/        - Business logic (gradient descent, validation)
/utils/           - Helper functions (DOM, math, formatting)
/state/           - State management (stores, persistence)
/css/             - Styles organized by purpose
/content/         - Legacy content files (being migrated to /levels/)
```

### Naming Conventions
- **Files**: kebab-case for levels (`balloon-inflation.js`), PascalCase for classes (`Component.js`)
- **Functions**: camelCase for functions (`createLevel()`), PascalCase for constructors
- **CSS**: BEM-inspired naming (`.level-content__header`)
- **IDs**: kebab-case (`balloon-slider`)
- **Navigation**: Consistent pattern `create[LevelName]()` for all levels

## Common Patterns

### Level Creation Pattern
```javascript
// 1. Create function with standard name
function createLevelName() {
    // 2. Render HTML with standard structure
    // 3. Initialize navigation
    // 4. Call setup function
}

// 5. Setup function for interactivity
function setupLevelName() {
    // Interactive logic
}

// 6. Make globally available
window.createLevelName = createLevelName;
```

### Service Usage Pattern
```javascript
// Always check availability first
if (typeof ServiceName !== 'undefined') {
    // Use service
} else {
    // Graceful fallback
}
```

### Error Handling Pattern
```javascript
try {
    // Risky operation
} catch (error) {
    console.error('Context:', error);
    // Show user-friendly message
    // Provide fallback UI
}
```

## Common Pitfalls to Avoid

### ❌ **DON'T DO THIS**
0. **Don't create tall layouts requiring scrolling** - Keep everything visible
1. **Don't stack many elements vertically** - Use grids or columns instead
1. **Don't use ES6 modules** - `import/export` breaks global function pattern
2. **Don't use arrow functions for navigation** - Causes hoisting issues
3. **Don't assume DOM elements exist** - Always check before accessing
4. **Don't forget cleanup** - Memory leaks from event listeners
5. **Don't use innerHTML with user data** - XSS vulnerability
6. **Don't create files over 500 lines** - Split into modules
7. **Don't duplicate code** - Extract to utilities

### ✅ **DO THIS INSTEAD**
0. **Use compact layouts** - Grid layouts, side-by-side panels
1. **Keep content within viewport** - Test at 1080p and 768p heights
1. **Use script tags** for file inclusion
2. **Use regular function declarations** for navigation
3. **Check element existence** - `if (element) { ... }`
4. **Clean up in teardown** - Remove listeners, clear timers
5. **Use textContent** for user data
6. **Keep files focused** - Single responsibility
7. **Use utility functions** - Reuse common patterns

## Performance Considerations

### Critical Performance Areas
1. **Animation Loops**: Use `requestAnimationFrame`, cancel on cleanup
2. **DOM Updates**: Batch changes, minimize reflows
3. **Event Handlers**: Debounce rapid events (sliders) to ~16ms
4. **Memory Management**: Clear references in teardown
5. **Asset Loading**: Keep images small, use CSS for graphics when possible

### Performance Budget
- Initial load: < 3 seconds
- Level transition: < 500ms  
- Animation FPS: 60fps target
- Memory usage: < 50MB per level
- localStorage: < 5MB total
- **Viewport usage: 100% visible content (no scrolling required)**
- **Safe content area: 80vh height, 95vw width**

## Testing Requirements

### Manual Testing Checklist
1. **Cross-browser**: Chrome, Firefox, Safari, Edge
2. **Responsive**: Desktop (1920x1080), Tablet (768px), Mobile (375px)
3. **State persistence**: Refresh maintains progress
4. **Navigation**: Forward/back without errors
5. **Error states**: Graceful handling of failures

### Automated Testing (Future)
- Planning to add Jest for unit tests
- Cypress for E2E testing
- Performance monitoring with Lighthouse

## Development Workflow

### Adding New Levels
1. Create level file in `/levels/`
2. Extend appropriate template
3. Add to `navigation-config.js`
4. Add script tag to `index.html`
5. Test navigation flow
6. Verify state persistence

### Modifying Existing Levels
1. Locate level file (check `/levels/` first, then `/content/`)
2. Find specific function (create or setup)
3. Make changes following patterns
4. Test thoroughly
5. Check navigation still works

## Browser APIs Used
- **DOM API**: Element manipulation
- **Canvas API**: Visualizations
- **LocalStorage API**: State persistence
- **CustomEvent API**: Component communication
- **RequestAnimationFrame**: Smooth animations

## Security Considerations
- No external API calls
- No user authentication
- No sensitive data storage
- XSS prevention through textContent
- Content Security Policy compatible

## Future Enhancements (Roadmap)
1. **TypeScript migration** - Better type safety
2. **Build system** - Webpack for optimization
3. **Test suite** - Automated testing
4. **Accessibility** - WCAG 2.1 compliance
5. **Internationalization** - Multi-language support
6. **Analytics** - Learning progress tracking
7. **Mobile app** - React Native version

## AI Assistant Guidelines

When modifying this codebase:
1. **Respect existing patterns** - Consistency is key
2. **Check dependencies** - Ensure services are available
3. **Test navigation** - Verify functions are global
4. **Handle errors gracefully** - User-friendly messages
5. **Document changes** - Update relevant docs
6. **Consider performance** - Keep it smooth
7. **Maintain simplicity** - This is educational software

## Version History
- **v2.0.0** (Current) - Modular level system with templates
- **v1.5.0** - Added component system
- **v1.0.0** - Initial release with basic levels

## Contact & Resources
- **Documentation**: `/.ai/` folder
- **Patterns Library**: `/.ai/patterns.js`
- **Quick Reference**: `/AI_QUICK_REFERENCE.md`
- **Code Examples**: `/components/examples/`

---

*This context file helps AI assistants understand the project's architecture, patterns, and constraints for more accurate and consistent code generation.*