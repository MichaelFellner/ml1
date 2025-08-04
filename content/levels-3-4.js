function createLevel3() {
    currentLevel = 2;
    const container = document.getElementById('app');
    
    // Check if level is already completed
    const isCompleted = levelCompletions.level3;
    const nextBtnState = isCompleted ? '' : 'disabled';
    const nextBtnText = isCompleted ? '✅ Go to Level 4' : '🔒 Complete Level 3 to Continue';
    
    container.innerHTML = `
        <div class="current-level">
        ${createLevelHeader(2, 3, 9)}
            <div class="level-content">
                <div class="visual-section">
                    <h3>AI-Powered RX-7 Robot</h3>
                    <img id="robotImgAI" src="${images.robot}" alt="AI Robot" class="main-image">
                </div>
                <div class="controls-section">
                    <label for="energySliderAI">Robot Energy Level:</label>
                    <input type="range" id="energySliderAI" min="0" max="100" value="30" step="1" disabled style="opacity: 0.7;">
                    <div class="display">
                        <span>Energy: </span>
                        <div class="energy-bar">
                            <div id="energyFillAI" class="energy-fill"></div>
                        </div>
                        <span id="energyValueAI">30%</span>
                    </div>
                    <div class="ai-controls">
                        <button id="gradientBtn" class="action-btn">🤖 Gradient Descent Step</button>
                        <button id="resetBtn" class="action-btn">🔄 Reset</button>
                    </div>
                    <div id="status" class="status">🤖 Current Loss: 3600.00<br><small>💡 Only AI can move the slider - use Gradient Descent!</small></div>
                    <div class="button-container">
                        <button id="prevLevelBtn" class="prev-btn" onclick="createPart2()">← Back to Part 2</button>
                        <button id="nextLevelBtn" class="next-btn" ${nextBtnState}>${nextBtnText}</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    setupLevel3();
}

function setupLevel3() {
    const energySliderAI = document.getElementById('energySliderAI');
    const gradientBtn = document.getElementById('gradientBtn');
    const resetBtn = document.getElementById('resetBtn');
    const nextBtn = document.getElementById('nextLevelBtn');
    
    // Set up click handler if already completed
    if (levelCompletions.level3) {
        nextBtn.onclick = () => createLevel4();
    }
    
    function updateEnergyAI() {
        const energy = parseInt(energySliderAI.value);
        document.getElementById('energyValueAI').textContent = energy + '%';
        document.getElementById('energyFillAI').style.width = energy + '%';
        
        const loss = Math.pow(energy - OPTIMAL_ENERGY_AI, 2);
        
        if (energy === OPTIMAL_ENERGY_AI) {
            document.getElementById('status').innerHTML = '🎯 AI FOUND OPTIMAL SOLUTION! 🎯';
            document.getElementById('status').style.background = 'rgba(45, 213, 115, 0.2)';
            document.getElementById('robotImgAI').src = images.robotActive;
            
            if (!levelCompletions.level3) {
                levelCompletions.level3 = true;
            }
            nextBtn.disabled = false;
            nextBtn.textContent = '✅ Go to Level 4';
            nextBtn.onclick = () => createLevel4();
        } else {
            document.getElementById('status').innerHTML = `🤖 Current Loss: ${loss.toFixed(2)}<br><small>💡 Only AI can move the slider - use Gradient Descent!</small>`;
            document.getElementById('status').style.background = 'rgba(255, 255, 255, 0.8)';
            document.getElementById('robotImgAI').src = images.robot;
            
            // Only disable if not already completed
            if (!levelCompletions.level3) {
                nextBtn.disabled = true;
                nextBtn.textContent = '🔒 Complete Level 3 to Continue';
                nextBtn.onclick = null;
            }
        }
    }
    
    // NO manual slider input listener for Level 3 - only AI can move it!
    
    gradientBtn.addEventListener('click', () => {
        const currentEnergy = parseInt(energySliderAI.value);
        const result = optimizer.optimizationStep([currentEnergy], [OPTIMAL_ENERGY_AI], [{ min: 0, max: 100 }]);
        
        energySliderAI.value = result.newVariables[0];
        updateEnergyAI();
    });
    
    resetBtn.addEventListener('click', () => {
        optimizer.reset();
        energySliderAI.value = Math.floor(Math.random() * 101);
        updateEnergyAI();
    });
    
    updateEnergyAI();
}

function createLevel4() {
    currentLevel = 3;
    const container = document.getElementById('app');
    
    // Check if level is already completed
    const isCompleted = levelCompletions.level4;
    const nextBtnState = isCompleted ? '' : 'disabled';
    const nextBtnText = isCompleted ? '✅ Go to Part 3' : '🔒 Complete Level 4 to Continue';
    
    container.innerHTML = `
        <div class="current-level">
            ${createLevelHeader(3, 4, 9)}
            <div class="level-content">
                <div class="visual-section">
                    <h3>Master Alchemist Elara</h3>
                    <div class="witch-container">
                        <img id="witchImgMulti" src="${images.witch}" alt="Master Alchemist" class="main-image">
                        <div id="cauldronBrewMulti" class="cauldron-brew multi"></div>
                    </div>
                </div>
                <div class="controls-section">
                    <label>Master Alchemist's 6 Essential Ingredients:</label>
                    <div class="multi-potion-grid">
                        <div>
                            <label for="redSlider">🔴 Crimson:</label>
                            <input type="range" id="redSlider" min="0" max="100" value="50" step="1">
                            <span id="redValue">50%</span>
                        </div>
                        <div>
                            <label for="yellowSliderMulti">🟡 Golden:</label>
                            <input type="range" id="yellowSliderMulti" min="0" max="100" value="50" step="1">
                            <span id="yellowValueMulti">50%</span>
                        </div>
                        <div>
                            <label for="greenSlider">🟢 Emerald:</label>
                            <input type="range" id="greenSlider" min="0" max="100" value="50" step="1">
                            <span id="greenValue">50%</span>
                        </div>
                        <div>
                            <label for="blueSliderMulti">🔵 Sapphire:</label>
                            <input type="range" id="blueSliderMulti" min="0" max="100" value="50" step="1">
                            <span id="blueValueMulti">50%</span>
                        </div>
                        <div>
                            <label for="purpleSlider">🟣 Violet:</label>
                            <input type="range" id="purpleSlider" min="0" max="100" value="50" step="1">
                            <span id="purpleValue">50%</span>
                        </div>
                        <div>
                            <label for="orangeSlider">🟠 Orange:</label>
                            <input type="range" id="orangeSlider" min="0" max="100" value="50" step="1">
                            <span id="orangeValue">50%</span>
                        </div>
                    </div>
                    <div class="ai-controls">
                        <button id="gradientMultiBtn" class="action-btn">Use Gradient Descent</button>
                        <button id="resetMultiBtn" class="action-btn">🔄 New Recipe</button>
                    </div>
                    <div id="status" class="status">🔬 Total Loss: 8500.0 | Quality: 15.2%</div>
                    <div class="button-container">
                        <button id="prevLevelBtn" class="prev-btn" onclick="createLevel3()">← Back to Level 3</button>
                        <button id="nextLevelBtn" class="next-btn" ${nextBtnState}>${nextBtnText}</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    setupLevel4();
}

function setupLevel4() {
    const sliders = {
        red: document.getElementById('redSlider'),
        yellow: document.getElementById('yellowSliderMulti'),
        green: document.getElementById('greenSlider'),
        blue: document.getElementById('blueSliderMulti'),
        purple: document.getElementById('purpleSlider'),
        orange: document.getElementById('orangeSlider')  // ADD THIS LINE
    };
    
    const values = {
        red: document.getElementById('redValue'),
        yellow: document.getElementById('yellowValueMulti'),
        green: document.getElementById('greenValue'),
        blue: document.getElementById('blueValueMulti'),
        purple: document.getElementById('purpleValue'),
        orange: document.getElementById('orangeValue')  // ADD THIS LINE
    };
    
    const nextBtn = document.getElementById('nextLevelBtn');
    const gradientBtn = document.getElementById('gradientMultiBtn');
    const resetBtn = document.getElementById('resetMultiBtn');
    
    // Set up click handler if already completed
    if (levelCompletions.level4) {
        nextBtn.onclick = () => createPart3();
    }
    
    function updateMultiPotions() {
        const levels = {
            red: parseInt(sliders.red.value),
            yellow: parseInt(sliders.yellow.value),
            green: parseInt(sliders.green.value),
            blue: parseInt(sliders.blue.value),
            purple: parseInt(sliders.purple.value),
            orange: parseInt(sliders.orange.value)
        };
        
        const optimalValues = {
            red: OPTIMAL_RED,
            yellow: OPTIMAL_YELLOW_MULTI,
            green: OPTIMAL_GREEN,
            blue: OPTIMAL_BLUE_MULTI,
            purple: OPTIMAL_PURPLE,
            orange: OPTIMAL_ORANGE
        };
        
        // Update display values
        Object.keys(levels).forEach(color => {
            values[color].textContent = levels[color] + '%';
        });
        
        // Calculate brew quality
        let totalOptimality = 0;
        Object.keys(levels).forEach(color => {
            const distance = Math.abs(levels[color] - optimalValues[color]);
            const optimality = Math.max(0, 1 - (distance / 50));
            totalOptimality += optimality;
        });
        
        const brewQuality = totalOptimality / 6;
        
        // Update cauldron color
        const brownR = 101, brownG = 67, brownB = 33;
        const magicR = 50, magicG = 255, magicB = 150;
        const r = Math.round(brownR + (magicR - brownR) * brewQuality);
        const g = Math.round(brownG + (magicG - brownG) * brewQuality);
        const b = Math.round(brownB + (magicB - brownB) * brewQuality);
        document.getElementById('cauldronBrewMulti').style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        
        // Check completion
        const isPerfect = Object.keys(levels).every(color => levels[color] === optimalValues[color]);
        const optimalCount = Object.keys(levels).filter(color => levels[color] === optimalValues[color]).length;
        
        if (isPerfect) {
            document.getElementById('status').textContent = '✨🌟 PERFECT 6-ESSENCE ELIXIR! 🌟✨';
            document.getElementById('status').style.background = 'rgba(45, 213, 115, 0.2)';
            
            if (!levelCompletions.level4) {
                levelCompletions.level4 = true;
            }
            nextBtn.disabled = false;
            nextBtn.textContent = '✅ Go to Part 3';
            nextBtn.onclick = () => createPart3();
        } else {
            const totalLoss = Object.keys(levels).reduce((sum, color) => {
                return sum + Math.pow(levels[color] - optimalValues[color], 2);
            }, 0);
            document.getElementById('status').textContent = `🔬 Total Loss: ${totalLoss.toFixed(1)} | Optimal: ${optimalCount}/6`;
            document.getElementById('status').style.background = 'rgba(255, 255, 255, 0.8)';
            
            // Only disable if not already completed
            if (!levelCompletions.level4) {
                nextBtn.disabled = true;
                nextBtn.textContent = '🔒 Complete Level 4 to Continue';
                nextBtn.onclick = null;
            }
        }
    }
    
    // Add event listeners
    Object.values(sliders).forEach(slider => {
        slider.addEventListener('input', updateMultiPotions);
    });
    
    gradientBtn.addEventListener('click', () => {
        const currentValues = Object.values(sliders).map(s => parseInt(s.value));
        const targetValues = [OPTIMAL_RED, OPTIMAL_YELLOW_MULTI, OPTIMAL_GREEN, OPTIMAL_BLUE_MULTI, OPTIMAL_PURPLE, OPTIMAL_ORANGE];
        const result = optimizer.optimizationStep(currentValues, targetValues, Array(6).fill({ min: 0, max: 100 }));
        
        Object.keys(sliders).forEach((color, i) => {
            sliders[color].value = result.newVariables[i];
        });
        
        updateMultiPotions();
    });
    
    resetBtn.addEventListener('click', () => {
        optimizer.reset();
        Object.values(sliders).forEach(slider => {
            slider.value = Math.floor(Math.random() * 101);
        });
        updateMultiPotions();
    });
    
    updateMultiPotions();
}