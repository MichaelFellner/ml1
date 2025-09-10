/**
 * Training Data Spreadsheet View
 * 
 * Shows a spreadsheet of training data to familiarize users with the concept
 */

window.createTrainingDataSpreadsheet = function() {
    
    class TrainingDataSpreadsheetLevel extends window.BaseLevelTemplate {
        constructor() {
            super({
                id: 'training-data-spreadsheet',
                name: 'Training Data Spreadsheet',
                type: 'demonstration',
                description: '',
                instructions: '',  // Empty instructions to avoid undefined
                concepts: ['Training Data', 'Features', 'Targets'],
                difficulty: 'beginner',
                interactionType: 'viewing',
                estimatedTime: 3
            });
            
            this.data = [];
            // Generate data in constructor so it's available for initial render
            this.generateData();
        }
        
        async setup() {
            await super.setup();
            
            // Initialize navigation
            if (typeof initializeNavigation === 'function') {
                initializeNavigation('training-data-spreadsheet', 'createTrainingDataSpreadsheet');
            }
        }
        
        generateData() {
            // Use a seeded random for consistency with interactive version
            let seed = 12345;
            const seededRandom = () => {
                seed = (seed * 9301 + 49297) % 233280;
                return seed / 233280;
            };
            
            // Generate 50 random data points
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
        
        _generateMainContent() {
            // Create table rows
            const tableRows = this.data.map(row => `
                <tr>
                    <td style="padding: 8px; text-align: center; border-right: 1px solid #ddd; background: #f8f9fa;">${row.id}</td>
                    <td style="padding: 8px; text-align: center;">${row.x1}</td>
                    <td style="padding: 8px; text-align: center;">${row.x2}</td>
                    <td style="padding: 8px; text-align: center;">${row.x3}</td>
                    <td style="padding: 8px; text-align: center; background: rgba(234,179,8,0.1); font-weight: bold;">${row.target}</td>
                </tr>
            `).join('');
            
            return `
                <div style="max-height: 50vh; display: flex; flex-direction: column; gap: 10px; padding: 15px;">
                    <!-- Header -->
                    <div style="text-align: center;">
                        <h2 style="margin: 10px 0 5px 0; color: #333;">Training Data: 50 Examples</h2>
                        <p style="color: #666; margin: 5px 0; font-size: 0.95em;">This is what training data looks like - many examples with inputs (features) and correct outputs (targets)</p>
                    </div>
                    
                    <!-- Info Bubble -->
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; padding: 12px 16px; color: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 2px;">
                        <p style="margin: 0; font-size: 0.9em; text-align: center;">
                            💡 <strong>Each row is one training example.</strong> The model will learn patterns from these examples to predict the target value from the features.
                        </p>
                    </div>
                    
                    <!-- Spreadsheet Container -->
                    <div style="flex: 1; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden; display: flex; flex-direction: column; min-height: 300px;">
                        <!-- Table wrapper with scroll -->
                        <div style="flex: 1; overflow-y: auto; overflow-x: auto;">
                            <table style="width: 100%; border-collapse: collapse; font-family: 'Monaco', 'Courier New', monospace;">
                                <thead style="position: sticky; top: 0; background: #667eea; color: white; z-index: 10;">
                                    <tr>
                                        <th style="padding: 12px; text-align: center; border-right: 1px solid rgba(255,255,255,0.3);">Row</th>
                                        <th style="padding: 12px; text-align: center;">Feature x₁</th>
                                        <th style="padding: 12px; text-align: center;">Feature x₂</th>
                                        <th style="padding: 12px; text-align: center;">Feature x₃</th>
                                        <th style="padding: 12px; text-align: center; background: rgba(0,0,0,0.1);">Target</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${tableRows}
                                </tbody>
                            </table>
                        </div>
                        
                        <!-- Info bar at bottom -->
                        <div style="padding: 15px; background: rgba(102,126,234,0.1); border-top: 2px solid #667eea;">
                            <p style="margin: 0; text-align: center; color: #555;">
                                <strong>50 training examples</strong> • Each row has 3 input features and 1 target output
                            </p>
                        </div>
                    </div>
                </div>
                
                <!-- Standard navigation -->
                ${typeof createStandardNavigation === 'function' ? createStandardNavigation() : ''}
            `;
        }
    }
    
    const level = new TrainingDataSpreadsheetLevel();
    level.create().catch(error => {
        console.error('Failed to create Training Data Spreadsheet:', error);
    });
    
    return level;
};

// Export for modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.createTrainingDataSpreadsheet;
}