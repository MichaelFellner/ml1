/**
 * @fileoverview Coffee Booth Simulation - Interactive coffee formula discovery game
 * A fun, immersive way to learn optimization through running a campus coffee booth
 */

/**
 * Creates the coffee booth simulation
 * @function createCoffeeManualOptimizer
 * @description Interactive coffee booth where students learn optimization by serving coffee
 * @returns {void}
 */
function createCoffeeManualOptimizer() {
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
                    max-width: 800px;
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
                    ">4 Variable Challenge: Serve the Right Amount of Coffee!</h1>
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
                        You have a line of students right before their final exams. Each needs a different amount of coffee to study all night. How much coffee they need
                        depends on their age, how many cups a day they typically drink, and how tired they currently are. Finding a formula without gradient descent
                        will be super difficult, so feel free to skip or use the hints if you get stuck.
                    </p>
                </div>
                    
                <!-- Coffee Booth -->
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
                        
                    <!-- Booth Sign with Inline Editable Formula -->
                    <div style="
                        background: rgba(255, 255, 255, 0.98);
                        border-radius: 10px;
                        padding: 15px 20px;
                        margin-bottom: 15px;
                        text-align: center;
                        box-shadow: 0 3px 10px rgba(0,0,0,0.3);
                    ">
                        <div style="font-size: 1.2rem; font-weight: bold; color: #2c3e50; margin-bottom: 12px;">
                            🧪 Your Coffee Formula
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
                                <input type="number" id="age-weight" value="0" min="0" max="20" style="
                                    width: 48px;
                                    padding: 4px;
                                    border: 2px solid #3498db;
                                    border-radius: 5px;
                                    text-align: center;
                                    font-family: 'Courier New', monospace;
                                    font-size: 1.15rem;
                                    font-weight: bold;
                                    color: #3498db;
                                    background: white;
                                    margin: 0 3px;
                                ">×Age + 
                                <input type="number" id="cups-weight" value="0" min="0" max="20" style="
                                    width: 48px;
                                    padding: 4px;
                                    border: 2px solid #e74c3c;
                                    border-radius: 5px;
                                    text-align: center;
                                    font-family: 'Courier New', monospace;
                                    font-size: 1.15rem;
                                    font-weight: bold;
                                    color: #e74c3c;
                                    background: white;
                                    margin: 0 3px;
                                ">×Cups + 
                                <input type="number" id="tired-weight" value="0" min="0" max="20" style="
                                    width: 48px;
                                    padding: 4px;
                                    border: 2px solid #f39c12;
                                    border-radius: 5px;
                                    text-align: center;
                                    font-family: 'Courier New', monospace;
                                    font-size: 1.15rem;
                                    font-weight: bold;
                                    color: #f39c12;
                                    background: white;
                                    margin: 0 3px;
                                ">×Tired + 
                                <input type="number" id="base-weight" value="0" min="0" max="100" step="5" style="
                                    width: 48px;
                                    padding: 4px;
                                    border: 2px solid #2ecc71;
                                    border-radius: 5px;
                                    text-align: center;
                                    font-family: 'Courier New', monospace;
                                    font-size: 1.15rem;
                                    font-weight: bold;
                                    color: #2ecc71;
                                    background: white;
                                    margin: 0 3px;
                                ">ml
                            </div>
                        <div style="margin-top: 10px; font-size: 0.85rem; color: #7f8c8d;">
                            💡 Click on any number to edit it directly. Students need ±5ml of their target to be happy!
                        </div>
                    </div>
                        
                    <!-- Action Button -->
                    <div style="text-align: center; margin-top: 15px;">
                        <button id="serve-button" style="
                                background: linear-gradient(135deg, #667eea, #764ba2);
                                color: white;
                                border: none;
                                padding: 12px 35px;
                                font-size: 1.1rem;
                                font-weight: bold;
                                border-radius: 10px;
                                cursor: pointer;
                                box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
                                transition: all 0.3s;
                            " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(102, 126, 234, 0.5)'" 
                               onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(102, 126, 234, 0.4)'">
                                🎯 Start Serving!
                            </button>
                        <button id="reset-button" style="
                            display: none;
                            background: linear-gradient(135deg, #f39c12, #e67e22);
                            color: white;
                            border: none;
                            padding: 12px 35px;
                            font-size: 1.1rem;
                            font-weight: bold;
                            border-radius: 10px;
                            cursor: pointer;
                            box-shadow: 0 4px 15px rgba(243, 156, 18, 0.4);
                            transition: all 0.3s;
                        " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(243, 156, 18, 0.5)'" 
                           onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(243, 156, 18, 0.4)'">
                            🔄 Try Again
                        </button>
                    </div>
                </div>
                    
                <!-- Student Line -->
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
                            <!-- Status Indicator -->
                            <div class="status-indicator" style="
                                position: absolute;
                                top: -10px;
                                right: -10px;
                                width: 30px;
                                height: 30px;
                                border-radius: 50%;
                                background: #95a5a6;
                                display: none;
                                align-items: center;
                                justify-content: center;
                                font-size: 1.2rem;
                                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                            ">❓</div>
                            <!-- Result Display -->
                            <div class="result-display" style="
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
                                <div class="result-text" style="font-weight: bold; color: #2c3e50;"></div>
                                <div class="result-detail" style="font-size: 0.85rem; color: #7f8c8d; margin-top: 4px;"></div>
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
                            <!-- Status Indicator -->
                            <div class="status-indicator" style="
                                position: absolute;
                                top: -10px;
                                right: -10px;
                                width: 30px;
                                height: 30px;
                                border-radius: 50%;
                                background: #95a5a6;
                                display: none;
                                align-items: center;
                                justify-content: center;
                                font-size: 1.2rem;
                                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                            ">❓</div>
                            <!-- Result Display -->
                            <div class="result-display" style="
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
                                <div class="result-text" style="font-weight: bold; color: #2c3e50;"></div>
                                <div class="result-detail" style="font-size: 0.85rem; color: #7f8c8d; margin-top: 4px;"></div>
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
                            <!-- Status Indicator -->
                            <div class="status-indicator" style="
                                position: absolute;
                                top: -10px;
                                right: -10px;
                                width: 30px;
                                height: 30px;
                                border-radius: 50%;
                                background: #95a5a6;
                                display: none;
                                align-items: center;
                                justify-content: center;
                                font-size: 1.2rem;
                                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                            ">❓</div>
                            <!-- Result Display -->
                            <div class="result-display" style="
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
                                <div class="result-text" style="font-weight: bold; color: #2c3e50;"></div>
                                <div class="result-detail" style="font-size: 0.85rem; color: #7f8c8d; margin-top: 4px;"></div>
                            </div>
                        </div>
                    </div>
                    
                <!-- Score Display -->
                <div id="score-display" style="
                    display: none;
                    text-align: center;
                    margin-top: 30px;
                    padding: 20px;
                    background: rgba(255, 255, 255, 0.98);
                    border-radius: 15px;
                    max-width: 600px;
                    margin-left: auto;
                    margin-right: auto;
                    box-shadow: 0 5px 25px rgba(0,0,0,0.3);
                    backdrop-filter: blur(10px);
                ">
                    <h2 style="margin: 0 0 10px 0; color: #2c3e50;">Results</h2>
                    <div id="score-text" style="font-size: 1.1rem; color: #555;"></div>
                    <div id="perfect-formula" style="
                        display: none;
                        margin-top: 15px;
                        padding: 15px;
                        background: linear-gradient(135deg, #2ecc71, #27ae60);
                        color: white;
                        border-radius: 10px;
                        font-size: 1.1rem;
                    ">
                        🎉 Perfect Formula: 5×Age + 10×Cups + 3×Tiredness + 20ml
                    </div>
                </div>
                    
                <!-- Hints -->
                <div style="
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 10px;
                    z-index: 100;
                    max-width: 300px;
                ">
                    <button class="hint-btn" onclick="showHint(1)" style="
                        background: rgba(255, 255, 255, 0.95);
                        border: 2px solid #3498db;
                        color: #3498db;
                        padding: 8px 15px;
                        border-radius: 20px;
                        cursor: pointer;
                        font-size: 0.9rem;
                        transition: all 0.3s;
                        text-align: left;
                        white-space: nowrap;
                        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
                        backdrop-filter: blur(5px);
                    ">💡 Hint 1</button>
                    <button class="hint-btn" onclick="showHint(2)" style="
                        background: rgba(255, 255, 255, 0.95);
                        border: 2px solid #e67e22;
                        color: #e67e22;
                        padding: 8px 15px;
                        border-radius: 20px;
                        cursor: pointer;
                        font-size: 0.9rem;
                        transition: all 0.3s;
                        text-align: left;
                        white-space: nowrap;
                        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
                        backdrop-filter: blur(5px);
                    ">💡 Hint 2</button>
                    <button class="hint-btn" onclick="showHint(3)" style="
                        background: rgba(255, 255, 255, 0.95);
                        border: 2px solid #9b59b6;
                        color: #9b59b6;
                        padding: 8px 15px;
                        border-radius: 20px;
                        cursor: pointer;
                        font-size: 0.9rem;
                        transition: all 0.3s;
                        text-align: left;
                        white-space: nowrap;
                        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
                        backdrop-filter: blur(5px);
                    ">💡 Solution</button>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
        
        <style>
            /* Number Input Styling */
            input[type="number"] {
                -moz-appearance: textfield;
            }
            
            input[type="number"]::-webkit-outer-spin-button,
            input[type="number"]::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
            
            input[type="number"]:focus {
                outline: none;
                box-shadow: 0 0 0 3px rgba(0,123,255,0.2);
                transform: scale(1.05);
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
            
            .student.served .result-display {
                opacity: 1 !important;
            }
            
            /* Animations */
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
            
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            
            .serving {
                animation: bounce 0.5s ease-in-out;
            }
            
            .hint-btn:hover {
                transform: scale(1.05);
                box-shadow: 0 5px 15px rgba(0,0,0,0.3) !important;
                background: rgba(255, 255, 255, 1) !important;
            }
            
            .hint-btn.revealed {
                background: #f39c12 !important;
                color: white !important;
                border-color: #f39c12 !important;
            }
        </style>
    `;
    
    // Initialize navigation
    initializeNavigation('coffee-manual', 'createCoffeeManualOptimizer');
    
    // Setup interactivity
    setTimeout(() => {
        setupCoffeeBooth();
    }, 100);
}

/**
 * Sets up the coffee booth interactivity
 * @function setupCoffeeBooth
 * @description Initializes the coffee booth simulation logic
 * @returns {void}
 */
function setupCoffeeBooth() {
    // Student data - Formula: 5*age + 10*cups + 3*tiredness + 20
    const STUDENTS = [
        { name: 'Joe', age: 20, cups: 2, tired: 7, target: 161 },
        { name: 'Sarah', age: 19, cups: 1, tired: 9, target: 152 },
        { name: 'Emma', age: 22, cups: 4, tired: 3, target: 179 }
    ];
    
    let isServing = false;
    let results = [];
    
    // Get elements
    const ageWeight = document.getElementById('age-weight');
    const cupsWeight = document.getElementById('cups-weight');
    const tiredWeight = document.getElementById('tired-weight');
    const baseWeight = document.getElementById('base-weight');
    const serveButton = document.getElementById('serve-button');
    const resetButton = document.getElementById('reset-button');
    const students = document.querySelectorAll('.student');
    
    // Allow Enter key to serve from any input
    [ageWeight, cupsWeight, tiredWeight, baseWeight].forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !isServing) {
                serveCoffee();
            }
        });
        
        // Select all text on focus for easy editing
        input.addEventListener('focus', (e) => {
            e.target.select();
        });
        
        // Apply hover effect on focus
        input.addEventListener('focus', (e) => {
            e.target.style.transform = 'scale(1.1)';
        });
        
        input.addEventListener('blur', (e) => {
            e.target.style.transform = 'scale(1)';
        });
    });
    
    // Serve coffee to students
    async function serveCoffee() {
        if (isServing) return;
        isServing = true;
        results = [];
        
        // Hide previous results
        students.forEach(student => {
            student.classList.remove('served');
            const indicator = student.querySelector('.status-indicator');
            indicator.style.display = 'none';
            const resultDisplay = student.querySelector('.result-display');
            resultDisplay.style.opacity = '0';
        });
        
        // Hide score display
        document.getElementById('score-display').style.display = 'none';
        
        // Disable controls
        serveButton.style.display = 'none';
        ageWeight.disabled = true;
        cupsWeight.disabled = true;
        tiredWeight.disabled = true;
        baseWeight.disabled = true;
        
        // Get formula values
        const w1 = parseInt(ageWeight.value) || 0;
        const w2 = parseInt(cupsWeight.value) || 0;
        const w3 = parseInt(tiredWeight.value) || 0;
        const bias = parseInt(baseWeight.value) || 0;
        
        // Serve each student
        for (let i = 0; i < STUDENTS.length; i++) {
            const student = STUDENTS[i];
            const studentEl = students[i];
            
            // Animate serving
            studentEl.classList.add('serving');
            
            // Calculate result
            const served = w1 * student.age + w2 * student.cups + w3 * student.tired + bias;
            const error = Math.abs(served - student.target);
            
            // Determine status (±5ml tolerance for perfect)
            let status, emoji, color, message;
            if (error <= 5) {
                status = 'perfect';
                emoji = '✅';
                color = '#2ecc71';
                message = error === 0 ? 'Perfect!' : `Perfect! (±${error}ml)`;
            } else if (error < 20) {
                status = 'close';
                emoji = '😊';
                color = '#f39c12';
                message = `Close! Off by ${error}ml`;
            } else if (served > student.target + 30) {
                status = 'overbuzzed';
                emoji = '🤯';
                color = '#e74c3c';
                message = `Overbuzzed! ${error}ml too much`;
            } else if (served < student.target - 30) {
                status = 'tired';
                emoji = '😴';
                color = '#3498db';
                message = `Still tired! ${error}ml too little`;
            } else {
                status = 'off';
                emoji = '😐';
                color = '#95a5a6';
                message = `Off by ${error}ml`;
            }
            
            results.push({ name: student.name, status, error });
            
            // Update student display
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const indicator = studentEl.querySelector('.status-indicator');
            indicator.style.display = 'flex';
            indicator.style.background = color;
            indicator.textContent = emoji;
            
            const resultText = studentEl.querySelector('.result-text');
            const resultDetail = studentEl.querySelector('.result-detail');
            resultText.textContent = message;
            resultText.style.color = color;
            resultDetail.textContent = `Served: ${served}ml, Needed: ${student.target}ml`;
            
            studentEl.classList.remove('serving');
            studentEl.classList.add('served');
        }
        
        // Show results
        await new Promise(resolve => setTimeout(resolve, 500));
        showResults();
        
        // Re-enable controls
        resetButton.style.display = 'inline-block';
        ageWeight.disabled = false;
        cupsWeight.disabled = false;
        tiredWeight.disabled = false;
        baseWeight.disabled = false;
        isServing = false;
    }
    
    // Show results summary
    function showResults() {
        const scoreDisplay = document.getElementById('score-display');
        const scoreText = document.getElementById('score-text');
        const perfectFormula = document.getElementById('perfect-formula');
        
        const perfect = results.filter(r => r.status === 'perfect').length;
        const totalError = results.reduce((sum, r) => sum + r.error, 0);
        
        let message;
        if (perfect === 3) {
            message = `🎉 Amazing! All 3 students got the perfect amount of coffee!`;
            perfectFormula.style.display = 'block';
        } else if (perfect >= 2) {
            message = `Great job! ${perfect}/3 students got perfect coffee. Total error: ${totalError}ml`;
            perfectFormula.style.display = 'none';
        } else if (perfect >= 1) {
            message = `Good effort! ${perfect}/3 students got perfect coffee. Total error: ${totalError}ml`;
            perfectFormula.style.display = 'none';
        } else if (totalError < 50) {
            message = `Very close! Total error: ${totalError}ml. Keep adjusting!`;
            perfectFormula.style.display = 'none';
        } else {
            message = `Keep trying! Total error: ${totalError}ml. Try adjusting the weights.`;
            perfectFormula.style.display = 'none';
        }
        
        scoreText.innerHTML = message;
        scoreDisplay.style.display = 'block';
    }
    
    // Reset function
    function reset() {
        // Clear all student states
        students.forEach(student => {
            student.classList.remove('served');
            const indicator = student.querySelector('.status-indicator');
            indicator.style.display = 'none';
        });
        
        // Hide score and show serve button
        document.getElementById('score-display').style.display = 'none';
        serveButton.style.display = 'inline-block';
        resetButton.style.display = 'none';
    }
    
    // Button listeners
    serveButton.addEventListener('click', serveCoffee);
    resetButton.addEventListener('click', reset);
    
    // Hint system with toggle
    window.showHint = function(level) {
        const hints = {
            1: { short: '💡 Hint 1', full: 'Start with the base amount - try 20ml' },
            2: { short: '💡 Hint 2', full: 'Age weight is 5, Tiredness weight is 3' },
            3: { short: '💡 Solution', full: 'Formula: 5×Age + 10×Cups + 3×Tiredness + 20ml' }
        };
        
        const btn = event.target;
        const isRevealed = btn.classList.contains('revealed');
        
        if (isRevealed) {
            // Collapse back
            btn.classList.remove('revealed');
            btn.textContent = hints[level].short;
            btn.style.minWidth = 'auto';
        } else {
            // Expand
            btn.classList.add('revealed');
            btn.textContent = hints[level].full;
            btn.style.minWidth = '250px';
        }
    };
    
    // Initialize - no need for updateDisplay anymore
}