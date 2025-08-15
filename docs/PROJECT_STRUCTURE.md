# MLTEACH Project Structure Documentation

## Table of Contents
1. [Complete Function Map](#complete-function-map)
2. [Dependency Graph](#dependency-graph)
3. [Functions Over 100 Lines](#functions-over-100-lines)
4. [Duplicate Code Patterns](#duplicate-code-patterns)
5. [Architecture Overview](#architecture-overview)

---

## Complete Function Map

### Content Layer Functions

| File | Function Name | Lines | Purpose |
|------|--------------|-------|----------|
| **content/gd-main-functions.js** | | | |
| | `createGradientDescentPart1` | 11-41 | Introduction to gradient descent concept |
| | `createBalloonInflationLevel` | 47-154 | Interactive balloon inflation challenge |
| | `setupBalloonLevel` | 156-317 | Logic for balloon level interactivity |
| | `createBalloonGradientDescent` | 323-447 | AI-powered balloon optimizer demonstration |
| | `setupBalloonGradientDescent` | 450-642 | Gradient descent logic for balloon optimization |
| | `createGradientDescentPart1b` | 648-717 | Introduction to bias term in functions |
| | `createBunnyFeedingLevel` | 723-839 | Interactive bunny feeding challenge |
| | `setupBunnyLevel` | 842-983 | Logic for bunny level interactivity |
| | `createBunnyGradientDescent` | 989-1119 | AI-powered bunny feeder demonstration |
| | `setupBunnyGradientDescent` | 1122-1310 | Two-parameter gradient descent implementation |
| **content/bts-1-2.js** | | | |
| | `createBehindTheScenesSimple` | 3-212 | Behind-the-scenes visualization for energy robot |
| | `createBehindTheScenesLevel1` | 214-456 | Alternative loss functions visualization |
| | `createBehindTheScenesBalloon` | 464-790 | Balloon function movement visualization |
| | `createBehindTheScenesBunny` | 796-1235 | Bunny feeder function visualization |
| **content/coffee-gradient-descent.js** | | | |
| | `createCoffeeGradientDescent` | 15-243 | Coffee shop gradient descent demonstration |
| | `setupGradientDescent` | 245-451 | Interactive gradient descent for coffee optimization |
| **content/coffee-optimizer.js** | | | |
| | `createCoffeeManualOptimizer` | 15-249 | Manual coffee optimization simulation |
| | `setupCoffeeOptimizer` | 257-483 | Coffee optimizer interactive logic |
| **content/instruction_parts_1-2.js** | | | |
| | `createCoreConcepts` | 4-99 | Core AI concepts introduction |
| | `createPrerequisites` | 101-213 | Prerequisites and AI fundamentals |
| | `createInstructionPart1` | 216-303 | Understanding loss instruction |
| | `createInstructionPart2` | 306-310 | Placeholder redirect to part 1 |
| **content/instruction_parts_3-4.js** | | | |
| | `createInstructionPart3` | 3-103 | Gradient descent part 1 instruction |
| | `createInstructionPart4` | 105-211 | Multiple variables loss instruction |
| **content/levels-1-2.js** | | | |
| | `createLevel1` | 7-111 | Robot energy control level |
| | `setupLevel1` | 119-244 | Level 1 interactive logic |
| | `updateEnergyDisplay` | 252-255 | Updates energy display elements |
| | `createWitchBrewLevel` | 264-359 | Witch's brew multi-variable level |
| | `setupWitchBrewLevel` | 367-489 | Witch brew level logic |
| | `createLevel2` | 497-608 | Gradient descent AI level |
| | `setupLevel2` | 616-862 | AI-controlled optimization logic |
| **content/parts.js** | | | |
| | `createIntroduction` | 8-75 | Introduction screen with AI examples |
| **content/placeholder-functions.js** | | | |
| | `createInstructionPart5` | 4-20 | Placeholder for part 5 |
| | `createLevel3` | 22-37 | Placeholder for level 3 |
| | `createLevel4` | 39-54 | Placeholder for level 4 |
| | `createInstructionPart6` | 56-72 | Placeholder for part 6 |
| **content/post-quiz-congrats.js** | | | |
| | `createLossQuizCongrats` | 1-135 | Quiz completion congratulations screen |
| **content/quizzes.js** | | | |
| | `createLossQuizPart` | 13-296 | Interactive loss function quiz |

### Navigation & Infrastructure Functions

| File | Function Name | Lines | Purpose |
|------|--------------|-------|----------|
| **js_standalone/navigation-config.js** | | | |
| | `getCurrentNavigationInfo` | 50-55 | Gets current navigation state |
| | `findNavItemByFunction` | 58-67 | Finds nav item by function name |
| | `getCurrentLevelTitle` | 70-73 | Gets current level title |
| **js_standalone/navigation-component.js** | | | |
| | `createNavigationHTML` | 6-38 | Creates hamburger navigation HTML |
| | `generateNavigationSections` | 40-56 | Generates navigation section HTML |
| | `setupNavigationEvents` | 58-113 | Sets up navigation event handlers |
| | `updateProgressIndicator` | 115-128 | Updates progress display |
| | `findCurrentItemIndex` | 130-141 | Finds current item index |
| | `injectNavigation` | 144-162 | Injects navigation into container |
| | `updateNavigationHighlight` | 165-186 | Updates navigation highlighting |
| | `createLevelWithNav` | 189-208 | Creates level with navigation |
| | `findFunctionNameById` | 211-220 | Finds function name by level ID |
| **js_standalone/navigation.js** | | | |
| | `getFlattenedNavigation` | 11-19 | Flattens nested navigation config |
| | `getCurrentPageIndex` | 26-30 | Gets current page index |
| | `scrollAppToTop` | 38-46 | Scrolls content to top |
| | `canGoNext` | 53-57 | Checks if can navigate next |
| | `canGoPrev` | 64-67 | Checks if can navigate previous |
| | `navigateNext` | 75-86 | Navigates to next page |
| | `navigatePrev` | 94-105 | Navigates to previous page |
| | `createStandardNavigation` | 115-118 | Deprecated navigation function |
| | `injectNavigationButtons` | 127-152 | Injects navigation buttons |
| | `getCurrentPageInfo` | 159-171 | Gets current page information |
| | `initializeNavigation` | 182-203 | Initializes complete navigation system |

### Utility & Helper Functions

| File | Function Name | Lines | Purpose |
|------|--------------|-------|----------|
| **js_standalone/ErrorHandler.js** | | | |
| | `safeExecute` | 12-45 | Wraps functions with error handling |
| | `debugLog` | 52-56 | Development-only debug logging |
| **js_standalone/ui-helpers.js** | | | |
| | `createLevelHeader` | 14-24 | Creates standardized level header |
| **js_standalone/scroll-fix.js** | | | |
| | `wrapLevelContent` | 3-25 | Wraps content for proper scrolling |
| **js_standalone/main.js** | | | |
| | `init` | 12-33 | Initializes the application |

### Classes

| File | Class Name | Methods | Purpose |
|------|------------|---------|----------|
| **js_standalone/EventManager.js** | `EventManager` | `constructor`, `add`, `cleanup`, `getActiveCount` | Manages event listeners |
| **js_standalone/GameState.js** | `GameState` | `constructor`, `getCurrentLevel`, `nextLevel`, `previousLevel`, `reset`, `updateFeatureWeights`, `updateRobotState`, `getActiveRobotCount`, `saveState`, `loadState`, `clearSavedState` | Central game state management |
| **js_standalone/engine.js** | `OptimizationEngine` | `constructor`, `calculateLoss`, `calculateGradients`, `optimizationStep`, `checkConvergence`, `reset` | Machine learning optimization engine |
| **js_standalone/fast-transitions.js** | `FastTransitions` | `constructor`, `preloadImages`, `addStyles`, `quickTransition`, `enhanceNavigation`, `preloadLevel`, `setInstantMode` | Handles page transitions |
| **js_standalone/progress-bar-inline.js** | `InlineProgressBar` | `constructor`, `initializeSections`, `getSectionColor`, `createProgressBar`, `updateProgress`, `getCurrentSection`, `updateSectionHighlight`, `jumpToSection` | Progress tracking UI |
| **js_standalone/transition-settings.js** | `TransitionSettings` | `constructor`, `loadSettings`, `saveSettings`, `createSettingsButton`, `createSettingsPanel`, `toggleSettingsPanel`, `applySettings` | User transition preferences |

---

## Dependency Graph

### Core Dependencies Flow

```
Application Entry Point
├── main.js::init()
│   ├── OptimizationEngine (constructor)
│   ├── GameState::loadState()
│   └── createIntroduction()
│       ├── createStandardNavigation()
│       └── initializeNavigation()
│           ├── injectNavigation()
│           ├── updateNavigationHighlight()
│           └── injectNavigationButtons()
│
├── Navigation System
│   ├── navigation-config.js
│   │   └── NAVIGATION_CONFIG (data structure)
│   ├── navigation-component.js
│   │   ├── createNavigationHTML()
│   │   ├── generateNavigationSections()
│   │   ├── setupNavigationEvents()
│   │   └── updateProgressIndicator()
│   └── navigation.js
│       ├── getFlattenedNavigation()
│       ├── getCurrentPageIndex()
│       ├── navigateNext() / navigatePrev()
│       └── scrollAppToTop()
│
├── Content Layer
│   ├── All create* functions
│   │   ├── createStandardNavigation() [common dependency]
│   │   └── initializeNavigation() [common dependency]
│   └── All setup* functions
│       └── DOM manipulation & event handling
│
└── Infrastructure
    ├── GameState (singleton)
    ├── EventManager (singleton)
    ├── FastTransitions (singleton)
    └── OptimizationEngine (instances)
```

### Most Common Function Dependencies

1. **`createStandardNavigation()`** - Called by 26+ content functions
2. **`initializeNavigation()`** - Called by 26+ content functions
3. **`document.getElementById()`** - Used throughout for DOM access
4. **`addEventListener()`** - Used in all interactive components
5. **`setTimeout()`** - Used for animations and delayed actions

### Cross-Module Dependencies

| Module | Depends On | Used By |
|--------|-----------|---------|
| Content Functions | navigation.js, navigation-config.js | main.js, navigation-component.js |
| GameState | localStorage API | All game levels |
| OptimizationEngine | TensorFlow.js | Gradient descent demonstrations |
| FastTransitions | navigation.js | All page transitions |
| EventManager | DOM API | All interactive elements |

---

## Functions Over 100 Lines

### Critical Refactoring Candidates

| Function | File | Lines | Size | Refactoring Priority |
|----------|------|-------|------|---------------------|
| `createBehindTheScenesBunny` | content/bts-1-2.js | 796-1235 | 439 lines | **HIGH** - Largest function |
| `createBehindTheScenesBalloon` | content/bts-1-2.js | 464-790 | 326 lines | **HIGH** - Very large |
| `createLossQuizPart` | content/quizzes.js | 13-296 | 283 lines | **HIGH** - Complex quiz logic |
| `setupLevel2` | content/levels-1-2.js | 616-862 | 246 lines | **HIGH** - Complex AI logic |
| `createBehindTheScenesLevel1` | content/bts-1-2.js | 214-456 | 242 lines | **HIGH** - Large visualization |
| `createCoffeeManualOptimizer` | content/coffee-optimizer.js | 15-249 | 234 lines | **MEDIUM** |
| `createCoffeeGradientDescent` | content/coffee-gradient-descent.js | 15-243 | 228 lines | **MEDIUM** |
| `setupCoffeeOptimizer` | content/coffee-optimizer.js | 257-483 | 226 lines | **MEDIUM** |
| `createBehindTheScenesSimple` | content/bts-1-2.js | 3-212 | 209 lines | **MEDIUM** |
| `setupGradientDescent` | content/coffee-gradient-descent.js | 245-451 | 206 lines | **MEDIUM** |
| `setupBalloonGradientDescent` | content/gd-main-functions.js | 450-642 | 192 lines | **LOW** |
| `setupBunnyGradientDescent` | content/gd-main-functions.js | 1122-1310 | 188 lines | **LOW** |
| `createLossQuizCongrats` | content/post-quiz-congrats.js | 1-135 | 135 lines | **LOW** |
| `setupLevel1` | content/levels-1-2.js | 119-244 | 125 lines | **LOW** |
| `setupWitchBrewLevel` | content/levels-1-2.js | 367-489 | 122 lines | **LOW** |
| `createPrerequisites` | content/instruction_parts_1-2.js | 101-213 | 112 lines | **LOW** |
| `createLevel2` | content/levels-1-2.js | 497-608 | 111 lines | **LOW** |
| `createBalloonInflationLevel` | content/gd-main-functions.js | 47-154 | 107 lines | **LOW** |

### Recommended Refactoring Strategies

1. **Extract HTML Generation**: Move HTML template strings to separate template functions
2. **Separate Setup Logic**: Split setup functions into smaller, focused functions
3. **Extract Common Patterns**: Create utility functions for repeated UI patterns
4. **Modularize Event Handlers**: Move event handler logic to separate functions
5. **Create Component Classes**: Convert large functions into class-based components

---

## Duplicate Code Patterns

### Pattern 1: Navigation Initialization
**Frequency**: 26+ occurrences
```javascript
// Pattern appears at end of every content function
${createStandardNavigation()}
initializeNavigation('pageId', 'functionName');
```
**Recommendation**: Create a wrapper function or decorator pattern

### Pattern 2: Slider Update Logic
**Frequency**: 15+ occurrences
```javascript
slider.addEventListener('input', () => {
    const value = parseFloat(slider.value);
    display.textContent = value;
    updateFormula();
});
```
**Recommendation**: Create `createSliderControl(config)` utility function

### Pattern 3: Result Display Pattern
**Frequency**: 10+ occurrences
```javascript
resultDisplay.style.display = 'block';
document.getElementById('given-value').textContent = yourAnswer.toFixed(1);
document.getElementById('needed-value').textContent = correctAnswer.toFixed(1);
document.getElementById('loss-value').textContent = loss.toFixed(1);
```
**Recommendation**: Create `updateResultDisplay(results)` utility function

### Pattern 4: Button Hover Effects
**Frequency**: 20+ occurrences
```javascript
btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'translateY(-2px)';
    btn.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
});
btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translateY(0)';
    btn.style.boxShadow = 'none';
});
```
**Recommendation**: Create `addHoverEffect(element)` utility function

### Pattern 5: Animation Styles
**Frequency**: 8+ occurrences
```javascript
if (!document.getElementById('shake-style')) {
    const style = document.createElement('style');
    style.id = 'shake-style';
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
}
```
**Recommendation**: Move to CSS file or create `ensureAnimationStyle(name, css)` utility

### Pattern 6: Loss Bar Update
**Frequency**: 6+ occurrences
```javascript
const lossPercent = Math.max(0, Math.min(100, (loss / maxLoss) * 100));
document.getElementById('loss-bar').style.width = `${lossPercent}%`;
if (loss < 10) {
    lossBar.style.background = 'linear-gradient(90deg, #2dd573, #1cb85c)';
} else if (loss < 50) {
    lossBar.style.background = 'linear-gradient(90deg, #ffa500, #ff8c00)';
} else {
    lossBar.style.background = 'linear-gradient(90deg, #ff6347, #ff4500)';
}
```
**Recommendation**: Create `updateLossBar(loss, maxLoss, barElement)` utility

### Pattern 7: Success Message Display
**Frequency**: 8+ occurrences
```javascript
if (condition) {
    document.getElementById('success-message').style.display = 'block';
    document.getElementById('step-btn').disabled = true;
    document.getElementById('auto-btn').disabled = true;
}
```
**Recommendation**: Create `showSuccess(message, disableControls)` utility

---

## Architecture Overview

### Project Structure
```
MLTEACH/
├── content/                    # Educational content modules
│   ├── gd-main-functions.js   # Gradient descent demonstrations
│   ├── levels-1-2.js          # Interactive game levels
│   ├── instruction_parts_*.js # Tutorial content
│   ├── bts-1-2.js            # Behind-the-scenes visualizations
│   ├── coffee-*.js           # Coffee shop simulations
│   ├── quizzes.js            # Interactive quizzes
│   └── ...
├── js_standalone/             # Core infrastructure
│   ├── navigation-*.js       # Navigation system
│   ├── GameState.js         # State management
│   ├── engine.js            # ML optimization engine
│   ├── EventManager.js      # Event handling
│   ├── fast-transitions.js  # Page transitions
│   └── ...
├── css/                      # Stylesheets
└── index.html               # Entry point
```

### Key Architectural Patterns

1. **Modular Content System**: Each educational module is self-contained
2. **Singleton State Management**: Central GameState for application state
3. **Event-Driven UI**: EventManager handles all user interactions
4. **Progressive Enhancement**: Features gracefully degrade
5. **Separation of Concerns**: Clear boundaries between content, navigation, and infrastructure

### Improvement Recommendations

1. **Code Organization**
   - Extract HTML templates from JavaScript
   - Create reusable UI components
   - Implement proper module system (ES6 modules)

2. **Performance**
   - Lazy load content modules
   - Implement virtual DOM for large visualizations
   - Cache DOM queries

3. **Maintainability**
   - Add TypeScript for type safety
   - Implement unit tests
   - Create developer documentation

4. **User Experience**
   - Add loading indicators
   - Implement better error messages
   - Add keyboard navigation throughout

5. **Technical Debt**
   - Refactor functions over 100 lines
   - Extract duplicate code patterns
   - Remove deprecated functions
   - Consolidate similar functionality