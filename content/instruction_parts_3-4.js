

function createInstructionPart3() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration" style="padding: 20px; max-width: 1200px; margin: 0 auto;">
                <h1 style="font-size: 2.3rem; margin-bottom: 20px; background: linear-gradient(45deg, #667eea, #764ba2); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">⚡ Introducing Gradient Descent</h1>
                
                <!-- Reusing concept2 div styling for familiarity -->
                <div style="background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(102,126,234,0.05)); border-radius: 12px; padding: 25px; margin: 20px auto; max-width: 800px; border: 2px solid #667eea;">
                    <div style="display: flex; align-items: flex-start; gap: 20px;">
                        <div class="objective-icon" style="font-size: 3rem;">⚡</div>
                        <div style="flex: 1;">
                            <h3 style="margin: 0 0 15px 0; font-size: 1.4rem; color: #333;">Gradient Descent: AI's Automatic Optimizer</h3>
                            <p style="font-size: 1.05rem; color: #555; line-height: 1.6; margin-bottom: 15px;">Great job manually finding the optimal energy! But what if <strong>AI could do this automatically?</strong></p>
                            <p style="font-size: 1rem; color: #666; line-height: 1.5;">That's exactly what <strong style="color: #667eea;">gradient descent</strong> does - it's an algorithm that automatically finds the values that minimize loss!</p>
                        </div>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin: 30px 0;">
                    <div style="background: rgba(255,255,255,0.5); border-radius: 12px; padding: 20px;">
                        <h3 style="color: #333; margin-bottom: 15px; text-align: center;">🔄 How It Works</h3>
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            <div style="display: flex; align-items: center; gap: 15px; padding: 10px; background: rgba(102,126,234,0.1); border-radius: 8px;">
                                <span style="background: #667eea; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">1</span>
                                <div style="flex: 1;">
                                    <strong style="color: #333;">Check the loss</strong>
                                    <div style="font-size: 0.85rem; color: #666;">How wrong are we?</div>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 15px; padding: 10px; background: rgba(102,126,234,0.1); border-radius: 8px;">
                                <span style="background: #667eea; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">2</span>
                                <div style="flex: 1;">
                                    <strong style="color: #333;">Calculate direction</strong>
                                    <div style="font-size: 0.85rem; color: #666;">Should we go up or down?</div>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 15px; padding: 10px; background: rgba(102,126,234,0.1); border-radius: 8px;">
                                <span style="background: #667eea; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">3</span>
                                <div style="flex: 1;">
                                    <strong style="color: #333;">Take a step</strong>
                                    <div style="font-size: 0.85rem; color: #666;">Move to reduce loss</div>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 15px; padding: 10px; background: rgba(102,126,234,0.1); border-radius: 8px;">
                                <span style="background: #667eea; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">4</span>
                                <div style="flex: 1;">
                                    <strong style="color: #333;">Repeat until optimal</strong>
                                    <div style="font-size: 0.85rem; color: #666;">Keep going until loss = 0</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="background: rgba(255,255,255,0.5); border-radius: 12px; padding: 20px;">
                        <h3 style="color: #333; margin-bottom: 15px; text-align: center;">🎯 Manual vs Automatic</h3>
                        <div style="display: flex; flex-direction: column; gap: 15px;">
                            <div style="padding: 15px; background: rgba(255,99,71,0.1); border-radius: 8px; border-left: 4px solid #ff6347;">
                                <strong style="color: #ff6347;">👨‍💻 Level 1: Manual</strong>
                                <div style="font-size: 0.9rem; color: #666; margin-top: 5px;">You moved the slider by hand</div>
                                <div style="font-size: 0.85rem; color: #888; margin-top: 3px;">Trial and error, using hints</div>
                            </div>
                            <div style="text-align: center; font-size: 1.5rem; color: #667eea;">↓</div>
                            <div style="padding: 15px; background: rgba(102,126,234,0.1); border-radius: 8px; border-left: 4px solid #667eea;">
                                <strong style="color: #667eea;">🤖 Level 2: Gradient Descent</strong>
                                <div style="font-size: 0.9rem; color: #666; margin-top: 5px;">AI moves the slider itself</div>
                                <div style="font-size: 0.85rem; color: #888; margin-top: 3px;">Mathematical optimization, no hints needed!</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style="background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 12px; padding: 20px; color: white; text-align: center; margin: 20px 0;">
                    <h3 style="margin: 0 0 10px 0; font-size: 1.2rem;">🎮 Coming up: Level 2 - Watch AI in Action!</h3>
                    <p style="margin: 0; font-size: 1rem;">See gradient descent automatically find the optimal solution. No manual tuning required!</p>
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
                <h1 style="font-size: 1.8rem; margin-bottom: 12px; background: linear-gradient(45deg, #667eea, #764ba2); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">🔢 Multiple Variables</h1>
                
                <!-- Main concept card -->
                <div style="background: linear-gradient(135deg, rgba(118,75,162,0.1), rgba(118,75,162,0.05)); border-radius: 10px; padding: 15px; margin: 12px auto; max-width: 750px; border: 2px solid #764ba2;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div class="objective-icon" style="font-size: 2rem;">🎯</div>
                        <div style="flex: 1;">
                            <h3 style="margin: 0 0 8px 0; font-size: 1.1rem; color: #333;">Real AI Uses Many Variables</h3>
                            <p style="font-size: 0.9rem; color: #555; line-height: 1.4; margin: 0;">You've mastered <strong>one variable</strong>. But real AI has <strong style="color: #764ba2;">millions</strong> of variables!</p>
                        </div>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 15px 0;">
                    <div style="background: rgba(255,255,255,0.5); border-radius: 8px; padding: 12px;">
                        <h3 style="color: #333; margin: 0 0 8px 0; text-align: center; font-size: 1rem;">🌐 Real Examples</h3>
                        <div style="display: flex; flex-direction: column; gap: 6px;">
                            <div style="padding: 6px; background: rgba(102,126,234,0.1); border-radius: 5px; display: flex; align-items: center; gap: 8px;">
                                <span style="font-size: 1.2rem;">🖼️</span>
                                <div style="flex: 1;">
                                    <strong style="color: #667eea; font-size: 0.85rem;">Images</strong>
                                    <div style="font-size: 0.7rem; color: #666;">1M pixels = 1M vars</div>
                                </div>
                            </div>
                            <div style="padding: 6px; background: rgba(118,75,162,0.1); border-radius: 5px; display: flex; align-items: center; gap: 8px;">
                                <span style="font-size: 1.2rem;">💬</span>
                                <div style="flex: 1;">
                                    <strong style="color: #764ba2; font-size: 0.85rem;">ChatGPT</strong>
                                    <div style="font-size: 0.7rem; color: #666;">175B parameters!</div>
                                </div>
                            </div>
                            <div style="padding: 6px; background: rgba(243,150,10,0.1); border-radius: 5px; display: flex; align-items: center; gap: 8px;">
                                <span style="font-size: 1.2rem;">🚗</span>
                                <div style="flex: 1;">
                                    <strong style="color: #f3960a; font-size: 0.85rem;">Self-Driving</strong>
                                    <div style="font-size: 0.7rem; color: #666;">Speed, steering, braking</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="background: rgba(255,255,255,0.5); border-radius: 8px; padding: 12px;">
                        <h3 style="color: #333; margin: 0 0 8px 0; text-align: center; font-size: 1rem;">🧙‍♀️ Next: 2 Variables</h3>
                        <div style="text-align: center; padding: 10px;">
                            <div style="font-size: 2rem; margin-bottom: 5px;">🧪</div>
                            <h4 style="color: #764ba2; margin: 5px 0; font-size: 0.9rem;">Magic Potion</h4>
                            <p style="color: #666; font-size: 0.8rem; margin: 5px 0;">Balance <strong>TWO</strong> ingredients!</p>
                            <div style="margin-top: 10px; display: flex; justify-content: center; gap: 12px; align-items: center;">
                                <div style="background: #ffd700; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.8rem;">Y</div>
                                <div style="font-size: 1rem;">+</div>
                                <div style="background: #4169e1; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; color: white; font-size: 0.8rem;">B</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style="background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 8px; padding: 12px; color: white; text-align: center; margin: 12px 0;">
                    <p style="margin: 0; font-size: 0.85rem;"><strong>The magic:</strong> Gradient descent optimizes ALL variables at once!</p>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('ip4', 'createInstructionPart4');
}
