/**
 * Training vs Test Data Explanation
 * 
 * Non-interactive level explaining the importance of training data
 * and introducing the concept of test data
 */

window.createTrainingTestDataExplanation = function() {
    
    class TrainingTestDataExplanationLevel extends window.BaseLevelTemplate {
        constructor() {
            super({
                id: 'training-test-data-explanation',
                name: 'Training Data vs Test Data',
                type: 'lesson',
                description: 'Understanding the importance of training data and the role of test data',
                instructions: '',
                concepts: ['Training Data', 'Test Data', 'Generalization', 'Overfitting'],
                difficulty: 'intermediate',
                interactionType: 'reading',
                estimatedTime: 5
            });
        }
        
        async setup() {
            await super.setup();
            
            // Initialize navigation
            if (typeof initializeNavigation === 'function') {
                initializeNavigation('training-test-data-explanation', 'createTrainingTestDataExplanation');
            }
            
            // Add smooth scrolling for sections
            this.setupSmoothScrolling();
        }
        
        setupSmoothScrolling() {
            const container = document.querySelector('.lesson-content');
            if (container) {
                container.style.scrollBehavior = 'smooth';
            }
        }
        
        _generateMainContent() {
            return `
                <div class="lesson-content" style="max-height: 85vh; overflow-y: auto; padding: 20px;">
                    <div style="max-width: 800px; margin: 0 auto;">
                        <!-- Header -->
                        <div style="text-align: center; margin-bottom: 30px;">
                            <h1 style="color: #333; margin-bottom: 10px;">Training Data vs Test Data</h1>
                            <p style="color: #666; font-size: 1.1em;">Understanding How AI Learns and Validates</p>
                        </div>
                        
                        <!-- Section 1: What We've Learned -->
                        <div style="background: white; border-radius: 12px; padding: 25px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                            <h2 style="color: #667eea; margin-bottom: 15px; display: flex; align-items: center;">
                                <span style="font-size: 1.5em; margin-right: 10px;">📚</span>
                                What You've Accomplished
                            </h2>
                            <p style="line-height: 1.6; color: #555; margin-bottom: 15px;">
                                In the previous levels, you've successfully used gradient descent to find the optimal weights for predicting target values. The AI learned the pattern from 50 data points and discovered that the formula was:
                            </p>
                            <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; text-align: center; margin: 15px 0;">
                                <code style="font-size: 1.2em; color: #667eea;">Target = 3×x₁ + 5×x₂ + 10×x₃</code>
                            </div>
                            <p style="line-height: 1.6; color: #555;">
                                But here's an important question: <strong>How do we know if our AI will work on NEW data it hasn't seen before?</strong>
                            </p>
                        </div>
                        
                        <!-- Section 2: Training Data -->
                        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 25px; margin-bottom: 20px; box-shadow: 0 4px 12px rgba(102,126,234,0.3);">
                            <h2 style="margin-bottom: 15px; display: flex; align-items: center;">
                                <span style="font-size: 1.5em; margin-right: 10px;">🎯</span>
                                Training Data: The Teacher
                            </h2>
                            <p style="line-height: 1.6; margin-bottom: 15px;">
                                <strong>Training data</strong> is like a textbook that AI uses to learn. It consists of examples where we know both the inputs and the correct answers.
                            </p>
                            <div style="background: rgba(255,255,255,0.15); padding: 15px; border-radius: 8px; margin: 15px 0;">
                                <h4 style="margin-bottom: 10px;">Why Training Data is Crucial:</h4>
                                <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
                                    <li><strong>Pattern Discovery:</strong> AI finds relationships between inputs and outputs</li>
                                    <li><strong>Weight Adjustment:</strong> Gradient descent uses training data to optimize parameters</li>
                                    <li><strong>Error Correction:</strong> Each mistake on training data helps improve the model</li>
                                    <li><strong>Foundation Building:</strong> More diverse training data = better understanding</li>
                                </ul>
                            </div>
                        </div>
                        
                        <!-- Section 3: The Problem -->
                        <div style="background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                            <h3 style="color: #856404; margin-bottom: 10px; display: flex; align-items: center;">
                                <span style="font-size: 1.3em; margin-right: 10px;">⚠️</span>
                                The Memorization Problem
                            </h3>
                            <p style="line-height: 1.6; color: #856404;">
                                Imagine a student who memorizes every question and answer in their textbook perfectly. They ace every practice problem! But when the real exam has slightly different questions, they struggle. This is what can happen to AI too - it's called <strong>overfitting</strong>.
                            </p>
                        </div>
                        
                        <!-- Section 4: Test Data -->
                        <div style="background: linear-gradient(135deg, #4ecdc4 0%, #44a3aa 100%); color: white; border-radius: 12px; padding: 25px; margin-bottom: 20px; box-shadow: 0 4px 12px rgba(78,205,196,0.3);">
                            <h2 style="margin-bottom: 15px; display: flex; align-items: center;">
                                <span style="font-size: 1.5em; margin-right: 10px;">🔍</span>
                                Test Data: The Real Exam
                            </h2>
                            <p style="line-height: 1.6; margin-bottom: 15px;">
                                <strong>Test data</strong> is completely separate data that the AI has NEVER seen during training. It's like a final exam with new questions to check if the student truly understands the concepts.
                            </p>
                            <div style="background: rgba(255,255,255,0.15); padding: 15px; border-radius: 8px; margin: 15px 0;">
                                <h4 style="margin-bottom: 10px;">Purpose of Test Data:</h4>
                                <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
                                    <li><strong>True Performance:</strong> Shows how well AI performs on unseen data</li>
                                    <li><strong>Generalization Check:</strong> Verifies the AI learned patterns, not memorized answers</li>
                                    <li><strong>Real-World Ready:</strong> Predicts how AI will perform in actual use</li>
                                    <li><strong>No Cheating:</strong> Test data is kept hidden during training</li>
                                </ul>
                            </div>
                        </div>
                        
                        <!-- Section 5: The Split -->
                        <div style="background: white; border-radius: 12px; padding: 25px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                            <h2 style="color: #333; margin-bottom: 15px; display: flex; align-items: center;">
                                <span style="font-size: 1.5em; margin-right: 10px;">✂️</span>
                                The Data Split Strategy
                            </h2>
                            <div style="display: flex; gap: 15px; margin: 20px 0;">
                                <div style="flex: 1; background: #e3f2fd; padding: 15px; border-radius: 8px; text-align: center;">
                                    <h3 style="color: #1976d2; margin-bottom: 10px;">Training Set</h3>
                                    <div style="font-size: 2em; font-weight: bold; color: #1976d2;">70-80%</div>
                                    <p style="color: #555; margin-top: 10px;">Used to train the model</p>
                                </div>
                                <div style="flex: 1; background: #e8f5e9; padding: 15px; border-radius: 8px; text-align: center;">
                                    <h3 style="color: #388e3c; margin-bottom: 10px;">Test Set</h3>
                                    <div style="font-size: 2em; font-weight: bold; color: #388e3c;">20-30%</div>
                                    <p style="color: #555; margin-top: 10px;">Used to evaluate performance</p>
                                </div>
                            </div>
                            <p style="line-height: 1.6; color: #555; margin-top: 15px;">
                                In real machine learning projects, data scientists randomly split their dataset. The model trains on one part and is evaluated on the other. This ensures the AI can handle new, unseen situations.
                            </p>
                        </div>
                        
                        <!-- Section 6: Real World Example -->
                        <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; padding: 25px; margin-bottom: 20px; box-shadow: 0 4px 12px rgba(240,147,251,0.3);">
                            <h2 style="margin-bottom: 15px; display: flex; align-items: center;">
                                <span style="font-size: 1.5em; margin-right: 10px;">🌍</span>
                                Real-World Example: Email Spam Filter
                            </h2>
                            <div style="background: rgba(255,255,255,0.15); padding: 15px; border-radius: 8px; margin: 15px 0;">
                                <p style="line-height: 1.6; margin-bottom: 10px;">
                                    <strong>Training Phase:</strong> The spam filter learns from thousands of emails that users marked as "spam" or "not spam". It discovers patterns like certain words, sender addresses, and formatting.
                                </p>
                                <p style="line-height: 1.6; margin-bottom: 10px;">
                                    <strong>Testing Phase:</strong> The filter is tested on new emails it's never seen to check if it correctly identifies spam without blocking legitimate emails.
                                </p>
                                <p style="line-height: 1.6;">
                                    <strong>In Production:</strong> Only if the test performance is good enough, the filter is deployed to handle your actual inbox!
                                </p>
                            </div>
                        </div>
                        
                        <!-- Section 7: Key Takeaways -->
                        <div style="background: #f0f4f8; border-radius: 12px; padding: 25px; margin-bottom: 20px; border: 2px solid #667eea;">
                            <h2 style="color: #667eea; margin-bottom: 15px; display: flex; align-items: center;">
                                <span style="font-size: 1.5em; margin-right: 10px;">💡</span>
                                Key Takeaways
                            </h2>
                            <div style="display: grid; gap: 10px;">
                                <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #4caf50;">
                                    <strong style="color: #4caf50;">1. Training Data is for Learning</strong>
                                    <p style="margin: 5px 0 0 0; color: #666;">The AI uses training data to discover patterns and adjust its parameters.</p>
                                </div>
                                <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #2196f3;">
                                    <strong style="color: #2196f3;">2. Test Data is for Validation</strong>
                                    <p style="margin: 5px 0 0 0; color: #666;">Test data checks if the AI truly learned generalizable patterns.</p>
                                </div>
                                <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #ff9800;">
                                    <strong style="color: #ff9800;">3. Never Mix Them</strong>
                                    <p style="margin: 5px 0 0 0; color: #666;">Test data must remain unseen during training to get honest performance metrics.</p>
                                </div>
                                <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #9c27b0;">
                                    <strong style="color: #9c27b0;">4. Good Generalization is the Goal</strong>
                                    <p style="margin: 5px 0 0 0; color: #666;">Success means performing well on both training AND test data.</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Section 8: What's Next -->
                        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 25px; margin-bottom: 20px; box-shadow: 0 4px 12px rgba(102,126,234,0.3);">
                            <h2 style="margin-bottom: 15px; display: flex; align-items: center;">
                                <span style="font-size: 1.5em; margin-right: 10px;">🚀</span>
                                What's Next?
                            </h2>
                            <p style="line-height: 1.6;">
                                Now that you understand the importance of training and test data, you're ready to see how this concept applies to more complex machine learning scenarios. In real applications, data scientists also use a third set called "validation data" to fine-tune their models, but that's a story for another day!
                            </p>
                            <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 8px; margin-top: 15px; text-align: center;">
                                <p style="margin: 0; font-size: 1.1em;">
                                    <strong>Remember:</strong> A model that performs perfectly on training data but poorly on test data has simply memorized rather than learned!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Standard navigation -->
                ${typeof createStandardNavigation === 'function' ? createStandardNavigation() : ''}
            `;
        }
    }
    
    const level = new TrainingTestDataExplanationLevel();
    level.create().catch(error => {
        console.error('Failed to create Training Test Data Explanation:', error);
    });
    
    return level;
};

// Export for modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.createTrainingTestDataExplanation;
}