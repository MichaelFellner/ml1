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
            
            // Initialize display and calculate errors
            this._updateTable();
            this._calculateAndFillErrors();
        }
        
        _generateMainContent() {
            return `
                <!-- Info Bubble -->
                <div style="max-width: 900px; margin: 20px auto 2px auto; position: relative;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 20px; padding: 20px 25px; box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3); position: relative;">
                        <div style="color: white; font-size: 1.1rem; line-height: 1.6;">
                            <strong style="font-size: 1.2rem;">Welcome to Car Pricing Optimization!</strong><br>
                            Learn how gradient descent helps us find the perfect pricing formula. The table shows how your current formula performs. 
                            Use gradient descent to adjust the weights (W_age and W_mpg) and minimize the error between your estimates and the true car prices!
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
                        <!-- Table container with independent column divs -->
                        <div id="cars-table-wrapper" style="display: flex; flex-shrink: 0; border: 2px solid #e0e0e0; border-radius: 10px; background: white;">
                            <!-- Main table part (Car, Age, MPG, True Cost) -->
                            <div style="background: white; border-radius: 8px 0 0 8px; overflow: hidden;">
                                <!-- Header Row -->
                                <div style="display: flex; background: #f5f5f5; height: 42px;">
                                    <div style="padding: 12px; border-right: 1px solid #e0e0e0; font-size: 0.95rem; color: #2c3e50; font-weight: bold; width: 100px;">Car</div>
                                    <div style="padding: 12px; border-right: 1px solid #e0e0e0; font-size: 0.95rem; color: #2c3e50; font-weight: bold; width: 50px; text-align: center;">Age</div>
                                    <div style="padding: 12px; border-right: 1px solid #e0e0e0; font-size: 0.95rem; color: #2c3e50; font-weight: bold; width: 50px; text-align: center;">MPG</div>
                                    <div style="padding: 12px; border-right: 2px solid #e0e0e0; font-size: 0.95rem; color: #2c3e50; font-weight: bold; width: 80px; text-align: center;">True Cost</div>
                                </div>
                                
                                <!-- Car 1 Row -->
                                <div style="display: flex; background: white; border-top: 1px solid #e0e0e0; height: 52px;">
                                    <div style="padding: 12px; border-right: 1px solid #e0e0e0; width: 100px;">
                                        <div style="display: flex; align-items: center; gap: 8px;">
                                            <svg width="28" height="16" viewBox="0 0 80 40">
                                                <rect x="10" y="15" width="60" height="20" rx="5" fill="#3498db"/>
                                                <rect x="20" y="8" width="30" height="12" rx="3" fill="#5dade2"/>
                                                <circle cx="25" cy="35" r="5" fill="#333"/>
                                                <circle cx="55" cy="35" r="5" fill="#333"/>
                                            </svg>
                                            <span style="font-weight: bold; color: #2c3e50; font-size: 0.9rem;">Car 1</span>
                                        </div>
                                    </div>
                                    <div style="padding: 12px; border-right: 1px solid #e0e0e0; width: 50px; text-align: center; font-size: 0.95rem;">5</div>
                                    <div style="padding: 12px; border-right: 1px solid #e0e0e0; width: 50px; text-align: center; font-size: 0.95rem;">20</div>
                                    <div style="padding: 12px; border-right: 2px solid #e0e0e0; width: 80px; text-align: center; font-size: 0.95rem; color: #27ae60; font-weight: bold;">$250</div>
                                </div>
                                
                                <!-- Car 2 Row -->
                                <div style="display: flex; background: white; border-top: 1px solid #e0e0e0; height: 52px;">
                                    <div style="padding: 12px; border-right: 1px solid #e0e0e0; width: 100px;">
                                        <div style="display: flex; align-items: center; gap: 8px;">
                                            <svg width="28" height="16" viewBox="0 0 80 40">
                                                <rect x="10" y="15" width="60" height="20" rx="5" fill="#27ae60"/>
                                                <rect x="20" y="8" width="30" height="12" rx="3" fill="#52be80"/>
                                                <circle cx="25" cy="35" r="5" fill="#333"/>
                                                <circle cx="55" cy="35" r="5" fill="#333"/>
                                            </svg>
                                            <span style="font-weight: bold; color: #2c3e50; font-size: 0.9rem;">Car 2</span>
                                        </div>
                                    </div>
                                    <div style="padding: 12px; border-right: 1px solid #e0e0e0; width: 50px; text-align: center; font-size: 0.95rem;">2</div>
                                    <div style="padding: 12px; border-right: 1px solid #e0e0e0; width: 50px; text-align: center; font-size: 0.95rem;">30</div>
                                    <div style="padding: 12px; border-right: 2px solid #e0e0e0; width: 80px; text-align: center; font-size: 0.95rem; color: #27ae60; font-weight: bold;">$380</div>
                                </div>
                                
                                <!-- Car 3 Row -->
                                <div style="display: flex; background: white; border-top: 1px solid #e0e0e0; height: 52px;">
                                    <div style="padding: 12px; border-right: 1px solid #e0e0e0; width: 100px;">
                                        <div style="display: flex; align-items: center; gap: 8px;">
                                            <svg width="28" height="16" viewBox="0 0 80 40">
                                                <rect x="10" y="15" width="60" height="20" rx="5" fill="#e74c3c"/>
                                                <rect x="20" y="8" width="30" height="12" rx="3" fill="#ec7063"/>
                                                <circle cx="25" cy="35" r="5" fill="#333"/>
                                                <circle cx="55" cy="35" r="5" fill="#333"/>
                                            </svg>
                                            <span style="font-weight: bold; color: #2c3e50; font-size: 0.9rem;">Car 3</span>
                                        </div>
                                    </div>
                                    <div style="padding: 12px; border-right: 1px solid #e0e0e0; width: 50px; text-align: center; font-size: 0.95rem;">8</div>
                                    <div style="padding: 12px; border-right: 1px solid #e0e0e0; width: 50px; text-align: center; font-size: 0.95rem;">25</div>
                                    <div style="padding: 12px; border-right: 2px solid #e0e0e0; width: 80px; text-align: center; font-size: 0.95rem; color: #27ae60; font-weight: bold;">$180</div>
                                </div>
                                
                                <!-- Sum Row -->
                                <div style="display: flex; background: linear-gradient(135deg, #fff9e6, #fffdf4); border-top: 2px solid #f39c12; height: 52px;">
                                    <div style="padding: 12px; border-right: 1px solid #e0e0e0; width: 100px; font-weight: bold; color: #2c3e50;">
                                        <span style="color: #f39c12;">Σ</span> Sum
                                    </div>
                                    <div id="sum-age" style="padding: 12px; border-right: 1px solid #e0e0e0; width: 50px; text-align: center; font-size: 0.95rem; font-weight: bold; color: #f39c12;">15</div>
                                    <div id="sum-mpg" style="padding: 12px; border-right: 1px solid #e0e0e0; width: 50px; text-align: center; font-size: 0.95rem; font-weight: bold; color: #f39c12;">75</div>
                                    <div id="sum-true-cost" style="padding: 12px; border-right: 2px solid #e0e0e0; width: 80px; text-align: center; font-size: 0.95rem; font-weight: bold; color: #f39c12;">$810</div>
                                </div>
                            </div>
                            
                            <!-- Estimate Column (separate for spotlighting) -->
                            <div id="estimate-column" style="background: white; border-right: 1px solid #e0e0e0; position: relative; z-index: 1;">
                                <div id="estimate-header" style="padding: 12px; background: #f5f5f5; font-size: 0.95rem; color: #2c3e50; font-weight: bold; text-align: center; height: 42px; box-sizing: border-box;">Your Estimate</div>
                                <div id="car1-estimate" style="padding: 12px; border-top: 1px solid #e0e0e0; text-align: center; font-family: monospace; font-size: 0.85rem; color: #3498db; background: white; height: 52px; box-sizing: border-box; display: flex; align-items: center; justify-content: center;">-</div>
                                <div id="car2-estimate" style="padding: 12px; border-top: 1px solid #e0e0e0; text-align: center; font-family: monospace; font-size: 0.85rem; color: #3498db; background: white; height: 52px; box-sizing: border-box; display: flex; align-items: center; justify-content: center;">-</div>
                                <div id="car3-estimate" style="padding: 12px; border-top: 1px solid #e0e0e0; text-align: center; font-family: monospace; font-size: 0.85rem; color: #3498db; background: white; height: 52px; box-sizing: border-box; display: flex; align-items: center; justify-content: center;">-</div>
                                <div id="sum-estimate" style="padding: 12px; border-top: 2px solid #f39c12; text-align: center; font-size: 0.95rem; font-weight: bold; color: #f39c12; background: linear-gradient(135deg, #fff9e6, #fffdf4); height: 52px; box-sizing: border-box; display: flex; align-items: center; justify-content: center;">-</div>
                            </div>
                            
                            <!-- Error Column (separate for spotlighting) -->
                            <div id="error-column" style="background: white; border-radius: 0 8px 8px 0; overflow: hidden; position: relative; z-index: 1;">
                                <div id="error-header" style="padding: 12px; background: #f5f5f5; font-size: 0.95rem; color: #2c3e50; font-weight: bold; text-align: center; height: 42px; box-sizing: border-box;">Error</div>
                                <div id="car1-error" style="padding: 12px; border-top: 1px solid #e0e0e0; text-align: center; font-family: monospace; font-size: 0.85rem; background: white; height: 52px; box-sizing: border-box; display: flex; align-items: center; justify-content: center;">-</div>
                                <div id="car2-error" style="padding: 12px; border-top: 1px solid #e0e0e0; text-align: center; font-family: monospace; font-size: 0.85rem; background: white; height: 52px; box-sizing: border-box; display: flex; align-items: center; justify-content: center;">-</div>
                                <div id="car3-error" style="padding: 12px; border-top: 1px solid #e0e0e0; text-align: center; font-family: monospace; font-size: 0.85rem; background: white; height: 52px; box-sizing: border-box; display: flex; align-items: center; justify-content: center;">-</div>
                                <div id="sum-error" style="padding: 12px; border-top: 2px solid #f39c12; text-align: center; font-size: 0.95rem; font-weight: bold; background: linear-gradient(135deg, #fff9e6, #fffdf4); height: 52px; box-sizing: border-box; display: flex; align-items: center; justify-content: center;">-</div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
                <!-- CRITICAL: Standard navigation -->
                ${typeof createStandardNavigation === 'function' ? createStandardNavigation() : ''}
                
                <style>
                    /* Tutorial System Styles */
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
            
            // Update displays and recalculate errors
            this._updateTable();
            this._updateCoeffDisplay();
            this._calculateAndFillErrors();
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
        
        _calculateAndFillErrors() {
            const cars = [
                { id: 'car1', mpg: 20, age: 5, optimal: 250 },
                { id: 'car2', mpg: 30, age: 2, optimal: 380 },
                { id: 'car3', mpg: 25, age: 8, optimal: 180 }
            ];
            
            this.totalError = 0;
            
            // Calculate errors for each car
            cars.forEach(car => {
                const price = this._calculatePrice(car.mpg, car.age);
                const signedError = price - car.optimal;
                this.carErrors[car.id] = signedError;
                this.totalError += signedError;
            });
            
            // Auto-fill error inputs with the calculated total error
            const ageErrorInput = document.getElementById('age-error-input');
            const mpgErrorInput = document.getElementById('mpg-error-input');
            if (ageErrorInput && mpgErrorInput) {
                ageErrorInput.value = this.totalError.toFixed(0);
                mpgErrorInput.value = this.totalError.toFixed(0);
                this._checkCalculateButtonState();
            }
            
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
            
            // Update displays and recalculate errors
            this._updateTable();
            this._updateCoeffDisplay();
            this._calculateAndFillErrors();
            
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
        

        _reset() {
            this.ageCoeff = 20;
            this.mpgCoeff = 30;
            this.totalError = 0;
            this.manualTotalError = 0;
            this.ageUpdate = 0;
            this.mpgUpdate = 0;
            this.carErrors = { car1: 0, car2: 0, car3: 0 };
            
            // Reset displays and recalculate errors
            this._updateTable();
            this._updateCoeffDisplay();
            this._calculateAndFillErrors();
            
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
            
            // Start directly at step 2 (showing estimate column)
            this._showTutorialStep2();
        }
        
        _showTutorialStep2() {
            console.log('Showing Your Estimate column');
            this.tutorialStep = 2;
            this._clearHighlights();
            
            // Spotlight the entire estimate column container
            const estimateColumn = document.getElementById('estimate-column');
            
            if (!estimateColumn) return;
            
            // Use normal spotlight for the column
            this._addSpotlight(estimateColumn);
            
            const message = this._createTutorialMessage(
                'Your Estimate',
                'This column shows how much you paid for each car using your formula.',
                estimateColumn,
                () => {
                    message.remove();
                    this._removeSpotlight(estimateColumn);
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
            
            // Spotlight the entire error column container
            const errorColumn = document.getElementById('error-column');
            
            if (!errorColumn) return;
            
            // Use normal spotlight for the column
            this._addSpotlight(errorColumn);
            
            const message = this._createTutorialMessage(
                'Your Errors',
                'This column shows how far off your estimates were from the true costs.',
                errorColumn,
                () => {
                    message.remove();
                    this._removeSpotlight(errorColumn);
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
            
            // Ensure the button is actually clickable during tutorial
            // Store original state first
            calcBtn.dataset.originalOpacity = calcBtn.style.opacity || '0.5';
            calcBtn.dataset.originalPointerEvents = calcBtn.style.pointerEvents || 'none';
            
            // Make sure button is enabled for the tutorial
            calcBtn.style.opacity = '1';
            calcBtn.style.pointerEvents = 'auto';
            
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
            
            // Store the click handler as a class property so we can remove it properly
            if (this.tutorialCalcClickHandler) {
                calcBtn.removeEventListener('click', this.tutorialCalcClickHandler);
            }
            
            this.tutorialCalcClickHandler = () => {
                console.log('Calculate clicked in tutorial');
                
                // Remove golden border and animation
                calcBtn.style.border = calcBtn.dataset.originalBorder === 'none' ? '' : calcBtn.dataset.originalBorder;
                calcBtn.style.animation = calcBtn.dataset.originalAnimation === 'none' ? '' : calcBtn.dataset.originalAnimation;
                delete calcBtn.dataset.originalBorder;
                delete calcBtn.dataset.originalAnimation;
                
                // Restore original button state (opacity and pointer-events)
                if (calcBtn.dataset.originalOpacity !== undefined) {
                    calcBtn.style.opacity = calcBtn.dataset.originalOpacity;
                    delete calcBtn.dataset.originalOpacity;
                }
                if (calcBtn.dataset.originalPointerEvents !== undefined) {
                    calcBtn.style.pointerEvents = calcBtn.dataset.originalPointerEvents;
                    delete calcBtn.dataset.originalPointerEvents;
                }
                
                // Remove message and spotlight
                message.remove();
                this._removeSpotlight(gradientContainer);
                
                // Actually run the calculate function
                this._calculateUpdate();
                
                // Move to step 6 immediately
                this._showTutorialStep6();
                
                // Remove the handler after it's done
                calcBtn.removeEventListener('click', this.tutorialCalcClickHandler);
                this.tutorialCalcClickHandler = null;
            };
            
            // Add the handler without capture phase to avoid conflicts
            calcBtn.addEventListener('click', this.tutorialCalcClickHandler);
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
            
            // Store the click handler as a class property
            if (this.tutorialApplyClickHandler) {
                applyBtn.removeEventListener('click', this.tutorialApplyClickHandler);
            }
            
            this.tutorialApplyClickHandler = () => {
                console.log('Apply clicked, continuing tutorial');
                
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
                
                // Remove the handler after it's done
                applyBtn.removeEventListener('click', this.tutorialApplyClickHandler);
                this.tutorialApplyClickHandler = null;
            };
            
            // Add the handler without capture phase
            applyBtn.addEventListener('click', this.tutorialApplyClickHandler);
        }
        
        _showTutorialStep8() {
            console.log('Showing improved estimates');
            this.tutorialStep = 8;
            this._clearHighlights();
            
            const functionContainer = document.getElementById('current-function-container');
            const estimateColumn = document.getElementById('estimate-column');
            
            if (!functionContainer || !estimateColumn) return;
            
            // Spotlight the function container
            this._addSpotlight(functionContainer);
            
            // Also highlight the estimate column with secondary spotlight
            estimateColumn.classList.add('tutorial-spotlight-secondary');
            
            const message = this._createTutorialMessage(
                'Improved Function',
                'We\'ve updated the function weights! Check the "Your Estimate" column - the values should now be closer to the true costs.',
                functionContainer,
                () => {
                    message.remove();
                    this._removeSpotlight(functionContainer);
                    estimateColumn.classList.remove('tutorial-spotlight-secondary');
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
            
            // Remove any button highlights and animations
            ['calculate-update-btn', 'apply-gd-btn'].forEach(btnId => {
                const btn = document.getElementById(btnId);
                if (btn && btn.dataset.originalBorder !== undefined) {
                    btn.style.border = btn.dataset.originalBorder === 'none' ? '' : btn.dataset.originalBorder;
                    btn.style.animation = btn.dataset.originalAnimation === 'none' ? '' : btn.dataset.originalAnimation;
                    delete btn.dataset.originalBorder;
                    delete btn.dataset.originalAnimation;
                }
                // Also restore opacity and pointer-events if they were stored
                if (btn && btn.dataset.originalOpacity !== undefined) {
                    btn.style.opacity = btn.dataset.originalOpacity;
                    delete btn.dataset.originalOpacity;
                }
                if (btn && btn.dataset.originalPointerEvents !== undefined) {
                    btn.style.pointerEvents = btn.dataset.originalPointerEvents;
                    delete btn.dataset.originalPointerEvents;
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
        

        
        _endTutorial() {
            // Clean up any lingering event handlers
            const calcBtn = document.getElementById('calculate-update-btn');
            const applyBtn = document.getElementById('apply-gd-btn');
            
            if (calcBtn && this.tutorialCalcClickHandler) {
                calcBtn.removeEventListener('click', this.tutorialCalcClickHandler);
                this.tutorialCalcClickHandler = null;
            }
            
            if (applyBtn && this.tutorialApplyClickHandler) {
                applyBtn.removeEventListener('click', this.tutorialApplyClickHandler);
                this.tutorialApplyClickHandler = null;
            }
            
            this._clearTutorial();
            this.tutorialActive = false;
            this.tutorialStep = 0;
            
            // Restore button states based on current input values
            this._checkCalculateButtonState();
            
            // Also check if the apply button should be enabled
            const ageResult = document.getElementById('age-result');
            const mpgResult = document.getElementById('mpg-result');
            if (applyBtn && ageResult && mpgResult) {
                // If there are results displayed, enable the apply button
                if (ageResult.innerHTML && mpgResult.innerHTML) {
                    applyBtn.style.opacity = '1';
                    applyBtn.style.pointerEvents = 'auto';
                } else {
                    applyBtn.style.opacity = '0.5';
                    applyBtn.style.pointerEvents = 'none';
                }
            }
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