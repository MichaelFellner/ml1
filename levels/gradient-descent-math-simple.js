/**
 * Gradient Descent Math - Simple Case with Pump Visualization
 * 
 * Teaches gradient descent by discovering the true function y = 7040x
 * Uses a pump metaphor to visualize the gradient descent process
 */

window.createGradientDescentMathSimple = function() {
    
    class GradientDescentMathSimpleLevel extends window.BaseLevelTemplate {
        constructor() {
            super({
                id: 'gradient-descent-math-simple',
                name: 'Gradient Descent: Finding the True Function',
                type: 'tutorial',
                description: 'Use gradient descent to discover y = 7040x'
            });
            
            // The true function is y = 7040x
            this.true_w = 7040;
            
            // Starting weight (deliberately wrong)
            this.current_w = 100;
            
            // Learning rate
            this.learning_rate = 0.00001;
            
            // Training data points from the true function
            this.training_data = [
                { x: 1, y: 7040 },
                { x: 2, y: 14080 },
                { x: 0.5, y: 3520 }
            ];
            
            // Current training example index
            this.current_example_index = 0;
            
            // History of weight updates
            this.weight_history = [this.current_w];
            this.step_count = 0;
            
            // Pump animation state
            this.isPumping = false;
        }
        
        async setup() {
            await super.setup();
            
            // Initialize navigation
            if (typeof initializeNavigation === 'function') {
                initializeNavigation('gradient-descent-math-simple', 'createGradientDescentMathSimple');
            }
            
            this._setupHandlers();
            // Update display after DOM is ready
            setTimeout(() => this._updateDisplay(), 100);
        }
        
        _generateMainContent() {
            return `
                <style>
                    @keyframes pumpDown {
                        0% { transform: translateY(0); }
                        50% { transform: translateY(15px); }
                        100% { transform: translateY(0); }
                    }
                    
                    @keyframes flow {
                        0% { left: 0; opacity: 0; }
                        10% { opacity: 1; }
                        90% { opacity: 1; }
                        100% { left: 100%; opacity: 0; }
                    }
                    
                    @keyframes pulse {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                    }
                    
                    .pump-active {
                        animation: pumpDown 0.5s ease-in-out;
                    }
                    
                    .flow-particle {
                        position: absolute;
                        width: 8px;
                        height: 8px;
                        background: #667eea;
                        border-radius: 50%;
                        animation: flow 1s linear;
                    }
                    
                    .pulse-glow {
                        animation: pulse 2s ease-in-out infinite;
                    }
                    
                    .converged-glow {
                        box-shadow: 0 0 20px #2dd573, 0 0 40px #2dd573;
                        background: linear-gradient(135deg, #2dd573, #1cb85c) !important;
                    }
                </style>
                
                <div style="max-height: 80vh; display: flex; flex-direction: column; gap: 20px; padding: 20px;">
                    <!-- Title -->
                    <div style="text-align: center;">
                        <h2 style="color: #333; margin: 0;">🔧 Gradient Descent: Finding y = ???x</h2>
                        <p style="color: #666; margin-top: 10px;">Use gradient descent to discover the true weight! The pump adjusts w automatically based on the gradient.</p>
                    </div>
                    
                    <!-- Main Content -->
                    <div style="display: flex; gap: 20px; justify-content: center; align-items: stretch;">
                        <!-- Left Panel: Pump Visualization -->
                        <div style="background: white; border-radius: 10px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); width: 400px;">
                            <h3 style="color: #667eea; margin: 0 0 15px 0;">Gradient Descent Pump</h3>
                            
                            <!-- Current Model Display -->
                            <div style="background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(118,75,162,0.1)); padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 2px solid #667eea;">
                                <div style="text-align: center;">
                                    <div style="font-size: 1.5rem; font-family: 'Courier New', monospace; color: #333;">
                                        y = <span id="current-w-display" style="color: #667eea; font-weight: bold;">100</span>x
                                    </div>
                                    <div style="font-size: 0.9rem; color: #666; margin-top: 5px;">
                                        Step <span id="step-count">0</span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Pump Container -->
                            <div style="position: relative; height: 250px; display: flex; align-items: center; justify-content: center;">
                                <!-- Gauge Background -->
                                <div style="position: absolute; left: 20px; top: 10px; bottom: 10px; width: 60px;">
                                    <div style="height: 100%; background: linear-gradient(to top, #e3e8ef 0%, #667eea 50%, #2dd573 100%); border-radius: 10px; opacity: 0.2;"></div>
                                    <div style="position: absolute; top: 5%; left: -20px; font-size: 0.7rem; color: #666;">7040</div>
                                    <div style="position: absolute; top: 50%; left: -20px; font-size: 0.7rem; color: #666;">3520</div>
                                    <div style="position: absolute; bottom: 5%; left: -10px; font-size: 0.7rem; color: #666;">0</div>
                                </div>
                                
                                <!-- Pump Visual -->
                                <div id="pump-visual" style="position: relative;">
                                    <div style="width: 100px; height: 120px; background: linear-gradient(to bottom, #4a5568, #2d3748); border-radius: 10px; position: relative; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
                                        <!-- Pump Handle -->
                                        <div id="pump-handle" style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); width: 40px; height: 25px; background: #1a202c; border-radius: 8px; cursor: pointer; transition: all 0.3s;">
                                            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-size: 0.8rem;">⬇</div>
                                        </div>
                                        <!-- Pump Body -->
                                        <div style="position: absolute; top: 20px; left: 10px; right: 10px; height: 60px; background: rgba(255,255,255,0.1); border-radius: 5px;"></div>
                                        <!-- Current W Indicator -->
                                        <div id="w-indicator" style="position: absolute; left: -80px; top: 50%; transform: translateY(-50%); width: 60px; height: 4px; background: #667eea;">
                                            <div style="position: absolute; right: -10px; top: -8px; width: 20px; height: 20px; background: #667eea; border-radius: 50%;"></div>
                                        </div>
                                    </div>
                                    <!-- Nozzle -->
                                    <div style="position: absolute; bottom: -15px; left: 50%; transform: translateX(-50%); width: 30px; height: 20px; background: #2d3748; border-radius: 0 0 50% 50%;"></div>
                                </div>
                                
                                <!-- Flow Pipe -->
                                <div style="position: absolute; right: 80px; bottom: 60px; width: 150px; height: 4px; background: #94a3b8;">
                                    <div id="flow-container" style="position: relative; width: 100%; height: 100%; overflow: hidden;"></div>
                                </div>
                            </div>
                            
                            <!-- Control Buttons -->
                            <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                                <button id="take-step-btn" style="flex: 1; padding: 12px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; font-weight: bold; transition: all 0.3s;">
                                    📉 Take Gradient Step
                                </button>
                                <button id="auto-run-btn" style="flex: 1; padding: 12px; background: #2dd573; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; font-weight: bold; transition: all 0.3s;">
                                    ▶️ Auto Run
                                </button>
                            </div>
                            
                            <!-- Learning Rate Control -->
                            <div style="background: #f0f7ff; padding: 12px; border-radius: 8px;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                                    <label style="color: #333; font-size: 0.9rem;">Learning Rate:</label>
                                    <span id="lr-display" style="font-family: 'Courier New', monospace; color: #667eea; font-weight: bold;">0.00001</span>
                                </div>
                                <input type="range" id="lr-slider" min="-6" max="-3" step="0.5" value="-5" style="width: 100%;">
                                <div style="display: flex; justify-content: space-between; color: #999; font-size: 0.7rem; margin-top: 5px;">
                                    <span>Slow</span>
                                    <span>Fast</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Right Panel: Information Display -->
                        <div style="background: white; border-radius: 10px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); width: 400px;">
                            <h3 style="color: #764ba2; margin: 0 0 15px 0;">Training Progress</h3>
                            
                            <!-- Current Calculation -->
                            <div style="background: #fff9e6; padding: 12px; border-radius: 8px; margin-bottom: 15px;">
                                <h4 style="color: #333; margin: 0 0 8px 0; font-size: 0.9rem;">Current Gradient Calculation:</h4>
                                <div id="gradient-calc" style="font-family: 'Courier New', monospace; font-size: 0.85rem; line-height: 1.6;">
                                    <!-- Will be filled dynamically -->
                                </div>
                            </div>
                            
                            <!-- Loss Display -->
                            <div style="background: #fff5f5; padding: 12px; border-radius: 8px; margin-bottom: 15px;">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <span style="color: #666; font-size: 0.9rem;">Total Loss (MSE):</span>
                                    <span id="total-loss" style="font-size: 1.3rem; color: #e53e3e; font-weight: bold;">--</span>
                                </div>
                                <div id="loss-bar" style="margin-top: 10px; height: 20px; background: #f0f0f0; border-radius: 10px; overflow: hidden;">
                                    <div id="loss-fill" style="height: 100%; background: linear-gradient(90deg, #e53e3e, #fbbf24); width: 100%; transition: width 0.5s;"></div>
                                </div>
                            </div>
                            
                            <!-- Progress Indicator -->
                            <div id="progress-box" style="background: linear-gradient(135deg, rgba(45,213,115,0.1), rgba(45,213,115,0.2)); padding: 15px; border-radius: 8px; border: 2px solid #2dd573; margin-bottom: 15px;">
                                <h4 style="color: #333; margin: 0 0 10px 0; font-size: 0.9rem;">Distance to True Weight:</h4>
                                <div id="progress-text" style="text-align: center; font-size: 1.2rem; color: #2dd573; font-weight: bold;">
                                    <!-- Will be filled dynamically -->
                                </div>
                                <div style="margin-top: 10px; height: 10px; background: #e0e0e0; border-radius: 5px; overflow: hidden;">
                                    <div id="progress-bar" style="height: 100%; background: linear-gradient(135deg, #2dd573, #1cb85c); width: 0%; transition: width 0.5s;"></div>
                                </div>
                            </div>
                            
                            <!-- Training Data Display -->
                            <div style="background: #f8f9fa; padding: 12px; border-radius: 8px; margin-bottom: 15px;">
                                <h4 style="color: #333; margin: 0 0 8px 0; font-size: 0.9rem;">Training Data:</h4>
                                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; text-align: center; font-family: 'Courier New', monospace; font-size: 0.8rem;">
                                    ${this.training_data.map((point, i) => `
                                        <div id="data-${i}" style="padding: 8px; background: ${i === 0 ? '#fff5f5' : 'white'}; border-radius: 5px; border: 1px solid ${i === 0 ? '#e53e3e' : '#ddd'};">
                                            <div style="color: #666;">x=${point.x}</div>
                                            <div style="color: #333; font-weight: bold;">y=${point.y}</div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                            
                            <!-- Reset Button -->
                            <button id="reset-btn" style="width: 100%; padding: 10px; background: #6c757d; color: white; border: none; border-radius: 8px; cursor: pointer; transition: all 0.3s;">
                                🔄 Reset to w = 100
                            </button>
                        </div>
                    </div>
                    
                    <!-- Bottom Info -->
                    <div style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 15px; border-radius: 10px; text-align: center;">
                        <strong>🎯 Goal:</strong> The gradient descent pump automatically adjusts w to minimize loss. Watch as it discovers that y = 7040x!
                    </div>
                </div>
                
                ${typeof createStandardNavigation === 'function' ? createStandardNavigation() : ''}
            `;
        }
        
        _setupHandlers() {
            // Take step button
            const stepBtn = document.getElementById('take-step-btn');
            if (stepBtn) {
                this.addEventListenerWithCleanup(stepBtn, 'click', () => {
                    this._takeGradientStep();
                });
            }
            
            // Auto run button
            const autoBtn = document.getElementById('auto-run-btn');
            if (autoBtn) {
                this.addEventListenerWithCleanup(autoBtn, 'click', () => {
                    if (this.autoRunning) {
                        this._stopAutoRun();
                    } else {
                        this._startAutoRun();
                    }
                });
            }
            
            // Reset button
            const resetBtn = document.getElementById('reset-btn');
            if (resetBtn) {
                this.addEventListenerWithCleanup(resetBtn, 'click', () => {
                    this._reset();
                });
            }
            
            // Learning rate slider
            const lrSlider = document.getElementById('lr-slider');
            if (lrSlider) {
                this.addEventListenerWithCleanup(lrSlider, 'input', (e) => {
                    this.learning_rate = Math.pow(10, parseFloat(e.target.value));
                    document.getElementById('lr-display').textContent = this.learning_rate.toExponential(0);
                });
            }
            
            // Pump handle click for manual step
            const pumpHandle = document.getElementById('pump-handle');
            if (pumpHandle) {
                this.addEventListenerWithCleanup(pumpHandle, 'click', () => {
                    this._takeGradientStep();
                });
                
                this.addEventListenerWithCleanup(pumpHandle, 'mouseenter', () => {
                    pumpHandle.style.transform = 'translateX(-50%) scale(1.1)';
                });
                
                this.addEventListenerWithCleanup(pumpHandle, 'mouseleave', () => {
                    pumpHandle.style.transform = 'translateX(-50%) scale(1)';
                });
            }
        }
        
        _takeGradientStep() {
            if (this.isPumping) return;
            
            // Animate pump
            this._animatePump();
            
            const example = this.training_data[this.current_example_index];
            
            // Calculate gradient
            const prediction = this.current_w * example.x;
            const error = prediction - example.y;
            const gradient = 2 * error * example.x;
            
            // Update weight
            this.current_w = this.current_w - this.learning_rate * gradient;
            this.weight_history.push(this.current_w);
            this.step_count++;
            
            // Cycle through training data
            this.current_example_index = (this.current_example_index + 1) % this.training_data.length;
            
            // Update display
            this._updateDisplay();
            this._updateGradientCalculation(example, prediction, error, gradient);
            
            // Check for convergence
            if (Math.abs(this.current_w - this.true_w) < 1) {
                this._handleConvergence();
            }
        }
        
        _animatePump() {
            this.isPumping = true;
            const pumpVisual = document.getElementById('pump-visual');
            const flowContainer = document.getElementById('flow-container');
            
            if (pumpVisual) {
                pumpVisual.classList.add('pump-active');
                setTimeout(() => {
                    pumpVisual.classList.remove('pump-active');
                    this.isPumping = false;
                }, 500);
            }
            
            // Create flow particles
            if (flowContainer) {
                const particle = document.createElement('div');
                particle.className = 'flow-particle';
                flowContainer.appendChild(particle);
                setTimeout(() => {
                    particle.remove();
                }, 1000);
            }
        }
        
        _updateDisplay() {
            // Update w display
            const wDisplay = document.getElementById('current-w-display');
            if (wDisplay) {
                wDisplay.textContent = Math.round(this.current_w);
            }
            
            // Update step count
            const stepDisplay = document.getElementById('step-count');
            if (stepDisplay) {
                stepDisplay.textContent = this.step_count;
            }
            
            // Update w indicator position
            const indicator = document.getElementById('w-indicator');
            if (indicator) {
                const percentage = Math.min(100, (this.current_w / this.true_w) * 50);
                indicator.style.top = `${100 - percentage}%`;
            }
            
            // Calculate and update loss
            let totalLoss = 0;
            for (const point of this.training_data) {
                const prediction = this.current_w * point.x;
                const error = prediction - point.y;
                totalLoss += error * error;
            }
            totalLoss = totalLoss / this.training_data.length;
            
            const lossDisplay = document.getElementById('total-loss');
            if (lossDisplay) {
                if (totalLoss > 1000000) {
                    lossDisplay.textContent = (totalLoss / 1000000).toFixed(1) + 'M';
                } else if (totalLoss > 1000) {
                    lossDisplay.textContent = (totalLoss / 1000).toFixed(1) + 'K';
                } else {
                    lossDisplay.textContent = totalLoss.toFixed(0);
                }
            }
            
            // Update loss bar
            const lossFill = document.getElementById('loss-fill');
            if (lossFill) {
                const maxLoss = 50000000; // Approximate max loss at start
                const lossPercent = Math.max(0, Math.min(100, (1 - totalLoss / maxLoss) * 100));
                lossFill.style.width = `${100 - lossPercent}%`;
            }
            
            // Update progress
            this._updateProgress();
            
            // Highlight current training data
            this.training_data.forEach((_, i) => {
                const el = document.getElementById(`data-${i}`);
                if (el) {
                    if (i === this.current_example_index) {
                        el.style.background = '#fff5f5';
                        el.style.border = '1px solid #e53e3e';
                    } else {
                        el.style.background = 'white';
                        el.style.border = '1px solid #ddd';
                    }
                }
            });
        }
        
        _updateGradientCalculation(example, prediction, error, gradient) {
            const calcEl = document.getElementById('gradient-calc');
            if (!calcEl) return;
            
            calcEl.innerHTML = `
                <div>Point: (${example.x}, ${example.y})</div>
                <div>Pred: ${Math.round(prediction)}</div>
                <div>Error: <span style="color: ${error > 0 ? '#e53e3e' : '#2dd573'};">${error.toFixed(0)}</span></div>
                <div>Gradient: ${gradient.toFixed(0)}</div>
                <div style="margin-top: 5px; padding-top: 5px; border-top: 1px solid #ddd;">
                    Update: ${this.learning_rate.toExponential(0)} × ${gradient.toFixed(0)}
                </div>
            `;
        }
        
        _updateProgress() {
            const progressText = document.getElementById('progress-text');
            const progressBar = document.getElementById('progress-bar');
            const progressBox = document.getElementById('progress-box');
            
            const difference = Math.abs(this.current_w - this.true_w);
            const percentComplete = Math.max(0, Math.min(100, (1 - difference / (this.true_w - 100)) * 100));
            
            if (progressText) {
                if (difference < 1) {
                    progressText.textContent = '🎉 FOUND IT! w = 7040';
                } else if (difference < 100) {
                    progressText.textContent = `Very close! Off by ${Math.round(difference)}`;
                } else if (difference < 1000) {
                    progressText.textContent = `Getting warmer... ${Math.round(difference)} away`;
                } else {
                    progressText.textContent = `${Math.round(difference / 1000)}K away from target`;
                }
            }
            
            if (progressBar) {
                progressBar.style.width = `${percentComplete}%`;
            }
            
            if (progressBox && difference < 1) {
                progressBox.classList.add('converged-glow', 'pulse-glow');
            }
        }
        
        _handleConvergence() {
            // Stop auto run if active
            this._stopAutoRun();
            
            // Visual celebration
            const pumpVisual = document.getElementById('pump-visual');
            if (pumpVisual) {
                pumpVisual.classList.add('pulse-glow');
            }
            
            // Disable step button
            const stepBtn = document.getElementById('take-step-btn');
            if (stepBtn) {
                stepBtn.disabled = true;
                stepBtn.textContent = '✅ Converged!';
                stepBtn.classList.add('converged-glow');
            }
        }
        
        _startAutoRun() {
            this.autoRunning = true;
            const autoBtn = document.getElementById('auto-run-btn');
            if (autoBtn) {
                autoBtn.textContent = '⏸️ Pause';
                autoBtn.style.background = '#e53e3e';
            }
            
            this.autoInterval = setInterval(() => {
                this._takeGradientStep();
                
                if (Math.abs(this.current_w - this.true_w) < 1) {
                    this._stopAutoRun();
                }
            }, 100);
        }
        
        _stopAutoRun() {
            this.autoRunning = false;
            const autoBtn = document.getElementById('auto-run-btn');
            if (autoBtn) {
                autoBtn.textContent = '▶️ Auto Run';
                autoBtn.style.background = '#2dd573';
            }
            
            if (this.autoInterval) {
                clearInterval(this.autoInterval);
                this.autoInterval = null;
            }
        }
        
        _reset() {
            this.current_w = 100;
            this.weight_history = [this.current_w];
            this.step_count = 0;
            this.current_example_index = 0;
            
            // Stop auto run
            this._stopAutoRun();
            
            // Remove converged state
            const progressBox = document.getElementById('progress-box');
            if (progressBox) {
                progressBox.classList.remove('converged-glow', 'pulse-glow');
            }
            
            const pumpVisual = document.getElementById('pump-visual');
            if (pumpVisual) {
                pumpVisual.classList.remove('pulse-glow');
            }
            
            const stepBtn = document.getElementById('take-step-btn');
            if (stepBtn) {
                stepBtn.disabled = false;
                stepBtn.textContent = '📉 Take Gradient Step';
                stepBtn.classList.remove('converged-glow');
                stepBtn.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
            }
            
            this._updateDisplay();
        }
    }
    
    const level = new GradientDescentMathSimpleLevel();
    level.create().catch(error => {
        console.error('Failed to create Gradient Descent Math Simple:', error);
    });
    
    return level;
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.createGradientDescentMathSimple;
}