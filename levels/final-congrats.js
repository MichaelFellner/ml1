/**
 * Final Congratulations
 * 
 * Celebration page for completing all three core sections
 */

window.createFinalCongrats = function() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration" style="padding: 20px; max-width: 1200px; margin: 0 auto;">
                <h1 style="font-size: 3rem; margin-bottom: 30px; background: linear-gradient(45deg, #2dd573, #667eea, #eab308); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-align: center; animation: shimmer 3s ease-in-out infinite;">
                    🎊 CONGRATULATIONS! 🎊
                </h1>
                
                <!-- Main achievement card -->
                <div style="background: linear-gradient(135deg, rgba(45,213,115,0.1), rgba(102,126,234,0.1), rgba(234,179,8,0.1)); border-radius: 20px; padding: 50px; margin: 30px auto; max-width: 800px; border: 4px solid transparent; background-clip: padding-box; position: relative; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                    <div style="position: absolute; inset: 0; border-radius: 20px; padding: 4px; background: linear-gradient(45deg, #2dd573, #667eea, #eab308); -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude;"></div>
                    
                    <div style="text-align: center; position: relative;">
                        <!-- Trophy and stars -->
                        <div style="font-size: 6rem; margin-bottom: 20px; animation: float 3s ease-in-out infinite;">
                            🏆
                        </div>
                        <div style="font-size: 2rem; margin-bottom: 20px;">
                            ⭐ ⭐ ⭐
                        </div>
                        
                        <!-- Achievement message -->
                        <h2 style="margin: 0 0 20px 0; font-size: 2rem; color: #333;">
                            AI Learning Journey Complete!
                        </h2>
                        <p style="font-size: 1.3rem; color: #555; margin: 0;">
                            You've learned about all three core concepts of machine learning!
                        </p>
                    </div>
                </div>
                
             
                
                
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
        
        <style>
            @keyframes shimmer {
                0%, 100% { 
                    background-position: 0% 50%;
                    background-size: 200% 200%;
                }
                50% { 
                    background-position: 100% 50%;
                    background-size: 200% 200%;
                }
            }
            
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-20px); }
            }
            
            #reviewBtn:hover {
                background: rgba(102,126,234,0.1);
                transform: translateY(-2px);
            }
            
            #shareBtn:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 12px rgba(102,126,234,0.4);
            }
        </style>
    `;
    
    // Initialize navigation
    initializeNavigation('final-congrats', 'createFinalCongrats');
    
    // Add button functionality
    setTimeout(() => {
        const reviewBtn = document.getElementById('reviewBtn');
        if (reviewBtn) {
            reviewBtn.addEventListener('click', () => {
                // Navigate back to the beginning or to a review section
                if (typeof createIntroduction === 'function') {
                    createIntroduction();
                }
            });
        }
        
        const shareBtn = document.getElementById('shareBtn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                // Could implement sharing functionality
                alert('🎉 Congratulations on completing the AI Learning Journey! Share your achievement with others!');
            });
        }
    }, 100);
};

// Export for modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.createFinalCongrats;
}