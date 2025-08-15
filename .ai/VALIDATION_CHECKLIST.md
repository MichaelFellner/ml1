# MLTEACH Validation Checklist

## Pre-Deployment Validation

### 📏 Viewport & Layout (CHECK FIRST!)
- [ ] **All content visible without scrolling at 1920x1080**
  - Open browser at 1920x1080
  - Navigate to level
  - Verify NO vertical scrollbar appears
  - All controls and visualizations visible

- [ ] **All content visible without scrolling at 1366x768**
  - Resize browser to 1366x768
  - Verify content still fits
  - No critical elements cut off

- [ ] **Compact instruction text**
  - Instructions are 1-2 sentences maximum
  - No unnecessary explanatory text
  - Clear and concise

- [ ] **Efficient use of horizontal space**
  - Side-by-side layout for desktop
  - Grid or flexbox used appropriately
  - No wasted whitespace

- [ ] **Proper content constraints**
  - Container has `max-height: 80vh` or less
  - Visualization limited to 60vh height
  - Controls in compact panels

### 🚀 Level Functionality
- [ ] **Level loads without console errors**
  - Open browser console (F12)
  - Navigate to level
  - Check for red error messages
  - Verify no "undefined is not a function" errors

- [ ] **All interactive elements functional**
  - Sliders update values correctly
  - Buttons trigger expected actions
  - Input fields accept and validate data
  - Animations run smoothly

- [ ] **Navigation works correctly**
  - Previous button goes to correct level
  - Next button proceeds properly
  - Browser back/forward buttons work
  - No navigation loops or dead ends

- [ ] **State persists on refresh**
  - Adjust parameters
  - Refresh page (F5)
  - Verify parameters are restored
  - Check progress is maintained

### 📱 Responsive Design
- [ ] **Desktop (1920x1080)**
  - Layout properly centered
  - **No scrolling (horizontal OR vertical)**
  - All text readable
  - Interactive elements accessible
  - Content fits within viewport

- [ ] **Tablet (768px width)**
  - Two-column layouts adapt
  - Touch targets minimum 44x44px
  - Text remains readable
  - No content overflow

- [ ] **Mobile (375px width)**
  - Single column layout
  - Buttons full width
  - Sliders usable with touch
  - No horizontal scroll

### 🎯 Specific Level Types

#### Interactive Levels
- [ ] Parameter sliders have correct ranges
- [ ] Default values are set properly
- [ ] Validation tolerance is appropriate
- [ ] Success/failure messages display correctly
- [ ] Visual feedback updates in real-time
- [ ] Loss calculation is accurate
- [ ] Target values are achievable

#### Tutorial/Content Levels
- [ ] All content sections load
- [ ] Images display correctly
- [ ] Links work (if any)
- [ ] Text is properly formatted
- [ ] Code examples are syntax highlighted
- [ ] Navigation between sections works

#### Quiz Levels
- [ ] Questions display correctly
- [ ] All answer options are clickable
- [ ] Correct answers are validated properly
- [ ] Score calculation is accurate
- [ ] Feedback messages are helpful
- [ ] Can retry if failed
- [ ] Progress to next level on success

### ⚡ Performance
- [ ] **Initial load time < 3 seconds**
- [ ] **Animations run at 60fps**
  - Open Performance tab in DevTools
  - Record while interacting
  - Check for frame drops

- [ ] **Memory usage reasonable**
  - Open Task Manager (Shift+Esc in Chrome)
  - Check memory doesn't grow continuously
  - Verify cleanup on level exit

- [ ] **No memory leaks**
  - Navigate between levels multiple times
  - Check memory doesn't increase permanently
  - Verify event listeners are removed

### 🔒 Security & Safety
- [ ] **No XSS vulnerabilities**
  - User input is sanitized
  - Using textContent instead of innerHTML for user data
  - No eval() or Function() with user input

- [ ] **Error handling present**
  - Try invalid inputs
  - Test edge cases (min/max values)
  - Verify graceful error messages
  - Check fallback UI works

- [ ] **Console is clean**
  - No unnecessary console.log statements
  - No warning messages
  - No deprecation notices

### 🌐 Cross-Browser Testing
- [ ] **Chrome (Latest)**
- [ ] **Firefox (Latest)**
- [ ] **Safari (Latest)**
- [ ] **Edge (Latest)**
- [ ] **Mobile Chrome**
- [ ] **Mobile Safari**

### ♿ Accessibility Basics
- [ ] **Keyboard navigation possible**
  - Can tab through interactive elements
  - Enter/Space activate buttons
  - Arrow keys work on sliders

- [ ] **Contrast ratios adequate**
  - Text readable on backgrounds
  - Important elements have sufficient contrast
  - Error/success messages visible

- [ ] **Alt text for images** (if applicable)
- [ ] **ARIA labels for interactive elements**
- [ ] **Focus indicators visible**

### 📝 Code Quality
- [ ] **Functions are globally accessible**
  ```javascript
  window.functionName = functionName;
  ```

- [ ] **Navigation config updated**
  - Entry added to navigation-config.js
  - Correct function name specified
  - Metadata is complete

- [ ] **Script tag added to index.html**
  ```html
  <script src="levels/level-name.js"></script>
  ```

- [ ] **Dependencies checked**
  ```javascript
  if (typeof ServiceName !== 'undefined') {
      // Use service
  }
  ```

- [ ] **Cleanup implemented**
  - Event listeners removed
  - Timers cleared
  - Animations cancelled
  - Memory references nulled

### 🎨 Visual Design
- [ ] **Consistent with design system**
  - Uses standard color palette
  - Follows spacing guidelines
  - Matches overall aesthetic

- [ ] **Loading states present**
  - Shows feedback during operations
  - No blank screens
  - Progress indicators where needed

- [ ] **Error states designed**
  - Clear error messages
  - Actionable guidance
  - Recovery options provided

### 📊 Testing Scenarios

#### Happy Path
- [ ] Complete level successfully
- [ ] Navigate to next level
- [ ] Return and verify state saved

#### Edge Cases
- [ ] Set all parameters to minimum
- [ ] Set all parameters to maximum
- [ ] Rapid parameter changes
- [ ] Quick navigation (spam next/prev)
- [ ] Refresh during interaction

#### Error Cases
- [ ] Network offline (if applicable)
- [ ] localStorage disabled
- [ ] JavaScript errors in console
- [ ] Missing DOM elements

### 🚢 Deployment Checklist
- [ ] Remove debug console.log statements
- [ ] Set debug flag to false in config
- [ ] Verify all file paths are correct
- [ ] Test on actual deployment URL
- [ ] Clear browser cache and test
- [ ] Verify no CORS issues
- [ ] Check all assets load

### 📋 Post-Deployment
- [ ] Monitor browser console for errors
- [ ] Test on multiple devices
- [ ] Gather user feedback
- [ ] Check analytics (if enabled)
- [ ] Document any issues found

## Quick Test Commands

### Viewport Testing
```javascript
// Check if content requires scrolling
console.log('Viewport height:', window.innerHeight);
console.log('Content height:', document.querySelector('.current-level').scrollHeight);
console.log('Requires scrolling:', document.querySelector('.current-level').scrollHeight > window.innerHeight);

// Check if any element overflows
Array.from(document.querySelectorAll('*')).forEach(el => {
    if (el.scrollHeight > el.clientHeight) {
        console.warn('Element has vertical overflow:', el);
    }
});
```

### Browser Console Tests
```javascript
// Check if level function exists
typeof window.createLevelName === 'function'

// Check current level state
window.currentLevel

// Check navigation config
NAVIGATION_CONFIG.sections

// Test state persistence
localStorage.getItem('gameState')

// Check for memory leaks
performance.memory.usedJSHeapSize
```

### Manual Test Flow
1. Open browser in incognito/private mode
2. Navigate to level
3. Interact with all controls
4. Check console for errors
5. Refresh page
6. Navigate away and back
7. Close and reopen browser
8. Verify state persisted

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "undefined is not a function" | Add `window.functionName = functionName` |
| Navigation broken | Check function name in navigation-config.js |
| State not persisting | Verify localStorage is enabled |
| Styles not applying | Check CSS file is loaded |
| Memory leak | Implement proper cleanup in teardown |
| Slider not working | Check event listener is attached |
| Animation janky | Use requestAnimationFrame |

## Sign-off

### Developer Checklist
- [ ] I have tested all functionality
- [ ] I have checked for console errors
- [ ] I have tested on mobile
- [ ] I have implemented cleanup
- [ ] I have updated documentation

### Reviewer Checklist  
- [ ] Code follows project patterns
- [ ] No obvious bugs found
- [ ] Performance is acceptable
- [ ] User experience is smooth
- [ ] Ready for deployment

---

*Use this checklist for every new level or major change to ensure quality and consistency across the MLTEACH platform.*