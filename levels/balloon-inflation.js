/**
 * Balloon Inflation Challenge Level
 * 
 * Interactive level where users manually adjust parameters to inflate balloons
 * Updated to use state management system for persistence and progress tracking
 * 
 * @fileoverview Balloon inflation level implementation with parameter adjustment
 * @author MLTEACH Team
 * @version 3.0.0
 * @since 1.0.0
 * 
 * @requires GameStateStore - For parameter persistence and activity tracking
 * @requires LevelProgressStore - For level completion and progress tracking
 * @requires createStandardNavigation - For navigation UI
 * @requires initializeNavigation - For navigation setup
 * @requires utils/index.js - For utility functions (DOM, math, formatting, validation)
 * 
 * Level Configuration:
 * - Type: Interactive parameter adjustment
 * - Target function: f(x) = 7x (where x is balloon size)
 * - Parameter: w (air multiplier)
 * - Range: 0 to 15, step 0.5
 * - Balloon sizes: 1, 2, 3, 4
 * - Success criteria: w = 7 (exact match) or 95-105% accuracy
 * 
 * @changelog v3.0.0 - Refactored to use utility functions from utils/ folder
 */

// Utility function implementations (inline to avoid ES6 module dependencies)
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
    if (typeof num !== 'number' || isNaN(num)) return String(num);
    if (!isFinite(num)) return num > 0 ? '∞' : '-∞';
    return num.toFixed(decimals).replace(/\.?0+$/, '');
}

function calculateAccuracy(actual, expected) {
    if (expected === 0) return actual === 0 ? 100 : 0;
    return Math.max(0, 100 - (Math.abs(actual - expected) / Math.abs(expected)) * 100);
}

function shake(element, duration = 300) {
    if (!element) return;
    element.style.animation = 'shake 0.3s';
    setTimeout(() => {
        element.style.animation = '';
    }, duration);
}

// Check if state management system is available
if (typeof LevelProgressStore === 'undefined' || typeof GameStateStore === 'undefined') {
    console.error('State management system not loaded - make sure state files are included before this level');
}

/**
 * Creates and initializes the balloon inflation level
 * 
 * Sets up the complete UI, initializes state management integration,
 * and configures the interactive balloon inflation challenge.
 * 
 * @function createBalloonInflationLevel
 * @returns {void} Renders level content to DOM and initializes functionality
 * 
 * @example
 * // Create the balloon inflation level
 * createBalloonInflationLevel();
 * 
 * @description
 * This function:
 * 1. Renders the complete level UI to the #app container
 * 2. Initializes standard navigation
 * 3. Sets up state management integration if available
 * 4. Calls setupBalloonLevel() to configure interactive behavior
 * 
 * The level includes:
 * - Balloon visualization with size-based scaling
 * - Parameter slider for air multiplier (w)
 * - Formula display showing f(x) = w × size
 * - Multiple balloon sizes to test (1-4)
 * - Result feedback with visual animations
 * - State persistence across sessions
 */
function createBalloonInflationLevel() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-header">
                🎈 Balloon Inflation Challenge
            </div>
            <div class="level-content" style="padding: 10px 20px; max-width: 1000px; margin: 0 auto;">
                <!-- Instructions -->
                <div style="background: rgba(102,126,234,0.1); border-radius: 10px; padding: 15px; margin-bottom: 0px; border: 2px solid rgba(102,126,234,0.3); text-align: center;">
                    <p style="font-size: 1rem; color: #555; margin: 0;">
                        <strong>Goal:</strong> Find the right amount of air for different sized balloons!<br>
                        <span style="font-size: 0.9rem; color: #666;">Amount of air = <strong style="color: #667eea;">w × (balloon size)</strong></span><br>
                        This challenge should be pretty easy, there's only one variable to tune that will solve the formula for how much air to give each size balloon.
                    </p>
                </div><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: -30px;">
                    <!-- Left side: Balloon Display -->
                    <div style="background: rgba(255,255,255,0.9); border-radius: 15px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h3 style="margin: 0 0 15px 0; color: #333; text-align: center;">Current Balloon</h3>
                        
                        <!-- Balloon visualization -->
                        <div style="text-align: center; padding: 20px; background: linear-gradient(to bottom, #e3f2fd, #bbdefb); border-radius: 10px; margin-bottom: 15px; position: relative; height: 200px;">
                            <div id="balloon-container" style="position: relative; height: 100%; display: flex; align-items: center; justify-content: center;">
                                <div id="balloon-emoji" style="font-size: 80px; transition: all 0.5s ease;">🎈</div>
                                <div id="pop-effect" style="position: absolute; font-size: 100px; opacity: 0; transition: opacity 0.3s;">💥</div>
                            </div>
                            <div style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); font-size: 1.1rem; color: #333;">
                                Size: <span id="balloon-size" style="font-weight: bold; color: #667eea; font-size: 1.3rem;">1</span>
                            </div>
                        </div>
                        
                        <!-- Result display -->
                        <div id="result-display" style="display: none; padding: 15px; border-radius: 8px; margin-top: 15px; text-align: center;">
                            <div id="result-message" style="font-size: 1rem; font-weight: bold; margin-bottom: 10px;"></div>
                            <div style="font-size: 0.9rem; color: #666;">
                                You gave: <span id="given-air" style="font-weight: bold;">0</span> units of air<br>
                                Perfect amount: <span id="needed-air" style="font-weight: bold;">0</span> units of air<br>
                                Difference: <span id="difference-value" style="font-weight: bold; color: #ff6347;">0</span>
                            </div>
                        </div>
                        
                        <!-- Balloon selector -->
                        <div style="margin-top: 20px; padding: 15px; background: rgba(102,126,234,0.05); border-radius: 8px;">
                            <div style="font-size: 0.9rem; color: #666; margin-bottom: 10px;">Test different balloon sizes:</div>
                            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                                <button class="balloon-btn" data-size="1" style="padding: 8px 12px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">Size 1 🎈</button>
                                <button class="balloon-btn" data-size="2" style="padding: 8px 12px; background: white; color: #333; border: 2px solid #ddd; border-radius: 5px; cursor: pointer;">Size 2 🎈</button>
                                <button class="balloon-btn" data-size="3" style="padding: 8px 12px; background: white; color: #333; border: 2px solid #ddd; border-radius: 5px; cursor: pointer;">Size 3 🎈</button>
                                <button class="balloon-btn" data-size="4" style="padding: 8px 12px; background: white; color: #333; border: 2px solid #ddd; border-radius: 5px; cursor: pointer;">Size 4 🎈</button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right side: Controls -->
                    <div style="background: rgba(255,255,255,0.9); border-radius: 15px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h3 style="margin: 0 0 15px 0; color: #333; text-align: center;">Your Formula</h3>
                        
                        <!-- Formula display -->
                        <div style="background: white; border: 2px solid #667eea; border-radius: 8px; padding: 15px; margin-bottom: 20px; text-align: center; font-family: 'Courier New', monospace;">
                            <div style="font-size: 1.2rem; color: #333;">
                                air = <span style="color: #667eea; font-weight: bold;" id="w-display">1</span> × size
                            </div>
                            <div style="font-size: 0.9rem; color: #666; margin-top: 8px;">
                                For this balloon: <span id="formula-result" style="font-weight: bold;">1</span> units of air
                            </div>
                        </div>
                        
                        <!-- W control -->
                        <div style="margin-bottom: 25px;">
                            <label style="display: block; margin-bottom: 8px; color: #333; font-weight: bold;">
                                w (air multiplier): <span id="w-value" style="color: #667eea;">1</span>
                            </label>
                            <input type="range" id="w-slider" min="0" max="15" value="1" step="0.5" style="width: 100%; height: 8px; border-radius: 4px; background: #ddd; outline: none;">
                            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #999; margin-top: 5px;">
                                <span>0</span>
                                <span>7.5</span>
                                <span>15</span>
                            </div>
                        </div>
                        
                        <!-- Inflate button -->
                        <button id="inflate-btn" style="width: 100%; padding: 12px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 8px; font-size: 1.1rem; font-weight: bold; cursor: pointer; transition: all 0.3s;">
                            💨 Inflate Balloon
                        </button>
                        
                    
                        
                        <!-- Success tracking -->
                        <div id="success-tracker" style="margin-top: 20px; padding: 15px; background: rgba(45,213,115,0.1); border-radius: 8px; border: 1px solid rgba(45,213,115,0.3); display: none;">
                            <div style="text-align: center; color: #2dd573; font-weight: bold;">
                                🎉 Perfect Formula Found! 🎉<br>
                                <span style="font-size: 0.9rem; color: #333;">f(x) = 7x</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('balloon-level', 'createBalloonInflationLevel');
    
    // Initialize level in state management system
    if (typeof LevelProgressStore !== 'undefined' && typeof GameStateStore !== 'undefined') {
        // Wait for state system to be ready
        const initializeLevel = () => {
            try {
                LevelProgressStore.startLevel('balloon-inflation');
                GameStateStore.setCurrentLevel('balloon-inflation');
                
                // Setup balloon level logic with state management
                setupBalloonLevel();
            } catch (error) {
                console.warn('State management not yet ready, falling back to basic setup');
                setupBalloonLevel();
            }
        };
        
        // Check if state system is already initialized
        if (window.StateManager && window.StateManager.initialized) {
            initializeLevel();
        } else {
            // Wait for state ready event
            window.addEventListener('mlteach:state:ready', initializeLevel, { once: true });
            // Fallback timeout in case event doesn't fire
            setTimeout(initializeLevel, 1000);
        }
    } else {
        // Fallback to basic setup
        setupBalloonLevel();
    }
}

/**
 * Sets up the interactive behavior for the balloon inflation level
 * 
 * Configures all event handlers, state management, parameter controls,
 * and scoring logic for the balloon inflation challenge.
 * 
 * @function setupBalloonLevel
 * @returns {void} Initializes all level functionality
 * 
 * @description
 * This function handles:
 * - Parameter restoration from previous sessions
 * - W slider input handling with real-time formula updates
 * - Balloon size selection and visual updates
 * - Inflation attempts with accuracy calculation
 * - Success tracking and level completion
 * - State persistence and progress tracking
 * - Visual feedback animations (pop, shake, scale)
 * 
 * Success Criteria:
 * - Exact match: w = 7 (100% accuracy)
 * - Acceptable: 95-105% accuracy for current balloon
 * - Perfect formula discovery completes the level
 * 
 * Scoring Algorithm:
 * - Base score: 70 points for completion
 * - Attempt bonus: Up to 20 points (fewer attempts = higher bonus)
 * - Speed bonus: Up to 10 points (faster completion = higher bonus)
 * - Maximum score: 100 points
 */
function setupBalloonLevel() {
    // Level configuration constants
    /** @type {number} The correct w parameter for the target function f(x) = 7x */
    const TRUE_W = 7;
    
    /** @type {string} Unique identifier for this level used in state management */
    const LEVEL_ID = 'balloon-inflation';
    
    // Level state variables
    /** @type {number} Currently selected balloon size (1-4) */
    let currentBalloonSize = 1;
    
    /** @type {number} Count of balloons inflated with perfect accuracy */
    let perfectBalloons = 0;
    
    /** @type {number} Timestamp when the level session started (for scoring) */
    let sessionStartTime = Date.now();
    
    /** @type {number} Total number of inflation attempts made this session */
    let attempts = 0;
    
    // DOM element references using utility function
    /** @type {HTMLInputElement} Range slider for adjusting w parameter (0-15) */
    const wSlider = getElementById('w-slider');
    
    /** @type {HTMLButtonElement} Button to trigger balloon inflation attempt */
    const inflateBtn = getElementById('inflate-btn');
    
    /** @type {NodeListOf<HTMLButtonElement>} Buttons for selecting balloon size (1-4) */
    const balloonButtons = document.querySelectorAll('.balloon-btn');
    
    // Simple scoring function
    const calculateScore = ({ attempts, timeSpent, success, accuracy }) => {
        if (!success) return 0;
        
        const timeInSeconds = timeSpent / 1000;
        let score = 70; // base score
        
        // Attempt bonus (decreasing with more attempts)
        const attemptPenalty = Math.min(attempts - 1, 9) / 9;
        score += 20 * (1 - attemptPenalty);
        
        // Speed bonus based on thresholds
        let speedMultiplier = 0;
        if (timeInSeconds < 30) speedMultiplier = 1;
        else if (timeInSeconds < 60) speedMultiplier = 0.5;
        else if (timeInSeconds < 120) speedMultiplier = 0.2;
        
        score += 10 * speedMultiplier;
        score *= (accuracy / 100);
        
        return Math.min(100, Math.max(0, Math.round(score)));
    };
    
    // State management initialization
    /** @type {Object.<string, any>} Previously saved parameters from GameStateStore */
    let savedParameters = {};
    
    /** @type {boolean} Whether state management services are available and functional */
    let hasStateManagement = false;
    
    if (typeof GameStateStore !== 'undefined') {
        try {
            savedParameters = GameStateStore.getParameters(LEVEL_ID);
            hasStateManagement = true;
            
            // Restore saved w value if available
            if (savedParameters.w !== undefined) {
                wSlider.value = savedParameters.w;
                console.log(`Restored previous w value: ${savedParameters.w}`);
            }
            
            // Restore balloon size if available
            if (savedParameters.balloonSize !== undefined) {
                currentBalloonSize = savedParameters.balloonSize;
                
                // Update UI to reflect saved balloon size
                balloonButtons.forEach(btn => {
                    if (parseInt(btn.dataset.size) === currentBalloonSize) {
                        btn.style.background = '#667eea';
                        btn.style.color = 'white';
                        btn.style.border = 'none';
                    } else {
                        btn.style.background = 'white';
                        btn.style.color = '#333';
                        btn.style.border = '2px solid #ddd';
                    }
                });
                
                document.getElementById('balloon-size').textContent = currentBalloonSize;
                
                // Update balloon visual size
                const balloonEmoji = document.getElementById('balloon-emoji');
                const baseSize = 60;
                balloonEmoji.style.fontSize = `${baseSize + (currentBalloonSize * 10)}px`;
                
                console.log(`Restored previous balloon size: ${currentBalloonSize}`);
            }
            
            // Check if user has progress from previous session
            const levelProgress = LevelProgressStore.getLevelProgress(LEVEL_ID);
            if (levelProgress && levelProgress.attempts > 0) {
                attempts = levelProgress.attempts;
                console.log(`Restored previous attempts: ${attempts}`);
            }
        } catch (error) {
            console.warn('Could not load saved parameters:', error);
        }
    }
    
    /**
     * Updates the formula display and saves parameters to state management
     * 
     * Uses utility functions for DOM manipulation and number formatting.
     * Reads the current w value from the slider, updates all formula displays,
     * calculates the result for the current balloon size, and persists the
     * parameters to state management if available.
     * 
     * @function updateFormula
     * @returns {void} Updates UI and saves state
     */
    function updateFormula() {
        const w = clamp(parseFloat(wSlider.value), 0, 15);
        
        // Update displays using utility functions
        const wDisplay = getElementById('w-display');
        const wValue = getElementById('w-value');
        const formulaResult = getElementById('formula-result');
        
        if (wDisplay) wDisplay.textContent = formatNumber(w, 1);
        if (wValue) wValue.textContent = formatNumber(w, 1);
        
        const result = w * currentBalloonSize;
        if (formulaResult) formulaResult.textContent = formatNumber(result, 1);
        
        // Save parameter updates to state management
        if (hasStateManagement) {
            try {
                GameStateStore.updateParameters(LEVEL_ID, { w: w });
                GameStateStore.updateActivity('parameter_adjustment', { parameter: 'w', value: w });
                
                // Update partial progress
                LevelProgressStore.updateProgress(LEVEL_ID, {
                    solutions: { w: w },
                    currentBalloonSize: currentBalloonSize,
                    attempts: attempts
                });
            } catch (error) {
                console.warn('Could not save parameter update:', error);
            }
        }
    }
    
    /**
     * Handles balloon inflation attempt and provides visual/textual feedback
     * 
     * Calculates the accuracy of the current parameter settings, provides
     * appropriate feedback through animations and messages, tracks the attempt
     * in state management, and handles level completion if criteria are met.
     * 
     * @function inflateBalloon
     * @returns {void} Processes attempt and updates UI
     * 
     * @description
     * Process flow:
     * 1. Calculate user's answer: w × currentBalloonSize
     * 2. Compare with correct answer: 7 × currentBalloonSize  
     * 3. Determine accuracy percentage
     * 4. Provide visual feedback based on result:
     *    - Perfect (95-105%): Green success message, balloon grows
     *    - Too little (<95%): Yellow warning, balloon deflates
     *    - Too much (>105%): Red error, balloon pops with animation
     * 5. Track attempt in state management
     * 6. Check for level completion (w = 7 exactly)
     * 7. Calculate and save final score if completed
     * 
     * Visual Effects:
     * - Scale animations for balloon size changes
     * - Pop animation with 💥 emoji overlay
     * - Shake animation for result display
     * - Opacity changes for deflation effect
     */
    /**
     * Handles balloon inflation attempt using utility functions for validation and formatting
     * 
     * Uses LevelUtils.validateParameters for accuracy checking and formatNumber for display.
     * Provides visual feedback through animations and styled messages.
     * 
     * @function inflateBalloon
     * @returns {void} Processes attempt and updates UI
     */
    function inflateBalloon() {
        const w = clamp(parseFloat(wSlider.value), 0, 15);
        attempts++;
        
        const yourAnswer = w * currentBalloonSize;
        const correctAnswer = TRUE_W * currentBalloonSize;
        
        // Calculate accuracy
        const accuracy = calculateAccuracy(yourAnswer, correctAnswer);
        const isCorrect = accuracy >= 95;
        const isPerfect = w === TRUE_W;
        
        // Track attempt in state management
        if (hasStateManagement) {
            try {
                GameStateStore.updateActivity('attempt', { 
                    balloonSize: currentBalloonSize,
                    userAnswer: yourAnswer,
                    correctAnswer: correctAnswer,
                    accuracy: accuracy
                });
            } catch (error) {
                console.warn('Could not track attempt:', error);
            }
        }
        
        // Update result display using utility functions
        const resultDisplay = getElementById('result-display');
        const resultMessage = getElementById('result-message');
        const balloonEmoji = getElementById('balloon-emoji');
        const popEffect = getElementById('pop-effect');
        
        if (!resultDisplay || !resultMessage || !balloonEmoji) {
            console.warn('Could not find required elements for result display');
            return;
        }
        
        resultDisplay.style.display = 'block';
        
        // Update numerical displays with formatting
        const givenAir = getElementById('given-air');
        const neededAir = getElementById('needed-air');
        const differenceValue = getElementById('difference-value');
        
        if (givenAir) givenAir.textContent = formatNumber(yourAnswer, 1);
        if (neededAir) neededAir.textContent = formatNumber(correctAnswer, 1);
        if (differenceValue) differenceValue.textContent = formatNumber(Math.abs(yourAnswer - correctAnswer), 1);
        
        // Reset animations
        if (popEffect) popEffect.style.opacity = '0';
        balloonEmoji.style.transform = 'scale(1)';
        balloonEmoji.style.opacity = '1';
        
        if (isCorrect) {
            // Success styling
            resultDisplay.style.background = 'rgba(45,213,115,0.1)';
            resultDisplay.style.border = '2px solid rgba(45,213,115,0.3)';
            resultMessage.style.color = '#2dd573';
            resultMessage.textContent = `🎉 Perfect! Accuracy: ${formatNumber(accuracy, 0)}%`;
            balloonEmoji.style.transform = 'scale(1.2)';
            balloonEmoji.textContent = '🎈';
            
            perfectBalloons++;
            
            // Check if formula is perfect
            if (isPerfect) {
                const successTracker = getElementById('success-tracker');
                if (successTracker) successTracker.style.display = 'block';
                
                // Complete the level using utility scorer
                if (hasStateManagement) {
                    try {
                        const timeSpent = Date.now() - sessionStartTime;
                        const score = calculateScore({
                            attempts: attempts,
                            timeSpent: timeSpent,
                            success: true,
                            accuracy: accuracy
                        });
                        
                        LevelProgressStore.completeLevel(LEVEL_ID, {
                            score: score,
                            solutions: { w: w },
                            timeSpent: timeSpent
                        });
                        
                        // Add success notification
                        GameStateStore.addNotification({
                            type: 'success',
                            message: `Perfect! You found w = ${TRUE_W}! Level completed with score: ${score}`,
                            duration: 5000
                        });
                        
                        console.log(`Level completed! Score: ${score}, Time: ${formatNumber(timeSpent/1000, 1)}s`);
                    } catch (error) {
                        console.warn('Could not save level completion:', error);
                    }
                }
            }
        } else if (accuracy < 80) {
            // Significantly off - pop animation
            resultDisplay.style.background = 'rgba(255,99,71,0.1)';
            resultDisplay.style.border = '2px solid rgba(255,99,71,0.3)';
            resultMessage.style.color = '#ff6347';
            resultMessage.textContent = `💥 POP! Too much air! Accuracy: ${formatNumber(accuracy, 0)}%`;
            
            // Pop animation
            balloonEmoji.style.opacity = '0';
            if (popEffect) popEffect.style.opacity = '1';
            setTimeout(() => {
                if (popEffect) popEffect.style.opacity = '0';
                balloonEmoji.style.opacity = '1';
                balloonEmoji.textContent = '💔';
                balloonEmoji.style.transform = 'scale(0.5)';
            }, 300);
        } else {
            // Close but not perfect
            resultDisplay.style.background = 'rgba(255,215,0,0.1)';
            resultDisplay.style.border = '2px solid rgba(255,215,0,0.3)';
            resultMessage.style.color = '#f3960a';
            resultMessage.textContent = `😔 Close! Accuracy: ${formatNumber(accuracy, 0)}% - Keep trying!`;
            balloonEmoji.style.transform = 'scale(0.8)';
            balloonEmoji.style.opacity = '0.7';
            balloonEmoji.textContent = '🎈';
        }
        
        // Apply shake animation
        shake(resultDisplay, 300);
    }
    
    // Balloon selector
    balloonButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            balloonButtons.forEach(b => {
                b.style.background = 'white';
                b.style.color = '#333';
                b.style.border = '2px solid #ddd';
            });
            btn.style.background = '#667eea';
            btn.style.color = 'white';
            btn.style.border = 'none';
            
            // Update current balloon
            currentBalloonSize = parseInt(btn.dataset.size);
            document.getElementById('balloon-size').textContent = currentBalloonSize;
            
            // Reset balloon display
            const balloonEmoji = document.getElementById('balloon-emoji');
            balloonEmoji.textContent = '🎈';
            balloonEmoji.style.transform = 'scale(1)';
            balloonEmoji.style.opacity = '1';
            
            // Update balloon size visually
            const baseSize = 60;
            const scaledSize = baseSize + (currentBalloonSize * 10);
            balloonEmoji.style.fontSize = `${clamp(scaledSize, 40, 120)}px`;
            
            // Hide previous result
            document.getElementById('result-display').style.display = 'none';
            
            // Save balloon size selection to state management
            if (hasStateManagement) {
                try {
                    GameStateStore.updateParameters(LEVEL_ID, { 
                        balloonSize: currentBalloonSize 
                    });
                    GameStateStore.updateActivity('balloon_selection', { 
                        size: currentBalloonSize 
                    });
                } catch (error) {
                    console.warn('Could not save balloon selection:', error);
                }
            }
            
            // Update formula display
            updateFormula();
        });
    });
    
    // Slider listener
    wSlider.addEventListener('input', updateFormula);
    
    // Inflate button
    inflateBtn.addEventListener('click', () => {
        // Track click in state management
        if (hasStateManagement) {
            try {
                GameStateStore.updateActivity('click', { element: 'inflate-button' });
            } catch (error) {
                console.warn('Could not track click:', error);
            }
        }
        
        inflateBalloon();
    });
    
    // Add hover effect to inflate button
    inflateBtn.addEventListener('mouseenter', () => {
        inflateBtn.style.transform = 'translateY(-2px)';
        inflateBtn.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    });
    inflateBtn.addEventListener('mouseleave', () => {
        inflateBtn.style.transform = 'translateY(0)';
        inflateBtn.style.boxShadow = 'none';
    });
    
    // Add shake animation CSS if not already present
    if (!document.getElementById('shake-style')) {
        const style = document.createElement('style');
        style.id = 'shake-style';
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Initialize
    updateFormula();
}

// Export the functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createBalloonInflationLevel, setupBalloonLevel };
} else {
    window.createBalloonInflationLevel = createBalloonInflationLevel;
    window.setupBalloonLevel = setupBalloonLevel;
}