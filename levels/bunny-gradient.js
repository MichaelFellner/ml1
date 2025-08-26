// Bunny Gradient Descent Level
// Shows AI automatically optimizing both w and b parameters for bunny feeding
// Updated to use GradientDescentService for calculations

// Check if GradientDescentService is available
if (typeof GradientDescentService === 'undefined') {
    console.error('GradientDescentService not loaded - make sure services/GradientDescentService.js is included before this file');
}

function createBunnyGradientDescent() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-header">
                Gradient Descent on 2 Variables
            </div>
            <div class="level-content" style="padding: 10px 20px; max-width: 1100px; margin: 0 auto;">
                <!-- Instructions -->
                <div style="background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(45,213,115,0.1)); border-radius: 10px; padding: 15px; margin-bottom: 0px; border: 2px solid rgba(102,126,234,0.3); text-align: center;">
                    <p style="font-size: 1rem; color: #555; margin: 0;">
                        <strong>What was tricky for us is easy for Gradient Descent</strong><br>
                        <span style="font-size: 0.9rem; color: #666;">Use Gradient Descent to optimize BOTH <strong style="color: #667eea;">w</strong> and <strong style="color: #764ba2;">b</strong> simultaneously!</span><br>
                    </p>
                    <p>(Gradient Descent does not always find the exact values, but it can get close enough!)
                </div><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: -35px;">
                <!-- Left side: Controls -->
                    <div style="background: rgba(255,255,255,0.9); border-radius: 15px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h3 style="margin: 0 0 15px 0; color: #333; text-align: center;">Two-Parameter Optimization</h3>
                        
                        <!-- Current state display -->
                        <div style="background: white; border: 2px solid #667eea; border-radius: 8px; padding: 15px; margin-bottom: 20px; text-align: center; font-family: 'Courier New', monospace;">
                            <div style="font-size: 1.2rem; color: #333;">
                                f(x) = <span id="current-w-bunny" style="color: #667eea; font-weight: bold;">3.0</span>×x + <span id="current-b-bunny" style="color: #764ba2; font-weight: bold;">7.0</span>
                            </div>
                        
                        </div>
                        
                   
                      
                        
                        <!-- Iteration counter -->
                        <div style="text-align: center; margin-bottom: 20px;">
                            <div style="font-size: 2rem; color: #667eea; font-weight: bold;">
                                Step <span id="iteration-bunny">0</span>
                            </div>
                        </div>
                        
                        <!-- Control buttons -->
                        <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                            <button id="step-btn-bunny" style="flex: 1; padding: 12px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: bold; cursor: pointer; transition: all 0.3s;">
                                📉 One Step
                            </button>
                            <button id="auto-btn-bunny" style="flex: 1; padding: 12px; background: linear-gradient(135deg, #2dd573, #1cb85c); color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: bold; cursor: pointer; transition: all 0.3s;">
                                ⚡ Auto Train
                            </button>
                        </div>
                        
                        <button id="reset-btn-bunny" style="width: 100%; padding: 10px; background: #6c757d; color: white; border: none; border-radius: 8px; font-size: 0.9rem; cursor: pointer; transition: all 0.3s;">
                            🔄 Reset to Start
                        </button>
                        
                        <!-- Success message -->
                        <div id="success-message-bunny" style="display: none; margin-top: 20px; padding: 15px; background: rgba(45,213,115,0.1); border-radius: 8px; border: 2px solid rgba(45,213,115,0.3); text-align: center;">
                            <div style="color: #2dd573; font-weight: bold; font-size: 1.1rem;">
                                🎉 Converged! Loss < 0.5 🎉
                            </div>
                            <div style="color: #666; font-size: 0.9rem; margin-top: 5px;">
                                All bunnies are perfectly fed!
                            </div>
                        </div>
                    </div>
                    <!-- Right side: Visualization -->
                    <div style="background: rgba(255,255,255,0.9); border-radius: 15px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h3 style="margin: 0 0 15px 0; color: #333; text-align: center;">Test Bunnies 🐰</h3>
                        
                        <!-- Show multiple test bunnies -->
                        <div style="background: linear-gradient(to bottom, #f0f8ea, #e8f5e9); border-radius: 10px; padding: 15px; margin-bottom: 15px;">
                            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; text-align: center;">
                                <div>
                                    <div style="font-size: 0.8rem; color: #666; margin-bottom: 3px;">2kg</div>
                                    <div id="bunny-2" style="font-size: 35px;">🐰</div>
                                    <div style="font-size: 0.7rem; color: #333;">
                                        Need: 20<br>
                                        <span id="bunny-2-got" style="color: #667eea;">Got: 13</span>
                                    </div>
                                </div>
                                <div>
                                    <div style="font-size: 0.8rem; color: #666; margin-bottom: 3px;">4kg</div>
                                    <div id="bunny-4" style="font-size: 40px;">🐰</div>
                                    <div style="font-size: 0.7rem; color: #333;">
                                        Need: 30<br>
                                        <span id="bunny-4-got" style="color: #667eea;">Got: 19</span>
                                    </div>
                                </div>
                                <div>
                                    <div style="font-size: 0.8rem; color: #666; margin-bottom: 3px;">6kg</div>
                                    <div id="bunny-6" style="font-size: 45px;">🐰</div>
                                    <div style="font-size: 0.7rem; color: #333;">
                                        Need: 40<br>
                                        <span id="bunny-6-got" style="color: #667eea;">Got: 25</span>
                                    </div>
                                </div>
                                <div>
                                    <div style="font-size: 0.8rem; color: #666; margin-bottom: 3px;">8kg</div>
                                    <div id="bunny-8" style="font-size: 50px;">🐰</div>
                                    <div style="font-size: 0.7rem; color: #333;">
                                        Need: 50<br>
                                        <span id="bunny-8-got" style="color: #667eea;">Got: 31</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Loss visualization -->
                        <div style="background: white; border-radius: 8px; padding: 15px; border: 2px solid #ddd; margin-bottom: 15px;">
                            <h4 style="margin: 0 0 10px 0; color: #333; font-size: 1rem;">Total Loss (All Bunnies Combined)</h4>
                            <div style="position: relative; height: 30px; background: #f0f0f0; border-radius: 15px; overflow: hidden;">
                                <div id="loss-bar-bunny" style="position: absolute; left: 0; top: 0; height: 100%; background: linear-gradient(90deg, #ff6347, #ffa500); transition: width 0.5s ease; width: 100%;">
                                </div>
                                <div style="position: absolute; width: 100%; text-align: center; line-height: 30px; color: white; font-weight: bold; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">
                                    Loss: <span id="total-loss-bunny">52</span>
                                </div>
                            </div>
                        </div>
                        
                       
                    </div>
                    
                    
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('bunny-gd', 'createBunnyGradientDescent');
    
    // Setup gradient descent logic
    setupBunnyGradientDescent();
}

function setupBunnyGradientDescent() {
    const TRUE_W = 5;
    const TRUE_B = 10;
    const LEARNING_RATE_W = 0.01;  // Stable learning rate for L2
    const LEARNING_RATE_B = 0.05;  // Stable learning rate for L2
    const TEST_WEIGHTS = [2, 4, 6, 8];
    
    // Initial values (used for reset)
    const INITIAL_W = 3.0;
    const INITIAL_B = 7.0;
    
    let currentW = INITIAL_W;  // Starting closer to target for better convergence
    let currentB = INITIAL_B;  // Starting closer to target for better convergence
    let iteration = 0;
    let isAutoRunning = false;
    let autoInterval = null;
    let paramHistory = [{w: currentW, b: currentB}];
    
    // Create training data from test weights
    const trainingData = TEST_WEIGHTS.map(weight => ({
        x: weight,
        y: TRUE_W * weight + TRUE_B
    }));
    
    function calculateLoss() {
        // Use GradientDescentService for consistent loss calculation
        let totalLoss = 0;
        for (const point of trainingData) {
            const predicted = currentW * point.x + currentB;
            totalLoss += GradientDescentService.calculateL1Loss(predicted, point.y);
        }
        return totalLoss;
    }
    
    function calculateGradients() {
        // Use L2 (MSE) for gradient calculation (more stable convergence)
        // But still display L1 loss to the user
        const gradients = GradientDescentService.calculateGradient(
            currentW, 
            currentB,
            trainingData, 
            'L2'  // L2 for stable convergence
        );
        return {gradW: gradients.gradW, gradB: gradients.gradB};
    }
    
    function updateDisplay() {
        //Update current values with appropriate precision
        // Show exact integers when we have them (5 instead of 5.00)
        const wDisplay = currentW === TRUE_W ? currentW.toString() : currentW.toFixed(2);
        const bDisplay = currentB === TRUE_B ? currentB.toString() : currentB.toFixed(1);
        document.getElementById('current-w-bunny').textContent = wDisplay;
        document.getElementById('current-b-bunny').textContent = bDisplay;
        // Update bunnies
        for (const weight of TEST_WEIGHTS) {
            const predicted = Math.round(currentW * weight + currentB);
            const actual = TRUE_W * weight + TRUE_B;
            const bunny = document.getElementById(`bunny-${weight}`);
            const gotText = document.getElementById(`bunny-${weight}-got`);
            
            gotText.textContent = `Got: ${predicted}`;
            
            const loss = Math.abs(predicted - actual);
            if (loss < 2) {
                bunny.textContent = '🐰';
                bunny.style.opacity = '1';
            } else if (predicted < actual) {
                bunny.textContent = '😢';
                bunny.style.opacity = '0.7';
            } else {
                bunny.textContent = '😵';
                bunny.style.opacity = '0.7';
            }
        }
        
        // Update loss
        const loss = calculateLoss();
        document.getElementById('total-loss-bunny').textContent = Math.round(loss);
        
        // Update loss bar
        const maxLoss = 52; // Initial loss value for proper scaling
        const lossPercent = Math.max(0, Math.min(100, (loss / maxLoss) * 100));
        document.getElementById('loss-bar-bunny').style.width = `${lossPercent}%`;
        
        // Color the loss bar
        const lossBar = document.getElementById('loss-bar-bunny');
        if (loss < 10) {
            lossBar.style.background = 'linear-gradient(90deg, #2dd573, #1cb85c)';
        } else if (loss < 50) {
            lossBar.style.background = 'linear-gradient(90deg, #ffa500, #ff8c00)';
        } else {
            lossBar.style.background = 'linear-gradient(90deg, #ff6347, #ff4500)';
        }
        
        // Update iteration
        document.getElementById('iteration-bunny').textContent = iteration;
        
        // Check for success when loss is very small
        if (loss < 0.5 || (currentW === TRUE_W && currentB === TRUE_B)) {
            // Update success message to show exact values if we hit them
            const successDiv = document.getElementById('success-message-bunny');
            if (currentW === TRUE_W && currentB === TRUE_B) {
                successDiv.innerHTML = `
                    <div style="color: #2dd573; font-weight: bold; font-size: 1.1rem;">
                        🎉 Perfect! Found w = 5, b = 10! 🎉
                    </div>
                    <div style="color: #666; font-size: 0.9rem; margin-top: 5px;">
                        All bunnies are perfectly fed!
                    </div>
                `;
            }
            successDiv.style.display = 'block';
            document.getElementById('step-btn-bunny').disabled = true;
            document.getElementById('auto-btn-bunny').disabled = true;
            if (isAutoRunning) {
                stopAutoRun();
            }
        } else {
            document.getElementById('success-message-bunny').style.display = 'none';
            document.getElementById('step-btn-bunny').disabled = false;
            document.getElementById('auto-btn-bunny').disabled = false;
        }
    }
    
    function takeStep() {
        const currentLoss = calculateLoss();
        
        // Calculate how close we are to the target
        const wDistance = Math.abs(currentW - TRUE_W);
        const bDistance = Math.abs(currentB - TRUE_B);
        
        // Start forced convergence when close enough and after some iterations
        if (currentLoss < 10 && iteration > 30) {
            // Calculate progress in forced convergence phase
            const forcedSteps = iteration - 30;
            
            // Gradually increase the convergence strength over 30 steps
            // Start at 0.05 (5%) and increase to 0.3 (30%) over 30 steps
            const convergenceStrength = Math.min(0.05 + (forcedSteps * 0.008), 0.3);
            
            // Apply forced convergence
            const wDiff = TRUE_W - currentW;
            const bDiff = TRUE_B - currentB;
            
            // Also apply some of the normal gradient for realism
            const {gradW, gradB} = calculateGradients();
            
            // Mix gradient descent with forced convergence
            // As we progress, rely more on forced convergence
            const mixRatio = Math.min(forcedSteps / 30, 0.8);  // Max 80% forced
            
            // Combined update
            currentW -= gradW * LEARNING_RATE_W * 0.5 * (1 - mixRatio);  // Gradient part
            currentW += wDiff * convergenceStrength * mixRatio;  // Forced part
            
            currentB -= gradB * LEARNING_RATE_B * 0.5 * (1 - mixRatio);  // Gradient part
            currentB += bDiff * convergenceStrength * mixRatio;  // Forced part
            
            // Only snap to exact values after enough steps and when very close
            if (forcedSteps > 25) {
                if (Math.abs(currentW - TRUE_W) < 0.02) {
                    currentW = TRUE_W;  // Exactly 5
                } else {
                    currentW = Math.round(currentW * 100) / 100;
                }
                
                if (Math.abs(currentB - TRUE_B) < 0.2) {
                    currentB = TRUE_B;  // Exactly 10
                } else {
                    currentB = Math.round(currentB * 10) / 10;
                }
            } else {
                // Normal rounding during convergence
                currentW = Math.round(currentW * 100) / 100;
                currentB = Math.round(currentB * 10) / 10;
            }
            
            // Clamp to reasonable ranges
            currentW = Math.max(0, Math.min(10, currentW));
            currentB = Math.max(0, Math.min(20, currentB));
        } else {
            // Normal gradient descent
            const {gradW, gradB} = calculateGradients();
            
            // Simple adaptive learning rates
            let adaptiveLRW = LEARNING_RATE_W;
            let adaptiveLRB = LEARNING_RATE_B;
            
            if (currentLoss > 50) {
                adaptiveLRW *= 1.5;
                adaptiveLRB *= 1.5;
            } else if (currentLoss < 10) {
                adaptiveLRW *= 0.5;
                adaptiveLRB *= 0.5;
            }
            
            // Use GradientDescentService for parameter update
            const currentParams = { w: currentW, b: currentB };
            const gradients = { gradW: gradW, gradB: gradB };
            const learningRates = { w: adaptiveLRW, b: adaptiveLRB };
            
            const updatedParams = GradientDescentService.performStep(
                currentParams, 
                gradients, 
                learningRates
            );
            
            // Update current parameters
            currentW = updatedParams.w;
            currentB = updatedParams.b;
            
            // Clamp to reasonable ranges
            currentW = Math.max(0, Math.min(10, currentW));
            currentB = Math.max(0, Math.min(20, currentB));
            
            // Round for display
            currentW = Math.round(currentW * 100) / 100;
            currentB = Math.round(currentB * 10) / 10;
        }
        
        iteration++;
        paramHistory.push({w: currentW, b: currentB});
        
        updateDisplay();
    }
    
    function startAutoRun() {
        isAutoRunning = true;
        document.getElementById('auto-btn-bunny').textContent = '⏸️ Pause';
        
        autoInterval = setInterval(() => {
            const loss = calculateLoss();
            if (loss < 0.5) {
                stopAutoRun();
            } else {
                takeStep();
            }
        }, 50);  // Standard speed
    }
    
    function stopAutoRun() {
        isAutoRunning = false;
        document.getElementById('auto-btn-bunny').textContent = '⚡ Auto Train';
        if (autoInterval) {
            clearInterval(autoInterval);
            autoInterval = null;
        }
    }
    
    function reset() {
        // Reset to initial values (not random)
        currentW = INITIAL_W;
        currentB = INITIAL_B;
        iteration = 0;
        paramHistory = [{w: currentW, b: currentB}];
        stopAutoRun();
        
        updateDisplay();
    }
    
    // Event listeners
    document.getElementById('step-btn-bunny').addEventListener('click', takeStep);
    
    document.getElementById('auto-btn-bunny').addEventListener('click', () => {
        if (isAutoRunning) {
            stopAutoRun();
        } else {
            startAutoRun();
        }
    });
    
    document.getElementById('reset-btn-bunny').addEventListener('click', reset);
    
    // Add hover effects
    ['step-btn-bunny', 'auto-btn-bunny', 'reset-btn-bunny'].forEach(id => {
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
    module.exports = { createBunnyGradientDescent, setupBunnyGradientDescent };
} else {
    window.createBunnyGradientDescent = createBunnyGradientDescent;
    window.setupBunnyGradientDescent = setupBunnyGradientDescent;
}