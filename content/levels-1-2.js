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
                                🤖 Run Gradient Descent Step
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
    const resetBtn = document.getElementById('resetBtn');
    const lossDisplayAI = document.getElementById('lossDisplayAI');
    const controlPanelAI = document.getElementById('controlPanelAI');
    const stepCounter = document.getElementById('stepCounter');
    const stepCount = document.getElementById('stepCount');
    let steps = 0;
    
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
    
    gradientBtn.addEventListener('click', () => {
        if (gradientBtn.disabled) return;
        
        const currentEnergy = parseInt(energySliderAI.value);
        const result = optimizer.optimizationStep([currentEnergy], [OPTIMAL_ENERGY_AI], [{ min: 0, max: 100 }]);
        
        // Animate the slider movement
        const startValue = currentEnergy;
        const endValue = result.newVariables[0];
        const duration = 500;
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
            }
        }
        
        animateSlider();
    });
    
    resetBtn.addEventListener('click', () => {
        optimizer.reset();
        steps = 0;
        stepCount.textContent = '0';
        stepCounter.style.display = 'none';
        energySliderAI.value = Math.floor(Math.random() * 101);
        updateEnergyAI();
        gradientBtn.disabled = false;
        gradientBtn.style.opacity = '1';
        gradientBtn.style.cursor = 'pointer';
        gradientBtn.textContent = '🤖 Run Gradient Descent Step';
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
    
    updateEnergyAI();
}