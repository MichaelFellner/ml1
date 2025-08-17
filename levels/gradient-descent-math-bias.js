/**
 * Gradient Descent Math - With Bias
 * 
 * Explains the math of gradient descent for f(x) = wx + b
 */

window.createGradientDescentMathBias = function() {
    
    class GradientDescentMathBiasLevel extends window.BaseLevelTemplate {
        constructor() {
            super({
                id: 'gradient-descent-math-bias',
                name: 'Gradient Descent Math: Adding Bias',
                type: 'tutorial',
                description: 'Understanding parameter updates for f(x) = wx + b'
            });
            
            this.currentExample = 0;
            this.examples = [
                { x: 2, y_true: 15, w: 3, b: 5, lr: 0.1 },
                { x: 4, y_true: 20, w: 4, b: 2, lr: 0.05 },
                { x: 1, y_true: 8, w: 5, b: 3, lr: 0.2 }
            ];
        }
        
        async setup() {
            await super.setup();
            
            // Initialize navigation
            if (typeof initializeNavigation === 'function') {
                initializeNavigation('gradient-descent-math-bias', 'createGradientDescentMathBias');
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
                        <h2 style="color: #333; margin: 0;">📐 Gradient Descent Math: Adding Bias</h2>
                        <p style="color: #666; margin-top: 10px;">Now with two parameters: weight and bias!</p>
                    </div>
                    
                    <!-- Main Content Grid -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; flex: 1;">
                        <!-- Left Panel: Formula & Explanation -->
                        <div style="background: white; border-radius: 10px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                            <h3 style="color: #667eea; margin: 0 0 15px 0;">The Function with Bias</h3>
                            
                            <!-- Function Display -->
                            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                                <div style="font-family: 'Courier New', monospace; font-size: 1.2rem; color: #333; text-align: center;">
                                    f(x) = w × x + b
                                </div>
                                <div style="color: #666; font-size: 0.9rem; text-align: center; margin-top: 5px;">
                                    Linear function with bias term
                                </div>
                            </div>
                            
                            <!-- Update Rules -->
                            <div style="background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(118,75,162,0.1)); padding: 20px; border-radius: 8px; border: 2px solid #667eea;">
                                <h4 style="color: #667eea; margin: 0 0 10px 0;">✨ Update Rules for Both Parameters</h4>
                                <div style="font-family: 'Courier New', monospace; font-size: 0.95rem; line-height: 1.8;">
                                    <div style="color: #666;">error = prediction - target</div>
                                    <div style="margin-top: 10px; padding: 10px; background: white; border-radius: 5px;">
                                        <div style="color: #667eea; margin-bottom: 5px;">For weight w:</div>
                                        <div>gradient_w = 2 × error × x</div>
                                        <div><strong>w_new = w - α × gradient_w</strong></div>
                                    </div>
                                    <div style="margin-top: 10px; padding: 10px; background: white; border-radius: 5px;">
                                        <div style="color: #764ba2; margin-bottom: 5px;">For bias b:</div>
                                        <div>gradient_b = 2 × error × 1</div>
                                        <div><strong>b_new = b - α × gradient_b</strong></div>
                                    </div>
                                </div>
                                <div style="color: #666; font-size: 0.85rem; margin-top: 10px;">
                                    💡 Notice: bias gradient doesn't depend on x (multiply by 1)
                                </div>
                            </div>
                            
                            <!-- Visual Insight -->
                            <div style="background: #fff9e6; padding: 15px; border-radius: 8px; margin-top: 15px;">
                                <h4 style="color: #333; margin: 0 0 10px 0;">🎯 What Each Parameter Does</h4>
                                <div style="font-size: 0.9rem; line-height: 1.6;">
                                    <div style="margin-bottom: 8px;">
                                        <strong style="color: #667eea;">Weight (w):</strong> Controls the slope of the line
                                    </div>
                                    <div>
                                        <strong style="color: #764ba2;">Bias (b):</strong> Shifts the line up or down
                                    </div>
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
                                    <div>target = <span id="target-value" style="color: #667eea; font-weight: bold;">15</span></div>
                                    <div>w = <span id="w-value" style="color: #667eea; font-weight: bold;">3</span></div>
                                    <div>b = <span id="b-value" style="color: #764ba2; font-weight: bold;">5</span></div>
                                    <div style="grid-column: span 2; text-align: center;">α = <span id="lr-value" style="color: #e53e3e; font-weight: bold;">0.1</span></div>
                                </div>
                            </div>
                            
                            <!-- Step-by-step Calculation -->
                            <div style="background: #fff9e6; padding: 15px; border-radius: 8px; max-height: 250px; overflow-y: auto;">
                                <h4 style="color: #333; margin: 0 0 10px 0;">📝 Step-by-Step Calculation:</h4>
                                <div id="calculation-steps" style="font-family: 'Courier New', monospace; font-size: 0.85rem; line-height: 1.8;">
                                    <!-- Will be filled dynamically -->
                                </div>
                            </div>
                            
                            <!-- Results -->
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 15px;">
                                <div style="background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(102,126,234,0.2)); padding: 12px; border-radius: 8px; border: 2px solid #667eea;">
                                    <div style="text-align: center;">
                                        <div style="color: #666; font-size: 0.85rem;">New weight:</div>
                                        <div style="font-size: 1.2rem; color: #667eea; font-weight: bold; font-family: 'Courier New', monospace;">
                                            w = <span id="w-new-value">2.4</span>
                                        </div>
                                    </div>
                                </div>
                                <div style="background: linear-gradient(135deg, rgba(118,75,162,0.1), rgba(118,75,162,0.2)); padding: 12px; border-radius: 8px; border: 2px solid #764ba2;">
                                    <div style="text-align: center;">
                                        <div style="color: #666; font-size: 0.85rem;">New bias:</div>
                                        <div style="font-size: 1.2rem; color: #764ba2; font-weight: bold; font-family: 'Courier New', monospace;">
                                            b = <span id="b-new-value">4.6</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Simultaneous Update Note -->
                            <div style="margin-top: 15px; padding: 15px; background: linear-gradient(135deg, rgba(45,213,115,0.1), rgba(45,213,115,0.2)); border-radius: 8px; border: 1px solid #2dd573;">
                                <div style="text-align: center; color: #333;">
                                    <strong>🔄 Important:</strong> Both parameters update simultaneously!
                                    <div style="font-size: 0.85rem; color: #666; margin-top: 5px;">
                                        We calculate both gradients using the same error, then update both w and b together.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Comparison Section -->
                    <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <h3 style="color: #333; margin: 0 0 15px 0;">📊 Comparing Gradient Behaviors</h3>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div style="padding: 15px; background: #f0f7ff; border-radius: 8px;">
                                <h4 style="color: #667eea; margin: 0 0 10px 0;">Weight Gradient (×x)</h4>
                                <ul style="margin: 0; padding-left: 20px; color: #666;">
                                    <li>Scales with input value x</li>
                                    <li>Larger x → larger updates</li>
                                    <li>Zero when x = 0</li>
                                </ul>
                            </div>
                            <div style="padding: 15px; background: #f9f0ff; border-radius: 8px;">
                                <h4 style="color: #764ba2; margin: 0 0 10px 0;">Bias Gradient (×1)</h4>
                                <ul style="margin: 0; padding-left: 20px; color: #666;">
                                    <li>Always same magnitude</li>
                                    <li>Independent of input x</li>
                                    <li>Never zero (unless error = 0)</li>
                                </ul>
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
        }
        
        _updateExample() {
            const example = this.examples[this.currentExample];
            
            // Update displayed values
            document.getElementById('x-value').textContent = example.x;
            document.getElementById('target-value').textContent = example.y_true;
            document.getElementById('w-value').textContent = example.w;
            document.getElementById('b-value').textContent = example.b;
            document.getElementById('lr-value').textContent = example.lr;
            document.getElementById('example-num').textContent = this.currentExample + 1;
            
            this._calculateUpdate(example.x, example.y_true, example.w, example.b, example.lr);
        }
        
        _calculateUpdate(x, y_true, w, b, lr) {
            // Calculate step by step
            const prediction = w * x + b;
            const error = prediction - y_true;
            const gradient_w = 2 * error * x;
            const gradient_b = 2 * error * 1;
            const w_new = w - lr * gradient_w;
            const b_new = b - lr * gradient_b;
            
            // Display calculation steps
            const stepsEl = document.getElementById('calculation-steps');
            if (stepsEl) {
                stepsEl.innerHTML = `
                    <div style="color: #666;">1. Calculate prediction:</div>
                    <div style="margin-left: 20px; color: #333;">f(${x}) = ${w} × ${x} + ${b} = ${w * x} + ${b} = <strong>${prediction}</strong></div>
                    
                    <div style="color: #666; margin-top: 10px;">2. Calculate error:</div>
                    <div style="margin-left: 20px; color: #333;">${prediction} - ${y_true} = <strong>${error.toFixed(2)}</strong></div>
                    
                    <div style="color: #667eea; margin-top: 10px;">3. Weight gradient:</div>
                    <div style="margin-left: 20px; color: #333;">2 × ${error.toFixed(2)} × ${x} = <strong>${gradient_w.toFixed(2)}</strong></div>
                    
                    <div style="color: #764ba2; margin-top: 10px;">4. Bias gradient:</div>
                    <div style="margin-left: 20px; color: #333;">2 × ${error.toFixed(2)} × 1 = <strong>${gradient_b.toFixed(2)}</strong></div>
                    
                    <div style="color: #667eea; margin-top: 10px;">5. Update weight:</div>
                    <div style="margin-left: 20px; color: #333;">${w} - ${lr} × ${gradient_w.toFixed(2)} = <strong>${w_new.toFixed(3)}</strong></div>
                    
                    <div style="color: #764ba2; margin-top: 10px;">6. Update bias:</div>
                    <div style="margin-left: 20px; color: #333;">${b} - ${lr} × ${gradient_b.toFixed(2)} = <strong>${b_new.toFixed(3)}</strong></div>
                `;
            }
            
            // Update results
            document.getElementById('w-new-value').textContent = w_new.toFixed(3);
            document.getElementById('b-new-value').textContent = b_new.toFixed(3);
        }
    }
    
    const level = new GradientDescentMathBiasLevel();
    level.create().catch(error => {
        console.error('Failed to create Gradient Descent Math Bias:', error);
    });
    
    return level;
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.createGradientDescentMathBias;
}