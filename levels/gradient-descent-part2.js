/**
 * Core Concept 2: Gradient Descent (Part 2)
 * 
 * A tutorial level that explains how gradient descent knows how to change w and b values
 */

window.createGradientDescentPart2 = function() {
    
    class GradientDescentPart2Level extends window.InteractiveLevelTemplate {
        constructor() {
            super({
                id: 'gradient-descent-part2',
                name: 'Core Concept 2: Gradient Descent (Part 2)',
                type: 'tutorial',
                description: '', // No instructions needed
                targetFunction: { w: 5 }, // Example target
                controls: [],
                validation: {
                    tolerance: 0
                },
                showFormula: false,
                showResult: false,
                debug: false
            });
            
            // State for animations and explanations
            this.currentStep = 0;
            this.animationInProgress = false;
        }
        
        /**
         * Custom setup for this level
         */
        async setup() {
            await super.setup();
            
            // Initialize navigation if available
            if (typeof initializeNavigation === 'function') {
                initializeNavigation('gradient-descent-part2', 'createGradientDescentPart2');
            }
            
            // Add event listener for the continue button
            const continueBtn = document.getElementById('continue-btn');
            if (continueBtn) {
                this.addEventListenerWithCleanup(continueBtn, 'click', () => {
                    this.nextStep();
                });
            }
            
            // Add CSS animations
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fadeIn {
                    from { 
                        opacity: 0; 
                        transform: translateY(10px); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0); 
                    }
                }
                
                @keyframes pulseGlow {
                    0% { box-shadow: 0 0 5px rgba(102, 126, 234, 0.5); }
                    50% { box-shadow: 0 0 20px rgba(102, 126, 234, 0.8); }
                    100% { box-shadow: 0 0 5px rgba(102, 126, 234, 0.5); }
                }
                
                .hidden-content {
                    display: none;
                }
                
                .visible-content {
                    display: block;
                    animation: fadeIn 0.6s forwards;
                }
                
                .highlight-box {
                    animation: pulseGlow 2s infinite;
                }
                
                .concept-card {
                    background: white;
                    border-radius: 12px;
                    padding: 25px;
                    margin: 20px 0;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }
                
                .formula-display {
                    font-family: 'Courier New', monospace;
                    background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(118,75,162,0.1));
                    padding: 15px 20px;
                    border-radius: 8px;
                    color: #667eea;
                    font-weight: bold;
                    font-size: 1.1rem;
                    display: inline-block;
                    margin: 10px 0;
                }
                
                .key-point {
                    background: linear-gradient(135deg, #f093fb, #f5576c);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    font-weight: bold;
                    font-size: 1.1rem;
                }
            `;
            document.head.appendChild(style);
            
            this.updateDisplay();
        }
        
        /**
         * Progress to the next step
         */
        nextStep() {
            if (this.animationInProgress) return;
            
            this.currentStep++;
            this.updateDisplay();
            
            if (this.currentStep >= 4) {
                this.completeLevel({ score: 100 });
            }
        }
        
        /**
         * Update the display based on current step
         */
        updateDisplay() {
            const content = document.getElementById('tutorial-content');
            if (!content) return;
            
            const steps = [
                this.getStep1Content(),
                this.getStep2Content(),
                this.getStep3Content(),
                this.getStep4Content(),
                this.getCompletionContent()
            ];
            
            if (this.currentStep < steps.length) {
                content.innerHTML = steps[this.currentStep];
            }
            
            // Update button text
            const continueBtn = document.getElementById('continue-btn');
            if (continueBtn) {
                if (this.currentStep === 3) {
                    continueBtn.textContent = 'Complete Lesson';
                } else if (this.currentStep >= 4) {
                    continueBtn.style.display = 'none';
                } else {
                    continueBtn.textContent = 'Continue →';
                }
            }
        }
        
        getStep1Content() {
            return `
                <div class="concept-card">
                    <h2 style="color: #667eea; margin-bottom: 20px;">How Does Gradient Descent Know?</h2>
                    <p style="font-size: 1.1rem; line-height: 1.8; color: #333;">
                        We've now seen that gradient descent seemingly <span class="key-point">magically</span> changes the 
                        <span class="formula-display">w</span> and <span class="formula-display">b</span> values in a function.
                        Now we'll learn <strong>*how*</strong> it knows how to change these values.
                    </p>
                
                </div>
            `;
        }
        
        getStep2Content() {
            return `
                <div class="concept-card">
                    <h2 style="color: #667eea; margin-bottom: 20px;">The Secret: The Slope</h2>
                    <p style="font-size: 1.1rem; line-height: 1.8; color: #333;">
                        The key insight is that gradient descent uses the <span class="key-point">slope</span> (or gradient) 
                        of the loss function to determine:
                    </p>
                    <ul style="margin: 20px 0; font-size: 1.1rem; line-height: 2;">
                        <li>🎯 <strong>Which direction</strong> to move (increase or decrease w and b)</li>
                        <li>📏 <strong>How much</strong> to change them</li>
                    </ul>
                    <div class="formula-display" style="display: block; text-align: center; margin: 25px auto;">
                        slope = derivative of loss with respect to parameter
                    </div>
                    <p style="font-size: 1rem; color: #666; margin-top: 20px;">
                        Think of it like rolling a ball down a hill - it naturally follows the steepest path downward!
                    </p>
                </div>
            `;
        }
        
        getStep3Content() {
            return `
                <div class="concept-card">
                    <h2 style="color: #667eea; margin-bottom: 20px;">The Process in Action</h2>
                    <div style="display: grid; gap: 20px;">
                        <div style="padding: 20px; background: rgba(102,126,234,0.05); border-radius: 10px;">
                            <h3 style="color: #764ba2; margin-bottom: 10px;">Step 1: Calculate the Gradient</h3>
                            <p>For each parameter (w, b), we calculate how much the loss changes when we make a tiny change to that parameter.</p>
                            <div class="formula-display" style="margin-top: 10px;">∂Loss/∂w and ∂Loss/∂b</div>
                        </div>
                        
                        <div style="padding: 20px; background: rgba(118,75,162,0.05); border-radius: 10px;">
                            <h3 style="color: #764ba2; margin-bottom: 10px;">Step 2: Update Parameters</h3>
                            <p>We adjust each parameter in the opposite direction of its gradient:</p>
                            <div class="formula-display" style="margin-top: 10px;">
                                w_new = w_old - learning_rate × gradient_w
                            </div>
                            <div class="formula-display" style="margin-top: 5px;">
                                b_new = b_old - learning_rate × gradient_b
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        
        getStep4Content() {
            return `
                <div class="concept-card">
                    <h2 style="color: #667eea; margin-bottom: 20px;">Why This Works</h2>
                    <div style="display: grid; gap: 15px;">
                        <div style="padding: 15px; background: linear-gradient(135deg, rgba(240,147,251,0.1), rgba(245,87,108,0.1)); border-radius: 10px;">
                            <p style="font-size: 1.1rem;">
                                <strong>Positive gradient</strong> → Loss increases when parameter increases → 
                                <span style="color: #f5576c;">Decrease the parameter</span>
                            </p>
                        </div>
                        
                        <div style="padding: 15px; background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(118,75,162,0.1)); border-radius: 10px;">
                            <p style="font-size: 1.1rem;">
                                <strong>Negative gradient</strong> → Loss decreases when parameter increases → 
                                <span style="color: #667eea;">Increase the parameter</span>
                            </p>
                        </div>
                        
                        <div style="padding: 15px; background: linear-gradient(135deg, rgba(45,213,115,0.1), rgba(102,126,234,0.1)); border-radius: 10px;">
                            <p style="font-size: 1.1rem;">
                                <strong>Zero gradient</strong> → We're at a minimum (or maximum) → 
                                <span style="color: #2dd573;">Stop adjusting</span>
                            </p>
                        </div>
                    </div>
                    
                    <div style="margin-top: 30px; padding: 20px; background: rgba(102,126,234,0.05); border-radius: 10px; text-align: center;">
                        <p style="font-size: 1.2rem; color: #667eea; font-weight: bold;">
                            🎯 The gradient tells us EXACTLY how to adjust our parameters to reduce the loss!
                        </p>
                    </div>
                </div>
            `;
        }
        
        getCompletionContent() {
            return `
                <div class="concept-card" style="text-align: center;">
                    <h2 style="color: #2dd573; margin-bottom: 20px;">✨ Concept Mastered!</h2>
                    <p style="font-size: 1.2rem; line-height: 1.8; color: #333;">
                        You now understand the core mechanism of gradient descent!
                    </p>
                    <div style="margin: 30px auto; padding: 25px; background: linear-gradient(135deg, rgba(45,213,115,0.1), rgba(102,126,234,0.1)); border-radius: 15px; max-width: 600px;">
                        <h3 style="color: #667eea; margin-bottom: 15px;">Key Takeaway:</h3>
                        <p style="font-size: 1.1rem; font-weight: bold; color: #333;">
                            Gradient descent isn't magic - it's math! It uses calculus (derivatives) to find the 
                            direction and magnitude of change needed to minimize loss.
                        </p>
                    </div>
                    <p style="font-size: 1rem; color: #666; margin-top: 20px;">
                        Ready to see this in action? Let's continue to the next level!
                    </p>
                </div>
            `;
        }
        
        /**
         * Override main content generation for custom layout
         */
        _generateMainContent() {
            return `
                <div id="tutorial-content" style="max-width: 800px; margin: 0 auto; padding: 20px;">
                    <!-- Content will be dynamically inserted here -->
                </div>
                

                
                <!-- Standard Navigation -->
                ${typeof createStandardNavigation === 'function' ? createStandardNavigation() : this._generateFallbackNavigation()}
            `;
        }

                //         <div style="text-align: center; margin-top: 30px;">
                //     <button id="continue-btn" style="
                //         padding: 12px 30px;
                //         background: linear-gradient(135deg, #667eea, #764ba2);
                //         color: white;
                //         border: none;
                //         border-radius: 8px;
                //         font-size: 1.1rem;
                //         font-weight: bold;
                //         cursor: pointer;
                //         transition: all 0.3s;
                //         box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
                //     " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                //         Continue →
                //     </button>
                // </div>
        
        /**
         * Generate fallback navigation if standard navigation not available
         */
        _generateFallbackNavigation() {
            return `
                <div class="level-navigation" style="margin-top: 30px; text-align: center;">
                    <button onclick="history.back()" style="padding: 10px 20px; margin: 5px; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer;">
                        ← Back
                    </button>
                </div>
            `;
        }
        
        /**
         * Override to remove unwanted sections
         */
        _generateVisualizationSection() {
            return '';
        }
        
        _generateControlsSection() {
            return '';
        }
    }
    
    // Create and return the level instance
    const level = new GradientDescentPart2Level();
    level.create().catch(error => {
        console.error('Failed to create gradient descent part 2 level:', error);
    });
    
    return level;
};

// Export for module systems if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.createGradientDescentPart2;
}