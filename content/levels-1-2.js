function createLevel1() {
    const levelId = 'level1';
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            ${createLevelHeader(0, 1, 12)}

            <div class="level-content" style="display: flex; gap: 40px; align-items: center; padding: 20px; justify-content: space-between;">
                <div class="visual-section" style="flex: 1; text-align: center; max-width: 350px;">
                    <div style="background: rgba(255,255,255,0.5); border-radius: 15px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h3 style="margin: 0 0 15px 0; color: #333; font-size: 1.3rem;">🤖 RX-7 Energy Robot</h3>
                        <img id="robotImg" src="${images.robot}" alt="Robot" style="width: 200px; height: 200px; object-fit: contain; transition: all 0.3s ease;">
                        <div id="robotStatus" style="margin-top: 15px; font-size: 1.1rem; color: #666; min-height: 30px;">Waiting for optimal energy...</div>
                    </div>
                </div>
                
                <div class="controls-section" style="flex: 2; max-width: 600px;">
                    <div style="background: linear-gradient(135deg, rgba(255,99,71,0.1), rgba(255,99,71,0.05)); border-radius: 15px; padding: 25px; border: 2px solid transparent; transition: border-color 0.3s ease;" id="controlPanel">
                        <h3 style="margin: 0 0 20px 0; color: #333; font-size: 1.2rem;">⚡ Adjust Energy Level</h3>
                        
                        <!-- Loss Display at the top -->
                        <div id="lossDisplay" style="background: white; border-radius: 10px; padding: 15px; margin-bottom: 20px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                            <div style="display: flex; justify-content: space-around; align-items: center;">
                                <div>
                                    <div style="font-size: 0.9rem; color: #666;">Current Loss</div>
                                    <div id="lossValue" style="font-size: 2rem; font-weight: bold; color: #ff6347;">25</div>
                                </div>
                                <div id="lossIndicator" style="font-size: 3rem;">🔥</div>
                                
                            </div>
                            <div id="hintText" style="margin-top: 10px; font-size: 0.95rem; color: #666; font-style: italic;">You're getting colder... 🥶</div>
                        </div>
                        
                        <!-- Energy Controls -->
                        <div style="margin: 20px 0;">
                            <label for="energySlider" style="display: block; margin-bottom: 10px; color: #555; font-weight: 500;">Energy Level Control:</label>
                            <div style="display: flex; align-items: center; gap: 15px;">
                                <button id="energyDown" class="slider-btn" style="width: 40px; height: 40px; border-radius: 50%; background: #667eea; color: white; border: none; font-size: 1.5rem; cursor: pointer; transition: all 0.2s ease;">-</button>
                                <div style="flex: 1; position: relative;">
                                    <style>
                                        #energySlider::-webkit-slider-thumb {
                                            -webkit-appearance: none;
                                            appearance: none;
                                            width: 20px;
                                            height: 20px;
                                            border-radius: 50%;
                                            background: #667eea;
                                            cursor: pointer;
                                            position: relative;
                                            z-index: 2;
                                            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                                            transition: all 0.2s ease;
                                        }
                                        #energySlider::-webkit-slider-thumb:hover {
                                            transform: scale(1.2);
                                            background: #764ba2;
                                        }
                                        #energySlider::-moz-range-thumb {
                                            width: 20px;
                                            height: 20px;
                                            border-radius: 50%;
                                            background: #667eea;
                                            cursor: pointer;
                                            border: none;
                                            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                                            transition: all 0.2s ease;
                                        }
                                        #energySlider::-moz-range-thumb:hover {
                                            transform: scale(1.2);
                                            background: #764ba2;
                                        }
                                    </style>
                                    <input type="range" id="energySlider" min="0" max="100" value="50" step="1" style="width: 100%; height: 8px; border-radius: 4px; background: #ddd; outline: none; -webkit-appearance: none;">
                                </div>
                                <button id="energyUp" class="slider-btn" style="width: 40px; height: 40px; border-radius: 50%; background: #667eea; color: white; border: none; font-size: 1.5rem; cursor: pointer; transition: all 0.2s ease;">+</button>
                            </div>
                        </div>
                        
                        <!-- Energy Display Bar -->
                        <div style="margin-top: 20px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                                <span style="color: #666; font-size: 0.95rem;">Energy Level</span>
                                <span id="energyValue" style="font-size: 1.2rem; font-weight: bold; color: #333;">50%</span>
                            </div>
                            <div style="background: #ddd; border-radius: 10px; height: 30px; overflow: hidden; box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);">
                                <div id="energyFill" class="energy-fill" style="height: 100%; transition: all 0.3s ease; background: linear-gradient(90deg, #667eea, #764ba2);"></div>
                            </div>
                        </div>
                        
                        <!-- Goal Reminder -->
                        <div style="margin-top: 20px; padding: 12px; background: rgba(102,126,234,0.1); border-radius: 8px; text-align: center;">
                            <div style="font-size: 0.9rem; color: #667eea;">💡 <strong>Goal:</strong> Find the energy level that makes Loss = 0</div>
                        </div>
                    </div>
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
    const lossDisplay = document.getElementById('lossDisplay');
    const controlPanel = document.getElementById('controlPanel');
    
    function updateLevel1() {
        const energy = parseInt(energySlider.value);
        updateEnergyDisplay(energy);
        
        // Calculate loss (linear error)
        const loss = Math.abs(energy - OPTIMAL_ENERGY);
        const distance = Math.abs(energy - OPTIMAL_ENERGY);
        
        // Update loss display
        document.getElementById('lossValue').textContent = loss.toFixed(0);
        
        // Update visual indicators based on distance
        const lossIndicator = document.getElementById('lossIndicator');
        const hintText = document.getElementById('hintText');
        const robotStatus = document.getElementById('robotStatus');
        const robotImg = document.getElementById('robotImg');
        
        if (energy === OPTIMAL_ENERGY) {
            // Perfect!
            lossIndicator.textContent = '🎯';
            hintText.innerHTML = '<strong style="color: #2dd573;">PERFECT! You found it!</strong> 🎉';
            robotStatus.textContent = '⚡ Optimal energy achieved! ⚡';
            robotStatus.style.color = '#2dd573';
            robotImg.src = images.robotActive;
            robotImg.style.transform = 'scale(1.1)';
            lossDisplay.style.background = 'linear-gradient(135deg, rgba(45,213,115,0.2), rgba(45,213,115,0.1))';
            controlPanel.style.borderColor = '#2dd573';
            document.getElementById('lossValue').style.color = '#2dd573';
        } else if (distance <= 5) {
            // Very hot!
            lossIndicator.textContent = '🔥';
            hintText.textContent = "You're VERY hot! Almost there! 🔥";
            robotStatus.textContent = 'So close to optimal!';
            robotStatus.style.color = '#f3960a';
            robotImg.src = images.robot;
            robotImg.style.transform = 'scale(1.05)';
            lossDisplay.style.background = 'white';
            controlPanel.style.borderColor = '#f3960a';
            document.getElementById('lossValue').style.color = '#f3960a';
        } else if (distance <= 15) {
            // Getting warmer
            lossIndicator.textContent = '🌡️';
            hintText.textContent = "Getting warmer... 🌡️";
            robotStatus.textContent = 'Energy not optimal yet...';
            robotStatus.style.color = '#666';
            robotImg.src = images.robot;
            robotImg.style.transform = 'scale(1)';
            lossDisplay.style.background = 'white';
            controlPanel.style.borderColor = 'transparent';
            document.getElementById('lossValue').style.color = '#ff6347';
        } else if (distance <= 30) {
            // Cold
            lossIndicator.textContent = '❄️';
            hintText.textContent = "You're getting colder... ❄️";
            robotStatus.textContent = 'Need more adjustment...';
            robotStatus.style.color = '#666';
            robotImg.src = images.robot;
            robotImg.style.transform = 'scale(1)';
            lossDisplay.style.background = 'white';
            controlPanel.style.borderColor = 'transparent';
            document.getElementById('lossValue').style.color = '#ff6347';
        } else {
            // Very cold
            lossIndicator.textContent = '🧊';
            hintText.textContent = "You're very cold! 🧊";
            robotStatus.textContent = 'Far from optimal energy...';
            robotStatus.style.color = '#999';
            robotImg.src = images.robot;
            robotImg.style.transform = 'scale(1)';
            lossDisplay.style.background = 'white';
            controlPanel.style.borderColor = 'transparent';
            document.getElementById('lossValue').style.color = '#ff6347';
        }
        
        // Update button states
        energyUpBtn.disabled = energy >= 100;
        energyDownBtn.disabled = energy <= 0;
        
        // Style disabled buttons
        energyUpBtn.style.opacity = energy >= 100 ? '0.5' : '1';
        energyUpBtn.style.cursor = energy >= 100 ? 'not-allowed' : 'pointer';
        energyDownBtn.style.opacity = energy <= 0 ? '0.5' : '1';
        energyDownBtn.style.cursor = energy <= 0 ? 'not-allowed' : 'pointer';
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
    
    // Add hover effects for buttons
    energyUpBtn.addEventListener('mouseenter', () => {
        if (!energyUpBtn.disabled) energyUpBtn.style.transform = 'scale(1.1)';
    });
    energyUpBtn.addEventListener('mouseleave', () => {
        energyUpBtn.style.transform = 'scale(1)';
    });
    energyDownBtn.addEventListener('mouseenter', () => {
        if (!energyDownBtn.disabled) energyDownBtn.style.transform = 'scale(1.1)';
    });
    energyDownBtn.addEventListener('mouseleave', () => {
        energyDownBtn.style.transform = 'scale(1)';
    });
    
    updateLevel1();
}

function updateEnergyDisplay(energy) {
    document.getElementById('energyValue').textContent = energy + '%';
    document.getElementById('energyFill').style.width = energy + '%';
}


function createWitchBrewLevel() {
    const levelId = 'witch-brew';
    const container = document.getElementById('app');
    
    container.innerHTML = `
        <div class="current-level">
            ${createLevelHeader(1, 2, 12)}
            
            <div class="level-content" style="display: flex; gap: 30px; padding: 20px; max-width: 1200px; margin: 0 auto; align-items: flex-start;">
                <!-- Left: Witch Visual -->
                <div style="flex: 1; min-width: 250px; max-width: 350px;">
                    <div style="background: linear-gradient(135deg, rgba(118,75,162,0.1), rgba(118,75,162,0.05)); border-radius: 12px; padding: 20px; text-align: center;">
                        <h3 style="margin: 0 0 15px 0; color: #764ba2; font-size: 1.2rem;">🧙‍♀️ Witch's Perfect Potion</h3>
                        <img id="witchImg" src="${images.witch}" alt="Witch" style="width: 180px; height: 180px; object-fit: contain; transition: all 0.3s ease;">
                        <div id="potionStatus" style="margin-top: 15px; padding: 10px; background: rgba(255,255,255,0.8); border-radius: 8px; font-size: 0.95rem; color: #666; min-height: 50px;">
                            <div id="potionEffect">Adjust both ingredients...</div>
                            <div id="potionVisual" style="font-size: 2rem; margin-top: 5px;">🧪</div>
                        </div>
                    </div>
                </div>
                
                <!-- Middle: Controls and Loss -->
                <div style="flex: 2; max-width: 600px;">
                    <div style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <h3 style="margin: 0 0 15px 0; color: #333; font-size: 1.1rem; text-align: center;">⚗️ Mix Your Ingredients</h3>
                        
                        <!-- Two Variable Controls in Columns -->
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                            <!-- Eye of Newt Control -->
                            <div style="background: rgba(102,126,234,0.05); padding: 15px; border-radius: 8px; border: 2px solid rgba(102,126,234,0.2);">
                                <label style="display: block; color: #667eea; font-weight: bold; font-size: 0.9rem; margin-bottom: 8px; text-align: center;">👁️ Eye of Newt</label>
                                <input type="range" id="eyeSlider" min="0" max="100" value="30" step="1" 
                                    style="width: 100%; height: 6px; border-radius: 3px; background: #ddd; outline: none; -webkit-appearance: none;">
                                <div style="text-align: center; margin-top: 8px;">
                                    <span id="eyeValue" style="font-size: 1.3rem; font-weight: bold; color: #667eea;">30</span>
                                    <span style="font-size: 0.8rem; color: #999;"> drops</span>
                                </div>
                            </div>
                            
                            <!-- Dragon Scale Control -->
                            <div style="background: rgba(229,62,62,0.05); padding: 15px; border-radius: 8px; border: 2px solid rgba(229,62,62,0.2);">
                                <label style="display: block; color: #e53e3e; font-weight: bold; font-size: 0.9rem; margin-bottom: 8px; text-align: center;">🐉 Dragon Scale</label>
                                <input type="range" id="dragonSlider" min="0" max="100" value="70" step="1" 
                                    style="width: 100%; height: 6px; border-radius: 3px; background: #ddd; outline: none; -webkit-appearance: none;">
                                <div style="text-align: center; margin-top: 8px;">
                                    <span id="dragonValue" style="font-size: 1.3rem; font-weight: bold; color: #e53e3e;">70</span>
                                    <span style="font-size: 0.8rem; color: #999;"> grams</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Loss Display (prominent position) -->
                        <div style="background: linear-gradient(135deg, rgba(255,99,71,0.1), rgba(255,99,71,0.05)); border-radius: 10px; padding: 20px; text-align: center;">
                            <div style="font-size: 0.9rem; color: #666; margin-bottom: 8px;">Loss (Distance from Perfect)</div>
                            <div id="lossValue" style="font-size: 3.5rem; font-weight: bold; color: #ff6347; line-height: 1;">50</div>
                            <div id="lossBar" style="height: 10px; background: #e0e0e0; border-radius: 5px; margin: 15px auto 10px; max-width: 300px; overflow: hidden;">
                                <div id="lossBarFill" style="height: 100%; background: linear-gradient(90deg, #2ecc71, #f39c12, #e74c3c); transition: width 0.3s ease; width: 50%;"></div>
                            </div>
                            <div id="qualityText" style="font-size: 1rem; color: #666; margin-top: 10px;">Far from perfect...</div>
                        </div>
                    </div>
                </div>
                
                <!-- Right: Goal Reminder -->
                <div style="flex: 1; min-width: 250px; max-width: 350px;">
                    <div style="background: linear-gradient(135deg, rgba(45,213,115,0.1), rgba(45,213,115,0.05)); border-radius: 12px; padding: 20px;">
                        <h3 style="margin: 0 0 15px 0; color: #2dd573; font-size: 1.2rem; text-align: center;">🎯 Your Goal</h3>
                        <div style="background: white; border-radius: 10px; padding: 15px;">
                            <p style="margin: 0 0 10px 0; color: #666; font-size: 0.95rem;">Find the perfect combination of ingredients to minimize the loss!</p>
                            <div style="display: flex; justify-content: space-between; padding: 10px; background: rgba(45,213,115,0.1); border-radius: 8px;">
                                <span style="color: #2dd573; font-weight: bold;">Target Loss:</span>
                                <span style="color: #2dd573; font-weight: bold; font-size: 1.2rem;">0</span>
                            </div>
                            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e0e0e0;">
                                <div style="font-size: 0.85rem; color: #999; margin-bottom: 8px;">Quality Indicators:</div>
                                <div style="font-size: 0.9rem; line-height: 1.6;">
                                    <div>🏆 Loss < 5 = Perfect!</div>
                                    <div>✨ Loss < 15 = Very Close</div>
                                    <div>🧪 Loss < 30 = Getting There</div>
                                    <div>💭 Loss < 50 = Keep Trying</div>
                                    <div>☠️ Loss > 50 = Way Off!</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            ${createStandardNavigation()}
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation(levelId, 'createWitchBrewLevel');
    setupWitchBrewLevel();
}

function setupWitchBrewLevel() {
    // Optimal values for the potion
    const OPTIMAL_EYE = 60;
    const OPTIMAL_DRAGON = 40;
    
    const eyeSlider = document.getElementById('eyeSlider');
    const dragonSlider = document.getElementById('dragonSlider');
    
    function updatePotion() {
        const eyeValue = parseInt(eyeSlider.value);
        const dragonValue = parseInt(dragonSlider.value);
        
        // Update displayed values
        document.getElementById('eyeValue').textContent = eyeValue;
        document.getElementById('dragonValue').textContent = dragonValue;
        
        // Calculate loss (Euclidean distance)
        const loss = Math.sqrt(
            Math.pow(eyeValue - OPTIMAL_EYE, 2) + 
            Math.pow(dragonValue - OPTIMAL_DRAGON, 2)
        );
        
        // Update loss display
        document.getElementById('lossValue').textContent = Math.round(loss);
        
        // Update loss bar
        const maxLoss = Math.sqrt(100*100 + 100*100); // Maximum possible loss
        const lossPercent = (loss / maxLoss) * 100;
        document.getElementById('lossBarFill').style.width = lossPercent + '%';
        
        // Update status based on loss
        const potionEffect = document.getElementById('potionEffect');
        const potionVisual = document.getElementById('potionVisual');
        const qualityText = document.getElementById('qualityText');
        const witchImg = document.getElementById('witchImg');
        
        if (loss < 5) {
            // Perfect!
            potionEffect.textContent = '✨ PERFECT POTION! ✨';
            potionEffect.style.color = '#2ecc71';
            potionVisual.textContent = '🏆';
            qualityText.textContent = 'Absolutely perfect!';
            qualityText.style.color = '#2ecc71';
            document.getElementById('lossValue').style.color = '#2ecc71';
            witchImg.style.transform = 'scale(1.1) rotate(5deg)';
        } else if (loss < 15) {
            // Very close
            potionEffect.textContent = 'Almost perfect!';
            potionEffect.style.color = '#f39c12';
            potionVisual.textContent = '✨';
            qualityText.textContent = 'Very close to perfect!';
            qualityText.style.color = '#f39c12';
            document.getElementById('lossValue').style.color = '#f39c12';
            witchImg.style.transform = 'scale(1.05)';
        } else if (loss < 30) {
            // Getting there
            potionEffect.textContent = 'Good progress...';
            potionEffect.style.color = '#e67e22';
            potionVisual.textContent = '🧪';
            qualityText.textContent = 'Getting warmer...';
            qualityText.style.color = '#e67e22';
            document.getElementById('lossValue').style.color = '#e67e22';
            witchImg.style.transform = 'scale(1)';
        } else if (loss < 50) {
            // Far
            potionEffect.textContent = 'Needs adjustment...';
            potionEffect.style.color = '#e74c3c';
            potionVisual.textContent = '💭';
            qualityText.textContent = 'Far from perfect...';
            qualityText.style.color = '#e74c3c';
            document.getElementById('lossValue').style.color = '#e74c3c';
            witchImg.style.transform = 'scale(1)';
        } else {
            // Very far
            potionEffect.textContent = 'Terrible mixture!';
            potionEffect.style.color = '#c0392b';
            potionVisual.textContent = '☠️';
            qualityText.textContent = 'Completely wrong!';
            qualityText.style.color = '#c0392b';
            document.getElementById('lossValue').style.color = '#c0392b';
            witchImg.style.transform = 'scale(0.95)';
        }
    }
    
    // Add event listeners
    eyeSlider.addEventListener('input', updatePotion);
    dragonSlider.addEventListener('input', updatePotion);
    
    // Style the sliders
    const sliderStyle = `
        <style>
            #eyeSlider::-webkit-slider-thumb, #dragonSlider::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background: white;
                cursor: pointer;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                border: 2px solid #999;
            }
            #eyeSlider::-webkit-slider-thumb {
                border-color: #667eea;
            }
            #dragonSlider::-webkit-slider-thumb {
                border-color: #e53e3e;
            }
            #eyeSlider::-webkit-slider-thumb:hover {
                transform: scale(1.2);
                border-color: #764ba2;
            }
            #dragonSlider::-webkit-slider-thumb:hover {
                transform: scale(1.2);
                border-color: #c53030;
            }
        </style>
    `;
    document.head.insertAdjacentHTML('beforeend', sliderStyle);
    
    // Initial update
    updatePotion();
}

function createLevel2() {
    const levelId = 'level2';
    currentLevel = 2;
    const container = document.getElementById('app');
    
    container.innerHTML = `
        <div class="current-level">
            ${createLevelHeader(1, 2, 12)}
            
            <div class="level-content" style="display: flex; gap: 40px; align-items: center; padding: 20px; justify-content: space-between;">
                <div class="visual-section" style="flex: 1; text-align: center; max-width: 350px;">
                    <div style="background: rgba(255,255,255,0.5); border-radius: 15px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h3 style="margin: 0 0 15px 0; color: #333; font-size: 1.3rem;">🤖 AI-Powered RX-7 Robot</h3>
                        <img id="robotImgAI" src="${images.robot}" alt="AI Robot" style="width: 200px; height: 200px; object-fit: contain; transition: all 0.3s ease;">
                        <div id="robotStatusAI" style="margin-top: 15px; font-size: 1.1rem; color: #666; min-height: 30px;">AI is ready to optimize...</div>
                    </div>
                </div>
                
                <div class="controls-section" style="flex: 2; max-width: 600px;">
                    <div style="background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(102,126,234,0.05)); border-radius: 15px; padding: 25px; border: 2px solid transparent; transition: border-color 0.3s ease;" id="controlPanelAI">
                        <h3 style="margin: 0 0 20px 0; color: #333; font-size: 1.2rem;">⚡ AI-Controlled Energy Level</h3>
                        
                        <!-- Loss Display at the top -->
                        <div id="lossDisplayAI" style="background: white; border-radius: 10px; padding: 15px; margin-bottom: 20px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                            <div style="display: flex; justify-content: space-around; align-items: center;">
                                <div>
                                    <div style="font-size: 0.9rem; color: #666;">Current Loss</div>
                                    <div id="lossValueAI" style="font-size: 2rem; font-weight: bold; color: #ff6347;">45</div>
                                </div>
                                <div id="lossIndicatorAI" style="font-size: 3rem;">🤖</div>
                            </div>
                            <div id="aiStatus" style="margin-top: 10px; font-size: 0.95rem; color: #667eea; font-weight: 500;">AI will automatically find the optimal value</div>
                        </div>
                        
                        <!-- Energy Controls (AI-controlled) -->
                        <div style="margin: 20px 0;">
                            <label for="energySliderAI" style="display: block; margin-bottom: 10px; color: #555; font-weight: 500;">Energy Level (AI Controlled):</label>
                            <div style="display: flex; align-items: center; gap: 15px;">
                                <div style="width: 40px; height: 40px; border-radius: 50%; background: #ddd; display: flex; align-items: center; justify-content: center; color: #999;">🔒</div>
                                <div style="flex: 1; position: relative;">
                                    <style>
                                        #energySliderAI::-webkit-slider-thumb {
                                            -webkit-appearance: none;
                                            appearance: none;
                                            width: 20px;
                                            height: 20px;
                                            border-radius: 50%;
                                            background: #667eea;
                                            cursor: not-allowed;
                                            position: relative;
                                            z-index: 2;
                                            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                                            transition: all 0.5s ease;
                                        }
                                        #energySliderAI::-moz-range-thumb {
                                            width: 20px;
                                            height: 20px;
                                            border-radius: 50%;
                                            background: #667eea;
                                            cursor: not-allowed;
                                            border: none;
                                            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                                            transition: all 0.5s ease;
                                        }
                                    </style>
                                    <input type="range" id="energySliderAI" min="0" max="100" value="30" step="1" disabled style="width: 100%; height: 8px; border-radius: 4px; background: #ddd; outline: none; -webkit-appearance: none; opacity: 0.8;">
                                </div>
                                <div style="width: 40px; height: 40px; border-radius: 50%; background: #ddd; display: flex; align-items: center; justify-content: center; color: #999;">🔒</div>
                            </div>
                            <div style="text-align: center; margin-top: 10px; font-size: 0.85rem; color: #999; font-style: italic;">🔒 Slider locked - only AI can control it</div>
                        </div>
                        
                        <!-- Energy Display Bar -->
                        <div style="margin-top: 20px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                                <span style="color: #666; font-size: 0.95rem;">Energy Level</span>
                                <span id="energyValueAI" style="font-size: 1.2rem; font-weight: bold; color: #333;">30%</span>
                            </div>
                            <div style="background: #ddd; border-radius: 10px; height: 30px; overflow: hidden; box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);">
                                <div id="energyFillAI" class="energy-fill" style="height: 100%; transition: all 0.5s ease; background: linear-gradient(90deg, #667eea, #764ba2); width: 30%;"></div>
                            </div>
                        </div>
                        
                        <!-- AI Control Buttons -->
                        <div style="display: flex; gap: 15px; margin-top: 25px;">
                            <button id="gradientBtn" style="flex: 1; padding: 12px 20px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: 500; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 6px rgba(102,126,234,0.3);">
                                🤖 Run Step
                            </button>
                            <button id="autoRunBtn" style="flex: 1; padding: 12px 20px; background: linear-gradient(135deg, #48bb78, #38a169); color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: 500; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 6px rgba(72,187,120,0.3);">
                                ▶️ Auto Run
                            </button>
                            <button id="resetBtn" style="padding: 12px 20px; background: #f3960a; color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: 500; cursor: pointer; transition: all 0.3s ease;">
                                🔄 Reset
                            </button>
                        </div>
                        
                        <!-- Step Counter -->
                        <div id="stepCounter" style="margin-top: 15px; padding: 10px; background: rgba(102,126,234,0.05); border-radius: 8px; text-align: center; display: none;">
                            <span style="color: #667eea; font-size: 0.9rem;">Steps taken: <strong id="stepCount">0</strong></span>
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
    const energySliderAI = document.getElementById('energySliderAI');
    const gradientBtn = document.getElementById('gradientBtn');
    const autoRunBtn = document.getElementById('autoRunBtn');
    const resetBtn = document.getElementById('resetBtn');
    const lossDisplayAI = document.getElementById('lossDisplayAI');
    const controlPanelAI = document.getElementById('controlPanelAI');
    const stepCounter = document.getElementById('stepCounter');
    const stepCount = document.getElementById('stepCount');
    let steps = 0;
    let isAutoRunning = false;
    let autoRunInterval = null;
    
    function updateEnergyAI() {
        const energy = parseInt(energySliderAI.value);
        document.getElementById('energyValueAI').textContent = energy + '%';
        document.getElementById('energyFillAI').style.width = energy + '%';
        
        const loss = Math.abs(energy - OPTIMAL_ENERGY_AI);
        const distance = Math.abs(energy - OPTIMAL_ENERGY_AI);
        
        // Update loss display
        document.getElementById('lossValueAI').textContent = loss.toFixed(0);
        
        // Update visual indicators
        const lossIndicatorAI = document.getElementById('lossIndicatorAI');
        const aiStatus = document.getElementById('aiStatus');
        const robotStatusAI = document.getElementById('robotStatusAI');
        const robotImgAI = document.getElementById('robotImgAI');
        
        if (energy === OPTIMAL_ENERGY_AI) {
            // Perfect!
            lossIndicatorAI.textContent = '🎯';
            aiStatus.innerHTML = '<strong style="color: #2dd573;">AI FOUND THE OPTIMAL SOLUTION!</strong> 🎉';
            robotStatusAI.textContent = '⚡ Perfect optimization achieved! ⚡';
            robotStatusAI.style.color = '#2dd573';
            robotImgAI.src = images.robotActive;
            robotImgAI.style.transform = 'scale(1.1)';
            lossDisplayAI.style.background = 'linear-gradient(135deg, rgba(45,213,115,0.2), rgba(45,213,115,0.1))';
            controlPanelAI.style.borderColor = '#2dd573';
            document.getElementById('lossValueAI').style.color = '#2dd573';
            gradientBtn.disabled = true;
            gradientBtn.style.opacity = '0.5';
            gradientBtn.style.cursor = 'not-allowed';
            gradientBtn.textContent = '✅ Optimization Complete!';
            // Stop auto-run if active
            if (isAutoRunning) {
                stopAutoRun();
            }
            autoRunBtn.disabled = true;
            autoRunBtn.style.opacity = '0.5';
        } else if (distance <= 5) {
            // Very close!
            lossIndicatorAI.textContent = '🔥';
            aiStatus.textContent = 'AI is very close to optimal...';
            robotStatusAI.textContent = 'Almost there!';
            robotStatusAI.style.color = '#f3960a';
            robotImgAI.src = images.robot;
            robotImgAI.style.transform = 'scale(1.05)';
            lossDisplayAI.style.background = 'white';
            controlPanelAI.style.borderColor = '#f3960a';
            document.getElementById('lossValueAI').style.color = '#f3960a';
        } else if (distance <= 15) {
            // Getting closer
            lossIndicatorAI.textContent = '🌡️';
            aiStatus.textContent = 'AI is making progress...';
            robotStatusAI.textContent = 'Optimizing energy...';
            robotStatusAI.style.color = '#666';
            robotImgAI.src = images.robot;
            robotImgAI.style.transform = 'scale(1)';
            lossDisplayAI.style.background = 'white';
            controlPanelAI.style.borderColor = 'transparent';
            document.getElementById('lossValueAI').style.color = '#ff6347';
        } else {
            // Far from optimal
            lossIndicatorAI.textContent = '🤖';
            aiStatus.textContent = 'AI is calculating the best direction...';
            robotStatusAI.textContent = 'Analyzing loss function...';
            robotStatusAI.style.color = '#666';
            robotImgAI.src = images.robot;
            robotImgAI.style.transform = 'scale(1)';
            lossDisplayAI.style.background = 'white';
            controlPanelAI.style.borderColor = 'transparent';
            document.getElementById('lossValueAI').style.color = '#ff6347';
        }
    }
    
    // Function to run a single gradient descent step
    function runGradientStep(duration = 500) {
        return new Promise((resolve) => {
            if (gradientBtn.disabled && !isAutoRunning) {
                resolve(false);
                return;
            }
            
            const currentEnergy = parseInt(energySliderAI.value);
            
            // Check if already perfect
            if (currentEnergy === OPTIMAL_ENERGY_AI) {
                resolve(false);
                return;
            }
            
            const result = optimizer.optimizationStep([currentEnergy], [OPTIMAL_ENERGY_AI], [{ min: 0, max: 100 }]);
            
            // Animate the slider movement
            const startValue = currentEnergy;
            const endValue = result.newVariables[0];
            const startTime = Date.now();
            
            function animateSlider() {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
                
                const currentValue = Math.round(startValue + (endValue - startValue) * easeProgress);
                energySliderAI.value = currentValue;
                updateEnergyAI();
                
                if (progress < 1) {
                    requestAnimationFrame(animateSlider);
                } else {
                    steps++;
                    stepCount.textContent = steps;
                    stepCounter.style.display = 'block';
                    resolve(true);
                }
            }
            
            animateSlider();
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
        gradientBtn.style.cursor = 'pointer';
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
            gradientBtn.style.cursor = 'not-allowed';
            
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
        stepCount.textContent = '0';
        stepCounter.style.display = 'none';
        energySliderAI.value = Math.floor(Math.random() * 101);
        updateEnergyAI();
        gradientBtn.disabled = false;
        gradientBtn.style.opacity = '1';
        gradientBtn.style.cursor = 'pointer';
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
    
    updateEnergyAI();
}