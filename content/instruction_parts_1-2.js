// instruction_parts.js - Instructional content between levels

function createInstructionPart1() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration" style="padding: 20px; max-width: 1200px; margin: 0 auto;">
                <h1 style="font-size: 2.3rem; margin-bottom: 20px; background: linear-gradient(45deg, #667eea, #764ba2); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Core Concepts You'll Learn</h1>
                
                <div class="learning-objectives" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 30px 0;">
                    <div id="concept1" class="objective-item" style="background: linear-gradient(135deg, rgba(255,99,71,0.1), rgba(255,99,71,0.05)); border-radius: 12px; padding: 20px; cursor: pointer; transition: all 0.3s ease; border: 2px solid transparent;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="objective-icon" style="font-size: 2.5rem;">📉</div>
                            <div class="objective-content">
                                <h3 style="margin: 0; font-size: 1.2rem; color: #333;">Loss</h3>
                                <p style="margin: 5px 0 0 0; font-size: 0.9rem; color: #666; line-height: 1.4;">A measure of how wrong your AI's predictions are</p>
                            </div>
                        </div>
                    </div>
                    
                    <div id="concept2" class="objective-item" style="background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(102,126,234,0.05)); border-radius: 12px; padding: 20px; cursor: pointer; transition: all 0.3s ease; border: 2px solid transparent;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="objective-icon" style="font-size: 2.5rem;">⚡</div>
                            <div class="objective-content">
                                <h3 style="margin: 0; font-size: 1.2rem; color: #333;">Gradient Descent</h3>
                                <p style="margin: 5px 0 0 0; font-size: 0.9rem; color: #666; line-height: 1.4;">The algorithm that automatically improves AI predictions</p>
                            </div>
                        </div>
                    </div>
                    
                    <div id="concept3" class="objective-item" style="background: linear-gradient(135deg, rgba(118,75,162,0.1), rgba(118,75,162,0.05)); border-radius: 12px; padding: 20px; cursor: pointer; transition: all 0.3s ease; border: 2px solid transparent;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="objective-icon" style="font-size: 2.5rem;">👣</div>
                            <div class="objective-content">
                                <h3 style="margin: 0; font-size: 1.2rem; color: #333;">Step Sizes & Learning Rate</h3>
                                <p style="margin: 5px 0 0 0; font-size: 0.9rem; color: #666; line-height: 1.4;">How big steps the AI takes when learning</p>
                            </div>
                        </div>
                    </div>
                    
                    <div id="concept4" class="objective-item" style="background: linear-gradient(135deg, rgba(45,213,115,0.1), rgba(45,213,115,0.05)); border-radius: 12px; padding: 20px; cursor: pointer; transition: all 0.3s ease; border: 2px solid transparent;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="objective-icon" style="font-size: 2.5rem;">📊</div>
                            <div class="objective-content">
                                <h3 style="margin: 0; font-size: 1.2rem; color: #333;">Training Data</h3>
                                <p style="margin: 5px 0 0 0; font-size: 0.9rem; color: #666; line-height: 1.4;">Examples that teach the AI what's correct</p>
                            </div>
                        </div>
                    </div>
                    
                    <div id="concept5" class="objective-item" style="background: linear-gradient(135deg, rgba(243,150,10,0.1), rgba(243,150,10,0.05)); border-radius: 12px; padding: 20px; cursor: pointer; transition: all 0.3s ease; border: 2px solid transparent;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="objective-icon" style="font-size: 2.5rem;">🔍</div>
                            <div class="objective-content">
                                <h3 style="margin: 0; font-size: 1.2rem; color: #333;">Training Features</h3>
                                <p style="margin: 5px 0 0 0; font-size: 0.9rem; color: #666; line-height: 1.4;">The specific details AI looks at to make predictions</p>
                            </div>
                        </div>
                    </div>
                    
                    <div id="concept6" class="objective-item" style="background: linear-gradient(135deg, rgba(147,51,234,0.1), rgba(147,51,234,0.05)); border-radius: 12px; padding: 20px; cursor: pointer; transition: all 0.3s ease; border: 2px solid transparent;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="objective-icon" style="font-size: 2.5rem;">🚀</div>
                            <div class="objective-content">
                                <h3 style="margin: 0; font-size: 1.2rem; color: #333;">Putting It All Together</h3>
                                <p style="margin: 5px 0 0 0; font-size: 0.9rem; color: #666; line-height: 1.4;">Using gradient descent with training data and features to create a real ML model</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('ip1', 'createInstructionPart1');
    
    // Add interactivity
    setTimeout(() => {
        // Hover effects for concept cards
        const concepts = document.querySelectorAll('.objective-item');
        concepts.forEach((concept, index) => {
            concept.addEventListener('mouseenter', () => {
                concept.style.transform = 'translateY(-5px)';
                concept.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                concept.style.borderColor = ['#ff6347', '#667eea', '#764ba2', '#2dd573', '#f3960a', '#9333ea'][index];
            });
            concept.addEventListener('mouseleave', () => {
                concept.style.transform = 'translateY(0)';
                concept.style.boxShadow = 'none';
                concept.style.borderColor = 'transparent';
            });
        });
    }, 100);
}

function createInstructionPart2() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration" style="padding: 20px; max-width: 1200px; margin: 0 auto;">
                <h1 style="font-size: 2.3rem; margin-bottom: 20px; background: linear-gradient(45deg, #667eea, #764ba2); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Core Concept 1: Loss</h1>
                
                <!-- Reusing concept1 div styling for familiarity -->
                <div style="background: linear-gradient(135deg, rgba(255,99,71,0.1), rgba(255,99,71,0.05)); border-radius: 12px; padding: 25px; margin: 20px auto; max-width: 800px; border: 2px solid #ff6347;">
                    <div style="display: flex; align-items: flex-start; gap: 20px;">
                        <div class="objective-icon" style="font-size: 3rem;">📉</div>
                        <div style="flex: 1;">
                            <h3 style="margin: 0 0 15px 0; font-size: 1.4rem; color: #333;">Loss: How Wrong Your AI Is</h3>
                            <p style="font-size: 1.05rem; color: #555; line-height: 1.6; margin-bottom: 15px;"><strong>Loss</strong> is the most important concept in AI. It's simply a number that tells us how wrong our predictions are.</p>
                            <p style="font-size: 1rem; color: #666; line-height: 1.5;">The goal of AI is always the same: <strong style="color: #ff6347;">minimize the loss</strong> to make better predictions!</p>
                        </div>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin: 30px 0;">
                    <div style="background: rgba(255,255,255,0.5); border-radius: 12px; padding: 20px; text-align: center;">
                        <h3 style="color: #333; margin-bottom: 15px;">🎯 Think: Target Practice</h3>
                        <div style="display: flex; flex-direction: column; gap: 10px; text-align: left;">
                            <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: rgba(45,213,115,0.1); border-radius: 8px;">
                                <span style="font-size: 1.5rem;">🎯</span>
                                <div>
                                    <strong style="color: #2dd573;">Bullseye!</strong>
                                    <div style="font-size: 0.9rem; color: #666;">Loss = 0 (Perfect!)</div>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: rgba(243,150,10,0.1); border-radius: 8px;">
                                <span style="font-size: 1.5rem;">⭕</span>
                                <div>
                                    <strong style="color: #f3960a;">Near center</strong>
                                    <div style="font-size: 0.9rem; color: #666;">Loss = Small number</div>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: rgba(255,99,71,0.1); border-radius: 8px;">
                                <span style="font-size: 1.5rem;">❌</span>
                                <div>
                                    <strong style="color: #ff6347;">Missed completely</strong>
                                    <div style="font-size: 0.9rem; color: #666;">Loss = Big number!</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="background: rgba(255,255,255,0.5); border-radius: 12px; padding: 20px; text-align: center;">
                        <h3 style="color: #333; margin-bottom: 15px;">🤖 In AI Terms</h3>
                        <div style="display: flex; flex-direction: column; gap: 10px; text-align: left;">
                            <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: rgba(45,213,115,0.1); border-radius: 8px;">
                                <span style="font-size: 1.5rem;">✅</span>
                                <div>
                                    <strong style="color: #2dd573;">Predict: 75, Actual: 75</strong>
                                    <div style="font-size: 0.9rem; color: #666;">Loss = 0 (Nailed it!)</div>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: rgba(243,150,10,0.1); border-radius: 8px;">
                                <span style="font-size: 1.5rem;">⚠️</span>
                                <div>
                                    <strong style="color: #f3960a;">Predict: 70, Actual: 75</strong>
                                    <div style="font-size: 0.9rem; color: #666;">Loss = 5 (Pretty close)</div>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: rgba(255,99,71,0.1); border-radius: 8px;">
                                <span style="font-size: 1.5rem;">❌</span>
                                <div>
                                    <strong style="color: #ff6347;">Predict: 50, Actual: 75</strong>
                                    <div style="font-size: 0.9rem; color: #666;">Loss = 25 (Way off!)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style="background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 12px; padding: 20px; color: white; text-align: center; margin: 20px 0;">
                    <h3 style="margin: 0 0 10px 0; font-size: 1.2rem;">🎮 Coming up: Level 1 - Robot Energy Challenge</h3>
                    <p style="margin: 0; font-size: 1rem;">You'll help a robot find its optimal energy level by minimizing loss. Can you get the loss down to zero?</p>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('ip2', 'createInstructionPart2');
}