/**
 * @fileoverview Coffee Booth Gradient Descent - Watch the algorithm learn the perfect formula
 * Interactive demonstration showing gradient descent automatically finding the optimal weights
 */

/**
 * Creates the coffee gradient descent demonstration
 * @function createCoffeeGradientDescent
 * @description Shows how gradient descent can automatically optimize the coffee formula
 * @returns {void}
 */
function createCoffeeGradientDescent() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level" style="
            background: url('pictures/coffee_image.jpg'), linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f39c12 100%);
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            position: relative;
        ">
            <div class="level-content" style="padding: 20px; max-width: 1800px; margin: 0 auto; position: relative; z-index: 1;">
                <!-- Title with backdrop -->
                <div style="
                    background: rgba(0, 0, 0, 0.7);
                    border-radius: 15px;
                    padding: 15px 30px;
                    margin-bottom: -20px;
                    max-width: 900px;
                    isolation: isolate;
                ">
                    <h1 style="
                        text-align: center !important;
                        color: white !important;
                        margin: 0 0 10px 0 !important;
                        font-size: 2rem !important;
                        font-weight: bold !important;
                        mix-blend-mode: normal !important;
                        background: none !important;
                        background-clip: unset !important;
                        -webkit-background-clip: unset !important;
                        -webkit-text-fill-color: white !important;
                    ">4 Variable Gradient Descent</h1>
                    <p style="
                        text-align: center !important;
                        color: white !important;
                        margin: 0 !important;
                        font-size: 1rem !important;
                        mix-blend-mode: normal !important;
                        background: none !important;
                        background-clip: unset !important;
                        -webkit-background-clip: unset !important;
                        -webkit-text-fill-color: white !important;
                    ">
                        Tuning 4 variables by hand was almost impossible, now lets use gradient descent and really see the power of this algorithm!
                    </p>
                </div>
                    
                <!-- Coffee Booth with Formula and Controls -->
                <div style="
                    position: relative;
                    width: 98%;
                    max-width: none;
                    margin: 0 auto 30px;
                    background: linear-gradient(to bottom, rgba(139,69,19,0.98) 0%, rgba(101,67,33,0.98) 100%);
                    border-radius: 15px 15px 0 0;
                    padding: 15px 30px;
                    box-shadow: 0 5px 25px rgba(0,0,0,0.5);
                    backdrop-filter: blur(10px);
                ">
                    <!-- Booth Awning -->
                    <div style="
                        position: absolute;
                        top: -30px;
                        left: -20px;
                        right: -20px;
                        height: 40px;
                        background: repeating-linear-gradient(
                            45deg,
                            #ff6b6b,
                            #ff6b6b 20px,
                            #fff 20px,
                            #fff 40px
                        );
                        border-radius: 15px 15px 0 0;
                        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
                    "></div>
                        
                    <!-- Current Formula Display -->
                    <div style="
                        background: rgba(255, 255, 255, 0.98);
                        border-radius: 10px;
                        padding: 15px 20px;
                        margin-bottom: 15px;
                        text-align: center;
                        box-shadow: 0 3px 10px rgba(0,0,0,0.3);
                    ">
                        <div style="font-size: 1.2rem; font-weight: bold; color: #2c3e50; margin-bottom: 12px;">
                            Current Coffee Formula
                        </div>
                        <div style="
                            font-family: 'Courier New', monospace;
                            font-size: 1.15rem;
                            color: #2c3e50;
                            background: #f8f9fa;
                            padding: 12px 20px;
                            border-radius: 8px;
                            display: inline-block;
                            white-space: nowrap;
                        ">
                            Coffee = 
                            <span id="w1-display" style="color: #3498db; font-weight: bold; font-size: 1.2rem;">0.00</span>×Age + 
                            <span id="w2-display" style="color: #e74c3c; font-weight: bold; font-size: 1.2rem;">0.00</span>×Cups + 
                            <span id="w3-display" style="color: #f39c12; font-weight: bold; font-size: 1.2rem;">0.00</span>×Tired + 
                            <span id="bias-display" style="color: #2ecc71; font-weight: bold; font-size: 1.2rem;">0.00</span>ml
                        </div>
                        <div style="margin-top: 10px; font-size: 0.85rem; color: #7f8c8d;">
                            With 4 Variables Gradient Descent may need (spoilers for future parts) training data to find the exact function...
                        </div>
                    </div>
                    
                    <!-- Gradient Descent Controls -->
                    <div style="
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 15px;
                        margin-bottom: 15px;
                    ">
                        <!-- Control Buttons -->
                        <div style="
                            background: rgba(255, 255, 255, 0.98);
                            border-radius: 8px;
                            padding: 15px;
                            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                        ">
                            <div style="text-align: center; margin-bottom: 10px;">
                                <div style="color: #2c3e50; font-weight: bold; font-size: 0.9rem; margin-bottom: 8px;">Gradient Descent Controls</div>
                            </div>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                                <button id="gradient-btn" style="
                                    background: linear-gradient(135deg, #3498db, #2980b9);
                                    color: white;
                                    border: none;
                                    padding: 10px 15px;
                                    font-size: 0.95rem;
                                    font-weight: bold;
                                    border-radius: 8px;
                                    cursor: pointer;
                                    box-shadow: 0 3px 10px rgba(52, 152, 219, 0.3);
                                    transition: all 0.3s;
                                " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 5px 15px rgba(52, 152, 219, 0.4)'" 
                                   onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 3px 10px rgba(52, 152, 219, 0.3)'">
                                    ▶️ Start
                                </button>
                                <button id="step-btn" style="
                                    background: linear-gradient(135deg, #f39c12, #e67e22);
                                    color: white;
                                    border: none;
                                    padding: 10px 15px;
                                    font-size: 0.95rem;
                                    font-weight: bold;
                                    border-radius: 8px;
                                    cursor: pointer;
                                    box-shadow: 0 3px 10px rgba(243, 156, 18, 0.3);
                                    transition: all 0.3s;
                                " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 5px 15px rgba(243, 156, 18, 0.4)'" 
                                   onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 3px 10px rgba(243, 156, 18, 0.3)'">
                                    Step →
                                </button>
                            </div>
                            <button id="reset-btn" style="
                                background: linear-gradient(135deg, #e74c3c, #c0392b);
                                color: white;
                                border: none;
                                padding: 10px 15px;
                                font-size: 0.95rem;
                                font-weight: bold;
                                border-radius: 8px;
                                cursor: pointer;
                                box-shadow: 0 3px 10px rgba(231, 76, 60, 0.3);
                                transition: all 0.3s;
                                width: 100%;
                                margin-top: 8px;
                            " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 5px 15px rgba(231, 76, 60, 0.4)'" 
                               onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 3px 10px rgba(231, 76, 60, 0.3)'">
                                🔄 Reset
                            </button>
                        </div>
                        
                        <!-- Stats Display -->
                        <div style="
                            background: rgba(255, 255, 255, 0.98);
                            border-radius: 8px;
                            padding: 15px;
                            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                            display: flex;
                            justify-content: space-around;
                            align-items: center;
                        ">
                            <div style="text-align: center;">
                                <div style="color: #95a5a6; font-size: 0.8rem;">Step</div>
                                <div id="step-count" style="color: #2c3e50; font-size: 1.5rem; font-weight: bold;">0</div>
                            </div>
                            <div style="text-align: center;">
                                <div style="color: #95a5a6; font-size: 0.8rem;">Total Error</div>
                                <div id="total-loss" style="color: #e74c3c; font-size: 1.5rem; font-weight: bold;">0</div>
                            </div>
                        </div>
                    </div>
                </div>
                    
                <!-- Student Line with Results -->
                <div style="
                    position: relative;
                    width: 98%;
                    max-width: none;
                    margin-top: -100px;
                    padding: 15px;
                    display: flex;
                    justify-content: space-around;
                    align-items: flex-end;
                ">
                        <!-- Student 1: Joe -->
                        <div class="student" data-student="0" style="
                            position: relative;
                            cursor: pointer;
                            transition: all 0.3s;
                        ">
                            <div class="student-avatar" style="
                                width: 140px;
                                height: 160px;
                                background: linear-gradient(to bottom, #fdbcb4 0%, #f0a0a0 100%);
                                border-radius: 70px 70px 10px 10px;
                                position: relative;
                                box-shadow: 0 5px 20px rgba(0,0,0,0.4);
                                transition: all 0.3s;
                                border: 3px solid rgba(255,255,255,0.8);
                            ">
                                <!-- Face -->
                                <div style="
                                    position: absolute;
                                    top: 35px;
                                    left: 50%;
                                    transform: translateX(-50%);
                                    font-size: 3.5rem;
                                ">👨‍🎓</div>
                                <!-- Name Tag -->
                                <div style="
                                    position: absolute;
                                    bottom: -30px;
                                    left: 50%;
                                    transform: translateX(-50%);
                                    background: white;
                                    padding: 6px 18px;
                                    border-radius: 15px;
                                    font-weight: bold;
                                    font-size: 1.1rem;
                                    color: #2c3e50;
                                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                                    white-space: nowrap;
                                ">Joe</div>
                            </div>
                            <!-- Hover Profile -->
                            <div class="student-profile" style="
                                position: absolute;
                                bottom: 180px;
                                left: 50%;
                                transform: translateX(-50%);
                                background: white;
                                padding: 15px;
                                border-radius: 10px;
                                box-shadow: 0 5px 20px rgba(0,0,0,0.2);
                                opacity: 0;
                                pointer-events: none;
                                transition: opacity 0.3s;
                                white-space: nowrap;
                                z-index: 10;
                            ">
                                <div style="font-weight: bold; color: #2c3e50; margin-bottom: 8px;">Joe's Profile</div>
                                <div style="font-size: 0.9rem; color: #555; line-height: 1.4;">
                                    📅 20 years old<br>
                                    ☕ Drinks 2 cups/day<br>
                                    😴 Tiredness: 7/10<br>
                                    <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #e0e0e0;">
                                        🎯 Needs: <span style="font-weight: bold; color: #2ecc71;">161ml</span>
                                    </div>
                                </div>
                            </div>
                            <!-- Prediction Display -->
                            <div class="prediction-display" data-student="0" style="
                                position: absolute;
                                bottom: 180px;
                                left: 50%;
                                transform: translateX(-50%);
                                background: white;
                                padding: 10px 15px;
                                border-radius: 8px;
                                box-shadow: 0 3px 10px rgba(0,0,0,0.2);
                                opacity: 0;
                                pointer-events: none;
                                transition: opacity 0.3s;
                                white-space: nowrap;
                                z-index: 10;
                                text-align: center;
                            ">
                                <div class="prediction-text" style="font-weight: bold; color: #2c3e50;">Predicted: <span class="prediction-value">0</span>ml</div>
                                <div class="error-text" style="font-size: 0.85rem; color: #7f8c8d; margin-top: 4px;">Error: <span class="error-value">0</span>ml</div>
                            </div>
                        </div>
                        
                        <!-- Student 2: Sarah -->
                        <div class="student" data-student="1" style="
                            position: relative;
                            cursor: pointer;
                            transition: all 0.3s;
                        ">
                            <div class="student-avatar" style="
                                width: 140px;
                                height: 160px;
                                background: linear-gradient(to bottom, #c9b4f4 0%, #a090d0 100%);
                                border-radius: 70px 70px 10px 10px;
                                position: relative;
                                box-shadow: 0 5px 20px rgba(0,0,0,0.4);
                                transition: all 0.3s;
                                border: 3px solid rgba(255,255,255,0.8);
                            ">
                                <!-- Face -->
                                <div style="
                                    position: absolute;
                                    top: 35px;
                                    left: 50%;
                                    transform: translateX(-50%);
                                    font-size: 3.5rem;
                                ">👩‍🎓</div>
                                <!-- Name Tag -->
                                <div style="
                                    position: absolute;
                                    bottom: -30px;
                                    left: 50%;
                                    transform: translateX(-50%);
                                    background: white;
                                    padding: 6px 18px;
                                    border-radius: 15px;
                                    font-weight: bold;
                                    font-size: 1.1rem;
                                    color: #2c3e50;
                                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                                    white-space: nowrap;
                                ">Sarah</div>
                            </div>
                            <!-- Hover Profile -->
                            <div class="student-profile" style="
                                position: absolute;
                                bottom: 180px;
                                left: 50%;
                                transform: translateX(-50%);
                                background: white;
                                padding: 15px;
                                border-radius: 10px;
                                box-shadow: 0 5px 20px rgba(0,0,0,0.2);
                                opacity: 0;
                                pointer-events: none;
                                transition: opacity 0.3s;
                                white-space: nowrap;
                                z-index: 10;
                            ">
                                <div style="font-weight: bold; color: #2c3e50; margin-bottom: 8px;">Sarah's Profile</div>
                                <div style="font-size: 0.9rem; color: #555; line-height: 1.4;">
                                    📅 19 years old<br>
                                    ☕ Drinks 1 cup/day<br>
                                    😴 Tiredness: 9/10<br>
                                    <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #e0e0e0;">
                                        🎯 Needs: <span style="font-weight: bold; color: #2ecc71;">152ml</span>
                                    </div>
                                </div>
                            </div>
                            <!-- Prediction Display -->
                            <div class="prediction-display" data-student="1" style="
                                position: absolute;
                                bottom: 180px;
                                left: 50%;
                                transform: translateX(-50%);
                                background: white;
                                padding: 10px 15px;
                                border-radius: 8px;
                                box-shadow: 0 3px 10px rgba(0,0,0,0.2);
                                opacity: 0;
                                pointer-events: none;
                                transition: opacity 0.3s;
                                white-space: nowrap;
                                z-index: 10;
                                text-align: center;
                            ">
                                <div class="prediction-text" style="font-weight: bold; color: #2c3e50;">Predicted: <span class="prediction-value">0</span>ml</div>
                                <div class="error-text" style="font-size: 0.85rem; color: #7f8c8d; margin-top: 4px;">Error: <span class="error-value">0</span>ml</div>
                            </div>
                        </div>
                        
                        <!-- Student 3: Emma -->
                        <div class="student" data-student="2" style="
                            position: relative;
                            cursor: pointer;
                            transition: all 0.3s;
                        ">
                            <div class="student-avatar" style="
                                width: 140px;
                                height: 160px;
                                background: linear-gradient(to bottom, #b4e7ce 0%, #90c0a0 100%);
                                border-radius: 70px 70px 10px 10px;
                                position: relative;
                                box-shadow: 0 5px 20px rgba(0,0,0,0.4);
                                transition: all 0.3s;
                                border: 3px solid rgba(255,255,255,0.8);
                            ">
                                <!-- Face -->
                                <div style="
                                    position: absolute;
                                    top: 35px;
                                    left: 50%;
                                    transform: translateX(-50%);
                                    font-size: 3.5rem;
                                ">👩‍💼</div>
                                <!-- Name Tag -->
                                <div style="
                                    position: absolute;
                                    bottom: -30px;
                                    left: 50%;
                                    transform: translateX(-50%);
                                    background: white;
                                    padding: 6px 18px;
                                    border-radius: 15px;
                                    font-weight: bold;
                                    font-size: 1.1rem;
                                    color: #2c3e50;
                                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                                    white-space: nowrap;
                                ">Emma</div>
                            </div>
                            <!-- Hover Profile -->
                            <div class="student-profile" style="
                                position: absolute;
                                bottom: 180px;
                                left: 50%;
                                transform: translateX(-50%);
                                background: white;
                                padding: 15px;
                                border-radius: 10px;
                                box-shadow: 0 5px 20px rgba(0,0,0,0.2);
                                opacity: 0;
                                pointer-events: none;
                                transition: opacity 0.3s;
                                white-space: nowrap;
                                z-index: 10;
                            ">
                                <div style="font-weight: bold; color: #2c3e50; margin-bottom: 8px;">Emma's Profile</div>
                                <div style="font-size: 0.9rem; color: #555; line-height: 1.4;">
                                    📅 22 years old<br>
                                    ☕ Drinks 4 cups/day<br>
                                    😴 Tiredness: 3/10<br>
                                    <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #e0e0e0;">
                                        🎯 Needs: <span style="font-weight: bold; color: #2ecc71;">179ml</span>
                                    </div>
                                </div>
                            </div>
                            <!-- Prediction Display -->
                            <div class="prediction-display" data-student="2" style="
                                position: absolute;
                                bottom: 180px;
                                left: 50%;
                                transform: translateX(-50%);
                                background: white;
                                padding: 10px 15px;
                                border-radius: 8px;
                                box-shadow: 0 3px 10px rgba(0,0,0,0.2);
                                opacity: 0;
                                pointer-events: none;
                                transition: opacity 0.3s;
                                white-space: nowrap;
                                z-index: 10;
                                text-align: center;
                            ">
                                <div class="prediction-text" style="font-weight: bold; color: #2c3e50;">Predicted: <span class="prediction-value">0</span>ml</div>
                                <div class="error-text" style="font-size: 0.85rem; color: #7f8c8d; margin-top: 4px;">Error: <span class="error-value">0</span>ml</div>
                            </div>
                        </div>
                    </div>
                    
                <!-- Success Message -->
                <div id="success-message" style="
                    display: none;
                    text-align: center;
                    margin-top: 30px;
                    padding: 20px;
                    background: linear-gradient(135deg, rgba(46, 204, 113, 0.98), rgba(39, 174, 96, 0.98));
                    border-radius: 15px;
                    max-width: 600px;
                    margin-left: auto;
                    margin-right: auto;
                    box-shadow: 0 5px 25px rgba(0,0,0,0.3);
                    color: white;
                ">
                    <h2 style="margin: 0 0 10px 0; color: white;">🎉 Perfect Formula Found!</h2>
                    <div style="font-size: 1.1rem; margin-bottom: 10px;">
                        All students got their perfect coffee in <span id="final-steps" style="font-weight: bold; font-size: 1.3rem;">0</span> steps!
                    </div>
                    <div style="
                        font-family: 'Courier New', monospace;
                        font-size: 1.2rem;
                        background: rgba(255, 255, 255, 0.2);
                        padding: 10px 20px;
                        border-radius: 8px;
                        display: inline-block;
                        margin-top: 10px;
                    ">
                        <span id="final-formula">Formula</span>
                    </div>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
        
        <style>
            /* Number Input Styling */
            input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background: white;
                cursor: pointer;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                border: 2px solid #3498db;
            }
            
            input[type="range"]::-webkit-slider-thumb:hover {
                transform: scale(1.2);
            }
            
            /* Student Interactions */
            .student:hover .student-avatar {
                transform: translateY(-5px);
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                border-color: rgba(255,255,255,1);
            }
            
            .student:hover .student-profile {
                opacity: 1 !important;
            }
            
            .student.running .prediction-display {
                opacity: 1 !important;
            }
            
            /* Animations */
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
            
            @keyframes pulse {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.05); opacity: 0.7; }
            }
            
            .updating {
                animation: pulse 0.5s ease-in-out;
            }
            
            .serving .student-avatar {
                animation: bounce 0.5s ease-in-out;
            }
            
            button:disabled {
                opacity: 0.5;
                cursor: not-allowed;
                transform: none !important;
            }
        </style>
    `;
    
    // Initialize navigation
    initializeNavigation('coffee-gradient', 'createCoffeeGradientDescent');
    
    // Setup interactivity
    setTimeout(() => {
        setupGradientDescent();
    }, 100);
}

/**
 * Sets up the gradient descent functionality
 * @function setupGradientDescent
 * @description Initializes the gradient descent algorithm and controls
 * @returns {void}
 */
function setupGradientDescent() {
    // True weights (target formula)
    const TRUE_W1 = 5;
    const TRUE_W2 = 10;
    const TRUE_W3 = 3;
    const TRUE_BIAS = 20;
    
    // Training data (3 students)
    const STUDENTS = [
        { name: 'Joe', age: 20, cups: 2, tired: 7, target: 161 },
        { name: 'Sarah', age: 19, cups: 1, tired: 9, target: 152 },
        { name: 'Emma', age: 22, cups: 4, tired: 3, target: 179 }
    ];
    
    // Current weights (start with small random values)
    let w1 = Math.random() * 0.1;
    let w2 = Math.random() * 0.1;
    let w3 = Math.random() * 0.1;
    let bias = Math.random() * 0.1;
    
    // Fixed gradient descent parameters
    const learningRate = 0.0001; // Fixed learning rate
    let stepCount = 0;
    let isRunning = false;
    let animationId = null;
    let hasServed = false; // Track if serving animation has played
    
    // Get elements
    const gradientBtn = document.getElementById('gradient-btn');
    const stepBtn = document.getElementById('step-btn');
    const resetBtn = document.getElementById('reset-btn');
    const studentElements = document.querySelectorAll('.student');
    
    // Calculate predictions and loss
    function forward() {
        let totalLoss = 0;
        const predictions = [];
        let perfectCount = 0;
        
        STUDENTS.forEach((student, i) => {
            const pred = w1 * student.age + w2 * student.cups + w3 * student.tired + bias;
            predictions.push(pred);
            const error = Math.abs(pred - student.target);
            totalLoss += error;
            
            // Count as perfect if within 5ml tolerance
            if (error <= 5) {
                perfectCount++;
            }
        });
        
        return {
            predictions,
            loss: totalLoss,
            allPerfect: perfectCount === 3
        };
    }
    
    // Calculate gradients
    function calculateGradients() {
        let grad_w1 = 0;
        let grad_w2 = 0;
        let grad_w3 = 0;
        let grad_bias = 0;
        
        STUDENTS.forEach((student) => {
            const pred = w1 * student.age + w2 * student.cups + w3 * student.tired + bias;
            const error = pred - student.target;
            
            // Gradients (derivative of MSE loss)
            grad_w1 += 2 * error * student.age / STUDENTS.length;
            grad_w2 += 2 * error * student.cups / STUDENTS.length;
            grad_w3 += 2 * error * student.tired / STUDENTS.length;
            grad_bias += 2 * error / STUDENTS.length;
        });
        
        return { grad_w1, grad_w2, grad_w3, grad_bias };
    }
    
    // Update display
    function updateDisplay(showServing = false) {
        const { predictions, loss, allPerfect } = forward();
        
        // Update weight displays with animation
        const w1Display = document.getElementById('w1-display');
        const w2Display = document.getElementById('w2-display');
        const w3Display = document.getElementById('w3-display');
        const biasDisplay = document.getElementById('bias-display');
        
        w1Display.textContent = w1.toFixed(2);
        w2Display.textContent = w2.toFixed(2);
        w3Display.textContent = w3.toFixed(2);
        biasDisplay.textContent = bias.toFixed(2);
        
        // Add pulse animation to weights when updating
        if (isRunning) {
            [w1Display, w2Display, w3Display, biasDisplay].forEach(el => {
                el.parentElement.classList.add('updating');
                setTimeout(() => el.parentElement.classList.remove('updating'), 500);
            });
        }
        
        // Update predictions and errors for each student
        predictions.forEach((pred, i) => {
            const target = STUDENTS[i].target;
            const error = pred - target;
            const absError = Math.abs(error);
            const studentEl = studentElements[i];
            
            // Update prediction display
            const predDisplay = studentEl.querySelector('.prediction-display');
            const predValue = predDisplay.querySelector('.prediction-value');
            const errorValue = predDisplay.querySelector('.error-value');
            
            predValue.textContent = Math.round(pred);
            errorValue.textContent = error > 0 ? `+${Math.round(error)}` : Math.round(error);
            
            // Color code based on error magnitude (±5ml tolerance for perfect)
            if (absError <= 5) {
                predDisplay.style.borderLeft = '3px solid #2ecc71';
                errorValue.style.color = '#2ecc71';
            } else if (absError < 20) {
                predDisplay.style.borderLeft = '3px solid #f39c12';
                errorValue.style.color = '#f39c12';
            } else {
                predDisplay.style.borderLeft = '3px solid #e74c3c';
                errorValue.style.color = '#e74c3c';
            }
            
            // Show prediction display when running
            if (isRunning || stepCount > 0) {
                studentEl.classList.add('running');
            }
        });
        
        // Update loss and step count
        document.getElementById('total-loss').textContent = Math.round(loss);
        document.getElementById('step-count').textContent = stepCount;
        
        // Check if all students are perfect and show serving animation
        if (allPerfect && !hasServed) {
            hasServed = true;
            if (isRunning) {
                stopAuto();
            }
            
            // Play serving animation with status indicators
            playServingAnimation(predictions);
            
            // Show success message
            setTimeout(() => {
                const successMsg = document.getElementById('success-message');
                const finalSteps = document.getElementById('final-steps');
                const finalFormula = document.getElementById('final-formula');
                
                if (successMsg) {
                    successMsg.style.display = 'block';
                }
                if (finalSteps) {
                    finalSteps.textContent = stepCount;
                }
                if (finalFormula) {
                    finalFormula.textContent = 
                        `${w1.toFixed(1)}×Age + ${w2.toFixed(1)}×Cups + ${w3.toFixed(1)}×Tiredness + ${bias.toFixed(1)}ml`;
                }
            }, 2000);
        }
    }
    
    // Play serving animation
    async function playServingAnimation(predictions) {
        for (let i = 0; i < STUDENTS.length; i++) {
            const student = STUDENTS[i];
            const studentEl = studentElements[i];
            const pred = predictions[i];
            const error = Math.abs(pred - student.target);
            
            // Animate serving
            studentEl.classList.add('serving');
            const avatarEl = studentEl.querySelector('.student-avatar');
            avatarEl.style.animation = 'bounce 0.5s ease-in-out';
            
            // Remove animation after completion
            setTimeout(() => {
                avatarEl.style.animation = '';
            }, 500);
            
            // Remove existing status indicator if present
            const existingStatus = studentEl.querySelector('.status-indicator');
            if (existingStatus) {
                existingStatus.remove();
            }
            
            // Create status indicator
            const statusDiv = document.createElement('div');
            statusDiv.className = 'status-indicator';
            statusDiv.style.cssText = `
                position: absolute;
                top: -10px;
                right: -10px;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background: #2ecc71;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                animation: pulse 0.5s ease-in-out;
            `;
            statusDiv.textContent = '✅';
            
            // Add to avatar
            avatarEl.appendChild(statusDiv);
            
            await new Promise(resolve => setTimeout(resolve, 300));
        }
    }
    
    // Perform one gradient descent step
    function step() {
        const gradients = calculateGradients();
        
        // Update weights
        w1 -= learningRate * gradients.grad_w1;
        w2 -= learningRate * gradients.grad_w2;
        w3 -= learningRate * gradients.grad_w3;
        bias -= learningRate * gradients.grad_bias;
        
        stepCount++;
        updateDisplay();
    }
    
    // Auto run gradient descent
    function autoRun() {
        if (!isRunning) return;
        
        step();
        
        // Continue if not all perfect
        const { allPerfect } = forward();
        if (!allPerfect && stepCount < 10000) {
            animationId = setTimeout(autoRun, 50);
        } else {
            stopAuto();
        }
    }
    
    function startAuto() {
        isRunning = true;
        gradientBtn.textContent = '⏹ Stop';
        gradientBtn.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
        stepBtn.disabled = true;
        autoRun();
    }
    
    function stopAuto() {
        isRunning = false;
        gradientBtn.textContent = '▶️ Start';
        gradientBtn.style.background = 'linear-gradient(135deg, #3498db, #2980b9)';
        stepBtn.disabled = false;
        if (animationId) {
            clearTimeout(animationId);
        }
    }
    
    // Reset weights
    function reset() {
        w1 = Math.random() * 0.1;
        w2 = Math.random() * 0.1;
        w3 = Math.random() * 0.1;
        bias = Math.random() * 0.1;
        stepCount = 0;
        hasServed = false;
        const successMsg = document.getElementById('success-message');
        if (successMsg) {
            successMsg.style.display = 'none';
        }
        
        // Clear student displays
        studentElements.forEach(student => {
            student.classList.remove('running', 'serving');
            student.querySelector('.student-avatar').style.animation = '';
            
            // Remove status indicators
            const statusIndicator = student.querySelector('.status-indicator');
            if (statusIndicator) {
                statusIndicator.remove();
            }
        });
        
        stopAuto();
        updateDisplay();
    }
    
    // Event listeners
    gradientBtn.addEventListener('click', () => {
        if (isRunning) {
            stopAuto();
        } else {
            startAuto();
        }
    });
    
    stepBtn.addEventListener('click', () => {
        step();
    });
    
    resetBtn.addEventListener('click', reset);
    
    // Initialize display
    updateDisplay();
}
