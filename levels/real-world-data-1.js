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
                description: '',
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
            this.selectedFeatures = ['median_income', 'housing_median_age', 'total_rooms', 'total_bedrooms', 'households'];
            this.weights = {};
            this.bias = 0;
            
            // Training parameters
            this.trainingPercentage = 0.7;
            this.learningRate = 0.01;
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
                // Ensure weights are initialized for selected features
                this.initializeWeights();
                this.updateDisplay();
                this.setupColumnClickListeners();
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
                        
                        // Initialize weights with small random values
                        this.dataset.features.forEach(feature => {
                            this.weights[feature] = (Math.random() - 0.5) * 0.1;
                        });
                        this.bias = 1.5;
                        
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
            
            // Initialize weights with small random values
            this.dataset.features.forEach(feature => {
                this.weights[feature] = (Math.random() - 0.5) * 0.1;
            });
            this.bias = 1.5;
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
            // Feature selection removed from here - handled by column clicks
            
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
                    } else {
                        this.stopTraining();
                    }
                });
            }
            
            const resetBtn = document.getElementById('reset-model');
            if (resetBtn) {
                this.addEventListenerWithCleanup(resetBtn, 'click', () => {
                    this.resetModel();
                });
            }
            
            // Test button removed - testing happens automatically
        }
        
        setupColumnClickListeners() {
            // Setup click listeners for column headers
            const headers = document.querySelectorAll('.feature-column');
            headers.forEach(header => {
                this.addEventListenerWithCleanup(header, 'click', (e) => {
                    if (this.isTraining) return;
                    
                    const feature = header.dataset.feature;
                    if (!feature) return;
                    
                    // Toggle feature selection
                    const index = this.selectedFeatures.indexOf(feature);
                    if (index > -1) {
                        this.selectedFeatures.splice(index, 1);
                    } else {
                        this.selectedFeatures.push(feature);
                    }
                    
                    this.resetModel();
                    this.updateDisplay();
                    this.updateFeatureSelection();
                });
            });
        }
        
        updateFeatureSelection() {
            // Update visual indicators for selected columns
            const headers = document.querySelectorAll('.feature-column');
            headers.forEach(header => {
                const feature = header.dataset.feature;
                if (!feature) return;
                
                const isSelected = this.selectedFeatures.includes(feature);
                const originalText = header.textContent.replace(' ✓', '').replace(' ✗', '');
                
                if (isSelected) {
                    header.classList.add('selected');
                    header.style.background = '#f5f5f5';
                    header.style.color = '#333';
                    header.style.fontWeight = 'normal';
                    header.style.textDecoration = 'none';
                    header.innerHTML = originalText;
                    header.title = 'Click to exclude this feature';
                } else {
                    header.classList.remove('selected');
                    header.style.background = '#f5f5f5';
                    header.style.color = '#999';
                    header.style.fontWeight = 'normal';
                    header.style.textDecoration = 'line-through';
                    header.innerHTML = originalText;
                    header.title = 'Click to include this feature';
                }
            });
        }
        
        calculatePrediction(row) {
            let prediction = this.bias;
            this.selectedFeatures.forEach(feature => {
                prediction += (this.weights[feature] || 0) * (row[feature] || 0);
            });
            return prediction;
        }
        
        calculateLoss(data, useNormalization = false) {
            let totalError = 0;
            const dataToUse = useNormalization && this.normStats ? 
                this.normalizeFeatures(data).data : data;
            
            dataToUse.forEach((row, idx) => {
                const prediction = this.calculatePrediction(row);
                const actual = data[idx][this.dataset.target];
                const error = actual - prediction;
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
                
                // Calculate loss on normalized data
                const loss = this.calculateLoss(normalizedTrain, false);  // false because data is already normalized
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
        
        initializeWeights() {
            // Initialize weights with small random values for better starting point
            this.selectedFeatures.forEach(feature => {
                if (this.weights[feature] === undefined || this.weights[feature] === 0.01) {
                    this.weights[feature] = (Math.random() - 0.5) * 0.1;
                }
            });
            if (this.bias === 0) {
                this.bias = 1.5; // Start with a reasonable bias for housing prices
            }
        }
        
        resetModel() {
            // Reset weights for all features
            this.dataset.features.forEach(feature => {
                this.weights[feature] = (Math.random() - 0.5) * 0.1;
            });
            this.bias = 1.5; // Start with a reasonable bias for housing prices
            this.currentIteration = 0;
            this.trainingHistory = [];
            this.testResults = null;
            this.normStats = null; // Clear normalization stats on reset
            this.updateDisplay();
        }
        
        updateButtonStates() {
            const startBtn = document.getElementById('start-training');
            if (startBtn) {
                if (this.isTraining) {
                    startBtn.textContent = 'Stop Training';
                    startBtn.style.background = '#ff9800';
                } else {
                    startBtn.textContent = 'Run 100 iterations of gradient descent on the training data';
                    startBtn.style.background = '#4caf50';
                }
            }
            document.getElementById('reset-model').disabled = this.isTraining;
            document.querySelectorAll('.percent-btn').forEach(btn => btn.disabled = this.isTraining);
            document.getElementById('learning-rate-input').disabled = this.isTraining;
            // Update clickable column states
            document.querySelectorAll('.feature-column').forEach(header => {
                header.style.pointerEvents = this.isTraining ? 'none' : 'auto';
                header.style.opacity = this.isTraining ? '0.7' : '1';
            });
        }
        
        updateDisplay() {
            // Update data counts in headers
            const trainDataCount = document.getElementById('train-data-count');
            if (trainDataCount) trainDataCount.textContent = this.trainingData.length;
            
            const testDataCount = document.getElementById('test-data-count');
            if (testDataCount) testDataCount.textContent = this.testData.length;
            
            const trainFeaturesCount = document.getElementById('train-features-count');
            if (trainFeaturesCount) trainFeaturesCount.textContent = this.selectedFeatures.length;
            
            const testFeaturesCount = document.getElementById('test-features-count');
            if (testFeaturesCount) testFeaturesCount.textContent = this.selectedFeatures.length;
            
            // Update data preview
            this.updateDataPreview();
        }
        
        updateDataPreview() {
            // Update training spreadsheet
            this.updateSpreadsheet('train-spreadsheet-tbody', this.trainingData.slice(0, 20), 'train');
            
            // Update test spreadsheet
            this.updateSpreadsheet('test-spreadsheet-tbody', this.testData.slice(0, 20), 'test');
            
            // Update average loss rows
            this.updateAverageLoss();
        }
        
        updateSpreadsheet(tbodyId, data, type) {
            const tbody = document.getElementById(tbodyId);
            if (!tbody) return;
            
            const rows = data.map((row, idx) => {
                // Apply normalization consistently if model has been trained
                let prediction;
                if (this.normStats) {
                    // Normalize the row using the stored stats from training
                    const normRow = {};
                    this.selectedFeatures.forEach(feature => {
                        normRow[feature] = (row[feature] - this.normStats[feature].mean) / this.normStats[feature].std;
                    });
                    normRow[this.dataset.target] = row[this.dataset.target];
                    prediction = this.calculatePrediction(normRow);
                } else {
                    prediction = this.calculatePrediction(row);
                }
                const actual = row[this.dataset.target];
                const loss = Math.pow(prediction - actual, 2).toFixed(2);
                const lossColor = parseFloat(loss) < 0.5 ? '#4caf50' : 
                                 parseFloat(loss) < 2 ? '#ff9800' : '#f44336';
                
                // Use dollar sign as string concatenation to avoid template literal issues
                const actualPrice = '$' + (actual * 100).toFixed(0) + 'k';
                const predictedPrice = '$' + (prediction * 100).toFixed(0) + 'k';
                
                // Helper function to check if feature is selected
                const isFeatureSelected = (feature) => this.selectedFeatures.includes(feature);
                const getCellStyle = (feature) => {
                    const baseStyle = "padding: 4px; text-align: center; font-size: 0.75em;";
                    if (isFeatureSelected(feature)) {
                        return baseStyle;
                    }
                    return baseStyle + " opacity: 0.4; text-decoration: line-through;";
                };
                
                return `
                    <tr>
                        <td style="padding: 4px; text-align: center; font-size: 0.75em; border-right: 1px solid #e0e0e0;">${idx + 1}</td>
                        <td style="${getCellStyle('median_income')}">${row.median_income.toFixed(2)}</td>
                        <td style="${getCellStyle('housing_median_age')}">${row.housing_median_age}</td>
                        <td style="${getCellStyle('total_rooms')}">${row.total_rooms}</td>
                        <td style="${getCellStyle('total_bedrooms')}">${row.total_bedrooms || 'N/A'}</td>
                        <td style="${getCellStyle('population')}">${row.population}</td>
                        <td style="${getCellStyle('households')}">${row.households}</td>
                        <td style="${getCellStyle('longitude')}">${row.longitude.toFixed(2)}</td>
                        <td style="${getCellStyle('latitude')}">${row.latitude.toFixed(2)}</td>
                        <td style="padding: 6px; text-align: center; background: rgba(234,179,8,0.1); font-weight: bold; font-size: 0.8em;">
                            ${actualPrice}
                        </td>
                        <td style="padding: 6px; text-align: center; background: rgba(102,126,234,0.1); font-weight: bold; font-size: 0.8em;">
                            ${predictedPrice}
                        </td>
                        <td style="padding: 6px; text-align: center; color: ${lossColor}; font-weight: bold; font-size: 0.8em; border-left: 1px solid #e0e0e0;">
                            ${loss}
                        </td>
                    </tr>
                `;
            }).join('');
            
            tbody.innerHTML = rows || '<tr><td colspan="12" style="text-align: center; padding: 20px;">No data loaded</td></tr>';
        }
        
        updateAverageLoss() {
            // Calculate and update average loss for training data
            // Use normalization if model was trained (normStats exists)
            const trainLoss = this.calculateLoss(this.trainingData, !!this.normStats);
            const trainAvgCell = document.getElementById('train-avg-loss');
            if (trainAvgCell) {
                trainAvgCell.textContent = trainLoss.toFixed(2);
                const color = trainLoss < 0.5 ? '#4caf50' : trainLoss < 2 ? '#ff9800' : '#f44336';
                trainAvgCell.style.color = color;
            }
            
            // Calculate and update average loss for test data
            const testLoss = this.calculateLoss(this.testData, !!this.normStats);
            const testAvgCell = document.getElementById('test-avg-loss');
            if (testAvgCell) {
                testAvgCell.textContent = testLoss.toFixed(2);
                const color = testLoss < 0.5 ? '#4caf50' : testLoss < 2 ? '#ff9800' : '#f44336';
                testAvgCell.style.color = color;
            }
            
            // Check for success automatically
            if (testLoss < 1.5 && this.trainingPercentage >= 0.7 && this.currentIteration > 0) {
                if (!this.completed) {
                    this.completed = true;
                    const score = Math.round(100 - (testLoss * 20));
                    this.showSuccess('🎉 Excellent! Your model performs well on California housing data!', 5000);
                    setTimeout(() => {
                        this.completeLevel({ 
                            score: Math.max(0, Math.min(100, score)),
                            datasetSize: this.allData.length,
                            testLoss: testLoss
                        });
                    }, 2000);
                }
            }
        }
        
        _generateMainContent() {
            return `
                <div style="width: 100%; margin: 0 auto; box-sizing: border-box;">
                <div style="height: 100vh; display: flex; flex-direction: column; gap: 10px; padding: 10px; box-sizing: border-box; overflow-x: hidden;">
                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 8px; padding: 12px;">
                        <h2 style="margin: 0 0 5px 0; font-size: 1.4em;">${this.dataset.name}</h2>
                        <p style="margin: 0; opacity: 0.9; font-size: 0.85em;">${this.dataset.description}</p>
                    </div>
                    
                    <!-- Instructions -->
                    <div style="background: #e3f2fd; border-radius: 8px; padding: 10px; color: #1976d2; font-size: 0.85em;">
                        <strong>👉 Click on column headers</strong> (Income, Age, Rooms, etc.) to toggle which features are used for training. Unselected columns will be greyed out.
                    </div>
                    
                    <!-- Controls Row -->
                    <div style="width: 100%; box-sizing: border-box;">
                        <!-- Training Controls -->
                        <div style="background: white; border-radius: 8px; padding: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); box-sizing: border-box;">
                            <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
                                <!-- Training Data Percentage -->
                                <div>
                                    <label style="display: block; margin-bottom: 6px; font-weight: bold; color: #555; font-size: 0.85em;">
                                        Training Data:
                                    </label>
                                    <div style="display: flex; gap: 5px;">
                                        <button class="percent-btn" data-percent="0.5" style="
                                            padding: 5px 10px;
                                            background: #e0e0e0;
                                            border: none;
                                            border-radius: 4px;
                                            cursor: pointer;
                                            font-size: 0.85em;
                                        ">50%</button>
                                        <button class="percent-btn active" data-percent="0.7" style="
                                            padding: 5px 10px;
                                            background: #667eea;
                                            color: white;
                                            border: none;
                                            border-radius: 4px;
                                            cursor: pointer;
                                            font-size: 0.85em;
                                        ">70%</button>
                                        <button class="percent-btn" data-percent="0.8" style="
                                            padding: 5px 10px;
                                            background: #e0e0e0;
                                            border: none;
                                            border-radius: 4px;
                                            cursor: pointer;
                                            font-size: 0.85em;
                                        ">80%</button>
                                    </div>
                                </div>
                                

                                
                                <!-- Learning Rate -->
                                <div>
                                    <label style="display: block; margin-bottom: 6px; font-weight: bold; color: #555; font-size: 0.85em;">
                                        Learning Rate:
                                    </label>
                                    <input type="number" id="learning-rate-input" value="0.01" min="0.000001" max="1" step="0.000001" style="
                                        width: 100px;
                                        padding: 5px;
                                        border: 1px solid #ddd;
                                        border-radius: 4px;
                                        font-size: 0.85em;
                                    ">
                                </div>
                                
                                <!-- Buttons -->
                                <div style="display: flex; gap: 5px; margin-left: auto;">
                                    <button id="start-training" style="
                                        padding: 8px 16px;
                                        background: #4caf50;
                                        color: white;
                                        border: none;
                                        border-radius: 4px;
                                        font-weight: bold;
                                        cursor: pointer;
                                    ">Run 100 iterations of gradient descent on the training data</button>
                                    <button id="reset-model" style="
                                        padding: 8px 16px;
                                        background: #9e9e9e;
                                        color: white;
                                        border: none;
                                        border-radius: 4px;
                                        font-weight: bold;
                                        cursor: pointer;
                                    ">Reset</button>
                                </div>
                                

                            </div>
                        </div>
                    </div>
                    
                    <!-- Training Spreadsheet -->
                    <div style="flex: 1; display: flex; flex-direction: column; min-height: 0; width: 100%; box-sizing: border-box;">
                        <div style="background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden; display: flex; flex-direction: column; height: 48%; width: 100%; box-sizing: border-box;">
                            <div style="padding: 10px; background: linear-gradient(90deg, #667eea, #764ba2); color: white; font-weight: bold; font-size: 0.9em;">
                                Training Data: <span id="train-data-count">${this.trainingData.length}</span> rows · <span id="train-features-count">${this.selectedFeatures.length}</span> selected features
                            </div>
                            <div style="flex: 1; overflow: auto; position: relative; width: 100%; box-sizing: border-box;">
                                <table style="width: 100%; border-collapse: collapse; font-size: 0.85em; table-layout: auto;">
                                    <thead style="background: #f5f5f5; position: sticky; top: 0; z-index: 10;">
                                        <tr>
                                            <th style="padding: 8px; text-align: center; font-size: 0.8em; border-right: 1px solid #e0e0e0;">#</th>
                                            <th class="feature-column" data-feature="median_income" style="padding: 8px; text-align: center; font-size: 0.8em; cursor: pointer; user-select: none; transition: all 0.2s;">Income</th>
                                            <th class="feature-column" data-feature="housing_median_age" style="padding: 8px; text-align: center; font-size: 0.8em; cursor: pointer; user-select: none; transition: all 0.2s;">Age</th>
                                            <th class="feature-column" data-feature="total_rooms" style="padding: 8px; text-align: center; font-size: 0.8em; cursor: pointer; user-select: none; transition: all 0.2s;">Rooms</th>
                                            <th class="feature-column" data-feature="total_bedrooms" style="padding: 8px; text-align: center; font-size: 0.8em; cursor: pointer; user-select: none; transition: all 0.2s;">Bedrooms</th>
                                            <th class="feature-column" data-feature="population" style="padding: 8px; text-align: center; font-size: 0.8em; cursor: pointer; user-select: none; transition: all 0.2s;">Population</th>
                                            <th class="feature-column" data-feature="households" style="padding: 8px; text-align: center; font-size: 0.8em; cursor: pointer; user-select: none; transition: all 0.2s;">Households</th>
                                            <th class="feature-column" data-feature="longitude" style="padding: 8px; text-align: center; font-size: 0.8em; cursor: pointer; user-select: none; transition: all 0.2s;">Longitude</th>
                                            <th class="feature-column" data-feature="latitude" style="padding: 8px; text-align: center; font-size: 0.8em; cursor: pointer; user-select: none; transition: all 0.2s;">Latitude</th>
                                            <th style="padding: 8px; text-align: center; font-size: 0.8em; background: rgba(234,179,8,0.1);">Actual Price</th>
                                            <th style="padding: 8px; text-align: center; font-size: 0.8em; background: rgba(102,126,234,0.1);">Predicted</th>
                                            <th style="padding: 8px; text-align: center; font-size: 0.8em; border-left: 1px solid #e0e0e0;">Loss</th>
                                        </tr>
                                    </thead>
                                    <tbody id="train-spreadsheet-tbody">
                                        <!-- Data rows will be inserted here -->
                                    </tbody>
                                </table>
                            </div>
                            <div style="background: #333; color: white; padding: 8px; position: sticky; bottom: 0;">
                                <table style="width: 100%; border-collapse: collapse;">
                                    <tr>
                                        <td style="padding: 4px; text-align: right; font-weight: bold; font-size: 0.9em;">Average Train Loss:</td>
                                        <td id="train-avg-loss" style="padding: 4px; text-align: left; font-weight: bold; font-size: 1.1em; color: #4caf50;">0.00</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        
                        <!-- Test Spreadsheet -->
                        <div style="background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden; display: flex; flex-direction: column; height: 48%; margin-top: 10px; width: 100%; box-sizing: border-box;">
                            <div style="padding: 10px; background: linear-gradient(90deg, #2196f3, #00bcd4); color: white; font-weight: bold; font-size: 0.9em;">
                                Test Data: <span id="test-data-count">${this.testData.length}</span> rows · <span id="test-features-count">${this.selectedFeatures.length}</span> selected features
                            </div>
                            <div style="flex: 1; overflow: auto; position: relative; width: 100%; box-sizing: border-box;">
                                <table style="width: 100%; border-collapse: collapse; font-size: 0.85em; table-layout: auto;">
                                    <thead style="background: #f5f5f5; position: sticky; top: 0; z-index: 10;">
                                        <tr>
                                            <th style="padding: 8px; text-align: center; font-size: 0.8em; border-right: 1px solid #e0e0e0;">#</th>
                                            <th class="feature-column" data-feature="median_income" style="padding: 8px; text-align: center; font-size: 0.8em; cursor: pointer; user-select: none; transition: all 0.2s;">Income</th>
                                            <th class="feature-column" data-feature="housing_median_age" style="padding: 8px; text-align: center; font-size: 0.8em; cursor: pointer; user-select: none; transition: all 0.2s;">Age</th>
                                            <th class="feature-column" data-feature="total_rooms" style="padding: 8px; text-align: center; font-size: 0.8em; cursor: pointer; user-select: none; transition: all 0.2s;">Rooms</th>
                                            <th class="feature-column" data-feature="total_bedrooms" style="padding: 8px; text-align: center; font-size: 0.8em; cursor: pointer; user-select: none; transition: all 0.2s;">Bedrooms</th>
                                            <th class="feature-column" data-feature="population" style="padding: 8px; text-align: center; font-size: 0.8em; cursor: pointer; user-select: none; transition: all 0.2s;">Population</th>
                                            <th class="feature-column" data-feature="households" style="padding: 8px; text-align: center; font-size: 0.8em; cursor: pointer; user-select: none; transition: all 0.2s;">Households</th>
                                            <th class="feature-column" data-feature="longitude" style="padding: 8px; text-align: center; font-size: 0.8em; cursor: pointer; user-select: none; transition: all 0.2s;">Longitude</th>
                                            <th class="feature-column" data-feature="latitude" style="padding: 8px; text-align: center; font-size: 0.8em; cursor: pointer; user-select: none; transition: all 0.2s;">Latitude</th>
                                            <th style="padding: 8px; text-align: center; font-size: 0.8em; background: rgba(234,179,8,0.1);">Actual Price</th>
                                            <th style="padding: 8px; text-align: center; font-size: 0.8em; background: rgba(102,126,234,0.1);">Predicted</th>
                                            <th style="padding: 8px; text-align: center; font-size: 0.8em; border-left: 1px solid #e0e0e0;">Loss</th>
                                        </tr>
                                    </thead>
                                    <tbody id="test-spreadsheet-tbody">
                                        <!-- Data rows will be inserted here -->
                                    </tbody>
                                </table>
                            </div>
                            <div style="background: #333; color: white; padding: 8px; position: sticky; bottom: 0;">
                                <table style="width: 100%; border-collapse: collapse;">
                                    <tr>
                                        <td style="padding: 4px; text-align: right; font-weight: bold; font-size: 0.9em;">Average Test Loss:</td>
                                        <td id="test-avg-loss" style="padding: 4px; text-align: left; font-weight: bold; font-size: 1.1em; color: #4caf50;">0.00</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                
                <!-- Standard navigation -->
                <div style="width: 100%; box-sizing: border-box;">
                    ${typeof createStandardNavigation === 'function' ? createStandardNavigation() : ''}
                </div>
                
                <style>
                    body {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    * {
                        box-sizing: border-box;
                    }
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
                    #train-spreadsheet-tbody tr:hover,
                    #test-spreadsheet-tbody tr:hover {
                        background: rgba(0,0,0,0.03);
                    }
                    .feature-column {
                        position: relative;
                        transition: all 0.2s ease;
                    }
                    .feature-column:hover {
                        background: #e8e8e8 !important;
                        transform: scale(1.02);
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