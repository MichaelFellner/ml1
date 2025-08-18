// instruction_parts.js - Instructional content between levels

// Ensure createStandardNavigation function exists
if (typeof createStandardNavigation !== 'function') {
    window.createStandardNavigation = function(first = false, last = false) {
        // Fallback implementation - returns empty string as navigation is injected separately
        return '';
    };
}

// Ensure initializeNavigation function exists  
if (typeof initializeNavigation !== 'function') {
    window.initializeNavigation = function(pageId, functionName, first = false, last = false) {
        // Fallback implementation - basic state tracking
        if (typeof gameState !== 'undefined') {
            gameState.currentNavigationId = pageId;
            gameState.currentPageFunction = functionName;
        }
        window.currentPageFunction = functionName;
    };
}

// 

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

