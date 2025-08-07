function createInstructionPart7() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration" style="padding: 20px; max-width: 1200px; margin: 0 auto;">
                <h1 style="font-size: 2.3rem; margin-bottom: 20px; background: linear-gradient(45deg, #667eea, #764ba2); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">🎯 Progress Check & What's Next</h1>
                
                <div class="learning-objectives" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 30px 0;">
                    <!-- Completed concepts with checkmarks -->
                    <div id="concept1" class="objective-item completed" style="background: linear-gradient(135deg, rgba(45,213,115,0.1), rgba(45,213,115,0.05)); border-radius: 12px; padding: 20px; cursor: pointer; transition: all 0.3s ease; border: 2px solid #2dd573; position: relative;">
                        <div style="position: absolute; top: 10px; right: 10px; background: #2dd573; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
                            <span style="color: white; font-weight: bold;">✓</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="objective-icon" style="font-size: 2.5rem;">📉</div>
                            <div class="objective-content">
                                <h3 style="margin: 0; font-size: 1.2rem; color: #333;">Loss ✅</h3>
                                <p style="margin: 5px 0 0 0; font-size: 0.9rem; color: #666; line-height: 1.4;">You mastered measuring how wrong predictions are</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Gradient Descent - partially complete (yellowish) -->
                    <div id="concept2" class="objective-item in-progress" style="background: linear-gradient(135deg, rgba(243,150,10,0.1), rgba(243,150,10,0.05)); border-radius: 12px; padding: 20px; cursor: pointer; transition: all 0.3s ease; border: 2px solid #f3960a; position: relative;">
                        <div style="position: absolute; top: 10px; right: 10px; background: #f3960a; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
                            <span style="color: white; font-weight: bold;">~</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="objective-icon" style="font-size: 2.5rem;">⚡</div>
                            <div class="objective-content">
                                <h3 style="margin: 0; font-size: 1.2rem; color: #333;">Gradient Descent <span style="color: #f3960a;">⚡</span></h3>
                                <p style="margin: 5px 0 0 0; font-size: 0.9rem; color: #666; line-height: 1.4;">Good progress! Still more to learn about optimization</p>
                            </div>
                        </div>
                    </div>
                    
                    <div id="concept3" class="objective-item completed" style="background: linear-gradient(135deg, rgba(45,213,115,0.1), rgba(45,213,115,0.05)); border-radius: 12px; padding: 20px; cursor: pointer; transition: all 0.3s ease; border: 2px solid #2dd573; position: relative;">
                        <div style="position: absolute; top: 10px; right: 10px; background: #2dd573; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
                            <span style="color: white; font-weight: bold;">✓</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="objective-icon" style="font-size: 2.5rem;">👣</div>
                            <div class="objective-content">
                                <h3 style="margin: 0; font-size: 1.2rem; color: #333;">Step Sizes & Learning Rate ✅</h3>
                                <p style="margin: 5px 0 0 0; font-size: 0.9rem; color: #666; line-height: 1.4;">You experimented with different learning speeds</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Training Data - now completed! -->
                    <div id="concept4" class="objective-item completed" style="background: linear-gradient(135deg, rgba(45,213,115,0.1), rgba(45,213,115,0.05)); border-radius: 12px; padding: 20px; cursor: pointer; transition: all 0.3s ease; border: 2px solid #2dd573; position: relative;">
                        <div style="position: absolute; top: 10px; right: 10px; background: #2dd573; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
                            <span style="color: white; font-weight: bold;">✓</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="objective-icon" style="font-size: 2.5rem;">📊</div>
                            <div class="objective-content">
                                <h3 style="margin: 0; font-size: 1.2rem; color: #333;">Training Data ✅</h3>
                                <p style="margin: 5px 0 0 0; font-size: 0.9rem; color: #666; line-height: 1.4;">You used examples to make better predictions!</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Upcoming concepts -->
                    <div id="concept5" class="objective-item upcoming" style="background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(102,126,234,0.05)); border-radius: 12px; padding: 20px; cursor: pointer; transition: all 0.3s ease; border: 2px solid transparent;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="objective-icon" style="font-size: 2.5rem; opacity: 0.7;">🔍</div>
                            <div class="objective-content">
                                <h3 style="margin: 0; font-size: 1.2rem; color: #667eea;">Training Features <span style="color: #f3960a;">→ Next!</span></h3>
                                <p style="margin: 5px 0 0 0; font-size: 0.9rem; color: #666; line-height: 1.4;">The inputs AI uses to make predictions</p>
                            </div>
                        </div>
                    </div>
                    
                    <div id="concept6" class="objective-item upcoming" style="background: linear-gradient(135deg, rgba(147,51,234,0.05), rgba(147,51,234,0.02)); border-radius: 12px; padding: 20px; cursor: pointer; transition: all 0.3s ease; border: 2px solid transparent; opacity: 0.8;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="objective-icon" style="font-size: 2.5rem; opacity: 0.6;">🚀</div>
                            <div class="objective-content">
                                <h3 style="margin: 0; font-size: 1.2rem; color: #888;">Complete ML Model</h3>
                                <p style="margin: 5px 0 0 0; font-size: 0.9rem; color: #888; line-height: 1.4;">Combining everything into a real AI system</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Progress summary -->
                <div style="background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 12px; padding: 20px; color: white; text-align: center; margin: 20px 0;">
                    <h3 style="margin: 0 0 10px 0; font-size: 1.2rem;">🎓 You're Making Great Progress!</h3>
                    <div style="display: flex; align-items: center; gap: 10px; justify-content: center; margin: 15px 0;">
                        <div style="background: white; height: 10px; border-radius: 5px; flex: 1; max-width: 400px;">
                            <div style="background: linear-gradient(to right, #2dd573 0%, #2dd573 55%, #f3960a 55%, #f3960a 65%, #ddd 65%); height: 100%; border-radius: 5px;"></div>
                        </div>
                        <span style="font-size: 1rem;">4.5 of 6 concepts learned</span>
                    </div>
                    <p style="margin: 10px 0 0 0; font-size: 1rem;">Excellent! You've learned the core concepts and are ready for advanced topics.</p>
                </div>
                
                <!-- Note about gradient descent -->
                <div style="background: linear-gradient(135deg, rgba(243,150,10,0.1), rgba(243,150,10,0.05)); border-radius: 12px; padding: 20px; margin: 20px auto; max-width: 800px; border: 2px solid #f3960a;">
                    <div style="display: flex; align-items: flex-start; gap: 20px;">
                        <div style="font-size: 2.5rem;">⚡</div>
                        <div style="flex: 1;">
                            <h3 style="margin: 0 0 10px 0; font-size: 1.2rem; color: #333;">A Note on Gradient Descent</h3>
                            <p style="font-size: 1rem; color: #555; line-height: 1.5; margin-bottom: 8px;">You've got a solid understanding of how gradient descent works, but there's still more to explore!</p>
                            <p style="font-size: 0.95rem; color: #666; line-height: 1.4;">Coming up, you'll see how gradient descent combines with training data and features to create powerful AI models that can learn complex patterns.</p>
                        </div>
                    </div>
                </div>
                
                <!-- What's immediately next -->
                <div style="background: rgba(255,255,255,0.5); border-radius: 12px; padding: 25px; margin: 20px auto; max-width: 800px; border: 2px solid #667eea;">
                    <div style="display: flex; align-items: flex-start; gap: 20px;">
                        <div style="font-size: 3rem;">🔍</div>
                        <div style="flex: 1;">
                            <h3 style="margin: 0 0 15px 0; font-size: 1.4rem; color: #333;">Up Next: Training Features</h3>
                            <p style="font-size: 1.05rem; color: #555; line-height: 1.6; margin-bottom: 10px;"><strong>Great job helping Max find his perfect bone!</strong></p>
                            <p style="font-size: 1rem; color: #666; line-height: 1.5;">Now you'll learn how AI identifies what features to look at in the data. This is crucial for making accurate predictions in complex real-world scenarios!</p>
                        </div>
                    </div>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('ip7', 'createInstructionPart7');
    
    // Add interactivity
    setTimeout(() => {
        // Hover effects for concept cards
        const concepts = document.querySelectorAll('.objective-item');
        concepts.forEach((concept) => {
            if (concept.classList.contains('completed')) {
                concept.addEventListener('mouseenter', () => {
                    concept.style.transform = 'translateY(-5px)';
                    concept.style.boxShadow = '0 5px 15px rgba(45,213,115,0.2)';
                });
                concept.addEventListener('mouseleave', () => {
                    concept.style.transform = 'translateY(0)';
                    concept.style.boxShadow = 'none';
                });
            } else if (concept.classList.contains('in-progress')) {
                concept.addEventListener('mouseenter', () => {
                    concept.style.transform = 'translateY(-5px)';
                    concept.style.boxShadow = '0 5px 15px rgba(243,150,10,0.2)';
                });
                concept.addEventListener('mouseleave', () => {
                    concept.style.transform = 'translateY(0)';
                    concept.style.boxShadow = 'none';
                });
            } else if (concept.id === 'concept5') {
                concept.addEventListener('mouseenter', () => {
                    concept.style.transform = 'translateY(-5px)';
                    concept.style.boxShadow = '0 5px 15px rgba(102,126,234,0.2)';
                    concept.style.borderColor = '#667eea';
                });
                concept.addEventListener('mouseleave', () => {
                    concept.style.transform = 'translateY(0)';
                    concept.style.boxShadow = 'none';
                    concept.style.borderColor = 'transparent';
                });
            }
        });
    }, 100);
}




function createInstructionPart8() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration" style="padding: 20px; max-width: 1200px; margin: 0 auto;">
                <h1 style="font-size: 2.3rem; margin-bottom: 20px; background: linear-gradient(45deg, #667eea, #764ba2); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">📊 Introduction to Training Data</h1>
                
                <!-- Main concept card -->
                <div style="background: linear-gradient(135deg, rgba(45,213,115,0.1), rgba(45,213,115,0.05)); border-radius: 12px; padding: 25px; margin: 20px auto; max-width: 800px; border: 2px solid #2dd573;">
                    <div style="display: flex; align-items: flex-start; gap: 20px;">
                        <div class="objective-icon" style="font-size: 3rem;">💡</div>
                        <div style="flex: 1;">
                            <h3 style="margin: 0 0 15px 0; font-size: 1.4rem; color: #333;">The Missing Piece: Examples!</h3>
                            <p style="font-size: 1.05rem; color: #555; line-height: 1.6; margin-bottom: 15px;">You've learned how gradient descent finds optimal values, but <strong>how does AI know what the right answer should be?</strong></p>
                            <p style="font-size: 1rem; color: #666; line-height: 1.5;">That's where <strong style="color: #2dd573;">training data</strong> comes in - real examples that show the AI what correct looks like!</p>
                        </div>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin: 30px 0;">
                    <!-- Without Training Data -->
                    <div style="background: rgba(255,255,255,0.5); border-radius: 12px; padding: 20px;">
                        <h3 style="color: #ff6347; margin-bottom: 15px; text-align: center;">❌ Without Training Data</h3>
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            <div style="display: flex; align-items: center; gap: 15px; padding: 10px; background: rgba(255,99,71,0.1); border-radius: 8px;">
                                <span style="font-size: 1.5rem;">🤷</span>
                                <div style="flex: 1;">
                                    <strong style="color: #333;">Just Guessing</strong>
                                    <div style="font-size: 0.85rem; color: #666;">No idea what's right</div>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 15px; padding: 10px; background: rgba(255,99,71,0.1); border-radius: 8px;">
                                <span style="font-size: 1.5rem;">🎲</span>
                                <div style="flex: 1;">
                                    <strong style="color: #333;">Random Attempts</strong>
                                    <div style="font-size: 0.85rem; color: #666;">Hope to get lucky</div>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 15px; padding: 10px; background: rgba(255,99,71,0.1); border-radius: 8px;">
                                <span style="font-size: 1.5rem;">😕</span>
                                <div style="flex: 1;">
                                    <strong style="color: #333;">No Learning</strong>
                                    <div style="font-size: 0.85rem; color: #666;">Can't improve systematically</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- With Training Data -->
                    <div style="background: rgba(255,255,255,0.5); border-radius: 12px; padding: 20px;">
                        <h3 style="color: #2dd573; margin-bottom: 15px; text-align: center;">✅ With Training Data</h3>
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            <div style="display: flex; align-items: center; gap: 15px; padding: 10px; background: rgba(45,213,115,0.1); border-radius: 8px;">
                                <span style="font-size: 1.5rem;">📚</span>
                                <div style="flex: 1;">
                                    <strong style="color: #333;">Learn from Examples</strong>
                                    <div style="font-size: 0.85rem; color: #666;">See what worked before</div>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 15px; padding: 10px; background: rgba(45,213,115,0.1); border-radius: 8px;">
                                <span style="font-size: 1.5rem;">🎯</span>
                                <div style="flex: 1;">
                                    <strong style="color: #333;">Find Patterns</strong>
                                    <div style="font-size: 0.85rem; color: #666;">Discover what matters</div>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 15px; padding: 10px; background: rgba(45,213,115,0.1); border-radius: 8px;">
                                <span style="font-size: 1.5rem;">📈</span>
                                <div style="flex: 1;">
                                    <strong style="color: #333;">Make Predictions</strong>
                                    <div style="font-size: 0.85rem; color: #666;">Apply learned patterns</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Real World Examples -->
                <div style="background: rgba(255,255,255,0.5); border-radius: 12px; padding: 20px; margin: 20px 0;">
                    <h3 style="color: #333; margin-bottom: 15px; text-align: center; font-size: 1.2rem;">🌍 Real-World Training Data</h3>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
                        <div style="text-align: center; padding: 15px; background: rgba(102,126,234,0.1); border-radius: 8px;">
                            <div style="font-size: 2rem; margin-bottom: 8px;">📧</div>
                            <strong style="color: #667eea; font-size: 0.95rem;">Spam Detection</strong>
                            <div style="font-size: 0.8rem; color: #666; margin-top: 5px;">1000s of labeled emails<br>(spam vs not spam)</div>
                        </div>
                        <div style="text-align: center; padding: 15px; background: rgba(118,75,162,0.1); border-radius: 8px;">
                            <div style="font-size: 2rem; margin-bottom: 8px;">🖼️</div>
                            <strong style="color: #764ba2; font-size: 0.95rem;">Image Recognition</strong>
                            <div style="font-size: 0.8rem; color: #666; margin-top: 5px;">Millions of photos<br>(cat, dog, car, etc.)</div>
                        </div>
                        <div style="text-align: center; padding: 15px; background: rgba(243,150,10,0.1); border-radius: 8px;">
                            <div style="font-size: 2rem; margin-bottom: 8px;">🎬</div>
                            <strong style="color: #f3960a; font-size: 0.95rem;">Netflix Recommendations</strong>
                            <div style="font-size: 0.8rem; color: #666; margin-top: 5px;">Your watch history<br>(likes & dislikes)</div>
                        </div>
                    </div>
                </div>
                
                <!-- Coming Up Next -->
                <div style="background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 12px; padding: 20px; color: white; text-align: center; margin: 20px 0;">
                    <h3 style="margin: 0 0 10px 0; font-size: 1.2rem;">🐕 Coming up: Max Needs Your Help!</h3>
                    <p style="margin: 0 0 10px 0; font-size: 1rem;">You'll help a dog named Max find his perfect bone size.</p>
                    <div style="display: flex; justify-content: center; gap: 30px; align-items: center; margin-top: 15px;">
                        <div style="text-align: center;">
                            <div style="font-size: 1.8rem; margin-bottom: 5px;">🤔</div>
                            <div style="font-size: 0.9rem;">First: Guess blindly</div>
                        </div>
                        <div style="font-size: 1.5rem;">→</div>
                        <div style="text-align: center;">
                            <div style="font-size: 1.8rem; margin-bottom: 5px;">📊</div>
                            <div style="font-size: 0.9rem;">Then: Use training data!</div>
                        </div>
                        <div style="font-size: 1.5rem;">→</div>
                        <div style="text-align: center;">
                            <div style="font-size: 1.8rem; margin-bottom: 5px;">🎯</div>
                            <div style="font-size: 0.9rem;">Success!</div>
                        </div>
                    </div>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('ip8', 'createInstructionPart8');
    
    // Add subtle animations
    setTimeout(() => {
        const cards = document.querySelectorAll('[style*="background: rgba"]');
        cards.forEach((card, index) => {
            card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-3px)';
                card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = 'none';
            });
        });
    }, 100);
}