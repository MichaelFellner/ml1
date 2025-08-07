
function createInstructionPart5() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration" style="padding: 20px; max-width: 1200px; margin: 0 auto;">
                <h1 style="font-size: 2.3rem; margin-bottom: 20px; background: linear-gradient(45deg, #667eea, #764ba2); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">⚡ Gradient Descent Scales Up!</h1>
                
                <!-- Main insight card -->
                <div style="background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(102,126,234,0.05)); border-radius: 12px; padding: 25px; margin: 20px auto; max-width: 800px; border: 2px solid #667eea;">
                    <div style="display: flex; align-items: flex-start; gap: 20px;">
                        <div class="objective-icon" style="font-size: 3rem;">🤯</div>
                        <div style="flex: 1;">
                            <h3 style="margin: 0 0 15px 0; font-size: 1.4rem; color: #333;">The Same Algorithm Works Everywhere!</h3>
                            <p style="font-size: 1.05rem; color: #555; line-height: 1.6;">Amazing news: <strong style="color: #667eea;">Gradient descent works on multiple variables too!</strong> Whether it's 1 variable or 1 billion, the same algorithm can optimize them all simultaneously.</p>
                        </div>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin: 30px 0;">
                    <div style="background: rgba(255,255,255,0.5); border-radius: 12px; padding: 20px; text-align: center;">
                        <div style="font-size: 2.5rem; margin-bottom: 10px;">🤖</div>
                        <h4 style="color: #333; margin: 10px 0;">1 Variable</h4>
                        <p style="color: #666; font-size: 0.9rem;">Energy → Loss<br><em>What you just did</em></p>
                    </div>
                    
                    <div style="background: rgba(255,255,255,0.5); border-radius: 12px; padding: 20px; text-align: center;">
                        <div style="font-size: 2.5rem; margin-bottom: 10px;">🧪</div>
                        <h4 style="color: #667eea; margin: 10px 0;">6 Variables</h4>
                        <p style="color: #666; font-size: 0.9rem;">Six ingredients → Loss<br><em>Coming up next!</em></p>
                    </div>
                    
                    <div style="background: rgba(255,255,255,0.5); border-radius: 12px; padding: 20px; text-align: center;">
                        <div style="font-size: 2.5rem; margin-bottom: 10px;">💬</div>
                        <h4 style="color: #764ba2; margin: 10px 0;">175B Variables</h4>
                        <p style="color: #666; font-size: 0.9rem;">ChatGPT's parameters<br><em>Same algorithm!</em></p>
                    </div>
                </div>
                
                <div style="background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 12px; padding: 20px; color: white; text-align: center; margin: 20px 0;">
                    <h3 style="margin: 0 0 10px 0; font-size: 1.2rem;">🎮 Level 4: Watch the Magic</h3>
                    <p style="margin: 0; font-size: 1rem;">See gradient descent automatically balance SIX potion ingredients at once!</p>
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
            <div class="level-content celebration" style="padding: 15px; max-width: 1200px; margin: 0 auto;">
                <h1 style="font-size: 2rem; margin-bottom: 15px; background: linear-gradient(45deg, #667eea, #764ba2); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">🔬 How Gradient Descent Works</h1>
                
                <!-- Reusing concept2 div styling for consistency -->
                <div id="concept2" style="background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(102,126,234,0.05)); border-radius: 12px; padding: 20px; margin: 15px auto; max-width: 800px; border: 2px solid #667eea;">
                    <div style="display: flex; align-items: flex-start; gap: 15px;">
                        <div class="objective-icon" style="font-size: 2.5rem;">⚡</div>
                        <div style="flex: 1;">
                            <h3 style="margin: 0 0 10px 0; font-size: 1.2rem; color: #333;">The Algorithm Behind the Magic</h3>
                            <p style="font-size: 0.95rem; color: #555; line-height: 1.5;">We've seen that <strong>gradient descent is a tool for minimizing loss</strong>, but how does it work more specifically? It uses <strong style="color: #667eea;">mathematical slopes</strong> to find the fastest path downhill!</p>
                        </div>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
                    <!-- Hill Climbing Analogy -->
                    <div style="background: rgba(255,255,255,0.5); border-radius: 10px; padding: 15px;">
                        <h3 style="color: #333; margin: 0 0 10px 0; font-size: 1.1rem; text-align: center;">⛰️ Like Rolling Downhill</h3>
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: rgba(255,99,71,0.1); border-radius: 6px;">
                                <span style="font-size: 1.3rem;">↗️</span>
                                <div>
                                    <strong style="color: #ff6347; font-size: 0.9rem;">Upward slope</strong>
                                    <div style="font-size: 0.8rem; color: #666;">Go left ← (decrease)</div>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: rgba(102,126,234,0.1); border-radius: 6px;">
                                <span style="font-size: 1.3rem;">↘️</span>
                                <div>
                                    <strong style="color: #667eea; font-size: 0.9rem;">Downward slope</strong>
                                    <div style="font-size: 0.8rem; color: #666;">Go right → (increase)</div>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: rgba(45,213,115,0.1); border-radius: 6px;">
                                <span style="font-size: 1.3rem;">➡️</span>
                                <div>
                                    <strong style="color: #2dd573; font-size: 0.9rem;">Flat (no slope)</strong>
                                    <div style="font-size: 0.8rem; color: #666;">Found minimum! ✓</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- The Formula -->
                    <div style="background: rgba(255,255,255,0.5); border-radius: 10px; padding: 15px;">
                        <h3 style="color: #333; margin: 0 0 10px 0; font-size: 1.1rem; text-align: center;">🧮 The Math Formula</h3>
                        <div style="background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 8px; padding: 12px; color: white; text-align: center; margin-bottom: 10px;">
                            <div style="font-size: 0.95rem; font-weight: bold;">New = Old - (LR × Gradient)</div>
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            <div style="padding: 8px; background: rgba(102,126,234,0.05); border-radius: 6px; border-left: 3px solid #667eea;">
                                <strong style="color: #667eea; font-size: 0.85rem;">Gradient</strong>
                                <div style="font-size: 0.8rem; color: #666;">The slope (which way)</div>
                            </div>
                            <div style="padding: 8px; background: rgba(118,75,162,0.05); border-radius: 6px; border-left: 3px solid #764ba2;">
                                <strong style="color: #764ba2; font-size: 0.85rem;">Learning Rate (LR)</strong>
                                <div style="font-size: 0.8rem; color: #666;">Step size (how far)</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Learning Rate Preview -->
                <div style="background: rgba(255,255,255,0.5); border-radius: 10px; padding: 15px; margin: 15px 0;">
                    <h3 style="color: #333; margin: 0 0 10px 0; font-size: 1.1rem; text-align: center;">👣 Step Size Matters!</h3>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
                        <div style="text-align: center; padding: 10px; background: rgba(255,99,71,0.1); border-radius: 8px;">
                            <div style="font-size: 1.8rem;">🐌</div>
                            <strong style="color: #ff6347; font-size: 0.9rem;">Tiny (0.01)</strong>
                            <div style="font-size: 0.75rem; color: #666; margin-top: 3px;">Safe but slooow</div>
                        </div>
                        <div style="text-align: center; padding: 10px; background: rgba(102,126,234,0.1); border-radius: 8px;">
                            <div style="font-size: 1.8rem;">🚶</div>
                            <strong style="color: #667eea; font-size: 0.9rem;">Medium (0.1)</strong>
                            <div style="font-size: 0.75rem; color: #666; margin-top: 3px;">Just right!</div>
                        </div>
                        <div style="text-align: center; padding: 10px; background: rgba(118,75,162,0.1); border-radius: 8px;">
                            <div style="font-size: 1.8rem;">🏃</div>
                            <strong style="color: #764ba2; font-size: 0.9rem;">Large (1.0)</strong>
                            <div style="font-size: 0.75rem; color: #666; margin-top: 3px;">Fast but risky</div>
                        </div>
                    </div>
                </div>
                
                <div style="background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 10px; padding: 15px; color: white; text-align: center; margin: 15px 0;">
                    <h3 style="margin: 0 0 8px 0; font-size: 1.1rem;">📈 Coming up: Interactive Deep Dive!</h3>
                    <p style="margin: 0; font-size: 0.9rem;">Get hands-on with functions, see gradients in action, and experiment with different learning rates!</p>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('ip6', 'createInstructionPart6');
    
    // Add subtle hover animation for the formula
    setTimeout(() => {
        const formulaBox = document.querySelector('[style*="New = Old"]')?.parentElement;
        if (formulaBox) {
            formulaBox.addEventListener('mouseenter', () => {
                formulaBox.style.transform = 'scale(1.05)';
                formulaBox.style.transition = 'transform 0.2s ease';
            });
            formulaBox.addEventListener('mouseleave', () => {
                formulaBox.style.transform = 'scale(1)';
            });
        }
    }, 100);
}