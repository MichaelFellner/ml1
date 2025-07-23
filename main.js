/**
 * main.js - Complete Simple Level System with Introduction and Parts
 * Introduction → Part 1 → Levels 1-2 → Part 2 → Levels 3-4 → Part 3 → Levels 5-6 → Part 4 → Levels 7-10
 */

function init() {
    console.log('Initializing...');
    
    if (typeof levels === 'undefined') {
        setTimeout(init, 100);
        return;
    }
    
    optimizer = new OptimizationEngine(LEARNING_RATE);
    createIntroduction();
}

// === INTRODUCTION ===
function createIntroduction() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration">
                <h1>How A.I. Works for Beginners</h1>
                <p>From A.I. models predicting the weather to Chat-GPT predicting 
                what word to write next, almost all A.I. models learn to make better predictions using the same core algorithm: <b>gradient descent</b>. 
                Through a series of 9 levels, this site will introduce you to what gradient descent is and how it powers A.I. systems!</p>
                <div class="button-container">
                    <button class="next-btn" onclick="createPart1()">🚀 Begin Journey</button>
                </div>
            </div>
        </div>
    `;
}

// === PART 1 ===
function createPart1() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration">
                <h1>Let's Tune Things Ourselves</h1>
                <p>Gradient descent is a powerful algorithm that can tune variables to their optimal values. But to really appreciate it, lets first 
                try tuning things ourselves.</p>
                <div class="button-container">
                    <button class="prev-btn" onclick="createIntroduction()">← Back to Introduction</button>
                    <button class="next-btn" onclick="createLevel1()">✅ Start Level 1</button>
                </div>
            </div>
        </div>
    `;
}

// === PART 2 ===
function createPart2() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration">
                <h1>Introducing Gradient Descent</h1>
                <p>Gradient descent can do the tuning work all on its own. Gradient descent uses "loss", a measure of how off from the goal it is, in order to tune 
                variables. Similar to how we saw if we were getting warmer or colder in levels 1 and 2.</p>
                <div class="button-container">
                    <button class="prev-btn" onclick="createLevel2()">← Back to Level 2</button>
                    <button class="next-btn" onclick="createLevel3()">🤖 Start Level 3</button>
                </div>
            </div>
        </div>
    `;
}

// === PART 3 ===
function createPart3() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration">
                <h1>Using Data to Make Predictions</h1>
                <p>In the next two levels we'll introduce another important concept in A.I., using data to make better predictions. Later 
                in levels 7-9 we will put everything we learned together.</p>
                <div class="button-container">
                    <button class="prev-btn" onclick="createLevel4()">← Back to Level 4</button>
                    <button class="next-btn" onclick="createLevel5()">🌍 Start Level 5</button>
                </div>
            </div>
        </div>
    `;
}

// === PART 4 ===
function createPart4() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration">
                <h1>Combining Gradient Descent and Training Data</h1>
                <p>We've now seen how gradient descent works and the importance of using data to make better predictions. Now we'll learn how gradient descent can be
                used with data to make better predictions. We'll use gradient descent to make a prediction on training data, and then be able to make a better prediction
                on future data.</p>
                <div class="button-container">
                    <button class="prev-btn" onclick="createLevel6()">← Back to Level 6</button>
                    <button class="next-btn" onclick="createLevel7()">📊 Start Level 7</button>
                </div>
            </div>
        </div>
    `;
}

// Helper function to create level headers with descriptions
function createLevelHeader(levelIndex, levelNumber, totalLevels) {
    const level = levels[levelIndex];
    const hasDescription = level.description && level.description.trim() !== '';
    
    return `
        <div class="level-header">
            Level ${levelNumber}/${totalLevels}: ${level.goal}
            ${hasDescription ? `<div class="level-description">${level.description}</div>` : ''}
        </div>
    `;
}

// === LEVEL 1: ENERGY CONTROL ===
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
                    <input type="range" id="energySlider" min="0" max="100" value="50" step="1">
                    <div class="display">
                        <span>Energy: </span>
                        <div class="energy-bar">
                            <div id="energyFill" class="energy-fill"></div>
                        </div>
                        <span id="energyValue">50%</span>
                    </div>
                    <div id="status" class="status">Adjusting energy level...</div>
                    <div class="button-container">
                        <button class="prev-btn" onclick="createPart1()">← Back to Part 1</button>
                        <button id="nextLevelBtn" class="next-btn" disabled>🔒 Complete Level 1 to Continue</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    setupLevel1();
}

function setupLevel1() {
    const energySlider = document.getElementById('energySlider');
    const nextBtn = document.getElementById('nextLevelBtn');
    let previousDistance = Math.abs(50 - OPTIMAL_ENERGY); // Initial distance from starting value
    
    energySlider.addEventListener('input', (e) => {
        const energy = parseInt(e.target.value);
        updateEnergyDisplay(energy);
        
        if (energy === OPTIMAL_ENERGY) {
            document.getElementById('status').textContent = '⚡ OPTIMAL ENERGY REACHED! ⚡';
            document.getElementById('status').style.background = 'rgba(45, 213, 115, 0.2)';
            document.getElementById('robotImg').src = images.robotActive;
            
            nextBtn.disabled = false;
            nextBtn.textContent = '✅ Go to Level 2';
            nextBtn.onclick = () => createLevel2();
        } else {
            const currentDistance = Math.abs(energy - OPTIMAL_ENERGY);
            let statusText = 'Adjusting energy level...';
            
            if (currentDistance < previousDistance) {
                statusText = '🔥 Getting warmer!';
            } else if (currentDistance > previousDistance) {
                statusText = '🧊 Getting colder!';
            } 
            
            document.getElementById('status').textContent = statusText;
            document.getElementById('status').style.background = 'rgba(255, 255, 255, 0.8)';
            document.getElementById('robotImg').src = images.robot;
            previousDistance = currentDistance;
            
            // Only disable if not already completed
            if (!levelCompletions.level1) {
                nextBtn.disabled = true;
                nextBtn.textContent = '🔒 Complete Level 1 to Continue';
                nextBtn.onclick = null;
            }
        }
    });
    
    updateEnergyDisplay(50);
}

function updateEnergyDisplay(energy) {
    document.getElementById('energyValue').textContent = energy + '%';
    document.getElementById('energyFill').style.width = energy + '%';
}

// === LEVEL 2: POTION BREWING ===
function createLevel2() {
    currentLevel = 1;
    const container = document.getElementById('app');
    
    // Check if level is already completed
    const isCompleted = levelCompletions.level2;
    const nextBtnState = isCompleted ? '' : 'disabled';
    const nextBtnText = isCompleted ? '✅ Go to Part 2' : '🔒 Complete Level 2 to Continue';
    
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
                            <input type="range" id="yellowSlider" min="0" max="100" value="30" step="1">
                            <span id="yellowValue">30%</span>
                        </div>
                        <div>
                            <label for="blueSlider">🔵 Blue Essence:</label>
                            <input type="range" id="blueSlider" min="0" max="100" value="20" step="1">
                            <span id="blueValue">20%</span>
                        </div>
                    </div>
                    <div id="status" class="status">Mixing potions...</div>
                    <div class="button-container">
                        <button id="prevLevelBtn" class="prev-btn" onclick="createLevel1()">← Back to Level 1</button>
                        <button id="nextLevelBtn" class="next-btn" ${nextBtnState}>${nextBtnText}</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    setupLevel2();
}

function setupLevel2() {
    const yellowSlider = document.getElementById('yellowSlider');
    const blueSlider = document.getElementById('blueSlider');
    const nextBtn = document.getElementById('nextLevelBtn');
    
    // Calculate initial distance from optimal
    let previousDistance = Math.abs(30 - OPTIMAL_YELLOW) + Math.abs(20 - OPTIMAL_BLUE);
    
    // Set up click handler if already completed
    if (levelCompletions.level2) {
        nextBtn.onclick = () => createPart2();
    }
    
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
        
        if (yellow === OPTIMAL_YELLOW && blue === OPTIMAL_BLUE) {
            document.getElementById('status').textContent = '✨ PERFECT MAGICAL BREW! ✨';
            document.getElementById('status').style.background = 'rgba(45, 213, 115, 0.2)';
            
            if (!levelCompletions.level2) {
                levelCompletions.level2 = true;
            }
            nextBtn.disabled = false;
            nextBtn.textContent = '✅ Go to Part 2';
            nextBtn.onclick = () => createPart2();
        } else {
            const currentDistance = Math.abs(yellow - OPTIMAL_YELLOW) + Math.abs(blue - OPTIMAL_BLUE);
            let statusText = 'Mixing potions...';
            
            if (currentDistance < previousDistance) {
                statusText = '✨ Getting warmer! The magic is getting stronger!';
            } else if (currentDistance > previousDistance) {
                statusText = '💨 Getting colder! The brew is getting weaker!';
            } 
            document.getElementById('status').textContent = statusText;
            document.getElementById('status').style.background = 'rgba(255, 255, 255, 0.8)';
            previousDistance = currentDistance;
            
            // Only disable if not already completed
            if (!levelCompletions.level2) {
                nextBtn.disabled = true;
                nextBtn.textContent = '🔒 Complete Level 2 to Continue';
                nextBtn.onclick = null;
            }
        }
    }
    
    yellowSlider.addEventListener('input', updatePotions);
    blueSlider.addEventListener('input', updatePotions);
    updatePotions();
}

// === LEVEL 3: AI OPTIMIZATION ===
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

// === LEVEL 4: MULTI-POTION MASTERY ===
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

// === LEVEL 5: REAL-WORLD CHALLENGE ===
function createLevel5() {
    currentLevel = 4;
    userMoney = 10; // Reset money
    const container = document.getElementById('app');
    
    // Check if level is already completed
    const isCompleted = levelCompletions.level5;
    const nextBtnState = isCompleted ? '' : 'disabled';
    const nextBtnText = isCompleted ? '✅ Go to Level 6' : '🔒 Complete Level 5 to Continue';
    
    container.innerHTML = `
        <div class="current-level">
            ${createLevelHeader(4, 5, 9)}
            <div class="level-content">
                <div class="visual-section">
                    <h3>Meet Max - He Needs a Bone!</h3>
                    <img id="dogImg" src="${images.dog}" alt="Max the dog" class="main-image">
                </div>
                <div class="controls-section">
                    <div class="money-display">💰 Money: <span id="moneyDisplay">$${userMoney}</span></div>
                    <label for="boneSizeSlider">🦴 Bone Size (inches):</label>
                    <input type="range" id="boneSizeSlider" min="5" max="95" value="50" step="1">
                    <div class="display">
                        Size: <span id="boneSizeValue">50 inches</span>
                    </div>
                    <div class="ai-controls">
                        <button id="buyBoneBtn" class="action-btn">🛒 Buy Bone ($5)</button>
                        <button id="gradientDisabledBtn" class="action-btn" disabled style="opacity: 0.5; position: relative;">🤖 Gradient Descent</button>
                    </div>
                    <div id="status" class="status">🐕 Max is waiting for his bone! What size do you think he'll like?<br><small>💡 Without knowing his preference, this is just a guess...</small></div>
                    <div class="button-container">
                        <button id="prevLevelBtn" class="prev-btn" onclick="createPart3()">← Back to Part 3</button>
                        <button id="nextLevelBtn" class="next-btn" ${nextBtnState}>${nextBtnText}</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    setupLevel5();
}

function setupLevel5() {
    const boneSizeSlider = document.getElementById('boneSizeSlider');
    const buyBoneBtn = document.getElementById('buyBoneBtn');
    const gradientDisabledBtn = document.getElementById('gradientDisabledBtn');
    const nextBtn = document.getElementById('nextLevelBtn');
    
    // Set up click handler if already completed
    if (levelCompletions.level5) {
        nextBtn.onclick = () => createLevel6();
    }
    
    // Add hover tooltip for disabled gradient descent button
    let tooltip = null;
    
    gradientDisabledBtn.addEventListener('mouseenter', () => {
        tooltip = document.createElement('div');
        tooltip.className = 'gradient-tooltip';
        tooltip.innerHTML = '❌ Gradient descent only works when we know the target!<br><small>We don\'t know Max\'s preference yet.</small>';
        tooltip.style.cssText = `
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 10px 15px;
            border-radius: 8px;
            font-size: 12px;
            line-height: 1.3;
            white-space: nowrap;
            z-index: 1000;
            margin-bottom: 5px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            pointer-events: none;
        `;
        
        // Add arrow pointing down
        const arrow = document.createElement('div');
        arrow.style.cssText = `
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 6px solid rgba(0, 0, 0, 0.9);
        `;
        tooltip.appendChild(arrow);
        
        gradientDisabledBtn.appendChild(tooltip);
    });
    
    gradientDisabledBtn.addEventListener('mouseleave', () => {
        if (tooltip) {
            tooltip.remove();
            tooltip = null;
        }
    });
    
    boneSizeSlider.addEventListener('input', () => {
        const size = parseInt(boneSizeSlider.value);
        document.getElementById('boneSizeValue').textContent = size + ' inches';
    });
    
    buyBoneBtn.addEventListener('click', () => {
        if (userMoney < 5) return;
        
        userFirstGuess = parseInt(boneSizeSlider.value);
        
        // Generate Max's true preference (always make it challenging - user should always be >15" off)
        if (userFirstGuess <= 20) {
            trueBoneSize = userFirstGuess + Math.floor(Math.random() * 30) + 16;
        } else if (userFirstGuess >= 80) {
            trueBoneSize = userFirstGuess - Math.floor(Math.random() * 30) - 16;
        } else {
            const goHigher = Math.random() < 0.5;
            if (goHigher) {
                trueBoneSize = userFirstGuess + Math.floor(Math.random() * 25) + 16;
            } else {
                trueBoneSize = userFirstGuess - Math.floor(Math.random() * 25) - 16;
            }
        }
        trueBoneSize = Math.max(5, Math.min(95, trueBoneSize));
        
        userMoney -= 5;
        dogBonesPurchased++;
        
        // Update feedback (user is always >15" off, so always show sad dog)
        const difference = Math.abs(userFirstGuess - trueBoneSize);
        let reaction;
        if (difference > 30) {
            reaction = "😞 Max sniffs the bone but walks away sadly. This size is way off!";
        } else {
            reaction = "😐 Max tries the bone but seems uninterested. Not quite right...";
        }
        document.getElementById('dogImg').src = images.dogSad;
        
        document.getElementById('status').innerHTML = `
            <strong>Result:</strong><br>
            ${reaction}<br>
        `;
        document.getElementById('status').style.background = 'rgba(255, 107, 107, 0.1)';
        
        document.getElementById('moneyDisplay').textContent = `${userMoney}`;
        buyBoneBtn.disabled = true;
        buyBoneBtn.textContent = '🦴 Bone Purchased';
        
        if (!levelCompletions.level5) {
            levelCompletions.level5 = true;
        }
        nextBtn.disabled = false;
        nextBtn.textContent = '✅ Go to Level 6';
        nextBtn.onclick = () => createLevel6();
    });
}

// === LEVEL 6: TRAINING DATA POWER ===
function createLevel6() {
    currentLevel = 5;
    // Only reset success flag if level wasn't already completed
    if (!levelCompletions.level6) {
        level6Success = false;
    }
    const container = document.getElementById('app');
    
    // Check if level is already completed
    const isCompleted = levelCompletions.level6;
    const nextBtnState = isCompleted ? '' : 'disabled';
    const nextBtnText = isCompleted ? '✅ Go to Part 4' : '🔒 Complete Level 6 to Continue';
    
    container.innerHTML = `
        <div class="current-level">
            ${createLevelHeader(5, 6, 9)}
            <div class="level-content">
                <div class="visual-section">
                    <h3>Second Chance with Training Data!</h3>
                    <div id="trainingDogs" class="training-data">
                        ${generateTrainingDogsHTML()}
                    </div>
                    <img id="dogImg2" src="${images.dog}" alt="Max with training data" class="dog-image2">
                </div>
                <div class="controls-section">
                    <div class="money-display">💰 Money: <span id="moneyDisplay2">$${userMoney}</span></div>
                    <label for="boneSizeSlider2">🦴 Bone Size (inches):</label>
                    <input type="range" id="boneSizeSlider2" min="5" max="95" value="50" step="1">
                    <div class="display">
                        Size: <span id="boneSizeValue2">50 inches</span>
                    </div>
                    <button id="buyBoneBtn2" class="action-btn">🛒 Buy Final Bone ($5)</button>
                    <div id="status" class="status">🎯 Now you have data! Use the training information to make a better guess for Max.<br><small>📊 Machine learning works best with good training data!</small></div>
                    <div class="button-container">
                        <button id="prevLevelBtn" class="prev-btn" onclick="createLevel5()">← Back to Level 5</button>
                        <button id="nextLevelBtn" class="next-btn" ${nextBtnState}>${nextBtnText}</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    setupLevel6();
}

function generateTrainingDogsHTML() {
    if (!trueBoneSize) return '<div>No training data available yet.</div>';
    
    const dogNames = ['Buddy', 'Luna', 'Charlie', 'Bella'];
    let html = '<h4>🐕 Training Data: Other Dogs\' Preferences</h4><div class="dog-grid">';
    
    const trainingData = [];
    for (let i = 0; i < 4; i++) {
        const deviation = (Math.random() - 0.5) * 16;
        let dogBoneSize = Math.round(trueBoneSize + deviation);
        dogBoneSize = Math.max(5, Math.min(95, dogBoneSize));
        trainingData.push(dogBoneSize);
        
        html += `
            <div class="dog-item">
                <img src="${images.dog}" alt="${dogNames[i]}" style="width: 60px; height: 60px; object-fit: contain;">
                <div style="font-weight: bold; font-size: 12px; margin-top: 5px;">${dogNames[i]}</div>
                <div style="font-size: 11px; color: #666; margin-top: 2px;">Likes ${dogBoneSize}" bones</div>
            </div>
        `;
    }
    
    html += '</div>';
    
    const average = trainingData.reduce((sum, val) => sum + val, 0) / trainingData.length;
    
    return html;
}

function setupLevel6() {
    const boneSizeSlider2 = document.getElementById('boneSizeSlider2');
    const buyBoneBtn2 = document.getElementById('buyBoneBtn2');
    const nextBtn = document.getElementById('nextLevelBtn');
    
    // Set up click handler if already completed
    if (levelCompletions.level6) {
        nextBtn.onclick = () => createPart4();
    }
    
    boneSizeSlider2.addEventListener('input', () => {
        const size = parseInt(boneSizeSlider2.value);
        document.getElementById('boneSizeValue2').textContent = size + ' inches';
    });
    
    buyBoneBtn2.addEventListener('click', () => {
        if (userMoney < 5) return;
        
        const userGuess2 = parseInt(boneSizeSlider2.value);
        userMoney -= 5;
        dogBonesPurchased++;
        
        const difference = Math.abs(userGuess2 - trueBoneSize);
        let reaction, success = false;
        
        if (difference <= 5) {
            reaction = "🎉 MAX LOVES IT! Perfect size bone - he's wagging his tail like crazy!";
            success = true;
            document.getElementById('dogImg2').src = images.dogHappy;
        } else if (difference <= 10) {
            reaction = "😊 Great choice! Max is happy with this bone and starts chewing right away!";
            success = true;
            document.getElementById('dogImg2').src = images.dogHappy;
        } else if (difference <= 15) {
            reaction = "😐 Max tries the bone but seems uninterested. Not quite right...";
            document.getElementById('dogImg2').src = images.dogSad;
        } else {
            reaction = "😞 Max sniffs the bone but walks away sadly. This size is way off!";
            document.getElementById('dogImg2').src = images.dogSad;
        }
        
        if (success) {
            // Level completed successfully
            document.getElementById('status').innerHTML = `
                <strong>Final Result:</strong><br>
                ${reaction}<br>
                <small>You guessed ${userGuess2} inches. Max's true preference: ${trueBoneSize} inches (${difference}" off)</small><br>
                <strong>🏆 SUCCESS! Training data helped you succeed!</strong>
            `;
            document.getElementById('status').style.background = 'rgba(45, 213, 115, 0.1)';
            
            buyBoneBtn2.disabled = true;
            buyBoneBtn2.textContent = '🦴 Perfect Bone Purchased!';
            
            level6Success = true; // Set success flag
            if (!levelCompletions.level6) {
                levelCompletions.level6 = true;
            }
            nextBtn.disabled = false;
            nextBtn.textContent = '✅ Go to Part 4';
            nextBtn.onclick = () => createPart4();
        } else {
            // Failed - give another chance
            userMoney += 5; // Found another $5!
            
            document.getElementById('status').innerHTML = `
                <strong>Result:</strong><br>
                ${reaction}<br>
                <small>You guessed ${userGuess2} inches. Max's true preference: ${trueBoneSize} inches (${difference}" off)</small><br>
                <small>💰 Wait! You found another $5 in your back pocket! Try again with the training data.</small><br>
                <strong>📚 Use the training data more carefully - look at the average preferred size!</strong>
            `;
            document.getElementById('status').style.background = 'rgba(255, 193, 7, 0.1)';
            
            // Re-enable the button for another attempt
            buyBoneBtn2.disabled = false;
            buyBoneBtn2.textContent = '🛒 Try Another Bone ($5)';
        }
        
        document.getElementById('moneyDisplay2').textContent = `${userMoney}`;
    });
}

// === LEVEL 7: LARGE SCALE PREDICTION (BAD) ===
function createLevel7() {
    currentLevel = 6;
    predictionUsed7 = false;
    const container = document.getElementById('app');
    
    // Check if level is already completed
    const isCompleted = levelCompletions.level7;
    const nextBtnState = isCompleted ? '' : 'disabled';
    const nextBtnText = isCompleted ? '✅ Go to Level 8' : '🔒 Complete Level 7 to Continue';
    
    container.innerHTML = `
        <div class="current-level">
            ${createLevelHeader(6, 7, 9)}
            <div class="level-content full-width">
                <div class="visual-section">
                    <h3>1000 Robot Factory</h3>
                    <div class="robot-prediction-layout">
                        <div class="robot-grid" id="robotGrid7">
                            ${createRobotGridHTML()}
                        </div>
                        <div class="prediction-controls">
                            <button id="usePredictionBtn7" class="action-btn">🔮 Use Basic Prediction Model</button>
                            <div id="status" class="status">📊 <strong>1000 robots waiting for activation...</strong><br><small>Click "Use Basic Prediction Model" to see how your simple model performs at scale!</small></div>
                            <div class="button-container">
                                <button id="prevLevelBtn" class="prev-btn" onclick="createPart4()">← Back to Part 4</button>
                                <button id="nextLevelBtn" class="next-btn" ${nextBtnState}>${nextBtnText}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="controls-section">
                </div>
            </div>
        </div>
    `;
    
    setupLevel7();
}

function createRobotGridHTML() {
    let html = '';
    for (let i = 0; i < 1000; i++) {
        html += `<div class="robot-dot" id="robot7-${i}"></div>`;
    }
    return html;
}

function setupLevel7() {
    const usePredictionBtn7 = document.getElementById('usePredictionBtn7');
    const nextBtn = document.getElementById('nextLevelBtn');
    
    // Set up click handler if already completed
    if (levelCompletions.level7) {
        nextBtn.onclick = () => createLevel8();
    }
    
    usePredictionBtn7.addEventListener('click', () => {
        const activatedCount = Math.floor(1000 * 0.11 + Math.random() * 20 - 10);
        
        // Activate random robots
        const activatedIndices = [];
        while (activatedIndices.length < activatedCount) {
            const randomIndex = Math.floor(Math.random() * 1000);
            if (!activatedIndices.includes(randomIndex)) {
                activatedIndices.push(randomIndex);
            }
        }
        
        // Update robot grid
        for (let i = 0; i < 1000; i++) {
            const robot = document.getElementById(`robot7-${i}`);
            if (robot) {
                robot.classList.remove('active');
                robot.classList.add('inactive');
            }
        }
        
        activatedIndices.forEach(index => {
            const robot = document.getElementById(`robot7-${index}`);
            if (robot) {
                robot.classList.remove('inactive');
                robot.classList.add('active');
            }
        });
        
        document.getElementById('status').innerHTML = `
            📊 <strong>Basic Prediction Results:</strong><br>
            Activated: ${activatedCount}/1000 robots (${(activatedCount/10).toFixed(1)}%)<br>
            <small>❌ Only ${(activatedCount/10).toFixed(1)}% success rate! The model needs better features and training.</small>
        `;
        document.getElementById('status').style.background = 'rgba(255, 107, 107, 0.1)';
        
        usePredictionBtn7.disabled = true;
        usePredictionBtn7.textContent = '✅ Basic Prediction Applied';
        
        predictionUsed7 = true;
        if (!levelCompletions.level7) {
            levelCompletions.level7 = true;
        }
        nextBtn.disabled = false;
        nextBtn.textContent = '✅ Go to Level 8';
        nextBtn.onclick = () => createLevel8();
    });
}

// === LEVEL 8: FEATURE ENGINEERING ===
function createLevel8() {
    currentLevel = 7;
    initializeFeatureLearning();
    const container = document.getElementById('app');
    
    // Check if level is already completed
    const isCompleted = levelCompletions.level8;
    const nextBtnState = isCompleted ? '' : 'disabled';
    const nextBtnText = isCompleted ? '✅ Go to Level 9' : '🔒 Complete Level 8 to Continue';
    
    container.innerHTML = `
        <div class="current-level">
            ${createLevelHeader(7, 8, 9)}
            <div class="level-content">
                <div class="visual-section">
                    <h3>Training Data Robots</h3>
                    <div class="feature-robots" id="featureRobots">
                        ${createFeatureRobotsHTML()}
                    </div>
                </div>
                <div class="controls-section">
                    <div class="feature-function">
                        <h4>Prediction Function</h4>
                        <div class="weight-display">
                            Energy = <span id="weightA">${featureWeights.A.toFixed(2)}</span> × Height + <span id="weightB">${featureWeights.B.toFixed(2)}</span> × Head Size + <span id="weightC">${featureWeights.C.toFixed(2)}</span> × Eye Glow
                        </div>
                        <div class="loss-display">
                            Current Loss: <span id="currentLoss">${currentLoss.toFixed(2)}</span>
                        </div>
                        <div class="ai-controls">
                            <button id="optimizeWeightsBtn" class="action-btn">🔬 Optimize Weights</button>
                            <button id="resetWeightsBtn" class="action-btn">🔄 Reset Weights</button>
                        </div>
                        <div id="stepInfo" class="info">Find the perfect combination to predict each robot's energy requirement!</div>
                    </div>
                    <div class="button-container">
                        <button id="prevLevelBtn" class="prev-btn" onclick="createLevel7()">← Back to Level 7</button>
                        <button id="nextLevelBtn" class="next-btn" ${nextBtnState}>${nextBtnText}</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    setupLevel8();
}

function initializeFeatureLearning() {
    featureOptimizer = new OptimizationEngine(0.05);
    featureData = [];
    const robotNames = ['RX-1', 'RX-2', 'RX-3', 'RX-4', 'RX-5', 'RX-6', 'RX-7', 'RX-8', 'RX-9', 'RX-10'];
    
    for (let i = 0; i < 10; i++) {
        const height = Math.random() * 60 + 40;
        const headSize = Math.random() * 40 + 20;
        const eyeGlow = Math.random();
        const energyRequired = 0.6 * height + 0.3 * headSize + 0.1 * eyeGlow * 100 + (Math.random() - 0.5) * 3;
        
        featureData.push({
            name: robotNames[i],
            height,
            headSize,
            eyeGlow,
            energyRequired
        });
    }
    
    updateLoss();
}

function createFeatureRobotsHTML() {
    let html = '';
    featureData.forEach((robot, index) => {
        const prediction = featureWeights.A * robot.height + 
                         featureWeights.B * robot.headSize + 
                         featureWeights.C * robot.eyeGlow * 100;
        
        html += `
            <div class="feature-robot">
                <img src="${images.robot}" alt="${robot.name}" style="width: 50px; height: 65px; object-fit: contain; margin-bottom: 6px;">
                <div style="font-size: 9px; line-height: 1.1; color: #333;">
                    <strong>${robot.name}</strong><br>
                    Height: ${robot.height.toFixed(1)}<br>
                    Head: ${robot.headSize.toFixed(1)}<br>
                    Glow: ${(robot.eyeGlow * 100).toFixed(1)}%<br>
                    <span style="color: #ff6b6b; font-weight: bold;">Actual: ${robot.energyRequired.toFixed(1)}</span><br>
                    <span style="color: #667eea; font-weight: bold;">Predicted: ${prediction.toFixed(1)}</span>
                </div>
            </div>
        `;
    });
    return html;
}

function updateLoss() {
    const predictions = featureData.map(robot =>
        featureWeights.A * robot.height +
        featureWeights.B * robot.headSize +
        featureWeights.C * robot.eyeGlow * 100
    );
    const trueValues = featureData.map(robot => robot.energyRequired);
    
    let totalSquaredError = 0;
    for (let i = 0; i < predictions.length; i++) {
        const error = predictions[i] - trueValues[i];
        totalSquaredError += error * error;
    }
    currentLoss = totalSquaredError / predictions.length;
}

function setupLevel8() {
    const optimizeBtn = document.getElementById('optimizeWeightsBtn');
    const resetBtn = document.getElementById('resetWeightsBtn');
    const nextBtn = document.getElementById('nextLevelBtn');
    
    // Set up click handler if already completed
    if (levelCompletions.level8) {
        nextBtn.onclick = () => createLevel9();
    }
    
    optimizeBtn.addEventListener('click', () => {
        const predictions = featureData.map(robot =>
            featureWeights.A * robot.height +
            featureWeights.B * robot.headSize +
            featureWeights.C * robot.eyeGlow * 100
        );
        const trueValues = featureData.map(robot => robot.energyRequired);
        
        let gradA = 0, gradB = 0, gradC = 0;
        for (let i = 0; i < featureData.length; i++) {
            const error = predictions[i] - trueValues[i];
            gradA += 2 * error * featureData[i].height;
            gradB += 2 * error * featureData[i].headSize;
            gradC += 2 * error * featureData[i].eyeGlow * 100;
        }
        
        gradA /= featureData.length;
        gradB /= featureData.length;
        gradC /= featureData.length;

        const learningRate = 0.00002;
        const maxUpdate = 0.005;
        
        const deltaA = Math.max(-maxUpdate, Math.min(maxUpdate, -learningRate * gradA));
        const deltaB = Math.max(-maxUpdate, Math.min(maxUpdate, -learningRate * gradB));
        const deltaC = Math.max(-maxUpdate, Math.min(maxUpdate, -learningRate * gradC));
        
        featureWeights.A = Math.max(0.01, Math.min(0.99, featureWeights.A + deltaA));
        featureWeights.B = Math.max(0.01, Math.min(0.99, featureWeights.B + deltaB));
        featureWeights.C = Math.max(0.01, Math.min(0.99, featureWeights.C + deltaC));
        
        updateLoss();
        
        // Update display
        document.getElementById('weightA').textContent = featureWeights.A.toFixed(2);
        document.getElementById('weightB').textContent = featureWeights.B.toFixed(2);
        document.getElementById('weightC').textContent = featureWeights.C.toFixed(2);
        document.getElementById('currentLoss').textContent = currentLoss.toFixed(2);
        document.getElementById('featureRobots').innerHTML = createFeatureRobotsHTML();
        
        document.getElementById('stepInfo').innerHTML = `
            Loss: ${currentLoss.toFixed(2)} | Target weights: A≈0.6, B≈0.3, C≈0.1<br>
            Current: A=${featureWeights.A.toFixed(2)}, B=${featureWeights.B.toFixed(2)}, C=${featureWeights.C.toFixed(2)}
        `;
        
        if (currentLoss < 5.0) {
            if (!levelCompletions.level8) {
                levelCompletions.level8 = true;
            }
            nextBtn.disabled = false;
            nextBtn.textContent = '✅ Go to Level 9';
            nextBtn.onclick = () => createLevel9();
        }
    });
    
    resetBtn.addEventListener('click', () => {
        featureWeights.A = Math.random() * 0.8 + 0.1;
        featureWeights.B = Math.random() * 0.8 + 0.1;
        featureWeights.C = Math.random() * 0.8 + 0.1;
        
        updateLoss();
        
        // Update display
        document.getElementById('weightA').textContent = featureWeights.A.toFixed(2);
        document.getElementById('weightB').textContent = featureWeights.B.toFixed(2);
        document.getElementById('weightC').textContent = featureWeights.C.toFixed(2);
        document.getElementById('currentLoss').textContent = currentLoss.toFixed(2);
        document.getElementById('featureRobots').innerHTML = createFeatureRobotsHTML();
        
        document.getElementById('stepInfo').textContent = 'Reset! New random weights to optimize.';
    });
}

// === LEVEL 9: LARGE SCALE PREDICTION (GOOD) ===
function createLevel9() {
    currentLevel = 8;
    predictionUsed9 = false;
    const container = document.getElementById('app');
    
    // Check if level is already completed
    const isCompleted = levelCompletions.level9;
    const nextBtnState = isCompleted ? '' : 'disabled';
    const nextBtnText = isCompleted ? '✅ Go to Level 10' : '🔒 Complete Level 9 to Continue';
    
    container.innerHTML = `
        <div class="current-level">
            ${createLevelHeader(8, 9, 9)}
            <div class="level-content full-width">
                <div class="visual-section">
                    <h3>1000 Robot Factory - Optimized Model</h3>
                    <div class="robot-prediction-layout">
                        <div class="robot-grid" id="robotGrid9">
                            ${createRobotGrid9HTML()}
                        </div>
                        <div class="prediction-controls">
                            <button id="usePredictionBtn9" class="action-btn">🚀 Use Optimized Prediction Model</button>
                            <div id="status" class="status">🎯 <strong>1000 robots ready for optimized predictions...</strong><br><small>See the dramatic improvement from proper feature engineering!</small></div>
                            <div class="button-container">
                                <button id="prevLevelBtn" class="prev-btn" onclick="createLevel8()">← Back to Level 8</button>
                                <button id="nextLevelBtn" class="next-btn" ${nextBtnState}>${nextBtnText}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="controls-section">
                </div>
            </div>
        </div>
    `;
    
    setupLevel9();
}

function createRobotGrid9HTML() {
    let html = '';
    for (let i = 0; i < 1000; i++) {
        html += `<div class="robot-dot" id="robot9-${i}"></div>`;
    }
    return html;
}

function setupLevel9() {
    const usePredictionBtn9 = document.getElementById('usePredictionBtn9');
    const nextBtn = document.getElementById('nextLevelBtn');
    
    // Set up click handler if already completed
    if (levelCompletions.level9) {
        nextBtn.onclick = () => createLevel10();
    }
    
    usePredictionBtn9.addEventListener('click', () => {
        const activatedCount = Math.floor(1000 * 0.91 + Math.random() * 20 - 10);
        
        // Activate random robots
        const activatedIndices = [];
        while (activatedIndices.length < activatedCount) {
            const randomIndex = Math.floor(Math.random() * 1000);
            if (!activatedIndices.includes(randomIndex)) {
                activatedIndices.push(randomIndex);
            }
        }
        
        // Update robot grid
        for (let i = 0; i < 1000; i++) {
            const robot = document.getElementById(`robot9-${i}`);
            if (robot) {
                robot.classList.remove('active');
                robot.classList.add('inactive');
            }
        }
        
        activatedIndices.forEach(index => {
            const robot = document.getElementById(`robot9-${index}`);
            if (robot) {
                robot.classList.remove('inactive');
                robot.classList.add('active');
            }
        });
        
        document.getElementById('status').innerHTML = `
            🎯 <strong>Optimized Prediction Results:</strong><br>
            Activated: ${activatedCount}/1000 robots (${(activatedCount/10).toFixed(1)}%)<br>
            <small>🎉 ${(activatedCount/10).toFixed(1)}% success rate! Feature engineering dramatically improved performance!</small>
        `;
        document.getElementById('status').style.background = 'rgba(45, 213, 115, 0.1)';
        
        usePredictionBtn9.disabled = true;
        usePredictionBtn9.textContent = '🚀 Optimized Prediction Applied';
        
        predictionUsed9 = true;
        if (!levelCompletions.level9) {
            levelCompletions.level9 = true;
        }
        nextBtn.disabled = false;
        nextBtn.textContent = '✅ Go to Level 10';
        nextBtn.onclick = () => createLevel10();
    });
}

// === LEVEL 10: CONGRATULATIONS ===
function createLevel10() {
    currentLevel = 9;
    document.getElementById('app').innerHTML = `
        <div class="current-level">
            <div class="level-header">🎉 Congratulations! 🎉</div>
            <div class="level-content celebration">
                <h1>You've learned how A.I. works!</h1>
                <p>In levels 7-9, you saw how using <b>gradient descent</b> in combination with training data was used to make
                a better prediction. This basic formula is used even in very advanced A.I. models!</p>
                <div class="ai-applications">
                    <h3>Where You See This:</h3>
                    <p>🤖 <strong>ChatGPT & LLMs:</strong> Trained using gradient descent on massive text datasets</p>
                    <p>🚗 <strong>Self-Driving Cars:</strong> Neural networks optimized to recognize objects and navigate</p>
                    <p>🔍 <strong>Search Engines:</strong> Ranking algorithms fine-tuned through optimization</p>
                </div>
                <div class="button-container">
                    <button id="prevLevelBtn" class="prev-btn" onclick="createLevel9()">← Back to Level 9</button>
                    <button class="action-btn" onclick="createIntroduction()">🔄 Start Over</button>
                </div>
            </div>
        </div>
    `;
}

// Initialize
document.addEventListener('DOMContentLoaded', init);