function createInstructionPart4() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration" style="padding: 12px; max-width: 1100px; margin: 0 auto;">
                <h1 style="font-size: 1.8rem; margin-bottom: 16px; background: linear-gradient(45deg, #667eea, #764ba2); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Loss with Multiple Variables: The Perfect Lemonade</h1>
                
                <!-- Main: Two variables with lemonade example -->
                <div style="background: rgba(255,255,255,0.9); border-radius: 10px; padding: 25px; border: 2px solid #667eea; margin: 0 auto 15px; max-width: 1000px;">
                    
                    <div style="background: #f0f4ff; border-radius: 8px; padding: 20px;">
                        <div style="background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(102,126,234,0.05)); border-radius: 6px; padding: 15px; margin-bottom: 15px; display: flex; flex-direction: column; align-items: center;">
                            <strong style="color: #667eea; font-size: 1.1rem;">🎯 Target: Deliciousness Score = 10</strong>
                            <p style="font-size: 0.9rem; margin: 8px 0 0 0; text-align: center;">Perfect lemonade is an example where the loss is a function of two variables: lemon and sugar. They both play a role in how delicious the lemonade is, therefore, they both affect the loss.</p>
                        </div>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 15px 0;">
                            <div style="background: white; border-radius: 6px; padding: 12px; border-left: 3px solid #ff6b6b;">
                                <p style="font-size: 0.9rem; color: #333; margin: 0;">
                                    <strong>Recipe 1: Too Sweet</strong><br>
                                    2 cups sugar + 1 cup lemon → Deliciousness = 1.5 🤢<br>
                                    <span style="font-size: 0.85rem; color: #666;">Way off target!</span><br>
                                    <strong style="color: #ff6b6b;">Loss = 10 - 1.5 = 8.5</strong>
                                </p>
                            </div>
                            
                            <div style="background: white; border-radius: 6px; padding: 12px; border-left: 3px solid #51cf66;">
                                <p style="font-size: 0.9rem; color: #333; margin: 0;">
                                    <strong>Recipe 2: Just Right</strong><br>
                                    1 cup sugar + 1 cup lemon → Deliciousness = 9.8 😋<br>
                                    <span style="font-size: 0.85rem; color: #666;">Almost perfect!</span><br>
                                    <strong style="color: #51cf66;">Loss = 10 - 9.8 = 0.2</strong>
                                </p>
                            </div>
                        </div>
                        
                    </div>
                </div>
                
                <!-- Quick follow-up: Many variables -->
                <div style="background: rgba(118,75,162,0.1); border-radius: 8px; padding: 15px; margin: 0 auto; max-width: 600px; text-align: center;">
                    <p style="font-size: 0.9rem; color: #333; margin: 0;">
                        <strong style="color: #764ba2;">With millions of variables:</strong><br>
                        <span style="font-size: 0.85rem;">Same idea - millions of variables can all be factors that affect the loss.</span>
                    </p>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('ip4', 'createInstructionPart4');
}
