

function createBehindTheScenesSimple() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level" style="background: linear-gradient(to bottom, #000000, #1a1a1a);">
            <div class="level-content" style="padding: 8px; max-width: 1200px; margin: 0 auto; display: block !important; gap: 0 !important;">
                <h1 style="font-size: 2rem; margin: 0 !important; padding: 0 !important; text-align: center; color: white; line-height: 1.2;">Behind the Scenes: What the Computer Sees</h1>
                
                <!-- Message at the top -->
                <div style="background: rgba(255,255,255,0.9); border-radius: 8px; padding: 8px 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center; margin: 4px 0 !important; display: block !important;">
                    <p style="margin: 0 !important; padding: 0 !important; font-size: 0.95rem; color: #333; line-height: 1.3;">This is the same problem as Level 1, but now you see it as the computer does - finding the right position on a line!</p>
                </div>
                
                <div style="display: grid; grid-template-columns: 3fr 2fr; gap: 15px; margin: 4px 0 0 0 !important; padding: 0 !important;">
                    <!-- Left side: Line Visualization instead of Robot -->
                    <div style="background: rgba(255,255,255,0.9); border-radius: 10px; padding: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-align: center;">
                        <h2 style="margin: 0 0 10px 0; color: #333; font-size: 1.1rem;">Energy Visualization</h2>
                        
                        <!-- Line visualization container -->
                        <div style="position: relative; height: 220px; background: #f8f9fa; border-radius: 8px; padding: 25px; margin-bottom: 10px; border: 1px solid #e9ecef;">
                            <!-- The horizontal line -->
                            <div style="position: absolute; left: 7%; right: 7%; top: 50%; height: 4px; background: #ddd; transform: translateY(-50%);">
                            </div>
                            
                            <!-- Scale markers -->
                            <div style="position: absolute; left: 7%; top: 52%; transform: translateY(-50%);">
                                <div style="width: 2px; height: 20px; background: #999; margin: 0 auto;"></div>
                                <div style="color: #666; font-size: 0.8rem; margin-top: 5px;">0</div>
                            </div>
                            <div style="position: absolute; left: 50%; top: 52%; transform: translate(-50%, -50%);">
                                <div style="width: 2px; height: 20px; background: #999; margin: 0 auto;"></div>
                                <div style="color: #666; font-size: 0.8rem; margin-top: 5px;">50</div>
                            </div>
                            <div style="position: absolute; left: 93%; top: 52%; transform: translateY(-50%);">
                                <div style="width: 2px; height: 20px; background: #999; margin: 0 auto;"></div>
                                <div style="color: #666; font-size: 0.8rem; margin-top: 5px;">100</div>
                            </div>
                            
                            <!-- Target marker at 75 -->
                            <div id="target-marker" style="position: absolute; left: 71.5%; top: 50%; transform: translate(-50%, -50%); width: 24px; height: 24px; border-radius: 50%; background: #2dd573; border: 3px solid white; box-shadow: 0 0 15px rgba(45,213,115,0.6); z-index: 1;">
                                <div style="position: absolute; top: -30px; left: 50%; transform: translateX(-50%); color: #2dd573; font-weight: bold; font-size: 0.9rem; white-space: nowrap;">Target: 75</div>
                            </div>
                            
                            <!-- Moving dot -->
                            <div id="energy-dot" style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 20px; height: 20px; background: #ff6347; border-radius: 50%; transition: all 0.3s ease; box-shadow: 0 0 12px rgba(255,99,71,0.6); z-index: 2;">
                                <div id="energy-label" style="position: absolute; bottom: -30px; left: 50%; transform: translateX(-50%); color: #333; font-weight: bold; font-size: 0.9rem; white-space: nowrap;">Energy: 50</div>
                            </div>
                        </div>
                        
                        <div style="font-size: 0.9rem; color: #666; margin-top: 8px;">The computer doesn't see a robot - it sees a point on a line!</div>
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
                                <span style="font-size: 1.2rem;">💡</span>
                                <div>
                                    <strong style="color: #f3960a; font-size: 0.85rem;">Hint:</strong>
                                    <span id="hint-text" style="color: #666; font-size: 0.8rem;">Move the slider to find the energy level where loss = 0!</span>
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
        const slider = document.getElementById('energy-slider');
        const energyValue = document.getElementById('energy-value');
        const currentEnergyDisplay = document.getElementById('current-energy-display');
        const lossValue = document.getElementById('loss-value');
        const lossDisplay = document.getElementById('loss-display');
        const hintText = document.getElementById('hint-text');
        const energyDot = document.getElementById('energy-dot');
        const energyLabel = document.getElementById('energy-label');
        
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
            
            // Update dot position
            if (energyDot) {
                // Map 0-100 to the line's position (accounting for 40px padding on each side)
                // Line goes from 40px to (width - 40px), which in percentage is approximately 7% to 93%
                const leftPos = 7 + (energy * 0.86); // Maps 0-100 to 7%-93%
                energyDot.style.left = `${leftPos}%`;
                
                // Update dot color based on loss
                if (loss === 0) {
                    energyDot.style.background = '#2dd573';
                    energyDot.style.boxShadow = '0 0 20px rgba(45,213,115,0.8)';
                } else if (loss < 10) {
                    energyDot.style.background = '#f3960a';
                    energyDot.style.boxShadow = '0 0 15px rgba(243,150,10,0.8)';
                } else {
                    energyDot.style.background = '#ff6347';
                    energyDot.style.boxShadow = '0 0 12px rgba(255,99,71,0.6)';
                }
            }
            
            // Update energy label
            if (energyLabel) {
                energyLabel.textContent = `Energy: ${energy}`;
            }
            
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
            
            // Update hints
            if (hintText) {
                hintText.style.fontSize = '0.8rem';
                if (loss === 0) {
                    hintText.textContent = 'Perfect! You found the optimal energy level!';
                } else if (energy < 75) {
                    hintText.textContent = 'Too low! Try increasing the energy.';
                } else {
                    hintText.textContent = 'Too high! Try decreasing the energy.';
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
                    <p style="color: #555; font-size: 0.95rem; line-height: 1.4; margin: 0 !important; padding: 0 !important;">Loss functions can come in other forms too. We just witnessed "absolute loss" where loss is equal to the absolte distance the current guess is from the true value. But loss can also be calculated using the formula: <b>(Guess - True)²</b>.</p>
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
                            <p style="color: #555; font-size: 0.8rem; line-height: 1.3; margin: 0;">Because the loss calculation is always squared, the loss can never be negative. We usually want the lowest possible loss to be zero.</p>
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
