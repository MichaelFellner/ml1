/**
 * Balloon Inflation Challenge Level - Draggable Pump Version
 * 
 * Interactive level where users drag the pump up/down to control air pressure
 * The pump position directly controls the w parameter
 * 
 * @fileoverview Enhanced balloon inflation level with draggable pump
 * @author MLTEACH Team
 * @version 6.0.0
 * 
 * Level Configuration:
 * - Type: Interactive parameter adjustment with draggable pump
 * - Target function: f(x) = 7x (where x is balloon size)
 * - Parameter: w (air multiplier) controlled by pump position
 * - Range: 0 to 9.9 (balloon pops when w > 7)
 * - Balloon sizes: 1, 2, 3, 4
 * - Success criteria: Minimize loss across all balloons
 */

// Utility function implementations
function getElementById(id, required = true) {
    const element = document.getElementById(id);
    if (!element && required) {
        console.warn(`getElementById: Element with ID '${id}' not found`);
    }
    return element;
}

function clamp(value, min, max) {
    if (min > max) [min, max] = [max, min];
    return Math.min(Math.max(value, min), max);
}

function formatNumber(num, decimals = 1) {
    const n = parseFloat(num);
    if (isNaN(n)) return String(num);
    if (!isFinite(n)) return n > 0 ? '∞' : '-∞';
    return n.toFixed(decimals);
}

function calculateLoss(predicted, actual) {
    return Math.abs(predicted - actual);
}

// Check if state management system is available
if (typeof LevelProgressStore === 'undefined' || typeof GameStateStore === 'undefined') {
    console.error('State management system not loaded - make sure state files are included before this level');
}

/**
 * Creates and initializes the enhanced balloon inflation level
 */
function createBalloonInflationLevel() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <style>
            @keyframes glowPulse {
                0% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.1);
                }
                100% {
                    transform: scale(1);
                }
            }
            
            @keyframes sparkle {
                0%, 100% {
                    opacity: 0;
                }
                50% {
                    opacity: 1;
                }
            }
            
            .loss-glow {
                animation: glowPulse 2s ease-in-out;
            }
            
            @keyframes pumpDown {
                0% {
                    transform: translateY(0);
                }
                50% {
                    transform: translateY(20px);
                }
                100% {
                    transform: translateY(0);
                }
            }
            
            .pump-animation {
                animation: pumpDown 0.5s ease-in-out;
            }
            
            @keyframes balloonPop {
                0% {
                    transform: scale(1);
                    opacity: 1;
                }
                50% {
                    transform: scale(1.3);
                    opacity: 0.8;
                }
                100% {
                    transform: scale(1.5);
                    opacity: 0;
                }
            }
            
            .balloon-popping {
                animation: balloonPop 0.3s ease-out forwards;
            }
        </style>
        <div class="current-level">
            <div class="level-header">
                Manually Optimizing 1 Variable
            </div>
            <div style="text-align: center; padding: 0; margin: 0; color: #666; font-size: 0.95rem;">
            Before we see what <strong>Gradient Descent</strong> <i>does</i>, lets do a challenge that will have you do the job of Gradient Descent yourself. Below is a pump and different balloons. 
            Each different sized balloons needs a different amount of air to inflate it to its largest size without popping. The amount of air each balloon receives is <strong style="color": blue>w · x</strong>. The
            <strong>x</strong> variable is the size of the balloon and <strong>w</strong> is a multiplier on how much air to give. Your job is to find the optimal w value that can inflate all the balloons through trial and error. Use the loss
            as a clue for finding the right amount. 
            <div class="level-content" style="padding: 15px; display: flex; justify-content: center;">
                
                <!-- Main Container with Fixed Width -->
                <div style="width: 1000px; background: linear-gradient(to bottom, #e3f2fd, #bbdefb); border-radius: 15px; padding: 20px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); margin-bottom: 20px;">
                    
                    <!-- Formula Display -->
                    <div style="background: white; border-radius: 10px; padding: 15px; margin-bottom: 25px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <div style="font-size: 2rem; font-family: 'Courier New', monospace; color: #333; font-weight: bold; text-align: center; white-space: nowrap;">
                            f(<span id="formula-x" style="color: #764ba2;">1</span>) = <span id="formula-w" style="color: #667eea; display: inline-block; width: 50px; text-align: right;">0.0</span> × <span id="formula-x2" style="color: #764ba2;">1</span> = <span id="formula-result" style="color: #ff6b6b; display: inline-block; width: 80px; text-align: right;">0.0</span> units of air
                            <span style="margin: 0 15px; color: #999;">|</span>
                            Loss: <span id="loss-inline" style="color: #ff6b6b; font-weight: bold; display: inline-block;">--</span>
                        </div>
                    </div>
                    
                    <!-- Main Interactive Area -->
                    <div style="display: flex; align-items: center; justify-content: center; gap: 40px; margin-bottom: 20px; height: 200px;">
                        
                        <!-- Center Group: Buttons, Pump, and Balloon -->
                        <div style="display: flex; align-items: center; gap: 20px;">
                            <!-- Fine adjustment buttons -->
                            <div style="display: flex; flex-direction: column; gap: 10px;">
                                <button id="w-increase" style="width: 40px; height: 40px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 8px; font-size: 1.5rem; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">
                                    +
                                </button>
                                <button id="w-decrease" style="width: 40px; height: 40px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 8px; font-size: 1.5rem; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">
                                    −
                                </button>
                            </div>
                            
                            <!-- Draggable Pump Container -->
                            <div style="position: relative; width: 120px; height: 200px;">
                                <!-- Pressure scale background -->
                                <div style="position: absolute; left: 10px; top: 0; bottom: 0; width: 100px; background: linear-gradient(to top, #e2e8f0 0%, #667eea 50%, #764ba2 100%); border-radius: 10px; opacity: 0.2;"></div>
                                
                                <!-- Draggable Pump -->
                                <div id="pump-container" style="position: absolute; left: 20px; right: 20px; cursor: grab; user-select: none; top: 110px;">
                                    <div style="text-align: center; position: relative;">
                                        <!-- Pump visual -->
                                        <div style="width: 70px; height: 90px; background: linear-gradient(to bottom, #4a5568, #2d3748); border-radius: 8px; position: relative; box-shadow: 0 3px 8px rgba(0,0,0,0.3);">
                                            <!-- Pump handle -->
                                            <div style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%); width: 30px; height: 20px; background: #1a202c; border-radius: 5px;"></div>
                                            <!-- Pump details -->
                                            <div style="position: absolute; top: 15px; left: 8px; right: 8px; height: 50px; background: rgba(255,255,255,0.1); border-radius: 5px;"></div>
                                            <!-- W value display -->
                                            <div style="position: absolute; bottom: 8px; left: 0; right: 0; text-align: center; color: white; font-weight: bold; font-size: 12px;">
                                                w = <span id="pump-w-value">0.0</span>
                                            </div>
                                        </div>
                                        <!-- Nozzle -->
                                        <div style="position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%); width: 20px; height: 15px; background: #2d3748; border-radius: 0 0 50% 50%;"></div>
                                    </div>
                                </div>
                                
                                <!-- Instructions -->
                                <div style="position: absolute; bottom: -25px; left: 0; right: 0; text-align: center; font-size: 11px; color: #666;">
                                    ↕ Drag pump up/down
                                </div>
                            </div>
                            
                            <!-- Air Flow Visual -->
                            <div style="position: relative; width: 60px; height: 100px; display: flex; align-items: center;">
                                <div style="width: 100%; height: 4px; background: #718096; position: relative;">
                                    <div id="air-flow" style="position: absolute; width: 20px; height: 4px; background: #667eea; left: -20px; transition: left 0.5s linear; opacity: 0;"></div>
                                </div>
                            </div>
                            
                            <!-- Balloon -->
                            <div style="text-align: center; position: relative;">
                                <div id="balloon-container" style="position: relative; width: 200px; height: 200px; display: flex; align-items: center; justify-content: center;">
                                    <svg width="200" height="200" viewBox="0 0 200 200">
                                        <!-- Balloon shape -->
                                        <ellipse id="balloon-shape" cx="100" cy="100" rx="15" ry="16.5" fill="#ff6b6b" stroke="#e53e3e" stroke-width="2" style="transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);"/>
                                        <!-- Highlight -->
                                        <ellipse id="balloon-highlight" cx="95" cy="95" rx="5" ry="6" fill="white" opacity="0.3"/>
                                    </svg>
                                    <!-- Pop effect -->
                                    <div id="pop-effect" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 80px; opacity: 0; transition: opacity 0.3s, font-size 0.3s; z-index: 10;">💥</div>
                                </div>
                                
                                <!-- Pump/Reset Button -->
                                <button id="pump-button" style="margin-top: -10px; padding: 10px 25px; background: linear-gradient(135deg, #ff6b6b, #feca57); color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: bold; cursor: pointer; box-shadow: 0 3px 10px rgba(0,0,0,0.2); transition: all 0.3s;">
                                    💨 Pump Air!
                                </button>
                            </div>
                        </div>
                        
                        <!-- Status Text -->
                        <div style="width: 180px; padding: 15px; display: flex; flex-direction: column; justify-content: center;">
                            <div id="status-text" style="font-size: 1.1rem; color: #666; font-weight: 500; text-align: left; line-height: 1.5;">
                                Adjust w and pump air to test!
                            </div>
                            <div id="status-emoji" style="font-size: 2rem; margin-top: 10px; text-align: center;">
                                🎯
                            </div>
                        </div>
                    </div>
                    
                    <!-- Balloon Selector -->
                    <div style="padding: 12px 0; margin-bottom: 15px;">
                        <div style="font-size: 0.9rem; color: #444; margin-bottom: 10px; text-align: center;">Select balloon size to test:</div>
                        <div style="display: flex; gap: 15px; justify-content: center;">
                            <button class="balloon-btn" data-size="1" style="padding: 8px 18px; background: #667eea; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 0.95rem; transition: all 0.3s;">
                                🎈 Size 1
                            </button>
                            <button class="balloon-btn" data-size="2" style="padding: 8px 18px; background: white; color: #333; border: 2px solid #ddd; border-radius: 6px; cursor: pointer; font-size: 0.95rem; transition: all 0.3s;">
                                🎈 Size 2
                            </button>
                            <button class="balloon-btn" data-size="3" style="padding: 8px 18px; background: white; color: #333; border: 2px solid #ddd; border-radius: 6px; cursor: pointer; font-size: 0.95rem; transition: all 0.3s;">
                                🎈 Size 3
                            </button>
                            <button class="balloon-btn" data-size="4" style="padding: 8px 18px; background: white; color: #333; border: 2px solid #ddd; border-radius: 6px; cursor: pointer; font-size: 0.95rem; transition: all 0.3s;">
                                🎈 Size 4
                            </button>
                        </div>
                    </div>
                    
                </div>
            </div>
            
            ${createStandardNavigation()}
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('balloon-level', 'createBalloonInflationLevel');
    
    // Initialize level
    if (typeof LevelProgressStore !== 'undefined' && typeof GameStateStore !== 'undefined') {
        const initializeLevel = () => {
            try {
                LevelProgressStore.startLevel('balloon-inflation');
                GameStateStore.setCurrentLevel('balloon-inflation');
                setupBalloonLevel();
            } catch (error) {
                console.warn('State management not yet ready, falling back to basic setup');
                setupBalloonLevel();
            }
        };
        
        if (window.StateManager && window.StateManager.initialized) {
            initializeLevel();
        } else {
            window.addEventListener('mlteach:state:ready', initializeLevel, { once: true });
            setTimeout(initializeLevel, 1000);
        }
    } else {
        setupBalloonLevel();
    }
}

/**
 * Sets up the interactive behavior for the enhanced balloon inflation level
 */
function setupBalloonLevel() {
    // Constants
    const TRUE_W = 7;
    const LEVEL_ID = 'balloon-inflation';
    const PUMP_MIN_Y = 10;
    const PUMP_MAX_Y = 110;
    const PUMP_RANGE = PUMP_MAX_Y - PUMP_MIN_Y;
    const MAX_W = 9.9;  // Maximum w value
    
    // State variables
    let currentBalloonSize = 1;
    let attempts = 0;
    let sessionStartTime = Date.now();
    let currentW = 0;  // Start at 0
    let isDragging = false;
    let dragStartY = 0;
    let pumpStartY = 0;
    let balloonInflated = false;
    const BASE_BALLOON_SIZE = 15; // Smaller starting size
    
    // DOM elements
    const pumpContainer = getElementById('pump-container');
    const pumpButton = getElementById('pump-button');
    const balloonButtons = document.querySelectorAll('.balloon-btn');
    const balloonShape = getElementById('balloon-shape');
    const balloonHighlight = getElementById('balloon-highlight');
    const popEffect = getElementById('pop-effect');
    const airFlow = getElementById('air-flow');
    const wIncreaseBtn = getElementById('w-increase');
    const wDecreaseBtn = getElementById('w-decrease');
    const statusText = getElementById('status-text');
    const statusEmoji = getElementById('status-emoji');
    
    // State management
    let hasStateManagement = false;
    if (typeof GameStateStore !== 'undefined') {
        try {
            const savedParams = GameStateStore.getParameters(LEVEL_ID);
            if (savedParams.w !== undefined) {
                currentW = savedParams.w;
            }
            hasStateManagement = true;
        } catch (error) {
            console.warn('Could not load saved parameters:', error);
        }
    }
    
    /**
     * Updates pump position based on w value
     */
    function updatePumpPosition() {
        // Map w (0-9.9) to y position (PUMP_MAX_Y to PUMP_MIN_Y)
        const yPos = PUMP_MAX_Y - (currentW / MAX_W) * PUMP_RANGE;
        pumpContainer.style.top = `${yPos}px`;
        pumpContainer.style.transform = 'translateY(0)';
    }
    
    /**
     * Updates all displays based on current w and balloon size
     */
    function updateDisplay() {
        const airAmount = currentW * currentBalloonSize;
        
        // Update formula display
        getElementById('formula-x').textContent = currentBalloonSize;
        getElementById('formula-x2').textContent = currentBalloonSize;
        getElementById('formula-w').textContent = currentW.toFixed(1);
        getElementById('formula-result').textContent = airAmount.toFixed(1);
        getElementById('pump-w-value').textContent = currentW.toFixed(1);
        
        // Save state if available
        if (hasStateManagement) {
            try {
                GameStateStore.updateParameters(LEVEL_ID, { w: currentW });
            } catch (error) {
                console.warn('Could not save parameters:', error);
            }
        }
    }
    
    /**
     * Sets up dragging for the pump
     */
    function setupPumpDragging() {
        // Mouse events
        pumpContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            dragStartY = e.clientY;
            pumpStartY = parseFloat(pumpContainer.style.top) || PUMP_MAX_Y - (currentW / MAX_W) * PUMP_RANGE;
            pumpContainer.style.cursor = 'grabbing';
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const deltaY = e.clientY - dragStartY;
            let newY = clamp(pumpStartY + deltaY, PUMP_MIN_Y, PUMP_MAX_Y);
            
            // Update pump position
            pumpContainer.style.top = `${newY}px`;
            
            // Calculate new w value from position
            currentW = ((PUMP_MAX_Y - newY) / PUMP_RANGE) * MAX_W;
            currentW = Math.round(currentW * 10) / 10; // Round to 0.1
            currentW = clamp(currentW, 0, MAX_W);
            
            updateDisplay();
        });
        
        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                pumpContainer.style.cursor = 'grab';
            }
        });
        
        // Touch events for mobile
        pumpContainer.addEventListener('touchstart', (e) => {
            isDragging = true;
            dragStartY = e.touches[0].clientY;
            pumpStartY = parseFloat(pumpContainer.style.top) || PUMP_MAX_Y - (currentW / MAX_W) * PUMP_RANGE;
            e.preventDefault();
        });
        
        document.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            const deltaY = e.touches[0].clientY - dragStartY;
            let newY = clamp(pumpStartY + deltaY, PUMP_MIN_Y, PUMP_MAX_Y);
            
            pumpContainer.style.top = `${newY}px`;
            
            currentW = ((PUMP_MAX_Y - newY) / PUMP_RANGE) * MAX_W;
            currentW = Math.round(currentW * 10) / 10;
            currentW = clamp(currentW, 0, MAX_W);
            
            updateDisplay();
        });
        
        document.addEventListener('touchend', () => {
            isDragging = false;
        });
    }
    
    /**
     * Animates air flow visual
     */
    function animateAirFlow() {
        airFlow.style.opacity = '1';
        airFlow.style.left = '-20px';
        setTimeout(() => {
            airFlow.style.left = '80px';
            setTimeout(() => {
                airFlow.style.opacity = '0';
                setTimeout(() => {
                    airFlow.style.left = '-20px';
                }, 100);
            }, 400);
        }, 50);
    }
    
    /**
     * Resets the balloon to original small size
     */
    function resetBalloon() {
        // Clear any transitions first
        balloonShape.style.transition = 'none';
        if (balloonHighlight) {
            balloonHighlight.style.transition = 'none';
        }
        
        // All balloons start at the same small size
        balloonShape.setAttribute('rx', BASE_BALLOON_SIZE);
        balloonShape.setAttribute('ry', BASE_BALLOON_SIZE * 1.1);
        balloonShape.setAttribute('fill', '#ff6b6b');
        balloonShape.style.opacity = '1';  // Make sure balloon is visible again
        balloonShape.style.display = '';  // Restore display property
        balloonShape.classList.remove('balloon-popping');  // Remove animation class
        
        // Reset highlight
        if (balloonHighlight) {
            balloonHighlight.setAttribute('rx', 5);
            balloonHighlight.setAttribute('ry', 6);
            balloonHighlight.style.opacity = '0.3';  // Reset highlight opacity
            balloonHighlight.style.display = '';  // Restore display property
            balloonHighlight.classList.remove('balloon-popping');  // Remove animation class
        }
        
        // Hide pop effect and reset its size
        popEffect.style.opacity = '0';
        popEffect.style.fontSize = '80px';
        popEffect.style.transition = '';
        
        // Reset loss display and clear any animation
        const lossElement = getElementById('loss-inline');
        lossElement.innerHTML = '--';  // Use innerHTML to clear any sparkles
        lossElement.classList.remove('loss-glow');
        lossElement.style.textShadow = '';
        
        // Reset status
        if (statusText) statusText.textContent = 'Adjust w and pump air to test!';
        if (statusEmoji) statusEmoji.textContent = '🎯';
        
        // Change button back to "Pump Air!"
        pumpButton.innerHTML = '💨 Pump Air!';
        pumpButton.style.background = 'linear-gradient(135deg, #ff6b6b, #feca57)';
        
        balloonInflated = false;
        
        // Re-enable transitions after reset
        setTimeout(() => {
            balloonShape.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            if (balloonHighlight) {
                balloonHighlight.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            }
        }, 50);
    }
    
    /**
     * Handles pump action - inflates balloon and calculates loss
     */
    function pumpAir() {
        // If balloon is already inflated, reset it first
        if (balloonInflated) {
            resetBalloon();
            return;
        }
        
        // Animate pump
        pumpContainer.classList.add('pump-animation');
        setTimeout(() => {
            pumpContainer.classList.remove('pump-animation');
        }, 500);
        
        attempts++;
        animateAirFlow();
        balloonInflated = true;
        
        const yourAir = currentW * currentBalloonSize;
        const correctAir = TRUE_W * currentBalloonSize;
        const loss = calculateLoss(yourAir, correctAir);
        const maxLoss = 15; // Maximum expected loss for color scaling
        
        // Update loss display with color based on value
        const lossElement = getElementById('loss-inline');
        // Start with plain text (will be overridden if loss = 0)
        lossElement.innerHTML = formatNumber(loss, 2);
        
        // Calculate color based on loss (green when close to 0, red when far)
        const lossRatio = Math.min(loss / maxLoss, 1);
        let glowColor;
        if (loss === 0) {
            glowColor = '#4ade80';
            lossElement.style.textShadow = `0 0 10px ${glowColor}, 0 0 20px ${glowColor}, 0 0 30px gold`;
            // Add sparkle effect
            lossElement.innerHTML = `✨ ${formatNumber(loss, 2)} ✨`;
        } else if (lossRatio < 0.3) {
            // Close to perfect - greenish
            glowColor = `rgb(${Math.round(74 + lossRatio * 500)}, ${Math.round(222 - lossRatio * 100)}, 128)`;
            lossElement.style.textShadow = `0 0 10px ${glowColor}, 0 0 20px ${glowColor}`;
        } else if (lossRatio < 0.6) {
            // Medium - yellowish
            glowColor = `rgb(${Math.round(251 - lossRatio * 100)}, ${Math.round(191 - lossRatio * 100)}, 36)`;
            lossElement.style.textShadow = `0 0 10px ${glowColor}, 0 0 20px ${glowColor}`;
        } else {
            // Far - reddish
            glowColor = '#ff6b6b';
            lossElement.style.textShadow = `0 0 10px ${glowColor}, 0 0 20px ${glowColor}`;
        }
        
        // Trigger animation
        lossElement.classList.remove('loss-glow');
        void lossElement.offsetWidth;
        lossElement.classList.add('loss-glow');
        setTimeout(() => {
            lossElement.classList.remove('loss-glow');
        }, 2000);
        
        // Update status text
        if (statusText && statusEmoji) {
            if (loss === 0) {
                statusText.textContent = 'Perfect! You found the optimal w value!';
                statusEmoji.textContent = '🎆';
            } else if (currentW > TRUE_W) {
                statusText.textContent = 'Too much air! The balloon popped! Decrease w below 7.';
                statusEmoji.textContent = '💥';
            } else if (yourAir < correctAir * 0.5) {
                statusText.textContent = 'Way too little air! Increase w significantly.';
                statusEmoji.textContent = '⬆️';
            } else if (yourAir < correctAir) {
                statusText.textContent = 'Need more air. Increase w a bit.';
                statusEmoji.textContent = '🔼';
            } else {
                statusText.textContent = 'Too much air. Decrease w slightly.';
                statusEmoji.textContent = '🔽';
            }
        }
        
        // Reset pop effect
        popEffect.style.opacity = '0';
        
        // Ensure transitions are enabled for animations
        balloonShape.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        if (balloonHighlight) {
            balloonHighlight.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        }
        
        // Determine outcome based on accuracy
        // Adjusted sizes to fit within 200x200 container
        const maxSize = 60 + (currentBalloonSize * 8); // Max radius ~90px
        let targetRx, targetRy, balloonColor;
        let highlightRx = 5, highlightRy = 6;
        
        if (loss === 0) {
            // Perfect
            targetRx = maxSize;
            targetRy = maxSize * 1.1;
            balloonColor = '#4ade80';
            highlightRx = maxSize * 0.3;
            highlightRy = maxSize * 0.35;
            
            // Animate balloon
            balloonShape.setAttribute('rx', targetRx);
            balloonShape.setAttribute('ry', targetRy);
            balloonShape.setAttribute('fill', balloonColor);
            
            if (balloonHighlight) {
                balloonHighlight.setAttribute('rx', highlightRx);
                balloonHighlight.setAttribute('ry', highlightRy);
            }
        } else if (currentW > TRUE_W) {
            // w value is too high (> 7) - balloon inflates then pops
            // First inflate the balloon to maximum before popping
            targetRx = maxSize * 1.3;  // Make it even bigger before popping
            targetRy = maxSize * 1.4;
            balloonColor = '#ff0000';  // Bright red for danger
            highlightRx = targetRx * 0.3;
            highlightRy = targetRy * 0.3;
            
            // Animate balloon to large size first
            balloonShape.setAttribute('rx', targetRx);
            balloonShape.setAttribute('ry', targetRy);
            balloonShape.setAttribute('fill', balloonColor);
            
            if (balloonHighlight) {
                balloonHighlight.setAttribute('rx', highlightRx);
                balloonHighlight.setAttribute('ry', highlightRy);
            }
            
            // Then pop after a short delay
            setTimeout(() => {
                // Instantly shrink balloon to nothing (the "pop")
                balloonShape.setAttribute('rx', '0');
                balloonShape.setAttribute('ry', '0');
                balloonShape.style.opacity = '0';
                
                if (balloonHighlight) {
                    balloonHighlight.setAttribute('rx', '0');
                    balloonHighlight.setAttribute('ry', '0');
                    balloonHighlight.style.opacity = '0';
                }
                
                // Show big pop effect
                popEffect.style.opacity = '1';
                popEffect.style.fontSize = '150px';  // Make it bigger
                
                // Pulse the pop effect
                setTimeout(() => {
                    popEffect.style.fontSize = '120px';
                }, 100);
            }, 500);  // Wait half a second before popping
        } else if (yourAir < correctAir * 0.5) {
            // Way too little - stays small
            targetRx = BASE_BALLOON_SIZE * 1.2;
            targetRy = BASE_BALLOON_SIZE * 1.3;
            balloonColor = '#fbbf24';
            highlightRx = 6;
            highlightRy = 7;
            
            // Animate balloon
            balloonShape.setAttribute('rx', targetRx);
            balloonShape.setAttribute('ry', targetRy);
            balloonShape.setAttribute('fill', balloonColor);
            
            if (balloonHighlight) {
                balloonHighlight.setAttribute('rx', highlightRx);
                balloonHighlight.setAttribute('ry', highlightRy);
            }
        } else if (yourAir < correctAir) {
            // A bit too little - partially inflated
            const inflationRatio = yourAir / correctAir;
            targetRx = BASE_BALLOON_SIZE + (maxSize - BASE_BALLOON_SIZE) * inflationRatio * 0.8;
            targetRy = (BASE_BALLOON_SIZE + (maxSize - BASE_BALLOON_SIZE) * inflationRatio * 0.8) * 1.1;
            balloonColor = '#fb923c';
            highlightRx = targetRx * 0.3;
            highlightRy = targetRy * 0.3;
            
            // Animate balloon
            balloonShape.setAttribute('rx', targetRx);
            balloonShape.setAttribute('ry', targetRy);
            balloonShape.setAttribute('fill', balloonColor);
            
            if (balloonHighlight) {
                balloonHighlight.setAttribute('rx', highlightRx);
                balloonHighlight.setAttribute('ry', highlightRy);
            }
        } else {
            // A bit too much - slightly over-inflated
            targetRx = maxSize * 0.95;
            targetRy = maxSize * 1.05;
            balloonColor = '#f87171';
            highlightRx = targetRx * 0.3;
            highlightRy = targetRy * 0.3;
            
            // Animate balloon
            balloonShape.setAttribute('rx', targetRx);
            balloonShape.setAttribute('ry', targetRy);
            balloonShape.setAttribute('fill', balloonColor);
            
            if (balloonHighlight) {
                balloonHighlight.setAttribute('rx', highlightRx);
                balloonHighlight.setAttribute('ry', highlightRy);
            }
        }
        
        // Change button to "Reset"
        pumpButton.innerHTML = '🔄 Reset';
        pumpButton.style.background = 'linear-gradient(135deg, #718096, #4a5568)';
        
        // Track in state management
        if (hasStateManagement) {
            try {
                GameStateStore.updateActivity('pump_attempt', {
                    balloonSize: currentBalloonSize,
                    yourAir: yourAir,
                    correctAir: correctAir,
                    loss: loss
                });
                
                if (currentW === TRUE_W) {
                    const timeSpent = Date.now() - sessionStartTime;
                    LevelProgressStore.completeLevel(LEVEL_ID, {
                        score: Math.max(0, 100 - attempts * 5),
                        solutions: { w: currentW },
                        timeSpent: timeSpent
                    });
                }
            } catch (error) {
                console.warn('Could not track activity:', error);
            }
        }
    }
    
    /**
     * Handles balloon size selection
     */
    function selectBalloon(size) {
        // Reset balloon first if it's inflated
        if (balloonInflated) {
            resetBalloon();
        }
        
        currentBalloonSize = size;
        
        // Update button styles
        balloonButtons.forEach(btn => {
            if (parseInt(btn.dataset.size) === size) {
                btn.style.background = '#667eea';
                btn.style.color = 'white';
                btn.style.border = 'none';
                btn.style.transform = 'scale(1.05)';
            } else {
                btn.style.background = 'white';
                btn.style.color = '#333';
                btn.style.border = '2px solid #ddd';
                btn.style.transform = 'scale(1)';
            }
        });
        
        // Temporarily disable transitions for instant reset
        balloonShape.style.transition = 'none';
        if (balloonHighlight) {
            balloonHighlight.style.transition = 'none';
        }
        
        // Always reset to small size
        balloonShape.setAttribute('rx', BASE_BALLOON_SIZE);
        balloonShape.setAttribute('ry', BASE_BALLOON_SIZE * 1.1);
        balloonShape.setAttribute('fill', '#ff6b6b');
        balloonShape.style.opacity = '1';  // Make sure balloon is visible
        balloonShape.style.display = '';  // Restore display property
        balloonShape.classList.remove('balloon-popping');  // Remove animation class
        
        // Reset highlight
        if (balloonHighlight) {
            balloonHighlight.setAttribute('rx', 5);
            balloonHighlight.setAttribute('ry', 6);
            balloonHighlight.style.opacity = '0.3';
            balloonHighlight.style.display = '';  // Restore display property
            balloonHighlight.classList.remove('balloon-popping');  // Remove animation class
        }
        
        // Hide pop effect and reset its size
        popEffect.style.opacity = '0';
        popEffect.style.fontSize = '80px';
        popEffect.style.transition = '';
        
        // Reset loss display and clear any animation
        const lossElement = getElementById('loss-inline');
        lossElement.innerHTML = '--';  // Use innerHTML to clear any sparkles
        lossElement.classList.remove('loss-glow');
        lossElement.style.textShadow = '';
        
        // Update status for new balloon
        if (statusText) statusText.textContent = `Testing balloon size ${size}. Adjust w and pump!`;
        if (statusEmoji) statusEmoji.textContent = '🎯';
        
        // Re-enable transitions after reset
        setTimeout(() => {
            balloonShape.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            if (balloonHighlight) {
                balloonHighlight.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            }
        }, 50);
        
        // Update displays
        updateDisplay();
    }
    
    // Event listeners
    setupPumpDragging();
    
    // Add + and - button handlers
    if (wIncreaseBtn) {
        wIncreaseBtn.addEventListener('click', () => {
            currentW = Math.min(currentW + 0.1, MAX_W);
            currentW = Math.round(currentW * 10) / 10; // Round to 0.1
            updatePumpPosition();
            updateDisplay();
        });
        
        wIncreaseBtn.addEventListener('mouseenter', () => {
            wIncreaseBtn.style.transform = 'scale(1.1)';
        });
        
        wIncreaseBtn.addEventListener('mouseleave', () => {
            wIncreaseBtn.style.transform = 'scale(1)';
        });
    }
    
    if (wDecreaseBtn) {
        wDecreaseBtn.addEventListener('click', () => {
            currentW = Math.max(currentW - 0.1, 0);
            currentW = Math.round(currentW * 10) / 10; // Round to 0.1
            updatePumpPosition();
            updateDisplay();
        });
        
        wDecreaseBtn.addEventListener('mouseenter', () => {
            wDecreaseBtn.style.transform = 'scale(1.1)';
        });
        
        wDecreaseBtn.addEventListener('mouseleave', () => {
            wDecreaseBtn.style.transform = 'scale(1)';
        });
    }
    
    pumpButton.addEventListener('click', pumpAir);
    pumpButton.addEventListener('mouseenter', () => {
        pumpButton.style.transform = 'translateY(-2px)';
        pumpButton.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
    });
    pumpButton.addEventListener('mouseleave', () => {
        pumpButton.style.transform = 'translateY(0)';
        pumpButton.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';
    });
    
    balloonButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            selectBalloon(parseInt(btn.dataset.size));
        });
        btn.addEventListener('mouseenter', () => {
            if (btn.style.background !== 'rgb(102, 126, 234)') {
                btn.style.transform = 'scale(1.05)';
                btn.style.borderColor = '#667eea';
            }
        });
        btn.addEventListener('mouseleave', () => {
            if (btn.style.background !== 'rgb(102, 126, 234)') {
                btn.style.transform = 'scale(1)';
                btn.style.borderColor = '#ddd';
            }
        });
    });
    
    // Initialize display
    updatePumpPosition();
    updateDisplay();
    
    // Initialize balloon at small size
    balloonShape.setAttribute('rx', BASE_BALLOON_SIZE);
    balloonShape.setAttribute('ry', BASE_BALLOON_SIZE * 1.1);
    balloonShape.style.opacity = '1';
    balloonShape.style.display = '';
    balloonShape.style.transition = '';
    balloonShape.classList.remove('balloon-popping');
    
    // Initialize highlight
    if (balloonHighlight) {
        balloonHighlight.setAttribute('rx', 5);
        balloonHighlight.setAttribute('ry', 6);
        balloonHighlight.style.opacity = '0.3';
        balloonHighlight.style.display = '';
        balloonHighlight.style.transition = '';
        balloonHighlight.classList.remove('balloon-popping');
    }
    
    // Initialize pop effect
    popEffect.style.opacity = '0';
    popEffect.style.fontSize = '80px';
    popEffect.style.transition = '';
    
    // Initialize loss display
    const lossElement = getElementById('loss-inline');
    if (lossElement) {
        lossElement.innerHTML = '--';
        lossElement.classList.remove('loss-glow');
        lossElement.style.textShadow = '';
    }
    
    // Initialize status
    if (statusText) statusText.textContent = 'Testing balloon size 1. Adjust w and pump!';
    if (statusEmoji) statusEmoji.textContent = '🎯';
}

// Export the functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createBalloonInflationLevel, setupBalloonLevel };
} else {
    window.createBalloonInflationLevel = createBalloonInflationLevel;
    window.setupBalloonLevel = setupBalloonLevel;
}