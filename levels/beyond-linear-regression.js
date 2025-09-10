/**
 * Beyond Linear Regression
 * 
 * Explains the difference between what we learned and complex AI systems
 */

window.createBeyondLinearRegression = function() {
    
    class BeyondLinearRegressionLevel extends window.BaseLevelTemplate {
        constructor() {
            super({
                id: 'beyond-linear-regression',
                name: 'Recap & Larger Context',
                type: 'tutorial',
                description: '',
                instructions: '',
                concepts: ['Linear Regression', 'Neural Networks', 'Complex Functions', 'Scale'],
                difficulty: 'intermediate',
                interactionType: 'reading',
                estimatedTime: 3
            });
        }
        
        async setup() {
            await super.setup();
            
            // Initialize navigation
            if (typeof initializeNavigation === 'function') {
                initializeNavigation('beyond-linear-regression', 'createBeyondLinearRegression');
            }
        }
        
        _generateMainContent() {
            return `
                <!-- Title -->
               
                
                <!-- What we learned section -->
                <div style="background: white; border-radius: 15px; padding: 30px; margin-bottom: -30   px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
                    <h3 style="color: #667eea; margin: 0 0 20px 0; display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 1.5rem;">📐</span> What We Just Learned: Linear Regression
                    </h3>
                    <p style="font-size: 1.1rem; color: #555; line-height: 1.8; margin-bottom: 15px;">
                        Everything you've learned so far is called <strong style="color: #667eea;">linear regression</strong>. 
                        We used simple functions like:
                    </p>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0;">
                        <code style="font-family: 'Courier New', monospace; font-size: 1.1rem; color: #333;">
                            f(x) = w × x + b
                        </code>
                    </div>
                    <p style="font-size: 1.05rem; color: #666; line-height: 1.6;">
                        These functions create straight lines or flat planes - they're "linear" because they 
                        represent simple, direct relationships between inputs and outputs.
                    </p>
                </div>
                
                <!-- Complex AI section -->
                <div style="background: linear-gradient(135deg, rgba(102,126,234,0.05), rgba(118,75,162,0.05)); border-radius: 15px; padding: 30px; margin-bottom: -30px; border: 2px solid #667eea;">
                    <h3 style="color: #764ba2; margin: 0 0 20px 0; display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 1.5rem;">🤖</span> How ChatGPT & Self-Driving Cars Work
                    </h3>
                    <p style="font-size: 1.1rem; color: #555; line-height: 1.8; margin-bottom: 20px;">
                        Impressive AI systems like <strong>ChatGPT</strong> and <strong>Tesla's self-driving cars</strong> 
                        use the <strong style="color: #764ba2;">exact same principles</strong> you just learned, but with 
                        two major differences:
                    </p>
                    
                    <!-- Difference 1 -->
                    <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 0px;">
                        <h4 style="color: #667eea; margin: 0 0 10px 0;">
                            1. Much More Complex Functions
                        </h4>
                        <p style="color: #666; line-height: 1.6; margin-bottom: 10px;">
                            Instead of simple linear functions, they use <strong>neural networks</strong> with millions 
                            or billions of parameters. ChatGPT has over 175 billion parameters!
                        </p>
                        <div style="background: #f8f9fa; padding: 12px; border-radius: 6px;">
                            <div style="display: flex; align-items: center; justify-content: space-between;">
                                <span><strong>Our function:</strong> 2-3 parameters</span>
                                <span style="color: #999;">→</span>
                                <span><strong>ChatGPT:</strong> 175,000,000,000+ parameters</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Difference 2 -->
                    <div style="background: white; padding: 20px; border-radius: 0px;">
                        <h4 style="color: #764ba2; margin: 0 0 10px 0;">
                            2. Vastly More Training Data
                        </h4>
                        <p style="color: #666; line-height: 1.6; margin-bottom: 10px;">
                            While we trained on dozens of examples, modern AI trains on massive datasets:
                        </p>
                        <ul style="color: #666; line-height: 1.8; margin: 10px 0;">
                            <li><strong>ChatGPT:</strong> Trained on hundreds of billions of words from books, websites, and articles</li>
                            <li><strong>Self-driving cars:</strong> Trained on millions of hours of driving footage</li>
                            <li><strong>Image recognition:</strong> Trained on millions of labeled images</li>
                        </ul>
                    </div>
                </div>
                
                <!-- The fundamental similarity -->
                <div style="background: linear-gradient(135deg, rgba(45,213,115,0.1), rgba(102,126,234,0.1)); border-radius: 15px; padding: 30px; margin-bottom: -30px; border: 2px solid #2dd573;">
                    <h3 style="color: #2dd573; margin: 0 0 20px 0; display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 1.5rem;">🎯</span> But It's Still Just Functions & Gradient Descent!
                    </h3>
                    <p style="font-size: 1.1rem; color: #555; line-height: 1.8; margin-bottom: 15px;">
                        Here's the amazing part: <strong style="color: #2dd573;">ChatGPT and self-driving cars are still just functions!</strong>
                    </p>
                    <p style="font-size: 1.05rem; color: #666; line-height: 1.6; margin-bottom: 15px;">
                        They still:
                    </p>
                    <ul style="font-size: 1.05rem; color: #666; line-height: 1.8;">
                        <li>Take inputs and produce outputs</li>
                        <li>Use <strong>gradient descent</strong> to learn (just like we did!)</li>
                        <li>Minimize loss functions to improve predictions</li>
                        <li>Update weights based on training data</li>
                    </ul>
                    
                    <div style="background: rgba(255,255,255,0.8); padding: 15px; border-radius: 8px; margin-top: 15px;">
                        <p style="color: #666; margin: 0; font-style: italic;">
                            <strong>Note:</strong> The math for calculating gradients in neural networks is more complex 
                            (it uses something called "backpropagation"), but computers handle all those calculations 
                            automatically. The core principle remains the same!
                        </p>
                    </div>
                </div>
                
                <!-- Visual comparison -->
                <div style="background: white; border-radius: 15px; padding: 30px; margin-bottom: -30px; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
                    <h3 style="color: #333; margin: 0 0 25px 0; text-align: center;">
                        📊 The Spectrum of AI Complexity
                    </h3>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                        <!-- Simple -->
                        <div style="text-align: center; padding: 20px; background: #f0f7ff; border-radius: 10px;">
                            <div style="font-size: 2rem; margin-bottom: 10px;">🎈</div>
                            <h4 style="color: #667eea; margin: 0 0 10px 0;">What We Built</h4>
                            <p style="color: #666; font-size: 0.9rem; line-height: 1.4;">
                                Linear functions<br>
                                2-10 parameters<br>
                                Dozens of examples
                            </p>
                        </div>
                        
                        <!-- Medium -->
                        <div style="text-align: center; padding: 20px; background: #fff9e6; border-radius: 10px;">
                            <div style="font-size: 2rem; margin-bottom: 10px;">📸</div>
                            <h4 style="color: #eab308; margin: 0 0 10px 0;">Image Recognition</h4>
                            <p style="color: #666; font-size: 0.9rem; line-height: 1.4;">
                                Deep neural networks<br>
                                Millions of parameters<br>
                                Millions of images
                            </p>
                        </div>
                        
                        <!-- Complex -->
                        <div style="text-align: center; padding: 20px; background: #f0fff4; border-radius: 10px;">
                            <div style="font-size: 2rem; margin-bottom: 10px;">🤖</div>
                            <h4 style="color: #2dd573; margin: 0 0 10px 0;">ChatGPT</h4>
                            <p style="color: #666; font-size: 0.9rem; line-height: 1.4;">
                                Transformer networks<br>
                                175B+ parameters<br>
                                Internet-scale data
                            </p>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 25px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                        <p style="color: #666; margin: 0; font-size: 1.05rem;">
                            <strong>All use the same core principles:</strong> Functions, Loss, Gradient Descent, Training Data
                        </p>
                    </div>
                </div>
                
                <!-- Key takeaway -->
                <div style="background: linear-gradient(135deg, rgba(255,243,224,0.8), rgba(255,255,255,0.8)); border-radius: 15px; padding: 25px; border: 2px solid #ffdb58; text-align: center;">
                    <div style="font-size: 2rem; margin-bottom: 15px;">💡</div>
                    <h3 style="color: #333; margin: 0 0 15px 0;">The Key Insight</h3>
                    <p style="font-size: 1.1rem; color: #555; line-height: 1.8; margin: 0;">
                        You now understand the <strong>fundamental principles</strong> that power all modern AI!<br>
                        The difference between your balloon inflator and ChatGPT is just a matter of 
                        <strong style="color: #eab308;">scale and complexity</strong>, not fundamental approach.
                    </p>
                </div>
                
                ${typeof createStandardNavigation === 'function' ? createStandardNavigation() : ''}
            `;
        }
    }
    
    const level = new BeyondLinearRegressionLevel();
    level.create().catch(error => {
        console.error('Failed to create Beyond Linear Regression level:', error);
    });
    
    return level;
};

// Export for modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.createBeyondLinearRegression;
}