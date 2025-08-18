/**
 * Real World Data Level 2 - Bike Sharing Demand
 * 
 * Uses the UCI Bike Sharing dataset for linear regression
 * Dataset source: https://archive.ics.uci.edu/ml/datasets/bike+sharing+dataset
 */

window.createRealWorldData2 = function() {
    
    class RealWorldData2Level extends window.BaseLevelTemplate {
        constructor() {
            super({
                id: 'real-world-data-2',
                name: 'Real World: Bike Sharing Demand',
                type: 'interactive',
                description: 'Predict bike rental demand using weather and seasonal data',
                instructions: '',
                concepts: ['Feature Engineering', 'Temporal Patterns', 'Weather Impact', 'Real Data Analysis'],
                difficulty: 'advanced',
                interactionType: 'real-data-advanced',
                estimatedTime: 10
            });
            
            this.dataset = {
                name: 'Bike Sharing Demand',
                filename: 'day.csv', // Using daily data for better performance
                description: 'Predict daily bike rental count based on weather and seasonal information',
                features: ['season', 'yr', 'mnth', 'holiday', 'weekday', 'workingday', 
                          'weathersit', 'temp', 'atemp', 'hum', 'windspeed'],
                target: 'cnt',
                source: 'UCI Machine Learning Repository - Capital Bikeshare System (2011-2012)'
            };
            
            this.allData = [];
            this.trainingData = [];
            this.testData = [];
            this.selectedFeatures = ['temp', 'hum', 'windspeed', 'season', 'weekday'];
            this.weights = {};
            this.bias = 0;
            
            // Training parameters
            this.trainingPercentage = 0.7;
            this.learningRate = 0.001;
            this.maxIterations = 200;
            this.currentIteration = 0;
            this.isTraining = false;
            this.animationFrame = null;
            
            // Model comparison
            this.models = {
                simple: { 
                    features: ['temp', 'hum', 'windspeed'],
                    weights: {}, 
                    bias: 0, 
                    history: [], 
                    testResults: null 
                },
                complex: { 
                    features: ['temp', 'atemp', 'hum', 'windspeed', 'season', 'yr', 'mnth', 
                              'holiday', 'weekday', 'workingday', 'weathersit'],
                    weights: {}, 
                    bias: 0, 
                    history: [], 
                    testResults: null 
                }
            };
            this.currentModel = 'simple';
            
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
                initializeNavigation('real-world-data-2', 'createRealWorldData2');
            }
            
            // Setup control listeners
            this.setupControlListeners();
            
            // Initial display update
            setTimeout(() => {
                this.updateDisplay();
                this.updateFeatureInfo();
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
                        // Process Bike Sharing data
                        this.allData = parsed.data.filter(row => {
                            // Filter out rows with missing target values
                            return row.cnt !== null && row.cnt !== undefined;
                        }).map(row => {
                            // Denormalize temperature if needed (UCI dataset has normalized values)
                            const processedRow = { ...row };
                            
                            // If temp is normalized (0-1), denormalize it
                            if (row.temp && row.temp <= 1) {
                                processedRow.temp = row.temp * 41; // Convert to Celsius
                                processedRow.atemp = (row.atemp || row.temp) * 50; // Feeling temperature
                                processedRow.hum = (row.hum || 0.5) * 100; // Humidity percentage
                                processedRow.windspeed = (row.windspeed || 0.2) * 67; // Wind speed
                            }
                            
                            // Scale down bike counts for better training
                            processedRow.cnt = row.cnt / 1000; // Scale to thousands
                            
                            return processedRow;
                        });
                        
                        // Initialize weights for all features
                        this.dataset.features.forEach(feature => {
                            this.weights[feature] = 0.01;
                            this.models.simple.weights[feature] = 0.01;
                            this.models.complex.weights[feature] = 0.01;
                        });
                        
                        console.log(`Loaded ${this.allData.length} bike sharing records`);
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
            // Generate synthetic bike sharing data
            let seed = 123;
            const seededRandom = () => {
                seed = (seed * 9301 + 49297) % 233280;
                return seed / 233280;
            };
            
            this.allData = [];
            
            // Generate 731 days (2 years) of data
            for (let i = 0; i < 731; i++) {
                const dayOfYear = i % 365;
                const year = Math.floor(i / 365);
                
                // Seasonal patterns
                const season = Math.floor((dayOfYear % 365) / 91) + 1; // 1-4
                const month = Math.floor(dayOfYear / 30) + 1; // 1-12
                const weekday = i % 7; // 0-6
                const workingday = (weekday >= 1 && weekday <= 5) ? 1 : 0;
                const holiday = seededRandom() < 0.05 ? 1 : 0; // 5% holidays
                
                // Weather patterns (seasonal variation)
                const baseTemp = 15 + 10 * Math.sin((dayOfYear / 365) * 2 * Math.PI); // Seasonal temperature
                const temp = baseTemp + (seededRandom() - 0.5) * 10; // Add daily variation
                const atemp = temp + (seededRandom() - 0.5) * 5; // Feeling temperature
                const humidity = 40 + seededRandom() * 40; // 40-80%
                const windspeed = 5 + seededRandom() * 20; // 5-25 km/h
                const weathersit = Math.min(4, Math.floor(1 + seededRandom() * 3)); // 1-3 (4 is rare)
                
                // Calculate bike demand (complex formula with seasonal and weather effects)
                const baseDemand = 3 + year * 0.5; // Growth over years
                const seasonEffect = (season === 2 || season === 3) ? 1.5 : 0.8; // Higher in spring/summer
                const tempEffect = Math.max(0, (temp - 5) / 20); // More bikes in warm weather
                const weatherEffect = (4 - weathersit) / 3; // Less bikes in bad weather
                const weekendEffect = workingday ? 1 : 0.8; // Slightly less on weekends
                const holidayEffect = holiday ? 0.9 : 1; // Slightly less on holidays
                
                const noise = (seededRandom() - 0.5) * 1;
                const bikeCount = baseDemand * seasonEffect * tempEffect * weatherEffect * 
                                 weekendEffect * holidayEffect + noise;
                
                this.allData.push({
                    instant: i + 1,
                    dteday: `2011-01-${String(1 + (i % 30)).padStart(2, '0')}`,
                    season: season,
                    yr: year,
                    mnth: month,
                    holiday: holiday,
                    weekday: weekday,
                    workingday: workingday,
                    weathersit: weathersit,
                    temp: Math.round(temp * 10) / 10,
                    atemp: Math.round(atemp * 10) / 10,
                    hum: Math.round(humidity),
                    windspeed: Math.round(windspeed * 10) / 10,
                    cnt: Math.max(0.1, Math.round(bikeCount * 10) / 10) // in thousands
                });
            }
            
            // Initialize weights
            this.dataset.features.forEach(feature => {
                this.weights[feature] = 0.01;
                this.models.simple.weights[feature] = 0.01;
                this.models.complex.weights[feature] = 0.01;
            });
        }
        
        splitData() {
            // For time series data, use chronological split
            const trainSize = Math.floor(this.allData.length * this.trainingPercentage);
            this.trainingData = this.allData.slice(0, trainSize);
            this.testData = this.allData.slice(trainSize);
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
            // Model selection
            const modelButtons = document.querySelectorAll('.model-btn');
            modelButtons.forEach(btn => {
                this.addEventListenerWithCleanup(btn, 'click', (e) => {
                    if (this.isTraining) return;
                    
                    modelButtons.forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    this.currentModel = e.target.dataset.model;
                    
                    // Update selected features based on model
                    this.selectedFeatures = [...this.models[this.currentModel].features];
                    
                    this.updateFeatureInfo();
                    this.updateDisplay();
                });
            });
            
            // Training percentage selection
            const percentButtons = document.querySelectorAll('.percent-btn');
            percentButtons.forEach(btn => {
                this.addEventListenerWithCleanup(btn, 'click', (e) => {
                    if (this.isTraining) return;
                    
                    percentButtons.forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    this.trainingPercentage = parseFloat(e.target.dataset.percent);
                    
                    this.splitData();
                    this.resetModels();
                    this.updateDisplay();
                });
            });
            
            // Iterations control
            const iterationsInput = document.getElementById('iterations-input');
            if (iterationsInput) {
                this.addEventListenerWithCleanup(iterationsInput, 'change', (e) => {
                    this.maxIterations = parseInt(e.target.value) || 200;
                });
            }
            
            // Learning rate control
            const learningRateInput = document.getElementById('learning-rate-input');
            if (learningRateInput) {
                this.addEventListenerWithCleanup(learningRateInput, 'change', (e) => {
                    this.learningRate = parseFloat(e.target.value) || 0.001;
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
            
            const resetBtn = document.getElementById('reset-models');
            if (resetBtn) {
                this.addEventListenerWithCleanup(resetBtn, 'click', () => {
                    this.resetModels();
                });
            }
            
            const testBtn = document.getElementById('test-models');
            if (testBtn) {
                this.addEventListenerWithCleanup(testBtn, 'click', () => {
                    this.testModels();
                });
            }
        }
        
        updateFeatureInfo() {
            const infoDiv = document.getElementById('feature-info');
            if (!infoDiv) return;
            
            const featureDescriptions = {
                temp: 'Temperature in Celsius',
                atemp: 'Feeling temperature',
                hum: 'Humidity percentage',
                windspeed: 'Wind speed (km/h)',
                season: 'Season (1-4)',
                yr: 'Year (0=2011, 1=2012)',
                mnth: 'Month (1-12)',
                holiday: 'Holiday (0/1)',
                weekday: 'Day of week (0-6)',
                workingday: 'Working day (0/1)',
                weathersit: 'Weather (1=clear, 4=heavy rain)'
            };
            
            const featureList = this.selectedFeatures.map(feature => `
                <li style="margin: 3px 0; font-size: 0.85em;">
                    <strong>${feature}:</strong> ${featureDescriptions[feature] || feature}
                </li>
            `).join('');
            
            infoDiv.innerHTML = `
                <h4 style="margin: 0 0 10px 0; color: #333;">Active Features (${this.selectedFeatures.length})</h4>
                <ul style="margin: 0; padding-left: 20px; line-height: 1.4;">
                    ${featureList}
                </ul>
            `;
        }
        
        calculatePrediction(row, modelName = null) {
            const model = modelName ? this.models[modelName] : 
                         { weights: this.weights, bias: this.bias };
            
            let prediction = model.bias;
            this.selectedFeatures.forEach(feature => {
                prediction += (model.weights[feature] || 0) * (row[feature] || 0);
            });
            return prediction;
        }
        
        calculateLoss(data, modelName = null) {
            let totalError = 0;
            data.forEach(row => {
                const prediction = this.calculatePrediction(row, modelName);
                const error = row[this.dataset.target] - prediction;
                totalError += error * error;
            });
            return totalError / data.length;
        }
        
        calculateGradients(modelName = null) {
            const model = modelName ? this.models[modelName] : 
                         { weights: this.weights, bias: this.bias };
            
            const gradients = {};
            let biasGradient = 0;
            
            // Initialize gradients
            this.selectedFeatures.forEach(feature => {
                gradients[feature] = 0;
            });
            
            // Calculate gradients
            this.trainingData.forEach(row => {
                const prediction = this.calculatePrediction(row, modelName);
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
            if (this.isTraining) return;
            
            this.isTraining = true;
            this.currentIteration = 0;
            
            // Store current model's history
            const model = this.models[this.currentModel];
            model.history = [];
            
            // Copy weights to current working weights
            this.weights = { ...model.weights };
            this.bias = model.bias;
            
            // Normalize features
            const { data: normalizedTrain, stats } = this.normalizeFeatures(this.trainingData);
            this.normStats = stats;
            
            // Update UI
            this.updateButtonStates();
            
            const train = () => {
                if (!this.isTraining || this.currentIteration >= this.maxIterations) {
                    // Save trained weights back to model
                    model.weights = { ...this.weights };
                    model.bias = this.bias;
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
                model.history.push({ iteration: this.currentIteration, loss });
                
                // Restore original data
                this.trainingData = tempTrainingData;
                
                // Update display
                this.updateDisplay();
                
                this.currentIteration++;
                
                // Continue training
                this.animationFrame = setTimeout(train, 30);
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
        
        resetModels() {
            // Reset all models
            Object.keys(this.models).forEach(modelName => {
                const model = this.models[modelName];
                model.weights = {};
                model.features.forEach(feature => {
                    model.weights[feature] = 0.01;
                });
                model.bias = 0;
                model.history = [];
                model.testResults = null;
            });
            
            // Reset current weights
            this.weights = { ...this.models[this.currentModel].weights };
            this.bias = this.models[this.currentModel].bias;
            
            this.currentIteration = 0;
            this.updateDisplay();
        }
        
        testModels() {
            if (this.testData.length === 0) return;
            
            // Test both models
            Object.keys(this.models).forEach(modelName => {
                const model = this.models[modelName];
                
                // Set selected features based on model type
                const prevSelected = this.selectedFeatures;
                this.selectedFeatures = [...model.features];
                
                // Normalize test data
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
                    const prediction = this.calculatePrediction(row, modelName);
                    const actual = this.testData[idx][this.dataset.target];
                    const error = Math.abs(actual - prediction);
                    totalError += error;
                    totalPercentError += (error / Math.abs(actual)) * 100;
                });
                
                const avgError = totalError / this.testData.length;
                const avgPercentError = totalPercentError / this.testData.length;
                
                // Calculate R-squared
                const meanActual = this.testData.reduce((sum, row) => 
                    sum + row[this.dataset.target], 0) / this.testData.length;
                
                let ssRes = 0, ssTot = 0;
                normalizedTest.forEach((row, idx) => {
                    const prediction = this.calculatePrediction(row, modelName);
                    const actual = this.testData[idx][this.dataset.target];
                    ssRes += Math.pow(actual - prediction, 2);
                    ssTot += Math.pow(actual - meanActual, 2);
                });
                
                const rSquared = 1 - (ssRes / ssTot);
                
                model.testResults = {
                    avgError: (avgError * 1000).toFixed(0), // Convert back to bikes
                    avgPercentError: avgPercentError.toFixed(1),
                    rSquared: rSquared.toFixed(3),
                    testSize: this.testData.length,
                    numFeatures: model.features.length
                };
                
                // Restore selected features
                this.selectedFeatures = prevSelected;
            });
            
            this.updateDisplay();
            
            // Check for success
            const simplePerf = parseFloat(this.models.simple.testResults?.avgPercentError || 100);
            const complexPerf = parseFloat(this.models.complex.testResults?.avgPercentError || 100);
            
            if (simplePerf < 30 || complexPerf < 30) {
                if (!this.completed) {
                    this.completed = true;
                    const betterModel = simplePerf < complexPerf ? 'simple' : 'complex';
                    this.showSuccess(`🎉 Excellent! The ${betterModel} model achieves ${Math.min(simplePerf, complexPerf).toFixed(1)}% error!`, 5000);
                    setTimeout(() => {
                        this.completeLevel({ 
                            score: Math.round(100 - Math.min(simplePerf, complexPerf)),
                            bestModel: betterModel,
                            simpleError: simplePerf,
                            complexError: complexPerf
                        });
                    }, 2000);
                }
            }
        }
        
        updateButtonStates() {
            document.getElementById('start-training').disabled = this.isTraining;
            document.getElementById('stop-training').disabled = !this.isTraining;
            document.getElementById('reset-models').disabled = this.isTraining;
            document.getElementById('test-models').disabled = this.isTraining;
            document.querySelectorAll('.percent-btn').forEach(btn => btn.disabled = this.isTraining);
            document.querySelectorAll('.model-btn').forEach(btn => btn.disabled = this.isTraining);
            document.getElementById('iterations-input').disabled = this.isTraining;
            document.getElementById('learning-rate-input').disabled = this.isTraining;
        }
        
        updateDisplay() {
            // Update stats
            document.getElementById('train-size').textContent = this.trainingData.length;
            document.getElementById('test-size').textContent = this.testData.length;
            document.getElementById('current-iteration').textContent = this.currentIteration;
            document.getElementById('selected-features').textContent = this.selectedFeatures.length;
            
            // Update model comparison
            this.updateModelComparison();
            
            // Update data preview
            this.updateDataPreview();
        }
        
        updateModelComparison() {
            const comparisonDiv = document.getElementById('model-comparison');
            if (!comparisonDiv) return;
            
            const modelCards = Object.keys(this.models).map(modelName => {
                const model = this.models[modelName];
                const isActive = this.currentModel === modelName;
                
                let performanceHTML = '';
                if (model.testResults) {
                    const perfColor = model.testResults.avgPercentError < 20 ? '#4caf50' : 
                                    model.testResults.avgPercentError < 35 ? '#ff9800' : '#f44336';
                    
                    performanceHTML = `
                        <div style="margin-top: 10px; padding: 10px; background: ${isActive ? 'rgba(255,255,255,0.2)' : '#f5f5f5'}; border-radius: 4px;">
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                                <div>
                                    <div style="font-size: 0.75em; opacity: 0.8;">Error</div>
                                    <div style="font-size: 1.2em; font-weight: bold; color: ${isActive ? 'white' : perfColor};">
                                        ${model.testResults.avgPercentError}%
                                    </div>
                                </div>
                                <div>
                                    <div style="font-size: 0.75em; opacity: 0.8;">R²</div>
                                    <div style="font-size: 1.2em; font-weight: bold;">
                                        ${model.testResults.rSquared}
                                    </div>
                                </div>
                            </div>
                            <div style="margin-top: 5px; font-size: 0.8em; opacity: 0.9;">
                                Avg Error: ${model.testResults.avgError} bikes
                            </div>
                        </div>
                    `;
                }
                
                return `
                    <div style="
                        flex: 1;
                        padding: 15px;
                        background: ${isActive ? 'linear-gradient(135deg, #4ecdc4 0%, #44a3aa 100%)' : 'white'};
                        color: ${isActive ? 'white' : '#333'};
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    ">
                        <h3 style="margin: 0 0 10px 0; text-transform: capitalize;">
                            ${modelName} Model
                        </h3>
                        <p style="margin: 0; font-size: 0.85em; opacity: 0.9;">
                            ${model.features.length} features
                        </p>
                        ${performanceHTML}
                    </div>
                `;
            }).join('');
            
            comparisonDiv.innerHTML = modelCards;
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
                const errorColor = Math.abs(error) < 20 ? '#4caf50' : 
                                  Math.abs(error) < 40 ? '#ff9800' : '#f44336';
                
                return `
                    <tr>
                        <td style="padding: 6px; text-align: center; font-size: 0.8em;">${row.dteday || idx + 1}</td>
                        <td style="padding: 6px; text-align: center; font-size: 0.8em;">${row.temp.toFixed(1)}°C</td>
                        <td style="padding: 6px; text-align: center; font-size: 0.8em;">${row.hum}%</td>
                        <td style="padding: 6px; text-align: center; font-size: 0.8em;">${row.windspeed.toFixed(1)}</td>
                        <td style="padding: 6px; text-align: center; font-size: 0.8em;">S${row.season}</td>
                        <td style="padding: 6px; text-align: center; background: rgba(234,179,8,0.1); font-weight: bold; font-size: 0.8em;">
                            ${(actual * 1000).toFixed(0)}
                        </td>
                        <td style="padding: 6px; text-align: center; background: rgba(102,126,234,0.1); font-weight: bold; font-size: 0.8em;">
                            ${(prediction * 1000).toFixed(0)}
                        </td>
                        <td style="padding: 6px; text-align: center; color: ${errorColor}; font-weight: bold; font-size: 0.8em;">
                            ${error}%
                        </td>
                    </tr>
                `;
            }).join('');
            
            tbody.innerHTML = rows || '<tr><td colspan="8" style="text-align: center; padding: 20px;">No data loaded</td></tr>';
        }
        
        _generateMainContent() {
            return `
                <div style="max-height: 90vh; display: flex; flex-direction: column; gap: 10px; padding: 10px;">
                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #4ecdc4 0%, #44a3aa 100%); color: white; border-radius: 8px; padding: 15px;">
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
                            <strong>📥 To use real data:</strong> Download the Bike Sharing dataset from 
                            <a href="https://archive.ics.uci.edu/ml/datasets/bike+sharing+dataset" target="_blank" style="color: #0066cc;">UCI Repository</a> or 
                            <a href="https://www.kaggle.com/datasets/lakshmi25npathi/bike-sharing-dataset" target="_blank" style="color: #0066cc;">Kaggle</a>, 
                            extract <code>day.csv</code>, and place it in the project folder.
                        </p>
                    </div>
                    
                    <!-- Controls -->
                    <div style="background: white; border-radius: 8px; padding: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px;">
                            <!-- Model Selection -->
                            <div>
                                <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #555; font-size: 0.9em;">
                                    Model:
                                </label>
                                <div style="display: flex; gap: 5px;">
                                    <button class="model-btn active" data-model="simple" style="
                                        flex: 1;
                                        padding: 6px;
                                        background: #4ecdc4;
                                        color: white;
                                        border: none;
                                        border-radius: 4px;
                                        cursor: pointer;
                                        font-size: 0.85em;
                                    ">Simple</button>
                                    <button class="model-btn" data-model="complex" style="
                                        flex: 1;
                                        padding: 6px;
                                        background: #e0e0e0;
                                        border: none;
                                        border-radius: 4px;
                                        cursor: pointer;
                                        font-size: 0.85em;
                                    ">Complex</button>
                                </div>
                            </div>
                            
                            <!-- Training Data Percentage -->
                            <div>
                                <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #555; font-size: 0.9em;">
                                    Train %:
                                </label>
                                <div style="display: flex; gap: 5px;">
                                    <button class="percent-btn" data-percent="0.5" style="
                                        flex: 1;
                                        padding: 6px;
                                        background: #e0e0e0;
                                        border: none;
                                        border-radius: 4px;
                                        cursor: pointer;
                                        font-size: 0.8em;
                                    ">50%</button>
                                    <button class="percent-btn active" data-percent="0.7" style="
                                        flex: 1;
                                        padding: 6px;
                                        background: #4ecdc4;
                                        color: white;
                                        border: none;
                                        border-radius: 4px;
                                        cursor: pointer;
                                        font-size: 0.8em;
                                    ">70%</button>
                                    <button class="percent-btn" data-percent="0.8" style="
                                        flex: 1;
                                        padding: 6px;
                                        background: #e0e0e0;
                                        border: none;
                                        border-radius: 4px;
                                        cursor: pointer;
                                        font-size: 0.8em;
                                    ">80%</button>
                                </div>
                            </div>
                            
                            <!-- Iterations -->
                            <div>
                                <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #555; font-size: 0.9em;">
                                    Iterations:
                                </label>
                                <input type="number" id="iterations-input" value="200" min="10" max="1000" step="10" style="
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
                                <input type="number" id="learning-rate-input" value="0.001" min="0.00001" max="1" step="0.0001" style="
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
                                    font-size: 0.85em;
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
                                    font-size: 0.85em;
                                ">Stop</button>
                                <button id="reset-models" style="
                                    flex: 1;
                                    padding: 8px;
                                    background: #9e9e9e;
                                    color: white;
                                    border: none;
                                    border-radius: 4px;
                                    font-weight: bold;
                                    cursor: pointer;
                                    font-size: 0.85em;
                                ">Reset</button>
                                <button id="test-models" style="
                                    flex: 1;
                                    padding: 8px;
                                    background: #2196f3;
                                    color: white;
                                    border: none;
                                    border-radius: 4px;
                                    font-weight: bold;
                                    cursor: pointer;
                                    font-size: 0.85em;
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
                                <div id="selected-features" style="font-size: 1.2em; font-weight: bold; color: #333;">0</div>
                            </div>
                            <div style="text-align: center;">
                                <div style="font-size: 0.8em; color: #666;">Iteration</div>
                                <div id="current-iteration" style="font-size: 1.2em; font-weight: bold; color: #333;">0</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Main Content Area -->
                    <div style="display: flex; gap: 10px; flex: 1; min-height: 0;">
                        <!-- Left: Feature Info -->
                        <div style="width: 220px;">
                            <div style="background: white; border-radius: 8px; padding: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                <div id="feature-info">
                                    <!-- Feature list will be displayed here -->
                                </div>
                            </div>
                        </div>
                        
                        <!-- Center: Data Preview -->
                        <div style="flex: 1;">
                            <div style="background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden;">
                                <div style="padding: 10px; background: #f5f5f5; font-weight: bold; font-size: 0.9em;">
                                    Training Data Preview (First 5 days)
                                </div>
                                <div style="overflow: auto; max-height: 200px;">
                                    <table style="width: 100%; border-collapse: collapse; font-size: 0.9em;">
                                        <thead style="background: #4ecdc4; color: white; position: sticky; top: 0;">
                                            <tr>
                                                <th style="padding: 8px; text-align: center; font-size: 0.8em;">Date</th>
                                                <th style="padding: 8px; text-align: center; font-size: 0.8em;">Temp</th>
                                                <th style="padding: 8px; text-align: center; font-size: 0.8em;">Humidity</th>
                                                <th style="padding: 8px; text-align: center; font-size: 0.8em;">Wind</th>
                                                <th style="padding: 8px; text-align: center; font-size: 0.8em;">Season</th>
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
                            
                            <!-- Model Comparison -->
                            <div style="margin-top: 10px;">
                                <div id="model-comparison" style="display: flex; gap: 10px;">
                                    <!-- Model cards will be displayed here -->
                                </div>
                            </div>
                        </div>
                        
                        <!-- Right: Tips -->
                        <div style="width: 250px;">
                            <div style="background: #e8f5e9; border-radius: 8px; padding: 15px;">
                                <h4 style="margin: 0 0 10px 0; color: #2e7d32;">🚴 Dataset Insights</h4>
                                <ul style="margin: 0; padding-left: 20px; color: #2e7d32; font-size: 0.85em; line-height: 1.6;">
                                    <li>Temperature is the strongest predictor</li>
                                    <li>Weather conditions matter significantly</li>
                                    <li>Seasonal patterns affect demand</li>
                                    <li>Complex model may overfit with all features</li>
                                    <li>Goal: <30% test error</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Standard navigation -->
                ${typeof createStandardNavigation === 'function' ? createStandardNavigation() : ''}
                
                <style>
                    .percent-btn.active, .model-btn.active {
                        background: #4ecdc4 !important;
                        color: white !important;
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
    
    const level = new RealWorldData2Level();
    level.create().catch(error => {
        console.error('Failed to create Real World Data 2:', error);
    });
    
    return level;
};

// Export for modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.createRealWorldData2;
}