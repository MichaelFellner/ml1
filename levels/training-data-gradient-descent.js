/**
 * Training Data Gradient Descent
 * 
 * Use gradient descent to automatically find optimal weights
 * Follow-up to the interactive weight adjustment level
 */

window.createTrainingDataGradientDescent = function() {
    
    class TrainingDataGradientDescentLevel extends window.BaseLevelTemplate {
        constructor() {
            super({
                id: 'training-data-gradient-descent',
                name: 'Gradient Descent Weight Optimizer',
                type: 'interactive',
                description: 'Use gradient descent to automatically find optimal weights',
                instructions: '',  // Empty to avoid undefined
                concepts: ['Gradient Descent', 'Learning Rate', 'Convergence', 'Training'],
                difficulty: 'intermediate',
                interactionType: 'gradient-descent',
                estimatedTime: 5
            });
            
            this.data = [];
            this.currentTotalError = 0;
            this.isTraining = false;
            this.trainingHistory = [];
            this.animationFrame = null;
            
            // Current weights
            this.weights = { w1: 1, w2: 1, w3: 1 };
            
            // Target function (hidden from user) - same as previous level
            this.targetFunction = { w1: 3, w2: 5, w3: 10 };
            
            // Training parameters
            this.learningRate = 0.01;
            this.maxIterations = 1000;
            this.currentIteration = 0;
        }
        
        async setup() {
            await super.setup();
            
            // Generate the same 50 rows of data
            this.generateData();
            
            // Initialize navigation
            if (typeof initializeNavigation === 'function') {
                initializeNavigation('training-data-gradient-descent', 'createTrainingDataGradientDescent');
            }
            
            // Setup control listeners
            this.setupControlListeners();
            
            // Initial display update
            setTimeout(() => this.updateSpreadsheet(), 100);
        }
        
        generateData() {
            // Use same seeded random as previous level for consistency
            let seed = 12345;
            const seededRandom = () => {
                seed = (seed * 9301 + 49297) % 233280;
                return seed / 233280;
            };
            
            // Generate same 50 random data points
            for (let i = 0; i < 50; i++) {
                const x1 = Math.floor(seededRandom() * 10) + 1;
                const x2 = Math.floor(seededRandom() * 10) + 1;
                const x3 = Math.floor(seededRandom() * 10) + 1;
                // Hidden formula: 3*x1 + 5*x2 + 10*x3
                const target = 3 * x1 + 5 * x2 + 10 * x3;
                
                this.data.push({
                    id: i + 1,
                    x1: x1,
                    x2: x2,
                    x3: x3,
                    target: target
                });
            }
        }
        
        setupControlListeners() {
            // Learning rate selection
            const learningRateButtons = document.querySelectorAll('.learning-rate-btn');
            learningRateButtons.forEach(btn => {
                this.addEventListenerWithCleanup(btn, 'click', (e) => {
                    // Remove active class from all buttons
                    learningRateButtons.forEach(b => b.classList.remove('active'));
                    // Add active class to clicked button
                    e.target.classList.add('active');
                    // Update learning rate
                    this.learningRate = parseFloat(e.target.dataset.rate);
                    document.getElementById('current-learning-rate').textContent = this.learningRate;
                });
            });
            
            // Start training button
            const startBtn = document.getElementById('start-training');
            if (startBtn) {
                this.addEventListenerWithCleanup(startBtn, 'click', () => {
                    if (!this.isTraining) {
                        this.startTraining();
                    }
                });
            }
            
            // Reset button
            const resetBtn = document.getElementById('reset-weights');
            if (resetBtn) {
                this.addEventListenerWithCleanup(resetBtn, 'click', () => {
                    this.resetWeights();
                });
            }
            
            // Stop button
            const stopBtn = document.getElementById('stop-training');
            if (stopBtn) {
                this.addEventListenerWithCleanup(stopBtn, 'click', () => {
                    this.stopTraining();
                });
            }
        }
        
        calculateLoss() {
            let totalError = 0;
            for (const row of this.data) {
                const prediction = this.weights.w1 * row.x1 + 
                                 this.weights.w2 * row.x2 + 
                                 this.weights.w3 * row.x3;
                const error = row.target - prediction;
                totalError += error * error; // Mean Squared Error
            }
            return totalError / this.data.length;
        }
        
        calculateGradients() {
            let gradW1 = 0, gradW2 = 0, gradW3 = 0;
            
            for (const row of this.data) {
                const prediction = this.weights.w1 * row.x1 + 
                                 this.weights.w2 * row.x2 + 
                                 this.weights.w3 * row.x3;
                const error = prediction - row.target;
                
                gradW1 += error * row.x1;
                gradW2 += error * row.x2;
                gradW3 += error * row.x3;
            }
            
            // Average the gradients
            const n = this.data.length;
            return {
                w1: (2 * gradW1) / n,
                w2: (2 * gradW2) / n,
                w3: (2 * gradW3) / n
            };
        }
        
        async startTraining() {
            if (this.isTraining) return;
            
            this.isTraining = true;
            this.currentIteration = 0;
            this.trainingHistory = [];
            
            // Update UI
            document.getElementById('start-training').disabled = true;
            document.getElementById('stop-training').disabled = false;
            document.getElementById('reset-weights').disabled = true;
            document.querySelectorAll('.learning-rate-btn').forEach(btn => btn.disabled = true);
            
            // Training loop
            const train = () => {
                if (!this.isTraining || this.currentIteration >= this.maxIterations) {
                    this.stopTraining();
                    return;
                }
                
                // Calculate gradients
                const gradients = this.calculateGradients();
                
                // Update weights
                this.weights.w1 -= this.learningRate * gradients.w1;
                this.weights.w2 -= this.learningRate * gradients.w2;
                this.weights.w3 -= this.learningRate * gradients.w3;
                
                // Store history
                const loss = this.calculateLoss();
                this.trainingHistory.push({
                    iteration: this.currentIteration,
                    loss: loss,
                    weights: { ...this.weights }
                });
                
                // Update display
                this.updateSpreadsheet();
                this.updateStats();
                
                // Check for convergence (weights close to target)
                const tolerance = 0.1;
                if (Math.abs(this.weights.w1 - this.targetFunction.w1) < tolerance &&
                    Math.abs(this.weights.w2 - this.targetFunction.w2) < tolerance &&
                    Math.abs(this.weights.w3 - this.targetFunction.w3) < tolerance) {
                    this.onConvergence();
                    this.stopTraining();
                    return;
                }
                
                // Check for divergence (learning rate too high)
                if (loss > 1e10 || isNaN(loss)) {
                    this.onDivergence();
                    this.stopTraining();
                    return;
                }
                
                this.currentIteration++;
                
                // Continue training with appropriate speed
                const delay = this.learningRate === 1 ? 100 : 
                             this.learningRate === 0.01 ? 50 : 30;
                this.animationFrame = setTimeout(train, delay);
            };
            
            // Start training
            train();
        }
        
        stopTraining() {
            this.isTraining = false;
            if (this.animationFrame) {
                clearTimeout(this.animationFrame);
                this.animationFrame = null;
            }
            
            // Update UI
            document.getElementById('start-training').disabled = false;
            document.getElementById('stop-training').disabled = true;
            document.getElementById('reset-weights').disabled = false;
            document.querySelectorAll('.learning-rate-btn').forEach(btn => btn.disabled = false);
        }
        
        resetWeights() {
            this.weights = { w1: 1, w2: 1, w3: 1 };
            this.currentIteration = 0;
            this.trainingHistory = [];
            this.updateSpreadsheet();
            this.updateStats();
        }
        
        onConvergence() {
            if (!this.completed) {
                this.completed = true;
                this.showSuccess(`🎉 Convergence achieved in ${this.currentIteration} iterations!`, 5000);
                setTimeout(() => {
                    this.completeLevel({ 
                        score: 100,
                        iterations: this.currentIteration,
                        learningRate: this.learningRate
                    });
                }, 2000);
            }
        }
        
        onDivergence() {
            this.showError('⚠️ Training diverged! Learning rate too high - try a smaller value.', 5000);
        }
        
        updateSpreadsheet() {
            const tbody = document.getElementById('data-tbody');
            if (!tbody) return;
            
            let totalError = 0;
            
            const rows = this.data.map(row => {
                const w1x1 = (this.weights.w1 * row.x1).toFixed(1);
                const w2x2 = (this.weights.w2 * row.x2).toFixed(1);
                const w3x3 = (this.weights.w3 * row.x3).toFixed(1);
                const prediction = (parseFloat(w1x1) + parseFloat(w2x2) + parseFloat(w3x3)).toFixed(1);
                const error = (row.target - parseFloat(prediction)).toFixed(1);
                
                totalError += Math.abs(parseFloat(error));
                
                const errorColor = Math.abs(parseFloat(error)) < 5 ? '#4caf50' : 
                                  Math.abs(parseFloat(error)) < 20 ? '#ff9800' : '#f44336';
                
                return `
                    <tr>
                        <td style="padding: 6px; text-align: center; border-right: 1px solid #ddd; background: #f8f9fa; font-size: 0.9em;">${row.id}</td>
                        <td style="padding: 6px; text-align: center; font-size: 0.9em;">${row.x1}</td>
                        <td style="padding: 6px; text-align: center; font-size: 0.9em;">${row.x2}</td>
                        <td style="padding: 6px; text-align: center; font-size: 0.9em;">${row.x3}</td>
                        <td style="padding: 6px; text-align: center; background: rgba(234,179,8,0.1); font-weight: bold; font-size: 0.9em;">${row.target}</td>
                        <td style="padding: 6px; text-align: center; background: rgba(102,126,234,0.05); font-size: 0.9em;">${w1x1}</td>
                        <td style="padding: 6px; text-align: center; background: rgba(102,126,234,0.05); font-size: 0.9em;">${w2x2}</td>
                        <td style="padding: 6px; text-align: center; background: rgba(102,126,234,0.05); font-size: 0.9em;">${w3x3}</td>
                        <td style="padding: 6px; text-align: center; background: rgba(102,126,234,0.1); font-weight: bold; font-size: 0.9em;">${prediction}</td>
                        <td style="padding: 6px; text-align: center; color: ${errorColor}; font-weight: bold; font-size: 0.9em;">${error}</td>
                    </tr>
                `;
            }).join('');
            
            tbody.innerHTML = rows;
            
            // Update total error display
            const errorDisplay = document.getElementById('total-error');
            if (errorDisplay) {
                errorDisplay.textContent = totalError.toFixed(1);
                
                // Update color based on error magnitude
                if (totalError < 100) {
                    errorDisplay.style.color = '#4caf50';
                } else if (totalError < 500) {
                    errorDisplay.style.color = '#ff9800';
                } else {
                    errorDisplay.style.color = '#f44336';
                }
            }
            
            // Check for success (same as previous level)
            if (totalError < 50 && !this.isTraining) {
                if (!this.completed) {
                    this.completed = true;
                    this.showSuccess('🎉 Excellent! The AI found the weights!', 5000);
                    setTimeout(() => {
                        this.completeLevel({ score: Math.round(100 - totalError/10) });
                    }, 1500);
                }
            }
        }
        
        updateStats() {
            // Update weight displays
            document.getElementById('w1-display').textContent = this.weights.w1.toFixed(2);
            document.getElementById('w2-display').textContent = this.weights.w2.toFixed(2);
            document.getElementById('w3-display').textContent = this.weights.w3.toFixed(2);
            
            // Update iteration counter
            document.getElementById('iteration-count').textContent = this.currentIteration;
        }
        
        _generateMainContent() {
            // Create initial table rows (will be updated dynamically)
            const tableRows = this.data.map(row => `
                <tr>
                    <td style="padding: 6px; text-align: center; border-right: 1px solid #ddd; background: #f8f9fa; font-size: 0.9em;">${row.id}</td>
                    <td style="padding: 6px; text-align: center; font-size: 0.9em;">${row.x1}</td>
                    <td style="padding: 6px; text-align: center; font-size: 0.9em;">${row.x2}</td>
                    <td style="padding: 6px; text-align: center; font-size: 0.9em;">${row.x3}</td>
                    <td style="padding: 6px; text-align: center; background: rgba(234,179,8,0.1); font-weight: bold; font-size: 0.9em;">${row.target}</td>
                    <td style="padding: 6px; text-align: center; background: rgba(102,126,234,0.05); font-size: 0.9em;">-</td>
                    <td style="padding: 6px; text-align: center; background: rgba(102,126,234,0.05); font-size: 0.9em;">-</td>
                    <td style="padding: 6px; text-align: center; background: rgba(102,126,234,0.05); font-size: 0.9em;">-</td>
                    <td style="padding: 6px; text-align: center; background: rgba(102,126,234,0.1); font-weight: bold; font-size: 0.9em;">-</td>
                    <td style="padding: 6px; text-align: center; font-weight: bold; font-size: 0.9em;">-</td>
                </tr>
            `).join('');
            
            return `
                <div style="max-height: 90vh; display: flex; flex-direction: column; gap: 10px; padding: 10px;">
                    <!-- Compact Header with Controls -->
                    <div style="background: white; border-radius: 8px; padding: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                            <!-- Learning Rate Selection -->
                            <div style="display: flex; gap: 10px; align-items: center;">
                                <span style="font-weight: bold; color: #555; font-size: 0.9em;">Learning Rate:</span>
                                <button class="learning-rate-btn" data-rate="1" style="
                                    padding: 6px 12px;
                                    background: #ff6b6b;
                                    color: white;
                                    border: none;
                                    border-radius: 6px;
                                    font-size: 0.85em;
                                    cursor: pointer;
                                    transition: all 0.3s;
                                ">
                                    Large (1)
                                </button>
                                <button class="learning-rate-btn active" data-rate="0.01" style="
                                    padding: 6px 12px;
                                    background: #4ecdc4;
                                    color: white;
                                    border: none;
                                    border-radius: 6px;
                                    font-size: 0.85em;
                                    cursor: pointer;
                                    transition: all 0.3s;
                                ">
                                    Medium (0.01)
                                </button>
                                <button class="learning-rate-btn" data-rate="0.001" style="
                                    padding: 6px 12px;
                                    background: #95e77e;
                                    color: white;
                                    border: none;
                                    border-radius: 6px;
                                    font-size: 0.85em;
                                    cursor: pointer;
                                    transition: all 0.3s;
                                ">
                                    Small (0.001)
                                </button>
                            </div>
                            
                            <!-- Control Buttons -->
                            <div style="display: flex; gap: 10px;">
                                <button id="start-training" style="
                                    padding: 6px 16px;
                                    background: #667eea;
                                    color: white;
                                    border: none;
                                    border-radius: 6px;
                                    font-size: 0.9em;
                                    font-weight: bold;
                                    cursor: pointer;
                                    transition: all 0.3s;
                                ">
                                    Start Training
                                </button>
                                <button id="stop-training" disabled style="
                                    padding: 6px 16px;
                                    background: #ff9800;
                                    color: white;
                                    border: none;
                                    border-radius: 6px;
                                    font-size: 0.9em;
                                    font-weight: bold;
                                    cursor: pointer;
                                    transition: all 0.3s;
                                    opacity: 0.5;
                                ">
                                    Stop
                                </button>
                                <button id="reset-weights" style="
                                    padding: 6px 16px;
                                    background: #9e9e9e;
                                    color: white;
                                    border: none;
                                    border-radius: 6px;
                                    font-size: 0.9em;
                                    font-weight: bold;
                                    cursor: pointer;
                                    transition: all 0.3s;
                                ">
                                    Reset
                                </button>
                            </div>
                        </div>
                        
                        <!-- Compact Stats Display -->
                        <div style="display: flex; justify-content: space-around; margin-top: 10px; padding-top: 10px; border-top: 1px solid #e0e0e0;">
                            <div style="text-align: center;">
                                <span style="font-size: 0.75em; color: #666;">Iteration</span>
                                <div id="iteration-count" style="font-size: 1.1em; font-weight: bold; color: #333;">0</div>
                            </div>
                            <div style="text-align: center;">
                                <span style="font-size: 0.75em; color: #666;">w₁</span>
                                <div id="w1-display" style="font-size: 1.1em; font-weight: bold; color: #667eea;">1.00</div>
                            </div>
                            <div style="text-align: center;">
                                <span style="font-size: 0.75em; color: #666;">w₂</span>
                                <div id="w2-display" style="font-size: 1.1em; font-weight: bold; color: #667eea;">1.00</div>
                            </div>
                            <div style="text-align: center;">
                                <span style="font-size: 0.75em; color: #666;">w₃</span>
                                <div id="w3-display" style="font-size: 1.1em; font-weight: bold; color: #667eea;">1.00</div>
                            </div>
                            <div style="text-align: center;">
                                <span style="font-size: 0.75em; color: #666;">α</span>
                                <div id="current-learning-rate" style="font-size: 1.1em; font-weight: bold; color: #ff9800;">0.01</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Spreadsheet Container -->
                    <div style="flex: 1; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden; display: flex; flex-direction: column; min-height: 400px;">
                        <!-- Table wrapper with scroll -->
                        <div style="flex: 1; overflow-y: auto; overflow-x: auto; min-height: 0;">
                            <table style="width: 100%; border-collapse: collapse; font-family: 'Monaco', 'Courier New', monospace;">
                                <thead style="position: sticky; top: 0; background: #667eea; color: white; z-index: 10;">
                                    <tr>
                                        <th style="padding: 8px; text-align: center; border-right: 1px solid rgba(255,255,255,0.3); font-size: 0.85em;">Row</th>
                                        <th style="padding: 8px; text-align: center; font-size: 0.85em;">x₁</th>
                                        <th style="padding: 8px; text-align: center; font-size: 0.85em;">x₂</th>
                                        <th style="padding: 8px; text-align: center; font-size: 0.85em;">x₃</th>
                                        <th style="padding: 8px; text-align: center; background: rgba(0,0,0,0.1); font-size: 0.85em;">Target</th>
                                        <th style="padding: 8px; text-align: center; background: rgba(255,255,255,0.1); font-size: 0.85em;">w₁×x₁</th>
                                        <th style="padding: 8px; text-align: center; background: rgba(255,255,255,0.1); font-size: 0.85em;">w₂×x₂</th>
                                        <th style="padding: 8px; text-align: center; background: rgba(255,255,255,0.1); font-size: 0.85em;">w₃×x₃</th>
                                        <th style="padding: 8px; text-align: center; background: rgba(255,255,255,0.2); font-size: 0.85em;">Prediction</th>
                                        <th style="padding: 8px; text-align: center; background: rgba(255,255,255,0.3); font-size: 0.85em;">Error</th>
                                    </tr>
                                </thead>
                                <tbody id="data-tbody">
                                    ${tableRows}
                                </tbody>
                            </table>
                        </div>
                        
                        <!-- Total error bar at bottom -->
                        <div style="padding: 10px; background: linear-gradient(to right, rgba(102,126,234,0.1), rgba(234,179,8,0.1)); border-top: 3px solid #667eea;">
                            <p style="margin: 0; text-align: center; font-size: 1em; font-weight: bold;">
                                Total Error: <span id="total-error" style="color: #f44336; font-size: 1.1em;">0</span>
                                <span style="margin-left: 20px; color: #666; font-size: 0.85em;">
                                    Goal: Get total error below 50 | Target weights: w₁=3, w₂=5, w₃=10
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                
                <!-- Standard navigation -->
                ${typeof createStandardNavigation === 'function' ? createStandardNavigation() : ''}
                
                <style>
                    .learning-rate-btn:hover:not(:disabled) {
                        transform: translateY(-1px);
                        box-shadow: 0 3px 8px rgba(0,0,0,0.2);
                    }
                    .learning-rate-btn.active {
                        transform: scale(1.05);
                        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                    }
                    .learning-rate-btn:disabled {
                        opacity: 0.5;
                        cursor: not-allowed;
                    }
                    button:not(:disabled):hover {
                        transform: translateY(-1px);
                        box-shadow: 0 3px 8px rgba(0,0,0,0.2);
                    }
                    button:disabled {
                        opacity: 0.5;
                        cursor: not-allowed;
                    }
                </style>
            `;
        }
        
        cleanup() {
            // Stop training if in progress
            this.stopTraining();
            
            // Call parent cleanup
            super.cleanup();
        }
    }
    
    const level = new TrainingDataGradientDescentLevel();
    level.create().catch(error => {
        console.error('Failed to create Training Data Gradient Descent:', error);
    });
    
    return level;
};

// Export for modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.createTrainingDataGradientDescent;
}