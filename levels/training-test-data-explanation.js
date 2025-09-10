/**
 * Training vs Test Data Explanation
 * 
 * Non-interactive level explaining the importance of training data
 * and introducing the concept of test data using the bunny analogy
 */

window.createTrainingTestDataExplanation = function() {
    
    class TrainingTestDataExplanationLevel extends window.BaseLevelTemplate {
        constructor() {
            super({
                id: 'training-test-data-explanation',
                name: 'Training Data vs Test Data',
                type: 'lesson',
                description: '',
                instructions: '',
                concepts: ['Training Data', 'Test Data', 'Generalization', 'Validation'],
                difficulty: 'intermediate',
                interactionType: 'reading',
                estimatedTime: 2
            });
        }
        
        async setup() {
            await super.setup();
            
            // Initialize navigation
            if (typeof initializeNavigation === 'function') {
                initializeNavigation('training-test-data-explanation', 'createTrainingTestDataExplanation');
            }
        }
        
        _generateMainContent() {
            return `
                <div style="padding: 20px; max-width: 1200px; margin: 0 auto;">
                    
                    <!-- Compact header -->
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                        <h2 style="margin: 0 0 10px 0; font-size: 1.5em;">📊 Training vs Test Data</h2>
                        <p style="margin: 0; font-size: 1.1em; opacity: 0.95;">
                            How do we know if our function works on <strong>new, unseen data</strong>? We split our bunnies into two groups:
                        </p>
                    </div>
                    
                    <!-- Two compact boxes side by side -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        
                        <!-- Training Data Box -->
                        <div style="background: white; border: 2px solid #667eea; border-radius: 10px; padding: 20px;">
                            <h3 style="color: #667eea; margin: 0 0 12px 0; display: flex; align-items: center; gap: 8px;">
                                <span style="font-size: 1.3em;">📚</span>
                                <span>Training Data</span>
                            </h3>
                            
                            <p style="color: #555; margin: 0 0 15px 0; line-height: 1.5;">
                                Bunnies we use to <strong>train our function</strong> with gradient descent.
                            </p>
                            
                            <!-- Compact bunny examples -->
                            <div style="background: #f8f9fa; border-radius: 6px; padding: 12px; margin-bottom: 12px;">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <span>🐰 5kg → 250g hay</span>
                                    <span>🐰 7kg → 350g hay</span>
                                    <span>🐰 3kg → 150g hay</span>
                                </div>
                            </div>
                            
                            <div style="background: #e3f2fd; border-left: 3px solid #667eea; padding: 10px; border-radius: 3px;">
                                <p style="margin: 0; color: #555; font-size: 0.95em;">
                                    <strong>Purpose:</strong> The function adjusts its parameters to minimize error on these examples.
                                </p>
                            </div>
                        </div>
                        
                        <!-- Test Data Box -->
                        <div style="background: white; border: 2px solid #4ecdc4; border-radius: 10px; padding: 20px;">
                            <h3 style="color: #4ecdc4; margin: 0 0 12px 0; display: flex; align-items: center; gap: 8px;">
                                <span style="font-size: 1.3em;">🔍</span>
                                <span>Test Data</span>
                            </h3>
                            
                            <p style="color: #555; margin: 0 0 15px 0; line-height: 1.5;">
                                Bunnies kept <strong>hidden during training</strong> to verify our function works.
                            </p>
                            
                            <!-- Compact test examples -->
                            <div style="background: #f8f9fa; border-radius: 6px; padding: 12px; margin-bottom: 12px;">
                                <div style="display: flex; justify-content: space-around; align-items: center;">
                                    <span>🐰❓ 4.5kg → 225g ✅</span>
                                    <span>🐰❓ 6kg → 300g ✅</span>
                                </div>
                            </div>
                            
                            <div style="background: #e0f7fa; border-left: 3px solid #4ecdc4; padding: 10px; border-radius: 3px;">
                                <p style="margin: 0; color: #555; font-size: 0.95em;">
                                    <strong>Purpose:</strong> Proves the function learned the pattern, not just memorized examples.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Key takeaway -->
                    <div style="background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 15px; margin-top: 20px; text-align: center;">
                        <p style="margin: 0; color: #92400e; font-size: 1.05em;">
                            💡 <strong>Key Insight:</strong> If our function performs well on test data it's never seen, 
                            we know it discovered the true pattern and will work on future data!
                        </p>
                    </div>
                    
                    <!-- Standard navigation -->
                    ${typeof createStandardNavigation === 'function' ? createStandardNavigation() : ''}
                </div>
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