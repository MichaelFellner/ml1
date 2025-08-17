/**
 * Gradient Descent Math Quiz
 * 
 * Quiz level where users calculate parameter updates themselves
 */

window.createGradientDescentMathQuiz = function() {
    
    class GradientDescentMathQuizLevel extends window.BaseLevelTemplate {
        constructor() {
            super({
                id: 'gradient-descent-math-quiz',
                name: 'Gradient Descent Math Quiz',
                type: 'interactive',
                description: 'Test your understanding by calculating parameter updates'
            });
            
            this.currentProblem = 0;
            this.problems = [
                {
                    id: 'simple',
                    title: 'Problem 1: Simple Weight Update',
                    function: 'f(x) = w × x',
                    given: {
                        x: 4,
                        y_true: 20,
                        w: 3,
                        lr: 0.1
                    },
                    questions: [
                        { id: 'prediction', label: 'Prediction', answer: 12 },
                        { id: 'error', label: 'Error', answer: -8 },
                        { id: 'gradient', label: 'Gradient (2×error×x)', answer: -64 },
                        { id: 'w_new', label: 'New weight', answer: 9.4 }
                    ]
                },
                {
                    id: 'with-bias',
                    title: 'Problem 2: Weight and Bias Update',
                    function: 'f(x) = w × x + b',
                    given: {
                        x: 3,
                        y_true: 17,
                        w: 4,
                        b: 2,
                        lr: 0.05
                    },
                    questions: [
                        { id: 'prediction', label: 'Prediction', answer: 14 },
                        { id: 'error', label: 'Error', answer: -3 },
                        { id: 'gradient_w', label: 'Weight gradient', answer: -18 },
                        { id: 'gradient_b', label: 'Bias gradient', answer: -6 },
                        { id: 'w_new', label: 'New weight', answer: 4.9 },
                        { id: 'b_new', label: 'New bias', answer: 2.3 }
                    ]
                },
                {
                    id: 'multiple',
                    title: 'Problem 3: Multiple Parameters',
                    function: 'f(x) = w1×x1 + w2×x2 + b',
                    given: {
                        x1: 2,
                        x2: 5,
                        y_true: 30,
                        w1: 3,
                        w2: 4,
                        b: 1,
                        lr: 0.02
                    },
                    questions: [
                        { id: 'prediction', label: 'Prediction (w1×x1 + w2×x2 + b)', answer: 27 },
                        { id: 'error', label: 'Error', answer: -3 },
                        { id: 'gradient_w1', label: 'Gradient w1 (2×error×x1)', answer: -12 },
                        { id: 'gradient_w2', label: 'Gradient w2 (2×error×x2)', answer: -30 },
                        { id: 'gradient_b', label: 'Gradient bias', answer: -6 },
                        { id: 'w1_new', label: 'New w1', answer: 3.24 },
                        { id: 'w2_new', label: 'New w2', answer: 4.6 },
                        { id: 'b_new', label: 'New bias', answer: 1.12 }
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
                    <!-- Title -->
                    <div style="text-align: center;">
                        <h2 style="color: #333; margin: 0;">🎯 Gradient Descent Math Quiz</h2>
                        <p style="color: #666; margin-top: 10px;">Calculate the parameter updates step by step!</p>
                    </div>
                    
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
                            
                            <!-- Function -->
                            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                                <div style="font-family: 'Courier New', monospace; font-size: 1.1rem; color: #333; text-align: center;">
                                    <span id="function-display">f(x) = w × x</span>
                                </div>
                            </div>
                            
                            <!-- Given Values -->
                            <div style="background: #f0f7ff; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                                <h4 style="color: #333; margin: 0 0 10px 0;">📋 Given:</h4>
                                <div id="given-values" style="font-family: 'Courier New', monospace; line-height: 1.8;">
                                    <!-- Will be filled dynamically -->
                                </div>
                            </div>
                            
                            <!-- Hints -->
                            <div style="background: #fff9e6; padding: 15px; border-radius: 8px;">
                                <h4 style="color: #f39c12; margin: 0 0 10px 0;">💡 Remember:</h4>
                                <div style="font-size: 0.9rem; color: #666; line-height: 1.6;">
                                    <div>• Error = Prediction - Target</div>
                                    <div>• Gradient = 2 × Error × Input</div>
                                    <div>• New = Old - LearningRate × Gradient</div>
                                    <div style="margin-top: 8px; color: #999; font-size: 0.85rem;">
                                        Round to 2 decimal places
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
            
            // Update given values
            const givenEl = document.getElementById('given-values');
            if (givenEl) {
                let givenHTML = '';
                for (const [key, value] of Object.entries(problem.given)) {
                    const displayKey = key === 'lr' ? 'α' : key === 'y_true' ? 'target' : key;
                    givenHTML += `<div>${displayKey} = <span style="color: #667eea; font-weight: bold;">${value}</span></div>`;
                }
                givenEl.innerHTML = givenHTML;
            }
            
            // Create question inputs
            const questionsEl = document.getElementById('questions-container');
            if (questionsEl) {
                questionsEl.innerHTML = problem.questions.map(q => `
                    <div style="background: #f8f9fa; padding: 12px; border-radius: 8px;">
                        <label style="display: block; color: #666; font-size: 0.9rem; margin-bottom: 5px;">
                            ${q.label}:
                        </label>
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
                    </div>
                `).join('');
                
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
                    const tolerance = 0.01; // Allow small rounding differences
                    
                    if (Math.abs(userAnswer - correctAnswer) <= tolerance) {
                        correct++;
                        input.style.borderColor = '#2dd573';
                        feedbackEl.innerHTML = '<span style="color: #2dd573;">✓ Correct!</span>';
                    } else {
                        input.style.borderColor = '#e53e3e';
                        feedbackEl.innerHTML = `<span style="color: #e53e3e;">✗ Correct answer: ${correctAnswer}</span>`;
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
                let message, bgColor;
                
                if (percentage === 100) {
                    message = '🎉 Perfect! All answers correct!';
                    bgColor = 'rgba(45,213,115,0.1)';
                } else if (percentage >= 70) {
                    message = '👍 Good job! Most answers correct.';
                    bgColor = 'rgba(255,193,7,0.1)';
                } else {
                    message = '📚 Review the calculations and try again.';
                    bgColor = 'rgba(229,62,62,0.1)';
                }
                
                feedbackEl.style.background = bgColor;
                feedbackEl.style.display = 'block';
                feedbackEl.innerHTML = `
                    <div style="font-weight: bold; margin-bottom: 5px;">${message}</div>
                    <div style="color: #666;">Score: ${score.correct}/${score.total} (${percentage}%)</div>
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
                
                let message;
                if (percentage === 100) {
                    message = '🏆 Perfect Score! You\'ve mastered gradient descent math!';
                } else if (percentage >= 80) {
                    message = '🌟 Great Work! You understand the concepts well!';
                } else if (percentage >= 60) {
                    message = '👍 Good Effort! Keep practicing!';
                } else {
                    message = '📚 Keep Learning! Review the examples and try again.';
                }
                
                finalScoreEl.innerHTML = `
                    <div>${message}</div>
                    <div style="margin-top: 10px;">Final Score: ${totalCorrect}/${totalQuestions} (${percentage}%)</div>
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