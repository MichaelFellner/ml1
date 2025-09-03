/**
 * Gradient Descent Overview Level
 * 
 * A tutorial level that teaches the basic concept of gradient descent
 * through a simple interactive example.
 */

window.createGradientDescentOverview = function() {
    
    class GradientDescentOverviewLevel extends window.InteractiveLevelTemplate {
        constructor() {
            super({
                id: 'gradient-descent-overview',
                name: 'How Gradient Descent Works: Quick Reference',
                type: 'tutorial',
                description: '', // No instructions needed
                targetFunction: { w: 8 }, // Target: f(x) = 8x
                controls: [
                    {
                        id: 'w',
                        label: 'Weight (w)',
                        min: 0,
                        max: 15,
                        step: 1,
                        default: 3
                    }
                ],
                validation: {
                    tolerance: 0
                },
                showFormula: false,
                showResult: false,
                debug: false
            });
            
            // State for the interactive demo
            this.currentW = 3;
            this.targetW = 8;
            this.inputX = 4;
            this.iterations = 0;
        }
        
        /**
         * Custom setup for this level
         */
        async setup() {
            await super.setup();
            
            // Initialize navigation if available
            if (typeof initializeNavigation === 'function') {
                initializeNavigation('gradient-descent-overview', 'createGradientDescentOverview');
            }
            
            // Add event listener for the repeat button
            const repeatBtn = document.getElementById('repeat-btn');
            if (repeatBtn) {
                this.addEventListenerWithCleanup(repeatBtn, 'click', () => {
                    this.performIteration();
                });
            }
            
            // Add event listener for the reset button
            const resetBtn = document.getElementById('reset-level-btn');
            if (resetBtn) {
                this.addEventListenerWithCleanup(resetBtn, 'click', () => {
                    this.resetLevel();
                });
            }
            
            // Add CSS animation for fadeIn and button hover states
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fadeIn {
                    from { 
                        opacity: 0; 
                        transform: translateX(-10px); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateX(0); 
                    }
                }
                #reset-level-btn:hover {
                    background: #5a6268 !important;
                    transform: translateY(-1px);
                }
                #repeat-btn:hover:not(:disabled) {
                    background: linear-gradient(180deg, #ff9500 0%, #ff7300 100%) !important;
                    transform: translateY(-1px);
                    box-shadow: 
                        0 6px 0 #cc5500,
                        0 8px 10px rgba(0,0,0,0.3) !important;
                }
                #repeat-btn:active:not(:disabled) {
                    transform: translateY(3px);
                    box-shadow: 
                        0 2px 0 #cc5500,
                        0 3px 6px rgba(0,0,0,0.2) !important;
                }
                #repeat-btn:disabled {
                    cursor: not-allowed;
                    opacity: 0.8;
                }
            `;
            document.head.appendChild(style);
            
            this.updateDisplay();
        }
        
        /**
         * Perform one iteration of gradient descent
         */
        performIteration() {
            if (this.currentW >= this.targetW) {
                this.showSuccess('Perfect! The error is now 0. You\'ve found the correct weight!', 5000);
                this.completeLevel({ score: 100 });
                // Show reset button immediately
                setTimeout(() => {
                    this.showResetButton();
                }, 100);
                return;
            }
            
            // Simple increment by 1 for this demo
            this.currentW += 1;
            this.iterations++;
            
            this.updateDisplay();
            this.trackAction('iteration', { w: this.currentW, iteration: this.iterations });
        }
        
        /**
         * Show the reset button after completion
         */
        showResetButton() {
            const resetBtn = document.getElementById('reset-level-btn');
            if (resetBtn) {
                resetBtn.style.display = 'inline-block';
                resetBtn.style.opacity = '0';
                resetBtn.style.animation = 'fadeIn 0.5s forwards';
                console.log('Reset button shown');
            } else {
                console.log('Reset button not found!');
            }
        }
        
        /**
         * Reset the level to initial state
         */
        resetLevel() {
            this.currentW = 3;
            this.iterations = 0;
            this.updateDisplay();
            
            // Hide reset button
            const resetBtn = document.getElementById('reset-level-btn');
            if (resetBtn) {
                resetBtn.style.display = 'none';
            }
            
            // Re-enable repeat button
            const repeatBtn = document.getElementById('repeat-btn');
            if (repeatBtn) {
                repeatBtn.textContent = 'REPEAT';
                repeatBtn.style.background = 'linear-gradient(180deg, #ff8c00 0%, #ff6a00 100%)';
                repeatBtn.style.color = 'white';
                repeatBtn.style.border = 'none';
                repeatBtn.style.boxShadow = '0 5px 0 #cc5500, 0 6px 8px rgba(0,0,0,0.2)';
                repeatBtn.disabled = false;
            }
            
            // Clear success message
            const resultSection = document.getElementById(`${this.config.id}-result`);
            if (resultSection) {
                resultSection.style.display = 'none';
            }
        }
        
        /**
         * Update all the display values
         */
        updateDisplay() {
            const output = this.currentW * this.inputX;
            const target = this.targetW * this.inputX;
            const error = output - target;
            
            // Update text area 1
            const formula1 = document.getElementById('formula-1');
            if (formula1) {
                formula1.innerHTML = `f(x) = wx, w = ${this.currentW} ${this.currentW === 3 ? '(random)' : ''}`;
            }
            
            // Update text area 2
            const formula2 = document.getElementById('formula-2');
            if (formula2) {
                formula2.innerHTML = `f(4) = ${this.currentW} × 4 = ${output}<br>Error = ${output} - 32 = ${error}`;
            }
            
            // Update the output value in text area 2
            const outputValueSpan = document.getElementById('output-value');
            if (outputValueSpan) {
                outputValueSpan.textContent = output;
            }
            
            // Update text area 3 error description
            const errorText = document.getElementById('error-text');
            if (errorText) {
                if (error < 0) {
                    errorText.innerHTML = `We see that the error is ${error}, meaning that the w value of ${this.currentW} wasn't high enough. So we need to increase w.`;
                } else if (error === 0) {
                    errorText.innerHTML = `Perfect! The error is 0, meaning that the w value of ${this.currentW} is exactly right!`;
                } else {
                    errorText.innerHTML = `We see that the error is ${error}, meaning that the w value of ${this.currentW} was too high. So we need to decrease w.`;
                }
            }
            
            // Update text area 3 formula
            const formula3 = document.getElementById('formula-3');
            if (formula3) {
                if (error < 0) {
                    formula3.innerHTML = `w = ${this.currentW + 1}`;
                } else if (error === 0) {
                    formula3.innerHTML = `w = ${this.currentW} (perfect!)`;
                } else {
                    formula3.innerHTML = `w = ${this.currentW - 1}`;
                }
            }
            
            // Update repeat button state
            const repeatBtn = document.getElementById('repeat-btn');
            if (repeatBtn) {
                if (error === 0) {
                    repeatBtn.textContent = '✓ Complete';
                    repeatBtn.style.background = 'linear-gradient(180deg, #3ee87f 0%, #2dd573 100%)';
                    repeatBtn.style.boxShadow = '0 5px 0 #22a857, 0 6px 8px rgba(0,0,0,0.2)';
                    repeatBtn.disabled = true;
                    // Also trigger reset button visibility here as backup
                    setTimeout(() => {
                        const resetBtn = document.getElementById('reset-level-btn');
                        if (resetBtn && resetBtn.style.display === 'none') {
                            this.showResetButton();
                        }
                    }, 200);
                }
            }
        }
        
        /**
         * Override main content generation for custom layout
         */
        _generateMainContent() {
            return `
                <div class="overview-content" style="max-height: 80vh; display: flex; flex-direction: column; gap: 15px; max-width: 900px; margin: 0 auto;">
                    ${this._generateTextArea(1)}
                    ${this._generateTextArea(2)}
                    ${this._generateTextArea(3)}
                </div>
                
                <!-- Standard Navigation -->
                ${typeof createStandardNavigation === 'function' ? createStandardNavigation() : this._generateFallbackNavigation()}
            `;
        }
        
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
         * Generate a single text area
         */
        _generateTextArea(number) {
            const styles = {
                container: `
                    background: white;
                    border-radius: 10px;
                    padding: 20px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    display: grid;
                    grid-template-columns: auto 1fr auto;
                    align-items: center;
                    gap: 20px;
                    min-height: 80px;
                `,
                number: `
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    font-size: 1.2rem;
                `,
                text: `
                    flex: 1;
                    color: #333;
                    font-size: 1rem;
                    line-height: 1.5;
                `,
                formula: `
                    font-family: 'Courier New', monospace;
                    background: rgba(102,126,234,0.1);
                    padding: 10px 15px;
                    border-radius: 8px;
                    color: #667eea;
                    font-weight: bold;
                    font-size: 1rem;
                    white-space: nowrap;
                `
            };
            
            if (number === 1) {
                return `
                    <div style="${styles.container}">
                        <div style="${styles.number}">1</div>
                        <div style="${styles.text}">
                            If we have a function f(x) = wx and want to find the correct w, first we set w to a random number.
                        </div>
                        <div id="formula-1" style="${styles.formula}">
                            f(x) = wx, w = 3 (random)
                        </div>
                    </div>
                `;
            } else if (number === 2) {
                return `
                    <div style="${styles.container}">
                        <div style="${styles.number}">2</div>
                        <div id="text-area-2" style="${styles.text}">
                            Then we plug a value into our function, for example, 4, and compare our function's output (<span id="output-value">12</span>) to the true result (32).
                            <span style="font-style: italic; color: #666;">(Where do we get the true result from? That question will be answered later)</span>.
                            We then calculate the error.
                        </div>
                        <div id="formula-2" style="${styles.formula}">
                            f(4) = 3 × 4 = 12<br>Error = 12 - 32 = -20
                        </div>
                    </div>
                `;
            } else {
                return `
                    <div style="${styles.container}">
                        <div style="${styles.number}">3</div>
                        <div id="text-area-3" style="${styles.text}">
                            <span id="error-text">We see that the error is -20, meaning that the w value of 3 wasn't high enough. So we need to increase w.</span>
                            But by how much? <strong>This is the topic of the next level.</strong> For now, let's just say we increase w by 1.
                            <div style="margin-top: 10px;">
                                We then 
                                <button id="repeat-btn" style="
                                    display: inline-block;
                                    padding: 10px 20px;
                                    background: linear-gradient(180deg, #ff8c00 0%, #ff6a00 100%);
                                    color: white;
                                    border: none;
                                    border-radius: 8px;
                                    font-weight: bold;
                                    font-size: 1rem;
                                    cursor: pointer;
                                    transition: all 0.1s;
                                    margin: 0 6px;
                                    box-shadow: 
                                        0 5px 0 #cc5500,
                                        0 6px 8px rgba(0,0,0,0.2);
                                    text-transform: uppercase;
                                    letter-spacing: 0.5px;
                                    position: relative;
                                ">REPEAT</button>
                                the process.
                                <button id="reset-level-btn" style="
                                    display: none;
                                    padding: 8px 16px;
                                    background: #6c757d;
                                    color: white;
                                    border: none;
                                    border-radius: 6px;
                                    font-weight: bold;
                                    cursor: pointer;
                                    transition: all 0.3s;
                                    margin-left: 10px;
                                ">🔄 Reset</button>
                            </div>
                        </div>
                        <div id="formula-3" style="${styles.formula}">
                            w = 4
                        </div>
                    </div>
                `;
            }
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
    const level = new GradientDescentOverviewLevel();
    level.create().catch(error => {
        console.error('Failed to create gradient descent overview level:', error);
    });
    
    return level;
};

// Export for module systems if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.createGradientDescentOverview;
}