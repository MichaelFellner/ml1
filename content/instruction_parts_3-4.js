

function createInstructionPart3() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration" style="padding: 20px; max-width: 1200px; margin: 0 auto;">
                <h1 style="font-size: 2.3rem; margin-bottom: 20px; background: linear-gradient(45deg, #667eea, #764ba2); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">⚡ Gradient Descent Part 1/3</h1>
                
                <!-- Reusing concept2 div styling for familiarity -->
                <div style="background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(102,126,234,0.05)); border-radius: 12px; padding: 25px; margin: 20px auto; max-width: 800px; border: 2px solid #667eea;">
                    <div style="display: flex; align-items: flex-start; gap: 20px;">
                        <div class="objective-icon" style="font-size: 3rem;">⚡</div>
                        <div style="flex: 1;">
                            <h3 style="margin: 0 0 15px 0; font-size: 1.4rem; color: #333;">Gradient Descent: Making Functions More Accurate</h3>
                            <p style="font-size: 1.05rem; color: #555; line-height: 1.6; margin-bottom: 15px;">Great job manually finding the optimal energy! But <strong>how does AI improve its function automatically?</strong></p>
                            <p style="font-size: 1rem; color: #666; line-height: 1.5; margin-bottom: 15px;"><strong style="color: #667eea;">Gradient descent</strong> is the algorithm that changes a function's parameters to make it more accurate by minimizing the loss.</p>
                            <p style="font-size: 0.95rem; color: #555; padding: 12px; background: rgba(255,255,255,0.5); border-radius: 8px; border-left: 4px solid #667eea;">
                                <strong>Before diving into the math</strong>, let's first see gradient descent in action so you can understand what it does!</p>
                        </div>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin: 30px 0;">
                    <div style="background: rgba(255,255,255,0.5); border-radius: 12px; padding: 20px;">
                        <h3 style="color: #333; margin-bottom: 15px; text-align: center;">🔄 What Gradient Descent Does</h3>
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            <div style="display: flex; align-items: center; gap: 15px; padding: 10px; background: rgba(102,126,234,0.1); border-radius: 8px;">
                                <span style="background: #667eea; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">1</span>
                                <div style="flex: 1;">
                                    <strong style="color: #333;">Evaluate the function</strong>
                                    <div style="font-size: 0.85rem; color: #666;">Calculate current loss</div>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 15px; padding: 10px; background: rgba(102,126,234,0.1); border-radius: 8px;">
                                <span style="background: #667eea; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">2</span>
                                <div style="flex: 1;">
                                    <strong style="color: #333;">Find improvement direction</strong>
                                    <div style="font-size: 0.85rem; color: #666;">Which way reduces loss?</div>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 15px; padding: 10px; background: rgba(102,126,234,0.1); border-radius: 8px;">
                                <span style="background: #667eea; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">3</span>
                                <div style="flex: 1;">
                                    <strong style="color: #333;">Update the function</strong>
                                    <div style="font-size: 0.85rem; color: #666;">Change parameters slightly</div>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 15px; padding: 10px; background: rgba(102,126,234,0.1); border-radius: 8px;">
                                <span style="background: #667eea; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">4</span>
                                <div style="flex: 1;">
                                    <strong style="color: #333;">Repeat until accurate</strong>
                                    <div style="font-size: 0.85rem; color: #666;">Continue until loss is minimal</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="background: rgba(255,255,255,0.5); border-radius: 12px; padding: 20px;">
                        <h3 style="color: #333; margin-bottom: 15px; text-align: center;">🎯 Function Improvement</h3>
                        <div style="display: flex; flex-direction: column; gap: 15px;">
                            <div style="padding: 15px; background: rgba(255,99,71,0.1); border-radius: 8px; border-left: 4px solid #ff6347;">
                                <strong style="color: #ff6347;">👨‍💻 Level 1: Manual Tuning</strong>
                                <div style="font-size: 0.9rem; color: #666; margin-top: 5px;">You adjusted parameters by hand</div>
                                <div style="font-size: 0.85rem; color: #888; margin-top: 3px;">Used loss feedback to guide changes</div>
                            </div>
                            <div style="text-align: center; font-size: 1.5rem; color: #667eea;">↓</div>
                            <div style="padding: 15px; background: rgba(102,126,234,0.1); border-radius: 8px; border-left: 4px solid #667eea;">
                                <strong style="color: #667eea;">🤖 Level 2: Gradient Descent</strong>
                                <div style="font-size: 0.9rem; color: #666; margin-top: 5px;">AI updates function automatically</div>
                                <div style="font-size: 0.85rem; color: #888; margin-top: 3px;">Uses loss to improve function accuracy!</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style="background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 12px; padding: 20px; color: white; text-align: center; margin: 20px 0;">
                    <h3 style="margin: 0 0 10px 0; font-size: 1.2rem;">🎮 Coming up: See It In Action!</h3>
                    <p style="margin: 0 0 10px 0; font-size: 1rem;">Watch gradient descent automatically improve a function by minimizing loss.</p>
                    <p style="margin: 0; font-size: 0.9rem; opacity: 0.9;">We'll explore the math behind it in Part 2 & 3, but first let's see what it does!</p>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('ip3', 'createInstructionPart3');
    
    // Add subtle animations
    setTimeout(() => {
        const steps = document.querySelectorAll('[style*="background: #667eea"]');
        steps.forEach((step, index) => {
            setTimeout(() => {
                step.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    step.style.transform = 'scale(1)';
                }, 200);
            }, index * 300);
        });
    }, 500);
}

function createInstructionPart4() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration" style="padding: 12px; max-width: 1100px; margin: 0 auto;">
                <h1 style="font-size: 1.8rem; margin-bottom: 12px; background: linear-gradient(45deg, #667eea, #764ba2); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">🔢 Loss with Multiple Variables</h1>
                
                <!-- Main concept card -->
                <div style="background: linear-gradient(135deg, rgba(118,75,162,0.1), rgba(118,75,162,0.05)); border-radius: 10px; padding: 15px; margin: 12px auto; max-width: 750px; border: 2px solid #764ba2;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div class="objective-icon" style="font-size: 2rem;">🎯</div>
                        <div style="flex: 1;">
                            <h3 style="margin: 0 0 8px 0; font-size: 1.1rem; color: #333;">Loss Depends on Multiple Variables</h3>
                            <p style="font-size: 0.9rem; color: #555; line-height: 1.4; margin: 0;">So far: <strong>Loss = f(one variable)</strong><br>Real AI: <strong style="color: #764ba2;">Loss = f(millions of variables)</strong></p>
                        </div>
                    </div>
                </div>
                
                <!-- Visual explanation of loss with multiple variables -->
                <div style="background: rgba(255,255,255,0.5); border-radius: 8px; padding: 15px; margin: 15px 0;">
                    <h3 style="color: #333; margin: 0 0 10px 0; text-align: center; font-size: 1rem;">📐 How Loss Changes with Multiple Variables</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;">
                        <div style="text-align: center; padding: 8px; background: rgba(102,126,234,0.1); border-radius: 6px;">
                            <strong style="color: #667eea; font-size: 0.85rem;">1 Variable</strong>
                            <div style="font-size: 0.75rem; color: #666; margin-top: 5px;">Loss = f(x)</div>
                            <div style="font-size: 0.7rem; color: #888; margin-top: 3px;">Like a 2D curve</div>
                        </div>
                        <div style="text-align: center; padding: 8px; background: rgba(118,75,162,0.1); border-radius: 6px;">
                            <strong style="color: #764ba2; font-size: 0.85rem;">2 Variables</strong>
                            <div style="font-size: 0.75rem; color: #666; margin-top: 5px;">Loss = f(x, y)</div>
                            <div style="font-size: 0.7rem; color: #888; margin-top: 3px;">Like a 3D surface</div>
                        </div>
                        <div style="text-align: center; padding: 8px; background: rgba(243,150,10,0.1); border-radius: 6px;">
                            <strong style="color: #f3960a; font-size: 0.85rem;">Many Variables</strong>
                            <div style="font-size: 0.75rem; color: #666; margin-top: 5px;">Loss = f(x₁, x₂, ...xₙ)</div>
                            <div style="font-size: 0.7rem; color: #888; margin-top: 3px;">High-dimensional space!</div>
                        </div>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 15px 0;">
                    <div style="background: rgba(255,255,255,0.5); border-radius: 8px; padding: 12px;">
                        <h3 style="color: #333; margin: 0 0 8px 0; text-align: center; font-size: 1rem;">🎯 Key Insight</h3>
                        <div style="padding: 10px; background: linear-gradient(135deg, rgba(45,213,115,0.1), rgba(45,213,115,0.05)); border-radius: 6px; border-left: 3px solid #2dd573;">
                            <p style="font-size: 0.85rem; color: #333; margin: 0 0 8px 0;"><strong>One Loss Value!</strong></p>
                            <p style="font-size: 0.75rem; color: #666; margin: 0;">No matter how many variables, we always get a <strong>single loss number</strong> that tells us how wrong we are overall.</p>
                        </div>
                    </div>
                    
                    <div style="background: rgba(255,255,255,0.5); border-radius: 8px; padding: 12px;">
                        <h3 style="color: #333; margin: 0 0 8px 0; text-align: center; font-size: 1rem;">🧪 Coming Next</h3>
                        <div style="text-align: center; padding: 10px;">
                            <div style="font-size: 2rem; margin-bottom: 5px;">🧙‍♀️</div>
                            <h4 style="color: #764ba2; margin: 5px 0; font-size: 0.9rem;">Magic Potion: 2 Variables</h4>
                            <div style="margin-top: 10px; display: flex; justify-content: center; gap: 12px; align-items: center;">
                                <div style="background: #ffd700; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.8rem;">Y</div>
                                <div style="font-size: 1rem;">+</div>
                                <div style="background: #4169e1; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; color: white; font-size: 0.8rem;">B</div>
                            </div>
                            <p style="color: #666; font-size: 0.75rem; margin: 8px 0 0 0;">Loss = f(Yellow, Blue)<br>Find the perfect mix!</p>
                        </div>
                    </div>
                </div>
                
                <!-- Real-world examples -->
                <div style="background: rgba(255,255,255,0.5); border-radius: 8px; padding: 12px; margin: 15px 0;">
                    <h3 style="color: #333; margin: 0 0 8px 0; text-align: center; font-size: 1rem;">🌐 Real Examples: Loss with Many Variables</h3>
                    <div style="display: flex; flex-direction: column; gap: 6px;">
                        <div style="padding: 6px; background: rgba(102,126,234,0.1); border-radius: 5px; display: flex; align-items: center; gap: 8px;">
                            <span style="font-size: 1.2rem;">🖼️</span>
                            <div style="flex: 1;">
                                <strong style="color: #667eea; font-size: 0.85rem;">Image Recognition</strong>
                                <div style="font-size: 0.7rem; color: #666;">Loss = f(1M pixel values) → How wrong is "cat" vs "dog"?</div>
                            </div>
                        </div>
                        <div style="padding: 6px; background: rgba(118,75,162,0.1); border-radius: 5px; display: flex; align-items: center; gap: 8px;">
                            <span style="font-size: 1.2rem;">💬</span>
                            <div style="flex: 1;">
                                <strong style="color: #764ba2; font-size: 0.85rem;">ChatGPT</strong>
                                <div style="font-size: 0.7rem; color: #666;">Loss = f(175B parameters) → How wrong is the response?</div>
                            </div>
                        </div>
                        <div style="padding: 6px; background: rgba(243,150,10,0.1); border-radius: 5px; display: flex; align-items: center; gap: 8px;">
                            <span style="font-size: 1.2rem;">🚗</span>
                            <div style="flex: 1;">
                                <strong style="color: #f3960a; font-size: 0.85rem;">Self-Driving</strong>
                                <div style="font-size: 0.7rem; color: #666;">Loss = f(speed, steering, sensors) → How far from ideal path?</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style="background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 8px; padding: 12px; color: white; text-align: center; margin: 12px 0;">
                    <p style="margin: 0 0 5px 0; font-size: 0.85rem;"><strong>The Magic of Gradient Descent:</strong></p>
                    <p style="margin: 0; font-size: 0.8rem;">It minimizes the loss by adjusting ALL variables simultaneously!<br>
                    Each variable gets updated based on how it affects the total loss.</p>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('ip4', 'createInstructionPart4');
}
