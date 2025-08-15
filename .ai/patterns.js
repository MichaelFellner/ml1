/**
 * MLTEACH Code Patterns Library
 * 
 * Common patterns and snippets for AI-assisted development.
 * Use these patterns to maintain consistency across the codebase.
 */

const CODE_PATTERNS = {
  // =================================================================
  // VIEWPORT-FRIENDLY COMPACT LAYOUTS (USE THESE!)
  // =================================================================
  
  /**
   * Compact interactive level layout - fits in viewport without scrolling
   */
  compactInteractiveLayout: `<div class="visualization-container" style="
    max-height: 70vh;  /* Constrain height */
    display: grid;
    grid-template-columns: 1fr 1fr;  /* Side-by-side */
    gap: 20px;
    padding: 15px;
">
    <!-- Brief instruction bar -->
    <div style="grid-column: 1 / -1; 
                background: rgba(102,126,234,0.1); 
                border-radius: 8px; 
                padding: 8px 15px;
                margin-bottom: 10px;">
        <p style="margin: 0; text-align: center; font-size: 0.95rem; color: #555;">
            [One sentence instruction - be concise!]
        </p>
    </div>
    
    <!-- Left: Visualization -->
    <div style="background: white; border-radius: 10px; padding: 15px; 
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <h4 style="margin: 0 0 10px 0;">Visualization</h4>
        <canvas width="400" height="300" style="width: 100%; max-height: 50vh;"></canvas>
    </div>
    
    <!-- Right: Controls -->
    <div style="background: white; border-radius: 10px; padding: 15px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <h4 style="margin: 0 0 10px 0;">Controls</h4>
        <div id="controls" style="display: flex; flex-direction: column; gap: 15px;">
            <!-- Controls here -->
        </div>
    </div>
</div>`,

  /**
   * Compact tutorial layout with tabs
   */
  compactTutorialWithTabs: `<div class="tutorial-container" style="max-height: 75vh; padding: 15px;">
    <!-- Tab buttons -->
    <div style="display: flex; gap: 10px; margin-bottom: 15px;">
        <button class="tab-btn active" onclick="showTab('intro')" 
                style="padding: 8px 16px; background: #667eea; color: white; 
                       border: none; border-radius: 5px; cursor: pointer;">
            Introduction
        </button>
        <button class="tab-btn" onclick="showTab('concepts')"
                style="padding: 8px 16px; background: #6c757d; color: white;
                       border: none; border-radius: 5px; cursor: pointer;">
            Concepts
        </button>
    </div>
    
    <!-- Tab content -->
    <div id="tab-intro" class="tab-content" style="display: block;">
        <!-- Introduction content -->
    </div>
    <div id="tab-concepts" class="tab-content" style="display: none;">
        <!-- Concepts content -->
    </div>
</div>`,

  /**
   * Compact status display panel
   */
  compactStatusPanel: `<div style="background: #f8f9fa; border-radius: 8px; padding: 10px;">
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        <div>
            <small style="color: #666;">Loss</small>
            <div style="font-size: 1.2rem; font-weight: bold; color: #ff6347;">0.00</div>
        </div>
        <div>
            <small style="color: #666;">Accuracy</small>
            <div style="font-size: 1.2rem; font-weight: bold; color: #2dd573;">0%</div>
        </div>
    </div>
</div>`,

  // =================================================================
  // LEVEL CREATION PATTERNS
  // =================================================================
  
  /**
   * Basic level structure - COMPACT VERSION
   */
  levelTemplate: `function create[LevelName]() {
    const container = document.getElementById('app');
    container.innerHTML = \`
        <div class="current-level">
            <div class="level-header">
                [Level Title]
            </div>
            <div class="level-content" style="
                max-height: 80vh;  /* IMPORTANT: Constrain height */
                padding: 10px 20px; 
                max-width: 1200px; 
                margin: 0 auto;
                overflow: hidden;  /* Prevent scrolling */
            ">
                <!-- Brief Instructions (1-2 sentences max) -->
                <div style="background: rgba(102,126,234,0.1); 
                            border-radius: 8px; 
                            padding: 10px; 
                            margin-bottom: 15px;">
                    <p style="font-size: 0.95rem; color: #555; margin: 0; text-align: center;">
                        [Brief instruction - one sentence]
                    </p>
                </div>
                
                <!-- Main Content (use grid for side-by-side) -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    [Main Content Here - use columns!]
                </div>
                
                \${createStandardNavigation()}
            </div>
        </div>
    \`;
    
    // Initialize navigation
    initializeNavigation('[level-id]', 'create[LevelName]');
    
    // Setup level logic if needed
    setup[LevelName]();
}`,

  /**
   * Interactive level with controls
   */
  interactiveLevelTemplate: `function create[LevelName]() {
    const container = document.getElementById('app');
    container.innerHTML = \`
        <div class="current-level">
            <div class="level-header">
                [Level Title]
            </div>
            <div class="level-content" style="padding: 10px 20px; max-width: 1000px; margin: 0 auto;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <!-- Left side: Visualization -->
                    <div style="background: rgba(255,255,255,0.9); border-radius: 15px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h3 style="margin: 0 0 15px 0; color: #333; text-align: center;">[Visualization Title]</h3>
                        <div id="visualization-area">
                            <!-- Visualization content -->
                        </div>
                    </div>
                    
                    <!-- Right side: Controls -->
                    <div style="background: rgba(255,255,255,0.9); border-radius: 15px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h3 style="margin: 0 0 15px 0; color: #333; text-align: center;">[Controls Title]</h3>
                        <div id="controls-area">
                            <!-- Control elements -->
                        </div>
                    </div>
                </div>
                
                \${createStandardNavigation()}
            </div>
        </div>
    \`;
    
    initializeNavigation('[level-id]', 'create[LevelName]');
    setup[LevelName]();
}`,

  // =================================================================
  // UI COMPONENT PATTERNS
  // =================================================================
  
  /**
   * Slider control with display
   */
  sliderControl: `<!-- Slider Control -->
<div style="margin-bottom: 20px;">
    <label style="display: block; margin-bottom: 8px; color: #333; font-weight: bold;">
        [Parameter Name]: <span id="[param]-value" style="color: #667eea;">1</span>
    </label>
    <input type="range" id="[param]-slider" min="0" max="10" value="1" step="0.1" 
           style="width: 100%; height: 8px; border-radius: 4px; background: #ddd; outline: none;">
    <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #999; margin-top: 5px;">
        <span>0</span>
        <span>5</span>
        <span>10</span>
    </div>
</div>`,

  /**
   * Formula display box
   */
  formulaDisplay: `<!-- Formula Display -->
<div style="background: white; border: 2px solid #667eea; border-radius: 8px; padding: 15px; margin-bottom: 20px; text-align: center; font-family: 'Courier New', monospace;">
    <div style="font-size: 1.2rem; color: #333;">
        f(x) = <span id="w-display" style="color: #667eea; font-weight: bold;">1</span> × x
    </div>
    <div style="font-size: 0.9rem; color: #666; margin-top: 8px;">
        Result: <span id="result" style="font-weight: bold;">0</span>
    </div>
</div>`,

  /**
   * Result/feedback message
   */
  resultDisplay: `<!-- Result Display -->
<div id="result-display" style="display: none; padding: 15px; border-radius: 8px; margin-top: 15px; text-align: center;">
    <div id="result-message" style="font-size: 1rem; font-weight: bold; margin-bottom: 10px;"></div>
    <div style="font-size: 0.9rem; color: #666;">
        Your answer: <span id="your-answer" style="font-weight: bold;">0</span><br>
        Correct answer: <span id="correct-answer" style="font-weight: bold;">0</span><br>
        Loss: <span id="loss-value" style="font-weight: bold; color: #ff6347;">0</span>
    </div>
</div>`,

  /**
   * Loss bar visualization
   */
  lossBar: `<!-- Loss Bar -->
<div style="background: white; border-radius: 8px; padding: 15px; border: 2px solid #ddd;">
    <h4 style="margin: 0 0 10px 0; color: #333; font-size: 1rem;">Total Loss</h4>
    <div style="position: relative; height: 30px; background: #f0f0f0; border-radius: 15px; overflow: hidden;">
        <div id="loss-bar" style="position: absolute; left: 0; top: 0; height: 100%; 
             background: linear-gradient(90deg, #ff6347, #ffa500); transition: width 0.5s ease; width: 100%;">
        </div>
        <div style="position: absolute; width: 100%; text-align: center; line-height: 30px; 
             color: white; font-weight: bold; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">
            Loss: <span id="total-loss">0</span>
        </div>
    </div>
</div>`,

  /**
   * Action button
   */
  actionButton: `<button id="[button-id]" style="width: 100%; padding: 12px; 
         background: linear-gradient(135deg, #667eea, #764ba2); color: white; 
         border: none; border-radius: 8px; font-size: 1.1rem; font-weight: bold; 
         cursor: pointer; transition: all 0.3s;">
    [Button Text]
</button>`,

  // =================================================================
  // JAVASCRIPT PATTERNS
  // =================================================================
  
  /**
   * Setup function structure
   */
  setupFunction: `function setup[LevelName]() {
    // Configuration
    const CONFIG = {
        trueW: 7,
        learningRate: 0.01,
        maxIterations: 100
    };
    
    // State variables
    let currentW = 1;
    let iteration = 0;
    
    // Get DOM elements
    const elements = {
        slider: document.getElementById('w-slider'),
        display: document.getElementById('w-display'),
        button: document.getElementById('action-btn')
    };
    
    // Update functions
    function updateDisplay() {
        elements.display.textContent = currentW.toFixed(2);
    }
    
    // Event handlers
    elements.slider.addEventListener('input', (e) => {
        currentW = parseFloat(e.target.value);
        updateDisplay();
    });
    
    elements.button.addEventListener('click', () => {
        // Action logic
    });
    
    // Initialize
    updateDisplay();
}`,

  /**
   * Gradient descent step
   */
  gradientStep: `function takeGradientStep() {
    // Calculate loss
    const loss = calculateLoss(currentParams, targetParams);
    
    // Calculate gradients
    const gradients = calculateGradients(currentParams, data);
    
    // Update parameters
    currentParams.w -= learningRate * gradients.w;
    if (currentParams.b !== undefined) {
        currentParams.b -= learningRate * gradients.b;
    }
    
    // Update display
    updateDisplay();
    
    // Check convergence
    if (loss < threshold) {
        onConvergence();
    }
}`,

  /**
   * Animation frame pattern
   */
  animationLoop: `let animationId = null;

function startAnimation() {
    function animate() {
        // Update logic
        updateState();
        updateDisplay();
        
        // Continue or stop
        if (shouldContinue()) {
            animationId = requestAnimationFrame(animate);
        } else {
            stopAnimation();
        }
    }
    animate();
}

function stopAnimation() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}`,

  /**
   * Event handler with cleanup
   */
  eventHandlerPattern: `// Store handlers for cleanup
const handlers = {
    slider: null,
    button: null
};

// Attach handlers
handlers.slider = (e) => {
    // Handle slider change
};
handlers.button = (e) => {
    // Handle button click
};

elements.slider.addEventListener('input', handlers.slider);
elements.button.addEventListener('click', handlers.button);

// Cleanup function
function cleanup() {
    elements.slider.removeEventListener('input', handlers.slider);
    elements.button.removeEventListener('click', handlers.button);
}`,

  // =================================================================
  // UTILITY PATTERNS
  // =================================================================
  
  /**
   * Safe DOM element access
   */
  safeGetElement: `function getElement(id, required = true) {
    const element = document.getElementById(id);
    if (!element && required) {
        console.error(\`Element with id '\${id}' not found\`);
    }
    return element;
}`,

  /**
   * Update multiple DOM elements
   */
  updateElements: `function updateElements(updates) {
    Object.entries(updates).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    });
}

// Usage:
updateElements({
    'w-display': currentW.toFixed(2),
    'loss-value': loss.toFixed(1),
    'iteration': iteration
});`,

  /**
   * Color gradient based on value
   */
  valueToColor: `function getColorForValue(value, min, max) {
    const percent = (value - min) / (max - min);
    
    if (percent < 0.33) {
        return '#2dd573'; // Green
    } else if (percent < 0.66) {
        return '#ffa500'; // Orange
    } else {
        return '#ff6347'; // Red
    }
}`,

  /**
   * Debounced function
   */
  debounce: `function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Usage:
const debouncedUpdate = debounce(updateDisplay, 100);
slider.addEventListener('input', debouncedUpdate);`
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CODE_PATTERNS;
} else if (typeof window !== 'undefined') {
    window.CODE_PATTERNS = CODE_PATTERNS;
}
