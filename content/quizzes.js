
function createLossQuizPart() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration" style="padding: 20px; max-width: 1200px; margin: 0 auto;">
                <h1 style="font-size: 2.3rem; margin-bottom: 20px; background: linear-gradient(45deg, #667eea, #764ba2); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">✏️ Check Your Understanding: Loss Functions & Multiple Variables</h1>
                
                <div style="background: linear-gradient(135deg, rgba(255,99,71,0.1), rgba(255,99,71,0.05)); border-radius: 12px; padding: 25px; margin: 20px auto; max-width: 800px; border: 2px solid #ff6347;">
                    <div style="display: flex; align-items: flex-start; gap: 20px;">
                        <div class="objective-icon" style="font-size: 3rem;">🧮</div>
                        <div style="flex: 1;">
                            <h3 style="margin: 0 0 15px 0; font-size: 1.4rem; color: #333;">Quick Quiz: Calculate the Loss!</h3>
                            <p style="font-size: 1.05rem; color: #555; line-height: 1.6;">Now that you've learned about single and multiple variables, test your understanding!</p>
                            <p style="font-size: 0.95rem; color: #666; line-height: 1.5;">Calculate the loss for these different scenarios:</p>
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
                    
                    <!-- Question 4: Multiple Variables -->
                    <div class="quiz-question" data-question="4" style="background: rgba(255,255,255,0.5); border-radius: 12px; padding: 20px; border: 2px solid #ddd; transition: all 0.3s ease;">
                        <h3 style="color: #333; margin: 0 0 10px 0; font-size: 1.1rem;">Question 4: Multiple Variables Loss</h3>
                        <div style="background: rgba(147,51,234,0.1); padding: 10px; border-radius: 6px; margin-bottom: 15px;">
                            <code style="color: #9333ea; font-weight: bold;">Total Loss = Sum of squared errors for each variable</code>
                        </div>
                        <p style="font-size: 1rem; color: #555; margin-bottom: 10px;">The witch's potion recipe has 2 ingredients:</p>
                        <ul style="font-size: 0.95rem; color: #555; margin: 10px 0 15px 20px; line-height: 1.6;">
                            <li>Yellow Essence: Predicted = <strong>30</strong>, Actual = <strong>40</strong></li>
                            <li>Blue Essence: Predicted = <strong>60</strong>, Actual = <strong>55</strong></li>
                        </ul>
                        <p style="font-size: 0.95rem; color: #666; margin-bottom: 10px;">What is the total loss? (Hint: (30-40)² + (60-55)²)</p>
                        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
                            <button class="quiz-option" data-value="15" style="padding: 10px; border-radius: 8px; border: 2px solid #ddd; background: white; cursor: pointer; transition: all 0.2s ease;">15</button>
                            <button class="quiz-option" data-value="105" style="padding: 10px; border-radius: 8px; border: 2px solid #ddd; background: white; cursor: pointer; transition: all 0.2s ease;">105</button>
                            <button class="quiz-option" data-value="125" data-correct="true" style="padding: 10px; border-radius: 8px; border: 2px solid #ddd; background: white; cursor: pointer; transition: all 0.2s ease;">125</button>
                            <button class="quiz-option" data-value="225" style="padding: 10px; border-radius: 8px; border: 2px solid #ddd; background: white; cursor: pointer; transition: all 0.2s ease;">225</button>
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
                            <p id="completion-message" style="margin: 5px 0 0 0; font-size: 0.95rem; color: #666;">Score: <span id="correct-count">0</span> / 4 correct</p>
                        </div>
                    </div>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('ip2c', 'createLossQuizPart');
    
    // Add quiz functionality
    setTimeout(() => {
        // Check if we're still on the quiz page
        const initialCheck = document.getElementById('concept1');
        if (!initialCheck) {
            return; // Page has changed, don't initialize quiz
        }
        
        let correctAnswers = [false, false, false, false];
        
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
                    message.innerHTML = `Score: <span id="correct-count">${correctCount}</span> / 4 correct`;
                }
                return;
            }
            
            countElement.textContent = correctCount;
            
            if (correctCount === 4) {
                if (concept1Div) {
                    concept1Div.style.background = 'linear-gradient(135deg, rgba(45,213,115,0.1), rgba(45,213,115,0.05))';
                    concept1Div.style.borderColor = '#2dd573';
                }
                if (checkmark) checkmark.style.display = 'block';
                if (title) title.textContent = 'Perfect! You understand loss functions & multiple variables!';
                if (message) message.innerHTML = 'All 4 questions correct! Outstanding work!';
                
                // Auto-navigate to congratulations page after a short delay
                setTimeout(() => {
                    if (typeof createLossQuizCongrats === 'function') {
                        createLossQuizCongrats();
                    }
                }, 2000); // 2 second delay to let user see the success
            } else if (correctCount === 3) {
                if (concept1Div) {
                    concept1Div.style.background = 'linear-gradient(135deg, rgba(243,150,10,0.1), rgba(243,150,10,0.05))';
                    concept1Div.style.borderColor = '#f3960a';
                }
                if (checkmark) checkmark.style.display = 'none';
                if (title) title.textContent = 'Great work! Almost perfect!';
                if (message) message.innerHTML = `Score: <span id="correct-count">${correctCount}</span> / 4 correct`;
            } else if (correctCount === 2) {
                if (concept1Div) {
                    concept1Div.style.background = 'linear-gradient(135deg, rgba(102,126,234,0.1), rgba(102,126,234,0.05))';
                    concept1Div.style.borderColor = '#667eea';
                }
                if (checkmark) checkmark.style.display = 'none';
                if (title) title.textContent = 'Good progress!';
                if (message) message.innerHTML = `Score: <span id="correct-count">${correctCount}</span> / 4 correct`;
            } else if (correctCount === 1) {
                if (concept1Div) {
                    concept1Div.style.background = 'linear-gradient(135deg, rgba(102,126,234,0.1), rgba(102,126,234,0.05))';
                    concept1Div.style.borderColor = '#667eea';
                }
                if (checkmark) checkmark.style.display = 'none';
                if (title) title.textContent = 'Keep practicing!';
                if (message) message.innerHTML = `Score: <span id="correct-count">${correctCount}</span> / 4 correct`;
            } else {
                if (concept1Div) {
                    concept1Div.style.background = 'linear-gradient(135deg, rgba(102,126,234,0.1), rgba(102,126,234,0.05))';
                    concept1Div.style.borderColor = '#667eea';
                }
                if (checkmark) checkmark.style.display = 'none';
                if (title) title.textContent = 'Practice calculating different loss functions';
                if (message) message.innerHTML = `Score: <span id="correct-count">${correctCount}</span> / 4 correct`;
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
                },
                4: {
                    correct: 'Loss = (30-40)² + (60-55)² = 100 + 25 = 125',
                    incorrect: 'Sum the squared errors: Loss = (30-40)² + (60-55)² = (-10)² + (5)² = 100 + 25 = 125'
                }
            };
            return explanations[questionNum][isCorrect ? 'correct' : 'incorrect'];
        }
    }, 100);
}