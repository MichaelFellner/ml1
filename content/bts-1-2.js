

function createBehindTheScenesSimple() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level" style="background: linear-gradient(to bottom, #000000, #1a1a1a);">
            <div class="level-content" style="padding: 8px; max-width: 1200px; margin: 0 auto; display: block !important; gap: 0 !important;">
                <h1 style="font-size: 2rem; margin: 0 !important; padding: 0 !important; text-align: center; color: white; line-height: 1.2;">Behind the Scenes: How the Robot Loss is Calculated</h1>
                
                <!-- Message at the top -->
                <div style="background: rgba(255,255,255,0.9); border-radius: 8px; padding: 8px 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center; margin: 12px 0 !important; display: block !important;">
                    <p style="margin: 0 !important; padding: 0 !important; font-size: 0.95rem; color: #333; line-height: 1.3;">We just saw that we needed to tune the energy to 75 to get 0 loss, but here's the math behind the scenes for why.</p>
                </div>
                
                <div style="display: grid; grid-template-columns: 3fr 2fr; gap: 15px; margin: 4px 0 0 0 !important; padding: 0 !important;">
                    <!-- Left side: Loss Function Graph -->
                    <div style="background: rgba(255,255,255,0.9); border-radius: 10px; padding: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-align: center;">
                        <h2 style="margin: 0 0 8px 0; color: #333; font-size: 1.1rem;">Loss Function: |Energy - 75|</h2>
                        
                        <!-- Graph Canvas -->
                        <div style="position: relative; height: 380px; background: #f8f9fa; border-radius: 8px; padding: 10px; margin-bottom: 0; border: 1px solid #e9ecef;">
                            <canvas id="loss-graph" width="500" height="380" style="width: 500px; height: 380px; display: block;"></canvas>
                            <!-- Current point indicator -->
                            <div id="current-point" style="position: absolute; width: 12px; height: 12px; background: #ff6347; border-radius: 50%; transform: translate(-50%, -50%); transition: all 0.3s ease; box-shadow: 0 0 10px rgba(255,99,71,0.8); pointer-events: none;"></div>
                        </div>
                    </div>
                    
                    <!-- Right side: Controls and Info (same as Level 1) -->
                    <div style="background: rgba(255,255,255,0.9); border-radius: 10px; padding: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h2 style="margin: 0 0 12px 0; color: #333; font-size: 1.1rem;">Control Panel</h2>
                        
                        <!-- Energy Control -->
                        <div style="margin-bottom: 15px;">
                            <label style="font-weight: bold; color: #555; display: block; margin-bottom: 8px;">
                                Energy Level: <span id="energy-value" style="color: #667eea; font-size: 1.1rem;">50</span>
                            </label>
                            <input type="range" id="energy-slider" min="0" max="100" value="50" style="width: 100%; height: 8px; border-radius: 4px; background: #ddd; outline: none; cursor: pointer; -webkit-appearance: none;"/>
                            <style>
                                #energy-slider::-webkit-slider-thumb {
                                    -webkit-appearance: none;
                                    appearance: none;
                                    width: 20px;
                                    height: 20px;
                                    background: #667eea;
                                    border-radius: 50%;
                                    cursor: pointer;
                                    box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
                                }
                                #energy-slider::-moz-range-thumb {
                                    width: 20px;
                                    height: 20px;
                                    background: #667eea;
                                    border-radius: 50%;
                                    cursor: pointer;
                                    box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
                                    border: none;
                                }
                            </style>
                        </div>
                        
                        <!-- Status Display -->
                        <div style="display: grid; gap: 10px;">
                            <div style="padding: 12px; background: rgba(102,126,234,0.1); border-radius: 8px; border: 1px solid rgba(102,126,234,0.3);">
                                <div style="font-weight: bold; color: #667eea; margin-bottom: 3px; font-size: 0.9rem;">Current Energy</div>
                                <div id="current-energy-display" style="font-size: 1.4rem; color: #333;">50</div>
                            </div>
                            
                            <div id="loss-display" style="padding: 12px; background: rgba(255,99,71,0.1); border-radius: 8px; border: 1px solid rgba(255,99,71,0.3);">
                                <div style="font-weight: bold; color: #ff6347; margin-bottom: 3px; font-size: 0.9rem;">Loss (Distance from Target)</div>
                                <div id="loss-value" style="font-size: 1.4rem; color: #333;">25</div>
                                <div style="font-size: 0.85rem; color: #666; margin-top: 3px;">|50 - 75| = 25</div>
                            </div>
                            
                        </div>
                        
                        <!-- Hints -->
                        <div id="hint-box" style="margin-top: 12px; padding: 10px; background: rgba(243,150,10,0.1); border-radius: 8px; border: 1px solid rgba(243,150,10,0.3);">
                            <div style="display: flex; align-items: center; gap: 6px;">
                                <div>
                                    <strong style="color: #f3960a; font-size: 0.85rem;">About Absolute Value:</strong>
                                    <span style="color: #666; font-size: 0.8rem;">The | | symbols mean "absolute value" which means to drop the negative sign if the number is negative. Loss should always be 0 or higher.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                

                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('ip2a', 'createBehindTheScenesSimple');
    
    // Add functionality
    setTimeout(() => {
        const canvas = document.getElementById('loss-graph');
        const ctx = canvas ? canvas.getContext('2d') : null;
        const slider = document.getElementById('energy-slider');
        const energyValue = document.getElementById('energy-value');
        const currentEnergyDisplay = document.getElementById('current-energy-display');
        const lossValue = document.getElementById('loss-value');
        const lossDisplay = document.getElementById('loss-display');
        const currentPoint = document.getElementById('current-point');
        
        // Set canvas size
        if (canvas) {
            canvas.width = 500;
            canvas.height = 380;
        }
        
        function drawGraph(energy) {
            if (!ctx || !canvas) return;
            
            const width = canvas.width;
            const height = canvas.height;
            const padding = 40;
            
            // Clear canvas
            ctx.fillStyle = '#f8f9fa';
            ctx.fillRect(0, 0, width, height);
            
            // Draw grid lines
            ctx.strokeStyle = '#e9ecef';
            ctx.lineWidth = 1;
            // Vertical grid lines
            for (let i = 0; i <= 10; i++) {
                const x = padding + (i / 10) * (width - 2 * padding);
                ctx.beginPath();
                ctx.moveTo(x, padding);
                ctx.lineTo(x, height - padding);
                ctx.stroke();
            }
            // Horizontal grid lines
            for (let i = 0; i <= 8; i++) {
                const y = padding + (i / 8) * (height - 2 * padding);
                ctx.beginPath();
                ctx.moveTo(padding, y);
                ctx.lineTo(width - padding, y);
                ctx.stroke();
            }
            
            // Draw axes
            ctx.strokeStyle = '#666';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(padding, height - padding);
            ctx.lineTo(width - padding, height - padding); // X axis
            ctx.moveTo(padding, padding);
            ctx.lineTo(padding, height - padding); // Y axis
            ctx.stroke();
            
            // Draw labels
            ctx.fillStyle = '#333';
            ctx.font = '12px Arial';
            // X-axis labels
            ctx.fillText('0', padding - 5, height - padding + 20);
            ctx.fillText('25', padding + (width - 2 * padding) * 0.25 - 5, height - padding + 20);
            ctx.fillText('50', padding + (width - 2 * padding) * 0.5 - 5, height - padding + 20);
            ctx.fillText('75', padding + (width - 2 * padding) * 0.75 - 5, height - padding + 20);
            ctx.fillText('100', width - padding - 10, height - padding + 20);
            
            // Y-axis labels
            ctx.fillText('0', padding - 20, height - padding + 5);
            ctx.fillText('25', padding - 25, height - padding - (height - 2 * padding) * 0.33);
            ctx.fillText('50', padding - 25, height - padding - (height - 2 * padding) * 0.67);
            ctx.fillText('75', padding - 25, padding + 5);
            
            // Axis titles
            ctx.font = '14px Arial';
            ctx.fillText('Energy (x)', width / 2 - 25, height - 5);
            ctx.save();
            ctx.translate(12, height / 2);
            ctx.rotate(-Math.PI / 2);
            ctx.fillText('Loss', -15, 0);
            ctx.restore();
            
            // Draw the V-shaped absolute value function
            ctx.strokeStyle = '#667eea';
            ctx.lineWidth = 3;
            ctx.beginPath();
            
            const xScale = (width - 2 * padding) / 100;
            const yScale = (height - 2 * padding) / 75; // Max loss is 75
            
            for (let x = 0; x <= 100; x += 0.5) {
                const loss = Math.abs(x - 75);
                const xPos = padding + x * xScale;
                const yPos = height - padding - loss * yScale;
                
                if (x === 0) {
                    ctx.moveTo(xPos, yPos);
                } else {
                    ctx.lineTo(xPos, yPos);
                }
            }
            ctx.stroke();
            
            // Draw minimum point marker (at x=75, y=0)
            const minX = padding + 75 * xScale;
            const minY = height - padding;
            ctx.fillStyle = '#2dd573';
            ctx.beginPath();
            ctx.arc(minX, minY, 5, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw vertical dashed line at x=75
            ctx.strokeStyle = 'rgba(45, 213, 115, 0.3)';
            ctx.setLineDash([5, 5]);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(minX, padding);
            ctx.lineTo(minX, height - padding);
            ctx.stroke();
            ctx.setLineDash([]);
            
            // Add label for minimum
            ctx.fillStyle = '#2dd573';
            ctx.font = '11px Arial';
            ctx.fillText('Min at x=75', minX - 30, padding + 20);
            
            // Update current point position
            const currentX = padding + energy * xScale;
            const currentY = height - padding - Math.abs(energy - 75) * yScale;
            if (currentPoint) {
                // Add 10px to account for the container's padding
                currentPoint.style.left = (currentX + 10) + 'px';
                currentPoint.style.top = (currentY + 10) + 'px';
                
                // Change dot color based on loss
                const loss = Math.abs(energy - 75);
                if (loss === 0) {
                    currentPoint.style.background = '#2dd573';
                    currentPoint.style.boxShadow = '0 0 20px rgba(45,213,115,0.8)';
                } else if (loss < 10) {
                    currentPoint.style.background = '#f3960a';
                    currentPoint.style.boxShadow = '0 0 15px rgba(243,150,10,0.8)';
                } else {
                    currentPoint.style.background = '#ff6347';
                    currentPoint.style.boxShadow = '0 0 10px rgba(255,99,71,0.8)';
                }
            }
            
            // Draw vertical line from current point to x-axis
            ctx.strokeStyle = 'rgba(255, 99, 71, 0.3)';
            ctx.setLineDash([3, 3]);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(currentX, currentY);
            ctx.lineTo(currentX, height - padding);
            ctx.stroke();
            ctx.setLineDash([]);
        }
        
        function updateDisplay(energy) {
            const loss = Math.abs(energy - 75);
            
            // Update text displays
            if (energyValue) energyValue.textContent = energy;
            if (currentEnergyDisplay) currentEnergyDisplay.textContent = energy;
            if (lossValue) {
                lossValue.textContent = loss.toFixed(0);
                const lossExplanation = lossValue.nextElementSibling;
                if (lossExplanation) {
                    lossExplanation.textContent = `|${energy} - 75| = ${loss.toFixed(0)}`;
                }
            }
            
            // Draw the graph with current point
            drawGraph(energy);
            
            // Update loss display background
            if (lossDisplay) {
                if (loss === 0) {
                    lossDisplay.style.background = 'rgba(45,213,115,0.1)';
                    lossDisplay.style.borderColor = 'rgba(45,213,115,0.3)';
                } else if (loss < 10) {
                    lossDisplay.style.background = 'rgba(243,150,10,0.1)';
                    lossDisplay.style.borderColor = 'rgba(243,150,10,0.3)';
                } else {
                    lossDisplay.style.background = 'rgba(255,99,71,0.1)';
                    lossDisplay.style.borderColor = 'rgba(255,99,71,0.3)';
                }
            }
        }
        
        // Initialize
        updateDisplay(50);
        
        // Add slider event listener
        if (slider) {
            slider.addEventListener('input', (e) => {
                updateDisplay(parseInt(e.target.value));
            });
        }
    }, 100);
}

function createBehindTheScenesLevel1() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content" style="padding: 8px; max-width: 1200px; margin: 0 auto; display: block !important; gap: 0 !important; flex-direction: unset !important; align-items: unset !important;">
                <h1 style="font-size: 1.9rem; margin: 0 !important; padding: 0 !important; background: linear-gradient(45deg, #667eea, #764ba2); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent; line-height: 1.2;">Alternative Loss Functions</h1>
                
                <div style="background: rgba(255,255,255,0.5); border-radius: 8px; padding: 10px; margin: 4px 0 !important; display: block !important;">
                    <p style="color: #555; font-size: 0.95rem; line-height: 1.4; margin: 0 !important; padding: 0 !important;">Loss functions can come in other forms too. We just witnessed "absolute loss" where loss is equal to the absolute distance that the current guess is from the true value. But loss can also be calculated using the formula: <b>(Guess - True)²</b>. This 
                    is known as <strong>mean squared error loss</strong>.</p>
                </div>
                
                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 15px; margin: 4px 0 0 0 !important; padding: 0 !important;">
                    <!-- Left side: Graph Visualization -->
                    <div style="background: rgba(255,255,255,0.5); border-radius: 8px; padding: 12px;">
                        <h3 style="color: #333; margin: 0 0 10px 0; text-align: center; font-size: 1.05rem;">Loss Function: (Energy - 75)²</h3>
                        <div style="position: relative; height: 320px; background: #f8f9fa; border-radius: 8px; overflow: hidden; border: 1px solid #e9ecef;">
                            <!-- Canvas for the graph -->
                            <canvas id="loss-graph" width="600" height="320" style="width: 100%; height: 100%;"></canvas>
                            <!-- Current point indicator -->
                            <div id="current-point" style="position: absolute; width: 12px; height: 12px; background: #ff6347; border-radius: 50%; transform: translate(-50%, -50%); transition: all 0.3s ease; box-shadow: 0 0 10px rgba(255,99,71,0.8);"></div>
                        </div>
                        
                        <!-- Energy slider -->
                        <div style="margin-top: 12px;">
                            <label style="color: #333; font-weight: bold; display: block; margin-bottom: 8px;">
                                Energy Level: <span id="energy-value" style="color: #667eea; font-size: 1.1rem;">50</span>
                            </label>
                            <input type="range" id="energy-slider" min="0" max="100" value="50" 
                                   style="width: 100%; height: 8px; border-radius: 4px; background: #ddd; outline: none; cursor: pointer; -webkit-appearance: none;"/>
                            <style>
                                #energy-slider::-webkit-slider-thumb {
                                    -webkit-appearance: none;
                                    appearance: none;
                                    width: 20px;
                                    height: 20px;
                                    background: #667eea;
                                    border-radius: 50%;
                                    cursor: pointer;
                                    box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
                                }
                                #energy-slider::-moz-range-thumb {
                                    width: 20px;
                                    height: 20px;
                                    background: #667eea;
                                    border-radius: 50%;
                                    cursor: pointer;
                                    box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
                                    border: none;
                                }
                            </style>
                        </div>
                    </div>
                    
                    <!-- Right side: Info Panel -->
                    <div style="background: rgba(255,255,255,0.5); border-radius: 8px; padding: 12px;">
                        <h3 style="color: #333; margin: 0 0 12px 0; font-size: 1.05rem;">📊 Mathematical Details</h3>
                        
                        <div style="margin-bottom: 12px; padding: 10px; background: rgba(102,126,234,0.1); border-radius: 6px; border: 1px solid rgba(102,126,234,0.3);">
                            <div style="color: #667eea; font-weight: bold; margin-bottom: 2px; font-size: 0.85rem;">Current Energy:</div>
                            <div id="current-energy" style="color: #333; font-size: 1.4rem;">50</div>
                        </div>
                        
                        <div style="margin-bottom: 12px; padding: 10px; background: rgba(255,99,71,0.1); border-radius: 6px; border: 1px solid rgba(255,99,71,0.3);">
                            <div style="color: #ff6347; font-weight: bold; margin-bottom: 2px; font-size: 0.85rem;">Current Loss:</div>
                            <div id="current-loss" style="color: #333; font-size: 1.4rem;">625</div>
                            <div style="color: #666; font-size: 0.8rem; margin-top: 2px;">(50 - 75)² = 625</div>
                        </div>
                        
                        
                        
                        <div style="margin-top: 12px; padding: 10px; background: rgba(118,75,162,0.1); border-radius: 6px; border: 1px solid rgba(118,75,162,0.3);">
                            <div style="color: #764ba2; font-weight: bold; margin-bottom: 5px; font-size: 0.85rem;">Insight:</div>
                            <p style="color: #555; font-size: 0.8rem; line-height: 1.3; margin: 0;">Because the loss calculation is always squared, the loss can never be negative. We want the lowest possible loss to be zero.</p>
                        </div>
                    </div>
                </div>
                
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('ip2b', 'createBehindTheScenesLevel1');
    
    // Add graph functionality
    setTimeout(() => {
        const canvas = document.getElementById('loss-graph');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const slider = document.getElementById('energy-slider');
        const energyValue = document.getElementById('energy-value');
        const currentEnergy = document.getElementById('current-energy');
        const currentLoss = document.getElementById('current-loss');
        const currentPoint = document.getElementById('current-point');
        
        // Set canvas size
        canvas.width = canvas.offsetWidth;
        canvas.height = 320;
        
        function drawGraph(energy) {
            const width = canvas.width;
            const height = canvas.height;
            const padding = 40;
            
            // Clear canvas
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.fillRect(0, 0, width, height);
            
            // Draw axes
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(padding, height - padding);
            ctx.lineTo(width - padding, height - padding); // X axis
            ctx.moveTo(padding, padding);
            ctx.lineTo(padding, height - padding); // Y axis
            ctx.stroke();
            
            // Draw labels
            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.font = '12px Arial';
            ctx.fillText('0', padding - 20, height - padding + 5);
            ctx.fillText('100', width - padding - 10, height - padding + 20);
            ctx.fillText('Energy', width / 2 - 20, height - 10);
            ctx.fillText('Loss', 5, 20);
            
            // Draw the parabola
            ctx.strokeStyle = '#667eea';
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            const xScale = (width - 2 * padding) / 100;
            const maxLoss = Math.pow(75, 2); // Maximum loss at x=0 or x=100
            const yScale = (height - 2 * padding) / maxLoss;
            
            for (let x = 0; x <= 100; x += 0.5) {
                const loss = Math.pow(x - 75, 2);
                const xPos = padding + x * xScale;
                const yPos = height - padding - loss * yScale;
                
                if (x === 0) {
                    ctx.moveTo(xPos, yPos);
                } else {
                    ctx.lineTo(xPos, yPos);
                }
            }
            ctx.stroke();
            
            // Draw minimum point marker
            const minX = padding + 75 * xScale;
            const minY = height - padding;
            ctx.fillStyle = '#2dd573';
            ctx.beginPath();
            ctx.arc(minX, minY, 5, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw vertical line at x=75
            ctx.strokeStyle = 'rgba(45, 213, 115, 0.3)';
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(minX, padding);
            ctx.lineTo(minX, height - padding);
            ctx.stroke();
            ctx.setLineDash([]);
            
            // Update current point position
            const currentX = padding + energy * xScale;
            const currentY = height - padding - Math.pow(energy - 75, 2) * yScale;
            if (currentPoint) {
                currentPoint.style.left = currentX + 'px';
                currentPoint.style.top = currentY + 'px';
            }
            
            // Draw line from current point to bottom
            ctx.strokeStyle = 'rgba(255, 99, 71, 0.5)';
            ctx.setLineDash([3, 3]);
            ctx.beginPath();
            ctx.moveTo(currentX, currentY);
            ctx.lineTo(currentX, height - padding);
            ctx.stroke();
            ctx.setLineDash([]);
        }
        
        function updateValues(energy) {
            const loss = Math.pow(energy - 75, 2);
            
            if (energyValue) energyValue.textContent = energy;
            if (currentEnergy) currentEnergy.textContent = energy;
            if (currentLoss) {
                currentLoss.textContent = loss.toFixed(0);
                const lossExplanation = currentLoss.nextElementSibling;
                if (lossExplanation) {
                    lossExplanation.textContent = `(${energy} - 75)² = ${loss.toFixed(0)}`;
                }
            }
            
            drawGraph(energy);
            
            // Change dot color based on loss
            if (currentPoint) {
                if (loss === 0) {
                    currentPoint.style.background = '#2dd573';
                    currentPoint.style.boxShadow = '0 0 20px rgba(45,213,115,0.8)';
                } else if (loss < 100) {
                    currentPoint.style.background = '#f3960a';
                    currentPoint.style.boxShadow = '0 0 15px rgba(243,150,10,0.8)';
                } else {
                    currentPoint.style.background = '#ff6347';
                    currentPoint.style.boxShadow = '0 0 10px rgba(255,99,71,0.8)';
                }
            }
        }
        
        // Initialize
        updateValues(50);
        
        // Add slider event listener
        if (slider) {
            slider.addEventListener('input', (e) => {
                updateValues(parseInt(e.target.value));
            });
        }
        
        // Animate to show the concept
        setTimeout(() => {
            if (slider) {
                let value = 50;
                const animateInterval = setInterval(() => {
                    value += 2;
                    if (value >= 75) {
                        value = 75;
                        clearInterval(animateInterval);
                    }
                    slider.value = value;
                    updateValues(value);
                }, 50);
            }
        }, 1000);
    }, 100);
}

// Behind the Scenes functions for Balloon and Bunny scenarios

// =============================================================================
// BEHIND THE SCENES: BALLOON FUNCTION MOVEMENT
// =============================================================================

function createBehindTheScenesBalloon() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level" style="background: linear-gradient(to bottom, #000000, #1a1a1a);">
            <div class="level-content" style="padding: 8px; max-width: 1200px; margin: 0 auto; display: block !important; gap: 0 !important;">
                <h1 style="font-size: 2rem; margin: 0 !important; padding: 0 !important; text-align: center; color: white; line-height: 1.2;">Behind the Scenes: Graphical Representation of Balloon Function</h1>
                
                <!-- Message at the top -->
                <div style="background: rgba(255,255,255,0.9); border-radius: 8px; padding: 8px 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center; margin: 12px 0 !important; display: block !important;">
                    <p style="margin: 0 !important; padding: 0 !important; font-size: 0.95rem; color: #333; line-height: 1.3;">We can see a graph of the <strong>f(x) = w·x</strong> function below. Optimizing w is like adjusting the slope of a line!</p>
                </div>
                
                <div style="display: grid; grid-template-columns: 3fr 2fr; gap: 15px; margin: 4px 0 0 0 !important; padding: 0 !important;">
                    <!-- Left side: Function Graph -->
                    <div style="background: rgba(255,255,255,0.9); border-radius: 10px; padding: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h2 style="margin: 0 0 10px 0; color: #333; font-size: 1.1rem; text-align: center;">f(x) = w·x</h2>
                        
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
                        <h2 style="margin: 0 0 12px 0; color: #333; font-size: 1.1rem;">Notes</h2>
                        
                
                        
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
                            <div style="color: #2dd573; font-weight: bold; margin-bottom: 5px; font-size: 0.9rem;">Insight:</div>
                            <p style="color: #555; font-size: 0.85rem; line-height: 1.4; margin: 0;">
                                The red dotted lines representing the loss for different sized balloons. Above we can calculate the total loss by adding the loss for 
                                each balloon!
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
                    <p style="margin: 0 !important; padding: 0 !important; font-size: 0.95rem; color: #333; line-height: 1.3;">With both a <strong>w</strong> and a <strong>b</strong> variable, the slope of the graph and its starting point can be shifted.</p>
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
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                                <label style="color: #333; font-weight: bold; min-width: 120px;">
                                    w (slope): <span id="w-value-bunny" style="color: #667eea; font-size: 1rem;">2.0</span>
                                </label>
                                <input type="range" id="w-slider-bunny" min="0" max="10" value="2" step="0.5" style="flex: 1; height: 6px; border-radius: 3px; background: #ddd; outline: none;">
                            </div>
                            
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <label style="color: #333; font-weight: bold; min-width: 120px;">
                                    b (intercept): <span id="b-value-bunny" style="color: #764ba2; font-size: 1rem;">5.0</span>
                                </label>
                                <input type="range" id="b-slider-bunny" min="0" max="20" value="5" step="1" style="flex: 1; height: 6px; border-radius: 3px; background: #ddd; outline: none;">
                            </div>
                        </div>
                        
                        <!-- Animation Control -->
                        <div style="display: flex; gap: 10px; justify-content: center;">
                            <button id="animate-btn-bunny" style="padding: 8px 16px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 5px; font-size: 0.9rem; cursor: pointer; transition: all 0.3s;">
                                🎯 Animate to Target
                            </button>
                            <button id="gradient-step-btn" style="padding: 8px 16px; background: #2dd573; color: white; border: none; border-radius: 5px; font-size: 0.9rem; cursor: pointer; transition: all 0.3s;">
                                📉 Gradient Descent
                            </button>
                            <button id="reset-btn-bunny" style="padding: 8px 16px; background: #666; color: white; border: none; border-radius: 5px; font-size: 0.9rem; cursor: pointer; transition: all 0.3s;">
                                🔄 Reset
                            </button>
                        </div>
                    </div>
                    
                    <!-- Right side: Info Panel -->
                    <div style="background: rgba(255,255,255,0.9); border-radius: 10px; padding: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h2 style="margin: 0 0 12px 0; color: #333; font-size: 1.1rem;">Notes</h2>
                        
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
                            <div style="color: #2dd573; font-weight: bold; margin-bottom: 5px; font-size: 0.85rem;">Gradient Descent is Good Enough</div>
                            <p style="color: #555; font-size: 0.8rem; line-height: 1.3; margin: 0;">
                                Try using the gradient descent button. You may get a line that is almost perfect, but maybe not 100% true. We'll see later that
                                this is why having more training data is important for gradient descent to find the true function...
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
        
        function calculateLoss(w, b, useL1 = true) {
            let totalLoss = 0;
            testData.forEach(point => {
                const predicted = w * point.x + b;
                const error = predicted - point.y;
                if (useL1) {
                    totalLoss += Math.abs(error);  // L1 loss for display
                } else {
                    totalLoss += error * error;  // MSE loss for gradient calculation
                }
            });
            return totalLoss;
        }
        
        function calculateGradients() {
            // Use MSE gradients for stable convergence
            // This provides smoother gradients than L1 (which only gives sign)
            let gradW = 0;
            let gradB = 0;
            
            testData.forEach(point => {
                const predicted = currentW * point.x + currentB;
                const error = predicted - point.y;
                // MSE gradient: 2 * error * derivative
                // For w: derivative is x
                // For b: derivative is 1
                gradW += 2 * error * point.x;
                gradB += 2 * error;
            });
            
            // Average the gradients
            const n = testData.length;
            gradW /= n;
            gradB /= n;
            
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
            
            // Calculate and display L1 loss (what the user sees)
            const loss = calculateLoss(currentW, currentB, true);  // true for L1
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
            const {gradW, gradB} = calculateGradients();  // Now using MSE gradients
            const learningRateW = 0.003;  // Adjusted for MSE gradients
            const learningRateB = 0.02;   // Adjusted for MSE gradients
            
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