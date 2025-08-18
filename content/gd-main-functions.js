// Main gradient descent teaching functions
// This file now imports functions from the levels/ folder structure

// Note: Level functions are now defined in separate files in the levels/ folder
// Functions are automatically made available globally via the individual level files

// The functions that were previously defined here are now in:
// - createGradientDescentPart1() → levels/gradient-descent-intro.js
// - createBalloonInflationLevel() + setupBalloonLevel() → levels/balloon-inflation.js  
// - createBalloonGradientDescent() + setupBalloonGradientDescent() → levels/balloon-gradient.js
// - createBunnyFeedingLevel() + setupBunnyLevel() → levels/bunny-feeding.js
// - createBunnyGradientDescent() + setupBunnyGradientDescent() → levels/bunny-gradient.js

// Additional functions that were in this file:

// =============================================================================
// GRADIENT DESCENT PART 1B: INTRODUCING BIAS
// =============================================================================

function createGradientDescentPart1b() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-header">
                ⚡ Adding Complexity: The Bias Term
            </div>
            <div class="level-content" style="padding: 15px 20px; max-width: 800px; margin: 0 auto;">
                <div style="background: rgba(102,126,234,0.1); border-radius: 10px; padding: 25px; border: 2px solid rgba(102,126,234,0.3); text-align: center;">
                    <h2 style="font-size: 1.5rem; margin: 0 0 20px 0; color: #333;">What if we need more flexibility?</h2>
                    
                    <p style="font-size: 1.1rem; line-height: 1.6; color: #555; margin: 0;">
                        You just mastered <strong style="font-family: 'Courier New', monospace; background: white; padding: 5px 10px; border-radius: 5px; color: #764ba2;">f(x) = w·x</strong>
                    </p>
                    
                    <p style="font-size: 1rem; line-height: 1.6; color: #666; margin: 15px 0;">
                        But sometimes we need a function that doesn't start at zero!<br>
                        What if balloons needed a <em>base amount</em> of air plus extra for their size?
                    </p>
                    
                    <div style="background: white; border-radius: 8px; padding: 20px; margin: 20px 0; border: 2px solid #667eea;">
                        <p style="font-size: 1.2rem; line-height: 1.6; color: #333; margin: 0;">
                            Enter the more powerful function:<br>
                            <strong style="font-family: 'Courier New', monospace; font-size: 1.3rem; color: #764ba2;">f(x) = w·x + b</strong>
                        </p>
                        
                        <div style="margin-top: 15px; padding-top: 15px; border-top: 2px dashed #ddd;">
                            <p style="font-size: 0.95rem; color: #555; margin: 5px 0;">
                                <strong style="color: #667eea;">w</strong> = the multiplier (slope)<br>
                                <strong style="color: #764ba2;">b</strong> = the bias (starting point)
                            </p>
                        </div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px;">
                        <div style="background: rgba(255,215,0,0.1); border-radius: 8px; padding: 15px; border: 2px solid rgba(255,215,0,0.3);">
                            <h3 style="font-size: 1rem; margin: 0 0 10px 0; color: #f39c12;">🎯 The Good:</h3>
                            <p style="font-size: 0.9rem; line-height: 1.4; color: #666; margin: 0;">
                                Can find more complicated patterns!<br>
                                More flexible and powerful.<br>
                                Works for real-world problems.
                            </p>
                        </div>
                        
                        <div style="background: rgba(255,99,71,0.1); border-radius: 8px; padding: 15px; border: 2px solid rgba(255,99,71,0.3);">
                            <h3 style="font-size: 1rem; margin: 0 0 10px 0; color: #ff6347;">🤔 The Challenge:</h3>
                            <p style="font-size: 0.9rem; line-height: 1.4; color: #666; margin: 0;">
                                Two parameters to optimize!<br>
                                Much harder to find by hand.<br>
                                This is where AI really shines!
                            </p>
                        </div>
                    </div>
                    
                    <div style="background: rgba(45,213,115,0.1); border-radius: 8px; padding: 15px; margin-top: 20px; border: 2px solid rgba(45,213,115,0.3);">
                        <p style="font-size: 1rem; line-height: 1.5; color: #333; margin: 0;">
                            <strong style="color: #2dd573;">💡 Key Insight:</strong> Gradient descent can optimize <em>both</em> <strong>w</strong> and <strong>b</strong> at the same time!<br>
                            <span style="font-size: 0.9rem; color: #666;">Let's see this in action with the bunny feeding challenge...</span>
                        </p>
                    </div>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('gd1b', 'createGradientDescentPart1b');
}
