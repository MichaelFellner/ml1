/**
 * Intro to Learning Rates
 * 
 * Interactive level teaching gradient descent learning rates through balloon pumping
 * 
 * In this level, you'll learn how the learning rate affects gradient descent steps.
 * The balloon machine demonstrates how different learning rates change the speed
 * and stability of convergence. Too small and progress is slow, too large and
 * you might overshoot or oscillate around the target.
 * 
 * The key concept: new w = w - learning_rate * gradient
 * where gradient = error * input_coefficient = error * 10
 * You control the learning rate to see how it affects convergence speed.
 */

window.createIntroToLearningRates = function() {
    
    class IntroToLearningRatesLevel extends window.InteractiveLevelTemplate {
        constructor() {
            super({
                id: 'intro-to-learning-rates',
                name: 'Intro to Learning Rates',
                type: 'interactive',
                description: '',
                targetFunction: { 
                    w: 7040  // The true function is y = 7040x
                },
                controls: [
                    {
                        id: 'w',
                        label: 'w',
                        min: 0,
                        max: 10000,
                        step: 10,
                        default: 100
                    }
                ],
                validation: {
                    tolerance: 0.002,  // ±2 tolerance on 7040 means 0.02% tolerance
                    customValidator: function(params, target) {
                        // We're testing with x = 1
                        const x = 1;
                        const prediction = params.w * x;
                        const trueValue = target.w * x;  // 7040 * 1 = 7040
                        const tolerance = 10;
                        
                        const isCorrect = Math.abs(params.w - target.w) <= tolerance;
                        const accuracy = Math.max(0, 100 - Math.abs(params.w - target.w) / target.w * 100);
                        
                        let status = 'searching';
                        if (params.w < target.w - tolerance) {
                            status = 'too_low';
                        } else if (params.w > target.w + tolerance) {
                            status = 'too_high';
                        } else {
                            status = 'perfect';
                        }
                        
                        return {
                            success: isCorrect,
                            accuracy: Math.round(accuracy),
                            status: status,
                            prediction: prediction,
                            trueValue: trueValue,
                            error: trueValue - prediction  // Error for gradient calculation
                        };
                    }
                },
                showFormula: false,
                debug: false
            });
            
            // Custom state for this level
            this.currentLearningRate = 0.1;  // Default learning rate for discovering w = 7040
            this.lastError = null;
            this.canUpdate = false;
            this.updateCount = 0;
            this.isPumping = false;
            this.testX = 1;  // Current x value we're testing with
        }
        
        async setup() {
            await super.setup();
            
            // CRITICAL: Initialize navigation
            if (typeof initializeNavigation === 'function') {
                initializeNavigation('intro-to-learning-rates', 'createIntroToLearningRates');
            }
            
            // Setup custom event handlers
            this._setupCustomHandlers();
        }
        
        _generateMainContent() {
            return `
                <div style="max-height: 80vh; padding: 15px;">
                    <!-- Level Introduction Box -->
                    <div style="background: rgba(102,126,234,0.08); border: 2px solid rgba(102,126,234,0.2); border-radius: 8px; padding: 15px; margin-bottom: 20px; max-width: 1200px; margin: 0 auto 20px;">
                        <div style="color: #333; font-size: 0.95rem; line-height: 1.6;">
                            <strong style="color: #667eea; font-size: 1.1rem;">Master the Learning Rate to Discover y = ???x</strong><br>
                            The learning rate controls how big each gradient descent step is. You're trying to discover the true function y = 7040x. 
                            A small learning rate (like 0.01) makes tiny, careful steps. A large learning rate (like 1.0) takes big jumps. 
                            Try different values to see the trade-off: small rates are stable but slow, while large rates converge faster but might overshoot. 
                            Find the sweet spot that discovers w = 7040 quickly without oscillating!
                        </div>
                    </div>
                    
                    <!-- Machine Visualization with All Info as Main Container -->
                    <div style="background: linear-gradient(to bottom, #e3f2fd, #bbdefb); border-radius: 10px; padding: 25px; box-shadow: 0 2px 12px rgba(0,0,0,0.15); max-width: 1200px; margin: 0 auto; position: relative;">
                            
                            <!-- Pump and Balloon Display with Update Indicator -->
                            <div style="display: flex; justify-content: center; align-items: center; gap: 40px; margin-bottom: 20px;">
                                
                                <!-- Update Indicator (same level as pump) -->
                                <div id="update-indicator" style="
                                    display: flex;
                                    align-items: center;
                                    gap: 15px;
                                    opacity: 0;
                                    transition: opacity 0.5s ease;
                                ">
                                    <!-- Error Display Box -->
                                    <div style="
                                        background: rgba(255,255,255,0.95);
                                        border: 2px solid #667eea;
                                        border-radius: 8px;
                                        padding: 15px;
                                        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                                        position: relative;
                                        min-width: 180px;
                                    ">
                                        <div style="
                                            position: absolute;
                                            top: -10px;
                                            left: 10px;
                                            background: #667eea;
                                            color: white;
                                            padding: 2px 8px;
                                            border-radius: 4px;
                                            font-size: 0.7rem;
                                            font-weight: bold;
                                        ">ERROR</div>
                                        <div id="error-display" style="
                                            font-family: 'Courier New', monospace;
                                            font-size: 1.5rem;
                                            color: #333;
                                            font-weight: bold;
                                            text-align: center;
                                        "></div>
                                    </div>
                                    
                                    <!-- Step Size Calculation (error × learning rate) -->
                                    <div id="step-calc" style="
                                        display: flex;
                                        flex-direction: column;
                                        align-items: center;
                                        font-family: 'Courier New', monospace;
                                        min-width: 200px;
                                    ">
                                        <div style="font-size: 0.8rem; color: #667eea; margin-bottom: 5px; font-weight: bold;">STEP SIZE</div>
                                        <div id="step-formula" style="
                                            font-size: 0.85rem;
                                            color: #666;
                                            margin-bottom: 8px;
                                            white-space: nowrap;
                                        "></div>
                                        <div id="step-result" style="
                                            font-size: 1.8rem;
                                            color: #333;
                                            font-weight: bold;
                                            min-width: 100px;
                                            text-align: center;
                                        "></div>
                                    </div>
                                    
                                    <!-- Arrow with w values -->
                                    <div style="
                                        display: flex;
                                        flex-direction: column;
                                        align-items: center;
                                        justify-content: center;
                                    ">
                                        <div id="new-w-top" style="
                                            font-family: 'Courier New', monospace;
                                            font-size: 1.1rem;
                                            color: #333;
                                            font-weight: bold;
                                            margin-bottom: 5px;
                                        "></div>
                                        <div id="update-arrow" style="
                                            font-size: 3rem;
                                            color: #333;
                                            font-weight: bold;
                                        "></div>
                                        <div id="old-w-bottom" style="
                                            font-family: 'Courier New', monospace;
                                            font-size: 1.1rem;
                                            color: #333;
                                            font-weight: bold;
                                            margin-top: 5px;
                                        "></div>
                                    </div>
                                </div>
                                
                                <!-- The Pump -->
                                <div id="pump-container" style="position: relative; height: 200px; display: flex; align-items: flex-end;">
                                    <!-- Pump Cylinder -->
                                    <div style="position: relative;">
                                        <!-- Main Cylinder -->
                                        <div style="
                                            width: 80px;
                                            height: 160px;
                                            background: linear-gradient(to right, #e0e0e0, #f5f5f5, #e0e0e0);
                                            border: 2px solid #999;
                                            border-radius: 10px;
                                            position: relative;
                                            overflow: hidden;
                                        ">
                                            <!-- Scale markings -->
                                            <div style="position: absolute; top: 10%; left: 5px; right: 5px; height: 1px; background: #999;"></div>
                                            <div style="position: absolute; top: 30%; left: 5px; right: 5px; height: 1px; background: #999;"></div>
                                            <div style="position: absolute; top: 50%; left: 5px; right: 5px; height: 1px; background: #999;"></div>
                                            <div style="position: absolute; top: 70%; left: 5px; right: 5px; height: 1px; background: #999;"></div>
                                            <div style="position: absolute; top: 90%; left: 5px; right: 5px; height: 1px; background: #999;"></div>
                                        </div>
                                        
                                        <!-- Plunger Assembly (Handle only, no rod) -->
                                        <div id="pump-plunger" style="
                                            position: absolute;
                                            width: 80px;
                                            left: 0;
                                            bottom: 16px;
                                            transition: bottom 0.3s ease;
                                        ">
                                            <!-- Handle with w value -->
                                            <div style="
                                                width: 80px;
                                                height: 20px;
                                                background: linear-gradient(to bottom, #444, #222);
                                                border-radius: 10px;
                                                position: absolute;
                                                top: -10px;
                                                left: 0;
                                                box-shadow: 0 2px 5px rgba(0,0,0,0.3);
                                                display: flex;
                                                align-items: center;
                                                justify-content: center;
                                                color: white;
                                                font-weight: bold;
                                                font-size: 0.8rem;
                                            ">
                                                <span id="plunger-w-display">100</span>
                                            </div>
                                        </div>
                                        
                                        <!-- Base with x10 label -->
                                        <div style="
                                            width: 100px;
                                            height: 20px;
                                            background: linear-gradient(to bottom, #333, #111);
                                            border-radius: 5px;
                                            position: absolute;
                                            bottom: -5px;
                                            left: -10px;
                                            box-shadow: 0 3px 8px rgba(0,0,0,0.3);
                                            display: flex;
                                            align-items: center;
                                            justify-content: center;
                                            color: #fff;
                                            font-weight: bold;
                                            font-size: 0.85rem;
                                        ">×<span id="x-value">1</span></div>
                                        
                                        <!-- Outlet pipe -->
                                        <div style="
                                            position: absolute;
                                            right: -40px;
                                            bottom: 20px;
                                            width: 40px;
                                            height: 10px;
                                            background: linear-gradient(to right, #666, #888);
                                            border-radius: 0 5px 5px 0;
                                        "></div>
                                    </div>
                                </div>
                                
                                <!-- Output and Balloon -->
                                <div style="text-align: center;">
                                    <div style="font-size: 0.9rem; color: #666; margin-bottom: 5px;">Prediction (y = w·x)</div>
                                    <div id="air-output" style="font-size: 1.8rem; font-weight: bold; color: #333; margin-bottom: 15px;">100</div>
                                    
                                    <!-- Balloon Container -->
                                    <div id="balloon-container" style="position: relative; height: 100px; display: flex; align-items: center; justify-content: center;">
                                        <div id="balloon" style="
                                            font-size: 30px;
                                            transition: all 0.5s ease;
                                            filter: hue-rotate(0deg);
                                        ">🎈</div>
                                        <div id="pop-effect" style="position: absolute; font-size: 80px; opacity: 0;">💥</div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Target Display -->
                            <div style="text-align: center; margin-bottom: 15px;">
                                <div style="font-size: 0.9rem; color: #666;">True value for x=<span id="target-x">1</span>: <span id="true-value">7040</span></div>
                                <div style="font-size: 0.8rem; color: #999; margin-top: 5px;">Goal: Find w such that y = w·x matches all true values</div>
                            </div>
                            
                            <!-- Status -->
                            <div id="balloon-status" style="margin-bottom: 15px; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.9); min-height: 45px; text-align: center; display: flex; align-items: center; justify-content: center;">
                                <div id="status-text" style="font-size: 0.95rem; color: #666;">Press "Pump Balloon" to test!</div>
                            </div>
                            
                            <!-- Learning Rate Control Section -->
                            <div id="update-formula" style="padding: 15px; background: rgba(255,255,255,0.95); border-radius: 8px; min-height: 50px; margin-bottom: 15px;">
                                <div style="display: flex; align-items: center; justify-content: center; gap: 15px;">
                                    <div style="color: #666; font-size: 0.9rem; font-weight: bold;">Learning Rate:</div>
                                    <input type="number" id="learning-rate-input" value="0.1" step="0.01" min="0.001" max="10" style="
                                        width: 100px;
                                        padding: 6px 8px;
                                        border: 2px solid #667eea;
                                        border-radius: 5px;
                                        font-size: 1rem;
                                        font-weight: bold;
                                        text-align: center;
                                        color: #667eea;
                                        background: rgba(102,126,234,0.05);
                                        font-family: 'Courier New', monospace;
                                        -webkit-appearance: none;
                                        -moz-appearance: textfield;
                                        transition: all 0.3s;
                                    ">
                                    <div style="font-size: 0.85rem; color: #999;">Controls step size multiplier</div>
                                </div>
                            </div>
                        
                        <!-- Action Buttons Grid -->
                        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px;">
                            <button id="pump-btn" style="
                                padding: 15px;
                                background: linear-gradient(135deg, #667eea, #764ba2);
                                color: white;
                                border: none;
                                border-radius: 8px;
                                font-size: 1.1rem;
                                font-weight: bold;
                                cursor: pointer;
                                transition: all 0.3s;
                            ">
                                💨 Pump Balloon
                            </button>
                            
                            <button id="update-w-btn" style="
                                padding: 15px;
                                background: #6c757d;
                                color: white;
                                border: none;
                                border-radius: 8px;
                                font-size: 1.1rem;
                                font-weight: bold;
                                cursor: not-allowed;
                                opacity: 0.5;
                                transition: all 0.3s;
                            " disabled>
                                🔄 Update w
                            </button>
                            
                            <button id="reset-btn" style="
                                padding: 15px;
                                background: linear-gradient(135deg, #dc3545, #c82333);
                                color: white;
                                border: none;
                                border-radius: 8px;
                                font-size: 1.1rem;
                                font-weight: bold;
                                cursor: pointer;
                                transition: all 0.3s;
                            ">
                                ↺ Reset
                            </button>
                        </div>
                </div>
                
                <!-- CRITICAL: Standard navigation -->
                ${typeof createStandardNavigation === 'function' ? createStandardNavigation() : ''}
            `;
        }
        
        _setupCustomHandlers() {
            // Initial plunger position
            this._updatePlungerHeight(100);
            
            // Learning rate input handler
            const lrInput = document.getElementById('learning-rate-input');
            if (lrInput) {
                this.addEventListenerWithCleanup(lrInput, 'input', (e) => {
                    const value = parseFloat(e.target.value);
                    if (!isNaN(value) && value > 0 && value <= 10) {
                        this.currentLearningRate = value;
                    }
                });
                
                // Prevent negative or invalid values and handle blur styling
                this.addEventListenerWithCleanup(lrInput, 'blur', (e) => {
                    const value = parseFloat(e.target.value);
                    if (isNaN(value) || value <= 0) {
                        e.target.value = '0.1';
                        this.currentLearningRate = 0.1;
                    } else if (value > 10) {
                        e.target.value = '10';
                        this.currentLearningRate = 10;
                    }
                    // Remove focus styling
                    e.target.style.boxShadow = 'none';
                    e.target.style.borderColor = '#667eea';
                });
                
                // Add focus effect to learning rate input
                this.addEventListenerWithCleanup(lrInput, 'focus', (e) => {
                    e.target.style.boxShadow = '0 0 0 3px rgba(102,126,234,0.2)';
                    e.target.style.borderColor = '#764ba2';
                });
            }
            
            // Pump button handler
            const pumpBtn = document.getElementById('pump-btn');
            if (pumpBtn) {
                this.addEventListenerWithCleanup(pumpBtn, 'click', () => this._pumpBalloon());
                
                // Hover effects
                this.addEventListenerWithCleanup(pumpBtn, 'mouseenter', () => {
                    pumpBtn.style.transform = 'translateY(-2px)';
                    pumpBtn.style.boxShadow = '0 4px 12px rgba(102,126,234,0.3)';
                });
                this.addEventListenerWithCleanup(pumpBtn, 'mouseleave', () => {
                    pumpBtn.style.transform = 'translateY(0)';
                    pumpBtn.style.boxShadow = 'none';
                });
            }
            
            // Update W button
            const updateBtn = document.getElementById('update-w-btn');
            if (updateBtn) {
                this.addEventListenerWithCleanup(updateBtn, 'click', () => this._updateW());
                
                // Hover effects when enabled
                this.addEventListenerWithCleanup(updateBtn, 'mouseenter', () => {
                    if (!updateBtn.disabled) {
                        updateBtn.style.transform = 'translateY(-2px)';
                        updateBtn.style.boxShadow = '0 4px 12px rgba(40,167,69,0.3)';
                    }
                });
                this.addEventListenerWithCleanup(updateBtn, 'mouseleave', () => {
                    updateBtn.style.transform = 'translateY(0)';
                    updateBtn.style.boxShadow = 'none';
                });
            }
            
            // Reset button
            const resetBtn = document.getElementById('reset-btn');
            if (resetBtn) {
                this.addEventListenerWithCleanup(resetBtn, 'click', () => this._resetLevel());
                
                // Hover effects
                this.addEventListenerWithCleanup(resetBtn, 'mouseenter', () => {
                    resetBtn.style.transform = 'translateY(-2px)';
                    resetBtn.style.boxShadow = '0 4px 12px rgba(220,53,69,0.3)';
                });
                this.addEventListenerWithCleanup(resetBtn, 'mouseleave', () => {
                    resetBtn.style.transform = 'translateY(0)';
                    resetBtn.style.boxShadow = 'none';
                });
            }
            
            // W slider override
            const wSlider = document.getElementById('w-slider');
            if (wSlider) {
                this.addEventListenerWithCleanup(wSlider, 'input', (e) => {
                    const value = parseFloat(e.target.value);
                    this.updateParameters({ w: value });
                    this._updatePlungerHeight(value);
                    document.getElementById('plunger-w-display').textContent = Math.round(value);
                    document.getElementById('air-output').textContent = (value * this.testX).toFixed(0);
                    
                    // Reset state when manually adjusting
                    this.canUpdate = false;
                    const updateBtn = document.getElementById('update-w-btn');
                    if (updateBtn) {
                        updateBtn.disabled = true;
                        updateBtn.style.cursor = 'not-allowed';
                        updateBtn.style.opacity = '0.5';
                        updateBtn.style.background = '#6c757d';
                    }
                });
            }
        }
        
        _updatePlungerHeight(w) {
            const plunger = document.getElementById('pump-plunger');
            if (plunger) {
                // Map w (0-10000) to plunger height (30px to 120px from bottom)
                const maxW = 10000;
                const heightFromBottom = 30 + Math.min(1, w / maxW) * 90;
                plunger.style.bottom = `${heightFromBottom}px`;
            }
        }
        
        _pumpBalloon() {
            if (this.isPumping) return;
            this.isPumping = true;
            
            const validation = this.validateParameters();
            const balloon = document.getElementById('balloon');
            const popEffect = document.getElementById('pop-effect');
            const status = document.getElementById('balloon-status');
            const plunger = document.getElementById('pump-plunger');
            
            // Get current position
            const currentBottom = parseFloat(plunger.style.bottom) || 30;
            
            // Pump animation - push handle down
            plunger.style.transition = 'bottom 0.2s ease-out';
            plunger.style.bottom = '30px';
            
            setTimeout(() => {
                // Return to original position
                plunger.style.transition = 'bottom 0.3s ease-in';
                plunger.style.bottom = `${currentBottom}px`;
                setTimeout(() => {
                    plunger.style.transition = 'bottom 0.3s ease';
                    this.isPumping = false;
                }, 300);
            }, 200);
            
            // Update error
            this.lastError = validation.error;
            this.canUpdate = true;
            
            const statusText = document.getElementById('status-text');
            
            // Enable update button
            const updateBtn = document.getElementById('update-w-btn');
            if (updateBtn && !validation.success) {
                updateBtn.disabled = false;
                updateBtn.style.cursor = 'pointer';
                updateBtn.style.opacity = '1';
                updateBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
            }
            
            // Calculate balloon size based on how close we are to true value
            const ratio = validation.prediction / validation.trueValue;
            let balloonSize;
            
            // Balloon animation based on status
            if (validation.status === 'perfect') {
                // Rainbow balloon for perfect - found w = 7040!
                balloonSize = 70;
                balloon.style.fontSize = `${balloonSize}px`;
                balloon.style.opacity = '1';
                balloon.textContent = '🎈';
                balloon.style.animation = 'rainbowPulse 2s infinite';
                statusText.innerHTML = `<span style="color: #2dd573; font-weight: bold; font-size: 1rem;">🎉 Perfect! You found w = 7040!</span>`;
                
                // Complete level
                this.completeLevel({
                    score: 100,
                    solutions: { 
                        w: this.getParameters().w,
                        learningRate: this.currentLearningRate,
                        updates: this.updateCount
                    }
                });
                
            } else if (validation.status === 'too_high') {
                // Over-prediction
                balloonSize = Math.min(80, 30 + Math.min(2, ratio) * 25);
                balloon.style.fontSize = `${balloonSize}px`;
                balloon.style.opacity = '0.9';
                balloon.textContent = '🎈';
                balloon.style.animation = '';
                statusText.innerHTML = `<span style="color: #ff6347; font-weight: bold;">w is too high! (Prediction > True value)</span>`;
                
            } else {
                // Under-prediction
                balloonSize = Math.max(20, 30 * ratio);
                balloon.style.fontSize = `${balloonSize}px`;
                balloon.style.opacity = '0.8';
                balloon.textContent = '🎈';
                balloon.style.animation = '';
                statusText.innerHTML = `<span style="color: #f3960a; font-weight: bold;">w is too low! (Prediction < True value)</span>`;
            }
        }
        
        _updateW() {
            if (!this.canUpdate || this.lastError === null) return;
            
            const currentW = this.getParameters().w;
            const lr = this.currentLearningRate;
            
            // ============ GRADIENT CALCULATION START ============
            // This is where gradient descent happens!
            // Loss function: L = 1/2 × (prediction - true_value)²
            // Prediction: y = w × x
            // Gradient: ∂L/∂w = (prediction - true_value) × x
            
            // Step 1: Calculate the gradient
            // The stored error is: error = true_value - prediction
            // We need gradient = (prediction - true_value) × x
            // So gradient = -error × x
            const gradient = -this.lastError * this.testX;
            
            // Step 2: Calculate the step size (gradient × learning_rate)  
            const stepSize = gradient * lr;
            
            // Step 3: Apply the gradient update to get new w
            // Subtract the step size (gradient descent moves opposite to gradient)
            const newW = currentW - stepSize;
            // ============ GRADIENT CALCULATION END ============
            
            // Clamp to valid range
            let clampedW = Math.max(0, Math.min(10000, newW));
            let resetToOne = false;
            let hitMax = false;
            
            if (newW <= 0) {
                clampedW = 1;
                resetToOne = true;
            } else if (newW >= 10000) {
                clampedW = 10000;
                hitMax = true;
            }
            
            // Show update indicator with arrow and values
            const updateIndicator = document.getElementById('update-indicator');
            const updateArrow = document.getElementById('update-arrow');
            const errorDisplay = document.getElementById('error-display');
            const stepFormula = document.getElementById('step-formula');
            const stepResult = document.getElementById('step-result');
            const newWTop = document.getElementById('new-w-top');
            const oldWBottom = document.getElementById('old-w-bottom');
            
            if (updateIndicator && updateArrow && errorDisplay && stepFormula && stepResult && newWTop && oldWBottom) {
                // === UI VISUALIZATION OF STEP CALCULATION ===
                // Simply show error value
                errorDisplay.textContent = this.lastError.toFixed(0);
                
                // Show the step size calculation: error × learning rate
                stepFormula.innerHTML = `
                    <span style="color: #666;">error × α</span><br>
                    <span style="color: #333;">${Math.abs(this.lastError).toFixed(0)} × ${lr}</span>
                `;
                
                // Show the result with appropriate sign
                const absStepSize = Math.abs(stepSize);
                stepResult.textContent = absStepSize.toFixed(1);
                
                // Determine arrow direction based on whether w is increasing or decreasing
                const isIncreasing = newW > currentW;
                updateArrow.textContent = isIncreasing ? '↑' : '↓';
                updateArrow.style.color = '#333';  // Always black
                
                // Position values correctly:
                // If w is increasing: old value on bottom, new on top
                // If w is decreasing: old value on top, new on bottom
                if (isIncreasing) {
                    newWTop.textContent = clampedW.toFixed(0);
                    oldWBottom.textContent = currentW.toFixed(0);
                } else {
                    newWTop.textContent = currentW.toFixed(0);
                    oldWBottom.textContent = clampedW.toFixed(0);
                }
                
                // Show the indicator (stays visible)
                updateIndicator.style.opacity = '1';
            }
            
            // Update count
            this.updateCount++;
            
            // Update status if w hit boundaries
            if (resetToOne) {
                const statusText = document.getElementById('status-text');
                if (statusText) {
                    statusText.innerHTML = '<span style="color: #dc3545; font-weight: bold;">The large learning rate caused w to become nearly 0, resetting w to 1.</span>';
                }
            } else if (hitMax) {
                const statusText = document.getElementById('status-text');
                if (statusText) {
                    statusText.innerHTML = '<span style="color: #dc3545; font-weight: bold;">The learning rate caused w to reach its maximum value of 10000.</span>';
                }
            }
            
            // Update the slider and value
            const wSlider = document.getElementById('w-slider');
            if (wSlider) {
                wSlider.value = clampedW;
            }
            
            this.updateParameters({ w: clampedW });
            this._updatePlungerHeight(clampedW);
            document.getElementById('plunger-w-display').textContent = Math.round(clampedW);
            document.getElementById('air-output').textContent = (clampedW * this.testX).toFixed(0);
            
            // Disable update button until next pump
            this.canUpdate = false;
            const updateBtn = document.getElementById('update-w-btn');
            if (updateBtn) {
                updateBtn.disabled = true;
                updateBtn.style.cursor = 'not-allowed';
                updateBtn.style.opacity = '0.5';
                updateBtn.style.background = '#6c757d';
            }
            
            // Reset balloon
            const balloon = document.getElementById('balloon');
            if (balloon) {
                balloon.style.animation = '';
            }
            
            // Track update
            this.trackAction('parameter_update', { 
                learningRate: lr,
                oldW: currentW,
                newW: clampedW,
                error: this.lastError,
                updateCount: this.updateCount
            });
        }
        
        _resetLevel() {
            // Reset w to default
            const wSlider = document.getElementById('w-slider');
            if (wSlider) {
                wSlider.value = 100;
            }
            
            this.updateParameters({ w: 100 });
            this._updatePlungerHeight(100);
            document.getElementById('plunger-w-display').textContent = '100';
            document.getElementById('air-output').textContent = (100 * this.testX).toFixed(0);
            
            // Reset state
            this.lastError = null;
            this.canUpdate = false;
            this.updateCount = 0;
            
            // Reset learning rate
            const lrInput = document.getElementById('learning-rate-input');
            if (lrInput) {
                lrInput.value = '0.1';
                this.currentLearningRate = 0.1;
            }
            
            // Hide update indicator
            const updateIndicator = document.getElementById('update-indicator');
            if (updateIndicator) {
                updateIndicator.style.opacity = '0';
            }
            
            // Reset balloon to smallest size (unless w is 0)
            const balloon = document.getElementById('balloon');
            if (balloon) {
                const w = this.getParameters().w;
                const resetSize = w === 0 ? '15px' : '20px';  // Smallest balloon size on reset
                balloon.style.fontSize = resetSize;
                balloon.style.opacity = '1';
                balloon.textContent = '🎈';
                balloon.style.animation = '';
            }
            
            // Reset status
            const statusText = document.getElementById('status-text');
            if (statusText) {
                statusText.innerHTML = 'Press "Pump Balloon" to test!';
                statusText.style.color = '#666';
            }
            
            // Disable update button
            const updateBtn = document.getElementById('update-w-btn');
            if (updateBtn) {
                updateBtn.disabled = true;
                updateBtn.style.cursor = 'not-allowed';
                updateBtn.style.opacity = '0.5';
                updateBtn.style.background = '#6c757d';
            }
        }
    }
    
    // Add animation CSS if not present
    if (!document.getElementById('intro-lr-style')) {
        const style = document.createElement('style');
        style.id = 'intro-lr-style';
        style.textContent = `
            @keyframes rainbowPulse {
                0% { filter: hue-rotate(0deg); transform: scale(1); }
                20% { filter: hue-rotate(72deg); }
                40% { filter: hue-rotate(144deg); }
                50% { transform: scale(1.1); }
                60% { filter: hue-rotate(216deg); }
                80% { filter: hue-rotate(288deg); }
                100% { filter: hue-rotate(360deg); transform: scale(1); }
            }
            
            /* Remove spinner arrows from number inputs */
            #learning-rate-input::-webkit-inner-spin-button,
            #learning-rate-input::-webkit-outer-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
            #learning-rate-input {
                -moz-appearance: textfield;
            }
        `;
        document.head.appendChild(style);
    }
    
    const level = new IntroToLearningRatesLevel();
    level.create().catch(error => {
        console.error('Failed to create Intro to Learning Rates:', error);
    });
    
    return level;
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.createIntroToLearningRates;
}