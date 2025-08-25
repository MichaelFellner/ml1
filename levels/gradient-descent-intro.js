// Gradient Descent Introduction Level
// Part 1: Basic introduction to gradient descent concepts

// Animation function for gradient descent visualizations
function startGradientDescentAnimations() {
    // Initial values
    let w1 = 2.45, b1 = 1.23, loss1 = 89.5;
    let w21 = 5.67, w22 = -3.21, w23 = 0.98, b2 = 2.34, loss2 = 156.2;
    let w31 = 8.91, w32 = -2.45, w33 = 4.12, b3 = -0.67, loss3 = 234.7;
    let w41 = 12.34, w42 = -5.67, w43 = 8.90, w44 = -1.23, b4 = 4.56, loss4 = 678.9;
    
    // Store initial values for replay
    const initialValues = {
        w1: 2.45, b1: 1.23, loss1: 89.5,
        w21: 5.67, w22: -3.21, w23: 0.98, b2: 2.34, loss2: 156.2,
        w31: 8.91, w32: -2.45, w33: 4.12, b3: -0.67, loss3: 234.7,
        w41: 12.34, w42: -5.67, w43: 8.90, w44: -1.23, b4: 4.56, loss4: 678.9
    };
    
    let animationComplete = false;
    
    // Animation 1: Simple Linear Function
    const animation1 = setInterval(() => {
        if (loss1 > 0.1) {
            // Simulate gradient descent updates
            w1 = Math.max(0.1, w1 - Math.random() * 0.15);
            b1 = Math.max(-2, b1 - Math.random() * 0.08);
            loss1 = Math.max(0, loss1 - Math.random() * 3.5);
            
            // Update DOM
            const w1El = document.querySelector('.param-w1');
            const b1El = document.querySelector('.param-b1');
            const loss1El = document.querySelector('.loss-value-1');
            const bar1El = document.querySelector('.loss-bar-1');
            
            if (w1El) w1El.textContent = w1.toFixed(2);
            if (b1El) b1El.textContent = b1.toFixed(2);
            if (loss1El) {
                loss1El.textContent = loss1.toFixed(1);
                // Change color as loss decreases
                if (loss1 < 30) loss1El.style.color = '#ffff00';
                if (loss1 < 10) loss1El.style.color = '#00ff00';
            }
            if (bar1El) bar1El.style.width = Math.max(0, (loss1 / 89.5) * 95) + '%';
        }
        checkAllComplete();
    }, 150);
    
    // Animation 2: Three Features
    const animation2 = setInterval(() => {
        if (loss2 > 0.1) {
            w21 = w21 - (Math.random() - 0.3) * 0.25;
            w22 = w22 + (Math.random() - 0.4) * 0.18;
            w23 = w23 - (Math.random() - 0.35) * 0.12;
            b2 = b2 - (Math.random() - 0.2) * 0.15;
            loss2 = Math.max(0, loss2 - Math.random() * 4.8);
            
            const w21El = document.querySelector('.param-w2-1');
            const w22El = document.querySelector('.param-w2-2');
            const w23El = document.querySelector('.param-w2-3');
            const b2El = document.querySelector('.param-b2');
            const loss2El = document.querySelector('.loss-value-2');
            const bar2El = document.querySelector('.loss-bar-2');
            
            if (w21El) w21El.textContent = w21.toFixed(2);
            if (w22El) w22El.textContent = w22.toFixed(2);
            if (w23El) w23El.textContent = w23.toFixed(2);
            if (b2El) b2El.textContent = b2.toFixed(2);
            if (loss2El) {
                loss2El.textContent = loss2.toFixed(1);
                if (loss2 < 50) loss2El.style.color = '#ffff00';
                if (loss2 < 15) loss2El.style.color = '#00ff00';
            }
            if (bar2El) bar2El.style.width = Math.max(0, (loss2 / 156.2) * 88) + '%';
        }
        checkAllComplete();
    }, 200);
    
    // Animation 3: Neural Network Layer
    const animation3 = setInterval(() => {
        if (loss3 > 0.1) {
            w31 = w31 - (Math.random() - 0.25) * 0.35;
            w32 = w32 + (Math.random() - 0.45) * 0.28;
            w33 = w33 - (Math.random() - 0.3) * 0.32;
            b3 = b3 + (Math.random() - 0.48) * 0.18;
            loss3 = Math.max(0, loss3 - Math.random() * 6.2);
            
            const w31El = document.querySelector('.param-w3-1');
            const w32El = document.querySelector('.param-w3-2');
            const w33El = document.querySelector('.param-w3-3');
            const b3El = document.querySelector('.param-b3');
            const loss3El = document.querySelector('.loss-value-3');
            const bar3El = document.querySelector('.loss-bar-3');
            
            if (w31El) w31El.textContent = w31.toFixed(2);
            if (w32El) w32El.textContent = w32.toFixed(2);
            if (w33El) w33El.textContent = w33.toFixed(2);
            if (b3El) b3El.textContent = b3.toFixed(2);
            if (loss3El) {
                loss3El.textContent = loss3.toFixed(1);
                if (loss3 < 70) loss3El.style.color = '#ffff00';
                if (loss3 < 20) loss3El.style.color = '#00ff00';
            }
            if (bar3El) bar3El.style.width = Math.max(0, (loss3 / 234.7) * 75) + '%';
        }
        checkAllComplete();
    }, 180);
    
    // Animation 4: Matrix Style (this one finishes last)
    const animation4 = setInterval(() => {
        if (loss4 > 0.1) {
            w41 = w41 - (Math.random() - 0.2) * 0.65;
            w42 = w42 + (Math.random() - 0.48) * 0.45;
            w43 = w43 - (Math.random() - 0.35) * 0.58;
            w44 = w44 + (Math.random() - 0.42) * 0.38;
            b4 = b4 - (Math.random() - 0.3) * 0.42;
            loss4 = Math.max(0, loss4 - Math.random() * 12.5);
            
            const w41El = document.querySelector('.param-w4-1');
            const w42El = document.querySelector('.param-w4-2');
            const w43El = document.querySelector('.param-w4-3');
            const w44El = document.querySelector('.param-w4-4');
            const b4El = document.querySelector('.param-b4');
            const loss4El = document.querySelector('.loss-value-4');
            const bar4El = document.querySelector('.loss-bar-4');
            
            if (w41El) w41El.textContent = w41.toFixed(2);
            if (w42El) w42El.textContent = w42.toFixed(2);
            if (w43El) w43El.textContent = w43.toFixed(2);
            if (w44El) w44El.textContent = w44.toFixed(2);
            if (b4El) b4El.textContent = b4.toFixed(2);
            if (loss4El) {
                loss4El.textContent = loss4.toFixed(1);
                if (loss4 < 200) loss4El.style.color = '#ffff00';
                if (loss4 < 50) loss4El.style.color = '#00ff00';
            }
            if (bar4El) bar4El.style.width = Math.max(0, (loss4 / 678.9) * 92) + '%';
        }
        checkAllComplete();
    }, 160);
    
    // Check if all animations are complete
    function checkAllComplete() {
        if (!animationComplete && loss1 <= 0.1 && loss2 <= 0.1 && loss3 <= 0.1 && loss4 <= 0.1) {
            animationComplete = true;
            // Show replay button
            const replayContainer = document.getElementById('replay-container');
            if (replayContainer) {
                replayContainer.style.display = 'block';
                
                // Add replay button functionality
                const replayBtn = document.getElementById('replay-btn');
                if (replayBtn) {
                    replayBtn.onclick = () => {
                        // Reset all values
                        w1 = initialValues.w1; b1 = initialValues.b1; loss1 = initialValues.loss1;
                        w21 = initialValues.w21; w22 = initialValues.w22; w23 = initialValues.w23; 
                        b2 = initialValues.b2; loss2 = initialValues.loss2;
                        w31 = initialValues.w31; w32 = initialValues.w32; w33 = initialValues.w33;
                        b3 = initialValues.b3; loss3 = initialValues.loss3;
                        w41 = initialValues.w41; w42 = initialValues.w42; w43 = initialValues.w43;
                        w44 = initialValues.w44; b4 = initialValues.b4; loss4 = initialValues.loss4;
                        
                        // Reset all loss value colors
                        document.querySelectorAll('[class^="loss-value-"]').forEach(el => {
                            el.style.color = '#ff6666';
                        });
                        
                        // Hide replay button
                        replayContainer.style.display = 'none';
                        animationComplete = false;
                    };
                }
            }
        }
    }
    
    // Store intervals for cleanup if needed
    window.gdAnimations = [animation1, animation2, animation3, animation4];
}

// Clean up function to stop animations when leaving the page
function stopGradientDescentAnimations() {
    if (window.gdAnimations) {
        window.gdAnimations.forEach(interval => clearInterval(interval));
        window.gdAnimations = null;
    }
}

function createGradientDescentPart1() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-header" style="font-size: 1.8rem; font-weight: bold;">
                Core Concept 2: Gradient Descent (Part 1)
            </div>
            <div class="level-content" style="padding: 15px 20px; max-width: 800px; margin: 0 auto;">
                <div style="background: rgba(102,126,234,0.1); border-radius: 10px; padding: 25px; border: 2px solid rgba(102,126,234,0.3); text-align: center;">
                    <h2 style="font-size: 1.5rem; margin: 0 0 20px 0; color: #333;">What does Gradient Descent do?</h2>
                    <p style="font-size: 1.1rem; line-height: 1.6; color: #555; margin: 0;">
                        Gradient Descent makes functions <strong style="color: #667eea;">f(x)</strong> go from outputting 
                        <span style="color: #ff6347; font-weight: bold;">bad (high loss)</span> outputs to 
                        <span style="color: #2dd573; font-weight: bold;">good (low loss)</span> outputs
                        <strong>by changing how much each input is multiplied</strong>.
                    </p>
                    <p style="font-size: 1.1rem; line-height: 1.6; color: #555; margin: 20px 0 0 0;">
                        Let's start with a simple function: <strong style="font-family: 'Courier New', monospace; background: white; padding: 5px 10px; border-radius: 5px; color: #764ba2;">f(x) = w·x</strong>
                    </p>
                    
                </div>
                
                <!-- Animated Gradient Descent Matrix -->
                <div style="margin-top: -10px; background: #0a0a0a; border-radius: 10px; padding: 15px; border: 1px solid #333; font-family: 'Courier New', monospace;">
                    
                    <!-- Function 1 -->
                    <div style="display: flex; align-items: center; color: #00ff00; margin-bottom: 8px;">
                        <div style="width: calc(100% - 170px); font-size: 0.95rem;">
                            f(x) = <span class="param-w1" style="color: #ffff00; display: inline-block; width: 45px; text-align: right;">2.45</span>·x + <span class="param-b1" style="color: #ffff00; display: inline-block; width: 45px; text-align: right;">1.23</span>
                        </div>
                        <div style="width: 150px; display: flex; align-items: center; margin-left: 20px;">
                            <div style="flex: 1; margin-right: 10px;">
                                <div style="background: #222; border: 1px solid #444; height: 8px; border-radius: 4px; overflow: hidden;">
                                    <div class="loss-bar-1" style="background: linear-gradient(90deg, #ff0000, #ffff00, #00ff00); height: 100%; width: 95%; transition: width 0.3s;"></div>
                                </div>
                            </div>
                            <div class="loss-value-1" style="color: #ff6666; font-size: 0.9rem; width: 45px; text-align: right;">89.5</div>
                        </div>
                    </div>
                    
                    <!-- Function 2 -->
                    <div style="display: flex; align-items: center; color: #00ff00; margin-bottom: 8px;">
                        <div style="width: calc(100% - 170px); font-size: 0.95rem;">
                            f(x) = <span class="param-w2-1" style="color: #ffff00; display: inline-block; width: 45px; text-align: right;">5.67</span>·x₁ + <span class="param-w2-2" style="color: #ffff00; display: inline-block; width: 45px; text-align: right;">-3.21</span>·x₂ + <span class="param-w2-3" style="color: #ffff00; display: inline-block; width: 45px; text-align: right;">0.98</span>·x₃ + <span class="param-b2" style="color: #ffff00; display: inline-block; width: 45px; text-align: right;">2.34</span>
                        </div>
                        <div style="width: 150px; display: flex; align-items: center; margin-left: 20px;">
                            <div style="flex: 1; margin-right: 10px;">
                                <div style="background: #222; border: 1px solid #444; height: 8px; border-radius: 4px; overflow: hidden;">
                                    <div class="loss-bar-2" style="background: linear-gradient(90deg, #ff0000, #ffff00, #00ff00); height: 100%; width: 88%; transition: width 0.3s;"></div>
                                </div>
                            </div>
                            <div class="loss-value-2" style="color: #ff6666; font-size: 0.9rem; width: 45px; text-align: right;">156.2</div>
                        </div>
                    </div>
                    
                    <!-- Function 3 -->
                    <div style="display: flex; align-items: center; color: #00ff00; margin-bottom: 8px;">
                        <div style="width: calc(100% - 170px); font-size: 0.95rem;">
                            f(x) = <span class="param-w3-1" style="color: #ffff00; display: inline-block; width: 45px; text-align: right;">8.91</span>·x₁ + <span class="param-w3-2" style="color: #ffff00; display: inline-block; width: 45px; text-align: right;">-2.45</span>·x₂ + <span class="param-w3-3" style="color: #ffff00; display: inline-block; width: 45px; text-align: right;">4.12</span>·x₃ + <span class="param-b3" style="color: #ffff00; display: inline-block; width: 45px; text-align: right;">-0.67</span>
                        </div>
                        <div style="width: 150px; display: flex; align-items: center; margin-left: 20px;">
                            <div style="flex: 1; margin-right: 10px;">
                                <div style="background: #222; border: 1px solid #444; height: 8px; border-radius: 4px; overflow: hidden;">
                                    <div class="loss-bar-3" style="background: linear-gradient(90deg, #ff0000, #ffff00, #00ff00); height: 100%; width: 75%; transition: width 0.3s;"></div>
                                </div>
                            </div>
                            <div class="loss-value-3" style="color: #ff6666; font-size: 0.9rem; width: 45px; text-align: right;">234.7</div>
                        </div>
                    </div>
                    
                    <!-- Function 4 -->
                    <div style="display: flex; align-items: center; color: #00ff00; margin-bottom: 8px;">
                        <div style="width: calc(100% - 170px); font-size: 0.95rem; overflow: hidden;">
                            f(x) = <span class="param-w4-1" style="color: #ffff00; display: inline-block; width: 45px; text-align: right;">12.34</span>·x₁ + <span class="param-w4-2" style="color: #ffff00; display: inline-block; width: 45px; text-align: right;">-5.67</span>·x₂ + <span class="param-w4-3" style="color: #ffff00; display: inline-block; width: 45px; text-align: right;">8.90</span>·x₃ + <span class="param-w4-4" style="color: #ffff00; display: inline-block; width: 45px; text-align: right;">-1.23</span>·x₄ + <span class="param-b4" style="color: #ffff00; display: inline-block; width: 45px; text-align: right;">4.56</span>
                        </div>
                        <div style="width: 150px; display: flex; align-items: center; margin-left: 20px;">
                            <div style="flex: 1; margin-right: 10px;">
                                <div style="background: #222; border: 1px solid #444; height: 8px; border-radius: 4px; overflow: hidden;">
                                    <div class="loss-bar-4" style="background: linear-gradient(90deg, #ff0000, #ffff00, #00ff00); height: 100%; width: 92%; transition: width 0.3s;"></div>
                                </div>
                            </div>
                            <div class="loss-value-4" style="color: #ff6666; font-size: 0.9rem; width: 45px; text-align: right;">678.9</div>
                        </div>
                    </div>
                    
                    <!-- Replay button (hidden initially) -->
                    <div id="replay-container" style="text-align: center; margin-top: 15px; display: none;">
                        <button id="replay-btn" style="background: #00ff00; color: #000; border: none; padding: 6px 20px; border-radius: 5px; font-family: 'Courier New', monospace; font-weight: bold; cursor: pointer; font-size: 0.9rem;">
                            ↻ Replay
                        </button>
                    </div>
                </div>
                
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('gd1', 'createGradientDescentPart1');
    
    // Start the gradient descent animations
    startGradientDescentAnimations();
    
    // Clean up animations when leaving the page
    window.addEventListener('beforeunload', stopGradientDescentAnimations);
}

// Export the function
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createGradientDescentPart1 };
} else {
    window.createGradientDescentPart1 = createGradientDescentPart1;
}