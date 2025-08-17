# 📋 Prompt Templates for MLTEACH Content

## For Creating New Interactive Levels

```
Create a new interactive level called "[Name]" that teaches [concept] through [interaction type].

Requirements:
1. Use InteractiveLevelTemplate
2. Target parameters: [specify target values]
3. Controls needed: [list controls with ranges]
4. Visualization: [describe what changes with parameters]
5. NO SCROLLING - use compact grid layout (max-height: 80vh)
6. Brief instructions only (1-2 sentences max)
7. Include standard navigation
8. Update ALL config files:
   - navigation-config.js (add after [previous-level-id])
   - levels/index.js (register the level)
   - index.html (add script tag)
9. File: levels/[kebab-case-name].js
```

### Example:
```
Create a new interactive level called "Speed Optimizer" that teaches optimization through finding the perfect speed for a race car.

Requirements:
1. Use InteractiveLevelTemplate
2. Target parameters: speed = 88 mph
3. Controls needed: Speed slider (0-150 mph, step 1)
4. Visualization: Car animation that crashes if too fast, crawls if too slow
5. NO SCROLLING - use compact grid layout (max-height: 80vh)
6. Brief instructions only (1-2 sentences max)
7. Include standard navigation
8. Update ALL config files:
   - navigation-config.js (add after balloon-inflation)
   - levels/index.js (register the level)
   - index.html (add script tag)
9. File: levels/speed-optimizer.js
```

## For Creating New Tutorials/Explanations

```
Create a new tutorial called "[Name]" that explains [concept].

Requirements:
1. Use BaseLevelTemplate
2. Content sections: [list main points to cover]
3. NO SCROLLING - use tabs or grid layout (max-height: 80vh)
4. Keep text concise and scannable
5. Include visual examples/diagrams where helpful
6. Include standard navigation
7. Update ALL config files:
   - navigation-config.js (add after [previous-level-id])
   - levels/index.js (register the level)
   - index.html (add script tag)
8. File: levels/[kebab-case-name].js
```

### Example:
```
Create a new tutorial called "Understanding Learning Rates" that explains what learning rates are and why they matter.

Requirements:
1. Use BaseLevelTemplate
2. Content sections:
   - What is a learning rate?
   - Too high vs too low
   - Finding the right balance
3. NO SCROLLING - use tabs or grid layout (max-height: 80vh)
4. Keep text concise and scannable
5. Include visual diagram showing step sizes
6. Include standard navigation
7. Update ALL config files:
   - navigation-config.js (add after gradient-descent-intro)
   - levels/index.js (register the level)
   - index.html (add script tag)
8. File: levels/learning-rates-tutorial.js
```

## For Creating Demonstrations

```
Create a new demonstration called "[Name]" that shows [AI/algorithm] in action.

Requirements:
1. Use BaseLevelTemplate with custom animation logic
2. Show: [what the demo should visualize]
3. Controls: Start/Stop/Reset buttons
4. NO SCROLLING - keep visualization compact (max-height: 70vh)
5. Include parameter display showing current values
6. Include standard navigation
7. Update ALL config files:
   - navigation-config.js (add after [previous-level-id])
   - levels/index.js (register the level)
   - index.html (add script tag)
8. File: levels/[kebab-case-name].js
```

## Critical Reminders for Every Prompt

Always include these in your prompt:
- ✅ "NO SCROLLING - use compact layout (max-height: 80vh)"
- ✅ "Include standard navigation"
- ✅ "Update ALL config files (navigation-config.js, levels/index.js, index.html)"
- ✅ "Brief instructions only (1-2 sentences)"
- ✅ "Use grid/flexbox for side-by-side layout"

## What NOT to Say

Avoid these phrases that might confuse the AI:
- ❌ "Create an instructional part" (just say "level" or "tutorial")
- ❌ "Make it scrollable" (everything must fit in viewport)
- ❌ "Add detailed explanations" (keep it brief)
- ❌ "Import from..." (no ES6 modules)
- ❌ "Create a separate file for..." (keep it in one file)

## Testing Your New Content

After the AI creates your content, verify:
1. [ ] Level loads without console errors
2. [ ] NO scrollbar appears at 1920x1080
3. [ ] Navigation buttons work (Previous/Next)
4. [ ] Level appears in navigation menu
5. [ ] All config files were updated
6. [ ] Instructions are brief (1-2 sentences)
7. [ ] Layout uses grid/flexbox appropriately

## If Something Is Missing

If the AI forgets something, ask specifically:
- "Add standard navigation to the level"
- "Update navigation-config.js to include this level"
- "Make the layout more compact to avoid scrolling"
- "Add the script tag to index.html"
- "Initialize navigation in the setup method"

---

*Use these templates to ensure consistent, properly integrated content every time.*