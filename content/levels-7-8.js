function createLevel8() {
    currentLevel = 7;
    const container = document.getElementById('app');
    
    // Check if level is already completed
    const isCompleted = levelCompletions.level8;
    const nextBtnState = isCompleted ? '' : 'disabled';
    const nextBtnText = isCompleted ? '✅ Continue' : '🔒 Complete Level 8 to Continue';
    
    container.innerHTML = `
        <div class="current-level">
            ${createLevelHeader(7, 8, 9)}
            <div class="level-content">
                <div class="level8-layout">
                    <div class="level8-controls">
                        <label for="energyInput">Set Energy Level (1-100):</label>
                        <div class="input-group">
                            <input type="number" id="energyInput" min="1" max="100" value="75" step="1">
                            <button id="activateBtn" class="action-btn">Activate Robots</button>
                            <button id="resetBtn" class="reset-btn" style="display: none;">Reset</button>
                        </div>
                        <div id="distributionInfo" class="distribution-info">
                            Fleet follows normal distribution (mean: 75, variance: moderate)
                        </div>
                        <div id="status" class="status">Enter an energy level to see how many robots match that configuration!</div>
                        <div class="button-container">
                            <button id="prevLevelBtn" class="prev-btn" onclick="createLevel5()">← Back to Level 7</button>
                            <button id="nextLevelBtn" class="next-btn" ${nextBtnState}>${nextBtnText}</button>
                        </div>
                    </div>
                    <div class="level8-visual">
                        <h3>Robot Fleet Distribution</h3>
                        <div id="robotGrid" class="robot-grid"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    setupLevel8();
}

        
function setupLevel8() {
    const energyInput = document.getElementById('energyInput');
    const activateBtn = document.getElementById('activateBtn');
    const resetBtn = document.getElementById('resetBtn');
    const robotGrid = document.getElementById('robotGrid');
    const nextBtn = document.getElementById('nextLevelBtn');
    
    // Set up click handler if already completed
    if (levelCompletions.level8) {
        nextBtn.onclick = () => createStoryPart6(); // Assuming next part
    }
    
    // Create 625 robot dots (25x25 grid)
    function createRobotGrid() {
        robotGrid.innerHTML = '';
        for (let i = 0; i < 625; i++) {
            const dot = document.createElement('div');
            dot.className = 'robot-dot';
            // No inline styling - let CSS handle the appearance
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
        // Reset all dots to default state
        const dots = robotGrid.querySelectorAll('.robot-dot');
        dots.forEach(dot => {
            dot.className = 'robot-dot';
        });
        
        // Re-enable input and activate button
        energyInput.disabled = false;
        activateBtn.disabled = false;
        activateBtn.textContent = 'Activate Robots';
        
        // Hide reset button
        resetBtn.style.display = 'none';
        
        // Reset status
        document.getElementById('status').innerHTML = 'Enter an energy level to see how many robots match that configuration!';
        document.getElementById('status').style.background = 'rgba(255, 255, 255, 0.8)';
    }
    
    function activateRobots() {
        const energyLevel = parseInt(energyInput.value);
        if (energyLevel < 1 || energyLevel > 100) return;
        
        const mean = 75;
        const variance = 1000; // Lower variance (stdDev = 8)
        
        // Calculate probability for this energy level
        const probability = normalPDF(energyLevel, mean, variance);
        
        // Scale to get number of robots (approximate)
        const maxProbability = normalPDF(mean, mean, variance);
        const scaledProbability = probability / maxProbability;
        const numRobots = Math.round(scaledProbability * 200); // Scale to reasonable number
        
        // Debug output
        console.log('Energy Level:', energyLevel);
        console.log('Probability:', probability);
        console.log('Max Probability:', maxProbability);
        console.log('Scaled Probability:', scaledProbability);
        console.log('Number of Robots to activate:', numRobots);
        
        // Reset all dots to inactive
        const dots = robotGrid.querySelectorAll('.robot-dot');
        dots.forEach(dot => {
            dot.className = 'robot-dot inactive';
        });
        
        // Randomly select dots to activate
        const indices = [];
        for (let i = 0; i < 625; i++) {
            indices.push(i);
        }
        
        // Shuffle array and take first numRobots
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        
        // Activate selected dots with glow effect
        for (let i = 0; i < Math.min(numRobots, 625); i++) {
            dots[indices[i]].className = 'robot-dot active';
        }
        
        // Update status
        document.getElementById('status').innerHTML = `
            Energy Level ${energyLevel}: Activated ${numRobots} robots<br>
            <small>Based on normal distribution (mean=75, σ=8)</small>
        `;
        
        // Disable input and show reset button
        energyInput.disabled = true;
        activateBtn.disabled = true;
        activateBtn.textContent = 'Activated';
        resetBtn.style.display = 'block';
        
        // Mark as completed after first use
        if (!levelCompletions.level8) {
            levelCompletions.level8 = true;
            nextBtn.disabled = false;
            nextBtn.textContent = '✅ Continue';
            nextBtn.onclick = () => createStoryPart6(); // Assuming next part exists
        }
    }
    
    // Event listeners
    activateBtn.addEventListener('click', activateRobots);
    resetBtn.addEventListener('click', resetRobots);
    
    energyInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !energyInput.disabled) {
            activateRobots();
        }
    });
    
    // Initialize
    createRobotGrid();
}



