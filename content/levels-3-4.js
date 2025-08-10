function createLevel2() {
    const levelId = 'level2';
    currentLevel = 2;
    const container = document.getElementById('app');
    
    container.innerHTML = `
        <div class="current-level">
            ${createLevelHeader(2, 3, 12)}

            <div class="level-content" style="display: flex; gap: 30px; align-items: flex-start; padding: 15px; justify-content: space-between;">
                <div class="visual-section" style="flex: 1; text-align: center; max-width: 300px;">
                    <div style="background: rgba(255,255,255,0.5); border-radius: 12px; padding: 15px; box-shadow: 0 3px 5px rgba(0,0,0,0.1);">
                        <h3 style="margin: 0 0 10px 0; color: #333; font-size: 1.1rem;">🧙‍♀️ Sorceress Elara's Brew</h3>
                        <div style="position: relative; display: inline-block;">
                            <img id="witchImg" src="${images.witch}" alt="Witch" style="width: 150px; height: 150px; object-fit: contain;">
                            <div id="cauldronBrew" style="position: absolute; bottom: 25px; left: 50%; transform: translateX(-50%); width: 45px; height: 45px; border-radius: 50%; background: rgb(101, 67, 33); transition: all 0.3s ease; box-shadow: 0 0 15px rgba(0,0,0,0.3);"></div>
                        </div>
                        <div id="potionStatus" style="margin-top: 10px; font-size: 0.95rem; color: #666; min-height: 25px;">Mix the perfect potion...</div>
                    </div>
                </div>
                
                <div class="controls-section" style="flex: 2; max-width: 550px;">
                    <div style="background: linear-gradient(135deg, rgba(118,75,162,0.1), rgba(118,75,162,0.05)); border-radius: 12px; padding: 18px; border: 2px solid transparent; transition: border-color 0.3s ease;" id="controlPanel3">
                        <h3 style="margin: 0 0 12px 0; color: #333; font-size: 1.1rem;">🧪 Mix Two Ingredients</h3>
                        
                        <!-- Loss Display -->
                        <div id="lossDisplay3" style="background: white; border-radius: 8px; padding: 10px; margin-bottom: 12px; text-align: center; box-shadow: 0 2px 3px rgba(0,0,0,0.1);">
                            <div style="display: flex; justify-content: space-around; align-items: center;">
                                <div>
                                    <div style="font-size: 0.8rem; color: #666;">Total Loss</div>
                                    <div id="lossValue3" style="font-size: 1.6rem; font-weight: bold; color: #764ba2;">90</div>
                                </div>
                                <div id="potionIndicator" style="font-size: 2.2rem;">🧪</div>
                                <div>
                                    <div style="font-size: 0.8rem; color: #666;">Perfect Mix</div>
                                    <div id="perfectCount" style="font-size: 1.6rem; font-weight: bold; color: #666;">0/2</div>
                                </div>
                            </div>
                            <div id="mixHint" style="margin-top: 6px; font-size: 0.85rem; color: #666; font-style: italic;">Adjust both ingredients to find the perfect balance!</div>
                        </div>
                        
                        <!-- Ingredient Controls -->
                        <div style="display: flex; flex-direction: column; gap: 8px; margin: 10px 0;">
                            <!-- Yellow Ingredient -->
                            <div style="background: rgba(255,215,0,0.1); border-radius: 8px; padding: 6px 8px;">
                                <div style="display: flex; align-items: center; gap: 8px; height: 28px;">
                                    <span style="font-size: 1rem;">🟡</span>
                                    <label style="color: #555; font-weight: 500; min-width: 45px; font-size: 0.9rem;">Yellow</label>
                                    <button id="yellowDown" style="width: 24px; height: 24px; border-radius: 50%; background: #ffd700; border: none; cursor: pointer; font-weight: bold; font-size: 0.9rem;">-</button>
                                    <input type="range" id="yellowSlider" min="0" max="100" value="30" step="1" style="flex: 1; height: 20px;">
                                    <button id="yellowUp" style="width: 24px; height: 24px; border-radius: 50%; background: #ffd700; border: none; cursor: pointer; font-weight: bold; font-size: 0.9rem;">+</button>
                                    <span id="yellowValue" style="font-size: 0.9rem; font-weight: bold; color: #d4af37; min-width: 35px; text-align: right;">30%</span>
                                </div>
                            </div>
                            
                            <!-- Blue Ingredient -->
                            <div style="background: rgba(65,105,225,0.1); border-radius: 8px; padding: 6px 8px;">
                                <div style="display: flex; align-items: center; gap: 8px; height: 28px;">
                                    <span style="font-size: 1rem;">🔵</span>
                                    <label style="color: #555; font-weight: 500; min-width: 45px; font-size: 0.9rem;">Blue</label>
                                    <button id="blueDown" style="width: 24px; height: 24px; border-radius: 50%; background: #4169e1; border: none; cursor: pointer; font-weight: bold; color: white; font-size: 0.9rem;">-</button>
                                    <input type="range" id="blueSlider" min="0" max="100" value="20" step="1" style="flex: 1; height: 20px;">
                                    <button id="blueUp" style="width: 24px; height: 24px; border-radius: 50%; background: #4169e1; border: none; cursor: pointer; font-weight: bold; color: white; font-size: 0.9rem;">+</button>
                                    <span id="blueValue" style="font-size: 0.9rem; font-weight: bold; color: #4169e1; min-width: 35px; text-align: right;">20%</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Combined Progress Bar -->
                        <div style="margin-top: 12px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                                <span style="color: #666; font-size: 0.85rem;">Potion Quality</span>
                                <span id="qualityPercent" style="font-size: 1rem; font-weight: bold; color: #764ba2;">0%</span>
                            </div>
                            <div style="background: #ddd; border-radius: 8px; height: 22px; overflow: hidden; box-shadow: inset 0 2px 3px rgba(0,0,0,0.1);">
                                <div id="qualityFill" style="height: 100%; width: 0%; transition: all 0.3s ease; background: linear-gradient(90deg, #764ba2, #9333ea);"></div>
                            </div>
                        </div>
                        
                        <!-- Goal Reminder -->
                        <div style="margin-top: 12px; padding: 8px; background: rgba(118,75,162,0.1); border-radius: 6px; text-align: center;">
                            <div style="font-size: 0.85rem; color: #764ba2;">💡 <strong>Goal:</strong> Find the perfect balance (Loss = 0)</div>
                        </div>
                    </div>
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
    const yellowSlider = document.getElementById('yellowSlider');
    const blueSlider = document.getElementById('blueSlider');
    const yellowUpBtn = document.getElementById('yellowUp');
    const yellowDownBtn = document.getElementById('yellowDown');
    const blueUpBtn = document.getElementById('blueUp');
    const blueDownBtn = document.getElementById('blueDown');
    const controlPanel3 = document.getElementById('controlPanel3');
    
    function updatePotions() {
        const yellow = parseInt(yellowSlider.value);
        const blue = parseInt(blueSlider.value);
        
        document.getElementById('yellowValue').textContent = yellow + '%';
        document.getElementById('blueValue').textContent = blue + '%';
        
        // Calculate individual and total loss (linear)
        const yellowLoss = Math.abs(yellow - OPTIMAL_YELLOW);
        const blueLoss = Math.abs(blue - OPTIMAL_BLUE);
        const totalLoss = yellowLoss + blueLoss;
        
        // Calculate perfect count
        let perfectCount = 0;
        if (yellow === OPTIMAL_YELLOW) perfectCount++;
        if (blue === OPTIMAL_BLUE) perfectCount++;
        
        // Update loss display
        document.getElementById('lossValue3').textContent = totalLoss.toFixed(0);
        document.getElementById('perfectCount').textContent = perfectCount + '/2';
        
        // Calculate quality percentage (inverse of normalized loss)
        const maxLoss = 100 * 2; // Maximum possible linear loss (100 per ingredient)
        const quality = Math.max(0, Math.min(100, 100 * (1 - totalLoss / maxLoss)));
        document.getElementById('qualityPercent').textContent = Math.round(quality) + '%';
        document.getElementById('qualityFill').style.width = quality + '%';
        
        // Update cauldron color based on quality
        const brewQuality = quality / 100;
        const r = Math.round(101 + (50 - 101) * brewQuality);
        const g = Math.round(67 + (205 - 67) * brewQuality);
        const b = Math.round(33 + (50 - 33) * brewQuality);
        document.getElementById('cauldronBrew').style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        
        // Update visual indicators
        const potionIndicator = document.getElementById('potionIndicator');
        const mixHint = document.getElementById('mixHint');
        const potionStatus = document.getElementById('potionStatus');
        const lossDisplay3 = document.getElementById('lossDisplay3');
        
        if (perfectCount === 2) {
            // Perfect!
            potionIndicator.textContent = '✨';
            mixHint.innerHTML = '<strong style="color: #2dd573;">PERFECT MAGICAL BREW!</strong> 🎉';
            potionStatus.textContent = '✨ Magical elixir achieved! ✨';
            potionStatus.style.color = '#2dd573';
            lossDisplay3.style.background = 'linear-gradient(135deg, rgba(45,213,115,0.2), rgba(45,213,115,0.1))';
            controlPanel3.style.borderColor = '#2dd573';
            document.getElementById('lossValue3').style.color = '#2dd573';
            document.getElementById('perfectCount').style.color = '#2dd573';
            document.getElementById('cauldronBrew').style.boxShadow = '0 0 30px rgba(45,213,115,0.8)';
        } else if (perfectCount === 1) {
            // One perfect
            potionIndicator.textContent = '⚗️';
            mixHint.textContent = 'One ingredient perfect! Adjust the other...';
            potionStatus.textContent = 'Getting closer...';
            potionStatus.style.color = '#f3960a';
            lossDisplay3.style.background = 'white';
            controlPanel3.style.borderColor = '#f3960a';
            document.getElementById('lossValue3').style.color = '#f3960a';
            document.getElementById('perfectCount').style.color = '#f3960a';
            document.getElementById('cauldronBrew').style.boxShadow = '0 0 20px rgba(243,150,10,0.5)';
        } else if (quality > 70) {
            // Close
            potionIndicator.textContent = '🧪';
            mixHint.textContent = 'Good mix! Keep fine-tuning...';
            potionStatus.textContent = 'Potion is bubbling nicely...';
            potionStatus.style.color = '#764ba2';
            lossDisplay3.style.background = 'white';
            controlPanel3.style.borderColor = 'transparent';
            document.getElementById('lossValue3').style.color = '#764ba2';
            document.getElementById('perfectCount').style.color = '#666';
            document.getElementById('cauldronBrew').style.boxShadow = '0 0 20px rgba(0,0,0,0.3)';
        } else {
            // Far
            potionIndicator.textContent = '🧪';
            mixHint.textContent = 'Adjust both ingredients to find the perfect balance!';
            potionStatus.textContent = 'Mix the perfect potion...';
            potionStatus.style.color = '#666';
            lossDisplay3.style.background = 'white';
            controlPanel3.style.borderColor = 'transparent';
            document.getElementById('lossValue3').style.color = '#764ba2';
            document.getElementById('perfectCount').style.color = '#666';
            document.getElementById('cauldronBrew').style.boxShadow = '0 0 20px rgba(0,0,0,0.3)';
        }
        
        // Update button states
        yellowUpBtn.disabled = yellow >= 100;
        yellowDownBtn.disabled = yellow <= 0;
        blueUpBtn.disabled = blue >= 100;
        blueDownBtn.disabled = blue <= 0;
        
        // Style disabled buttons
        yellowUpBtn.style.opacity = yellow >= 100 ? '0.5' : '1';
        yellowDownBtn.style.opacity = yellow <= 0 ? '0.5' : '1';
        blueUpBtn.style.opacity = blue >= 100 ? '0.5' : '1';
        blueDownBtn.style.opacity = blue <= 0 ? '0.5' : '1';
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
    currentLevel = 4;
    const container = document.getElementById('app');
    
    container.innerHTML = `
        <div class="current-level">
            ${createLevelHeader(3, 4, 12)}
            
            <div class="level-content" style="display: flex; gap: 40px; align-items: center; padding: 20px; justify-content: space-between;">
                <div class="visual-section" style="flex: 1; text-align: center; max-width: 350px;">
                    <div style="background: rgba(255,255,255,0.5); border-radius: 15px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h3 style="margin: 0 0 15px 0; color: #333; font-size: 1.3rem;">🧙‍♀️ Master Alchemist Elara</h3>
                        <div style="position: relative; display: inline-block;">
                            <img id="witchImgMulti" src="${images.witch}" alt="Master Alchemist" style="width: 200px; height: 200px; object-fit: contain;">
                            <div id="cauldronBrewMulti" style="position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%); width: 60px; height: 60px; border-radius: 50%; background: rgb(101, 67, 33); transition: all 0.5s ease; box-shadow: 0 0 20px rgba(0,0,0,0.3);"></div>
                        </div>
                        <div id="potionStatusMulti" style="margin-top: 15px; font-size: 1.1rem; color: #666; min-height: 30px;">AI will mix 6 ingredients...</div>
                    </div>
                </div>
                
                <div class="controls-section" style="flex: 2; max-width: 600px;">
                    <div style="background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(102,126,234,0.05)); border-radius: 15px; padding: 25px; border: 2px solid transparent; transition: border-color 0.3s ease;" id="controlPanel4">
                        <h3 style="margin: 0 0 20px 0; color: #333; font-size: 1.2rem;">⚡ AI Controls 6 Ingredients</h3>
                        
                        <!-- Loss Display -->
                        <div id="lossDisplay4" style="background: white; border-radius: 10px; padding: 15px; margin-bottom: 20px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                            <div style="display: flex; justify-content: space-around; align-items: center;">
                                <div>
                                    <div style="font-size: 0.9rem; color: #666;">Total Loss</div>
                                    <div id="lossValue4" style="font-size: 2rem; font-weight: bold; color: #667eea;">150</div>
                                </div>
                                <div id="potionIndicatorMulti" style="font-size: 3rem;">🤖</div>
                                <div>
                                    <div style="font-size: 0.9rem; color: #666;">Perfect</div>
                                    <div id="perfectCountMulti" style="font-size: 2rem; font-weight: bold; color: #666;">0/6</div>
                                </div>
                            </div>
                            <div id="aiStatusMulti" style="margin-top: 10px; font-size: 0.95rem; color: #667eea; font-weight: 500;">AI will optimize all 6 ingredients simultaneously</div>
                        </div>
                        
                        <!-- 6 Ingredient Grid (Compact) -->
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin: 20px 0;">
                            <div style="background: rgba(255,0,0,0.1); border-radius: 8px; padding: 10px;">
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <span style="font-size: 1.2rem;">🔴</span>
                                    <input type="range" id="redSlider" min="0" max="100" value="50" disabled style="flex: 1; opacity: 0.7;">
                                    <span id="redValue" style="font-size: 0.9rem; font-weight: bold; min-width: 35px;">50%</span>
                                </div>
                            </div>
                            <div style="background: rgba(255,215,0,0.1); border-radius: 8px; padding: 10px;">
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <span style="font-size: 1.2rem;">🟡</span>
                                    <input type="range" id="yellowSliderMulti" min="0" max="100" value="50" disabled style="flex: 1; opacity: 0.7;">
                                    <span id="yellowValueMulti" style="font-size: 0.9rem; font-weight: bold; min-width: 35px;">50%</span>
                                </div>
                            </div>
                            <div style="background: rgba(0,255,0,0.1); border-radius: 8px; padding: 10px;">
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <span style="font-size: 1.2rem;">🟢</span>
                                    <input type="range" id="greenSlider" min="0" max="100" value="50" disabled style="flex: 1; opacity: 0.7;">
                                    <span id="greenValue" style="font-size: 0.9rem; font-weight: bold; min-width: 35px;">50%</span>
                                </div>
                            </div>
                            <div style="background: rgba(65,105,225,0.1); border-radius: 8px; padding: 10px;">
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <span style="font-size: 1.2rem;">🔵</span>
                                    <input type="range" id="blueSliderMulti" min="0" max="100" value="50" disabled style="flex: 1; opacity: 0.7;">
                                    <span id="blueValueMulti" style="font-size: 0.9rem; font-weight: bold; min-width: 35px;">50%</span>
                                </div>
                            </div>
                            <div style="background: rgba(128,0,128,0.1); border-radius: 8px; padding: 10px;">
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <span style="font-size: 1.2rem;">🟣</span>
                                    <input type="range" id="purpleSlider" min="0" max="100" value="50" disabled style="flex: 1; opacity: 0.7;">
                                    <span id="purpleValue" style="font-size: 0.9rem; font-weight: bold; min-width: 35px;">50%</span>
                                </div>
                            </div>
                            <div style="background: rgba(255,165,0,0.1); border-radius: 8px; padding: 10px;">
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <span style="font-size: 1.2rem;">🟠</span>
                                    <input type="range" id="orangeSlider" min="0" max="100" value="50" disabled style="flex: 1; opacity: 0.7;">
                                    <span id="orangeValue" style="font-size: 0.9rem; font-weight: bold; min-width: 35px;">50%</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Quality Bar -->
                        <div style="margin-top: 15px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                                <span style="color: #666; font-size: 0.95rem;">Potion Quality</span>
                                <span id="qualityPercentMulti" style="font-size: 1.2rem; font-weight: bold; color: #667eea;">0%</span>
                            </div>
                            <div style="background: #ddd; border-radius: 10px; height: 30px; overflow: hidden; box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);">
                                <div id="qualityFillMulti" style="height: 100%; width: 0%; transition: all 0.5s ease; background: linear-gradient(90deg, #667eea, #764ba2);"></div>
                            </div>
                        </div>
                        
                        <!-- AI Control Buttons -->
                        <div style="display: flex; gap: 15px; margin-top: 20px;">
                            <button id="gradientMultiBtn" style="flex: 1; padding: 12px 20px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: 500; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 6px rgba(102,126,234,0.3);">
                                🤖 Run Step
                            </button>
                            <button id="autoRunBtn" style="flex: 1; padding: 12px 20px; background: linear-gradient(135deg, #48bb78, #38a169); color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: 500; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 6px rgba(72,187,120,0.3);">
                                ▶️ Auto Run
                            </button>
                            <button id="resetMultiBtn" style="padding: 12px 20px; background: #f3960a; color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: 500; cursor: pointer; transition: all 0.3s ease;">
                                🔄 Reset
                            </button>
                        </div>
                        
                        <!-- Step Counter -->
                        <div id="stepCounterMulti" style="margin-top: 15px; padding: 10px; background: rgba(102,126,234,0.05); border-radius: 8px; text-align: center; display: none;">
                            <span style="color: #667eea; font-size: 0.9rem;">Steps taken: <strong id="stepCountMulti">0</strong></span>
                        </div>
                    </div>
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
    const autoRunBtn = document.getElementById('autoRunBtn');
    const resetBtn = document.getElementById('resetMultiBtn');
    const controlPanel4 = document.getElementById('controlPanel4');
    const stepCounterMulti = document.getElementById('stepCounterMulti');
    const stepCountMulti = document.getElementById('stepCountMulti');
    let steps = 0;
    let isAutoRunning = false;
    let autoRunInterval = null;
    
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
        
        // Calculate perfect count and total loss (linear)
        let perfectCount = 0;
        let totalLoss = 0;
        Object.keys(levels).forEach(color => {
            const loss = Math.abs(levels[color] - optimalValues[color]);
            totalLoss += loss;
            if (levels[color] === optimalValues[color]) perfectCount++;
        });
        
        // Update loss display
        document.getElementById('lossValue4').textContent = totalLoss.toFixed(0);
        document.getElementById('perfectCountMulti').textContent = perfectCount + '/6';
        
        // Calculate quality percentage
        const maxLoss = 100 * 6; // Maximum possible linear loss (100 per ingredient)
        const quality = Math.max(0, Math.min(100, 100 * (1 - totalLoss / maxLoss)));
        document.getElementById('qualityPercentMulti').textContent = Math.round(quality) + '%';
        document.getElementById('qualityFillMulti').style.width = quality + '%';
        
        // Update cauldron color
        const brewQuality = quality / 100;
        const r = Math.round(101 + (50 - 101) * brewQuality);
        const g = Math.round(67 + (255 - 67) * brewQuality);
        const b = Math.round(33 + (150 - 33) * brewQuality);
        document.getElementById('cauldronBrewMulti').style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        
        // Update visual indicators
        const potionIndicatorMulti = document.getElementById('potionIndicatorMulti');
        const aiStatusMulti = document.getElementById('aiStatusMulti');
        const potionStatusMulti = document.getElementById('potionStatusMulti');
        const lossDisplay4 = document.getElementById('lossDisplay4');
        
        if (perfectCount === 6) {
            // Perfect!
            potionIndicatorMulti.textContent = '🌟';
            aiStatusMulti.innerHTML = '<strong style="color: #2dd573;">AI MASTERED THE 6-ESSENCE ELIXIR!</strong> 🎉';
            potionStatusMulti.textContent = '✨ Legendary potion created! ✨';
            potionStatusMulti.style.color = '#2dd573';
            lossDisplay4.style.background = 'linear-gradient(135deg, rgba(45,213,115,0.2), rgba(45,213,115,0.1))';
            controlPanel4.style.borderColor = '#2dd573';
            document.getElementById('lossValue4').style.color = '#2dd573';
            document.getElementById('perfectCountMulti').style.color = '#2dd573';
            document.getElementById('cauldronBrewMulti').style.boxShadow = '0 0 40px rgba(45,213,115,0.8)';
            gradientBtn.disabled = true;
            gradientBtn.style.opacity = '0.5';
            gradientBtn.textContent = '✅ Perfect Mix Achieved!';
            // Stop auto-run if active
            if (isAutoRunning) {
                stopAutoRun();
            }
            autoRunBtn.disabled = true;
            autoRunBtn.style.opacity = '0.5';
        } else if (perfectCount >= 4) {
            // Very close
            potionIndicatorMulti.textContent = '✨';
            aiStatusMulti.textContent = `AI is very close! ${perfectCount}/6 perfect`;
            potionStatusMulti.textContent = 'Almost legendary...';
            potionStatusMulti.style.color = '#f3960a';
            lossDisplay4.style.background = 'white';
            controlPanel4.style.borderColor = '#f3960a';
            document.getElementById('lossValue4').style.color = '#f3960a';
            document.getElementById('perfectCountMulti').style.color = '#f3960a';
            document.getElementById('cauldronBrewMulti').style.boxShadow = '0 0 30px rgba(243,150,10,0.6)';
        } else if (perfectCount >= 2) {
            // Making progress
            potionIndicatorMulti.textContent = '⚗️';
            aiStatusMulti.textContent = `AI is making progress... ${perfectCount}/6 perfect`;
            potionStatusMulti.textContent = 'Potion improving...';
            potionStatusMulti.style.color = '#667eea';
            lossDisplay4.style.background = 'white';
            controlPanel4.style.borderColor = 'transparent';
            document.getElementById('lossValue4').style.color = '#667eea';
            document.getElementById('perfectCountMulti').style.color = '#667eea';
            document.getElementById('cauldronBrewMulti').style.boxShadow = '0 0 20px rgba(102,126,234,0.4)';
        } else {
            // Far from optimal
            potionIndicatorMulti.textContent = '🤖';
            aiStatusMulti.textContent = 'AI is calculating optimal mix...';
            potionStatusMulti.textContent = 'AI will mix 6 ingredients...';
            potionStatusMulti.style.color = '#666';
            lossDisplay4.style.background = 'white';
            controlPanel4.style.borderColor = 'transparent';
            document.getElementById('lossValue4').style.color = '#667eea';
            document.getElementById('perfectCountMulti').style.color = '#666';
            document.getElementById('cauldronBrewMulti').style.boxShadow = '0 0 20px rgba(0,0,0,0.3)';
        }
    }
    
    // Function to run a single gradient descent step
    function runGradientStep(duration = 600) {
        return new Promise((resolve) => {
            if (gradientBtn.disabled && !isAutoRunning) {
                resolve(false);
                return;
            }
            
            const currentValues = Object.values(sliders).map(s => parseInt(s.value));
            const targetValues = [OPTIMAL_RED, OPTIMAL_YELLOW_MULTI, OPTIMAL_GREEN, OPTIMAL_BLUE_MULTI, OPTIMAL_PURPLE, OPTIMAL_ORANGE];
            
            // Check if already perfect
            const perfectCount = currentValues.reduce((count, val, i) => count + (val === targetValues[i] ? 1 : 0), 0);
            if (perfectCount === 6) {
                resolve(false);
                return;
            }
            
            const result = optimizer.optimizationStep(currentValues, targetValues, Array(6).fill({ min: 0, max: 100 }));
            
            // Animate all sliders
            const startValues = currentValues;
            const endValues = result.newVariables;
            const startTime = Date.now();
            
            function animateSliders() {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                
                Object.keys(sliders).forEach((color, i) => {
                    const currentValue = Math.round(startValues[i] + (endValues[i] - startValues[i]) * easeProgress);
                    sliders[color].value = currentValue;
                });
                
                updateMultiPotions();
                
                if (progress < 1) {
                    requestAnimationFrame(animateSliders);
                } else {
                    steps++;
                    stepCountMulti.textContent = steps;
                    stepCounterMulti.style.display = 'block';
                    resolve(true);
                }
            }
            
            animateSliders();
        });
    }
    
    // Function to stop auto-run
    function stopAutoRun() {
        isAutoRunning = false;
        if (autoRunInterval) {
            clearInterval(autoRunInterval);
            autoRunInterval = null;
        }
        autoRunBtn.textContent = '▶️ Auto Run';
        autoRunBtn.style.background = 'linear-gradient(135deg, #48bb78, #38a169)';
        gradientBtn.disabled = false;
        gradientBtn.style.opacity = '1';
    }
    
    // Manual gradient descent button
    gradientBtn.addEventListener('click', () => {
        if (!isAutoRunning) {
            runGradientStep();
        }
    });
    
    // Auto-run button
    autoRunBtn.addEventListener('click', async () => {
        if (autoRunBtn.disabled) return;
        
        if (isAutoRunning) {
            // Stop auto-run
            stopAutoRun();
        } else {
            // Start auto-run
            isAutoRunning = true;
            autoRunBtn.textContent = '⏸ Stop';
            autoRunBtn.style.background = 'linear-gradient(135deg, #e53e3e, #c53030)';
            gradientBtn.disabled = true;
            gradientBtn.style.opacity = '0.5';
            
            // Run steps with shorter duration for auto-run
            async function autoRun() {
                if (isAutoRunning) {
                    const continueRunning = await runGradientStep(300); // Faster animation for auto-run
                    if (continueRunning && isAutoRunning) {
                        setTimeout(autoRun, 350); // Small delay between steps
                    } else {
                        stopAutoRun();
                    }
                }
            }
            
            autoRun();
        }
    });
    
    resetBtn.addEventListener('click', () => {
        // Stop auto-run if active
        if (isAutoRunning) {
            stopAutoRun();
        }
        optimizer.reset();
        steps = 0;
        stepCountMulti.textContent = '0';
        stepCounterMulti.style.display = 'none';
        Object.values(sliders).forEach(slider => {
            slider.value = Math.floor(Math.random() * 101);
        });
        updateMultiPotions();
        gradientBtn.disabled = false;
        gradientBtn.style.opacity = '1';
        gradientBtn.textContent = '🤖 Run Step';
        autoRunBtn.disabled = false;
        autoRunBtn.style.opacity = '1';
    });
    
    // Add hover effects
    gradientBtn.addEventListener('mouseenter', () => {
        if (!gradientBtn.disabled) {
            gradientBtn.style.transform = 'translateY(-2px)';
            gradientBtn.style.boxShadow = '0 6px 12px rgba(102,126,234,0.4)';
        }
    });
    gradientBtn.addEventListener('mouseleave', () => {
        gradientBtn.style.transform = 'translateY(0)';
        gradientBtn.style.boxShadow = '0 4px 6px rgba(102,126,234,0.3)';
    });
    
    resetBtn.addEventListener('mouseenter', () => {
        resetBtn.style.transform = 'translateY(-2px)';
        resetBtn.style.boxShadow = '0 6px 12px rgba(243,150,10,0.4)';
    });
    resetBtn.addEventListener('mouseleave', () => {
        resetBtn.style.transform = 'translateY(0)';
        resetBtn.style.boxShadow = 'none';
    });
    
    autoRunBtn.addEventListener('mouseenter', () => {
        if (!autoRunBtn.disabled) {
            autoRunBtn.style.transform = 'translateY(-2px)';
            if (isAutoRunning) {
                autoRunBtn.style.boxShadow = '0 6px 12px rgba(229,62,62,0.4)';
            } else {
                autoRunBtn.style.boxShadow = '0 6px 12px rgba(72,187,120,0.4)';
            }
        }
    });
    autoRunBtn.addEventListener('mouseleave', () => {
        autoRunBtn.style.transform = 'translateY(0)';
        if (isAutoRunning) {
            autoRunBtn.style.boxShadow = '0 4px 6px rgba(229,62,62,0.3)';
        } else {
            autoRunBtn.style.boxShadow = '0 4px 6px rgba(72,187,120,0.3)';
        }
    });
    
    updateMultiPotions();
}