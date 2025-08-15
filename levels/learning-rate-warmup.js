/**
 * Learning Rate Warmup Interactive Level
 * Teaches gradual learning rate increase for stable training
 * 
 * Concepts covered:
 * - Learning rate warmup
 * - Linear warmup schedule
 * - Effect on training stability
 * - Avoiding early overshooting
 */

function createLearningRateWarmup() {
    const container = document.getElementById('app');
    
    // Create slider controls using UIPatterns
    const warmupStepsHTML = UIPatterns.createSlider({
        id: 'warmup-steps',
        label: 'Warmup Steps',
        min: 0,
        max: 50,
        value: 10,
        step: 1,
        color: '#667eea'
    });
    
    const maxLRHTML = UIPatterns.createSlider({
        id: 'max-lr',
        label: 'Target Learning Rate',
        min: 0.01,
        max: 0.5,
        value: 0.1,
        step: 0.01,
        color: '#764ba2'
    });
    
    const startLRHTML = UIPatterns.createSlider({
        id: 'start-lr',
        label: 'Starting Learning Rate',
        min: 0.001,
        max: 0.1,
        value: 0.01,
        step: 0.001,
        color: '#2dd573'
    });
    
    container.innerHTML = `
        <div class="current-level" style="height: 90vh; display: flex; flex-direction: column;">
            <!-- Compact Header -->
            <div class="level-header" style="padding: 10px;">
                <h2 style="margin: 0;">Learning Rate Warmup</h2>
                <p style="margin: 5px 0; color: #666;">
                    Gradually increase learning rate for stable training. Goal: Achieve loss < 2.0 without diverging!
                </p>
            </div>
            
            <!-- Main Grid Layout: Controls | Visualization -->
            <div style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 20px; flex: 1; padding: 20px; overflow: hidden;">
                
                <!-- Left: Controls Panel -->
                <div style="background: rgba(255,255,255,0.9); border-radius: 15px; padding: 20px; display: flex; flex-direction: column;">
                    <h3 style="margin: 0 0 15px 0; color: #333;">Warmup Controls</h3>
                    
                    <!-- Sliders -->
                    <div style="flex: 0 0 auto;">
                        ${warmupStepsHTML}
                        ${maxLRHTML}
                        ${startLRHTML}
                    </div>
                    
                    <!-- Current Step Display -->
                    <div style="flex: 0 0 auto; margin: 20px 0; padding: 15px; background: rgba(102,126,234,0.1); border-radius: 8px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <span style="font-weight: bold;">Training Step:</span>
                            <span id="current-step" style="color: #667eea; font-weight: bold;">0</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span style="font-weight: bold;">Current LR:</span>
                            <span id="current-lr" style="color: #764ba2; font-weight: bold;">0.01</span>
                        </div>
                    </div>
                    
                    <!-- Training Control Buttons -->
                    <div style="flex: 0 0 auto; display: flex; gap: 10px; margin-bottom: 20px;">
                        <button id="start-training" class="button button-primary" style="flex: 1;">
                            Start Training
                        </button>
                        <button id="reset-training" class="button button-secondary" style="flex: 1;">
                            Reset
                        </button>
                    </div>
                    
                    <!-- Results Section -->
                    <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-end;">
                        <!-- Loss Bar -->
                        <div class="loss-bar-container" style="margin-bottom: 15px;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                <span style="font-weight: bold;">Training Loss:</span>
                                <span id="total-loss" style="color: #667eea; font-weight: bold;">10.0</span>
                            </div>
                            <div style="background: #e0e0e0; height: 20px; border-radius: 10px; overflow: hidden;">
                                <div id="loss-bar" style="height: 100%; width: 100%; transition: all 0.3s;"></div>
                            </div>
                        </div>
                        
                        <!-- Training Status -->
                        <div id="training-status" style="padding: 15px; border-radius: 8px; text-align: center; background: rgba(255,255,255,0.8);">
                            <div style="font-weight: bold; color: #666;">Ready to start training</div>
                            <div style="font-size: 0.9rem; color: #999; margin-top: 5px;">
                                Configure warmup parameters and click "Start Training"
                            </div>
                        </div>
                        
                        <!-- Success Message (hidden initially) -->
                        <div id="success-message" style="display: none;"></div>
                    </div>
                </div>
                
                <!-- Right: Visualization Panel -->
                <div style="background: white; border-radius: 15px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <h3 style="margin: 0 0 15px 0; color: #333;">Training Visualization</h3>
                    
                    <!-- Tabs for different views -->
                    <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                        <button id="view-schedule" class="button button-secondary" style="background: #667eea; color: white;">
                            LR Schedule
                        </button>
                        <button id="view-loss" class="button button-secondary">
                            Loss Curve
                        </button>
                    </div>
                    
                    <!-- Canvas for visualization -->
                    <canvas id="viz-canvas" style="width: 100%; height: calc(100% - 90px); max-height: 350px; border: 1px solid #e0e0e0; border-radius: 8px;">
                    </canvas>
                    
                    <!-- Legend -->
                    <div id="legend" style="margin-top: 10px; font-size: 0.9rem; color: #666; display: flex; justify-content: space-around;">
                        <span>🟨 Warmup Phase</span>
                        <span>🟦 Normal Training</span>
                    </div>
                </div>
            </div>
            
            <!-- Navigation -->
            ${createStandardNavigation()}
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('learning-rate-warmup', 'createLearningRateWarmup');
    
    // Setup interactivity
    setupLearningRateWarmup();
}

function setupLearningRateWarmup() {
    // Attach slider handlers
    UIPatterns.attachSliderHandlers('warmup-steps');
    UIPatterns.attachSliderHandlers('max-lr');
    UIPatterns.attachSliderHandlers('start-lr');
    
    // Get elements
    const warmupSlider = document.getElementById('warmup-steps-slider');
    const maxLRSlider = document.getElementById('max-lr-slider');
    const startLRSlider = document.getElementById('start-lr-slider');
    const canvas = document.getElementById('viz-canvas');
    const startBtn = document.getElementById('start-training');
    const resetBtn = document.getElementById('reset-training');
    const viewScheduleBtn = document.getElementById('view-schedule');
    const viewLossBtn = document.getElementById('view-loss');
    
    // Training state
    let trainingState = {
        isTraining: false,
        currentStep: 0,
        maxSteps: 100,
        lossHistory: [],
        lrHistory: [],
        currentLoss: 10.0,
        targetLoss: 2.0,
        diverged: false,
        completed: false,
        currentView: 'schedule' // 'schedule' or 'loss'
    };
    
    // Animation variables
    let animationId = null;
    
    // Calculate learning rate at given step
    function getLearningRate(step) {
        const warmupSteps = parseInt(warmupSlider.value);
        const maxLR = parseFloat(maxLRSlider.value);
        const startLR = parseFloat(startLRSlider.value);
        
        if (warmupSteps === 0) {
            return maxLR;
        }
        
        if (step < warmupSteps) {
            // Linear warmup
            const progress = step / warmupSteps;
            return startLR + (maxLR - startLR) * progress;
        } else {
            // After warmup, use max learning rate
            return maxLR;
        }
    }
    
    // Simulate training step
    function simulateTrainingStep() {
        const lr = getLearningRate(trainingState.currentStep);
        
        // Simulate loss update (simplified model)
        // Higher learning rates can cause instability early on
        const warmupSteps = parseInt(warmupSlider.value);
        const isWarmingUp = trainingState.currentStep < warmupSteps;
        
        // Calculate loss change
        let lossChange = lr * (2 + Math.random() * 0.5);
        
        // Early steps with high LR can cause divergence
        if (trainingState.currentStep < 10 && lr > 0.2) {
            // High chance of divergence
            if (Math.random() > 0.3) {
                lossChange *= -5; // Diverge!
                trainingState.diverged = true;
            }
        }
        
        // Apply loss change
        trainingState.currentLoss = Math.max(0.1, trainingState.currentLoss - lossChange);
        
        // Check for divergence
        if (trainingState.currentLoss > 15) {
            trainingState.diverged = true;
            trainingState.currentLoss = 15;
        }
        
        // Store history
        trainingState.lossHistory.push(trainingState.currentLoss);
        trainingState.lrHistory.push(lr);
        
        // Update display
        updateDisplay();
        
        // Check success
        if (trainingState.currentLoss < trainingState.targetLoss && !trainingState.diverged) {
            trainingState.completed = true;
            stopTraining();
            showSuccess();
        }
        
        // Check failure
        if (trainingState.diverged) {
            stopTraining();
            showFailure();
        }
        
        // Continue training
        trainingState.currentStep++;
        if (trainingState.currentStep >= trainingState.maxSteps) {
            stopTraining();
            if (!trainingState.completed) {
                showTimeout();
            }
        }
    }
    
    // Update display
    function updateDisplay() {
        const currentStepEl = document.getElementById('current-step');
        const currentLREl = document.getElementById('current-lr');
        
        if (currentStepEl) currentStepEl.textContent = trainingState.currentStep;
        if (currentLREl) currentLREl.textContent = getLearningRate(trainingState.currentStep).toFixed(4);
        
        // Update loss bar
        UIPatterns.updateLossBar(trainingState.currentLoss, 15);
        
        // Draw visualization
        if (trainingState.currentView === 'schedule') {
            drawLRSchedule();
        } else {
            drawLossCurve();
        }
    }
    
    // Draw learning rate schedule
    function drawLRSchedule() {
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width = canvas.offsetWidth;
        const height = canvas.height = canvas.offsetHeight;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Draw axes
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(40, height - 30);
        ctx.lineTo(width - 20, height - 30);
        ctx.moveTo(40, 20);
        ctx.lineTo(40, height - 30);
        ctx.stroke();
        
        // Labels
        ctx.fillStyle = '#666';
        ctx.font = '12px Arial';
        ctx.fillText('Steps', width / 2 - 20, height - 10);
        ctx.save();
        ctx.translate(15, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Learning Rate', -35, 0);
        ctx.restore();
        
        // Draw schedule line
        const warmupSteps = parseInt(warmupSlider.value);
        const maxLR = parseFloat(maxLRSlider.value);
        const startLR = parseFloat(startLRSlider.value);
        
        ctx.lineWidth = 3;
        
        // Warmup phase (yellow)
        ctx.strokeStyle = '#FFA500';
        ctx.beginPath();
        for (let step = 0; step <= Math.min(warmupSteps, trainingState.maxSteps); step++) {
            const x = 40 + (step / trainingState.maxSteps) * (width - 60);
            const lr = getLearningRate(step);
            const y = height - 30 - (lr / 0.5) * (height - 50);
            
            if (step === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
        
        // Normal phase (blue)
        if (warmupSteps < trainingState.maxSteps) {
            ctx.strokeStyle = '#667eea';
            ctx.beginPath();
            for (let step = warmupSteps; step <= trainingState.maxSteps; step++) {
                const x = 40 + (step / trainingState.maxSteps) * (width - 60);
                const lr = getLearningRate(step);
                const y = height - 30 - (lr / 0.5) * (height - 50);
                
                if (step === warmupSteps) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
        }
        
        // Current position marker
        if (trainingState.isTraining) {
            const currentX = 40 + (trainingState.currentStep / trainingState.maxSteps) * (width - 60);
            const currentLR = getLearningRate(trainingState.currentStep);
            const currentY = height - 30 - (currentLR / 0.5) * (height - 50);
            
            ctx.fillStyle = '#ff6347';
            ctx.beginPath();
            ctx.arc(currentX, currentY, 5, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Draw loss curve
    function drawLossCurve() {
        if (!canvas || trainingState.lossHistory.length === 0) {
            drawLRSchedule(); // Show schedule if no loss data
            return;
        }
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width = canvas.offsetWidth;
        const height = canvas.height = canvas.offsetHeight;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Draw axes
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(40, height - 30);
        ctx.lineTo(width - 20, height - 30);
        ctx.moveTo(40, 20);
        ctx.lineTo(40, height - 30);
        ctx.stroke();
        
        // Labels
        ctx.fillStyle = '#666';
        ctx.font = '12px Arial';
        ctx.fillText('Steps', width / 2 - 20, height - 10);
        ctx.save();
        ctx.translate(15, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Loss', -15, 0);
        ctx.restore();
        
        // Draw target line
        const targetY = height - 30 - (trainingState.targetLoss / 15) * (height - 50);
        ctx.strokeStyle = '#2dd573';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(40, targetY);
        ctx.lineTo(width - 20, targetY);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#2dd573';
        ctx.font = '10px Arial';
        ctx.fillText('Target', width - 55, targetY - 5);
        
        // Draw loss curve
        const warmupSteps = parseInt(warmupSlider.value);
        
        ctx.lineWidth = 2;
        trainingState.lossHistory.forEach((loss, step) => {
            const x = 40 + (step / trainingState.maxSteps) * (width - 60);
            const y = height - 30 - (loss / 15) * (height - 50);
            
            // Color based on warmup phase
            ctx.strokeStyle = step < warmupSteps ? '#FFA500' : '#667eea';
            
            if (step === 0) {
                ctx.beginPath();
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(x, y);
            }
        });
    }
    
    // Start training
    function startTraining() {
        if (trainingState.isTraining) return;
        
        trainingState.isTraining = true;
        startBtn.disabled = true;
        warmupSlider.disabled = true;
        maxLRSlider.disabled = true;
        startLRSlider.disabled = true;
        
        // Update status
        const statusEl = document.getElementById('training-status');
        if (statusEl) {
            statusEl.innerHTML = `
                <div style="font-weight: bold; color: #667eea;">Training in progress...</div>
                <div style="font-size: 0.9rem; color: #999; margin-top: 5px;">
                    Watch how warmup affects training stability
                </div>
            `;
        }
        
        // Animation loop
        function animate() {
            if (trainingState.isTraining) {
                simulateTrainingStep();
                animationId = setTimeout(animate, 100);
            }
        }
        animate();
    }
    
    // Stop training
    function stopTraining() {
        trainingState.isTraining = false;
        if (animationId) {
            clearTimeout(animationId);
            animationId = null;
        }
        startBtn.disabled = false;
        warmupSlider.disabled = false;
        maxLRSlider.disabled = false;
        startLRSlider.disabled = false;
    }
    
    // Reset training
    function resetTraining() {
        stopTraining();
        
        trainingState = {
            isTraining: false,
            currentStep: 0,
            maxSteps: 100,
            lossHistory: [],
            lrHistory: [],
            currentLoss: 10.0,
            targetLoss: 2.0,
            diverged: false,
            completed: false,
            currentView: trainingState.currentView
        };
        
        updateDisplay();
        
        const statusEl = document.getElementById('training-status');
        if (statusEl) {
            statusEl.innerHTML = `
                <div style="font-weight: bold; color: #666;">Ready to start training</div>
                <div style="font-size: 0.9rem; color: #999; margin-top: 5px;">
                    Configure warmup parameters and click "Start Training"
                </div>
            `;
        }
        
        const successMsg = document.getElementById('success-message');
        if (successMsg) successMsg.style.display = 'none';
    }
    
    // Show success
    function showSuccess() {
        const statusEl = document.getElementById('training-status');
        if (statusEl) {
            statusEl.innerHTML = `
                <div style="font-weight: bold; color: #2dd573;">Training successful! 🎉</div>
                <div style="font-size: 0.9rem; color: #666; margin-top: 5px;">
                    Warmup helped achieve stable convergence!
                </div>
            `;
        }
        
        UIPatterns.showSuccess('Level Complete! You successfully used learning rate warmup for stable training!', [
            'warmup-steps-slider',
            'max-lr-slider',
            'start-lr-slider'
        ]);
        
        // Enable next button
        const nextBtn = document.getElementById('next-button');
        if (nextBtn) {
            nextBtn.disabled = false;
            nextBtn.style.opacity = '1';
        }
    }
    
    // Show failure
    function showFailure() {
        const statusEl = document.getElementById('training-status');
        if (statusEl) {
            statusEl.innerHTML = `
                <div style="font-weight: bold; color: #ff6347;">Training diverged! 💥</div>
                <div style="font-size: 0.9rem; color: #666; margin-top: 5px;">
                    Try using warmup to prevent early divergence
                </div>
            `;
        }
    }
    
    // Show timeout
    function showTimeout() {
        const statusEl = document.getElementById('training-status');
        if (statusEl) {
            statusEl.innerHTML = `
                <div style="font-weight: bold; color: #ffa500;">Training incomplete</div>
                <div style="font-size: 0.9rem; color: #666; margin-top: 5px;">
                    Adjust parameters for faster convergence
                </div>
            `;
        }
    }
    
    // Add event listeners
    if (startBtn) startBtn.addEventListener('click', startTraining);
    if (resetBtn) resetBtn.addEventListener('click', resetTraining);
    
    // View switching
    if (viewScheduleBtn) viewScheduleBtn.addEventListener('click', () => {
        trainingState.currentView = 'schedule';
        viewScheduleBtn.style.background = '#667eea';
        viewScheduleBtn.style.color = 'white';
        viewLossBtn.style.background = '';
        viewLossBtn.style.color = '';
        document.getElementById('legend').innerHTML = `
            <span>🟨 Warmup Phase</span>
            <span>🟦 Normal Training</span>
        `;
        updateDisplay();
    });
    
    if (viewLossBtn) viewLossBtn.addEventListener('click', () => {
        trainingState.currentView = 'loss';
        viewLossBtn.style.background = '#667eea';
        viewLossBtn.style.color = 'white';
        viewScheduleBtn.style.background = '';
        viewScheduleBtn.style.color = '';
        document.getElementById('legend').innerHTML = `
            <span>🟨 Warmup Steps</span>
            <span>🟦 Normal Steps</span>
            <span>🟢 Target Loss</span>
        `;
        updateDisplay();
    });
    
    // Update display when sliders change
    if (warmupSlider) warmupSlider.addEventListener('input', updateDisplay);
    if (maxLRSlider) maxLRSlider.addEventListener('input', updateDisplay);
    if (startLRSlider) startLRSlider.addEventListener('input', updateDisplay);
    
    // Initial draw
    updateDisplay();
}

// Make functions globally available
window.createLearningRateWarmup = createLearningRateWarmup;
window.setupLearningRateWarmup = setupLearningRateWarmup;

/*
CHECKLIST:
✓ Sliders working with real-time updates
✓ Visualization updates smoothly (LR schedule and loss curve)
✓ Training simulation with warmup effect
✓ Success/failure conditions implemented
✓ Content fits without scrolling
✓ Navigation initialized correctly
✓ Global functions exported
✓ Interactive training with start/reset
✓ Two visualization modes (schedule/loss)
*/
