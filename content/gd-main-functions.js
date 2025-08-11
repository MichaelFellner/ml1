// Main gradient descent teaching functions
// This file has been cleaned up - all unused functions have been removed
// The functions that were in this file (like createGradientDescentPart1, createBalloonInflationLevel, etc.) 
// were not referenced in nav-config and have been deleted
// Main gradient descent teaching functions

// =============================================================================
// PART 1: GRADIENT DESCENT INTRODUCTION
// =============================================================================

function createGradientDescentPart1() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-header" style="font-size: 1.8rem; font-weight: bold;">
                Core Concept 2: Gradient Descent
            </div>
            <div class="level-content" style="padding: 15px 20px; max-width: 800px; margin: 0 auto;">
                <div style="background: rgba(102,126,234,0.1); border-radius: 10px; padding: 25px; border: 2px solid rgba(102,126,234,0.3); text-align: center;">
                    <h2 style="font-size: 1.5rem; margin: 0 0 20px 0; color: #333;">What is Gradient Descent?</h2>
                    <p style="font-size: 1.1rem; line-height: 1.6; color: #555; margin: 0;">
                        Gradient Descent is a way of making a function <strong style="color: #667eea;">f(x)</strong> go from outputting 
                        <span style="color: #ff6347; font-weight: bold;">bad (high loss)</span> outputs to 
                        <span style="color: #2dd573; font-weight: bold;">good (low loss)</span> outputs.
                    </p>
                    <p style="font-size: 1.1rem; line-height: 1.6; color: #555; margin: 20px 0 0 0;">
                        Let's start with a simple function: <strong style="font-family: 'Courier New', monospace; background: white; padding: 5px 10px; border-radius: 5px; color: #764ba2;">f(x) = w·x</strong>
                    </p>
                    <p style="font-size: 1rem; line-height: 1.6; color: #666; margin: 15px 0 0 0;">
                        Gradient descent will change the <strong style="color: #667eea;">"w"</strong> value to make the function better.
                    </p>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('gd1', 'createGradientDescentPart1');
}

// =============================================================================
// BALLOON INFLATION LEVEL
// =============================================================================

function createBalloonInflationLevel() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-header">
                🎈 Balloon Inflation Challenge
            </div>
            <div class="level-content" style="padding: 10px 20px; max-width: 1000px; margin: 0 auto;">
                <!-- Instructions -->
                <div style="background: rgba(102,126,234,0.1); border-radius: 10px; padding: 15px; margin-bottom: 0px; border: 2px solid rgba(102,126,234,0.3); text-align: center;">
                    <p style="font-size: 1rem; color: #555; margin: 0;">
                        <strong>Goal:</strong> Find the right amount of air for different sized balloons!<br>
                        <span style="font-size: 0.9rem; color: #666;">Amount of air = <strong style="color: #667eea;">w × (balloon size)</strong></span><br>
                        This challenge should be pretty easy, there's only one variable to tune that will solve the formula for how much air to give each size balloon.
                    </p>
                </div><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: -30px;">
                    <!-- Left side: Balloon Display -->
                    <div style="background: rgba(255,255,255,0.9); border-radius: 15px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h3 style="margin: 0 0 15px 0; color: #333; text-align: center;">Current Balloon</h3>
                        
                        <!-- Balloon visualization -->
                        <div style="text-align: center; padding: 20px; background: linear-gradient(to bottom, #e3f2fd, #bbdefb); border-radius: 10px; margin-bottom: 15px; position: relative; height: 200px;">
                            <div id="balloon-container" style="position: relative; height: 100%; display: flex; align-items: center; justify-content: center;">
                                <div id="balloon-emoji" style="font-size: 80px; transition: all 0.5s ease;">🎈</div>
                                <div id="pop-effect" style="position: absolute; font-size: 100px; opacity: 0; transition: opacity 0.3s;">💥</div>
                            </div>
                            <div style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); font-size: 1.1rem; color: #333;">
                                Size: <span id="balloon-size" style="font-weight: bold; color: #667eea; font-size: 1.3rem;">1</span>
                            </div>
                        </div>
                        
                        <!-- Result display -->
                        <div id="result-display" style="display: none; padding: 15px; border-radius: 8px; margin-top: 15px; text-align: center;">
                            <div id="result-message" style="font-size: 1rem; font-weight: bold; margin-bottom: 10px;"></div>
                            <div style="font-size: 0.9rem; color: #666;">
                                You gave: <span id="given-air" style="font-weight: bold;">0</span> units of air<br>
                                Perfect amount: <span id="needed-air" style="font-weight: bold;">0</span> units of air<br>
                                Difference: <span id="difference-value" style="font-weight: bold; color: #ff6347;">0</span>
                            </div>
                        </div>
                        
                        <!-- Balloon selector -->
                        <div style="margin-top: 20px; padding: 15px; background: rgba(102,126,234,0.05); border-radius: 8px;">
                            <div style="font-size: 0.9rem; color: #666; margin-bottom: 10px;">Test different balloon sizes:</div>
                            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                                <button class="balloon-btn" data-size="1" style="padding: 8px 12px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">Size 1 🎈</button>
                                <button class="balloon-btn" data-size="2" style="padding: 8px 12px; background: white; color: #333; border: 2px solid #ddd; border-radius: 5px; cursor: pointer;">Size 2 🎈</button>
                                <button class="balloon-btn" data-size="3" style="padding: 8px 12px; background: white; color: #333; border: 2px solid #ddd; border-radius: 5px; cursor: pointer;">Size 3 🎈</button>
                                <button class="balloon-btn" data-size="4" style="padding: 8px 12px; background: white; color: #333; border: 2px solid #ddd; border-radius: 5px; cursor: pointer;">Size 4 🎈</button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right side: Controls -->
                    <div style="background: rgba(255,255,255,0.9); border-radius: 15px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h3 style="margin: 0 0 15px 0; color: #333; text-align: center;">Your Formula</h3>
                        
                        <!-- Formula display -->
                        <div style="background: white; border: 2px solid #667eea; border-radius: 8px; padding: 15px; margin-bottom: 20px; text-align: center; font-family: 'Courier New', monospace;">
                            <div style="font-size: 1.2rem; color: #333;">
                                air = <span style="color: #667eea; font-weight: bold;" id="w-display">1</span> × size
                            </div>
                            <div style="font-size: 0.9rem; color: #666; margin-top: 8px;">
                                For this balloon: <span id="formula-result" style="font-weight: bold;">1</span> units of air
                            </div>
                        </div>
                        
                        <!-- W control -->
                        <div style="margin-bottom: 25px;">
                            <label style="display: block; margin-bottom: 8px; color: #333; font-weight: bold;">
                                w (air multiplier): <span id="w-value" style="color: #667eea;">1</span>
                            </label>
                            <input type="range" id="w-slider" min="0" max="15" value="1" step="0.5" style="width: 100%; height: 8px; border-radius: 4px; background: #ddd; outline: none;">
                            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #999; margin-top: 5px;">
                                <span>0</span>
                                <span>7.5</span>
                                <span>15</span>
                            </div>
                        </div>
                        
                        <!-- Inflate button -->
                        <button id="inflate-btn" style="width: 100%; padding: 12px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 8px; font-size: 1.1rem; font-weight: bold; cursor: pointer; transition: all 0.3s;">
                            💨 Inflate Balloon
                        </button>
                        
                    
                        
                        <!-- Success tracking -->
                        <div id="success-tracker" style="margin-top: 20px; padding: 15px; background: rgba(45,213,115,0.1); border-radius: 8px; border: 1px solid rgba(45,213,115,0.3); display: none;">
                            <div style="text-align: center; color: #2dd573; font-weight: bold;">
                                🎉 Perfect Formula Found! 🎉<br>
                                <span style="font-size: 0.9rem; color: #333;">f(x) = 7x</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('balloon-level', 'createBalloonInflationLevel');
    
    // Setup balloon level logic
    setupBalloonLevel();
}

function setupBalloonLevel() {
    // True function: f(x) = 7x
    const TRUE_W = 7;
    
    let currentBalloonSize = 1;
    let perfectBalloons = 0;
    
    const wSlider = document.getElementById('w-slider');
    const inflateBtn = document.getElementById('inflate-btn');
    const balloonButtons = document.querySelectorAll('.balloon-btn');
    
    function updateFormula() {
        const w = parseFloat(wSlider.value);
        
        document.getElementById('w-display').textContent = w;
        document.getElementById('w-value').textContent = w;
        
        const result = w * currentBalloonSize;
        document.getElementById('formula-result').textContent = result.toFixed(1);
    }
    
    function inflateBalloon() {
        const w = parseFloat(wSlider.value);
        
        const yourAnswer = w * currentBalloonSize;
        const correctAnswer = TRUE_W * currentBalloonSize;
        const difference = yourAnswer - correctAnswer;
        const percentDiff = (yourAnswer / correctAnswer) * 100;
        
        // Update result display
        const resultDisplay = document.getElementById('result-display');
        const resultMessage = document.getElementById('result-message');
        const balloonEmoji = document.getElementById('balloon-emoji');
        const popEffect = document.getElementById('pop-effect');
        
        resultDisplay.style.display = 'block';
        document.getElementById('given-air').textContent = yourAnswer.toFixed(1);
        document.getElementById('needed-air').textContent = correctAnswer.toFixed(1);
        document.getElementById('difference-value').textContent = Math.abs(difference).toFixed(1);
        
        // Reset animations
        popEffect.style.opacity = '0';
        balloonEmoji.style.transform = 'scale(1)';
        balloonEmoji.style.opacity = '1';
        
        if (percentDiff >= 95 && percentDiff <= 105) {
            // Perfect!
            resultDisplay.style.background = 'rgba(45,213,115,0.1)';
            resultDisplay.style.border = '2px solid rgba(45,213,115,0.3)';
            resultMessage.style.color = '#2dd573';
            resultMessage.textContent = '🎉 Perfect! The balloon is just right!';
            balloonEmoji.style.transform = 'scale(1.2)';
            balloonEmoji.textContent = '🎈';
            
            perfectBalloons++;
            
            // Check if formula is perfect
            if (w === TRUE_W) {
                document.getElementById('success-tracker').style.display = 'block';
            }
        } else if (percentDiff < 95) {
            // Too little - deflated
            resultDisplay.style.background = 'rgba(255,215,0,0.1)';
            resultDisplay.style.border = '2px solid rgba(255,215,0,0.3)';
            resultMessage.style.color = '#f3960a';
            resultMessage.textContent = '😔 The balloon looks deflated...';
            balloonEmoji.style.transform = 'scale(0.7)';
            balloonEmoji.style.opacity = '0.6';
            balloonEmoji.textContent = '🎈';
        } else {
            // Too much - pop!
            resultDisplay.style.background = 'rgba(255,99,71,0.1)';
            resultDisplay.style.border = '2px solid rgba(255,99,71,0.3)';
            resultMessage.style.color = '#ff6347';
            resultMessage.textContent = '💥 POP! Too much air!';
            
            // Pop animation
            balloonEmoji.style.opacity = '0';
            popEffect.style.opacity = '1';
            setTimeout(() => {
                popEffect.style.opacity = '0';
                balloonEmoji.style.opacity = '1';
                balloonEmoji.textContent = '💔';
                balloonEmoji.style.transform = 'scale(0.5)';
            }, 300);
        }
        
        // Shake animation for feedback
        resultDisplay.style.animation = 'shake 0.3s';
        setTimeout(() => {
            resultDisplay.style.animation = '';
        }, 300);
    }
    
    // Balloon selector
    balloonButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            balloonButtons.forEach(b => {
                b.style.background = 'white';
                b.style.color = '#333';
                b.style.border = '2px solid #ddd';
            });
            btn.style.background = '#667eea';
            btn.style.color = 'white';
            btn.style.border = 'none';
            
            // Update current balloon
            currentBalloonSize = parseInt(btn.dataset.size);
            document.getElementById('balloon-size').textContent = currentBalloonSize;
            
            // Reset balloon display
            const balloonEmoji = document.getElementById('balloon-emoji');
            balloonEmoji.textContent = '🎈';
            balloonEmoji.style.transform = 'scale(1)';
            balloonEmoji.style.opacity = '1';
            
            // Update balloon size visually
            const baseSize = 60;
            balloonEmoji.style.fontSize = `${baseSize + (currentBalloonSize * 10)}px`;
            
            // Hide previous result
            document.getElementById('result-display').style.display = 'none';
            
            // Update formula display
            updateFormula();
        });
    });
    
    // Slider listener
    wSlider.addEventListener('input', updateFormula);
    
    // Inflate button
    inflateBtn.addEventListener('click', inflateBalloon);
    
    // Add hover effect to inflate button
    inflateBtn.addEventListener('mouseenter', () => {
        inflateBtn.style.transform = 'translateY(-2px)';
        inflateBtn.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    });
    inflateBtn.addEventListener('mouseleave', () => {
        inflateBtn.style.transform = 'translateY(0)';
        inflateBtn.style.boxShadow = 'none';
    });
    
    // Add shake animation CSS if not already present
    if (!document.getElementById('shake-style')) {
        const style = document.createElement('style');
        style.id = 'shake-style';
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Initialize
    updateFormula();
}

// =============================================================================
// GRADIENT DESCENT BALLOON OPTIMIZER
// =============================================================================

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
    
    function calculateLoss() {
        let totalLoss = 0;
        for (const size of TEST_SIZES) {
            const predicted = currentW * size;
            const actual = TRUE_W * size;
            totalLoss += Math.abs(predicted - actual);
        }
        return totalLoss;
    }
    
    function calculateGradient() {
        // Using sign-based gradient for L1 loss
        let gradient = 0;
        for (const size of TEST_SIZES) {
            const predicted = currentW * size;
            const actual = TRUE_W * size;
            const error = predicted - actual;
            const sign = error > 0 ? 1 : (error < 0 ? -1 : 0);
            gradient += sign * size;
        }
        return gradient;  // Don't divide - keep full gradient strength
    }
    
    function updateDisplay() {
        // Update w display
        document.getElementById('current-w').textContent = currentW.toFixed(2);
        
        // Update balloons
        // for (const size of TEST_SIZES) {
        //     const predicted = Math.round(currentW * size);
        //     const actual = TRUE_W * size;
        //     const balloon = document.getElementById(`balloon-${size}`);
        //     const gotText = document.getElementById(`balloon-${size}-got`);
            
        //     gotText.textContent = `Got: ${predicted}`;
            
        //     const percentDiff = (predicted / actual) * 100;
        //     if (percentDiff >= 95 && percentDiff <= 105) {
        //         balloon.textContent = '🎈';
        //         balloon.style.opacity = '1';
        //         balloon.style.transform = 'scale(1)';
        //     } else if (percentDiff < 95) {
        //         balloon.textContent = '🎈';
        //         balloon.style.opacity = '0.5';
        //         balloon.style.transform = 'scale(0.8)';
        //     } else {
        //         balloon.textContent = '💥';
        //         balloon.style.opacity = '1';
        //         balloon.style.transform = 'scale(1.1)';
        //     }
        // }
        
        // Update loss
        const loss = calculateLoss();
        document.getElementById('total-loss').textContent = Math.round(loss);
        
        // Update loss bar
        const maxLoss = 84; // Maximum possible loss when w=0 for our test sizes
        const lossPercent = Math.max(0, Math.min(100, (loss / maxLoss) * 100));
        document.getElementById('loss-bar').style.width = `${lossPercent}%`;
        
        // Update gradient info
        // const gradient = calculateGradient();
        // document.getElementById('gradient-value').textContent = gradient.toFixed(2);
        // const nextW = currentW - LEARNING_RATE * gradient;
        // document.getElementById('next-w').textContent = nextW.toFixed(2);
        
        // // Update iteration
        // document.getElementById('iteration').textContent = iteration;
        
        // Check for success (allow small tolerance)
        if (loss < 1 || Math.abs(currentW - TRUE_W) < 0.05) {
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
        const oldW = currentW;
        const oldLoss = calculateLoss();
        
        // Update w using gradient descent
        currentW = currentW - LEARNING_RATE * gradient;
        
        // Clamp to reasonable range
        currentW = Math.max(0, Math.min(15, currentW));
        
        // Round to 2 decimal places
        currentW = Math.round(currentW * 100) / 100;
        
        iteration++;
        
        const newLoss = calculateLoss();
        
        updateDisplay();
    }
    
    function startAutoRun() {
        isAutoRunning = true;
        document.getElementById('auto-btn').textContent = '⏸️ Pause';
        
        autoInterval = setInterval(() => {
            const loss = calculateLoss();
            if (loss < 1 || Math.abs(currentW - TRUE_W) < 0.05) {
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
        
        const history = document.getElementById('history');
        history.innerHTML = '<div>Starting optimization with w = ' + currentW.toFixed(2) + '</div>';
        
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

// =============================================================================
// GRADIENT DESCENT PART 1B: INTRODUCING BIAS
// =============================================================================

function createGradientDescentPart1b() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-header">
                ⚡ Adding Complexity: The Bias Term
            </div>
            <div class="level-content" style="padding: 15px 20px; max-width: 800px; margin: 0 auto;">
                <div style="background: rgba(102,126,234,0.1); border-radius: 10px; padding: 25px; border: 2px solid rgba(102,126,234,0.3); text-align: center;">
                    <h2 style="font-size: 1.5rem; margin: 0 0 20px 0; color: #333;">What if we need more flexibility?</h2>
                    
                    <p style="font-size: 1.1rem; line-height: 1.6; color: #555; margin: 0;">
                        You just mastered <strong style="font-family: 'Courier New', monospace; background: white; padding: 5px 10px; border-radius: 5px; color: #764ba2;">f(x) = w·x</strong>
                    </p>
                    
                    <p style="font-size: 1rem; line-height: 1.6; color: #666; margin: 15px 0;">
                        But sometimes we need a function that doesn't start at zero!<br>
                        What if balloons needed a <em>base amount</em> of air plus extra for their size?
                    </p>
                    
                    <div style="background: white; border-radius: 8px; padding: 20px; margin: 20px 0; border: 2px solid #667eea;">
                        <p style="font-size: 1.2rem; line-height: 1.6; color: #333; margin: 0;">
                            Enter the more powerful function:<br>
                            <strong style="font-family: 'Courier New', monospace; font-size: 1.3rem; color: #764ba2;">f(x) = w·x + b</strong>
                        </p>
                        
                        <div style="margin-top: 15px; padding-top: 15px; border-top: 2px dashed #ddd;">
                            <p style="font-size: 0.95rem; color: #555; margin: 5px 0;">
                                <strong style="color: #667eea;">w</strong> = the multiplier (slope)<br>
                                <strong style="color: #764ba2;">b</strong> = the bias (starting point)
                            </p>
                        </div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px;">
                        <div style="background: rgba(255,215,0,0.1); border-radius: 8px; padding: 15px; border: 2px solid rgba(255,215,0,0.3);">
                            <h3 style="font-size: 1rem; margin: 0 0 10px 0; color: #f39c12;">🎯 The Good:</h3>
                            <p style="font-size: 0.9rem; line-height: 1.4; color: #666; margin: 0;">
                                Can find more complicated patterns!<br>
                                More flexible and powerful.<br>
                                Works for real-world problems.
                            </p>
                        </div>
                        
                        <div style="background: rgba(255,99,71,0.1); border-radius: 8px; padding: 15px; border: 2px solid rgba(255,99,71,0.3);">
                            <h3 style="font-size: 1rem; margin: 0 0 10px 0; color: #ff6347;">🤔 The Challenge:</h3>
                            <p style="font-size: 0.9rem; line-height: 1.4; color: #666; margin: 0;">
                                Two parameters to optimize!<br>
                                Much harder to find by hand.<br>
                                This is where AI really shines!
                            </p>
                        </div>
                    </div>
                    
                    <div style="background: rgba(45,213,115,0.1); border-radius: 8px; padding: 15px; margin-top: 20px; border: 2px solid rgba(45,213,115,0.3);">
                        <p style="font-size: 1rem; line-height: 1.5; color: #333; margin: 0;">
                            <strong style="color: #2dd573;">💡 Key Insight:</strong> Gradient descent can optimize <em>both</em> <strong>w</strong> and <strong>b</strong> at the same time!<br>
                            <span style="font-size: 0.9rem; color: #666;">Let's see this in action with the bunny feeding challenge...</span>
                        </p>
                    </div>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('gd1b', 'createGradientDescentPart1b');
}

// =============================================================================
// BUNNY FEEDING LEVEL
// =============================================================================

function createBunnyFeedingLevel() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-header">
                🐰 Bunny Feeding Challenge
            </div>
            <div class="level-content" style="padding: 10px 20px; max-width: 1000px; margin: 0 auto;">
                <!-- Instructions -->
                <div style="background: rgba(255,215,0,0.1); border-radius: 10px; padding: 15px; margin-bottom: 0px; border: 2px solid rgba(255,215,0,0.3); text-align: center;">
                    <p style="font-size: 1rem; color: #555; margin: 0;">
                        <strong>Goal:</strong> Find the right formula to feed bunnies based on their weight!<br>
                        <span style="font-size: 0.9rem; color: #666;">The amount of hay needed = <strong style="color: #667eea;">w × (bunny weight) + b</strong></span><br>
                        The amount of each hay each bunny needs depends on its weight. But the function is now a little bit more difficult to discover, since there are now
                        two variables to optimize. Feel free to give it a go by hand, but don't worry too much if it's too difficult. Feel free to go to the next part 
                        even if you can't find the correct <strong style="color: #667eea;">w</strong> and <strong style="color: #667eea;">b</strong> values
                    </p>
                </div><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: -30px;">
                    <!-- Left side: Bunny Display -->
                    <div style="background: rgba(255,255,255,0.9); border-radius: 15px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h3 style="margin: 0 0 15px 0; color: #333; text-align: center;">Current Bunny</h3>
                        
                        <!-- Bunny visualization -->
                        <div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 10px; margin-bottom: 15px;">
                            <div id="bunny-emoji" style="font-size: 80px; margin-bottom: 10px;">🐰</div>
                            <div style="font-size: 1.1rem; color: #333;">
                                Weight: <span id="bunny-weight" style="font-weight: bold; color: #667eea; font-size: 1.3rem;">2</span> kg
                            </div>
                        </div>
                        
                        <!-- Result display -->
                        <div id="result-display" style="display: none; padding: 15px; border-radius: 8px; margin-top: 15px; text-align: center;">
                            <div id="result-message" style="font-size: 1rem; font-weight: bold; margin-bottom: 10px;"></div>
                            <div style="font-size: 0.9rem; color: #666;">
                                You gave: <span id="given-hay" style="font-weight: bold;">0</span> units of hay<br>
                                Needed: <span id="needed-hay" style="font-weight: bold;">0</span> units of hay<br>
                                Loss: <span id="loss-value" style="font-weight: bold; color: #ff6347;">0</span>
                            </div>
                        </div>
                        
                        <!-- Bunny selector -->
                        <div style="margin-top: 20px; padding: 15px; background: rgba(102,126,234,0.05); border-radius: 8px;">
                            <div style="font-size: 0.9rem; color: #666; margin-bottom: 10px;">Test different bunnies:</div>
                            <div style="display: flex; gap: 10px; justify-content: center;">
                                <button class="bunny-btn" data-weight="2" style="padding: 8px 12px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">2kg 🐰</button>
                                <button class="bunny-btn" data-weight="4" style="padding: 8px 12px; background: white; color: #333; border: 2px solid #ddd; border-radius: 5px; cursor: pointer;">4kg 🐰</button>
                                <button class="bunny-btn" data-weight="6" style="padding: 8px 12px; background: white; color: #333; border: 2px solid #ddd; border-radius: 5px; cursor: pointer;">6kg 🐰</button>
                                <button class="bunny-btn" data-weight="8" style="padding: 8px 12px; background: white; color: #333; border: 2px solid #ddd; border-radius: 5px; cursor: pointer;">8kg 🐰</button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right side: Controls -->
                    <div style="background: rgba(255,255,255,0.9); border-radius: 15px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h3 style="margin: 0 0 15px 0; color: #333; text-align: center;">Your Formula</h3>
                        
                        <!-- Formula display -->
                        <div style="background: white; border: 2px solid #667eea; border-radius: 8px; padding: 15px; margin-bottom: 20px; text-align: center; font-family: 'Courier New', monospace;">
                            <div style="font-size: 1.2rem; color: #333;">
                                hay = <span style="color: #667eea; font-weight: bold;" id="w-display">1</span> × weight + <span style="color: #764ba2; font-weight: bold;" id="b-display">0</span>
                            </div>
                            <div style="font-size: 0.9rem; color: #666; margin-top: 8px;">
                                For this bunny: <span id="formula-result" style="font-weight: bold;">2</span> units of hay
                            </div>
                        </div>
                        
                        <!-- W control -->
                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 8px; color: #333; font-weight: bold;">
                                w (multiplier): <span id="w-value" style="color: #667eea;">1</span>
                            </label>
                            <input type="range" id="w-slider" min="0" max="10" value="1" step="0.5" style="width: 100%; height: 8px; border-radius: 4px; background: #ddd; outline: none;">
                            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #999; margin-top: 5px;">
                                <span>0</span>
                                <span>5</span>
                                <span>10</span>
                            </div>
                        </div>
                        
                        <!-- B control -->
                        <div style="margin-bottom: 25px;">
                            <label style="display: block; margin-bottom: 8px; color: #333; font-weight: bold;">
                                b (base amount): <span id="b-value" style="color: #764ba2;">0</span>
                            </label>
                            <input type="range" id="b-slider" min="0" max="20" value="0" step="1" style="width: 100%; height: 8px; border-radius: 4px; background: #ddd; outline: none;">
                            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #999; margin-top: 5px;">
                                <span>0</span>
                                <span>10</span>
                                <span>20</span>
                            </div>
                        </div>
                        
                        <!-- Feed button -->
                        <button id="feed-btn" style="width: 100%; padding: 12px; background: linear-gradient(135deg, #2dd573, #1cb85c); color: white; border: none; border-radius: 8px; font-size: 1.1rem; font-weight: bold; cursor: pointer; transition: all 0.3s;">
                            🥕 Feed Bunny
                        </button>
                        
                        <!-- Success tracking -->
                        <div id="success-tracker" style="margin-top: 20px; padding: 15px; background: rgba(45,213,115,0.1); border-radius: 8px; border: 1px solid rgba(45,213,115,0.3); display: none;">
                            <div style="text-align: center; color: #2dd573; font-weight: bold;">
                                🎉 Perfect Formula Found! 🎉<br>
                                <span style="font-size: 0.9rem; color: #333;">f(x) = 5x + 10</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('bunny-level', 'createBunnyFeedingLevel');
    
    // Setup bunny level logic
    setupBunnyLevel();
}

function setupBunnyLevel() {
    // True function: f(x) = 5x + 10
    const TRUE_W = 5;
    const TRUE_B = 10;
    
    let currentBunnyWeight = 2;
    let correctBunnies = new Set();
    
    const wSlider = document.getElementById('w-slider');
    const bSlider = document.getElementById('b-slider');
    const feedBtn = document.getElementById('feed-btn');
    const bunnyButtons = document.querySelectorAll('.bunny-btn');
    
    function updateFormula() {
        const w = parseFloat(wSlider.value);
        const b = parseFloat(bSlider.value);
        
        document.getElementById('w-display').textContent = w;
        document.getElementById('w-value').textContent = w;
        document.getElementById('b-display').textContent = b;
        document.getElementById('b-value').textContent = b;
        
        const result = w * currentBunnyWeight + b;
        document.getElementById('formula-result').textContent = result.toFixed(1);
    }
    
    function feedBunny() {
        const w = parseFloat(wSlider.value);
        const b = parseFloat(bSlider.value);
        
        const yourAnswer = w * currentBunnyWeight + b;
        const correctAnswer = TRUE_W * currentBunnyWeight + TRUE_B;
        const loss = Math.abs(yourAnswer - correctAnswer);
        
        // Update result display
        const resultDisplay = document.getElementById('result-display');
        const resultMessage = document.getElementById('result-message');
        const bunnyEmoji = document.getElementById('bunny-emoji');
        
        resultDisplay.style.display = 'block';
        document.getElementById('given-hay').textContent = yourAnswer.toFixed(1);
        document.getElementById('needed-hay').textContent = correctAnswer.toFixed(1);
        document.getElementById('loss-value').textContent = loss.toFixed(1);
        
        if (loss < 0.5) {
            // Perfect!
            resultDisplay.style.background = 'rgba(45,213,115,0.1)';
            resultDisplay.style.border = '2px solid rgba(45,213,115,0.3)';
            resultMessage.style.color = '#2dd573';
            resultMessage.textContent = '🎉 Perfect! The bunny is happy!';
            bunnyEmoji.textContent = '🐰';
            
            // Mark this bunny as correctly fed
            correctBunnies.add(currentBunnyWeight);
            
            // Check if formula is perfect
            if (w === TRUE_W && b === TRUE_B) {
                document.getElementById('success-tracker').style.display = 'block';
            }
        } else if (yourAnswer < correctAnswer) {
            // Too little
            resultDisplay.style.background = 'rgba(255,215,0,0.1)';
            resultDisplay.style.border = '2px solid rgba(255,215,0,0.3)';
            resultMessage.style.color = '#f3960a';
            resultMessage.textContent = '😔 The bunny is still a little hungry...';
            bunnyEmoji.textContent = '😢';
        } else {
            // Too much
            resultDisplay.style.background = 'rgba(255,99,71,0.1)';
            resultDisplay.style.border = '2px solid rgba(255,99,71,0.3)';
            resultMessage.style.color = '#ff6347';
            resultMessage.textContent = '😴 The bunny ate too much and had to take a nap!';
            bunnyEmoji.textContent = '😵';
        }
        
        // Shake animation for feedback
        resultDisplay.style.animation = 'shake 0.3s';
        setTimeout(() => {
            resultDisplay.style.animation = '';
        }, 300);
    }
    
    // Bunny selector
    bunnyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            bunnyButtons.forEach(b => {
                b.style.background = 'white';
                b.style.color = '#333';
                b.style.border = '2px solid #ddd';
            });
            btn.style.background = '#667eea';
            btn.style.color = 'white';
            btn.style.border = 'none';
            
            // Update current bunny
            currentBunnyWeight = parseInt(btn.dataset.weight);
            document.getElementById('bunny-weight').textContent = currentBunnyWeight;
            document.getElementById('bunny-emoji').textContent = '🐰';
            
            // Hide previous result
            document.getElementById('result-display').style.display = 'none';
            
            // Update formula display
            updateFormula();
        });
    });
    
    // Slider listeners
    wSlider.addEventListener('input', updateFormula);
    bSlider.addEventListener('input', updateFormula);
    
    // Feed button
    feedBtn.addEventListener('click', feedBunny);
    
    // Add hover effect to feed button
    feedBtn.addEventListener('mouseenter', () => {
        feedBtn.style.transform = 'translateY(-2px)';
        feedBtn.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    });
    feedBtn.addEventListener('mouseleave', () => {
        feedBtn.style.transform = 'translateY(0)';
        feedBtn.style.boxShadow = 'none';
    });
    
    // Add shake animation CSS if not already present
    if (!document.getElementById('shake-style')) {
        const style = document.createElement('style');
        style.id = 'shake-style';
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Initialize
    updateFormula();
}

// =============================================================================
// GRADIENT DESCENT BUNNY OPTIMIZER
// =============================================================================

function createBunnyGradientDescent() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-header">
                🤖🐰 AI Bunny Feeder - The Real Power of Gradient Descent
            </div>
            <div class="level-content" style="padding: 10px 20px; max-width: 1100px; margin: 0 auto;">
                <!-- Instructions -->
                <div style="background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(45,213,115,0.1)); border-radius: 10px; padding: 15px; margin-bottom: 0px; border: 2px solid rgba(102,126,234,0.3); text-align: center;">
                    <p style="font-size: 1rem; color: #555; margin: 0;">
                        <strong>What was tricky for us is easy for Gradient Descent</strong><br>
                        <span style="font-size: 0.9rem; color: #666;">Use Gradient Descent to optimize BOTH <strong style="color: #667eea;">w</strong> and <strong style="color: #764ba2;">b</strong> simultaneously!</span><br>

                    </p>
                </div><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: -35px;">
                    <!-- Left side: Visualization -->
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
                                        <span id="bunny-2-got" style="color: #667eea;">Got: 5</span>
                                    </div>
                                </div>
                                <div>
                                    <div style="font-size: 0.8rem; color: #666; margin-bottom: 3px;">4kg</div>
                                    <div id="bunny-4" style="font-size: 40px;">🐰</div>
                                    <div style="font-size: 0.7rem; color: #333;">
                                        Need: 30<br>
                                        <span id="bunny-4-got" style="color: #667eea;">Got: 7</span>
                                    </div>
                                </div>
                                <div>
                                    <div style="font-size: 0.8rem; color: #666; margin-bottom: 3px;">6kg</div>
                                    <div id="bunny-6" style="font-size: 45px;">🐰</div>
                                    <div style="font-size: 0.7rem; color: #333;">
                                        Need: 40<br>
                                        <span id="bunny-6-got" style="color: #667eea;">Got: 9</span>
                                    </div>
                                </div>
                                <div>
                                    <div style="font-size: 0.8rem; color: #666; margin-bottom: 3px;">8kg</div>
                                    <div id="bunny-8" style="font-size: 50px;">🐰</div>
                                    <div style="font-size: 0.7rem; color: #333;">
                                        Need: 50<br>
                                        <span id="bunny-8-got" style="color: #667eea;">Got: 11</span>
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
                                    Loss: <span id="total-loss-bunny">108</span>
                                </div>
                            </div>
                        </div>
                        
                       
                    </div>
                    
                    <!-- Right side: Controls -->
                    <div style="background: rgba(255,255,255,0.9); border-radius: 15px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h3 style="margin: 0 0 15px 0; color: #333; text-align: center;">Two-Parameter Optimization</h3>
                        
                        <!-- Current state display -->
                        <div style="background: white; border: 2px solid #667eea; border-radius: 8px; padding: 15px; margin-bottom: 20px; text-align: center; font-family: 'Courier New', monospace;">
                            <div style="font-size: 1.2rem; color: #333;">
                                f(x) = <span id="current-w-bunny" style="color: #667eea; font-weight: bold;">1.0</span>×x + <span id="current-b-bunny" style="color: #764ba2; font-weight: bold;">3.0</span>
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
                            🔄 Reset to Random
                        </button>
                        
                        <!-- Success message -->
                        <div id="success-message-bunny" style="display: none; margin-top: 20px; padding: 15px; background: rgba(45,213,115,0.1); border-radius: 8px; border: 2px solid rgba(45,213,115,0.3); text-align: center;">
                            <div style="color: #2dd573; font-weight: bold; font-size: 1.1rem;">
                                🎉 Perfect! Found w = 5, b = 10! 🎉
                            </div>
                            <div style="color: #666; font-size: 0.9rem; margin-top: 5px;">
                                All bunnies are perfectly fed!
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
    const LEARNING_RATE_W = 0.003;
    const LEARNING_RATE_B = 0.02;
    const TEST_WEIGHTS = [2, 4, 6, 8];
    
    let currentW = 1.0;
    let currentB = 3.0;
    let iteration = 0;
    let isAutoRunning = false;
    let autoInterval = null;
    let paramHistory = [{w: currentW, b: currentB}];
    
    function calculateLoss() {
        let totalLoss = 0;
        for (const weight of TEST_WEIGHTS) {
            const predicted = currentW * weight + currentB;
            const actual = TRUE_W * weight + TRUE_B;
            totalLoss += Math.abs(predicted - actual);
        }
        return totalLoss;
    }
    
    function calculateGradients() {
        let gradW = 0;
        let gradB = 0;
        
        for (const weight of TEST_WEIGHTS) {
            const predicted = currentW * weight + currentB;
            const actual = TRUE_W * weight + TRUE_B;
            const error = predicted - actual;
            const sign = error > 0 ? 1 : (error < 0 ? -1 : 0);
            
            gradW += sign * weight;
            gradB += sign;
        }
        
        return {gradW, gradB};
    }
    
    function updateDisplay() {
        //Update current values
        document.getElementById('current-w-bunny').textContent = currentW.toFixed(2);
        document.getElementById('current-b-bunny').textContent = currentB.toFixed(1);
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
        const maxLoss = 108; // Initial loss with w=1, b=3
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
        
        // Update gradients
        const {gradW, gradB} = calculateGradients();

    
        
    }
    
    
    function takeStep() {
        const {gradW, gradB} = calculateGradients();
        const oldW = currentW;
        const oldB = currentB;
        const oldLoss = calculateLoss();
        
        // Update parameters using gradient descent
        currentW = currentW - LEARNING_RATE_W * gradW;
        currentB = currentB - LEARNING_RATE_B * gradB;
        
        // Clamp to reasonable ranges
        currentW = Math.max(0, Math.min(10, currentW));
        currentB = Math.max(0, Math.min(20, currentB));
        
        // Round for display
        currentW = Math.round(currentW * 100) / 100;
        currentB = Math.round(currentB * 10) / 10;
        
        iteration++;
        paramHistory.push({w: currentW, b: currentB});
        
        const newLoss = calculateLoss();
        
        updateDisplay();
    }
    
    function startAutoRun() {
        isAutoRunning = true;
        document.getElementById('auto-btn-bunny').textContent = '⏸️ Pause';
        
        autoInterval = setInterval(() => {
            const loss = calculateLoss();
            if (loss < 2 || (Math.abs(currentW - TRUE_W) < 0.1 && Math.abs(currentB - TRUE_B) < 0.5)) {
                stopAutoRun();
            } else {
                takeStep();
            }
        }, 400);
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
        currentW = Math.random() * 3 + 0.5; // Random between 0.5 and 3.5
        currentB = Math.random() * 8; // Random between 0 and 8
        currentW = Math.round(currentW * 100) / 100;
        currentB = Math.round(currentB * 10) / 10;
        iteration = 0;
        paramHistory = [{w: currentW, b: currentB}];
        stopAutoRun();
        
        const history = document.getElementById('history-bunny');
        history.innerHTML = `<div>Starting with w=${currentW.toFixed(1)}, b=${currentB.toFixed(1)}</div>`;
        
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