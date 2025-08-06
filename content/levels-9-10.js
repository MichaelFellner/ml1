function createLevel9() {
    currentLevel = 8;
    const container = document.getElementById('app');
    
    container.innerHTML = `
        <div class="current-level">
            ${createLevelHeader ? createLevelHeader(8, 9, 10) : '<div class="level-header"><h2>Level 9: Coefficient Experimentation</h2></div>'}
            <div class="level-content" style="padding: 20px;">
                <div style="display: flex; gap: 20px; align-items: flex-start; justify-content: center;">
                    <!-- Left: Controls -->
                    <div style="width: 320px; flex-shrink: 0;">
                        <div style="
                            background: linear-gradient(135deg, rgba(118,75,162,0.1), rgba(147,51,234,0.05));
                            border-radius: 12px;
                            padding: 18px;
                            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                        ">
                            <h3 style="margin: 0 0 12px 0; color: #333; font-size: 1rem; display: flex; align-items: center; gap: 8px;">
                                <span style="font-size: 1.3rem;">🧮</span> Energy Prediction Model
                            </h3>
                            
                            <p style="font-size: 0.85rem; color: #666; margin-bottom: 15px;">Experiment with coefficients to predict robot energy!</p>
                            
                            <div style="
                                background: linear-gradient(135deg, #764ba2, #667eea);
                                border-radius: 10px;
                                padding: 12px;
                                color: white;
                                margin-bottom: 15px;
                            ">
                                <div style="font-size: 0.9rem; margin-bottom: 10px; font-weight: 500;">Energy = </div>
                                <div style="display: flex; flex-direction: column; gap: 6px;">
                                    <div style="display: flex; align-items: center; gap: 8px;">
                                        <input type="number" id="headCoeff" step="0.1" value="0.5" style="
                                            width: 60px;
                                            padding: 6px;
                                            border: 2px solid rgba(255,255,255,0.3);
                                            border-radius: 4px;
                                            background: rgba(255,255,255,0.2);
                                            color: white;
                                            font-weight: bold;
                                            text-align: center;
                                        ">
                                        <span style="flex: 1;">× Head Size</span>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 8px;">
                                        <span style="width: 15px; text-align: center;">+</span>
                                        <input type="number" id="bodyCoeff" step="0.1" value="0.3" style="
                                            width: 60px;
                                            padding: 6px;
                                            border: 2px solid rgba(255,255,255,0.3);
                                            border-radius: 4px;
                                            background: rgba(255,255,255,0.2);
                                            color: white;
                                            font-weight: bold;
                                            text-align: center;
                                        ">
                                        <span style="flex: 1;">× Body Size</span>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 8px;">
                                        <span style="width: 15px; text-align: center;">+</span>
                                        <input type="number" id="legCoeff" step="0.1" value="0.2" style="
                                            width: 60px;
                                            padding: 6px;
                                            border: 2px solid rgba(255,255,255,0.3);
                                            border-radius: 4px;
                                            background: rgba(255,255,255,0.2);
                                            color: white;
                                            font-weight: bold;
                                            text-align: center;
                                        ">
                                        <span style="flex: 1;">× Leg Size</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div style="display: flex; gap: 8px; margin-bottom: 12px;">
                                <button id="testBtn" style="
                                    flex: 1;
                                    background: linear-gradient(135deg, #667eea, #764ba2);
                                    color: white;
                                    border: none;
                                    border-radius: 6px;
                                    padding: 8px;
                                    font-weight: bold;
                                    cursor: pointer;
                                    transition: all 0.3s ease;
                                    font-size: 0.9rem;
                                ">🧪 Test Model</button>
                                <button id="resetBtn" style="
                                    flex: 1;
                                    background: linear-gradient(135deg, #ff6b6b, #ff8787);
                                    color: white;
                                    border: none;
                                    border-radius: 6px;
                                    padding: 8px;
                                    font-weight: bold;
                                    cursor: pointer;
                                    transition: all 0.3s ease;
                                    font-size: 0.9rem;
                                ">🔄 Reset</button>
                            </div>
                            
                            <div style="
                                background: rgba(255,255,255,0.5);
                                border-radius: 8px;
                                padding: 10px;
                                margin-bottom: 12px;
                            ">
                                <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
                                    <span style="font-size: 1rem;">💡</span>
                                    <strong style="color: #333; font-size: 0.85rem;">Coefficient Tips</strong>
                                </div>
                                <div style="font-size: 0.8rem; color: #666; line-height: 1.3;">
                                    <div>• Larger values = more impact</div>
                                    <div>• Body usually matters most</div>
                                    <div>• Try values between 0-1</div>
                                </div>
                            </div>
                            
                            <div id="status" style="
                                background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7));
                                border: 2px solid #e0e0e0;
                                border-radius: 8px;
                                padding: 10px;
                                text-align: center;
                                font-size: 0.9rem;
                                color: #555;
                                min-height: 50px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                flex-direction: column;
                            ">
                                <div>🎯 Test your model on 1000 robots!</div>
                                <div style="font-size: 0.8rem; color: #888; margin-top: 3px;">Find the best coefficients</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right: Robot Grid -->
                    <div style="width: 380px; flex-shrink: 0;">
                        <div style="
                            background: linear-gradient(135deg, #1a1a2e, #16213e);
                            border-radius: 12px;
                            padding: 18px;
                            box-shadow: 0 8px 24px rgba(0,0,0,0.2);
                        ">
                            <h3 style="
                                margin: 0 0 12px 0;
                                color: white;
                                font-size: 1rem;
                                text-align: center;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                gap: 8px;
                            ">
                                <span style="font-size: 1.2rem;">🤖</span>
                                Fleet Prediction Results
                                <span style="font-size: 1.2rem;">🤖</span>
                            </h3>
                            
                            <!-- Accuracy display -->
                            <div id="predictionStats" style="
                                display: none;
                                justify-content: space-around;
                                margin-bottom: 12px;
                                gap: 12px;
                            ">
                                <div style="
                                    background: rgba(255,255,255,0.1);
                                    border-radius: 8px;
                                    padding: 8px;
                                    text-align: center;
                                    flex: 1;
                                ">
                                    <div id="correctPredictions" style="
                                        font-size: 1.5rem;
                                        font-weight: bold;
                                        color: #ffd93d;
                                    ">0</div>
                                    <div style="font-size: 0.75rem; color: #aaa;">Correct</div>
                                </div>
                                <div style="
                                    background: rgba(255,255,255,0.1);
                                    border-radius: 8px;
                                    padding: 8px;
                                    text-align: center;
                                    flex: 1;
                                ">
                                    <div id="accuracy" style="
                                        font-size: 1.5rem;
                                        font-weight: bold;
                                        color: #6bcf7f;
                                    ">0%</div>
                                    <div style="font-size: 0.75rem; color: #aaa;">Accuracy</div>
                                </div>
                            </div>
                            
                            <div id="robotGrid" style="
                                display: grid;
                                grid-template-columns: repeat(25, 1fr);
                                gap: 3px;
                                padding: 8px;
                                background: rgba(0,0,0,0.3);
                                border-radius: 8px;
                                min-height: 280px;
                            "></div>
                            
                            <div id="gridLegend" style="
                                margin-top: 12px;
                                padding: 8px;
                                background: rgba(255,255,255,0.05);
                                border-radius: 6px;
                                display: none;
                            ">
                                <div style="font-size: 0.8rem; color: #aaa; text-align: center; margin-bottom: 6px;">Prediction Quality</div>
                                <div style="display: flex; justify-content: space-around; align-items: center;">
                                    <div style="text-align: center;">
                                        <div style="
                                            width: 20px;
                                            height: 20px;
                                            background: radial-gradient(circle, rgba(45, 213, 115, 1), rgba(45, 213, 115, 0.6));
                                            border-radius: 50%;
                                            margin: 0 auto 4px;
                                        "></div>
                                        <div style="font-size: 0.75rem; color: #6bcf7f;">Correct</div>
                                    </div>
                                    <div style="text-align: center;">
                                        <div style="
                                            width: 20px;
                                            height: 20px;
                                            background: radial-gradient(circle, rgba(60, 60, 80, 0.4), rgba(40, 40, 60, 0.3));
                                            border-radius: 50%;
                                            margin: 0 auto 4px;
                                        "></div>
                                        <div style="font-size: 0.75rem; color: #666;">Incorrect</div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
    const predictionStats = document.getElementById('predictionStats');
    const gridLegend = document.getElementById('gridLegend');
    
    // Generate the 1000 robots with their characteristics
    const robots = generateRobotFleet();
    
    // Create 625 robot dots with better styling (representing 1000 robots)
    function createRobotGrid() {
        robotGrid.innerHTML = '';
        for (let i = 0; i < 625; i++) {
            const dot = document.createElement('div');
            dot.style.cssText = `
                width: 100%;
                aspect-ratio: 1;
                background: radial-gradient(circle, rgba(100, 100, 120, 0.8), rgba(60, 60, 80, 0.6));
                border-radius: 50%;
                transition: all 0.5s ease;
                transform: scale(0.8);
            `;
            dot.className = 'robot-dot';
            dot.dataset.index = i;
            robotGrid.appendChild(dot);
        }
    }
    
    // Add hover effects for buttons
    testBtn.addEventListener('mouseenter', () => {
        if (!testBtn.disabled) {
            testBtn.style.transform = 'scale(1.05)';
            testBtn.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
        }
    });
    testBtn.addEventListener('mouseleave', () => {
        testBtn.style.transform = 'scale(1)';
        testBtn.style.boxShadow = 'none';
    });
    
    resetBtn.addEventListener('mouseenter', () => {
        resetBtn.style.transform = 'scale(1.05)';
        resetBtn.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.3)';
    });
    resetBtn.addEventListener('mouseleave', () => {
        resetBtn.style.transform = 'scale(1)';
        resetBtn.style.boxShadow = 'none';
    });
    
    function resetRobots() {
        // Reset all dots with animation
        const dots = robotGrid.querySelectorAll('.robot-dot');
        dots.forEach((dot, index) => {
            setTimeout(() => {
                dot.style.background = 'radial-gradient(circle, rgba(100, 100, 120, 0.8), rgba(60, 60, 80, 0.6))';
                dot.style.transform = 'scale(0.8)';
                dot.style.boxShadow = 'none';
            }, index * 0.5);
        });
        
        // Re-enable inputs and test button
        headCoeffInput.disabled = false;
        bodyCoeffInput.disabled = false;
        legCoeffInput.disabled = false;
        testBtn.disabled = false;
        testBtn.textContent = '🧪 Test Model';
        testBtn.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
        
        // Hide stats and legend
        predictionStats.style.display = 'none';
        gridLegend.style.display = 'none';
        
        // Reset status
        document.getElementById('status').innerHTML = `
            <div>🎯 Test your model on 1000 robots!</div>
            <div style="font-size: 0.8rem; color: #888; margin-top: 3px;">Find the best coefficients</div>
        `;
        document.getElementById('status').style.background = 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))';
        document.getElementById('status').style.borderColor = '#e0e0e0';
        
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
        
        // First, set all dots to inactive with subtle effect
        const dots = robotGrid.querySelectorAll('.robot-dot');
        dots.forEach(dot => {
            dot.style.background = 'radial-gradient(circle, rgba(60, 60, 80, 0.4), rgba(40, 40, 60, 0.3))';
            dot.style.transform = 'scale(0.6)';
            dot.style.boxShadow = 'none';
        });
        
        // Map correct predictions to dots
        const correctIndices = [];
        robots.forEach((robot, index) => {
            if (robot.isCorrect) {
                const dotIndex = Math.floor((index / robots.length) * dots.length);
                correctIndices.push(dotIndex);
            }
        });
        
        // Remove duplicates and animate correct predictions
        const uniqueIndices = [...new Set(correctIndices)];
        uniqueIndices.forEach((index, i) => {
            if (dots[index]) {
                setTimeout(() => {
                    const dot = dots[index];
                    
                    // Color based on accuracy level
                    let gradientColor;
                    if (accuracy >= 80) {
                        gradientColor = 'radial-gradient(circle, rgba(45, 213, 115, 1), rgba(45, 213, 115, 0.6))';
                    } else if (accuracy >= 60) {
                        gradientColor = 'radial-gradient(circle, rgba(255, 217, 61, 1), rgba(243, 150, 10, 0.6))';
                    } else {
                        gradientColor = 'radial-gradient(circle, rgba(102, 126, 234, 1), rgba(118, 75, 162, 0.6))';
                    }
                    
                    dot.style.background = gradientColor;
                    dot.style.transform = 'scale(1.1)';
                    dot.style.boxShadow = '0 0 15px rgba(45, 213, 115, 0.5)';
                }, i * 2); // Stagger animations
            }
        });
        
        // Update stats with animation
        setTimeout(() => {
            predictionStats.style.display = 'flex';
            gridLegend.style.display = 'block';
            
            // Animate numbers
            animateNumber('correctPredictions', 0, correctPredictions, 1000);
            animateNumber('accuracy', 0, accuracy, 1000, '%');
        }, 200);
        
        // Update status with color coding
        let statusMessage, statusColor, borderColor;
        if (accuracy >= 80) {
            statusMessage = `🎆 Excellent! ${accuracy}% accuracy!`;
            statusColor = 'linear-gradient(135deg, rgba(45,213,115,0.2), rgba(45,213,115,0.1))';
            borderColor = '#2dd573';
        } else if (accuracy >= 60) {
            statusMessage = `👍 Good work! ${accuracy}% accuracy`;
            statusColor = 'linear-gradient(135deg, rgba(243,150,10,0.2), rgba(243,150,10,0.1))';
            borderColor = '#f3960a';
        } else {
            statusMessage = `🔄 ${accuracy}% accuracy - Keep experimenting!`;
            statusColor = 'linear-gradient(135deg, rgba(147,51,234,0.2), rgba(147,51,234,0.1))';
            borderColor = '#9333ea';
        }
        
        document.getElementById('status').innerHTML = `
            <div style="font-size: 1rem; font-weight: bold; color: #333;">${statusMessage}</div>
            <div style="font-size: 0.8rem; color: #666; margin-top: 3px;">Try adjusting coefficients for better results</div>
        `;
        document.getElementById('status').style.background = statusColor;
        document.getElementById('status').style.borderColor = borderColor;
        
        // Disable inputs temporarily but keep reset button available
        headCoeffInput.disabled = true;
        bodyCoeffInput.disabled = true;
        legCoeffInput.disabled = true;
        testBtn.disabled = true;
        testBtn.textContent = '✅ Tested';
        testBtn.style.background = 'linear-gradient(135deg, #2dd573, #45d88a)';
    }
    
    // Animate number counting
    function animateNumber(elementId, start, end, duration, suffix = '') {
        const element = document.getElementById(elementId);
        const range = end - start;
        const increment = range / (duration / 16); // 60fps
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.round(current) + suffix;
        }, 16);
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