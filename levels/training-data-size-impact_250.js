/**
 * Training Data Size Impact
 * 
 * Demonstrates how the amount of training data affects model performance
 * Users can train on different dataset sizes and test on unseen data
 */

window.createTrainingDataSizeImpact250 = function() {
    
    class TrainingDataSizeImpactLevel extends window.BaseLevelTemplate {
        constructor() {
            super({
                id: 'training-data-size-impact-250',
                name: 'Training Data Size Impact (250 Rows)',
                type: 'interactive',
                description: '',
                instructions: '',
                concepts: ['Training Data Size', 'Model Performance', 'Test Data', 'Noise'],
                difficulty: 'intermediate',
                interactionType: 'gradient-descent',
                estimatedTime: 7
            });
            
            this.trainingData = [];
            this.testData = [];
            this.currentDataSize = 250;
            this.isTraining = false;
            this.animationFrame = null;
            
            // Current weights
            this.weights = { w1: 1, w2: 1, w3: 1 };
            
            // Target function with noise
            this.targetFunction = { w1: 3, w2: 5, w3: 10 };
            
            // Training parameters
            this.learningRate = 0.01;
            this.maxIterations = 1000;
            this.currentIteration = 0;
            
            // Test results
            this.testResults = null;
        }
        
        async setup() {
            await super.setup();
            
            // Generate test data (1000 rows)
            this.generateTestData();
            
            // Generate initial training data (always 250 rows)
            this.generateTrainingData(250);
            
            // Initialize navigation
            if (typeof initializeNavigation === 'function') {
                initializeNavigation('training-data-size-impact-250', 'createTrainingDataSizeImpact250');
            }
            
            // Setup control listeners
            this.setupControlListeners();
            
            // Initial display update
            setTimeout(() => {
                this.updateSpreadsheet();
                this.updateStats();
                this.updateLossDisplay();
            }, 100);
        }
        
        generateTrainingData(size) {
            this.trainingData = [];
            let seed = 12345;
            const seededRandom = () => {
                seed = (seed * 9301 + 49297) % 233280;
                return seed / 233280;
            };
            
            for (let i = 0; i < size; i++) {
                const x1 = Math.floor(seededRandom() * 10) + 1;
                const x2 = Math.floor(seededRandom() * 10) + 1;
                const x3 = Math.floor(seededRandom() * 10) + 1;
                
                // Add small random noise (-2 to +2)
                const noise = (seededRandom() - 0.5) * 4;
                const target = 3 * x1 + 5 * x2 + 10 * x3 + noise;
                
                this.trainingData.push({
                    id: i + 1,
                    x1: x1,
                    x2: x2,
                    x3: x3,
                    target: Math.round(target * 10) / 10, // Round to 1 decimal
                    noise: noise
                });
            }
        }
        
        generateTestData() {
            this.testData = [];
            let seed = 99999; // Different seed for test data
            const seededRandom = () => {
                seed = (seed * 9301 + 49297) % 233280;
                return seed / 233280;
            };
            
            for (let i = 0; i < 1000; i++) {
                const x1 = Math.floor(seededRandom() * 10) + 1;
                const x2 = Math.floor(seededRandom() * 10) + 1;
                const x3 = Math.floor(seededRandom() * 10) + 1;
                
                // Add small random noise
                const noise = (seededRandom() - 0.5) * 4;
                const target = 3 * x1 + 5 * x2 + 10 * x3 + noise;
                
                this.testData.push({
                    id: i + 1,
                    x1: x1,
                    x2: x2,
                    x3: x3,
                    target: Math.round(target * 10) / 10,
                    noise: noise
                });
            }
        }
        
        setupControlListeners() {
            // No dataset size or learning rate selection needed anymore
            
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
            
            // Stop button (removed - no longer needed)
            
            // Test button removed - loss is calculated automatically
        }
        
        calculateLoss(data) {
            let totalError = 0;
            for (const row of data) {
                const prediction = this.weights.w1 * row.x1 + 
                                 this.weights.w2 * row.x2 + 
                                 this.weights.w3 * row.x3;
                const error = row.target - prediction;
                totalError += error * error;
            }
            return totalError / data.length;
        }
        
        calculateGradients() {
            let gradW1 = 0, gradW2 = 0, gradW3 = 0;
            
            for (const row of this.trainingData) {
                const prediction = this.weights.w1 * row.x1 + 
                                 this.weights.w2 * row.x2 + 
                                 this.weights.w3 * row.x3;
                const error = prediction - row.target;
                
                gradW1 += error * row.x1;
                gradW2 += error * row.x2;
                gradW3 += error * row.x3;
            }
            
            const n = this.trainingData.length;
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
            // Calculate initial losses
            this.updateLossDisplay();
            
            // Update UI
            const trainBtn = document.getElementById('start-training');
            trainBtn.disabled = true;
            trainBtn.style.animation = 'none';
            
            document.getElementById('reset-weights').disabled = true;
            
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
                
                // Update display
                this.updateSpreadsheet();
                this.updateStats();
                this.updateLossDisplay();
                
                // Check for convergence
                const loss = this.calculateLoss(this.trainingData);
                if (loss < 5 || (this.currentIteration > 100 && loss < 10)) {
                    this.stopTraining();
                    this.showSuccess('✅ Training complete! Model has converged.', 3000);
                    this.checkForSuccess();
                    return;
                }
                
                // Check for divergence
                if (loss > 1e10 || isNaN(loss)) {
                    this.stopTraining();
                    this.showError('Training diverged! Try a smaller learning rate.', 3000);
                    return;
                }
                
                this.currentIteration++;
                
                // Continue training
                const delay = 30; // Faster delay for 250 rows
                this.animationFrame = setTimeout(train, delay);
            };
            
            train();
        }
        
        stopTraining() {
            this.isTraining = false;
            if (this.animationFrame) {
                clearTimeout(this.animationFrame);
                this.animationFrame = null;
            }
            
            // Update UI
            const trainBtn = document.getElementById('start-training');
            trainBtn.disabled = false;
            trainBtn.style.animation = 'subtle-glow 3s ease-in-out infinite';
            
            document.getElementById('reset-weights').disabled = false;
        }
        
        resetWeights() {
            this.weights = { w1: 1, w2: 1, w3: 1 };
            this.currentIteration = 0;
            this.updateSpreadsheet();
            this.updateStats();
            this.updateLossDisplay();
            
            // Restore train button glow
            const trainBtn = document.getElementById('start-training');
            if (trainBtn && !trainBtn.disabled) {
                trainBtn.style.animation = 'subtle-glow 3s ease-in-out infinite';
            }
        }
        
        updateLossDisplay() {
            const trainLoss = this.calculateLoss(this.trainingData);
            const testLoss = this.calculateLoss(this.testData);
            
            const resultsDiv = document.getElementById('test-results');
            if (resultsDiv) {
                resultsDiv.innerHTML = `
                    <div style="background: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <h3 style="margin: 0 0 15px 0; color: #333; text-align: center;">Loss Metrics</h3>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                            <div style="text-align: center; padding: 15px; background: #f5f5f5; border-radius: 8px;">
                                <div style="font-size: 0.9em; color: #666; margin-bottom: 5px;">Training Loss</div>
                                <div style="font-size: 2em; font-weight: bold; color: #667eea;">${trainLoss.toFixed(2)}</div>
                            </div>
                            <div style="text-align: center; padding: 15px; background: #f5f5f5; border-radius: 8px;">
                                <div style="font-size: 0.9em; color: #666; margin-bottom: 5px;">Test Loss</div>
                                <div style="font-size: 2em; font-weight: bold; color: #f44336;">${testLoss.toFixed(2)}</div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        
        checkForSuccess() {
            let correctPredictions = 0;
            
            for (const row of this.testData) {
                const prediction = this.weights.w1 * row.x1 + 
                                 this.weights.w2 * row.x2 + 
                                 this.weights.w3 * row.x3;
                const error = Math.abs(row.target - prediction);
                
                // Count as correct if within 5 units
                if (error < 5) {
                    correctPredictions++;
                }
            }
            
            const accuracy = (correctPredictions / this.testData.length) * 100;
            
            // Check for success (with 250 data points, success is achieved if accuracy > 90%)
            if (accuracy > 90) {
                if (!this.completed) {
                    this.completed = true;
                    this.showSuccess('🎉 Excellent! Your model generalizes well with sufficient training data!', 5000);
                    setTimeout(() => {
                        this.completeLevel({ 
                            score: Math.round(accuracy),
                            dataSize: this.currentDataSize,
                            testAccuracy: accuracy
                        });
                    }, 2000);
                }
            }
        }

        
        updateSpreadsheet() {
            const tbody = document.getElementById('data-tbody');
            if (!tbody) return;
            
            let totalError = 0;
            
            // Show only first 10 rows of 250
            const visibleRows = this.trainingData.slice(0, Math.min(this.trainingData.length, 10));
            const rows = visibleRows.map(row => {
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
            
            // Add ellipsis row since we have 250 rows total
            const ellipsisRow = this.trainingData.length > 10 ? `
                <tr>
                    <td colspan="10" style="padding: 10px; text-align: center; color: #999; font-style: italic;">
                        ... and ${this.trainingData.length - 10} more rows ...
                    </td>
                </tr>
            ` : '';
            
            tbody.innerHTML = rows + ellipsisRow;
            
            // Calculate total error for all data
            let fullTotalError = 0;
            for (const row of this.trainingData) {
                const prediction = this.weights.w1 * row.x1 + 
                                 this.weights.w2 * row.x2 + 
                                 this.weights.w3 * row.x3;
                fullTotalError += Math.abs(row.target - prediction);
            }
            
            // Update total error display
            const errorDisplay = document.getElementById('total-error');
            if (errorDisplay) {
                errorDisplay.textContent = fullTotalError.toFixed(1);
                
                if (fullTotalError < 100) {
                    errorDisplay.style.color = '#4caf50';
                } else if (fullTotalError < 500) {
                    errorDisplay.style.color = '#ff9800';
                } else {
                    errorDisplay.style.color = '#f44336';
                }
            }
        }
        
        updateStats() {
            document.getElementById('w1-display').textContent = this.weights.w1.toFixed(2);
            document.getElementById('w2-display').textContent = this.weights.w2.toFixed(2);
            document.getElementById('w3-display').textContent = this.weights.w3.toFixed(2);
            document.getElementById('iteration-count').textContent = this.currentIteration;
            document.getElementById('dataset-size').textContent = this.currentDataSize;
        }
        
        _generateMainContent() {
            return `
                <div style="max-height: 90vh; display: flex; flex-direction: column; gap: 5px; padding: 10px; width: 100%; box-sizing: border-box;">
                    <!-- Bubble text on top -->
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 15px; padding: 12px 20px; box-shadow: 0 3px 10px rgba(0,0,0,0.2); margin-bottom: 5px;">
                        <p style="margin: 0; color: white; font-size: 0.95em; text-align: center; font-weight: 500;">
                            📊 Now with 250 training examples! See how more data dramatically improves model performance.
                        </p>
                    </div>
                    
                    <!-- Header with Controls -->
                    <div style="background: white; border-radius: 8px; padding: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                            <!-- Control Buttons on left -->
                            <div style="display: flex; gap: 10px;">
                                <button id="start-training" style="
                                    padding: 10px 24px;
                                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                                    color: white;
                                    border: none;
                                    border-radius: 8px;
                                    font-size: 1em;
                                    font-weight: bold;
                                    cursor: pointer;
                                    transition: all 0.3s;
                                    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
                                    text-transform: uppercase;
                                    letter-spacing: 1px;
                                ">
                                    🚀 Train Model
                                </button>
                                <button id="reset-weights" style="
                                    padding: 8px 16px;
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
                            
                            <!-- Empty space for alignment -->
                            <div></div>
                        </div>
                        
                        <!-- Stats Display -->
                        <div style="display: flex; justify-content: space-around; margin-top: 10px; padding-top: 10px; border-top: 1px solid #e0e0e0; width: 100%;">
                            <div style="text-align: center;">
                                <span style="font-size: 0.75em; color: #666;">Dataset</span>
                                <div id="dataset-size" style="font-size: 1.1em; font-weight: bold; color: #333;">250</div>
                            </div>
                            <div style="text-align: center;">
                                <span style="font-size: 0.75em; color: #666;">Iteration</span>
                                <div id="iteration-count" style="font-size: 1.1em; font-weight: bold; color: #333;">0</div>
                            </div>
                            <div style="text-align: center;">
                                <span style="font-size: 0.75em; color: #666;">Learning Rate</span>
                                <div style="font-size: 1.1em; font-weight: bold; color: #667eea;">0.01</div>
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
                        </div>
                    </div>
                    
                    <!-- Two-column layout -->
                    <div style="display: flex; gap: 10px; flex: 1; min-height: 0; width: 100%;">
                        <!-- Left: Training Spreadsheet -->
                        <div style="flex: 1.5; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden; display: flex; flex-direction: column;">
                            <div style="padding: 10px; background: #667eea; color: white; font-weight: bold; text-align: center;">
                                Training Data (250 Rows)
                            </div>
                            <div style="flex: 1; overflow-y: auto; overflow-x: auto;">
                                <table style="width: 100%; border-collapse: collapse; font-family: 'Monaco', 'Courier New', monospace;">
                                    <thead style="position: sticky; top: 0; background: #f5f5f5; z-index: 10;">
                                        <tr>
                                            <th style="padding: 8px; text-align: center; border-right: 1px solid #ddd; font-size: 0.85em;">Row</th>
                                            <th style="padding: 8px; text-align: center; font-size: 0.85em;">x₁</th>
                                            <th style="padding: 8px; text-align: center; font-size: 0.85em;">x₂</th>
                                            <th style="padding: 8px; text-align: center; font-size: 0.85em;">x₃</th>
                                            <th style="padding: 8px; text-align: center; background: rgba(234,179,8,0.1); font-size: 0.85em;">Target</th>
                                            <th style="padding: 8px; text-align: center; font-size: 0.85em;">w₁×x₁</th>
                                            <th style="padding: 8px; text-align: center; font-size: 0.85em;">w₂×x₂</th>
                                            <th style="padding: 8px; text-align: center; font-size: 0.85em;">w₃×x₃</th>
                                            <th style="padding: 8px; text-align: center; background: rgba(102,126,234,0.1); font-size: 0.85em;">Predict</th>
                                            <th style="padding: 8px; text-align: center; font-size: 0.85em;">Error</th>
                                        </tr>
                                    </thead>
                                    <tbody id="data-tbody"></tbody>
                                </table>
                                <div style="padding: 10px; background: linear-gradient(to right, rgba(102,126,234,0.1), rgba(234,179,8,0.1)); border-top: 2px solid #667eea;">
                                    <p style="margin: 0; text-align: center; font-size: 0.9em; font-weight: bold;">
                                        Training Error: <span id="total-error" style="color: #f44336; font-size: 1em;">0</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Right: Loss Display -->
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 10px;">
                            <!-- Loss metrics always visible -->
                            <div id="test-results"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Standard navigation -->
                ${typeof createStandardNavigation === 'function' ? createStandardNavigation() : ''}
                
                <style>
                    @keyframes pulse {
                        0% {
                            box-shadow: 0 4px 15px rgba(76, 175, 80, 0.4);
                        }
                        50% {
                            box-shadow: 0 6px 20px rgba(76, 175, 80, 0.6);
                        }
                        100% {
                            box-shadow: 0 4px 15px rgba(76, 175, 80, 0.4);
                        }
                    }
                    
                    #start-training:not(:disabled) {
                        animation: subtle-glow 3s ease-in-out infinite;
                    }
                    
                    @keyframes subtle-glow {
                        0%, 100% {
                            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
                        }
                        50% {
                            box-shadow: 0 4px 20px rgba(102, 126, 234, 0.6);
                        }
                    }
                    
                    #start-training:not(:disabled):hover {
                        transform: translateY(-2px) scale(1.05);
                        box-shadow: 0 6px 25px rgba(102, 126, 234, 0.7) !important;
                        animation: none;
                    }
                    
                    #start-training:disabled {
                        background: #ccc !important;
                        animation: none;
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
            this.stopTraining();
            super.cleanup();
        }
    }
    
    const level = new TrainingDataSizeImpactLevel();
    level.create().catch(error => {
        console.error('Failed to create Training Data Size Impact:', error);
    });
    
    return level;
};

// Export for modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.createTrainingDataSizeImpact250;
}