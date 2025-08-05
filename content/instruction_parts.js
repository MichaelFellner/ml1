// instruction_parts.js - Instructional content between levels

function createInstructionPart1() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration">
                <h1>🎯 What You'll Learn</h1>
                <p>This website will teach you the core concepts that power all modern AI systems. By the end, you'll understand these key terms:</p>
                
                <div class="learning-objectives">
                    <div class="objective-item">
                        <div class="objective-icon">📉</div>
                        <div class="objective-content">
                            <h3>Loss</h3>
                            <p>A measure of how wrong your AI's predictions are</p>
                        </div>
                    </div>
                    
                    <div class="objective-item">
                        <div class="objective-icon">⚡</div>
                        <div class="objective-content">
                            <h3>Gradient Descent</h3>
                            <p>The algorithm that automatically improves AI predictions</p>
                        </div>
                    </div>
                    
                    <div class="objective-item">
                        <div class="objective-icon">👣</div>
                        <div class="objective-content">
                            <h3>Step Sizes & Learning Rate</h3>
                            <p>How big steps the AI takes when learning</p>
                        </div>
                    </div>
                    
                    <div class="objective-item">
                        <div class="objective-icon">📊</div>
                        <div class="objective-content">
                            <h3>Training Data</h3>
                            <p>Examples that teach the AI what's correct</p>
                        </div>
                    </div>
                    
                    <div class="objective-item">
                        <div class="objective-icon">🔍</div>
                        <div class="objective-content">
                            <h3>Training Features</h3>
                            <p>The specific details AI looks at to make predictions</p>
                        </div>
                    </div>
                </div>
                
                <div class="final-goal">
                    <h3>🚀 The Big Picture</h3>
                    <p>At the end, we'll put it all together: <strong>using gradient descent with training data and training features to create a real machine learning model!</strong></p>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('ip1', 'createInstructionPart1');
}

function createInstructionPart2() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration">
                <h1>📉 Understanding Loss</h1>
                <p><strong>Loss</strong> is one of the most important concepts in AI. It's a number that tells us how wrong our predictions are.</p>
                
                <div class="concept-explanation">
                    <div class="concept-visual">
                        <div class="loss-example">
                            <h3>🎯 Think of it like target practice:</h3>
                            <ul class="target-list">
                                <li><strong>Perfect shot (bullseye)</strong> → Loss = 0</li>
                                <li><strong>Close to center</strong> → Low loss</li>
                                <li><strong>Far from center</strong> → High loss</li>
                                <li><strong>Complete miss</strong> → Very high loss</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="concept-content">
                        <h3>In AI terms:</h3>
                        <div class="ai-loss-explanation">
                            <div class="loss-item good">
                                <span class="loss-icon">✅</span>
                                <span class="loss-text"><strong>AI predicts 75, actual is 75</strong> → Loss = 0 (Perfect!)</span>
                            </div>
                            <div class="loss-item okay">
                                <span class="loss-icon">⚠️</span>
                                <span class="loss-text"><strong>AI predicts 70, actual is 75</strong> → Loss = 25 (Pretty good)</span>
                            </div>
                            <div class="loss-item bad">
                                <span class="loss-icon">❌</span>
                                <span class="loss-text"><strong>AI predicts 50, actual is 75</strong> → Loss = 625 (Way off!)</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="next-preview">
                    <h3>🤖 Coming up: Level 1</h3>
                    <p>You'll help a robot find its optimal energy level by minimizing loss. The goal: get that loss down to zero!</p>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('ip2', 'createInstructionPart2');
}

function createInstructionPart3() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration">
                <h1>⚡ Introducing Gradient Descent</h1>
                <p>Great job! You just learned how <strong>loss</strong> works by manually finding the optimal energy level.</p>
                
                <div class="key-insight">
                    <div class="insight-icon">💡</div>
                    <div class="insight-text">
                        <strong>But what if the AI could do this automatically?</strong><br>
                        That's exactly what <strong>gradient descent</strong> does!
                    </div>
                </div>
                
                <div class="gradient-preview">
                    <h3>🎯 Gradient Descent Preview</h3>
                    <p>Instead of you manually adjusting the energy level, <strong>gradient descent</strong> is an algorithm that:</p>
                    
                    <div class="gd-steps">
                        <div class="gd-step">
                            <span class="step-number">1</span>
                            <span class="step-text">Looks at the current loss</span>
                        </div>
                        <div class="gd-step">
                            <span class="step-number">2</span>
                            <span class="step-text">Figures out which direction to move</span>
                        </div>
                        <div class="gd-step">
                            <span class="step-number">3</span>
                            <span class="step-text">Takes a step to reduce the loss</span>
                        </div>
                        <div class="gd-step">
                            <span class="step-number">4</span>
                            <span class="step-text">Repeats until loss is minimized</span>
                        </div>
                    </div>
                </div>
                
                <div class="next-preview">
                    <h3>🤖 Coming up: Level 2</h3>
                    <p>You'll see gradient descent in action! Watch it automatically find the optimal solution without any manual tuning.</p>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('ip3', 'createInstructionPart3');
}

function createInstructionPart4() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration">
                <h1>🔢 Multiple Variables</h1>
                <p>Excellent! You've seen gradient descent automatically minimize loss for one variable. But real AI problems are more complex...</p>
                
                <div class="complexity-progression">
                    <div class="complexity-level">
                        <h3>✅ What you've learned so far:</h3>
                        <div class="simple-equation">
                            <strong>1 Variable:</strong> Energy Level → Loss
                        </div>
                        <p>Just one dial to turn, one thing to optimize.</p>
                    </div>
                    
                    <div class="complexity-arrow">↓</div>
                    
                    <div class="complexity-level">
                        <h3>🎯 What's next:</h3>
                        <div class="complex-equation">
                            <strong>Multiple Variables:</strong> Yellow + Blue → Loss
                        </div>
                        <p>Multiple dials to turn, all affecting the same loss!</p>
                    </div>
                </div>
                
                <div class="real-world-examples">
                    <h3>🌍 Why this matters in real AI:</h3>
                    <div class="example-grid">
                        <div class="example-item">
                            <strong>🖼️ Image Recognition:</strong><br>
                            Millions of pixel values → "Is this a cat?"
                        </div>
                        <div class="example-item">
                            <strong>💬 ChatGPT:</strong><br>
                            Billions of parameters → "What word comes next?"
                        </div>
                        <div class="example-item">
                            <strong>🚗 Self-driving cars:</strong><br>
                            Sensor data + camera feeds → "Should I brake?"
                        </div>
                    </div>
                </div>
                
                <div class="next-preview">
                    <h3>🧙‍♀️ Coming up: Level 3</h3>
                    <p>Help a witch brew the perfect potion by balancing TWO ingredients. You'll see how multiple variables can affect the same loss function!</p>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('ip4', 'createInstructionPart4');
}

function createInstructionPart5() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration">
                <h1>⚡ Gradient Descent + Multiple Variables</h1>
                <p>Amazing work! You manually balanced multiple ingredients to minimize loss. Now here's the magic...</p>
                
                <div class="key-revelation">
                    <div class="revelation-icon">🤯</div>
                    <div class="revelation-text">
                        <strong>Gradient descent works on multiple variables too!</strong><br>
                        It can optimize ALL the variables simultaneously.
                    </div>
                </div>
                
                <div class="multivariable-explanation">
                    <h3>🎯 How it works with multiple variables:</h3>
                    
                    <div class="gd-comparison">
                        <div class="gd-single">
                            <h4>Single Variable (Level 2):</h4>
                            <div class="variable-visual">
                                <span class="variable">Energy</span>
                                <span class="arrow">→</span>
                                <span class="loss">Loss</span>
                            </div>
                            <p>One step in one direction</p>
                        </div>
                        
                        <div class="gd-multi">
                            <h4>Multiple Variables (Level 4):</h4>
                            <div class="variable-visual">
                                <span class="variable">Yellow</span>
                                <span class="variable">Blue</span>
                                <span class="variable">Red</span>
                                <span class="variable">Green</span>
                                <span class="variable">Purple</span>
                                <span class="variable">Orange</span>
                                <span class="arrow">→</span>
                                <span class="loss">Loss</span>
                            </div>
                            <p>Steps in multiple directions simultaneously!</p>
                        </div>
                    </div>
                </div>
                
                <div class="gradient-power">
                    <h3>💪 The Power of Gradient Descent</h3>
                    <p>Whether it's 1 variable or 1 million variables, gradient descent can handle it. This is why it powers everything from simple robots to ChatGPT!</p>
                </div>
                
                <div class="next-preview">
                    <h3>🧙‍♀️ Coming up: Level 4</h3>
                    <p>Watch gradient descent automatically balance SIX potion ingredients at once. No manual tuning required!</p>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('ip5', 'createInstructionPart5');
}

function createInstructionPart6() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration">
                <h1>🔬 How Gradient Descent Really Works</h1>
                <p>You've seen gradient descent in action, but how does it actually work? Let's peek under the hood!</p>
                
                <div class="gradient-deep-dive">
                    <h3>🎯 The Secret: Mathematical Slopes</h3>
                    <p>Gradient descent works by calculating the <strong>slope</strong> (gradient) of the loss function, then moving in the opposite direction.</p>
                    
                    <div class="slope-explanation">
                        <div class="slope-visual">
                            <h4>📈 Think of a hill:</h4>
                            <ul class="hill-analogy">
                                <li><strong>Upward slope</strong> → Move left (decrease value)</li>
                                <li><strong>Downward slope</strong> → Move right (increase value)</li>
                                <li><strong>Flat (no slope)</strong> → You've found the minimum!</li>
                            </ul>
                        </div>
                        
                        <div class="math-intuition">
                            <h4>🧮 In math terms:</h4>
                            <div class="formula-explanation">
                                <div class="formula">
                                    <strong>New Value = Old Value - (Learning Rate × Gradient)</strong>
                                </div>
                                <div class="formula-breakdown">
                                    <p><strong>Learning Rate:</strong> How big steps to take</p>
                                    <p><strong>Gradient:</strong> Which direction to go</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="learning-rate-preview">
                    <h3>⚡ Step Sizes & Learning Rates</h3>
                    <div class="step-size-grid">
                        <div class="step-example">
                            <strong>🐌 Small steps (0.01):</strong><br>
                            Safe but slow
                        </div>
                        <div class="step-example">
                            <strong>🚶 Medium steps (0.1):</strong><br>
                            Good balance
                        </div>
                        <div class="step-example">
                            <strong>🏃 Large steps (1.0):</strong><br>
                            Fast but might overshoot
                        </div>
                    </div>
                </div>
                
                <div class="next-preview">
                    <h3>📈 Coming up: Deep Dive</h3>
                    <p>Now you'll get hands-on experience with the math! You'll manually explore functions, see gradients in action, and experiment with different learning rates.</p>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('ip6', 'createInstructionPart6');
}

function createInstructionPart7() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration">
                <h1>🎯 Learning Recap & What's Next</h1>
                <p>Congratulations! You've mastered the fundamental building blocks of AI. Let's recap your journey and preview what's coming next.</p>
                
                <div class="learning-recap">
                    <h3>✅ What You've Mastered</h3>
                    <div class="recap-grid">
                        <div class="recap-item completed">
                            <div class="recap-icon">📉</div>
                            <div class="recap-content">
                                <h4>Loss Functions</h4>
                                <p>You understand how to measure prediction errors</p>
                            </div>
                        </div>
                        
                        <div class="recap-item completed">
                            <div class="recap-icon">⚡</div>
                            <div class="recap-content">
                                <h4>Gradient Descent</h4>
                                <p>You've seen the algorithm that automatically optimizes AI models</p>
                            </div>
                        </div>
                        
                        <div class="recap-item completed">
                            <div class="recap-icon">🔢</div>
                            <div class="recap-content">
                                <h4>Multiple Variables</h4>
                                <p>You can handle complex problems with many moving parts</p>
                            </div>
                        </div>
                        
                        <div class="recap-item completed">
                            <div class="recap-icon">🧮</div>
                            <div class="recap-content">
                                <h4>Mathematical Intuition</h4>
                                <p>You understand slopes, step sizes, and optimization</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="whats-next">
                    <h3>🚀 What You'll Learn Next</h3>
                    <p>Now we'll put these concepts together to build a complete machine learning system:</p>
                    
                    <div class="upcoming-concepts">
                        <div class="concept-item next">
                            <div class="concept-icon">📊</div>
                            <div class="concept-content">
                                <h4>Training Data</h4>
                                <p>Real examples that teach AI what's correct</p>
                            </div>
                        </div>
                        
                        <div class="concept-item next">
                            <div class="concept-icon">👣</div>
                            <div class="concept-content">
                                <h4>Learning Rates & Step Sizes</h4>
                                <p>Fine-tuning how fast your AI learns</p>
                            </div>
                        </div>
                        
                        <div class="concept-item next">
                            <div class="concept-icon">🔍</div>
                            <div class="concept-content">
                                <h4>Training Features</h4>
                                <p>The specific inputs AI uses to make predictions</p>
                            </div>
                        </div>
                        
                        <div class="concept-item final">
                            <div class="concept-icon">🤖</div>
                            <div class="concept-content">
                                <h4>Complete ML Model</h4>
                                <p>Using gradient descent with training data and features to create a real machine learning model</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="immediate-next">
                    <h3>🎯 Up Next: Training Data</h3>
                    <div class="next-concept-preview">
                        <div class="preview-icon">📚</div>
                        <div class="preview-text">
                            <p><strong>First, we'll quickly learn what training data is.</strong></p>
                            <p>You'll help Max the dog find his perfect bone size, but this time you'll have examples from other dogs to guide your decision. This is exactly how real AI systems learn from data!</p>
                        </div>
                    </div>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('ip7', 'createInstructionPart7');
}
