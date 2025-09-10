/**
 * Real World Introduction Level
 * Prepares users for applying learned concepts to real-world data
 */

function createRealWorldIntro() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-header">
                Real-World Application
            </div>
            <div class="level-content" style="padding: 15px 20px; max-width: 800px; margin: 0 auto;">
                <div style="background: rgba(102,126,234,0.1); border-radius: 10px; padding: 25px; border: 2px solid rgba(102,126,234,0.3); text-align: center;">
                    <h2 style="font-size: 1.5rem; margin: 0 0 20px 0; color: #333;">
                        🌍 Time to Apply Everything You've Learned!
                    </h2>
                    
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
                        <h3 style="font-size: 1.2rem; margin: 0 0 15px 0;">🎯 Your Journey So Far</h3>
                        <div style="text-align: left; font-size: 1rem; line-height: 1.8;">
                            <div style="margin-bottom: 10px;">
                                <strong>📊 Loss Functions:</strong> You've learned how to measure how wrong our predictions are
                            </div>
                            <div style="margin-bottom: 10px;">
                                <strong>📉 Gradient Descent:</strong> You've mastered the technique to find the best parameters
                            </div>
                            <div>
                                <strong>📚 Training Data:</strong> You understand how AI learns from examples
                            </div>
                        </div>
                    </div>
                    
                    <div style="background: white; border-radius: 8px; padding: 20px; margin: 20px 0; border: 2px solid #667eea;">
                        <h3 style="font-size: 1.2rem; margin: 0 0 15px 0; color: #333;">🏠 What's Coming Next</h3>
                        <p style="font-size: 1rem; line-height: 1.6; color: #555; margin: 0 0 15px 0;">
                            In the next level, we'll work with <strong style="color: #764ba2;">real California housing data</strong> to predict home prices.
                        </p>
                        <p style="font-size: 0.95rem; line-height: 1.6; color: #666; margin: 0;">
                            This isn't a simplified example or a toy problem—it's <em>actual data</em> that machine learning engineers use!
                            You'll see how <strong>loss minimization</strong>, <strong>gradient descent</strong>, and 
                            <strong>training on data</strong> come together to solve a practical problem.
                        </p>
                    </div>
                    
                    <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
                        <h3 style="font-size: 1.1rem; margin: 0 0 15px 0;">✨ Why This Matters</h3>
                        <div style="text-align: left; font-size: 0.95rem; line-height: 1.7;">
                            • This is how real AI systems are built and trained<br>
                            • The same principles work for Netflix recommendations to self-driving cars<br>
                            • You're learning the foundation that powers modern AI
                        </div>
                    </div>
                    
                    <div style="background: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107; margin: 20px 0; text-align: left;">
                        <p style="font-size: 0.95rem; color: #856404; margin: 0;">
                            <strong>💡 Remember:</strong> The real world is messier than our practice examples, but the core concepts remain the same. 
                            Don't worry if things seem more complex—you already have all the tools you need!
                        </p>
                    </div>
                    
                    <p style="font-size: 1.1rem; color: #555; margin: 20px 0 0 0;">
                        <strong>Ready to see AI in action on real data?</strong>
                    </p>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('real-world-intro', 'createRealWorldIntro');
}

// Register the level
if (typeof window !== 'undefined') {
    window.createRealWorldIntro = createRealWorldIntro;
}
