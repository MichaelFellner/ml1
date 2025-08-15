/**
 * Step Teaching Level
 * 
 * Interactive level that teaches how steps work in gradient descent
 * by visualizing the true function f(x) = 7x and a user-modifiable
 * function f(x) = wx on a graph.
 * 
 * @fileoverview Step teaching level implementation
 * @author MLTEACH Team
 * @version 1.0.0
 * @type interactive
 */

// Dependency checks
if (typeof InteractiveLevelTemplate === 'undefined') {
    console.error('InteractiveLevelTemplate not loaded');
}

/**
 * Step Teaching Implementation
 */
class StepTeachingLevel extends InteractiveLevelTemplate {
    
    constructor() {
        super({
            id: 'step-teaching',
            name: 'Understanding Steps in Gradient Descent',
            type: 'interactive',
            description: 'Learn how step sizes affect gradient descent optimization',
            
            targetFunction: { 
                w: 7  // Target weight
            },
            
            controls: [
                {
                    id: 'w',
                    label: 'Weight (w)',
                    min: -10,
                    max: 15,
                    step: 0.1,
                    default: 1
                }
            ],
            
            validation: {
                tolerance: 0.05 // 5% tolerance
            },
            
            trackProgress: true,
            debug: false
        });
        
        // Additional level-specific state
        this.stepSize = 0.5;
        this.gradientHistory = [];
        this.canvas = null;
        this.ctx = null;
    }
    
    async setup() {
        await super.setup();
        
        // Set up the step size input
        this._setupStepSizeControl();
        
        // Initialize the graph
        this._initializeGraph();
        
        // Add gradient descent functionality
        this._setupGradientDescentControls();
        
        this.log('Step Teaching level setup complete');
    }
    
    _generateVisualizationContent() {
        return `
            <div class="visualization-container" style="
                max-height: 70vh;
                display: grid;
                grid-template-columns: 1.2fr 1fr;
                gap: 20px;
                padding: 15px;
            ">
                <!-- Compact instruction -->
                <div style="grid-column: 1 / -1; 
                            background: rgba(102,126,234,0.1); 
                            border-radius: 8px; 
                            padding: 8px 15px;
                            margin-bottom: 10px;">
                    <p style="margin: 0; text-align: center; font-size: 0.95rem; color: #555;">
                        Adjust w to match the target function (blue line). Use steps to automatically improve!
                    </p>
                </div>
                
                <!-- Left: Graph Visualization -->
                <div style="background: white; 
                            border-radius: 10px; 
                            padding: 15px;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <h4 style="margin: 0 0 10px 0; color: #333;">Function Graph</h4>
                    <canvas id="graph-canvas" width="450" height="350"
                            style="width: 100%; max-height: 45vh; border: 1px solid #e0e0e0; border-radius: 5px;">
                    </canvas>
                    
                    <!-- Legend -->
                    <div style="margin-top: 10px; display: flex; gap: 20px; justify-content: center; font-size: 0.85rem;">
                        <span><span style="color: #2196F3; font-weight: bold;">━━</span> Target: f(x) = 7x</span>
                        <span><span style="color: #ff6b6b; font-weight: bold;">━━</span> Your: f(x) = <span id="legend-w">1</span>x</span>
                    </div>
                </div>
                
                <!-- Right: Controls & Status -->
                <div style="background: white; 
                            border-radius: 10px; 
                            padding: 15px;
                            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                            display: flex;
                            flex-direction: column;
                            gap: 15px;">
                    <h4 style="margin: 0; color: #333;">Controls</h4>
                    
                    <!-- Formula display -->
                    <div style="background: #f8f9fa; 
                                border: 2px solid #667eea; 
                                border-radius: 8px; 
                                padding: 12px;
                                text-align: center;
                                font-family: 'Courier New', monospace;">
                        <div style="font-size: 1.1rem; color: #333;">
                            f(x) = <span id="w-formula" style="color: #667eea; font-weight: bold;">1.0</span> × x
                        </div>
                        <div style="font-size: 0.85rem; color: #666; margin-top: 5px;">
                            Target: f(x) = 7 × x
                        </div>
                    </div>
                    
                    <!-- Weight control slider -->
                    <div>
                        <label style="display: block; margin-bottom: 8px; color: #333; font-weight: bold;">
                            Weight (w): <span id="w-value" style="color: #667eea;">1.0</span>
                        </label>
                        <input type="range" id="w-slider" 
                               min="-10" max="15" value="1" step="0.1"
                               style="width: 100%; height: 8px; border-radius: 4px; background: #ddd; outline: none;">
                        <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #999; margin-top: 5px;">
                            <span>-10</span>
                            <span>0</span>
                            <span>7</span>
                            <span>15</span>
                        </div>
                    </div>
                    
                    <!-- Step size control -->
                    <div style="background: #e8f4fd; border-radius: 8px; padding: 12px;">
                        <label style="display: block; margin-bottom: 8px; color: #333; font-weight: bold;">
                            Step Size: <span id="step-value" style="color: #2196F3;">0.5</span>
                        </label>
                        <input type="number" id="step-input" 
                               value="0.5" min="0.01" max="5" step="0.01"
                               style="width: 100%; padding: 8px; border: 2px solid #2196F3; border-radius: 5px; font-size: 1rem;">
                        <div style="margin-top: 8px; font-size: 0.8rem; color: #666;">
                            Enter any step size (0.01 - 5.0)
                        </div>
                    </div>
                    
                    <!-- Gradient info -->
                    <div style="background: #f0f4f8; border-radius: 8px; padding: 10px;">
                        <div style="font-size: 0.85rem; color: #555;">
                            <strong>Loss:</strong> <span id="loss-value" style="color: #ff6b6b;">36.00</span><br>
                            <strong>Gradient:</strong> <span id="gradient-value" style="color: #2196F3;">-12.00</span><br>
                            <strong>Next step:</strong> w = w - (step × gradient)
                        </div>
                    </div>
                    
                    <!-- Action buttons -->
                    <div style="display: flex; gap: 10px;">
                        <button id="step-btn"
                                style="flex: 1; padding: 10px; 
                                       background: linear-gradient(135deg, #2196F3, #1976D2); 
                                       color: white; border: none; border-radius: 8px; 
                                       font-weight: bold; cursor: pointer;">
                            📈 Take Step
                        </button>
                        
                        <button id="reset-w-btn"
                                style="flex: 1; padding: 10px; 
                                       background: #6c757d; color: white; 
                                       border: none; border-radius: 8px; 
                                       font-weight: bold; cursor: pointer;">
                            🔄 Reset w to 1
                        </button>
                    </div>
                    
                    <button id="check-btn"
                            style="width: 100%; padding: 12px; 
                                   background: linear-gradient(135deg, #667eea, #764ba2); 
                                   color: white; border: none; border-radius: 8px; 
                                   font-size: 1.1rem; font-weight: bold; cursor: pointer;">
                        🎯 Check Solution
                    </button>
                    
                    <!-- Success message -->
                    <div id="success-msg" style="display: none; 
                                                  background: rgba(45,213,115,0.1); 
                                                  border: 2px solid rgba(45,213,115,0.3);
                                                  border-radius: 8px; padding: 10px;
                                                  text-align: center; color: #2dd573;">
                        🎉 Perfect! You found w = 7!
                    </div>
                </div>
            </div>
        `;
    }
    
    _initializeGraph() {
        this.canvas = document.getElementById('graph-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this._drawGraph();
    }
    
    _drawGraph() {
        if (!this.ctx) return;
        
        const ctx = this.ctx;
        const width = this.canvas.width;
        const height = this.canvas.height;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Set up coordinate system
        const padding = 40;
        const graphWidth = width - 2 * padding;
        const graphHeight = height - 2 * padding;
        
        // Draw axes
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.beginPath();
        // Y-axis
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height - padding);
        // X-axis
        ctx.moveTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.stroke();
        
        // Draw grid lines
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        
        for (let i = 1; i <= 5; i++) {
            const x = padding + (graphWidth / 5) * i;
            ctx.beginPath();
            ctx.moveTo(x, padding);
            ctx.lineTo(x, height - padding);
            ctx.stroke();
            
            const y = padding + (graphHeight / 5) * i;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
            ctx.stroke();
        }
        
        ctx.setLineDash([]);
        
        // Draw functions
        const xMin = 0;
        const xMax = 5;
        const yMin = -10;
        const yMax = 40;
        
        const scaleX = (x) => padding + (x - xMin) / (xMax - xMin) * graphWidth;
        const scaleY = (y) => height - padding - (y - yMin) / (yMax - yMin) * graphHeight;
        
        // Draw target function f(x) = 7x
        ctx.strokeStyle = '#2196F3';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let x = xMin; x <= xMax; x += 0.1) {
            const y = 7 * x;
            if (x === xMin) {
                ctx.moveTo(scaleX(x), scaleY(y));
            } else {
                ctx.lineTo(scaleX(x), scaleY(y));
            }
        }
        ctx.stroke();
        
        // Draw user function f(x) = wx
        const w = this.getParameters().w;
        ctx.strokeStyle = '#ff6b6b';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let x = xMin; x <= xMax; x += 0.1) {
            const y = w * x;
            if (x === xMin) {
                ctx.moveTo(scaleX(x), scaleY(y));
            } else {
                ctx.lineTo(scaleX(x), scaleY(y));
            }
        }
        ctx.stroke();
        
        // Draw axis labels
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        
        // X-axis labels
        for (let i = 0; i <= 5; i++) {
            const x = padding + (graphWidth / 5) * i;
            ctx.fillText(i.toString(), x, height - padding + 20);
        }
        
        // Y-axis labels
        ctx.textAlign = 'right';
        for (let i = 0; i <= 4; i++) {
            const y = padding + (graphHeight / 4) * i;
            const value = 40 - i * 10;
            ctx.fillText(value.toString(), padding - 10, y + 5);
        }
        
        // Axis titles
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('x', width / 2, height - 5);
        
        ctx.save();
        ctx.translate(10, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('f(x)', 0, 0);
        ctx.restore();
    }
    
    _setupStepSizeControl() {
        const stepInput = document.getElementById('step-input');
        if (stepInput) {
            stepInput.addEventListener('input', (e) => {
                const value = parseFloat(e.target.value);
                if (!isNaN(value) && value > 0 && value <= 5) {
                    this.stepSize = value;
                    document.getElementById('step-value').textContent = value.toFixed(2);
                }
            });
        }
    }
    
    _setupGradientDescentControls() {
        const stepBtn = document.getElementById('step-btn');
        const resetBtn = document.getElementById('reset-w-btn');
        const checkBtn = document.getElementById('check-btn');
        
        if (stepBtn) {
            this.addEventListenerWithCleanup(stepBtn, 'click', () => {
                this._takeGradientStep();
            });
        }
        
        if (resetBtn) {
            this.addEventListenerWithCleanup(resetBtn, 'click', () => {
                this.updateControl('w', 1);
                this._updateLossAndGradient();
                document.getElementById('success-msg').style.display = 'none';
            });
        }
        
        if (checkBtn) {
            this.addEventListenerWithCleanup(checkBtn, 'click', () => {
                this.checkSolution();
            });
        }
    }
    
    _takeGradientStep() {
        const currentW = this.getParameters().w;
        const targetW = this.config.targetFunction.w;
        
        // Calculate gradient (derivative of loss with respect to w)
        // Loss = (w - target_w)^2
        // Gradient = 2(w - target_w)
        const gradient = 2 * (currentW - targetW);
        
        // Update w using gradient descent: w = w - step_size * gradient
        const newW = currentW - this.stepSize * gradient;
        
        // Clamp to control bounds
        const clampedW = Math.max(-10, Math.min(15, newW));
        
        // Update the control
        this.updateControl('w', clampedW);
        
        // Add to history
        this.gradientHistory.push({
            w: clampedW,
            gradient: gradient,
            stepSize: this.stepSize
        });
        
        // Update displays
        this._updateLossAndGradient();
        
        // Track action
        this.trackAction('gradient_step', {
            oldW: currentW,
            newW: clampedW,
            gradient: gradient,
            stepSize: this.stepSize
        });
    }
    
    _updateLossAndGradient() {
        const w = this.getParameters().w;
        const targetW = this.config.targetFunction.w;
        
        // Calculate loss
        const loss = Math.pow(w - targetW, 2);
        
        // Calculate gradient
        const gradient = 2 * (w - targetW);
        
        // Update displays
        const lossDisplay = document.getElementById('loss-value');
        const gradientDisplay = document.getElementById('gradient-value');
        
        if (lossDisplay) {
            lossDisplay.textContent = loss.toFixed(2);
        }
        
        if (gradientDisplay) {
            gradientDisplay.textContent = gradient.toFixed(2);
        }
    }
    
    updateControl(controlId, value, validate = false) {
        super.updateControl(controlId, value, validate);
        
        // Update graph
        this._drawGraph();
        
        // Update formula displays
        const wFormula = document.getElementById('w-formula');
        const legendW = document.getElementById('legend-w');
        
        if (wFormula) {
            wFormula.textContent = value.toFixed(1);
        }
        
        if (legendW) {
            legendW.textContent = value.toFixed(1);
        }
        
        // Update loss and gradient
        this._updateLossAndGradient();
    }
    
    checkSolution() {
        const validation = this.validateParameters();
        
        if (validation.success) {
            document.getElementById('success-msg').style.display = 'block';
            
            // Complete the level
            this.completeLevel({
                score: validation.accuracy,
                solutions: this.getParameters()
            });
        } else {
            this.showError(`Not quite! Your w = ${this.getParameters().w.toFixed(1)}, but the target is w = 7. Accuracy: ${validation.accuracy}%`);
        }
    }
    
    async onTeardown() {
        // Clear canvas
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        
        await super.onTeardown();
        this.log('Step Teaching level cleanup complete');
    }
}

/**
 * Creates the Step Teaching level
 */
async function createStepTeachingLevel() {
    try {
        const level = new StepTeachingLevel();
        await level.create();
        
        window.currentLevel = level;
        return level;
        
    } catch (error) {
        console.error('Failed to create Step Teaching level:', error);
        
        const container = document.getElementById('app');
        if (container) {
            container.innerHTML = `
                <div style="padding: 40px; text-align: center; color: #ff6347;">
                    <h2>⚠️ Level Loading Error</h2>
                    <p>Failed to load Step Teaching level. Please refresh the page.</p>
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
    module.exports = { createStepTeachingLevel };
} else {
    window.createStepTeachingLevel = createStepTeachingLevel;
}