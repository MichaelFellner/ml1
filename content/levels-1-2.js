function createLevel1() {
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
            
            <button class="prev-btn" onclick="createPart1()">‹</button>
            <button id="nextLevelBtn" class="next-btn" disabled>🔒</button>
        </div>
    `;
    
    setupLevel1();
}

function setupLevel1() {
    const energySlider = document.getElementById('energySlider');
    const energyUpBtn = document.getElementById('energyUp');
    const energyDownBtn = document.getElementById('energyDown');
    const nextBtn = document.getElementById('nextLevelBtn');
    
    function updateLevel1() {
        const energy = parseInt(energySlider.value);
        updateEnergyDisplay(energy);
        
        // Calculate loss (squared error)
        const loss = Math.pow(energy - OPTIMAL_ENERGY, 2);
        
        if (energy === OPTIMAL_ENERGY) {
            document.getElementById('status').innerHTML = '⚡ OPTIMAL ENERGY REACHED! Loss = 0! ⚡';
            document.getElementById('status').style.background = 'rgba(45, 213, 115, 0.2)';
            document.getElementById('robotImg').src = images.robotActive;
            
            // Mark as completed
            if (!levelCompletions.level1) {
                levelCompletions.level1 = true;
            }
        } else {
            document.getElementById('status').innerHTML = `🤖 Current Loss: ${loss.toFixed(2)}<br><small>💡 Lower loss = better performance. Try to get loss to 0!</small>`;
            document.getElementById('status').style.background = 'rgba(255, 255, 255, 0.8)';
            document.getElementById('robotImg').src = images.robot;
        }
        
        // Update button state - keep unlocked if level was ever completed
        if (levelCompletions.level1) {
            nextBtn.disabled = false;
            nextBtn.textContent = '›';
            nextBtn.onclick = () => createLevel2();
        } else {
            nextBtn.disabled = true;
            nextBtn.textContent = '🔒';
            nextBtn.onclick = null;
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
    currentLevel = 1;
    const container = document.getElementById('app');
    
    container.innerHTML = `
        <div class="current-level">
            ${createLevelHeader(1, 2, 9)}

            <div class="level-content">
                <div class="visual-section">
                    <h3>Sorceress Elara's Brew</h3>
                    <div class="witch-container">
                        <img id="witchImg" src="${images.witch}" alt="Witch" class="main-image">
                        <div id="cauldronBrew" class="cauldron-brew"></div>
                    </div>
                </div>
                <div class="controls-section">
                    <label>Potion Ingredients:</label>
                    <div class="potion-controls">
                        <div>
                            <label for="yellowSlider">🟡 Yellow Essence:</label>
                            <div class="slider-controls">
                                <button id="yellowDown" class="slider-btn">-</button>
                                <input type="range" id="yellowSlider" min="0" max="100" value="30" step="1">
                                <button id="yellowUp" class="slider-btn">+</button>
                            </div>
                            <span id="yellowValue">30%</span>
                        </div>
                        <div>
                            <label for="blueSlider">🔵 Blue Essence:</label>
                            <div class="slider-controls">
                                <button id="blueDown" class="slider-btn">-</button>
                                <input type="range" id="blueSlider" min="0" max="100" value="20" step="1">
                                <button id="blueUp" class="slider-btn">+</button>
                            </div>
                            <span id="blueValue">20%</span>
                        </div>
                    </div>
                    <div id="status" class="status">🔬 Total Loss: 2500.00<br><small>💡 Lower loss = better brew. Get both ingredients perfect!</small></div>
                </div>
            </div>
            
            <button class="prev-btn" onclick="createLevel1()">‹</button>
            <button id="nextLevelBtn" class="next-btn" disabled>🔒</button>
        </div>
    `;
    
    setupLevel2();
}

function setupLevel2() {
    const yellowSlider = document.getElementById('yellowSlider');
    const blueSlider = document.getElementById('blueSlider');
    const yellowUpBtn = document.getElementById('yellowUp');
    const yellowDownBtn = document.getElementById('yellowDown');
    const blueUpBtn = document.getElementById('blueUp');
    const blueDownBtn = document.getElementById('blueDown');
    const nextBtn = document.getElementById('nextLevelBtn');
    
    function updatePotions() {
        const yellow = parseInt(yellowSlider.value);
        const blue = parseInt(blueSlider.value);
        
        document.getElementById('yellowValue').textContent = yellow + '%';
        document.getElementById('blueValue').textContent = blue + '%';
        
        // Update cauldron color
        const brewQuality = Math.max(0, 1 - (Math.abs(yellow - OPTIMAL_YELLOW) + Math.abs(blue - OPTIMAL_BLUE)) / 100);
        const r = Math.round(101 + (50 - 101) * brewQuality);
        const g = Math.round(67 + (205 - 67) * brewQuality);
        const b = Math.round(33 + (50 - 33) * brewQuality);
        document.getElementById('cauldronBrew').style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        
        // Calculate total loss (sum of squared errors)
        const yellowLoss = Math.pow(yellow - OPTIMAL_YELLOW, 2);
        const blueLoss = Math.pow(blue - OPTIMAL_BLUE, 2);
        const totalLoss = yellowLoss + blueLoss;
        
        if (yellow === OPTIMAL_YELLOW && blue === OPTIMAL_BLUE) {
            document.getElementById('status').innerHTML = '✨ PERFECT MAGICAL BREW! Loss = 0! ✨';
            document.getElementById('status').style.background = 'rgba(45, 213, 115, 0.2)';
            
            // Mark as completed
            if (!levelCompletions.level2) {
                levelCompletions.level2 = true;
            }
        } else {
            document.getElementById('status').innerHTML = `🔬 Total Loss: ${totalLoss.toFixed(2)}<br><small>💡 Lower loss = better brew. Get both ingredients perfect!</small>`;
            document.getElementById('status').style.background = 'rgba(255, 255, 255, 0.8)';
        }
        
        // Update button state - keep unlocked if level was ever completed
        if (levelCompletions.level2) {
            nextBtn.disabled = false;
            nextBtn.textContent = '›';
            nextBtn.onclick = () => createPart2();
        } else {
            nextBtn.disabled = true;
            nextBtn.textContent = '🔒';
            nextBtn.onclick = null;
        }
        
        // Update button states
        yellowUpBtn.disabled = yellow >= 100;
        yellowDownBtn.disabled = yellow <= 0;
        blueUpBtn.disabled = blue >= 100;
        blueDownBtn.disabled = blue <= 0;
    }
    
    // Slider event listeners
    yellowSlider.addEventListener('input', updatePotions);
    blueSlider.addEventListener('input', updatePotions);
    
    // Button event listeners
    yellowUpBtn.addEventListener('click', () => {
        const currentValue = parseInt(yellowSlider.value);
        if (currentValue < 100) {
            yellowSlider.value = currentValue + 1;
            updatePotions();
        }
    });
    
    yellowDownBtn.addEventListener('click', () => {
        const currentValue = parseInt(yellowSlider.value);
        if (currentValue > 0) {
            yellowSlider.value = currentValue - 1;
            updatePotions();
        }
    });
    
    blueUpBtn.addEventListener('click', () => {
        const currentValue = parseInt(blueSlider.value);
        if (currentValue < 100) {
            blueSlider.value = currentValue + 1;
            updatePotions();
        }
    });
    
    blueDownBtn.addEventListener('click', () => {
        const currentValue = parseInt(blueSlider.value);
        if (currentValue > 0) {
            blueSlider.value = currentValue - 1;
            updatePotions();
        }
    });
    
    updatePotions();
}