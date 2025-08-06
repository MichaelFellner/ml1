// multivariable-gradient-descent.js - Simple 2-part multivariable gradient descent

// Shared state
let multiState = {
    variables: [],
    selectedLR: null
};

// =============================================================================
// PART 1: TWO VARIABLES
// =============================================================================

function createMultivariatePart1() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-header" style="padding: 8px; font-size: 1.1rem;">Multivariable GD - Part 1: Two Variables</div>
            <div class="level-content multivariate-demo" style="padding: 10px;">
                <div class="demo-explanation" style="margin-bottom: 10px; text-align: center;">
                    <h3 style="font-size: 1rem; margin: 5px 0;">Minimize f(x₁,x₂) = (x₁-3)² + (x₂-2)²</h3>
                    <p style="font-size: 0.85rem; margin: 3px 0; color: #666;">Minimum at (3, 2) where f = 0</p>
                </div>
                
                <div class="demo-container">
                    <div class="value-display" style="text-align: center; margin: 10px 0; padding: 12px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 10px; color: white;">
                        <div class="current-values" style="display: flex; justify-content: center; gap: 15px; margin-bottom: 8px;">
                            <div style="font-size: 1.1rem; font-weight: bold;">x₁ = <span id="var0">0.0</span></div>
                            <div style="font-size: 1.1rem; font-weight: bold;">x₂ = <span id="var1">0.0</span></div>
                        </div>
                        <div class="current-loss" style="font-size: 1.8rem; font-weight: bold; margin: 8px 0;">Loss: <span id="lossValue">13.0</span></div>
                        <div class="restart-area" style="margin-top: 8px;">
                            <button id="resetBtn" class="reset-btn" style="background: rgba(255, 255, 255, 0.2); color: white; border: 2px solid rgba(255, 255, 255, 0.5); padding: 6px 12px; border-radius: 5px; cursor: pointer; font-size: 0.85rem; font-weight: bold;">🔄 Random</button>
                        </div>
                    </div>
                    
                    <div class="controls-wrapper" style="display: flex; flex-direction: column; gap: 12px; margin: 15px 0;">
                        <div class="manual-section" style="background: #f8f9fa; padding: 12px; border-radius: 8px; border: 2px solid #e9ecef;">
                            <h4 style="font-size: 0.95rem; margin: 0 0 8px 0;">Manual Guessing</h4>
                            <div class="guess-controls" style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                                <label style="font-size: 0.85rem; font-weight: bold; color: #495057;">x₁:</label>
                                <input type="number" id="guess1" placeholder="x₁" step="0.1" style="width: 60px; padding: 4px; border: 2px solid #ddd; border-radius: 4px; font-size: 0.85rem;">
                                <label style="font-size: 0.85rem; font-weight: bold; color: #495057;">x₂:</label>
                                <input type="number" id="guess2" placeholder="x₂" step="0.1" style="width: 60px; padding: 4px; border: 2px solid #ddd; border-radius: 4px; font-size: 0.85rem;">
                                <button id="submitGuessBtn" class="action-btn" style="background: #28a745; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-size: 0.85rem; font-weight: bold;">📍 Test</button>
                            </div>
                        </div>
                        
                        <div class="gradient-section" style="background: #f8f9fa; padding: 12px; border-radius: 8px; border: 2px solid #e9ecef;">
                            <h4 style="font-size: 0.95rem; margin: 0 0 8px 0;">Gradient Descent</h4>
                            <div class="gradient-info" style="margin: 8px 0; font-size: 0.85rem; font-weight: bold; color: #495057; display: flex; gap: 15px;">
                                <div>∂f/∂x₁ = <span id="grad0">-6.0</span></div>
                                <div>∂f/∂x₂ = <span id="grad1">-4.0</span></div>
                            </div>
                            <div class="lr-button-group" style="display: flex; gap: 5px; margin: 8px 0;">
                                <button class="lr-btn" data-lr="1" style="flex: 1; padding: 5px; border: 2px solid #6c757d; background: white; border-radius: 4px; cursor: pointer; font-size: 0.85rem; font-weight: bold;">1</button>
                                <button class="lr-btn" data-lr="0.1" style="flex: 1; padding: 5px; border: 2px solid #6c757d; background: white; border-radius: 4px; cursor: pointer; font-size: 0.85rem; font-weight: bold;">0.1</button>
                                <button class="lr-btn" data-lr="0.001" style="flex: 1; padding: 5px; border: 2px solid #6c757d; background: white; border-radius: 4px; cursor: pointer; font-size: 0.85rem; font-weight: bold;">0.001</button>
                            </div>
                            <button id="takeStepBtn" class="action-btn" disabled style="background: #28a745; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 0.85rem; font-weight: bold; width: 100%; margin-top: 5px;">🎯 Take Gradient Step</button>
                        </div>
                    </div>
                </div>
            </div>
            
            ${createStandardNavigation()}
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('multi1', 'createMultivariatePart1');
    setupMultivariatePart1();
}

function setupMultivariatePart1() {
    multiState.variables = [0.0, 0.0];
    multiState.selectedLR = null;
    
    const targets = [3, 2];
    
    function calculateLoss(vars) {
        return Math.pow(vars[0] - targets[0], 2) + Math.pow(vars[1] - targets[1], 2);
    }
    
    function calculateGradients(vars) {
        return [
            2 * (vars[0] - targets[0]),
            2 * (vars[1] - targets[1])
        ];
    }
    
    function updateDisplay() {
        const loss = calculateLoss(multiState.variables);
        const gradients = calculateGradients(multiState.variables);
        
        document.getElementById('var0').textContent = multiState.variables[0].toFixed(1);
        document.getElementById('var1').textContent = multiState.variables[1].toFixed(1);
        document.getElementById('grad0').textContent = gradients[0].toFixed(1);
        document.getElementById('grad1').textContent = gradients[1].toFixed(1);
        document.getElementById('lossValue').textContent = loss.toFixed(1);
        
        // Color the loss
        const lossElement = document.getElementById('lossValue');
        if (loss < 0.1) {
            lossElement.style.color = '#00ff00';
        } else if (loss < 1) {
            lossElement.style.color = '#90EE90';
        } else if (loss < 10) {
            lossElement.style.color = '#FFFF99';
        } else {
            lossElement.style.color = 'white';
        }
    }
    
    // Manual guess
    document.getElementById('submitGuessBtn').addEventListener('click', () => {
        const guess1 = parseFloat(document.getElementById('guess1').value);
        const guess2 = parseFloat(document.getElementById('guess2').value);
        
        if (!isNaN(guess1) && !isNaN(guess2)) {
            multiState.variables[0] = guess1;
            multiState.variables[1] = guess2;
            updateDisplay();
            document.getElementById('guess1').value = '';
            document.getElementById('guess2').value = '';
        }
    });
    
    // Learning rate selection
    document.querySelectorAll('.lr-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.lr-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            multiState.selectedLR = parseFloat(btn.dataset.lr);
            document.getElementById('takeStepBtn').disabled = false;
        });
    });
    
    // Gradient step
    document.getElementById('takeStepBtn').addEventListener('click', () => {
        if (multiState.selectedLR !== null) {
            const gradients = calculateGradients(multiState.variables);
            multiState.variables[0] -= multiState.selectedLR * gradients[0];
            multiState.variables[1] -= multiState.selectedLR * gradients[1];
            updateDisplay();
        }
    });
    
    // Reset
    document.getElementById('resetBtn').addEventListener('click', () => {
        multiState.variables[0] = Math.random() * 10 - 2;
        multiState.variables[1] = Math.random() * 8 - 1;
        updateDisplay();
    });
    
    updateDisplay();
}

// =============================================================================
// PART 2: FIVE VARIABLES
// =============================================================================

function createMultivariatePart2() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-header" style="padding: 8px; font-size: 1.1rem;">Multivariable GD - Part 2: Five Variables</div>
            <div class="level-content multivariate-demo" style="padding: 10px;">
                <div class="demo-explanation" style="margin-bottom: 10px; text-align: center;">
                    <h3 style="font-size: 1rem; margin: 5px 0;">Minimize f(x₁,...,x₅) = Σ(xᵢ-targetᵢ)²</h3>
                    <p style="font-size: 0.85rem; margin: 3px 0; color: #666;">Target: (1, -2, 0, 4, -1)</p>
                </div>
                
                <div class="demo-container">
                    <div class="value-display" style="text-align: center; margin: 10px 0; padding: 12px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 10px; color: white;">
                        <div class="current-values" style="display: flex; justify-content: center; gap: 10px; margin-bottom: 8px; flex-wrap: wrap;">
                            <div style="font-size: 0.95rem; font-weight: bold;">x₁=<span id="var0">0.0</span></div>
                            <div style="font-size: 0.95rem; font-weight: bold;">x₂=<span id="var1">0.0</span></div>
                            <div style="font-size: 0.95rem; font-weight: bold;">x₃=<span id="var2">0.0</span></div>
                            <div style="font-size: 0.95rem; font-weight: bold;">x₄=<span id="var3">0.0</span></div>
                            <div style="font-size: 0.95rem; font-weight: bold;">x₅=<span id="var4">0.0</span></div>
                        </div>
                        <div class="current-loss" style="font-size: 1.8rem; font-weight: bold; margin: 8px 0;">Loss: <span id="lossValue">22.0</span></div>
                        <div class="restart-area" style="margin-top: 8px;">
                            <button id="resetBtn" class="reset-btn" style="background: rgba(255, 255, 255, 0.2); color: white; border: 2px solid rgba(255, 255, 255, 0.5); padding: 6px 12px; border-radius: 5px; cursor: pointer; font-size: 0.85rem; font-weight: bold;">🔄 Random</button>
                        </div>
                    </div>
                    
                    <div class="controls-wrapper" style="display: flex; flex-direction: column; gap: 12px; margin: 15px 0;">
                        <div class="manual-section" style="background: #f8f9fa; padding: 12px; border-radius: 8px; border: 2px solid #e9ecef;">
                            <h4 style="font-size: 0.95rem; margin: 0 0 8px 0;">Manual Guessing</h4>
                            <div class="guess-controls" style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 5px;">
                                <input type="number" id="guess1" placeholder="x₁" step="0.1" style="padding: 4px; border: 2px solid #ddd; border-radius: 4px; font-size: 0.8rem;">
                                <input type="number" id="guess2" placeholder="x₂" step="0.1" style="padding: 4px; border: 2px solid #ddd; border-radius: 4px; font-size: 0.8rem;">
                                <input type="number" id="guess3" placeholder="x₃" step="0.1" style="padding: 4px; border: 2px solid #ddd; border-radius: 4px; font-size: 0.8rem;">
                                <input type="number" id="guess4" placeholder="x₄" step="0.1" style="padding: 4px; border: 2px solid #ddd; border-radius: 4px; font-size: 0.8rem;">
                                <input type="number" id="guess5" placeholder="x₅" step="0.1" style="padding: 4px; border: 2px solid #ddd; border-radius: 4px; font-size: 0.8rem;">
                            </div>
                            <button id="submitGuessBtn" class="action-btn" style="background: #28a745; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-size: 0.85rem; font-weight: bold; width: 100%; margin-top: 8px;">📍 Test All Values</button>
                        </div>
                        
                        <div class="gradient-section" style="background: #f8f9fa; padding: 12px; border-radius: 8px; border: 2px solid #e9ecef;">
                            <h4 style="font-size: 0.95rem; margin: 0 0 8px 0;">Gradient Descent</h4>
                            <div class="gradient-info" style="margin: 8px 0; font-size: 0.75rem; font-weight: bold; color: #495057; display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px;">
                                <div>∂f/∂x₁=<span id="grad0">-2</span></div>
                                <div>∂f/∂x₂=<span id="grad1">4</span></div>
                                <div>∂f/∂x₃=<span id="grad2">0</span></div>
                                <div>∂f/∂x₄=<span id="grad3">-8</span></div>
                                <div>∂f/∂x₅=<span id="grad4">2</span></div>
                            </div>
                            <div class="lr-button-group" style="display: flex; gap: 5px; margin: 8px 0;">
                                <button class="lr-btn" data-lr="1" style="flex: 1; padding: 5px; border: 2px solid #6c757d; background: white; border-radius: 4px; cursor: pointer; font-size: 0.85rem; font-weight: bold;">1</button>
                                <button class="lr-btn" data-lr="0.1" style="flex: 1; padding: 5px; border: 2px solid #6c757d; background: white; border-radius: 4px; cursor: pointer; font-size: 0.85rem; font-weight: bold;">0.1</button>
                                <button class="lr-btn" data-lr="0.001" style="flex: 1; padding: 5px; border: 2px solid #6c757d; background: white; border-radius: 4px; cursor: pointer; font-size: 0.85rem; font-weight: bold;">0.001</button>
                            </div>
                            <button id="takeStepBtn" class="action-btn" disabled style="background: #28a745; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 0.85rem; font-weight: bold; width: 100%; margin-top: 5px;">🎯 Take Gradient Step (All 5)</button>
                        </div>
                    </div>
                </div>
            </div>
            
            ${createStandardNavigation()}
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('multi2', 'createMultivariatePart2');
    setupMultivariatePart2();
}

function setupMultivariatePart2() {
    multiState.variables = [0.0, 0.0, 0.0, 0.0, 0.0];
    multiState.selectedLR = null;
    
    const targets = [1, -2, 0, 4, -1];
    
    function calculateLoss(vars) {
        let sum = 0;
        for (let i = 0; i < 5; i++) {
            sum += Math.pow(vars[i] - targets[i], 2);
        }
        return sum;
    }
    
    function calculateGradients(vars) {
        const gradients = [];
        for (let i = 0; i < 5; i++) {
            gradients.push(2 * (vars[i] - targets[i]));
        }
        return gradients;
    }
    
    function updateDisplay() {
        const loss = calculateLoss(multiState.variables);
        const gradients = calculateGradients(multiState.variables);
        
        for (let i = 0; i < 5; i++) {
            document.getElementById(`var${i}`).textContent = multiState.variables[i].toFixed(1);
            document.getElementById(`grad${i}`).textContent = gradients[i].toFixed(1);
        }
        
        document.getElementById('lossValue').textContent = loss.toFixed(1);
        
        // Color the loss
        const lossElement = document.getElementById('lossValue');
        if (loss < 0.1) {
            lossElement.style.color = '#00ff00';
        } else if (loss < 1) {
            lossElement.style.color = '#90EE90';
        } else if (loss < 10) {
            lossElement.style.color = '#FFFF99';
        } else {
            lossElement.style.color = 'white';
        }
    }
    
    // Manual guess
    document.getElementById('submitGuessBtn').addEventListener('click', () => {
        for (let i = 1; i <= 5; i++) {
            const guess = parseFloat(document.getElementById(`guess${i}`).value);
            if (!isNaN(guess)) {
                multiState.variables[i-1] = guess;
            }
        }
        
        // Clear inputs
        for (let i = 1; i <= 5; i++) {
            document.getElementById(`guess${i}`).value = '';
        }
        
        updateDisplay();
    });
    
    // Learning rate selection
    document.querySelectorAll('.lr-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.lr-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            multiState.selectedLR = parseFloat(btn.dataset.lr);
            document.getElementById('takeStepBtn').disabled = false;
        });
    });
    
    // Gradient step
    document.getElementById('takeStepBtn').addEventListener('click', () => {
        if (multiState.selectedLR !== null) {
            const gradients = calculateGradients(multiState.variables);
            for (let i = 0; i < 5; i++) {
                multiState.variables[i] -= multiState.selectedLR * gradients[i];
            }
            updateDisplay();
        }
    });
    
    // Reset
    document.getElementById('resetBtn').addEventListener('click', () => {
        for (let i = 0; i < 5; i++) {
            multiState.variables[i] = Math.random() * 10 - 5;
        }
        updateDisplay();
    });
    
    updateDisplay();
}

// CSS Styles
const styles = `
<style>
.multivariate-demo {
    max-width: 800px;
    margin: 0 auto;
}

.value-display {
    text-align: center;
    margin: 30px 0;
    padding: 30px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 15px;
    color: white;
}

.current-values {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}

.current-values > div {
    font-size: 1.5em;
    font-weight: bold;
}

.current-loss {
    font-size: 3em;
    font-weight: bold;
    margin: 20px 0;
    text-shadow: 3px 3px 6px rgba(0,0,0,0.4);
}

.restart-area {
    margin-top: 20px;
    text-align: center;
}

.reset-btn {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.5);
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: all 0.2s;
    backdrop-filter: blur(5px);
}

.reset-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.8);
    transform: translateY(-2px);
}

.controls-wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 30px 0;
}

.manual-section, .gradient-section {
    background: #f8f9fa;
    padding: 25px;
    border-radius: 10px;
    border: 2px solid #e9ecef;
}

.guess-controls {
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
}

.guess-controls label {
    font-weight: bold;
    color: #495057;
}

.guess-controls input {
    width: 80px;
    padding: 8px;
    border: 2px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
}

.gradient-info {
    margin: 15px 0;
    font-size: 16px;
    font-weight: bold;
    color: #495057;
}

.gradient-info > div {
    margin: 5px 0;
}

.lr-button-group {
    display: flex;
    gap: 10px;
    margin: 15px 0;
    flex-wrap: wrap;
}

.lr-btn {
    flex: 1;
    min-width: 80px;
    padding: 10px;
    border: 2px solid #6c757d;
    background: white;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 14px;
    font-weight: bold;
}

.lr-btn:hover {
    background: #e9ecef;
}

.lr-btn.active {
    background: #007bff;
    color: white;
    border-color: #0056b3;
}

.action-btn {
    background: #28a745;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: background 0.2s;
    margin: 5px;
}

.action-btn:hover:not(:disabled) {
    background: #218838;
}

.action-btn:disabled {
    background: #6c757d;
    cursor: not-allowed;
}
</style>
`;

// Add styles to the document
document.head.insertAdjacentHTML('beforeend', styles);