// Coffee Optimizer - Single Student Focus Design
// Left: Current student display | Right: Formula, controls, and feedback

function createCoffeeManualOptimizer() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration" style="padding: 20px; max-width: 1000px; margin: 0 auto;">
                <h1 style="font-size: 1.8rem; margin: 0 0 15px 0; text-align: center; color: #2c3e50;">Coffee Formula Discovery</h1>
                
                <!-- Explanation Box -->
                <div style="background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 12px; padding: 18px; margin-bottom: 20px; color: white; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                    <div style="font-size: 0.95rem; line-height: 1.5; text-align: center;">
                        Find the hidden formula that calculates coffee needs based on <strong>age</strong>, <strong>daily cups</strong>, and <strong>tiredness</strong>.
                        Adjust the weights until the formula outputs match the target values for all three students!
                    </div>
                </div>
                
                <!-- Main Container -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    
                    <!-- Left Side: Student Display -->
                    <div style="background: #2c3e50; border-radius: 12px; padding: 25px; box-shadow: 0 4px 20px rgba(0,0,0,0.2);">
                        
                        <!-- Student Selector -->
                        <div style="display: flex; gap: 10px; margin-bottom: 25px;">
                            <button class="student-btn" data-student="0" style="flex: 1; padding: 10px; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; transition: all 0.3s;">
                                Student A
                                <div class="student-status" data-student="0" style="font-size: 0.75rem; margin-top: 3px; opacity: 0.9;">⚪ Not solved</div>
                            </button>
                            <button class="student-btn" data-student="1" style="flex: 1; padding: 10px; background: #34495e; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; transition: all 0.3s;">
                                Student B
                                <div class="student-status" data-student="1" style="font-size: 0.75rem; margin-top: 3px; opacity: 0.9;">⚪ Not solved</div>
                            </button>
                            <button class="student-btn" data-student="2" style="flex: 1; padding: 10px; background: #34495e; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; transition: all 0.3s;">
                                Student C
                                <div class="student-status" data-student="2" style="font-size: 0.75rem; margin-top: 3px; opacity: 0.9;">⚪ Not solved</div>
                            </button>
                        </div>
                        
                        <!-- Current Student Display -->
                        <div id="student-display" style="background: rgba(255,255,255,0.05); border-radius: 10px; padding: 20px;">
                            <h2 id="student-name" style="color: #ecf0f1; margin: 0 0 20px 0; text-align: center; font-size: 1.3rem;">Student A</h2>
                            
                            <!-- Input Parameters -->
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 25px;">
                                <div style="background: rgba(52,152,219,0.2); border-radius: 8px; padding: 15px; text-align: center; border: 2px solid #3498db;">
                                    <div style="color: #3498db; font-size: 0.8rem; margin-bottom: 5px;">AGE</div>
                                    <div id="student-age" style="color: white; font-size: 1.8rem; font-weight: bold;">20</div>
                                </div>
                                <div style="background: rgba(231,76,60,0.2); border-radius: 8px; padding: 15px; text-align: center; border: 2px solid #e74c3c;">
                                    <div style="color: #e74c3c; font-size: 0.8rem; margin-bottom: 5px;">CUPS/DAY</div>
                                    <div id="student-cups" style="color: white; font-size: 1.8rem; font-weight: bold;">2</div>
                                </div>
                                <div style="background: rgba(243,156,18,0.2); border-radius: 8px; padding: 15px; text-align: center; border: 2px solid #f39c12;">
                                    <div style="color: #f39c12; font-size: 0.8rem; margin-bottom: 5px;">TIREDNESS</div>
                                    <div id="student-tired" style="color: white; font-size: 1.8rem; font-weight: bold;">7</div>
                                </div>
                            </div>
                            
                            <!-- Visual Coffee Display -->
                            <div style="position: relative; height: 200px; background: rgba(0,0,0,0.3); border-radius: 10px; overflow: hidden; margin-bottom: 20px;">
                                <!-- Target line -->
                                <div id="target-line" style="position: absolute; bottom: 50%; width: 100%; height: 2px; background: #2ecc71; z-index: 2;">
                                    <div style="position: absolute; left: 10px; top: -20px; background: #2ecc71; color: white; padding: 3px 8px; border-radius: 4px; font-size: 0.85rem; font-weight: bold;">
                                        TARGET: <span id="target-value">161</span>ml
                                    </div>
                                </div>
                                
                                <!-- Current value bar -->
                                <div id="value-bar" style="position: absolute; bottom: 0; left: 20%; right: 20%; background: linear-gradient(to top, #3498db, #5dade2); transition: height 0.3s ease; height: 0%; border-radius: 5px 5px 0 0;">
                                    <div id="current-value-label" style="position: absolute; top: -25px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.8); color: white; padding: 3px 10px; border-radius: 4px; font-weight: bold; white-space: nowrap;">
                                        0ml
                                    </div>
                                </div>
                                
                                <!-- Grid lines -->
                                <div style="position: absolute; top: 25%; width: 100%; height: 1px; background: rgba(255,255,255,0.1);"></div>
                                <div style="position: absolute; top: 75%; width: 100%; height: 1px; background: rgba(255,255,255,0.1);"></div>
                            </div>
                            
                            <!-- Result Status -->
                            <div id="result-status" style="padding: 15px; border-radius: 8px; text-align: center; background: rgba(231,76,60,0.2); border: 2px solid #e74c3c;">
                                <div id="status-message" style="color: #e74c3c; font-weight: bold; font-size: 1.1rem;">Off by 161ml</div>
                                <div id="status-detail" style="color: #ecf0f1; font-size: 0.85rem; margin-top: 5px; opacity: 0.8;">Need to increase the output</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right Side: Formula & Controls -->
                    <div style="background: white; border-radius: 12px; padding: 25px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                        
                        <!-- Current Formula -->
                        <div style="background: #f8f9fa; border-radius: 8px; padding: 15px; margin-bottom: 20px; border: 2px solid #e9ecef;">
                            <div style="color: #7f8c8d; font-size: 0.8rem; margin-bottom: 8px; text-align: center;">CURRENT FORMULA</div>
                            <div style="font-family: 'Courier New', monospace; font-size: 0.95rem; text-align: center; color: #2c3e50;">
                                f(x) = <span id="w1-display" style="color: #3498db; font-size: 1.1rem; font-weight: bold;">0</span>×age + 
                                <span id="w2-display" style="color: #e74c3c; font-size: 1.1rem; font-weight: bold;">0</span>×cups + 
                                <span id="w3-display" style="color: #f39c12; font-size: 1.1rem; font-weight: bold;">0</span>×tired + 
                                <span id="bias-display" style="color: #2ecc71; font-size: 1.1rem; font-weight: bold;">0</span>
                            </div>
                        </div>
                        
                        <!-- Compact Controls -->
                        <div style="background: #f8f9fa; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                            <div style="color: #7f8c8d; font-size: 0.8rem; margin-bottom: 12px; text-align: center;">ADJUST WEIGHTS</div>
                            
                            <!-- All sliders in compact layout -->
                            <div style="display: grid; gap: 12px;">
                                <!-- Age -->
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <div style="width: 60px; font-size: 0.85rem; color: #3498db; font-weight: bold;">Age</div>
                                    <input type="range" id="w1-slider" min="0" max="10" value="0" step="1" style="flex: 1; height: 6px;">
                                    <div style="background: #3498db; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.85rem; font-weight: bold; min-width: 25px; text-align: center;" id="w1-value">0</div>
                                </div>
                                
                                <!-- Cups -->
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <div style="width: 60px; font-size: 0.85rem; color: #e74c3c; font-weight: bold;">Cups</div>
                                    <input type="range" id="w2-slider" min="0" max="15" value="0" step="1" style="flex: 1; height: 6px;">
                                    <div style="background: #e74c3c; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.85rem; font-weight: bold; min-width: 25px; text-align: center;" id="w2-value">0</div>
                                </div>
                                
                                <!-- Tired -->
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <div style="width: 60px; font-size: 0.85rem; color: #f39c12; font-weight: bold;">Tired</div>
                                    <input type="range" id="w3-slider" min="0" max="10" value="0" step="1" style="flex: 1; height: 6px;">
                                    <div style="background: #f39c12; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.85rem; font-weight: bold; min-width: 25px; text-align: center;" id="w3-value">0</div>
                                </div>
                                
                                <!-- Base -->
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <div style="width: 60px; font-size: 0.85rem; color: #2ecc71; font-weight: bold;">Base</div>
                                    <input type="range" id="bias-slider" min="0" max="40" value="0" step="5" style="flex: 1; height: 6px;">
                                    <div style="background: #2ecc71; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.85rem; font-weight: bold; min-width: 25px; text-align: center;" id="bias-value">0</div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Loss Display -->
                        <div style="background: linear-gradient(135deg, #f8f9fa, #e9ecef); border-radius: 8px; padding: 15px; margin-bottom: 20px; text-align: center;">
                            <div style="color: #7f8c8d; font-size: 0.8rem; margin-bottom: 8px;">CURRENT STUDENT LOSS</div>
                            <div id="current-loss" style="font-size: 2rem; font-weight: bold; color: #e74c3c;">161</div>
                            <div style="color: #7f8c8d; font-size: 0.75rem; margin-top: 5px;">Distance from target</div>
                        </div>
                        
                        <!-- Overall Progress -->
                        <div style="background: #2c3e50; border-radius: 8px; padding: 15px; color: white;">
                            <div style="font-size: 0.85rem; margin-bottom: 10px; opacity: 0.9;">Overall Progress</div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                <span style="font-size: 0.8rem;">Students Solved: <span id="solved-count">0</span>/3</span>
                                <span style="font-size: 0.8rem;">Total Error: <span id="total-error">492</span></span>
                            </div>
                            <div style="height: 8px; background: rgba(0,0,0,0.3); border-radius: 4px; overflow: hidden;">
                                <div id="progress-bar" style="height: 100%; width: 0%; background: linear-gradient(to right, #e74c3c, #f39c12, #2ecc71); transition: width 0.5s;"></div>
                            </div>
                        </div>
                        
                        <!-- Hint Buttons -->
                        <div style="margin-top: 15px;">
                            <button id="hint-btn-1" class="hint-btn" style="width: 100%; padding: 10px; margin-bottom: 8px; background: white; color: #7f8c8d; border: 2px solid #e9ecef; border-radius: 8px; cursor: pointer; font-weight: bold; transition: all 0.3s;">
                                💡 Hint 1: Where to start?
                            </button>
                            <div id="hint-text-1" style="display: none; margin-bottom: 10px; padding: 10px; background: #fff3cd; border-radius: 6px; color: #856404; font-size: 0.85rem;">Start with the base value - try setting it to 20</div>
                            
                            <button id="hint-btn-2" class="hint-btn" style="width: 100%; padding: 10px; margin-bottom: 8px; background: white; color: #7f8c8d; border: 2px solid #e9ecef; border-radius: 8px; cursor: pointer; font-weight: bold; transition: all 0.3s;">
                                💡 Hint 2: What about tiredness?
                            </button>
                            <div id="hint-text-2" style="display: none; margin-bottom: 10px; padding: 10px; background: #fff3cd; border-radius: 6px; color: #856404; font-size: 0.85rem;">Tiredness has a small effect - set the weight to 3</div>
                            
                            <button id="hint-btn-3" class="hint-btn" style="width: 100%; padding: 10px; background: white; color: #7f8c8d; border: 2px solid #e9ecef; border-radius: 8px; cursor: pointer; font-weight: bold; transition: all 0.3s;">
                                💡 Hint 3: Daily cups weight?
                            </button>
                            <div id="hint-text-3" style="display: none; margin-bottom: 10px; padding: 10px; background: #fff3cd; border-radius: 6px; color: #856404; font-size: 0.85rem;">Daily cups has the biggest impact - set it to 10 (Age should be 5)</div>
                        </div>
                    </div>
                </div>
                
                <!-- Success Message -->
                <div id="success-message" style="display: none; margin-top: 20px; padding: 20px; background: linear-gradient(135deg, #2ecc71, #27ae60); border-radius: 12px; text-align: center; color: white; box-shadow: 0 4px 15px rgba(46,204,113,0.3);">
                    <h2 style="margin: 0 0 10px 0;">🎉 Perfect! All Students Solved!</h2>
                    <div style="font-size: 1.1rem; font-family: 'Courier New', monospace;">
                        The formula is: 5×age + 10×cups + 3×tired + 20
                    </div>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
        
        <style>
            input[type="range"] {
                -webkit-appearance: none;
                background: #e9ecef;
                border-radius: 3px;
                outline: none;
            }
            
            input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: white;
                cursor: pointer;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                border: 2px solid #bdc3c7;
            }
            
            input[type="range"]::-webkit-slider-thumb:hover {
                transform: scale(1.2);
            }
            
            #w1-slider::-webkit-slider-thumb { border-color: #3498db; }
            #w2-slider::-webkit-slider-thumb { border-color: #e74c3c; }
            #w3-slider::-webkit-slider-thumb { border-color: #f39c12; }
            #bias-slider::-webkit-slider-thumb { border-color: #2ecc71; }
            
            .student-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.7; }
            }
        </style>
    `;
    
    // Initialize navigation
    initializeNavigation('coffee-manual', 'createCoffeeManualOptimizer');
    
    // Add interactivity
    setTimeout(() => {
        setupCoffeeOptimizer();
    }, 100);
}

function setupCoffeeOptimizer() {
    // Hidden formula: f(x) = 5*age + 10*coffee + 3*sleepiness + 20
    const TRUE_W1 = 5;
    const TRUE_W2 = 10;
    const TRUE_W3 = 3;
    const TRUE_BIAS = 20;
    
    const STUDENTS = [
        { name: 'Student A', age: 20, cups: 2, tired: 7, target: 161 },  // 5*20 + 10*2 + 3*7 + 20 = 161
        { name: 'Student B', age: 19, cups: 1, tired: 9, target: 152 },  // 5*19 + 10*1 + 3*9 + 20 = 152
        { name: 'Student C', age: 22, cups: 4, tired: 3, target: 179 }   // 5*22 + 10*4 + 3*3 + 20 = 179
    ];
    
    let currentStudent = 0;
    let studentsSolved = [false, false, false];
    
    // Get controls
    const w1Slider = document.getElementById('w1-slider');
    const w2Slider = document.getElementById('w2-slider');
    const w3Slider = document.getElementById('w3-slider');
    const biasSlider = document.getElementById('bias-slider');
    const studentButtons = document.querySelectorAll('.student-btn');
    
    // Switch student
    function switchStudent(index) {
        currentStudent = index;
        
        // Update button styles
        studentButtons.forEach((btn, i) => {
            if (i === index) {
                btn.style.background = '#667eea';
            } else {
                btn.style.background = '#34495e';
            }
        });
        
        // Update student display
        const student = STUDENTS[index];
        document.getElementById('student-name').textContent = student.name;
        document.getElementById('student-age').textContent = student.age;
        document.getElementById('student-cups').textContent = student.cups;
        document.getElementById('student-tired').textContent = student.tired;
        document.getElementById('target-value').textContent = student.target;
        
        // Move target line to correct position
        const targetLine = document.getElementById('target-line');
        const maxHeight = 250; // Max value we display
        const targetPercent = (student.target / maxHeight) * 100;
        targetLine.style.bottom = Math.min(90, Math.max(10, targetPercent)) + '%';
        
        updateLive();
    }
    
    // Update everything live
    function updateLive() {
        const w1 = parseInt(w1Slider.value);
        const w2 = parseInt(w2Slider.value);
        const w3 = parseInt(w3Slider.value);
        const bias = parseInt(biasSlider.value);
        
        // Update formula display
        document.getElementById('w1-display').textContent = w1;
        document.getElementById('w2-display').textContent = w2;
        document.getElementById('w3-display').textContent = w3;
        document.getElementById('bias-display').textContent = bias;
        
        document.getElementById('w1-value').textContent = w1;
        document.getElementById('w2-value').textContent = w2;
        document.getElementById('w3-value').textContent = w3;
        document.getElementById('bias-value').textContent = bias;
        
        // Calculate for current student
        const student = STUDENTS[currentStudent];
        const result = w1 * student.age + w2 * student.cups + w3 * student.tired + bias;
        const target = student.target;
        const error = Math.abs(result - target);
        
        // Update value bar
        const maxHeight = 250;
        const resultPercent = (result / maxHeight) * 100;
        
        const valueBar = document.getElementById('value-bar');
        valueBar.style.height = Math.min(100, resultPercent) + '%';
        document.getElementById('current-value-label').textContent = result + 'ml';
        
        // Update loss display
        document.getElementById('current-loss').textContent = error;
        document.getElementById('current-loss').style.color = 
            error === 0 ? '#2ecc71' : 
            error < 10 ? '#f39c12' : '#e74c3c';
        
        // Update status
        const statusMessage = document.getElementById('status-message');
        const statusDetail = document.getElementById('status-detail');
        const resultStatus = document.getElementById('result-status');
        
        if (error === 0) {
            statusMessage.textContent = '✓ Perfect!';
            statusMessage.style.color = '#2ecc71';
            statusDetail.textContent = 'This student is solved!';
            resultStatus.style.background = 'rgba(46,204,113,0.2)';
            resultStatus.style.borderColor = '#2ecc71';
            valueBar.style.background = 'linear-gradient(to top, #27ae60, #2ecc71)';
            
            // Mark student as solved
            if (!studentsSolved[currentStudent]) {
                studentsSolved[currentStudent] = true;
                updateStudentStatus(currentStudent, true);
            }
        } else if (error < 10) {
            statusMessage.textContent = `Close! Off by ${error}ml`;
            statusMessage.style.color = '#f39c12';
            statusDetail.textContent = result > target ? 'Output too high' : 'Output too low';
            resultStatus.style.background = 'rgba(243,156,18,0.2)';
            resultStatus.style.borderColor = '#f39c12';
            valueBar.style.background = 'linear-gradient(to top, #d68910, #f39c12)';
        } else {
            statusMessage.textContent = `Off by ${error}ml`;
            statusMessage.style.color = '#e74c3c';
            statusDetail.textContent = result > target ? 'Way too much!' : 'Need more output';
            resultStatus.style.background = 'rgba(231,76,60,0.2)';
            resultStatus.style.borderColor = '#e74c3c';
            valueBar.style.background = result > target ? 
                'linear-gradient(to top, #c0392b, #e74c3c)' : 
                'linear-gradient(to top, #5d6d7e, #85929e)';
        }
        
        // Check all students for overall progress
        let totalError = 0;
        let solvedCount = 0;
        
        STUDENTS.forEach((s, i) => {
            const r = w1 * s.age + w2 * s.cups + w3 * s.tired + bias;
            const e = Math.abs(r - s.target);
            totalError += e;
            
            if (e === 0) {
                solvedCount++;
                if (!studentsSolved[i]) {
                    studentsSolved[i] = true;
                    updateStudentStatus(i, true);
                }
            } else if (studentsSolved[i]) {
                studentsSolved[i] = false;
                updateStudentStatus(i, false);
            }
        });
        
        // Update overall progress
        document.getElementById('solved-count').textContent = solvedCount;
        document.getElementById('total-error').textContent = totalError;
        
        const progress = Math.max(0, 100 - (totalError / 492 * 100));
        document.getElementById('progress-bar').style.width = progress + '%';
        
        // Check for win
        if (solvedCount === 3) {
            setTimeout(() => {
                document.getElementById('success-message').style.display = 'block';
            }, 300);
        }
    }
    
    // Update student status indicator
    function updateStudentStatus(index, solved) {
        const status = document.querySelector(`.student-status[data-student="${index}"]`);
        if (solved) {
            status.innerHTML = '✅ Solved!';
            status.style.color = '#2ecc71';
        } else {
            status.innerHTML = '⚪ Not solved';
            status.style.color = 'white';
        }
    }
    
    // Event listeners
    studentButtons.forEach((btn, i) => {
        btn.addEventListener('click', () => switchStudent(i));
    });
    
    w1Slider.addEventListener('input', updateLive);
    w2Slider.addEventListener('input', updateLive);
    w3Slider.addEventListener('input', updateLive);
    biasSlider.addEventListener('input', updateLive);
    
    // Hint button listeners
    const hintBtn1 = document.getElementById('hint-btn-1');
    const hintBtn2 = document.getElementById('hint-btn-2');
    const hintBtn3 = document.getElementById('hint-btn-3');
    const hintText1 = document.getElementById('hint-text-1');
    const hintText2 = document.getElementById('hint-text-2');
    const hintText3 = document.getElementById('hint-text-3');
    
    hintBtn1.addEventListener('click', () => {
        hintText1.style.display = hintText1.style.display === 'none' ? 'block' : 'none';
        hintBtn1.style.background = hintText1.style.display === 'none' ? 'white' : '#fff3cd';
    });
    
    hintBtn2.addEventListener('click', () => {
        hintText2.style.display = hintText2.style.display === 'none' ? 'block' : 'none';
        hintBtn2.style.background = hintText2.style.display === 'none' ? 'white' : '#fff3cd';
    });
    
    hintBtn3.addEventListener('click', () => {
        hintText3.style.display = hintText3.style.display === 'none' ? 'block' : 'none';
        hintBtn3.style.background = hintText3.style.display === 'none' ? 'white' : '#fff3cd';
    });
    
    // Hover effects for hint buttons
    document.querySelectorAll('.hint-btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            if (!btn.style.background || btn.style.background === 'white') {
                btn.style.background = '#f8f9fa';
            }
        });
        btn.addEventListener('mouseleave', () => {
            const textId = btn.id.replace('btn', 'text');
            const text = document.getElementById(textId);
            if (text.style.display === 'none') {
                btn.style.background = 'white';
            }
        });
    });
    
    // Initialize
    switchStudent(0);
}