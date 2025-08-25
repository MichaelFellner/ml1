// Balloon Inflation Challenge Level - Refactored with UI Components
// This version demonstrates how to use the new reusable UI components
// while maintaining the same functionality as the original

// Import required UI components (ensure these are loaded before this file)
// <script src="components/base/Component.js"></script>
// <script src="components/ui/FormulaDisplay.js"></script>
// <script src="components/ui/ControlSlider.js"></script>
// <script src="components/ui/ResultMessage.js"></script>
// <script src="components/ui/NavigationButtons.js"></script>

function createBalloonInflationLevel() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-header">
                🎈 Balloon Inflation Challenge yo
            </div>
            <div class="level-content" style="padding: 10px 20px; max-width: 1000px; margin: 0 auto;">
                <!-- Instructions -->
                <div style="background: rgba(102,126,234,0.1); border-radius: 10px; padding: 15px; margin-bottom: 20px; border: 2px solid rgba(102,126,234,0.3); text-align: center;">
                    <p style="font-size: 1rem; color: #555; margin: 0;">
                        <strong>Goal:</strong> Find the right amount of air for different sized balloons!<br>
                        <span style="font-size: 0.9rem; color: #666;">Amount of air = <strong style="color: #667eea;">w × (balloon size)</strong></span><br>
                        This challenge should be pretty easy, there's only one variable to tune that will solve the formula for how much air to give each size balloon.
                    </p>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <!-- Left side: Balloon Display -->
                    <div style="background: rgba(255,255,255,0.9); border-radius: 15px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h3 style="margin: 0 0 15px 0; color: #333; text-align: center;">Current Balloon</h3>
                        
                        <!-- Balloon visualization -->
                        <div style="text-align: center; padding: 20px; background: linear-gradient(to bottom, #e3f2fd, #bbdefb); border-radius: 10px; margin-bottom: 15px; position: relative; height: 200px;">
                            <div id="balloon-container" style="position: relative; height: 100%; display: flex; align-items: center; justify-content: center;">
                                <div id="balloon-emoji" style="font-size: 80px; transition: all 0.5s ease;">🎈</div>
                                <div id="pop-effect" style="position: absolute; font-size: 100px; opacity: 0; transition: opacity 0.3s;">💥</div>
                            </div>
                            <div style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); font-size: 1.1rem; color: #333;">
                                Size: <span id="balloon-size" style="font-weight: bold; color: #667eea; font-size: 1.3rem;">1</span>
                            </div>
                        </div>
                        
                        <!-- Result Message Component Container -->
                        <div id="result-message-container"></div>
                        
                        <!-- Balloon selector -->
                        <div style="margin-top: 20px; padding: 15px; background: rgba(102,126,234,0.05); border-radius: 8px;">
                            <div style="font-size: 0.9rem; color: #666; margin-bottom: 10px;">Test different balloon sizes:</div>
                            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                                <button class="balloon-btn" data-size="1" style="padding: 8px 12px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">Size 1 🎈</button>
                                <button class="balloon-btn" data-size="2" style="padding: 8px 12px; background: white; color: #333; border: 2px solid #ddd; border-radius: 5px; cursor: pointer;">Size 2 🎈</button>
                                <button class="balloon-btn" data-size="3" style="padding: 8px 12px; background: white; color: #333; border: 2px solid #ddd; border-radius: 5px; cursor: pointer;">Size 3 🎈</button>
                                <button class="balloon-btn" data-size="4" style="padding: 8px 12px; background: white; color: #333; border: 2px solid #ddd; border-radius: 5px; cursor: pointer;">Size 4 🎈</button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right side: Controls -->
                    <div style="background: rgba(255,255,255,0.9); border-radius: 15px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h3 style="margin: 0 0 15px 0; color: #333; text-align: center;">Your Formula</h3>
                        
                        <!-- Formula Display Component Container -->
                        <div id="formula-display-container"></div>
                        
                        <!-- Control Slider Component Container -->
                        <div id="control-slider-container"></div>
                        
                        <!-- Inflate button -->
                        <button id="inflate-btn" style="width: 100%; padding: 12px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 8px; font-size: 1.1rem; font-weight: bold; cursor: pointer; transition: all 0.3s; margin-top: 10px;">
                            💨 Inflate Balloon
                        </button>
                        
                        <!-- Success Message Component Container -->
                        <div id="success-message-container"></div>
                    </div>
                </div>
                
                <!-- Navigation Component Container -->
                <div id="navigation-container"></div>
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('balloon-level', 'createBalloonInflationLevel');
    
    // Setup balloon level logic with components
    setupBalloonLevelWithComponents();
}

function setupBalloonLevelWithComponents() {
    // True function: f(x) = 7x
    const TRUE_W = 7;
    
    let currentBalloonSize = 1;
    let perfectBalloons = 0;
    
    // Initialize UI Components
    const formulaDisplay = new FormulaDisplay({
        w: 1,
        x: currentBalloonSize,
        variableName: 'air',
        inputName: 'size',
        showResult: true,
        resultLabel: 'For this balloon'
    });
    
    const controlSlider = new ControlSlider({
        min: 0,
        max: 15,
        value: 1,
        step: 0.5,
        label: 'w (air multiplier)',
        color: '#667eea',
        onChange: handleSliderChange
    });
    
    const resultMessage = new ResultMessage({
        type: 'info',
        title: '',
        details: '',
        dismissible: false
    });
    
    const successMessage = new ResultMessage({
        type: 'success',
        title: '🎉 Perfect Formula Found! 🎉',
        details: 'f(x) = 7x',
        dismissible: false
    });
    
    const navigationButtons = new NavigationButtons({
        onNavigate: (data) => {
            console.log('Navigation event:', data);
        }
    });
    
    // Mount components
    formulaDisplay.mount('#formula-display-container');
    controlSlider.mount('#control-slider-container');
    resultMessage.mount('#result-message-container');
    successMessage.mount('#success-message-container');
    navigationButtons.mount('#navigation-container');
    
    // Initially hide messages
    resultMessage.setState({ visible: false });
    successMessage.setState({ visible: false });
    
    // Event handlers
    function handleSliderChange(value) {
        // Update formula display with new w value
        formulaDisplay.updateParameters({ 
            w: value, 
            result: value * currentBalloonSize 
        });
    }
    
    function updateFormulaForBalloonSize() {
        const currentW = controlSlider.getValue();
        formulaDisplay.updateParameters({ 
            x: currentBalloonSize,
            result: currentW * currentBalloonSize 
        });
    }
    
    function inflateBalloon() {
        const w = controlSlider.getValue();
        
        const yourAnswer = w * currentBalloonSize;
        const correctAnswer = TRUE_W * currentBalloonSize;
        const difference = yourAnswer - correctAnswer;
        const percentDiff = (yourAnswer / correctAnswer) * 100;
        
        // Update balloon visual effects
        const balloonEmoji = document.getElementById('balloon-emoji');
        const popEffect = document.getElementById('pop-effect');
        
        // Reset animations
        popEffect.style.opacity = '0';
        balloonEmoji.style.transform = 'scale(1)';
        balloonEmoji.style.opacity = '1';
        
        let messageType, messageTitle, messageDetails;
        
        if (percentDiff >= 95 && percentDiff <= 105) {
            // Perfect!
            messageType = 'success';
            messageTitle = '🎉 Perfect! The balloon is just right!';
            messageDetails = `You gave: ${yourAnswer.toFixed(1)} units of air\nPerfect amount: ${correctAnswer.toFixed(1)} units of air\nDifference: ${Math.abs(difference).toFixed(1)}`;
            balloonEmoji.style.transform = 'scale(1.2)';
            balloonEmoji.textContent = '🎈';
            
            perfectBalloons++;
            
            // Check if formula is perfect
            if (w === TRUE_W) {
                successMessage.show(true); // Show with animation
            }
        } else if (percentDiff < 95) {
            // Too little - deflated
            messageType = 'warning';
            messageTitle = '😔 The balloon looks deflated...';
            messageDetails = `You gave: ${yourAnswer.toFixed(1)} units of air\nNeeded: ${correctAnswer.toFixed(1)} units of air\nTry increasing the air pressure.`;
            balloonEmoji.style.transform = 'scale(0.7)';
            balloonEmoji.style.opacity = '0.6';
            balloonEmoji.textContent = '🎈';
        } else {
            // Too much - pop!
            messageType = 'error';
            messageTitle = '💥 POP! Too much air!';
            messageDetails = `You gave: ${yourAnswer.toFixed(1)} units of air\nNeeded: ${correctAnswer.toFixed(1)} units of air\nTry reducing the air pressure.`;
            
            // Pop animation
            balloonEmoji.style.opacity = '0';
            popEffect.style.opacity = '1';
            setTimeout(() => {
                popEffect.style.opacity = '0';
                balloonEmoji.style.opacity = '1';
                balloonEmoji.textContent = '💔';
                balloonEmoji.style.transform = 'scale(0.5)';
            }, 300);
        }
        
        // Update result message component
        resultMessage.updateMessage({
            type: messageType,
            title: messageTitle,
            details: messageDetails
        }, true); // with shake animation
        
        resultMessage.show();
    }
    
    // Balloon selector event handling
    const balloonButtons = document.querySelectorAll('.balloon-btn');
    balloonButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            balloonButtons.forEach(b => {
                b.style.background = 'white';
                b.style.color = '#333';
                b.style.border = '2px solid #ddd';
            });
            btn.style.background = '#667eea';
            btn.style.color = 'white';
            btn.style.border = 'none';
            
            // Update current balloon
            currentBalloonSize = parseInt(btn.dataset.size);
            document.getElementById('balloon-size').textContent = currentBalloonSize;
            
            // Reset balloon display
            const balloonEmoji = document.getElementById('balloon-emoji');
            balloonEmoji.textContent = '🎈';
            balloonEmoji.style.transform = 'scale(1)';
            balloonEmoji.style.opacity = '1';
            
            // Update balloon size visually
            const baseSize = 60;
            balloonEmoji.style.fontSize = `${baseSize + (currentBalloonSize * 10)}px`;
            
            // Hide previous result and update formula
            resultMessage.setState({ visible: false });
            updateFormulaForBalloonSize();
        });
    });
    
    // Inflate button event handling
    const inflateBtn = document.getElementById('inflate-btn');
    inflateBtn.addEventListener('click', inflateBalloon);
    
    // Add hover effects to inflate button
    inflateBtn.addEventListener('mouseenter', () => {
        inflateBtn.style.transform = 'translateY(-2px)';
        inflateBtn.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    });
    inflateBtn.addEventListener('mouseleave', () => {
        inflateBtn.style.transform = 'translateY(0)';
        inflateBtn.style.boxShadow = 'none';
    });
    
    // Store component references for potential cleanup
    window.balloonLevelComponents = {
        formulaDisplay,
        controlSlider,
        resultMessage,
        successMessage,
        navigationButtons,
        cleanup: () => {
            formulaDisplay.unmount();
            controlSlider.unmount();
            resultMessage.unmount();
            successMessage.unmount();
            navigationButtons.unmount();
        }
    };
}

// Export functions for both global and module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createBalloonInflationLevel, setupBalloonLevelWithComponents };
} else {
    // Make available globally
    window.createBalloonInflationLevel = createBalloonInflationLevel;
    window.setupBalloonLevelWithComponents = setupBalloonLevelWithComponents;
}

/*
 * REFACTORING COMPARISON:
 * 
 * BEFORE (Original balloon-inflation.js):
 * ======================================
 * - 300+ lines of inline HTML and CSS
 * - Mixed presentation and logic code
 * - Repeated styling patterns
 * - Manual DOM manipulation
 * - No reusable components
 * 
 * AFTER (This refactored version):
 * ===============================
 * - Clean separation of concerns
 * - Reusable UI components
 * - Reduced code duplication
 * - Component-based state management
 * - Easy to maintain and extend
 * - Consistent styling across levels
 * 
 * BENEFITS:
 * ========
 * 1. **Maintainability**: Changes to formula display styling affect all levels
 * 2. **Consistency**: All sliders behave the same way
 * 3. **Reusability**: Components can be used in other levels
 * 4. **Testability**: Each component can be tested independently
 * 5. **Scalability**: Easy to add new features to components
 * 
 * USAGE IN HTML:
 * =============
 * Include these scripts before the level file:
 * <script src="components/base/Component.js"></script>
 * <script src="components/ui/FormulaDisplay.js"></script>
 * <script src="components/ui/ControlSlider.js"></script>
 * <script src="components/ui/ResultMessage.js"></script>
 * <script src="components/ui/NavigationButtons.js"></script>
 * <script src="levels/balloon-inflation-refactored.js"></script>
 * 
 * MIGRATION STRATEGY:
 * ==================
 * 1. Test this refactored version alongside the original
 * 2. Verify all functionality works identically
 * 3. Gradually refactor other levels using the same patterns
 * 4. Replace original files once testing is complete
 * 5. Update index.html to include component scripts
 */