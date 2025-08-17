/**
 * Introduction to Steps
 * 
 * Interactive level teaching gradient descent step sizes through balloon pumping
 */

window.createIntroductionToSteps = function() {
    
    class IntroductionToStepsLevel extends window.InteractiveLevelTemplate {
        constructor() {
            super({
                id: 'introduction-to-steps',
                name: 'Introduction to Steps',
                type: 'interactive',
                description: '',
                targetFunction: { 
                    w: 704  // Target air amount is 7040, we multiply by 10
                },
                controls: [
                    {
                        id: 'w',
                        label: 'w',
                        min: 0,
                        max: 1000,
                        step: 1,
                        default: 100
                    }
                ],
                validation: {
                    tolerance: 0.002,  // ±2 tolerance on 7040 means 0.02% tolerance
                    customValidator: function(params, target) {
                        const airAmount = params.w * 10;
                        const targetAmount = 7040;
                        const tolerance = 2;
                        
                        const isCorrect = Math.abs(airAmount - targetAmount) <= tolerance;
                        const accuracy = Math.max(0, 100 - Math.abs(airAmount - targetAmount) / targetAmount * 100);
                        
                        let status = 'deflated';
                        if (airAmount < targetAmount - tolerance) {
                            status = 'deflated';
                        } else if (airAmount > targetAmount + tolerance) {
                            status = 'popped';
                        } else {
                            status = 'perfect';
                        }
                        
                        return {
                            success: isCorrect,
                            accuracy: Math.round(accuracy),
                            status: status,
                            airAmount: airAmount,
                            targetAmount: targetAmount,
                            error: airAmount - targetAmount
                        };
                    }
                },
                showFormula: false,
                debug: false
            });
            
            // Custom state for this level
            this.learningRate = 'medium';
            this.lastError = null;
            this.canUpdate = false;
            this.updateCount = 0;
        }
        
        async setup() {
            await super.setup();
            
            // CRITICAL: Initialize navigation
            if (typeof initializeNavigation === 'function') {
                initializeNavigation('introduction-to-steps', 'createIntroductionToSteps');
            }
            
            // Setup custom event handlers
            this._setupCustomHandlers();
        }
        
        _generateMainContent() {
            return `
                <div style="max-height: 80vh; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; padding: 15px;">
                    <!-- Left Panel: Machine Visualization -->
                    <div style="background: white; border-radius: 10px; padding: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); display: flex; flex-direction: column;">
                        <h4 style="margin: 0 0 10px 0; color: #333; text-align: center;">Balloon Machine</h4>
                        
                        <!-- Machine Display -->
                        <div style="flex: 1; background: linear-gradient(to bottom, #e3f2fd, #bbdefb); border-radius: 8px; padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 300px;">
                            <!-- Machine -->
                            <div id="machine" style="text-align: center; margin-bottom: 20px;">
                                <div style="font-size: 1rem; color: #666; margin-bottom: 10px;">Input: 10 units</div>
                                <div style="background: #667eea; color: white; padding: 10px 20px; border-radius: 8px; margin: 10px 0; font-size: 1.1rem; font-weight: bold;">
                                    Machine (×w)
                                </div>
                                <div style="font-size: 1rem; color: #666; margin-top: 10px;">Output: <span id="air-output">1000</span> air units</div>
                            </div>
                            
                            <!-- Balloon -->
                            <div id="balloon-container" style="position: relative; height: 150px; display: flex; align-items: center; justify-content: center;">
                                <div id="balloon" style="font-size: 100px; transition: all 0.5s ease;">🎈</div>
                                <div id="pop-effect" style="position: absolute; font-size: 120px; opacity: 0;">💥</div>
                            </div>
                            
                            <!-- Status -->
                            <div id="balloon-status" style="margin-top: 20px; padding: 10px; border-radius: 8px; background: rgba(255,255,255,0.7); width: 100%; text-align: center; min-height: 60px;">
                                <div style="font-size: 0.9rem; color: #666;">Press "Pump Balloon" to test!</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right Panel: Controls -->
                    <div style="background: white; border-radius: 10px; padding: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); display: flex; flex-direction: column;">
                        <h4 style="margin: 0 0 10px 0; color: #333; text-align: center;">Controls</h4>
                        
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 15px;">
                            <!-- Current Function Display -->
                            <div style="background: #f8f9fa; border: 2px solid #667eea; border-radius: 8px; padding: 15px; text-align: center;">
                                <div style="font-family: 'Courier New', monospace; font-size: 1.2rem; color: #333;">
                                    Air = w × 10
                                </div>
                                <div style="font-size: 1rem; color: #667eea; margin-top: 8px;">
                                    w = <span id="w-display" style="font-weight: bold;">100</span>
                                </div>
                            </div>
                            
                            <!-- Pump Button -->
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
                            
                            <!-- Error Display -->
                            <div id="error-display" style="
                                padding: 12px;
                                background: rgba(255,215,0,0.1);
                                border: 2px solid rgba(255,215,0,0.3);
                                border-radius: 8px;
                                text-align: center;
                                display: none;
                            ">
                                <div style="font-size: 0.9rem; color: #666;">Latest Error:</div>
                                <div id="error-value" style="font-size: 1.2rem; font-weight: bold; color: #f3960a;">0</div>
                            </div>
                            
                            <!-- Learning Rate Selection -->
                            <div style="background: #f8f9fa; border-radius: 8px; padding: 15px;">
                                <div style="font-size: 0.9rem; color: #666; margin-bottom: 10px; text-align: center;">Learning Rate:</div>
                                <div style="display: flex; gap: 10px; justify-content: center;">
                                    <button class="lr-btn" data-lr="large" style="
                                        padding: 8px 15px;
                                        background: white;
                                        color: #333;
                                        border: 2px solid #ddd;
                                        border-radius: 5px;
                                        cursor: pointer;
                                        font-size: 0.9rem;
                                    ">Large</button>
                                    <button class="lr-btn" data-lr="medium" style="
                                        padding: 8px 15px;
                                        background: #667eea;
                                        color: white;
                                        border: none;
                                        border-radius: 5px;
                                        cursor: pointer;
                                        font-size: 0.9rem;
                                    ">Medium</button>
                                    <button class="lr-btn" data-lr="small" style="
                                        padding: 8px 15px;
                                        background: white;
                                        color: #333;
                                        border: 2px solid #ddd;
                                        border-radius: 5px;
                                        cursor: pointer;
                                        font-size: 0.9rem;
                                    ">Small</button>
                                </div>
                            </div>
                            
                            <!-- Update W Button -->
                            <button id="update-w-btn" style="
                                padding: 12px;
                                background: #6c757d;
                                color: white;
                                border: none;
                                border-radius: 8px;
                                font-size: 1rem;
                                font-weight: bold;
                                cursor: not-allowed;
                                opacity: 0.5;
                                transition: all 0.3s;
                            " disabled>
                                🔄 Update w
                            </button>
                            
                            <!-- Success Message -->
                            <div id="success-message" style="
                                padding: 15px;
                                background: rgba(45,213,115,0.1);
                                border: 2px solid rgba(45,213,115,0.3);
                                border-radius: 8px;
                                text-align: center;
                                display: none;
                            ">
                                <div style="color: #2dd573; font-weight: bold;">🎉 Perfect! You found the right value!</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- CRITICAL: Standard navigation -->
                ${typeof createStandardNavigation === 'function' ? createStandardNavigation() : ''}
            `;
        }
        
        _setupCustomHandlers() {
            // Pump button handler
            const pumpBtn = document.getElementById('pump-btn');
            if (pumpBtn) {
                this.addEventListenerWithCleanup(pumpBtn, 'click', () => this._pumpBalloon());
                
                // Hover effects
                this.addEventListenerWithCleanup(pumpBtn, 'mouseenter', () => {
                    pumpBtn.style.transform = 'translateY(-2px)';
                    pumpBtn.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                });
                this.addEventListenerWithCleanup(pumpBtn, 'mouseleave', () => {
                    pumpBtn.style.transform = 'translateY(0)';
                    pumpBtn.style.boxShadow = 'none';
                });
            }
            
            // Learning rate buttons
            const lrButtons = document.querySelectorAll('.lr-btn');
            lrButtons.forEach(btn => {
                this.addEventListenerWithCleanup(btn, 'click', () => this._selectLearningRate(btn.dataset.lr));
            });
            
            // Update W button
            const updateBtn = document.getElementById('update-w-btn');
            if (updateBtn) {
                this.addEventListenerWithCleanup(updateBtn, 'click', () => this._updateW());
            }
            
            // W slider override
            const wSlider = document.getElementById('w-slider');
            if (wSlider) {
                this.addEventListenerWithCleanup(wSlider, 'input', (e) => {
                    const value = parseFloat(e.target.value);
                    this.updateParameters({ w: value });
                    document.getElementById('w-display').textContent = Math.round(value);
                    document.getElementById('air-output').textContent = Math.round(value * 10);
                });
            }
        }
        
        _pumpBalloon() {
            const validation = this.validateParameters();
            const balloon = document.getElementById('balloon');
            const popEffect = document.getElementById('pop-effect');
            const status = document.getElementById('balloon-status');
            const errorDisplay = document.getElementById('error-display');
            const errorValue = document.getElementById('error-value');
            const machine = document.getElementById('machine');
            
            // Machine animation
            machine.style.animation = 'pulse 0.5s';
            setTimeout(() => {
                machine.style.animation = '';
            }, 500);
            
            // Update error
            this.lastError = validation.error;
            this.canUpdate = true;
            
            // Show error display
            if (errorDisplay) {
                errorDisplay.style.display = 'block';
                errorValue.textContent = validation.error > 0 ? `+${Math.round(validation.error)}` : Math.round(validation.error);
            }
            
            // Enable update button
            const updateBtn = document.getElementById('update-w-btn');
            if (updateBtn && !validation.success) {
                updateBtn.disabled = false;
                updateBtn.style.cursor = 'pointer';
                updateBtn.style.opacity = '1';
                updateBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
            }
            
            // Balloon animation based on status
            if (validation.status === 'perfect') {
                balloon.style.fontSize = '120px';
                balloon.style.opacity = '1';
                balloon.textContent = '🎈';
                status.innerHTML = `
                    <div style="color: #2dd573; font-weight: bold; font-size: 1.1rem;">✨ Perfect! ✨</div>
                    <div style="color: #666; font-size: 0.9rem;">Air: ${Math.round(validation.airAmount)} units (Target: ${validation.targetAmount}±2)</div>
                `;
                
                // Show success message
                const successMsg = document.getElementById('success-message');
                if (successMsg) {
                    successMsg.style.display = 'block';
                }
                
                // Complete level
                this.completeLevel({
                    score: 100,
                    solutions: { w: this.getParameters().w }
                });
                
            } else if (validation.status === 'popped') {
                balloon.style.opacity = '0';
                popEffect.style.opacity = '1';
                setTimeout(() => {
                    popEffect.style.opacity = '0';
                    balloon.style.opacity = '1';
                    balloon.textContent = '💔';
                    balloon.style.fontSize = '60px';
                }, 300);
                status.innerHTML = `
                    <div style="color: #ff6347; font-weight: bold;">💥 POP! Too much air!</div>
                    <div style="color: #666; font-size: 0.9rem;">Air: ${Math.round(validation.airAmount)} units (Target: ${validation.targetAmount}±2)</div>
                `;
                
            } else {
                balloon.style.fontSize = '70px';
                balloon.style.opacity = '0.7';
                balloon.textContent = '🎈';
                status.innerHTML = `
                    <div style="color: #f3960a; font-weight: bold;">😔 Not enough air!</div>
                    <div style="color: #666; font-size: 0.9rem;">Air: ${Math.round(validation.airAmount)} units (Target: ${validation.targetAmount}±2)</div>
                `;
            }
        }
        
        _selectLearningRate(rate) {
            this.learningRate = rate;
            
            // Update button styles
            const lrButtons = document.querySelectorAll('.lr-btn');
            lrButtons.forEach(btn => {
                if (btn.dataset.lr === rate) {
                    btn.style.background = '#667eea';
                    btn.style.color = 'white';
                    btn.style.border = 'none';
                } else {
                    btn.style.background = 'white';
                    btn.style.color = '#333';
                    btn.style.border = '2px solid #ddd';
                }
            });
        }
        
        _updateW() {
            if (!this.canUpdate || this.lastError === null) return;
            
            const currentW = this.getParameters().w;
            let stepSize;
            
            // Different step sizes based on learning rate
            switch(this.learningRate) {
                case 'large':
                    stepSize = 50;
                    break;
                case 'small':
                    stepSize = 5;
                    break;
                default: // medium
                    stepSize = 20;
            }
            
            // Apply gradient descent step
            const gradient = this.lastError / 10; // Since error is in air units, divide by 10 for w units
            const newW = currentW - stepSize * Math.sign(gradient);
            
            // Clamp to valid range
            const clampedW = Math.max(0, Math.min(1000, newW));
            
            // Update the slider and value
            const wSlider = document.getElementById('w-slider');
            if (wSlider) {
                wSlider.value = clampedW;
            }
            
            this.updateParameters({ w: clampedW });
            document.getElementById('w-display').textContent = Math.round(clampedW);
            document.getElementById('air-output').textContent = Math.round(clampedW * 10);
            
            // Disable update button until next pump
            this.canUpdate = false;
            const updateBtn = document.getElementById('update-w-btn');
            if (updateBtn) {
                updateBtn.disabled = true;
                updateBtn.style.cursor = 'not-allowed';
                updateBtn.style.opacity = '0.5';
                updateBtn.style.background = '#6c757d';
            }
            
            // Clear the error display
            const errorDisplay = document.getElementById('error-display');
            if (errorDisplay) {
                errorDisplay.style.display = 'none';
            }
            
            // Track update
            this.updateCount++;
            this.trackAction('parameter_update', { 
                learningRate: this.learningRate,
                stepSize: stepSize,
                oldW: currentW,
                newW: clampedW,
                updateCount: this.updateCount
            });
        }
    }
    
    // Add pulse animation CSS if not present
    if (!document.getElementById('intro-steps-style')) {
        const style = document.createElement('style');
        style.id = 'intro-steps-style';
        style.textContent = `
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
        `;
        document.head.appendChild(style);
    }
    
    const level = new IntroductionToStepsLevel();
    level.create().catch(error => {
        console.error('Failed to create Introduction to Steps:', error);
    });
    
    return level;
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.createIntroductionToSteps;
}