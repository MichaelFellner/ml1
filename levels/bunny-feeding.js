/**
 * Bunny Feeding Challenge Level
 * 
 * Interactive level where users manually adjust both w and b parameters
 * Updated to use state management system for persistence and progress tracking
 * 
 * @fileoverview Bunny feeding level implementation with dual parameter adjustment
 * @author MLTEACH Team
 * @version 2.0.0
 * @since 1.0.0
 * 
 * @requires GameStateStore - For parameter persistence and activity tracking
 * @requires LevelProgressStore - For level completion and progress tracking
 * @requires createStandardNavigation - For navigation UI
 * @requires initializeNavigation - For navigation setup
 * @requires utils/index.js - For utility functions (DOM, math, formatting, validation)
 * 
 * Level Configuration:
 * - Type: Interactive dual parameter adjustment
 * - Target function: f(x) = 5x + 10 (where x is bunny weight)
 * - Parameters: w (multiplier), b (base amount)
 * - W range: 0 to 10, step 0.5
 * - B range: 0 to 20, step 1
 * - Bunny weights: 2, 4, 6, 8 kg
 * - Success criteria: w = 5 AND b = 10 (exact match) or high accuracy
 * 
 * @changelog v2.0.0 - Refactored to use utility functions from utils/ folder
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
    // Only remove trailing zeros after a decimal point, not from integers
    const formatted = num.toFixed(decimals);
    // If decimals > 0, remove unnecessary trailing zeros after decimal
    if (decimals > 0) {
        return formatted.replace(/\.?0+$/, '');
    }
    return formatted;
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

/**
 * Creates and initializes the bunny feeding level
 * 
 * Sets up the complete UI, initializes state management integration,
 * and configures the interactive bunny feeding challenge.
 * 
 * @function createBunnyFeedingLevel
 * @returns {void} Renders level content to DOM and initializes functionality
 * 
 * @example
 * // Create the bunny feeding level
 * createBunnyFeedingLevel();
 * 
 * @description
 * This function:
 * 1. Renders the complete level UI to the #app container
 * 2. Initializes standard navigation
 * 3. Calls setupBunnyLevel() to configure interactive behavior
 * 
 * The level includes:
 * - Bunny visualization with weight-based display
 * - Dual parameter sliders for w and b adjustment
 * - Formula display showing f(x) = wx + b
 * - Multiple bunny weights to test (2, 4, 6, 8 kg)
 * - Result feedback with visual animations
 */
function createBunnyFeedingLevel() {
    const container = getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-header">
                Manually Adjusting 2 Variables: Bunny Feeding Challenge
            </div>
            <div class="level-content" style="padding: 10px 20px; max-width: 1000px; margin: 0 auto;">
                <!-- Instructions -->
                <div style="background: rgba(255,215,0,0.1); border-radius: 10px; padding: 15px; margin-bottom: 0px; border: 2px solid rgba(255,215,0,0.3); text-align: center;">
                    <p style="font-size: 1rem; color: #555; margin: 0;">
                        <strong>Goal:</strong> Find the right formula to feed bunnies based on their weight!<br>
                        <span style="font-size: 0.9rem; color: #666;">The amount of hay needed = <strong style="color: #667eea;">w × (bunny weight) + b</strong></span><br>
                        There are four bunnies below, each needs a different amount of food. Try to find the optimal <strong>w</strong> and <strong>b</strong> values yourself. It will
                        be much trickier this time! If you get stuck don't worry. The next level will use gradient descent to feed them.
                    </p>
                </div><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: -30px;">
                 <!-- Left side: Controls -->
                    <div style="background: rgba(255,255,255,0.9); border-radius: 15px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h3 style="margin: 0 0 15px 0; color: #333; text-align: center;">Your Formula</h3>
                        
                        <!-- Formula display -->
                        <div style="background: white; border: 2px solid #667eea; border-radius: 8px; padding: 15px; margin-bottom: 20px; text-align: center; font-family: 'Courier New', monospace;">
                            <div style="font-size: 1.2rem; color: #333;">
                                hay = <span style="color: #667eea; font-weight: bold;" id="w-display">1</span> × weight + <span style="color: #764ba2; font-weight: bold;" id="b-display">0</span>
                            </div>
                            <div style="font-size: 0.9rem; color: #666; margin-top: 8px;">
                                For this bunny: <span id="formula-result" style="font-weight: bold;">2</span> units of hay
                            </div>
                        </div>
                        
                        <!-- W control -->
                        <div style="margin-bottom: 20px;">
                            <label style="display: block; margin-bottom: 8px; color: #333; font-weight: bold;">
                                w (multiplier): <span id="w-value" style="color: #667eea;">1</span>
                            </label>
                            <input type="range" id="w-slider" min="0" max="10" value="1" step="0.5" style="width: 100%; height: 8px; border-radius: 4px; background: #ddd; outline: none;">
                            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #999; margin-top: 5px;">
                                <span>0</span>
                                <span>5</span>
                                <span>10</span>
                            </div>
                        </div>
                        
                        <!-- B control -->
                        <div style="margin-bottom: 25px;">
                            <label style="display: block; margin-bottom: 8px; color: #333; font-weight: bold;">
                                b (base amount): <span id="b-value" style="color: #764ba2;">0</span>
                            </label>
                            <input type="range" id="b-slider" min="0" max="20" value="0" step="1" style="width: 100%; height: 8px; border-radius: 4px; background: #ddd; outline: none;">
                            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #999; margin-top: 5px;">
                                <span>0</span>
                                <span>10</span>
                                <span>20</span>
                            </div>
                        </div>
                        
                        <!-- Feed button -->
                        <button id="feed-btn" style="width: 100%; padding: 12px; background: linear-gradient(135deg, #2dd573, #1cb85c); color: white; border: none; border-radius: 8px; font-size: 1.1rem; font-weight: bold; cursor: pointer; transition: all 0.3s;">
                            🥕 Feed Bunny
                        </button>
                        
                        <!-- Reset button -->
                        <button id="reset-btn" style="width: 100%; padding: 12px; background: linear-gradient(135deg, #ff9a56, #ff6347); color: white; border: none; border-radius: 8px; font-size: 1.1rem; font-weight: bold; cursor: pointer; transition: all 0.3s; margin-top: 10px; display: none;">
                            🔄 Reset to Try Again
                        </button>
                        
                        <!-- Success tracking -->
                        <div id="success-tracker" style="margin-top: 20px; padding: 15px; background: rgba(45,213,115,0.1); border-radius: 8px; border: 1px solid rgba(45,213,115,0.3); display: none;">
                            <div style="text-align: center; color: #2dd573; font-weight: bold;">
                                🎉 Perfect Formula Found! 🎉<br>
                                <span style="font-size: 0.9rem; color: #333;">f(x) = 5x + 10</span>
                            </div>
                        </div>
                    </div>
                    <!--Right side: Bunny Display -->
                    <div style="background: rgba(255,255,255,0.9); border-radius: 15px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h3 style="margin: 0 0 15px 0; color: #333; text-align: center;">Current Bunny</h3>
                        
                        <!-- Bunny visualization -->
                        <div id="bunny-viz" style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 10px; margin-bottom: 15px; position: relative;">
                            <div id="bunny-emoji" style="font-size: 80px; margin-bottom: 10px;">🐰</div>
                            <div style="font-size: 1.1rem; color: #333;">
                                Weight: <span id="bunny-weight" style="font-weight: bold; color: #667eea; font-size: 1.3rem;">2</span> kg
                            </div>
                            <div id="bunny-status" style="font-size: 1.2rem; font-weight: bold; margin-top: 10px; height: 30px;"></div>
                        </div>
                        
                        <!-- Result display -->
                        <div id="result-display" style="display: none; padding: 15px; border-radius: 8px; margin-top: 15px; text-align: center;">
                            <div id="result-message" style="font-size: 1rem; font-weight: bold; margin-bottom: 10px;"></div>
                            <div style="font-size: 0.9rem; color: #666;">
                                You gave: <span id="given-hay" style="font-weight: bold;">0</span> units of hay<br>
                                Needed: <span id="needed-hay" style="font-weight: bold;">0</span> units of hay<br>
                                This bunny's loss: <span id="loss-value" style="font-weight: bold; color: #ff6347;">0</span><br>
                                <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #ddd;">
                                    Total loss for all 4 bunnies: <span id="total-loss" style="font-weight: bold; color: #ff6347; font-size: 1.1rem;">0</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Bunny selector -->
                        <div style="margin-top: 20px; padding: 15px; background: rgba(102,126,234,0.05); border-radius: 8px;">
                            <div style="font-size: 0.9rem; color: #666; margin-bottom: 10px;">Test different bunnies:</div>
                            <div style="display: flex; gap: 10px; justify-content: center;">
                                <button class="bunny-btn" data-weight="2" style="padding: 8px 12px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">2kg 🐰</button>
                                <button class="bunny-btn" data-weight="4" style="padding: 8px 12px; background: white; color: #333; border: 2px solid #ddd; border-radius: 5px; cursor: pointer;">4kg 🐰</button>
                                <button class="bunny-btn" data-weight="6" style="padding: 8px 12px; background: white; color: #333; border: 2px solid #ddd; border-radius: 5px; cursor: pointer;">6kg 🐰</button>
                                <button class="bunny-btn" data-weight="8" style="padding: 8px 12px; background: white; color: #333; border: 2px solid #ddd; border-radius: 5px; cursor: pointer;">8kg 🐰</button>
                            </div>
                        </div>
                    </div>
                    
                   
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('bunny-level', 'createBunnyFeedingLevel');
    
    // Setup bunny level logic
    setupBunnyLevel();
}

/**
 * Sets up the interactive behavior for the bunny feeding level
 * 
 * Configures all event handlers, parameter controls, and scoring logic
 * for the dual-parameter bunny feeding challenge.
 * 
 * @function setupBunnyLevel
 * @returns {void} Initializes all level functionality
 * 
 * @description
 * This function handles:
 * - Dual parameter (w and b) slider input with real-time formula updates
 * - Bunny weight selection and visual updates
 * - Feeding attempts with accuracy calculation
 * - Success tracking and level completion
 * - Visual feedback animations (shake, color changes)
 * 
 * Success Criteria:
 * - Exact match: w = 5 AND b = 10 (100% accuracy)
 * - Acceptable: High accuracy for current bunny weight
 * - Perfect formula discovery completes the level
 * 
 * Target Function: f(x) = 5x + 10
 * - For 2kg bunny: 5×2 + 10 = 20 units of hay
 * - For 4kg bunny: 5×4 + 10 = 30 units of hay  
 * - For 6kg bunny: 5×6 + 10 = 40 units of hay
 * - For 8kg bunny: 5×8 + 10 = 50 units of hay
 */
function setupBunnyLevel() {
    // Level configuration constants
    /** @type {number} The correct w parameter for the target function f(x) = 5x + 10 */
    const TRUE_W = 5;
    
    /** @type {number} The correct b parameter for the target function f(x) = 5x + 10 */
    const TRUE_B = 10;
    
    // Level state variables
    /** @type {number} Currently selected bunny weight (2, 4, 6, 8 kg) */
    let currentBunnyWeight = 2;
    
    /** @type {Set<number>} Set of bunny weights that have been fed correctly */
    let correctBunnies = new Set();
    
    /** @type {Object} Stores the state of each bunny after feeding */
    let bunnyStates = {
        2: { fed: false, emoji: '🐰', loss: 0, status: '', yourAnswer: 0, correctAnswer: 0, accuracy: 0 },
        4: { fed: false, emoji: '🐰', loss: 0, status: '', yourAnswer: 0, correctAnswer: 0, accuracy: 0 },
        6: { fed: false, emoji: '🐰', loss: 0, status: '', yourAnswer: 0, correctAnswer: 0, accuracy: 0 },
        8: { fed: false, emoji: '🐰', loss: 0, status: '', yourAnswer: 0, correctAnswer: 0, accuracy: 0 }
    };
    
    /** @type {boolean} Whether feeding has been attempted with current parameters */
    let hasFedWithCurrentParams = false;
    
    // DOM element references using utility function
    /** @type {HTMLInputElement} Range slider for adjusting w parameter (0-10) */
    const wSlider = getElementById('w-slider');
    
    /** @type {HTMLInputElement} Range slider for adjusting b parameter (0-20) */
    const bSlider = getElementById('b-slider');
    
    /** @type {HTMLButtonElement} Button to trigger bunny feeding attempt */
    const feedBtn = getElementById('feed-btn');
    
    /** @type {HTMLButtonElement} Button to reset feeding state */
    const resetBtn = getElementById('reset-btn');
    
    /** @type {NodeListOf<HTMLButtonElement>} Buttons for selecting bunny weight */
    const bunnyButtons = document.querySelectorAll('.bunny-btn');
    
    /**
     * Calculates total loss across all bunnies
     */
    function calculateTotalLoss() {
        const w = clamp(parseFloat(wSlider.value), 0, 10);
        const b = clamp(parseFloat(bSlider.value), 0, 20);
        let totalLoss = 0;
        
        [2, 4, 6, 8].forEach(weight => {
            const yourAnswer = w * weight + b;
            const correctAnswer = TRUE_W * weight + TRUE_B;
            totalLoss += Math.abs(yourAnswer - correctAnswer);
        });
        
        return totalLoss;
    }
    
    /**
     * Updates the bunny button emojis based on their states
     */
    function updateBunnyButtons() {
        bunnyButtons.forEach(btn => {
            const weight = parseInt(btn.dataset.weight);
            const state = bunnyStates[weight];
            const emoji = state.fed ? state.emoji : '🐰';
            btn.innerHTML = `${weight}kg ${emoji}`;
        });
    }
    
    /**
     * Updates the formula display and parameter values using utility functions
     * 
     * Uses utility functions for DOM manipulation and number formatting.
     * Reads current w and b values from sliders, updates all displays,
     * and calculates the result for the current bunny weight.
     * 
     * @function updateFormula
     * @returns {void} Updates UI displays with current formula
     */
    function updateFormula() {
        const w = clamp(parseFloat(wSlider.value), 0, 10);
        const b = clamp(parseFloat(bSlider.value), 0, 20);
        
        // Update displays using utility functions
        const wDisplay = getElementById('w-display');
        const wValue = getElementById('w-value');
        const bDisplay = getElementById('b-display');
        const bValue = getElementById('b-value');
        const formulaResult = getElementById('formula-result');
        
        if (wDisplay) wDisplay.textContent = formatNumber(w, 1);
        if (wValue) wValue.textContent = formatNumber(w, 1);
        if (bDisplay) bDisplay.textContent = formatNumber(b, 0);
        if (bValue) bValue.textContent = formatNumber(b, 0);
        
        const result = w * currentBunnyWeight + b;
        if (formulaResult) formulaResult.textContent = formatNumber(result, 1);
        
        // Update current bunny display if it has been fed with current params
        if (hasFedWithCurrentParams && bunnyStates[currentBunnyWeight].fed) {
            displayBunnyState(currentBunnyWeight);
        }
    }
    
    /**
     * Displays the state of a specific bunny
     */
    function displayBunnyState(weight) {
        const state = bunnyStates[weight];
        const bunnyEmoji = getElementById('bunny-emoji');
        const bunnyStatus = getElementById('bunny-status');
        const bunnyViz = getElementById('bunny-viz');
        const resultDisplay = getElementById('result-display');
        const resultMessage = getElementById('result-message');
        
        if (state.fed) {
            bunnyEmoji.textContent = state.emoji;
            bunnyStatus.textContent = state.status;
            
            // Update background color and message based on state
            if (state.emoji === '😊') {
                bunnyStatus.style.color = '#2dd573';
                bunnyViz.style.background = 'linear-gradient(135deg, rgba(45,213,115,0.1), rgba(45,213,115,0.2))';
                if (resultDisplay) {
                    resultDisplay.style.background = 'rgba(45,213,115,0.1)';
                    resultDisplay.style.border = '2px solid rgba(45,213,115,0.3)';
                }
                if (resultMessage) {
                    resultMessage.style.color = '#2dd573';
                    resultMessage.textContent = `🎉 Perfect! Accuracy: ${formatNumber(state.accuracy, 0)}%`;
                }
            } else if (state.emoji === '😢') {
                bunnyStatus.style.color = '#f3960a';
                bunnyViz.style.background = 'linear-gradient(135deg, rgba(255,215,0,0.1), rgba(255,215,0,0.2))';
                if (resultDisplay) {
                    resultDisplay.style.background = 'rgba(255,215,0,0.1)';
                    resultDisplay.style.border = '2px solid rgba(255,215,0,0.3)';
                }
                if (resultMessage) {
                    resultMessage.style.color = '#f3960a';
                    resultMessage.textContent = `⚠️ Not enough food! Accuracy: ${formatNumber(state.accuracy, 0)}%`;
                }
            } else if (state.emoji === '😴') {
                bunnyStatus.style.color = '#ff6347';
                bunnyViz.style.background = 'linear-gradient(135deg, rgba(255,99,71,0.1), rgba(255,99,71,0.2))';
                if (resultDisplay) {
                    resultDisplay.style.background = 'rgba(255,99,71,0.1)';
                    resultDisplay.style.border = '2px solid rgba(255,99,71,0.3)';
                }
                if (resultMessage) {
                    resultMessage.style.color = '#ff6347';
                    resultMessage.textContent = `⚠️ Too much food! Accuracy: ${formatNumber(state.accuracy, 0)}%`;
                }
            }
            
            // Show result display with this bunny's specific data
            if (resultDisplay) {
                resultDisplay.style.display = 'block';
                
                // Update this bunny's specific values
                const givenHay = getElementById('given-hay');
                const neededHay = getElementById('needed-hay');
                const lossValue = getElementById('loss-value');
                
                if (givenHay) givenHay.textContent = formatNumber(state.yourAnswer, 1);
                if (neededHay) neededHay.textContent = formatNumber(state.correctAnswer, 1);
                if (lossValue) lossValue.textContent = formatNumber(state.loss, 1);
                
                // Update total loss
                const totalLoss = getElementById('total-loss');
                if (totalLoss) totalLoss.textContent = formatNumber(calculateTotalLoss(), 1);
            }
        } else {
            bunnyEmoji.textContent = '🐰';
            bunnyStatus.textContent = '';
            bunnyViz.style.background = '#f8f9fa';
            if (resultDisplay) resultDisplay.style.display = 'none';
        }
    }
    
    /**
     * Handles bunny feeding attempt - feeds ALL bunnies with the current formula
     * 
     * Calculates the result for all four bunnies using the current w and b values,
     * updates each bunny's state, and displays the currently selected bunny's results.
     * 
     * @function feedBunny
     * @returns {void} Processes attempt and updates UI
     * 
     * @description
     * Process flow:
     * 1. Apply formula to ALL bunnies: w × weight + b for each
     * 2. Calculate each bunny's loss and accuracy
     * 3. Update all bunny states (happy, hungry, or overfed)
     * 4. Display the currently selected bunny's detailed results
     * 5. Update all bunny button emojis
     * 6. Check for perfect formula discovery (w = 5 AND b = 10)
     */
    function feedBunny() {
        const w = clamp(parseFloat(wSlider.value), 0, 10);
        const b = clamp(parseFloat(bSlider.value), 0, 20);
        
        hasFedWithCurrentParams = true;
        let allPerfect = true;
        
        // Feed ALL bunnies with the current formula
        [2, 4, 6, 8].forEach(weight => {
            const yourAnswer = w * weight + b;
            const correctAnswer = TRUE_W * weight + TRUE_B;
            const loss = Math.abs(yourAnswer - correctAnswer);
            const accuracy = calculateAccuracy(yourAnswer, correctAnswer);
            
            // Update this bunny's state
            bunnyStates[weight].fed = true;
            bunnyStates[weight].yourAnswer = yourAnswer;
            bunnyStates[weight].correctAnswer = correctAnswer;
            bunnyStates[weight].loss = loss;
            bunnyStates[weight].accuracy = accuracy;
            
            if (loss < 0.5) {
                // Perfect feeding!
                bunnyStates[weight].emoji = '😊';
                bunnyStates[weight].status = 'Happy & Full! 😊';
                correctBunnies.add(weight);
            } else if (yourAnswer < correctAnswer) {
                // Too little hay
                bunnyStates[weight].emoji = '😢';
                bunnyStates[weight].status = 'Still Hungry! 😢';
                allPerfect = false;
            } else {
                // Too much hay
                bunnyStates[weight].emoji = '😴';
                bunnyStates[weight].status = 'Food Coma! 😴';
                allPerfect = false;
            }
        });
        
        // Display the currently selected bunny's results
        displayBunnyState(currentBunnyWeight);
        
        // Update all bunny button emojis
        updateBunnyButtons();
        
        // Check if formula is perfect
        if (w === TRUE_W && b === TRUE_B && allPerfect) {
            const successTracker = getElementById('success-tracker');
            if (successTracker) successTracker.style.display = 'block';
        }
        
        // Disable feed button and show reset button
        feedBtn.disabled = true;
        feedBtn.style.opacity = '0.5';
        feedBtn.style.cursor = 'not-allowed';
        resetBtn.style.display = 'block';
        
        // Apply shake animation to result display
        const resultDisplay = getElementById('result-display');
        if (resultDisplay) {
            shake(resultDisplay, 300);
        }
    }
    
    /**
     * Reset feeding state for all bunnies
     */
    function resetFeeding() {
        // Reset all bunny states
        Object.keys(bunnyStates).forEach(weight => {
            bunnyStates[weight] = { fed: false, emoji: '🐰', loss: 0, status: '', yourAnswer: 0, correctAnswer: 0, accuracy: 0 };
        });
        
        hasFedWithCurrentParams = false;
        
        // Reset UI
        const bunnyEmoji = getElementById('bunny-emoji');
        const bunnyStatus = getElementById('bunny-status');
        const bunnyViz = getElementById('bunny-viz');
        const resultDisplay = getElementById('result-display');
        
        if (bunnyEmoji) bunnyEmoji.textContent = '🐰';
        if (bunnyStatus) bunnyStatus.textContent = '';
        if (bunnyViz) bunnyViz.style.background = '#f8f9fa';
        if (resultDisplay) resultDisplay.style.display = 'none';
        
        // Update bunny buttons
        updateBunnyButtons();
        
        // Enable feed button and hide reset button
        feedBtn.disabled = false;
        feedBtn.style.opacity = '1';
        feedBtn.style.cursor = 'pointer';
        resetBtn.style.display = 'none';
        
        // Update formula display
        updateFormula();
    }
    
    // Bunny selector
    bunnyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            bunnyButtons.forEach(b => {
                b.style.background = 'white';
                b.style.color = '#333';
                b.style.border = '2px solid #ddd';
            });
            btn.style.background = '#667eea';
            btn.style.color = 'white';
            btn.style.border = 'none';
            
            // Update current bunny using utility functions
            currentBunnyWeight = parseInt(btn.dataset.weight);
            const bunnyWeight = getElementById('bunny-weight');
            
            if (bunnyWeight) bunnyWeight.textContent = currentBunnyWeight;
            
            // Display this bunny's current state
            displayBunnyState(currentBunnyWeight);
            
            // Update formula display
            updateFormula();
        });
    });
    
    // Slider listeners
    wSlider.addEventListener('input', updateFormula);
    bSlider.addEventListener('input', updateFormula);
    
    // Feed button
    feedBtn.addEventListener('click', feedBunny);
    
    // Reset button
    resetBtn.addEventListener('click', resetFeeding);
    
    // Add hover effect to feed button
    feedBtn.addEventListener('mouseenter', () => {
        if (!feedBtn.disabled) {
            feedBtn.style.transform = 'translateY(-2px)';
            feedBtn.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        }
    });
    feedBtn.addEventListener('mouseleave', () => {
        feedBtn.style.transform = 'translateY(0)';
        feedBtn.style.boxShadow = 'none';
    });
    
    // Add hover effect to reset button
    resetBtn.addEventListener('mouseenter', () => {
        resetBtn.style.transform = 'translateY(-2px)';
        resetBtn.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    });
    resetBtn.addEventListener('mouseleave', () => {
        resetBtn.style.transform = 'translateY(0)';
        resetBtn.style.boxShadow = 'none';
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
    module.exports = { createBunnyFeedingLevel, setupBunnyLevel };
} else {
    window.createBunnyFeedingLevel = createBunnyFeedingLevel;
    window.setupBunnyLevel = setupBunnyLevel;
}