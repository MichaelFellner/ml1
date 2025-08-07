function createLossQuizCongrats() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration" style="padding: 20px; max-width: 1200px; margin: 0 auto;">
                <h1 style="font-size: 2.5rem; margin-bottom: 20px; background: linear-gradient(45deg, #667eea, #764ba2); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-align: center;">
                    🎉 Congratulations!
                </h1>
                
                <!-- Main congratulations card using concept1 div -->
                <div id="concept1" style="background: linear-gradient(135deg, rgba(45,213,115,0.15), rgba(45,213,115,0.05)); border-radius: 15px; padding: 40px; margin: 30px auto; max-width: 700px; border: 3px solid #2dd573; box-shadow: 0 8px 16px rgba(45,213,115,0.2); animation: pulse 2s ease-in-out infinite;">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 30px; flex-direction: column;">
                        <!-- Large checkmark -->
                        <div style="font-size: 5rem; color: #2dd573; animation: bounce 1s ease-in-out;">✅</div>
                        
                        <!-- Success message -->
                        <div style="text-align: center;">
                            <h2 style="margin: 0 0 15px 0; font-size: 1.8rem; color: #2dd573;">Perfect Score!</h2>
                            <p style="font-size: 1.2rem; color: #333; margin: 0 0 10px 0;">
                                You've mastered the concept of <strong>Loss Functions</strong>!
                            </p>
                            <p style="font-size: 1rem; color: #666;">
                                You correctly calculated all three types of loss functions.
                            </p>
                        </div>
                    </div>
                </div>
                
                <!-- What you learned section -->
                <div style="background: rgba(255,255,255,0.6); border-radius: 12px; padding: 25px; margin: 30px auto; max-width: 700px; border: 2px solid #e0e0e0;">
                    <h3 style="margin: 0 0 20px 0; color: #333; font-size: 1.3rem; display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 1.5rem;">📚</span> What You've Learned
                    </h3>
                    <div style="display: grid; gap: 15px;">
                        <div style="display: flex; align-items: flex-start; gap: 15px;">
                            <div style="font-size: 1.2rem; color: #2dd573;">✓</div>
                            <div>
                                <strong style="color: #667eea;">Squared Loss:</strong>
                                <span style="color: #555;"> Penalizes larger errors more heavily by squaring the difference</span>
                            </div>
                        </div>
                        <div style="display: flex; align-items: flex-start; gap: 15px;">
                            <div style="font-size: 1.2rem; color: #2dd573;">✓</div>
                            <div>
                                <strong style="color: #764ba2;">Absolute Loss:</strong>
                                <span style="color: #555;"> Treats all errors equally using absolute value</span>
                            </div>
                        </div>
                        <div style="display: flex; align-items: flex-start; gap: 15px;">
                            <div style="font-size: 1.2rem; color: #2dd573;">✓</div>
                            <div>
                                <strong style="color: #f3960a;">Custom Loss Functions:</strong>
                                <span style="color: #555;"> Can be designed for specific needs and applications</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Next steps -->
                <div style="background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(118,75,162,0.1)); border-radius: 12px; padding: 25px; margin: 30px auto; max-width: 700px; border: 2px solid #667eea;">
                    <h3 style="margin: 0 0 15px 0; color: #333; font-size: 1.3rem; display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 1.5rem;">🚀</span> Ready for the Next Challenge?
                    </h3>
                    <p style="font-size: 1.05rem; color: #555; line-height: 1.6; margin-bottom: 20px;">
                        Now that you understand how loss functions measure errors, you're ready to learn about 
                        <strong style="color: #667eea;">Gradient Descent</strong> - the algorithm that uses these 
                        loss measurements to automatically improve AI predictions!
                    </p>
                    <div style="text-align: center;">
                        <button id="continueBtn" style="padding: 15px 30px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 10px; font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 8px rgba(102,126,234,0.3);">
                            Continue to Gradient Descent →
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
                                Loss functions are at the heart of every machine learning model! From recommendation 
                                systems to self-driving cars, they all use loss functions to measure and improve their 
                                performance. You've just learned one of the most fundamental concepts in AI!
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
                box-shadow: 0 6px 12px rgba(102,126,234,0.4);
            }
        </style>
    `;
    
    // Initialize navigation
    initializeNavigation('ip2c-congrats', 'createLossQuizCongrats');
    
    // Add continue button functionality
    setTimeout(() => {
        const continueBtn = document.getElementById('continueBtn');
        if (continueBtn) {
            continueBtn.addEventListener('click', () => {
                // Navigate to the next section (Introducing Gradient Descent)
                if (typeof createInstructionPart3 === 'function') {
                    createInstructionPart3();
                }
            });
        }
    }, 100);
}
