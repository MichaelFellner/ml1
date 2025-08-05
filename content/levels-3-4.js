function createLevel3() {
    currentLevel = 1;
    const container = document.getElementById('app');
    
    container.innerHTML = `
        <div class="current-level">
            ${createLevelHeader(2, 3, 9)}

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
            
            ${createStandardNavigation()}
        </div>
    `;
    
    setupLevel3();
}

function setupLevel3() {
    const yellowSlider = document.getElementById('yellowSlider');
    const blueSlider = document.getElementById('blueSlider');
    const yellowUpBtn = document.getElementById('yellowUp');
    const yellowDownBtn = document.getElementById('yellowDown');
    const blueUpBtn = document.getElementById('blueUp');
    const blueDownBtn = document.getElementById('blueDown');
    
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
        } else {
            document.getElementById('status').innerHTML = `🔬 Total Loss: ${totalLoss.toFixed(2)}<br><small>💡 Lower loss = better brew. Get both ingredients perfect!</small>`;
            document.getElementById('status').style.background = 'rgba(255, 255, 255, 0.8)';
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

function createLevel4() {
    currentLevel = 3;
    const container = document.getElementById('app');
    
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
                </div>
            </div>
            
            ${createStandardNavigation()}
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
        orange: document.getElementById('orangeSlider')
    };
    
    const values = {
        red: document.getElementById('redValue'),
        yellow: document.getElementById('yellowValueMulti'),
        green: document.getElementById('greenValue'),
        blue: document.getElementById('blueValueMulti'),
        purple: document.getElementById('purpleValue'),
        orange: document.getElementById('orangeValue')
    };
    
    const gradientBtn = document.getElementById('gradientMultiBtn');
    const resetBtn = document.getElementById('resetMultiBtn');
    
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
        } else {
            const totalLoss = Object.keys(levels).reduce((sum, color) => {
                return sum + Math.pow(levels[color] - optimalValues[color], 2);
            }, 0);
            document.getElementById('status').textContent = `🔬 Total Loss: ${totalLoss.toFixed(1)} | Optimal: ${optimalCount}/6`;
            document.getElementById('status').style.background = 'rgba(255, 255, 255, 0.8)';
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