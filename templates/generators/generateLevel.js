/**
 * Level Code Generator
 * 
 * Generates complete level code from configuration objects using templates.
 * Supports multiple level types and customization options.
 * 
 * This generator can create:
 * - Interactive levels with parameter adjustment
 * - Tutorial levels with step-by-step guidance
 * - Demonstration levels showing AI optimization
 * - Custom levels with specific patterns
 */

// Make generateLevel function available globally
window.generateLevel = function generateLevel(config) {
    
    /**
     * Generates complete level code from configuration
     * 
     * @param {Object} config - Level configuration
     * @param {string} config.id - Unique level identifier (kebab-case, e.g., 'gravity-challenge')
     * @param {string} config.name - Display name (e.g., 'Gravity Challenge')
     * @param {string} config.type - Level type ('interactive', 'tutorial', 'demonstration', 'custom')
     * @param {string} [config.description] - Level description/instructions
     * @param {Object} [config.targetFunction] - Target function for interactive levels
     * @param {Array<Object>} [config.controls] - Control definitions for interactive levels
     * @param {Object} [config.validation] - Validation settings
     * @param {Object} [config.customization] - Custom code snippets and overrides
     * @param {string} [config.template='auto'] - Template to use ('auto', 'base', 'interactive')
     * @param {boolean} [config.includeServices=true] - Include service integrations
     * @param {boolean} [config.includeStateManagement=true] - Include state management
     * @param {Object} [config.metadata] - Additional metadata (author, version, etc.)
     * 
     * @returns {string} Complete level code
     * 
     * @example
     * const levelCode = generateLevel({
     *   id: 'gravity-challenge',
     *   name: 'Gravity Challenge',
     *   type: 'interactive',
     *   description: 'Adjust gravity to make the ball land in the target!',
     *   targetFunction: { gravity: 9.8 },
     *   controls: [
     *     { id: 'gravity', label: 'Gravity (m/s²)', min: 0, max: 20, step: 0.1, default: 10 }
     *   ]
     * });
     */
    
    // Validate configuration
    validateConfig(config);
    
    // Determine template to use
    const template = determineTemplate(config);
    
    // Generate code based on template
    switch (template) {
        case 'interactive':
            return generateInteractiveLevel(config);
        case 'tutorial':
            return generateTutorialLevel(config);
        case 'demonstration':
            return generateDemonstrationLevel(config);
        case 'base':
            return generateBaseLevelCustom(config);
        default:
            throw new Error(`Unknown template: ${template}`);
    }
};

/**
 * Validates the configuration object
 * @private
 */
function validateConfig(config) {
    // Required fields
    if (!config.id) {
        throw new Error('Level configuration must include id');
    }
    
    if (!config.name) {
        throw new Error('Level configuration must include name');
    }
    
    if (!config.type) {
        throw new Error('Level configuration must include type');
    }
    
    // Validate ID format (should be kebab-case)
    if (!/^[a-z][a-z0-9-]*$/.test(config.id)) {
        throw new Error('Level ID must be kebab-case (lowercase, hyphens only)');
    }
    
    // Type-specific validations
    if (config.type === 'interactive') {
        if (!config.controls || !Array.isArray(config.controls)) {
            throw new Error('Interactive levels must define controls array');
        }
        
        if (config.controls.length === 0) {
            throw new Error('Interactive levels must have at least one control');
        }
        
        // Validate each control
        config.controls.forEach((control, index) => {
            if (!control.id || !control.label || 
                typeof control.min !== 'number' || 
                typeof control.max !== 'number' || 
                typeof control.default !== 'number') {
                throw new Error(`Control ${index} is missing required properties (id, label, min, max, default)`);
            }
        });
    }
    
    console.log('✅ Level configuration validated');
}

/**
 * Determines which template to use
 * @private
 */
function determineTemplate(config) {
    if (config.template && config.template !== 'auto') {
        return config.template;
    }
    
    // Auto-determine based on type
    switch (config.type) {
        case 'interactive':
            return 'interactive';
        case 'tutorial':
            return 'tutorial';
        case 'demonstration':
            return 'demonstration';
        default:
            return 'base';
    }
}

/**
 * Generates an interactive level
 * @private
 */
function generateInteractiveLevel(config) {
    const className = toPascalCase(config.id);
    const functionName = `create${className}Level`;
    
    return `/**
 * ${config.name} - Interactive Level
 * ${config.description ? `* ${config.description}` : ''}
 * 
 * Generated automatically by MLTEACH Level Generator
 * Type: Interactive Level with parameter adjustment
 * 
 * Features:
 * - Parameter sliders for user adjustment
 * - Real-time formula display
 * - Validation and scoring
 * - State management integration
 * - Progress tracking
 */

${generateImportsAndChecks(config)}

/**
 * ${config.name} Level Implementation
 */
class ${className}Level extends InteractiveLevelTemplate {
    
    constructor() {
        super({
            id: '${config.id}',
            name: '${config.name}',
            type: '${config.type}',
            description: '${config.description || ''}',
            targetFunction: ${JSON.stringify(config.targetFunction, null, 12)},
            controls: ${JSON.stringify(config.controls, null, 12)},
            validation: ${JSON.stringify(config.validation || { tolerance: 0.05 }, null, 12)},
            ${config.includeStateManagement !== false ? 'trackProgress: true,' : 'trackProgress: false,'}
            debug: ${config.debug || false}
        });
    }
    
    /**
     * Custom setup logic
     */
    async setup() {
        await super.setup();
        
        ${generateCustomSetup(config)}
        
        this.log('${config.name} setup complete');
    }
    
    ${generateVisualizationMethods(config)}
    
    ${generateCustomMethods(config)}
    
    /**
     * Custom teardown logic
     */
    async onTeardown() {
        await super.onTeardown();
        
        ${generateCustomTeardown(config)}
        
        this.log('${config.name} teardown complete');
    }
}

/**
 * Creates and initializes the ${config.name} level
 * 
 * This is the main entry point called by the navigation system.
 * 
 * @returns {Promise<${className}Level>} The created level instance
 */
async function ${functionName}() {
    try {
        const level = new ${className}Level();
        await level.create();
        
        // Make level globally accessible for debugging
        window.currentLevel = level;
        
        return level;
        
    } catch (error) {
        console.error('Failed to create ${config.name}:', error);
        
        // Fallback error display
        const container = document.getElementById('app');
        if (container) {
            container.innerHTML = \`
                <div style="padding: 40px; text-align: center; color: #ff6347;">
                    <h2>⚠️ Level Loading Error</h2>
                    <p>Failed to load ${config.name}. Please refresh the page.</p>
                    <button onclick="location.reload()" style="padding: 10px 20px; margin-top: 20px;">
                        🔄 Refresh Page
                    </button>
                </div>
            \`;
        }
        
        throw error;
    }
}

${generateExports(config, functionName)}

${generateUsageExamples(config)}`;
}

/**
 * Generates a tutorial level
 * @private
 */
function generateTutorialLevel(config) {
    const className = toPascalCase(config.id);
    const functionName = `create${className}Level`;
    
    return `/**
 * ${config.name} - Tutorial Level
 * ${config.description ? `* ${config.description}` : ''}
 * 
 * Generated automatically by MLTEACH Level Generator
 * Type: Tutorial Level with step-by-step guidance
 */

${generateImportsAndChecks(config)}

/**
 * ${config.name} Tutorial Implementation
 */
class ${className}Level extends BaseLevelTemplate {
    
    constructor() {
        super({
            id: '${config.id}',
            name: '${config.name}',
            type: '${config.type}',
            description: '${config.description || ''}',
            ${config.includeStateManagement !== false ? 'trackProgress: true,' : 'trackProgress: false,'}
            debug: ${config.debug || false}
        });
        
        // Tutorial-specific state
        this.currentStep = 0;
        this.totalSteps = ${config.steps ? config.steps.length : 5};
        this.steps = ${JSON.stringify(config.steps || generateDefaultSteps(), null, 8)};
    }
    
    async setup() {
        await super.setup();
        
        this.setupTutorialControls();
        this.showCurrentStep();
        
        this.log('${config.name} tutorial setup complete');
    }
    
    setupTutorialControls() {
        const nextBtn = document.getElementById('tutorial-next-btn');
        const prevBtn = document.getElementById('tutorial-prev-btn');
        
        if (nextBtn) {
            this.addEventListenerWithCleanup(nextBtn, 'click', () => this.nextStep());
        }
        
        if (prevBtn) {
            this.addEventListenerWithCleanup(prevBtn, 'click', () => this.previousStep());
        }
    }
    
    nextStep() {
        if (this.currentStep < this.totalSteps - 1) {
            this.currentStep++;
            this.showCurrentStep();
            this.trackAction('tutorial_next', { step: this.currentStep });
        } else {
            this.completeTutorial();
        }
    }
    
    previousStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.showCurrentStep();
            this.trackAction('tutorial_prev', { step: this.currentStep });
        }
    }
    
    showCurrentStep() {
        const step = this.steps[this.currentStep];
        const stepContent = document.getElementById('tutorial-step-content');
        const progressBar = document.getElementById('tutorial-progress');
        
        if (stepContent) {
            stepContent.innerHTML = step.content;
        }
        
        if (progressBar) {
            const progressPercent = ((this.currentStep + 1) / this.totalSteps) * 100;
            progressBar.style.width = \`\${progressPercent}%\`;
        }
        
        this.updateNavigationButtons();
    }
    
    updateNavigationButtons() {
        const nextBtn = document.getElementById('tutorial-next-btn');
        const prevBtn = document.getElementById('tutorial-prev-btn');
        
        if (prevBtn) {
            prevBtn.disabled = this.currentStep === 0;
            prevBtn.style.opacity = this.currentStep === 0 ? '0.5' : '1';
        }
        
        if (nextBtn) {
            nextBtn.textContent = this.currentStep === this.totalSteps - 1 ? 'Complete Tutorial' : 'Next Step';
        }
    }
    
    completeTutorial() {
        this.completeLevel({
            score: 100,
            solutions: {}
        });
    }
    
    _generateMainContent() {
        return \`
            <div class="tutorial-content" style="max-width: 800px; margin: 0 auto;">
                <!-- Progress Bar -->
                <div class="tutorial-progress-container" style="background: #f0f0f0; border-radius: 10px; height: 8px; margin-bottom: 30px;">
                    <div id="tutorial-progress" style="background: linear-gradient(90deg, #667eea, #764ba2); height: 100%; border-radius: 10px; width: 0%; transition: width 0.3s;"></div>
                </div>
                
                <!-- Step Content -->
                <div id="tutorial-step-content" class="step-content" style="min-height: 300px; padding: 30px; background: white; border-radius: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    Loading...
                </div>
                
                <!-- Navigation Buttons -->
                <div class="tutorial-navigation" style="margin-top: 30px; text-align: center;">
                    <button id="tutorial-prev-btn" style="margin-right: 15px; padding: 12px 24px; background: #6c757d; color: white; border: none; border-radius: 8px; cursor: pointer;">
                        ← Previous
                    </button>
                    <button id="tutorial-next-btn" style="padding: 12px 24px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 8px; cursor: pointer;">
                        Next Step →
                    </button>
                </div>
            </div>
        \`;
    }
}

async function ${functionName}() {
    const level = new ${className}Level();
    await level.create();
    window.currentLevel = level;
    return level;
}

${generateExports(config, functionName)}`;
}

/**
 * Generates a demonstration level
 * @private
 */
function generateDemonstrationLevel(config) {
    const className = toPascalCase(config.id);
    const functionName = `create${className}Level`;
    
    return `/**
 * ${config.name} - Demonstration Level
 * ${config.description ? `* ${config.description}` : ''}
 * 
 * Generated automatically by MLTEACH Level Generator
 * Type: Demonstration Level showing AI optimization
 */

${generateImportsAndChecks(config)}

/**
 * ${config.name} Demonstration Implementation
 */
class ${className}Level extends BaseLevelTemplate {
    
    constructor() {
        super({
            id: '${config.id}',
            name: '${config.name}',
            type: '${config.type}',
            description: '${config.description || ''}',
            parameters: ${JSON.stringify(config.parameters || {}, null, 12)},
            ${config.includeStateManagement !== false ? 'trackProgress: true,' : 'trackProgress: false,'}
            debug: ${config.debug || false}
        });
        
        // Demonstration-specific state
        this.isRunning = false;
        this.currentIteration = 0;
        this.maxIterations = ${config.maxIterations || 100};
        this.optimizationHistory = [];
    }
    
    async setup() {
        await super.setup();
        
        this.setupDemonstrationControls();
        this.initializeOptimization();
        
        this.log('${config.name} demonstration setup complete');
    }
    
    setupDemonstrationControls() {
        const startBtn = document.getElementById('demo-start-btn');
        const stopBtn = document.getElementById('demo-stop-btn');
        const resetBtn = document.getElementById('demo-reset-btn');
        
        if (startBtn) {
            this.addEventListenerWithCleanup(startBtn, 'click', () => this.startOptimization());
        }
        
        if (stopBtn) {
            this.addEventListenerWithCleanup(stopBtn, 'click', () => this.stopOptimization());
        }
        
        if (resetBtn) {
            this.addEventListenerWithCleanup(resetBtn, 'click', () => this.resetOptimization());
        }
    }
    
    initializeOptimization() {
        // Initialize optimization parameters
        this.currentIteration = 0;
        this.optimizationHistory = [];
        this.updateDisplay();
    }
    
    startOptimization() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.trackAction('optimization_started');
        
        // Start optimization loop
        this.optimizationInterval = this.createInterval(() => {
            this.performOptimizationStep();
        }, ${config.stepDelay || 500});
        
        this.updateControlButtons();
    }
    
    stopOptimization() {
        this.isRunning = false;
        if (this.optimizationInterval) {
            clearInterval(this.optimizationInterval);
        }
        
        this.trackAction('optimization_stopped', { iteration: this.currentIteration });
        this.updateControlButtons();
    }
    
    resetOptimization() {
        this.stopOptimization();
        this.initializeOptimization();
        this.trackAction('optimization_reset');
    }
    
    performOptimizationStep() {
        // Custom optimization logic would go here
        this.currentIteration++;
        
        // Simulate optimization progress
        ${generateOptimizationStep(config)}
        
        // Update display
        this.updateDisplay();
        
        // Check for completion
        if (this.currentIteration >= this.maxIterations) {
            this.stopOptimization();
            this.completeOptimization();
        }
    }
    
    completeOptimization() {
        this.completeLevel({
            score: 100,
            solutions: this.getParameters()
        });
    }
    
    updateDisplay() {
        // Update iteration counter
        const iterationDisplay = document.getElementById('demo-iteration');
        if (iterationDisplay) {
            iterationDisplay.textContent = this.currentIteration;
        }
        
        // Update parameters display
        const params = this.getParameters();
        Object.keys(params).forEach(key => {
            const display = document.getElementById(\`demo-\${key}-value\`);
            if (display) {
                display.textContent = params[key].toFixed(3);
            }
        });
    }
    
    updateControlButtons() {
        const startBtn = document.getElementById('demo-start-btn');
        const stopBtn = document.getElementById('demo-stop-btn');
        
        if (startBtn) {
            startBtn.disabled = this.isRunning;
            startBtn.style.opacity = this.isRunning ? '0.5' : '1';
        }
        
        if (stopBtn) {
            stopBtn.disabled = !this.isRunning;
            stopBtn.style.opacity = !this.isRunning ? '0.5' : '1';
        }
    }
    
    _generateMainContent() {
        return \`
            <div class="demonstration-content" style="max-width: 1000px; margin: 0 auto;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <!-- Visualization Section -->
                    <div style="background: rgba(255,255,255,0.9); border-radius: 15px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h3 style="margin: 0 0 15px 0; color: #333; text-align: center;">Optimization Progress</h3>
                        
                        ${generateDemoVisualization(config)}
                    </div>
                    
                    <!-- Controls Section -->
                    <div style="background: rgba(255,255,255,0.9); border-radius: 15px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h3 style="margin: 0 0 15px 0; color: #333; text-align: center;">AI Optimization</h3>
                        
                        <!-- Iteration Counter -->
                        <div style="text-align: center; margin-bottom: 20px;">
                            <div style="font-size: 2rem; color: #667eea; font-weight: bold;">
                                Step <span id="demo-iteration">0</span>
                            </div>
                        </div>
                        
                        <!-- Parameter Display -->
                        ${generateParameterDisplays(config)}
                        
                        <!-- Control Buttons -->
                        <div style="margin-top: 20px;">
                            <button id="demo-start-btn" style="width: 100%; padding: 12px; background: linear-gradient(135deg, #2dd573, #1cb85c); color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: bold; cursor: pointer; margin-bottom: 10px;">
                                ▶️ Start Optimization
                            </button>
                            <div style="display: flex; gap: 10px;">
                                <button id="demo-stop-btn" style="flex: 1; padding: 10px; background: #ff6347; color: white; border: none; border-radius: 8px; font-size: 0.9rem; cursor: pointer;">
                                    ⏹️ Stop
                                </button>
                                <button id="demo-reset-btn" style="flex: 1; padding: 10px; background: #6c757d; color: white; border: none; border-radius: 8px; font-size: 0.9rem; cursor: pointer;">
                                    🔄 Reset
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        \`;
    }
}

async function ${functionName}() {
    const level = new ${className}Level();
    await level.create();
    window.currentLevel = level;
    return level;
}

${generateExports(config, functionName)}`;
}

/**
 * Generates a custom base level
 * @private
 */
function generateBaseLevelCustom(config) {
    const className = toPascalCase(config.id);
    const functionName = `create${className}Level`;
    
    return `/**
 * ${config.name} - Custom Level
 * ${config.description ? `* ${config.description}` : ''}
 * 
 * Generated automatically by MLTEACH Level Generator
 * Type: Custom Level with base template
 */

${generateImportsAndChecks(config)}

/**
 * ${config.name} Implementation
 */
class ${className}Level extends BaseLevelTemplate {
    
    constructor() {
        super({
            id: '${config.id}',
            name: '${config.name}',
            type: '${config.type}',
            description: '${config.description || ''}',
            parameters: ${JSON.stringify(config.parameters || {}, null, 12)},
            ${config.includeStateManagement !== false ? 'trackProgress: true,' : 'trackProgress: false,'}
            debug: ${config.debug || false}
        });
    }
    
    async setup() {
        await super.setup();
        
        // Add your custom setup logic here
        ${generateCustomSetup(config)}
        
        this.log('${config.name} setup complete');
    }
    
    _generateMainContent() {
        return \`
            <div class="custom-level-content" style="max-width: 1000px; margin: 0 auto;">
                <div style="background: rgba(255,255,255,0.9); border-radius: 15px; padding: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-align: center;">
                    <h3 style="color: #333; margin-bottom: 20px;">Custom Level Content</h3>
                    <p style="color: #666; margin-bottom: 30px;">
                        This is a custom level generated from the base template.
                        Override the _generateMainContent() method to add your specific content.
                    </p>
                    
                    ${generateCustomContent(config)}
                    
                    <button 
                        onclick="currentLevel.completeLevel({score: 100})"
                        style="padding: 12px 24px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 8px; font-size: 1.1rem; font-weight: bold; cursor: pointer; margin-top: 20px;"
                    >
                        Complete Level
                    </button>
                </div>
            </div>
        \`;
    }
    
    ${generateCustomMethods(config)}
    
    async onTeardown() {
        await super.onTeardown();
        
        // Add your custom teardown logic here
        ${generateCustomTeardown(config)}
        
        this.log('${config.name} teardown complete');
    }
}

async function ${functionName}() {
    const level = new ${className}Level();
    await level.create();
    window.currentLevel = level;
    return level;
}

${generateExports(config, functionName)}`;
}

// Helper functions for code generation

function generateImportsAndChecks(config) {
    const checks = [];
    
    if (config.includeServices !== false) {
        checks.push(`
// Check if services are available
if (typeof GradientDescentService === 'undefined') {
    console.error('GradientDescentService not loaded');
}`);
    }
    
    if (config.includeStateManagement !== false) {
        checks.push(`
// Check if state management is available
if (typeof LevelProgressStore === 'undefined' || typeof GameStateStore === 'undefined') {
    console.error('State management system not loaded');
}`);
    }
    
    if (config.type === 'interactive') {
        checks.push(`
// Check if InteractiveLevelTemplate is available
if (typeof InteractiveLevelTemplate === 'undefined') {
    console.error('InteractiveLevelTemplate not loaded - make sure templates are included');
}`);
    } else {
        checks.push(`
// Check if BaseLevelTemplate is available
if (typeof BaseLevelTemplate === 'undefined') {
    console.error('BaseLevelTemplate not loaded - make sure templates are included');
}`);
    }
    
    return checks.join('\n');
}

function generateCustomSetup(config) {
    if (config.customization && config.customization.setupCode) {
        return config.customization.setupCode;
    }
    
    return '// Add custom setup logic here';
}

function generateCustomTeardown(config) {
    if (config.customization && config.customization.teardownCode) {
        return config.customization.teardownCode;
    }
    
    return '// Add custom teardown logic here';
}

function generateVisualizationMethods(config) {
    if (config.customization && config.customization.visualizationCode) {
        return config.customization.visualizationCode;
    }
    
    return `
    /**
     * Override for custom visualization
     */
    _generateVisualizationContent() {
        return \`
            <div class="level-visualization" style="height: 200px; background: linear-gradient(to bottom, #e3f2fd, #bbdefb); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #666;">
                <div style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 10px;">🎯</div>
                    <div>Add your visualization here</div>
                </div>
            </div>
        \`;
    }`;
}

function generateCustomMethods(config) {
    if (config.customization && config.customization.customMethods) {
        return config.customization.customMethods;
    }
    
    return '';
}

function generateCustomContent(config) {
    if (config.customization && config.customization.contentHTML) {
        return config.customization.contentHTML;
    }
    
    return `
                    <div style="margin: 20px 0;">
                        <p>Add your custom content here by overriding _generateMainContent()</p>
                    </div>`;
}

function generateOptimizationStep(config) {
    return `
        // Simulate parameter updates (replace with actual optimization logic)
        const params = this.getParameters();
        const updatedParams = {};
        
        Object.keys(params).forEach(key => {
            // Simple random walk for demonstration
            const change = (Math.random() - 0.5) * 0.1;
            updatedParams[key] = params[key] + change;
        });
        
        this.updateParameters(updatedParams, false);
        
        // Record history
        this.optimizationHistory.push({
            iteration: this.currentIteration,
            parameters: updatedParams,
            timestamp: Date.now()
        });`;
}

function generateDemoVisualization(config) {
    return `
                        <div style="height: 200px; background: linear-gradient(to bottom, #e3f2fd, #bbdefb); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #666;">
                            <div style="text-align: center;">
                                <div style="font-size: 3rem; margin-bottom: 10px;">🤖</div>
                                <div>AI Optimization in Progress</div>
                            </div>
                        </div>`;
}

function generateParameterDisplays(config) {
    const params = config.parameters || {};
    const displays = Object.keys(params).map(key => `
                        <div style="margin-bottom: 15px; padding: 10px; background: white; border-radius: 8px; border: 1px solid #ddd;">
                            <div style="font-weight: bold; color: #333;">${key}:</div>
                            <div style="font-size: 1.2rem; color: #667eea; font-family: monospace;">
                                <span id="demo-${key}-value">${params[key]}</span>
                            </div>
                        </div>`);
    
    return displays.join('') || `
                        <div style="padding: 20px; text-align: center; color: #666;">
                            No parameters to display
                        </div>`;
}

function generateDefaultSteps() {
    return [
        {
            title: "Welcome",
            content: "<h3>Welcome to this tutorial!</h3><p>We'll guide you through the concepts step by step.</p>"
        },
        {
            title: "Step 1",
            content: "<h3>Understanding the Basics</h3><p>Let's start with the fundamental concepts...</p>"
        },
        {
            title: "Step 2", 
            content: "<h3>Applying the Knowledge</h3><p>Now let's see how to apply what we've learned...</p>"
        },
        {
            title: "Step 3",
            content: "<h3>Practice Time</h3><p>Try it yourself with this example...</p>"
        },
        {
            title: "Conclusion",
            content: "<h3>Great Job!</h3><p>You've completed the tutorial. You're ready for the next challenge!</p>"
        }
    ];
}

function generateExports(config, functionName) {
    return `
// Export for both global usage and modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ${functionName} };
} else {
    window.${functionName} = ${functionName};
}`;
}

function generateUsageExamples(config) {
    const className = toPascalCase(config.id);
    
    return `
/*
 * USAGE EXAMPLES:
 * 
 * 1. Create Level Programmatically:
 * ================================
 * const level = new ${className}Level();
 * await level.create();
 * 
 * 2. Access from Global Scope:
 * ===========================
 * // After calling ${functionName}()
 * console.log(window.currentLevel);
 * 
 * 3. Listen to Level Events:
 * =========================
 * window.addEventListener('mlteach:level:levelCompleted', (event) => {
 *   console.log('Level completed:', event.detail);
 * });
 * 
 * 4. Custom Integration:
 * =====================
 * const level = new ${className}Level();
 * level.config.debug = true; // Enable debug mode
 * await level.create();
 * 
 * // Access level methods
 * ${config.type === 'interactive' ? `level.updateControl('${config.controls?.[0]?.id || 'param'}', 5.0);` : ''}
 * level.completeLevel({ score: 100 });
 */`;
}

function toPascalCase(str) {
    return str.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join('');
}

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generateLevel };
}