/**
 * Training Data Introduction
 * 
 * Explains the purpose and workflow of training data in gradient descent
 * with engaging visuals and interactive elements
 */

window.createTrainingDataIntro = function() {
    
    class TrainingDataIntroLevel extends window.BaseLevelTemplate {
        constructor() {
            super({
                id: 'training-data-intro',
                name: 'Training Data: How Gradient Descent Knows the Answer',
                type: 'tutorial',
                description: '',
                instructions: '',
                concepts: ['Training Data', 'Supervised Learning', 'Prediction Workflow'],
                difficulty: 'beginner',
                interactionType: 'interactive',
                estimatedTime: 2
            });
            
            this.animationFrame = null;
        }
        
        async setup() {
            await super.setup();
            
            // CRITICAL: Initialize navigation
            if (typeof initializeNavigation === 'function') {
                initializeNavigation('training-data-intro', 'createTrainingDataIntro');
            }
            
            // Add CSS animations
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.02); }
                }
                
                .data-cell {
                    background: white;
                    border: 1px solid #e5e7eb;
                    padding: 8px;
                    text-align: center;
                    font-family: monospace;
                }
                
                .header-cell {
                    background: #6366f1;
                    color: white;
                    font-weight: bold;
                }
                
                .thought-bubble {
                    background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
                    border: 2px solid #0ea5e9;
                    border-radius: 20px;
                    padding: 20px;
                    position: relative;
                    box-shadow: 0 4px 12px rgba(14, 165, 233, 0.15);
                    animation: slideIn 0.5s ease-out, pulse 3s ease-in-out infinite;
                }
            `;
            document.head.appendChild(style);
        }
        
        cleanup() {
            if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame);
            }
            super.cleanup();
        }
        
        _generateMainContent() {
            return `
                <div style="max-height: 80vh; display: flex; flex-direction: column; gap: 25px; padding: 20px;">
                    
                    <!-- Quick Thought Bubble -->
                    <div style="max-width: 600px; margin: 0 auto;">
                        <div class="thought-bubble">
                            <p style="color: #0369a1; font-size: 1.2rem; line-height: 1.6; margin: 0; text-align: center;">
                                💭 <strong>Gradient descent is amazing at finding patterns...</strong><br/>
                                <span style="font-size: 1.1rem;">But it only works if it knows what the answer <em>should</em> be!</span><br/>
                                <span style="font-size: 1rem; color: #0c4a6e;">That's where training data comes in.</span>
                            </p>
                        </div>
                    </div>
                    
                    <!-- Real World Preview -->
                    <div style="background: linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1)); 
                         border-radius: 12px; padding: 25px; border: 2px solid #6366f1;">
                        
                        <h3 style="color: #4f46e5; margin: 0 0 15px 0; text-align: center;">
                            📊 Training Data = A Spreadsheet of Examples
                        </h3>
                        
                        <!-- Mini Spreadsheet Preview -->
                        <div style="background: white; border-radius: 8px; padding: 15px; 
                             box-shadow: 0 2px 8px rgba(0,0,0,0.1); max-width: 500px; margin: 0 auto;">
                            
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; 
                                 font-size: 0.9rem; margin-bottom: 10px;">
                                <!-- Header -->
                                <div class="data-cell header-cell">Bunnies</div>
                                <div class="data-cell header-cell">Days</div>
                                <div class="data-cell header-cell">Hay (kg)</div>
                                <!-- Data rows -->
                                <div class="data-cell">3</div>
                                <div class="data-cell">1</div>
                                <div class="data-cell">15</div>
                                <div class="data-cell">5</div>
                                <div class="data-cell">2</div>
                                <div class="data-cell">50</div>
                                <div class="data-cell">2</div>
                                <div class="data-cell">3</div>
                                <div class="data-cell">30</div>
                                <div class="data-cell">8</div>
                                <div class="data-cell">1</div>
                                <div class="data-cell">40</div>
                                <div class="data-cell" style="color: #999;">...</div>
                                <div class="data-cell" style="color: #999;">...</div>
                                <div class="data-cell" style="color: #999;">...</div>
                            </div>
                            
                            <p style="text-align: center; color: #666; font-size: 0.95rem; margin: 10px 0 0 0;">
                                <em>Each row shows inputs and the correct answer</em>
                            </p>
                        </div>
                        
                        <div style="text-align: center; margin-top: 20px;">
                            <p style="color: #4f46e5; font-size: 1.05rem; margin: 0;">
                                <strong>💡 The Process:</strong><br/>
                                1. Gradient descent learns from these examples<br/>
                                2. Once trained, it can predict hay needed for any number of bunnies and days
                            </p>
                        </div>
                    </div>
                    
                    <!-- Quick Summary -->
                    <div style="background: white; border-left: 4px solid #667eea; padding: 15px; 
                         border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                        <p style="color: #333; font-size: 1.05rem; line-height: 1.6; margin: 0;">
                            <strong>Coming up:</strong> We'll work with real spreadsheets containing hundreds of training examples 
                            to teach our functions complex patterns.
                        </p>
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