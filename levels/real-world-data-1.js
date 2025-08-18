/**
 * Real World Data Level 1 - California Housing Prices
 * 
 * Uses the California Housing dataset for linear regression
 * Dataset source: https://raw.githubusercontent.com/ageron/handson-ml/master/datasets/housing/housing.csv
 */

window.createRealWorldData1 = function() {
    
    class RealWorldData1Level extends window.BaseLevelTemplate {
        constructor() {
            super({
                id: 'real-world-data-1',
                name: 'Real World: California Housing Prices',
                type: 'interactive',
                description: 'Predict California housing prices using real census data',
                instructions: '',
                concepts: ['Real Data', 'Feature Selection', 'Linear Regression', 'Data Normalization'],
                difficulty: 'intermediate',
                interactionType: 'real-data-training',
                estimatedTime: 8
            });
            
            this.dataset = {
                name: 'California Housing Prices',
                filename: 'housing.csv',
                description: 'Predict median house values in California districts based on 1990 census data',
                features: ['longitude', 'latitude', 'housing_median_age', 'total_rooms', 
                          'total_bedrooms', 'population', 'households', 'median_income'],
                categoricalFeatures: ['ocean_proximity'],
                target: 'median_house_value',
                source: 'California 1990 Census (via Kaggle/GitHub)'
            };
            
            this.allData = [];
            this.trainingData = [];
            this.testData = [];
            this.selectedFeatures = ['median_income', 'housing_median_age', 'total_rooms', 'households'];
            this.weights = {};
            this.bias = 0;
            
            // Training parameters
            this.trainingPercentage = 0.7;
            this.learningRate = 0.00001;
            this.maxIterations = 100;
            this.currentIteration = 0;
            this.isTraining = false;
            this.animationFrame = null;
            
            // Results
            this.trainingHistory = [];
            this.testResults = null;
        }
        
        async setup() {
            await super.setup();
            
            // Load the CSV data
            await this.loadDataset();
            
            // Initialize navigation
            if (typeof initializeNavigation === 'function') {
                initializeNavigation('real-world-data-1', 'createRealWorldData1');
            }
            
            // Setup control listeners
            this.setupControlListeners();
            
            // Initial display update
            setTimeout(() => {
                this.updateDisplay();
                this.updateFeatureSelection();
            }, 100);
        }
        
        async loadDataset() {
            try {
                // Try to load the CSV file
                const response = await window.fs.readFile(this.dataset.filename, { encoding: 'utf8' });
                
                // Parse CSV using Papa Parse
                if (typeof Papa !== 'undefined') {
                    const parsed = Papa.parse(response, {
                        header: true,
                        dynamicTyping: true,
                        skipEmptyLines: true,
                        delimitersToGuess: [',', '\t', '|', ';']
                    });
                    
                    if (parsed.data && parsed.data.length > 0) {
                        // Process California Housing data
                        this.allData = parsed.data.filter(row => {
                            // Filter out rows with missing values in critical columns
                            return row.median_house_value !== null && 
                                   row.median_income !== null;
                        }).map(row => {
                            // Handle ocean_proximity categorical variable
                            const oceanProximityMap = {
                                'NEAR BAY': 1,
                                'NEAR OCEAN': 2,
                                '<1H OCEAN': 3,
                                'INLAND': 4,
                                'ISLAND': 5
                            };
                            
                            return {
                                ...row,
                                ocean_proximity_encoded: oceanProximityMap[row.ocean_proximity] || 0,
                                // Scale down house values from hundreds of thousands
                                median_house_value: row.median_house_value / 100000
                            };
                        });
                        
                        // Update features list
                        this.dataset.features = ['median_income', 'housing_median_age', 'total_rooms', 
                                                'total_bedrooms', 'population', 'households', 
                                                'longitude', 'latitude', 'ocean_proximity_encoded'];
                        
                        // Initialize weights
                        this.dataset.features.forEach(feature => {
                            this.weights[feature] = 0.01;
                        });
                        
                        console.log(`Loaded ${this.allData.length} housing records`);
                    }
                }
            } catch (error) {
                console.log('CSV file not found, using synthetic data instead');
                this.generateSyntheticData();
            }
            
            // Split data into training and test sets
            this.splitData();
        }
        
        generateSyntheticData() {
            // Generate synthetic California housing data
            let seed = 42;
            const seededRandom = () => {
                seed = (seed * 9301 + 49297) % 233280;
                return seed / 233280;
            };
            
            this.allData = [];
            for (let i = 0; i < 1000; i++) {
                const median_income = 0.5 + seededRandom() * 10; // 0.5-10.5 (in $10,000s)
                const housing_median_age = 1 + Math.floor(seededRandom() * 52); // 1-52 years
                const total_rooms = 500 + Math.floor(seededRandom() * 8000); // 500-8500
                const total_bedrooms = Math.floor(total_rooms * (0.1 + seededRandom() * 0.2)); // 10-30% of rooms
                const population = 300 + Math.floor(seededRandom() * 5000); // 300-5300
                const households = Math.floor(population / (2 + seededRandom() * 2)); // 2-4 people per household
                const longitude = -124 + seededRandom() * 10; // California longitude range
                const latitude = 32 + seededRandom() * 10; // California latitude range
                const ocean_proximity_encoded = Math.floor(1 + seededRandom() * 5); // 1-5
                
                // Simplified price formula with noise
                const noise = (seededRandom() - 0.5) * 0.5;
                const price = 0.5 + 
                    (median_income * 0.4) + 
                    (housing_median_age * 0.002) + 
                    (total_rooms * 0.00005) - 
                    (population * 0.00001) + 
                    (households * 0.0001) - 
                    (ocean_proximity_encoded * 0.05) +
                    noise;
                
                this.allData.push({
                    median_income: Math.round(median_income * 100) / 100,
                    housing_median_age: housing_median_age,
                    total_rooms: total_rooms,
                    total_bedrooms: total_bedrooms,
                    population: population,
                    households: households,
                    longitude: Math.round(longitude * 100) / 100,
                    latitude: Math.round(latitude * 100) / 100,
                    ocean_proximity_encoded: ocean_proximity_encoded,
                    median_house_value: Math.max(0.5, Math.round(price * 100) / 100) // in $100,000s
                });
            }
            
            // Initialize weights
            this.dataset.features.forEach(feature => {
                this.weights[feature] = 0.01;
            });
        }
        
        splitData() {
            // Shuffle data
            const shuffled = [...this.allData].sort(() => Math.random() - 0.5);
            
            // Split based on percentage
            const trainSize = Math.floor(shuffled.length * this.trainingPercentage);
            this.trainingData = shuffled.slice(0, trainSize);
            this.testData = shuffled.slice(trainSize);
        }
        
        normalizeFeatures(data) {
            // Feature normalization
            const normalized = [];
            const stats = {};
            
            // Calculate mean and std for each feature
            this.selectedFeatures.forEach(feature => {
                const values = data.map(row => row[feature] || 0);
                const mean = values.reduce((a, b) => a + b, 0) / values.length;
                const std = Math.sqrt(values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length);
                stats[feature] = { mean, std: std || 1 };
            });
            
            // Normalize data
            data.forEach(row => {
                const normRow = { ...row };
                this.selectedFeatures.forEach(feature => {
                    normRow[feature] = (row[feature] - stats[feature].mean) / stats[feature].std;
                });
                normalized.push(normRow);
            });
            
            return { data: normalized, stats };
        }
        
        setupControlListeners() {
            // Feature selection
            const updateFeatures = () => {
                const checkboxes = document.querySelectorAll('.feature-checkbox:checked');
                this.selectedFeatures = Array.from(checkboxes).map(cb => cb.value);
                this.resetModel();
            };
            
            // Training percentage selection
            const percentButtons = document.querySelectorAll('.percent-btn');
            percentButtons.forEach(btn => {
                this.addEventListenerWithCleanup(btn, 'click', (e) => {
                    if (this.isTraining) return;
                    
                    percentButtons.forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    this.trainingPercentage = parseFloat(e.target.dataset.percent);
                    
                    this.splitData();
                    this.resetModel();
                    this.updateDisplay();
                });
            });
            
            // Iterations control
            const iterationsInput = document.getElementById('iterations-input');
            if (iterationsInput) {
                this.addEventListenerWithCleanup(iterationsInput, 'change', (e) => {
                    this.maxIterations = parseInt(e.target.value) || 100;
                });
            }
            
            // Learning rate control
            const learningRateInput = document.getElementById('learning-rate-input');
            if (learningRateInput) {
                this.addEventListenerWithCleanup(learningRateInput, 'change', (e) => {
                    this.learningRate = parseFloat(e.target.value) || 0.00001;
                });
            }
            
            // Control buttons
            const startBtn = document.getElementById('start-training');
            if (startBtn) {
                this.addEventListenerWithCleanup(startBtn, 'click', () => {
                    if (!this.isTraining) {
                        this.startTraining();
                    }
                });
            }
            
            const stopBtn = document.getElementById('stop-training');
            if (stopBtn) {
                this.addEventListenerWithCleanup(stopBtn, 'click', () => {
                    this.stopTraining();
                });
            }
            
            const resetBtn = document.getElementById('reset-model');
            if (resetBtn) {
                this.addEventListenerWithCleanup(resetBtn, 'click', () => {
                    this.resetModel();
                });
            }
            
            const testBtn = document.getElementById('test-model');
            if (testBtn) {
                this.addEventListenerWithCleanup(testBtn, 'click', () => {
                    this.testModel();
                });
            }
        }
        
        updateFeatureSelection() {
            const container = document.getElementById('feature-selection');
            if (!container) return;
            
            const checkboxes = this.dataset.features.map(feature => {
                const isSelected = this.selectedFeatures.includes(feature);
                return `
                    <label style="display: flex; align-items: center; margin: 5px 0; cursor: pointer;">
                        <input 
                            type="checkbox" 
                            class="feature-checkbox"
                            value="${feature}"
                            ${isSelected ? 'checked' : ''}
                            style="margin-right: 8px;"
                        >
                        <span style="font-size: 0.85em;">${feature.replace(/_/g, ' ')}</span>
                    </label>
                `;
            }).join('');
            
            container.innerHTML = checkboxes;
            
            // Add event listeners
            container.querySelectorAll('.feature-checkbox').forEach(checkbox => {
                this.addEventListenerWithCleanup(checkbox, 'change', () => {
                    if (this.isTraining) {
                        checkbox.checked = !checkbox.checked;
                        return;
                    }
                    const checkboxes = document.querySelectorAll('.feature-checkbox:checked');
                    this.selectedFeatures = Array.from(checkboxes).map(cb => cb.value);
                    this.resetModel();
                    this.updateDisplay();
                });
            });
        }
        
        calculatePrediction(row) {
            let prediction = this.bias;
            this.selectedFeatures.forEach(feature => {
                prediction += (this.weights[feature] || 0) * (row[feature] || 0);
            });
            return prediction;
        }
        
        calculateLoss(data) {
            let totalError = 0;
            data.forEach(row => {
                const prediction = this.calculatePrediction(row);
                const error = row[this.dataset.target] - prediction;
                totalError += error * error;
            });
            return totalError / data.length;
        }
        
        calculateGradients() {
            const gradients = {};
            let biasGradient = 0;
            
            // Initialize gradients
            this.selectedFeatures.forEach(feature => {
                gradients[feature] = 0;
            });
            
            // Calculate gradients
            this.trainingData.forEach(row => {
                const prediction = this.calculatePrediction(row);
                const error = prediction - row[this.dataset.target];
                
                biasGradient += error;
                this.selectedFeatures.forEach(feature => {
                    gradients[feature] += error * (row[feature] || 0);
                });
            });
            
            // Average gradients
            const n = this.trainingData.length;
            biasGradient = (2 * biasGradient) / n;
            this.selectedFeatures.forEach(feature => {
                gradients[feature] = (2 * gradients[feature]) / n;
            });
            
            return { gradients, biasGradient };
        }
        
        async startTraining() {
            if (this.isTraining || this.selectedFeatures.length === 0) {
                if (this.selectedFeatures.length === 0) {
                    this.showError('Please select at least one feature!', 3000);
                }
                return;
            }
            
            this.isTraining = true;
            this.currentIteration = 0;
            this.trainingHistory = [];
            
            // Normalize features
            const { data: normalizedTrain, stats } = this.normalizeFeatures(this.trainingData);
            this.normStats = stats;
            
            // Update UI
            this.updateButtonStates();
            
            const train = () => {
                if (!this.isTraining || this.currentIteration >= this.maxIterations) {
                    this.stopTraining();
                    return;
                }
                
                // Use normalized data for training
                const tempTrainingData = this.trainingData;
                this.trainingData = normalizedTrain;
                
                // Calculate gradients
                const { gradients, biasGradient } = this.calculateGradients();
                
                // Update weights and bias
                this.bias -= this.learningRate * biasGradient;
                this.selectedFeatures.forEach(feature => {
                    this.weights[feature] = (this.weights[feature] || 0) - this.learningRate * gradients[feature];
                });
                
                // Calculate loss
                const loss = this.calculateLoss(normalizedTrain);
                this.trainingHistory.push({ iteration: this.currentIteration, loss });
                
                // Restore original data
                this.trainingData = tempTrainingData;
                
                // Update display
                this.updateDisplay();
                
                this.currentIteration++;
                
                // Continue training
                this.animationFrame = setTimeout(train, 50);
            };
            
            train();
        }
        
        stopTraining() {
            this.isTraining = false;
            if (this.animationFrame) {
                clearTimeout(this.animationFrame);
                this.animationFrame = null;
            }
            this.updateButtonStates();
        }
        
        resetModel() {
            this.selectedFeatures.forEach(feature => {
                this.weights[feature] = 0.01;
            });
            this.bias = 0;
            this.currentIteration = 0;
            this.trainingHistory = [];
            this.testResults = null;
            this.updateDisplay();
        }
        
        testModel() {
            if (this.testData.length === 0 || this.selectedFeatures.length === 0) return;
            
            // Normalize test data using training stats
            const normalizedTest = [];
            this.testData.forEach(row => {
                const normRow = { ...row };
                this.selectedFeatures.forEach(feature => {
                    if (this.normStats && this.normStats[feature]) {
                        normRow[feature] = (row[feature] - this.normStats[feature].mean) / this.normStats[feature].std;
                    }
                });
                normalizedTest.push(normRow);
            });
            
            let totalError = 0;
            let totalPercentError = 0;
            
            normalizedTest.forEach((row, idx) => {
                const prediction = this.calculatePrediction(row);
                const actual = this.testData[idx][this.dataset.target];
                const error = Math.abs(actual - prediction);
                totalError += error;
                totalPercentError += (error / Math.abs(actual)) * 100;
            });
            
            const avgError = totalError / this.testData.length;
            const avgPercentError = totalPercentError / this.testData.length;
            const trainLoss = this.calculateLoss(this.trainingData);
            const testLoss = this.calculateLoss(this.testData);
            
            this.testResults = {
                avgError: (avgError * 100).toFixed(0), // Convert back to thousands
                avgPercentError: avgPercentError.toFixed(1),
                trainLoss: trainLoss.toFixed(4),
                testLoss: testLoss.toFixed(4),
                testSize: this.testData.length
            };
            
            this.updateDisplay();
            
            // Check for success
            if (avgPercentError < 25 && this.trainingPercentage >= 0.7) {
                if (!this.completed) {
                    this.completed = true;
                    this.showSuccess('🎉 Excellent! Your model performs well on California housing data!', 5000);
                    setTimeout(() => {
                        this.completeLevel({ 
                            score: Math.round(100 - avgPercentError),
                            datasetSize: this.allData.length,
                            avgError: avgPercentError
                        });
                    }, 2000);
                }
            }
        }
        
        updateButtonStates() {
            document.getElementById('start-training').disabled = this.isTraining;
            document.getElementById('stop-training').disabled = !this.isTraining;
            document.getElementById('reset-model').disabled = this.isTraining;
            document.getElementById('test-model').disabled = this.isTraining;
            document.querySelectorAll('.percent-btn').forEach(btn => btn.disabled = this.isTraining);
            document.getElementById('iterations-input').disabled = this.isTraining;
            document.getElementById('learning-rate-input').disabled = this.isTraining;
            document.querySelectorAll('.feature-checkbox').forEach(cb => cb.disabled = this.isTraining);
        }
        
        updateDisplay() {
            // Update stats
            document.getElementById('train-size').textContent = this.trainingData.length;
            document.getElementById('test-size').textContent = this.testData.length;
            document.getElementById('current-iteration').textContent = this.currentIteration;
            document.getElementById('selected-features-count').textContent = this.selectedFeatures.length;
            
            // Update data preview
            this.updateDataPreview();
            
            // Update test results
            this.updateTestResults();
        }
        
        updateDataPreview() {
            const tbody = document.getElementById('data-preview-tbody');
            if (!tbody) return;
            
            const previewData = this.trainingData.slice(0, 5);
            const rows = previewData.map((row, idx) => {
                const prediction = this.normStats ? 
                    this.calculatePrediction(this.normalizeFeatures([row]).data[0]) : 
                    this.calculatePrediction(row);
                const actual = row[this.dataset.target];
                const error = ((prediction - actual) / actual * 100).toFixed(1);
                const errorColor = Math.abs(error) < 15 ? '#4caf50' : 
                                  Math.abs(error) < 30 ? '#ff9800' : '#f44336';
                
                return `
                    <tr>
                        <td style="padding: 6px; text-align: center; font-size: 0.8em;">${idx + 1}</td>
                        <td style="padding: 6px; text-align: center; font-size: 0.8em;">${row.median_income.toFixed(2)}</td>
                        <td style="padding: 6px; text-align: center; font-size: 0.8em;">${row.housing_median_age}</td>
                        <td style="padding: 6px; text-align: center; font-size: 0.8em;">${row.total_rooms}</td>
                        <td style="padding: 6px; text-align: center; background: rgba(234,179,8,0.1); font-weight: bold; font-size: 0.8em;">
                            $${(actual * 100).toFixed(0)}k
                        </td>
                        <td style="padding: 6px; text-align: center; background: rgba(102,126,234,0.1); font-weight: bold; font-size: 0.8em;">
                            $${(prediction * 100).toFixed(0)}k
                        </td>
                        <td style="padding: 6px; text-align: center; color: ${errorColor}; font-weight: bold; font-size: 0.8em;">
                            ${error}%
                        </td>
                    </tr>
                `;
            }).join('');
            
            tbody.innerHTML = rows || '<tr><td colspan="7" style="text-align: center; padding: 20px;">No data loaded</td></tr>';
        }
        
        updateTestResults() {
            const resultsDiv = document.getElementById('test-results-display');
            if (!resultsDiv) return;
            
            if (this.testResults) {
                const performanceColor = this.testResults.avgPercentError < 20 ? '#4caf50' : 
                                       this.testResults.avgPercentError < 35 ? '#ff9800' : '#f44336';
                
                resultsDiv.innerHTML = `
                    <h3 style="margin: 0 0 15px 0; color: #333;">Test Results</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <div style="text-align: center; padding: 10px; background: #f5f5f5; border-radius: 8px;">
                            <div style="font-size: 0.9em; color: #666;">Avg Error</div>
                            <div style="font-size: 1.5em; font-weight: bold; color: ${performanceColor};">
                                ${this.testResults.avgPercentError}%
                            </div>
                            <div style="font-size: 0.8em; color: #999;">≈$${this.testResults.avgError}k</div>
                        </div>
                        <div style="text-align: center; padding: 10px; background: #f5f5f5; border-radius: 8px;">
                            <div style="font-size: 0.9em; color: #666;">Test Samples</div>
                            <div style="font-size: 1.5em; font-weight: bold; color: #333;">
                                ${this.testResults.testSize}
                            </div>
                        </div>
                    </div>
                    <div style="margin-top: 10px; padding: 10px; background: #e3f2fd; border-radius: 8px;">
                        <p style="margin: 0; color: #1976d2; font-size: 0.85em;">
                            <strong>Train Loss:</strong> ${this.testResults.trainLoss} | 
                            <strong>Test Loss:</strong> ${this.testResults.testLoss}
                        </p>
                    </div>
                `;
            } else {
                resultsDiv.innerHTML = `
                    <div style="text-align: center; color: #999; padding: 30px;">
                        <p>Train the model first, then test it!</p>
                    </div>
                `;
            }
        }
        
        _generateMainContent() {
            return `
                <div style="max-height: 90vh; display: flex; flex-direction: column; gap: 10px; padding: 10px;">
                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 8px; padding: 15px;">
                        <h2 style="margin: 0 0 5px 0;">${this.dataset.name}</h2>
                        <p style="margin: 0; opacity: 0.9; font-size: 0.9em;">${this.dataset.description}</p>
                        <p style="margin: 5px 0 0 0; opacity: 0.8; font-size: 0.85em;">
                            📊 Dataset: ${this.dataset.source} | 
                            📁 File: ${this.dataset.filename}
                        </p>
                    </div>
                    
                    <!-- Info Box -->
                    <div style="background: #fff3cd; border-radius: 8px; padding: 10px;">
                        <p style="margin: 0; color: #856404; font-size: 0.85em;">
                            <strong>📥 To use real data:</strong> Download the California Housing dataset from 
                            <a href="https://raw.githubusercontent.com/ageron/handson-ml/master/datasets/housing/housing.csv" target="_blank" style="color: #0066cc;">GitHub</a> or 
                            <a href="https://www.kaggle.com/datasets/camnugent/california-housing-prices" target="_blank" style="color: #0066cc;">Kaggle</a>, 
                            rename it to <code>housing.csv</code>, and place it in the project folder.
                        </p>
                    </div>
                    
                    <!-- Controls -->
                    <div style="background: white; border-radius: 8px; padding: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px;">
                            <!-- Training Data Percentage -->
                            <div>
                                <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #555; font-size: 0.9em;">
                                    Training Data:
                                </label>
                                <div style="display: flex; gap: 5px;">
                                    <button class="percent-btn" data-percent="0.5" style="
                                        flex: 1;
                                        padding: 6px;
                                        background: #e0e0e0;
                                        border: none;
                                        border-radius: 4px;
                                        cursor: pointer;
                                        font-size: 0.85em;
                                    ">50%</button>
                                    <button class="percent-btn active" data-percent="0.7" style="
                                        flex: 1;
                                        padding: 6px;
                                        background: #667eea;
                                        color: white;
                                        border: none;
                                        border-radius: 4px;
                                        cursor: pointer;
                                        font-size: 0.85em;
                                    ">70%</button>
                                    <button class="percent-btn" data-percent="0.8" style="
                                        flex: 1;
                                        padding: 6px;
                                        background: #e0e0e0;
                                        border: none;
                                        border-radius: 4px;
                                        cursor: pointer;
                                        font-size: 0.85em;
                                    ">80%</button>
                                </div>
                            </div>
                            
                            <!-- Iterations -->
                            <div>
                                <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #555; font-size: 0.9em;">
                                    Iterations:
                                </label>
                                <input type="number" id="iterations-input" value="100" min="10" max="1000" step="10" style="
                                    width: 100%;
                                    padding: 6px;
                                    border: 1px solid #ddd;
                                    border-radius: 4px;
                                    font-size: 0.9em;
                                ">
                            </div>
                            
                            <!-- Learning Rate -->
                            <div>
                                <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #555; font-size: 0.9em;">
                                    Learning Rate:
                                </label>
                                <input type="number" id="learning-rate-input" value="0.00001" min="0.000001" max="1" step="0.000001" style="
                                    width: 100%;
                                    padding: 6px;
                                    border: 1px solid #ddd;
                                    border-radius: 4px;
                                    font-size: 0.9em;
                                ">
                            </div>
                            
                            <!-- Buttons -->
                            <div style="display: flex; gap: 5px; align-items: flex-end;">
                                <button id="start-training" style="
                                    flex: 1;
                                    padding: 8px;
                                    background: #4caf50;
                                    color: white;
                                    border: none;
                                    border-radius: 4px;
                                    font-weight: bold;
                                    cursor: pointer;
                                ">Train</button>
                                <button id="stop-training" disabled style="
                                    flex: 1;
                                    padding: 8px;
                                    background: #ff9800;
                                    color: white;
                                    border: none;
                                    border-radius: 4px;
                                    font-weight: bold;
                                    cursor: pointer;
                                ">Stop</button>
                                <button id="reset-model" style="
                                    flex: 1;
                                    padding: 8px;
                                    background: #9e9e9e;
                                    color: white;
                                    border: none;
                                    border-radius: 4px;
                                    font-weight: bold;
                                    cursor: pointer;
                                ">Reset</button>
                                <button id="test-model" style="
                                    flex: 1;
                                    padding: 8px;
                                    background: #2196f3;
                                    color: white;
                                    border: none;
                                    border-radius: 4px;
                                    font-weight: bold;
                                    cursor: pointer;
                                ">Test</button>
                            </div>
                        </div>
                        
                        <!-- Stats Bar -->
                        <div style="display: flex; justify-content: space-around; margin-top: 15px; padding-top: 15px; border-top: 1px solid #e0e0e0;">
                            <div style="text-align: center;">
                                <div style="font-size: 0.8em; color: #666;">Training</div>
                                <div id="train-size" style="font-size: 1.2em; font-weight: bold; color: #333;">0</div>
                            </div>
                            <div style="text-align: center;">
                                <div style="font-size: 0.8em; color: #666;">Test</div>
                                <div id="test-size" style="font-size: 1.2em; font-weight: bold; color: #333;">0</div>
                            </div>
                            <div style="text-align: center;">
                                <div style="font-size: 0.8em; color: #666;">Features</div>
                                <div id="selected-features-count" style="font-size: 1.2em; font-weight: bold; color: #333;">4</div>
                            </div>
                            <div style="text-align: center;">
                                <div style="font-size: 0.8em; color: #666;">Iteration</div>
                                <div id="current-iteration" style="font-size: 1.2em; font-weight: bold; color: #333;">0</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Main Content Area -->
                    <div style="display: flex; gap: 10px; flex: 1; min-height: 0;">
                        <!-- Left: Feature Selection -->
                        <div style="width: 200px;">
                            <div style="background: white; border-radius: 8px; padding: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                <h3 style="margin: 0 0 10px 0; color: #333; font-size: 1em;">Select Features</h3>
                                <div id="feature-selection" style="max-height: 300px; overflow-y: auto;">
                                    <!-- Feature checkboxes will be inserted here -->
                                </div>
                            </div>
                        </div>
                        
                        <!-- Center: Data Preview -->
                        <div style="flex: 1;">
                            <div style="background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden;">
                                <div style="padding: 10px; background: #f5f5f5; font-weight: bold; font-size: 0.9em;">
                                    Training Data Preview (First 5 rows)
                                </div>
                                <div style="overflow: auto; max-height: 250px;">
                                    <table style="width: 100%; border-collapse: collapse; font-size: 0.9em;">
                                        <thead style="background: #667eea; color: white; position: sticky; top: 0;">
                                            <tr>
                                                <th style="padding: 8px; text-align: center; font-size: 0.8em;">#</th>
                                                <th style="padding: 8px; text-align: center; font-size: 0.8em;">Income</th>
                                                <th style="padding: 8px; text-align: center; font-size: 0.8em;">Age</th>
                                                <th style="padding: 8px; text-align: center; font-size: 0.8em;">Rooms</th>
                                                <th style="padding: 8px; text-align: center; font-size: 0.8em; background: rgba(0,0,0,0.1);">Actual</th>
                                                <th style="padding: 8px; text-align: center; font-size: 0.8em;">Predicted</th>
                                                <th style="padding: 8px; text-align: center; font-size: 0.8em;">Error%</th>
                                            </tr>
                                        </thead>
                                        <tbody id="data-preview-tbody">
                                            <!-- Data rows will be inserted here -->
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Right: Test Results -->
                        <div style="width: 280px;">
                            <div style="background: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                <div id="test-results-display">
                                    <!-- Test results will be displayed here -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Standard navigation -->
                ${typeof createStandardNavigation === 'function' ? createStandardNavigation() : ''}
                
                <style>
                    .percent-btn.active {
                        background: #667eea !important;
                        color: white !important;
                    }
                    .percent-btn:not(:disabled):hover {
                        opacity: 0.8;
                    }
                    button:not(:disabled):hover {
                        opacity: 0.9;
                    }
                    button:disabled {
                        opacity: 0.5;
                        cursor: not-allowed;
                    }
                    code {
                        background: #f5f5f5;
                        padding: 2px 4px;
                        border-radius: 3px;
                        font-family: monospace;
                    }
                </style>
            `;
        }
        
        cleanup() {
            this.stopTraining();
            super.cleanup();
        }
    }
    
    const level = new RealWorldData1Level();
    level.create().catch(error => {
        console.error('Failed to create Real World Data 1:', error);
    });
    
    return level;
};

// Export for modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.createRealWorldData1;
}