# Create Tutorial Level Prompt Template

## Prompt Structure

Create a tutorial level called "[LEVEL_NAME]" that explains [CONCEPT] through step-by-step instruction.

### Requirements:

1. **🎯 VIEWPORT-FRIENDLY LAYOUT (CRITICAL)**
   - **ALL content must fit within viewport (no scrolling)**
   - Use `max-height: 80vh` for content container
   - For tutorials, consider tabbed sections or accordions
   - Keep each section concise and scannable
   - Use columns for related content

2. **Extend BaseLevelTemplate**
   - Use for content-heavy, instructional levels
   - No interactive parameters needed

2. **Content Structure**
   - Clear introduction
   - Step-by-step explanations
   - Visual aids (diagrams, examples)
   - Summary/recap section

3. **Navigation Flow**
   - Include standard navigation
   - Optional: Add internal section navigation
   - Progress tracking

4. **Styling**
   - Use instruction boxes for important points
   - Highlight key concepts
   - Include code examples if relevant

### Example Usage:

```
Create a tutorial level called "Understanding Neural Networks" that explains the basics of neural networks through visual analogies.

Requirements:
1. Extend BaseLevelTemplate
2. Include sections on:
   - What is a neural network
   - Neurons and connections
   - Layers and depth
   - Simple example
3. Use visual diagrams
4. Include "Try it yourself" prompts
5. Save as levels/neural-networks-tutorial.js
```

### Code Structure Template:

```javascript
/**
 * [Level Name] Tutorial
 * 
 * [Description of what this tutorial covers]
 * 
 * @fileoverview Tutorial level implementation
 * @author [Your Name]
 * @version 1.0.0
 * @type tutorial
 */

// Dependency checks
if (typeof BaseLevelTemplate === 'undefined') {
    console.error('BaseLevelTemplate not loaded');
}

/**
 * [Level Name] Tutorial Implementation
 */
class [ClassName]Tutorial extends BaseLevelTemplate {
    
    constructor() {
        super({
            id: '[level-id]-tutorial',
            name: '[Display Name] Tutorial',
            type: 'tutorial',
            description: '[Brief description of tutorial content]',
            trackProgress: true,
            debug: false
        });
        
        // Tutorial-specific state
        this.currentSection = 0;
        this.sections = [
            'introduction',
            'concepts',
            'examples',
            'summary'
        ];
    }
    
    async setup() {
        await super.setup();
        
        // Set up section navigation if needed
        this.setupSectionNavigation();
        
        this.log('[Level Name] Tutorial setup complete');
    }
    
    _generateMainContent() {
        return `
            <div class="tutorial-content" style="
                max-width: 900px; 
                margin: 0 auto;
                max-height: 75vh;
                overflow-y: auto;  /* Only if absolutely necessary */
                padding: 15px;
            ">
                ${this._generateIntroduction()}
                ${this._generateConcepts()}
                ${this._generateExamples()}
                ${this._generateSummary()}
                ${this._generateQuickCheck()}
                
                <div style="margin-top: 30px; text-align: center;">
                    <button onclick="currentLevel.completeLevel({score: 100})" 
                            style="padding: 12px 24px; background: linear-gradient(135deg, #667eea, #764ba2); 
                                   color: white; border: none; border-radius: 8px; font-size: 1.1rem; 
                                   font-weight: bold; cursor: pointer;">
                        I Understand! Continue →
                    </button>
                </div>
            </div>
        `;
    }
    
    _generateIntroduction() {
        return `
            <section class="tutorial-section" id="introduction">
                <h3 style="color: #333; margin-bottom: 15px;">Introduction</h3>
                
                <div style="background: rgba(102,126,234,0.1); border-radius: 8px; padding: 15px; 
                            margin-bottom: 15px; border-left: 3px solid #667eea;">
                    <p style="font-size: 1.1rem; line-height: 1.6; color: #555;">
                        [Introduction content explaining what will be learned]
                    </p>
                </div>
                
                <p style="line-height: 1.6; color: #666;">
                    [Additional context and motivation]
                </p>
            </section>
        `;
    }
    
    _generateConcepts() {
        return `
            <section class="tutorial-section" id="concepts" style="margin-top: 20px;">
                <h2 style="color: #333; margin-bottom: 20px;">Key Concepts</h2>
                
                <div class="concept-grid" style="display: grid; gap: 20px;">
                    ${this._generateConceptCard('Concept 1', 'Explanation of first concept', '🎯')}
                    ${this._generateConceptCard('Concept 2', 'Explanation of second concept', '🔧')}
                    ${this._generateConceptCard('Concept 3', 'Explanation of third concept', '💡')}
                </div>
            </section>
        `;
    }
    
    _generateConceptCard(title, description, emoji) {
        return `
            <div style="background: white; border-radius: 10px; padding: 20px; 
                        box-shadow: 0 2px 8px rgba(0,0,0,0.1); border: 1px solid #e0e0e0;">
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                    <span style="font-size: 2rem; margin-right: 10px;">${emoji}</span>
                    <h3 style="color: #333; margin: 0;">${title}</h3>
                </div>
                <p style="color: #666; line-height: 1.5; margin: 0;">
                    ${description}
                </p>
            </div>
        `;
    }
    
    _generateExamples() {
        return `
            <section class="tutorial-section" id="examples" style="margin-top: 40px;">
                <h2 style="color: #333; margin-bottom: 20px;">Examples</h2>
                
                <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; 
                            border: 1px solid #dee2e6;">
                    <h4 style="color: #495057; margin-top: 0;">Example 1: [Title]</h4>
                    <p style="color: #6c757d; line-height: 1.6;">
                        [Example description and walkthrough]
                    </p>
                    
                    <!-- Code example if relevant -->
                    <pre style="background: #282c34; color: #abb2bf; padding: 15px; 
                                border-radius: 5px; overflow-x: auto;">
<code>// Example code
const example = {
    property: 'value'
};</code></pre>
                </div>
            </section>
        `;
    }
    
    _generateSummary() {
        return `
            <section class="tutorial-section" id="summary" style="margin-top: 40px;">
                <h2 style="color: #333; margin-bottom: 20px;">Summary</h2>
                
                <div style="background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(118,75,162,0.1)); 
                            border-radius: 10px; padding: 20px;">
                    <h3 style="color: #667eea; margin-top: 0;">What You've Learned:</h3>
                    <ul style="color: #555; line-height: 1.8;">
                        <li>Key point 1</li>
                        <li>Key point 2</li>
                        <li>Key point 3</li>
                    </ul>
                </div>
            </section>
        `;
    }
    
    _generateQuickCheck() {
        return `
            <section class="tutorial-section" id="quick-check" style="margin-top: 40px;">
                <h2 style="color: #333; margin-bottom: 20px;">Quick Check</h2>
                
                <div style="background: white; border-radius: 10px; padding: 20px; 
                            box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <p style="color: #555; font-weight: bold; margin-bottom: 15px;">
                        Before continuing, make sure you understand:
                    </p>
                    <div style="display: grid; gap: 10px;">
                        <label style="display: flex; align-items: center; cursor: pointer;">
                            <input type="checkbox" style="margin-right: 10px;">
                            <span style="color: #666;">I understand [concept 1]</span>
                        </label>
                        <label style="display: flex; align-items: center; cursor: pointer;">
                            <input type="checkbox" style="margin-right: 10px;">
                            <span style="color: #666;">I understand [concept 2]</span>
                        </label>
                        <label style="display: flex; align-items: center; cursor: pointer;">
                            <input type="checkbox" style="margin-right: 10px;">
                            <span style="color: #666;">I understand [concept 3]</span>
                        </label>
                    </div>
                </div>
            </section>
        `;
    }
    
    setupSectionNavigation() {
        // Optional: Add smooth scrolling between sections
        const sections = document.querySelectorAll('.tutorial-section');
        sections.forEach(section => {
            section.style.scrollMarginTop = '20px';
        });
    }
    
    async onTeardown() {
        // Custom cleanup if needed
        await super.onTeardown();
        this.log('[Level Name] Tutorial cleanup complete');
    }
}

/**
 * Creates the [Level Name] Tutorial
 */
async function create[ClassName]Tutorial() {
    try {
        const level = new [ClassName]Tutorial();
        await level.create();
        
        window.currentLevel = level;
        return level;
        
    } catch (error) {
        console.error('Failed to create [Level Name] Tutorial:', error);
        
        const container = document.getElementById('app');
        if (container) {
            container.innerHTML = `
                <div style="padding: 40px; text-align: center; color: #ff6347;">
                    <h2>⚠️ Tutorial Loading Error</h2>
                    <p>Failed to load tutorial. Please refresh the page.</p>
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
    module.exports = { create[ClassName]Tutorial };
} else {
    window.create[ClassName]Tutorial = create[ClassName]Tutorial;
}
```

### 📐 Compact Tutorial Patterns:

**For tutorials that need multiple sections, use tabs or accordion:**

```html
<!-- Tabbed Interface for Compact Tutorials -->
<div class="tutorial-container" style="max-height: 75vh; padding: 15px;">
    <!-- Tab Navigation -->
    <div style="display: flex; gap: 10px; margin-bottom: 15px;">
        <button onclick="showSection('intro')" 
                style="padding: 8px 16px; background: #667eea; color: white; 
                       border: none; border-radius: 5px; cursor: pointer;">
            Introduction
        </button>
        <button onclick="showSection('concepts')" 
                style="padding: 8px 16px; background: #6c757d; color: white; 
                       border: none; border-radius: 5px; cursor: pointer;">
            Concepts
        </button>
        <button onclick="showSection('examples')" 
                style="padding: 8px 16px; background: #6c757d; color: white; 
                       border: none; border-radius: 5px; cursor: pointer;">
            Examples
        </button>
    </div>
    
    <!-- Tab Content (only one visible at a time) -->
    <div id="intro-section" style="display: block;">
        <!-- Introduction content -->
    </div>
    <div id="concepts-section" style="display: none;">
        <!-- Concepts content -->
    </div>
    <div id="examples-section" style="display: none;">
        <!-- Examples content -->
    </div>
</div>
```

### Tutorial Best Practices:
- Keep sections focused and digestible
- Use visual aids and diagrams
- Include interactive elements where possible
- Provide clear learning objectives
- Summarize key points
- Check understanding before progression