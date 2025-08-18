/**
 * Gradient Descent Math Congratulations
 * 
 * Celebration page for completing the gradient descent math quiz
 */

window.createGradientDescentCongrats = function() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration" style="padding: 20px; max-width: 1200px; margin: 0 auto;">
                <h1 style="font-size: 2.5rem; margin-bottom: 20px; background: linear-gradient(45deg, #667eea, #764ba2); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-align: center;">
                    🎉 Excellent Work!
                </h1>
                
                <!-- Main congratulations card -->
                <div style="background: linear-gradient(135deg, rgba(102,126,234,0.15), rgba(118,75,162,0.05)); border-radius: 15px; padding: 40px; margin: 30px auto; max-width: 700px; border: 3px solid #667eea; box-shadow: 0 8px 16px rgba(102,126,234,0.2); animation: pulse 2s ease-in-out infinite;">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 30px; flex-direction: column;">
                        <!-- Large trophy icon -->
                        <div style="font-size: 5rem; color: #667eea; animation: bounce 1s ease-in-out;">🏆</div>
                        
                        <!-- Success message -->
                        <div style="text-align: center;">
                            <h2 style="margin: 0 0 15px 0; font-size: 1.8rem; color: #667eea;">Gradient Descent Master!</h2>
                            <p style="font-size: 1.2rem; color: #333; margin: 0 0 10px 0;">
                                You've conquered the <strong>Gradient Descent Mathematics</strong>!
                            </p>
                            <p style="font-size: 1rem; color: #666;">
                                You can now calculate parameter updates like a pro!
                            </p>
                        </div>
                    </div>
                </div>
                
                <!-- What you've mastered section -->
                <div style="background: rgba(255,255,255,0.6); border-radius: 12px; padding: 25px; margin: 30px auto; max-width: 700px; border: 2px solid #e0e0e0;">
                    <h3 style="margin: 0 0 20px 0; color: #333; font-size: 1.3rem; display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 1.5rem;">🎓</span> Skills You've Mastered
                    </h3>
                    <div style="display: grid; gap: 15px;">
                        <div style="display: flex; align-items: flex-start; gap: 15px;">
                            <div style="font-size: 1.2rem; color: #667eea;">✓</div>
                            <div>
                                <strong style="color: #667eea;">Calculating Predictions:</strong>
                                <span style="color: #555;"> Applying functions to inputs to get outputs</span>
                            </div>
                        </div>
                        <div style="display: flex; align-items: flex-start; gap: 15px;">
                            <div style="font-size: 1.2rem; color: #667eea;">✓</div>
                            <div>
                                <strong style="color: #764ba2;">Computing Gradients:</strong>
                                <span style="color: #555;"> Finding the direction and magnitude of parameter changes</span>
                            </div>
                        </div>
                        <div style="display: flex; align-items: flex-start; gap: 15px;">
                            <div style="font-size: 1.2rem; color: #667eea;">✓</div>
                            <div>
                                <strong style="color: #f3960a;">Updating Parameters:</strong>
                                <span style="color: #555;"> Using learning rates to adjust weights and biases</span>
                            </div>
                        </div>
                        <div style="display: flex; align-items: flex-start; gap: 15px;">
                            <div style="font-size: 1.2rem; color: #667eea;">✓</div>
                            <div>
                                <strong style="color: #9333ea;">Multi-Parameter Optimization:</strong>
                                <span style="color: #555;"> Handling functions with multiple weights and biases simultaneously</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Real-world applications -->
                <div style="background: linear-gradient(135deg, rgba(243,150,10,0.1), rgba(234,179,8,0.1)); border-radius: 12px; padding: 25px; margin: 30px auto; max-width: 700px; border: 2px solid #f3960a;">
                    <h3 style="margin: 0 0 15px 0; color: #333; font-size: 1.3rem; display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 1.5rem;">🌍</span> Real-World Impact
                    </h3>
                    <p style="font-size: 1.05rem; color: #555; line-height: 1.6; margin-bottom: 15px;">
                        The gradient descent mathematics you've just mastered are used in:
                    </p>
                    <ul style="list-style: none; padding: 0; margin: 0;">
                        <li style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 10px;">
                            <span style="color: #f3960a;">📱</span>
                            <span style="color: #555;"><strong>Recommendation Systems:</strong> Netflix, YouTube, and Spotify use gradient descent to optimize content suggestions</span>
                        </li>
                        <li style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 10px;">
                            <span style="color: #f3960a;">🚗</span>
                            <span style="color: #555;"><strong>Self-Driving Cars:</strong> Tesla and Waymo optimize their neural networks using these exact principles</span>
                        </li>
                        <li style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 10px;">
                            <span style="color: #f3960a;">🗣️</span>
                            <span style="color: #555;"><strong>Language Models:</strong> ChatGPT and Claude were trained using gradient descent at massive scale</span>
                        </li>
                    </ul>
                </div>
                
                <!-- Next steps -->
                <div style="background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(118,75,162,0.1)); border-radius: 12px; padding: 25px; margin: 30px auto; max-width: 700px; border: 2px solid #667eea;">
                    <h3 style="margin: 0 0 15px 0; color: #333; font-size: 1.3rem; display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 1.5rem;">🚀</span> Ready for the Final Piece?
                    </h3>
                    <p style="font-size: 1.05rem; color: #555; line-height: 1.6; margin-bottom: 20px;">
                        You've mastered <strong style="color: #667eea;">Loss Functions</strong> and 
                        <strong style="color: #764ba2;">Gradient Descent</strong>. Now it's time to learn about 
                        <strong style="color: #eab308;">Training Data</strong> - the fuel that powers all AI learning!
                    </p>
                    <div style="text-align: center;">
                        <button id="continueBtn" style="padding: 15px 30px; background: linear-gradient(135deg, #eab308, #f59e0b); color: white; border: none; border-radius: 10px; font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 8px rgba(234,179,8,0.3);">
                            Continue to Training Data →
                        </button>
                    </div>
                </div>
                
                <!-- Fun fact -->
                <div style="background: rgba(255,243,224,0.8); border-radius: 12px; padding: 20px; margin: 30px auto; max-width: 700px; border: 2px solid #ffdb58;">
                    <div style="display: flex; align-items: flex-start; gap: 15px;">
                        <span style="font-size: 1.8rem;">💡</span>
                        <div>
                            <strong style="color: #333; font-size: 1.1rem;">Did You Know?</strong>
                            <p style="color: #555; margin-top: 8px; line-height: 1.5;">
                                The gradient descent algorithm was first proposed in 1847 by Augustin-Louis Cauchy!
                                However, it wasn't until the rise of computers and big data that it became the 
                                cornerstone of modern AI. Today, virtually every AI system uses some form of 
                                gradient descent for learning!
                            </p>
                        </div>
                    </div>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
        
        <style>
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.02); }
            }
            
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
            
            #continueBtn:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 12px rgba(234,179,8,0.4);
            }
        </style>
    `;
    
    // Initialize navigation
    initializeNavigation('gradient-descent-congrats', 'createGradientDescentCongrats');
    
    // Add continue button functionality
    setTimeout(() => {
        const continueBtn = document.getElementById('continueBtn');
        if (continueBtn) {
            continueBtn.addEventListener('click', () => {
                // Navigate to the Training Data section
                if (typeof createTrainingDataIntro === 'function') {
                    createTrainingDataIntro();
                }
            });
        }
    }, 100);
};

// Export for modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.createGradientDescentCongrats;
}