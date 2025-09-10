/**
 * Gradient Descent Math Quiz - Bunny Pricing Edition
 * 
 * Quiz level testing concepts from the Bunny Pricing Optimization activity
 */

window.createGradientDescentMathQuiz = function() {
    
    class GradientDescentMathQuizLevel extends window.BaseLevelTemplate {
        constructor() {
            super({
                id: 'gradient-descent-math-quiz',
                name: 'Bunny Pricing Math Quiz',
                type: 'interactive',
                description: ''
            });
            
            this.currentProblem = 0;
            this.problems = [
                {
                    id: 'single-bunny',
                    title: 'Problem 1: Single Bunny Price Update',
                    context: 'You have ONE bunny to price using: Price = W_age × Age + W_kg × Weight',
                    function: 'Price = W_age × Age + W_kg × Kg',
                    given: {
                        age: 4,
                        kg: 2.5,
                        true_price: 200,
                        w_age: 30,
                        w_kg: 40,
                        lr: 0.01
                    },
                    questions: [
                        { id: 'estimate', label: 'Your price estimate', answer: 220, hint: '30×4 + 40×2.5' },
                        { id: 'error', label: 'Error (Estimate - True)', answer: 20, hint: '220 - 200' },
                        { id: 'age_update', label: 'Age coefficient update (Error × Age × LR)', answer: 0.8, hint: '20 × 4 × 0.01' },
                        { id: 'kg_update', label: 'Kg coefficient update (Error × Kg × LR)', answer: 0.5, hint: '20 × 2.5 × 0.01' },
                        { id: 'w_age_new', label: 'New W_age (Old + Update)', answer: 30.8, hint: '30 + 0.8' },
                        { id: 'w_kg_new', label: 'New W_kg (Old + Update)', answer: 40.5, hint: '40 + 0.5' }
                    ]
                },
                {
                    id: 'two-bunnies',
                    title: 'Problem 2: Two Bunnies Total Error',
                    context: 'Calculate the TOTAL error for TWO bunnies, then the updates',
                    function: 'Price = W_age × Age + W_kg × Kg',
                    bunnies: [
                        { name: 'Bunny 1', age: 3, kg: 2.0, true_price: 150 },
                        { name: 'Bunny 2', age: 5, kg: 3.0, true_price: 250 }
                    ],
                    given: {
                        w_age: 20,
                        w_kg: 50,
                        lr: 0.001
                    },
                    questions: [
                        { id: 'bunny1_estimate', label: 'Bunny 1 estimate', answer: 160, hint: '20×3 + 50×2' },
                        { id: 'bunny1_error', label: 'Bunny 1 error', answer: 10, hint: '160 - 150' },
                        { id: 'bunny2_estimate', label: 'Bunny 2 estimate', answer: 250, hint: '20×5 + 50×3' },
                        { id: 'bunny2_error', label: 'Bunny 2 error', answer: 0, hint: '250 - 250' },
                        { id: 'total_error', label: 'Total error (sum)', answer: 10, hint: '10 + 0' },
                        { id: 'sum_age', label: 'Sum of ages', answer: 8, hint: '3 + 5' },
                        { id: 'sum_kg', label: 'Sum of weights', answer: 5, hint: '2 + 3' },
                        { id: 'age_update', label: 'W_age update (TotalError × SumAge × LR)', answer: 0.08, hint: '10 × 8 × 0.001' },
                        { id: 'kg_update', label: 'W_kg update (TotalError × SumKg × LR)', answer: 0.05, hint: '10 × 5 × 0.001' }
                    ]
                },
                {
                    id: 'three-bunnies',
                    title: 'Problem 3: Three Bunnies (Like the Activity!)',
                    context: 'This is similar to what you did in the bunny pricing activity!',
                    function: 'Price = W_age × Age + W_kg × Kg',
                    bunnies: [
                        { name: 'Bunny 1', age: 5, kg: 2.0, true_price: 250 },
                        { name: 'Bunny 2', age: 2, kg: 3.0, true_price: 380 },
                        { name: 'Bunny 3', age: 8, kg: 2.5, true_price: 180 }
                    ],
                    given: {
                        w_age: 20,
                        w_kg: 30,
                        lr: 0.001
                    },
                    questions: [
                        { id: 'bunny1_estimate', label: 'Bunny 1 estimate', answer: 160, hint: '20×5 + 30×2' },
                        { id: 'bunny1_error', label: 'Bunny 1 error', answer: -90, hint: '160 - 250' },
                        { id: 'bunny2_estimate', label: 'Bunny 2 estimate', answer: 130, hint: '20×2 + 30×3' },
                        { id: 'bunny2_error', label: 'Bunny 2 error', answer: -250, hint: '130 - 380' },
                        { id: 'bunny3_estimate', label: 'Bunny 3 estimate', answer: 235, hint: '20×8 + 30×2.5' },
                        { id: 'bunny3_error', label: 'Bunny 3 error', answer: 55, hint: '235 - 180' },
                        { id: 'total_error', label: 'Total error (sum)', answer: -285, hint: '-90 + (-250) + 55' },
                        { id: 'age_update', label: 'W_age update (Error × 15 × LR)', answer: -4.275, hint: '-285 × 15 × 0.001' },
                        { id: 'kg_update', label: 'W_kg update (Error × 7.5 × LR)', answer: -2.1375, hint: '-285 × 7.5 × 0.001' },
                        { id: 'w_age_new', label: 'New W_age', answer: 15.725, hint: '20 + (-4.275)' },
                        { id: 'w_kg_new', label: 'New W_kg', answer: 27.8625, hint: '30 + (-2.1375)' }
                    ]
                }
            ];
            
            this.userAnswers = {};
            this.scores = {};
        }
        
        async setup() {
            await super.setup();
            
            // Initialize navigation
            if (typeof initializeNavigation === 'function') {
                initializeNavigation('gradient-descent-math-quiz', 'createGradientDescentMathQuiz');
            }
            
            this._setupHandlers();
            // Load problem after DOM is ready
            setTimeout(() => this._loadProblem(), 100);
        }
        
        _generateMainContent() {
            return `
                <div style="max-height: 80vh; display: flex; flex-direction: column; gap: 20px; padding: 20px;">
                    <!-- Progress Bar -->
                    <div style="background: white; padding: 15px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <span style="color: #666;">Progress</span>
                            <span style="color: #667eea; font-weight: bold;"><span id="current-problem">1</span> / 3</span>
                        </div>
                        <div style="background: #f0f0f0; height: 8px; border-radius: 4px; overflow: hidden;">
                            <div id="progress-bar" style="width: 33%; background: linear-gradient(135deg, #667eea, #764ba2); height: 100%; transition: width 0.3s;"></div>
                        </div>
                    </div>
                    
                    <!-- Main Content -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; flex: 1;">
                        <!-- Left Panel: Problem Statement -->
                        <div style="background: white; border-radius: 10px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                            <h3 id="problem-title" style="color: #667eea; margin: 0 0 15px 0;">Problem 1: Simple Weight Update</h3>
                            
                            <!-- Context -->
                            <div id="problem-context" style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 15px; display: none;">
                                <p style="color: #666; margin: 0; font-size: 0.95rem;"></p>
                            </div>
                            
                            <!-- Function -->
                            <div style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                                <div style="font-family: 'Courier New', monospace; font-size: 1.1rem; color: white; text-align: center;">
                                    <span id="function-display">Price = W_age × Age + W_kg × Kg</span>
                                </div>
                            </div>
                            
                            <!-- Bunny Data Table (for multi-bunny problems) -->
                            <div id="bunny-data" style="background: white; border: 2px solid #e0e0e0; border-radius: 8px; margin-bottom: 15px; display: none;">
                                <table style="width: 100%; border-collapse: collapse;">
                                    <thead>
                                        <tr style="background: #f5f5f5;">
                                            <th style="padding: 10px; border-bottom: 2px solid #e0e0e0;">🐰</th>
                                            <th style="padding: 10px; border-bottom: 2px solid #e0e0e0;">Age</th>
                                            <th style="padding: 10px; border-bottom: 2px solid #e0e0e0;">Kg</th>
                                            <th style="padding: 10px; border-bottom: 2px solid #e0e0e0;">True Price</th>
                                        </tr>
                                    </thead>
                                    <tbody id="bunny-data-body">
                                        <!-- Will be filled dynamically -->
                                    </tbody>
                                </table>
                            </div>
                            
                            <!-- Given Values -->
                            <div style="background: #f0f7ff; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                                <h4 style="color: #333; margin: 0 0 10px 0;">📋 Given Parameters:</h4>
                                <div id="given-values" style="font-family: 'Courier New', monospace; line-height: 1.8;">
                                    <!-- Will be filled dynamically -->
                                </div>
                            </div>
                            
                            <!-- Hints -->
                            <div style="background: #fff9e6; padding: 15px; border-radius: 8px;">
                                <h4 style="color: #f39c12; margin: 0 0 10px 0;">💡 Key Formulas:</h4>
                                <div style="font-size: 0.9rem; color: #666; line-height: 1.6;">
                                    <div>• <strong>Error</strong> = Estimate - True Price</div>
                                    <div>• <strong>Update</strong> = Error × Feature × Learning Rate</div>
                                    <div>• <strong>New Weight</strong> = Old Weight + Update</div>
                                    <div style="margin-top: 8px; padding: 8px; background: #fff3cd; border-radius: 4px;">
                                        <strong>🎯 Tip:</strong> Click on any answer field to see a hint!
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Navigation Buttons -->
                            <div style="display: flex; gap: 10px; margin-top: 20px;">
                                <button id="prev-problem" style="
                                    flex: 1;
                                    padding: 10px;
                                    background: #6c757d;
                                    color: white;
                                    border: none;
                                    border-radius: 5px;
                                    cursor: pointer;
                                    display: none;
                                ">← Previous</button>
                                <button id="check-answers" style="
                                    flex: 1;
                                    padding: 10px;
                                    background: linear-gradient(135deg, #667eea, #764ba2);
                                    color: white;
                                    border: none;
                                    border-radius: 5px;
                                    cursor: pointer;
                                    font-weight: bold;
                                ">Check Answers</button>
                                <button id="next-problem" style="
                                    flex: 1;
                                    padding: 10px;
                                    background: #28a745;
                                    color: white;
                                    border: none;
                                    border-radius: 5px;
                                    cursor: pointer;
                                    display: none;
                                ">Next →</button>
                            </div>
                        </div>
                        
                        <!-- Right Panel: Answer Inputs -->
                        <div style="background: white; border-radius: 10px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                            <h3 style="color: #764ba2; margin: 0 0 15px 0;">Your Calculations</h3>
                            
                            <div id="questions-container" style="display: flex; flex-direction: column; gap: 15px;">
                                <!-- Will be filled with question inputs -->
                            </div>
                            
                            <!-- Feedback -->
                            <div id="feedback" style="
                                margin-top: 20px;
                                padding: 15px;
                                border-radius: 8px;
                                display: none;
                            ">
                                <!-- Will show feedback after checking -->
                            </div>
                        </div>
                    </div>
                    
                    <!-- Overall Score -->
                    <div id="overall-score" style="
                        background: linear-gradient(135deg, #667eea, #764ba2);
                        color: white;
                        padding: 20px;
                        border-radius: 10px;
                        text-align: center;
                        display: none;
                    ">
                        <h3 style="margin: 0 0 10px 0;">🎉 Quiz Complete!</h3>
                        <div id="final-score" style="font-size: 1.5rem; margin-bottom: 10px;">
                            <!-- Will show final score -->
                        </div>
                        <button id="retry-quiz" style="
                            padding: 10px 20px;
                            background: white;
                            color: #667eea;
                            border: none;
                            border-radius: 5px;
                            cursor: pointer;
                            font-weight: bold;
                        ">Try Again</button>
                    </div>
                </div>
                
                ${typeof createStandardNavigation === 'function' ? createStandardNavigation() : ''}
            `;
        }
        
        _setupHandlers() {
            // Check answers button
            const checkBtn = document.getElementById('check-answers');
            if (checkBtn) {
                this.addEventListenerWithCleanup(checkBtn, 'click', () => this._checkAnswers());
            }
            
            // Navigation buttons
            const prevBtn = document.getElementById('prev-problem');
            const nextBtn = document.getElementById('next-problem');
            
            if (prevBtn) {
                this.addEventListenerWithCleanup(prevBtn, 'click', () => {
                    this.currentProblem--;
                    this._loadProblem();
                });
            }
            
            if (nextBtn) {
                this.addEventListenerWithCleanup(nextBtn, 'click', () => {
                    this.currentProblem++;
                    this._loadProblem();
                });
            }
            
            // Retry button
            const retryBtn = document.getElementById('retry-quiz');
            if (retryBtn) {
                this.addEventListenerWithCleanup(retryBtn, 'click', () => {
                    this.currentProblem = 0;
                    this.userAnswers = {};
                    this.scores = {};
                    document.getElementById('overall-score').style.display = 'none';
                    this._loadProblem();
                });
            }
        }
        
        _loadProblem() {
            const problem = this.problems[this.currentProblem];
            
            // Update progress
            document.getElementById('current-problem').textContent = this.currentProblem + 1;
            document.getElementById('progress-bar').style.width = `${(this.currentProblem + 1) / this.problems.length * 100}%`;
            
            // Update problem display
            document.getElementById('problem-title').textContent = problem.title;
            document.getElementById('function-display').textContent = problem.function;
            
            // Show context if available
            const contextEl = document.getElementById('problem-context');
            if (contextEl && problem.context) {
                contextEl.style.display = 'block';
                contextEl.querySelector('p').textContent = problem.context;
            } else if (contextEl) {
                contextEl.style.display = 'none';
            }
            
            // Show bunny data table for multi-bunny problems
            const bunnyDataEl = document.getElementById('bunny-data');
            const bunnyDataBody = document.getElementById('bunny-data-body');
            if (problem.bunnies && bunnyDataEl && bunnyDataBody) {
                bunnyDataEl.style.display = 'block';
                bunnyDataBody.innerHTML = problem.bunnies.map((bunny, i) => `
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">${bunny.name}</td>
                        <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; text-align: center;">${bunny.age}</td>
                        <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; text-align: center;">${bunny.kg}</td>
                        <td style="padding: 10px; border-bottom: 1px solid #e0e0e0; text-align: center; color: #27ae60; font-weight: bold;">${bunny.true_price}</td>
                    </tr>
                `).join('');
            } else if (bunnyDataEl) {
                bunnyDataEl.style.display = 'none';
            }
            
            // Update given values (filter out data that's in the bunny table)
            const givenEl = document.getElementById('given-values');
            if (givenEl) {
                let givenHTML = '';
                for (const [key, value] of Object.entries(problem.given)) {
                    let displayKey = key;
                    if (key === 'lr') displayKey = 'Learning Rate (α)';
                    else if (key === 'w_age') displayKey = 'W_age';
                    else if (key === 'w_kg') displayKey = 'W_kg';
                    else if (key === 'age') displayKey = 'Age';
                    else if (key === 'kg') displayKey = 'Weight (kg)';
                    else if (key === 'true_price') displayKey = 'True Price';
                    
                    givenHTML += `<div>${displayKey} = <span style="color: #667eea; font-weight: bold;">${value}</span></div>`;
                }
                givenEl.innerHTML = givenHTML;
            }
            
            // Create question inputs
            const questionsEl = document.getElementById('questions-container');
            if (questionsEl) {
                questionsEl.innerHTML = problem.questions.map((q, index) => `
                    <div style="background: #f8f9fa; padding: 12px; border-radius: 8px; position: relative;">
                        <div style="display: flex; justify-content: space-between; align-items: start;">
                            <label style="display: block; color: #666; font-size: 0.9rem; margin-bottom: 5px; flex: 1;">
                                <span style="color: #667eea; font-weight: bold;">${index + 1}.</span> ${q.label}:
                            </label>
                            ${q.hint ? `
                                <button class="hint-btn" data-hint="${q.hint.replace(/"/g, '&quot;')}" style="
                                    background: #667eea;
                                    color: white;
                                    border: none;
                                    border-radius: 4px;
                                    padding: 2px 8px;
                                    font-size: 0.75rem;
                                    cursor: pointer;
                                    margin-left: 10px;
                                ">Hint</button>
                            ` : ''}
                        </div>
                        <input type="number" 
                            id="answer-${q.id}" 
                            data-question="${q.id}"
                            step="0.01"
                            style="
                                width: 100%;
                                padding: 8px;
                                border: 2px solid #ddd;
                                border-radius: 5px;
                                font-family: 'Courier New', monospace;
                                font-size: 1rem;
                            "
                            placeholder="Enter your answer">
                        <div id="feedback-${q.id}" style="margin-top: 5px; font-size: 0.85rem;"></div>
                        <div id="hint-${q.id}" style="
                            display: none;
                            margin-top: 8px;
                            padding: 8px;
                            background: #e3f2fd;
                            border-left: 3px solid #667eea;
                            border-radius: 4px;
                            font-size: 0.85rem;
                            color: #1976d2;
                        "></div>
                    </div>
                `).join('');
                
                // Add hint button listeners
                document.querySelectorAll('.hint-btn').forEach(btn => {
                    this.addEventListenerWithCleanup(btn, 'click', (e) => {
                        const hint = e.target.getAttribute('data-hint');
                        const questionDiv = e.target.closest('div[style]');
                        const hintDiv = questionDiv.querySelector('[id^="hint-"]');
                        if (hintDiv) {
                            if (hintDiv.style.display === 'none') {
                                hintDiv.textContent = `💡 Hint: ${hint}`;
                                hintDiv.style.display = 'block';
                                e.target.textContent = 'Hide';
                            } else {
                                hintDiv.style.display = 'none';
                                e.target.textContent = 'Hint';
                            }
                        }
                    });
                });
                
                // Add input listeners
                problem.questions.forEach(q => {
                    const input = document.getElementById(`answer-${q.id}`);
                    if (input) {
                        // Restore previous answer if exists
                        const key = `${problem.id}-${q.id}`;
                        if (this.userAnswers[key] !== undefined) {
                            input.value = this.userAnswers[key];
                        }
                        
                        this.addEventListenerWithCleanup(input, 'input', (e) => {
                            this.userAnswers[key] = parseFloat(e.target.value) || 0;
                        });
                    }
                });
            }
            
            // Update navigation buttons
            document.getElementById('prev-problem').style.display = this.currentProblem > 0 ? 'block' : 'none';
            document.getElementById('next-problem').style.display = 'none';
            document.getElementById('check-answers').style.display = 'block';
            
            // Hide feedback
            document.getElementById('feedback').style.display = 'none';
            
            // Show previous feedback if already checked
            if (this.scores[problem.id]) {
                this._showFeedback();
            }
        }
        
        _checkAnswers() {
            const problem = this.problems[this.currentProblem];
            let correct = 0;
            let total = problem.questions.length;
            
            problem.questions.forEach(q => {
                const input = document.getElementById(`answer-${q.id}`);
                const feedbackEl = document.getElementById(`feedback-${q.id}`);
                
                if (input && feedbackEl) {
                    const userAnswer = parseFloat(input.value) || 0;
                    const correctAnswer = q.answer;
                    
                    // More forgiving tolerance for decimal answers
                    const tolerance = Math.abs(correctAnswer) * 0.02 + 0.1; // 2% of answer + 0.1 base tolerance
                    
                    if (Math.abs(userAnswer - correctAnswer) <= tolerance) {
                        correct++;
                        input.style.borderColor = '#2dd573';
                        input.style.background = '#f0fff4';
                        feedbackEl.innerHTML = '<span style="color: #2dd573; font-weight: bold;">✓ Correct! 🎉</span>';
                    } else {
                        input.style.borderColor = '#e53e3e';
                        input.style.background = '#fff5f5';
                        const difference = Math.abs(userAnswer - correctAnswer);
                        let message = `<span style="color: #e53e3e;">✗ Expected: ${correctAnswer}</span>`;
                        
                        // Provide encouraging feedback based on how close they were
                        if (difference < 1) {
                            message += `<br><span style="color: #f39c12; font-size: 0.8rem;">Very close! Check your calculation.</span>`;
                        } else if (difference < 10) {
                            message += `<br><span style="color: #e74c3c; font-size: 0.8rem;">You're in the right direction!</span>`;
                        }
                        
                        feedbackEl.innerHTML = message;
                    }
                }
            });
            
            // Store score
            this.scores[problem.id] = { correct, total };
            
            // Show feedback
            this._showFeedback();
            
            // Show next button or complete
            if (this.currentProblem < this.problems.length - 1) {
                document.getElementById('next-problem').style.display = 'block';
            } else {
                this._showFinalScore();
            }
            
            document.getElementById('check-answers').style.display = 'none';
        }
        
        _showFeedback() {
            const problem = this.problems[this.currentProblem];
            const score = this.scores[problem.id];
            
            if (!score) return;
            
            const feedbackEl = document.getElementById('feedback');
            if (feedbackEl) {
                const percentage = Math.round((score.correct / score.total) * 100);
                let message, bgColor, bunnyReaction;
                
                if (percentage === 100) {
                    message = 'Perfect! The bunnies are thrilled!';
                    bgColor = 'linear-gradient(135deg, rgba(45,213,115,0.1), rgba(45,213,115,0.2))';
                    bunnyReaction = '🐰🎉';
                } else if (percentage >= 70) {
                    message = 'Great job! The bunnies are happy!';
                    bgColor = 'linear-gradient(135deg, rgba(255,193,7,0.1), rgba(255,193,7,0.2))';
                    bunnyReaction = '🐰👍';
                } else {
                    message = 'Keep trying! The bunnies are cheering for you!';
                    bgColor = 'linear-gradient(135deg, rgba(229,62,62,0.1), rgba(229,62,62,0.2))';
                    bunnyReaction = '🐰💪';
                }
                
                feedbackEl.style.background = bgColor;
                feedbackEl.style.display = 'block';
                feedbackEl.style.border = '2px solid rgba(102, 126, 234, 0.2)';
                feedbackEl.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 5px;">
                        <span style="font-size: 1.5rem;">${bunnyReaction}</span>
                        <span style="font-weight: bold; color: #333;">${message}</span>
                    </div>
                    <div style="color: #666; font-size: 0.9rem;">Score: ${score.correct}/${score.total} questions correct (${percentage}%)</div>
                    ${percentage < 100 ? `
                        <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(0,0,0,0.1);">
                            <span style="color: #667eea; font-size: 0.85rem; font-weight: bold;">💡 Tip:</span>
                            <span style="color: #666; font-size: 0.85rem;"> Click the "Hint" buttons to see calculation steps!</span>
                        </div>
                    ` : ''}
                `;
            }
        }
        
        _showFinalScore() {
            let totalCorrect = 0;
            let totalQuestions = 0;
            
            Object.values(this.scores).forEach(score => {
                totalCorrect += score.correct;
                totalQuestions += score.total;
            });
            
            const percentage = Math.round((totalCorrect / totalQuestions) * 100);
            
            const scoreEl = document.getElementById('overall-score');
            const finalScoreEl = document.getElementById('final-score');
            
            if (scoreEl && finalScoreEl) {
                scoreEl.style.display = 'block';
                
                let message, bunnyEmoji;
                if (percentage === 100) {
                    message = 'Perfect Score! The bunnies are doing backflips of joy!';
                    bunnyEmoji = '🐰🎉🏆';
                } else if (percentage >= 80) {
                    message = 'Excellent! The bunnies are hopping with happiness!';
                    bunnyEmoji = '🐰🌟✨';
                } else if (percentage >= 60) {
                    message = 'Good job! The bunnies are pleased with your progress!';
                    bunnyEmoji = '🐰👍🌼';
                } else {
                    message = 'Keep practicing! The bunnies believe in you!';
                    bunnyEmoji = '🐰💪📚';
                }
                
                finalScoreEl.innerHTML = `
                    <div style="font-size: 2rem; margin-bottom: 10px;">${bunnyEmoji}</div>
                    <div style="font-size: 1.2rem; margin-bottom: 15px;">${message}</div>
                    <div style="font-size: 1.8rem; font-weight: bold;">${totalCorrect}/${totalQuestions}</div>
                    <div style="font-size: 1rem; opacity: 0.9;">(${percentage}% Correct)</div>
                `;
                
                // Complete the level
                if (percentage >= 70) {
                    this.completeLevel({
                        score: percentage,
                        details: this.scores
                    });
                }
            }
        }
    }
    
    const level = new GradientDescentMathQuizLevel();
    level.create().catch(error => {
        console.error('Failed to create Gradient Descent Math Quiz:', error);
    });
    
    return level;
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.createGradientDescentMathQuiz;
}