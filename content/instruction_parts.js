// instruction_parts.js - Instructional content between levels

function createInstructionPart1() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration" style="padding: 20px; max-width: 1200px; margin: 0 auto;">
                <h1 style="font-size: 2.3rem; margin-bottom: 20px; background: linear-gradient(45deg, #667eea, #764ba2); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Core Concepts You'll Learn</h1>
                
                <div class="learning-objectives" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 30px 0;">
                    <div id="concept1" class="objective-item" style="background: linear-gradient(135deg, rgba(255,99,71,0.1), rgba(255,99,71,0.05)); border-radius: 12px; padding: 20px; cursor: pointer; transition: all 0.3s ease; border: 2px solid transparent;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="objective-icon" style="font-size: 2.5rem;">📉</div>
                            <div class="objective-content">
                                <h3 style="margin: 0; font-size: 1.2rem; color: #333;">Loss</h3>
                                <p style="margin: 5px 0 0 0; font-size: 0.9rem; color: #666; line-height: 1.4;">A measure of how wrong your AI's predictions are</p>
                            </div>
                        </div>
                    </div>
                    
                    <div id="concept2" class="objective-item" style="background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(102,126,234,0.05)); border-radius: 12px; padding: 20px; cursor: pointer; transition: all 0.3s ease; border: 2px solid transparent;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="objective-icon" style="font-size: 2.5rem;">⚡</div>
                            <div class="objective-content">
                                <h3 style="margin: 0; font-size: 1.2rem; color: #333;">Gradient Descent</h3>
                                <p style="margin: 5px 0 0 0; font-size: 0.9rem; color: #666; line-height: 1.4;">The algorithm that automatically improves AI predictions</p>
                            </div>
                        </div>
                    </div>
                    
                    <div id="concept3" class="objective-item" style="background: linear-gradient(135deg, rgba(118,75,162,0.1), rgba(118,75,162,0.05)); border-radius: 12px; padding: 20px; cursor: pointer; transition: all 0.3s ease; border: 2px solid transparent;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="objective-icon" style="font-size: 2.5rem;">👣</div>
                            <div class="objective-content">
                                <h3 style="margin: 0; font-size: 1.2rem; color: #333;">Step Sizes & Learning Rate</h3>
                                <p style="margin: 5px 0 0 0; font-size: 0.9rem; color: #666; line-height: 1.4;">How big steps the AI takes when learning</p>
                            </div>
                        </div>
                    </div>
                    
                    <div id="concept4" class="objective-item" style="background: linear-gradient(135deg, rgba(45,213,115,0.1), rgba(45,213,115,0.05)); border-radius: 12px; padding: 20px; cursor: pointer; transition: all 0.3s ease; border: 2px solid transparent;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="objective-icon" style="font-size: 2.5rem;">📊</div>
                            <div class="objective-content">
                                <h3 style="margin: 0; font-size: 1.2rem; color: #333;">Training Data</h3>
                                <p style="margin: 5px 0 0 0; font-size: 0.9rem; color: #666; line-height: 1.4;">Examples that teach the AI what's correct</p>
                            </div>
                        </div>
                    </div>
                    
                    <div id="concept5" class="objective-item" style="background: linear-gradient(135deg, rgba(243,150,10,0.1), rgba(243,150,10,0.05)); border-radius: 12px; padding: 20px; cursor: pointer; transition: all 0.3s ease; border: 2px solid transparent;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="objective-icon" style="font-size: 2.5rem;">🔍</div>
                            <div class="objective-content">
                                <h3 style="margin: 0; font-size: 1.2rem; color: #333;">Training Features</h3>
                                <p style="margin: 5px 0 0 0; font-size: 0.9rem; color: #666; line-height: 1.4;">The specific details AI looks at to make predictions</p>
                            </div>
                        </div>
                    </div>
                    
                    <div id="concept6" class="objective-item" style="background: linear-gradient(135deg, rgba(147,51,234,0.1), rgba(147,51,234,0.05)); border-radius: 12px; padding: 20px; cursor: pointer; transition: all 0.3s ease; border: 2px solid transparent;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="objective-icon" style="font-size: 2.5rem;">🚀</div>
                            <div class="objective-content">
                                <h3 style="margin: 0; font-size: 1.2rem; color: #333;">Putting It All Together</h3>
                                <p style="margin: 5px 0 0 0; font-size: 0.9rem; color: #666; line-height: 1.4;">Using gradient descent with training data and features to create a real ML model</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('ip1', 'createInstructionPart1');
    
    // Add interactivity
    setTimeout(() => {
        // Hover effects for concept cards
        const concepts = document.querySelectorAll('.objective-item');
        concepts.forEach((concept, index) => {
            concept.addEventListener('mouseenter', () => {
                concept.style.transform = 'translateY(-5px)';
                concept.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                concept.style.borderColor = ['#ff6347', '#667eea', '#764ba2', '#2dd573', '#f3960a', '#9333ea'][index];
            });
            concept.addEventListener('mouseleave', () => {
                concept.style.transform = 'translateY(0)';
                concept.style.boxShadow = 'none';
                concept.style.borderColor = 'transparent';
            });
        });
    }, 100);
}

function createInstructionPart2() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration" style="padding: 20px; max-width: 1200px; margin: 0 auto;">
                <h1 style="font-size: 2.3rem; margin-bottom: 20px; background: linear-gradient(45deg, #667eea, #764ba2); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Core Concept 1: Loss</h1>
                
                <!-- Reusing concept1 div styling for familiarity -->
                <div style="background: linear-gradient(135deg, rgba(255,99,71,0.1), rgba(255,99,71,0.05)); border-radius: 12px; padding: 25px; margin: 20px auto; max-width: 800px; border: 2px solid #ff6347;">
                    <div style="display: flex; align-items: flex-start; gap: 20px;">
                        <div class="objective-icon" style="font-size: 3rem;">📉</div>
                        <div style="flex: 1;">
                            <h3 style="margin: 0 0 15px 0; font-size: 1.4rem; color: #333;">Loss: How Wrong Your AI Is</h3>
                            <p style="font-size: 1.05rem; color: #555; line-height: 1.6; margin-bottom: 15px;"><strong>Loss</strong> is the most important concept in AI. It's simply a number that tells us how wrong our predictions are.</p>
                            <p style="font-size: 1rem; color: #666; line-height: 1.5;">The goal of AI is always the same: <strong style="color: #ff6347;">minimize the loss</strong> to make better predictions!</p>
                        </div>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin: 30px 0;">
                    <div style="background: rgba(255,255,255,0.5); border-radius: 12px; padding: 20px; text-align: center;">
                        <h3 style="color: #333; margin-bottom: 15px;">🎯 Think: Target Practice</h3>
                        <div style="display: flex; flex-direction: column; gap: 10px; text-align: left;">
                            <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: rgba(45,213,115,0.1); border-radius: 8px;">
                                <span style="font-size: 1.5rem;">🎯</span>
                                <div>
                                    <strong style="color: #2dd573;">Bullseye!</strong>
                                    <div style="font-size: 0.9rem; color: #666;">Loss = 0 (Perfect!)</div>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: rgba(243,150,10,0.1); border-radius: 8px;">
                                <span style="font-size: 1.5rem;">⭕</span>
                                <div>
                                    <strong style="color: #f3960a;">Near center</strong>
                                    <div style="font-size: 0.9rem; color: #666;">Loss = Small number</div>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: rgba(255,99,71,0.1); border-radius: 8px;">
                                <span style="font-size: 1.5rem;">❌</span>
                                <div>
                                    <strong style="color: #ff6347;">Missed completely</strong>
                                    <div style="font-size: 0.9rem; color: #666;">Loss = Big number!</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="background: rgba(255,255,255,0.5); border-radius: 12px; padding: 20px; text-align: center;">
                        <h3 style="color: #333; margin-bottom: 15px;">🤖 In AI Terms</h3>
                        <div style="display: flex; flex-direction: column; gap: 10px; text-align: left;">
                            <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: rgba(45,213,115,0.1); border-radius: 8px;">
                                <span style="font-size: 1.5rem;">✅</span>
                                <div>
                                    <strong style="color: #2dd573;">Predict: 75, Actual: 75</strong>
                                    <div style="font-size: 0.9rem; color: #666;">Loss = 0 (Nailed it!)</div>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: rgba(243,150,10,0.1); border-radius: 8px;">
                                <span style="font-size: 1.5rem;">⚠️</span>
                                <div>
                                    <strong style="color: #f3960a;">Predict: 70, Actual: 75</strong>
                                    <div style="font-size: 0.9rem; color: #666;">Loss = 5 (Pretty close)</div>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: rgba(255,99,71,0.1); border-radius: 8px;">
                                <span style="font-size: 1.5rem;">❌</span>
                                <div>
                                    <strong style="color: #ff6347;">Predict: 50, Actual: 75</strong>
                                    <div style="font-size: 0.9rem; color: #666;">Loss = 25 (Way off!)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style="background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 12px; padding: 20px; color: white; text-align: center; margin: 20px 0;">
                    <h3 style="margin: 0 0 10px 0; font-size: 1.2rem;">🎮 Coming up: Level 1 - Robot Energy Challenge</h3>
                    <p style="margin: 0; font-size: 1rem;">You'll help a robot find its optimal energy level by minimizing loss. Can you get the loss down to zero?</p>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('ip2', 'createInstructionPart2');
}

function createLossQuizPart() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration" style="padding: 20px; max-width: 1200px; margin: 0 auto;">
                <h1 style="font-size: 2.3rem; margin-bottom: 20px; background: linear-gradient(45deg, #667eea, #764ba2); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">✏️ Check Your Understanding: Loss Functions</h1>
                
                <div style="background: linear-gradient(135deg, rgba(255,99,71,0.1), rgba(255,99,71,0.05)); border-radius: 12px; padding: 25px; margin: 20px auto; max-width: 800px; border: 2px solid #ff6347;">
                    <div style="display: flex; align-items: flex-start; gap: 20px;">
                        <div class="objective-icon" style="font-size: 3rem;">🧮</div>
                        <div style="flex: 1;">
                            <h3 style="margin: 0 0 15px 0; font-size: 1.4rem; color: #333;">Quick Quiz: Calculate the Loss!</h3>
                            <p style="font-size: 1.05rem; color: #555; line-height: 1.6;">Different loss functions measure error in different ways.</p>
                            <p style="font-size: 0.95rem; color: #666; line-height: 1.5;">Test your understanding by calculating the loss for these scenarios:</p>
                        </div>
                    </div>
                </div>
                
                <!-- Quiz Questions -->
                <div style="display: grid; gap: 20px; margin: 30px auto; max-width: 800px;">
                    <!-- Question 1: Squared Loss -->
                    <div class="quiz-question" data-question="1" style="background: rgba(255,255,255,0.5); border-radius: 12px; padding: 20px; border: 2px solid #ddd; transition: all 0.3s ease;">
                        <h3 style="color: #333; margin: 0 0 10px 0; font-size: 1.1rem;">Question 1: Squared Loss</h3>
                        <div style="background: rgba(102,126,234,0.1); padding: 10px; border-radius: 6px; margin-bottom: 15px;">
                            <code style="color: #667eea; font-weight: bold;">Loss = (Predicted - Actual)²</code>
                        </div>
                        <p style="font-size: 1rem; color: #555; margin-bottom: 15px;">The robot predicts energy level <strong>70</strong>, but the actual optimal level is <strong>75</strong>.</p>
                        <p style="font-size: 0.95rem; color: #666; margin-bottom: 10px;">What is the loss?</p>
                        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
                            <button class="quiz-option" data-value="5" style="padding: 10px; border-radius: 8px; border: 2px solid #ddd; background: white; cursor: pointer; transition: all 0.2s ease;">5</button>
                            <button class="quiz-option" data-value="25" data-correct="true" style="padding: 10px; border-radius: 8px; border: 2px solid #ddd; background: white; cursor: pointer; transition: all 0.2s ease;">25</button>
                            <button class="quiz-option" data-value="145" style="padding: 10px; border-radius: 8px; border: 2px solid #ddd; background: white; cursor: pointer; transition: all 0.2s ease;">145</button>
                            <button class="quiz-option" data-value="-5" style="padding: 10px; border-radius: 8px; border: 2px solid #ddd; background: white; cursor: pointer; transition: all 0.2s ease;">-5</button>
                        </div>
                        <div class="quiz-feedback" style="margin-top: 10px; padding: 10px; border-radius: 8px; display: none;"></div>
                    </div>
                    
                    <!-- Question 2: Absolute/Linear Loss -->
                    <div class="quiz-question" data-question="2" style="background: rgba(255,255,255,0.5); border-radius: 12px; padding: 20px; border: 2px solid #ddd; transition: all 0.3s ease;">
                        <h3 style="color: #333; margin: 0 0 10px 0; font-size: 1.1rem;">Question 2: Absolute Loss</h3>
                        <div style="background: rgba(118,75,162,0.1); padding: 10px; border-radius: 6px; margin-bottom: 15px;">
                            <code style="color: #764ba2; font-weight: bold;">Loss = |Predicted - Actual|</code>
                        </div>
                        <p style="font-size: 1rem; color: #555; margin-bottom: 15px;">The AI predicts <strong>85</strong>, and the actual value is <strong>100</strong>.</p>
                        <p style="font-size: 0.95rem; color: #666; margin-bottom: 10px;">What is the loss?</p>
                        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
                            <button class="quiz-option" data-value="185" style="padding: 10px; border-radius: 8px; border: 2px solid #ddd; background: white; cursor: pointer; transition: all 0.2s ease;">185</button>
                            <button class="quiz-option" data-value="15" data-correct="true" style="padding: 10px; border-radius: 8px; border: 2px solid #ddd; background: white; cursor: pointer; transition: all 0.2s ease;">15</button>
                            <button class="quiz-option" data-value="225" style="padding: 10px; border-radius: 8px; border: 2px solid #ddd; background: white; cursor: pointer; transition: all 0.2s ease;">225</button>
                            <button class="quiz-option" data-value="-15" style="padding: 10px; border-radius: 8px; border: 2px solid #ddd; background: white; cursor: pointer; transition: all 0.2s ease;">-15</button>
                        </div>
                        <div class="quiz-feedback" style="margin-top: 10px; padding: 10px; border-radius: 8px; display: none;"></div>
                    </div>
                    
                    <!-- Question 3: Custom Function -->
                    <div class="quiz-question" data-question="3" style="background: rgba(255,255,255,0.5); border-radius: 12px; padding: 20px; border: 2px solid #ddd; transition: all 0.3s ease;">
                        <h3 style="color: #333; margin: 0 0 10px 0; font-size: 1.1rem;">Question 3: Custom Loss Function</h3>
                        <div style="background: rgba(243,150,10,0.1); padding: 10px; border-radius: 6px; margin-bottom: 15px;">
                            <code style="color: #f3960a; font-weight: bold;">Loss = 2 × |Predicted - Actual|</code>
                        </div>
                        <p style="font-size: 1rem; color: #555; margin-bottom: 15px;">The model predicts <strong>45</strong>, but the correct answer is <strong>50</strong>.</p>
                        <p style="font-size: 0.95rem; color: #666; margin-bottom: 10px;">What is the loss?</p>
                        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
                            <button class="quiz-option" data-value="5" style="padding: 10px; border-radius: 8px; border: 2px solid #ddd; background: white; cursor: pointer; transition: all 0.2s ease;">5</button>
                            <button class="quiz-option" data-value="10" data-correct="true" style="padding: 10px; border-radius: 8px; border: 2px solid #ddd; background: white; cursor: pointer; transition: all 0.2s ease;">10</button>
                            <button class="quiz-option" data-value="50" style="padding: 10px; border-radius: 8px; border: 2px solid #ddd; background: white; cursor: pointer; transition: all 0.2s ease;">50</button>
                            <button class="quiz-option" data-value="25" style="padding: 10px; border-radius: 8px; border: 2px solid #ddd; background: white; cursor: pointer; transition: all 0.2s ease;">25</button>
                        </div>
                        <div class="quiz-feedback" style="margin-top: 10px; padding: 10px; border-radius: 8px; display: none;"></div>
                    </div>
                </div>
                
                <!-- Completion Status -->
                <div id="concept1" style="background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(102,126,234,0.05)); border-radius: 12px; padding: 20px; margin: 20px auto; max-width: 800px; border: 2px solid #667eea; transition: all 0.5s ease;">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 20px;">
                        <div id="completion-checkmark" style="display: none; font-size: 3rem; color: #2dd573;">✅</div>
                        <div style="text-align: center;">
                            <h3 id="completion-title" style="margin: 0; font-size: 1.2rem; color: #333;">Practice calculating different loss functions</h3>
                            <p id="completion-message" style="margin: 5px 0 0 0; font-size: 0.95rem; color: #666;">Score: <span id="correct-count">0</span> / 3 correct</p>
                        </div>
                    </div>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('ip2b', 'createLossQuizPart');
    
    // Add quiz functionality
    setTimeout(() => {
        // Check if we're still on the quiz page
        const initialCheck = document.getElementById('concept1');
        if (!initialCheck) {
            return; // Page has changed, don't initialize quiz
        }
        
        let correctAnswers = [false, false, false];
        
        // Initialize the display
        const initialCount = document.getElementById('correct-count');
        if (initialCount) {
            initialCount.textContent = '0';
        }
        
        function updateCompletionStatus() {
            const correctCount = correctAnswers.filter(a => a).length;
            
            // Get all elements with null checks
            const countElement = document.getElementById('correct-count');
            const concept1Div = document.getElementById('concept1');
            const checkmark = document.getElementById('completion-checkmark');
            const title = document.getElementById('completion-title');
            const message = document.getElementById('completion-message');
            
            if (!countElement) {
                // Try to update the entire message if we can't find the span
                if (message) {
                    message.innerHTML = `Score: <span id="correct-count">${correctCount}</span> / 3 correct`;
                }
                return;
            }
            
            countElement.textContent = correctCount;
            
            if (correctCount === 3) {
                if (concept1Div) {
                    concept1Div.style.background = 'linear-gradient(135deg, rgba(45,213,115,0.1), rgba(45,213,115,0.05))';
                    concept1Div.style.borderColor = '#2dd573';
                }
                if (checkmark) checkmark.style.display = 'block';
                if (title) title.textContent = 'Perfect! You understand different loss functions!';
                if (message) message.innerHTML = 'All 3 questions correct! Great job!';
            } else if (correctCount === 2) {
                if (concept1Div) {
                    concept1Div.style.background = 'linear-gradient(135deg, rgba(243,150,10,0.1), rgba(243,150,10,0.05))';
                    concept1Div.style.borderColor = '#f3960a';
                }
                if (checkmark) checkmark.style.display = 'none';
                if (title) title.textContent = 'Good work!';
                if (message) message.innerHTML = `Score: <span id="correct-count">${correctCount}</span> / 3 correct`;
            } else if (correctCount === 1) {
                if (concept1Div) {
                    concept1Div.style.background = 'linear-gradient(135deg, rgba(102,126,234,0.1), rgba(102,126,234,0.05))';
                    concept1Div.style.borderColor = '#667eea';
                }
                if (checkmark) checkmark.style.display = 'none';
                if (title) title.textContent = 'Keep practicing!';
                if (message) message.innerHTML = `Score: <span id="correct-count">${correctCount}</span> / 3 correct`;
            } else {
                if (concept1Div) {
                    concept1Div.style.background = 'linear-gradient(135deg, rgba(102,126,234,0.1), rgba(102,126,234,0.05))';
                    concept1Div.style.borderColor = '#667eea';
                }
                if (checkmark) checkmark.style.display = 'none';
                if (title) title.textContent = 'Practice calculating different loss functions';
                if (message) message.innerHTML = `Score: <span id="correct-count">${correctCount}</span> / 3 correct`;
            }
        }
        
        // Add click handlers to all quiz options
        const questions = document.querySelectorAll('.quiz-question');
        
        for (let i = 0; i < questions.length; i++) {
            (function(qIndex) {
                const question = questions[qIndex];
                const options = question.querySelectorAll('.quiz-option');
                const feedback = question.querySelector('.quiz-feedback');
                
                options.forEach(option => {
                // Add hover effects
                option.addEventListener('mouseenter', () => {
                    if (!option.style.background || option.style.background === 'white' || option.style.background === 'rgb(255, 255, 255)') {
                        option.style.background = '#f0f0f0';
                        option.style.cursor = 'pointer';
                    }
                });
                option.addEventListener('mouseleave', () => {
                    if (option.style.background === '#f0f0f0' || option.style.background === 'rgb(240, 240, 240)') {
                        option.style.background = 'white';
                    }
                });
                
                option.addEventListener('click', () => {
                    // Reset all options in this question
                    options.forEach(opt => {
                        opt.style.background = 'white';
                        opt.style.borderColor = '#ddd';
                        opt.style.color = '#333';
                        opt.style.cursor = 'pointer';
                    });
                    
                    // Check if answer is correct
                    if (option.getAttribute('data-correct') === 'true') {
                        option.style.background = '#2dd573';
                        option.style.borderColor = '#2dd573';
                        option.style.color = 'white';
                        option.style.cursor = 'default';
                        question.style.borderColor = '#2dd573';
                        feedback.style.display = 'block';
                        feedback.style.background = 'rgba(45,213,115,0.1)';
                        feedback.style.color = '#2dd573';
                        feedback.innerHTML = '✓ Correct! ' + getExplanation(qIndex + 1, true);
                        correctAnswers[qIndex] = true;
                    } else {
                        option.style.background = '#ff6347';
                        option.style.borderColor = '#ff6347';
                        option.style.color = 'white';
                        option.style.cursor = 'default';
                        question.style.borderColor = '#ff6347';
                        feedback.style.display = 'block';
                        feedback.style.background = 'rgba(255,99,71,0.1)';
                        feedback.style.color = '#ff6347';
                        feedback.innerHTML = '✗ Not quite. ' + getExplanation(qIndex + 1, false);
                        correctAnswers[qIndex] = false;
                    }
                    
                    updateCompletionStatus();
                });
            });
            })(i);
        }
        
        function getExplanation(questionNum, isCorrect) {
            const explanations = {
                1: {
                    correct: 'Loss = (70 - 75)² = (-5)² = 25',
                    incorrect: 'Remember to square the difference: Loss = (70 - 75)² = (-5)² = 25'
                },
                2: {
                    correct: 'Loss = |85 - 100| = |-15| = 15',
                    incorrect: 'For absolute loss, take the absolute value: Loss = |85 - 100| = |-15| = 15'
                },
                3: {
                    correct: 'Loss = 2 × |45 - 50| = 2 × 5 = 10',
                    incorrect: 'Apply the formula: Loss = 2 × |45 - 50| = 2 × |-5| = 2 × 5 = 10'
                }
            };
            return explanations[questionNum][isCorrect ? 'correct' : 'incorrect'];
        }
    }, 100);
}

function createInstructionPart3() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration" style="padding: 20px; max-width: 1200px; margin: 0 auto;">
                <h1 style="font-size: 2.3rem; margin-bottom: 20px; background: linear-gradient(45deg, #667eea, #764ba2); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">⚡ Introducing Gradient Descent</h1>
                
                <!-- Reusing concept2 div styling for familiarity -->
                <div style="background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(102,126,234,0.05)); border-radius: 12px; padding: 25px; margin: 20px auto; max-width: 800px; border: 2px solid #667eea;">
                    <div style="display: flex; align-items: flex-start; gap: 20px;">
                        <div class="objective-icon" style="font-size: 3rem;">⚡</div>
                        <div style="flex: 1;">
                            <h3 style="margin: 0 0 15px 0; font-size: 1.4rem; color: #333;">Gradient Descent: AI's Automatic Optimizer</h3>
                            <p style="font-size: 1.05rem; color: #555; line-height: 1.6; margin-bottom: 15px;">Great job manually finding the optimal energy! But what if <strong>AI could do this automatically?</strong></p>
                            <p style="font-size: 1rem; color: #666; line-height: 1.5;">That's exactly what <strong style="color: #667eea;">gradient descent</strong> does - it's an algorithm that automatically finds the values that minimize loss!</p>
                        </div>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin: 30px 0;">
                    <div style="background: rgba(255,255,255,0.5); border-radius: 12px; padding: 20px;">
                        <h3 style="color: #333; margin-bottom: 15px; text-align: center;">🔄 How It Works</h3>
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            <div style="display: flex; align-items: center; gap: 15px; padding: 10px; background: rgba(102,126,234,0.1); border-radius: 8px;">
                                <span style="background: #667eea; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">1</span>
                                <div style="flex: 1;">
                                    <strong style="color: #333;">Check the loss</strong>
                                    <div style="font-size: 0.85rem; color: #666;">How wrong are we?</div>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 15px; padding: 10px; background: rgba(102,126,234,0.1); border-radius: 8px;">
                                <span style="background: #667eea; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">2</span>
                                <div style="flex: 1;">
                                    <strong style="color: #333;">Calculate direction</strong>
                                    <div style="font-size: 0.85rem; color: #666;">Should we go up or down?</div>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 15px; padding: 10px; background: rgba(102,126,234,0.1); border-radius: 8px;">
                                <span style="background: #667eea; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">3</span>
                                <div style="flex: 1;">
                                    <strong style="color: #333;">Take a step</strong>
                                    <div style="font-size: 0.85rem; color: #666;">Move to reduce loss</div>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 15px; padding: 10px; background: rgba(102,126,234,0.1); border-radius: 8px;">
                                <span style="background: #667eea; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">4</span>
                                <div style="flex: 1;">
                                    <strong style="color: #333;">Repeat until optimal</strong>
                                    <div style="font-size: 0.85rem; color: #666;">Keep going until loss = 0</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="background: rgba(255,255,255,0.5); border-radius: 12px; padding: 20px;">
                        <h3 style="color: #333; margin-bottom: 15px; text-align: center;">🎯 Manual vs Automatic</h3>
                        <div style="display: flex; flex-direction: column; gap: 15px;">
                            <div style="padding: 15px; background: rgba(255,99,71,0.1); border-radius: 8px; border-left: 4px solid #ff6347;">
                                <strong style="color: #ff6347;">👨‍💻 Level 1: Manual</strong>
                                <div style="font-size: 0.9rem; color: #666; margin-top: 5px;">You moved the slider by hand</div>
                                <div style="font-size: 0.85rem; color: #888; margin-top: 3px;">Trial and error, using hints</div>
                            </div>
                            <div style="text-align: center; font-size: 1.5rem; color: #667eea;">↓</div>
                            <div style="padding: 15px; background: rgba(102,126,234,0.1); border-radius: 8px; border-left: 4px solid #667eea;">
                                <strong style="color: #667eea;">🤖 Level 2: Gradient Descent</strong>
                                <div style="font-size: 0.9rem; color: #666; margin-top: 5px;">AI moves the slider itself</div>
                                <div style="font-size: 0.85rem; color: #888; margin-top: 3px;">Mathematical optimization, no hints needed!</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style="background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 12px; padding: 20px; color: white; text-align: center; margin: 20px 0;">
                    <h3 style="margin: 0 0 10px 0; font-size: 1.2rem;">🎮 Coming up: Level 2 - Watch AI in Action!</h3>
                    <p style="margin: 0; font-size: 1rem;">See gradient descent automatically find the optimal solution. No manual tuning required!</p>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('ip3', 'createInstructionPart3');
    
    // Add subtle animations
    setTimeout(() => {
        const steps = document.querySelectorAll('[style*="background: #667eea"]');
        steps.forEach((step, index) => {
            setTimeout(() => {
                step.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    step.style.transform = 'scale(1)';
                }, 200);
            }, index * 300);
        });
    }, 500);
}

function createInstructionPart4() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration" style="padding: 12px; max-width: 1100px; margin: 0 auto;">
                <h1 style="font-size: 1.8rem; margin-bottom: 12px; background: linear-gradient(45deg, #667eea, #764ba2); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">🔢 Multiple Variables</h1>
                
                <!-- Main concept card -->
                <div style="background: linear-gradient(135deg, rgba(118,75,162,0.1), rgba(118,75,162,0.05)); border-radius: 10px; padding: 15px; margin: 12px auto; max-width: 750px; border: 2px solid #764ba2;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div class="objective-icon" style="font-size: 2rem;">🎯</div>
                        <div style="flex: 1;">
                            <h3 style="margin: 0 0 8px 0; font-size: 1.1rem; color: #333;">Real AI Uses Many Variables</h3>
                            <p style="font-size: 0.9rem; color: #555; line-height: 1.4; margin: 0;">You've mastered <strong>one variable</strong>. But real AI has <strong style="color: #764ba2;">millions</strong> of variables!</p>
                        </div>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 15px 0;">
                    <div style="background: rgba(255,255,255,0.5); border-radius: 8px; padding: 12px;">
                        <h3 style="color: #333; margin: 0 0 8px 0; text-align: center; font-size: 1rem;">🌐 Real Examples</h3>
                        <div style="display: flex; flex-direction: column; gap: 6px;">
                            <div style="padding: 6px; background: rgba(102,126,234,0.1); border-radius: 5px; display: flex; align-items: center; gap: 8px;">
                                <span style="font-size: 1.2rem;">🖼️</span>
                                <div style="flex: 1;">
                                    <strong style="color: #667eea; font-size: 0.85rem;">Images</strong>
                                    <div style="font-size: 0.7rem; color: #666;">1M pixels = 1M vars</div>
                                </div>
                            </div>
                            <div style="padding: 6px; background: rgba(118,75,162,0.1); border-radius: 5px; display: flex; align-items: center; gap: 8px;">
                                <span style="font-size: 1.2rem;">💬</span>
                                <div style="flex: 1;">
                                    <strong style="color: #764ba2; font-size: 0.85rem;">ChatGPT</strong>
                                    <div style="font-size: 0.7rem; color: #666;">175B parameters!</div>
                                </div>
                            </div>
                            <div style="padding: 6px; background: rgba(243,150,10,0.1); border-radius: 5px; display: flex; align-items: center; gap: 8px;">
                                <span style="font-size: 1.2rem;">🚗</span>
                                <div style="flex: 1;">
                                    <strong style="color: #f3960a; font-size: 0.85rem;">Self-Driving</strong>
                                    <div style="font-size: 0.7rem; color: #666;">Speed, steering, braking</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="background: rgba(255,255,255,0.5); border-radius: 8px; padding: 12px;">
                        <h3 style="color: #333; margin: 0 0 8px 0; text-align: center; font-size: 1rem;">🧙‍♀️ Next: 2 Variables</h3>
                        <div style="text-align: center; padding: 10px;">
                            <div style="font-size: 2rem; margin-bottom: 5px;">🧪</div>
                            <h4 style="color: #764ba2; margin: 5px 0; font-size: 0.9rem;">Magic Potion</h4>
                            <p style="color: #666; font-size: 0.8rem; margin: 5px 0;">Balance <strong>TWO</strong> ingredients!</p>
                            <div style="margin-top: 10px; display: flex; justify-content: center; gap: 12px; align-items: center;">
                                <div style="background: #ffd700; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.8rem;">Y</div>
                                <div style="font-size: 1rem;">+</div>
                                <div style="background: #4169e1; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; color: white; font-size: 0.8rem;">B</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style="background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 8px; padding: 12px; color: white; text-align: center; margin: 12px 0;">
                    <p style="margin: 0; font-size: 0.85rem;"><strong>The magic:</strong> Gradient descent optimizes ALL variables at once!</p>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('ip4', 'createInstructionPart4');
}

function createInstructionPart5() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration" style="padding: 20px; max-width: 1200px; margin: 0 auto;">
                <h1 style="font-size: 2.3rem; margin-bottom: 20px; background: linear-gradient(45deg, #667eea, #764ba2); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">⚡ Gradient Descent Scales Up!</h1>
                
                <!-- Main insight card -->
                <div style="background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(102,126,234,0.05)); border-radius: 12px; padding: 25px; margin: 20px auto; max-width: 800px; border: 2px solid #667eea;">
                    <div style="display: flex; align-items: flex-start; gap: 20px;">
                        <div class="objective-icon" style="font-size: 3rem;">🤯</div>
                        <div style="flex: 1;">
                            <h3 style="margin: 0 0 15px 0; font-size: 1.4rem; color: #333;">The Same Algorithm Works Everywhere!</h3>
                            <p style="font-size: 1.05rem; color: #555; line-height: 1.6;">Amazing news: <strong style="color: #667eea;">Gradient descent works on multiple variables too!</strong> Whether it's 1 variable or 1 billion, the same algorithm can optimize them all simultaneously.</p>
                        </div>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin: 30px 0;">
                    <div style="background: rgba(255,255,255,0.5); border-radius: 12px; padding: 20px; text-align: center;">
                        <div style="font-size: 2.5rem; margin-bottom: 10px;">🤖</div>
                        <h4 style="color: #333; margin: 10px 0;">1 Variable</h4>
                        <p style="color: #666; font-size: 0.9rem;">Energy → Loss<br><em>What you just did</em></p>
                    </div>
                    
                    <div style="background: rgba(255,255,255,0.5); border-radius: 12px; padding: 20px; text-align: center;">
                        <div style="font-size: 2.5rem; margin-bottom: 10px;">🧪</div>
                        <h4 style="color: #667eea; margin: 10px 0;">6 Variables</h4>
                        <p style="color: #666; font-size: 0.9rem;">Six ingredients → Loss<br><em>Coming up next!</em></p>
                    </div>
                    
                    <div style="background: rgba(255,255,255,0.5); border-radius: 12px; padding: 20px; text-align: center;">
                        <div style="font-size: 2.5rem; margin-bottom: 10px;">💬</div>
                        <h4 style="color: #764ba2; margin: 10px 0;">175B Variables</h4>
                        <p style="color: #666; font-size: 0.9rem;">ChatGPT's parameters<br><em>Same algorithm!</em></p>
                    </div>
                </div>
                
                <div style="background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 12px; padding: 20px; color: white; text-align: center; margin: 20px 0;">
                    <h3 style="margin: 0 0 10px 0; font-size: 1.2rem;">🎮 Level 4: Watch the Magic</h3>
                    <p style="margin: 0; font-size: 1rem;">See gradient descent automatically balance SIX potion ingredients at once!</p>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('ip5', 'createInstructionPart5');
}

function createInstructionPart6() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration" style="padding: 15px; max-width: 1200px; margin: 0 auto;">
                <h1 style="font-size: 2rem; margin-bottom: 15px; background: linear-gradient(45deg, #667eea, #764ba2); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">🔬 How Gradient Descent Works</h1>
                
                <!-- Reusing concept2 div styling for consistency -->
                <div id="concept2" style="background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(102,126,234,0.05)); border-radius: 12px; padding: 20px; margin: 15px auto; max-width: 800px; border: 2px solid #667eea;">
                    <div style="display: flex; align-items: flex-start; gap: 15px;">
                        <div class="objective-icon" style="font-size: 2.5rem;">⚡</div>
                        <div style="flex: 1;">
                            <h3 style="margin: 0 0 10px 0; font-size: 1.2rem; color: #333;">The Algorithm Behind the Magic</h3>
                            <p style="font-size: 0.95rem; color: #555; line-height: 1.5;">We've seen that <strong>gradient descent is a tool for minimizing loss</strong>, but how does it work more specifically? It uses <strong style="color: #667eea;">mathematical slopes</strong> to find the fastest path downhill!</p>
                        </div>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
                    <!-- Hill Climbing Analogy -->
                    <div style="background: rgba(255,255,255,0.5); border-radius: 10px; padding: 15px;">
                        <h3 style="color: #333; margin: 0 0 10px 0; font-size: 1.1rem; text-align: center;">⛰️ Like Rolling Downhill</h3>
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: rgba(255,99,71,0.1); border-radius: 6px;">
                                <span style="font-size: 1.3rem;">↗️</span>
                                <div>
                                    <strong style="color: #ff6347; font-size: 0.9rem;">Upward slope</strong>
                                    <div style="font-size: 0.8rem; color: #666;">Go left ← (decrease)</div>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: rgba(102,126,234,0.1); border-radius: 6px;">
                                <span style="font-size: 1.3rem;">↘️</span>
                                <div>
                                    <strong style="color: #667eea; font-size: 0.9rem;">Downward slope</strong>
                                    <div style="font-size: 0.8rem; color: #666;">Go right → (increase)</div>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: rgba(45,213,115,0.1); border-radius: 6px;">
                                <span style="font-size: 1.3rem;">➡️</span>
                                <div>
                                    <strong style="color: #2dd573; font-size: 0.9rem;">Flat (no slope)</strong>
                                    <div style="font-size: 0.8rem; color: #666;">Found minimum! ✓</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- The Formula -->
                    <div style="background: rgba(255,255,255,0.5); border-radius: 10px; padding: 15px;">
                        <h3 style="color: #333; margin: 0 0 10px 0; font-size: 1.1rem; text-align: center;">🧮 The Math Formula</h3>
                        <div style="background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 8px; padding: 12px; color: white; text-align: center; margin-bottom: 10px;">
                            <div style="font-size: 0.95rem; font-weight: bold;">New = Old - (LR × Gradient)</div>
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            <div style="padding: 8px; background: rgba(102,126,234,0.05); border-radius: 6px; border-left: 3px solid #667eea;">
                                <strong style="color: #667eea; font-size: 0.85rem;">Gradient</strong>
                                <div style="font-size: 0.8rem; color: #666;">The slope (which way)</div>
                            </div>
                            <div style="padding: 8px; background: rgba(118,75,162,0.05); border-radius: 6px; border-left: 3px solid #764ba2;">
                                <strong style="color: #764ba2; font-size: 0.85rem;">Learning Rate (LR)</strong>
                                <div style="font-size: 0.8rem; color: #666;">Step size (how far)</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Learning Rate Preview -->
                <div style="background: rgba(255,255,255,0.5); border-radius: 10px; padding: 15px; margin: 15px 0;">
                    <h3 style="color: #333; margin: 0 0 10px 0; font-size: 1.1rem; text-align: center;">👣 Step Size Matters!</h3>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
                        <div style="text-align: center; padding: 10px; background: rgba(255,99,71,0.1); border-radius: 8px;">
                            <div style="font-size: 1.8rem;">🐌</div>
                            <strong style="color: #ff6347; font-size: 0.9rem;">Tiny (0.01)</strong>
                            <div style="font-size: 0.75rem; color: #666; margin-top: 3px;">Safe but slooow</div>
                        </div>
                        <div style="text-align: center; padding: 10px; background: rgba(102,126,234,0.1); border-radius: 8px;">
                            <div style="font-size: 1.8rem;">🚶</div>
                            <strong style="color: #667eea; font-size: 0.9rem;">Medium (0.1)</strong>
                            <div style="font-size: 0.75rem; color: #666; margin-top: 3px;">Just right!</div>
                        </div>
                        <div style="text-align: center; padding: 10px; background: rgba(118,75,162,0.1); border-radius: 8px;">
                            <div style="font-size: 1.8rem;">🏃</div>
                            <strong style="color: #764ba2; font-size: 0.9rem;">Large (1.0)</strong>
                            <div style="font-size: 0.75rem; color: #666; margin-top: 3px;">Fast but risky</div>
                        </div>
                    </div>
                </div>
                
                <div style="background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 10px; padding: 15px; color: white; text-align: center; margin: 15px 0;">
                    <h3 style="margin: 0 0 8px 0; font-size: 1.1rem;">📈 Coming up: Interactive Deep Dive!</h3>
                    <p style="margin: 0; font-size: 0.9rem;">Get hands-on with functions, see gradients in action, and experiment with different learning rates!</p>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('ip6', 'createInstructionPart6');
    
    // Add subtle hover animation for the formula
    setTimeout(() => {
        const formulaBox = document.querySelector('[style*="New = Old"]')?.parentElement;
        if (formulaBox) {
            formulaBox.addEventListener('mouseenter', () => {
                formulaBox.style.transform = 'scale(1.05)';
                formulaBox.style.transition = 'transform 0.2s ease';
            });
            formulaBox.addEventListener('mouseleave', () => {
                formulaBox.style.transform = 'scale(1)';
            });
        }
    }, 100);
}

function createInstructionPart8() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration" style="padding: 20px; max-width: 1200px; margin: 0 auto;">
                <h1 style="font-size: 2.3rem; margin-bottom: 20px; background: linear-gradient(45deg, #667eea, #764ba2); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">📊 Introduction to Training Data</h1>
                
                <!-- Main concept card -->
                <div style="background: linear-gradient(135deg, rgba(45,213,115,0.1), rgba(45,213,115,0.05)); border-radius: 12px; padding: 25px; margin: 20px auto; max-width: 800px; border: 2px solid #2dd573;">
                    <div style="display: flex; align-items: flex-start; gap: 20px;">
                        <div class="objective-icon" style="font-size: 3rem;">💡</div>
                        <div style="flex: 1;">
                            <h3 style="margin: 0 0 15px 0; font-size: 1.4rem; color: #333;">The Missing Piece: Examples!</h3>
                            <p style="font-size: 1.05rem; color: #555; line-height: 1.6; margin-bottom: 15px;">You've learned how gradient descent finds optimal values, but <strong>how does AI know what the right answer should be?</strong></p>
                            <p style="font-size: 1rem; color: #666; line-height: 1.5;">That's where <strong style="color: #2dd573;">training data</strong> comes in - real examples that show the AI what correct looks like!</p>
                        </div>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin: 30px 0;">
                    <!-- Without Training Data -->
                    <div style="background: rgba(255,255,255,0.5); border-radius: 12px; padding: 20px;">
                        <h3 style="color: #ff6347; margin-bottom: 15px; text-align: center;">❌ Without Training Data</h3>
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            <div style="display: flex; align-items: center; gap: 15px; padding: 10px; background: rgba(255,99,71,0.1); border-radius: 8px;">
                                <span style="font-size: 1.5rem;">🤷</span>
                                <div style="flex: 1;">
                                    <strong style="color: #333;">Just Guessing</strong>
                                    <div style="font-size: 0.85rem; color: #666;">No idea what's right</div>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 15px; padding: 10px; background: rgba(255,99,71,0.1); border-radius: 8px;">
                                <span style="font-size: 1.5rem;">🎲</span>
                                <div style="flex: 1;">
                                    <strong style="color: #333;">Random Attempts</strong>
                                    <div style="font-size: 0.85rem; color: #666;">Hope to get lucky</div>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 15px; padding: 10px; background: rgba(255,99,71,0.1); border-radius: 8px;">
                                <span style="font-size: 1.5rem;">😕</span>
                                <div style="flex: 1;">
                                    <strong style="color: #333;">No Learning</strong>
                                    <div style="font-size: 0.85rem; color: #666;">Can't improve systematically</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- With Training Data -->
                    <div style="background: rgba(255,255,255,0.5); border-radius: 12px; padding: 20px;">
                        <h3 style="color: #2dd573; margin-bottom: 15px; text-align: center;">✅ With Training Data</h3>
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            <div style="display: flex; align-items: center; gap: 15px; padding: 10px; background: rgba(45,213,115,0.1); border-radius: 8px;">
                                <span style="font-size: 1.5rem;">📚</span>
                                <div style="flex: 1;">
                                    <strong style="color: #333;">Learn from Examples</strong>
                                    <div style="font-size: 0.85rem; color: #666;">See what worked before</div>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 15px; padding: 10px; background: rgba(45,213,115,0.1); border-radius: 8px;">
                                <span style="font-size: 1.5rem;">🎯</span>
                                <div style="flex: 1;">
                                    <strong style="color: #333;">Find Patterns</strong>
                                    <div style="font-size: 0.85rem; color: #666;">Discover what matters</div>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 15px; padding: 10px; background: rgba(45,213,115,0.1); border-radius: 8px;">
                                <span style="font-size: 1.5rem;">📈</span>
                                <div style="flex: 1;">
                                    <strong style="color: #333;">Make Predictions</strong>
                                    <div style="font-size: 0.85rem; color: #666;">Apply learned patterns</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Real World Examples -->
                <div style="background: rgba(255,255,255,0.5); border-radius: 12px; padding: 20px; margin: 20px 0;">
                    <h3 style="color: #333; margin-bottom: 15px; text-align: center; font-size: 1.2rem;">🌍 Real-World Training Data</h3>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
                        <div style="text-align: center; padding: 15px; background: rgba(102,126,234,0.1); border-radius: 8px;">
                            <div style="font-size: 2rem; margin-bottom: 8px;">📧</div>
                            <strong style="color: #667eea; font-size: 0.95rem;">Spam Detection</strong>
                            <div style="font-size: 0.8rem; color: #666; margin-top: 5px;">1000s of labeled emails<br>(spam vs not spam)</div>
                        </div>
                        <div style="text-align: center; padding: 15px; background: rgba(118,75,162,0.1); border-radius: 8px;">
                            <div style="font-size: 2rem; margin-bottom: 8px;">🖼️</div>
                            <strong style="color: #764ba2; font-size: 0.95rem;">Image Recognition</strong>
                            <div style="font-size: 0.8rem; color: #666; margin-top: 5px;">Millions of photos<br>(cat, dog, car, etc.)</div>
                        </div>
                        <div style="text-align: center; padding: 15px; background: rgba(243,150,10,0.1); border-radius: 8px;">
                            <div style="font-size: 2rem; margin-bottom: 8px;">🎬</div>
                            <strong style="color: #f3960a; font-size: 0.95rem;">Netflix Recommendations</strong>
                            <div style="font-size: 0.8rem; color: #666; margin-top: 5px;">Your watch history<br>(likes & dislikes)</div>
                        </div>
                    </div>
                </div>
                
                <!-- Coming Up Next -->
                <div style="background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 12px; padding: 20px; color: white; text-align: center; margin: 20px 0;">
                    <h3 style="margin: 0 0 10px 0; font-size: 1.2rem;">🐕 Coming up: Max Needs Your Help!</h3>
                    <p style="margin: 0 0 10px 0; font-size: 1rem;">You'll help a dog named Max find his perfect bone size.</p>
                    <div style="display: flex; justify-content: center; gap: 30px; align-items: center; margin-top: 15px;">
                        <div style="text-align: center;">
                            <div style="font-size: 1.8rem; margin-bottom: 5px;">🤔</div>
                            <div style="font-size: 0.9rem;">First: Guess blindly</div>
                        </div>
                        <div style="font-size: 1.5rem;">→</div>
                        <div style="text-align: center;">
                            <div style="font-size: 1.8rem; margin-bottom: 5px;">📊</div>
                            <div style="font-size: 0.9rem;">Then: Use training data!</div>
                        </div>
                        <div style="font-size: 1.5rem;">→</div>
                        <div style="text-align: center;">
                            <div style="font-size: 1.8rem; margin-bottom: 5px;">🎯</div>
                            <div style="font-size: 0.9rem;">Success!</div>
                        </div>
                    </div>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('ip8', 'createInstructionPart8');
    
    // Add subtle animations
    setTimeout(() => {
        const cards = document.querySelectorAll('[style*="background: rgba"]');
        cards.forEach((card, index) => {
            card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-3px)';
                card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = 'none';
            });
        });
    }, 100);
}

function createInstructionPart7() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration" style="padding: 20px; max-width: 1200px; margin: 0 auto;">
                <h1 style="font-size: 2.3rem; margin-bottom: 20px; background: linear-gradient(45deg, #667eea, #764ba2); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">🎯 Progress Check & What's Next</h1>
                
                <div class="learning-objectives" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 30px 0;">
                    <!-- Completed concepts with checkmarks -->
                    <div id="concept1" class="objective-item completed" style="background: linear-gradient(135deg, rgba(45,213,115,0.1), rgba(45,213,115,0.05)); border-radius: 12px; padding: 20px; cursor: pointer; transition: all 0.3s ease; border: 2px solid #2dd573; position: relative;">
                        <div style="position: absolute; top: 10px; right: 10px; background: #2dd573; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
                            <span style="color: white; font-weight: bold;">✓</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="objective-icon" style="font-size: 2.5rem;">📉</div>
                            <div class="objective-content">
                                <h3 style="margin: 0; font-size: 1.2rem; color: #333;">Loss ✅</h3>
                                <p style="margin: 5px 0 0 0; font-size: 0.9rem; color: #666; line-height: 1.4;">You mastered measuring how wrong predictions are</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Gradient Descent - partially complete (yellowish) -->
                    <div id="concept2" class="objective-item in-progress" style="background: linear-gradient(135deg, rgba(243,150,10,0.1), rgba(243,150,10,0.05)); border-radius: 12px; padding: 20px; cursor: pointer; transition: all 0.3s ease; border: 2px solid #f3960a; position: relative;">
                        <div style="position: absolute; top: 10px; right: 10px; background: #f3960a; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
                            <span style="color: white; font-weight: bold;">~</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="objective-icon" style="font-size: 2.5rem;">⚡</div>
                            <div class="objective-content">
                                <h3 style="margin: 0; font-size: 1.2rem; color: #333;">Gradient Descent <span style="color: #f3960a;">⚡</span></h3>
                                <p style="margin: 5px 0 0 0; font-size: 0.9rem; color: #666; line-height: 1.4;">Good progress! Still more to learn about optimization</p>
                            </div>
                        </div>
                    </div>
                    
                    <div id="concept3" class="objective-item completed" style="background: linear-gradient(135deg, rgba(45,213,115,0.1), rgba(45,213,115,0.05)); border-radius: 12px; padding: 20px; cursor: pointer; transition: all 0.3s ease; border: 2px solid #2dd573; position: relative;">
                        <div style="position: absolute; top: 10px; right: 10px; background: #2dd573; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
                            <span style="color: white; font-weight: bold;">✓</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="objective-icon" style="font-size: 2.5rem;">👣</div>
                            <div class="objective-content">
                                <h3 style="margin: 0; font-size: 1.2rem; color: #333;">Step Sizes & Learning Rate ✅</h3>
                                <p style="margin: 5px 0 0 0; font-size: 0.9rem; color: #666; line-height: 1.4;">You experimented with different learning speeds</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Training Data - now completed! -->
                    <div id="concept4" class="objective-item completed" style="background: linear-gradient(135deg, rgba(45,213,115,0.1), rgba(45,213,115,0.05)); border-radius: 12px; padding: 20px; cursor: pointer; transition: all 0.3s ease; border: 2px solid #2dd573; position: relative;">
                        <div style="position: absolute; top: 10px; right: 10px; background: #2dd573; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
                            <span style="color: white; font-weight: bold;">✓</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="objective-icon" style="font-size: 2.5rem;">📊</div>
                            <div class="objective-content">
                                <h3 style="margin: 0; font-size: 1.2rem; color: #333;">Training Data ✅</h3>
                                <p style="margin: 5px 0 0 0; font-size: 0.9rem; color: #666; line-height: 1.4;">You used examples to make better predictions!</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Upcoming concepts -->
                    <div id="concept5" class="objective-item upcoming" style="background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(102,126,234,0.05)); border-radius: 12px; padding: 20px; cursor: pointer; transition: all 0.3s ease; border: 2px solid transparent;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="objective-icon" style="font-size: 2.5rem; opacity: 0.7;">🔍</div>
                            <div class="objective-content">
                                <h3 style="margin: 0; font-size: 1.2rem; color: #667eea;">Training Features <span style="color: #f3960a;">→ Next!</span></h3>
                                <p style="margin: 5px 0 0 0; font-size: 0.9rem; color: #666; line-height: 1.4;">The inputs AI uses to make predictions</p>
                            </div>
                        </div>
                    </div>
                    
                    <div id="concept6" class="objective-item upcoming" style="background: linear-gradient(135deg, rgba(147,51,234,0.05), rgba(147,51,234,0.02)); border-radius: 12px; padding: 20px; cursor: pointer; transition: all 0.3s ease; border: 2px solid transparent; opacity: 0.8;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="objective-icon" style="font-size: 2.5rem; opacity: 0.6;">🚀</div>
                            <div class="objective-content">
                                <h3 style="margin: 0; font-size: 1.2rem; color: #888;">Complete ML Model</h3>
                                <p style="margin: 5px 0 0 0; font-size: 0.9rem; color: #888; line-height: 1.4;">Combining everything into a real AI system</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Progress summary -->
                <div style="background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 12px; padding: 20px; color: white; text-align: center; margin: 20px 0;">
                    <h3 style="margin: 0 0 10px 0; font-size: 1.2rem;">🎓 You're Making Great Progress!</h3>
                    <div style="display: flex; align-items: center; gap: 10px; justify-content: center; margin: 15px 0;">
                        <div style="background: white; height: 10px; border-radius: 5px; flex: 1; max-width: 400px;">
                            <div style="background: linear-gradient(to right, #2dd573 0%, #2dd573 55%, #f3960a 55%, #f3960a 65%, #ddd 65%); height: 100%; border-radius: 5px;"></div>
                        </div>
                        <span style="font-size: 1rem;">4.5 of 6 concepts learned</span>
                    </div>
                    <p style="margin: 10px 0 0 0; font-size: 1rem;">Excellent! You've learned the core concepts and are ready for advanced topics.</p>
                </div>
                
                <!-- Note about gradient descent -->
                <div style="background: linear-gradient(135deg, rgba(243,150,10,0.1), rgba(243,150,10,0.05)); border-radius: 12px; padding: 20px; margin: 20px auto; max-width: 800px; border: 2px solid #f3960a;">
                    <div style="display: flex; align-items: flex-start; gap: 20px;">
                        <div style="font-size: 2.5rem;">⚡</div>
                        <div style="flex: 1;">
                            <h3 style="margin: 0 0 10px 0; font-size: 1.2rem; color: #333;">A Note on Gradient Descent</h3>
                            <p style="font-size: 1rem; color: #555; line-height: 1.5; margin-bottom: 8px;">You've got a solid understanding of how gradient descent works, but there's still more to explore!</p>
                            <p style="font-size: 0.95rem; color: #666; line-height: 1.4;">Coming up, you'll see how gradient descent combines with training data and features to create powerful AI models that can learn complex patterns.</p>
                        </div>
                    </div>
                </div>
                
                <!-- What's immediately next -->
                <div style="background: rgba(255,255,255,0.5); border-radius: 12px; padding: 25px; margin: 20px auto; max-width: 800px; border: 2px solid #667eea;">
                    <div style="display: flex; align-items: flex-start; gap: 20px;">
                        <div style="font-size: 3rem;">🔍</div>
                        <div style="flex: 1;">
                            <h3 style="margin: 0 0 15px 0; font-size: 1.4rem; color: #333;">Up Next: Training Features</h3>
                            <p style="font-size: 1.05rem; color: #555; line-height: 1.6; margin-bottom: 10px;"><strong>Great job helping Max find his perfect bone!</strong></p>
                            <p style="font-size: 1rem; color: #666; line-height: 1.5;">Now you'll learn how AI identifies what features to look at in the data. This is crucial for making accurate predictions in complex real-world scenarios!</p>
                        </div>
                    </div>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('ip7', 'createInstructionPart7');
    
    // Add interactivity
    setTimeout(() => {
        // Hover effects for concept cards
        const concepts = document.querySelectorAll('.objective-item');
        concepts.forEach((concept) => {
            if (concept.classList.contains('completed')) {
                concept.addEventListener('mouseenter', () => {
                    concept.style.transform = 'translateY(-5px)';
                    concept.style.boxShadow = '0 5px 15px rgba(45,213,115,0.2)';
                });
                concept.addEventListener('mouseleave', () => {
                    concept.style.transform = 'translateY(0)';
                    concept.style.boxShadow = 'none';
                });
            } else if (concept.classList.contains('in-progress')) {
                concept.addEventListener('mouseenter', () => {
                    concept.style.transform = 'translateY(-5px)';
                    concept.style.boxShadow = '0 5px 15px rgba(243,150,10,0.2)';
                });
                concept.addEventListener('mouseleave', () => {
                    concept.style.transform = 'translateY(0)';
                    concept.style.boxShadow = 'none';
                });
            } else if (concept.id === 'concept5') {
                concept.addEventListener('mouseenter', () => {
                    concept.style.transform = 'translateY(-5px)';
                    concept.style.boxShadow = '0 5px 15px rgba(102,126,234,0.2)';
                    concept.style.borderColor = '#667eea';
                });
                concept.addEventListener('mouseleave', () => {
                    concept.style.transform = 'translateY(0)';
                    concept.style.boxShadow = 'none';
                    concept.style.borderColor = 'transparent';
                });
            }
        });
    }, 100);
}
