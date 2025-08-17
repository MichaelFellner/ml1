/**
 * Gradient Descent Math - Simple Case
 * 
 * Explains the math of gradient descent for f(x) = wx with MSE loss
 */

window.createGradientDescentMathSimple = function() {
    
    class GradientDescentMathSimpleLevel extends window.BaseLevelTemplate {
        constructor() {
            super({
                id: 'gradient-descent-math-simple',
                name: 'Gradient Descent Math: Simple Case',
                type: 'tutorial',
                description: 'Understanding parameter updates for f(x) = wx'
            });
            
            this.currentExample = 0;
            this.examples = [
                { x: 2, y_true: 10, w: 3, lr: 0.1 },
                { x: 5, y_true: 15, w: 2, lr: 0.05 },
                { x: 3, y_true: 12, w: 5, lr: 0.2 }
            ];
        }
        
        async setup() {
            await super.setup();
            
            // Initialize navigation
            if (typeof initializeNavigation === 'function') {
                initializeNavigation('gradient-descent-math-simple', 'createGradientDescentMathSimple');
            }
            
            this._setupHandlers();
            // Update example after DOM is ready
            setTimeout(() => this._updateExample(), 100);
        }
        
        _generateMainContent() {
            return `
                <div style="max-height: 80vh; display: flex; flex-direction: column; gap: 20px; padding: 20px;">
                    <!-- Title -->
                    <div style="text-align: center;">
                        <h2 style="color: #333; margin: 0;">📐 Gradient Descent Math: Simple Case</h2>
                        <p style="color: #666; margin-top: 10px;">Learn how gradient descent updates parameters - no calculus required!</p>
                    </div>
                    
                    <!-- Main Content Grid -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; flex: 1;">
                        <!-- Left Panel: Formula & Explanation -->
                        <div style="background: white; border-radius: 10px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                            <h3 style="color: #667eea; margin: 0 0 15px 0;">The Function & Loss</h3>
                            
                            <!-- Function Display -->
                            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                                <div style="font-family: 'Courier New', monospace; font-size: 1.2rem; color: #333; text-align: center;">
                                    f(x) = w × x
                                </div>
                                <div style="color: #666; font-size: 0.9rem; text-align: center; margin-top: 5px;">
                                    Our simple linear function
                                </div>
                            </div>
                            
                            <!-- MSE Loss -->
                            <div style="background: #fff5f5; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                                <div style="font-family: 'Courier New', monospace; color: #e53e3e;">
                                    Loss = (prediction - target)²
                                </div>
                                <div style="color: #666; font-size: 0.85rem; margin-top: 5px;">
                                    Mean Squared Error (MSE)
                                </div>
                            </div>
                            
                            <!-- Update Rule -->
                            <div style="background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(118,75,162,0.1)); padding: 20px; border-radius: 8px; border: 2px solid #667eea;">
                                <h4 style="color: #667eea; margin: 0 0 10px 0;">✨ The Update Rule</h4>
                                <div style="font-family: 'Courier New', monospace; font-size: 1rem; line-height: 1.8;">
                                    <div>error = prediction - target</div>
                                    <div>gradient = 2 × error × x</div>
                                    <div style="background: white; padding: 10px; border-radius: 5px; margin: 10px 0; border: 2px solid #667eea;">
                                        <strong>w_new = w - learning_rate × gradient</strong>
                                    </div>
                                </div>
                                <div style="color: #666; font-size: 0.85rem; margin-top: 10px;">
                                    💡 The gradient tells us the slope - how much the loss increases when w increases
                                </div>
                            </div>
                        </div>
                        
                        <!-- Right Panel: Interactive Example -->
                        <div style="background: white; border-radius: 10px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                            <h3 style="color: #764ba2; margin: 0 0 15px 0;">Interactive Example</h3>
                            
                            <!-- Example Controls -->
                            <div style="margin-bottom: 15px;">
                                <div style="display: flex; gap: 10px; justify-content: center;">
                                    <button id="prev-example" style="padding: 8px 15px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">← Previous</button>
                                    <span style="padding: 8px 15px; background: #f8f9fa; border-radius: 5px;">Example <span id="example-num">1</span> of 3</span>
                                    <button id="next-example" style="padding: 8px 15px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">Next →</button>
                                </div>
                            </div>
                            
                            <!-- Given Values -->
                            <div style="background: #f0f7ff; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                                <h4 style="color: #333; margin: 0 0 10px 0;">Given:</h4>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-family: 'Courier New', monospace;">
                                    <div>x = <span id="x-value" style="color: #667eea; font-weight: bold;">2</span></div>
                                    <div>target = <span id="target-value" style="color: #667eea; font-weight: bold;">10</span></div>
                                    <div>w = <span id="w-value" style="color: #667eea; font-weight: bold;">3</span></div>
                                    <div>α = <span id="lr-value" style="color: #667eea; font-weight: bold;">0.1</span></div>
                                </div>
                            </div>
                            
                            <!-- Step-by-step Calculation -->
                            <div style="background: #fff9e6; padding: 15px; border-radius: 8px;">
                                <h4 style="color: #333; margin: 0 0 10px 0;">📝 Step-by-Step Calculation:</h4>
                                <div id="calculation-steps" style="font-family: 'Courier New', monospace; font-size: 0.9rem; line-height: 2;">
                                    <!-- Will be filled dynamically -->
                                </div>
                            </div>
                            
                            <!-- Result -->
                            <div style="background: linear-gradient(135deg, rgba(45,213,115,0.1), rgba(45,213,115,0.2)); padding: 15px; border-radius: 8px; margin-top: 15px; border: 2px solid #2dd573;">
                                <div style="text-align: center;">
                                    <div style="color: #666; font-size: 0.9rem;">New weight after update:</div>
                                    <div style="font-size: 1.5rem; color: #2dd573; font-weight: bold; font-family: 'Courier New', monospace;">
                                        w_new = <span id="w-new-value">2.4</span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Learning Rate Effect -->
                            <div style="margin-top: 15px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                                <h4 style="color: #666; margin: 0 0 10px 0; font-size: 0.9rem;">🎯 Try Different Learning Rates:</h4>
                                <div style="display: flex; gap: 10px; justify-content: center;">
                                    <button class="lr-button" data-lr="0.01" style="padding: 6px 12px; background: white; border: 1px solid #ddd; border-radius: 5px; cursor: pointer;">α=0.01</button>
                                    <button class="lr-button" data-lr="0.1" style="padding: 6px 12px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">α=0.1</button>
                                    <button class="lr-button" data-lr="0.5" style="padding: 6px 12px; background: white; border: 1px solid #ddd; border-radius: 5px; cursor: pointer;">α=0.5</button>
                                    <button class="lr-button" data-lr="1.0" style="padding: 6px 12px; background: white; border: 1px solid #ddd; border-radius: 5px; cursor: pointer;">α=1.0</button>
                                </div>
                                <div id="lr-effect" style="text-align: center; margin-top: 10px; color: #666; font-size: 0.85rem;">
                                    <!-- Will show effect of different learning rates -->
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Key Insights -->
                    <div style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 20px; border-radius: 10px;">
                        <h3 style="margin: 0 0 10px 0;">💡 Key Insights</h3>
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
                            <div>
                                <strong>Gradient Direction:</strong><br>
                                Positive error → decrease w<br>
                                Negative error → increase w
                            </div>
                            <div>
                                <strong>Learning Rate Effect:</strong><br>
                                Small α → slow but stable<br>
                                Large α → fast but may overshoot
                            </div>
                            <div>
                                <strong>Input Matters:</strong><br>
                                Larger x → larger gradient<br>
                                This is why we multiply by x!
                            </div>
                        </div>
                    </div>
                </div>
                
                ${typeof createStandardNavigation === 'function' ? createStandardNavigation() : ''}
            `;
        }
        
        _setupHandlers() {
            // Example navigation
            const prevBtn = document.getElementById('prev-example');
            const nextBtn = document.getElementById('next-example');
            
            if (prevBtn) {
                this.addEventListenerWithCleanup(prevBtn, 'click', () => {
                    this.currentExample = (this.currentExample - 1 + this.examples.length) % this.examples.length;
                    this._updateExample();
                });
            }
            
            if (nextBtn) {
                this.addEventListenerWithCleanup(nextBtn, 'click', () => {
                    this.currentExample = (this.currentExample + 1) % this.examples.length;
                    this._updateExample();
                });
            }
            
            // Learning rate buttons
            const lrButtons = document.querySelectorAll('.lr-button');
            lrButtons.forEach(btn => {
                this.addEventListenerWithCleanup(btn, 'click', () => {
                    const lr = parseFloat(btn.dataset.lr);
                    this._updateWithLearningRate(lr);
                    
                    // Update button styles
                    lrButtons.forEach(b => {
                        b.style.background = 'white';
                        b.style.color = '#333';
                        b.style.border = '1px solid #ddd';
                    });
                    btn.style.background = '#667eea';
                    btn.style.color = 'white';
                    btn.style.border = 'none';
                });
            });
        }
        
        _updateExample() {
            const example = this.examples[this.currentExample];
            
            // Update displayed values
            document.getElementById('x-value').textContent = example.x;
            document.getElementById('target-value').textContent = example.y_true;
            document.getElementById('w-value').textContent = example.w;
            document.getElementById('lr-value').textContent = example.lr;
            document.getElementById('example-num').textContent = this.currentExample + 1;
            
            this._calculateUpdate(example.x, example.y_true, example.w, example.lr);
        }
        
        _calculateUpdate(x, y_true, w, lr) {
            // Calculate step by step
            const prediction = w * x;
            const error = prediction - y_true;
            const gradient = 2 * error * x;
            const w_new = w - lr * gradient;
            
            // Display calculation steps
            const stepsEl = document.getElementById('calculation-steps');
            if (stepsEl) {
                stepsEl.innerHTML = `
                    <div style="color: #666;">1. Calculate prediction:</div>
                    <div style="margin-left: 20px; color: #333;">f(${x}) = ${w} × ${x} = <strong>${prediction}</strong></div>
                    
                    <div style="color: #666; margin-top: 10px;">2. Calculate error:</div>
                    <div style="margin-left: 20px; color: #333;">${prediction} - ${y_true} = <strong>${error.toFixed(2)}</strong></div>
                    
                    <div style="color: #666; margin-top: 10px;">3. Calculate gradient:</div>
                    <div style="margin-left: 20px; color: #333;">2 × ${error.toFixed(2)} × ${x} = <strong>${gradient.toFixed(2)}</strong></div>
                    
                    <div style="color: #666; margin-top: 10px;">4. Update weight:</div>
                    <div style="margin-left: 20px; color: #333;">${w} - ${lr} × ${gradient.toFixed(2)} = <strong>${w_new.toFixed(3)}</strong></div>
                `;
            }
            
            // Update result
            document.getElementById('w-new-value').textContent = w_new.toFixed(3);
        }
        
        _updateWithLearningRate(lr) {
            const example = this.examples[this.currentExample];
            this._calculateUpdate(example.x, example.y_true, example.w, lr);
            
            // Update learning rate display
            document.getElementById('lr-value').textContent = lr;
            
            // Show effect description
            const effectEl = document.getElementById('lr-effect');
            if (effectEl) {
                const stepSize = Math.abs(lr * 2 * (example.w * example.x - example.y_true) * example.x);
                let description = '';
                
                if (lr <= 0.01) {
                    description = `Very small steps (${stepSize.toFixed(4)}). Very stable but slow convergence.`;
                } else if (lr <= 0.1) {
                    description = `Moderate steps (${stepSize.toFixed(3)}). Good balance of speed and stability.`;
                } else if (lr <= 0.5) {
                    description = `Large steps (${stepSize.toFixed(2)}). Fast but might overshoot.`;
                } else {
                    description = `Very large steps (${stepSize.toFixed(2)}). Risk of divergence!`;
                }
                
                effectEl.textContent = description;
            }
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