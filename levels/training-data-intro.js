/**
 * Training Data Introduction
 * 
 * Explains the purpose and workflow of training data in gradient descent
 */

window.createTrainingDataIntro = function() {
    
    class TrainingDataIntroLevel extends window.BaseLevelTemplate {
        constructor() {
            super({
                id: 'training-data-intro',
                name: 'Training Data Introduction',
                type: 'tutorial',
                description: 'Understanding the role of training data in gradient descent',
                instructions: '',
                concepts: ['Training Data', 'Supervised Learning', 'Prediction Workflow'],
                difficulty: 'beginner',
                interactionType: 'reading',
                estimatedTime: 3
            });
        }
        
        async setup() {
            await super.setup();
            
            // CRITICAL: Initialize navigation
            if (typeof initializeNavigation === 'function') {
                initializeNavigation('training-data-intro', 'createTrainingDataIntro');
            }
        }
        
        _generateMainContent() {
            return `
                <div style="max-height: 80vh; display: flex; flex-direction: column; gap: 15px;">
                    <!-- Section Header -->
                    <h2 style="text-align: center; margin: 10px 0; color: #333;">Training Data</h2>
                    
                    <!-- Using the Training Data style from Core Concepts -->
                    <div style="background: rgba(234,179,8,0.1); border-radius: 12px; padding: 20px; border-left: 4px solid #eab308; max-width: 900px; margin: 0 auto; width: 100%;">
                        
                        <!-- First text area -->
                        <div style="background: white; border-radius: 8px; padding: 15px; margin-bottom: 15px;">
                            <p style="font-size: 1.1rem; color: #555; line-height: 1.6; margin: 0;">
                                Gradient descent works by plugging in numbers into a function, 
                                and then seeing the correct answer. But how does it know what the correct answer is? And
                                why is gradient descent needed if we already have the correct answer anyway? This is 
                                the purpose of training data. Here's the general workflow.
                            </p>
                        </div>
                        
                        <!-- Second text area -->
                        <div style="background: white; border-radius: 8px; padding: 15px; margin-bottom: 15px;">
                            <div style="display: flex; align-items: flex-start; gap: 10px;">
                                <span style="font-size: 1.3rem; color: #eab308; font-weight: bold;">1)</span>
                                <p style="font-size: 1.1rem; color: #555; line-height: 1.6; margin: 0;">
                                    We use gradient descent to have our function make good predictions on the training data
                                    where it knows the answer
                                </p>
                            </div>
                        </div>
                        
                        <!-- Third text area -->
                        <div style="background: white; border-radius: 8px; padding: 15px;">
                            <div style="display: flex; align-items: flex-start; gap: 10px;">
                                <span style="font-size: 1.3rem; color: #eab308; font-weight: bold;">2)</span>
                                <p style="font-size: 1.1rem; color: #555; line-height: 1.6; margin: 0;">
                                    We then let our function loose into the wild so it can make predictions on things it doesn't know the answer to.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- CRITICAL: Include standard navigation -->
                ${typeof createStandardNavigation === 'function' ? createStandardNavigation() : ''}
            `;
        }
    }
    
    const level = new TrainingDataIntroLevel();
    level.create().catch(error => {
        console.error('Failed to create Training Data Introduction:', error);
    });
    
    return level;
};

// Export for modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.createTrainingDataIntro;
}