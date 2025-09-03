/**
 * Car Pricing Optimization
 * 
 * Interactive level teaching gradient descent by optimizing car prices
 * Students adjust Age and MPG coefficients to minimize pricing error
 */

window.createPizzaProduction = function() {
    
    class CarPricingLevel extends window.InteractiveLevelTemplate {
        constructor() {
            super({
                id: 'car-pricing-optimization',
                name: 'Car Pricing Optimization',
                type: 'interactive',
                description: '',
                targetFunction: { 
                    // Cars with their attributes and ideal prices
                    car1: { mpg: 20, age: 5, optimalPrice: 250 },
                    car2: { mpg: 30, age: 2, optimalPrice: 380 },
                    car3: { mpg: 25, age: 8, optimalPrice: 180 }
                },
                controls: [],
                validation: {
                    tolerance: 0.02,
                    customValidator: function(params, target) {
                        return { success: false };
                    }
                },
                showFormula: false,
                debug: false
            });
            
            // Custom state
            this.ageCoeff = 20;
            this.mpgCoeff = 30;
            this.learningRate = 0.001; // Hard coded, explicitly shown to user
            this.totalError = 0;
            this.carErrors = { car1: 0, car2: 0, car3: 0 };
            this.isAnimating = false;
            this.manualTotalError = 0;
            this.ageUpdate = 0;
            this.mpgUpdate = 0;
            
            // Tutorial state
            this.tutorialStep = 0;
            this.tutorialActive = false;
            this.tutorialElements = [];
        }
        
        async setup() {
            await super.setup();
            
            // Initialize navigation
            if (typeof initializeNavigation === 'function') {
                initializeNavigation('car-pricing-optimization', 'createPizzaProduction');
            }
            
            // Setup custom event handlers
            this._setupCustomHandlers();
            
            // Initialize display
            this._updateTable();
        }
        
        _generateMainContent() {
            return `
                <!-- Info Bubble -->
                <div style="max-width: 900px; margin: 20px auto 2px auto; position: relative;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 20px; padding: 20px 25px; box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3); position: relative;">
                        <div style="color: white; font-size: 1.1rem; line-height: 1.6;">
                            <strong style="font-size: 1.2rem;">Welcome to Car Pricing Optimization!</strong><br>
                            Learn how gradient descent helps us find the perfect pricing formula. Adjust the weights (W_age and W_mpg) to minimize the error between your estimates and the true car prices. 
                            Click "Buy Cars" to see how well your current formula performs, then use gradient descent to improve it!
                        </div>
                    </div>
                </div>
                
                <!-- Main Container -->
                <div style="background: white; border-radius: 20px; padding: 30px; box-shadow: 0 20px 40px rgba(0,0,0,0.2); width: 1500px; max-width: calc(100vw - 40px); margin: 2px auto 20px auto; position: relative;">
                        
                    <!-- Top Section: Gradient Updates and Current Function -->
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; gap: 20px;">
                        
                        <!-- Left: Gradient Updates Container -->
                        <div id="gradient-updates-container" style="background: white; border: 2px solid #e0e0e0; border-radius: 15px; padding: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); width: 500px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                                <h3 style="margin: 0; color: #2c3e50; font-size: 1.1rem;">Gradient Updates</h3>
                                <div style="display: flex; gap: 8px;">
                                    <button id="calculate-update-btn" style="
                                        padding: 6px 12px;
                                        background: linear-gradient(135deg, #3498db, #2980b9);
                                        color: white;
                                        border: none;
                                        border-radius: 6px;
                                        font-size: 0.85rem;
                                        font-weight: bold;
                                        cursor: pointer;
                                        transition: all 0.3s;
                                        opacity: 0.5;
                                        pointer-events: none;
                                    ">
                                        Calculate
                                    </button>
                                    <button id="reset-btn" style="
                                        padding: 6px 12px;
                                        background: linear-gradient(135deg, #bdc3c7, #95a5a6);
                                        color: white;
                                        border: none;
                                        border-radius: 6px;
                                        font-size: 0.85rem;
                                        font-weight: bold;
                                        cursor: pointer;
                                        transition: all 0.3s;
                                    ">
                                        Reset
                                    </button>
                                </div>
                            </div>
                            
                            <!-- W_age update -->
                            <div style="position: relative; margin-bottom: 15px; padding: 18px 10px 10px 10px; background: #f8fbfd; border: 2px solid #3498db; border-radius: 8px;">
                                <!-- Badge label -->
                                <div style="position: absolute; top: -10px; left: 12px; background: #3498db; color: white; padding: 2px 10px; border-radius: 4px; font-weight: bold; font-size: 0.8rem;">
                                    W_age = <span id="wage-badge">${this.ageCoeff}</span>
                                </div>
                                
                                <div style="display: flex; align-items: center; justify-content: center;">
                                    <!-- Table structure -->
                                    <table style="border-collapse: collapse; font-family: monospace;">
                                        <thead>
                                            <tr>
                                                <th style="padding: 4px 6px; text-align: center; font-size: 0.75rem; color: #666; font-weight: normal; border-bottom: 1px solid #ddd;">Current</th>
                                                <th style="padding: 4px 4px; text-align: center; font-size: 0.75rem; color: #666; font-weight: normal; border-bottom: 1px solid #ddd;"></th>
                                                <th style="padding: 4px 6px; text-align: center; font-size: 0.75rem; color: #666; font-weight: normal; border-bottom: 1px solid #ddd;">Error</th>
                                                <th style="padding: 4px 4px; text-align: center; font-size: 0.75rem; color: #666; font-weight: normal; border-bottom: 1px solid #ddd;"></th>
                                                <th style="padding: 4px 6px; text-align: center; font-size: 0.75rem; color: #666; font-weight: normal; border-bottom: 1px solid #ddd;">Σ Age</th>
                                                <th style="padding: 4px 4px; text-align: center; font-size: 0.75rem; color: #666; font-weight: normal; border-bottom: 1px solid #ddd;"></th>
                                                <th style="padding: 4px 6px; text-align: center; font-size: 0.75rem; color: #666; font-weight: normal; border-bottom: 1px solid #ddd;">LR</th>
                                                <th style="padding: 4px 6px; text-align: center; font-size: 0.75rem; color: #666; font-weight: normal;"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style="padding: 4px 6px; text-align: center; font-size: 1rem; color: #2c3e50; font-weight: bold;">
                                                    <span id="age-current">${this.ageCoeff}</span>
                                                </td>
                                                <td style="padding: 4px 4px; text-align: center; font-size: 1rem; color: #2c3e50;">+</td>
                                                <td style="padding: 4px 6px; text-align: center;">
                                                    <input id="age-error-input" type="number" step="any" placeholder="error" style="
                                                        width: 65px;
                                                        padding: 3px;
                                                        border: 2px solid #3498db;
                                                        border-radius: 4px;
                                                        font-family: monospace;
                                                        font-size: 0.9rem;
                                                        text-align: center;
                                                        background: white;
                                                    "/>
                                                </td>
                                                <td style="padding: 4px 4px; text-align: center; font-size: 1rem; color: #2c3e50;">×</td>
                                                <td style="padding: 4px 6px; text-align: center; font-size: 1rem; color: #2c3e50; font-weight: bold;">15</td>
                                                <td style="padding: 4px 4px; text-align: center; font-size: 1rem; color: #2c3e50;">×</td>
                                                <td style="padding: 4px 6px; text-align: center; font-size: 1rem; color: #2c3e50; font-weight: bold;">0.001</td>
                                                <td style="padding: 4px 10px; text-align: center; font-size: 1rem; color: #3498db; font-weight: bold;">
                                                    <span id="age-result"></span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            
                            <!-- W_mpg update -->
                            <div style="position: relative; padding: 18px 10px 10px 10px; background: #f8fdf9; border: 2px solid #27ae60; border-radius: 8px;">
                                <!-- Badge label -->
                                <div style="position: absolute; top: -10px; left: 12px; background: #27ae60; color: white; padding: 2px 10px; border-radius: 4px; font-weight: bold; font-size: 0.8rem;">
                                    W_mpg = <span id="wmpg-badge">${this.mpgCoeff}</span>
                                </div>
                                
                                <div style="display: flex; align-items: center; justify-content: center;">
                                    <!-- Table structure -->
                                    <table style="border-collapse: collapse; font-family: monospace;">
                                        <thead>
                                            <tr>
                                                <th style="padding: 4px 6px; text-align: center; font-size: 0.75rem; color: #666; font-weight: normal; border-bottom: 1px solid #ddd;">Current</th>
                                                <th style="padding: 4px 4px; text-align: center; font-size: 0.75rem; color: #666; font-weight: normal; border-bottom: 1px solid #ddd;"></th>
                                                <th style="padding: 4px 6px; text-align: center; font-size: 0.75rem; color: #666; font-weight: normal; border-bottom: 1px solid #ddd;">Error</th>
                                                <th style="padding: 4px 4px; text-align: center; font-size: 0.75rem; color: #666; font-weight: normal; border-bottom: 1px solid #ddd;"></th>
                                                <th style="padding: 4px 6px; text-align: center; font-size: 0.75rem; color: #666; font-weight: normal; border-bottom: 1px solid #ddd;">Σ MPG</th>
                                                <th style="padding: 4px 4px; text-align: center; font-size: 0.75rem; color: #666; font-weight: normal; border-bottom: 1px solid #ddd;"></th>
                                                <th style="padding: 4px 6px; text-align: center; font-size: 0.75rem; color: #666; font-weight: normal; border-bottom: 1px solid #ddd;">LR</th>
                                                <th style="padding: 4px 6px; text-align: center; font-size: 0.75rem; color: #666; font-weight: normal;"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style="padding: 4px 6px; text-align: center; font-size: 1rem; color: #2c3e50; font-weight: bold;">
                                                    <span id="mpg-current">${this.mpgCoeff}</span>
                                                </td>
                                                <td style="padding: 4px 4px; text-align: center; font-size: 1rem; color: #2c3e50;">+</td>
                                                <td style="padding: 4px 6px; text-align: center;">
                                                    <input id="mpg-error-input" type="number" step="any" placeholder="error" style="
                                                        width: 65px;
                                                        padding: 3px;
                                                        border: 2px solid #27ae60;
                                                        border-radius: 4px;
                                                        font-family: monospace;
                                                        font-size: 0.9rem;
                                                        text-align: center;
                                                        background: white;
                                                    "/>
                                                </td>
                                                <td style="padding: 4px 4px; text-align: center; font-size: 1rem; color: #2c3e50;">×</td>
                                                <td style="padding: 4px 6px; text-align: center; font-size: 1rem; color: #2c3e50; font-weight: bold;">75</td>
                                                <td style="padding: 4px 4px; text-align: center; font-size: 1rem; color: #2c3e50;">×</td>
                                                <td style="padding: 4px 6px; text-align: center; font-size: 1rem; color: #2c3e50; font-weight: bold;">0.001</td>
                                                <td style="padding: 4px 10px; text-align: center; font-size: 1rem; color: #27ae60; font-weight: bold;">
                                                    <span id="mpg-result"></span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Right: Current Function Display and Tutorial Button -->
                        <div style="flex-grow: 1; display: flex; flex-direction: column; gap: 10px;">
                            <!-- Current Function Display -->
                            <div id="current-function-container" style="background: linear-gradient(135deg, #f8f9fa, #e9ecef); border-radius: 15px; padding: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); flex-grow: 1;">
                                <h3 style="margin: 0 0 15px 0; color: #2c3e50; font-size: 1.1rem;">Current Function</h3>
                                <div style="background: white; border-radius: 10px; padding: 15px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);">
                                    <div style="font-family: monospace; font-size: 1.3rem; text-align: center; color: #2c3e50;">
                                        Estimate = 
                                        <span id="function-wage" style="color: #2980b9; font-weight: bold;">${this.ageCoeff}</span>
                                        <span style="color: #666;">×Age</span> + 
                                        <span id="function-wmpg" style="color: #27ae60; font-weight: bold;">${this.mpgCoeff}</span>
                                        <span style="color: #666;">×MPG</span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Apply Gradient Descent Button (moved outside container) -->
                            <button id="apply-gd-btn" style="
                                width: 100%;
                                padding: 12px;
                                background: linear-gradient(135deg, #e74c3c, #c0392b);
                                color: white;
                                border: none;
                                border-radius: 8px;
                                font-size: 1rem;
                                font-weight: bold;
                                cursor: pointer;
                                transition: all 0.3s;
                                box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
                                opacity: 0.5;
                                pointer-events: none;
                            ">
                                Apply Gradient Descent
                            </button>
                            
                            <!-- Tutorial Button -->
                            <button id="tutorial-btn" style="
                                padding: 18px 12px;
                                background: linear-gradient(135deg, #9b59b6, #8e44ad);
                                color: white;
                                border: none;
                                border-radius: 8px;
                                font-size: 0.95rem;
                                font-weight: bold;
                                cursor: pointer;
                                transition: all 0.3s;
                                box-shadow: 0 4px 15px rgba(155, 89, 182, 0.3);
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                gap: 8px;
                            ">
                                <span style="font-size: 1.1rem;">🎓</span>
                                <span>Start Tutorial</span>
                            </button>
                        </div>
                        
                    </div>
                    
                    <!-- Bottom Section: Cars Table and You Character -->
                    <div style="display: flex; gap: 30px; align-items: stretch;">
                        <!-- Table -->
                        <table style="flex-shrink: 0; border-collapse: separate; border-spacing: 0; border: 2px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
                            <thead>
                                <tr style="background: #f5f5f5;">
                                    <th style="padding: 15px; border-right: 1px solid #e0e0e0; font-size: 1.1rem; color: #2c3e50;">Car</th>
                                    <th style="padding: 15px; border-right: 1px solid #e0e0e0; font-size: 1.1rem; color: #2c3e50;">Age</th>
                                    <th style="padding: 15px; border-right: 1px solid #e0e0e0; font-size: 1.1rem; color: #2c3e50;">MPG</th>
                                    <th style="padding: 15px; border-right: 1px solid #e0e0e0; font-size: 1.1rem; color: #2c3e50;">True Cost</th>
                                    <th style="padding: 15px; border-right: 1px solid #e0e0e0; font-size: 1.1rem; color: #2c3e50;">Your Estimate</th>
                                    <th style="padding: 15px; font-size: 1.1rem; color: #2c3e50;">Error</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Car 1 -->
                                <tr id="car1-row" style="background: white; transition: all 0.3s;">
                                    <td style="padding: 15px; border-right: 1px solid #e0e0e0; border-top: 1px solid #e0e0e0;">
                                        <div style="display: flex; align-items: center; gap: 10px;">
                                            <svg width="35" height="20" viewBox="0 0 80 40">
                                                <rect x="10" y="15" width="60" height="20" rx="5" fill="#3498db"/>
                                                <rect x="20" y="8" width="30" height="12" rx="3" fill="#5dade2"/>
                                                <circle cx="25" cy="35" r="5" fill="#333"/>
                                                <circle cx="55" cy="35" r="5" fill="#333"/>
                                            </svg>
                                            <span style="font-weight: bold; color: #2c3e50;">Car 1</span>
                                        </div>
                                    </td>
                                    <td style="padding: 15px; border-right: 1px solid #e0e0e0; border-top: 1px solid #e0e0e0; text-align: center; font-size: 1.1rem;">5</td>
                                    <td style="padding: 15px; border-right: 1px solid #e0e0e0; border-top: 1px solid #e0e0e0; text-align: center; font-size: 1.1rem;">20</td>
                                    <td style="padding: 15px; border-right: 1px solid #e0e0e0; border-top: 1px solid #e0e0e0; text-align: center; font-size: 1.1rem; color: #27ae60; font-weight: bold;">$250</td>
                                    <td id="car1-estimate" style="padding: 15px; border-right: 1px solid #e0e0e0; border-top: 1px solid #e0e0e0; text-align: center; font-family: monospace; font-size: 0.95rem; color: #3498db;">-</td>
                                    <td id="car1-error" style="padding: 15px; border-top: 1px solid #e0e0e0; text-align: center; font-family: monospace; font-size: 0.95rem;">-</td>
                                </tr>
                                
                                <!-- Car 2 -->
                                <tr id="car2-row" style="background: white; transition: all 0.3s;">
                                    <td style="padding: 15px; border-right: 1px solid #e0e0e0; border-top: 1px solid #e0e0e0;">
                                        <div style="display: flex; align-items: center; gap: 10px;">
                                            <svg width="35" height="20" viewBox="0 0 80 40">
                                                <rect x="10" y="15" width="60" height="20" rx="5" fill="#27ae60"/>
                                                <rect x="20" y="8" width="30" height="12" rx="3" fill="#52be80"/>
                                                <circle cx="25" cy="35" r="5" fill="#333"/>
                                                <circle cx="55" cy="35" r="5" fill="#333"/>
                                            </svg>
                                            <span style="font-weight: bold; color: #2c3e50;">Car 2</span>
                                        </div>
                                    </td>
                                    <td style="padding: 15px; border-right: 1px solid #e0e0e0; border-top: 1px solid #e0e0e0; text-align: center; font-size: 1.1rem;">2</td>
                                    <td style="padding: 15px; border-right: 1px solid #e0e0e0; border-top: 1px solid #e0e0e0; text-align: center; font-size: 1.1rem;">30</td>
                                    <td style="padding: 15px; border-right: 1px solid #e0e0e0; border-top: 1px solid #e0e0e0; text-align: center; font-size: 1.1rem; color: #27ae60; font-weight: bold;">$380</td>
                                    <td id="car2-estimate" style="padding: 15px; border-right: 1px solid #e0e0e0; border-top: 1px solid #e0e0e0; text-align: center; font-family: monospace; font-size: 0.95rem; color: #3498db;">-</td>
                                    <td id="car2-error" style="padding: 15px; border-top: 1px solid #e0e0e0; text-align: center; font-family: monospace; font-size: 0.95rem;">-</td>
                                </tr>
                                
                                <!-- Car 3 -->
                                <tr id="car3-row" style="background: white; transition: all 0.3s;">
                                    <td style="padding: 15px; border-right: 1px solid #e0e0e0; border-top: 1px solid #e0e0e0;">
                                        <div style="display: flex; align-items: center; gap: 10px;">
                                            <svg width="35" height="20" viewBox="0 0 80 40">
                                                <rect x="10" y="15" width="60" height="20" rx="5" fill="#e74c3c"/>
                                                <rect x="20" y="8" width="30" height="12" rx="3" fill="#ec7063"/>
                                                <circle cx="25" cy="35" r="5" fill="#333"/>
                                                <circle cx="55" cy="35" r="5" fill="#333"/>
                                            </svg>
                                            <span style="font-weight: bold; color: #2c3e50;">Car 3</span>
                                        </div>
                                    </td>
                                    <td style="padding: 15px; border-right: 1px solid #e0e0e0; border-top: 1px solid #e0e0e0; text-align: center; font-size: 1.1rem;">8</td>
                                    <td style="padding: 15px; border-right: 1px solid #e0e0e0; border-top: 1px solid #e0e0e0; text-align: center; font-size: 1.1rem;">25</td>
                                    <td style="padding: 15px; border-right: 1px solid #e0e0e0; border-top: 1px solid #e0e0e0; text-align: center; font-size: 1.1rem; color: #27ae60; font-weight: bold;">$180</td>
                                    <td id="car3-estimate" style="padding: 15px; border-right: 1px solid #e0e0e0; border-top: 1px solid #e0e0e0; text-align: center; font-family: monospace; font-size: 0.95rem; color: #3498db;">-</td>
                                    <td id="car3-error" style="padding: 15px; border-top: 1px solid #e0e0e0; text-align: center; font-family: monospace; font-size: 0.95rem;">-</td>
                                </tr>
                                
                                <!-- Sum Row -->
                                <tr id="sum-row" style="background: linear-gradient(135deg, #fff9e6, #fffdf4); border-top: 2px solid #f39c12;">
                                    <td style="padding: 15px; border-right: 1px solid #e0e0e0; border-top: 2px solid #f39c12; font-weight: bold; color: #2c3e50;">
                                        <span style="color: #f39c12;">Σ</span> Sum
                                    </td>
                                    <td id="sum-age" style="padding: 15px; border-right: 1px solid #e0e0e0; border-top: 2px solid #f39c12; text-align: center; font-size: 1.1rem; font-weight: bold; color: #f39c12;">15</td>
                                    <td id="sum-mpg" style="padding: 15px; border-right: 1px solid #e0e0e0; border-top: 2px solid #f39c12; text-align: center; font-size: 1.1rem; font-weight: bold; color: #f39c12;">75</td>
                                    <td id="sum-true-cost" style="padding: 15px; border-right: 1px solid #e0e0e0; border-top: 2px solid #f39c12; text-align: center; font-size: 1.1rem; font-weight: bold; color: #f39c12;">$810</td>
                                    <td id="sum-estimate" style="padding: 15px; border-right: 1px solid #e0e0e0; border-top: 2px solid #f39c12; text-align: center; font-size: 1.1rem; font-weight: bold; color: #f39c12;">-</td>
                                    <td id="sum-error" style="padding: 15px; border-top: 2px solid #f39c12; text-align: center; font-size: 1.1rem; font-weight: bold;">-</td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <!-- You Character with Buy Cars button -->
                        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; min-width: 250px;">
                            <div id="appraiser-container" style="
                                width: 200px;
                                height: 200px;
                                background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
                                border-radius: 20px;
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                justify-content: center;
                                box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                                position: relative;
                                overflow: hidden;
                            ">
                                <div style="font-size: 1.1rem; font-weight: bold; color: #2c3e50; margin-bottom: 15px;">You</div>
                                
                                <!-- Animated Person SVG -->
                                <svg width="100" height="120" viewBox="0 0 100 120" id="appraiser-svg">
                                    <!-- Head -->
                                    <circle cx="50" cy="30" r="18" fill="#fdbcb4" stroke="#333" stroke-width="2"/>
                                    <!-- Eyes -->
                                    <circle cx="42" cy="28" r="2" fill="#333"/>
                                    <circle cx="58" cy="28" r="2" fill="#333"/>
                                    <!-- Mouth -->
                                    <path d="M 42 35 Q 50 40 58 35" stroke="#333" stroke-width="2" fill="none" stroke-linecap="round"/>
                                    <!-- Body -->
                                    <rect x="35" y="48" width="30" height="40" rx="5" fill="#4a90e2" stroke="#333" stroke-width="2"/>
                                    <!-- Arms -->
                                    <rect id="left-arm" x="20" y="55" width="15" height="25" rx="5" fill="#fdbcb4" stroke="#333" stroke-width="2" transform-origin="27 55"/>
                                    <rect id="right-arm" x="65" y="55" width="15" height="25" rx="5" fill="#fdbcb4" stroke="#333" stroke-width="2" transform-origin="73 55"/>
                                    <!-- Clipboard -->
                                    <g id="clipboard" opacity="0">
                                        <rect x="70" y="60" width="25" height="35" rx="3" fill="#8b6f47" stroke="#333" stroke-width="1"/>
                                        <rect x="73" y="63" width="19" height="25" fill="white"/>
                                        <line x1="76" y1="68" x2="89" y2="68" stroke="#333" stroke-width="1"/>
                                        <line x1="76" y1="73" x2="89" y2="73" stroke="#333" stroke-width="1"/>
                                        <line x1="76" y1="78" x2="89" y2="78" stroke="#333" stroke-width="1"/>
                                    </g>
                                </svg>
                                
                                <!-- Money animation container -->
                                <div id="money-animation" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; pointer-events: none;"></div>
                            </div>
                            
                            <button id="buy-cars-btn" style="
                                margin-top: 15px;
                                padding: 10px 25px;
                                background: linear-gradient(135deg, #56ab2f, #a8e063);
                                color: white;
                                border: none;
                                border-radius: 8px;
                                font-size: 0.95rem;
                                font-weight: bold;
                                cursor: pointer;
                                transition: all 0.3s;
                                box-shadow: 0 4px 15px rgba(86, 171, 47, 0.3);
                            ">
                                Buy Cars
                            </button>
                        </div>
                    </div>
                    
                </div>
                
                <!-- CRITICAL: Standard navigation -->
                ${typeof createStandardNavigation === 'function' ? createStandardNavigation() : ''}
                
                <style>
                    @keyframes moneyFloat {
                        0% {
                            transform: translateY(0) rotate(0deg);
                            opacity: 1;
                        }
                        100% {
                            transform: translateY(-150px) rotate(360deg);
                            opacity: 0;
                        }
                    }
                    
                    .money-bill {
                        position: absolute;
                        width: 40px;
                        height: 20px;
                        background: linear-gradient(135deg, #85bb65, #6fa855);
                        border: 2px solid #4a7c3c;
                        border-radius: 3px;
                        animation: moneyFloat 1.5s ease-out;
                        font-size: 12px;
                        color: white;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-weight: bold;
                    }
                    
                    @keyframes armWave {
                        0%, 100% { transform: rotate(0deg); }
                        25% { transform: rotate(-20deg); }
                        75% { transform: rotate(20deg); }
                    }
                    
                    .appraising {
                        animation: armWave 1s ease-in-out;
                    }
                    
                    .evaluating {
                        background: linear-gradient(135deg, #fff, #fffbf0) !important;
                        box-shadow: 0 0 20px rgba(243, 156, 18, 0.3) !important;
                    }
                    
                    /* New Tutorial System Styles */
                    /* Simple spotlight using box-shadow for regular elements */
                    .tutorial-spotlight {
                        position: relative !important;
                        z-index: 9999 !important;
                        box-shadow: 
                            0 0 0 3px #ffd700,  /* Golden border */
                            0 0 20px 5px rgba(255, 215, 0, 0.5),  /* Glow effect */
                            0 0 0 9999px rgba(0, 0, 0, 0.7) !important;  /* Dark overlay everywhere else */
                        animation: tutorialPulse 2s infinite;
                        border-radius: inherit;  /* Preserve element's border radius */
                    }
                    
                    /* Secondary spotlight for multi-cell highlights (no overlay) */
                    .tutorial-spotlight-secondary {
                        position: relative !important;
                        z-index: 9999 !important;
                        box-shadow: 
                            0 0 0 3px #ffd700,  /* Golden border */
                            0 0 20px 5px rgba(255, 215, 0, 0.5) !important;  /* Glow effect */
                        animation: tutorialPulse 2s infinite;
                        border-radius: inherit;
                    }
                    
                    .tutorial-message {
                        position: fixed !important;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        padding: 20px 25px;
                        border-radius: 12px;
                        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
                        z-index: 10000 !important;
                        max-width: 350px;
                        animation: slideIn 0.4s ease-out;
                    }
                    
                    @keyframes resultPulse {
                        0%, 100% { 
                            transform: scale(1);
                            filter: brightness(1);
                        }
                        50% { 
                            transform: scale(1.15);
                            filter: brightness(1.3);
                        }
                    }
                    
                    @keyframes buttonPulse {
                        0%, 100% { 
                            box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.7), 0 4px 15px rgba(0, 0, 0, 0.3);
                            transform: scale(1);
                        }
                        50% { 
                            box-shadow: 0 0 30px 15px rgba(255, 215, 0, 0.8), 0 4px 15px rgba(0, 0, 0, 0.3);
                            transform: scale(1.08);
                        }
                    }
                    
                    @keyframes tutorialPulse {
                        0%, 100% { 
                            box-shadow: 
                                0 0 0 3px #ffd700,
                                0 0 20px 5px rgba(255, 215, 0, 0.5),
                                0 0 0 9999px rgba(0, 0, 0, 0.7);
                        }
                        50% { 
                            box-shadow: 
                                0 0 0 3px #ffed4e,
                                0 0 40px 15px rgba(255, 215, 0, 0.8),
                                0 0 0 9999px rgba(0, 0, 0, 0.7);
                        }
                    }
                    
                    @keyframes slideIn {
                        from { 
                            opacity: 0;
                            transform: translateY(-20px);
                        }
                        to { 
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    
                    @keyframes tableColumnPulse {
                        0%, 100% { 
                            box-shadow: 
                                0 0 0 3px #ffd700,
                                0 0 20px 5px rgba(255, 215, 0, 0.5);
                        }
                        50% { 
                            box-shadow: 
                                0 0 0 3px #ffed4e,
                                0 0 40px 15px rgba(255, 215, 0, 0.8);
                        }
                    }
                    
                    .tutorial-message h3 {
                        margin: 0 0 12px 0;
                        font-size: 1.2rem;
                        font-weight: bold;
                    }
                    
                    .tutorial-message p {
                        margin: 0 0 15px 0;
                        font-size: 1rem;
                        line-height: 1.5;
                    }
                    
                    .tutorial-message-buttons {
                        display: flex;
                        gap: 10px;
                        justify-content: flex-end;
                    }
                    
                    .tutorial-message button {
                        padding: 8px 16px;
                        border: none;
                        border-radius: 6px;
                        font-weight: bold;
                        cursor: pointer;
                        transition: all 0.3s;
                        font-size: 0.9rem;
                    }
                    
                    .tutorial-next {
                        background: white;
                        color: #764ba2;
                    }
                    
                    .tutorial-next:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                    }
                    
                    .tutorial-skip {
                        background: rgba(255, 255, 255, 0.2);
                        color: white;
                    }
                    
                    .tutorial-skip:hover {
                        background: rgba(255, 255, 255, 0.3);
                    }
                </style>
            `;
        }
        
        _setupCustomHandlers() {
            // Buy Cars button
            const buyBtn = document.getElementById('buy-cars-btn');
            if (buyBtn) {
                this.addEventListenerWithCleanup(buyBtn, 'click', () => {
                    this._buyCars();
                });
            }
            
            // Calculate Update button
            const calcBtn = document.getElementById('calculate-update-btn');
            if (calcBtn) {
                this.addEventListenerWithCleanup(calcBtn, 'click', () => {
                    this._calculateUpdate();
                });
            }
            
            // Apply GD button
            const applyBtn = document.getElementById('apply-gd-btn');
            if (applyBtn) {
                this.addEventListenerWithCleanup(applyBtn, 'click', () => {
                    this._applyGradientDescent();
                });
            }
            
            // Reset button
            const resetBtn = document.getElementById('reset-btn');
            if (resetBtn) {
                this.addEventListenerWithCleanup(resetBtn, 'click', () => this._reset());
            }
            
            // Tutorial button
            const tutorialBtn = document.getElementById('tutorial-btn');
            if (tutorialBtn) {
                this.addEventListenerWithCleanup(tutorialBtn, 'click', () => this._startTutorial());
            }
            
            // Error input handlers
            const ageErrorInput = document.getElementById('age-error-input');
            const mpgErrorInput = document.getElementById('mpg-error-input');
            
            if (ageErrorInput) {
                this.addEventListenerWithCleanup(ageErrorInput, 'input', () => this._checkCalculateButtonState());
            }
            
            if (mpgErrorInput) {
                this.addEventListenerWithCleanup(mpgErrorInput, 'input', () => this._checkCalculateButtonState());
            }
            
            // Update displays
            this._updateTable();
            this._updateCoeffDisplay();
        }
        
        _checkCalculateButtonState() {
            const ageErrorInput = document.getElementById('age-error-input');
            const mpgErrorInput = document.getElementById('mpg-error-input');
            const calcBtn = document.getElementById('calculate-update-btn');
            
            if (ageErrorInput && mpgErrorInput && calcBtn) {
                const ageValue = ageErrorInput.value.trim();
                const mpgValue = mpgErrorInput.value.trim();
                
                // Enable button only if both errors are entered
                if (ageValue !== '' && mpgValue !== '') {
                    calcBtn.style.opacity = '1';
                    calcBtn.style.pointerEvents = 'auto';
                } else {
                    calcBtn.style.opacity = '0.5';
                    calcBtn.style.pointerEvents = 'none';
                }
            }
        }
        
        _calculatePrice(mpg, age) {
            return this.ageCoeff * age + this.mpgCoeff * mpg;
        }
        
        _updateTable() {
            const cars = [
                { id: 'car1', mpg: 20, age: 5, optimal: 250 },
                { id: 'car2', mpg: 30, age: 2, optimal: 380 },
                { id: 'car3', mpg: 25, age: 8, optimal: 180 }
            ];
            
            let totalEstimate = 0;
            let totalError = 0;
            
            cars.forEach(car => {
                const price = this._calculatePrice(car.mpg, car.age);
                const error = price - car.optimal;
                totalEstimate += price;
                totalError += error;
                
                // Note: Coefficient displays are updated separately
                
                // Update estimate cell with colored coefficients
                const estimateEl = document.getElementById(`${car.id}-estimate`);
                if (estimateEl) {
                    estimateEl.innerHTML = `${car.age}×<span style="color: #2980b9; font-weight: bold;">${this.ageCoeff.toFixed(0)}</span> + ${car.mpg}×<span style="color: #27ae60; font-weight: bold;">${this.mpgCoeff.toFixed(0)}</span> = <strong>${price.toFixed(0)}</strong>`;
                }
                
                // Update error cell with calculation
                const errorEl = document.getElementById(`${car.id}-error`);
                if (errorEl) {
                    errorEl.innerHTML = `${price.toFixed(0)} - ${car.optimal} = <strong>${error > 0 ? '+' : ''}${error.toFixed(0)}</strong>`;
                    errorEl.style.color = Math.abs(error) < 20 ? '#27ae60' : 
                                         Math.abs(error) < 50 ? '#f39c12' : '#e74c3c';
                }
            });
            
            // Update sum row
            const sumEstimateEl = document.getElementById('sum-estimate');
            if (sumEstimateEl) {
                sumEstimateEl.innerHTML = `<strong>${totalEstimate.toFixed(0)}</strong>`;
            }
            
            const sumErrorEl = document.getElementById('sum-error');
            if (sumErrorEl) {
                sumErrorEl.innerHTML = `<strong>${totalError > 0 ? '+' : ''}${totalError.toFixed(0)}</strong>`;
                sumErrorEl.style.color = Math.abs(totalError) < 30 ? '#27ae60' : 
                                        Math.abs(totalError) < 100 ? '#f39c12' : '#e74c3c';
            }
            
            // Update coefficient displays in badges and function display
            const wageBadge = document.getElementById('wage-badge');
            if (wageBadge) {
                wageBadge.textContent = this.ageCoeff.toFixed(1);
            }
            
            const wmpgBadge = document.getElementById('wmpg-badge');
            if (wmpgBadge) {
                wmpgBadge.textContent = this.mpgCoeff.toFixed(1);
            }
            
            const functionWage = document.getElementById('function-wage');
            if (functionWage) {
                functionWage.textContent = this.ageCoeff.toFixed(1);
            }
            
            const functionWmpg = document.getElementById('function-wmpg');
            if (functionWmpg) {
                functionWmpg.textContent = this.mpgCoeff.toFixed(1);
            }
        }
        
        async _buyCars() {
            if (this.isAnimating) return;
            this.isAnimating = true;
            
            const cars = [
                { id: 'car1', mpg: 20, age: 5, optimal: 250 },
                { id: 'car2', mpg: 30, age: 2, optimal: 380 },
                { id: 'car3', mpg: 25, age: 8, optimal: 180 }
            ];
            
            this.totalError = 0;
            
            // Simply calculate errors for each car without animation
            cars.forEach(car => {
                const price = this._calculatePrice(car.mpg, car.age);
                const signedError = price - car.optimal;
                this.carErrors[car.id] = signedError;
                this.totalError += signedError;
            });
            
            // Update the table to show calculations
            this._updateTable();
            
            // Auto-fill error inputs with the calculated total error
            const ageErrorInput = document.getElementById('age-error-input');
            const mpgErrorInput = document.getElementById('mpg-error-input');
            if (ageErrorInput && mpgErrorInput) {
                ageErrorInput.value = this.totalError.toFixed(0);
                mpgErrorInput.value = this.totalError.toFixed(0);
                this._checkCalculateButtonState();
            }
            
            this.isAnimating = false;
            
            // Check for success
            const absTotal = Math.abs(this.carErrors.car1) + Math.abs(this.carErrors.car2) + Math.abs(this.carErrors.car3);
            if (absTotal < 30) {
                this.completeLevel({
                    score: 100,
                    message: 'Perfect pricing formula!'
                });
            }
        }
        
        _calculateUpdate() {
            const ageErrorInput = document.getElementById('age-error-input');
            const mpgErrorInput = document.getElementById('mpg-error-input');
            
            if (!ageErrorInput || !mpgErrorInput) return;
            
            const ageError = parseFloat(ageErrorInput.value) || 0;
            const mpgError = parseFloat(mpgErrorInput.value) || 0;
            
            // Calculate updates
            const ageSum = 15; // 5 + 2 + 8
            const mpgSum = 75; // 20 + 30 + 25
            
            // For age coefficient
            const ageSign = ageError > 0 ? -1 : 1;
            const absAgeError = Math.abs(ageError);
            this.ageUpdate = ageSign * absAgeError * ageSum * this.learningRate;
            
            // For mpg coefficient
            const mpgSign = mpgError > 0 ? -1 : 1;
            const absMpgError = Math.abs(mpgError);
            this.mpgUpdate = mpgSign * absMpgError * mpgSum * this.learningRate;
            
            // Update age result display
            const ageResult = document.getElementById('age-result');
            if (ageResult) {
                const newAgeValue = this.ageCoeff + this.ageUpdate;
                ageResult.innerHTML = `= ${newAgeValue.toFixed(3)}`;
            }
            
            // Update mpg result display
            const mpgResult = document.getElementById('mpg-result');
            if (mpgResult) {
                const newMpgValue = this.mpgCoeff + this.mpgUpdate;
                mpgResult.innerHTML = `= ${newMpgValue.toFixed(3)}`;
            }
            
            // Enable Apply GD button
            const applyBtn = document.getElementById('apply-gd-btn');
            if (applyBtn) {
                applyBtn.style.opacity = '1';
                applyBtn.style.pointerEvents = 'auto';
            }
        }
        
        _applyGradientDescent() {
            // Apply the calculated updates
            this.ageCoeff = Math.max(0, Math.min(100, this.ageCoeff + this.ageUpdate));
            this.mpgCoeff = Math.max(0, Math.min(100, this.mpgCoeff + this.mpgUpdate));
            
            // Update displays
            this._updateTable();
            this._updateCoeffDisplay();
            
            // Clear the error inputs and results
            const ageErrorInput = document.getElementById('age-error-input');
            const mpgErrorInput = document.getElementById('mpg-error-input');
            const ageResult = document.getElementById('age-result');
            const mpgResult = document.getElementById('mpg-result');
            
            if (ageErrorInput) ageErrorInput.value = '';
            if (mpgErrorInput) mpgErrorInput.value = '';
            if (ageResult) ageResult.innerHTML = '';
            if (mpgResult) mpgResult.innerHTML = '';
            
            // Disable both buttons again
            const calcBtn = document.getElementById('calculate-update-btn');
            const applyBtn = document.getElementById('apply-gd-btn');
            
            if (calcBtn) {
                calcBtn.style.opacity = '0.5';
                calcBtn.style.pointerEvents = 'none';
            }
            
            if (applyBtn) {
                applyBtn.style.opacity = '0.5';
                applyBtn.style.pointerEvents = 'none';
            }
        }
        
        _updateCoeffDisplay() {
            const ageCurrent = document.getElementById('age-current');
            if (ageCurrent) {
                ageCurrent.textContent = this.ageCoeff.toFixed(1);
            }
            
            const mpgCurrent = document.getElementById('mpg-current');
            if (mpgCurrent) {
                mpgCurrent.textContent = this.mpgCoeff.toFixed(1);
            }
            
            // Also update the badge displays and function display
            const wageBadge = document.getElementById('wage-badge');
            if (wageBadge) {
                wageBadge.textContent = this.ageCoeff.toFixed(1);
            }
            
            const wmpgBadge = document.getElementById('wmpg-badge');
            if (wmpgBadge) {
                wmpgBadge.textContent = this.mpgCoeff.toFixed(1);
            }
            
            const functionWage = document.getElementById('function-wage');
            if (functionWage) {
                functionWage.textContent = this.ageCoeff.toFixed(1);
            }
            
            const functionWmpg = document.getElementById('function-wmpg');
            if (functionWmpg) {
                functionWmpg.textContent = this.mpgCoeff.toFixed(1);
            }
        }
        
        _animateMoney(amount) {
            const container = document.getElementById('money-animation');
            if (!container) return;
            
            const numBills = Math.min(5, Math.ceil(amount / 100));
            
            for (let i = 0; i < numBills; i++) {
                setTimeout(() => {
                    const bill = document.createElement('div');
                    bill.className = 'money-bill';
                    bill.textContent = '$';
                    bill.style.left = `${80 + Math.random() * 40}px`;
                    bill.style.bottom = '20px';
                    container.appendChild(bill);
                    
                    setTimeout(() => bill.remove(), 1500);
                }, i * 100);
            }
        }
        
        _reset() {
            this.ageCoeff = 20;
            this.mpgCoeff = 30;
            this.totalError = 0;
            this.manualTotalError = 0;
            this.ageUpdate = 0;
            this.mpgUpdate = 0;
            this.carErrors = { car1: 0, car2: 0, car3: 0 };
            
            // Reset displays
            this._updateTable();
            this._updateCoeffDisplay();
            
            // Clear error inputs and results
            const ageErrorInput = document.getElementById('age-error-input');
            const mpgErrorInput = document.getElementById('mpg-error-input');
            const ageResult = document.getElementById('age-result');
            const mpgResult = document.getElementById('mpg-result');
            
            if (ageErrorInput) ageErrorInput.value = '';
            if (mpgErrorInput) mpgErrorInput.value = '';
            if (ageResult) ageResult.innerHTML = '';
            if (mpgResult) mpgResult.innerHTML = '';
            
            // Reset button states
            const calcBtn = document.getElementById('calculate-update-btn');
            const applyBtn = document.getElementById('apply-gd-btn');
            
            if (calcBtn) {
                calcBtn.style.opacity = '0.5';
                calcBtn.style.pointerEvents = 'none';
            }
            
            if (applyBtn) {
                applyBtn.style.opacity = '0.5';
                applyBtn.style.pointerEvents = 'none';
            }
        }
        
        _delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        
        _startTutorial() {
            if (this.tutorialActive) return;
            
            this.tutorialActive = true;
            this.tutorialStep = 0;
            this.tutorialElements = [];
            
            // Create initial overlay to dim everything
            this._addOverlay();
            
            // Show first step
            this._showTutorialStep1();
        }
        
        _showTutorialStep1() {
            this.tutorialStep = 1;
            this._clearHighlights();
            
            const buyBtn = document.getElementById('buy-cars-btn');
            if (!buyBtn) return;
            
            // Immediately spotlight the button
            this._addSpotlight(buyBtn);
            
            // Add golden border and pulse animation to the button
            buyBtn.dataset.originalBorder = buyBtn.style.border || 'none';
            buyBtn.dataset.originalAnimation = buyBtn.style.animation || 'none';
            buyBtn.style.border = '3px solid #ffd700';
            buyBtn.style.animation = 'buttonPulse 2s infinite';
            
            // Create message without "Got it" button
            const message = this._createTutorialMessageNoButton(
                'Step 1: Buy Cars',
                'Click the "Buy Cars" button to evaluate your pricing formula.',
                buyBtn
            );
            
            this.tutorialElements.push(message);
            
            // Wait for user to click the highlighted button
            const clickHandler = async () => {
                console.log('Buy Cars clicked in tutorial');
                
                // Remove the temporary click handler
                buyBtn.removeEventListener('click', clickHandler, true);
                
                // Remove golden border and animation
                buyBtn.style.border = buyBtn.dataset.originalBorder === 'none' ? '' : buyBtn.dataset.originalBorder;
                buyBtn.style.animation = buyBtn.dataset.originalAnimation === 'none' ? '' : buyBtn.dataset.originalAnimation;
                delete buyBtn.dataset.originalBorder;
                delete buyBtn.dataset.originalAnimation;
                
                // Remove message and spotlight
                message.remove();
                this._removeSpotlight(buyBtn);
                
                // Actually run the buy cars function
                await this._buyCars();
                
                // Move to step 2 immediately
                this._showTutorialStep2();
            };
            
            buyBtn.addEventListener('click', clickHandler, true);
        }
        
        _showTutorialStep2() {
            console.log('Showing Your Estimate column');
            this.tutorialStep = 2;
            this._clearHighlights();
            
            // Get the main table (not the ones in gradient updates)
            const mainTable = document.querySelector('table[style*="border-collapse: separate"]');
            if (!mainTable) return;
            
            // Get all estimate cells to spotlight from the main table only
            const estimateCells = [
                mainTable.querySelector('thead tr th:nth-child(5)'), // Header
                document.getElementById('car1-estimate'),
                document.getElementById('car2-estimate'),
                document.getElementById('car3-estimate'),
                document.getElementById('sum-estimate')
            ].filter(el => el);
            
            if (estimateCells.length === 0) return;
            
            // Use table column spotlight for table cells
            this._addTableColumnSpotlight(estimateCells);
            
            const message = this._createTutorialMessage(
                'Your Estimate',
                'This column shows how much you paid for each car using your formula.',
                estimateCells[0],
                () => {
                    message.remove();
                    this._removeTableColumnSpotlight(estimateCells);
                    this._showTutorialStep3();
                }
            );
            
            this.tutorialElements.push(message);
        }
        
        _showTutorialStep3() {
            console.log('Showing Current Function');
            this.tutorialStep = 3;
            this._clearHighlights();
            
            const functionContainer = document.getElementById('current-function-container');
            
            if (!functionContainer) return;
            
            // Spotlight the function container
            this._addSpotlight(functionContainer);
            
            const message = this._createTutorialMessage(
                'Your Pricing Formula',
                'This is how you decided how much to spend.',
                functionContainer,
                () => {
                    message.remove();
                    this._removeSpotlight(functionContainer);
                    this._showTutorialStep4();
                }
            );
            
            this.tutorialElements.push(message);
        }
        
        _showTutorialStep4() {
            console.log('Showing Error column');
            this.tutorialStep = 4;
            this._clearHighlights();
            
            // Get the main table (not the ones in gradient updates)
            const mainTable = document.querySelector('table[style*="border-collapse: separate"]');
            if (!mainTable) return;
            
            // Get all error cells to spotlight from the main table only
            const errorCells = [
                mainTable.querySelector('thead tr th:nth-child(6)'), // Header
                document.getElementById('car1-error'),
                document.getElementById('car2-error'),
                document.getElementById('car3-error'),
                document.getElementById('sum-error')
            ].filter(el => el);
            
            if (errorCells.length === 0) return;
            
            // Use table column spotlight for table cells
            this._addTableColumnSpotlight(errorCells);
            
            const message = this._createTutorialMessage(
                'Your Errors',
                'This column shows how far off your estimates were from the true costs.',
                errorCells[0],
                () => {
                    message.remove();
                    this._removeTableColumnSpotlight(errorCells);
                    this._showTutorialStep5();
                }
            );
            
            this.tutorialElements.push(message);
        }
        
        _showTutorialStep5() {
            console.log('Showing Gradient Updates container');
            this.tutorialStep = 5;
            this._clearHighlights();
            
            const gradientContainer = document.getElementById('gradient-updates-container');
            const calcBtn = document.getElementById('calculate-update-btn');
            
            if (!gradientContainer || !calcBtn) return;
            
            // Spotlight the gradient container
            this._addSpotlight(gradientContainer);
            
            // Add golden border and pulse animation to the calculate button
            calcBtn.dataset.originalBorder = calcBtn.style.border || 'none';
            calcBtn.dataset.originalAnimation = calcBtn.style.animation || 'none';
            calcBtn.style.border = '3px solid #ffd700';
            calcBtn.style.animation = 'buttonPulse 2s infinite';
            
            // Create message without "Got it" button since user needs to interact with inputs
            const message = this._createTutorialMessageNoButton(
                'Calculate the Update',
                'Enter the total error and then click Calculate. This formula will determine how much to change our multipliers.',
                gradientContainer
            );
            
            this.tutorialElements.push(message);
            
            // Wait for user to click calculate
            const clickHandler = () => {
                console.log('Calculate clicked');
                calcBtn.removeEventListener('click', clickHandler, true);
                
                // Remove golden border and animation
                calcBtn.style.border = calcBtn.dataset.originalBorder === 'none' ? '' : calcBtn.dataset.originalBorder;
                calcBtn.style.animation = calcBtn.dataset.originalAnimation === 'none' ? '' : calcBtn.dataset.originalAnimation;
                delete calcBtn.dataset.originalBorder;
                delete calcBtn.dataset.originalAnimation;
                
                // Remove message and spotlight
                message.remove();
                this._removeSpotlight(gradientContainer);
                
                // Actually run the calculate function
                this._calculateUpdate();
                
                // Move to step 6 immediately
                this._showTutorialStep6();
            };
            calcBtn.addEventListener('click', clickHandler, true);
        }
        
        _showTutorialStep6() {
            console.log('Showing calculation results');
            this.tutorialStep = 6;
            this._clearHighlights();
            
            const gradientContainer = document.getElementById('gradient-updates-container');
            const ageResult = document.getElementById('age-result');
            const mpgResult = document.getElementById('mpg-result');
            
            if (!gradientContainer || !ageResult || !mpgResult) return;
            
            // Keep gradient container spotlighted
            this._addSpotlight(gradientContainer);
            
            // Store original styles
            this.ageResultOriginalStyle = ageResult.getAttribute('style') || '';
            this.mpgResultOriginalStyle = mpgResult.getAttribute('style') || '';
            
            // Add special highlighting to the result values
            ageResult.style.cssText += `
                color: #3498db !important;
                font-weight: bold !important;
                text-shadow: 0 0 10px rgba(52, 152, 219, 0.5) !important;
                animation: resultPulse 2s infinite !important;
                padding: 4px 8px !important;
                border: 2px solid #3498db !important;
                border-radius: 4px !important;
                background: rgba(52, 152, 219, 0.1) !important;
                box-shadow: 0 0 15px rgba(52, 152, 219, 0.4) !important;
                display: inline-block !important;
            `;
            
            mpgResult.style.cssText += `
                color: #27ae60 !important;
                font-weight: bold !important;
                text-shadow: 0 0 10px rgba(39, 174, 96, 0.5) !important;
                animation: resultPulse 2s infinite !important;
                padding: 4px 8px !important;
                border: 2px solid #27ae60 !important;
                border-radius: 4px !important;
                background: rgba(39, 174, 96, 0.1) !important;
                box-shadow: 0 0 15px rgba(39, 174, 96, 0.4) !important;
                display: inline-block !important;
            `;
            
            const message = this._createTutorialMessage(
                'Calculated Updates',
                'Here are the results of the gradient descent calculation. These values show how much to adjust each weight.',
                gradientContainer,
                () => {
                    // Restore original styles
                    ageResult.setAttribute('style', this.ageResultOriginalStyle);
                    mpgResult.setAttribute('style', this.mpgResultOriginalStyle);
                    
                    message.remove();
                    this._removeSpotlight(gradientContainer);
                    this._showTutorialStep7();
                }
            );
            
            this.tutorialElements.push(message);
        }
        
        _showTutorialStep7() {
            console.log('Showing Apply Gradient Descent');
            this.tutorialStep = 7;
            this._clearHighlights();
            
            const gradientContainer = document.getElementById('gradient-updates-container');
            const functionContainer = document.getElementById('current-function-container');
            const applyBtn = document.getElementById('apply-gd-btn');
            
            if (!gradientContainer || !functionContainer || !applyBtn) return;
            
            // Spotlight both the gradient container (to show what's being applied) and function container (to show what will change)
            this._addSpotlight(gradientContainer);
            functionContainer.classList.add('tutorial-spotlight-secondary');
            applyBtn.classList.add('tutorial-spotlight-secondary');
            
            // Add golden border and pulse animation to the apply button
            applyBtn.dataset.originalBorder = applyBtn.style.border || 'none';
            applyBtn.dataset.originalAnimation = applyBtn.style.animation || 'none';
            applyBtn.style.border = '3px solid #ffd700';
            applyBtn.style.animation = 'buttonPulse 2s infinite';
            
            // Create message without "Got it" button
            const message = this._createTutorialMessageNoButton(
                'Apply the Update',
                'Click "Apply Gradient Descent" to update your function with the calculated changes shown on the left.',
                applyBtn
            );
            
            // Force the message to appear below the button
            const btnRect = applyBtn.getBoundingClientRect();
            let left = btnRect.left + (btnRect.width / 2) - 175; // Center under button (175 = half of 350px max-width)
            let top = btnRect.bottom + 20; // 20px below the button
            
            // Ensure message stays on screen
            if (left < 10) left = 10;
            if (left + 350 > window.innerWidth - 10) left = window.innerWidth - 360;
            if (top + 200 > window.innerHeight - 10) {
                // If not enough space below, position above the button instead
                top = btnRect.top - 220;
            }
            
            message.style.left = `${left}px`;
            message.style.top = `${top}px`;
            
            this.tutorialElements.push(message);
            
            // Wait for apply button click
            const clickHandler = () => {
                console.log('Apply clicked, ending tutorial');
                applyBtn.removeEventListener('click', clickHandler, true);
                
                // Remove golden border and animation
                applyBtn.style.border = applyBtn.dataset.originalBorder === 'none' ? '' : applyBtn.dataset.originalBorder;
                applyBtn.style.animation = applyBtn.dataset.originalAnimation === 'none' ? '' : applyBtn.dataset.originalAnimation;
                delete applyBtn.dataset.originalBorder;
                delete applyBtn.dataset.originalAnimation;
                
                // Remove message and spotlights
                message.remove();
                this._removeSpotlight(gradientContainer);
                functionContainer.classList.remove('tutorial-spotlight-secondary');
                applyBtn.classList.remove('tutorial-spotlight-secondary');
                
                // Actually apply the gradient descent
                this._applyGradientDescent();
                
                // Show step 8 immediately
                this._showTutorialStep8();
            };
            applyBtn.addEventListener('click', clickHandler, true);
        }
        
        _showTutorialStep8() {
            console.log('Showing improved estimates');
            this.tutorialStep = 8;
            this._clearHighlights();
            
            const functionContainer = document.getElementById('current-function-container');
            
            // Get all estimate cells to spotlight from the main table
            const estimateCells = [
                document.querySelector('table[style*="border-collapse: separate"] thead tr th:nth-child(5)'), // Header
                document.getElementById('car1-estimate'),
                document.getElementById('car2-estimate'),
                document.getElementById('car3-estimate'),
                document.getElementById('sum-estimate')
            ].filter(el => el);
            
            if (!functionContainer || estimateCells.length === 0) return;
            
            // Spotlight the function container
            this._addSpotlight(functionContainer);
            
            // Also highlight the estimate column using the clone method
            this._addTableColumnSpotlight(estimateCells);
            
            const message = this._createTutorialMessage(
                'Improved Function',
                'We\'ve updated the function weights! Check the "Your Estimate" column - the values should now be closer to the true costs.',
                functionContainer,
                () => {
                    message.remove();
                    this._removeSpotlight(functionContainer);
                    this._removeTableColumnSpotlight(estimateCells);
                    this._showTutorialComplete();
                }
            );
            
            this.tutorialElements.push(message);
        }
        
        _showTutorialComplete() {
            console.log('Tutorial complete');
            this._clearHighlights();
            
            // Show final message
            const message = document.createElement('div');
            message.className = 'tutorial-message';
            message.innerHTML = `
                <h3>Tutorial Complete! 🎉</h3>
                <p>Repeat these steps to find the optimal function.</p>
                <div class="tutorial-message-buttons">
                    <button class="tutorial-next" id="tutorial-finish">Finish</button>
                </div>
            `;
            
            // Center the message
            message.style.left = '50%';
            message.style.top = '50%';
            message.style.transform = 'translate(-50%, -50%)';
            document.body.appendChild(message);
            this.tutorialElements.push(message);
            
            // Add finish handler
            const finishBtn = message.querySelector('#tutorial-finish');
            if (finishBtn) {
                finishBtn.addEventListener('click', () => this._endTutorial());
            }
        }
        
        _clearHighlights() {
            // Remove spotlight classes from all elements
            document.querySelectorAll('.tutorial-spotlight').forEach(el => {
                el.classList.remove('tutorial-spotlight');
            });
            
            // Remove any cloned cells if they exist
            if (this.clonedCells) {
                // Remove scroll and resize handlers first
                if (this.scrollHandler) {
                    window.removeEventListener('scroll', this.scrollHandler, true);
                    this.scrollHandler = null;
                }
                
                if (this.resizeHandler) {
                    window.removeEventListener('resize', this.resizeHandler);
                    this.resizeHandler = null;
                }
                
                // Remove clones
                this.clonedCells.forEach(clone => {
                    if (clone && clone.parentNode) {
                        clone.remove();
                    }
                });
                this.clonedCells = [];
                this.originalCells = null;
            }
            
            // Restore visibility to any hidden table cells
            const mainTable = document.querySelector('table[style*="border-collapse: separate"]');
            if (mainTable) {
                const allCells = mainTable.querySelectorAll('td, th');
                allCells.forEach(cell => {
                    if (cell.style.visibility === 'hidden') {
                        cell.style.visibility = '';
                    }
                });
            }
            
            // Remove any button highlights and animations
            ['buy-cars-btn', 'calculate-update-btn', 'apply-gd-btn'].forEach(btnId => {
                const btn = document.getElementById(btnId);
                if (btn && btn.dataset.originalBorder !== undefined) {
                    btn.style.border = btn.dataset.originalBorder === 'none' ? '' : btn.dataset.originalBorder;
                    btn.style.animation = btn.dataset.originalAnimation === 'none' ? '' : btn.dataset.originalAnimation;
                    delete btn.dataset.originalBorder;
                    delete btn.dataset.originalAnimation;
                }
            });
            
            // Clean up any result highlights from step 6
            const ageResult = document.getElementById('age-result');
            const mpgResult = document.getElementById('mpg-result');
            if (ageResult && this.ageResultOriginalStyle !== undefined) {
                ageResult.setAttribute('style', this.ageResultOriginalStyle || '');
            }
            if (mpgResult && this.mpgResultOriginalStyle !== undefined) {
                mpgResult.setAttribute('style', this.mpgResultOriginalStyle || '');
            }
            
            // Remove secondary spotlight class
            document.querySelectorAll('.tutorial-spotlight-secondary').forEach(el => {
                el.classList.remove('tutorial-spotlight-secondary');
            });
        }
        
        _addOverlay() {
            if (!this.tutorialOverlay) {
                this.tutorialOverlay = document.createElement('div');
                this.tutorialOverlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.7);
                    z-index: 9998;
                    pointer-events: none;
                `;
                document.body.appendChild(this.tutorialOverlay);
            }
        }
        
        _removeOverlay() {
            if (this.tutorialOverlay) {
                this.tutorialOverlay.remove();
                this.tutorialOverlay = null;
            }
        }
        
        _addSpotlight(element) {
            if (!element) return;
            this._removeOverlay(); // Remove overlay since spotlight creates its own shadow
            element.classList.add('tutorial-spotlight');
        }
        
        _removeSpotlight(element) {
            if (!element) return;
            element.classList.remove('tutorial-spotlight');
            this._addOverlay(); // Add overlay back after removing spotlight
        }
        
        _clearTutorial() {
            // Remove all tutorial elements
            this.tutorialElements.forEach(el => {
                if (el && el.parentNode) {
                    el.parentNode.removeChild(el);
                }
            });
            this.tutorialElements = [];
            
            // Clear any remaining highlights (includes removing cloned cells)
            this._clearHighlights();
            
            // Remove overlay
            this._removeOverlay();
        }
        
        _createTutorialMessage(title, text, targetElement, onNext, showSkip = true) {
            const message = document.createElement('div');
            message.className = 'tutorial-message';
            
            const buttonsHtml = showSkip ? `
                <div class="tutorial-message-buttons">
                    <button class="tutorial-skip" id="tutorial-skip">Skip Tutorial</button>
                    <button class="tutorial-next" id="tutorial-next">Got it!</button>
                </div>
            ` : `
                <div class="tutorial-message-buttons">
                    <button class="tutorial-next" id="tutorial-next">Got it!</button>
                </div>
            `;
            
            message.innerHTML = `
                <h3>${title}</h3>
                <p>${text}</p>
                ${buttonsHtml}
            `;
            
            // Position the message near the target element
            if (targetElement) {
                const rect = targetElement.getBoundingClientRect();
                this._positionMessage(message, rect);
            } else {
                // Center the message if no target
                message.style.left = '50%';
                message.style.top = '50%';
                message.style.transform = 'translate(-50%, -50%)';
            }
            
            document.body.appendChild(message);
            
            // Add event handlers
            const nextBtn = message.querySelector('#tutorial-next');
            if (nextBtn && onNext) {
                nextBtn.addEventListener('click', () => {
                    message.remove();
                    onNext();
                });
            }
            
            const skipBtn = message.querySelector('#tutorial-skip');
            if (skipBtn) {
                skipBtn.addEventListener('click', () => {
                    this._endTutorial();
                });
            }
            
            return message;
        }
        
        _positionMessage(message, targetRect) {
            // Try to position to the left of the target first
            const messageHeight = 200; // Approximate
            const messageWidth = 350;
            const padding = 20;
            
            let top = targetRect.top;
            let left = targetRect.left - messageWidth - padding;
            
            // If it goes off screen left, try positioning to the right
            if (left < padding) {
                left = targetRect.right + padding;
                
                // If still off screen right, position above
                if (left + messageWidth > window.innerWidth - padding) {
                    left = targetRect.left + (targetRect.width / 2) - (messageWidth / 2);
                    top = targetRect.top - messageHeight - padding;
                    
                    // If off screen top, position below
                    if (top < padding) {
                        top = targetRect.bottom + padding;
                    }
                }
            }
            
            // Final bounds check
            if (left < padding) left = padding;
            if (left + messageWidth > window.innerWidth - padding) {
                left = window.innerWidth - messageWidth - padding;
            }
            if (top < padding) top = padding;
            if (top + messageHeight > window.innerHeight - padding) {
                top = window.innerHeight - messageHeight - padding;
            }
            
            message.style.left = `${left}px`;
            message.style.top = `${top}px`;
        }
        
        _createTutorialMessageNoButton(title, text, targetElement) {
            const message = document.createElement('div');
            message.className = 'tutorial-message';
            
            message.innerHTML = `
                <h3>${title}</h3>
                <p>${text}</p>
                <div class="tutorial-message-buttons">
                    <button class="tutorial-skip" id="tutorial-skip">Skip Tutorial</button>
                </div>
            `;
            
            // Position the message near the target element
            if (targetElement) {
                const rect = targetElement.getBoundingClientRect();
                this._positionMessage(message, rect);
            } else {
                // Center the message if no target
                message.style.left = '50%';
                message.style.top = '50%';
                message.style.transform = 'translate(-50%, -50%)';
            }
            
            document.body.appendChild(message);
            
            // Add skip handler
            const skipBtn = message.querySelector('#tutorial-skip');
            if (skipBtn) {
                skipBtn.addEventListener('click', () => {
                    this._endTutorial();
                });
            }
            
            return message;
        }
        
        _addMultiSpotlight(elements) {
            if (!elements || elements.length === 0) return;
            
            // First element gets the full spotlight with overlay
            this._addSpotlight(elements[0]);
            
            // Rest get just the highlight without the overlay shadow
            for (let i = 1; i < elements.length; i++) {
                elements[i].classList.add('tutorial-spotlight-secondary');
            }
        }
        
        _removeMultiSpotlight(elements) {
            if (!elements || elements.length === 0) return;
            
            // Remove main spotlight from first element
            this._removeSpotlight(elements[0]);
            
            // Remove secondary highlights from rest
            for (let i = 1; i < elements.length; i++) {
                elements[i].classList.remove('tutorial-spotlight-secondary');
            }
        }
        
        _addTableColumnSpotlight(cells) {
            if (!cells || cells.length === 0) return;
            
            // Don't remove the overlay - keep it to dim everything
            // The overlay should already be there from _addOverlay()
            
            // Clone each cell and position it above everything
            this.clonedCells = [];
            this.originalCells = cells; // Store reference to original cells
            
            // Function to update clone positions
            const updateClonePositions = () => {
                this.clonedCells.forEach((clone, index) => {
                    const originalCell = cells[index];
                    if (originalCell && clone) {
                        const rect = originalCell.getBoundingClientRect();
                        clone.style.left = `${rect.left}px`;
                        clone.style.top = `${rect.top}px`;
                        clone.style.width = `${rect.width}px`;
                        clone.style.height = `${rect.height}px`;
                    }
                });
            };
            
            cells.forEach(cell => {
                if (cell) {
                    const rect = cell.getBoundingClientRect();
                    
                    // Create a clone of the cell
                    const clone = cell.cloneNode(true);
                    
                    // Get computed styles from original
                    const computedStyle = window.getComputedStyle(cell);
                    
                    // Style the clone to appear exactly where the original is
                    clone.style.cssText = `
                        position: fixed !important;
                        left: ${rect.left}px !important;
                        top: ${rect.top}px !important;
                        width: ${rect.width}px !important;
                        height: ${rect.height}px !important;
                        z-index: 10001 !important;
                        background: white !important;
                        box-shadow: 0 0 0 3px #ffd700, 0 0 20px 5px rgba(255, 215, 0, 0.5) !important;
                        animation: tableColumnPulse 2s infinite !important;
                        padding: ${computedStyle.padding} !important;
                        text-align: ${computedStyle.textAlign} !important;
                        font-size: ${computedStyle.fontSize} !important;
                        font-weight: ${computedStyle.fontWeight} !important;
                        font-family: ${computedStyle.fontFamily} !important;
                        color: ${computedStyle.color} !important;
                        border: none !important;
                        margin: 0 !important;
                        box-sizing: border-box !important;
                        pointer-events: none !important;
                    `;
                    
                    // Add the clone to the page
                    document.body.appendChild(clone);
                    this.clonedCells.push(clone);
                    
                    // Hide the original cell
                    cell.style.visibility = 'hidden';
                }
            });
            
            // Add scroll listener to update positions
            this.scrollHandler = () => updateClonePositions();
            window.addEventListener('scroll', this.scrollHandler, true);
            
            // Add resize listener too in case window is resized
            this.resizeHandler = () => updateClonePositions();
            window.addEventListener('resize', this.resizeHandler);
        }
        
        _removeTableColumnSpotlight(cells) {
            if (!cells || cells.length === 0) return;
            
            // Remove scroll and resize event listeners
            if (this.scrollHandler) {
                window.removeEventListener('scroll', this.scrollHandler, true);
                this.scrollHandler = null;
            }
            
            if (this.resizeHandler) {
                window.removeEventListener('resize', this.resizeHandler);
                this.resizeHandler = null;
            }
            
            // Remove all cloned cells
            if (this.clonedCells) {
                this.clonedCells.forEach(clone => {
                    if (clone && clone.parentNode) {
                        clone.remove();
                    }
                });
                this.clonedCells = [];
            }
            
            // Clear reference to original cells
            this.originalCells = null;
            
            // Restore visibility to original cells
            cells.forEach(cell => {
                if (cell) {
                    cell.style.visibility = '';
                }
            });
            
            // The overlay stays since we're still in tutorial mode
            // No need to re-add it
        }
        
        _endTutorial() {
            this._clearTutorial();
            this.tutorialActive = false;
            this.tutorialStep = 0;
        }
    }
    
    const level = new CarPricingLevel();
    level.create().catch(error => {
        console.error('Failed to create Car Pricing level:', error);
    });
    
    return level;
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.createPizzaProduction;
}