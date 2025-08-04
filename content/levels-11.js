function createLevel11() {
    currentLevel = 10;
    const container = document.getElementById('app');
    
    // Check if level is already completed
    const isCompleted = levelCompletions.level11;
    const nextBtnState = isCompleted ? '' : 'disabled';
    const nextBtnText = isCompleted ? '✅ Continue' : '🔒 Minimize Loss with Gradient Descent';
    
    container.innerHTML = `
        <div class="current-level">
            <div class="level-header">
    Level 11/12: Gradient Descent Training
    <div class="level-description">Use gradient descent to automatically optimize coefficients</div>
</div>
            <div class="level-content">
                <div class="level11-layout">
                    <div class="level11-controls">
                        <h3>🚀 Gradient Descent Training</h3>
                        <p>Let the algorithm automatically find the best coefficients using gradient descent!</p>
                        
                        <div class="formula-display">
                            <strong>Energy = </strong>
                            <span class="formula-part">
                                <span id="headCoeffDisplay" class="coeff-display">0.30</span> × Head Size
                            </span>
                            <span class="formula-part">
                                + <span id="bodyCoeffDisplay" class="coeff-display">0.60</span> × Body Size
                            </span>
                            <span class="formula-part">
                                + <span id="legCoeffDisplay" class="coeff-display">0.40</span> × Leg Size
                            </span>
                            <span class="formula-part">
                                + <span id="biasDisplay" class="coeff-display">10.0</span> (bias)
                            </span>
                        </div>
                        
                        <div class="gradient-controls">
                            <div class="learning-rate-section">
    <label>Learning Rate:</label>
    <div class="learning-rate-options">
        <label class="radio-option">
            <input type="radio" name="learningRate" value="1" checked>
            <span>1.0 (Very Fast)</span>
        </label>
        <label class="radio-option">
            <input type="radio" name="learningRate" value="0.1">
            <span>0.1 (Fast)</span>
        </label>
        <label class="radio-option">
            <input type="radio" name="learningRate" value="0.01">
            <span>0.01 (Medium)</span>
        </label>
        <label class="radio-option">
            <input type="radio" name="learningRate" value="0.001">
            <span>0.001 (Slow)</span>
        </label>
        <label class="radio-option">
            <input type="radio" name="learningRate" value="0.0001">
            <span>0.0001 (Very Slow)</span>
        </label>
    </div>
</div>
                            </div>
                            
                            <div class="step-info">
                                <span>Step: <span id="stepCount">0</span></span>
                            </div>
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
                            <button id="gradientStepBtn" class="action-btn">📉 Take Gradient Step</button>
                            <button id="resetBtn" class="reset-btn">↻ Reset Training</button>
                        </div>
                        
                        <div id="status" class="status">🎯 Use gradient descent to minimize loss. Target: &lt; 500</div>
                        
                        <div class="button-container">
                            <button id="prevLevelBtn" class="prev-btn" onclick="createLevel10()">← Back to Level 10</button>
                            <button id="nextLevelBtn" class="next-btn" ${nextBtnState}>${nextBtnText}</button>
                        </div>
                    </div>
                    
                    <div class="level11-visual">
                        <h4>Training Progress</h4>
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
        </div>
    `;
    
    setupLevel11();
}

function setupLevel11() {
    const gradientStepBtn = document.getElementById('gradientStepBtn');
    const resetBtn = document.getElementById('resetBtn');
    const spreadsheet = document.getElementById('trainingSpreadsheet');
    const nextBtn = document.getElementById('nextLevelBtn');
    
    // Training data and TensorFlow variables
    let trainingData = [];
    let coefficients = null;
    let features = null;
    let targets = null;
    let stepCount = 0;
    
    // Set up click handler if already completed
    if (levelCompletions.level11) {
        nextBtn.onclick = () => createStoryPart7(); // Or whatever the next level should be
    }
    
    function initializeTensorFlow() {
        // Generate training data
        trainingData = generateLevel11TrainingData();
        
        // Initialize coefficients as TensorFlow variables
        coefficients = {
            head: tf.variable(tf.scalar(0.3)),
            body: tf.variable(tf.scalar(0.6)),
            leg: tf.variable(tf.scalar(0.4)),
            bias: tf.variable(tf.scalar(10.0))
        };
        
        // Convert training data to tensors
        const headSizes = trainingData.map(robot => robot.headSize);
        const bodySizes = trainingData.map(robot => robot.bodySize);
        const legSizes = trainingData.map(robot => robot.legSize);
        const energies = trainingData.map(robot => robot.actualEnergy);
        
        features = {
            head: tf.tensor1d(headSizes),
            body: tf.tensor1d(bodySizes),
            leg: tf.tensor1d(legSizes)
        };
        
        targets = tf.tensor1d(energies);
        
        stepCount = 0;
        updateDisplay();
    }
    
    function getLearningRate() {
        const selectedRate = document.querySelector('input[name="learningRate"]:checked').value;
        return parseFloat(selectedRate);
    }
    
    function takeGradientStep() {
        const learningRate = getLearningRate();
        
        // Perform gradient descent step using TensorFlow.js
        const optimizer = tf.train.sgd(learningRate);
        
        const cost = () => {
            // Forward pass: predictions = head_coeff * head + body_coeff * body + leg_coeff * leg + bias
            const predictions = coefficients.head.mul(features.head)
                .add(coefficients.body.mul(features.body))
                .add(coefficients.leg.mul(features.leg))
                .add(coefficients.bias);
            
            // Mean squared error loss
            const loss = tf.losses.meanSquaredError(targets, predictions);
            return loss;
        };
        
        // Take one optimization step
        optimizer.minimize(cost);
        
        stepCount++;
        updateDisplay();
        
        // Clean up optimizer
        optimizer.dispose();
    }
    
    function updateDisplay() {
        // Get current coefficient values
        const headCoeff = coefficients.head.dataSync()[0];
        const bodyCoeff = coefficients.body.dataSync()[0];
        const legCoeff = coefficients.leg.dataSync()[0];
        const bias = coefficients.bias.dataSync()[0];
        
        // Update coefficient displays
        document.getElementById('headCoeffDisplay').textContent = headCoeff.toFixed(3);
        document.getElementById('bodyCoeffDisplay').textContent = bodyCoeff.toFixed(3);
        document.getElementById('legCoeffDisplay').textContent = legCoeff.toFixed(3);
        document.getElementById('biasDisplay').textContent = bias.toFixed(1);
        document.getElementById('stepCount').textContent = stepCount;
        
        // Calculate predictions and update training data
        let totalLoss = 0;
        
        trainingData.forEach(robot => {
            robot.predicted = headCoeff * robot.headSize + bodyCoeff * robot.bodySize + legCoeff * robot.legSize + bias;
            robot.predicted = Math.max(0, Math.min(100, robot.predicted)); // Clamp to 0-100
            robot.loss = Math.pow(robot.actualEnergy - robot.predicted, 2); // Squared error
            totalLoss += robot.loss;
        });
        
        const avgLoss = totalLoss / trainingData.length;
        
        // Update loss display
        document.getElementById('totalLoss').textContent = totalLoss.toFixed(2);
        document.getElementById('avgLoss').textContent = avgLoss.toFixed(2);
        
        // Update spreadsheet
        populateTrainingSpreadsheet(spreadsheet, trainingData);
        
        // Update status and completion
        let statusMessage = '';
        if (totalLoss < 500) {
            statusMessage = `🎉 Excellent! Loss: ${totalLoss.toFixed(2)} in ${stepCount} steps - Gradient descent worked!`;
            document.getElementById('status').style.background = 'rgba(45, 213, 115, 0.2)';
            
            if (!levelCompletions.level11) {
                levelCompletions.level11 = true;
                nextBtn.disabled = false;
                nextBtn.textContent = '✅ Continue';
                nextBtn.onclick = () => createStoryPart7(); // Or whatever the next level should be
            }
        } else if (totalLoss < 1000) {
            statusMessage = `👍 Progress! Loss: ${totalLoss.toFixed(2)} after ${stepCount} steps - Keep going!`;
            document.getElementById('status').style.background = 'rgba(255, 193, 7, 0.2)';
        } else {
            statusMessage = `📉 Loss: ${totalLoss.toFixed(2)} after ${stepCount} steps - Try different learning rates!`;
            document.getElementById('status').style.background = 'rgba(244, 67, 54, 0.2)';
        }
        
        document.getElementById('status').innerHTML = statusMessage;
    }
    
    function resetTraining() {
        // Dispose of existing tensors
        if (coefficients) {
            Object.values(coefficients).forEach(coeff => coeff.dispose());
            Object.values(features).forEach(feature => feature.dispose());
            targets.dispose();
        }
        
        // Reinitialize
        initializeTensorFlow();
    }
    
    // Event listeners
    gradientStepBtn.addEventListener('click', takeGradientStep);
    resetBtn.addEventListener('click', resetTraining);
    
    // Initialize
    initializeTensorFlow();
}

function generateLevel11TrainingData() {
    const robots = [];
    
    // True underlying model coefficients (what gradient descent should discover)
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