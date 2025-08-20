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
                            <h2 style="margin: 0 0 15px 0; font-size: 1.8rem; color: #2dd573;">Nice Job!</h2>
                            <p style="font-size: 1.2rem; color: #333; margin: 0 0 10px 0;">
                                You've learned about <strong>Loss Functions</strong>!
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
