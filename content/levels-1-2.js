function createLevel1() {
    const levelId = 'level1';
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            ${createLevelHeader(0, 1, 9)}

            <div class="level-content">
                <div class="visual-section">
                    <h3>RX-7 Energy Robot</h3>
                    <img id="robotImg" src="${images.robot}" alt="Robot" class="main-image">
                </div>
                <div class="controls-section">
                    <label for="energySlider">Robot Energy Level:</label>
                    <div class="slider-controls">
                        <button id="energyDown" class="slider-btn">-</button>
                        <input type="range" id="energySlider" min="0" max="100" value="50" step="1">
                        <button id="energyUp" class="slider-btn">+</button>
                    </div>
                    <div class="display">
                        <span>Energy: </span>
                        <div class="energy-bar">
                            <div id="energyFill" class="energy-fill"></div>
                        </div>
                        <span id="energyValue">50%</span>
                    </div>
                    <div id="status" class="status">🤖 Current Loss: 625.00<br><small>💡 Lower loss = better performance. Try to get loss to 0!</small></div>
                </div>
            </div>
            
            ${createStandardNavigation()}
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation(levelId, 'createLevel1');
    setupLevel1();
}

function setupLevel1() {
    const energySlider = document.getElementById('energySlider');
    const energyUpBtn = document.getElementById('energyUp');
    const energyDownBtn = document.getElementById('energyDown');
    
    function updateLevel1() {
        const energy = parseInt(energySlider.value);
        updateEnergyDisplay(energy);
        
        // Calculate loss (squared error)
        const loss = Math.pow(energy - OPTIMAL_ENERGY, 2);
        
        if (energy === OPTIMAL_ENERGY) {
            document.getElementById('status').innerHTML = '⚡ OPTIMAL ENERGY REACHED! Loss = 0! ⚡';
            document.getElementById('status').style.background = 'rgba(45, 213, 115, 0.2)';
            document.getElementById('robotImg').src = images.robotActive;
        } else {
            document.getElementById('status').innerHTML = `🤖 Current Loss: ${loss.toFixed(2)}<br><small>💡 Lower loss = better performance. Try to get loss to 0!</small>`;
            document.getElementById('status').style.background = 'rgba(255, 255, 255, 0.8)';
            document.getElementById('robotImg').src = images.robot;
        }
        
        // Update button states
        energyUpBtn.disabled = energy >= 100;
        energyDownBtn.disabled = energy <= 0;
    }
    
    energySlider.addEventListener('input', updateLevel1);
    
    energyUpBtn.addEventListener('click', () => {
        const currentValue = parseInt(energySlider.value);
        if (currentValue < 100) {
            energySlider.value = currentValue + 1;
            updateLevel1();
        }
    });
    
    energyDownBtn.addEventListener('click', () => {
        const currentValue = parseInt(energySlider.value);
        if (currentValue > 0) {
            energySlider.value = currentValue - 1;
            updateLevel1();
        }
    });
    
    updateLevel1();
}

function updateEnergyDisplay(energy) {
    document.getElementById('energyValue').textContent = energy + '%';
    document.getElementById('energyFill').style.width = energy + '%';
}


function createLevel2() {
    const levelId = 'level2';
    currentLevel = 2;
    const container = document.getElementById('app');
    
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
                </div>
            </div>
            
            ${createStandardNavigation()}
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation(levelId, 'createLevel2');
    setupLevel2();
}

function setupLevel2() {
    const energySliderAI = document.getElementById('energySliderAI');
    const gradientBtn = document.getElementById('gradientBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    function updateEnergyAI() {
        const energy = parseInt(energySliderAI.value);
        document.getElementById('energyValueAI').textContent = energy + '%';
        document.getElementById('energyFillAI').style.width = energy + '%';
        
        const loss = Math.pow(energy - OPTIMAL_ENERGY_AI, 2);
        
        if (energy === OPTIMAL_ENERGY_AI) {
            document.getElementById('status').innerHTML = '🎯 AI FOUND OPTIMAL SOLUTION! 🎯';
            document.getElementById('status').style.background = 'rgba(45, 213, 115, 0.2)';
            document.getElementById('robotImgAI').src = images.robotActive;
        } else {
            document.getElementById('status').innerHTML = `🤖 Current Loss: ${loss.toFixed(2)}<br><small>💡 Only AI can move the slider - use Gradient Descent!</small>`;
            document.getElementById('status').style.background = 'rgba(255, 255, 255, 0.8)';
            document.getElementById('robotImgAI').src = images.robot;
        }
    }
    
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