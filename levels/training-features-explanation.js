/**
 * Training Features Explanation
 * 
 * Non-interactive level explaining what features are and their importance
 */

window.createTrainingFeaturesExplanation = function() {
    
    class TrainingFeaturesExplanationLevel extends window.BaseLevelTemplate {
        constructor() {
            super({
                id: 'training-features-explanation',
                name: 'Understanding Training Features',
                type: 'explanation',
                description: 'Learn what features are and why choosing the right ones matters',
                instructions: 'Read through the explanation to understand training features',
                concepts: ['Features', 'Feature Selection', 'Feature Engineering', 'Real-World Data'],
                difficulty: 'intermediate',
                interactionType: 'none',
                estimatedTime: 5
            });
        }
        
        async setup() {
            await super.setup();
            
            // Initialize navigation
            if (typeof initializeNavigation === 'function') {
                initializeNavigation('training-features-explanation', 'createTrainingFeaturesExplanation');
            }
            
            // Add continue button listener
            const continueBtn = document.getElementById('continue-button');
            if (continueBtn) {
                this.addEventListenerWithCleanup(continueBtn, 'click', () => {
                    if (!this.completed) {
                        this.completed = true;
                        this.completeLevel({ understood: true });
                    }
                });
            }
            
            // Add interactive examples
            this.setupInteractiveExamples();
        }
        
        setupInteractiveExamples() {
            // Feature importance visualization
            const importanceCanvas = document.getElementById('feature-importance-viz');
            if (importanceCanvas) {
                this.drawFeatureImportance(importanceCanvas);
            }
            
            // Feature selection demo
            const selectionDemo = document.getElementById('feature-selection-demo');
            if (selectionDemo) {
                this.setupFeatureSelectionDemo();
            }
        }
        
        drawFeatureImportance(canvas) {
            const ctx = canvas.getContext('2d');
            const width = canvas.width;
            const height = canvas.height;
            
            // Clear canvas
            ctx.clearRect(0, 0, width, height);
            
            // Feature importance data
            const features = [
                { name: 'Income', importance: 0.85, color: '#4caf50' },
                { name: 'Location', importance: 0.72, color: '#2196f3' },
                { name: 'Size', importance: 0.68, color: '#ff9800' },
                { name: 'Age', importance: 0.45, color: '#9c27b0' },
                { name: 'Color', importance: 0.12, color: '#e91e63' }
            ];
            
            const barWidth = 60;
            const barSpacing = 20;
            const maxBarHeight = height - 60;
            const startX = (width - (features.length * (barWidth + barSpacing) - barSpacing)) / 2;
            
            // Draw bars
            features.forEach((feature, index) => {
                const x = startX + index * (barWidth + barSpacing);
                const barHeight = feature.importance * maxBarHeight;
                const y = height - barHeight - 30;
                
                // Draw bar
                ctx.fillStyle = feature.color;
                ctx.fillRect(x, y, barWidth, barHeight);
                
                // Draw importance value
                ctx.fillStyle = '#333';
                ctx.font = 'bold 14px Arial';
                ctx.textAlign = 'center';
                ctx.fillText((feature.importance * 100).toFixed(0) + '%', x + barWidth/2, y - 5);
                
                // Draw feature name
                ctx.font = '12px Arial';
                ctx.fillText(feature.name, x + barWidth/2, height - 15);
            });
            
            // Draw title
            ctx.font = 'bold 16px Arial';
            ctx.fillStyle = '#333';
            ctx.textAlign = 'center';
            ctx.fillText('Feature Importance for House Price Prediction', width/2, 20);
        }
        
        setupFeatureSelectionDemo() {
            const checkboxes = document.querySelectorAll('.feature-checkbox-demo');
            const resultDiv = document.getElementById('selection-result');
            
            checkboxes.forEach(checkbox => {
                this.addEventListenerWithCleanup(checkbox, 'change', () => {
                    const selected = Array.from(checkboxes)
                        .filter(cb => cb.checked)
                        .map(cb => cb.dataset.feature);
                    
                    if (selected.length === 0) {
                        resultDiv.innerHTML = '<span style="color: #f44336;">⚠️ Select at least one feature!</span>';
                    } else if (selected.length === 1) {
                        resultDiv.innerHTML = `<span style="color: #ff9800;">Using ${selected.length} feature: May underfit</span>`;
                    } else if (selected.length <= 3) {
                        resultDiv.innerHTML = `<span style="color: #4caf50;">✓ Using ${selected.length} features: Good balance</span>`;
                    } else {
                        resultDiv.innerHTML = `<span style="color: #ff9800;">Using ${selected.length} features: Risk of overfitting</span>`;
                    }
                });
            });
        }
        
        _generateMainContent() {
            return `
                <div style="max-width: 900px; margin: 0 auto; padding: 20px;">
                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 30px; margin-bottom: 30px; text-align: center;">
                        <h1 style="margin: 0 0 10px 0; font-size: 2.5em;">Understanding Training Features</h1>
                        <p style="font-size: 1.2em; opacity: 0.95; margin: 0;">The Building Blocks of Machine Learning Models</p>
                    </div>
                    
                    <!-- What Are Features -->
                    <div style="background: white; border-radius: 12px; padding: 30px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <h2 style="color: #667eea; margin-bottom: 20px;">🎯 What Are Features?</h2>
                        
                        <p style="font-size: 1.1em; line-height: 1.8; color: #555; margin-bottom: 20px;">
                            <strong>Features</strong> are the individual measurable properties or characteristics of the data you're trying to analyze. 
                            Think of them as the <em>ingredients</em> in a recipe – each one contributes something different to the final result.
                        </p>
                        
                        <div style="background: #f5f5f5; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0;">
                            <h3 style="margin-top: 0; color: #333;">House Price Example:</h3>
                            <p style="margin: 10px 0; color: #555;">If you're predicting house prices, your features might include:</p>
                            <ul style="color: #555; line-height: 1.8;">
                                <li><strong>Square footage</strong> - How big is the house?</li>
                                <li><strong>Number of bedrooms</strong> - How many rooms for sleeping?</li>
                                <li><strong>Location</strong> - Where is it located?</li>
                                <li><strong>Age of house</strong> - How old is the building?</li>
                                <li><strong>Garage spaces</strong> - Parking availability</li>
                            </ul>
                            <p style="margin: 10px 0; color: #555;">
                                Each feature provides different information that helps predict the final price. 
                                Some features (like location) might be more important than others (like paint color).
                            </p>
                        </div>
                    </div>
                    
                    <!-- Why Features Matter -->
                    <div style="background: white; border-radius: 12px; padding: 30px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <h2 style="color: #667eea; margin-bottom: 20px;">💡 Why Feature Selection Matters</h2>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                            <div style="background: #e8f5e9; border-radius: 8px; padding: 20px;">
                                <h3 style="color: #2e7d32; margin-top: 0;">✅ Good Features</h3>
                                <ul style="color: #2e7d32; margin: 0; padding-left: 20px;">
                                    <li>Strongly related to what you're predicting</li>
                                    <li>Contain useful information</li>
                                    <li>Are reliably measured</li>
                                    <li>Available for new predictions</li>
                                </ul>
                            </div>
                            
                            <div style="background: #ffebee; border-radius: 8px; padding: 20px;">
                                <h3 style="color: #c62828; margin-top: 0;">❌ Poor Features</h3>
                                <ul style="color: #c62828; margin: 0; padding-left: 20px;">
                                    <li>Unrelated to your target</li>
                                    <li>Too noisy or random</li>
                                    <li>Missing lots of data</li>
                                    <li>Not available for future use</li>
                                </ul>
                            </div>
                        </div>
                        
                        <canvas id="feature-importance-viz" width="500" height="300" style="display: block; margin: 20px auto; border: 1px solid #e0e0e0; border-radius: 8px;"></canvas>
                        
                        <p style="text-align: center; color: #666; font-style: italic;">
                            Not all features are equally important - some have much stronger predictive power!
                        </p>
                    </div>
                    
                    <!-- Too Many vs Too Few -->
                    <div style="background: white; border-radius: 12px; padding: 30px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <h2 style="color: #667eea; margin-bottom: 20px;">⚖️ The Goldilocks Problem: Not Too Many, Not Too Few</h2>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                            <div style="background: #fff3cd; border-radius: 8px; padding: 15px; text-align: center;">
                                <h3 style="color: #856404; margin: 10px 0;">Too Few Features</h3>
                                <div style="font-size: 3em; margin: 10px 0;">📉</div>
                                <p style="color: #856404; margin: 0; font-size: 0.95em;">
                                    <strong>Underfitting:</strong> Model is too simple to capture patterns
                                </p>
                            </div>
                            
                            <div style="background: #e8f5e9; border-radius: 8px; padding: 15px; text-align: center;">
                                <h3 style="color: #2e7d32; margin: 10px 0;">Just Right</h3>
                                <div style="font-size: 3em; margin: 10px 0;">✨</div>
                                <p style="color: #2e7d32; margin: 0; font-size: 0.95em;">
                                    <strong>Good Fit:</strong> Model captures patterns without memorizing
                                </p>
                            </div>
                            
                            <div style="background: #ffebee; border-radius: 8px; padding: 15px; text-align: center;">
                                <h3 style="color: #c62828; margin: 10px 0;">Too Many Features</h3>
                                <div style="font-size: 3em; margin: 10px 0;">📈</div>
                                <p style="color: #c62828; margin: 0; font-size: 0.95em;">
                                    <strong>Overfitting:</strong> Model memorizes training data
                                </p>
                            </div>
                        </div>
                        
                        <div style="background: #f5f5f5; border-radius: 8px; padding: 20px;">
                            <p style="margin: 0 0 10px 0; color: #555; font-weight: bold;">Key Insight:</p>
                            <p style="margin: 0; color: #555; line-height: 1.8;">
                                Using more features isn't always better! Sometimes a simple model with a few well-chosen features 
                                performs better than a complex model with many features. The goal is to find the right balance.
                            </p>
                        </div>
                    </div>
                    
                    <!-- Interactive Demo -->
                    <div style="background: white; border-radius: 12px; padding: 30px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <h2 style="color: #667eea; margin-bottom: 20px;">🎮 Try It: Feature Selection</h2>
                        
                        <p style="color: #555; margin-bottom: 20px;">
                            Imagine you're building a model to predict bike rental demand. Which features would you include?
                        </p>
                        
                        <div id="feature-selection-demo" style="background: #f5f5f5; border-radius: 8px; padding: 20px;">
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                                <label style="display: flex; align-items: center; cursor: pointer;">
                                    <input type="checkbox" class="feature-checkbox-demo" data-feature="temperature" checked style="margin-right: 10px;">
                                    <span>🌡️ Temperature</span>
                                </label>
                                <label style="display: flex; align-items: center; cursor: pointer;">
                                    <input type="checkbox" class="feature-checkbox-demo" data-feature="humidity" checked style="margin-right: 10px;">
                                    <span>💧 Humidity</span>
                                </label>
                                <label style="display: flex; align-items: center; cursor: pointer;">
                                    <input type="checkbox" class="feature-checkbox-demo" data-feature="windspeed" checked style="margin-right: 10px;">
                                    <span>💨 Wind Speed</span>
                                </label>
                                <label style="display: flex; align-items: center; cursor: pointer;">
                                    <input type="checkbox" class="feature-checkbox-demo" data-feature="holiday" style="margin-right: 10px;">
                                    <span>🎉 Holiday</span>
                                </label>
                                <label style="display: flex; align-items: center; cursor: pointer;">
                                    <input type="checkbox" class="feature-checkbox-demo" data-feature="weekday" style="margin-right: 10px;">
                                    <span>📅 Day of Week</span>
                                </label>
                                <label style="display: flex; align-items: center; cursor: pointer;">
                                    <input type="checkbox" class="feature-checkbox-demo" data-feature="season" style="margin-right: 10px;">
                                    <span>🍂 Season</span>
                                </label>
                            </div>
                            
                            <div id="selection-result" style="text-align: center; font-size: 1.1em; font-weight: bold; padding: 10px; background: white; border-radius: 4px;">
                                <span style="color: #4caf50;">✓ Using 3 features: Good balance</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Real World Preview -->
                    <div style="background: linear-gradient(135deg, #4ecdc4 0%, #44a3aa 100%); color: white; border-radius: 12px; padding: 30px; margin-bottom: 20px;">
                        <h2 style="margin-bottom: 20px;">🌍 Coming Up: Real-World Data</h2>
                        
                        <p style="font-size: 1.1em; line-height: 1.8; margin-bottom: 20px;">
                            In the next levels, you'll work with <strong>actual datasets</strong> from the real world:
                        </p>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 20px;">
                                <h3 style="margin-top: 0;">🏠 California Housing</h3>
                                <p style="margin: 10px 0; opacity: 0.95;">
                                    20,640 real estate records with features like income, location, and house age
                                </p>
                                <p style="margin: 0; font-size: 0.9em; opacity: 0.9;">
                                    You'll choose which features to use for predicting house prices!
                                </p>
                            </div>
                            
                            <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 20px;">
                                <h3 style="margin-top: 0;">🚴 Bike Sharing</h3>
                                <p style="margin: 10px 0; opacity: 0.95;">
                                    731 days of bike rental data with weather and seasonal features
                                </p>
                                <p style="margin: 0; font-size: 0.9em; opacity: 0.9;">
                                    Compare simple vs complex models with different feature sets!
                                </p>
                            </div>
                        </div>
                        
                        <p style="font-size: 1.05em; margin-top: 20px; text-align: center; opacity: 0.95;">
                            You'll experiment with feature selection and see firsthand how it affects model performance!
                        </p>
                    </div>
                    
                    <!-- Key Takeaways -->
                    <div style="background: white; border-radius: 12px; padding: 30px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <h2 style="color: #667eea; margin-bottom: 20px;">📚 Key Takeaways</h2>
                        
                        <div style="background: #e3f2fd; border-radius: 8px; padding: 20px;">
                            <ol style="margin: 0; padding-left: 20px; color: #1976d2; line-height: 2;">
                                <li><strong>Features are the inputs</strong> your model uses to make predictions</li>
                                <li><strong>Good features</strong> have strong relationships with what you're predicting</li>
                                <li><strong>Too few features</strong> = underfitting (model is too simple)</li>
                                <li><strong>Too many features</strong> = overfitting (model memorizes instead of learning)</li>
                                <li><strong>Feature selection</strong> is the art of choosing the right features</li>
                                <li><strong>Real-world data</strong> requires careful feature engineering and selection</li>
                            </ol>
                        </div>
                    </div>
                    
                    <!-- Continue Button -->
                    <div style="text-align: center; margin-top: 40px;">
                        <button id="continue-button" style="
                            padding: 15px 40px;
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            color: white;
                            border: none;
                            border-radius: 8px;
                            font-size: 1.2em;
                            font-weight: bold;
                            cursor: pointer;
                            transition: transform 0.2s;
                        " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                            I Understand Features! Continue →
                        </button>
                    </div>
                </div>
                
                <!-- Standard navigation -->
                ${typeof createStandardNavigation === 'function' ? createStandardNavigation() : ''}
            `;
        }
        
        cleanup() {
            super.cleanup();
        }
    }
    
    const level = new TrainingFeaturesExplanationLevel();
    level.create().catch(error => {
        console.error('Failed to create Training Features Explanation:', error);
    });
    
    return level;
};

// Export for modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.createTrainingFeaturesExplanation;
}