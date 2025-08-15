/**
 * Step Size Teaching Level
 * Teaches the concept of step size in gradient descent
 * User can adjust step size and see how it affects parameter updates
 */

function createStepSizeTeaching() {
    const container = document.getElementById('app');
    
    container.innerHTML = `
        <div class="current-level" style="height: 90vh; display: flex; flex-direction: column;">
            <!-- Compact Header -->
            <div class="level-header" style="padding: 10px;">
                <h2 style="margin: 0;">Understanding Step Size</h2>
                <p style="margin: 5px 0; color: #666;">
                    Adjust the step size and click "Go" to see how w changes. Goal: make wx match 7x.
                </p>
            </div>
            
            <!-- Main Grid Layout: Controls | Visualization -->
            <div style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 20px; flex: 1; padding: 20px; overflow: hidden;">
                
                <!-- Left: Controls Panel -->
                <div style="background: rgba(255,255,255,0.9); border-radius: 15px; padding: 20px; display: flex; flex-direction: column;">
                    <h3 style="margin: 0 0 15px 0; color: #333;">Controls</h3>
                    
                    <!-- Current State Display -->
                    <div style="background: rgba(102,126,234,0.1); border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                        <div style="margin-bottom: 10px;">
                            <strong>Target Function:</strong> 
                            <span style="color: #2dd573; font-family: monospace;">f(x) = 7x</span>
                        </div>
                        <div style="margin-bottom: 10px;">
                            <strong>Your Function:</strong> 
                            <span id="current-function" style="color: #667eea; font-family: monospace;">f(x) = 1.0x</span>
                        </div>
                        <div>
                            <strong>Current w:</strong> 
                            <span id="current-w" style="font-weight: bold; color: #667eea;">1.0</span>
                        </div>
                    </div>
                    
                    <!-- Step Size Input -->
                    <div style="margin-bottom: 20px;">
                        <label for="step-size-input" style="display: block; margin-bottom: 8px; font-weight: bold;">
                            Step Size (Learning Rate):
                        </label>
                        <div style="display: flex; gap: 10px; align-items: center;">
                            <input 
                                type="number" 
                                id="step-size-input" 
                                value="0.1" 
                                step="0.01" 
                                min="-2" 
                                max="2"
                                style="flex: 1; padding: 8px; border: 2px solid #667eea; border-radius: 8px; font-size: 16px;"
                            />
                            <button 
                                id="go-button"
                                style="padding: 8px 20px; background: #667eea; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 16px;"
                                onmouseover="this.style.background='#5a67d8'"
                                onmouseout="this.style.background='#667eea'"
                            >
                                Go!
                            </button>
                        </div>
                        <div style="margin-top: 5px; font-size: 0.9rem; color: #666;">
                            Try values like 0.1, 0.5, 1.0, -0.1, 2.0
                        </div>
                    </div>
                    
                    <!-- Gradient Information -->
                    <div style="background: #f7f7f7; border-radius: 8px; padding: 12px; margin-bottom: 20px;">
                        <div style="font-size: 0.9rem; margin-bottom: 8px;">
                            <strong>Gradient (slope of loss):</strong> 
                            <span id="gradient-value" style="color: #764ba2;">-6.0</span>
                        </div>
                        <div style="font-size: 0.9rem; margin-bottom: 8px;">
                            <strong>Update formula:</strong>
                            <div style="font-family: monospace; margin-top: 5px; color: #333;">
                                w_new = w - (step_size × gradient)
                            </div>
                        </div>
                        <div id="update-calculation" style="font-size: 0.9rem; color: #666; margin-top: 8px;">
                            Next update: 1.0 - (0.1 × -6.0) = 1.6
                        </div>
                    </div>
                    
                    <!-- History Log -->
                    <div style="flex: 1; display: flex; flex-direction: column;">
                        <h4 style="margin: 0 0 10px 0;">Update History:</h4>
                        <div id="history-log" style="flex: 1; background: #f7f7f7; border-radius: 8px; padding: 10px; overflow-y: auto; font-size: 0.85rem; font-family: monospace; max-height: 150px;">
                            <div style="color: #999;">Click "Go" to start updating w...</div>
                        </div>
                    </div>
                    
                    <!-- Reset Button -->
                    <button 
                        id="reset-button"
                        style="margin-top: 15px; padding: 8px; background: #f0f0f0; border: 1px solid #ccc; border-radius: 8px; cursor: pointer;"
                        onmouseover="this.style.background='#e0e0e0'"
                        onmouseout="this.style.background='#f0f0f0'"
                    >
                        Reset to w = 1.0
                    </button>
                </div>
                
                <!-- Right: Visualization Panel -->
                <div style="background: white; border-radius: 15px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <h3 style="margin: 0 0 15px 0; color: #333;">Function Visualization</h3>
                    
                    <!-- Canvas for graph -->
                    <canvas id="graph-canvas" style="width: 100%; height: calc(100% - 80px); max-height: 400px; border: 1px solid #e0e0e0; border-radius: 8px;">
                    </canvas>
                    
                    <!-- Legend -->
                    <div style="margin-top: 10px; display: flex; justify-content: center; gap: 30px; font-size: 0.9rem;">
                        <span><span style="color: #2dd573; font-weight: bold;">━━</span> Target: f(x) = 7x</span>
                        <span><span style="color: #667eea; font-weight: bold;">━━</span> Your: f(x) = <span id="legend-w">1.0</span>x</span>
                    </div>
                    
                    <!-- Loss indicator -->
                    <div style="margin-top: 10px; text-align: center;">
                        <span style="font-weight: bold;">Loss (distance from target):</span>
                        <span id="loss-value" style="color: #ff6347; font-weight: bold;">36.0</span>
                    </div>
                </div>
            </div>
            
            <!-- Navigation -->
            ${createStandardNavigation()}
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('step-size-teaching', 'createStepSizeTeaching');
    
    // Setup interactivity
    setupStepSizeTeaching();
}

function setupStepSizeTeaching() {
    // State variables
    let currentW = 1.0;
    const targetW = 7.0;
    let updateCount = 0;
    
    // Get elements
    const stepSizeInput = document.getElementById('step-size-input');
    const goButton = document.getElementById('go-button');
    const resetButton = document.getElementById('reset-button');
    const currentWDisplay = document.getElementById('current-w');
    const currentFunctionDisplay = document.getElementById('current-function');
    const gradientDisplay = document.getElementById('gradient-value');
    const updateCalcDisplay = document.getElementById('update-calculation');
    const historyLog = document.getElementById('history-log');
    const canvas = document.getElementById('graph-canvas');
    const legendW = document.getElementById('legend-w');
    const lossDisplay = document.getElementById('loss-value');
    
    // Calculate gradient (derivative of loss with respect to w)
    function calculateGradient() {
        // Loss = (w - 7)^2, gradient = 2(w - 7)
        return 2 * (currentW - targetW);
    }
    
    // Calculate loss
    function calculateLoss() {
        return Math.pow(currentW - targetW, 2);
    }
    
    // Update displays
    function updateDisplays() {
        currentWDisplay.textContent = currentW.toFixed(2);
        currentFunctionDisplay.textContent = `f(x) = ${currentW.toFixed(2)}x`;
        legendW.textContent = currentW.toFixed(2);
        
        const gradient = calculateGradient();
        gradientDisplay.textContent = gradient.toFixed(2);
        
        const stepSize = parseFloat(stepSizeInput.value) || 0;
        const nextW = currentW - (stepSize * gradient);
        updateCalcDisplay.innerHTML = `Next update: ${currentW.toFixed(2)} - (${stepSize.toFixed(2)} × ${gradient.toFixed(2)}) = ${nextW.toFixed(2)}`;
        
        const loss = calculateLoss();
        lossDisplay.textContent = loss.toFixed(2);
        
        // Color code loss
        if (loss < 0.1) {
            lossDisplay.style.color = '#2dd573';
        } else if (loss < 1) {
            lossDisplay.style.color = '#ffa500';
        } else {
            lossDisplay.style.color = '#ff6347';
        }
    }
    
    // Draw the graph
    function drawGraph() {
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width = canvas.offsetWidth;
        const height = canvas.height = canvas.offsetHeight;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Set up coordinate system
        const padding = 40;
        const graphWidth = width - 2 * padding;
        const graphHeight = height - 2 * padding;
        
        // Draw axes
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.beginPath();
        // Y-axis
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height - padding);
        // X-axis
        ctx.moveTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.stroke();
        
        // Draw grid lines
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 0.5;
        for (let i = 1; i <= 10; i++) {
            const x = padding + (graphWidth / 10) * i;
            const y = padding + (graphHeight / 10) * i;
            
            // Vertical grid line
            ctx.beginPath();
            ctx.moveTo(x, padding);
            ctx.lineTo(x, height - padding);
            ctx.stroke();
            
            // Horizontal grid line
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
            ctx.stroke();
        }
        
        // Draw axis labels
        ctx.fillStyle = '#666';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        
        // X-axis labels
        for (let i = 0; i <= 10; i++) {
            const x = padding + (graphWidth / 10) * i;
            ctx.fillText(i.toString(), x, height - padding + 20);
        }
        
        // Y-axis labels
        ctx.textAlign = 'right';
        for (let i = 0; i <= 10; i++) {
            const y = height - padding - (graphHeight / 10) * i;
            ctx.fillText((i * 7).toString(), padding - 10, y + 5);
        }
        
        // Function to convert data coordinates to canvas coordinates
        function dataToCanvas(x, y) {
            const canvasX = padding + (x / 10) * graphWidth;
            const canvasY = height - padding - (y / 70) * graphHeight;
            return { x: canvasX, y: canvasY };
        }
        
        // Draw target function (f(x) = 7x)
        ctx.strokeStyle = '#2dd573';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let x = 0; x <= 10; x += 0.1) {
            const y = 7 * x;
            const point = dataToCanvas(x, y);
            if (x === 0) {
                ctx.moveTo(point.x, point.y);
            } else {
                ctx.lineTo(point.x, point.y);
            }
        }
        ctx.stroke();
        
        // Draw current function (f(x) = wx)
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 0; x <= 10; x += 0.1) {
            const y = currentW * x;
            const point = dataToCanvas(x, y);
            if (x === 0) {
                ctx.moveTo(point.x, point.y);
            } else {
                ctx.lineTo(point.x, point.y);
            }
        }
        ctx.stroke();
        
        // Draw axis labels
        ctx.fillStyle = '#333';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('x', width - padding + 20, height - padding + 5);
        ctx.save();
        ctx.translate(padding - 30, padding - 20);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('f(x)', 0, 0);
        ctx.restore();
    }
    
    // Handle Go button click
    function handleGoClick() {
        const stepSize = parseFloat(stepSizeInput.value);
        if (isNaN(stepSize)) {
            alert('Please enter a valid number for step size');
            return;
        }
        
        const gradient = calculateGradient();
        const oldW = currentW;
        currentW = currentW - (stepSize * gradient);
        
        // Add to history log
        updateCount++;
        const historyEntry = document.createElement('div');
        historyEntry.style.marginBottom = '5px';
        historyEntry.style.color = '#333';
        historyEntry.innerHTML = `Step ${updateCount}: w = ${oldW.toFixed(2)} - (${stepSize.toFixed(2)} × ${gradient.toFixed(2)}) = ${currentW.toFixed(2)}`;
        
        if (historyLog.firstChild && historyLog.firstChild.textContent.includes('Click "Go"')) {
            historyLog.innerHTML = '';
        }
        historyLog.insertBefore(historyEntry, historyLog.firstChild);
        
        // Keep history log limited to recent entries
        while (historyLog.children.length > 10) {
            historyLog.removeChild(historyLog.lastChild);
        }
        
        // Check if we've reached the target
        if (Math.abs(currentW - targetW) < 0.01) {
            const successMsg = document.createElement('div');
            successMsg.style.color = '#2dd573';
            successMsg.style.fontWeight = 'bold';
            successMsg.style.marginTop = '10px';
            successMsg.innerHTML = '🎉 Perfect! You reached w = 7.0!';
            historyLog.insertBefore(successMsg, historyLog.firstChild);
        }
        
        // Update all displays and redraw
        updateDisplays();
        drawGraph();
    }
    
    // Handle Reset button click
    function handleResetClick() {
        currentW = 1.0;
        updateCount = 0;
        historyLog.innerHTML = '<div style="color: #999;">Click "Go" to start updating w...</div>';
        updateDisplays();
        drawGraph();
    }
    
    // Handle step size input change
    function handleStepSizeChange() {
        updateDisplays();
    }
    
    // Add event listeners
    if (goButton) goButton.addEventListener('click', handleGoClick);
    if (resetButton) resetButton.addEventListener('click', handleResetClick);
    if (stepSizeInput) stepSizeInput.addEventListener('input', handleStepSizeChange);
    
    // Initial setup
    updateDisplays();
    drawGraph();
}

// Make functions globally available
window.createStepSizeTeaching = createStepSizeTeaching;
window.setupStepSizeTeaching = setupStepSizeTeaching;