/**
 * Gradient Descent Part 2 Introduction
 * 
 * Content level that recaps gradient descent and introduces the mystery
 * of how it actually works behind the scenes.
 * 
 * @fileoverview Introduction to understanding gradient descent internals
 * @author MLTEACH Team
 * @version 1.0.0
 */

/**
 * Creates the Gradient Descent Part 2 introduction
 */
function createGradientDescentPart2() {
    const container = document.getElementById('app');
    
    container.innerHTML = `
        <div class="current-level">
            <div class="level-header">
                Gradient Descent Part 2: How Does It Actually Work?
            </div>
            
            <div class="level-content" style="padding: 20px; max-width: 1200px; margin: 0 auto; max-height: 80vh;">
                
                <!-- What We've Learned -->
                <div style="background: rgba(255,255,255,0.95); border-radius: 15px; padding: 25px; margin-bottom: -10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <h3 style="color: #333; margin: 0 0 15px 0;">What We've Learned</h3>
                    <p style="font-size: 1rem; line-height: 1.6; color: #555; margin: 0;">
                        We've seen that <strong style="color: #667eea;">Gradient Descent</strong> is an algorithm that 
                        automatically tunes variables in functions. It found w = 7 for the balloon function, 
                        both w and b for the bunny function, and handled multiple parameters for coffee optimization. 
                        The algorithm somehow knows which direction to adjust each parameter and by how much.
                    </p>
                </div>
                
                <!-- How Does It Work? -->
                <div style="background: linear-gradient(135deg, rgba(255,107,107,0.1), rgba(78,205,196,0.1)); margin-top: -20px; border-radius: 15px; padding: 25px; border: 2px solid rgba(255,107,107,0.3);">
                    <h3 style="color: #333; margin: 0 0 15px 0;">But HOW Does It Work?</h3>
                    <p style="font-size: 1rem; line-height: 1.6; color: #555; margin: 0 0 15px 0;">
                        Right now it looks like magic - we give it parameters and it somehow knows how to improve them.
                    </p>
                    
                    <!-- Animated Function Display -->
                    <div style="background: white; border-radius: 8px; padding: 15px; margin: 15px 0; text-align: center;">
                        <code style="font-size: 1.1rem; color: #333; font-family: 'Courier New', monospace;">
                            f(x) = <span id="w1" style="color: #ff6b6b; font-weight: bold;">2.5</span>x₁ + 
                            <span id="w2" style="color: #4ecdc4; font-weight: bold;">-1.3</span>x₂ + 
                            <span id="w3" style="color: #667eea; font-weight: bold;">0.8</span>x₃ + 
                            <span id="b" style="color: #ffa500; font-weight: bold;">1.2</span>
                        </code>
                    </div>
                    
                    <p style="font-size: 1rem; line-height: 1.6; color: #555; margin: 0;">
                        In this section, we'll demystify gradient descent and understand exactly how it knows 
                        which direction to adjust each parameter and by how much.
                    </p>
                </div>
                
                ${typeof createStandardNavigation !== 'undefined' ? createStandardNavigation() : ''}
            </div>
        </div>
    `;
    
    // Initialize navigation if available
    if (typeof initializeNavigation !== 'undefined') {
        initializeNavigation('gd2-intro', 'createGradientDescentPart2');
    }
    
    // Start the coefficient animation
    startCoefficientAnimation();
    
    // Log level creation
    console.log('Gradient Descent Part 2 introduction created');
}

/**
 * Animates the coefficients in the function display
 */
function startCoefficientAnimation() {
    const w1Element = document.getElementById('w1');
    const w2Element = document.getElementById('w2');
    const w3Element = document.getElementById('w3');
    const bElement = document.getElementById('b');
    
    if (!w1Element || !w2Element || !w3Element || !bElement) return;
    
    // Function to generate random coefficient changes
    function updateCoefficients() {
        // Generate random changes (simulating gradient descent adjustments)
        const w1Current = parseFloat(w1Element.textContent);
        const w2Current = parseFloat(w2Element.textContent);
        const w3Current = parseFloat(w3Element.textContent);
        const bCurrent = parseFloat(bElement.textContent);
        
        // Small random changes
        const w1New = w1Current + (Math.random() - 0.5) * 0.5;
        const w2New = w2Current + (Math.random() - 0.5) * 0.5;
        const w3New = w3Current + (Math.random() - 0.5) * 0.5;
        const bNew = bCurrent + (Math.random() - 0.5) * 0.5;
        
        // Update display with smooth transition
        w1Element.style.transition = 'all 0.5s ease';
        w2Element.style.transition = 'all 0.5s ease';
        w3Element.style.transition = 'all 0.5s ease';
        bElement.style.transition = 'all 0.5s ease';
        
        w1Element.textContent = w1New.toFixed(1);
        w2Element.textContent = w2New.toFixed(1);
        w3Element.textContent = w3New.toFixed(1);
        bElement.textContent = bNew.toFixed(1);
    }
    
    // Update coefficients every 2 seconds
    const intervalId = setInterval(updateCoefficients, 2000);
    
    // Store interval ID for cleanup
    window.coefficientAnimationInterval = intervalId;
}

/**
 * Cleanup function to stop animations
 */
function stopCoefficientAnimation() {
    if (window.coefficientAnimationInterval) {
        clearInterval(window.coefficientAnimationInterval);
        window.coefficientAnimationInterval = null;
    }
}

// Export for modules and global usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createGradientDescentPart2, stopCoefficientAnimation };
} else {
    window.createGradientDescentPart2 = createGradientDescentPart2;
    window.stopCoefficientAnimation = stopCoefficientAnimation;
}