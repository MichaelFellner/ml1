function createLevel7() {
    // Note: This function might be missing from the original file
    // Adding a placeholder to match the navigation config
    const container = document.getElementById('app');
    
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content">
                <h3>Level 7: Triple Squad</h3>
                <p>This level appears to be missing from the original implementation.</p>
                <p>Placeholder content for Level 7.</p>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
}

function createLevel8() {
    currentLevel = 7;
    const container = document.getElementById('app');
    
    container.innerHTML = `
        <div class="current-level">
            ${createLevelHeader(7, 8, 9)}
            <div class="level-content" style="gap: 30px;">
                <div style="display: flex; gap: 40px; align-items: flex-start; justify-content: center; flex-wrap: wrap;">
                    <!-- Left: Controls -->
                    <div style="flex: 0 1 320px; min-width: 280px;">
                        <div style="
                            background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(118,75,162,0.05));
                            border-radius: 12px;
                            padding: 20px;
                            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                        ">
                            <h3 style="margin: 0 0 15px 0; color: #333; font-size: 1.1rem; display: flex; align-items: center; gap: 8px;">
                                <span style="font-size: 1.5rem;">⚡</span> Energy Distribution
                            </h3>
                            
                            <div style="margin-bottom: 20px;">
                                <label for="energyInput" style="display: block; margin-bottom: 8px; color: #555; font-weight: 500;">
                                    Set Energy Level (1-100):
                                </label>
                                <div style="position: relative; margin-bottom: 5px;">
                                    <style>
                                        #energySlider::-webkit-slider-thumb {
                                            -webkit-appearance: none;
                                            appearance: none;
                                            width: 20px;
                                            height: 20px;
                                            background: white;
                                            border: 3px solid #667eea;
                                            border-radius: 50%;
                                            cursor: pointer;
                                            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                                            transition: all 0.2s ease;
                                        }
                                        #energySlider::-webkit-slider-thumb:hover {
                                            transform: scale(1.2);
                                            box-shadow: 0 3px 12px rgba(102, 126, 234, 0.4);
                                        }
                                        #energySlider::-moz-range-thumb {
                                            width: 20px;
                                            height: 20px;
                                            background: white;
                                            border: 3px solid #667eea;
                                            border-radius: 50%;
                                            cursor: pointer;
                                            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                                            transition: all 0.2s ease;
                                        }
                                        #energySlider::-moz-range-thumb:hover {
                                            transform: scale(1.2);
                                            box-shadow: 0 3px 12px rgba(102, 126, 234, 0.4);
                                        }
                                    </style>
                                    <input type="range" id="energySlider" min="1" max="100" value="75" style="
                                        width: 100%;
                                        height: 8px;
                                        background: linear-gradient(to right, #ff6b6b 0%, #ffd93d 25%, #6bcf7f 50%, #ffd93d 75%, #ff6b6b 100%);
                                        border-radius: 4px;
                                        outline: none;
                                        -webkit-appearance: none;
                                        appearance: none;
                                        cursor: pointer;
                                    ">
                                    <div style="
                                        position: absolute;
                                        top: -25px;
                                        left: 50%;
                                        transform: translateX(-50%);
                                        background: #667eea;
                                        color: white;
                                        padding: 2px 8px;
                                        border-radius: 4px;
                                        font-size: 0.9rem;
                                        font-weight: bold;
                                    " id="sliderValue">75</div>
                                </div>
                                <div style="display: flex; gap: 10px; margin-top: 10px;">
                                    <input type="number" id="energyInput" min="1" max="100" value="75" step="1" style="
                                        flex: 1;
                                        padding: 8px;
                                        border: 2px solid #e0e0e0;
                                        border-radius: 6px;
                                        font-size: 1rem;
                                        text-align: center;
                                        font-weight: bold;
                                    ">
                                    <button id="activateBtn" class="action-btn" style="
                                        flex: 1;
                                        background: linear-gradient(135deg, #667eea, #764ba2);
                                        color: white;
                                        border: none;
                                        border-radius: 6px;
                                        padding: 8px 16px;
                                        font-weight: bold;
                                        cursor: pointer;
                                        transition: all 0.3s ease;
                                    ">🤖 Activate</button>
                                </div>
                            </div>
                            
                            <div style="
                                background: rgba(255,255,255,0.5);
                                border-radius: 8px;
                                padding: 12px;
                                margin-bottom: 15px;
                            ">
                                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                                    <span style="font-size: 1.2rem;">📊</span>
                                    <strong style="color: #333;">Distribution Info</strong>
                                </div>
                                <div style="font-size: 0.9rem; color: #666; line-height: 1.4;">
                                    <div>📍 Peak at: <strong style="color: #667eea;">75 energy</strong></div>
                                    <div>📈 Bell curve spread: ±25</div>
                                    <div>🤖 Total fleet: 625 robots</div>
                                </div>
                            </div>
                            
                            <div id="status" style="
                                background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7));
                                border: 2px solid #e0e0e0;
                                border-radius: 8px;
                                padding: 12px;
                                text-align: center;
                                font-size: 0.95rem;
                                color: #555;
                                min-height: 60px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                flex-direction: column;
                            ">
                                <div>🎯 Set energy to see robot activation!</div>
                                <div style="font-size: 0.85rem; color: #888; margin-top: 4px;">More robots activate near 75</div>
                            </div>
                            
                            <button id="resetBtn" style="
                                display: none;
                                width: 100%;
                                margin-top: 10px;
                                padding: 8px;
                                background: linear-gradient(135deg, #ff6b6b, #ff8787);
                                color: white;
                                border: none;
                                border-radius: 6px;
                                font-weight: bold;
                                cursor: pointer;
                                transition: all 0.3s ease;
                            ">🔄 Reset Fleet</button>
                        </div>
                    </div>
                    
                    <!-- Right: Robot Grid -->
                    <div style="flex: 1 1 400px; min-width: 350px; max-width: 500px;">
                        <div style="
                            background: linear-gradient(135deg, #1a1a2e, #16213e);
                            border-radius: 12px;
                            padding: 20px;
                            box-shadow: 0 8px 24px rgba(0,0,0,0.2);
                        ">
                            <h3 style="
                                margin: 0 0 15px 0;
                                color: white;
                                font-size: 1.1rem;
                                text-align: center;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                gap: 8px;
                            ">
                                <span style="font-size: 1.5rem;">🤖</span>
                                Robot Fleet Status
                                <span style="font-size: 1.5rem;">🤖</span>
                            </h3>
                            
                            <!-- Distribution curve visualization -->
                            <div id="curveViz" style="
                                height: 60px;
                                margin-bottom: 15px;
                                background: rgba(255,255,255,0.05);
                                border-radius: 8px;
                                position: relative;
                                overflow: hidden;
                            ">
                                <canvas id="distributionCurve" width="400" height="60" style="width: 100%; height: 100%;"></canvas>
                                <div id="energyMarker" style="
                                    position: absolute;
                                    top: 0;
                                    bottom: 0;
                                    width: 2px;
                                    background: #ffd93d;
                                    left: 75%;
                                    transition: left 0.3s ease;
                                    box-shadow: 0 0 10px rgba(255, 217, 61, 0.5);
                                "></div>
                            </div>
                            
                            <div id="robotGrid" style="
                                display: grid;
                                grid-template-columns: repeat(25, 1fr);
                                gap: 3px;
                                padding: 10px;
                                background: rgba(0,0,0,0.3);
                                border-radius: 8px;
                            "></div>
                            
                            <div id="activationStats" style="
                                margin-top: 15px;
                                padding: 10px;
                                background: rgba(255,255,255,0.1);
                                border-radius: 6px;
                                color: white;
                                text-align: center;
                                font-size: 0.9rem;
                                display: none;
                            ">
                                <div id="robotCount" style="font-size: 1.1rem; font-weight: bold; color: #ffd93d;"></div>
                                <div id="percentage" style="font-size: 0.85rem; color: #aaa; margin-top: 4px;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            ${createStandardNavigation()}
        </div>
    `;
    
    setupLevel8();
}

        
function setupLevel8() {
    const energyInput = document.getElementById('energyInput');
    const energySlider = document.getElementById('energySlider');
    const sliderValue = document.getElementById('sliderValue');
    const activateBtn = document.getElementById('activateBtn');
    const resetBtn = document.getElementById('resetBtn');
    const robotGrid = document.getElementById('robotGrid');
    const energyMarker = document.getElementById('energyMarker');
    const activationStats = document.getElementById('activationStats');
    const robotCount = document.getElementById('robotCount');
    const percentage = document.getElementById('percentage');
    
    // Draw the distribution curve
    function drawDistributionCurve() {
        const canvas = document.getElementById('distributionCurve');
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        ctx.clearRect(0, 0, width, height);
        
        // Draw the bell curve
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(102, 126, 234, 0.6)';
        ctx.lineWidth = 2;
        
        const mean = 75;
        const stdDev = Math.sqrt(1000);
        
        for (let x = 0; x <= 100; x++) {
            const canvasX = (x / 100) * width;
            const probability = normalPDF(x, mean, 1000);
            const maxProb = normalPDF(mean, mean, 1000);
            const canvasY = height - (probability / maxProb * height * 0.8) - 5;
            
            if (x === 0) {
                ctx.moveTo(canvasX, canvasY);
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }
        ctx.stroke();
        
        // Fill under the curve with gradient
        ctx.beginPath();
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'rgba(102, 126, 234, 0.3)');
        gradient.addColorStop(1, 'rgba(102, 126, 234, 0.05)');
        ctx.fillStyle = gradient;
        
        for (let x = 0; x <= 100; x++) {
            const canvasX = (x / 100) * width;
            const probability = normalPDF(x, mean, 1000);
            const maxProb = normalPDF(mean, mean, 1000);
            const canvasY = height - (probability / maxProb * height * 0.8) - 5;
            
            if (x === 0) {
                ctx.moveTo(canvasX, height);
                ctx.lineTo(canvasX, canvasY);
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();
    }
    
    // Sync slider and input
    function syncEnergyValues(value) {
        energySlider.value = value;
        energyInput.value = value;
        sliderValue.textContent = value;
        sliderValue.style.left = `${value}%`;
        energyMarker.style.left = `${value}%`;
    }
    
    energySlider.addEventListener('input', (e) => {
        syncEnergyValues(e.target.value);
    });
    
    energyInput.addEventListener('input', (e) => {
        const value = Math.min(100, Math.max(1, parseInt(e.target.value) || 1));
        syncEnergyValues(value);
    });
    
    // Create 625 robot dots (25x25 grid) with better styling
    function createRobotGrid() {
        robotGrid.innerHTML = '';
        for (let i = 0; i < 625; i++) {
            const dot = document.createElement('div');
            dot.style.cssText = `
                width: 100%;
                aspect-ratio: 1;
                background: radial-gradient(circle, rgba(100, 100, 120, 0.8), rgba(60, 60, 80, 0.6));
                border-radius: 50%;
                transition: all 0.5s ease;
                transform: scale(0.8);
            `;
            dot.className = 'robot-dot';
            dot.dataset.index = i;
            robotGrid.appendChild(dot);
        }
    }
    
    // Normal distribution probability density function
    function normalPDF(x, mean, variance) {
        const stdDev = Math.sqrt(variance);
        const coefficient = 1 / (stdDev * Math.sqrt(2 * Math.PI));
        const exponent = -0.5 * Math.pow((x - mean) / stdDev, 2);
        return coefficient * Math.exp(exponent);
    }
    
    function resetRobots() {
        // Reset all dots with animation
        const dots = robotGrid.querySelectorAll('.robot-dot');
        dots.forEach((dot, index) => {
            setTimeout(() => {
                dot.style.background = 'radial-gradient(circle, rgba(100, 100, 120, 0.8), rgba(60, 60, 80, 0.6))';
                dot.style.transform = 'scale(0.8)';
                dot.style.boxShadow = 'none';
            }, index * 0.5);
        });
        
        // Re-enable inputs and activate button
        energyInput.disabled = false;
        energySlider.disabled = false;
        activateBtn.disabled = false;
        activateBtn.textContent = '🤖 Activate';
        activateBtn.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
        
        // Hide reset button and stats
        resetBtn.style.display = 'none';
        activationStats.style.display = 'none';
        
        // Reset status
        document.getElementById('status').innerHTML = `
            <div>🎯 Set energy to see robot activation!</div>
            <div style="font-size: 0.85rem; color: #888; margin-top: 4px;">More robots activate near 75</div>
        `;
        document.getElementById('status').style.background = 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))';
        document.getElementById('status').style.borderColor = '#e0e0e0';
    }
    
    function activateRobots() {
        const energyLevel = parseInt(energyInput.value);
        if (energyLevel < 1 || energyLevel > 100) return;
        
        const mean = 75;
        const variance = 1000; // stdDev ≈ 31.6
        
        // Calculate probability for this energy level
        const probability = normalPDF(energyLevel, mean, variance);
        
        // Scale to get number of robots
        const maxProbability = normalPDF(mean, mean, variance);
        const scaledProbability = probability / maxProbability;
        const numRobots = Math.round(scaledProbability * 200); // Scale to reasonable number
        
        // First, set all dots to inactive with subtle effect
        const dots = robotGrid.querySelectorAll('.robot-dot');
        dots.forEach(dot => {
            dot.style.background = 'radial-gradient(circle, rgba(60, 60, 80, 0.4), rgba(40, 40, 60, 0.3))';
            dot.style.transform = 'scale(0.6)';
            dot.style.boxShadow = 'none';
        });
        
        // Create a center-weighted random selection for more realistic distribution
        const indices = [];
        const centerRow = 12; // Middle of 25x25 grid
        const centerCol = 12;
        
        for (let i = 0; i < 625; i++) {
            const row = Math.floor(i / 25);
            const col = i % 25;
            const distance = Math.sqrt(Math.pow(row - centerRow, 2) + Math.pow(col - centerCol, 2));
            const weight = Math.exp(-distance * 0.1); // Center-weighted
            indices.push({ index: i, weight: Math.random() * weight });
        }
        
        // Sort by weight and take top numRobots
        indices.sort((a, b) => b.weight - a.weight);
        
        // Activate selected dots with staggered animation
        for (let i = 0; i < Math.min(numRobots, 625); i++) {
            setTimeout(() => {
                const dot = dots[indices[i].index];
                
                // Choose color based on energy level
                let gradientColor;
                if (Math.abs(energyLevel - mean) < 10) {
                    // Very close to optimal - green
                    gradientColor = 'radial-gradient(circle, rgba(108, 207, 127, 1), rgba(45, 213, 115, 0.8))';
                } else if (Math.abs(energyLevel - mean) < 25) {
                    // Moderate - yellow
                    gradientColor = 'radial-gradient(circle, rgba(255, 217, 61, 1), rgba(243, 150, 10, 0.8))';
                } else {
                    // Far from optimal - red
                    gradientColor = 'radial-gradient(circle, rgba(255, 107, 107, 1), rgba(255, 71, 71, 0.8))';
                }
                
                dot.style.background = gradientColor;
                dot.style.transform = 'scale(1.1)';
                dot.style.boxShadow = '0 0 15px rgba(255, 217, 61, 0.6)';
            }, i * 2); // Stagger the animations
        }
        
        // Update status with better feedback
        const percentActive = ((numRobots / 625) * 100).toFixed(1);
        let statusColor, statusMessage;
        
        if (Math.abs(energyLevel - mean) < 5) {
            statusColor = 'linear-gradient(135deg, rgba(45,213,115,0.2), rgba(45,213,115,0.1))';
            statusMessage = '🎆 Excellent! Near optimal energy!';
        } else if (Math.abs(energyLevel - mean) < 15) {
            statusColor = 'linear-gradient(135deg, rgba(243,150,10,0.2), rgba(243,150,10,0.1))';
            statusMessage = '✨ Good! Many robots activated';
        } else {
            statusColor = 'linear-gradient(135deg, rgba(255,71,71,0.2), rgba(255,71,71,0.1))';
            statusMessage = '⚠️ Few robots match this energy';
        }
        
        document.getElementById('status').innerHTML = `
            <div style="font-size: 1.1rem; font-weight: bold; color: #333;">⚡ Energy ${energyLevel}</div>
            <div style="font-size: 0.9rem; color: #666; margin-top: 4px;">${statusMessage}</div>
        `;
        document.getElementById('status').style.background = statusColor;
        document.getElementById('status').style.borderColor = Math.abs(energyLevel - mean) < 5 ? '#2dd573' : 
                                                               Math.abs(energyLevel - mean) < 15 ? '#f3960a' : '#ff6b6b';
        
        // Show activation stats
        activationStats.style.display = 'block';
        robotCount.textContent = `${numRobots} robots activated`;
        percentage.textContent = `${percentActive}% of fleet`;
        
        // Disable inputs and show reset button
        energyInput.disabled = true;
        energySlider.disabled = true;
        activateBtn.disabled = true;
        activateBtn.textContent = '✅ Activated';
        activateBtn.style.background = 'linear-gradient(135deg, #2dd573, #45d88a)';
        resetBtn.style.display = 'block';
    }
    
    // Event listeners
    activateBtn.addEventListener('click', activateRobots);
    resetBtn.addEventListener('click', resetRobots);
    
    energyInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !energyInput.disabled) {
            activateRobots();
        }
    });
    
    // Add hover effect for activate button
    activateBtn.addEventListener('mouseenter', () => {
        if (!activateBtn.disabled) {
            activateBtn.style.transform = 'scale(1.05)';
            activateBtn.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
        }
    });
    
    activateBtn.addEventListener('mouseleave', () => {
        activateBtn.style.transform = 'scale(1)';
        activateBtn.style.boxShadow = 'none';
    });
    
    resetBtn.addEventListener('mouseenter', () => {
        resetBtn.style.transform = 'scale(1.05)';
        resetBtn.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.3)';
    });
    
    resetBtn.addEventListener('mouseleave', () => {
        resetBtn.style.transform = 'scale(1)';
        resetBtn.style.boxShadow = 'none';
    });
    
    // Initialize
    createRobotGrid();
    drawDistributionCurve();
    
    // Set initial slider position
    syncEnergyValues(75);
}