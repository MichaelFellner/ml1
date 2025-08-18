/**
 * Next Learning Steps
 * 
 * Guidance on what to learn next after completing this course
 */

window.createNextSteps = function() {
    
    class NextStepsLevel extends window.BaseLevelTemplate {
        constructor() {
            super({
                id: 'next-steps',
                name: 'Your Learning Path Forward',
                type: 'tutorial',
                description: 'Recommendations for continuing your AI and machine learning journey',
                instructions: '',
                concepts: ['Python', 'Decision Trees', 'Neural Networks', 'Learning Resources'],
                difficulty: 'beginner',
                interactionType: 'reading',
                estimatedTime: 3
            });
        }
        
        async setup() {
            await super.setup();
            
            // Initialize navigation
            if (typeof initializeNavigation === 'function') {
                initializeNavigation('next-steps', 'createNextSteps');
            }
        }
        
        _generateMainContent() {
            return `
                <!-- Title -->
                <h2 style="text-align: center; color: #333; margin-bottom: 30px;">
                    🗺️ Your Learning Path Forward
                </h2>
                
                <!-- Introduction -->
                <div style="background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(118,75,162,0.1)); border-radius: 15px; padding: 25px; margin-bottom: 30px; border: 2px solid #667eea; text-align: center;">
                    <p style="font-size: 1.2rem; color: #555; line-height: 1.8; margin: 0;">
                        Congratulations on building a <strong style="color: #667eea;">solid foundation</strong> in machine learning!<br>
                        Here are three recommended paths to continue your journey:
                    </p>
                </div>
                
                <!-- Step 1: Python -->
                <div style="background: white; border-radius: 15px; padding: 30px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border-left: 5px solid #667eea;">
                    <div style="display: flex; align-items: flex-start; gap: 20px;">
                        <div style="font-size: 2.5rem; color: #667eea; font-weight: bold;">1</div>
                        <div style="flex: 1;">
                            <h3 style="color: #667eea; margin: 0 0 15px 0; display: flex; align-items: center; gap: 10px;">
                                <span style="font-size: 1.5rem;">🐍</span> Learn Python for Machine Learning
                            </h3>
                            <p style="font-size: 1.05rem; color: #555; line-height: 1.8; margin-bottom: 15px;">
                                Python can do everything we just learned in just a <strong>few lines of code</strong>! 
                                What took us dozens of lines of JavaScript can be done incredibly simply:
                            </p>
                            
                            <!-- Code example -->
                            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0;">
                                <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.95rem; color: #333; line-height: 1.5;">
<span style="color: #9333ea;">from</span> sklearn.linear_model <span style="color: #9333ea;">import</span> LinearRegression

<span style="color: #666;"># Create and train model</span>
model = LinearRegression()
model.fit(X_train, y_train)

<span style="color: #666;"># Make predictions</span>
predictions = model.predict(X_test)</pre>
                            </div>
                            
                            <div style="background: rgba(102,126,234,0.05); padding: 15px; border-radius: 8px;">
                                <h4 style="color: #667eea; margin: 0 0 10px 0;">Why Python?</h4>
                                <ul style="color: #666; margin: 0; padding-left: 20px; line-height: 1.6;">
                                    <li>Industry standard for machine learning</li>
                                    <li>Huge ecosystem of libraries (scikit-learn, TensorFlow, PyTorch)</li>
                                    <li>Clean, readable syntax</li>
                                    <li>Vast community and resources</li>
                                </ul>
                            </div>
                            
                            <div style="margin-top: 15px;">
                                <strong style="color: #667eea;">Start with:</strong>
                                <span style="color: #666;"> Python basics → NumPy → Pandas → Scikit-learn</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Step 2: Non-Gradient Descent ML -->
                <div style="background: white; border-radius: 15px; padding: 30px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border-left: 5px solid #eab308;">
                    <div style="display: flex; align-items: flex-start; gap: 20px;">
                        <div style="font-size: 2.5rem; color: #eab308; font-weight: bold;">2</div>
                        <div style="flex: 1;">
                            <h3 style="color: #eab308; margin: 0 0 15px 0; display: flex; align-items: center; gap: 10px;">
                                <span style="font-size: 1.5rem;">🌳</span> Explore Machine Learning Beyond Gradient Descent
                            </h3>
                            <p style="font-size: 1.05rem; color: #555; line-height: 1.8; margin-bottom: 15px;">
                                While <strong>most modern AI uses gradient descent</strong>, it's valuable to learn about 
                                other techniques that work differently:
                            </p>
                            
                            <!-- Techniques list -->
                            <div style="display: grid; gap: 15px; margin: 20px 0;">
                                <div style="background: rgba(234,179,8,0.05); padding: 15px; border-radius: 8px;">
                                    <h4 style="color: #eab308; margin: 0 0 8px 0;">🌲 Decision Trees & Random Forests</h4>
                                    <p style="color: #666; margin: 0; font-size: 0.95rem; line-height: 1.5;">
                                        Make decisions by asking a series of yes/no questions. Great for understanding 
                                        feature importance and interpretable results.
                                    </p>
                                </div>
                                
                                <div style="background: rgba(234,179,8,0.05); padding: 15px; border-radius: 8px;">
                                    <h4 style="color: #eab308; margin: 0 0 8px 0;">🔍 K-Nearest Neighbors (KNN)</h4>
                                    <p style="color: #666; margin: 0; font-size: 0.95rem; line-height: 1.5;">
                                        Makes predictions based on similarity to nearby examples. Simple and effective 
                                        for many classification tasks.
                                    </p>
                                </div>
                                
                                <div style="background: rgba(234,179,8,0.05); padding: 15px; border-radius: 8px;">
                                    <h4 style="color: #eab308; margin: 0 0 8px 0;">📊 Support Vector Machines (SVM)</h4>
                                    <p style="color: #666; margin: 0; font-size: 0.95rem; line-height: 1.5;">
                                        Finds the optimal boundary between classes. Powerful for classification with 
                                        clear margins.
                                    </p>
                                </div>
                            </div>
                            
                            <p style="color: #666; font-style: italic; margin-top: 15px;">
                                <strong>Note:</strong> Even though these don't use gradient descent, understanding them 
                                makes you a more well-rounded data scientist!
                            </p>
                        </div>
                    </div>
                </div>
                
                <!-- Step 3: Complex Functions -->
                <div style="background: white; border-radius: 15px; padding: 30px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border-left: 5px solid #2dd573;">
                    <div style="display: flex; align-items: flex-start; gap: 20px;">
                        <div style="font-size: 2.5rem; color: #2dd573; font-weight: bold;">3</div>
                        <div style="flex: 1;">
                            <h3 style="color: #2dd573; margin: 0 0 15px 0; display: flex; align-items: center; gap: 10px;">
                                <span style="font-size: 1.5rem;">🧠</span> Master Complex Functions with Neural Networks
                            </h3>
                            <p style="font-size: 1.05rem; color: #555; line-height: 1.8; margin-bottom: 15px;">
                                Take gradient descent to the next level by working with more sophisticated functions:
                            </p>
                            
                            <!-- Progression path -->
                            <div style="background: linear-gradient(to right, rgba(45,213,115,0.1), rgba(102,126,234,0.1)); padding: 20px; border-radius: 10px; margin: 20px 0;">
                                <h4 style="color: #333; margin: 0 0 15px 0;">Your Learning Progression:</h4>
                                
                                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
                                    <span style="background: #2dd573; color: white; padding: 5px 10px; border-radius: 15px; font-size: 0.85rem;">Current</span>
                                    <span style="color: #666;">Linear functions (y = wx + b)</span>
                                </div>
                                
                                <div style="color: #999; margin: 0 10px;">↓</div>
                                
                                <div style="display: flex; align-items: center; gap: 10px; margin: 12px 0;">
                                    <span style="background: #667eea; color: white; padding: 5px 10px; border-radius: 15px; font-size: 0.85rem;">Next</span>
                                    <span style="color: #666;">Polynomial & logistic regression</span>
                                </div>
                                
                                <div style="color: #999; margin: 0 10px;">↓</div>
                                
                                <div style="display: flex; align-items: center; gap: 10px; margin: 12px 0;">
                                    <span style="background: #764ba2; color: white; padding: 5px 10px; border-radius: 15px; font-size: 0.85rem;">Then</span>
                                    <span style="color: #666;">Simple neural networks (multi-layer perceptrons)</span>
                                </div>
                                
                                <div style="color: #999; margin: 0 10px;">↓</div>
                                
                                <div style="display: flex; align-items: center; gap: 10px; margin-top: 12px;">
                                    <span style="background: #9333ea; color: white; padding: 5px 10px; border-radius: 15px; font-size: 0.85rem;">Advanced</span>
                                    <span style="color: #666;">Deep learning (CNNs, RNNs, Transformers)</span>
                                </div>
                            </div>
                            
                            <div style="background: rgba(45,213,115,0.05); padding: 15px; border-radius: 8px;">
                                <h4 style="color: #2dd573; margin: 0 0 10px 0;">Key Concepts to Learn:</h4>
                                <ul style="color: #666; margin: 0; padding-left: 20px; line-height: 1.6;">
                                    <li><strong>Activation functions:</strong> Adding non-linearity to capture complex patterns</li>
                                    <li><strong>Backpropagation:</strong> How gradient descent works in neural networks</li>
                                    <li><strong>Regularization:</strong> Preventing overfitting to training data</li>
                                    <li><strong>Transfer learning:</strong> Using pre-trained models for new tasks</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Resource recommendations -->
                <div style="background: linear-gradient(135deg, rgba(255,243,224,0.8), rgba(255,255,255,0.8)); border-radius: 15px; padding: 25px; margin-bottom: 25px; border: 2px solid #ffdb58;">
                    <h3 style="color: #333; margin: 0 0 20px 0; text-align: center;">
                        📚 Recommended Learning Resources
                    </h3>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
                        <div style="background: white; padding: 15px; border-radius: 8px;">
                            <h4 style="color: #667eea; margin: 0 0 8px 0; font-size: 1rem;">🎓 Online Courses</h4>
                            <ul style="color: #666; font-size: 0.9rem; margin: 0; padding-left: 20px; line-height: 1.5;">
                                <li>Andrew Ng's Machine Learning Course</li>
                                <li>Fast.ai Practical Deep Learning</li>
                                <li>Google's ML Crash Course</li>
                            </ul>
                        </div>
                        
                        <div style="background: white; padding: 15px; border-radius: 8px;">
                            <h4 style="color: #eab308; margin: 0 0 8px 0; font-size: 1rem;">📖 Books</h4>
                            <ul style="color: #666; font-size: 0.9rem; margin: 0; padding-left: 20px; line-height: 1.5;">
                                <li>"Pattern Recognition and ML" - Bishop</li>
                                <li>"The Elements of Statistical Learning"</li>
                                <li>"Deep Learning" - Goodfellow et al.</li>
                            </ul>
                        </div>
                        
                        <div style="background: white; padding: 15px; border-radius: 8px;">
                            <h4 style="color: #2dd573; margin: 0 0 8px 0; font-size: 1rem;">💻 Practice Platforms</h4>
                            <ul style="color: #666; font-size: 0.9rem; margin: 0; padding-left: 20px; line-height: 1.5;">
                                <li>Kaggle competitions</li>
                                <li>Google Colab (free GPUs!)</li>
                                <li>Papers with Code</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <!-- Closing motivation -->
                <div style="background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(118,75,162,0.1)); border-radius: 15px; padding: 25px; text-align: center; border: 2px solid #667eea;">
                    <div style="font-size: 2rem; margin-bottom: 15px;">🚀</div>
                    <p style="font-size: 1.1rem; color: #555; line-height: 1.8; margin: 0;">
                        <strong style="color: #667eea;">Remember:</strong> You've already mastered the fundamentals!<br>
                        Everything else builds on what you've learned here. Take it one step at a time,<br>
                        and you'll be amazed at what you can create!
                    </p>
                </div>
                
                ${typeof createStandardNavigation === 'function' ? createStandardNavigation() : ''}
            `;
        }
    }
    
    const level = new NextStepsLevel();
    level.create().catch(error => {
        console.error('Failed to create Next Steps level:', error);
    });
    
    return level;
};

// Export for modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.createNextSteps;
}