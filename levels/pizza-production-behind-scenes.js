/**
 * Pizza Production Behind the Scenes
 * 
 * Shows the mathematical details of gradient descent for the pizza production level
 */

window.createPizzaProductionBehindScenes = function() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level" style="background: linear-gradient(to bottom, #000000, #1a1a1a);">
            <div class="level-content" style="padding: 8px; max-width: 1200px; margin: 0 auto; display: block !important; gap: 0 !important;">
                <h1 style="font-size: 2rem; margin: 0 !important; padding: 0 !important; text-align: center; color: white; line-height: 1.2;">🍕 Pizza Production: Two-Parameter Gradient Descent</h1>
                
                <!-- Message at the top -->
                <div style="background: rgba(255,255,255,0.9); border-radius: 8px; padding: 8px 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center; margin: 12px 0 !important; display: block !important;">
                    <p style="margin: 0 !important; padding: 0 !important; font-size: 0.95rem; color: #333; line-height: 1.3;">Visualize how gradient descent optimizes two parameters simultaneously in 2D parameter space!</p>
                </div>
                
                <div style="display: grid; grid-template-columns: 1.3fr 1fr; gap: 15px; margin: 4px 0 0 0 !important; padding: 0 !important;">
                    <!-- Left Panel: Visualization -->
                    <div style="background: rgba(255,255,255,0.9); border-radius: 10px; padding: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h4 style="margin: 0 0 10px 0; color: #333;">2D Parameter Space</h4>
                        
                        <!-- Graph Container -->
                        <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; position: relative; height: 350px;">
                            <canvas id="gradient-canvas" style="width: 100%; height: 100%; border: 1px solid #ddd; border-radius: 4px; background: white;"></canvas>
                        </div>
                        
                        <!-- Current State -->
                        <div style="margin-top: 15px; padding: 12px; background: #f8f9fa; border-radius: 8px;">
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; text-align: center;">
                                <div>
                                    <div style="font-size: 0.85rem; color: #666;">w1 (dough)</div>
                                    <div style="font-size: 1.3rem; font-weight: bold; color: #8d6e63;" id="current-w1">100</div>
                                </div>
                                <div>
                                    <div style="font-size: 0.85rem; color: #666;">w2 (cheese)</div>
                                    <div style="font-size: 1.3rem; font-weight: bold; color: #ffc107;" id="current-w2">200</div>
                                </div>
                                <div>
                                    <div style="font-size: 0.85rem; color: #666;">Output</div>
                                    <div style="font-size: 1.3rem; font-weight: bold; color: #ff6b6b;" id="current-output">7000</div>
                                </div>
                            </div>
                            
                            <div style="margin-top: 10px; padding: 10px; background: white; border-radius: 5px; text-align: center;">
                                <div style="font-size: 0.85rem; color: #666;">Error from target (18,320):</div>
                                <div style="font-size: 1.2rem; font-weight: bold; color: #ff6347;" id="error-display">-11,320</div>
                            </div>
                        </div>
                        
                        <!-- Step History -->
                        <div style="margin-top: 15px; padding: 10px; background: #f8f9fa; border-radius: 8px; max-height: 120px; overflow-y: auto;">
                            <div style="font-size: 0.9rem; color: #666; margin-bottom: 8px;">Optimization History:</div>
                            <div id="step-history" style="font-family: 'Courier New', monospace; font-size: 0.8rem;">
                                <div style="color: #999;">No steps taken yet...</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right Panel: Mathematical Details -->
                    <div style="background: rgba(255,255,255,0.9); border-radius: 10px; padding: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h4 style="margin: 0 0 10px 0; color: #333;">Gradient Calculations</h4>
                        
                        <!-- Update Equations -->
                        <div style="background: #f8f9fa; border: 2px solid #667eea; border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                            <div style="font-size: 0.85rem; color: #666; margin-bottom: 8px;">Update Rules:</div>
                            <div style="font-family: 'Courier New', monospace; font-size: 0.9rem; color: #333; line-height: 1.6;">
                                <div>w1_new = w1 - <span id="lr-display" style="color: #ff6b6b; font-weight: bold;">1.0</span> × ∇w1</div>
                                <div>w2_new = w2 - <span id="lr-display2" style="color: #ff6b6b; font-weight: bold;">1.0</span> × ∇w2</div>
                            </div>
                            <div style="font-size: 0.8rem; color: #666; margin-top: 8px; padding-top: 8px; border-top: 1px solid #ddd;">
                                ∇w1 = ∂Error/∂w1 = 2 × error × dough_batches<br>
                                ∇w2 = ∂Error/∂w2 = 2 × error × cheese_blocks<br>
                                <div style="margin-top: 5px; color: #999; font-size: 0.75rem;">
                                    Note: Actual updates are scaled for numerical stability
                                </div>
                            </div>
                        </div>
                        
                        <!-- Learning Rate Selection -->
                        <div style="background: #f8f9fa; border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                            <div style="font-size: 0.9rem; color: #666; margin-bottom: 10px;">Learning Rate (α):</div>
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;">
                                <button class="lr-btn" data-lr="0.5" style="padding: 8px; background: white; color: #333; border: 2px solid #ddd; border-radius: 5px; cursor: pointer; font-size: 0.85rem;">
                                    <div>0.5</div>
                                    <div style="font-size: 0.7rem; color: #999;">Slow</div>
                                </button>
                                <button class="lr-btn" data-lr="1.0" style="padding: 8px; background: #ff6b6b; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 0.85rem;">
                                    <div>1.0</div>
                                    <div style="font-size: 0.7rem;">Medium</div>
                                </button>
                                <button class="lr-btn" data-lr="2.0" style="padding: 8px; background: white; color: #333; border: 2px solid #ddd; border-radius: 5px; cursor: pointer; font-size: 0.85rem;">
                                    <div>2.0</div>
                                    <div style="font-size: 0.7rem; color: #999;">Fast</div>
                                </button>
                            </div>
                        </div>
                        
                        <!-- Detailed Gradient Calculation -->
                        <div style="background: rgba(255,215,0,0.1); border: 2px solid rgba(255,215,0,0.3); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                            <div style="font-size: 0.85rem; color: #666; margin-bottom: 8px;">Current Gradients:</div>
                            <div style="font-family: 'Courier New', monospace; font-size: 0.8rem; color: #333; line-height: 1.5;">
                                <div style="padding: 5px; background: white; border-radius: 4px; margin-bottom: 8px;">
                                    <strong>Inputs:</strong><br>
                                    Dough: 10 batches, Cheese: 30 blocks
                                </div>
                                <div style="padding: 5px; background: white; border-radius: 4px; margin-bottom: 8px;">
                                    <strong>Forward Pass:</strong><br>
                                    Output = <span id="calc-w1">100</span>×10 + <span id="calc-w2">200</span>×30<br>
                                    = <span id="calc-output">7000</span> units
                                </div>
                                <div style="padding: 5px; background: white; border-radius: 4px; margin-bottom: 8px;">
                                    <strong>Error:</strong><br>
                                    E = output - target = <span id="calc-error">-11320</span>
                                </div>
                                <div style="padding: 5px; background: rgba(102,126,234,0.1); border-radius: 4px;">
                                    <strong>Gradients:</strong><br>
                                    ∇w1 = 2×<span id="grad-error1">-11320</span>×10 = <span id="grad-w1">-226400</span><br>
                                    ∇w2 = 2×<span id="grad-error2">-11320</span>×30 = <span id="grad-w2">-679200</span><br>
                                    <div style="margin-top: 5px; padding-top: 5px; border-top: 1px solid #667eea;">
                                        Δw1 = -α×∇w1 = <span id="update-w1" style="color: #2dd573;">2264</span><br>
                                        Δw2 = -α×∇w2 = <span id="update-w2" style="color: #2dd573;">6792</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Control Buttons -->
                        <button id="step-btn" style="
                            width: 100%;
                            padding: 12px;
                            background: linear-gradient(135deg, #667eea, #764ba2);
                            color: white;
                            border: none;
                            border-radius: 8px;
                            font-size: 1rem;
                            font-weight: bold;
                            cursor: pointer;
                            margin-bottom: 10px;
                        ">
                            Take Gradient Step →
                        </button>
                        
                        <button id="animate-btn" style="
                            width: 100%;
                            padding: 12px;
                            background: linear-gradient(135deg, #28a745, #20c997);
                            color: white;
                            border: none;
                            border-radius: 8px;
                            font-size: 1rem;
                            font-weight: bold;
                            cursor: pointer;
                            margin-bottom: 10px;
                        ">
                            🎬 Animate Convergence
                        </button>
                        
                        <button id="reset-btn" style="
                            width: 100%;
                            padding: 10px;
                            background: #6c757d;
                            color: white;
                            border: none;
                            border-radius: 8px;
                            font-size: 0.9rem;
                            cursor: pointer;
                        ">
                            Reset Parameters
                        </button>
                    </div>
                </div>
                
                ${typeof createStandardNavigation === 'function' ? createStandardNavigation() : ''}
            </div>
        </div>
    `;
    
    // Initialize navigation
    if (typeof initializeNavigation === 'function') {
        initializeNavigation('pizza-production-behind-scenes', 'createPizzaProductionBehindScenes');
    }
    
    // Setup functionality
    setTimeout(() => {
        let w1 = 100;
        let w2 = 200;
        const targetOutput = 18320;
        let learningRate = 1.0;
        let history = [];
        let isAnimating = false;
        
        function updateCalculations() {
            const doughBatches = 10;
            const cheeseBlocks = 30;
            
            const output = w1 * doughBatches + w2 * cheeseBlocks;
            const error = output - targetOutput;
            
            // Display gradients (full mathematical form for educational purposes)
            const displayGradW1 = 2 * error * doughBatches;
            const displayGradW2 = 2 * error * cheeseBlocks;
            
            const displayUpdateW1 = -learningRate * displayGradW1;
            const displayUpdateW2 = -learningRate * displayGradW2;
            
            // Update displays
            document.getElementById('current-w1').textContent = Math.round(w1);
            document.getElementById('current-w2').textContent = Math.round(w2);
            document.getElementById('current-output').textContent = Math.round(output).toLocaleString();
            document.getElementById('error-display').textContent = 
                (error > 0 ? '+' : '') + Math.round(error).toLocaleString();
            
            // Update calculation display
            document.getElementById('calc-w1').textContent = Math.round(w1);
            document.getElementById('calc-w2').textContent = Math.round(w2);
            document.getElementById('calc-output').textContent = Math.round(output).toLocaleString();
            document.getElementById('calc-error').textContent = Math.round(error).toLocaleString();
            
            document.getElementById('grad-error1').textContent = Math.round(error).toLocaleString();
            document.getElementById('grad-error2').textContent = Math.round(error).toLocaleString();
            document.getElementById('grad-w1').textContent = Math.round(displayGradW1).toLocaleString();
            document.getElementById('grad-w2').textContent = Math.round(displayGradW2).toLocaleString();
            
            document.getElementById('update-w1').textContent = 
                (displayUpdateW1 > 0 ? '+' : '') + Math.round(displayUpdateW1).toLocaleString();
            document.getElementById('update-w2').textContent = 
                (displayUpdateW2 > 0 ? '+' : '') + Math.round(displayUpdateW2).toLocaleString();
        }
        
        function drawGraph() {
            const canvas = document.getElementById('gradient-canvas');
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            
            const padding = 40;
            const graphWidth = canvas.width - 2 * padding;
            const graphHeight = canvas.height - 2 * padding;
            
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw axes
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(padding, canvas.height - padding);
            ctx.lineTo(padding, padding);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(padding, canvas.height - padding);
            ctx.lineTo(canvas.width - padding, canvas.height - padding);
            ctx.stroke();
            
            // Draw contour lines (simplified)
            ctx.strokeStyle = '#e0e0e0';
            ctx.lineWidth = 1;
            
            const w1Max = 500;
            const w2Max = 800;
            const targetW1 = 280;
            const targetW2 = 520;
            
            // Draw concentric ellipses around target
            for (let scale = 0.2; scale <= 2; scale += 0.2) {
                ctx.beginPath();
                ctx.ellipse(
                    padding + (targetW1 / w1Max) * graphWidth,
                    canvas.height - padding - (targetW2 / w2Max) * graphHeight,
                    graphWidth * scale * 0.15,
                    graphHeight * scale * 0.15,
                    0, 0, 2 * Math.PI
                );
                ctx.stroke();
            }
            
            // Draw target point
            const targetX = padding + (targetW1 / w1Max) * graphWidth;
            const targetY = canvas.height - padding - (targetW2 / w2Max) * graphHeight;
            
            ctx.fillStyle = '#2dd573';
            ctx.beginPath();
            ctx.arc(targetX, targetY, 8, 0, 2 * Math.PI);
            ctx.fill();
            
            // Draw trajectory
            if (history.length > 0) {
                ctx.strokeStyle = 'rgba(102, 126, 234, 0.5)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                
                for (let i = 0; i < history.length; i++) {
                    const point = history[i];
                    const x = padding + (point.w1 / w1Max) * graphWidth;
                    const y = canvas.height - padding - (point.w2 / w2Max) * graphHeight;
                    
                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                ctx.stroke();
                
                // Draw points along trajectory
                for (let i = 0; i < history.length; i++) {
                    const point = history[i];
                    const x = padding + (point.w1 / w1Max) * graphWidth;
                    const y = canvas.height - padding - (point.w2 / w2Max) * graphHeight;
                    
                    ctx.fillStyle = i === history.length - 1 ? '#667eea' : 'rgba(102, 126, 234, 0.3)';
                    ctx.beginPath();
                    ctx.arc(x, y, i === history.length - 1 ? 8 : 4, 0, 2 * Math.PI);
                    ctx.fill();
                }
            }
            
            // Labels
            ctx.fillStyle = '#666';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('w1 (dough)', canvas.width / 2, canvas.height - 10);
            
            ctx.save();
            ctx.translate(15, canvas.height / 2);
            ctx.rotate(-Math.PI / 2);
            ctx.fillText('w2 (cheese)', 0, 0);
            ctx.restore();
            
            // Axis values
            ctx.font = '10px Arial';
            ctx.fillText('0', padding, canvas.height - padding + 15);
            ctx.fillText('500', canvas.width - padding, canvas.height - padding + 15);
            ctx.textAlign = 'right';
            ctx.fillText('0', padding - 5, canvas.height - padding);
            ctx.fillText('800', padding - 5, padding);
            
            // Mark target values
            ctx.strokeStyle = '#2dd573';
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 5]);
            
            ctx.beginPath();
            ctx.moveTo(targetX, canvas.height - padding);
            ctx.lineTo(targetX, targetY);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(padding, targetY);
            ctx.lineTo(targetX, targetY);
            ctx.stroke();
            
            ctx.setLineDash([]);
            
            // Target labels
            ctx.fillStyle = '#2dd573';
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('280', targetX, canvas.height - padding + 25);
            ctx.textAlign = 'right';
            ctx.fillText('520', padding - 10, targetY);
        }
        
        function takeGradientStep() {
            
            const doughBatches = 10;
            const cheeseBlocks = 30;
            
            const output = w1 * doughBatches + w2 * cheeseBlocks;
            const error = output - targetOutput;
            
            // Use proper MSE gradients (scaled down for stability)
            // MSE gradient: ∂MSE/∂w = 2/n * (predicted - actual) * input
            // We'll use a small scaling factor for numerical stability
            const scale = 0.0001;  // Scaling factor for gradients
            const gradW1 = error * doughBatches * scale;
            const gradW2 = error * cheeseBlocks * scale;
            
            const updateW1 = -learningRate * gradW1;
            const updateW2 = -learningRate * gradW2;
            
            // Update parameters
            const oldW1 = w1;
            const oldW2 = w2;
            
            w1 = Math.max(0, Math.min(500, w1 + updateW1));
            w2 = Math.max(0, Math.min(800, w2 + updateW2));
            
            // Add to history
            history.push({ w1: w1, w2: w2 });
            
            // Update step history display
            const historyDiv = document.getElementById('step-history');
            const stepInfo = document.createElement('div');
            stepInfo.style.color = '#333';
            stepInfo.innerHTML = `Step ${history.length - 1}: w1: ${Math.round(oldW1)}→${Math.round(w1)}, w2: ${Math.round(oldW2)}→${Math.round(w2)}`;
            
            if (historyDiv.children[0].style.color === '#999') {
                historyDiv.innerHTML = '';
            }
            historyDiv.appendChild(stepInfo);
            historyDiv.scrollTop = historyDiv.scrollHeight;
            
            // Update displays
            updateCalculations();
            drawGraph();
        }
        
        function animateToSolution() {
            if (isAnimating) return;
            
            isAnimating = true;
            const animateBtn = document.getElementById('animate-btn');
            if (animateBtn) {
                animateBtn.disabled = true;
                animateBtn.style.opacity = '0.5';
            }
            
            let steps = 0;
            const maxSteps = 100;
            
            const animate = () => {
                const doughBatches = 10;
                const cheeseBlocks = 30;
                const output = w1 * doughBatches + w2 * cheeseBlocks;
                
                if (Math.abs(output - targetOutput) < 80 || steps >= maxSteps) {
                    isAnimating = false;
                    if (animateBtn) {
                        animateBtn.disabled = false;
                        animateBtn.style.opacity = '1';
                    }
                    return;
                }
                
                takeGradientStep();
                steps++;
                setTimeout(animate, 200);
            };
            
            animate();
        }
        
        function reset() {
            // Stop any ongoing animation
            if (isAnimating) {
                isAnimating = false;
                const animateBtn = document.getElementById('animate-btn');
                if (animateBtn) {
                    animateBtn.disabled = false;
                    animateBtn.style.opacity = '1';
                }
            }
            
            w1 = 100;
            w2 = 200;
            history = [{ w1: w1, w2: w2 }];
            isAnimating = false;
            
            const historyDiv = document.getElementById('step-history');
            if (historyDiv) {
                historyDiv.innerHTML = '<div style="color: #999;">No steps taken yet...</div>';
            }
            
            const animateBtn = document.getElementById('animate-btn');
            if (animateBtn) {
                animateBtn.disabled = false;
                animateBtn.style.opacity = '1';
            }
            
            updateCalculations();
            drawGraph();
        }
        
        // Setup event listeners
        const lrBtns = document.querySelectorAll('.lr-btn');
        lrBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                learningRate = parseFloat(btn.dataset.lr);
                
                // Update button styles
                lrBtns.forEach(b => {
                    if (b === btn) {
                        b.style.background = '#ff6b6b';
                        b.style.color = 'white';
                        b.style.border = 'none';
                    } else {
                        b.style.background = 'white';
                        b.style.color = '#333';
                        b.style.border = '2px solid #ddd';
                    }
                });
                
                document.getElementById('lr-display').textContent = learningRate;
                document.getElementById('lr-display2').textContent = learningRate;
                updateCalculations();
            });
        });
        
        document.getElementById('step-btn').addEventListener('click', () => {
            if (!isAnimating) takeGradientStep();
        });
        document.getElementById('animate-btn').addEventListener('click', animateToSolution);
        document.getElementById('reset-btn').addEventListener('click', reset);
        
        // Initialize
        history.push({ w1: w1, w2: w2 });
        updateCalculations();
        drawGraph();
    }, 100);
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.createPizzaProductionBehindScenes;
}