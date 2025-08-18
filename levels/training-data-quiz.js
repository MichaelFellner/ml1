/**
 * Training Data Quiz
 * 
 * Quiz to test understanding of training data concepts
 */

window.createTrainingDataQuiz = function() {
    
    class TrainingDataQuizLevel extends window.BaseLevelTemplate {
        constructor() {
            super({
                id: 'training-data-quiz',
                name: 'Training Data Quiz',
                type: 'interactive',
                description: 'Test your understanding of training data concepts',
                instructions: 'Answer questions about training data concepts',
                concepts: ['Training Data', 'Test Data', 'Features', 'Generalization'],
                difficulty: 'intermediate',
                interactionType: 'quiz',
                estimatedTime: 5
            });
            
            this.currentQuestion = 0;
            this.score = 0;
            this.userAnswers = [];
            
            this.questions = [
                {
                    id: 'purpose',
                    question: 'What is the main purpose of training data?',
                    options: [
                        'To test the final performance of the model',
                        'To provide examples with known answers for the model to learn from',
                        'To validate the model\'s architecture',
                        'To store the model\'s predictions'
                    ],
                    correct: 1,
                    explanation: 'Training data provides examples with known correct answers, allowing the model to learn patterns and relationships.'
                },
                {
                    id: 'workflow',
                    question: 'What is the correct workflow for using training data?',
                    options: [
                        'Test on training data, then train on new data',
                        'Train on all available data at once',
                        'Train on training data, then make predictions on new unseen data',
                        'Use the same data for both training and testing'
                    ],
                    correct: 2,
                    explanation: 'We train the model on training data where we know the answers, then use it to make predictions on new, unseen data.'
                },
                {
                    id: 'gradient-role',
                    question: 'How does gradient descent use training data?',
                    options: [
                        'It ignores training data and uses random values',
                        'It compares predictions to known answers to calculate loss and update parameters',
                        'It only uses training data for visualization',
                        'It stores training data in the model weights'
                    ],
                    correct: 1,
                    explanation: 'Gradient descent uses training data to calculate the loss (error) between predictions and known answers, then updates parameters to reduce this loss.'
                },
                {
                    id: 'test-data',
                    question: 'Why do we need separate test data?',
                    options: [
                        'To make the model train faster',
                        'To increase the amount of training data',
                        'To evaluate how well the model generalizes to unseen data',
                        'To store backup copies of the data'
                    ],
                    correct: 2,
                    explanation: 'Test data helps us evaluate whether our model can generalize to new, unseen examples, not just memorize the training data.'
                },
                {
                    id: 'size-impact',
                    question: 'What typically happens when you increase the amount of training data?',
                    options: [
                        'The model becomes worse at predictions',
                        'The model generally improves and generalizes better',
                        'Training becomes impossible',
                        'The model size decreases'
                    ],
                    correct: 1,
                    explanation: 'More training data generally helps models learn better patterns and generalize more effectively to new situations.'
                },
                {
                    id: 'features',
                    question: 'What are features in training data?',
                    options: [
                        'The decorative elements of the data',
                        'The input variables used to make predictions',
                        'The errors in the data',
                        'The size of the dataset'
                    ],
                    correct: 1,
                    explanation: 'Features are the input variables (like house size, location) that the model uses to make predictions (like house price).'
                },
                {
                    id: 'real-world',
                    question: 'In the California housing example, what were we trying to predict?',
                    options: [
                        'The number of rooms',
                        'The location of houses',
                        'The median house price',
                        'The population density'
                    ],
                    correct: 2,
                    explanation: 'In the California housing dataset, we used features like location and house characteristics to predict the median house price.'
                },
                {
                    id: 'bike-sharing',
                    question: 'What made the bike sharing data a good example of training data?',
                    options: [
                        'It had both input features (weather, time) and known outputs (rental counts)',
                        'It was very small and simple',
                        'It didn\'t require any processing',
                        'It only had one variable'
                    ],
                    correct: 0,
                    explanation: 'The bike sharing data was ideal because it had clear input features (weather conditions, time of day) and known outputs (actual rental counts) for training.'
                }
            ];
        }
        
        async setup() {
            await super.setup();
            
            // Initialize navigation
            if (typeof initializeNavigation === 'function') {
                initializeNavigation('training-data-quiz', 'createTrainingDataQuiz');
            }
            
            this._setupHandlers();
            // Load first question after DOM is ready
            setTimeout(() => this._loadQuestion(), 100);
        }
        
        _generateMainContent() {
            return `
                <div style="max-height: 80vh; display: flex; flex-direction: column; gap: 20px; padding: 20px;">
                    <!-- Title -->
                    <div style="text-align: center;">
                        <h2 style="color: #333; margin: 0;">📊 Training Data Quiz</h2>
                        <p style="color: #666; margin-top: 10px;">Test your understanding of training data concepts!</p>
                    </div>
                    
                    <!-- Progress Bar -->
                    <div style="background: white; padding: 15px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <span style="color: #666;">Question</span>
                            <span style="color: #eab308; font-weight: bold;"><span id="current-question">1</span> / ${this.questions.length}</span>
                        </div>
                        <div style="background: #f0f0f0; height: 8px; border-radius: 4px; overflow: hidden;">
                            <div id="progress-bar" style="width: 12.5%; background: linear-gradient(135deg, #eab308, #f59e0b); height: 100%; transition: width 0.3s;"></div>
                        </div>
                    </div>
                    
                    <!-- Question Card -->
                    <div id="question-card" style="background: white; border-radius: 10px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); flex: 1;">
                        <h3 id="question-text" style="color: #333; margin: 0 0 25px 0; font-size: 1.3rem;">
                            <!-- Question will be inserted here -->
                        </h3>
                        
                        <div id="options-container" style="display: flex; flex-direction: column; gap: 15px;">
                            <!-- Options will be inserted here -->
                        </div>
                        
                        <!-- Explanation Box -->
                        <div id="explanation-box" style="
                            margin-top: 25px;
                            padding: 20px;
                            background: rgba(234,179,8,0.1);
                            border-radius: 8px;
                            border-left: 4px solid #eab308;
                            display: none;
                        ">
                            <div style="display: flex; align-items: flex-start; gap: 10px;">
                                <span id="result-icon" style="font-size: 1.5rem;">💡</span>
                                <div style="flex: 1;">
                                    <div id="result-message" style="font-weight: bold; margin-bottom: 8px; color: #333;"></div>
                                    <div id="explanation-text" style="color: #666; line-height: 1.5;"></div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Navigation Button -->
                        <div style="text-align: center; margin-top: 25px;">
                            <button id="next-button" style="
                                padding: 12px 30px;
                                background: linear-gradient(135deg, #eab308, #f59e0b);
                                color: white;
                                border: none;
                                border-radius: 8px;
                                font-size: 1rem;
                                font-weight: 600;
                                cursor: pointer;
                                transition: all 0.3s ease;
                                display: none;
                            ">
                                Next Question →
                            </button>
                        </div>
                    </div>
                    
                    <!-- Score Display (initially hidden) -->
                    <div id="score-display" style="
                        background: linear-gradient(135deg, #eab308, #f59e0b);
                        color: white;
                        padding: 30px;
                        border-radius: 10px;
                        text-align: center;
                        display: none;
                    ">
                        <h3 style="margin: 0 0 15px 0; font-size: 1.8rem;">🎉 Quiz Complete!</h3>
                        <div id="final-score" style="font-size: 2rem; margin-bottom: 20px;">
                            <!-- Score will be inserted here -->
                        </div>
                        <div id="score-message" style="font-size: 1.1rem; margin-bottom: 25px;">
                            <!-- Message will be inserted here -->
                        </div>
                        <div style="display: flex; gap: 15px; justify-content: center;">
                            <button id="retry-button" style="
                                padding: 12px 25px;
                                background: white;
                                color: #eab308;
                                border: none;
                                border-radius: 8px;
                                font-weight: 600;
                                cursor: pointer;
                            ">Try Again</button>
                            <button id="continue-button" style="
                                padding: 12px 25px;
                                background: rgba(255,255,255,0.2);
                                color: white;
                                border: 2px solid white;
                                border-radius: 8px;
                                font-weight: 600;
                                cursor: pointer;
                            ">Continue →</button>
                        </div>
                    </div>
                </div>
                
                ${typeof createStandardNavigation === 'function' ? createStandardNavigation() : ''}
            `;
        }
        
        _setupHandlers() {
            // Next button
            const nextBtn = document.getElementById('next-button');
            if (nextBtn) {
                this.addEventListenerWithCleanup(nextBtn, 'click', () => {
                    this.currentQuestion++;
                    if (this.currentQuestion < this.questions.length) {
                        this._loadQuestion();
                    } else {
                        this._showResults();
                    }
                });
            }
            
            // Retry button
            const retryBtn = document.getElementById('retry-button');
            if (retryBtn) {
                this.addEventListenerWithCleanup(retryBtn, 'click', () => {
                    this.currentQuestion = 0;
                    this.score = 0;
                    this.userAnswers = [];
                    const scoreDisplay = document.getElementById('score-display');
                    const questionCard = document.getElementById('question-card');
                    if (scoreDisplay) scoreDisplay.style.display = 'none';
                    if (questionCard) questionCard.style.display = 'block';
                    this._loadQuestion();
                });
            }
            
            // Continue button
            const continueBtn = document.getElementById('continue-button');
            if (continueBtn) {
                this.addEventListenerWithCleanup(continueBtn, 'click', () => {
                    // Navigate to final congratulations
                    if (typeof createFinalCongrats === 'function') {
                        createFinalCongrats();
                    }
                });
            }
        }
        
        _loadQuestion() {
            const question = this.questions[this.currentQuestion];
            
            // Update progress
            document.getElementById('current-question').textContent = this.currentQuestion + 1;
            document.getElementById('progress-bar').style.width = 
                `${((this.currentQuestion + 1) / this.questions.length) * 100}%`;
            
            // Update question text
            document.getElementById('question-text').textContent = question.question;
            
            // Create options
            const optionsContainer = document.getElementById('options-container');
            if (optionsContainer) {
                optionsContainer.innerHTML = question.options.map((option, index) => `
                    <button class="quiz-option" data-index="${index}" style="
                        padding: 15px 20px;
                        background: white;
                        border: 2px solid #e0e0e0;
                        border-radius: 8px;
                        text-align: left;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        font-size: 1rem;
                        color: #333;
                    ">
                        <span style="display: inline-block; width: 30px; font-weight: bold; color: #999;">
                            ${String.fromCharCode(65 + index)}.
                        </span>
                        ${option}
                    </button>
                `).join('');
                
                // Add click handlers to options
                const options = optionsContainer.querySelectorAll('.quiz-option');
                options.forEach(option => {
                    this.addEventListenerWithCleanup(option, 'click', (e) => {
                        this._selectOption(parseInt(e.currentTarget.dataset.index));
                    });
                    
                    // Add hover effect
                    this.addEventListenerWithCleanup(option, 'mouseenter', () => {
                        if (!option.disabled) {
                            option.style.borderColor = '#eab308';
                            option.style.background = 'rgba(234,179,8,0.05)';
                        }
                    });
                    
                    this.addEventListenerWithCleanup(option, 'mouseleave', () => {
                        if (!option.disabled && !option.classList.contains('selected')) {
                            option.style.borderColor = '#e0e0e0';
                            option.style.background = 'white';
                        }
                    });
                });
            }
            
            // Hide explanation and next button
            document.getElementById('explanation-box').style.display = 'none';
            document.getElementById('next-button').style.display = 'none';
        }
        
        _selectOption(selectedIndex) {
            const question = this.questions[this.currentQuestion];
            const isCorrect = selectedIndex === question.correct;
            
            // Store answer
            this.userAnswers.push({
                question: question.id,
                selected: selectedIndex,
                correct: question.correct,
                isCorrect: isCorrect
            });
            
            if (isCorrect) {
                this.score++;
            }
            
            // Update option styles
            const options = document.querySelectorAll('.quiz-option');
            options.forEach((option, index) => {
                option.disabled = true;
                option.style.cursor = 'default';
                
                if (index === selectedIndex) {
                    if (isCorrect) {
                        option.style.background = 'rgba(45,213,115,0.1)';
                        option.style.borderColor = '#2dd573';
                    } else {
                        option.style.background = 'rgba(229,62,62,0.1)';
                        option.style.borderColor = '#e53e3e';
                    }
                } else if (index === question.correct) {
                    option.style.background = 'rgba(45,213,115,0.1)';
                    option.style.borderColor = '#2dd573';
                }
            });
            
            // Show explanation
            const explanationBox = document.getElementById('explanation-box');
            const resultIcon = document.getElementById('result-icon');
            const resultMessage = document.getElementById('result-message');
            const explanationText = document.getElementById('explanation-text');
            
            if (explanationBox && resultIcon && resultMessage && explanationText) {
                explanationBox.style.display = 'block';
                
                if (isCorrect) {
                    resultIcon.textContent = '✅';
                    resultMessage.textContent = 'Correct!';
                    resultMessage.style.color = '#2dd573';
                } else {
                    resultIcon.textContent = '❌';
                    resultMessage.textContent = 'Not quite right.';
                    resultMessage.style.color = '#e53e3e';
                }
                
                explanationText.textContent = question.explanation;
            }
            
            // Show next button
            document.getElementById('next-button').style.display = 'inline-block';
        }
        
        _showResults() {
            const percentage = Math.round((this.score / this.questions.length) * 100);
            
            // Hide question area
            const questionCard = document.getElementById('question-card');
            if (questionCard) {
                questionCard.style.display = 'none';
            }
            
            // Show score display
            const scoreDisplay = document.getElementById('score-display');
            const finalScore = document.getElementById('final-score');
            const scoreMessage = document.getElementById('score-message');
            
            if (scoreDisplay && finalScore && scoreMessage) {
                scoreDisplay.style.display = 'block';
                finalScore.textContent = `${this.score} / ${this.questions.length}`;
                
                let message;
                if (percentage === 100) {
                    message = '🏆 Perfect! You\'ve mastered training data concepts!';
                } else if (percentage >= 80) {
                    message = '🌟 Excellent! You have a strong understanding!';
                } else if (percentage >= 60) {
                    message = '👍 Good job! You\'re getting there!';
                } else {
                    message = '📚 Keep studying! Review the material and try again.';
                }
                
                scoreMessage.textContent = message;
                
                // Complete the level if score is good enough
                if (percentage >= 70) {
                    this.completeLevel({
                        score: percentage,
                        details: this.userAnswers
                    });
                }
            }
        }
    }
    
    try {
        const level = new TrainingDataQuizLevel();
        level.create().catch(error => {
            console.error('Failed to create Training Data Quiz:', error);
            // Try to show the error to the user
            const container = document.getElementById('app');
            if (container) {
                container.innerHTML = `
                    <div style="padding: 20px; color: red;">
                        <h2>Error Loading Quiz</h2>
                        <p>Failed to load the Training Data Quiz. Error: ${error.message}</p>
                        ${typeof createStandardNavigation === 'function' ? createStandardNavigation() : ''}
                    </div>
                `;
            }
        });
        
        return level;
    } catch (error) {
        console.error('Error initializing Training Data Quiz:', error);
        // Fallback UI
        const container = document.getElementById('app');
        if (container) {
            container.innerHTML = `
                <div style="padding: 20px; color: red;">
                    <h2>Error Loading Quiz</h2>
                    <p>Failed to initialize the Training Data Quiz. Error: ${error.message}</p>
                    ${typeof createStandardNavigation === 'function' ? createStandardNavigation() : ''}
                </div>
            `;
        }
    }
};

// Export for modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.createTrainingDataQuiz;
}