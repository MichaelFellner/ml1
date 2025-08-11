// Coffee Optimizer - Gradient Descent Version
// Watch the algorithm learn to find the correct weights automatically

/**
 * @fileoverview Coffee shop gradient descent tutorial for the MLTEACH application.
 * Interactive demonstration of gradient descent in a business context.
 */

/**
 * Creates the coffee gradient descent demonstration
 * @function createCoffeeGradientDescent
 * @description Shows how gradient descent can automatically optimize the coffee formula
 * @returns {void}
 */
function createCoffeeGradientDescent() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration" style="padding: 20px; max-width: 1100px; margin: 0 auto;">
                <h1 style="font-size: 1.8rem; margin: 0 0 15px 0; text-align: center; color: #2c3e50;">Coffee Formula - Gradient Descent</h1>
                
                <!-- Explanation Box -->
                <div style="background: linear-gradient(135deg, #3498db, #2980b9); border-radius: 12px; padding: 18px; margin-bottom: 20px; color: white; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                    <div style="font-size: 0.95rem; line-height: 1.5; text-align: center;">
                        Watch <strong>Gradient Descent</strong> automatically find the correct weights! The algorithm calculates how wrong each weight is, 
                        then adjusts them to reduce the error. Press "Step" to see one update, or "Auto Run" to watch it learn continuously.
                    </div>
                </div>
                
                <!-- Main Container -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    
                    <!-- Left Side: Students Display -->
                    <div style="background: #2c3e50; border-radius: 12px; padding: 25px; box-shadow: 0 4px 20px rgba(0,0,0,0.2);">
                        
                        <!-- All Students Display -->
                        <h3 style="color: #ecf0f1; margin: 0 0 20px 0; text-align: center;">Training Data</h3>
                        
                        <div style="display: grid; gap: 15px;">
                            <!-- Student A -->
                            <div class="student-card" data-index="0" style="background: #34495e; border-radius: 8px; padding: 15px; border: 2px solid #34495e; transition: all 0.3s;">
                                <div style="display: grid; grid-template-columns: 1fr 2fr 1fr; align-items: center; gap: 15px;">
                                    <div>
                                        <div style="color: #ecf0f1; font-weight: bold; margin-bottom: 5px;">Student A</div>
                                        <div style="font-size: 0.7rem; color: #95a5a6;">
                                            Age: <span style="color: #3498db;">20</span><br>
                                            Cups: <span style="color: #e74c3c;">2</span><br>
                                            Tired: <span style="color: #f39c12;">7</span>
                                        </div>
                                    </div>
                                    
                                    <!-- Mini bar visualization -->
                                    <div style="position: relative; height: 60px; background: rgba(0,0,0,0.3); border-radius: 4px; overflow: hidden;">
                                        <div class="target-marker" style="position: absolute; bottom: 64%; width: 100%; height: 2px; background: #2ecc71; opacity: 0.8;"></div>
                                        <div class="prediction-bar" data-student="0" style="position: absolute; bottom: 0; width: 100%; background: linear-gradient(to top, #3498db, #5dade2); transition: height 0.3s; height: 0%;"></div>
                                    </div>
                                    
                                    <div style="text-align: right;">
                                        <div style="color: #2ecc71; font-size: 0.75rem;">Target: 161</div>
                                        <div class="prediction-value" data-student="0" style="color: #ecf0f1; font-size: 0.9rem; font-weight: bold;">0</div>
                                        <div class="error-value" data-student="0" style="color: #e74c3c; font-size: 0.7rem;">-161</div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Student B -->
                            <div class="student-card" data-index="1" style="background: #34495e; border-radius: 8px; padding: 15px; border: 2px solid #34495e; transition: all 0.3s;">
                                <div style="display: grid; grid-template-columns: 1fr 2fr 1fr; align-items: center; gap: 15px;">
                                    <div>
                                        <div style="color: #ecf0f1; font-weight: bold; margin-bottom: 5px;">Student B</div>
                                        <div style="font-size: 0.7rem; color: #95a5a6;">
                                            Age: <span style="color: #3498db;">19</span><br>
                                            Cups: <span style="color: #e74c3c;">1</span><br>
                                            Tired: <span style="color: #f39c12;">9</span>
                                        </div>
                                    </div>
                                    
                                    <!-- Mini bar visualization -->
                                    <div style="position: relative; height: 60px; background: rgba(0,0,0,0.3); border-radius: 4px; overflow: hidden;">
                                        <div class="target-marker" style="position: absolute; bottom: 61%; width: 100%; height: 2px; background: #2ecc71; opacity: 0.8;"></div>
                                        <div class="prediction-bar" data-student="1" style="position: absolute; bottom: 0; width: 100%; background: linear-gradient(to top, #e74c3c, #ec7063); transition: height 0.3s; height: 0%;"></div>
                                    </div>
                                    
                                    <div style="text-align: right;">
                                        <div style="color: #2ecc71; font-size: 0.75rem;">Target: 152</div>
                                        <div class="prediction-value" data-student="1" style="color: #ecf0f1; font-size: 0.9rem; font-weight: bold;">0</div>
                                        <div class="error-value" data-student="1" style="color: #e74c3c; font-size: 0.7rem;">-152</div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Student C -->
                            <div class="student-card" data-index="2" style="background: #34495e; border-radius: 8px; padding: 15px; border: 2px solid #34495e; transition: all 0.3s;">
                                <div style="display: grid; grid-template-columns: 1fr 2fr 1fr; align-items: center; gap: 15px;">
                                    <div>
                                        <div style="color: #ecf0f1; font-weight: bold; margin-bottom: 5px;">Student C</div>
                                        <div style="font-size: 0.7rem; color: #95a5a6;">
                                            Age: <span style="color: #3498db;">22</span><br>
                                            Cups: <span style="color: #e74c3c;">4</span><br>
                                            Tired: <span style="color: #f39c12;">3</span>
                                        </div>
                                    </div>
                                    
                                    <!-- Mini bar visualization -->
                                    <div style="position: relative; height: 60px; background: rgba(0,0,0,0.3); border-radius: 4px; overflow: hidden;">
                                        <div class="target-marker" style="position: absolute; bottom: 72%; width: 100%; height: 2px; background: #2ecc71; opacity: 0.8;"></div>
                                        <div class="prediction-bar" data-student="2" style="position: absolute; bottom: 0; width: 100%; background: linear-gradient(to top, #f39c12, #f5b041); transition: height 0.3s; height: 0%;"></div>
                                    </div>
                                    
                                    <div style="text-align: right;">
                                        <div style="color: #2ecc71; font-size: 0.75rem;">Target: 179</div>
                                        <div class="prediction-value" data-student="2" style="color: #ecf0f1; font-size: 0.9rem; font-weight: bold;">0</div>
                                        <div class="error-value" data-student="2" style="color: #e74c3c; font-size: 0.7rem;">-179</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Loss Display -->
                        <div style="margin-top: 20px; padding: 15px; background: rgba(0,0,0,0.3); border-radius: 8px;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="color: #95a5a6; font-size: 0.8rem;">Total Loss (Absolute)</div>
                                    <div id="total-loss" style="color: #e74c3c; font-size: 1.5rem; font-weight: bold;">492</div>
                                </div>
                                <div style="text-align: right;">
                                    <div style="color: #95a5a6; font-size: 0.8rem;">Step</div>
                                    <div id="step-count" style="color: #ecf0f1; font-size: 1.2rem; font-weight: bold;">0</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right Side: Gradient Descent Controls -->
                    <div style="background: white; border-radius: 12px; padding: 25px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                        
                        <!-- Current Weights -->
                        <div style="background: #f8f9fa; border-radius: 8px; padding: 15px; margin-bottom: 20px; border: 2px solid #e9ecef;">
                            <div style="color: #7f8c8d; font-size: 0.8rem; margin-bottom: 10px; text-align: center;">CURRENT WEIGHTS</div>
                            <div style="font-family: 'Courier New', monospace; font-size: 0.95rem; text-align: center; color: #2c3e50;">
                                f(x) = <span id="w1-display" style="color: #3498db; font-size: 1.1rem; font-weight: bold;">0.00</span>×age + 
                                <span id="w2-display" style="color: #e74c3c; font-size: 1.1rem; font-weight: bold;">0.00</span>×cups + 
                                <span id="w3-display" style="color: #f39c12; font-size: 1.1rem; font-weight: bold;">0.00</span>×tired + 
                                <span id="bias-display" style="color: #2ecc71; font-size: 1.1rem; font-weight: bold;">0.00</span>
                            </div>
                        </div>
                        
                        <!-- Learning Rate Control -->
                        <div style="background: #f8f9fa; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                <label style="color: #2c3e50; font-weight: bold; font-size: 0.9rem;">Learning Rate</label>
                                <div style="background: #3498db; padding: 4px 12px; border-radius: 20px;">
                                    <span id="lr-value" style="color: white; font-weight: bold; font-size: 0.9rem;">0.0001</span>
                                </div>
                            </div>
                            <input type="range" id="lr-slider" min="1" max="5" value="1" step="1" 
                                style="width: 100%; height: 8px; border-radius: 4px; background: #e9ecef; outline: none; cursor: pointer;">
                            <div style="display: flex; justify-content: space-between; color: #95a5a6; font-size: 0.7rem; margin-top: 5px;">
                                <span>Slow</span>
                                <span>Medium</span>
                                <span>Fast</span>
                            </div>
                            <div style="margin-top: 10px; padding: 10px; background: #e3f2fd; border-radius: 6px; font-size: 0.8rem; color: #1976d2;">
                                💡 <strong>Tip:</strong> Too high = overshoots, too low = slow learning
                            </div>
                        </div>
                        
                        <!-- Control Buttons -->
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
                            <button id="step-btn" style="padding: 12px; background: #3498db; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; transition: all 0.3s;">
                                Step →
                            </button>
                            <button id="auto-btn" style="padding: 12px; background: #2ecc71; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; transition: all 0.3s;">
                                Auto Run
                            </button>
                            <button id="reset-btn" style="padding: 12px; background: #e74c3c; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; transition: all 0.3s;">
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Success Message -->
                <div id="success-message" style="display: none; margin-top: 20px; padding: 20px; background: linear-gradient(135deg, #2ecc71, #27ae60); border-radius: 12px; text-align: center; color: white; box-shadow: 0 4px 15px rgba(46,204,113,0.3);">
                    <h2 style="margin: 0 0 10px 0;">🎉 Converged! Found the Optimal Weights!</h2>
                    <div style="font-size: 1.1rem; font-family: 'Courier New', monospace;">
                        Final: <span id="final-formula">5×age + 10×cups + 3×tired + 20</span>
                    </div>
                    <div style="margin-top: 10px; font-size: 0.9rem; opacity: 0.9;">
                        Gradient Descent found the solution in <span id="final-steps">0</span> steps!
                    </div>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
        
        <style>
            input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background: white;
                cursor: pointer;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                border: 2px solid #3498db;
            }
            
            input[type="range"]::-webkit-slider-thumb:hover {
                transform: scale(1.2);
            }
            
            button:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            }
            
            button:active {
                transform: translateY(0);
            }
            
            button:disabled {
                opacity: 0.5;
                cursor: not-allowed;
                transform: none;
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.7; }
            }
        </style>
    `;
    
    // Initialize navigation
    initializeNavigation('coffee-gradient', 'createCoffeeGradientDescent');
    
    // Add interactivity
    setTimeout(() => {
        setupGradientDescent();
    }, 100);
}

function setupGradientDescent() {
    // True weights
    const TRUE_W1 = 5;
    const TRUE_W2 = 10;
    const TRUE_W3 = 3;
    const TRUE_BIAS = 20;
    
    // Training data
    const STUDENTS = [
        { age: 20, cups: 2, tired: 7, target: 161 },
        { age: 19, cups: 1, tired: 9, target: 152 },
        { age: 22, cups: 4, tired: 3, target: 179 }
    ];
    
    // Current weights (start with small random values)
    let w1 = Math.random() * 0.1;
    let w2 = Math.random() * 0.1;
    let w3 = Math.random() * 0.1;
    let bias = Math.random() * 0.1;
    
    // Gradient descent parameters
    let learningRate = 0.0001;
    let stepCount = 0;
    let isRunning = false;
    let animationId = null;
    
    // Get elements
    const stepBtn = document.getElementById('step-btn');
    const autoBtn = document.getElementById('auto-btn');
    const resetBtn = document.getElementById('reset-btn');
    const lrSlider = document.getElementById('lr-slider');
    
    // Calculate predictions and loss
    function forward() {
        let totalLoss = 0;
        const predictions = [];
        
        STUDENTS.forEach((student, i) => {
            const pred = w1 * student.age + w2 * student.cups + w3 * student.tired + bias;
            predictions.push(pred);
            const error = pred - student.target;
            totalLoss += Math.abs(error);
        });
        
        return {
            predictions,
            loss: totalLoss
        };
    }
    
    // Calculate gradients
    function calculateGradients() {
        let grad_w1 = 0;
        let grad_w2 = 0;
        let grad_w3 = 0;
        let grad_bias = 0;
        
        STUDENTS.forEach((student) => {
            const pred = w1 * student.age + w2 * student.cups + w3 * student.tired + bias;
            const error = pred - student.target;
            
            // Gradients (derivative of MSE loss)
            grad_w1 += 2 * error * student.age / STUDENTS.length;
            grad_w2 += 2 * error * student.cups / STUDENTS.length;
            grad_w3 += 2 * error * student.tired / STUDENTS.length;
            grad_bias += 2 * error / STUDENTS.length;
        });
        
        return { grad_w1, grad_w2, grad_w3, grad_bias };
    }
    
    // Update display
    function updateDisplay() {
        const { predictions, loss } = forward();
        
        // Update weight displays
        document.getElementById('w1-display').textContent = w1.toFixed(2);
        document.getElementById('w2-display').textContent = w2.toFixed(2);
        document.getElementById('w3-display').textContent = w3.toFixed(2);
        document.getElementById('bias-display').textContent = bias.toFixed(2);
        
        // Update predictions and errors
        predictions.forEach((pred, i) => {
            const target = STUDENTS[i].target;
            const error = pred - target;
            
            // Update values
            document.querySelector(`.prediction-value[data-student="${i}"]`).textContent = Math.round(pred);
            const errorElement = document.querySelector(`.error-value[data-student="${i}"]`);
            errorElement.textContent = error > 0 ? `+${Math.round(error)}` : Math.round(error);
            
            // Update bar height
            const bar = document.querySelector(`.prediction-bar[data-student="${i}"]`);
            const barHeight = Math.min(100, (pred / 250) * 100);
            bar.style.height = Math.max(0, barHeight) + '%';
            
            // Update card border color based on error
            const card = document.querySelectorAll('.student-card')[i];
            if (Math.abs(error) < 1) {
                card.style.borderColor = '#2ecc71';
                bar.style.background = 'linear-gradient(to top, #27ae60, #2ecc71)';
            } else if (Math.abs(error) < 10) {
                card.style.borderColor = '#f39c12';
                bar.style.background = 'linear-gradient(to top, #d68910, #f39c12)';
            } else {
                card.style.borderColor = '#e74c3c';
                bar.style.background = pred > target ? 
                    'linear-gradient(to top, #c0392b, #e74c3c)' : 
                    'linear-gradient(to top, #5d6d7e, #85929e)';
            }
        });
        
        // Update loss
        document.getElementById('total-loss').textContent = loss.toFixed(1);
        document.getElementById('step-count').textContent = stepCount;
        
        // Check for convergence
        if (loss < 3) {
            if (isRunning) {
                stopAuto();
            }
            document.getElementById('success-message').style.display = 'block';
            document.getElementById('final-steps').textContent = stepCount;
            document.getElementById('final-formula').textContent = 
                `${w1.toFixed(1)}×age + ${w2.toFixed(1)}×cups + ${w3.toFixed(1)}×tired + ${bias.toFixed(1)}`;
        }
    }
    
    // Perform one gradient descent step
    function step() {
        const gradients = calculateGradients();
        
        // Update weights
        w1 -= learningRate * gradients.grad_w1;
        w2 -= learningRate * gradients.grad_w2;
        w3 -= learningRate * gradients.grad_w3;
        bias -= learningRate * gradients.grad_bias;
        
        stepCount++;
        updateDisplay();
    }
    
    // Auto run
    function autoRun() {
        if (!isRunning) return;
        
        step();
        
        // Continue if loss is still high
        const { loss } = forward();
        if (loss > 3 && stepCount < 10000) {
            animationId = setTimeout(autoRun, 50);
        } else {
            stopAuto();
        }
    }
    
    function stopAuto() {
        isRunning = false;
        autoBtn.textContent = 'Auto Run';
        autoBtn.style.background = '#2ecc71';
        stepBtn.disabled = false;
        if (animationId) {
            clearTimeout(animationId);
        }
    }
    
    // Reset weights
    function reset() {
        w1 = Math.random() * 0.1;
        w2 = Math.random() * 0.1;
        w3 = Math.random() * 0.1;
        bias = Math.random() * 0.1;
        stepCount = 0;
        document.getElementById('success-message').style.display = 'none';
        stopAuto();
        updateDisplay();
    }
    
    // Event listeners
    stepBtn.addEventListener('click', () => {
        step();
    });
    
    autoBtn.addEventListener('click', () => {
        if (isRunning) {
            stopAuto();
        } else {
            isRunning = true;
            autoBtn.textContent = 'Stop';
            autoBtn.style.background = '#e74c3c';
            stepBtn.disabled = true;
            autoRun();
        }
    });
    
    resetBtn.addEventListener('click', reset);
    
    lrSlider.addEventListener('input', () => {
        const lrOptions = [0.0001, 0.0005, 0.001, 0.005, 0.01];
        learningRate = lrOptions[parseInt(lrSlider.value) - 1];
        document.getElementById('lr-value').textContent = learningRate;
    });
    
    // Initialize display
    updateDisplay();
}