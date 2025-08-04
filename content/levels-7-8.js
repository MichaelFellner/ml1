function createLevel7() {
    currentLevel = 6;
    const container = document.getElementById('app');
    
    // Check if level is already completed
    const isCompleted = levelCompletions.level7;
    const nextBtnState = isCompleted ? '' : 'disabled';
    const nextBtnText = isCompleted ? '✅ Go to Level 8' : '🔒 Complete Level 7 to Continue';
    
    container.innerHTML = `
        <div class="current-level">
            ${createLevelHeader(6, 7, 9)}
            <div class="level-content">
                <div class="visual-section">
                    <h3>Triple Robot Squad</h3>
                    <div class="robot-squad">
                        <div class="robot-unit">
                            <img id="robot1Img" src="${images.robot}" alt="Robot 1" class="squad-robot">
                            <div class="robot-label">Alpha</div>
                        </div>
                        <div class="robot-unit">
                            <img id="robot2Img" src="${images.robot}" alt="Robot 2" class="squad-robot">
                            <div class="robot-label">Beta</div>
                        </div>
                        <div class="robot-unit">
                            <img id="robot3Img" src="${images.robot}" alt="Robot 3" class="squad-robot">
                            <div class="robot-label">Gamma</div>
                        </div>
                    </div>
                </div>
                <div class="controls-section">
                    <div class="robot-controls">
                        <div class="robot-control-group">
                            <label for="robot1Slider">🤖 Alpha Energy:</label>
                            <input type="range" id="robot1Slider" min="0" max="100" value="30" step="1">
                            <div class="energy-display">
                                <div class="energy-bar">
                                    <div id="robot1Fill" class="energy-fill"></div>
                                </div>
                                <span id="robot1Value">30%</span>
                            </div>
                        </div>
                        <div class="robot-control-group">
                            <label for="robot2Slider">🤖 Beta Energy:</label>
                            <input type="range" id="robot2Slider" min="0" max="100" value="30" step="1">
                            <div class="energy-display">
                                <div class="energy-bar">
                                    <div id="robot2Fill" class="energy-fill"></div>
                                </div>
                                <span id="robot2Value">30%</span>
                            </div>
                        </div>
                        <div class="robot-control-group">
                            <label for="robot3Slider">🤖 Gamma Energy:</label>
                            <input type="range" id="robot3Slider" min="0" max="100" value="30" step="1">
                            <div class="energy-display">
                                <div class="energy-bar">
                                    <div id="robot3Fill" class="energy-fill"></div>
                                </div>
                                <span id="robot3Value">30%</span>
                            </div>
                        </div>
                    </div>
                    <div id="status" class="status">🤖 Configure all three robots to their optimal energy levels!</div>
                    <div class="button-container">
                        <button id="prevLevelBtn" class="prev-btn" onclick="createLevel6()">← Back to Level 6</button>
                        <button id="nextLevelBtn" class="next-btn" ${nextBtnState}>${nextBtnText}</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    setupLevel7();
}

function setupLevel7() {
    const robots = [
        {
            slider: document.getElementById('robot1Slider'),
            fill: document.getElementById('robot1Fill'),
            value: document.getElementById('robot1Value'),
            img: document.getElementById('robot1Img'),
            optimal: 25,
            name: 'Alpha'
        },
        {
            slider: document.getElementById('robot2Slider'),
            fill: document.getElementById('robot2Fill'),
            value: document.getElementById('robot2Value'),
            img: document.getElementById('robot2Img'),
            optimal: 60,
            name: 'Beta'
        },
        {
            slider: document.getElementById('robot3Slider'),
            fill: document.getElementById('robot3Fill'),
            value: document.getElementById('robot3Value'),
            img: document.getElementById('robot3Img'),
            optimal: 85,
            name: 'Gamma'
        }
    ];
    
    const nextBtn = document.getElementById('nextLevelBtn');
    
    // Set up click handler if already completed
    if (levelCompletions.level7) {
        nextBtn.onclick = () => createLevel8();
    }
    
    function updateRobotStatus() {
        let allOptimal = true;
        let statusText = '';
        
        robots.forEach(robot => {
            const energy = parseInt(robot.slider.value);
            robot.value.textContent = energy + '%';
            robot.fill.style.width = energy + '%';
            
            if (energy === robot.optimal) {
                robot.img.src = images.robotActive;
                statusText += `✅ ${robot.name} optimal! `;
            } else {
                robot.img.src = images.robot;
                allOptimal = false;
                const diff = Math.abs(energy - robot.optimal);
                statusText += `⚡ ${robot.name}: ${diff} away from optimal. `;
            }
        });
        
        if (allOptimal) {
            document.getElementById('status').innerHTML = '🎯 ALL ROBOTS OPTIMIZED! 🎯';
            document.getElementById('status').style.background = 'rgba(45, 213, 115, 0.2)';
            
            if (!levelCompletions.level7) {
                levelCompletions.level7 = true;
            }
            nextBtn.disabled = false;
            nextBtn.textContent = '✅ Go to Level 8';
            nextBtn.onclick = () => createLevel8();
        } else {
            document.getElementById('status').innerHTML = statusText;
            document.getElementById('status').style.background = 'rgba(255, 255, 255, 0.8)';
            
            // Only disable if not already completed
            if (!levelCompletions.level7) {
                nextBtn.disabled = true;
                nextBtn.textContent = '🔒 Complete Level 7 to Continue';
                nextBtn.onclick = null;
            }
        }
    }
    
    // Add event listeners
    robots.forEach(robot => {
        robot.slider.addEventListener('input', updateRobotStatus);
    });
    
    updateRobotStatus();
}


    
function createLevel8() {
    currentLevel = 7;
    const container = document.getElementById('app');
    
    // Check if level is already completed
    const isCompleted = levelCompletions.level8;
    const nextBtnState = isCompleted ? '' : 'disabled';
    const nextBtnText = isCompleted ? '✅ Continue' : '🔒 Complete Level 8 to Continue';
    
    container.innerHTML = `
        <div class="current-level">
            ${createLevelHeader(7, 8, 9)}
            <div class="level-content">
                <div class="level8-layout">
                    <div class="level8-controls">
                        <label for="energyInput">Set Energy Level (1-100):</label>
                        <div class="input-group">
                            <input type="number" id="energyInput" min="1" max="100" value="75" step="1">
                            <button id="activateBtn" class="action-btn">Activate Robots</button>
                            <button id="resetBtn" class="reset-btn" style="display: none;">Reset</button>
                        </div>
                        <div id="distributionInfo" class="distribution-info">
                            Fleet follows normal distribution (mean: 75, variance: moderate)
                        </div>
                        <div id="status" class="status">Enter an energy level to see how many robots match that configuration!</div>
                        <div class="button-container">
                            <button id="prevLevelBtn" class="prev-btn" onclick="createLevel7()">← Back to Level 7</button>
                            <button id="nextLevelBtn" class="next-btn" ${nextBtnState}>${nextBtnText}</button>
                        </div>
                    </div>
                    <div class="level8-visual">
                        <h3>Robot Fleet Distribution</h3>
                        <div id="robotGrid" class="robot-grid"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    setupLevel8();
}

        
function setupLevel8() {
    const energyInput = document.getElementById('energyInput');
    const activateBtn = document.getElementById('activateBtn');
    const resetBtn = document.getElementById('resetBtn');
    const robotGrid = document.getElementById('robotGrid');
    const nextBtn = document.getElementById('nextLevelBtn');
    
    // Set up click handler if already completed
    if (levelCompletions.level8) {
        nextBtn.onclick = () => createPart5(); // Assuming next part
    }
    
    // Create 625 robot dots (25x25 grid)
    function createRobotGrid() {
        robotGrid.innerHTML = '';
        for (let i = 0; i < 625; i++) {
            const dot = document.createElement('div');
            dot.className = 'robot-dot';
            // No inline styling - let CSS handle the appearance
            robotGrid.appendChild(dot);
        }
    }
    
    // Normal distribution probability density function
    function normalPDF(x, mean, variance) {
        const stdDev = Math.sqrt(variance);
        const coefficient = 1 / (stdDev * Math.sqrt(2 * Math.PI));
        const exponent = -0.5 * Math.pow((x - mean) / stdDev, 2);
        return coefficient * Math.exp(exponent);
    }
    
    function resetRobots() {
        // Reset all dots to default state
        const dots = robotGrid.querySelectorAll('.robot-dot');
        dots.forEach(dot => {
            dot.className = 'robot-dot';
        });
        
        // Re-enable input and activate button
        energyInput.disabled = false;
        activateBtn.disabled = false;
        activateBtn.textContent = 'Activate Robots';
        
        // Hide reset button
        resetBtn.style.display = 'none';
        
        // Reset status
        document.getElementById('status').innerHTML = 'Enter an energy level to see how many robots match that configuration!';
        document.getElementById('status').style.background = 'rgba(255, 255, 255, 0.8)';
    }
    
    function activateRobots() {
        const energyLevel = parseInt(energyInput.value);
        if (energyLevel < 1 || energyLevel > 100) return;
        
        const mean = 75;
        const variance = 1000; // Lower variance (stdDev = 8)
        
        // Calculate probability for this energy level
        const probability = normalPDF(energyLevel, mean, variance);
        
        // Scale to get number of robots (approximate)
        const maxProbability = normalPDF(mean, mean, variance);
        const scaledProbability = probability / maxProbability;
        const numRobots = Math.round(scaledProbability * 200); // Scale to reasonable number
        
        // Debug output
        console.log('Energy Level:', energyLevel);
        console.log('Probability:', probability);
        console.log('Max Probability:', maxProbability);
        console.log('Scaled Probability:', scaledProbability);
        console.log('Number of Robots to activate:', numRobots);
        
        // Reset all dots to inactive
        const dots = robotGrid.querySelectorAll('.robot-dot');
        dots.forEach(dot => {
            dot.className = 'robot-dot inactive';
        });
        
        // Randomly select dots to activate
        const indices = [];
        for (let i = 0; i < 625; i++) {
            indices.push(i);
        }
        
        // Shuffle array and take first numRobots
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        
        // Activate selected dots with glow effect
        for (let i = 0; i < Math.min(numRobots, 625); i++) {
            dots[indices[i]].className = 'robot-dot active';
        }
        
        // Update status
        document.getElementById('status').innerHTML = `
            Energy Level ${energyLevel}: Activated ${numRobots} robots<br>
            <small>Based on normal distribution (mean=75, σ=8)</small>
        `;
        
        // Disable input and show reset button
        energyInput.disabled = true;
        activateBtn.disabled = true;
        activateBtn.textContent = 'Activated';
        resetBtn.style.display = 'block';
        
        // Mark as completed after first use
        if (!levelCompletions.level8) {
            levelCompletions.level8 = true;
            nextBtn.disabled = false;
            nextBtn.textContent = '✅ Continue';
            nextBtn.onclick = () => createPart5(); // Assuming next part exists
        }
    }
    
    // Event listeners
    activateBtn.addEventListener('click', activateRobots);
    resetBtn.addEventListener('click', resetRobots);
    
    energyInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !energyInput.disabled) {
            activateRobots();
        }
    });
    
    // Initialize
    createRobotGrid();
}



function createLevel9() {
    currentLevel = 8;
    const container = document.getElementById('app');
    
    // Check if level is already completed
    const isCompleted = levelCompletions.level9;
    const nextBtnState = isCompleted ? '' : 'disabled';
    const nextBtnText = isCompleted ? '✅ Continue' : '🔒 Find the Right Coefficients to Continue';
    
    container.innerHTML = `
        <div class="current-level">
            ${createLevelHeader(8, 9, 10)}
            <div class="level-content">
                <div class="level9-layout">
                    <div class="level9-controls">
                        <h3>🧮 Energy Prediction Model</h3>
                        <p>Find the right coefficients to predict robot energy levels!</p>
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
                        
                        <div class="button-container">
                            <button id="prevLevelBtn" class="prev-btn" onclick="createLevel8()">← Back to Level 8</button>
                            <button id="nextLevelBtn" class="next-btn" ${nextBtnState}>${nextBtnText}</button>
                        </div>
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
    const nextBtn = document.getElementById('nextLevelBtn');
    
    // Generate the 1000 robots with their characteristics
    const robots = generateRobotFleet();
    
    // Set up click handler if already completed
    if (levelCompletions.level9) {
        nextBtn.onclick = () => createLevel10(); // Or whatever the next level should be
    }
    
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
        
        // Update status
        let statusMessage = '';
        if (accuracy >= 80) {
            statusMessage = `🎉 Excellent! ${accuracy}% accuracy - You've found a great model!`;
            document.getElementById('status').style.background = 'rgba(45, 213, 115, 0.2)';
            
            // Mark as completed
            if (!levelCompletions.level9) {
                levelCompletions.level9 = true;
                nextBtn.disabled = false;
                nextBtn.textContent = '✅ Continue';
                nextBtn.onclick = () => createLevel10(); // Or whatever the next level should be
            }
        } else if (accuracy >= 60) {
            statusMessage = `👍 Good progress! ${accuracy}% accuracy - Try adjusting the coefficients.`;
            document.getElementById('status').style.background = 'rgba(255, 193, 7, 0.2)';
        } else {
            statusMessage = `🔄 Keep trying! ${accuracy}% accuracy - The coefficients need more work.`;
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
    
    // Check if level is already completed
    const isCompleted = levelCompletions.level10;
    const nextBtnState = isCompleted ? '' : 'disabled';
    const nextBtnText = isCompleted ? '✅ Continue' : '🔒 Minimize Loss to Continue';
    
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
                        
                        <div class="button-container">
                            <button id="prevLevelBtn" class="prev-btn" onclick="createLevel9()">← Back to Level 9</button>
                            <button id="nextLevelBtn" class="next-btn" ${nextBtnState}>${nextBtnText}</button>
                        </div>
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
    const nextBtn = document.getElementById('nextLevelBtn');
    
    // Generate training data (same 50 robots as in story parts)
    const trainingData = generateLevel10TrainingData();
    
    // Set up click handler if already completed
    if (levelCompletions.level10) {
        nextBtn.onclick = () => createLevel11(); // Or whatever the next level should be
    }
    
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
        
        // Update status and completion
        let statusMessage = '';
        if (totalLoss < 1000) {
            statusMessage = `🎉 Excellent! Total loss: ${totalLoss.toFixed(2)} - Your model is well-trained!`;
            document.getElementById('status').style.background = 'rgba(45, 213, 115, 0.2)';
            
            if (!levelCompletions.level10) {
                levelCompletions.level10 = true;
                nextBtn.disabled = false;
                nextBtn.textContent = '✅ Continue';
                nextBtn.onclick = () => createLevel11(); // Or whatever the next level should be
            }
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
        nextBtn.onclick = () => createLevel12(); // Or whatever the next level should be
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
                nextBtn.onclick = () => createLevel12(); // Or whatever the next level should be
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