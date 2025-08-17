/**
 * Gradient Descent Math - Multiple Parameters
 * 
 * Explains the math of gradient descent for f(x) = w1x1 + w2x2 + w3x3 + b
 */

window.createGradientDescentMathMultiple = function() {
    
    class GradientDescentMathMultipleLevel extends window.BaseLevelTemplate {
        constructor() {
            super({
                id: 'gradient-descent-math-multiple',
                name: 'Gradient Descent Math: Multiple Parameters',
                type: 'tutorial',
                description: 'Understanding updates for f(x) = w1x1 + w2x2 + w3x3 + b'
            });
            
            this.currentExample = 0;
            this.examples = [
                { 
                    x: [2, 3, 1], 
                    y_true: 25, 
                    w: [3, 2, 4], 
                    b: 5, 
                    lr: 0.05,
                    description: "Simple case"
                },
                { 
                    x: [1, 2, 3], 
                    y_true: 30, 
                    w: [5, 3, 2], 
                    b: 8, 
                    lr: 0.02,
                    description: "Smaller learning rate"
                },
                { 
                    x: [4, 1, 2], 
                    y_true: 18, 
                    w: [2, 3, 1], 
                    b: 3, 
                    lr: 0.1,
                    description: "Larger learning rate"
                }
            ];
        }
        
        async setup() {
            await super.setup();
            
            // Initialize navigation
            if (typeof initializeNavigation === 'function') {
                initializeNavigation('gradient-descent-math-multiple', 'createGradientDescentMathMultiple');
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
                        <h2 style="color: #333; margin: 0;">📐 Gradient Descent: Multiple Parameters</h2>
                        <p style="color: #666; margin-top: 10px;">Scaling up to many inputs and weights!</p>
                    </div>
                    
                    <!-- Main Content Grid -->
                    <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 20px; flex: 1;">
                        <!-- Left Panel: Interactive Example -->
                        <div style="background: white; border-radius: 10px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                            <h3 style="color: #667eea; margin: 0 0 15px 0;">Interactive Example</h3>
                            
                            <!-- Example Controls -->
                            <div style="margin-bottom: 15px;">
                                <div style="display: flex; gap: 10px; justify-content: center; align-items: center;">
                                    <button id="prev-example" style="padding: 8px 15px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">← Previous</button>
                                    <span style="padding: 8px 15px; background: #f8f9fa; border-radius: 5px;">
                                        Example <span id="example-num">1</span>: <span id="example-desc">Simple case</span>
                                    </span>
                                    <button id="next-example" style="padding: 8px 15px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">Next →</button>
                                </div>
                            </div>
                            
                            <!-- Function Display -->
                            <div style="background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(118,75,162,0.1)); padding: 15px; border-radius: 8px; margin-bottom: 15px; border: 2px solid #667eea;">
                                <div style="font-family: 'Courier New', monospace; font-size: 1.1rem; color: #333; text-align: center;">
                                    f(x) = w1×x1 + w2×x2 + w3×x3 + b
                                </div>
                                <div style="color: #666; font-size: 0.85rem; text-align: center; margin-top: 5px;">
                                    Three inputs, three weights, one bias
                                </div>
                            </div>
                            
                            <!-- Given Values -->
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                <!-- Inputs & Weights -->
                                <div style="background: #f0f7ff; padding: 15px; border-radius: 8px;">
                                    <h4 style="color: #667eea; margin: 0 0 10px 0;">Inputs & Weights:</h4>
                                    <div style="font-family: 'Courier New', monospace; font-size: 0.9rem; line-height: 1.8;">
                                        <div>x1 = <span id="x1-value" style="color: #667eea; font-weight: bold;">2</span>, w1 = <span id="w1-value" style="color: #667eea; font-weight: bold;">3</span></div>
                                        <div>x2 = <span id="x2-value" style="color: #667eea; font-weight: bold;">3</span>, w2 = <span id="w2-value" style="color: #667eea; font-weight: bold;">2</span></div>
                                        <div>x3 = <span id="x3-value" style="color: #667eea; font-weight: bold;">1</span>, w3 = <span id="w3-value" style="color: #667eea; font-weight: bold;">4</span></div>
                                        <div style="margin-top: 5px;">bias = <span id="b-value" style="color: #764ba2; font-weight: bold;">5</span></div>
                                    </div>
                                </div>
                                
                                <!-- Target & Learning Rate -->
                                <div style="background: #fff5f5; padding: 15px; border-radius: 8px;">
                                    <h4 style="color: #e53e3e; margin: 0 0 10px 0;">Target & Learning:</h4>
                                    <div style="font-family: 'Courier New', monospace; font-size: 0.9rem; line-height: 1.8;">
                                        <div>target = <span id="target-value" style="color: #e53e3e; font-weight: bold;">25</span></div>
                                        <div>α = <span id="lr-value" style="color: #e53e3e; font-weight: bold;">0.05</span></div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Calculation Steps -->
                            <div style="background: #fff9e6; padding: 15px; border-radius: 8px; margin-top: 15px; max-height: 200px; overflow-y: auto;">
                                <h4 style="color: #333; margin: 0 0 10px 0;">📝 Calculation Steps:</h4>
                                <div id="calculation-steps" style="font-family: 'Courier New', monospace; font-size: 0.8rem; line-height: 1.6;">
                                    <!-- Will be filled dynamically -->
                                </div>
                            </div>
                            
                            <!-- Updated Parameters -->
                            <div style="background: linear-gradient(135deg, rgba(45,213,115,0.1), rgba(45,213,115,0.2)); padding: 15px; border-radius: 8px; margin-top: 15px; border: 2px solid #2dd573;">
                                <h4 style="color: #2dd573; margin: 0 0 10px 0;">✅ Updated Parameters:</h4>
                                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; font-family: 'Courier New', monospace; font-size: 0.9rem;">
                                    <div>w1_new = <span id="w1-new" style="color: #2dd573; font-weight: bold;">2.8</span></div>
                                    <div>w2_new = <span id="w2-new" style="color: #2dd573; font-weight: bold;">1.7</span></div>
                                    <div>w3_new = <span id="w3-new" style="color: #2dd573; font-weight: bold;">3.9</span></div>
                                    <div>b_new = <span id="b-new" style="color: #2dd573; font-weight: bold;">4.9</span></div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Right Panel: Key Concepts -->
                        <div style="background: white; border-radius: 10px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                            <h3 style="color: #764ba2; margin: 0 0 15px 0;">Key Concepts</h3>
                            
                            <!-- Update Rule Pattern -->
                            <div style="background: #f9f0ff; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                                <h4 style="color: #764ba2; margin: 0 0 10px 0;">🔄 The Pattern</h4>
                                <div style="font-family: 'Courier New', monospace; font-size: 0.85rem; line-height: 1.8;">
                                    <div style="color: #666;">For each weight wi:</div>
                                    <div style="margin-left: 10px;">gradient_wi = 2 × error × xi</div>
                                    <div style="margin-left: 10px;">wi_new = wi - α × gradient_wi</div>
                                    <div style="margin-top: 10px; color: #666;">For bias:</div>
                                    <div style="margin-left: 10px;">gradient_b = 2 × error × 1</div>
                                    <div style="margin-left: 10px;">b_new = b - α × gradient_b</div>
                                </div>
                            </div>
                            
                            <!-- Important Notes -->
                            <div style="background: #fff5f5; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                                <h4 style="color: #e53e3e; margin: 0 0 10px 0;">⚠️ Important Points</h4>
                                <ul style="margin: 0; padding-left: 20px; font-size: 0.9rem; line-height: 1.6; color: #666;">
                                    <li>All parameters use the <strong>same error</strong></li>
                                    <li>Each gradient uses its <strong>own input</strong> (xi)</li>
                                    <li>Updates happen <strong>simultaneously</strong></li>
                                    <li>Same learning rate for all parameters</li>
                                </ul>
                            </div>
                            
                            <!-- Gradient Magnitudes -->
                            <div style="background: #f0fff4; padding: 15px; border-radius: 8px;">
                                <h4 style="color: #2dd573; margin: 0 0 10px 0;">📊 Gradient Sizes</h4>
                                <div id="gradient-bars" style="font-family: 'Courier New', monospace; font-size: 0.85rem;">
                                    <!-- Will be filled with gradient magnitude bars -->
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Bottom Section: Scaling Insight -->
                    <div style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 20px; border-radius: 10px;">
                        <h3 style="margin: 0 0 15px 0;">🚀 Scaling to Many Parameters</h3>
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
                            <div>
                                <strong>10 parameters?</strong><br>
                                Same process! Calculate 10 gradients, update 10 weights.
                            </div>
                            <div>
                                <strong>1000 parameters?</strong><br>
                                Still works! This is how neural networks train.
                            </div>
                            <div>
                                <strong>The Pattern Holds:</strong><br>
                                gradient = error × input<br>
                                new = old - α × gradient
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
            document.getElementById('x1-value').textContent = example.x[0];
            document.getElementById('x2-value').textContent = example.x[1];
            document.getElementById('x3-value').textContent = example.x[2];
            document.getElementById('w1-value').textContent = example.w[0];
            document.getElementById('w2-value').textContent = example.w[1];
            document.getElementById('w3-value').textContent = example.w[2];
            document.getElementById('b-value').textContent = example.b;
            document.getElementById('target-value').textContent = example.y_true;
            document.getElementById('lr-value').textContent = example.lr;
            document.getElementById('example-num').textContent = this.currentExample + 1;
            document.getElementById('example-desc').textContent = example.description;
            
            this._calculateUpdate(example);
        }
        
        _calculateUpdate(example) {
            const { x, y_true, w, b, lr } = example;
            
            // Calculate prediction
            let prediction = b;
            for (let i = 0; i < 3; i++) {
                prediction += w[i] * x[i];
            }
            
            // Calculate error
            const error = prediction - y_true;
            
            // Calculate gradients and new values
            const gradients = [];
            const new_w = [];
            for (let i = 0; i < 3; i++) {
                gradients[i] = 2 * error * x[i];
                new_w[i] = w[i] - lr * gradients[i];
            }
            const gradient_b = 2 * error * 1;
            const new_b = b - lr * gradient_b;
            
            // Display calculation steps
            const stepsEl = document.getElementById('calculation-steps');
            if (stepsEl) {
                let predictionStr = `${w[0]}×${x[0]} + ${w[1]}×${x[1]} + ${w[2]}×${x[2]} + ${b}`;
                let predictionCalc = `${w[0]*x[0]} + ${w[1]*x[1]} + ${w[2]*x[2]} + ${b}`;
                
                stepsEl.innerHTML = `
                    <div style="color: #666;">1. Calculate prediction:</div>
                    <div style="margin-left: 15px;">${predictionStr}</div>
                    <div style="margin-left: 15px;">= ${predictionCalc} = <strong>${prediction.toFixed(2)}</strong></div>
                    
                    <div style="color: #666; margin-top: 8px;">2. Calculate error:</div>
                    <div style="margin-left: 15px;">${prediction.toFixed(2)} - ${y_true} = <strong>${error.toFixed(2)}</strong></div>
                    
                    <div style="color: #666; margin-top: 8px;">3. Calculate gradients:</div>
                    <div style="margin-left: 15px;">∇w1 = 2×${error.toFixed(2)}×${x[0]} = <strong>${gradients[0].toFixed(2)}</strong></div>
                    <div style="margin-left: 15px;">∇w2 = 2×${error.toFixed(2)}×${x[1]} = <strong>${gradients[1].toFixed(2)}</strong></div>
                    <div style="margin-left: 15px;">∇w3 = 2×${error.toFixed(2)}×${x[2]} = <strong>${gradients[2].toFixed(2)}</strong></div>
                    <div style="margin-left: 15px;">∇b = 2×${error.toFixed(2)}×1 = <strong>${gradient_b.toFixed(2)}</strong></div>
                    
                    <div style="color: #666; margin-top: 8px;">4. Update all parameters:</div>
                    <div style="margin-left: 15px;">w1: ${w[0]} - ${lr}×${gradients[0].toFixed(2)} = <strong>${new_w[0].toFixed(3)}</strong></div>
                    <div style="margin-left: 15px;">w2: ${w[1]} - ${lr}×${gradients[1].toFixed(2)} = <strong>${new_w[1].toFixed(3)}</strong></div>
                    <div style="margin-left: 15px;">w3: ${w[2]} - ${lr}×${gradients[2].toFixed(2)} = <strong>${new_w[2].toFixed(3)}</strong></div>
                    <div style="margin-left: 15px;">b: ${b} - ${lr}×${gradient_b.toFixed(2)} = <strong>${new_b.toFixed(3)}</strong></div>
                `;
            }
            
            // Update result displays
            document.getElementById('w1-new').textContent = new_w[0].toFixed(3);
            document.getElementById('w2-new').textContent = new_w[1].toFixed(3);
            document.getElementById('w3-new').textContent = new_w[2].toFixed(3);
            document.getElementById('b-new').textContent = new_b.toFixed(3);
            
            // Update gradient magnitude bars
            const barsEl = document.getElementById('gradient-bars');
            if (barsEl) {
                const maxGrad = Math.max(...gradients.map(Math.abs), Math.abs(gradient_b));
                barsEl.innerHTML = `
                    ${gradients.map((g, i) => {
                        const width = Math.abs(g) / maxGrad * 100;
                        return `
                            <div style="margin-bottom: 8px;">
                                <div style="display: flex; align-items: center;">
                                    <span style="width: 50px;">∇w${i+1}:</span>
                                    <div style="flex: 1; background: #f0f0f0; height: 20px; border-radius: 3px; margin: 0 10px;">
                                        <div style="width: ${width}%; background: #667eea; height: 100%; border-radius: 3px;"></div>
                                    </div>
                                    <span style="width: 60px; text-align: right;">${g.toFixed(2)}</span>
                                </div>
                            </div>
                        `;
                    }).join('')}
                    <div style="margin-bottom: 8px;">
                        <div style="display: flex; align-items: center;">
                            <span style="width: 50px;">∇b:</span>
                            <div style="flex: 1; background: #f0f0f0; height: 20px; border-radius: 3px; margin: 0 10px;">
                                <div style="width: ${Math.abs(gradient_b) / maxGrad * 100}%; background: #764ba2; height: 100%; border-radius: 3px;"></div>
                            </div>
                            <span style="width: 60px; text-align: right;">${gradient_b.toFixed(2)}</span>
                        </div>
                    </div>
                `;
            }
        }
    }
    
    const level = new GradientDescentMathMultipleLevel();
    level.create().catch(error => {
        console.error('Failed to create Gradient Descent Math Multiple:', error);
    });
    
    return level;
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.createGradientDescentMathMultiple;
}