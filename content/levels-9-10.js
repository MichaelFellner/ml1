function createLevel9() {
    currentLevel = 8;
    const container = document.getElementById('app');
    
    container.innerHTML = `
        <div class="current-level">
            ${createLevelHeader ? createLevelHeader(8, 9, 10) : '<div class="level-header"><h2>Level 9: Coefficient Experimentation</h2></div>'}
            <div class="level-content">
                <div class="level9-layout">
                    <div class="level9-controls">
                        <h3>🧮 Energy Prediction Model</h3>
                        <p>Experiment with different coefficients to see how they affect predictions!</p>
                        <div class="formula-display">
                            <strong>Energy = </strong>
                            <span class="formula-part">
                                <input type="number" id="headCoeff" step="0.1" value="0.5" class="coeff-input"> × Head Size
                            </span>
                            <span class="formula-part">
                                + <input type="number" id="bodyCoeff" step="0.1" value="0.3" class="coeff-input"> × Body Size
                            </span>
                            <span class="formula-part">
                                + <input type="number" id="legCoeff" step="0.1" value="0.2" class="coeff-input"> × Leg Size
                            </span>
                        </div>
                        
                        <div class="input-group">
                            <button id="testBtn" class="action-btn">🧪 Test Coefficients</button>
                            <button id="resetBtn" class="reset-btn">🔄 Reset & Try Again</button>
                        </div>
                        
                        <div id="modelInfo" class="model-info">
                            Enter coefficients to see how many robots your model predicts correctly!
                        </div>
                        
                        <div id="status" class="status">💡 Tip: Larger coefficients mean that feature has more impact on energy level!</div>
                    </div>
                    <div class="level9-visual">
                        <h3>Robot Fleet Prediction Results</h3>
                        <div class="prediction-stats" id="predictionStats" style="display: none;">
                            <div class="stat-box">
                                <span class="stat-number" id="correctPredictions">0</span>
                                <span class="stat-label">Accurate Predictions</span>
                            </div>
                            <div class="stat-box">
                                <span class="stat-number" id="accuracy">0%</span>
                                <span class="stat-label">Accuracy</span>
                            </div>
                        </div>
                        <div id="robotGrid" class="robot-grid"></div>
                    </div>
                </div>
            </div>
            
            ${createStandardNavigation()}
        </div>
    `;
    
    setupLevel9();
}

function setupLevel9() {
    const headCoeffInput = document.getElementById('headCoeff');
    const bodyCoeffInput = document.getElementById('bodyCoeff');
    const legCoeffInput = document.getElementById('legCoeff');
    const testBtn = document.getElementById('testBtn');
    const resetBtn = document.getElementById('resetBtn');
    const robotGrid = document.getElementById('robotGrid');
    
    // Generate the 1000 robots with their characteristics
    const robots = generateRobotFleet();
    
    // Create 1000 robot dots (approximate with 625 for visual reasons, representing 1000)
    function createRobotGrid() {
        robotGrid.innerHTML = '';
        for (let i = 0; i < 625; i++) {
            const dot = document.createElement('div');
            dot.className = 'robot-dot';
            robotGrid.appendChild(dot);
        }
    }
    
    function resetRobots() {
        // Reset all dots to default state
        const dots = robotGrid.querySelectorAll('.robot-dot');
        dots.forEach(dot => {
            dot.className = 'robot-dot';
        });
        
        // Re-enable inputs and test button
        headCoeffInput.disabled = false;
        bodyCoeffInput.disabled = false;
        legCoeffInput.disabled = false;
        testBtn.disabled = false;
        testBtn.textContent = '🧪 Test Coefficients';
        
        // Hide stats but keep reset button visible
        document.getElementById('predictionStats').style.display = 'none';
        
        // Reset status
        document.getElementById('status').innerHTML = '💡 Tip: Larger coefficients mean that feature has more impact on energy level!';
        document.getElementById('status').style.background = 'rgba(255, 255, 255, 0.8)';
        
        // Reset coefficient values to defaults
        headCoeffInput.value = '0.5';
        bodyCoeffInput.value = '0.3';
        legCoeffInput.value = '0.2';
    }
    
    function testCoefficients() {
        const headCoeff = parseFloat(headCoeffInput.value) || 0;
        const bodyCoeff = parseFloat(bodyCoeffInput.value) || 0;
        const legCoeff = parseFloat(legCoeffInput.value) || 0;
        
        // Calculate predictions for all robots
        let correctPredictions = 0;
        const tolerance = 10; // Energy level within ±10 is considered correct
        
        robots.forEach(robot => {
            const predictedEnergy = headCoeff * robot.headSize + bodyCoeff * robot.bodySize + legCoeff * robot.legSize;
            const error = Math.abs(predictedEnergy - robot.actualEnergy);
            robot.isCorrect = error <= tolerance;
            if (robot.isCorrect) correctPredictions++;
        });
        
        const accuracy = Math.round((correctPredictions / robots.length) * 100);
        
        // Reset all dots to inactive
        const dots = robotGrid.querySelectorAll('.robot-dot');
        dots.forEach(dot => {
            dot.className = 'robot-dot inactive';
        });
        
        // Light up robots with correct predictions
        // Map 1000 robots to 625 dots proportionally
        const correctIndices = [];
        robots.forEach((robot, index) => {
            if (robot.isCorrect) {
                const dotIndex = Math.floor((index / robots.length) * dots.length);
                correctIndices.push(dotIndex);
            }
        });
        
        // Remove duplicates and light up dots
        const uniqueIndices = [...new Set(correctIndices)];
        uniqueIndices.forEach(index => {
            if (dots[index]) {
                dots[index].className = 'robot-dot active';
            }
        });
        
        // Update stats
        document.getElementById('correctPredictions').textContent = correctPredictions;
        document.getElementById('accuracy').textContent = accuracy + '%';
        document.getElementById('predictionStats').style.display = 'flex';
        
        // Update status - no completion conditions, just feedback
        let statusMessage = '';
        if (accuracy >= 80) {
            statusMessage = `🎉 Excellent! ${accuracy}% accuracy - Great model performance!`;
            document.getElementById('status').style.background = 'rgba(45, 213, 115, 0.2)';
        } else if (accuracy >= 60) {
            statusMessage = `👍 Good work! ${accuracy}% accuracy - Try adjusting coefficients for even better results.`;
            document.getElementById('status').style.background = 'rgba(255, 193, 7, 0.2)';
        } else {
            statusMessage = `🔄 ${accuracy}% accuracy - Experiment with different coefficient values!`;
            document.getElementById('status').style.background = 'rgba(244, 67, 54, 0.2)';
        }
        
        document.getElementById('status').innerHTML = statusMessage;
        
        // Disable inputs temporarily but keep reset button available
        headCoeffInput.disabled = true;
        bodyCoeffInput.disabled = true;
        legCoeffInput.disabled = true;
        testBtn.disabled = true;
        testBtn.textContent = 'Tested';
    }
    
    // Event listeners
    testBtn.addEventListener('click', testCoefficients);
    resetBtn.addEventListener('click', resetRobots);
    
    // Initialize
    createRobotGrid();
}

function generateRobotFleet() {
    const robots = [];
    
    // True coefficients for the underlying model (hidden from user)
    const trueHeadCoeff = 0.3;
    const trueBodyCoeff = 0.6;
    const trueLegCoeff = 0.4;
    const baseEnergy = 10;
    
    for (let i = 0; i < 1000; i++) {
        // Generate robot physical characteristics between 5-100 inch³
        const headSize = Math.floor(Math.random() * 96) + 5;  // 5-100 inch³
        const bodySize = Math.floor(Math.random() * 96) + 5;  // 5-100 inch³
        const legSize = Math.floor(Math.random() * 96) + 5;   // 5-100 inch³
        
        // Calculate actual energy using the true model
        let actualEnergy = baseEnergy + (trueHeadCoeff * headSize) + (trueBodyCoeff * bodySize) + (trueLegCoeff * legSize);
        
        // Add some noise to make it realistic
        actualEnergy += (Math.random() * 10) - 5; // ±5 noise
        
        // Clamp to reasonable bounds
        actualEnergy = Math.max(25, Math.min(100, Math.round(actualEnergy)));
        
        robots.push({
            id: i + 1,
            headSize: headSize,
            bodySize: bodySize,
            legSize: legSize,
            actualEnergy: actualEnergy,
            isCorrect: false
        });
    }
    
    return robots;
}


function createLevel10() {
    currentLevel = 9;
    const container = document.getElementById('app');
    
    container.innerHTML = `
        <div class="current-level">
            ${createLevelHeader(9, 10, 11)}
            <div class="level-content">
                <div class="level10-layout">
                    <div class="level10-controls">
                        <h3>🎯 Machine Learning Training</h3>
                        <p>Use the training data to find the best coefficients that minimize prediction error!</p>
                        
                        <div class="formula-display">
                            <strong>Energy = </strong>
                            <span class="formula-part">
                                <input type="number" id="headCoeff" step="0.01" value="0.30" class="coeff-input"> × Head Size
                            </span>
                            <span class="formula-part">
                                + <input type="number" id="bodyCoeff" step="0.01" value="0.60" class="coeff-input"> × Body Size
                            </span>
                            <span class="formula-part">
                                + <input type="number" id="legCoeff" step="0.01" value="0.40" class="coeff-input"> × Leg Size
                            </span>
                            <span class="formula-part">
                                + <input type="number" id="biasCoeff" step="0.1" value="10" class="coeff-input"> (bias)
                            </span>
                        </div>
                        
                        <div class="loss-display">
                            <div class="loss-box">
                                <span class="loss-label">Total Loss:</span>
                                <span id="totalLoss" class="loss-value">0.00</span>
                            </div>
                            <div class="loss-box">
                                <span class="loss-label">Average Loss:</span>
                                <span id="avgLoss" class="loss-value">0.00</span>
                            </div>
                        </div>
                        
                        <div class="input-group">
                            <button id="updateBtn" class="action-btn">🔄 Update Predictions</button>
                            <button id="resetBtn" class="reset-btn">↻ Reset Coefficients</button>
                        </div>
                        
                        <div id="status" class="status">💡 Adjust coefficients to minimize the total loss. Target: &lt; 1000</div>
                    </div>
                    
                    <div class="level10-visual">
                        <h4>Training Data with Predictions</h4>
                        <div class="training-spreadsheet-container">
                            <div class="training-spreadsheet-header">
                                <div class="header-cell">Robot</div>
                                <div class="header-cell">Head</div>
                                <div class="header-cell">Body</div>
                                <div class="header-cell">Leg</div>
                                <div class="header-cell">Actual</div>
                                <div class="header-cell">Predicted</div>
                                <div class="header-cell">Loss</div>
                            </div>
                            <div id="trainingSpreadsheet" class="training-spreadsheet-body">
                                <!-- Training data will be populated here -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            ${createStandardNavigation()}
        </div>
    `;
    
    setupLevel10();
}

function setupLevel10() {
    const headCoeffInput = document.getElementById('headCoeff');
    const bodyCoeffInput = document.getElementById('bodyCoeff');
    const legCoeffInput = document.getElementById('legCoeff');
    const biasCoeffInput = document.getElementById('biasCoeff');
    const updateBtn = document.getElementById('updateBtn');
    const resetBtn = document.getElementById('resetBtn');
    const spreadsheet = document.getElementById('trainingSpreadsheet');
    
    // Generate training data (same 50 robots as in story parts)
    const trainingData = generateLevel10TrainingData();
    
    function updatePredictions() {
        const headCoeff = parseFloat(headCoeffInput.value) || 0;
        const bodyCoeff = parseFloat(bodyCoeffInput.value) || 0;
        const legCoeff = parseFloat(legCoeffInput.value) || 0;
        const bias = parseFloat(biasCoeffInput.value) || 0;
        
        let totalLoss = 0;
        
        // Calculate predictions and losses
        trainingData.forEach(robot => {
            robot.predicted = headCoeff * robot.headSize + bodyCoeff * robot.bodySize + legCoeff * robot.legSize + bias;
            robot.predicted = Math.max(0, Math.min(100, robot.predicted)); // Clamp to 0-100
            robot.loss = Math.pow(robot.actualEnergy - robot.predicted, 2); // Squared error
            totalLoss += robot.loss;
        });
        
        const avgLoss = totalLoss / trainingData.length;
        
        // Update display
        document.getElementById('totalLoss').textContent = totalLoss.toFixed(2);
        document.getElementById('avgLoss').textContent = avgLoss.toFixed(2);
        
        // Update spreadsheet
        populateTrainingSpreadsheet(spreadsheet, trainingData);
        
        // Update status - no completion conditions, just feedback
        let statusMessage = '';
        if (totalLoss < 1000) {
            statusMessage = `🎉 Excellent! Total loss: ${totalLoss.toFixed(2)} - Your model is well-trained!`;
            document.getElementById('status').style.background = 'rgba(45, 213, 115, 0.2)';
        } else if (totalLoss < 2000) {
            statusMessage = `👍 Getting closer! Total loss: ${totalLoss.toFixed(2)} - Keep refining the coefficients.`;
            document.getElementById('status').style.background = 'rgba(255, 193, 7, 0.2)';
        } else {
            statusMessage = `🔄 Total loss: ${totalLoss.toFixed(2)} - Try adjusting the coefficients to reduce error.`;
            document.getElementById('status').style.background = 'rgba(244, 67, 54, 0.2)';
        }
        
        document.getElementById('status').innerHTML = statusMessage;
    }
    
    function resetCoefficients() {
        headCoeffInput.value = '0.30';
        bodyCoeffInput.value = '0.60';
        legCoeffInput.value = '0.40';
        biasCoeffInput.value = '10';
        updatePredictions();
    }
    
    // Real-time updates when coefficients change
    [headCoeffInput, bodyCoeffInput, legCoeffInput, biasCoeffInput].forEach(input => {
        input.addEventListener('input', updatePredictions);
    });
    
    // Event listeners
    updateBtn.addEventListener('click', updatePredictions);
    resetBtn.addEventListener('click', resetCoefficients);
    
    // Initialize
    updatePredictions();
}

function generateLevel10TrainingData() {
    const robots = [];
    
    // True underlying model coefficients (what the user should discover)
    const trueHeadCoeff = 0.25;
    const trueBodyCoeff = 0.65;
    const trueLegCoeff = 0.35;
    const trueBias = 8;
    
    for (let i = 0; i < 50; i++) {
        // Generate robot physical characteristics between 5-100 inch³
        const headSize = Math.floor(Math.random() * 96) + 5;  // 5-100 inch³
        const bodySize = Math.floor(Math.random() * 96) + 5;  // 5-100 inch³
        const legSize = Math.floor(Math.random() * 96) + 5;   // 5-100 inch³
        
        // Calculate actual energy using the true model
        let actualEnergy = trueBias + (trueHeadCoeff * headSize) + (trueBodyCoeff * bodySize) + (trueLegCoeff * legSize);
        
        // Add some realistic noise
        actualEnergy += (Math.random() * 6) - 3; // ±3 noise
        
        // Clamp to reasonable bounds
        actualEnergy = Math.max(25, Math.min(100, Math.round(actualEnergy)));
        
        robots.push({
            name: `Robot-${String(i + 1).padStart(3, '0')}`,
            headSize: headSize,
            bodySize: bodySize,
            legSize: legSize,
            actualEnergy: actualEnergy,
            predicted: 0,
            loss: 0
        });
    }
    
    return robots;
}

function populateTrainingSpreadsheet(container, trainingData) {
    container.innerHTML = trainingData.map(robot => `
        <div class="training-spreadsheet-row">
            <div class="data-cell robot-name">${robot.name}</div>
            <div class="data-cell size-value">${robot.headSize}</div>
            <div class="data-cell size-value">${robot.bodySize}</div>
            <div class="data-cell size-value">${robot.legSize}</div>
            <div class="data-cell actual-energy">${robot.actualEnergy}</div>
            <div class="data-cell predicted-energy">${robot.predicted.toFixed(1)}</div>
            <div class="data-cell loss-cell">
                <span class="loss-value ${robot.loss > 100 ? 'high-loss' : robot.loss > 25 ? 'medium-loss' : 'low-loss'}">
                    ${robot.loss.toFixed(1)}
                </span>
            </div>
        </div>
    `).join('');
}