// Balloon Gradient Descent Level
// Shows AI automatically optimizing balloon inflation parameters
// Updated to use GradientDescentService for calculations

// Check if GradientDescentService is available
if (typeof GradientDescentService === 'undefined') {
    console.error('GradientDescentService not loaded - make sure services/GradientDescentService.js is included before this file');
}

function createBalloonGradientDescent() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-header">
                🤖 AI Balloon Optimizer
            </div>
            <div class="level-content" style="padding: 10px 20px; max-width: 1000px; margin: 0 auto;">
                <!-- Instructions -->
                <div style="background: rgba(102,126,234,0.1); border-radius: 10px; padding: 15px; border: 2px solid rgba(102,126,234,0.3); text-align: center;">
                    <p style="font-size: 1rem; color: #555; margin: 0;">
                        <strong>Witness Gradient Descent Solve The Problem</strong><br>
                        <span style="font-size: 0.9rem; color: #666;">Gradient Descent will tune the <strong style="color: #667eea;">w</strong> variable to minimize the loss</span><br><br>
                        We haven't learned exactly how Gradient Descent works yet, but first we'll see <i>what</i> it does. Gradient Descent tunes variables by taking "steps". Each step 
                    changes the variable in a way that ideally makes the function more accurate. Below, feel free to see Gradient Descent improve the function one step at a time 
                    by repeatedly pressing the step button, or click on auto-optimize to have Gradient Descent take steps on its own.
                    </p>
                </div><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <!-- Left side: Visualization -->
                    <div style="background: rgba(255,255,255,0.9); border-radius: 15px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h3 style="margin: 0 0 15px 0; color: #333; text-align: center;">Test Balloons</h3>
                        
                        <!-- Show multiple test balloons -->
                        <div style="background: linear-gradient(to bottom, #e3f2fd, #bbdefb); border-radius: 10px; padding: 15px; margin-bottom: 15px;">
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; text-align: center;">
                                <div>
                                    <div style="font-size: 0.85rem; color: #666; margin-bottom: 5px;">Size 2</div>
                                    <div id="balloon-2" style="font-size: 40px;">🎈</div>
                                    <div style="font-size: 0.75rem; color: #333;">
                                        Need: 14<br>
                                        <span id="balloon-2-got">Got: 0</span>
                                    </div>
                                </div>
                                <div>
                                    <div style="font-size: 0.85rem; color: #666; margin-bottom: 5px;">Size 4</div>
                                    <div id="balloon-4" style="font-size: 50px;">🎈</div>
                                    <div style="font-size: 0.75rem; color: #333;">
                                        Need: 28<br>
                                        <span id="balloon-4-got">Got: 0</span>
                                    </div>
                                </div>
                                <div>
                                    <div style="font-size: 0.85rem; color: #666; margin-bottom: 5px;">Size 6</div>
                                    <div id="balloon-6" style="font-size: 60px;">🎈</div>
                                    <div style="font-size: 0.75rem; color: #333;">
                                        Need: 42<br>
                                        <span id="balloon-6-got">Got: 0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Loss visualization -->
                        <div style="background: white; border-radius: 8px; padding: 15px; border: 2px solid #ddd;">
                            <h4 style="margin: 0 0 10px 0; color: #333; font-size: 1rem;">Total Loss Across All Balloons</h4>
                            <div style="position: relative; height: 30px; background: #f0f0f0; border-radius: 15px; overflow: hidden;">
                                <div id="loss-bar" style="position: absolute; left: 0; top: 0; height: 100%; background: linear-gradient(90deg, #ff6347, #ffa500); transition: width 0.5s ease; width: 100%;">
                                </div>
                                <div style="position: absolute; width: 100%; text-align: center; line-height: 30px; color: white; font-weight: bold; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">
                                    Loss: <span id="total-loss">84</span>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                    <!-- Right side: Controls -->
                    <div style="background: rgba(255,255,255,0.9); border-radius: 15px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h3 style="margin: 0 0 15px 0; color: #333; text-align: center;">Gradient Descent Controls</h3>
                        
                        <!-- Current state display -->
                        <div style="background: white; border: 2px solid #667eea; border-radius: 8px; padding: 15px; margin-bottom: 20px; text-align: center; font-family: 'Courier New', monospace;">
                            <div style="font-size: 1.2rem; color: #333;">
                                f(x) = <span id="current-w" style="color: #667eea; font-weight: bold;">0.0</span> × x
                            </div>
                            <div style="font-size: 0.9rem; color: #666; margin-top: 8px;">
                                Target: f(x) = 7 × x
                            </div>
                        </div>
                        
                    
                        
                        <!-- Iteration counter -->
                        <div style="text-align: center; margin-bottom: 20px;">
                            <div style="font-size: 2rem; color: #667eea; font-weight: bold;">
                                Step <span id="iteration">0</span>
                            </div>
                        </div>
                        
                        <!-- Control buttons -->
                        <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                            <button id="step-btn" style="flex: 1; padding: 12px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: bold; cursor: pointer; transition: all 0.3s;">
                                📉 Take One Step
                            </button>
                            <button id="auto-btn" style="flex: 1; padding: 12px; background: linear-gradient(135deg, #2dd573, #1cb85c); color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: bold; cursor: pointer; transition: all 0.3s;">
                                ▶️ Auto Optimize
                            </button>
                        </div>
                        
                        <button id="reset-btn" style="width: 100%; padding: 10px; background: #6c757d; color: white; border: none; border-radius: 8px; font-size: 0.9rem; cursor: pointer; transition: all 0.3s;">
                            🔄 Reset to Random
                        </button>
                        
                        <!-- Success message -->
                        <div id="success-message" style="display: none; margin-top: 20px; padding: 15px; background: rgba(45,213,115,0.1); border-radius: 8px; border: 2px solid rgba(45,213,115,0.3); text-align: center;">
                            <div style="color: #2dd573; font-weight: bold; font-size: 1.1rem;">
                                🎉 Perfect! Found optimal w = 7! 🎉
                            </div>
                            <div style="color: #666; font-size: 0.9rem; margin-top: 5px;">
                                All balloons are perfectly inflated!
                            </div>
                        </div>
                    </div>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('balloon-gd', 'createBalloonGradientDescent');
    
    // Setup gradient descent logic
    setupBalloonGradientDescent();
}

function setupBalloonGradientDescent() {
    const TRUE_W = 7;
    const LEARNING_RATE = 0.02;
    const TEST_SIZES = [2, 4, 6];
    
    let currentW = 0.0;
    let iteration = 0;
    let isAutoRunning = false;
    let autoInterval = null;
    
    // Create training data from test sizes
    const trainingData = TEST_SIZES.map(size => ({
        x: size,
        y: TRUE_W * size
    }));
    
    function calculateLoss() {
        // Use GradientDescentService for consistent loss calculation
        let totalLoss = 0;
        for (const point of trainingData) {
            const predicted = currentW * point.x;
            totalLoss += GradientDescentService.calculateL1Loss(predicted, point.y);
        }
        return totalLoss;
    }
    
    function calculateGradient() {
        // Use GradientDescentService for gradient calculation
        const gradients = GradientDescentService.calculateGradient(
            currentW, 
            0, // no bias term for this level
            trainingData, 
            'L1'
        );
        return gradients.gradW;
    }
    
    function updateDisplay() {
        // Update w display
        document.getElementById('current-w').textContent = currentW.toFixed(2);
        
        // Update loss
        const loss = calculateLoss();
        document.getElementById('total-loss').textContent = Math.round(loss);
        
        // Update loss bar
        const maxLoss = 84; // Maximum possible loss when w=0 for our test sizes
        const lossPercent = Math.max(0, Math.min(100, (loss / maxLoss) * 100));
        document.getElementById('loss-bar').style.width = `${lossPercent}%`;
        
        // Update iteration
        document.getElementById('iteration').textContent = iteration;
        
        // Check for success using GradientDescentService convergence check
        const convergenceStatus = GradientDescentService.checkConvergence(loss, 1);
        if (convergenceStatus.converged || Math.abs(currentW - TRUE_W) < 0.05) {
            document.getElementById('success-message').style.display = 'block';
            document.getElementById('step-btn').disabled = true;
            document.getElementById('auto-btn').disabled = true;
            if (isAutoRunning) {
                stopAutoRun();
            }
        } else {
            document.getElementById('success-message').style.display = 'none';
            document.getElementById('step-btn').disabled = false;
            document.getElementById('auto-btn').disabled = false;
        }
        
        // Color the loss bar
        const lossBar = document.getElementById('loss-bar');
        if (loss < 10) {
            lossBar.style.background = 'linear-gradient(90deg, #2dd573, #1cb85c)';
        } else if (loss < 50) {
            lossBar.style.background = 'linear-gradient(90deg, #ffa500, #ff8c00)';
        } else {
            lossBar.style.background = 'linear-gradient(90deg, #ff6347, #ff4500)';
        }
    }
    
    function takeStep() {
        const gradient = calculateGradient();
        
        // Use GradientDescentService for parameter update
        const currentParams = { w: currentW };
        const gradients = { gradW: gradient, gradB: 0 };
        const updatedParams = GradientDescentService.performStep(
            currentParams, 
            gradients, 
            LEARNING_RATE
        );
        
        // Update current w
        currentW = updatedParams.w;
        
        // Clamp to reasonable range
        currentW = Math.max(0, Math.min(15, currentW));
        
        // Round to 2 decimal places
        currentW = Math.round(currentW * 100) / 100;
        
        iteration++;
        
        updateDisplay();
    }
    
    function startAutoRun() {
        isAutoRunning = true;
        document.getElementById('auto-btn').textContent = '⏸️ Pause';
        
        autoInterval = setInterval(() => {
            const loss = calculateLoss();
            const convergenceStatus = GradientDescentService.checkConvergence(loss, 1);
            if (convergenceStatus.converged || Math.abs(currentW - TRUE_W) < 0.05) {
                stopAutoRun();
            } else {
                takeStep();
            }
        }, 500);
    }
    
    function stopAutoRun() {
        isAutoRunning = false;
        document.getElementById('auto-btn').textContent = '▶️ Auto Optimize';
        if (autoInterval) {
            clearInterval(autoInterval);
            autoInterval = null;
        }
    }
    
    function reset() {
        currentW = Math.random() * 5; // Random between 0 and 5 (closer to target)
        currentW = Math.round(currentW * 100) / 100;
        iteration = 0;
        stopAutoRun();
        
        updateDisplay();
    }
    
    // Event listeners
    document.getElementById('step-btn').addEventListener('click', takeStep);
    
    document.getElementById('auto-btn').addEventListener('click', () => {
        if (isAutoRunning) {
            stopAutoRun();
        } else {
            startAutoRun();
        }
    });
    
    document.getElementById('reset-btn').addEventListener('click', reset);
    
    // Add hover effects
    ['step-btn', 'auto-btn', 'reset-btn'].forEach(id => {
        const btn = document.getElementById(id);
        btn.addEventListener('mouseenter', () => {
            if (!btn.disabled) {
                btn.style.transform = 'translateY(-2px)';
                btn.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            }
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
            btn.style.boxShadow = 'none';
        });
    });
    
    // Initialize
    updateDisplay();
}

// Export the functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createBalloonGradientDescent, setupBalloonGradientDescent };
} else {
    window.createBalloonGradientDescent = createBalloonGradientDescent;
    window.setupBalloonGradientDescent = setupBalloonGradientDescent;
}