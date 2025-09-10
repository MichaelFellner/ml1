/**
 * Training Features Explanation
 * 
 * Brief explanation of what features are
 */

window.createTrainingFeaturesExplanation = function() {
    
    class TrainingFeaturesExplanationLevel extends window.BaseLevelTemplate {
        constructor() {
            super({
                id: 'training-features-explanation',
                name: 'What Are Training Features?',
                type: 'explanation',
                description: '',
                instructions: 'Learn about training features',
                concepts: ['Features'],
                difficulty: 'intermediate',
                interactionType: 'none',
                estimatedTime: 2
            });
        }
        
        async setup() {
            await super.setup();
            
            // Initialize navigation
            if (typeof initializeNavigation === 'function') {
                initializeNavigation('training-features-explanation', 'createTrainingFeaturesExplanation');
            }
            
            // Auto-complete after a delay
            setTimeout(() => {
                if (!this.completed) {
                    this.completed = true;
                    this.completeLevel({ understood: true });
                }
            }, 3000);
        }
        
        _generateMainContent() {
            return `
                <div style="max-width: 1000px; margin: 0 auto; padding: 20px;">
                    
                    <!-- Main Content -->
                    <div style="background: white; border-radius: 12px; padding: 30px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <h2 style="color: #667eea; margin-bottom: 20px;">🐰 Remember Our Bunny Example?</h2>
                        
                        <p style="font-size: 1.2em; line-height: 1.8; color: #555; margin-bottom: 30px;">
                            Earlier, we used <strong>weight</strong> and <strong>age</strong> to predict how much hay to give bunnies.
                            These were our <em>training features</em>.
                        </p>
                        
                        <div style="background: #f5f5f5; border-radius: 8px; padding: 25px; margin: 20px 0;">
                            <p style="margin: 0 0 25px 0; color: #333; font-size: 1.15em; text-align: center;">
                                <strong>More features = Better predictions!</strong>
                            </p>
                            
                            <!-- Spreadsheet comparison -->
                            <div style="display: flex; align-items: center; justify-content: center; gap: 30px;">
                                
                                <!-- Left spreadsheet - 2 features -->
                                <div style="background: white; border: 2px solid #ddd; border-radius: 8px; padding: 15px;">
                                    <p style="margin: 0 0 10px 0; text-align: center; color: #666; font-weight: bold;">Basic Features</p>
                                    <table style="border-collapse: collapse; font-size: 14px;">
                                        <thead>
                                            <tr style="background: #e3f2fd;">
                                                <th style="padding: 10px 15px; border: 1px solid #ddd;">Weight (kg)</th>
                                                <th style="padding: 10px 15px; border: 1px solid #ddd;">Age (years)</th>
                                                <th style="padding: 10px 15px; border: 1px solid #ddd; background: #fff3cd;">Hay (cups)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style="padding: 8px 15px; border: 1px solid #ddd; text-align: center;">2.5</td>
                                                <td style="padding: 8px 15px; border: 1px solid #ddd; text-align: center;">1</td>
                                                <td style="padding: 8px 15px; border: 1px solid #ddd; text-align: center; background: #fffaf0;">3</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 15px; border: 1px solid #ddd; text-align: center;">3.8</td>
                                                <td style="padding: 8px 15px; border: 1px solid #ddd; text-align: center;">3</td>
                                                <td style="padding: 8px 15px; border: 1px solid #ddd; text-align: center; background: #fffaf0;">5</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 15px; border: 1px solid #ddd; text-align: center;">4.2</td>
                                                <td style="padding: 8px 15px; border: 1px solid #ddd; text-align: center;">2</td>
                                                <td style="padding: 8px 15px; border: 1px solid #ddd; text-align: center; background: #fffaf0;">4</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <p style="margin: 10px 0 0 0; text-align: center; color: #ff9800; font-size: 12px;">
                                        ⚠️ OK predictions
                                    </p>
                                </div>
                                
                                <!-- Arrow -->
                                <div style="font-size: 3em; color: #667eea;">
                                    →
                                </div>
                                
                                <!-- Right spreadsheet - 5 features -->
                                <div style="background: white; border: 2px solid #4caf50; border-radius: 8px; padding: 15px;">
                                    <p style="margin: 0 0 10px 0; text-align: center; color: #4caf50; font-weight: bold;">More Features!</p>
                                    <table style="border-collapse: collapse; font-size: 14px;">
                                        <thead>
                                            <tr style="background: #e8f5e9;">
                                                <th style="padding: 10px 12px; border: 1px solid #ddd;">Weight</th>
                                                <th style="padding: 10px 12px; border: 1px solid #ddd;">Age</th>
                                                <th style="padding: 10px 12px; border: 1px solid #ddd;">Activity</th>
                                                <th style="padding: 10px 12px; border: 1px solid #ddd;">Breed</th>
                                                <th style="padding: 10px 12px; border: 1px solid #ddd;">Season</th>
                                                <th style="padding: 10px 12px; border: 1px solid #ddd; background: #fff3cd;">Hay</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style="padding: 8px 12px; border: 1px solid #ddd; text-align: center;">2.5</td>
                                                <td style="padding: 8px 12px; border: 1px solid #ddd; text-align: center;">1</td>
                                                <td style="padding: 8px 12px; border: 1px solid #ddd; text-align: center;">High</td>
                                                <td style="padding: 8px 12px; border: 1px solid #ddd; text-align: center;">Mini</td>
                                                <td style="padding: 8px 12px; border: 1px solid #ddd; text-align: center;">Winter</td>
                                                <td style="padding: 8px 12px; border: 1px solid #ddd; text-align: center; background: #fffaf0;">3</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 12px; border: 1px solid #ddd; text-align: center;">3.8</td>
                                                <td style="padding: 8px 12px; border: 1px solid #ddd; text-align: center;">3</td>
                                                <td style="padding: 8px 12px; border: 1px solid #ddd; text-align: center;">Low</td>
                                                <td style="padding: 8px 12px; border: 1px solid #ddd; text-align: center;">Lop</td>
                                                <td style="padding: 8px 12px; border: 1px solid #ddd; text-align: center;">Summer</td>
                                                <td style="padding: 8px 12px; border: 1px solid #ddd; text-align: center; background: #fffaf0;">5</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 12px; border: 1px solid #ddd; text-align: center;">4.2</td>
                                                <td style="padding: 8px 12px; border: 1px solid #ddd; text-align: center;">2</td>
                                                <td style="padding: 8px 12px; border: 1px solid #ddd; text-align: center;">Medium</td>
                                                <td style="padding: 8px 12px; border: 1px solid #ddd; text-align: center;">Rex</td>
                                                <td style="padding: 8px 12px; border: 1px solid #ddd; text-align: center;">Spring</td>
                                                <td style="padding: 8px 12px; border: 1px solid #ddd; text-align: center; background: #fffaf0;">4</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <p style="margin: 10px 0 0 0; text-align: center; color: #4caf50; font-size: 12px;">
                                        ✓ Better predictions!
                                    </p>
                                </div>
                                
                            </div>
                        </div>
                        
                        <div style="background: #e8f5e9; border-radius: 8px; padding: 20px; margin-top: 25px;">
                            <p style="color: #2e7d32; margin: 0; font-size: 1.1em; line-height: 1.6; text-align: center;">
                                With more features like <strong>activity level</strong>, <strong>breed</strong>, and <strong>season</strong>, 
                                the AI can understand each bunny's needs better and make more accurate predictions!
                            </p>
                        </div>
                    </div>
                    
                </div>
                
                <!-- Standard navigation -->
                ${typeof createStandardNavigation === 'function' ? createStandardNavigation() : ''}
            `;
        }
        
        cleanup() {
            super.cleanup();
        }
    }
    
    const level = new TrainingFeaturesExplanationLevel();
    level.create().catch(error => {
        console.error('Failed to create Training Features Explanation:', error);
    });
    
    return level;
};

// Export for modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.createTrainingFeaturesExplanation;
}