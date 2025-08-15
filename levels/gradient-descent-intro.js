// Gradient Descent Introduction Level
// Part 1: Basic introduction to gradient descent concepts

function createGradientDescentPart1() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-header" style="font-size: 1.8rem; font-weight: bold;">
                Core Concept 2: Gradient Descent
            </div>
            <div class="level-content" style="padding: 15px 20px; max-width: 800px; margin: 0 auto;">
                <div style="background: rgba(102,126,234,0.1); border-radius: 10px; padding: 25px; border: 2px solid rgba(102,126,234,0.3); text-align: center;">
                    <h2 style="font-size: 1.5rem; margin: 0 0 20px 0; color: #333;">What is Gradient Descent?</h2>
                    <p style="font-size: 1.1rem; line-height: 1.6; color: #555; margin: 0;">
                        Gradient Descent is a way of making a function <strong style="color: #667eea;">f(x)</strong> go from outputting 
                        <span style="color: #ff6347; font-weight: bold;">bad (high loss)</span> outputs to 
                        <span style="color: #2dd573; font-weight: bold;">good (low loss)</span> outputs.
                    </p>
                    <p style="font-size: 1.1rem; line-height: 1.6; color: #555; margin: 20px 0 0 0;">
                        Let's start with a simple function: <strong style="font-family: 'Courier New', monospace; background: white; padding: 5px 10px; border-radius: 5px; color: #764ba2;">f(x) = w·x</strong>
                    </p>
                    <p style="font-size: 1rem; line-height: 1.6; color: #666; margin: 15px 0 0 0;">
                        Gradient descent will change the <strong style="color: #667eea;">"w"</strong> value to make the function better.
                    </p>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('gd1', 'createGradientDescentPart1');
}

// Export the function
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createGradientDescentPart1 };
} else {
    window.createGradientDescentPart1 = createGradientDescentPart1;
}