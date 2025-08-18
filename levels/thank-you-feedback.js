/**
 * Thank You and Feedback
 * 
 * Final thank you message and feedback request
 */

window.createThankYouFeedback = function() {
    
    class ThankYouFeedbackLevel extends window.BaseLevelTemplate {
        constructor() {
            super({
                id: 'thank-you-feedback',
                name: 'Thank You!',
                type: 'tutorial',
                description: 'Final message and feedback request',
                instructions: '',
                concepts: ['Feedback', 'Community', 'Continuous Learning'],
                difficulty: 'beginner',
                interactionType: 'reading',
                estimatedTime: 1
            });
        }
        
        async setup() {
            await super.setup();
            
            // Initialize navigation
            if (typeof initializeNavigation === 'function') {
                initializeNavigation('thank-you-feedback', 'createThankYouFeedback');
            }
        }
        
        _generateMainContent() {
            return `
                <!-- Thank you header -->
                <div style="text-align: center; margin-bottom: 40px;">
                    <h1 style="font-size: 3rem; margin-bottom: 20px; background: linear-gradient(45deg, #2dd573, #667eea, #eab308); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                        Thank You! 🙏
                    </h1>
                    <p style="font-size: 1.3rem; color: #555; line-height: 1.6;">
                        For joining us on this AI learning journey
                    </p>
                </div>
                
                <!-- Congratulations card -->
                <div style="background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(118,75,162,0.1)); border-radius: 20px; padding: 40px; margin-bottom: 30px; border: 3px solid #667eea; text-align: center;">
                    <div style="font-size: 5rem; margin-bottom: 20px;">🎊</div>
                    <h2 style="color: #667eea; margin: 0 0 20px 0; font-size: 1.8rem;">
                        You Did It!
                    </h2>
                    <p style="font-size: 1.1rem; color: #555; line-height: 1.8;">
                        You've successfully completed the <strong>AI Optimization Learning Journey</strong>!<br>
                        You now understand the fundamental principles that power modern artificial intelligence.
                    </p>
                </div>
                
                <!-- What you accomplished -->
                <div style="background: white; border-radius: 15px; padding: 30px; margin-bottom: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
                    <h3 style="color: #333; margin: 0 0 20px 0; text-align: center;">
                        🏆 Your Achievements
                    </h3>
                    
                    <div style="display: grid; gap: 15px;">
                        <div style="display: flex; align-items: center; gap: 15px; padding: 15px; background: rgba(45,213,115,0.05); border-radius: 10px;">
                            <span style="font-size: 1.8rem;">📊</span>
                            <div>
                                <strong style="color: #2dd573;">Mastered Loss Functions</strong>
                                <p style="color: #666; margin: 5px 0 0 0; font-size: 0.95rem;">
                                    Learned how AI measures and learns from mistakes
                                </p>
                            </div>
                        </div>
                        
                        <div style="display: flex; align-items: center; gap: 15px; padding: 15px; background: rgba(102,126,234,0.05); border-radius: 10px;">
                            <span style="font-size: 1.8rem;">🎯</span>
                            <div>
                                <strong style="color: #667eea;">Conquered Gradient Descent</strong>
                                <p style="color: #666; margin: 5px 0 0 0; font-size: 0.95rem;">
                                    Understood the algorithm at the heart of all modern AI
                                </p>
                            </div>
                        </div>
                        
                        <div style="display: flex; align-items: center; gap: 15px; padding: 15px; background: rgba(234,179,8,0.05); border-radius: 10px;">
                            <span style="font-size: 1.8rem;">📚</span>
                            <div>
                                <strong style="color: #eab308;">Understood Training Data</strong>
                                <p style="color: #666; margin: 5px 0 0 0; font-size: 0.95rem;">
                                    Learned how AI learns from examples and generalizes
                                </p>
                            </div>
                        </div>
                        
                        <div style="display: flex; align-items: center; gap: 15px; padding: 15px; background: rgba(118,75,162,0.05); border-radius: 10px;">
                            <span style="font-size: 1.8rem;">🚀</span>
                            <div>
                                <strong style="color: #764ba2;">Built Real AI Systems</strong>
                                <p style="color: #666; margin: 5px 0 0 0; font-size: 0.95rem;">
                                    Created working optimizers for balloons, bunnies, coffee, and more!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Feedback request -->
                <div style="background: linear-gradient(135deg, rgba(234,179,8,0.1), rgba(245,158,11,0.1)); border-radius: 15px; padding: 30px; margin-bottom: 30px; border: 2px solid #eab308;">
                    <h3 style="color: #eab308; margin: 0 0 20px 0; text-align: center; display: flex; align-items: center; justify-content: center; gap: 10px;">
                        <span style="font-size: 1.5rem;">💭</span> We'd Love Your Feedback!
                    </h3>
                    
                    <p style="font-size: 1.05rem; color: #555; line-height: 1.8; margin-bottom: 20px;">
                        Your feedback helps us improve this learning experience for future students. 
                        We'd greatly appreciate if you could share:
                    </p>
                    
                    <ul style="color: #666; line-height: 1.8; margin-bottom: 20px;">
                        <li>What you enjoyed most about the course</li>
                        <li>Areas where you struggled or got confused</li>
                        <li>Suggestions for new topics or improvements</li>
                        <li>Any bugs or technical issues you encountered</li>
                    </ul>
                    
                    <div style="background: white; padding: 20px; border-radius: 10px; text-align: center;">
                        <p style="color: #555; margin: 0 0 15px 0;">
                            <strong>Please send your feedback to:</strong>
                        </p>
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border: 2px solid #eab308;">
                            <a href="mailto:placeholder@mail.com" style="color: #eab308; font-size: 1.2rem; font-weight: bold; text-decoration: none;">
                                📧 placeholder@mail.com
                            </a>
                        </div>
                        <p style="color: #999; font-size: 0.9rem; margin-top: 10px; font-style: italic;">
                            Every message is read and appreciated!
                        </p>
                    </div>
                </div>
                
                <!-- Share the knowledge -->
                <div style="background: white; border-radius: 15px; padding: 30px; margin-bottom: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
                    <h3 style="color: #667eea; margin: 0 0 20px 0; text-align: center;">
                        🌟 Share the Knowledge
                    </h3>
                    <p style="font-size: 1.05rem; color: #555; line-height: 1.8; text-align: center; margin-bottom: 20px;">
                        If you found this course valuable, please share it with others who might benefit!
                    </p>
                    <div style="display: flex; justify-content: center; gap: 15px;">
                        <button style="padding: 10px 20px; background: #1DA1F2; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">
                            🐦 Share on Twitter
                        </button>
                        <button style="padding: 10px 20px; background: #0077B5; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">
                            💼 Share on LinkedIn
                        </button>
                        <button style="padding: 10px 20px; background: #4267B2; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">
                            📘 Share on Facebook
                        </button>
                    </div>
                </div>
                
                <!-- Final message -->
                <div style="background: linear-gradient(135deg, rgba(45,213,115,0.1), rgba(102,126,234,0.1), rgba(234,179,8,0.1)); border-radius: 20px; padding: 40px; text-align: center; border: 3px solid transparent; background-clip: padding-box; position: relative;">
                    <div style="position: absolute; inset: 0; border-radius: 20px; padding: 3px; background: linear-gradient(45deg, #2dd573, #667eea, #eab308); -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude;"></div>
                    
                    <div style="position: relative;">
                        <div style="font-size: 3rem; margin-bottom: 20px;">🌈</div>
                        <h3 style="color: #333; margin: 0 0 20px 0; font-size: 1.5rem;">
                            The End... and The Beginning!
                        </h3>
                        <p style="font-size: 1.1rem; color: #555; line-height: 1.8; margin-bottom: 15px;">
                            This isn't the end of your AI journey – it's just the beginning!
                        </p>
                        <p style="font-size: 1.05rem; color: #666; line-height: 1.6;">
                            You now have the foundation to understand and create amazing things with AI.<br>
                            Keep learning, keep building, and keep pushing the boundaries of what's possible.
                        </p>
                        <div style="margin-top: 25px; padding-top: 20px; border-top: 2px solid rgba(0,0,0,0.1);">
                            <p style="font-size: 1.2rem; color: #667eea; font-weight: bold; margin: 0;">
                                We can't wait to see what you'll create! 🚀
                            </p>
                        </div>
                    </div>
                </div>
                
                <!-- Fun stats -->
                <div style="background: rgba(255,243,224,0.5); border-radius: 15px; padding: 25px; margin-top: 30px; text-align: center;">
                    <h4 style="color: #333; margin: 0 0 15px 0;">📊 Your Learning Journey Stats</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px;">
                        <div>
                            <div style="font-size: 2rem; color: #667eea; font-weight: bold;">30+</div>
                            <div style="color: #666; font-size: 0.9rem;">Levels Completed</div>
                        </div>
                        <div>
                            <div style="font-size: 2rem; color: #eab308; font-weight: bold;">100+</div>
                            <div style="color: #666; font-size: 0.9rem;">Parameters Optimized</div>
                        </div>
                        <div>
                            <div style="font-size: 2rem; color: #2dd573; font-weight: bold;">∞</div>
                            <div style="color: #666; font-size: 0.9rem;">Future Possibilities</div>
                        </div>
                    </div>
                </div>
                
                <!-- Navigation note -->
                <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 10px;">
                    <p style="color: #666; margin: 0;">
                        📝 <strong>Note:</strong> You can always revisit any section using the navigation menu below.<br>
                        Your progress has been saved, and all materials remain available for review!
                    </p>
                </div>
                
                ${typeof createStandardNavigation === 'function' ? createStandardNavigation() : ''}
            `;
        }
    }
    
    const level = new ThankYouFeedbackLevel();
    level.create().catch(error => {
        console.error('Failed to create Thank You & Feedback level:', error);
    });
    
    return level;
};

// Export for modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.createThankYouFeedback;
}