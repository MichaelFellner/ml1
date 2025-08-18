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
                            You've mastered all three core concepts of machine learning!
                        </p>
                    </div>
                </div>
                
                <!-- Three pillars of achievement -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 25px; margin: 40px auto; max-width: 900px;">
                    <!-- Loss Functions -->
                    <div style="background: rgba(45,213,115,0.1); border-radius: 15px; padding: 25px; border: 2px solid #2dd573; text-align: center;">
                        <div style="font-size: 3rem; margin-bottom: 15px;">📊</div>
                        <h3 style="color: #2dd573; margin: 0 0 10px 0;">Loss Functions</h3>
                        <p style="color: #666; font-size: 0.95rem; line-height: 1.5;">
                            Mastered measuring error and understanding how AI knows when it's wrong
                        </p>
                        <div style="margin-top: 15px; color: #2dd573; font-weight: bold;">
                            ✓ Complete
                        </div>
                    </div>
                    
                    <!-- Gradient Descent -->
                    <div style="background: rgba(102,126,234,0.1); border-radius: 15px; padding: 25px; border: 2px solid #667eea; text-align: center;">
                        <div style="font-size: 3rem; margin-bottom: 15px;">🎯</div>
                        <h3 style="color: #667eea; margin: 0 0 10px 0;">Gradient Descent</h3>
                        <p style="color: #666; font-size: 0.95rem; line-height: 1.5;">
                            Conquered the algorithm that helps AI learn and improve automatically
                        </p>
                        <div style="margin-top: 15px; color: #667eea; font-weight: bold;">
                            ✓ Complete
                        </div>
                    </div>
                    
                    <!-- Training Data -->
                    <div style="background: rgba(234,179,8,0.1); border-radius: 15px; padding: 25px; border: 2px solid #eab308; text-align: center;">
                        <div style="font-size: 3rem; margin-bottom: 15px;">📚</div>
                        <h3 style="color: #eab308; margin: 0 0 10px 0;">Training Data</h3>
                        <p style="color: #666; font-size: 0.95rem; line-height: 1.5;">
                            Understood how AI learns from examples and generalizes to new situations
                        </p>
                        <div style="margin-top: 15px; color: #eab308; font-weight: bold;">
                            ✓ Complete
                        </div>
                    </div>
                </div>
                
                <!-- Skills gained -->
                <div style="background: white; border-radius: 15px; padding: 30px; margin: 40px auto; max-width: 800px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
                    <h3 style="text-align: center; color: #333; margin: 0 0 25px 0; font-size: 1.5rem;">
                        🎓 Skills You've Gained
                    </h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                        <div>
                            <h4 style="color: #667eea; margin: 0 0 10px 0;">Technical Understanding</h4>
                            <ul style="color: #666; line-height: 1.8; margin: 0; padding-left: 20px;">
                                <li>Calculate loss functions</li>
                                <li>Perform gradient descent</li>
                                <li>Optimize parameters</li>
                                <li>Work with training data</li>
                            </ul>
                        </div>
                        <div>
                            <h4 style="color: #764ba2; margin: 0 0 10px 0;">Conceptual Knowledge</h4>
                            <ul style="color: #666; line-height: 1.8; margin: 0; padding-left: 20px;">
                                <li>How AI learns from mistakes</li>
                                <li>Why learning rates matter</li>
                                <li>Training vs testing data</li>
                                <li>Feature importance</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <!-- Real-world applications -->
                <div style="background: linear-gradient(135deg, rgba(255,243,224,0.5), rgba(255,255,255,0.5)); border-radius: 15px; padding: 30px; margin: 40px auto; max-width: 800px; border: 2px solid #ffdb58;">
                    <h3 style="text-align: center; color: #333; margin: 0 0 20px 0; font-size: 1.5rem;">
                        🌍 You Now Understand How These Work
                    </h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; text-align: center;">
                        <div>
                            <div style="font-size: 2.5rem; margin-bottom: 8px;">🤖</div>
                            <div style="color: #555; font-weight: 600;">ChatGPT & Claude</div>
                        </div>
                        <div>
                            <div style="font-size: 2.5rem; margin-bottom: 8px;">🚗</div>
                            <div style="color: #555; font-weight: 600;">Self-Driving Cars</div>
                        </div>
                        <div>
                            <div style="font-size: 2.5rem; margin-bottom: 8px;">📱</div>
                            <div style="color: #555; font-weight: 600;">Recommendation Systems</div>
                        </div>
                        <div>
                            <div style="font-size: 2.5rem; margin-bottom: 8px;">🏥</div>
                            <div style="color: #555; font-weight: 600;">Medical Diagnosis AI</div>
                        </div>
                        <div>
                            <div style="font-size: 2.5rem; margin-bottom: 8px;">🎮</div>
                            <div style="color: #555; font-weight: 600;">Game AI</div>
                        </div>
                        <div>
                            <div style="font-size: 2.5rem; margin-bottom: 8px;">📸</div>
                            <div style="color: #555; font-weight: 600;">Image Recognition</div>
                        </div>
                    </div>
                </div>
                
                <!-- Certificate-style achievement -->
                <div style="background: linear-gradient(135deg, #f9f9f9, #ffffff); border: 3px solid #d4af37; border-radius: 15px; padding: 40px; margin: 40px auto; max-width: 700px; box-shadow: 0 8px 20px rgba(212,175,55,0.2); text-align: center;">
                    <div style="font-size: 1.8rem; color: #d4af37; margin-bottom: 15px;">
                        ✨ Certificate of Achievement ✨
                    </div>
                    <div style="font-size: 1.1rem; color: #555; line-height: 1.8;">
                        This certifies that you have successfully completed<br>
                        <strong style="font-size: 1.3rem; color: #333;">The AI Optimization Learning Journey</strong><br>
                        demonstrating proficiency in<br>
                        <em style="color: #667eea;">Loss Functions, Gradient Descent, and Training Data</em>
                    </div>
                    <div style="margin-top: 25px; font-size: 2rem;">
                        🏅
                    </div>
                </div>
                
                <!-- What's next -->
                <div style="background: white; border-radius: 15px; padding: 30px; margin: 40px auto; max-width: 800px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
                    <h3 style="text-align: center; color: #333; margin: 0 0 20px 0; font-size: 1.5rem;">
                        🚀 What's Next?
                    </h3>
                    <p style="color: #666; line-height: 1.8; text-align: center; margin-bottom: 20px;">
                        You've built a solid foundation in machine learning fundamentals!<br>
                        Here are some paths you could explore next:
                    </p>
                    <div style="display: grid; gap: 15px;">
                        <div style="background: rgba(102,126,234,0.05); padding: 15px; border-radius: 8px; border-left: 4px solid #667eea;">
                            <strong style="color: #667eea;">Deep Learning:</strong>
                            <span style="color: #666;"> Explore neural networks and how they stack these concepts in layers</span>
                        </div>
                        <div style="background: rgba(234,179,8,0.05); padding: 15px; border-radius: 8px; border-left: 4px solid #eab308;">
                            <strong style="color: #eab308;">Practical Projects:</strong>
                            <span style="color: #666;"> Apply your knowledge to real datasets and problems</span>
                        </div>
                        <div style="background: rgba(45,213,115,0.05); padding: 15px; border-radius: 8px; border-left: 4px solid #2dd573;">
                            <strong style="color: #2dd573;">Advanced Algorithms:</strong>
                            <span style="color: #666;"> Learn about different optimization techniques beyond gradient descent</span>
                        </div>
                    </div>
                </div>
                
                <!-- Inspiring quote -->
                <div style="background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(118,75,162,0.1)); border-radius: 15px; padding: 30px; margin: 40px auto; max-width: 700px; text-align: center; border: 2px solid rgba(102,126,234,0.3);">
                    <div style="font-size: 1.8rem; margin-bottom: 15px;">💭</div>
                    <blockquote style="font-size: 1.2rem; color: #555; font-style: italic; margin: 0;">
                        "The best way to predict the future is to invent it."
                    </blockquote>
                    <div style="margin-top: 15px; color: #667eea; font-weight: 600;">
                        - Alan Kay
                    </div>
                    <div style="margin-top: 20px; color: #666;">
                        You now have the knowledge to understand and shape the AI-powered future!
                    </div>
                </div>
                
                <!-- Action buttons -->
                <div style="text-align: center; margin: 40px 0;">
                    <div style="display: inline-flex; gap: 15px;">
                        <button id="reviewBtn" style="
                            padding: 15px 30px;
                            background: white;
                            color: #667eea;
                            border: 2px solid #667eea;
                            border-radius: 10px;
                            font-size: 1.1rem;
                            font-weight: 600;
                            cursor: pointer;
                            transition: all 0.3s ease;
                        ">
                            📖 Review Material
                        </button>
                        <button id="shareBtn" style="
                            padding: 15px 30px;
                            background: linear-gradient(135deg, #667eea, #764ba2);
                            color: white;
                            border: none;
                            border-radius: 10px;
                            font-size: 1.1rem;
                            font-weight: 600;
                            cursor: pointer;
                            transition: all 0.3s ease;
                            box-shadow: 0 4px 8px rgba(102,126,234,0.3);
                        ">
                            🎉 Share Achievement
                        </button>
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