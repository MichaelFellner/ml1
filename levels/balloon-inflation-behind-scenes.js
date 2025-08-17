/**
 * Balloon Inflation Behind the Scenes
 * 
 * Shows the mathematical details of gradient descent for the balloon inflation level
 */

window.createBalloonInflationBehindScenes = function() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level" style="background: linear-gradient(to bottom, #000000, #1a1a1a);">
            <div class="level-content" style="padding: 8px; max-width: 1200px; margin: 0 auto; display: block !important; gap: 0 !important;">
                <h1 style="font-size: 2rem; margin: 0 !important; padding: 0 !important; text-align: center; color: white; line-height: 1.2;">🎈 Balloon Inflation: Behind the Mathematical Curtain</h1>
                
                <!-- Message at the top -->
                <div style="background: rgba(255,255,255,0.9); border-radius: 8px; padding: 8px 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center; margin: 12px 0 !important; display: block !important;">
                    <p style="margin: 0 !important; padding: 0 !important; font-size: 0.95rem; color: #333; line-height: 1.3;">Watch how gradient descent finds the right parameter value step by step, with all the math revealed!</p>
                </div>
                
                <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 15px; margin: 4px 0 0 0 !important; padding: 0 !important;">
                    <!-- Left Panel: Visualization -->
                    <div style="background: rgba(255,255,255,0.9); border-radius: 10px; padding: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h4 style="margin: 0 0 10px 0; color: #333;">Gradient Descent Visualization</h4>
                        
                        <!-- Graph Container -->
                        <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; position: relative; height: 300px;">
                            <canvas id="gradient-canvas" style="width: 100%; height: 100%; border: 1px solid #ddd; border-radius: 4px; background: white;"></canvas>
                        </div>
                        
                        <!-- Current State Display -->
                        <div style="margin-top: 15px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                <div>
                                    <div style="font-size: 0.9rem; color: #666;">Current w:</div>
                                    <div style="font-size: 1.5rem; font-weight: bold; color: #667eea;" id="current-w">1.0</div>
                                </div>
                                <div>
                                    <div style="font-size: 0.9rem; color: #666;">Target w:</div>
                                    <div style="font-size: 1.5rem; font-weight: bold; color: #2dd573;">7.0</div>
                                </div>
                            </div>
                            
                            <!-- Error Display -->
                            <div style="margin-top: 15px; padding: 10px; background: white; border-radius: 5px;">
                                <div style="font-size: 0.9rem; color: #666;">Error (w - target):</div>
                                <div style="font-size: 1.3rem; font-weight: bold; color: #ff6b6b;" id="error-display">-6.0</div>
                            </div>
                        </div>
                        
                        <!-- Step History -->
                        <div style="margin-top: 15px; padding: 10px; background: #f8f9fa; border-radius: 8px; max-height: 150px; overflow-y: auto;">
                            <div style="font-size: 0.9rem; color: #666; margin-bottom: 8px;">Step History:</div>
                            <div id="step-history" style="font-family: 'Courier New', monospace; font-size: 0.85rem;">
                                <div style="color: #999;">No steps taken yet...</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right Panel: Controls and Math -->
                    <div style="background: rgba(255,255,255,0.9); border-radius: 10px; padding: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h4 style="margin: 0 0 10px 0; color: #333;">Mathematical Details</h4>
                        
                        <!-- Current Equation -->
                        <div style="background: #f8f9fa; border: 2px solid #667eea; border-radius: 8px; padding: 15px; margin-bottom: 15px;">
                            <div style="font-size: 0.9rem; color: #666; margin-bottom: 8px;">Update Equation:</div>
                            <div style="font-family: 'Courier New', monospace; font-size: 1.1rem; color: #333;">
                                w_new = w - <span id="lr-in-equation" style="color: #ff6b6b; font-weight: bold;">0.5</span> × gradient
                            </div>
                            <div style="font-size: 0.85rem; color: #666; margin-top: 8px;">
                                gradient = ∂Error/∂w = 2 × (predicted - actual) × input
                            </div>
                        </div>
                        
                        <!-- Test Balloon Selection -->
                        <div style="background: #f8f9fa; border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                            <div style="font-size: 0.9rem; color: #666; margin-bottom: 10px;">Test Balloon Size:</div>
                            <div style="display: flex; gap: 8px; justify-content: center;">
                                <button class="balloon-size-btn" data-size="1" style="padding: 6px 12px; background: white; color: #333; border: 2px solid #ddd; border-radius: 5px; cursor: pointer;">1</button>
                                <button class="balloon-size-btn" data-size="2" style="padding: 6px 12px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">2</button>
                                <button class="balloon-size-btn" data-size="3" style="padding: 6px 12px; background: white; color: #333; border: 2px solid #ddd; border-radius: 5px; cursor: pointer;">3</button>
                                <button class="balloon-size-btn" data-size="4" style="padding: 6px 12px; background: white; color: #333; border: 2px solid #ddd; border-radius: 5px; cursor: pointer;">4</button>
                            </div>
                        </div>
                        
                        <!-- Learning Rate Selection -->
                        <div style="background: #f8f9fa; border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                            <div style="font-size: 0.9rem; color: #666; margin-bottom: 10px;">Learning Rate (α):</div>
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;">
                                <button class="lr-btn" data-lr="0.1" style="padding: 8px; background: white; color: #333; border: 2px solid #ddd; border-radius: 5px; cursor: pointer; font-size: 0.9rem;">
                                    <div>0.1</div>
                                    <div style="font-size: 0.7rem; color: #999;">Slow</div>
                                </button>
                                <button class="lr-btn" data-lr="0.5" style="padding: 8px; background: #ff6b6b; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 0.9rem;">
                                    <div>0.5</div>
                                    <div style="font-size: 0.7rem;">Medium</div>
                                </button>
                                <button class="lr-btn" data-lr="1.0" style="padding: 8px; background: white; color: #333; border: 2px solid #ddd; border-radius: 5px; cursor: pointer; font-size: 0.9rem;">
                                    <div>1.0</div>
                                    <div style="font-size: 0.7rem; color: #999;">Fast</div>
                                </button>
                            </div>
                        </div>
                        
                        <!-- Gradient Calculation Display -->
                        <div style="background: rgba(255,215,0,0.1); border: 2px solid rgba(255,215,0,0.3); border-radius: 8px; padding: 12px; margin-bottom: 15px;">
                            <div style="font-size: 0.9rem; color: #666; margin-bottom: 8px;">Current Gradient Calculation:</div>
                            <div id="gradient-calc" style="font-family: 'Courier New', monospace; font-size: 0.85rem; color: #333; line-height: 1.6;">
                                <div>Predicted = w × size = <span id="calc-predicted">2.0</span></div>
                                <div>Actual = 7 × size = <span id="calc-actual">14.0</span></div>
                                <div>Error = predicted - actual = <span id="calc-error">-12.0</span></div>
                                <div>Gradient = 2 × error × size = <span id="calc-gradient">-48.0</span></div>
                                <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #ddd;">
                                    <strong>Update = -α × gradient = <span id="calc-update" style="color: #2dd573;">24.0</span></strong>
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
                            🎬 Animate to Solution
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
                            Reset
                        </button>
                    </div>
                </div>
                
                ${typeof createStandardNavigation === 'function' ? createStandardNavigation() : ''}
            </div>
        </div>
    `;
    
    // Initialize navigation
    if (typeof initializeNavigation === 'function') {
        initializeNavigation('balloon-inflation-behind-scenes', 'createBalloonInflationBehindScenes');
    }
    
    // Setup functionality
    setTimeout(() => {
        let w = 1.0;
        const targetW = 7.0;
        let balloonSize = 2;
        let learningRate = 0.5;
        let history = [];
        let isAnimating = false;
        
        function updateCalculations() {
            const predicted = w * balloonSize;
            const actual = targetW * balloonSize;
            const error = predicted - actual;
            const gradient = 2 * error * balloonSize;
            const update = -learningRate * gradient;
            
            // Update displays
            document.getElementById('current-w').textContent = w.toFixed(2);
            document.getElementById('error-display').textContent = (w - targetW).toFixed(2);
            
            // Update calculation display
            document.getElementById('calc-predicted').textContent = predicted.toFixed(2);
            document.getElementById('calc-actual').textContent = actual.toFixed(2);
            document.getElementById('calc-error').textContent = error.toFixed(2);
            document.getElementById('calc-gradient').textContent = gradient.toFixed(2);
            document.getElementById('calc-update').textContent = update.toFixed(2);
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
            ctx.moveTo(padding, padding);
            ctx.lineTo(padding, canvas.height - padding);
            ctx.lineTo(canvas.width - padding, canvas.height - padding);
            ctx.stroke();
            
            // Draw error function (parabola)
            ctx.strokeStyle = '#ddd';
            ctx.lineWidth = 1;
            ctx.beginPath();
            
            const wMin = 0;
            const wMax = 14;
            const steps = 100;
            
            for (let i = 0; i <= steps; i++) {
                const wVal = wMin + (wMax - wMin) * i / steps;
                const error = Math.pow(wVal - targetW, 2);
                
                const x = padding + (wVal / wMax) * graphWidth;
                const y = canvas.height - padding - (1 - error / 49) * graphHeight;
                
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
            
            // Draw target point
            const targetX = padding + (targetW / wMax) * graphWidth;
            const targetY = canvas.height - padding;
            
            ctx.fillStyle = '#2dd573';
            ctx.beginPath();
            ctx.arc(targetX, targetY, 6, 0, 2 * Math.PI);
            ctx.fill();
            
            // Draw current point
            const currentX = padding + (w / wMax) * graphWidth;
            const currentError = Math.pow(w - targetW, 2);
            const currentY = canvas.height - padding - (1 - currentError / 49) * graphHeight;
            
            ctx.fillStyle = '#667eea';
            ctx.beginPath();
            ctx.arc(currentX, currentY, 8, 0, 2 * Math.PI);
            ctx.fill();
            
            // Draw trajectory
            if (history.length > 1) {
                ctx.strokeStyle = 'rgba(102, 126, 234, 0.3)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                
                for (let i = 0; i < history.length; i++) {
                    const wVal = history[i];
                    const error = Math.pow(wVal - targetW, 2);
                    const x = padding + (wVal / wMax) * graphWidth;
                    const y = canvas.height - padding - (1 - error / 49) * graphHeight;
                    
                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                ctx.stroke();
            }
            
            // Labels
            ctx.fillStyle = '#666';
            ctx.font = '12px Arial';
            ctx.fillText('w', canvas.width - padding + 10, canvas.height - padding + 5);
            ctx.fillText('Error²', padding - 5, padding - 10);
            ctx.fillText('0', padding - 15, canvas.height - padding + 5);
            ctx.fillText('14', canvas.width - padding - 10, canvas.height - padding + 15);
        }
        
        function takeGradientStep() {
            
            const predicted = w * balloonSize;
            const actual = targetW * balloonSize;
            const error = predicted - actual;
            const gradient = 2 * error * balloonSize;
            const update = -learningRate * gradient;
            
            // Update w
            const oldW = w;
            w = Math.max(0, Math.min(14, w + update));
            
            // Add to history
            history.push(w);
            
            // Update step history display
            const historyDiv = document.getElementById('step-history');
            const stepInfo = document.createElement('div');
            stepInfo.style.color = '#333';
            stepInfo.innerHTML = `Step ${history.length}: w: ${oldW.toFixed(2)} → ${w.toFixed(2)} (Δ = ${update > 0 ? '+' : ''}${update.toFixed(3)})`;
            
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
            
            const animate = () => {
                if (Math.abs(w - targetW) < 0.01) {
                    isAnimating = false;
                    if (animateBtn) {
                        animateBtn.disabled = false;
                        animateBtn.style.opacity = '1';
                    }
                    return;
                }
                
                takeGradientStep();
                setTimeout(animate, 500);
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
            
            w = 1.0;
            history = [w];
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
        const balloonBtns = document.querySelectorAll('.balloon-size-btn');
        balloonBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                balloonSize = parseInt(btn.dataset.size);
                
                // Update button styles
                balloonBtns.forEach(b => {
                    if (b === btn) {
                        b.style.background = '#667eea';
                        b.style.color = 'white';
                        b.style.border = 'none';
                    } else {
                        b.style.background = 'white';
                        b.style.color = '#333';
                        b.style.border = '2px solid #ddd';
                    }
                });
                
                updateCalculations();
            });
        });
        
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
                
                document.getElementById('lr-in-equation').textContent = learningRate;
                updateCalculations();
            });
        });
        
        document.getElementById('step-btn').addEventListener('click', () => {
            if (!isAnimating) takeGradientStep();
        });
        document.getElementById('animate-btn').addEventListener('click', animateToSolution);
        document.getElementById('reset-btn').addEventListener('click', reset);
        
        // Initialize
        history.push(w);
        updateCalculations();
        drawGraph();
    }, 100);
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.createBalloonInflationBehindScenes;
}