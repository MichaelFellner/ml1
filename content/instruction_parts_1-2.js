// instruction_parts.js - Instructional content between levels

// Final intro section showing all 3 core concepts
function createCoreConcepts() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration" style="padding: 20px; max-width: 1400px; margin: 0 auto;">
                <h1 style="font-size: 2.3rem; margin-bottom: 15px; background: linear-gradient(45deg, #667eea, #764ba2); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">The 3 Core Concepts of AI</h1>
                <p style="font-size: 1.1rem; color: #666; text-align: center; margin-bottom: 30px;">Master these 3 fundamental concepts and you'll understand how AI works at a much deeper level than most people.</p>
                
                <div style="display: flex; flex-direction: column; gap: 20px; margin: 0 auto;">
                    <!-- Concept 1: Loss -->
                    <div class="objective-item" style="background: linear-gradient(135deg, rgba(255,99,71,0.1), rgba(255,99,71,0.05)); border-radius: 12px; padding: 25px; display: flex; align-items: center; gap: 20px; border: 2px solid rgba(255,99,71,0.3); cursor: pointer; transition: all 0.3s ease;">
                        <div style="background: #ff6347; color: white; font-size: 1.8rem; font-weight: bold; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">1</div>
                        <div class="objective-icon" style="font-size: 2.5rem; flex-shrink: 0;">📉</div>
                        <div style="flex: 1;">
                            <h3 style="margin: 0; font-size: 1.3rem; color: #333;">Loss</h3>
                            <p style="margin: 5px 0 0 0; font-size: 0.95rem; color: #666; line-height: 1.4;">A measure of how wrong your AI's predictions are - the single number that tells us if we're on the right track</p>
                        </div>
                    </div>
                    
                    <!-- Concept 2: Gradient Descent - EMPHASIZED -->
                    <div class="objective-item" style="background: linear-gradient(135deg, rgba(102,126,234,0.15), rgba(102,126,234,0.08)); border-radius: 12px; padding: 25px; display: flex; align-items: center; gap: 20px; border: 3px solid rgba(102,126,234,0.5); cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 20px rgba(102,126,234,0.2); position: relative;">
                        <!-- Special badge -->
                        <div style="position: absolute; top: -12px; right: 20px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 6px 16px; border-radius: 20px; font-size: 0.8rem; font-weight: bold; box-shadow: 0 2px 10px rgba(102,126,234,0.3);">
                            ✨ Most Important & Trickiest
                        </div>
                        <div style="background: #667eea; color: white; font-size: 1.8rem; font-weight: bold; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">2</div>
                        <div class="objective-icon" style="font-size: 2.5rem; flex-shrink: 0;">⚡</div>
                        <div style="flex: 1;">
                            <h3 style="margin: 0; font-size: 1.4rem; color: #333;">Gradient Descent</h3>
                            <p style="margin: 5px 0 10px 0; font-size: 0.95rem; color: #666; line-height: 1.4;">The algorithm that automatically improves AI predictions by finding the direction that reduces loss the most</p>
                            
                            <!-- Three parts breakdown -->
                            <div style="background: rgba(102,126,234,0.1); border-radius: 8px; padding: 12px; margin-top: 10px;">
                                <p style="margin: 0 0 8px 0; font-size: 0.85rem; color: #667eea; font-weight: bold;">📚 We'll learn this in 3 parts:</p>
                                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
                                    <div style="background: white; padding: 8px; border-radius: 6px; text-align: center;">
                                        <div style="font-size: 0.75rem; color: #667eea; font-weight: bold;">Part 1</div>
                                        <div style="font-size: 0.8rem; color: #555; margin-top: 2px;">What It Is</div>
                                    </div>
                                    <div style="background: white; padding: 8px; border-radius: 6px; text-align: center;">
                                        <div style="font-size: 0.75rem; color: #667eea; font-weight: bold;">Part 2</div>
                                        <div style="font-size: 0.8rem; color: #555; margin-top: 2px;">How It Works</div>
                                    </div>
                                    <div style="background: white; padding: 8px; border-radius: 6px; text-align: center;">
                                        <div style="font-size: 0.75rem; color: #667eea; font-weight: bold;">Part 3</div>
                                        <div style="font-size: 0.8rem; color: #555; margin-top: 2px;">Advanced Math Caveats</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Concept 3: Training Data -->
                    <div class="objective-item" style="background: linear-gradient(135deg, rgba(45,213,115,0.1), rgba(45,213,115,0.05)); border-radius: 12px; padding: 25px; display: flex; align-items: center; gap: 20px; border: 2px solid rgba(45,213,115,0.3); cursor: pointer; transition: all 0.3s ease;">
                        <div style="background: #2dd573; color: white; font-size: 1.8rem; font-weight: bold; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">3</div>
                        <div class="objective-icon" style="font-size: 2.5rem; flex-shrink: 0;">📊</div>
                        <div style="flex: 1;">
                            <h3 style="margin: 0; font-size: 1.3rem; color: #333;">Training Data</h3>
                            <p style="margin: 5px 0 0 0; font-size: 0.95rem; color: #666; line-height: 1.4;">Examples that teach the AI what's correct - the foundation that determines what patterns the AI will learn</p>
                        </div>
                    </div>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('core-concepts', 'createCoreConcepts');
    
    // Add interactivity
    setTimeout(() => {
        // Hover effects for concept cards
        const concepts = document.querySelectorAll('.objective-item');
        concepts.forEach((concept, index) => {
            concept.addEventListener('mouseenter', () => {
                if (index === 1) { // Special effect for Gradient Descent
                    concept.style.transform = 'translateX(10px) scale(1.02)';
                    concept.style.boxShadow = '0 8px 25px rgba(102,126,234,0.3)';
                } else {
                    concept.style.transform = 'translateX(10px)';
                    concept.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                }
            });
            concept.addEventListener('mouseleave', () => {
                concept.style.transform = 'translateX(0) scale(1)';
                if (index === 1) {
                    concept.style.boxShadow = '0 4px 20px rgba(102,126,234,0.2)';
                } else {
                    concept.style.boxShadow = 'none';
                }
            });
        });
    }, 100);
}

function createPrerequisites() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration" style="padding: 20px; max-width: 1200px; margin: 0 auto;">
                <h1 style="font-size: 2.3rem; margin-bottom: 20px; background: linear-gradient(45deg, #667eea, #764ba2); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">📚 Prerequisites & What AI Really Is</h1>
                
                <!-- Prerequisites Section -->
                <div style="background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(102,126,234,0.05)); border-radius: 12px; padding: 25px; margin: 20px auto; max-width: 900px; border: 2px solid #667eea;">
                    <div style="display: flex; align-items: flex-start; gap: 20px;">
                        <div class="objective-icon" style="font-size: 3rem;">✅</div>
                        <div style="flex: 1;">
                            <h3 style="margin: 0 0 15px 0; font-size: 1.4rem; color: #333;">What You Need to Know</h3>
                            <p style="font-size: 1.05rem; color: #555; line-height: 1.6; margin-bottom: 15px;">This course only requires two simple math concepts:</p>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
                                <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                    <h4 style="margin: 0 0 10px 0; color: #667eea; font-size: 1.1rem;">1. Functions: f(x)</h4>
                                    <p style="font-size: 0.95rem; color: #666; line-height: 1.5; margin: 0;">A function takes an input and produces an output.</p>
                                    <div style="background: #f8f9fa; padding: 8px; border-radius: 4px; margin-top: 10px; font-family: monospace; color: #333;">
                                        f(x) = 2x + 1
                                        <br>f(3) = 7
                                    </div>
                                </div>
                                <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                    <h4 style="margin: 0 0 10px 0; color: #667eea; font-size: 1.1rem;">2. Basic Parabolas</h4>
                                    <p style="font-size: 0.95rem; color: #666; line-height: 1.5; margin: 0;">A U-shaped curve with a lowest point.</p>
                                    <div style="background: #f8f9fa; padding: 8px; border-radius: 4px; margin-top: 10px; font-family: monospace; color: #333;">
                                        y = x²
                                        <br>Has minimum at x = 0
                                    </div>
                                </div>
                            </div>
                            <p style="font-size: 0.95rem; color: #666; font-style: italic;">That's it! If you know these two concepts, you're ready to learn how AI works.</p>
                        </div>
                    </div>
                </div>
                
                <!-- The Big Reveal: AI is Just a Function -->
                <div style="background: linear-gradient(135deg, rgba(45,213,115,0.1), rgba(45,213,115,0.05)); border-radius: 12px; padding: 25px; margin: 30px auto; max-width: 900px; border: 2px solid #2dd573;">
                    <div style="display: flex; align-items: flex-start; gap: 20px;">
                        <div class="objective-icon" style="font-size: 3rem;">🤯</div>
                        <div style="flex: 1;">
                            <h3 style="margin: 0 0 15px 0; font-size: 1.4rem; color: #333;">The Big Secret: AI Is Just a Function!</h3>
                            <p style="font-size: 1.1rem; color: #555; line-height: 1.6; margin-bottom: 20px;">
                                <strong style="color: #2dd573;">All AI, no matter how complex, is fundamentally just a function</strong> that takes input and produces output.
                            </p>
                            
                            <div style="display: grid; gap: 15px; margin: 20px 0;">
                                <div style="background: white; padding: 15px; border-radius: 8px; display: flex; align-items: center; gap: 15px;">
                                    <span style="font-size: 2rem;">📸</span>
                                    <div style="flex: 1;">
                                        <strong style="color: #333;">Image Recognition AI</strong>
                                        <div style="font-size: 0.95rem; color: #666; margin-top: 5px;">
                                            f(image pixels) → "cat" or "dog"
                                        </div>
                                    </div>
                                </div>
                                <div style="background: white; padding: 15px; border-radius: 8px; display: flex; align-items: center; gap: 15px;">
                                    <span style="font-size: 2rem;">💬</span>
                                    <div style="flex: 1;">
                                        <strong style="color: #333;">ChatGPT</strong>
                                        <div style="font-size: 0.95rem; color: #666; margin-top: 5px;">
                                            f(your question) → helpful answer
                                        </div>
                                    </div>
                                </div>
                                <div style="background: white; padding: 15px; border-radius: 8px; display: flex; align-items: center; gap: 15px;">
                                    <span style="font-size: 2rem;">🎬</span>
                                    <div style="flex: 1;">
                                        <strong style="color: #333;">Netflix Recommendations</strong>
                                        <div style="font-size: 0.95rem; color: #666; margin-top: 5px;">
                                            f(your watch history) → movies you'll like
                                        </div>
                                    </div>
                                </div>
                                <div style="background: white; padding: 15px; border-radius: 8px; display: flex; align-items: center; gap: 15px;">
                                    <span style="font-size: 2rem;">🚗</span>
                                    <div style="flex: 1;">
                                        <strong style="color: #333;">Self-Driving Cars</strong>
                                        <div style="font-size: 0.95rem; color: #666; margin-top: 5px;">
                                            f(camera + sensor data) → steering angle + speed
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('prerequisites', 'createPrerequisites');
    
    // Add subtle animations
    setTimeout(() => {
        const cards = document.querySelectorAll('div[style*="background: white"]');
        cards.forEach((card, index) => {
            card.style.transition = 'all 0.3s ease';
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-2px)';
                card.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            });
        });
    }, 100);
}

// Part 1: Understanding Loss - Detailed explanation before Level 1
function createInstructionPart1() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration" style="padding: 20px; max-width: 1200px; margin: 0 auto;">
                <h1 style="font-size: 2.3rem; margin-bottom: 20px; background: linear-gradient(45deg, #667eea, #764ba2); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Part 1: Understanding Loss</h1>
                
                <!-- Main concept box -->
                <div style="background: linear-gradient(135deg, rgba(255,99,71,0.1), rgba(255,99,71,0.05)); border-radius: 12px; padding: 25px; margin: 20px auto; max-width: 900px; border: 2px solid #ff6347;">
                    <div style="display: flex; align-items: flex-start; gap: 20px;">
                        <div class="objective-icon" style="font-size: 3rem;">📉</div>
                        <div style="flex: 1;">
                            <h3 style="margin: 0 0 15px 0; font-size: 1.4rem; color: #333;">Loss: How Wrong Your AI Is</h3>
                            <p style="font-size: 1.05rem; color: #555; line-height: 1.6; margin-bottom: 15px;"><strong>Loss</strong> is the most important concept in AI. It's simply a number that tells us how wrong our predictions are.</p>
                            <p style="font-size: 1rem; color: #666; line-height: 1.5;">The goal of AI is always the same: <strong style="color: #ff6347;">minimize the loss</strong> to make better predictions!</p>
                        </div>
                    </div>
                </div>
                
                <!-- Examples Grid -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin: 30px 0;">
                    <!-- Target Practice Analogy -->
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
                    
                    <!-- AI Examples -->
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
                
              
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('ip1', 'createInstructionPart1');
}

// createInstructionPart2 placeholder - add gradient descent explanation here if needed
function createInstructionPart2() {
    // This can be implemented later for explaining gradient descent in detail
    // For now, redirecting to next appropriate content
    createInstructionPart1();
}