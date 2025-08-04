// gradient-descent-parts.js - Updated with parabola function (x-5)^2

// Function definitions for parabola (x-5)^2
function calculateY(x) {
    return Math.pow(x - 5, 2);
}

function calculateGradient(x) {
    return 2 * (x - 5);
}

// Shared state
let gradientState = {
    currentX: 0.0,
    stepInput: 0,
    showArrow: false
};

// =============================================================================
// PART 1: MANUAL FUNCTION EXPLORATION
// =============================================================================

function createGradientDescentPart1() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-header">Understanding Functions - Part 1: Finding the Minimum</div>
            <div class="level-content gradient-descent-demo">
                <div class="demo-explanation">
                    <h3>Goal: Reach the Minimum of the Parabola</h3>
                    <p>Your goal is to reach the minimum of the function <strong>f(x) = (x - 5)²</strong>. 
                    Take steps left or right to get your dot as close as possible to the bottom of the curve!</p>
                </div>
                
                <div class="demo-container">
                    <div class="graph-section">
                        <div class="function-display">
                            <div class="current-values">
                                <div>Current x: <span id="currentX">0.0</span></div>
                                <div>Function value: <span id="functionValue">25.0</span></div>
                            </div>
                        </div>
                        
                        <canvas id="gradientCanvas" width="500" height="300"></canvas>
                        
                        
                    </div>
                    
                    <div class="controls-section">
                        <div class="step-section">
                            <h4>Move Along the Function</h4>
                            <div class="step-controls">
                                <label for="stepInput">Step size (+ moves right, - moves left):</label>
                                <div class="step-input-row">
                                    <input type="number" id="stepInput" placeholder="0" step="0.1" value="0">
                                    <button id="takeStepBtn" class="action-btn" disabled>→ Take Step</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <button class="prev-btn" onclick="createIntroduction()">‹</button>
            <button class="next-btn" onclick="createGradientDescentPart2()">›</button>
        </div>
    `;
    
    setupGradientPart1();
}

function setupGradientPart1() {
    const canvas = document.getElementById('gradientCanvas');
    const stepInput = document.getElementById('stepInput');
    const takeStepBtn = document.getElementById('takeStepBtn');
    
    // Initialize state
    gradientState.currentX = 0.0;
    gradientState.stepInput = 0;
    gradientState.showArrow = false;
    
    function updateDisplay() {
        const functionValue = calculateY(gradientState.currentX);
        
        // Safely update display elements
        const currentXEl = document.getElementById('currentX');
        const functionValueEl = document.getElementById('functionValue');
        const takeStepBtnEl = document.getElementById('takeStepBtn');
        
        if (currentXEl) currentXEl.textContent = gradientState.currentX.toFixed(1);
        if (functionValueEl) functionValueEl.textContent = functionValue.toFixed(1);
        
        // Update step preview
        if (gradientState.stepInput !== 0) {
            const newX = gradientState.currentX + gradientState.stepInput;
            const newFunctionValue = calculateY(newX);
            
            gradientState.showArrow = true;
            if (takeStepBtnEl) takeStepBtnEl.disabled = false;
        } else {
            gradientState.showArrow = false;
            if (takeStepBtnEl) takeStepBtnEl.disabled = true;
        }
    }
    
    function drawGraph() {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const xMin = -2, xMax = 12, yMin = 0, yMax = 30;
        const xScale = canvas.width / (xMax - xMin);
        const yScale = canvas.height / (yMax - yMin);
        
        function toCanvasX(x) { return (x - xMin) * xScale; }
        function toCanvasY(y) { return canvas.height - (y - yMin) * yScale; }
        
        // Draw axes
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(toCanvasX(xMin), toCanvasY(0));
        ctx.lineTo(toCanvasX(xMax), toCanvasY(0));
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(toCanvasX(0), toCanvasY(yMin));
        ctx.lineTo(toCanvasX(0), toCanvasY(yMax));
        ctx.stroke();
        
        // Draw parabola function (x-5)^2
        ctx.strokeStyle = '#2ed573';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let x = xMin; x <= xMax; x += 0.1) {
            const y = calculateY(x);
            if (y <= yMax) {
                if (x === xMin) {
                    ctx.moveTo(toCanvasX(x), toCanvasY(y));
                } else {
                    ctx.lineTo(toCanvasX(x), toCanvasY(y));
                }
            }
        }
        ctx.stroke();
        
        // Draw current position dot on the curve
        const currentY = calculateY(gradientState.currentX);
        ctx.fillStyle = '#ff6b6b';
        ctx.beginPath();
        ctx.arc(toCanvasX(gradientState.currentX), toCanvasY(currentY), 8, 0, 2 * Math.PI);
        ctx.fill();
        
        // Draw arrow if step is planned
        if (gradientState.showArrow && gradientState.stepInput !== 0) {
            const newX = gradientState.currentX + gradientState.stepInput;
            const newY = calculateY(newX);
            
            if (newX >= xMin && newX <= xMax && newY <= yMax) {
                // Draw curved arrow following the function
                ctx.strokeStyle = '#667eea';
                ctx.lineWidth = 3;
                ctx.beginPath();
                
                // Draw a series of small line segments to approximate the curve
                const steps = Math.abs(gradientState.stepInput) * 20;
                const stepSize = gradientState.stepInput / steps;
                
                for (let i = 0; i <= steps; i++) {
                    const x = gradientState.currentX + i * stepSize;
                    const y = calculateY(x);
                    
                    if (i === 0) {
                        ctx.moveTo(toCanvasX(x), toCanvasY(y));
                    } else {
                        ctx.lineTo(toCanvasX(x), toCanvasY(y));
                    }
                }
                ctx.stroke();
                
                // Arrow head at the end
                if (Math.abs(gradientState.stepInput) > 0.1) {
                    const direction = newX > gradientState.currentX ? 1 : -1;
                    const gradient = calculateGradient(newX);
                    const angle = Math.atan(gradient * yScale / xScale);
                    
                    ctx.save();
                    ctx.translate(toCanvasX(newX), toCanvasY(newY));
                    ctx.rotate(angle);
                    
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(-direction * 15, -8);
                    ctx.lineTo(-direction * 15, 8);
                    ctx.closePath();
                    ctx.fillStyle = '#667eea';
                    ctx.fill();
                    ctx.restore();
                }
                
                // Draw preview dot
                ctx.fillStyle = '#667eea';
                ctx.beginPath();
                ctx.arc(toCanvasX(newX), toCanvasY(newY), 6, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
        
        // Labels
        ctx.fillStyle = '#333';
        ctx.font = '14px Arial';
        ctx.fillText(`Current: (${gradientState.currentX.toFixed(1)}, ${currentY.toFixed(1)})`, 
                    toCanvasX(gradientState.currentX) + 10, toCanvasY(currentY) - 15);
        
        // Mark the minimum point
        ctx.fillStyle = '#2ed573';
        ctx.font = '16px Arial';
        ctx.fillText('MINIMUM: (5, 0)', toCanvasX(5) + 10, toCanvasY(5));
        
        // Draw a small circle at the minimum
        ctx.strokeStyle = '#2ed573';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(toCanvasX(5), toCanvasY(0), 6, 0, 2 * Math.PI);
        ctx.stroke();
        
        // Grid lines
        ctx.strokeStyle = '#f0f0f0';
        ctx.lineWidth = 1;
        for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x += 2) {
            ctx.beginPath();
            ctx.moveTo(toCanvasX(x), toCanvasY(yMin));
            ctx.lineTo(toCanvasX(x), toCanvasY(yMax));
            ctx.stroke();
        }
        for (let y = 0; y <= yMax; y += 5) {
            ctx.beginPath();
            ctx.moveTo(toCanvasX(xMin), toCanvasY(y));
            ctx.lineTo(toCanvasX(xMax), toCanvasY(y));
            ctx.stroke();
        }
    }
    
    // Step input handling
    stepInput.addEventListener('input', () => {
        gradientState.stepInput = parseFloat(stepInput.value) || 0;
        updateDisplay();
        drawGraph();
    });
    
    // Take step
    takeStepBtn.addEventListener('click', () => {
        const oldValue = calculateY(gradientState.currentX);
        gradientState.currentX += gradientState.stepInput;
        const newValue = calculateY(gradientState.currentX);
        
        // Reset step input
        stepInput.value = '0';
        gradientState.stepInput = 0;
        gradientState.showArrow = false;
        
        updateDisplay();
        drawGraph();
    });
    
    updateDisplay();
    drawGraph();
}

// =============================================================================
// PART 3: COMPLEX FUNCTION OPTIMIZATION
// =============================================================================

function createGradientDescentPart3() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-header">Advanced Challenge - Part 3: Finding the Deep Minimum</div>
            <div class="level-content gradient-descent-demo">
                <div class="demo-explanation">
                    <h3>Find the Global Minimum of a Complex Function</h3>
                   
                </div>
                
                <div class="demo-container complex-function">
                    <div class="value-display">
                        <div class="current-x">x = <span id="currentX">0.0</span></div>
                        <div class="current-loss">Loss: <span id="functionValue">236.8M</span></div>
                        <div class="restart-area">
                            <button id="resetBtn" class="reset-btn">🔄 Random Start</button>
                        </div>
                    </div>
                    
                    <div class="controls-wrapper">
                        <div class="manual-section">
                            <h4>Manual Guessing</h4>
                            <div class="guess-controls">
                                <label for="guessInput">Guess an x value:</label>
                                <div class="guess-input-row">
                                    <input type="number" id="guessInput" placeholder="Enter x value" step="0.1">
                                    <button id="submitGuessBtn" class="action-btn">📍 Test Guess</button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="gradient-section">
                            <h4>Gradient Descent</h4>
                            <div class="gradient-info">
                                <div>Current Gradient: <span id="currentGradient">-30778</span></div>
                            </div>
                            <div class="lr-button-group">
                                <button class="lr-btn" data-lr="1.0">1.0 (Large Steps)</button>
                                <button class="lr-btn" data-lr="0.1">0.1 (Medium Steps)</button>
                                <button class="lr-btn" data-lr="0.01">0.01 (Small Steps)</button>
                            </div>
                            <button id="takeStepBtn" class="action-btn" disabled>🎯 Take Gradient Step</button>
                        </div>
                        
                   
                    </div>
                </div>
            </div>
            
            <button class="prev-btn" onclick="createGradientDescentPart2()">‹</button>
            <button class="next-btn" onclick="createIntroduction()">📚 Back to Start</button>
        </div>
        
        <style>
            .complex-function {
                max-width: 800px;
                margin: 0 auto;
            }
            
            .value-display {
                text-align: center;
                margin: 30px 0;
                padding: 30px;
                background: linear-gradient(135deg, #667eea, #764ba2);
                border-radius: 15px;
                color: white;
            }
            
            .current-x {
                font-size: 2.5em;
                font-weight: bold;
                margin-bottom: 15px;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            }
            
            .current-loss {
                font-size: 4em;
                font-weight: bold;
                text-shadow: 3px 3px 6px rgba(0,0,0,0.4);
                margin-bottom: 20px;
            }
            
            .restart-area {
                margin-top: 20px;
                text-align: center;
            }
            
            .reset-btn {
                background: rgba(255, 255, 255, 0.2);
                color: white;
                border: 2px solid rgba(255, 255, 255, 0.5);
                padding: 12px 24px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
                transition: all 0.2s;
                backdrop-filter: blur(5px);
            }
            
            .reset-btn:hover {
                background: rgba(255, 255, 255, 0.3);
                border-color: rgba(255, 255, 255, 0.8);
                transform: translateY(-2px);
            }
            
            .controls-wrapper {
                display: flex;
                flex-direction: column;
                gap: 20px;
                margin: 30px 0;
            }
            
            .manual-section, .gradient-section {
                background: #f8f9fa;
                padding: 25px;
                border-radius: 10px;
                border: 2px solid #e9ecef;
            }
            
            .guess-input-row {
                display: flex;
                gap: 10px;
                margin-top: 10px;
            }
            
            .guess-input-row input {
                flex: 1;
                padding: 12px;
                border: 2px solid #ddd;
                border-radius: 6px;
                font-size: 16px;
            }
            
            .gradient-info {
                margin: 15px 0;
                font-size: 16px;
                font-weight: bold;
                color: #495057;
            }
            
            .lr-button-group {
                display: flex;
                gap: 10px;
                margin: 15px 0;
                flex-wrap: wrap;
            }
            
            .lr-btn {
                flex: 1;
                min-width: 120px;
                padding: 10px;
                border: 2px solid #6c757d;
                background: white;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.2s;
                font-size: 14px;
            }
            
            .lr-btn:hover {
                background: #e9ecef;
            }
            
            .lr-btn.active {
                background: #007bff;
                color: white;
                border-color: #0056b3;
            }
            
            .action-btn {
                background: #28a745;
                color: white;
                border: none;
                padding: 12px 20px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
                transition: background 0.2s;
                margin: 5px;
            }
            
            .action-btn:hover:not(:disabled) {
                background: #218838;
            }
            
            .action-btn:disabled {
                background: #6c757d;
                cursor: not-allowed;
            }
            
            .best-found {
                margin-top: 20px;
                font-size: 18px;
                font-weight: bold;
                color: #007bff;
                padding: 15px;
                background: white;
                border-radius: 8px;
                border: 2px solid #007bff;
            }
        </style>
    `;
    
    setupGradientPart3();
}

function setupGradientPart3() {
    const guessInput = document.getElementById('guessInput');
    const submitGuessBtn = document.getElementById('submitGuessBtn');
    const lrButtons = document.querySelectorAll('.lr-btn');
    const takeStepBtn = document.getElementById('takeStepBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    // Initialize state with higher precision
    gradientState.currentX = 0.0000;
    gradientState.selectedLR = null;
    
    function roundToPrecision(num) {
        return Math.round(num * 10000) / 10000; // Round to 4 decimal places
    }
    
    function formatLargeNumber(num) {
        if (Math.abs(num) >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (Math.abs(num) >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        } else {
            return num.toFixed(1);
        }
    }
    
    function updateDisplay() {
        const functionValue = calculateComplexY(gradientState.currentX);
        const gradient = calculateComplexGradient(gradientState.currentX);
        
        // Update main display with higher precision
        document.getElementById('currentX').textContent = gradientState.currentX.toFixed(4);
        document.getElementById('functionValue').textContent = formatLargeNumber(functionValue);
        document.getElementById('currentGradient').textContent = gradient.toFixed(2);
        
        // Color the loss display based on how good it is
        const lossElement = document.getElementById('functionValue');
        if (functionValue < 100) {
            lossElement.style.color = '#00ff00'; // Bright green for very good (close to minimum)
        } else if (functionValue < 10000) {
            lossElement.style.color = '#90EE90'; // Light green for good
        } else if (functionValue < 1000000) {
            lossElement.style.color = '#FFFF99'; // Yellow for okay
        } else {
            lossElement.style.color = 'white'; // White for poor
        }
    }
    
    // Manual guess handling
    submitGuessBtn.addEventListener('click', () => {
        const guessValue = parseFloat(guessInput.value);
        if (!isNaN(guessValue)) {
            gradientState.currentX = roundToPrecision(guessValue);
            updateDisplay();
            guessInput.value = '';
        }
    });
    
    // Enter key for guess input
    guessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitGuessBtn.click();
        }
    });
    
    // Learning rate button handlers
    lrButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            lrButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const lr = parseFloat(btn.dataset.lr);
            gradientState.selectedLR = lr;
            
            takeStepBtn.disabled = false;
        });
    });
    
    // Take gradient step
    takeStepBtn.addEventListener('click', () => {
        if (gradientState.selectedLR !== null) {
            const gradient = calculateComplexGradient(gradientState.currentX);
            const step = -gradientState.selectedLR * gradient;
            
            // Apply step with high precision
            gradientState.currentX = roundToPrecision(gradientState.currentX + step);
            
            updateDisplay();
        }
    });
    
    // Reset to random position
    resetBtn.addEventListener('click', () => {
        gradientState.currentX = roundToPrecision(Math.random() * 40000 - 20000); // Random between -20000 and 20000
        updateDisplay();
    });
    
    // Initialize display
    updateDisplay();
}

// Function definitions for complex function in Part 3
function calculateComplexY(x) {
    return Math.pow(x - 15389, 2);
}

function calculateComplexGradient(x) {
    return 2 * (x - 15389);
}

// =============================================================================
// PART 2: GRADIENT DESCENT TO REACH MINIMUM
// =============================================================================

function createGradientDescentPart2() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-header">Understanding Gradient Descent - Part 2: Automatic Minimum Finding</div>
            <div class="level-content gradient-descent-demo">
                <div class="demo-explanation">
                    <h3>Gradient Descent Finds the Minimum Automatically</h3>
                    <p>Now instead of choosing your own steps, let gradient descent automatically calculate 
                    how to reach the minimum of <strong>f(x) = (x - 5)²</strong>! Try different learning rates to see how they affect convergence.</p>
                </div>
                
                <div class="demo-container">
                    <div class="graph-section">
                        <div class="function-display">
                            <div class="current-values">
                                <div>Current x: <span id="currentX">0.0</span></div>
                                <div>Function value: <span id="functionValue">25.0</span></div>
                                <div>Gradient: <span id="currentGradient">-10.0</span></div>
                            </div>
                        </div>
                        
                        <canvas id="gradientCanvas" width="500" height="300"></canvas>
                        
                    </div>
                    
                    <div class="controls-section">
                        <div class="lr-section">
                            <h4>Choose learning rate for gradient descent</h4>
                            <div class="lr-button-group">
                                <button class="lr-btn" data-lr="1.0">1.0 (Large Steps)</button>
                                <button class="lr-btn" data-lr="0.1">0.1 (Medium Steps)</button>
                                <button class="lr-btn" data-lr="0.01">0.01 (Small Steps)</button>
                            </div>
                            <div id="stepCalculation" class="step-calculation"></div>
                            <button id="takeStepBtn" class="action-btn" disabled>→ Take Step</button>
                        </div>
                        
                        <div class="reset-controls">
                            <button id="resetBtn" class="action-btn">🔄 Reset Position</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <button class="prev-btn" onclick="createGradientDescentPart1()">‹</button>
            <button class="next-btn" onclick="createGradientDescentPart3()">›</button>
        </div>
    `;
    
    setupGradientPart2();
}

function setupGradientPart2() {
    const canvas = document.getElementById('gradientCanvas');
    const lrButtons = document.querySelectorAll('.lr-btn');
    const takeStepBtn = document.getElementById('takeStepBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    // Initialize state
    gradientState.currentX = 0.0;
    gradientState.selectedLR = null;
    gradientState.calculatedStep = 0;
    gradientState.showArrow = false;
    
    function updateDisplay() {
        const functionValue = calculateY(gradientState.currentX);
        const gradient = calculateGradient(gradientState.currentX);
        
        // Safely update display elements
        const currentXEl = document.getElementById('currentX');
        const functionValueEl = document.getElementById('functionValue');
        const gradientEl = document.getElementById('currentGradient');
        
        if (currentXEl) currentXEl.textContent = gradientState.currentX.toFixed(1);
        if (functionValueEl) functionValueEl.textContent = functionValue.toFixed(1);
        if (gradientEl) gradientEl.textContent = gradient.toFixed(1);
    }
    
    function drawGraph() {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const xMin = -2, xMax = 12, yMin = 0, yMax = 30;
        const xScale = canvas.width / (xMax - xMin);
        const yScale = canvas.height / (yMax - yMin);
        
        function toCanvasX(x) { return (x - xMin) * xScale; }
        function toCanvasY(y) { return canvas.height - (y - yMin) * yScale; }
        
        // Draw axes
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(toCanvasX(xMin), toCanvasY(0));
        ctx.lineTo(toCanvasX(xMax), toCanvasY(0));
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(toCanvasX(0), toCanvasY(yMin));
        ctx.lineTo(toCanvasX(0), toCanvasY(yMax));
        ctx.stroke();
        
        // Draw parabola function (x-5)^2
        ctx.strokeStyle = '#2ed573';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let x = xMin; x <= xMax; x += 0.1) {
            const y = calculateY(x);
            if (y <= yMax) {
                if (x === xMin) {
                    ctx.moveTo(toCanvasX(x), toCanvasY(y));
                } else {
                    ctx.lineTo(toCanvasX(x), toCanvasY(y));
                }
            }
        }
        ctx.stroke();
        
        // Draw current position dot on the curve
        const currentY = calculateY(gradientState.currentX);
        ctx.fillStyle = '#ff6b6b';
        ctx.beginPath();
        ctx.arc(toCanvasX(gradientState.currentX), toCanvasY(currentY), 8, 0, 2 * Math.PI);
        ctx.fill();
        
        // Draw arrow if learning rate is selected
        if (gradientState.showArrow && gradientState.selectedLR !== null) {
            const gradient = calculateGradient(gradientState.currentX);
            const step = -gradientState.selectedLR * gradient;
            const newX = gradientState.currentX + step;
            const newY = calculateY(newX);
            
            if (newX >= xMin && newX <= xMax && newY <= yMax) {
                // Draw curved arrow following the function
                ctx.strokeStyle = '#667eea';
                ctx.lineWidth = 3;
                ctx.beginPath();
                
                // Draw a series of small line segments to approximate the curve
                const steps = Math.abs(step) * 20;
                const stepSize = step / Math.max(steps, 1);
                
                for (let i = 0; i <= steps; i++) {
                    const x = gradientState.currentX + i * stepSize;
                    const y = calculateY(x);
                    
                    if (i === 0) {
                        ctx.moveTo(toCanvasX(x), toCanvasY(y));
                    } else {
                        ctx.lineTo(toCanvasX(x), toCanvasY(y));
                    }
                }
                ctx.stroke();
                
                // Arrow head at the end
                if (Math.abs(step) > 0.1) {
                    const direction = newX > gradientState.currentX ? 1 : -1;
                    const gradientAtEnd = calculateGradient(newX);
                    const angle = Math.atan(gradientAtEnd * yScale / xScale);
                    
                    ctx.save();
                    ctx.translate(toCanvasX(newX), toCanvasY(newY));
                    ctx.rotate(angle);
                    
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(-direction * 15, -8);
                    ctx.lineTo(-direction * 15, 8);
                    ctx.closePath();
                    ctx.fillStyle = '#667eea';
                    ctx.fill();
                    ctx.restore();
                }
                
                // Draw preview dot
                ctx.fillStyle = '#667eea';
                ctx.beginPath();
                ctx.arc(toCanvasX(newX), toCanvasY(newY), 6, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
        
        // Labels
        ctx.fillStyle = '#333';
        ctx.font = '14px Arial';
        ctx.fillText(`Current: (${gradientState.currentX.toFixed(1)}, ${currentY.toFixed(1)})`, 
                    toCanvasX(gradientState.currentX) + 10, toCanvasY(currentY) - 15);
        
        // Mark the minimum point
        ctx.fillStyle = '#2ed573';
        ctx.font = '16px Arial';
        ctx.fillText('MINIMUM: (5, 0)', toCanvasX(5) + 10, toCanvasY(5));
        
        // Draw a small circle at the minimum
        ctx.strokeStyle = '#2ed573';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(toCanvasX(5), toCanvasY(0), 6, 0, 2 * Math.PI);
        ctx.stroke();
        
        // Draw gradient direction indicator
        const gradient = calculateGradient(gradientState.currentX);
        if (Math.abs(gradient) > 0.1) {
            ctx.fillStyle = '#ff6b6b';
            ctx.font = '12px Arial';
            const direction = gradient > 0 ? 'upward slope →' : 'downward slope ←';
            ctx.fillText(`Gradient: ${gradient.toFixed(1)} (${direction})`, 
                        toCanvasX(gradientState.currentX) + 10, toCanvasY(currentY) + 25);
        }
        
        // Grid lines
        ctx.strokeStyle = '#f0f0f0';
        ctx.lineWidth = 1;
        for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x += 2) {
            ctx.beginPath();
            ctx.moveTo(toCanvasX(x), toCanvasY(yMin));
            ctx.lineTo(toCanvasX(x), toCanvasY(yMax));
            ctx.stroke();
        }
        for (let y = 0; y <= yMax; y += 5) {
            ctx.beginPath();
            ctx.moveTo(toCanvasX(xMin), toCanvasY(y));
            ctx.lineTo(toCanvasX(xMax), toCanvasY(y));
            ctx.stroke();
        }
    }
    
    function updateStepCalculation() {
        if (gradientState.selectedLR !== null) {
            const gradient = calculateGradient(gradientState.currentX);
            const step = -gradientState.selectedLR * gradient;
            const newX = gradientState.currentX + step;
            const newFunctionValue = calculateY(newX);
            const currentFunctionValue = calculateY(gradientState.currentX);
            
            gradientState.calculatedStep = step;
            
            // Show calculation
            document.getElementById('stepCalculation').innerHTML = `
                <strong>Gradient Descent Calculation:</strong><br>
                Gradient = 2(x-5) = 2(${gradientState.currentX.toFixed(1)}-5) = ${gradient.toFixed(2)}<br>
                Step = -${gradientState.selectedLR} × ${gradient.toFixed(2)} = ${step.toFixed(2)}<br>
                New x = ${gradientState.currentX.toFixed(1)} + ${step.toFixed(2)} = ${newX.toFixed(1)}<br>
                Function value: ${currentFunctionValue.toFixed(2)} → ${newFunctionValue.toFixed(2)}
            `;
        }
    }
    
    // Learning rate button handlers
    lrButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            lrButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const lr = parseFloat(btn.dataset.lr);
            gradientState.selectedLR = lr;
            gradientState.showArrow = true;
            
            updateStepCalculation();
            
            // Enable take step button
            const takeStepBtnEl = document.getElementById('takeStepBtn');
            if (takeStepBtnEl) takeStepBtnEl.disabled = false;
            
            drawGraph();
        });
    });
    
    // Take step
    takeStepBtn.addEventListener('click', () => {
        if (gradientState.selectedLR !== null) {
            const oldValue = calculateY(gradientState.currentX);
            gradientState.currentX += gradientState.calculatedStep;
            const newValue = calculateY(gradientState.currentX);
            
            // Update calculation for new position but keep learning rate selected
            updateStepCalculation();
            updateDisplay();
            drawGraph();
        }
    });
    
    // Reset
    resetBtn.addEventListener('click', () => {
        gradientState.currentX = Math.random() * 12 - 2; // Random between -2 and 10
        gradientState.selectedLR = null;
        gradientState.calculatedStep = 0;
        gradientState.showArrow = false;
        
        document.getElementById('stepCalculation').textContent = '';
        lrButtons.forEach(b => b.classList.remove('active'));
        
        const takeStepBtnEl = document.getElementById('takeStepBtn');
        if (takeStepBtnEl) takeStepBtnEl.disabled = true;
        
        updateDisplay();
        drawGraph();
    });
    
    updateDisplay();
    drawGraph();
}