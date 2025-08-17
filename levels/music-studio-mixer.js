/**
 * Music Studio Mixer Challenge
 * 
 * Interactive level teaching gradient descent with 10 parameters and a bias term through audio mixing
 */

window.createMusicStudioMixer = function() {
    
    class MusicStudioMixerLevel extends window.InteractiveLevelTemplate {
        constructor() {
            super({
                id: 'music-studio-mixer',
                name: 'Music Studio Mixer Challenge',
                type: 'interactive',
                description: '',
                targetFunction: { 
                    w1: 85,   // Drums
                    w2: 70,   // Bass
                    w3: 60,   // Lead Guitar
                    w4: 45,   // Rhythm Guitar
                    w5: 90,   // Lead Vocals
                    w6: 40,   // Backing Vocals
                    w7: 55,   // Piano
                    w8: 35,   // Strings
                    w9: 30,   // Synth
                    w10: 25,  // Percussion
                    bias: 100 // Master gain
                },
                controls: [
                    { id: 'w1', label: '🥁 Drums', min: 0, max: 100, step: 5, default: 50 },
                    { id: 'w2', label: '🎸 Bass', min: 0, max: 100, step: 5, default: 50 },
                    { id: 'w3', label: '🎸 Lead Guitar', min: 0, max: 100, step: 5, default: 50 },
                    { id: 'w4', label: '🎸 Rhythm Guitar', min: 0, max: 100, step: 5, default: 50 },
                    { id: 'w5', label: '🎤 Lead Vocals', min: 0, max: 100, step: 5, default: 50 },
                    { id: 'w6', label: '🎤 Backing Vocals', min: 0, max: 100, step: 5, default: 50 },
                    { id: 'w7', label: '🎹 Piano', min: 0, max: 100, step: 5, default: 50 },
                    { id: 'w8', label: '🎻 Strings', min: 0, max: 100, step: 5, default: 50 },
                    { id: 'w9', label: '🎛️ Synth', min: 0, max: 100, step: 5, default: 50 },
                    { id: 'w10', label: '🪘 Percussion', min: 0, max: 100, step: 5, default: 50 },
                    { id: 'bias', label: '🎚️ Master Gain', min: 0, max: 200, step: 5, default: 100 }
                ],
                validation: {
                    tolerance: 0.02,  // ±2% tolerance
                    customValidator: function(params, target) {
                        // Input levels for each instrument (representing track intensity)
                        const inputs = [3, 4, 5, 3, 8, 2, 4, 2, 2, 1]; // Different track intensities
                        
                        // Calculate the mix output
                        let mixOutput = params.bias; // Start with bias (master gain)
                        for (let i = 0; i < 10; i++) {
                            mixOutput += params[`w${i+1}`] * inputs[i];
                        }
                        
                        const targetOutput = 1280; // Target mix level for perfect sound
                        const tolerance = targetOutput * 0.02; // 2% tolerance
                        
                        const isCorrect = Math.abs(mixOutput - targetOutput) <= tolerance;
                        const accuracy = Math.max(0, 100 - Math.abs(mixOutput - targetOutput) / targetOutput * 100);
                        
                        let status = 'quiet';
                        if (mixOutput < targetOutput - tolerance) {
                            status = 'too-quiet';
                        } else if (mixOutput > targetOutput + tolerance) {
                            status = 'distorted';
                        } else {
                            status = 'perfect';
                        }
                        
                        return {
                            success: isCorrect,
                            accuracy: Math.round(accuracy),
                            status: status,
                            mixOutput: mixOutput,
                            targetOutput: targetOutput,
                            error: mixOutput - targetOutput
                        };
                    }
                },
                showFormula: false,
                debug: false
            });
            
            // Custom state for this level
            this.customLearningRate = 0.5;
            this.lastError = null;
            this.canUpdate = false;
            this.updateCount = 0;
            this.gradients = {};
        }
        
        async setup() {
            await super.setup();
            
            // CRITICAL: Initialize navigation
            if (typeof initializeNavigation === 'function') {
                initializeNavigation('music-studio-mixer', 'createMusicStudioMixer');
            }
            
            // Setup custom event handlers
            this._setupCustomHandlers();
        }
        
        _generateMainContent() {
            return `
                <div style="max-height: 80vh; display: grid; grid-template-columns: 1.2fr 1fr; gap: 20px; padding: 15px;">
                    <!-- Left Panel: Mixer Visualization -->
                    <div style="background: white; border-radius: 10px; padding: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); display: flex; flex-direction: column;">
                        <h4 style="margin: 0 0 10px 0; color: #333; text-align: center;">🎵 Studio Mixing Console</h4>
                        
                        <!-- Mixer Display -->
                        <div style="flex: 1; background: linear-gradient(to bottom, #2c3e50, #34495e); border-radius: 8px; padding: 15px;">
                            <!-- Channel Meters -->
                            <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin-bottom: 15px;">
                                ${[1,2,3,4,5,6,7,8,9,10].map(i => `
                                    <div style="background: #1a1a1a; border-radius: 4px; padding: 8px; text-align: center;">
                                        <div style="color: #888; font-size: 0.7rem; margin-bottom: 5px;">CH${i}</div>
                                        <div id="meter-${i}" style="width: 100%; height: 60px; background: linear-gradient(to top, #4CAF50, #8BC34A, #FFEB3B, #FF9800, #f44336); opacity: 0.3; border-radius: 2px; position: relative;">
                                            <div id="level-${i}" style="position: absolute; bottom: 0; width: 100%; background: rgba(0,0,0,0.7); transition: height 0.3s;"></div>
                                        </div>
                                        <div style="color: #aaa; font-size: 0.65rem; margin-top: 3px;">${['🥁','🎸','🎸','🎸','🎤','🎤','🎹','🎻','🎛️','🪘'][i-1]}</div>
                                    </div>
                                `).join('')}
                            </div>
                            
                            <!-- Master Output -->
                            <div style="background: #1a1a1a; border-radius: 8px; padding: 15px; text-align: center;">
                                <div style="color: #888; margin-bottom: 10px;">Master Output</div>
                                <div id="output-display" style="font-size: 2rem; color: #4CAF50; font-weight: bold; font-family: 'Courier New', monospace;">
                                    0
                                </div>
                                <div style="color: #666; font-size: 0.9rem; margin-top: 5px;">Target: 1,280 ± 25</div>
                                <div id="calculation-display" style="color: #555; font-size: 0.65rem; margin-top: 8px; font-family: 'Courier New', monospace; line-height: 1.3; display: none;">
                                    <!-- Will show calculation breakdown -->
                                </div>
                            </div>
                            
                            <!-- Status Display -->
                            <div id="mix-status" style="margin-top: 15px; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 8px; text-align: center; color: #aaa;">
                                <div>Press "Test Mix" to hear your mix!</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right Panel: Controls -->
                    <div style="background: white; border-radius: 10px; padding: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); display: flex; flex-direction: column;">
                        <h4 style="margin: 0 0 10px 0; color: #333; text-align: center;">Mix Controls</h4>
                        
                        <div style="flex: 1; display: flex; flex-direction: column; gap: 12px; overflow-y: auto; max-height: 60vh;">
                            <!-- Formula Display -->
                            <div style="background: #f8f9fa; border: 2px solid #667eea; border-radius: 8px; padding: 10px;">
                                <div style="font-family: 'Courier New', monospace; font-size: 0.75rem; color: #333; line-height: 1.4;">
                                    Mix = w1×3 + w2×4 + w3×5 + w4×3 + w5×8<br>
                                    + w6×2 + w7×4 + w8×2 + w9×2 + w10×1 + bias
                                </div>
                                <div style="font-size: 0.7rem; color: #666; margin-top: 8px; border-top: 1px solid #ddd; padding-top: 8px;">
                                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; text-align: left;">
                                        <div><span style="color: #999;">🥁 Drums:</span> w1=<span id="w1-val" style="color: #667eea; font-weight: bold;">50</span></div>
                                        <div><span style="color: #999;">🎸 Bass:</span> w2=<span id="w2-val" style="color: #667eea; font-weight: bold;">50</span></div>
                                        <div><span style="color: #999;">🎸 Lead:</span> w3=<span id="w3-val" style="color: #667eea; font-weight: bold;">50</span></div>
                                        <div><span style="color: #999;">🎸 Rhythm:</span> w4=<span id="w4-val" style="color: #667eea; font-weight: bold;">50</span></div>
                                        <div><span style="color: #999;">🎤 Lead Vox:</span> w5=<span id="w5-val" style="color: #667eea; font-weight: bold;">50</span></div>
                                        <div><span style="color: #999;">🎤 Backing:</span> w6=<span id="w6-val" style="color: #667eea; font-weight: bold;">50</span></div>
                                        <div><span style="color: #999;">🎹 Piano:</span> w7=<span id="w7-val" style="color: #667eea; font-weight: bold;">50</span></div>
                                        <div><span style="color: #999;">🎻 Strings:</span> w8=<span id="w8-val" style="color: #667eea; font-weight: bold;">50</span></div>
                                        <div><span style="color: #999;">🎛️ Synth:</span> w9=<span id="w9-val" style="color: #667eea; font-weight: bold;">50</span></div>
                                        <div><span style="color: #999;">🪘 Perc:</span> w10=<span id="w10-val" style="color: #667eea; font-weight: bold;">50</span></div>
                                        <div style="grid-column: span 2; text-align: center; margin-top: 4px;">
                                            <span style="color: #999;">🎚️ Master Gain:</span> bias=<span id="bias-val" style="color: #764ba2; font-weight: bold;">100</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Test Mix Button -->
                            <button id="test-mix-btn" style="
                                padding: 12px;
                                background: linear-gradient(135deg, #667eea, #764ba2);
                                color: white;
                                border: none;
                                border-radius: 8px;
                                font-size: 1rem;
                                font-weight: bold;
                                cursor: pointer;
                                transition: all 0.3s;
                            ">
                                🎧 Test Mix
                            </button>
                            
                            <!-- Error Display -->
                            <div id="error-display" style="
                                padding: 10px;
                                background: rgba(255,107,107,0.1);
                                border: 2px solid rgba(255,107,107,0.3);
                                border-radius: 8px;
                                text-align: center;
                                display: none;
                            ">
                                <div style="font-size: 0.85rem; color: #666;">Mix Error:</div>
                                <div id="error-value" style="font-size: 1.1rem; font-weight: bold; color: #ff6b6b;">0</div>
                            </div>
                            
                            <!-- Learning Rate Input -->
                            <div style="background: #f8f9fa; border-radius: 8px; padding: 12px;">
                                <div style="font-size: 0.85rem; color: #666; margin-bottom: 8px;">Learning Rate (α):</div>
                                <div style="display: flex; gap: 8px; align-items: center;">
                                    <input type="number" id="learning-rate-input" 
                                        value="0.5" 
                                        min="0.01" 
                                        max="2.0" 
                                        step="0.01"
                                        style="
                                            flex: 1;
                                            padding: 8px;
                                            border: 2px solid #ddd;
                                            border-radius: 5px;
                                            font-size: 0.95rem;
                                            text-align: center;
                                        ">
                                    <div style="font-size: 0.75rem; color: #999;">0.01 - 2.0</div>
                                </div>
                                <div style="font-size: 0.7rem; color: #888; margin-top: 5px; text-align: center;">
                                    Higher = faster but less stable
                                </div>
                            </div>
                            
                            <!-- Update Parameters Button -->
                            <button id="update-params-btn" style="
                                padding: 10px;
                                background: #6c757d;
                                color: white;
                                border: none;
                                border-radius: 8px;
                                font-size: 0.95rem;
                                font-weight: bold;
                                cursor: not-allowed;
                                opacity: 0.5;
                                transition: all 0.3s;
                            " disabled>
                                🔄 Apply Gradient Descent
                            </button>
                            
                            <!-- Update Count -->
                            <div style="text-align: center; color: #666; font-size: 0.85rem;">
                                Updates: <span id="update-count">0</span>
                            </div>
                            
                            <!-- Success Message -->
                            <div id="success-message" style="
                                padding: 12px;
                                background: rgba(45,213,115,0.1);
                                border: 2px solid rgba(45,213,115,0.3);
                                border-radius: 8px;
                                text-align: center;
                                display: none;
                            ">
                                <div style="color: #2dd573; font-weight: bold;">🎉 Perfect Mix Achieved!</div>
                                <div style="color: #666; font-size: 0.85rem; margin-top: 5px;">Studio quality sound!</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- CRITICAL: Standard navigation -->
                ${typeof createStandardNavigation === 'function' ? createStandardNavigation() : ''}
            `;
        }
        
        _setupCustomHandlers() {
            // Test Mix button handler
            const testMixBtn = document.getElementById('test-mix-btn');
            if (testMixBtn) {
                this.addEventListenerWithCleanup(testMixBtn, 'click', () => this._testMix());
                
                // Hover effects
                this.addEventListenerWithCleanup(testMixBtn, 'mouseenter', () => {
                    testMixBtn.style.transform = 'translateY(-2px)';
                    testMixBtn.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                });
                this.addEventListenerWithCleanup(testMixBtn, 'mouseleave', () => {
                    testMixBtn.style.transform = 'translateY(0)';
                    testMixBtn.style.boxShadow = 'none';
                });
            }
            
            // Learning rate input handler
            const lrInput = document.getElementById('learning-rate-input');
            if (lrInput) {
                this.addEventListenerWithCleanup(lrInput, 'input', (e) => {
                    this.customLearningRate = parseFloat(e.target.value) || 0.5;
                });
            }
            
            // Update Parameters button
            const updateBtn = document.getElementById('update-params-btn');
            if (updateBtn) {
                this.addEventListenerWithCleanup(updateBtn, 'click', () => this._updateParameters());
            }
            
            // Initial output update
            this._updateOutput();
        }
        
        _updateOutput() {
            const params = this.getParameters();
            const inputs = [3, 4, 5, 3, 8, 2, 4, 2, 2, 1];
            
            let output = params.bias;
            for (let i = 0; i < 10; i++) {
                output += params[`w${i+1}`] * inputs[i];
                
                // Update channel meter visualization
                const level = document.getElementById(`level-${i+1}`);
                if (level) {
                    const height = 100 - (params[`w${i+1}`] / 100 * 100);
                    level.style.height = `${height}%`;
                }
                
                // Update parameter value display
                const valDisplay = document.getElementById(`w${i+1}-val`);
                if (valDisplay) {
                    valDisplay.textContent = Math.round(params[`w${i+1}`]);
                }
            }
            
            // Update bias display
            const biasDisplay = document.getElementById('bias-val');
            if (biasDisplay) {
                biasDisplay.textContent = Math.round(params.bias);
            }
            
            document.getElementById('output-display').textContent = Math.round(output).toLocaleString();
            
            // Update color based on proximity to target
            const target = 1280;
            const error = Math.abs(output - target);
            const displayEl = document.getElementById('output-display');
            if (error < 25) {
                displayEl.style.color = '#4CAF50';
            } else if (error < 100) {
                displayEl.style.color = '#FFC107';
            } else {
                displayEl.style.color = '#f44336';
            }
        }
        
        _testMix() {
            const validation = this.validateParameters();
            const status = document.getElementById('mix-status');
            const errorDisplay = document.getElementById('error-display');
            const errorValue = document.getElementById('error-value');
            const calcDisplay = document.getElementById('calculation-display');
            
            // Calculate gradients for all parameters
            const params = this.getParameters();
            const inputs = [3, 4, 5, 3, 8, 2, 4, 2, 2, 1];
            
            // Show calculation breakdown
            if (calcDisplay) {
                const instruments = ['🥁', '🎸B', '🎸L', '🎸R', '🎤L', '🎤B', '🎹', '🎻', '🎛️', '🪘'];
                let calcHTML = '<div style="color: #777; margin-bottom: 4px;">Calculation:</div>';
                let runningTotal = 0;
                
                // Show first 5 on one line, next 5 on another
                for (let i = 0; i < 5; i++) {
                    const contribution = params[`w${i+1}`] * inputs[i];
                    runningTotal += contribution;
                    calcHTML += `${Math.round(params[`w${i+1}`])}×${inputs[i]}`;
                    if (i < 4) calcHTML += ' + ';
                }
                calcHTML += '<br>';
                
                for (let i = 5; i < 10; i++) {
                    const contribution = params[`w${i+1}`] * inputs[i];
                    runningTotal += contribution;
                    calcHTML += `+ ${Math.round(params[`w${i+1}`])}×${inputs[i]} `;
                }
                
                calcHTML += `+ ${Math.round(params.bias)}<br>`;
                calcHTML += `<span style="color: #888;">= ${Math.round(runningTotal + params.bias)}</span>`;
                
                calcDisplay.innerHTML = calcHTML;
                calcDisplay.style.display = 'block';
            }
            
            // Store error and gradients
            this.lastError = validation.error;
            this.canUpdate = true;
            
            // Simple gradient calculation (partial derivatives)
            this.gradients = {
                bias: 1 // Gradient of bias is always 1
            };
            for (let i = 0; i < 10; i++) {
                this.gradients[`w${i+1}`] = inputs[i];
            }
            
            // Show error display
            if (errorDisplay) {
                errorDisplay.style.display = 'block';
                errorValue.textContent = validation.error > 0 ? `+${Math.round(validation.error)}` : Math.round(validation.error);
                errorValue.style.color = validation.status === 'perfect' ? '#4CAF50' : '#ff6b6b';
            }
            
            // Enable update button
            const updateBtn = document.getElementById('update-params-btn');
            if (updateBtn && !validation.success) {
                updateBtn.disabled = false;
                updateBtn.style.cursor = 'pointer';
                updateBtn.style.opacity = '1';
                updateBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
            }
            
            // Update status
            if (validation.status === 'perfect') {
                status.innerHTML = `
                    <div style="color: #4CAF50; font-weight: bold; font-size: 1.1rem;">✨ Perfect Mix! ✨</div>
                    <div style="color: #aaa; font-size: 0.85rem;">Studio-quality balance achieved!</div>
                `;
                
                // Show success message
                const successMsg = document.getElementById('success-message');
                if (successMsg) {
                    successMsg.style.display = 'block';
                }
                
                // Complete level
                this.completeLevel({
                    score: 100,
                    solutions: this.getParameters(),
                    updates: this.updateCount
                });
                
            } else if (validation.status === 'distorted') {
                status.innerHTML = `
                    <div style="color: #ff6b6b; font-weight: bold;">⚠️ Mix Too Hot! Distortion!</div>
                    <div style="color: #aaa; font-size: 0.85rem;">Output: ${Math.round(validation.mixOutput)} (Target: ${validation.targetOutput}±25)</div>
                `;
            } else {
                status.innerHTML = `
                    <div style="color: #FFC107; font-weight: bold;">🔊 Mix Too Quiet!</div>
                    <div style="color: #aaa; font-size: 0.85rem;">Output: ${Math.round(validation.mixOutput)} (Target: ${validation.targetOutput}±25)</div>
                `;
            }
        }
        
        _updateParameters() {
            if (!this.canUpdate || this.lastError === null) return;
            
            const params = this.getParameters();
            const lr = this.customLearningRate;
            
            // Apply gradient descent: new_param = old_param - learning_rate * gradient * error
            const newParams = {};
            
            // Update bias
            newParams.bias = params.bias - lr * this.gradients.bias * this.lastError * 0.1;
            newParams.bias = Math.max(0, Math.min(200, newParams.bias));
            
            // Update weights
            for (let i = 1; i <= 10; i++) {
                const key = `w${i}`;
                newParams[key] = params[key] - lr * this.gradients[key] * this.lastError * 0.1;
                newParams[key] = Math.max(0, Math.min(100, newParams[key]));
            }
            
            // Apply the updates
            this.updateParameters(newParams);
            
            // Update displays
            this._updateOutput();
            
            // Update count
            this.updateCount++;
            document.getElementById('update-count').textContent = this.updateCount;
            
            // Disable update button until next test
            this.canUpdate = false;
            const updateBtn = document.getElementById('update-params-btn');
            if (updateBtn) {
                updateBtn.disabled = true;
                updateBtn.style.cursor = 'not-allowed';
                updateBtn.style.opacity = '0.5';
                updateBtn.style.background = '#6c757d';
            }
            
            // Clear the error display
            const errorDisplay = document.getElementById('error-display');
            if (errorDisplay) {
                errorDisplay.style.display = 'none';
            }
            
            // Hide calculation display until next test
            const calcDisplay = document.getElementById('calculation-display');
            if (calcDisplay) {
                calcDisplay.style.display = 'none';
            }
            
            // Track update
            this.trackAction('parameter_update', { 
                learningRate: lr,
                updateCount: this.updateCount,
                error: this.lastError
            });
        }
    }
    
    // Add animation CSS if not present
    if (!document.getElementById('mixer-style')) {
        const style = document.createElement('style');
        style.id = 'mixer-style';
        style.textContent = `
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            
            #test-mix-btn:active {
                transform: scale(0.98) !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    const level = new MusicStudioMixerLevel();
    level.create().catch(error => {
        console.error('Failed to create Music Studio Mixer:', error);
    });
    
    return level;
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.createMusicStudioMixer;
}