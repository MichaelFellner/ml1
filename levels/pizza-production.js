/**
 * Pizza Production Challenge
 * 
 * Interactive level teaching gradient descent with two parameters through pizza production
 */

window.createPizzaProduction = function() {
    
    class PizzaProductionLevel extends window.InteractiveLevelTemplate {
        constructor() {
            super({
                id: 'pizza-production',
                name: 'Pizza Production Challenge',
                type: 'interactive',
                description: '',
                targetFunction: { 
                    w1: 280,  // Target dough multiplier
                    w2: 520   // Target cheese multiplier
                    // 280 * 10 + 520 * 30 = 2800 + 15600 = 18400 (close to 18320)
                },
                controls: [
                    {
                        id: 'w1',
                        label: 'Dough (w1)',
                        min: 0,
                        max: 500,
                        step: 10,
                        default: 100
                    },
                    {
                        id: 'w2',
                        label: 'Cheese (w2)',
                        min: 0,
                        max: 800,
                        step: 10,
                        default: 200
                    }
                ],
                validation: {
                    tolerance: 0.005,  // ±0.5% tolerance on 18320
                    customValidator: function(params, target) {
                        // Fixed inputs: 10 batches of dough, 30 blocks of cheese
                        const doughBatches = 10;
                        const cheeseBlocks = 30;
                        
                        const pizzaOutput = params.w1 * doughBatches + params.w2 * cheeseBlocks;
                        const targetOutput = 18320;
                        const tolerance = 80; // ±80 units tolerance
                        
                        const isCorrect = Math.abs(pizzaOutput - targetOutput) <= tolerance;
                        const accuracy = Math.max(0, 100 - Math.abs(pizzaOutput - targetOutput) / targetOutput * 100);
                        
                        let status = 'insufficient';
                        if (pizzaOutput < targetOutput - tolerance) {
                            status = 'insufficient';
                        } else if (pizzaOutput > targetOutput + tolerance) {
                            status = 'wasteful';
                        } else {
                            status = 'perfect';
                        }
                        
                        return {
                            success: isCorrect,
                            accuracy: Math.round(accuracy),
                            status: status,
                            pizzaOutput: pizzaOutput,
                            targetOutput: targetOutput,
                            error: pizzaOutput - targetOutput
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
                initializeNavigation('pizza-production', 'createPizzaProduction');
            }
            
            // Setup custom event handlers
            this._setupCustomHandlers();
        }
        
        _generateMainContent() {
            return `
                <div style="max-height: 80vh; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; padding: 15px;">
                    <!-- Left Panel: Pizza Machine Visualization -->
                    <div style="background: white; border-radius: 10px; padding: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); display: flex; flex-direction: column;">
                        <h4 style="margin: 0 0 10px 0; color: #333; text-align: center;">🍕 Pizza Production Machine</h4>
                        
                        <!-- Machine Display -->
                        <div style="flex: 1; background: linear-gradient(to bottom, #fff3e0, #ffe0b2); border-radius: 8px; padding: 15px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                            <!-- Input Display -->
                            <div style="display: flex; gap: 30px; margin-bottom: 15px;">
                                <div style="text-align: center;">
                                    <div style="font-size: 0.9rem; color: #666; margin-bottom: 5px;">Dough Batches</div>
                                    <div style="background: #8d6e63; color: white; padding: 8px 15px; border-radius: 8px; font-size: 1.1rem; font-weight: bold;">10</div>
                                </div>
                                <div style="text-align: center;">
                                    <div style="font-size: 0.9rem; color: #666; margin-bottom: 5px;">Cheese Blocks</div>
                                    <div style="background: #ffc107; color: white; padding: 8px 15px; border-radius: 8px; font-size: 1.1rem; font-weight: bold;">30</div>
                                </div>
                            </div>
                            
                            <!-- Machine -->
                            <div id="machine" style="text-align: center; margin-bottom: 15px;">
                                <div style="background: linear-gradient(135deg, #ff6b6b, #ff8e53); color: white; padding: 15px 25px; border-radius: 10px; font-size: 1.2rem; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.2);">
                                    Pizza Machine
                                    <div style="font-size: 0.8rem; margin-top: 5px; opacity: 0.9;">w1 × dough + w2 × cheese</div>
                                </div>
                                <div style="font-size: 1rem; color: #666; margin-top: 10px;">Output: <span id="pizza-output" style="font-weight: bold; color: #ff6b6b;">3000</span> pizza units</div>
                            </div>
                            
                            <!-- Pizza Visual -->
                            <div id="pizza-container" style="position: relative; height: 120px; display: flex; align-items: center; justify-content: center;">
                                <div id="pizza-visual" style="font-size: 100px; transition: all 0.5s ease;">🍕</div>
                                <div id="money-effect" style="position: absolute; font-size: 80px; opacity: 0;">💸</div>
                                <div id="sad-effect" style="position: absolute; font-size: 80px; opacity: 0;">😢</div>
                            </div>
                            
                            <!-- Status -->
                            <div id="production-status" style="margin-top: 15px; padding: 10px; border-radius: 8px; background: rgba(255,255,255,0.7); width: 100%; text-align: center; min-height: 50px;">
                                <div style="font-size: 0.9rem; color: #666;">Press "Make Pizzas" to test production!</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right Panel: Controls -->
                    <div style="background: white; border-radius: 10px; padding: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); display: flex; flex-direction: column;">
                        <h4 style="margin: 0 0 10px 0; color: #333; text-align: center;">Production Controls</h4>
                        
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 15px;">
                            <!-- Current Function Display -->
                            <div style="background: #f8f9fa; border: 2px solid #ff6b6b; border-radius: 8px; padding: 15px; text-align: center;">
                                <div style="font-family: 'Courier New', monospace; font-size: 1.1rem; color: #333;">
                                    Pizza = w1 × dough + w2 × cheese
                                </div>
                                <div style="font-size: 0.95rem; color: #666; margin-top: 8px;">
                                    w1 = <span id="w1-display" style="color: #8d6e63; font-weight: bold;">100</span>, 
                                    w2 = <span id="w2-display" style="color: #ffc107; font-weight: bold;">200</span>
                                </div>
                                <div style="font-size: 0.9rem; color: #999; margin-top: 5px;">
                                    Target: 18,320 units (day's requirement)
                                </div>
                            </div>
                            

                            
                            <!-- Make Pizza Button -->
                            <button id="make-pizza-btn" style="
                                padding: 15px;
                                background: linear-gradient(135deg, #ff6b6b, #ff8e53);
                                color: white;
                                border: none;
                                border-radius: 8px;
                                font-size: 1.1rem;
                                font-weight: bold;
                                cursor: pointer;
                                transition: all 0.3s;
                            ">
                                🍕 Make Pizzas
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
                                        background: #ff6b6b;
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
                            
                            <!-- Update Parameters Button -->
                            <button id="update-params-btn" style="
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
                                🔄 Update Parameters
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
                                <div style="color: #2dd573; font-weight: bold;">🎉 Perfect production level!</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- CRITICAL: Standard navigation -->
                ${typeof createStandardNavigation === 'function' ? createStandardNavigation() : ''}
            `;
        }
        
        _setupCustomHandlers() {
            // Make Pizza button handler
            const makePizzaBtn = document.getElementById('make-pizza-btn');
            if (makePizzaBtn) {
                this.addEventListenerWithCleanup(makePizzaBtn, 'click', () => this._makePizza());
                
                // Hover effects
                this.addEventListenerWithCleanup(makePizzaBtn, 'mouseenter', () => {
                    makePizzaBtn.style.transform = 'translateY(-2px)';
                    makePizzaBtn.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                });
                this.addEventListenerWithCleanup(makePizzaBtn, 'mouseleave', () => {
                    makePizzaBtn.style.transform = 'translateY(0)';
                    makePizzaBtn.style.boxShadow = 'none';
                });
            }
            
            // Learning rate buttons
            const lrButtons = document.querySelectorAll('.lr-btn');
            lrButtons.forEach(btn => {
                this.addEventListenerWithCleanup(btn, 'click', () => this._selectLearningRate(btn.dataset.lr));
            });
            
            // Update Parameters button
            const updateBtn = document.getElementById('update-params-btn');
            if (updateBtn) {
                this.addEventListenerWithCleanup(updateBtn, 'click', () => this._updateParameters());
            }
            
            // Sliders removed - parameters can only be updated via the Update Parameters button
        }
        
        _updateOutput() {
            const params = this.getParameters();
            const output = params.w1 * 10 + params.w2 * 30;
            document.getElementById('pizza-output').textContent = Math.round(output).toLocaleString();
        }
        
        _makePizza() {
            const validation = this.validateParameters();
            const pizzaVisual = document.getElementById('pizza-visual');
            const moneyEffect = document.getElementById('money-effect');
            const sadEffect = document.getElementById('sad-effect');
            const status = document.getElementById('production-status');
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
            const updateBtn = document.getElementById('update-params-btn');
            if (updateBtn && !validation.success) {
                updateBtn.disabled = false;
                updateBtn.style.cursor = 'pointer';
                updateBtn.style.opacity = '1';
                updateBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
            }
            
            // Pizza animation based on status
            if (validation.status === 'perfect') {
                pizzaVisual.style.fontSize = '120px';
                pizzaVisual.style.opacity = '1';
                pizzaVisual.textContent = '🍕';
                status.innerHTML = `
                    <div style="color: #2dd573; font-weight: bold; font-size: 1.1rem;">✨ Perfect Production! ✨</div>
                    <div style="color: #666; font-size: 0.9rem;">Output: ${Math.round(validation.pizzaOutput).toLocaleString()} units (Target: ${validation.targetOutput.toLocaleString()}±80)</div>
                `;
                
                // Show success message
                const successMsg = document.getElementById('success-message');
                if (successMsg) {
                    successMsg.style.display = 'block';
                }
                
                // Complete level
                this.completeLevel({
                    score: 100,
                    solutions: this.getParameters()
                });
                
            } else if (validation.status === 'wasteful') {
                // Too much - money wasted
                moneyEffect.style.opacity = '1';
                setTimeout(() => {
                    moneyEffect.style.opacity = '0';
                    pizzaVisual.textContent = '📦';
                    pizzaVisual.style.fontSize = '80px';
                }, 300);
                status.innerHTML = `
                    <div style="color: #ff6347; font-weight: bold;">💸 Too much! Wasting money!</div>
                    <div style="color: #666; font-size: 0.9rem;">Output: ${Math.round(validation.pizzaOutput).toLocaleString()} units (Target: ${validation.targetOutput.toLocaleString()}±80)</div>
                `;
                
            } else {
                // Too little - customers sad
                sadEffect.style.opacity = '1';
                setTimeout(() => {
                    sadEffect.style.opacity = '0';
                    pizzaVisual.textContent = '🍕';
                    pizzaVisual.style.fontSize = '60px';
                    pizzaVisual.style.opacity = '0.5';
                }, 300);
                status.innerHTML = `
                    <div style="color: #f3960a; font-weight: bold;">😢 Not enough for customers!</div>
                    <div style="color: #666; font-size: 0.9rem;">Output: ${Math.round(validation.pizzaOutput).toLocaleString()} units (Target: ${validation.targetOutput.toLocaleString()}±80)</div>
                `;
            }
        }
        
        _selectLearningRate(rate) {
            this.learningRate = rate;
            
            // Update button styles
            const lrButtons = document.querySelectorAll('.lr-btn');
            lrButtons.forEach(btn => {
                if (btn.dataset.lr === rate) {
                    btn.style.background = '#ff6b6b';
                    btn.style.color = 'white';
                    btn.style.border = 'none';
                } else {
                    btn.style.background = 'white';
                    btn.style.color = '#333';
                    btn.style.border = '2px solid #ddd';
                }
            });
        }
        
        _updateParameters() {
            if (!this.canUpdate || this.lastError === null) return;
            
            const params = this.getParameters();
            let stepSizeW1, stepSizeW2;
            
            // Different step sizes based on learning rate
            switch(this.learningRate) {
                case 'large':
                    stepSizeW1 = 30;
                    stepSizeW2 = 50;
                    break;
                case 'small':
                    stepSizeW1 = 5;
                    stepSizeW2 = 10;
                    break;
                default: // medium
                    stepSizeW1 = 15;
                    stepSizeW2 = 25;
            }
            
            // Apply gradient descent step
            // Gradient approximation: error is mostly influenced by w2 (cheese has 3x the quantity)
            const errorSign = Math.sign(this.lastError);
            const newW1 = params.w1 - stepSizeW1 * errorSign * 0.3; // Dough has less influence
            const newW2 = params.w2 - stepSizeW2 * errorSign * 1.0; // Cheese has more influence
            
            // Clamp to valid ranges
            const clampedW1 = Math.max(0, Math.min(500, newW1));
            const clampedW2 = Math.max(0, Math.min(800, newW2));
            
            // Update the displayed values (sliders removed)
            
            this.updateParameters({ w1: clampedW1, w2: clampedW2 });
            document.getElementById('w1-display').textContent = Math.round(clampedW1);
            document.getElementById('w2-display').textContent = Math.round(clampedW2);
            
            this._updateOutput();
            
            // Disable update button until next make
            this.canUpdate = false;
            const updateBtn = document.getElementById('update-params-btn');
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
                stepSizeW1: stepSizeW1,
                stepSizeW2: stepSizeW2,
                oldW1: params.w1,
                oldW2: params.w2,
                newW1: clampedW1,
                newW2: clampedW2,
                updateCount: this.updateCount
            });
        }
    }
    
    // Add pulse animation CSS if not present
    if (!document.getElementById('pizza-style')) {
        const style = document.createElement('style');
        style.id = 'pizza-style';
        style.textContent = `
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
        `;
        document.head.appendChild(style);
    }
    
    const level = new PizzaProductionLevel();
    level.create().catch(error => {
        console.error('Failed to create Pizza Production:', error);
    });
    
    return level;
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.createPizzaProduction;
}