/**
 * Interactive Training Data
 * 
 * Allows users to adjust weights and see predictions and errors
 */

window.createTrainingDataInteractive = function() {
    
    class TrainingDataInteractiveLevel extends window.BaseLevelTemplate {
        constructor() {
            super({
                id: 'training-data-interactive',
                name: 'Interactive Weight Adjustment',
                type: 'interactive',
                description: '',
                instructions: '',  // Empty to avoid undefined
                concepts: ['Weights', 'Predictions', 'Error', 'Loss'],
                difficulty: 'intermediate',
                interactionType: 'parameter-tuning',
                estimatedTime: 5
            });
            
            this.data = [];
            this.currentTotalError = 0;
            
            // Define controls
            this.controls = [
                { id: 'w1', label: 'Weight w₁', min: -10, max: 10, default: 1, step: 0.5 },
                { id: 'w2', label: 'Weight w₂', min: -10, max: 10, default: 1, step: 0.5 },
                { id: 'w3', label: 'Weight w₃', min: -10, max: 10, default: 1, step: 0.5 }
            ];
            
            // Target function (hidden from user)
            this.targetFunction = { w1: 3, w2: 5, w3: 10 };
        }
        
        async setup() {
            await super.setup();
            
            // Generate the same 50 rows of data
            this.generateData();
            
            // Initialize navigation
            if (typeof initializeNavigation === 'function') {
                initializeNavigation('training-data-interactive', 'createTrainingDataInteractive');
            }
            
            // Update table when parameters change
            this.setupParameterListeners();
        }
        
        generateData() {
            // Use a seeded random for consistency
            let seed = 12345;
            const seededRandom = () => {
                seed = (seed * 9301 + 49297) % 233280;
                return seed / 233280;
            };
            
            // Generate same 50 random data points
            for (let i = 0; i < 50; i++) {
                const x1 = Math.floor(seededRandom() * 10) + 1;
                const x2 = Math.floor(seededRandom() * 10) + 1;
                const x3 = Math.floor(seededRandom() * 10) + 1;
                // Hidden formula: 3*x1 + 5*x2 + 10*x3
                const target = 3 * x1 + 5 * x2 + 10 * x3;
                
                this.data.push({
                    id: i + 1,
                    x1: x1,
                    x2: x2,
                    x3: x3,
                    target: target
                });
            }
        }
        
        setupParameterListeners() {
            // Listen for parameter changes
            ['w1', 'w2', 'w3'].forEach(param => {
                const input = document.getElementById(`${param}-header-input`);
                
                if (input) {
                    const updateTable = () => {
                        this.updatePredictions();
                    };
                    
                    this.addEventListenerWithCleanup(input, 'input', updateTable);
                    this.addEventListenerWithCleanup(input, 'change', updateTable);
                }
            });
            
            // Initial update
            setTimeout(() => this.updatePredictions(), 100);
        }
        
        updatePredictions() {
            const w1 = parseFloat(document.getElementById('w1-header-input')?.value || 1);
            const w2 = parseFloat(document.getElementById('w2-header-input')?.value || 1);
            const w3 = parseFloat(document.getElementById('w3-header-input')?.value || 1);
            
            let totalError = 0;
            const tbody = document.getElementById('data-tbody');
            
            if (tbody) {
                // Clear and rebuild table rows
                const rows = this.data.map(row => {
                    const w1x1 = (w1 * row.x1).toFixed(1);
                    const w2x2 = (w2 * row.x2).toFixed(1);
                    const w3x3 = (w3 * row.x3).toFixed(1);
                    const prediction = (parseFloat(w1x1) + parseFloat(w2x2) + parseFloat(w3x3)).toFixed(1);
                    const error = (row.target - parseFloat(prediction)).toFixed(1);
                    
                    totalError += Math.abs(parseFloat(error));
                    
                    const errorColor = Math.abs(parseFloat(error)) < 5 ? '#4caf50' : 
                                      Math.abs(parseFloat(error)) < 20 ? '#ff9800' : '#f44336';
                    
                    return `
                        <tr>
                            <td style="padding: 8px 12px; text-align: center; border-right: 1px solid #ddd; background: #f8f9fa; font-size: 0.95em;">${row.id}</td>
                            <td style="padding: 8px 15px; text-align: center; font-size: 0.95em;">${row.x1}</td>
                            <td style="padding: 8px 15px; text-align: center; font-size: 0.95em;">${row.x2}</td>
                            <td style="padding: 8px 15px; text-align: center; font-size: 0.95em;">${row.x3}</td>
                            <td style="padding: 8px 18px; text-align: center; background: rgba(234,179,8,0.1); font-weight: bold; font-size: 0.95em;">${row.target}</td>
                            <td style="padding: 8px 12px; text-align: center; background: rgba(102,126,234,0.05); font-size: 0.95em;">${w1x1}</td>
                            <td style="padding: 8px 12px; text-align: center; background: rgba(102,126,234,0.05); font-size: 0.95em;">${w2x2}</td>
                            <td style="padding: 8px 12px; text-align: center; background: rgba(102,126,234,0.05); font-size: 0.95em;">${w3x3}</td>
                            <td style="padding: 8px 15px; text-align: center; background: rgba(102,126,234,0.1); font-weight: bold; font-size: 0.95em;">${prediction}</td>
                            <td style="padding: 8px 15px; text-align: center; color: ${errorColor}; font-weight: bold; font-size: 0.95em;">${error}</td>
                        </tr>
                    `;
                }).join('');
                
                tbody.innerHTML = rows;
                
                // Update total error display
                const errorDisplay = document.getElementById('total-error');
                if (errorDisplay) {
                    errorDisplay.textContent = totalError.toFixed(1);
                    
                    // Update color based on error magnitude
                    if (totalError < 100) {
                        errorDisplay.style.color = '#4caf50';
                    } else if (totalError < 500) {
                        errorDisplay.style.color = '#ff9800';
                    } else {
                        errorDisplay.style.color = '#f44336';
                    }
                }
                
                // Check for success
                if (totalError < 50) {
                    if (!this.completed) {
                        this.completed = true;
                        this.showSuccess('🎉 Excellent! You found the weights!', 5000);
                        setTimeout(() => {
                            this.completeLevel({ score: Math.round(100 - totalError/10) });
                        }, 1500);
                    }
                }
            }
        }
        

        
        _generateMainContent() {
            // Create initial table rows (will be updated dynamically)
            const tableRows = this.data.map(row => `
                <tr>
                    <td style="padding: 8px 12px; text-align: center; border-right: 1px solid #ddd; background: #f8f9fa; font-size: 0.95em;">${row.id}</td>
                    <td style="padding: 8px 15px; text-align: center; font-size: 0.95em;">${row.x1}</td>
                    <td style="padding: 8px 15px; text-align: center; font-size: 0.95em;">${row.x2}</td>
                    <td style="padding: 8px 15px; text-align: center; font-size: 0.95em;">${row.x3}</td>
                    <td style="padding: 8px 18px; text-align: center; background: rgba(234,179,8,0.1); font-weight: bold; font-size: 0.95em;">${row.target}</td>
                    <td style="padding: 8px 12px; text-align: center; background: rgba(102,126,234,0.05); font-size: 0.95em;">-</td>
                    <td style="padding: 8px 12px; text-align: center; background: rgba(102,126,234,0.05); font-size: 0.95em;">-</td>
                    <td style="padding: 8px 12px; text-align: center; background: rgba(102,126,234,0.05); font-size: 0.95em;">-</td>
                    <td style="padding: 8px 15px; text-align: center; background: rgba(102,126,234,0.1); font-weight: bold; font-size: 0.95em;">-</td>
                    <td style="padding: 8px 15px; text-align: center; font-weight: bold; font-size: 0.95em;">-</td>
                </tr>
            `).join('');
            
            return `
                <div style="height: calc(100vh - 250px); display: flex; flex-direction: column; gap: 8px; padding: 5px 5px;">
                    <!-- Info Bubble -->
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px; padding: 10px 15px; color: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 3px;">
                        <p style="margin: 0; font-size: 0.9em; text-align: center;">
                            💡 <strong>Adjust the weights in the column headers</strong> to minimize the total error. Try to get it below 50!
                        </p>
                    </div>
                    
                    <!-- Spreadsheet Container -->
                    <div style="flex: 1; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden; display: flex; flex-direction: column; min-height: 350px;">
                        <!-- Table wrapper with scroll -->
                        <div style="flex: 1; overflow-y: auto; overflow-x: auto; min-height: 0;">
                            <table style="width: 100%; border-collapse: collapse; font-family: 'Monaco', 'Courier New', monospace;">
                                <thead style="position: sticky; top: 0; background: #667eea; color: white; z-index: 10;">
                                    <tr>
                                        <th style="padding: 10px 20px; text-align: center; border-right: 1px solid rgba(255,255,255,0.3); font-size: 0.9em;">Row</th>
                                        <th style="padding: 10px 20px; text-align: center; font-size: 0.9em;">x₁</th>
                                        <th style="padding: 10px 50px; text-align: center; font-size: 0.9em;">x₂</th>
                                        <th style="padding: 10px 50px; text-align: center; font-size: 0.9em;">x₃</th>
                                        <th style="padding: 10px 18px; text-align: center; background: rgba(0,0,0,0.1); font-size: 0.9em;">Target</th>
                                        <th style="padding: 6px 12px; text-align: center; background: rgba(255,255,255,0.1); font-size: 0.9em;">
                                            <div>w₁×x₁</div>
                                            <input type="number" id="w1-header-input" value="1" step="0.5" 
                                                style="width: 55px; padding: 3px; margin-top: 3px; text-align: center; border: 1px solid rgba(255,255,255,0.5); border-radius: 3px; background: rgba(255,255,255,0.9); color: #333; font-weight: bold; font-size: 0.95em;">
                                        </th>
                                        <th style="padding: 6px 12px; text-align: center; background: rgba(255,255,255,0.1); font-size: 0.9em;">
                                            <div>w₂×x₂</div>
                                            <input type="number" id="w2-header-input" value="1" step="0.5" 
                                                style="width: 55px; padding: 3px; margin-top: 3px; text-align: center; border: 1px solid rgba(255,255,255,0.5); border-radius: 3px; background: rgba(255,255,255,0.9); color: #333; font-weight: bold; font-size: 0.95em;">
                                        </th>
                                        <th style="padding: 6px 12px; text-align: center; background: rgba(255,255,255,0.1); font-size: 0.9em;">
                                            <div>w₃×x₃</div>
                                            <input type="number" id="w3-header-input" value="1" step="0.5" 
                                                style="width: 55px; padding: 3px; margin-top: 3px; text-align: center; border: 1px solid rgba(255,255,255,0.5); border-radius: 3px; background: rgba(255,255,255,0.9); color: #333; font-weight: bold; font-size: 0.95em;">
                                        </th>
                                        <th style="padding: 10px 15px; text-align: center; background: rgba(255,255,255,0.2); font-size: 0.9em;">Prediction</th>
                                        <th style="padding: 10px 15px; text-align: center; background: rgba(255,255,255,0.3); font-size: 0.9em;">Error</th>
                                    </tr>
                                </thead>
                                <tbody id="data-tbody">
                                    ${tableRows}
                                </tbody>
                            </table>
                        </div>
                        
                        <!-- Total error bar at bottom -->
                        <div style="padding: 12px; background: linear-gradient(to right, rgba(102,126,234,0.1), rgba(234,179,8,0.1)); border-top: 3px solid #667eea;">
                            <p style="margin: 0; text-align: center; font-size: 1.1em; font-weight: bold;">
                                Total Error: <span id="total-error" style="color: #f44336; font-size: 1.2em;">0</span>
                            </p>
                            <p style="margin: 5px 0 0 0; text-align: center; color: #666; font-size: 0.85em;">
                                Goal: Get total error below 50 (Hint: The true weights are integers between 1 and 10)
                            </p>
                        </div>
                    </div>
                </div>
                
                <!-- Standard navigation -->
                ${typeof createStandardNavigation === 'function' ? createStandardNavigation() : ''}
            `;
        }
    }
    
    const level = new TrainingDataInteractiveLevel();
    level.create().catch(error => {
        console.error('Failed to create Interactive Training Data:', error);
    });
    
    return level;
};

// Export for modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.createTrainingDataInteractive;
}