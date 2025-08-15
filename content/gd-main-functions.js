// Main gradient descent teaching functions
// This file now imports functions from the levels/ folder structure

// Note: Level functions are now defined in separate files in the levels/ folder
// Functions are automatically made available globally via the individual level files

// The functions that were previously defined here are now in:
// - createGradientDescentPart1() → levels/gradient-descent-intro.js
// - createBalloonInflationLevel() + setupBalloonLevel() → levels/balloon-inflation.js  
// - createBalloonGradientDescent() + setupBalloonGradientDescent() → levels/balloon-gradient.js
// - createBunnyFeedingLevel() + setupBunnyLevel() → levels/bunny-feeding.js
// - createBunnyGradientDescent() + setupBunnyGradientDescent() → levels/bunny-gradient.js

// Additional functions that were in this file:

// =============================================================================
// GRADIENT DESCENT PART 1B: INTRODUCING BIAS
// =============================================================================

function createGradientDescentPart1b() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-header">
                ⚡ Adding Complexity: The Bias Term
            </div>
            <div class="level-content" style="padding: 15px 20px; max-width: 800px; margin: 0 auto;">
                <div style="background: rgba(102,126,234,0.1); border-radius: 10px; padding: 25px; border: 2px solid rgba(102,126,234,0.3); text-align: center;">
                    <h2 style="font-size: 1.5rem; margin: 0 0 20px 0; color: #333;">What if we need more flexibility?</h2>
                    
                    <p style="font-size: 1.1rem; line-height: 1.6; color: #555; margin: 0;">
                        You just mastered <strong style="font-family: 'Courier New', monospace; background: white; padding: 5px 10px; border-radius: 5px; color: #764ba2;">f(x) = w·x</strong>
                    </p>
                    
                    <p style="font-size: 1rem; line-height: 1.6; color: #666; margin: 15px 0;">
                        But sometimes we need a function that doesn't start at zero!<br>
                        What if balloons needed a <em>base amount</em> of air plus extra for their size?
                    </p>
                    
                    <div style="background: white; border-radius: 8px; padding: 20px; margin: 20px 0; border: 2px solid #667eea;">
                        <p style="font-size: 1.2rem; line-height: 1.6; color: #333; margin: 0;">
                            Enter the more powerful function:<br>
                            <strong style="font-family: 'Courier New', monospace; font-size: 1.3rem; color: #764ba2;">f(x) = w·x + b</strong>
                        </p>
                        
                        <div style="margin-top: 15px; padding-top: 15px; border-top: 2px dashed #ddd;">
                            <p style="font-size: 0.95rem; color: #555; margin: 5px 0;">
                                <strong style="color: #667eea;">w</strong> = the multiplier (slope)<br>
                                <strong style="color: #764ba2;">b</strong> = the bias (starting point)
                            </p>
                        </div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px;">
                        <div style="background: rgba(255,215,0,0.1); border-radius: 8px; padding: 15px; border: 2px solid rgba(255,215,0,0.3);">
                            <h3 style="font-size: 1rem; margin: 0 0 10px 0; color: #f39c12;">🎯 The Good:</h3>
                            <p style="font-size: 0.9rem; line-height: 1.4; color: #666; margin: 0;">
                                Can find more complicated patterns!<br>
                                More flexible and powerful.<br>
                                Works for real-world problems.
                            </p>
                        </div>
                        
                        <div style="background: rgba(255,99,71,0.1); border-radius: 8px; padding: 15px; border: 2px solid rgba(255,99,71,0.3);">
                            <h3 style="font-size: 1rem; margin: 0 0 10px 0; color: #ff6347;">🤔 The Challenge:</h3>
                            <p style="font-size: 0.9rem; line-height: 1.4; color: #666; margin: 0;">
                                Two parameters to optimize!<br>
                                Much harder to find by hand.<br>
                                This is where AI really shines!
                            </p>
                        </div>
                    </div>
                    
                    <div style="background: rgba(45,213,115,0.1); border-radius: 8px; padding: 15px; margin-top: 20px; border: 2px solid rgba(45,213,115,0.3);">
                        <p style="font-size: 1rem; line-height: 1.5; color: #333; margin: 0;">
                            <strong style="color: #2dd573;">💡 Key Insight:</strong> Gradient descent can optimize <em>both</em> <strong>w</strong> and <strong>b</strong> at the same time!<br>
                            <span style="font-size: 0.9rem; color: #666;">Let's see this in action with the bunny feeding challenge...</span>
                        </p>
                    </div>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('gd1b', 'createGradientDescentPart1b');
}

// =============================================================================
// BEHIND THE SCENES: BALLOON FUNCTION MOVEMENT
// =============================================================================

function createBehindTheScenesBalloon() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level" style="background: linear-gradient(to bottom, #000000, #1a1a1a);">
            <div class="level-content" style="padding: 8px; max-width: 1200px; margin: 0 auto; display: block !important; gap: 0 !important;">
                <h1 style="font-size: 2rem; margin: 0 !important; padding: 0 !important; text-align: center; color: white; line-height: 1.2;">Behind the Scenes: How the Balloon Function Moves</h1>
                
                <!-- Message at the top -->
                <div style="background: rgba(255,255,255,0.9); border-radius: 8px; padding: 8px 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center; margin: 12px 0 !important; display: block !important;">
                    <p style="margin: 0 !important; padding: 0 !important; font-size: 0.95rem; color: #333; line-height: 1.3;">Watch how changing the parameter 'w' moves the entire function f(x) = w·x up and down. The AI is learning to find the right slope!</p>
                </div>
                
                <div style="display: grid; grid-template-columns: 3fr 2fr; gap: 15px; margin: 4px 0 0 0 !important; padding: 0 !important;">
                    <!-- Left side: Function Graph -->
                    <div style="background: rgba(255,255,255,0.9); border-radius: 10px; padding: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h2 style="margin: 0 0 10px 0; color: #333; font-size: 1.1rem; text-align: center;">Function Space: f(x) = w·x</h2>
                        
                        <!-- Graph Canvas -->
                        <div style="position: relative; background: #f8f9fa; border-radius: 8px; padding: 10px; margin-bottom: 15px; border: 1px solid #e9ecef;">
                            <canvas id="function-canvas" width="500" height="320" style="width: 100%; height: 320px; display: block;"></canvas>
                        </div>
                        
                        <!-- Parameter Control -->
                        <div style="background: white; border-radius: 8px; padding: 12px; border: 2px solid #667eea;">
                            <label style="display: block; margin-bottom: 8px; color: #333; font-weight: bold;">
                                w (slope): <span id="w-value" style="color: #667eea; font-size: 1.1rem;">3.0</span>
                            </label>
                            <input type="range" id="w-slider" min="0" max="10" value="3" step="0.5" style="width: 100%; height: 8px; border-radius: 4px; background: #ddd; outline: none;">
                            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #999; margin-top: 5px;">
                                <span>0</span>
                                <span>Target: 7</span>
                                <span>10</span>
                            </div>
                        </div>
                        
                        <!-- Animation Controls -->
                        <div style="display: flex; gap: 10px; justify-content: center; margin-top: 15px;">
                            <button id="animate-btn" style="padding: 8px 16px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 5px; font-size: 0.9rem; cursor: pointer; transition: all 0.3s;">
                                🎬 Animate to Target
                            </button>
                            <button id="reset-btn" style="padding: 8px 16px; background: #666; color: white; border: none; border-radius: 5px; font-size: 0.9rem; cursor: pointer; transition: all 0.3s;">
                                🔄 Reset
                            </button>
                        </div>
                    </div>
                    
                    <!-- Right side: Explanation and Test Points -->
                    <div style="background: rgba(255,255,255,0.9); border-radius: 10px; padding: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h2 style="margin: 0 0 12px 0; color: #333; font-size: 1.1rem;">📊 What the Computer Sees</h2>
                        
                
                        
                        <!-- Loss Display -->
                        <div style="margin-bottom: 15px; padding: 12px; background: rgba(255,99,71,0.1); border-radius: 6px; border: 1px solid rgba(255,99,71,0.3);">
                            <div style="color: #ff6347; font-weight: bold; margin-bottom: 5px; font-size: 0.9rem;">Total Loss:</div>
                            <div id="total-loss" style="font-size: 1.8rem; color: #333; font-weight: bold; text-align: center;">48</div>
                            <div style="font-size: 0.8rem; color: #666; text-align: center; margin-top: 5px;">
                                Sum of all errors: |14-6| + |28-12| + |42-18|
                            </div>
                        </div>
                        
                        <!-- Insight Box -->
                        <div style="padding: 12px; background: rgba(45,213,115,0.1); border-radius: 6px; border: 1px solid rgba(45,213,115,0.3);">
                            <div style="color: #2dd573; font-weight: bold; margin-bottom: 5px; font-size: 0.9rem;">💡 Key Insight:</div>
                            <p style="color: #555; font-size: 0.85rem; line-height: 1.4; margin: 0;">
                                The function f(x) = w·x is a line through the origin. Changing 'w' changes the slope of this line. The AI needs to find w=7 to minimize the loss across all test points!
                            </p>
                        </div>
                        
                        <!-- Balloon Emoji -->
                        <div style="text-align: center; margin-top: 25px; font-size: 10rem;">
                            🎈
                        </div>
                    </div>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('balloon-bts', 'createBehindTheScenesBalloon');
    
    // Setup the visualization
    setTimeout(() => {
        const canvas = document.getElementById('function-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const wSlider = document.getElementById('w-slider');
        const wValue = document.getElementById('w-value');
        const animateBtn = document.getElementById('animate-btn');
        const resetBtn = document.getElementById('reset-btn');
        
        let currentW = 3.0;
        const targetW = 7.0;
        let animationId = null;
        
        // Set canvas size
        canvas.width = 500;
        canvas.height = 320;
        
        function updateDisplay() {
            // Update w display
            wValue.textContent = currentW.toFixed(1);
            wSlider.value = currentW;
            
            // Update balloon results
            const testSizes = [2, 4, 6];
            let totalLoss = 0;
            
            testSizes.forEach(size => {
                const predicted = currentW * size;
                const actual = targetW * size;
                const loss = Math.abs(predicted - actual);
                totalLoss += loss;
                
                const resultSpan = document.getElementById(`balloon-${size}-result`);
                if (resultSpan) {
                    resultSpan.textContent = predicted.toFixed(0);
                    
                    // Color based on accuracy
                    if (loss < 2) {
                        resultSpan.style.color = '#2dd573';
                    } else if (loss < 10) {
                        resultSpan.style.color = '#f3960a';
                    } else {
                        resultSpan.style.color = '#ff6347';
                    }
                }
            });
            
            // Update total loss
            document.getElementById('total-loss').textContent = totalLoss.toFixed(0);
            
            // Draw the graph
            drawGraph();
        }
        
        function drawGraph() {
            const width = canvas.width;
            const height = canvas.height;
            const padding = 40;
            
            // Clear canvas
            ctx.fillStyle = '#f8f9fa';
            ctx.fillRect(0, 0, width, height);
            
            // Draw grid
            ctx.strokeStyle = '#e9ecef';
            ctx.lineWidth = 1;
            for (let i = 0; i <= 10; i++) {
                const x = padding + (i / 10) * (width - 2 * padding);
                ctx.beginPath();
                ctx.moveTo(x, padding);
                ctx.lineTo(x, height - padding);
                ctx.stroke();
                
                const y = padding + (i / 10) * (height - 2 * padding);
                ctx.beginPath();
                ctx.moveTo(padding, y);
                ctx.lineTo(width - padding, y);
                ctx.stroke();
            }
            
            // Draw axes
            ctx.strokeStyle = '#999';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(padding, height - padding);
            ctx.lineTo(width - padding, height - padding); // X axis
            ctx.moveTo(padding, padding);
            ctx.lineTo(padding, height - padding); // Y axis
            ctx.stroke();
            
            // Labels
            ctx.fillStyle = '#666';
            ctx.font = '12px Arial';
            ctx.fillText('0', padding - 15, height - padding + 5);
            ctx.fillText('10', width - padding - 10, height - padding + 20);
            ctx.fillText('x (balloon size)', width / 2 - 40, height - 10);
            
            ctx.save();
            ctx.translate(15, height / 2);
            ctx.rotate(-Math.PI / 2);
            ctx.fillText('y (air needed)', -40, 0);
            ctx.restore();
            
            // Scale for the graph (x: 0-10, y: 0-70)
            const xScale = (width - 2 * padding) / 10;
            const yScale = (height - 2 * padding) / 70;
            
            // Draw target function (w=7)
            ctx.strokeStyle = 'rgba(45, 213, 115, 0.3)';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(padding, height - padding);
            ctx.lineTo(padding + 10 * xScale, height - padding - (targetW * 10) * yScale);
            ctx.stroke();
            ctx.setLineDash([]);
            
            // Label for target
            ctx.fillStyle = '#2dd573';
            ctx.font = '11px Arial';
            ctx.fillText('Target: f(x) = 7x', padding + 8 * xScale, height - padding - (targetW * 8) * yScale - 5);
            
            // Draw current function
            ctx.strokeStyle = '#667eea';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(padding, height - padding);
            ctx.lineTo(padding + 10 * xScale, height - padding - (currentW * 10) * yScale);
            ctx.stroke();
            
            // Label for current
            ctx.fillStyle = '#667eea';
            ctx.font = '11px Arial';
            ctx.fillText(`Current: f(x) = ${currentW.toFixed(1)}x`, padding + 8 * xScale, height - padding - (currentW * 8) * yScale + 15);
            
            // Draw test points
            const testSizes = [2, 4, 6];
            testSizes.forEach(size => {
                const x = padding + size * xScale;
                
                // Target point
                const yTarget = height - padding - (targetW * size) * yScale;
                ctx.fillStyle = '#2dd573';
                ctx.beginPath();
                ctx.arc(x, yTarget, 4, 0, 2 * Math.PI);
                ctx.fill();
                
                // Current prediction point
                const yPredicted = height - padding - (currentW * size) * yScale;
                ctx.fillStyle = '#ff6347';
                ctx.beginPath();
                ctx.arc(x, yPredicted, 4, 0, 2 * Math.PI);
                ctx.fill();
                
                // Error line
                ctx.strokeStyle = 'rgba(255, 99, 71, 0.5)';
                ctx.lineWidth = 1;
                ctx.setLineDash([3, 3]);
                ctx.beginPath();
                ctx.moveTo(x, yTarget);
                ctx.lineTo(x, yPredicted);
                ctx.stroke();
                ctx.setLineDash([]);
                
                // Label
                ctx.fillStyle = '#666';
                ctx.font = '10px Arial';
                ctx.fillText(`x=${size}`, x - 10, height - padding + 15);
            });
            
            // Legend
            ctx.fillStyle = '#2dd573';
            ctx.beginPath();
            ctx.arc(width - 100, 20, 4, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillStyle = '#666';
            ctx.font = '10px Arial';
            ctx.fillText('Target', width - 90, 24);
            
            ctx.fillStyle = '#ff6347';
            ctx.beginPath();
            ctx.arc(width - 100, 35, 4, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillStyle = '#666';
            ctx.fillText('Prediction', width - 90, 39);
        }
        
        function animateToTarget() {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            
            function animate() {
                const diff = targetW - currentW;
                if (Math.abs(diff) > 0.05) {
                    currentW += diff * 0.1; // Smooth animation
                    updateDisplay();
                    animationId = requestAnimationFrame(animate);
                } else {
                    currentW = targetW;
                    updateDisplay();
                    animationId = null;
                }
            }
            
            animate();
        }
        
        // Event listeners
        wSlider.addEventListener('input', (e) => {
            currentW = parseFloat(e.target.value);
            updateDisplay();
        });
        
        animateBtn.addEventListener('click', animateToTarget);
        
        resetBtn.addEventListener('click', () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
            currentW = 3.0;
            updateDisplay();
        });
        
        // Add hover effects
        [animateBtn, resetBtn].forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-2px)';
                btn.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0)';
                btn.style.boxShadow = 'none';
            });
        });
        
        // Initialize
        updateDisplay();
    }, 100);
}

// =============================================================================
// BEHIND THE SCENES: BUNNY FEEDER FUNCTION
// =============================================================================

function createBehindTheScenesBunny() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level" style="background: linear-gradient(to bottom, #000000, #1a1a1a);">
            <div class="level-content" style="padding: 8px; max-width: 1200px; margin: 0 auto; display: block !important; gap: 0 !important;">
                <h1 style="font-size: 2rem; margin: 0 !important; padding: 0 !important; text-align: center; color: white; line-height: 1.2;">Behind the Scenes: The Bunny Feeder Function</h1>
                
                <!-- Message at the top -->
                <div style="background: rgba(255,255,255,0.9); border-radius: 8px; padding: 8px 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center; margin: 12px 0 !important; display: block !important;">
                    <p style="margin: 0 !important; padding: 0 !important; font-size: 0.95rem; color: #333; line-height: 1.3;">Now with TWO parameters! Watch how the function f(x) = w·x + b can be shifted AND tilted to fit the data perfectly.</p>
                </div>
                
                <div style="display: grid; grid-template-columns: 3fr 2fr; gap: 15px; margin: 4px 0 0 0 !important; padding: 0 !important;">
                    <!-- Left side: 2D Function Visualization -->
                    <div style="background: rgba(255,255,255,0.9); border-radius: 10px; padding: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h2 style="margin: 0 0 10px 0; color: #333; font-size: 1.1rem; text-align: center;">Function Space: f(x) = w·x + b</h2>
                        
                        <!-- Graph Canvas -->
                        <div style="position: relative; background: #f8f9fa; border-radius: 8px; padding: 10px; margin-bottom: 15px; border: 1px solid #e9ecef;">
                            <canvas id="function-canvas-bunny" width="500" height="320" style="width: 100%; height: 320px; display: block;"></canvas>
                        </div>
                        
                        <!-- Parameter Controls -->
                        <div style="background: white; border-radius: 8px; padding: 12px; border: 2px solid #667eea; margin-bottom: 10px;">
                            <div style="margin-bottom: 10px;">
                                <label style="display: block; margin-bottom: 5px; color: #333; font-weight: bold;">
                                    w (slope): <span id="w-value-bunny" style="color: #667eea; font-size: 1rem;">2.0</span>
                                </label>
                                <input type="range" id="w-slider-bunny" min="0" max="10" value="2" step="0.5" style="width: 100%; height: 6px; border-radius: 3px; background: #ddd; outline: none;">
                            </div>
                            
                            <div>
                                <label style="display: block; margin-bottom: 5px; color: #333; font-weight: bold;">
                                    b (intercept): <span id="b-value-bunny" style="color: #764ba2; font-size: 1rem;">5.0</span>
                                </label>
                                <input type="range" id="b-slider-bunny" min="0" max="20" value="5" step="1" style="width: 100%; height: 6px; border-radius: 3px; background: #ddd; outline: none;">
                            </div>
                        </div>
                        
                        <!-- Animation Control -->
                        <div style="display: flex; gap: 10px; justify-content: center;">
                            <button id="animate-btn-bunny" style="padding: 8px 16px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 5px; font-size: 0.9rem; cursor: pointer; transition: all 0.3s;">
                                🎯 Animate to Target
                            </button>
                            <button id="gradient-step-btn" style="padding: 8px 16px; background: #2dd573; color: white; border: none; border-radius: 5px; font-size: 0.9rem; cursor: pointer; transition: all 0.3s;">
                                📉 Gradient Step
                            </button>
                            <button id="reset-btn-bunny" style="padding: 8px 16px; background: #666; color: white; border: none; border-radius: 5px; font-size: 0.9rem; cursor: pointer; transition: all 0.3s;">
                                🔄 Reset
                            </button>
                        </div>
                    </div>
                    
                    <!-- Right side: Info Panel -->
                    <div style="background: rgba(255,255,255,0.9); border-radius: 10px; padding: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h2 style="margin: 0 0 12px 0; color: #333; font-size: 1.1rem;">📊 Function Details</h2>
                        
                        <!-- Current State -->
                        <div style="margin-bottom: 12px; padding: 10px; background: rgba(102,126,234,0.1); border-radius: 6px; border: 1px solid rgba(102,126,234,0.3);">
                            <div style="color: #667eea; font-weight: bold; margin-bottom: 5px; font-size: 0.9rem;">Current Function:</div>
                            <div style="font-family: 'Courier New', monospace; color: #333; font-size: 0.9rem;">
                                f(x) = <span id="current-w-display">2.0</span>x + <span id="current-b-display">5.0</span>
                            </div>
                            <div style="color: #666; font-size: 0.8rem; margin-top: 5px;">
                                Target: f(x) = 5x + 10
                            </div>
                        </div>
                        
                        <!-- Loss Display -->
                        <div style="margin-bottom: 12px; padding: 10px; background: rgba(255,99,71,0.1); border-radius: 6px; border: 1px solid rgba(255,99,71,0.3);">
                            <div style="color: #ff6347; font-weight: bold; margin-bottom: 5px; font-size: 0.9rem;">Total Loss:</div>
                            <div id="total-loss-bunny" style="font-size: 1.5rem; color: #333; font-weight: bold; text-align: center;">60</div>
                        </div>
                        
                       
                        
                        <!-- Key Insight -->
                        <div style="padding: 10px; background: rgba(45,213,115,0.1); border-radius: 6px; border: 1px solid rgba(45,213,115,0.3);">
                            <div style="color: #2dd573; font-weight: bold; margin-bottom: 5px; font-size: 0.85rem;">💡 The Power of Two Parameters:</div>
                            <p style="color: #555; font-size: 0.8rem; line-height: 1.3; margin: 0;">
                                With both 'w' and 'b', we can fit any linear pattern! The gradient tells us how to adjust BOTH parameters simultaneously to reduce loss.
                            </p>
                        </div>
                        
                        <!-- Bunny Emoji -->
                        <div style="text-align: center; margin-top: 25px; font-size: 10rem;">
                            🐰
                        </div>
                    </div>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('bunny-bts', 'createBehindTheScenesBunny');
    
    // Setup the visualization
    setTimeout(() => {
        const canvas = document.getElementById('function-canvas-bunny');
        const lossCanvas = document.getElementById('loss-landscape-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const lossCtx = lossCanvas ? lossCanvas.getContext('2d') : null;
        
        let currentW = 2.0;
        let currentB = 5.0;
        const targetW = 5.0;
        const targetB = 10.0;
        let animationId = null;
        
        // Test data points (bunny weights)
        const testData = [
            {x: 2, y: 20}, // 2kg bunny needs 20 units
            {x: 4, y: 30}, // 4kg bunny needs 30 units
            {x: 6, y: 40}, // 6kg bunny needs 40 units
            {x: 8, y: 50}  // 8kg bunny needs 50 units
        ];
        
        // Set canvas sizes
        canvas.width = 500;
        canvas.height = 320;
        if (lossCanvas) {
            lossCanvas.width = 250;
            lossCanvas.height = 200;
        }
        
        function calculateLoss(w, b) {
            let totalLoss = 0;
            testData.forEach(point => {
                const predicted = w * point.x + b;
                totalLoss += Math.abs(predicted - point.y);
            });
            return totalLoss;
        }
        
        function calculateGradients() {
            let gradW = 0;
            let gradB = 0;
            
            testData.forEach(point => {
                const predicted = currentW * point.x + currentB;
                const error = predicted - point.y;
                const sign = error > 0 ? 1 : (error < 0 ? -1 : 0);
                gradW += sign * point.x;
                gradB += sign;
            });
            
            return {gradW, gradB};
        }
        
        function updateDisplay() {
            // Update slider values
            document.getElementById('w-slider-bunny').value = currentW;
            document.getElementById('b-slider-bunny').value = currentB;
            document.getElementById('w-value-bunny').textContent = currentW.toFixed(1);
            document.getElementById('b-value-bunny').textContent = currentB.toFixed(1);
            
            // Update current function display
            document.getElementById('current-w-display').textContent = currentW.toFixed(1);
            document.getElementById('current-b-display').textContent = currentB.toFixed(1);
            
            // Calculate and display loss
            const loss = calculateLoss(currentW, currentB);
            document.getElementById('total-loss-bunny').textContent = loss.toFixed(0);
            
            // Calculate and display gradients
            const {gradW, gradB} = calculateGradients();
            const gradWElement = document.getElementById('grad-w-display');
            const gradBElement = document.getElementById('grad-b-display');
            if (gradWElement) gradWElement.textContent = gradW.toFixed(1);
            if (gradBElement) gradBElement.textContent = gradB.toFixed(1);
          
            // Draw graphs
            drawFunctionGraph();
            drawLossLandscape();
        }
        
        function drawFunctionGraph() {
            const width = canvas.width;
            const height = canvas.height;
            const padding = 40;
            
            // Clear canvas
            ctx.fillStyle = '#f8f9fa';
            ctx.fillRect(0, 0, width, height);
            
            // Draw grid
            ctx.strokeStyle = '#e9ecef';
            ctx.lineWidth = 1;
            for (let i = 0; i <= 10; i++) {
                const x = padding + (i / 10) * (width - 2 * padding);
                ctx.beginPath();
                ctx.moveTo(x, padding);
                ctx.lineTo(x, height - padding);
                ctx.stroke();
                
                const y = padding + (i / 10) * (height - 2 * padding);
                ctx.beginPath();
                ctx.moveTo(padding, y);
                ctx.lineTo(width - padding, y);
                ctx.stroke();
            }
            
            // Draw axes
            ctx.strokeStyle = '#999';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(padding, height - padding);
            ctx.lineTo(width - padding, height - padding); // X axis
            ctx.moveTo(padding, padding);
            ctx.lineTo(padding, height - padding); // Y axis
            ctx.stroke();
            
            // Labels
            ctx.fillStyle = '#666';
            ctx.font = '12px Arial';
            ctx.fillText('0', padding - 15, height - padding + 5);
            ctx.fillText('10', width - padding - 10, height - padding + 20);
            ctx.fillText('Bunny Weight (kg)', width / 2 - 50, height - 10);
            
            // Scale for the graph (x: 0-10, y: 0-60)
            const xScale = (width - 2 * padding) / 10;
            const yScale = (height - 2 * padding) / 60;
            
            // Draw target function
            ctx.strokeStyle = 'rgba(45, 213, 115, 0.4)';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            const y1Target = height - padding - targetB * yScale;
            const y2Target = height - padding - (targetW * 10 + targetB) * yScale;
            ctx.moveTo(padding, y1Target);
            ctx.lineTo(padding + 10 * xScale, y2Target);
            ctx.stroke();
            ctx.setLineDash([]);
            
            // Draw current function
            ctx.strokeStyle = '#667eea';
            ctx.lineWidth = 3;
            ctx.beginPath();
            const y1Current = height - padding - currentB * yScale;
            const y2Current = height - padding - (currentW * 10 + currentB) * yScale;
            ctx.moveTo(padding, y1Current);
            ctx.lineTo(padding + 10 * xScale, y2Current);
            ctx.stroke();
            
            // Draw data points
            testData.forEach(point => {
                const x = padding + point.x * xScale;
                const y = height - padding - point.y * yScale;
                
                // True data point
                ctx.fillStyle = '#2dd573';
                ctx.beginPath();
                ctx.arc(x, y, 5, 0, 2 * Math.PI);
                ctx.fill();
                
                // Predicted point
                const yPred = height - padding - (currentW * point.x + currentB) * yScale;
                ctx.fillStyle = '#ff6347';
                ctx.beginPath();
                ctx.arc(x, yPred, 4, 0, 2 * Math.PI);
                ctx.fill();
                
                // Error line
                ctx.strokeStyle = 'rgba(255, 99, 71, 0.3)';
                ctx.lineWidth = 1;
                ctx.setLineDash([3, 3]);
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x, yPred);
                ctx.stroke();
                ctx.setLineDash([]);
            });
        }
        
        function drawLossLandscape() {
            if (!lossCtx || !lossCanvas) return;
            
            const width = lossCanvas.width;
            const height = lossCanvas.height;
            
            // Create gradient for loss landscape
            const imageData = lossCtx.createImageData(width, height);
            const data = imageData.data;
            
            // Calculate loss for each point in parameter space
            for (let x = 0; x < width; x++) {
                for (let y = 0; y < height; y++) {
                    const w = (x / width) * 10;
                    const b = (y / height) * 20;
                    const loss = calculateLoss(w, b);
                    
                    // Normalize loss to 0-255 (inverted so lower loss is darker)
                    const maxLoss = 150;
                    const intensity = Math.max(0, Math.min(255, 255 - (loss / maxLoss) * 255));
                    
                    const idx = (y * width + x) * 4;
                    data[idx] = intensity;     // R
                    data[idx + 1] = intensity; // G
                    data[idx + 2] = intensity + 20; // B (slightly blue tint)
                    data[idx + 3] = 255;       // A
                }
            }
            
            lossCtx.putImageData(imageData, 0, 0);
            
            // Mark current position
            const currentX = (currentW / 10) * width;
            const currentY = (currentB / 20) * height;
            
            lossCtx.strokeStyle = '#ff6347';
            lossCtx.lineWidth = 2;
            lossCtx.beginPath();
            lossCtx.arc(currentX, currentY, 5, 0, 2 * Math.PI);
            lossCtx.stroke();
            
            // Mark target position
            const targetX = (targetW / 10) * width;
            const targetY = (targetB / 20) * height;
            
            lossCtx.strokeStyle = '#2dd573';
            lossCtx.lineWidth = 2;
            lossCtx.beginPath();
            lossCtx.arc(targetX, targetY, 5, 0, 2 * Math.PI);
            lossCtx.stroke();
            
            // Draw gradient arrow
            const {gradW, gradB} = calculateGradients();
            const arrowScale = 10;
            const arrowEndX = currentX - (gradW / Math.abs(gradW || 1)) * arrowScale;
            const arrowEndY = currentY - (gradB / Math.abs(gradB || 1)) * arrowScale;
            
            lossCtx.strokeStyle = '#667eea';
            lossCtx.lineWidth = 2;
            lossCtx.beginPath();
            lossCtx.moveTo(currentX, currentY);
            lossCtx.lineTo(arrowEndX, arrowEndY);
            lossCtx.stroke();
            
            // Arrowhead
            const angle = Math.atan2(arrowEndY - currentY, arrowEndX - currentX);
            lossCtx.save();
            lossCtx.translate(arrowEndX, arrowEndY);
            lossCtx.rotate(angle);
            lossCtx.beginPath();
            lossCtx.moveTo(0, 0);
            lossCtx.lineTo(-8, -4);
            lossCtx.lineTo(-8, 4);
            lossCtx.closePath();
            lossCtx.fillStyle = '#667eea';
            lossCtx.fill();
            lossCtx.restore();
        }
        
        function animateToTarget() {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            
            function animate() {
                const diffW = targetW - currentW;
                const diffB = targetB - currentB;
                
                if (Math.abs(diffW) > 0.05 || Math.abs(diffB) > 0.05) {
                    currentW += diffW * 0.1;
                    currentB += diffB * 0.1;
                    updateDisplay();
                    animationId = requestAnimationFrame(animate);
                } else {
                    currentW = targetW;
                    currentB = targetB;
                    updateDisplay();
                    animationId = null;
                }
            }
            
            animate();
        }
        
        function gradientStep() {
            const {gradW, gradB} = calculateGradients();
            const learningRateW = 0.01;
            const learningRateB = 0.1;
            
            currentW -= gradW * learningRateW;
            currentB -= gradB * learningRateB;
            
            // Clamp values
            currentW = Math.max(0, Math.min(10, currentW));
            currentB = Math.max(0, Math.min(20, currentB));
            
            updateDisplay();
        }
        
        // Event listeners
        document.getElementById('w-slider-bunny').addEventListener('input', (e) => {
            currentW = parseFloat(e.target.value);
            updateDisplay();
        });
        
        document.getElementById('b-slider-bunny').addEventListener('input', (e) => {
            currentB = parseFloat(e.target.value);
            updateDisplay();
        });
        
        document.getElementById('animate-btn-bunny').addEventListener('click', animateToTarget);
        document.getElementById('gradient-step-btn').addEventListener('click', gradientStep);
        
        document.getElementById('reset-btn-bunny').addEventListener('click', () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
            currentW = 2.0;
            currentB = 5.0;
            updateDisplay();
        });
        
        // Add hover effects
        ['animate-btn-bunny', 'gradient-step-btn', 'reset-btn-bunny'].forEach(id => {
            const btn = document.getElementById(id);
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-2px)';
                btn.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0)';
                btn.style.boxShadow = 'none';
            });
        });
        
        // Initialize
        updateDisplay();
    }, 100);
}