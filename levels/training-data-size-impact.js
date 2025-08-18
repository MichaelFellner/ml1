/**
 * Training Data Size Impact
 * 
 * Demonstrates how the amount of training data affects model performance
 * Users can train on different dataset sizes and test on unseen data
 */

window.createTrainingDataSizeImpact = function() {
    
    class TrainingDataSizeImpactLevel extends window.BaseLevelTemplate {
        constructor() {
            super({
                id: 'training-data-size-impact',
                name: 'Training Data Size Impact',
                type: 'interactive',
                description: 'See how training data size affects model performance',
                instructions: '',
                concepts: ['Training Data Size', 'Model Performance', 'Test Data', 'Noise'],
                difficulty: 'intermediate',
                interactionType: 'gradient-descent',
                estimatedTime: 7
            });
            
            this.trainingData = [];
            this.testData = [];
            this.currentDataSize = 50;
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
            
            // Generate initial training data
            this.generateTrainingData(this.currentDataSize);
            
            // Initialize navigation
            if (typeof initializeNavigation === 'function') {
                initializeNavigation('training-data-size-impact', 'createTrainingDataSizeImpact');
            }
            
            // Setup control listeners
            this.setupControlListeners();
            
            // Initial display update
            setTimeout(() => {
                this.updateSpreadsheet();
                this.updateStats();
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
            // Dataset size selection
            const dataSizeButtons = document.querySelectorAll('.data-size-btn');
            dataSizeButtons.forEach(btn => {
                this.addEventListenerWithCleanup(btn, 'click', (e) => {
                    if (this.isTraining) return;
                    
                    // Remove active class from all buttons
                    dataSizeButtons.forEach(b => b.classList.remove('active'));
                    // Add active class to clicked button
                    e.target.classList.add('active');
                    // Update data size
                    const newSize = parseInt(e.target.dataset.size);
                    this.currentDataSize = newSize;
                    
                    // Regenerate training data
                    this.generateTrainingData(newSize);
                    
                    // Reset weights
                    this.resetWeights();
                    
                    // Update display
                    this.updateSpreadsheet();
                    this.updateStats();
                    
                    // Clear test results
                    this.testResults = null;
                    this.updateTestResults();
                });
            });
            
            // Learning rate selection
            const learningRateButtons = document.querySelectorAll('.learning-rate-btn');
            learningRateButtons.forEach(btn => {
                this.addEventListenerWithCleanup(btn, 'click', (e) => {
                    if (this.isTraining) return;
                    
                    learningRateButtons.forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    this.learningRate = parseFloat(e.target.dataset.rate);
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
            
            // Test button
            const testBtn = document.getElementById('test-model');
            if (testBtn) {
                this.addEventListenerWithCleanup(testBtn, 'click', () => {
                    this.testModel();
                });
            }
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
            this.testResults = null;
            this.updateTestResults();
            
            // Update UI
            document.getElementById('start-training').disabled = true;
            document.getElementById('stop-training').disabled = false;
            document.getElementById('reset-weights').disabled = true;
            document.getElementById('test-model').disabled = true;
            document.querySelectorAll('.data-size-btn').forEach(btn => btn.disabled = true);
            document.querySelectorAll('.learning-rate-btn').forEach(btn => btn.disabled = true);
            
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
                
                // Check for convergence
                const loss = this.calculateLoss(this.trainingData);
                if (loss < 5 || (this.currentIteration > 100 && loss < 10)) {
                    this.stopTraining();
                    this.showSuccess('Training complete! Now test your model on unseen data.', 3000);
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
                const delay = this.currentDataSize <= 5 ? 100 : 
                             this.currentDataSize <= 50 ? 50 : 30;
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
            document.getElementById('start-training').disabled = false;
            document.getElementById('stop-training').disabled = true;
            document.getElementById('reset-weights').disabled = false;
            document.getElementById('test-model').disabled = false;
            document.querySelectorAll('.data-size-btn').forEach(btn => btn.disabled = false);
            document.querySelectorAll('.learning-rate-btn').forEach(btn => btn.disabled = false);
        }
        
        resetWeights() {
            this.weights = { w1: 1, w2: 1, w3: 1 };
            this.currentIteration = 0;
            this.testResults = null;
            this.updateSpreadsheet();
            this.updateStats();
            this.updateTestResults();
        }
        
        testModel() {
            let totalError = 0;
            let correctPredictions = 0;
            
            for (const row of this.testData) {
                const prediction = this.weights.w1 * row.x1 + 
                                 this.weights.w2 * row.x2 + 
                                 this.weights.w3 * row.x3;
                const error = Math.abs(row.target - prediction);
                totalError += error;
                
                // Count as correct if within 5 units
                if (error < 5) {
                    correctPredictions++;
                }
            }
            
            const avgError = totalError / this.testData.length;
            const accuracy = (correctPredictions / this.testData.length) * 100;
            const trainLoss = this.calculateLoss(this.trainingData);
            const testLoss = this.calculateLoss(this.testData);
            
            this.testResults = {
                avgError: avgError.toFixed(2),
                accuracy: accuracy.toFixed(1),
                trainLoss: trainLoss.toFixed(2),
                testLoss: testLoss.toFixed(2),
                correctPredictions: correctPredictions,
                totalPredictions: this.testData.length
            };
            
            this.updateTestResults();
            
            // Check for success
            if (accuracy > 90 && this.currentDataSize === 250) {
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
        
        updateTestResults() {
            const resultsDiv = document.getElementById('test-results');
            if (!resultsDiv) return;
            
            if (this.testResults) {
                const performanceColor = this.testResults.accuracy > 90 ? '#4caf50' : 
                                       this.testResults.accuracy > 70 ? '#ff9800' : '#f44336';
                
                resultsDiv.innerHTML = `
                    <div style="background: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <h3 style="margin: 0 0 15px 0; color: #333;">Test Results (1000 unseen examples)</h3>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                            <div style="text-align: center; padding: 10px; background: #f5f5f5; border-radius: 8px;">
                                <div style="font-size: 0.9em; color: #666;">Accuracy</div>
                                <div style="font-size: 1.8em; font-weight: bold; color: ${performanceColor};">${this.testResults.accuracy}%</div>
                                <div style="font-size: 0.8em; color: #999;">${this.testResults.correctPredictions}/${this.testResults.totalPredictions} correct</div>
                            </div>
                            <div style="text-align: center; padding: 10px; background: #f5f5f5; border-radius: 8px;">
                                <div style="font-size: 0.9em; color: #666;">Avg Error</div>
                                <div style="font-size: 1.8em; font-weight: bold; color: ${performanceColor};">${this.testResults.avgError}</div>
                                <div style="font-size: 0.8em; color: #999;">per prediction</div>
                            </div>
                        </div>
                        <div style="margin-top: 15px; padding: 10px; background: #e3f2fd; border-radius: 8px;">
                            <p style="margin: 0; color: #1976d2; font-size: 0.9em;">
                                <strong>Training Loss:</strong> ${this.testResults.trainLoss} | 
                                <strong>Test Loss:</strong> ${this.testResults.testLoss}
                            </p>
                        </div>
                        ${this.currentDataSize <= 5 ? `
                            <div style="margin-top: 10px; padding: 10px; background: #fff3cd; border-radius: 8px;">
                                <p style="margin: 0; color: #856404; font-size: 0.9em;">
                                    ⚠️ With only 5 training examples, the model struggles to learn the pattern!
                                </p>
                            </div>
                        ` : ''}
                    </div>
                `;
            } else {
                resultsDiv.innerHTML = `
                    <div style="background: #f5f5f5; border-radius: 8px; padding: 30px; text-align: center;">
                        <p style="color: #999; margin: 0;">Train your model first, then test it on 1000 unseen examples!</p>
                    </div>
                `;
            }
        }
        
        updateSpreadsheet() {
            const tbody = document.getElementById('data-tbody');
            if (!tbody) return;
            
            let totalError = 0;
            
            // Show only visible rows based on data size
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
            
            // Add ellipsis row if there are more rows
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
                <div style="max-height: 90vh; display: flex; flex-direction: column; gap: 10px; padding: 10px;">
                    <!-- Header with Controls -->
                    <div style="background: white; border-radius: 8px; padding: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                            <!-- Dataset Size Selection -->
                            <div style="display: flex; gap: 10px; align-items: center;">
                                <span style="font-weight: bold; color: #555; font-size: 0.9em;">Training Data:</span>
                                <button class="data-size-btn" data-size="5" style="
                                    padding: 6px 12px;
                                    background: #ff6b6b;
                                    color: white;
                                    border: none;
                                    border-radius: 6px;
                                    font-size: 0.85em;
                                    cursor: pointer;
                                    transition: all 0.3s;
                                ">
                                    5 rows
                                </button>
                                <button class="data-size-btn active" data-size="50" style="
                                    padding: 6px 12px;
                                    background: #4ecdc4;
                                    color: white;
                                    border: none;
                                    border-radius: 6px;
                                    font-size: 0.85em;
                                    cursor: pointer;
                                    transition: all 0.3s;
                                ">
                                    50 rows
                                </button>
                                <button class="data-size-btn" data-size="250" style="
                                    padding: 6px 12px;
                                    background: #95e77e;
                                    color: white;
                                    border: none;
                                    border-radius: 6px;
                                    font-size: 0.85em;
                                    cursor: pointer;
                                    transition: all 0.3s;
                                ">
                                    250 rows
                                </button>
                            </div>
                            
                            <!-- Learning Rate -->
                            <div style="display: flex; gap: 10px; align-items: center;">
                                <span style="font-weight: bold; color: #555; font-size: 0.9em;">Learning Rate:</span>
                                <button class="learning-rate-btn active" data-rate="0.01" style="
                                    padding: 6px 12px;
                                    background: #667eea;
                                    color: white;
                                    border: none;
                                    border-radius: 6px;
                                    font-size: 0.85em;
                                    cursor: pointer;
                                    transition: all 0.3s;
                                ">
                                    0.01
                                </button>
                                <button class="learning-rate-btn" data-rate="0.001" style="
                                    padding: 6px 12px;
                                    background: #667eea;
                                    color: white;
                                    border: none;
                                    border-radius: 6px;
                                    font-size: 0.85em;
                                    cursor: pointer;
                                    transition: all 0.3s;
                                ">
                                    0.001
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
                                    Train
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
                                <button id="test-model" style="
                                    padding: 6px 16px;
                                    background: #4caf50;
                                    color: white;
                                    border: none;
                                    border-radius: 6px;
                                    font-size: 0.9em;
                                    font-weight: bold;
                                    cursor: pointer;
                                    transition: all 0.3s;
                                ">
                                    Test Model
                                </button>
                            </div>
                        </div>
                        
                        <!-- Stats Display -->
                        <div style="display: flex; justify-content: space-around; margin-top: 10px; padding-top: 10px; border-top: 1px solid #e0e0e0;">
                            <div style="text-align: center;">
                                <span style="font-size: 0.75em; color: #666;">Dataset</span>
                                <div id="dataset-size" style="font-size: 1.1em; font-weight: bold; color: #333;">50</div>
                            </div>
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
                        </div>
                    </div>
                    
                    <!-- Two-column layout -->
                    <div style="display: flex; gap: 10px; flex: 1; min-height: 0;">
                        <!-- Left: Training Spreadsheet -->
                        <div style="flex: 1.5; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden; display: flex; flex-direction: column;">
                            <div style="padding: 10px; background: #667eea; color: white; font-weight: bold; text-align: center;">
                                Training Data
                            </div>
                            <div style="flex: 1; overflow-y: auto; overflow-x: auto; min-height: 0;">
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
                            </div>
                            <div style="padding: 10px; background: linear-gradient(to right, rgba(102,126,234,0.1), rgba(234,179,8,0.1)); border-top: 2px solid #667eea;">
                                <p style="margin: 0; text-align: center; font-size: 0.9em; font-weight: bold;">
                                    Training Error: <span id="total-error" style="color: #f44336; font-size: 1em;">0</span>
                                </p>
                            </div>
                        </div>
                        
                        <!-- Right: Test Results -->
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 10px;">
                            <div id="test-results"></div>
                            
                            <!-- Info Box -->
                            <div style="background: #e3f2fd; border-radius: 8px; padding: 15px;">
                                <h4 style="margin: 0 0 10px 0; color: #1976d2;">💡 Experiment Tips</h4>
                                <ul style="margin: 0; padding-left: 20px; color: #555; font-size: 0.85em; line-height: 1.6;">
                                    <li>Try training with only 5 rows - see how it performs!</li>
                                    <li>Compare test accuracy across different dataset sizes</li>
                                    <li>Notice: The data includes small random noise</li>
                                    <li>Goal: Achieve >90% accuracy on test data</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Standard navigation -->
                ${typeof createStandardNavigation === 'function' ? createStandardNavigation() : ''}
                
                <style>
                    .data-size-btn:hover:not(:disabled) {
                        transform: translateY(-1px);
                        box-shadow: 0 3px 8px rgba(0,0,0,0.2);
                    }
                    .data-size-btn.active {
                        transform: scale(1.05);
                        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                    }
                    .learning-rate-btn:hover:not(:disabled) {
                        transform: translateY(-1px);
                        box-shadow: 0 3px 8px rgba(0,0,0,0.2);
                    }
                    .learning-rate-btn.active {
                        opacity: 1;
                    }
                    .learning-rate-btn:not(.active) {
                        opacity: 0.7;
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
    module.exports = window.createTrainingDataSizeImpact;
}