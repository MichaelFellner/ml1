/**
 * Music Studio Mixer Challenge
 * 
 * Interactive level teaching gradient descent with 3 parameters and a bias term through audio mixing
 * 
 * This level demonstrates multi-parameter gradient descent with 1/2 MSE loss:
 * - Loss = 1/2 × (output - target)²
 * - Output = w1×5 + w2×4 + w3×6 + bias
 * - Gradients: ∂L/∂wi = (output - target) × input_i
 * - Update rule: wi_new = wi - learning_rate × gradient
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
                    w2: 70,   // Guitar
                    w3: 90,   // Vocals
                    bias: 100 // Master gain
                },
                controls: [
                    { id: 'w1', label: '🥁 Drums', min: 0, max: 150, step: 5, default: 50 },
                    { id: 'w2', label: '🎸 Guitar', min: 0, max: 150, step: 5, default: 50 },
                    { id: 'w3', label: '🎤 Vocals', min: 0, max: 150, step: 5, default: 50 },
                    { id: 'bias', label: '🎚️ Master', min: 0, max: 200, step: 5, default: 100 }
                ],
                validation: {
                    tolerance: 0.02,  // ±2% tolerance
                    customValidator: function(params, target) {
                        // Input levels for each instrument (representing track intensity)
                        const inputs = [5, 4, 6]; // Track intensities for drums, guitar, vocals
                        
                        // Calculate the mix output
                        let mixOutput = params.bias; // Start with bias (master gain)
                        mixOutput += params.w1 * inputs[0]; // Drums
                        mixOutput += params.w2 * inputs[1]; // Guitar
                        mixOutput += params.w3 * inputs[2]; // Vocals
                        
                        const targetOutput = 1200; // Target mix level for perfect sound
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
            this.customLearningRate = 0.0001;  // Smaller learning rate for proper gradients
            this.lastError = null;
            this.canUpdate = false;
            this.updateCount = 0;
            this.gradients = {};
            this.inputs = [5, 4, 6, 1]; // Input coefficients for drums, guitar, vocals, bias
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
                <div style="max-height: 80vh; padding: 15px;">
                    <!-- Level Introduction Box -->
                    <div style="background: rgba(138,43,226,0.08); border: 2px solid rgba(138,43,226,0.2); border-radius: 8px; padding: 15px; margin-bottom: 20px; max-width: 1200px; margin: 0 auto 20px;">
                        <div style="color: #333; font-size: 0.95rem; line-height: 1.6;">
                            <strong style="color: #8a2be2; font-size: 1.1rem;">🎵 Mix the Perfect Track!</strong><br>
                            Balance drums, guitar, and vocals with a master gain to create the perfect mix. The formula: 
                            <code style="background: rgba(0,0,0,0.05); padding: 2px 6px; border-radius: 3px; font-family: 'Courier New', monospace;">Mix = w1×5 + w2×4 + w3×6 + bias</code>. 
                            Using gradient descent with 1/2 MSE loss, each gradient is calculated as <code style="background: rgba(0,0,0,0.05); padding: 2px 6px; border-radius: 3px; font-family: 'Courier New', monospace;">∂L/∂w = (output - target) × input</code>. 
                            Press "Play Music" to test your mix, then use gradient descent to find the perfect balance!
                        </div>
                    </div>
                    
                    <!-- Main Studio Container -->
                    <div style="background: linear-gradient(to bottom, #2c3e50, #34495e); border-radius: 10px; padding: 25px; box-shadow: 0 2px 12px rgba(0,0,0,0.15); max-width: 1000px; margin: 0 auto; position: relative; overflow: visible;">
                        
                        <!-- Mixing Board Style Layout -->
                        <div style="display: flex; justify-content: space-around; align-items: flex-end; margin-bottom: 30px; padding: 20px; background: rgba(0,0,0,0.2); border-radius: 10px; min-height: 400px; position: relative;">
                            
                            <!-- Mix Output Display (Top Center) -->
                            <div id="sound-level-display" style="
                                position: absolute;
                                left: 50%;
                                top: -50px;
                                transform: translateX(-50%);
                                width: 200px;
                                height: 60px;
                                background: rgba(0,0,0,0.9);
                                border: 3px solid #8a2be2;
                                border-radius: 8px;
                                display: none;
                                align-items: center;
                                justify-content: center;
                                animation: soundAppear 0.5s ease;
                                z-index: 5;
                                box-shadow: 0 0 20px rgba(138,43,226,0.3);
                            ">
                                <div style="text-align: center;">
                                    <div style="color: #fff; font-size: 0.75rem;">Mix Output: <span id="mix-output-value" style="
                                        font-size: 1.4rem;
                                        font-weight: bold;
                                        color: #8a2be2;
                                        text-shadow: 0 0 10px rgba(138,43,226,0.5);
                                    ">0</span></div>
                                    <div style="color: #aaa; font-size: 0.65rem;">Target: 1200 ± 24</div>
                                </div>
                            </div>
                            
                            <!-- Drums Channel -->
                            <div style="display: flex; flex-direction: column; align-items: center; width: 180px; position: relative;">
                                <!-- Update Indicator (Top) -->
                                <div id="drums-update-indicator" style="
                                    opacity: 0;
                                    transition: opacity 0.5s ease;
                                    position: absolute;
                                    top: -80px;
                                    width: 160px;
                                    z-index: 10;
                                ">
                                    <div style="
                                        background: rgba(255,255,255,0.95);
                                        border: 1px solid #ff6b6b;
                                        border-radius: 4px;
                                        padding: 6px 8px;
                                        font-family: 'Courier New', monospace;
                                        font-size: 0.65rem;
                                        color: #666;
                                        text-align: left;
                                        line-height: 1.4;
                                        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                                    ">
                                        <div id="drums-update-calc"></div>
                                    </div>
                                </div>
                                
                                <!-- Volume Fader Container -->
                                <div style="
                                    width: 60px;
                                    height: 250px;
                                    background: linear-gradient(to top, #111, #333);
                                    border: 2px solid #444;
                                    border-radius: 8px;
                                    position: relative;
                                    margin-bottom: 10px;
                                    box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
                                ">
                                    <!-- Fader Track -->
                                    <div style="
                                        position: absolute;
                                        left: 50%;
                                        top: 10px;
                                        bottom: 10px;
                                        width: 4px;
                                        background: rgba(255,255,255,0.1);
                                        transform: translateX(-50%);
                                    "></div>
                                    
                                    <!-- Volume Level Bar -->
                                    <div id="drums-level-bar" style="
                                        position: absolute;
                                        bottom: 0;
                                        left: 0;
                                        right: 0;
                                        background: linear-gradient(to top, #ff6b6b, #ff9999);
                                        border-radius: 0 0 6px 6px;
                                        transition: height 0.3s ease;
                                        opacity: 0.8;
                                    "></div>
                                    
                                    <!-- Fader Knob -->
                                    <div id="drums-fader-knob" style="
                                        position: absolute;
                                        left: 50%;
                                        transform: translateX(-50%);
                                        width: 50px;
                                        height: 20px;
                                        background: linear-gradient(to bottom, #666, #333);
                                        border: 2px solid #ff6b6b;
                                        border-radius: 4px;
                                        cursor: ns-resize;
                                        transition: bottom 0.3s ease;
                                        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
                                    "></div>
                                </div>
                                
                                <!-- Channel Info -->
                                <div style="text-align: center; color: #fff;">
                                    <div style="font-size: 1.5rem;">🥁</div>
                                    <div style="font-size: 0.85rem; margin-top: 5px;">Drums</div>
                                    <div style="font-size: 1.1rem; font-weight: bold; margin-top: 5px; color: #ff6b6b;">
                                        w1 = <span id="w1-display">50</span>
                                    </div>
                                    <div style="font-size: 0.7rem; color: #999; margin-top: 2px;">Input: ×5</div>
                                </div>
                                
                                <!-- Update Arrow (Bottom) -->
                                <div id="drums-update-display" style="
                                    display: flex;
                                    flex-direction: column;
                                    align-items: center;
                                    opacity: 0;
                                    transition: opacity 0.5s ease;
                                    position: absolute;
                                    bottom: -40px;
                                ">
                                    <div id="drums-update-arrow" style="font-size: 1.5rem; line-height: 1;"></div>
                                    <div style="display: flex; flex-direction: column; align-items: center;">
                                        <span id="drums-update-result" style="color: #ff6b6b; font-weight: bold; font-size: 0.7rem;"></span>
                                        <span id="drums-new-value" style="color: #fff; font-weight: bold; font-size: 0.85rem;"></span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Guitar Channel -->
                            <div style="display: flex; flex-direction: column; align-items: center; width: 180px; position: relative;">
                                <!-- Update Indicator (Top) -->
                                <div id="guitar-update-indicator" style="
                                    opacity: 0;
                                    transition: opacity 0.5s ease;
                                    position: absolute;
                                    top: -80px;
                                    width: 160px;
                                    z-index: 10;
                                ">
                                    <div style="
                                        background: rgba(255,255,255,0.95);
                                        border: 1px solid #4CAF50;
                                        border-radius: 4px;
                                        padding: 6px 8px;
                                        font-family: 'Courier New', monospace;
                                        font-size: 0.65rem;
                                        color: #666;
                                        text-align: left;
                                        line-height: 1.4;
                                        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                                    ">
                                        <div id="guitar-update-calc"></div>
                                    </div>
                                </div>
                                
                                <!-- Volume Fader Container -->
                                <div style="
                                    width: 60px;
                                    height: 250px;
                                    background: linear-gradient(to top, #111, #333);
                                    border: 2px solid #444;
                                    border-radius: 8px;
                                    position: relative;
                                    margin-bottom: 10px;
                                    box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
                                ">
                                    <!-- Fader Track -->
                                    <div style="
                                        position: absolute;
                                        left: 50%;
                                        top: 10px;
                                        bottom: 10px;
                                        width: 4px;
                                        background: rgba(255,255,255,0.1);
                                        transform: translateX(-50%);
                                    "></div>
                                    
                                    <!-- Volume Level Bar -->
                                    <div id="guitar-level-bar" style="
                                        position: absolute;
                                        bottom: 0;
                                        left: 0;
                                        right: 0;
                                        background: linear-gradient(to top, #4CAF50, #81C784);
                                        border-radius: 0 0 6px 6px;
                                        transition: height 0.3s ease;
                                        opacity: 0.8;
                                    "></div>
                                    
                                    <!-- Fader Knob -->
                                    <div id="guitar-fader-knob" style="
                                        position: absolute;
                                        left: 50%;
                                        transform: translateX(-50%);
                                        width: 50px;
                                        height: 20px;
                                        background: linear-gradient(to bottom, #666, #333);
                                        border: 2px solid #4CAF50;
                                        border-radius: 4px;
                                        cursor: ns-resize;
                                        transition: bottom 0.3s ease;
                                        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
                                    "></div>
                                </div>
                                
                                <!-- Channel Info -->
                                <div style="text-align: center; color: #fff;">
                                    <div style="font-size: 1.5rem;">🎸</div>
                                    <div style="font-size: 0.85rem; margin-top: 5px;">Guitar</div>
                                    <div style="font-size: 1.1rem; font-weight: bold; margin-top: 5px; color: #4CAF50;">
                                        w2 = <span id="w2-display">50</span>
                                    </div>
                                    <div style="font-size: 0.7rem; color: #999; margin-top: 2px;">Input: ×4</div>
                                </div>
                                
                                <!-- Update Arrow (Bottom) -->
                                <div id="guitar-update-display" style="
                                    display: flex;
                                    flex-direction: column;
                                    align-items: center;
                                    opacity: 0;
                                    transition: opacity 0.5s ease;
                                    position: absolute;
                                    bottom: -40px;
                                ">
                                    <div id="guitar-update-arrow" style="font-size: 1.5rem; line-height: 1;"></div>
                                    <div style="display: flex; flex-direction: column; align-items: center;">
                                        <span id="guitar-update-result" style="color: #4CAF50; font-weight: bold; font-size: 0.7rem;"></span>
                                        <span id="guitar-new-value" style="color: #fff; font-weight: bold; font-size: 0.85rem;"></span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Vocals Channel -->
                            <div style="display: flex; flex-direction: column; align-items: center; width: 180px; position: relative;">
                                <!-- Update Indicator (Top) -->
                                <div id="vocals-update-indicator" style="
                                    opacity: 0;
                                    transition: opacity 0.5s ease;
                                    position: absolute;
                                    top: -80px;
                                    width: 160px;
                                    z-index: 10;
                                ">
                                    <div style="
                                        background: rgba(255,255,255,0.95);
                                        border: 1px solid #2196F3;
                                        border-radius: 4px;
                                        padding: 6px 8px;
                                        font-family: 'Courier New', monospace;
                                        font-size: 0.65rem;
                                        color: #666;
                                        text-align: left;
                                        line-height: 1.4;
                                        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                                    ">
                                        <div id="vocals-update-calc"></div>
                                    </div>
                                </div>
                                
                                <!-- Volume Fader Container -->
                                <div style="
                                    width: 60px;
                                    height: 250px;
                                    background: linear-gradient(to top, #111, #333);
                                    border: 2px solid #444;
                                    border-radius: 8px;
                                    position: relative;
                                    margin-bottom: 10px;
                                    box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
                                ">
                                    <!-- Fader Track -->
                                    <div style="
                                        position: absolute;
                                        left: 50%;
                                        top: 10px;
                                        bottom: 10px;
                                        width: 4px;
                                        background: rgba(255,255,255,0.1);
                                        transform: translateX(-50%);
                                    "></div>
                                    
                                    <!-- Volume Level Bar -->
                                    <div id="vocals-level-bar" style="
                                        position: absolute;
                                        bottom: 0;
                                        left: 0;
                                        right: 0;
                                        background: linear-gradient(to top, #2196F3, #64B5F6);
                                        border-radius: 0 0 6px 6px;
                                        transition: height 0.3s ease;
                                        opacity: 0.8;
                                    "></div>
                                    
                                    <!-- Fader Knob -->
                                    <div id="vocals-fader-knob" style="
                                        position: absolute;
                                        left: 50%;
                                        transform: translateX(-50%);
                                        width: 50px;
                                        height: 20px;
                                        background: linear-gradient(to bottom, #666, #333);
                                        border: 2px solid #2196F3;
                                        border-radius: 4px;
                                        cursor: ns-resize;
                                        transition: bottom 0.3s ease;
                                        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
                                    "></div>
                                </div>
                                
                                <!-- Channel Info -->
                                <div style="text-align: center; color: #fff;">
                                    <div style="font-size: 1.5rem;">🎤</div>
                                    <div style="font-size: 0.85rem; margin-top: 5px;">Vocals</div>
                                    <div style="font-size: 1.1rem; font-weight: bold; margin-top: 5px; color: #2196F3;">
                                        w3 = <span id="w3-display">50</span>
                                    </div>
                                    <div style="font-size: 0.7rem; color: #999; margin-top: 2px;">Input: ×6</div>
                                </div>
                                
                                <!-- Update Arrow (Bottom) -->
                                <div id="vocals-update-display" style="
                                    display: flex;
                                    flex-direction: column;
                                    align-items: center;
                                    opacity: 0;
                                    transition: opacity 0.5s ease;
                                    position: absolute;
                                    bottom: -40px;
                                ">
                                    <div id="vocals-update-arrow" style="font-size: 1.5rem; line-height: 1;"></div>
                                    <div style="display: flex; flex-direction: column; align-items: center;">
                                        <span id="vocals-update-result" style="color: #2196F3; font-weight: bold; font-size: 0.7rem;"></span>
                                        <span id="vocals-new-value" style="color: #fff; font-weight: bold; font-size: 0.85rem;"></span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Master Channel -->
                            <div style="display: flex; flex-direction: column; align-items: center; width: 180px; position: relative;">
                                <!-- Update Indicator (Top) -->
                                <div id="master-update-indicator" style="
                                    opacity: 0;
                                    transition: opacity 0.5s ease;
                                    position: absolute;
                                    top: -80px;
                                    width: 160px;
                                    z-index: 10;
                                ">
                                    <div style="
                                        background: rgba(255,255,255,0.95);
                                        border: 1px solid #9C27B0;
                                        border-radius: 4px;
                                        padding: 6px 8px;
                                        font-family: 'Courier New', monospace;
                                        font-size: 0.65rem;
                                        color: #666;
                                        text-align: left;
                                        line-height: 1.4;
                                        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                                    ">
                                        <div id="master-update-calc"></div>
                                    </div>
                                </div>
                                
                                <!-- Volume Fader Container -->
                                <div style="
                                    width: 60px;
                                    height: 250px;
                                    background: linear-gradient(to top, #111, #333);
                                    border: 2px solid #444;
                                    border-radius: 8px;
                                    position: relative;
                                    margin-bottom: 10px;
                                    box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
                                ">
                                    <!-- Fader Track -->
                                    <div style="
                                        position: absolute;
                                        left: 50%;
                                        top: 10px;
                                        bottom: 10px;
                                        width: 4px;
                                        background: rgba(255,255,255,0.1);
                                        transform: translateX(-50%);
                                    "></div>
                                    
                                    <!-- Volume Level Bar -->
                                    <div id="master-level-bar" style="
                                        position: absolute;
                                        bottom: 0;
                                        left: 0;
                                        right: 0;
                                        background: linear-gradient(to top, #9C27B0, #BA68C8);
                                        border-radius: 0 0 6px 6px;
                                        transition: height 0.3s ease;
                                        opacity: 0.8;
                                    "></div>
                                    
                                    <!-- Fader Knob -->
                                    <div id="master-fader-knob" style="
                                        position: absolute;
                                        left: 50%;
                                        transform: translateX(-50%);
                                        width: 50px;
                                        height: 20px;
                                        background: linear-gradient(to bottom, #666, #333);
                                        border: 2px solid #9C27B0;
                                        border-radius: 4px;
                                        cursor: ns-resize;
                                        transition: bottom 0.3s ease;
                                        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
                                    "></div>
                                </div>
                                
                                <!-- Channel Info -->
                                <div style="text-align: center; color: #fff;">
                                    <div style="font-size: 1.5rem;">🎚️</div>
                                    <div style="font-size: 0.85rem; margin-top: 5px;">Master</div>
                                    <div style="font-size: 1.1rem; font-weight: bold; margin-top: 5px; color: #9C27B0;">
                                        bias = <span id="bias-display">100</span>
                                    </div>
                                    <div style="font-size: 0.7rem; color: #999; margin-top: 2px;">Input: ×1</div>
                                </div>
                                
                                <!-- Update Arrow (Bottom) -->
                                <div id="master-update-display" style="
                                    display: flex;
                                    flex-direction: column;
                                    align-items: center;
                                    opacity: 0;
                                    transition: opacity 0.5s ease;
                                    position: absolute;
                                    bottom: -40px;
                                ">
                                    <div id="master-update-arrow" style="font-size: 1.5rem; line-height: 1;"></div>
                                    <div style="display: flex; flex-direction: column; align-items: center;">
                                        <span id="master-update-result" style="color: #9C27B0; font-weight: bold; font-size: 0.7rem;"></span>
                                        <span id="master-new-value" style="color: #fff; font-weight: bold; font-size: 0.85rem;"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Status Bar -->
                        <div id="mix-status" style="margin-bottom: 15px; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.1); text-align: center; color: #fff;">
                            <div>🎧 Press "Play Music" to test your mix!</div>
                        </div>
                        
                        <!-- Control Buttons -->
                        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px;">
                            <!-- Play Music Button -->
                            <button id="play-music-btn" style="
                                padding: 15px;
                                background: linear-gradient(135deg, #8a2be2, #6a1b9a);
                                color: white;
                                border: none;
                                border-radius: 8px;
                                font-size: 1.1rem;
                                font-weight: bold;
                                cursor: pointer;
                                transition: all 0.3s;
                            ">
                                🎵 Play Music
                            </button>
                            
                            <!-- Update Parameters Button -->
                            <button id="update-params-btn" style="
                                padding: 15px;
                                background: #6c757d;
                                color: white;
                                border: none;
                                border-radius: 8px;
                                font-size: 1.1rem;
                                font-weight: bold;
                                cursor: not-allowed;
                                opacity: 0.5;
                                transition: all 0.3s;
                            " disabled>
                                🔄 Update Mix
                            </button>
                            
                            <!-- Reset Button -->
                            <button id="reset-btn" style="
                                padding: 15px;
                                background: linear-gradient(135deg, #6c757d, #5a6268);
                                color: white;
                                border: none;
                                border-radius: 8px;
                                font-size: 1.1rem;
                                font-weight: bold;
                                cursor: pointer;
                                transition: all 0.3s;
                            ">
                                ↺ Reset
                            </button>
                        </div>
                        
                        <!-- Learning Rate Control -->
                        <div style="margin-top: 15px; background: rgba(255,255,255,0.1); border-radius: 8px; padding: 10px; display: flex; align-items: center; justify-content: center; gap: 15px;">
                            <span style="color: #fff; font-size: 0.9rem;">Learning Rate:</span>
                            <input type="number" id="learning-rate-input" 
                                value="0.0001" 
                                min="0.00001" 
                                max="0.01" 
                                step="0.00001"
                                style="
                                    width: 80px;
                                    padding: 5px;
                                    border: 2px solid #8a2be2;
                                    border-radius: 4px;
                                    background: rgba(255,255,255,0.9);
                                    text-align: center;
                                    font-weight: bold;
                                ">
                            <span style="color: #aaa; font-size: 0.8rem;">(0.00001 - 0.01)</span>
                        </div>
                    </div>
                </div>
                
                <!-- CRITICAL: Standard navigation -->
                ${typeof createStandardNavigation === 'function' ? createStandardNavigation() : ''}
            `;
        }
        
        _setupCustomHandlers() {
            // Play Music button handler
            const playBtn = document.getElementById('play-music-btn');
            if (playBtn) {
                this.addEventListenerWithCleanup(playBtn, 'click', () => this._playMusic());
                
                // Hover effects
                this.addEventListenerWithCleanup(playBtn, 'mouseenter', () => {
                    playBtn.style.transform = 'translateY(-2px)';
                    playBtn.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                });
                this.addEventListenerWithCleanup(playBtn, 'mouseleave', () => {
                    playBtn.style.transform = 'translateY(0)';
                    playBtn.style.boxShadow = 'none';
                });
            }
            
            // Learning rate input handler
            const lrInput = document.getElementById('learning-rate-input');
            if (lrInput) {
                this.addEventListenerWithCleanup(lrInput, 'input', (e) => {
                    this.customLearningRate = parseFloat(e.target.value) || 0.0001;
                });
            }
            
            // Update Parameters button
            const updateBtn = document.getElementById('update-params-btn');
            if (updateBtn) {
                this.addEventListenerWithCleanup(updateBtn, 'click', () => this._updateParameters());
                
                // Hover effects when enabled
                this.addEventListenerWithCleanup(updateBtn, 'mouseenter', () => {
                    if (!updateBtn.disabled) {
                        updateBtn.style.transform = 'translateY(-2px)';
                        updateBtn.style.boxShadow = '0 4px 8px rgba(40,167,69,0.3)';
                    }
                });
                this.addEventListenerWithCleanup(updateBtn, 'mouseleave', () => {
                    updateBtn.style.transform = 'translateY(0)';
                    updateBtn.style.boxShadow = 'none';
                });
            }
            
            // Reset button
            const resetBtn = document.getElementById('reset-btn');
            if (resetBtn) {
                this.addEventListenerWithCleanup(resetBtn, 'click', () => this._resetLevel());
                
                // Hover effects
                this.addEventListenerWithCleanup(resetBtn, 'mouseenter', () => {
                    resetBtn.style.transform = 'translateY(-2px)';
                    resetBtn.style.boxShadow = '0 4px 8px rgba(108,117,125,0.3)';
                });
                this.addEventListenerWithCleanup(resetBtn, 'mouseleave', () => {
                    resetBtn.style.transform = 'translateY(0)';
                    resetBtn.style.boxShadow = 'none';
                });
            }
            
            // Override slider handlers to update visual faders
            ['w1', 'w2', 'w3', 'bias'].forEach(param => {
                const slider = document.getElementById(`${param}-slider`);
                if (slider) {
                    this.addEventListenerWithCleanup(slider, 'input', () => {
                        this._updateDisplays();
                    });
                }
            });
            
            // Update initial displays
            this._updateDisplays();
        }
        
        _updateDisplays() {
            const params = this.getParameters();
            document.getElementById('w1-display').textContent = Math.round(params.w1);
            document.getElementById('w2-display').textContent = Math.round(params.w2);
            document.getElementById('w3-display').textContent = Math.round(params.w3);
            document.getElementById('bias-display').textContent = Math.round(params.bias);
            
            // Update visual faders
            this._updateFaderVisuals();
        }
        
        _updateFaderVisuals() {
            const params = this.getParameters();
            
            // Update drums fader (w1: 0-150)
            const drumsHeight = (params.w1 / 150) * 100;
            const drumsKnobBottom = 10 + (params.w1 / 150) * 220; // 10px to 230px
            const drumsBar = document.getElementById('drums-level-bar');
            const drumsKnob = document.getElementById('drums-fader-knob');
            if (drumsBar) drumsBar.style.height = `${drumsHeight}%`;
            if (drumsKnob) drumsKnob.style.bottom = `${drumsKnobBottom}px`;
            
            // Update guitar fader (w2: 0-150)
            const guitarHeight = (params.w2 / 150) * 100;
            const guitarKnobBottom = 10 + (params.w2 / 150) * 220;
            const guitarBar = document.getElementById('guitar-level-bar');
            const guitarKnob = document.getElementById('guitar-fader-knob');
            if (guitarBar) guitarBar.style.height = `${guitarHeight}%`;
            if (guitarKnob) guitarKnob.style.bottom = `${guitarKnobBottom}px`;
            
            // Update vocals fader (w3: 0-150)
            const vocalsHeight = (params.w3 / 150) * 100;
            const vocalsKnobBottom = 10 + (params.w3 / 150) * 220;
            const vocalsBar = document.getElementById('vocals-level-bar');
            const vocalsKnob = document.getElementById('vocals-fader-knob');
            if (vocalsBar) vocalsBar.style.height = `${vocalsHeight}%`;
            if (vocalsKnob) vocalsKnob.style.bottom = `${vocalsKnobBottom}px`;
            
            // Update master fader (bias: 0-200)
            const masterHeight = (params.bias / 200) * 100;
            const masterKnobBottom = 10 + (params.bias / 200) * 220;
            const masterBar = document.getElementById('master-level-bar');
            const masterKnob = document.getElementById('master-fader-knob');
            if (masterBar) masterBar.style.height = `${masterHeight}%`;
            if (masterKnob) masterKnob.style.bottom = `${masterKnobBottom}px`;
        }
        
        _playMusic() {
            const validation = this.validateParameters();
            const status = document.getElementById('mix-status');
            const soundDisplay = document.getElementById('sound-level-display');
            const mixValue = document.getElementById('mix-output-value');
            
            // Show sound level in center
            if (soundDisplay && mixValue) {
                soundDisplay.style.display = 'flex';
                mixValue.textContent = Math.round(validation.mixOutput).toLocaleString();
                
                // Color based on accuracy
                if (validation.status === 'perfect') {
                    mixValue.style.color = '#4CAF50';
                    mixValue.style.textShadow = '0 0 10px rgba(76,175,80,0.5)';
                } else if (validation.status === 'distorted') {
                    mixValue.style.color = '#ff6b6b';
                    mixValue.style.textShadow = '0 0 10px rgba(255,107,107,0.5)';
                } else {
                    mixValue.style.color = '#FFC107';
                    mixValue.style.textShadow = '0 0 10px rgba(255,193,7,0.5)';
                }
            }
            
            // Store error and gradients
            this.lastError = validation.error;
            this.canUpdate = true;
            
            // Calculate gradients for 1/2 MSE loss
            // Gradient = (output - target) × input_coefficient
            this.gradients = {
                w1: validation.error * 5,    // Drums gradient
                w2: validation.error * 4,    // Guitar gradient
                w3: validation.error * 6,    // Vocals gradient
                bias: validation.error * 1   // Master gradient
            };
            
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
                `;
                
                // Complete level
                this.completeLevel({
                    score: 100,
                    solutions: this.getParameters(),
                    updates: this.updateCount
                });
                
            } else if (validation.status === 'distorted') {
                status.innerHTML = `
                    <div style="color: #ff6b6b; font-weight: bold;">⚠️ Mix Too Hot!</div>
                `;
            } else {
                status.innerHTML = `
                    <div style="color: #FFC107; font-weight: bold;">🔊 Mix Too Quiet!</div>
                `;
            }
        }
        
        _updateParameters() {
            if (!this.canUpdate || this.lastError === null) return;
            
            const params = this.getParameters();
            const lr = this.customLearningRate;
            
            // Apply gradient descent with proper 1/2 MSE gradients
            // new_w = w - learning_rate × gradient
            // where gradient = (output - target) × input_coefficient
            
            // Calculate new values
            const newParams = {
                w1: params.w1 - lr * this.gradients.w1,
                w2: params.w2 - lr * this.gradients.w2,
                w3: params.w3 - lr * this.gradients.w3,
                bias: params.bias - lr * this.gradients.bias
            };
            
            // Clamp values
            newParams.w1 = Math.max(0, Math.min(150, newParams.w1));
            newParams.w2 = Math.max(0, Math.min(150, newParams.w2));
            newParams.w3 = Math.max(0, Math.min(150, newParams.w3));
            newParams.bias = Math.max(0, Math.min(200, newParams.bias));
            
            // Show update indicators
            this._showUpdateIndicators(params, newParams, lr);
            
            // Apply the updates
            this.updateParameters(newParams);
            
            // Update displays
            this._updateDisplays();
            
            // Hide sound level
            const soundDisplay = document.getElementById('sound-level-display');
            if (soundDisplay) {
                soundDisplay.style.display = 'none';
            }
            
            // Update count
            this.updateCount++;
            
            // Disable update button until next test
            this.canUpdate = false;
            const updateBtn = document.getElementById('update-params-btn');
            if (updateBtn) {
                updateBtn.disabled = true;
                updateBtn.style.cursor = 'not-allowed';
                updateBtn.style.opacity = '0.5';
                updateBtn.style.background = '#6c757d';
            }
            
            // Track update
            this.trackAction('parameter_update', { 
                learningRate: lr,
                updateCount: this.updateCount,
                error: this.lastError
            });
        }
        
        _showUpdateIndicators(oldParams, newParams, lr) {
            // Show update indicator for each parameter
            const params = ['w1', 'w2', 'w3', 'bias'];
            const names = ['drums', 'guitar', 'vocals', 'master'];
            const inputCoeffs = [5, 4, 6, 1]; // Input coefficients for each parameter
            
            params.forEach((param, index) => {
                const name = names[index];
                const inputCoeff = inputCoeffs[index];
                const indicator = document.getElementById(`${name}-update-indicator`);
                const calc = document.getElementById(`${name}-update-calc`);
                const result = document.getElementById(`${name}-update-result`);
                const arrow = document.getElementById(`${name}-update-arrow`);
                const newValue = document.getElementById(`${name}-new-value`);
                const display = document.getElementById(`${name}-update-display`);
                
                if (indicator && calc) {
                    // Show gradient calculation: (output - target) × input_coefficient
                    const gradient = this.gradients[param];
                    calc.innerHTML = `
                        <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                            <span style="color: #999;">Error:</span>
                            <span style="color: #333; font-weight: bold;">${this.lastError.toFixed(0)}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                            <span style="color: #999;">× Input:</span>
                            <span style="color: #333; font-weight: bold;">${inputCoeff}</span>
                        </div>
                        <div style="border-top: 1px solid #ddd; padding-top: 2px; display: flex; justify-content: space-between;">
                            <span style="color: #667eea; font-weight: bold;">∂L/∂${param}:</span>
                            <span style="color: #667eea; font-weight: bold;">${gradient.toFixed(0)}</span>
                        </div>
                    `;
                    
                    // Show indicator
                    indicator.style.opacity = '1';
                }
                
                if (display && result && arrow && newValue) {
                    // Calculate step size
                    const stepSize = lr * this.gradients[param];
                    const signSymbol = stepSize < 0 ? '-' : '+';
                    result.textContent = `${signSymbol}${Math.abs(stepSize).toFixed(1)}`;
                    
                    // Show new value
                    newValue.textContent = Math.round(newParams[param]);
                    
                    // Show and position arrow based on step direction
                    const isDecreasing = stepSize < 0;
                    arrow.textContent = isDecreasing ? '↓' : '↑';
                    arrow.style.color = isDecreasing ? '#dc3545' : '#28a745';
                    
                    // Show display
                    display.style.opacity = '1';
                }
            });
        }
        
        _resetLevel() {
            // Reset parameters to defaults
            this.updateParameters({ w1: 50, w2: 50, w3: 50, bias: 100 });
            
            // Update displays
            this._updateDisplays();
            
            // Reset state
            this.lastError = null;
            this.canUpdate = false;
            this.updateCount = 0;
            
            // Hide indicators
            ['drums', 'guitar', 'vocals', 'master'].forEach(name => {
                const indicator = document.getElementById(`${name}-update-indicator`);
                const display = document.getElementById(`${name}-update-display`);
                
                if (indicator) indicator.style.opacity = '0';
                if (display) display.style.opacity = '0';
            });
            
            // Hide sound level
            const soundDisplay = document.getElementById('sound-level-display');
            if (soundDisplay) {
                soundDisplay.style.display = 'none';
            }
            
            // Reset status
            const status = document.getElementById('mix-status');
            if (status) {
                status.innerHTML = '<div>🎧 Press "Play Music" to test your mix!</div>';
            }
            
            // Disable update button
            const updateBtn = document.getElementById('update-params-btn');
            if (updateBtn) {
                updateBtn.disabled = true;
                updateBtn.style.cursor = 'not-allowed';
                updateBtn.style.opacity = '0.5';
                updateBtn.style.background = '#6c757d';
            }
            
            // Track reset action
            this.trackAction('level_reset', { 
                resetTo: { w1: 50, w2: 50, w3: 50, bias: 100 }
            });
        }
    }
    
    // Add animation CSS if not present
    if (!document.getElementById('mixer-style')) {
        const style = document.createElement('style');
        style.id = 'mixer-style';
        style.textContent = `
            @keyframes soundAppear {
                0% { 
                    transform: translate(-50%, -50%) scale(0);
                    opacity: 0;
                }
                100% { 
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 1;
                }
            }
            
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
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