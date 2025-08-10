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
// BEHIND THE SCENES: How Gradient Descent Works
// =============================================================================

function createGradientDescentBehindTheScenes() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level" style="background: linear-gradient(to bottom, #000000, #1a1a1a);">
            <div class="level-content" style="padding: 8px; max-width: 1200px; margin: 0 auto; display: block !important; gap: 0 !important;">
                <h1 style="font-size: 2rem; margin: 0 !important; padding: 0 !important; text-align: center; color: white; line-height: 1.2;">Behind the Scenes: The Simple Trick AI Used</h1>
                
                <!-- Message at the top -->
                <div style="background: rgba(255,255,255,0.9); border-radius: 8px; padding: 8px 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center; margin: 4px 0 !important; display: block !important;">
                    <p style="margin: 0 !important; padding: 0 !important; font-size: 0.95rem; color: #333; line-height: 1.3;">Remember when the AI found the perfect energy level? Here's the simple trick it used: check how wrong the answer is, then adjust to make it better!</p>
                </div>
                
                <div style="display: grid; grid-template-columns: 3fr 2fr; gap: 15px; margin: 4px 0 0 0 !important; padding: 0 !important;">
                    <!-- Left side: Gradient Descent Visualization -->
                    <div style="background: rgba(255,255,255,0.9); border-radius: 10px; padding: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h2 style="margin: 0 0 10px 0; color: #333; font-size: 1.1rem; text-align: center;">Watch the AI Learn</h2>
                        
                        <!-- Line visualization showing steps -->
                        <div style="position: relative; height: 180px; background: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 15px; border: 1px solid #e9ecef;">
                            <!-- The horizontal line -->
                            <div style="position: absolute; left: 7%; right: 7%; top: 50%; height: 4px; background: #ddd; transform: translateY(-50%);"></div>
                            
                            <!-- Scale markers -->
                            <div style="position: absolute; left: 7%; top: 55%; transform: translateY(-50%);">
                                <div style="width: 2px; height: 15px; background: #999; margin: 0 auto;"></div>
                                <div style="color: #666; font-size: 0.75rem; margin-top: 3px;">0</div>
                            </div>
                            <div style="position: absolute; left: 50%; top: 55%; transform: translate(-50%, -50%);">
                                <div style="width: 2px; height: 15px; background: #999; margin: 0 auto;"></div>
                                <div style="color: #666; font-size: 0.75rem; margin-top: 3px;">50</div>
                            </div>
                            <div style="position: absolute; left: 93%; top: 55%; transform: translateY(-50%);">
                                <div style="width: 2px; height: 15px; background: #999; margin: 0 auto;"></div>
                                <div style="color: #666; font-size: 0.75rem; margin-top: 3px;">100</div>
                            </div>
                            
                            <!-- Target at 75 -->
                            <div style="position: absolute; left: 71.5%; top: 50%; transform: translate(-50%, -50%); width: 20px; height: 20px; border-radius: 50%; background: #2dd573; border: 2px solid white; box-shadow: 0 0 12px rgba(45,213,115,0.6); z-index: 2;">
                                <div style="position: absolute; top: -25px; left: 50%; transform: translateX(-50%); color: #2dd573; font-weight: bold; font-size: 0.85rem; white-space: nowrap;">Target</div>
                            </div>
                            
                            <!-- Starting position -->
                            <div id="start-pos" style="position: absolute; left: 25%; top: 50%; transform: translate(-50%, -50%); width: 16px; height: 16px; background: rgba(255,99,71,0.3); border: 2px dashed #ff6347; border-radius: 50%; z-index: 1;">
                                <div style="position: absolute; bottom: -25px; left: 50%; transform: translateX(-50%); color: #ff6347; font-size: 0.75rem; white-space: nowrap;">Start: 25</div>
                            </div>
                            
                            <!-- Current position -->
                            <div id="current-pos" style="position: absolute; left: 25%; top: 50%; transform: translate(-50%, -50%); width: 18px; height: 18px; background: #667eea; border-radius: 50%; transition: left 0.5s ease; box-shadow: 0 0 10px rgba(102,126,234,0.6); z-index: 3;">
                                <div id="current-label" style="position: absolute; top: -25px; left: 50%; transform: translateX(-50%); color: #667eea; font-weight: bold; font-size: 0.85rem; white-space: nowrap;">Current: 25</div>
                            </div>
                            
                            <!-- Step arrows -->
                            <div id="step-arrows" style="position: absolute; left: 25%; right: 28.5%; top: 50%; height: 2px; transform: translateY(-50%); display: none;">
                                <div style="position: absolute; right: 0; top: -4px; width: 0; height: 0; border-left: 8px solid #667eea; border-top: 5px solid transparent; border-bottom: 5px solid transparent;"></div>
                                <div style="background: repeating-linear-gradient(90deg, #667eea 0px, #667eea 4px, transparent 4px, transparent 8px); height: 100%; width: 100%;"></div>
                            </div>
                        </div>
                        
                        <!-- Iteration display -->
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                            <div style="font-size: 0.95rem; color: #333;">Iteration: <span id="iteration-count" style="font-weight: bold; color: #667eea;">0</span></div>
                            <div style="font-size: 0.95rem; color: #333;">Loss: <span id="current-loss" style="font-weight: bold; color: #ff6347;">50</span></div>
                        </div>
                        
                        <!-- Control buttons -->
                        <div style="display: flex; gap: 10px; justify-content: center;">
                            <button id="step-btn" style="padding: 8px 16px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 5px; font-size: 0.9rem; cursor: pointer; transition: all 0.3s;">
                                ➡️ Take One Step
                            </button>
                            <button id="auto-btn" style="padding: 8px 16px; background: #2dd573; color: white; border: none; border-radius: 5px; font-size: 0.9rem; cursor: pointer; transition: all 0.3s;">
                                ▶️ Auto Run
                            </button>
                            <button id="reset-btn" style="padding: 8px 16px; background: #666; color: white; border: none; border-radius: 5px; font-size: 0.9rem; cursor: pointer; transition: all 0.3s;">
                                🔄 Reset
                            </button>
                        </div>
                    </div>
                    
                    <!-- Right side: Explanation -->
                    <div style="background: rgba(255,255,255,0.9); border-radius: 10px; padding: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h2 style="margin: 0 0 12px 0; color: #333; font-size: 1.1rem;">🔄 The Simple Learning Trick</h2>
                        
                        <div style="margin-bottom: 12px; padding: 10px; background: rgba(102,126,234,0.1); border-radius: 6px; border: 1px solid rgba(102,126,234,0.3);">
                            <div style="color: #667eea; font-weight: bold; margin-bottom: 5px; font-size: 0.9rem;">How It Works:</div>
                            <p style="margin: 8px 0; color: #555; font-size: 0.85rem; line-height: 1.5;">
                                <strong>1. Check the Error:</strong> See how far off we are from the target<br>
                                <strong>2. Adjust:</strong> Move closer to reduce the error<br>
                                <strong>3. Repeat:</strong> Keep adjusting until we hit the target!
                            </p>
                            <p style="margin: 8px 0 0 0; color: #666; font-size: 0.8rem; font-style: italic;">
                                It's like playing "hot or cold" - the function tells us how wrong we are, and gradient descent automatically adjusts to get closer to the right answer.
                            </p>
                        </div>
                        
                        <div id="step-info" style="margin-bottom: 12px; padding: 10px; background: rgba(255,255,255,0.8); border-radius: 6px; border: 1px solid #ddd;">
                            <div style="color: #333; font-weight: bold; margin-bottom: 5px; font-size: 0.9rem;">What's Happening:</div>
                            <div id="step-details" style="color: #666; font-size: 0.85rem; line-height: 1.4;">
                                My answer: 25<br>
                                Right answer: 75<br>
                                How wrong: 50 away<br>
                                What to do: Move right →<br>
                                How much: About 10 units
                            </div>
                        </div>
                        
                        <div style="padding: 10px; background: rgba(45,213,115,0.1); border-radius: 6px; border: 1px solid rgba(45,213,115,0.3);">
                            <div style="color: #2dd573; font-weight: bold; margin-bottom: 5px; font-size: 0.9rem;">💡 The Big Idea:</div>
                            <p style="color: #555; font-size: 0.85rem; line-height: 1.4; margin: 0;">Gradient descent is like a smart helper that looks at your current answer, sees how wrong it is, and automatically makes it better. Each time it runs, your answer gets closer to being perfect!</p>
                        </div>
                    </div>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('gd-behind', 'createGradientDescentBehindTheScenes');
    
    // Setup simple animation
    setTimeout(() => {
        let currentValue = 25;
        let iteration = 0;
        let isAutoRunning = false;
        let autoInterval = null;
        const learningRate = 0.2;
        const target = 75;
        
        const currentPos = document.getElementById('current-pos');
        const currentLabel = document.getElementById('current-label');
        const iterationCount = document.getElementById('iteration-count');
        const currentLoss = document.getElementById('current-loss');
        const stepDetails = document.getElementById('step-details');
        const stepArrows = document.getElementById('step-arrows');
        const stepBtn = document.getElementById('step-btn');
        const autoBtn = document.getElementById('auto-btn');
        const resetBtn = document.getElementById('reset-btn');
        
        function updatePosition() {
            // Calculate position on line (7% to 93%)
            const leftPos = 7 + (currentValue * 0.86);
            currentPos.style.left = `${leftPos}%`;
            currentLabel.textContent = `Current: ${Math.round(currentValue)}`;
            
            // Update displays
            const loss = Math.abs(currentValue - target);
            iterationCount.textContent = iteration;
            currentLoss.textContent = loss.toFixed(1);
            
            // Update step details
            const direction = currentValue < target ? 'right →' : 'left ←';
            const stepSize = Math.abs(loss * learningRate);
            stepDetails.innerHTML = `
                My answer: ${Math.round(currentValue)}<br>
                Right answer: ${target}<br>
                How wrong: ${loss.toFixed(1)} away<br>
                What to do: Move ${direction}<br>
                How much: ${stepSize.toFixed(1)} units
            `;
            
            // Show/hide step arrows
            if (Math.abs(currentValue - target) > 0.5) {
                stepArrows.style.display = 'block';
                const arrowTarget = currentValue + (target - currentValue) * learningRate;
                const arrowPos = 7 + (arrowTarget * 0.86);
                stepArrows.style.left = `${leftPos}%`;
                stepArrows.style.right = `${100 - arrowPos}%`;
            } else {
                stepArrows.style.display = 'none';
            }
            
            // Color the loss value
            if (loss < 1) {
                currentLoss.style.color = '#2dd573';
            } else if (loss < 10) {
                currentLoss.style.color = '#f3960a';
            } else {
                currentLoss.style.color = '#ff6347';
            }
            
            // Disable step button if converged
            if (loss < 0.5) {
                stepBtn.disabled = true;
                stepBtn.textContent = '✅ Converged!';
                if (isAutoRunning) {
                    stopAutoRun();
                }
            } else {
                stepBtn.disabled = false;
                stepBtn.textContent = '➡️ Take One Step';
            }
        }
        
        function takeStep() {
            const gradient = currentValue - target;
            const step = -gradient * learningRate;
            currentValue += step;
            iteration++;
            updatePosition();
        }
        
        function startAutoRun() {
            isAutoRunning = true;
            autoBtn.textContent = '⏸️ Pause';
            autoInterval = setInterval(() => {
                if (Math.abs(currentValue - target) > 0.5) {
                    takeStep();
                } else {
                    stopAutoRun();
                }
            }, 500);
        }
        
        function stopAutoRun() {
            isAutoRunning = false;
            autoBtn.textContent = '▶️ Auto Run';
            if (autoInterval) {
                clearInterval(autoInterval);
                autoInterval = null;
            }
        }
        
        function reset() {
            currentValue = 25;
            iteration = 0;
            stopAutoRun();
            updatePosition();
        }
        
        // Event listeners
        stepBtn.addEventListener('click', takeStep);
        
        autoBtn.addEventListener('click', () => {
            if (isAutoRunning) {
                stopAutoRun();
            } else {
                startAutoRun();
            }
        });
        
        resetBtn.addEventListener('click', reset);
        
        // Add hover effects
        [stepBtn, autoBtn, resetBtn].forEach(btn => {
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
        updatePosition();
    }, 100);
}

// =============================================================================
// BEHIND THE SCENES PART 2: PARABOLA VISUALIZATION
// =============================================================================

function createGradientDescentBehindTheScenesPart2() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level" style="background: linear-gradient(to bottom, #000000, #1a1a1a);">
            <div class="level-content" style="padding: 8px; max-width: 1200px; margin: 0 auto; display: block !important; gap: 0 !important;">
                <h1 style="font-size: 2rem; margin: 0 !important; padding: 0 !important; text-align: center; color: white; line-height: 1.2;">Behind the Scenes: The Simple Trick AI Used Part 2</h1>
                
                <!-- Message at the top -->
                <div style="background: rgba(255,255,255,0.9); border-radius: 8px; padding: 8px 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center; margin: 4px 0 !important; display: block !important;">
                    <p style="margin: 0 !important; padding: 0 !important; font-size: 0.95rem; color: #333; line-height: 1.3;">Watch how gradient descent finds the minimum of a parabola - it always moves downhill to reduce the loss!</p>
                </div>
                
                <div style="display: grid; grid-template-columns: 3fr 2fr; gap: 15px; margin: 4px 0 0 0 !important; padding: 0 !important;">
                    <!-- Left side: Parabola Visualization -->
                    <div style="background: rgba(255,255,255,0.9); border-radius: 10px; padding: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h2 style="margin: 0 0 10px 0; color: #333; font-size: 1.1rem; text-align: center;">Function: f(x) = x²</h2>
                        
                        <!-- Graph Canvas -->
                        <div style="position: relative; background: #f8f9fa; border-radius: 8px; padding: 10px; margin-bottom: 15px; border: 1px solid #e9ecef;">
                            <canvas id="parabola-canvas" width="500" height="300" style="width: 100%; height: 300px; display: block;"></canvas>
                        </div>
                        
                        <!-- Mathematical Display -->
                        <div id="math-display" style="background: white; border-radius: 8px; padding: 15px; border: 2px solid #667eea; text-align: center; font-family: 'Courier New', monospace; transition: all 0.3s ease;">
                            <div style="font-size: 1.2rem; color: #333; font-weight: bold;">
                                f(<span id="x-value" style="color: #667eea;">3.0</span>) = <span id="x-squared" style="color: #764ba2;">9.0</span>
                            </div>
                            <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #ddd; font-size: 1rem; color: #666;">
                                Loss = <span id="loss-value" style="color: #ff6347; font-weight: bold;">9.0</span>
                            </div>
                        </div>
                        
                        <!-- Control buttons -->
                        <div style="display: flex; gap: 10px; justify-content: center; margin-top: 15px;">
                            <button id="step-btn-p2" style="padding: 8px 16px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 5px; font-size: 0.9rem; cursor: pointer; transition: all 0.3s;">
                                ➡️ Take Step
                            </button>
                            <button id="auto-btn-p2" style="padding: 8px 16px; background: #2dd573; color: white; border: none; border-radius: 5px; font-size: 0.9rem; cursor: pointer; transition: all 0.3s;">
                                ▶️ Auto Run
                            </button>
                            <button id="reset-btn-p2" style="padding: 8px 16px; background: #666; color: white; border: none; border-radius: 5px; font-size: 0.9rem; cursor: pointer; transition: all 0.3s;">
                                🔄 Reset
                            </button>
                        </div>
                    </div>
                    
                    <!-- Right side: Explanation -->
                    <div style="background: rgba(255,255,255,0.9); border-radius: 10px; padding: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h2 style="margin: 0 0 12px 0; color: #333; font-size: 1.1rem;">📉 How the AI Thinks</h2>
                        
                        <div style="margin-bottom: 12px; padding: 10px; background: rgba(102,126,234,0.1); border-radius: 6px; border: 1px solid rgba(102,126,234,0.3);">
                            <div style="color: #667eea; font-weight: bold; margin-bottom: 5px; font-size: 0.9rem;">Current State:</div>
                            <div style="color: #555; font-size: 0.85rem; line-height: 1.5