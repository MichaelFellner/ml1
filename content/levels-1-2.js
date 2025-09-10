/**
 * Creates Level 1: Energy Control - Basic loss function tutorial
 * @function createLevel1
 * @description Teaches users about loss functions through robot energy optimization
 * @returns {void}
 */
function createLevel1() {
    const levelId = 'level1';
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            ${createLevelHeader(0, 1, 12)}

            <style>
                @keyframes glow-pulse {
                    0%, 100% { opacity: 0.8; }
                    50% { opacity: 1; }
                }
                
                .robot-container {
                    position: relative;
                    display: inline-block;
                }
                
                .robot-glow {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    border-radius: 50%;
                    pointer-events: none;
                    transition: all 0.3s ease;
                    animation: glow-pulse 2s infinite;
                }
                
                .dial-container {
                    position: relative;
                    width: 200px;
                    height: 200px;
                    margin: 20px auto;
                }
                
                .dial-svg {
                    width: 100%;
                    height: 100%;
                    cursor: pointer;
                }
                
                .dial-track {
                    fill: none;
                    stroke: #e0e0e0;
                    stroke-width: 20;
                }
                
                .dial-fill {
                    fill: none;
                    stroke: url(#dialGradient);
                    stroke-width: 20;
                    stroke-linecap: round;
                    transition: stroke-dasharray 0.3s ease;
                }
                
                .dial-handle {
                    fill: white;
                    stroke: #667eea;
                    stroke-width: 3;
                    cursor: grab;
                    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
                    transition: all 0.2s ease;
                }
                
                .dial-handle:active {
                    cursor: grabbing;
                    transform: scale(1.1);
                }
                
                .function-display {
                    font-family: 'Courier New', monospace;
                    background: #f5f5f5;
                    padding: 12px;
                    border-radius: 8px;
                    margin: 15px 0;
                    border-left: 4px solid #667eea;
                }
                
                .loss-formula {
                    font-size: 1.1rem;
                    color: #333;
                    text-align: center;
                }
                
                .loss-parts {
                    display: flex;
                    justify-content: space-around;
                    margin-top: 10px;
                    font-size: 0.95rem;
                }
                
                .loss-part {
                    padding: 5px 10px;
                    background: white;
                    border-radius: 5px;
                }
            </style>

            <div class="level-content" style="display: flex; gap: 40px; align-items: stretch; padding: 20px; justify-content: center;">
                <div class="visual-section" style="flex: 1; text-align: center; max-width: 400px; display: flex; flex-direction: column;">
                    <div style="background: rgba(255,255,255,0.9); border-radius: 15px; padding: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                        <h3 style="margin: 0 0 15px 0; color: #333; font-size: 1.3rem;">🤖 Energy Optimization Robot</h3>
                        
                        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center;">
                            <div class="robot-container">
                                <div id="robotGlow" class="robot-glow"></div>
                                <img id="robotImg" src="${images.robot}" alt="Robot" style="width: 180px; height: 180px; object-fit: contain; position: relative; z-index: 2; transition: all 0.3s ease;">
                            </div>
                        </div>
                        
                        <div id="robotStatus" style="margin-top: 15px; font-size: 1rem; color: #666; min-height: 30px; font-weight: 500;">Adjust the input to minimize loss!</div>
                    </div>
                    
                    <!-- Loss Display moved here -->
                    <div style="background: linear-gradient(135deg, rgba(255,99,71,0.1), rgba(255,99,71,0.05)); border-radius: 10px; padding: 15px; text-align: center; margin-top: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                        <div style="display: flex; justify-content: space-around; align-items: center;">
                            <div>
                                <div style="font-size: 0.9rem; color: #666;">Current Loss</div>
                                <div id="lossValue" style="font-size: 2.5rem; font-weight: bold; color: #ff6347; transition: color 0.3s ease;">25</div>
                            </div>
                            <div>
                                <div id="lossBar" style="width: 150px; height: 10px; background: #e0e0e0; border-radius: 5px; overflow: hidden;">
                                    <div id="lossBarFill" style="height: 100%; background: linear-gradient(90deg, #2dd573, #f39c12, #e74c3c); transition: width 0.3s ease; width: 25%;"></div>
                                </div>
                                <div id="hintText" style="margin-top: 8px; font-size: 0.9rem; color: #666;">Getting warmer...</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="controls-section" style="flex: 1.5; max-width: 500px;">
                    <div style="background: white; border-radius: 15px; padding: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                        <h3 style="margin: 0 0 15px 0; color: #333; font-size: 1.2rem; text-align: center;">⚡ Function Input Control</h3>
                        
                        <!-- Function Display -->
                        <div class="function-display">
                            <div class="loss-formula">
                                Loss = |target - f(<span id="xValue" style="color: #667eea; font-weight: bold;">50</span>)|
                            </div>
                            <div class="loss-parts">
                                <div class="loss-part">
                                    target = <span style="color: #2dd573; font-weight: bold;">75</span>
                                </div>
                                <div class="loss-part">
                                    f(x) = <span id="fxValue" style="color: #667eea; font-weight: bold;">50</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Interactive Dial Control with Buttons -->
                        <div style="position: relative; margin: 20px auto;">
                            <div style="display: flex; align-items: center; justify-content: center; gap: 15px;">
                                <!-- Decrement Button -->
                                <button id="decrementBtn" style="
                                    width: 40px;
                                    height: 40px;
                                    border-radius: 50%;
                                    background: linear-gradient(135deg, #667eea, #764ba2);
                                    color: white;
                                    border: none;
                                    font-size: 1.5rem;
                                    cursor: pointer;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    box-shadow: 0 2px 8px rgba(102,126,234,0.3);
                                    transition: all 0.2s ease;
                                ">−</button>
                                
                                <!-- Dial -->
                                <div class="dial-container">
                                    <svg class="dial-svg" id="dialSvg">
                                        <defs>
                                            <linearGradient id="dialGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
                                                <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
                                            </linearGradient>
                                        </defs>
                                        <circle class="dial-track" cx="100" cy="100" r="80" stroke-dasharray="377 126" stroke-dashoffset="-63" />
                                        <circle class="dial-fill" id="dialFill" cx="100" cy="100" r="80" stroke-dasharray="0 503" stroke-dashoffset="-63" />
                                        <circle class="dial-handle" id="dialHandle" cx="100" cy="180" r="12" />
                                        <text x="100" y="105" text-anchor="middle" font-size="32" font-weight="bold" fill="#333" id="dialValue">50</text>
                                        <text x="100" y="125" text-anchor="middle" font-size="12" fill="#999">input (x)</text>
                                    </svg>
                                </div>
                                
                                <!-- Increment Button -->
                                <button id="incrementBtn" style="
                                    width: 40px;
                                    height: 40px;
                                    border-radius: 50%;
                                    background: linear-gradient(135deg, #667eea, #764ba2);
                                    color: white;
                                    border: none;
                                    font-size: 1.5rem;
                                    cursor: pointer;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    box-shadow: 0 2px 8px rgba(102,126,234,0.3);
                                    transition: all 0.2s ease;
                                ">+</button>
                            </div>
                            
                            <!-- Instruction Text -->
                            <div style="text-align: center; margin-top: 15px; font-size: 0.85rem; color: #999;">
                                Drag the dial or use +/− buttons to adjust
                            </div>
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

/**
 * Sets up interactive controls for Level 1
 * @function setupLevel1
 * @description Initializes dial control and loss calculation for robot optimization
 * @returns {void}
 */
function setupLevel1() {
    const TARGET = gameState.constants.OPTIMAL_ENERGY; // 75
    let currentValue = 50;
    let isDragging = false;
    
    const dialSvg = document.getElementById('dialSvg');
    const dialHandle = document.getElementById('dialHandle');
    const dialFill = document.getElementById('dialFill');
    const dialValue = document.getElementById('dialValue');
    const incrementBtn = document.getElementById('incrementBtn');
    const decrementBtn = document.getElementById('decrementBtn');
    
    function updateDial(value) {
        currentValue = Math.max(0, Math.min(100, value));
        
        // Update dial position (270 degree arc)
        const angle = (currentValue / 100) * 270 - 135; // -135 to 135 degrees
        const radian = (angle * Math.PI) / 180;
        const handleX = 100 + 80 * Math.cos(radian);
        const handleY = 100 + 80 * Math.sin(radian);
        
        dialHandle.setAttribute('cx', handleX);
        dialHandle.setAttribute('cy', handleY);
        
        // Update dial fill
        const arcLength = (currentValue / 100) * 377; // 377 is 75% of circumference
        dialFill.setAttribute('stroke-dasharray', `${arcLength} 503`);
        
        // Update display values
        dialValue.textContent = Math.round(currentValue);
        document.getElementById('xValue').textContent = Math.round(currentValue);
        document.getElementById('fxValue').textContent = Math.round(currentValue);
        
        // Calculate loss (use rounded value for all comparisons to avoid floating point issues)
        const rawLoss = Math.abs(TARGET - currentValue);
        const loss = Math.round(rawLoss);
        document.getElementById('lossValue').textContent = loss;
        
        // Update loss bar
        const lossPercent = Math.min(100, (rawLoss / 100) * 100);
        document.getElementById('lossBarFill').style.width = Math.max(2, 100 - lossPercent) + '%';
        
        // Update robot glow based on loss
        const robotGlow = document.getElementById('robotGlow');
        const robotImg = document.getElementById('robotImg');
        const hintText = document.getElementById('hintText');
        const robotStatus = document.getElementById('robotStatus');
        const lossValueEl = document.getElementById('lossValue');
        
        if (loss === 0) {
            // PERFECT! Maximum glow with rainbow effect
            robotGlow.style.width = '250px';
            robotGlow.style.height = '250px';
            robotGlow.style.background = 'radial-gradient(circle, rgba(255,215,0,0.8), rgba(255,105,180,0.6), rgba(138,43,226,0.4), transparent)';
            robotGlow.style.boxShadow = '0 0 80px rgba(255, 231, 94, 0.8), 0 0 120px rgba(255,105,180,0.6)';
            robotGlow.style.animation = 'glow-pulse 0.8s infinite';
            robotImg.style.transform = 'scale(1.15) rotate(5deg)';
            hintText.innerHTML = '<strong style="color: #00ff2fff;">⭐ PERFECT! You found f(x) = target! ⭐</strong>';
            robotStatus.innerHTML = '🎯 <strong>Loss = 0!</strong> Optimal solution found!';
            robotStatus.style.color = '#1aff00ff';
            lossValueEl.style.color = '#00ff04ff';
            dialHandle.style.fill = '#FFD700';
            dialHandle.style.stroke = '#FFA500';
        } else if (loss <= 3) {
            // Almost perfect - strong green glow
            robotGlow.style.width = '220px';
            robotGlow.style.height = '220px';
            robotGlow.style.background = 'radial-gradient(circle, rgba(46,213,115,0.7), rgba(46,213,115,0.4), transparent)';
            robotGlow.style.boxShadow = '0 0 60px rgba(46,213,115,0.7)';
            robotImg.style.transform = 'scale(1.1)';
            hintText.textContent = "Almost perfect! So close!";
            robotStatus.textContent = 'Nearly optimal!';
            robotStatus.style.color = '#2dd573';
            lossValueEl.style.color = '#2dd573';
            dialHandle.style.fill = '#2dd573';
            dialHandle.style.stroke = '#2dd573';
        } else if (loss <= 10) {
            // Very close - yellow-green glow
            robotGlow.style.width = '200px';
            robotGlow.style.height = '200px';
            robotGlow.style.background = 'radial-gradient(circle, rgba(160,213,46,0.6), rgba(160,213,46,0.3), transparent)';
            robotGlow.style.boxShadow = '0 0 40px rgba(160,213,46,0.6)';
            robotImg.style.transform = 'scale(1.05)';
            hintText.textContent = "Very close! Keep going!";
            robotStatus.textContent = 'Getting very warm...';
            robotStatus.style.color = '#a0d52e';
            lossValueEl.style.color = '#a0d52e';
            dialHandle.style.fill = 'white';
            dialHandle.style.stroke = '#a0d52e';
        } else if (loss <= 20) {
            // Close - yellow glow
            robotGlow.style.width = '180px';
            robotGlow.style.height = '180px';
            robotGlow.style.background = 'radial-gradient(circle, rgba(243,150,10,0.5), rgba(243,150,10,0.25), transparent)';
            robotGlow.style.boxShadow = '0 0 30px rgba(243,150,10,0.5)';
            robotImg.style.transform = 'scale(1.02)';
            hintText.textContent = "Getting warmer...";
            robotStatus.textContent = 'Approaching optimal...';
            robotStatus.style.color = '#f3960a';
            lossValueEl.style.color = '#f3960a';
            dialHandle.style.fill = 'white';
            dialHandle.style.stroke = '#f3960a';
        } else if (loss <= 35) {
            // Warm - orange glow
            robotGlow.style.width = '160px';
            robotGlow.style.height = '160px';
            robotGlow.style.background = 'radial-gradient(circle, rgba(230,126,34,0.4), rgba(230,126,34,0.2), transparent)';
            robotGlow.style.boxShadow = '0 0 20px rgba(230,126,34,0.4)';
            robotImg.style.transform = 'scale(1)';
            hintText.textContent = "Getting there...";
            robotStatus.textContent = 'Keep adjusting...';
            robotStatus.style.color = '#e67e22';
            lossValueEl.style.color = '#e67e22';
            dialHandle.style.fill = 'white';
            dialHandle.style.stroke = '#e67e22';
        } else {
            // Far - minimal red glow
            robotGlow.style.width = '140px';
            robotGlow.style.height = '140px';
            robotGlow.style.background = 'radial-gradient(circle, rgba(231,76,60,0.3), rgba(231,76,60,0.1), transparent)';
            robotGlow.style.boxShadow = '0 0 10px rgba(231,76,60,0.3)';
            robotImg.style.transform = 'scale(0.98)';
            hintText.textContent = loss > 50 ? "Very far off!" : "Keep trying...";
            robotStatus.textContent = 'Far from optimal...';
            robotStatus.style.color = '#e74c3c';
            lossValueEl.style.color = '#e74c3c';
            dialHandle.style.fill = 'white';
            dialHandle.style.stroke = '#667eea';
        }
        
        // Update button states
        if (incrementBtn && decrementBtn) {
            incrementBtn.disabled = currentValue >= 100;
            decrementBtn.disabled = currentValue <= 0;
            incrementBtn.style.opacity = currentValue >= 100 ? '0.5' : '1';
            incrementBtn.style.cursor = currentValue >= 100 ? 'not-allowed' : 'pointer';
            decrementBtn.style.opacity = currentValue <= 0 ? '0.5' : '1';
            decrementBtn.style.cursor = currentValue <= 0 ? 'not-allowed' : 'pointer';
        }
    }
    
    // Mouse/Touch controls for dial
    function getAngleFromPoint(x, y) {
        const rect = dialSvg.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
        let normalizedAngle = angle + 135; // Normalize to 0-270 range
        if (normalizedAngle < 0) normalizedAngle = 0;
        if (normalizedAngle > 270) normalizedAngle = 270;
        return (normalizedAngle / 270) * 100;
    }
    
    dialSvg.addEventListener('mousedown', (e) => {
        isDragging = true;
        const value = getAngleFromPoint(e.clientX, e.clientY);
        updateDial(value);
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const value = getAngleFromPoint(e.clientX, e.clientY);
            updateDial(value);
        }
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    // Touch support
    dialSvg.addEventListener('touchstart', (e) => {
        isDragging = true;
        const touch = e.touches[0];
        const value = getAngleFromPoint(touch.clientX, touch.clientY);
        updateDial(value);
        e.preventDefault();
    });
    
    document.addEventListener('touchmove', (e) => {
        if (isDragging) {
            const touch = e.touches[0];
            const value = getAngleFromPoint(touch.clientX, touch.clientY);
            updateDial(value);
        }
    });
    
    document.addEventListener('touchend', () => {
        isDragging = false;
    });
    
    // Button controls
    incrementBtn.addEventListener('click', () => {
        updateDial(currentValue + 1);
    });
    
    decrementBtn.addEventListener('click', () => {
        updateDial(currentValue - 1);
    });
    
    // Button hover effects
    incrementBtn.addEventListener('mouseenter', () => {
        if (currentValue < 100) {
            incrementBtn.style.transform = 'scale(1.1)';
            incrementBtn.style.boxShadow = '0 4px 12px rgba(102,126,234,0.4)';
        }
    });
    incrementBtn.addEventListener('mouseleave', () => {
        incrementBtn.style.transform = 'scale(1)';
        incrementBtn.style.boxShadow = '0 2px 8px rgba(102,126,234,0.3)';
    });
    
    decrementBtn.addEventListener('mouseenter', () => {
        if (currentValue > 0) {
            decrementBtn.style.transform = 'scale(1.1)';
            decrementBtn.style.boxShadow = '0 4px 12px rgba(102,126,234,0.4)';
        }
    });
    decrementBtn.addEventListener('mouseleave', () => {
        decrementBtn.style.transform = 'scale(1)';
        decrementBtn.style.boxShadow = '0 2px 8px rgba(102,126,234,0.3)';
    });
    
    // Keyboard controls (still available but not advertised)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
            updateDial(currentValue - (e.shiftKey ? 10 : 1));
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
            updateDial(currentValue + (e.shiftKey ? 10 : 1));
        }
    });
    
    // Initialize
    updateDial(50);
}


/**
 * Creates the Witch's Brew level with two-variable optimization
 * @function createWitchBrewLevel
 * @description Teaches multi-variable optimization through potion mixing
 * @returns {void}
 */
function createWitchBrewLevel() {
    const levelId = 'witch-brew';
    const container = document.getElementById('app');
    
    container.innerHTML = `
        <div class="current-level">
            ${createLevelHeader(1, 2, 12)}
            
            <div class="level-content" style="display: flex; gap: 30px; padding: 20px; max-width: 1200px; margin: 0 auto; align-items: stretch;">
                <!-- Left: Witch Visual -->
                <div style="flex: 1; min-width: 250px; max-width: 350px;">
                    <div style="background: linear-gradient(135deg, rgba(118,75,162,0.1), rgba(118,75,162,0.05)); border-radius: 12px; padding: 20px; text-align: center; height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
                        <div style="flex: 1; display: flex; align-items: center; justify-content: center; min-height: 250px; padding: 20px 10px; position: relative;">
                            <!-- Witch glow effect behind the image -->
                            <div id="witchGlow" style="
                                position: absolute;
                                width: 200px;
                                height: 200px;
                                border-radius: 50%;
                                top: 50%;
                                left: 50%;
                                transform: translate(-50%, -50%);
                                transition: all 0.3s ease;
                                z-index: 1;
                            "></div>
                            <img id="witchImg" src="${images.witch}" alt="Witch" style="
                                width: 100%;
                                max-width: 220px;
                                height: auto;
                                max-height: 220px;
                                object-fit: contain;
                                transition: all 0.3s ease;
                                position: relative;
                                z-index: 2;
                            ">
                        </div>
                        <div id="potionStatus" style="margin-top: 20px; padding: 15px; background: rgba(255,255,255,0.8); border-radius: 8px; font-size: 0.95rem; color: #666; min-height: 40px;">
                            <div id="potionEffect" style="font-weight: 500;">Adjust both ingredients...</div>
                            <div id="hintText" style="margin-top: 8px; font-size: 0.85rem; color: #999;">Target: Eye=60, Dragon=40</div>
                        </div>
                    </div>
                </div>
                
                <!-- Middle: Controls and Loss -->
                <div style="flex: 2.5; max-width: 700px;">
                    <div style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <h3 style="margin: 0 0 15px 0; color: #333; font-size: 1.1rem; text-align: center;">⚗️ Mix Your Ingredients</h3>
                        
                        <!-- Two Variable Controls in Columns -->
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                            <!-- Eye of Newt Control -->
                            <div style="background: rgba(102,126,234,0.05); padding: 15px; border-radius: 8px; border: 2px solid rgba(102,126,234,0.2);">
                                <label style="display: block; color: #667eea; font-weight: bold; font-size: 0.9rem; margin-bottom: 8px; text-align: center;">👁️ Eye of Newt</label>
                                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                                    <button id="eyeDecrement" style="
                                        width: 28px;
                                        height: 28px;
                                        border-radius: 50%;
                                        background: #667eea;
                                        color: white;
                                        border: none;
                                        font-size: 1.2rem;
                                        cursor: pointer;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        transition: all 0.2s ease;
                                    ">−</button>
                                    <input type="range" id="eyeSlider" min="0" max="100" value="30" step="1" 
                                        style="flex: 1; height: 6px; border-radius: 3px; background: #ddd; outline: none; -webkit-appearance: none;">
                                    <button id="eyeIncrement" style="
                                        width: 28px;
                                        height: 28px;
                                        border-radius: 50%;
                                        background: #667eea;
                                        color: white;
                                        border: none;
                                        font-size: 1.2rem;
                                        cursor: pointer;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        transition: all 0.2s ease;
                                    ">+</button>
                                </div>
                                <div style="text-align: center;">
                                    <span id="eyeValue" style="font-size: 1.3rem; font-weight: bold; color: #667eea;">30</span>
                                    <span style="font-size: 0.8rem; color: #999;"> drops</span>
                                </div>
                            </div>
                            
                            <!-- Dragon Scale Control -->
                            <div style="background: rgba(229,62,62,0.05); padding: 15px; border-radius: 8px; border: 2px solid rgba(229,62,62,0.2);">
                                <label style="display: block; color: #e53e3e; font-weight: bold; font-size: 0.9rem; margin-bottom: 8px; text-align: center;">🐉 Dragon Scale</label>
                                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                                    <button id="dragonDecrement" style="
                                        width: 28px;
                                        height: 28px;
                                        border-radius: 50%;
                                        background: #e53e3e;
                                        color: white;
                                        border: none;
                                        font-size: 1.2rem;
                                        cursor: pointer;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        transition: all 0.2s ease;
                                    ">−</button>
                                    <input type="range" id="dragonSlider" min="0" max="100" value="70" step="1" 
                                        style="flex: 1; height: 6px; border-radius: 3px; background: #ddd; outline: none; -webkit-appearance: none;">
                                    <button id="dragonIncrement" style="
                                        width: 28px;
                                        height: 28px;
                                        border-radius: 50%;
                                        background: #e53e3e;
                                        color: white;
                                        border: none;
                                        font-size: 1.2rem;
                                        cursor: pointer;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        transition: all 0.2s ease;
                                    ">+</button>
                                </div>
                                <div style="text-align: center;">
                                    <span id="dragonValue" style="font-size: 1.3rem; font-weight: bold; color: #e53e3e;">70</span>
                                    <span style="font-size: 0.8rem; color: #999;"> grams</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Loss Display (prominent position) -->
                        <div style="background: linear-gradient(135deg, rgba(255,99,71,0.1), rgba(255,99,71,0.05)); border-radius: 10px; padding: 20px; text-align: center;">
                            <div style="font-size: 0.9rem; color: #666; margin-bottom: 8px;">Loss (Distance from Perfect)</div>
                            <div id="lossValue" style="font-size: 3.5rem; font-weight: bold; color: #ff6347; line-height: 1;">50.0</div>
                            <div id="lossBar" style="height: 10px; background: #e0e0e0; border-radius: 5px; margin: 15px auto 10px; max-width: 300px; overflow: hidden;">
                                <div id="lossBarFill" style="height: 100%; background: linear-gradient(90deg, #2ecc71, #f39c12, #e74c3c); transition: width 0.3s ease; width: 50%;"></div>
                            </div>
                            <div id="qualityText" style="font-size: 1rem; color: #666; margin-top: 10px;">Far from perfect...</div>
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

/**
 * Sets up interactive controls for the Witch's Brew level
 * @function setupWitchBrewLevel
 * @description Initializes two-variable sliders and loss calculation for potion optimization
 * @returns {void}
 */
function setupWitchBrewLevel() {
    // Optimal values for the potion
    const OPTIMAL_EYE = 60;
    const OPTIMAL_DRAGON = 40;
    
    const eyeSlider = document.getElementById('eyeSlider');
    const dragonSlider = document.getElementById('dragonSlider');
    const eyeIncrement = document.getElementById('eyeIncrement');
    const eyeDecrement = document.getElementById('eyeDecrement');
    const dragonIncrement = document.getElementById('dragonIncrement');
    const dragonDecrement = document.getElementById('dragonDecrement');
    
    function updatePotion() {
        const eyeValue = parseInt(eyeSlider.value);
        const dragonValue = parseInt(dragonSlider.value);
        
        // Update displayed values immediately
        document.getElementById('eyeValue').textContent = eyeValue;
        document.getElementById('dragonValue').textContent = dragonValue;
        
        // Calculate loss (Euclidean distance) with more precision
        const eyeDiff = Math.abs(eyeValue - OPTIMAL_EYE);
        const dragonDiff = Math.abs(dragonValue - OPTIMAL_DRAGON);
        const loss = Math.sqrt(eyeDiff * eyeDiff + dragonDiff * dragonDiff);
        
        // Display loss with one decimal place for better feedback
        const displayLoss = loss.toFixed(1);
        
        // Update loss display immediately
        const lossElement = document.getElementById('lossValue');
        lossElement.textContent = displayLoss;
        
        // Update loss bar
        const maxLoss = Math.sqrt(100*100 + 100*100); // Maximum possible loss
        const lossPercent = (loss / maxLoss) * 100;
        document.getElementById('lossBarFill').style.width = Math.max(2, lossPercent) + '%';
        
        // Update hint text with current differences
        const hintText = document.getElementById('hintText');
        if (loss < 0.5) {
            hintText.innerHTML = '<strong style="background: linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3, #ff0000, #ff7f00, #ffff00); background-size: 200% 100%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: rainbow-shift 2s linear infinite;">⭐ PERFECT! ⭐</strong>';
        } else {
            const eyeHint = eyeValue < OPTIMAL_EYE ? '↑' : eyeValue > OPTIMAL_EYE ? '↓' : '✓';
            const dragonHint = dragonValue < OPTIMAL_DRAGON ? '↑' : dragonValue > OPTIMAL_DRAGON ? '↓' : '✓';
            hintText.innerHTML = `Eye: ${eyeHint} (${eyeDiff} off) | Dragon: ${dragonHint} (${dragonDiff} off)`;
        }
        
        // Update status based on loss
        const potionEffect = document.getElementById('potionEffect');
        const qualityText = document.getElementById('qualityText');
        const witchImg = document.getElementById('witchImg');
        const witchGlow = document.getElementById('witchGlow');
        
        if (loss < 0.5) {
            // PERFECT! Rainbow glow
            potionEffect.innerHTML = '✨ <strong style="background: linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3, #ff0000, #ff7f00, #ffff00); background-size: 200% 100%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: rainbow-shift 2s linear infinite;">PERFECT POTION!</strong> ✨';
            potionEffect.style.color = 'transparent';
            qualityText.innerHTML = '<strong style="background: linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3, #ff0000, #ff7f00, #ffff00); background-size: 200% 100%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: rainbow-shift 2s linear infinite;">Absolutely perfect!</strong>';
            qualityText.style.color = 'transparent';
            lossElement.style.background = 'linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3, #ff0000, #ff7f00, #ffff00)';
            lossElement.style.backgroundSize = '200% 100%';
            lossElement.style.webkitBackgroundClip = 'text';
            lossElement.style.webkitTextFillColor = 'transparent';
            lossElement.style.backgroundClip = 'text';
            lossElement.style.animation = 'rainbow-shift 2s linear infinite';
            witchImg.style.transform = 'scale(1.1) rotate(5deg)';
            
            // Rainbow witch glow
            witchGlow.style.width = '280px';
            witchGlow.style.height = '280px';
            witchGlow.style.background = 'radial-gradient(circle, rgba(255,0,150,0.8), rgba(255,150,0,0.6), rgba(255,255,0,0.5), rgba(0,255,0,0.4), rgba(0,150,255,0.3), rgba(238,130,238,0.2), transparent)';
            witchGlow.style.boxShadow = '0 0 80px rgba(255,0,150,0.8), 0 0 120px rgba(255,255,0,0.5)';
            witchGlow.style.animation = 'pulse-rainbow 1s infinite';
        } else if (loss < 5) {
            // Almost perfect - strong green glow
            potionEffect.textContent = 'Nearly perfect!';
            potionEffect.style.color = '#2ecc71';
            qualityText.textContent = 'Almost there!';
            qualityText.style.color = '#2ecc71';
            lossElement.style.background = '';
            lossElement.style.backgroundSize = '';
            lossElement.style.webkitBackgroundClip = '';
            lossElement.style.webkitTextFillColor = '';
            lossElement.style.backgroundClip = '';
            lossElement.style.animation = '';
            lossElement.style.color = '#2ecc71';
            witchImg.style.transform = 'scale(1.08) rotate(2deg)';
            
            witchGlow.style.width = '250px';
            witchGlow.style.height = '250px';
            witchGlow.style.background = 'radial-gradient(circle, rgba(46,213,115,0.8), rgba(46,213,115,0.4), transparent)';
            witchGlow.style.boxShadow = '0 0 60px rgba(46,213,115,0.8)';
            witchGlow.style.animation = 'pulse-glow 1.5s infinite';
        } else if (loss < 15) {
            // Very close - yellow-green glow
            potionEffect.textContent = 'Almost perfect!';
            potionEffect.style.color = '#a0d52e';
            qualityText.textContent = 'Very close to perfect!';
            qualityText.style.color = '#a0d52e';
            lossElement.style.background = '';
            lossElement.style.backgroundSize = '';
            lossElement.style.webkitBackgroundClip = '';
            lossElement.style.webkitTextFillColor = '';
            lossElement.style.backgroundClip = '';
            lossElement.style.animation = '';
            lossElement.style.color = '#a0d52e';
            witchImg.style.transform = 'scale(1.05)';
            
            witchGlow.style.width = '230px';
            witchGlow.style.height = '230px';
            witchGlow.style.background = 'radial-gradient(circle, rgba(160,213,46,0.7), rgba(160,213,46,0.3), transparent)';
            witchGlow.style.boxShadow = '0 0 40px rgba(160,213,46,0.7)';
            witchGlow.style.animation = 'pulse-glow 2s infinite';
        } else if (loss < 30) {
            // Getting there - yellow glow
            potionEffect.textContent = 'Good progress...';
            potionEffect.style.color = '#f39c12';
            qualityText.textContent = 'Getting warmer...';
            qualityText.style.color = '#f39c12';
            lossElement.style.background = '';
            lossElement.style.backgroundSize = '';
            lossElement.style.webkitBackgroundClip = '';
            lossElement.style.webkitTextFillColor = '';
            lossElement.style.backgroundClip = '';
            lossElement.style.animation = '';
            lossElement.style.color = '#f39c12';
            witchImg.style.transform = 'scale(1.02)';
            
            witchGlow.style.width = '210px';
            witchGlow.style.height = '210px';
            witchGlow.style.background = 'radial-gradient(circle, rgba(243,156,18,0.6), rgba(243,156,18,0.2), transparent)';
            witchGlow.style.boxShadow = '0 0 30px rgba(243,156,18,0.6)';
            witchGlow.style.animation = 'pulse-glow 2.5s infinite';
        } else if (loss < 50) {
            // Far - orange glow
            potionEffect.textContent = 'Needs adjustment...';
            potionEffect.style.color = '#e67e22';
            qualityText.textContent = 'Far from perfect...';
            qualityText.style.color = '#e67e22';
            lossElement.style.background = '';
            lossElement.style.backgroundSize = '';
            lossElement.style.webkitBackgroundClip = '';
            lossElement.style.webkitTextFillColor = '';
            lossElement.style.backgroundClip = '';
            lossElement.style.animation = '';
            lossElement.style.color = '#e67e22';
            witchImg.style.transform = 'scale(1)';
            
            witchGlow.style.width = '190px';
            witchGlow.style.height = '190px';
            witchGlow.style.background = 'radial-gradient(circle, rgba(230,126,34,0.5), rgba(230,126,34,0.15), transparent)';
            witchGlow.style.boxShadow = '0 0 20px rgba(230,126,34,0.5)';
            witchGlow.style.animation = 'pulse-glow 3s infinite';
        } else {
            // Very far - dim red glow
            potionEffect.textContent = 'Terrible mixture!';
            potionEffect.style.color = '#c0392b';
            qualityText.textContent = 'Completely wrong!';
            qualityText.style.color = '#c0392b';
            lossElement.style.background = '';
            lossElement.style.backgroundSize = '';
            lossElement.style.webkitBackgroundClip = '';
            lossElement.style.webkitTextFillColor = '';
            lossElement.style.backgroundClip = '';
            lossElement.style.animation = '';
            lossElement.style.color = '#c0392b';
            witchImg.style.transform = 'scale(0.95)';
            
            witchGlow.style.width = '170px';
            witchGlow.style.height = '170px';
            witchGlow.style.background = 'radial-gradient(circle, rgba(192,57,43,0.3), rgba(192,57,43,0.1), transparent)';
            witchGlow.style.boxShadow = '0 0 10px rgba(192,57,43,0.3)';
            witchGlow.style.animation = 'none';
        }
        
        // Update button states
        eyeIncrement.disabled = eyeValue >= 100;
        eyeIncrement.style.opacity = eyeValue >= 100 ? '0.5' : '1';
        eyeIncrement.style.cursor = eyeValue >= 100 ? 'not-allowed' : 'pointer';
        
        eyeDecrement.disabled = eyeValue <= 0;
        eyeDecrement.style.opacity = eyeValue <= 0 ? '0.5' : '1';
        eyeDecrement.style.cursor = eyeValue <= 0 ? 'not-allowed' : 'pointer';
        
        dragonIncrement.disabled = dragonValue >= 100;
        dragonIncrement.style.opacity = dragonValue >= 100 ? '0.5' : '1';
        dragonIncrement.style.cursor = dragonValue >= 100 ? 'not-allowed' : 'pointer';
        
        dragonDecrement.disabled = dragonValue <= 0;
        dragonDecrement.style.opacity = dragonValue <= 0 ? '0.5' : '1';
        dragonDecrement.style.cursor = dragonValue <= 0 ? 'not-allowed' : 'pointer';
    }
    
    // Add event listeners for sliders
    eyeSlider.addEventListener('input', updatePotion);
    dragonSlider.addEventListener('input', updatePotion);
    
    // Add event listeners for buttons
    eyeIncrement.addEventListener('click', () => {
        eyeSlider.value = Math.min(100, parseInt(eyeSlider.value) + 1);
        updatePotion();
    });
    
    eyeDecrement.addEventListener('click', () => {
        eyeSlider.value = Math.max(0, parseInt(eyeSlider.value) - 1);
        updatePotion();
    });
    
    dragonIncrement.addEventListener('click', () => {
        dragonSlider.value = Math.min(100, parseInt(dragonSlider.value) + 1);
        updatePotion();
    });
    
    dragonDecrement.addEventListener('click', () => {
        dragonSlider.value = Math.max(0, parseInt(dragonSlider.value) - 1);
        updatePotion();
    });
    
    // Button hover effects
    [eyeIncrement, eyeDecrement, dragonIncrement, dragonDecrement].forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            if (!btn.disabled) {
                btn.style.transform = 'scale(1.1)';
                btn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
            }
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1)';
            btn.style.boxShadow = 'none';
        });
    });
    
    // Style the sliders and animations
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
            
            @keyframes pulse-glow {
                0%, 100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1); }
                50% { opacity: 1; transform: translate(-50%, -50%) scale(1.05); }
            }
            
            @keyframes pulse-rainbow {
                0%, 100% { 
                    opacity: 0.9; 
                    transform: translate(-50%, -50%) scale(1) rotate(0deg);
                }
                50% { 
                    opacity: 1; 
                    transform: translate(-50%, -50%) scale(1.1) rotate(180deg);
                }
            }
            
            @keyframes rainbow-shift {
                0% { background-position: 0% 50%; }
                100% { background-position: -200% 50%; }
            }
        </style>
    `;
    document.head.insertAdjacentHTML('beforeend', sliderStyle);
    
    // Make sliders more responsive
    eyeSlider.addEventListener('change', updatePotion);
    dragonSlider.addEventListener('change', updatePotion);
    
    // Add keyboard support for fine control
    document.addEventListener('keydown', (e) => {
        if (e.target === eyeSlider || e.target === dragonSlider) {
            e.preventDefault();
            const slider = e.target;
            const currentValue = parseInt(slider.value);
            
            if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
                slider.value = Math.max(0, currentValue - 1);
                updatePotion();
            } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                slider.value = Math.min(100, currentValue + 1);
                updatePotion();
            }
        }
    });
    
    // Initial update
    updatePotion();
}