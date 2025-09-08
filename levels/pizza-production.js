/**
 * Bunny Pricing Optimization
 * 
 * Interactive level teaching gradient descent by optimizing bunny prices
 * Students adjust Age and Weight (kg) coefficients to minimize pricing error
 */

window.createPizzaProduction = function() {
    
    class BunnyPricingLevel extends window.InteractiveLevelTemplate {
        constructor() {
            super({
                id: 'bunny-pricing-optimization',
                name: 'Bunny Pricing Optimization',
                type: 'interactive',
                description: '',
                targetFunction: { 
                    // Bunnies with their attributes and ideal prices
                    bunny1: { kg: 2.0, age: 5, optimalPrice: 250 },
                    bunny2: { kg: 3.0, age: 2, optimalPrice: 380 },
                    bunny3: { kg: 2.5, age: 8, optimalPrice: 180 }
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
            this.kgCoeff = 30;
            this.learningRate = 0.001; // Default learning rate
            this.totalError = 0;
            this.bunnyErrors = { bunny1: 0, bunny2: 0, bunny3: 0 };
            this.manualTotalError = 0;
            this.ageUpdate = 0;
            this.kgUpdate = 0;
            
            // Tutorial state
            this.tutorialStep = 0;
            this.tutorialActive = false;
            this.tutorialElements = [];
        }
        
        async setup() {
            await super.setup();
            
            // Initialize navigation
            if (typeof initializeNavigation === 'function') {
                initializeNavigation('bunny-pricing-optimization', 'createPizzaProduction');
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
                            <strong style="font-size: 1.2rem;">Welcome to Bunny Pricing Optimization!</strong><br>
                            Learn how gradient descent helps us find the perfect pricing formula. The table shows how your current formula performs. 
                            Use gradient descent to adjust the weights (W_age and W_kg) and minimize the error between your estimates and the true bunny prices!
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
                                    <button id="autofill-btn" 
                                    title="Fill error fields with current total error"
                                    style="
                                        padding: 6px 12px;
                                        background: linear-gradient(135deg, #f39c12, #e67e22);
                                        color: white;
                                        border: none;
                                        border-radius: 6px;
                                        font-size: 0.85rem;
                                        font-weight: bold;
                                        cursor: pointer;
                                        transition: all 0.3s;
                                        box-shadow: 0 2px 5px rgba(243, 156, 18, 0.3);
                                    "
                                    onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 8px rgba(243, 156, 18, 0.4)';"
                                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 5px rgba(243, 156, 18, 0.3)';">
                                        Autofill
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
                                                        -moz-appearance: textfield;
                                                        appearance: textfield;
                                                    "/>
                                                </td>
                                                <td style="padding: 4px 4px; text-align: center; font-size: 1rem; color: #2c3e50;">×</td>
                                                <td style="padding: 4px 6px; text-align: center; font-size: 1rem; color: #2c3e50; font-weight: bold;">15</td>
                                                <td style="padding: 4px 4px; text-align: center; font-size: 1rem; color: #2c3e50;">×</td>
                                                <td style="padding: 4px 6px; text-align: center;">
                                                    <input id="age-lr-input" type="number" step="any" placeholder="LR" style="
                                                        width: 65px;
                                                        padding: 3px;
                                                        border: 2px solid #3498db;
                                                        border-radius: 4px;
                                                        font-family: monospace;
                                                        font-size: 0.9rem;
                                                        text-align: center;
                                                        background: white;
                                                        -moz-appearance: textfield;
                                                        appearance: textfield;
                                                    "/>
                                                </td>
                                                <td style="padding: 4px 10px; text-align: center; font-size: 1rem; color: #3498db; font-weight: bold;">
                                                    <span id="age-result"></span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            
                            <!-- W_kg update -->
                            <div style="position: relative; padding: 18px 10px 10px 10px; background: #f8fdf9; border: 2px solid #27ae60; border-radius: 8px;">
                                <!-- Badge label -->
                                <div style="position: absolute; top: -10px; left: 12px; background: #27ae60; color: white; padding: 2px 10px; border-radius: 4px; font-weight: bold; font-size: 0.8rem;">
                                    W_kg = <span id="wkg-badge">${this.kgCoeff}</span>
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
                                                <th style="padding: 4px 6px; text-align: center; font-size: 0.75rem; color: #666; font-weight: normal; border-bottom: 1px solid #ddd;">Σ Kg</th>
                                                <th style="padding: 4px 4px; text-align: center; font-size: 0.75rem; color: #666; font-weight: normal; border-bottom: 1px solid #ddd;"></th>
                                                <th style="padding: 4px 6px; text-align: center; font-size: 0.75rem; color: #666; font-weight: normal; border-bottom: 1px solid #ddd;">LR</th>
                                                <th style="padding: 4px 6px; text-align: center; font-size: 0.75rem; color: #666; font-weight: normal;"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style="padding: 4px 6px; text-align: center; font-size: 1rem; color: #2c3e50; font-weight: bold;">
                                                    <span id="kg-current">${this.kgCoeff}</span>
                                                </td>
                                                <td style="padding: 4px 4px; text-align: center; font-size: 1rem; color: #2c3e50;">+</td>
                                                <td style="padding: 4px 6px; text-align: center;">
                                                    <input id="kg-error-input" type="number" step="any" placeholder="error" style="
                                                        width: 65px;
                                                        padding: 3px;
                                                        border: 2px solid #27ae60;
                                                        border-radius: 4px;
                                                        font-family: monospace;
                                                        font-size: 0.9rem;
                                                        text-align: center;
                                                        background: white;
                                                        -moz-appearance: textfield;
                                                        appearance: textfield;
                                                    "/>
                                                </td>
                                                <td style="padding: 4px 4px; text-align: center; font-size: 1rem; color: #2c3e50;">×</td>
                                                <td style="padding: 4px 6px; text-align: center; font-size: 1rem; color: #2c3e50; font-weight: bold;">7.5</td>
                                                <td style="padding: 4px 4px; text-align: center; font-size: 1rem; color: #2c3e50;">×</td>
                                                <td style="padding: 4px 6px; text-align: center;">
                                                    <input id="kg-lr-input" type="number" step="any" placeholder="LR" style="
                                                        width: 65px;
                                                        padding: 3px;
                                                        border: 2px solid #27ae60;
                                                        border-radius: 4px;
                                                        font-family: monospace;
                                                        font-size: 0.9rem;
                                                        text-align: center;
                                                        background: white;
                                                        -moz-appearance: textfield;
                                                        appearance: textfield;
                                                    "/>
                                                </td>
                                                <td style="padding: 4px 10px; text-align: center; font-size: 1rem; color: #27ae60; font-weight: bold;">
                                                    <span id="kg-result"></span>
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
                                        <span id="function-wkg" style="color: #27ae60; font-weight: bold;">${this.kgCoeff}</span>
                                        <span style="color: #666;">× kg</span>
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
                    
                    <!-- Bottom Section: Bunnies Table and Farm -->
                    <div style="display: flex; gap: 20px; align-items: stretch;">
                        <!-- Table container with independent column divs -->
                        <div id="bunnies-table-wrapper" style="display: flex; flex-shrink: 0; border: 2px solid #e0e0e0; border-radius: 10px; background: white;">
                            <!-- Main table part (Bunny, Age, Weight, True Cost) -->
                            <div style="background: white; border-radius: 8px 0 0 8px; overflow: hidden;">
                                <!-- Header Row -->
                                <div style="display: flex; background: #f5f5f5; height: 42px;">
                                    <div style="padding: 12px; border-right: 1px solid #e0e0e0; font-size: 0.95rem; color: #2c3e50; font-weight: bold; width: 100px;">Bunny</div>
                                    <div style="padding: 12px; border-right: 1px solid #e0e0e0; font-size: 0.95rem; color: #2c3e50; font-weight: bold; width: 50px; text-align: center;">Age</div>
                                    <div style="padding: 12px; border-right: 1px solid #e0e0e0; font-size: 0.95rem; color: #2c3e50; font-weight: bold; width: 60px; text-align: center;">Kg</div>
                                    <div style="padding: 12px; border-right: 2px solid #e0e0e0; font-size: 0.95rem; color: #2c3e50; font-weight: bold; width: 80px; text-align: center;">Cost</div>
                                </div>
                                
                                <!-- Bunny 1 Row -->
                                <div style="display: flex; background: white; border-top: 1px solid #e0e0e0; height: 52px;">
                                    <div style="padding: 12px; border-right: 1px solid #e0e0e0; width: 100px;">
                                        <div style="display: flex; align-items: center; gap: 8px;">
                                            <svg width="28" height="28" viewBox="0 0 40 40">
                                                <!-- Bunny body -->
                                                <ellipse cx="20" cy="25" rx="10" ry="8" fill="#3498db"/>
                                                <!-- Bunny head -->
                                                <circle cx="20" cy="16" r="6" fill="#3498db"/>
                                                <!-- Ears -->
                                                <ellipse cx="16" cy="10" rx="3" ry="6" fill="#3498db" transform="rotate(-10 16 10)"/>
                                                <ellipse cx="24" cy="10" rx="3" ry="6" fill="#3498db" transform="rotate(10 24 10)"/>
                                                <!-- Eyes -->
                                                <circle cx="18" cy="15" r="1" fill="#000"/>
                                                <circle cx="22" cy="15" r="1" fill="#000"/>
                                                <!-- Nose -->
                                                <ellipse cx="20" cy="18" rx="1.5" ry="1" fill="#ff69b4"/>
                                                <!-- Tail -->
                                                <circle cx="10" cy="25" r="3" fill="#fff"/>
                                            </svg>
                                            <span style="font-weight: bold; color: #2c3e50; font-size: 0.9rem;">1</span>
                                        </div>
                                    </div>
                                    <div style="padding: 12px; border-right: 1px solid #e0e0e0; width: 50px; text-align: center; font-size: 0.95rem;">5</div>
                                    <div style="padding: 12px; border-right: 1px solid #e0e0e0; width: 60px; text-align: center; font-size: 0.95rem;">2.0</div>
                                    <div style="padding: 12px; border-right: 2px solid #e0e0e0; width: 80px; text-align: center; font-size: 0.95rem; color: #27ae60; font-weight: bold;">$250</div>
                                </div>
                                
                                <!-- Bunny 2 Row -->
                                <div style="display: flex; background: white; border-top: 1px solid #e0e0e0; height: 52px;">
                                    <div style="padding: 12px; border-right: 1px solid #e0e0e0; width: 100px;">
                                        <div style="display: flex; align-items: center; gap: 8px;">
                                            <svg width="28" height="28" viewBox="0 0 40 40">
                                                <!-- Bunny body -->
                                                <ellipse cx="20" cy="25" rx="10" ry="8" fill="#27ae60"/>
                                                <!-- Bunny head -->
                                                <circle cx="20" cy="16" r="6" fill="#27ae60"/>
                                                <!-- Ears -->
                                                <ellipse cx="16" cy="10" rx="3" ry="6" fill="#27ae60" transform="rotate(-10 16 10)"/>
                                                <ellipse cx="24" cy="10" rx="3" ry="6" fill="#27ae60" transform="rotate(10 24 10)"/>
                                                <!-- Eyes -->
                                                <circle cx="18" cy="15" r="1" fill="#000"/>
                                                <circle cx="22" cy="15" r="1" fill="#000"/>
                                                <!-- Nose -->
                                                <ellipse cx="20" cy="18" rx="1.5" ry="1" fill="#ff69b4"/>
                                                <!-- Tail -->
                                                <circle cx="10" cy="25" r="3" fill="#fff"/>
                                            </svg>
                                            <span style="font-weight: bold; color: #2c3e50; font-size: 0.9rem;">2</span>
                                        </div>
                                    </div>
                                    <div style="padding: 12px; border-right: 1px solid #e0e0e0; width: 50px; text-align: center; font-size: 0.95rem;">2</div>
                                    <div style="padding: 12px; border-right: 1px solid #e0e0e0; width: 60px; text-align: center; font-size: 0.95rem;">3.0</div>
                                    <div style="padding: 12px; border-right: 2px solid #e0e0e0; width: 80px; text-align: center; font-size: 0.95rem; color: #27ae60; font-weight: bold;">$380</div>
                                </div>
                                
                                <!-- Bunny 3 Row -->
                                <div style="display: flex; background: white; border-top: 1px solid #e0e0e0; height: 52px;">
                                    <div style="padding: 12px; border-right: 1px solid #e0e0e0; width: 100px;">
                                        <div style="display: flex; align-items: center; gap: 8px;">
                                            <svg width="28" height="28" viewBox="0 0 40 40">
                                                <!-- Bunny body -->
                                                <ellipse cx="20" cy="25" rx="10" ry="8" fill="#e74c3c"/>
                                                <!-- Bunny head -->
                                                <circle cx="20" cy="16" r="6" fill="#e74c3c"/>
                                                <!-- Ears -->
                                                <ellipse cx="16" cy="10" rx="3" ry="6" fill="#e74c3c" transform="rotate(-10 16 10)"/>
                                                <ellipse cx="24" cy="10" rx="3" ry="6" fill="#e74c3c" transform="rotate(10 24 10)"/>
                                                <!-- Eyes -->
                                                <circle cx="18" cy="15" r="1" fill="#000"/>
                                                <circle cx="22" cy="15" r="1" fill="#000"/>
                                                <!-- Nose -->
                                                <ellipse cx="20" cy="18" rx="1.5" ry="1" fill="#ff69b4"/>
                                                <!-- Tail -->
                                                <circle cx="10" cy="25" r="3" fill="#fff"/>
                                            </svg>
                                            <span style="font-weight: bold; color: #2c3e50; font-size: 0.9rem;">3</span>
                                        </div>
                                    </div>
                                    <div style="padding: 12px; border-right: 1px solid #e0e0e0; width: 50px; text-align: center; font-size: 0.95rem;">8</div>
                                    <div style="padding: 12px; border-right: 1px solid #e0e0e0; width: 60px; text-align: center; font-size: 0.95rem;">2.5</div>
                                    <div style="padding: 12px; border-right: 2px solid #e0e0e0; width: 80px; text-align: center; font-size: 0.95rem; color: #27ae60; font-weight: bold;">$180</div>
                                </div>
                                
                                <!-- Sum Row -->
                                <div style="display: flex; background: linear-gradient(135deg, #fff9e6, #fffdf4); border-top: 2px solid #f39c12; height: 52px;">
                                    <div style="padding: 12px; border-right: 1px solid #e0e0e0; width: 100px; font-weight: bold; color: #2c3e50;">
                                        <span style="color: #f39c12;">Σ</span> Sum
                                    </div>
                                    <div id="sum-age" style="padding: 12px; border-right: 1px solid #e0e0e0; width: 50px; text-align: center; font-size: 0.95rem; font-weight: bold; color: #f39c12;">15</div>
                                    <div id="sum-kg" style="padding: 12px; border-right: 1px solid #e0e0e0; width: 60px; text-align: center; font-size: 0.95rem; font-weight: bold; color: #f39c12;">7.5</div>
                                    <div id="sum-true-cost" style="padding: 12px; border-right: 2px solid #e0e0e0; width: 80px; text-align: center; font-size: 0.95rem; font-weight: bold; color: #f39c12;">$810</div>
                                </div>
                            </div>
                            
                            <!-- Estimate Column (separate for spotlighting) -->
                            <div id="estimate-column" style="background: white; border-right: 1px solid #e0e0e0; position: relative; z-index: 1;">
                            <div id="estimate-header" style="padding: 12px; background: #f5f5f5; font-size: 0.95rem; color: #2c3e50; font-weight: bold; text-align: center; height: 42px; box-sizing: border-box;">Your Estimate</div>
                            <div id="bunny1-estimate" style="padding: 12px; border-top: 1px solid #e0e0e0; text-align: center; font-family: monospace; font-size: 0.85rem; color: #3498db; background: white; height: 52px; box-sizing: border-box; display: flex; align-items: center; justify-content: center;">-</div>
                            <div id="bunny2-estimate" style="padding: 12px; border-top: 1px solid #e0e0e0; text-align: center; font-family: monospace; font-size: 0.85rem; color: #3498db; background: white; height: 52px; box-sizing: border-box; display: flex; align-items: center; justify-content: center;">-</div>
                            <div id="bunny3-estimate" style="padding: 12px; border-top: 1px solid #e0e0e0; text-align: center; font-family: monospace; font-size: 0.85rem; color: #3498db; background: white; height: 52px; box-sizing: border-box; display: flex; align-items: center; justify-content: center;">-</div>
                            <div id="sum-estimate" style="padding: 12px; border-top: 2px solid #f39c12; text-align: center; font-size: 0.95rem; font-weight: bold; color: #f39c12; background: linear-gradient(135deg, #fff9e6, #fffdf4); height: 52px; box-sizing: border-box; display: flex; align-items: center; justify-content: center;">-</div>
                            </div>
                            
                            <!-- Error Column (separate for spotlighting) -->
                            <div id="error-column" style="background: white; border-radius: 0 8px 8px 0; overflow: hidden; position: relative; z-index: 1;">
                            <div id="error-header" style="padding: 12px; background: #f5f5f5; font-size: 0.95rem; color: #2c3e50; font-weight: bold; text-align: center; height: 42px; box-sizing: border-box;">Error</div>
                            <div id="bunny1-error" style="padding: 12px; border-top: 1px solid #e0e0e0; text-align: center; font-family: monospace; font-size: 0.85rem; background: white; height: 52px; box-sizing: border-box; display: flex; align-items: center; justify-content: center;">-</div>
                            <div id="bunny2-error" style="padding: 12px; border-top: 1px solid #e0e0e0; text-align: center; font-family: monospace; font-size: 0.85rem; background: white; height: 52px; box-sizing: border-box; display: flex; align-items: center; justify-content: center;">-</div>
                            <div id="bunny3-error" style="padding: 12px; border-top: 1px solid #e0e0e0; text-align: center; font-family: monospace; font-size: 0.85rem; background: white; height: 52px; box-sizing: border-box; display: flex; align-items: center; justify-content: center;">-</div>
                            <div id="sum-error" style="padding: 12px; border-top: 2px solid #f39c12; text-align: center; font-size: 0.95rem; font-weight: bold; background: linear-gradient(135deg, #fff9e6, #fffdf4); height: 52px; box-sizing: border-box; display: flex; align-items: center; justify-content: center;">-</div>
                            </div>
                        </div>
                        
                        <!-- Bunny Farm Visualization -->
                        <div id="bunny-farm-container" style="flex: 1; max-width: 450px; min-width: 350px; height: 260px; background: linear-gradient(to bottom, #87CEEB 0%, #87CEEB 40%, #90EE90 40%, #90EE90 100%); border-radius: 15px; padding: 15px; position: relative; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border: 2px solid #e0e0e0;">
                            <!-- Sky elements -->
                            <div id="weather-container" style="position: absolute; top: 0; left: 0; right: 0; height: 40%; pointer-events: none;">
                                <!-- Sun/Clouds will be dynamically updated -->
                                <div id="sun" style="position: absolute; top: 20px; right: 30px; width: 60px; height: 60px; background: radial-gradient(circle, #FFD700, #FFA500); border-radius: 50%; box-shadow: 0 0 40px rgba(255,215,0,0.5); opacity: 0.3; transition: all 1s ease;">
                                    <div style="position: absolute; inset: -20px; background: radial-gradient(circle, rgba(255,215,0,0.3), transparent); border-radius: 50%; animation: sunPulse 3s infinite;"></div>
                                </div>
                                <div id="cloud1" style="position: absolute; top: 15px; left: 50px; opacity: 0.7; transition: all 1s ease;">
                                    <svg width="80" height="40" viewBox="0 0 80 40">
                                        <ellipse cx="20" cy="25" rx="15" ry="10" fill="white" opacity="0.8"/>
                                        <ellipse cx="35" cy="20" rx="18" ry="12" fill="white" opacity="0.8"/>
                                        <ellipse cx="50" cy="25" rx="15" ry="10" fill="white" opacity="0.8"/>
                                    </svg>
                                </div>
                                <div id="cloud2" style="position: absolute; top: 35px; left: 150px; opacity: 0.7; transition: all 1s ease;">
                                    <svg width="60" height="30" viewBox="0 0 60 30">
                                        <ellipse cx="15" cy="20" rx="12" ry="8" fill="white" opacity="0.8"/>
                                        <ellipse cx="30" cy="15" rx="15" ry="10" fill="white" opacity="0.8"/>
                                        <ellipse cx="45" cy="20" rx="12" ry="8" fill="white" opacity="0.8"/>
                                    </svg>
                                </div>
                                <!-- Rainbow (hidden initially) -->
                                <div id="rainbow" style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 300px; height: 150px; opacity: 0; transition: opacity 2s ease; pointer-events: none;">
                                    <svg width="300" height="150" viewBox="0 0 300 150" style="position: absolute;">
                                        <path d="M 30 150 Q 150 30 270 150" stroke="red" stroke-width="6" fill="none" opacity="0.6"/>
                                        <path d="M 40 150 Q 150 40 260 150" stroke="orange" stroke-width="6" fill="none" opacity="0.6"/>
                                        <path d="M 50 150 Q 150 50 250 150" stroke="yellow" stroke-width="6" fill="none" opacity="0.6"/>
                                        <path d="M 60 150 Q 150 60 240 150" stroke="green" stroke-width="6" fill="none" opacity="0.6"/>
                                        <path d="M 70 150 Q 150 70 230 150" stroke="blue" stroke-width="6" fill="none" opacity="0.6"/>
                                        <path d="M 80 150 Q 150 80 220 150" stroke="indigo" stroke-width="6" fill="none" opacity="0.6"/>
                                        <path d="M 90 150 Q 150 90 210 150" stroke="violet" stroke-width="6" fill="none" opacity="0.6"/>
                                    </svg>
                                </div>
                            </div>
                            
                            <!-- Ground elements -->
                            <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 60%;">
                                <!-- Flowers container -->
                                <div id="flowers-container" style="position: absolute; bottom: 0; left: 0; right: 0; height: 100%; pointer-events: none;">
                                    <!-- Flowers will be dynamically added -->
                                </div>
                                
                                <!-- Bunnies -->
                                <div id="farm-bunny-1" class="farm-bunny" style="position: absolute; bottom: 20px; left: 40px; transition: all 0.5s ease;">
                                    <svg width="50" height="50" viewBox="0 0 60 60">
                                        <g class="bunny-body" style="transform-origin: center bottom;">
                                            <!-- Shadow -->
                                            <ellipse cx="30" cy="55" rx="15" ry="3" fill="rgba(0,0,0,0.2)"/>
                                            <!-- Body -->
                                            <ellipse cx="30" cy="40" rx="18" ry="15" fill="#FFB6C1" stroke="#FF69B4" stroke-width="1"/>
                                            <!-- Belly -->
                                            <ellipse cx="30" cy="42" rx="12" ry="10" fill="#FFF0F5"/>
                                            <!-- Head -->
                                            <circle cx="30" cy="25" r="12" fill="#FFB6C1" stroke="#FF69B4" stroke-width="1"/>
                                            <!-- Ears -->
                                            <ellipse cx="24" cy="15" rx="4" ry="10" fill="#FFB6C1" stroke="#FF69B4" stroke-width="1" transform="rotate(-15 24 15)"/>
                                            <ellipse cx="36" cy="15" rx="4" ry="10" fill="#FFB6C1" stroke="#FF69B4" stroke-width="1" transform="rotate(15 36 15)"/>
                                            <ellipse cx="24" cy="15" rx="2" ry="6" fill="#FFC0CB" transform="rotate(-15 24 15)"/>
                                            <ellipse cx="36" cy="15" rx="2" ry="6" fill="#FFC0CB" transform="rotate(15 36 15)"/>
                                            <!-- Eyes -->
                                            <circle cx="26" cy="24" r="2" fill="black" class="bunny-eye"/>
                                            <circle cx="34" cy="24" r="2" fill="black" class="bunny-eye"/>
                                            <circle cx="27" cy="23" r="1" fill="white"/>
                                            <circle cx="35" cy="23" r="1" fill="white"/>
                                            <!-- Nose -->
                                            <ellipse cx="30" cy="28" rx="2" ry="1.5" fill="#FF1493"/>
                                            <!-- Mouth (changes with mood) -->
                                            <path class="bunny-mouth" d="M 28 29 Q 30 30 32 29" stroke="#FF1493" stroke-width="1.5" fill="none"/>
                                            <!-- Tail -->
                                            <circle cx="15" cy="40" r="5" fill="white"/>
                                            <!-- Paws -->
                                            <ellipse cx="22" cy="50" rx="4" ry="3" fill="#FFB6C1"/>
                                            <ellipse cx="38" cy="50" rx="4" ry="3" fill="#FFB6C1"/>
                                        </g>
                                    </svg>
                                </div>
                                
                                <div id="farm-bunny-2" class="farm-bunny" style="position: absolute; bottom: 35px; left: 120px; transition: all 0.5s ease;">
                                    <svg width="45" height="45" viewBox="0 0 60 60">
                                        <g class="bunny-body" style="transform-origin: center bottom;">
                                            <!-- Shadow -->
                                            <ellipse cx="30" cy="55" rx="15" ry="3" fill="rgba(0,0,0,0.2)"/>
                                            <!-- Body -->
                                            <ellipse cx="30" cy="40" rx="18" ry="15" fill="#E6E6FA" stroke="#9370DB" stroke-width="1"/>
                                            <!-- Belly -->
                                            <ellipse cx="30" cy="42" rx="12" ry="10" fill="#F8F8FF"/>
                                            <!-- Head -->
                                            <circle cx="30" cy="25" r="12" fill="#E6E6FA" stroke="#9370DB" stroke-width="1"/>
                                            <!-- Ears -->
                                            <ellipse cx="24" cy="15" rx="4" ry="10" fill="#E6E6FA" stroke="#9370DB" stroke-width="1" transform="rotate(-15 24 15)"/>
                                            <ellipse cx="36" cy="15" rx="4" ry="10" fill="#E6E6FA" stroke="#9370DB" stroke-width="1" transform="rotate(15 36 15)"/>
                                            <ellipse cx="24" cy="15" rx="2" ry="6" fill="#DDA0DD" transform="rotate(-15 24 15)"/>
                                            <ellipse cx="36" cy="15" rx="2" ry="6" fill="#DDA0DD" transform="rotate(15 36 15)"/>
                                            <!-- Eyes -->
                                            <circle cx="26" cy="24" r="2" fill="black" class="bunny-eye"/>
                                            <circle cx="34" cy="24" r="2" fill="black" class="bunny-eye"/>
                                            <circle cx="27" cy="23" r="1" fill="white"/>
                                            <circle cx="35" cy="23" r="1" fill="white"/>
                                            <!-- Nose -->
                                            <ellipse cx="30" cy="28" rx="2" ry="1.5" fill="#BA55D3"/>
                                            <!-- Mouth -->
                                            <path class="bunny-mouth" d="M 28 29 Q 30 30 32 29" stroke="#BA55D3" stroke-width="1.5" fill="none"/>
                                            <!-- Tail -->
                                            <circle cx="15" cy="40" r="5" fill="white"/>
                                            <!-- Paws -->
                                            <ellipse cx="22" cy="50" rx="4" ry="3" fill="#E6E6FA"/>
                                            <ellipse cx="38" cy="50" rx="4" ry="3" fill="#E6E6FA"/>
                                        </g>
                                    </svg>
                                </div>
                                
                                <div id="farm-bunny-3" class="farm-bunny" style="position: absolute; bottom: 15px; left: 200px; transition: all 0.5s ease;">
                                    <svg width="48" height="48" viewBox="0 0 60 60">
                                        <g class="bunny-body" style="transform-origin: center bottom;">
                                            <!-- Shadow -->
                                            <ellipse cx="30" cy="55" rx="15" ry="3" fill="rgba(0,0,0,0.2)"/>
                                            <!-- Body -->
                                            <ellipse cx="30" cy="40" rx="18" ry="15" fill="#B0E0E6" stroke="#4682B4" stroke-width="1"/>
                                            <!-- Belly -->
                                            <ellipse cx="30" cy="42" rx="12" ry="10" fill="#F0FFFF"/>
                                            <!-- Head -->
                                            <circle cx="30" cy="25" r="12" fill="#B0E0E6" stroke="#4682B4" stroke-width="1"/>
                                            <!-- Ears -->
                                            <ellipse cx="24" cy="15" rx="4" ry="10" fill="#B0E0E6" stroke="#4682B4" stroke-width="1" transform="rotate(-15 24 15)"/>
                                            <ellipse cx="36" cy="15" rx="4" ry="10" fill="#B0E0E6" stroke="#4682B4" stroke-width="1" transform="rotate(15 36 15)"/>
                                            <ellipse cx="24" cy="15" rx="2" ry="6" fill="#87CEEB" transform="rotate(-15 24 15)"/>
                                            <ellipse cx="36" cy="15" rx="2" ry="6" fill="#87CEEB" transform="rotate(15 36 15)"/>
                                            <!-- Eyes -->
                                            <circle cx="26" cy="24" r="2" fill="black" class="bunny-eye"/>
                                            <circle cx="34" cy="24" r="2" fill="black" class="bunny-eye"/>
                                            <circle cx="27" cy="23" r="1" fill="white"/>
                                            <circle cx="35" cy="23" r="1" fill="white"/>
                                            <!-- Nose -->
                                            <ellipse cx="30" cy="28" rx="2" ry="1.5" fill="#1E90FF"/>
                                            <!-- Mouth -->
                                            <path class="bunny-mouth" d="M 28 29 Q 30 30 32 29" stroke="#1E90FF" stroke-width="1.5" fill="none"/>
                                            <!-- Tail -->
                                            <circle cx="15" cy="40" r="5" fill="white"/>
                                            <!-- Paws -->
                                            <ellipse cx="22" cy="50" rx="4" ry="3" fill="#B0E0E6"/>
                                            <ellipse cx="38" cy="50" rx="4" ry="3" fill="#B0E0E6"/>
                                        </g>
                                    </svg>
                                </div>
                                
                                <!-- Hearts/Stars for celebration (hidden initially) -->
                                <div id="celebration-container" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; pointer-events: none;">
                                    <!-- Will be filled dynamically -->
                                </div>
                            </div>
                            
                            <!-- Error status display -->
                            <div id="farm-status" style="position: absolute; bottom: 10px; right: 10px; background: rgba(255,255,255,0.9); padding: 8px 12px; border-radius: 8px; font-size: 0.9rem; font-weight: bold; color: #2c3e50; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                                <span id="farm-error-text">Error: --</span>
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
                    
                    /* Bunny Farm Animations */
                    @keyframes bunnyHop {
                        0%, 100% { transform: translateY(0) scaleY(1); }
                        50% { transform: translateY(-15px) scaleY(0.95); }
                    }
                    
                    @keyframes bunnyJump {
                        0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
                        25% { transform: translateY(-25px) rotate(-5deg) scale(1.1); }
                        50% { transform: translateY(-40px) rotate(0deg) scale(1.15); }
                        75% { transform: translateY(-25px) rotate(5deg) scale(1.1); }
                    }
                    
                    @keyframes bunnySad {
                        0%, 100% { transform: translateY(0) scaleY(1); }
                        50% { transform: translateY(2px) scaleY(0.98); }
                    }
                    
                    @keyframes eyeBlink {
                        0%, 90%, 100% { transform: scaleY(1); }
                        95% { transform: scaleY(0.1); }
                    }
                    
                    @keyframes sunPulse {
                        0%, 100% { transform: scale(1); opacity: 1; }
                        50% { transform: scale(1.1); opacity: 0.8; }
                    }
                    
                    @keyframes cloudDrift {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(20px); }
                    }
                    
                    @keyframes flowerGrow {
                        0% { transform: scale(0) translateY(10px); opacity: 0; }
                        50% { transform: scale(1.1) translateY(-2px); }
                        100% { transform: scale(1) translateY(0); opacity: 1; }
                    }
                    
                    @keyframes heartFloat {
                        0% { 
                            transform: translateY(0) scale(0) rotate(0deg);
                            opacity: 0;
                        }
                        20% {
                            transform: translateY(-20px) scale(1) rotate(-5deg);
                            opacity: 1;
                        }
                        40% {
                            transform: translateY(-40px) scale(1.1) rotate(5deg);
                        }
                        60% {
                            transform: translateY(-60px) scale(1) rotate(-3deg);
                        }
                        80% {
                            transform: translateY(-80px) scale(0.9) rotate(3deg);
                            opacity: 0.5;
                        }
                        100% { 
                            transform: translateY(-100px) scale(0.8) rotate(0deg);
                            opacity: 0;
                        }
                    }
                    
                    @keyframes starSpin {
                        0% { 
                            transform: translateY(0) rotate(0deg) scale(0);
                            opacity: 0;
                        }
                        20% {
                            transform: translateY(-30px) rotate(72deg) scale(1);
                            opacity: 1;
                        }
                        40% {
                            transform: translateY(-60px) rotate(144deg) scale(1.2);
                        }
                        60% {
                            transform: translateY(-90px) rotate(216deg) scale(1);
                        }
                        80% {
                            transform: translateY(-120px) rotate(288deg) scale(0.8);
                            opacity: 0.5;
                        }
                        100% { 
                            transform: translateY(-150px) rotate(360deg) scale(0.5);
                            opacity: 0;
                        }
                    }
                    
                    @keyframes confettiFall {
                        0% {
                            transform: translateY(-100vh) rotate(0deg);
                            opacity: 1;
                        }
                        100% {
                            transform: translateY(100vh) rotate(720deg);
                            opacity: 0;
                        }
                    }
                    
                    .farm-bunny .bunny-body {
                        animation: bunnySad 3s infinite ease-in-out;
                    }
                    
                    .farm-bunny .bunny-eye {
                        animation: eyeBlink 4s infinite;
                        transform-origin: center;
                    }
                    
                    .farm-bunny.happy .bunny-body {
                        animation: bunnyHop 2s infinite ease-in-out;
                    }
                    
                    .farm-bunny.very-happy .bunny-body {
                        animation: bunnyJump 1.5s infinite ease-in-out;
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
                    
                    /* Remove spinner arrows from number inputs */
                    input[type="number"]::-webkit-inner-spin-button,
                    input[type="number"]::-webkit-outer-spin-button {
                        -webkit-appearance: none;
                        margin: 0;
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
            
            // Autofill button
            const autofillBtn = document.getElementById('autofill-btn');
            if (autofillBtn) {
                this.addEventListenerWithCleanup(autofillBtn, 'click', () => this._autofillErrors());
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
            
            // Input handlers for all fields
            const ageErrorInput = document.getElementById('age-error-input');
            const kgErrorInput = document.getElementById('kg-error-input');
            const ageLrInput = document.getElementById('age-lr-input');
            const kgLrInput = document.getElementById('kg-lr-input');
            
            if (ageErrorInput) {
                this.addEventListenerWithCleanup(ageErrorInput, 'input', () => this._checkCalculateButtonState());
            }
            
            if (kgErrorInput) {
                this.addEventListenerWithCleanup(kgErrorInput, 'input', () => this._checkCalculateButtonState());
            }
            
            if (ageLrInput) {
                this.addEventListenerWithCleanup(ageLrInput, 'input', () => this._checkCalculateButtonState());
                // Set default value
                ageLrInput.value = this.learningRate;
            }
            
            if (kgLrInput) {
                this.addEventListenerWithCleanup(kgLrInput, 'input', () => this._checkCalculateButtonState());
                // Set default value
                kgLrInput.value = this.learningRate;
            }
            
            // Update displays and recalculate errors
            this._updateTable();
            this._updateCoeffDisplay();
            this._calculateAndFillErrors();
        }
        
        _checkCalculateButtonState() {
            const ageErrorInput = document.getElementById('age-error-input');
            const kgErrorInput = document.getElementById('kg-error-input');
            const ageLrInput = document.getElementById('age-lr-input');
            const kgLrInput = document.getElementById('kg-lr-input');
            const calcBtn = document.getElementById('calculate-update-btn');
            
            if (ageErrorInput && kgErrorInput && ageLrInput && kgLrInput && calcBtn) {
                const ageValue = ageErrorInput.value.trim();
                const kgValue = kgErrorInput.value.trim();
                const ageLrValue = ageLrInput.value.trim();
                const kgLrValue = kgLrInput.value.trim();
                
                // Enable button only if all fields are entered
                if (ageValue !== '' && kgValue !== '' && ageLrValue !== '' && kgLrValue !== '') {
                    calcBtn.style.opacity = '1';
                    calcBtn.style.pointerEvents = 'auto';
                } else {
                    calcBtn.style.opacity = '0.5';
                    calcBtn.style.pointerEvents = 'none';
                }
            }
        }
        
        _calculatePrice(kg, age) {
            return this.ageCoeff * age + this.kgCoeff * kg;
        }
        
        _updateBunnyFarm() {
            const absTotal = Math.abs(this.totalError);
            const farmContainer = document.getElementById('bunny-farm-container');
            const sun = document.getElementById('sun');
            const cloud1 = document.getElementById('cloud1');
            const cloud2 = document.getElementById('cloud2');
            const rainbow = document.getElementById('rainbow');
            const farmErrorText = document.getElementById('farm-error-text');
            const bunny1 = document.getElementById('farm-bunny-1');
            const bunny2 = document.getElementById('farm-bunny-2');
            const bunny3 = document.getElementById('farm-bunny-3');
            const flowersContainer = document.getElementById('flowers-container');
            const celebrationContainer = document.getElementById('celebration-container');
            
            // Update error display
            if (farmErrorText) {
                farmErrorText.textContent = `Error: ${absTotal.toFixed(0)}`;
                farmErrorText.style.color = absTotal === 0 ? '#27ae60' : 
                                           absTotal < 50 ? '#3498db' : 
                                           absTotal < 100 ? '#f39c12' : '#e74c3c';
            }
            
            // Clear previous celebrations
            if (celebrationContainer) {
                celebrationContainer.innerHTML = '';
            }
            
            // Update bunny states and environment based on error
            if (absTotal === 0) {
                // PERFECT! Maximum happiness!
                [bunny1, bunny2, bunny3].forEach(bunny => {
                    if (bunny) {
                        bunny.classList.remove('happy');
                        bunny.classList.add('very-happy');
                        // Change mouth to big smile
                        const mouth = bunny.querySelector('.bunny-mouth');
                        if (mouth) {
                            mouth.setAttribute('d', 'M 26 29 Q 30 32 34 29');
                        }
                    }
                });
                
                // Perfect weather - bright sun, rainbow, no clouds
                if (sun) {
                    sun.style.opacity = '1';
                    sun.style.transform = 'scale(1.2)';
                }
                if (cloud1) cloud1.style.opacity = '0';
                if (cloud2) cloud2.style.opacity = '0';
                if (rainbow) rainbow.style.opacity = '1';
                
                // Sky gradient - perfect blue
                if (farmContainer) {
                    farmContainer.style.background = 'linear-gradient(to bottom, #87CEEB 0%, #ADD8E6 40%, #90EE90 40%, #98FB98 100%)';
                }
                
                // Add maximum flowers
                this._addFlowers(7);
                
                // Trigger celebration
                this._triggerCelebration();
                
            } else if (absTotal < 50) {
                // Very good - happy bunnies
                [bunny1, bunny2, bunny3].forEach(bunny => {
                    if (bunny) {
                        bunny.classList.add('happy');
                        bunny.classList.remove('very-happy');
                        // Happy mouth
                        const mouth = bunny.querySelector('.bunny-mouth');
                        if (mouth) {
                            mouth.setAttribute('d', 'M 28 29 Q 30 31 32 29');
                        }
                    }
                });
                
                // Good weather - some sun, few clouds
                if (sun) {
                    sun.style.opacity = '0.8';
                    sun.style.transform = 'scale(1)';
                }
                if (cloud1) cloud1.style.opacity = '0.2';
                if (cloud2) cloud2.style.opacity = '0.2';
                if (rainbow) rainbow.style.opacity = '0';
                
                // Nice sky
                if (farmContainer) {
                    farmContainer.style.background = 'linear-gradient(to bottom, #87CEEB 0%, #87CEEB 40%, #90EE90 40%, #90EE90 100%)';
                }
                
                // Add some flowers
                this._addFlowers(4);
                
            } else if (absTotal < 100) {
                // Okay - neutral bunnies
                [bunny1, bunny2, bunny3].forEach(bunny => {
                    if (bunny) {
                        bunny.classList.remove('happy', 'very-happy');
                        // Neutral mouth
                        const mouth = bunny.querySelector('.bunny-mouth');
                        if (mouth) {
                            mouth.setAttribute('d', 'M 28 29 Q 30 30 32 29');
                        }
                    }
                });
                
                // Cloudy weather
                if (sun) {
                    sun.style.opacity = '0.5';
                    sun.style.transform = 'scale(0.9)';
                }
                if (cloud1) cloud1.style.opacity = '0.5';
                if (cloud2) cloud2.style.opacity = '0.5';
                if (rainbow) rainbow.style.opacity = '0';
                
                // Slightly gray sky
                if (farmContainer) {
                    farmContainer.style.background = 'linear-gradient(to bottom, #B0C4DE 0%, #B0C4DE 40%, #90EE90 40%, #8FBC8F 100%)';
                }
                
                // Few flowers
                this._addFlowers(2);
                
            } else {
                // Bad - sad bunnies
                [bunny1, bunny2, bunny3].forEach(bunny => {
                    if (bunny) {
                        bunny.classList.remove('happy', 'very-happy');
                        // Sad mouth
                        const mouth = bunny.querySelector('.bunny-mouth');
                        if (mouth) {
                            mouth.setAttribute('d', 'M 28 31 Q 30 29 32 31');
                        }
                    }
                });
                
                // Overcast weather
                if (sun) {
                    sun.style.opacity = '0.2';
                    sun.style.transform = 'scale(0.8)';
                }
                if (cloud1) {
                    cloud1.style.opacity = '0.8';
                    cloud1.style.animation = 'cloudDrift 8s infinite alternate';
                }
                if (cloud2) {
                    cloud2.style.opacity = '0.8';
                    cloud2.style.animation = 'cloudDrift 10s infinite alternate-reverse';
                }
                if (rainbow) rainbow.style.opacity = '0';
                
                // Gray sky
                if (farmContainer) {
                    farmContainer.style.background = 'linear-gradient(to bottom, #778899 0%, #778899 40%, #808080 40%, #696969 100%)';
                }
                
                // No flowers
                if (flowersContainer) {
                    flowersContainer.innerHTML = '';
                }
            }
        }
        
        _addFlowers(count) {
            const flowersContainer = document.getElementById('flowers-container');
            if (!flowersContainer) return;
            
            // Clear existing flowers
            flowersContainer.innerHTML = '';
            
            // Add new flowers
            for (let i = 0; i < count; i++) {
                const flower = document.createElement('div');
                flower.style.cssText = `
                    position: absolute;
                    bottom: ${Math.random() * 40}px;
                    left: ${10 + Math.random() * 80}%;
                    animation: flowerGrow 1s ease-out ${i * 0.1}s both;
                `;
                
                flower.innerHTML = `
                    <svg width="25" height="25" viewBox="0 0 30 30">
                        <circle cx="15" cy="15" r="8" fill="${this._getRandomFlowerColor()}" opacity="0.8"/>
                        <circle cx="10" cy="10" r="3" fill="#FFE4B5"/>
                        <circle cx="20" cy="10" r="3" fill="#FFE4B5"/>
                        <circle cx="10" cy="20" r="3" fill="#FFE4B5"/>
                        <circle cx="20" cy="20" r="3" fill="#FFE4B5"/>
                        <circle cx="15" cy="15" r="4" fill="#FFD700"/>
                        <line x1="15" y1="23" x2="15" y2="30" stroke="#228B22" stroke-width="2"/>
                    </svg>
                `;
                
                flowersContainer.appendChild(flower);
            }
        }
        
        _getRandomFlowerColor() {
            const colors = ['#FF69B4', '#FF1493', '#DA70D6', '#BA55D3', '#9370DB', '#8A2BE2', '#FF6347', '#FF4500'];
            return colors[Math.floor(Math.random() * colors.length)];
        }
        
        _triggerCelebration() {
            const celebrationContainer = document.getElementById('celebration-container');
            if (!celebrationContainer) return;
            
            // Create hearts and stars
            for (let i = 0; i < 15; i++) {
                setTimeout(() => {
                    const isHeart = Math.random() > 0.5;
                    const elem = document.createElement('div');
                    elem.style.cssText = `
                        position: absolute;
                        bottom: ${Math.random() * 100}px;
                        left: ${Math.random() * 90}%;
                        pointer-events: none;
                        animation: ${isHeart ? 'heartFloat' : 'starSpin'} 3s ease-out forwards;
                    `;
                    
                    if (isHeart) {
                        elem.innerHTML = `
                            <svg width="30" height="30" viewBox="0 0 30 30">
                                <path d="M15 5 C10 0, 0 0, 0 10 C0 20, 15 30, 15 30 C15 30, 30 20, 30 10 C30 0, 20 0, 15 5 Z" 
                                      fill="#FF1493" opacity="0.8"/>
                            </svg>
                        `;
                    } else {
                        elem.innerHTML = `
                            <svg width="30" height="30" viewBox="0 0 30 30">
                                <path d="M15 0 L18 10 L28 10 L20 16 L23 26 L15 20 L7 26 L10 16 L2 10 L12 10 Z" 
                                      fill="#FFD700" opacity="0.9"/>
                            </svg>
                        `;
                    }
                    
                    celebrationContainer.appendChild(elem);
                    
                    // Remove after animation
                    setTimeout(() => elem.remove(), 3000);
                }, i * 200);
            }
            
            // Add confetti burst
            for (let i = 0; i < 20; i++) {
                const confetti = document.createElement('div');
                const color = ['#FF69B4', '#FFD700', '#00CED1', '#98FB98', '#FF6347'][Math.floor(Math.random() * 5)];
                confetti.style.cssText = `
                    position: fixed;
                    top: -10px;
                    left: ${Math.random() * 100}%;
                    width: 10px;
                    height: 10px;
                    background: ${color};
                    animation: confettiFall 3s linear forwards;
                    z-index: 10000;
                `;
                document.body.appendChild(confetti);
                setTimeout(() => confetti.remove(), 3000);
            }
        }
        
        _updateTable() {
            const bunnies = [
                { id: 'bunny1', kg: 2.0, age: 5, optimal: 250 },
                { id: 'bunny2', kg: 3.0, age: 2, optimal: 380 },
                { id: 'bunny3', kg: 2.5, age: 8, optimal: 180 }
            ];
            
            let totalEstimate = 0;
            let totalError = 0;
            
            bunnies.forEach(bunny => {
                const price = this._calculatePrice(bunny.kg, bunny.age);
                const error = price - bunny.optimal;
                totalEstimate += price;
                totalError += error;
                
                // Note: Coefficient displays are updated separately
                
                // Update estimate cell with colored coefficients
                const estimateEl = document.getElementById(`${bunny.id}-estimate`);
                if (estimateEl) {
                    estimateEl.innerHTML = `${bunny.age}×<span style="color: #2980b9; font-weight: bold;">${this.ageCoeff.toFixed(0)}</span> + ${bunny.kg}×<span style="color: #27ae60; font-weight: bold;">${this.kgCoeff.toFixed(0)}</span> = <strong>${price.toFixed(0)}</strong>`;
                }
                
                // Update error cell with calculation
                const errorEl = document.getElementById(`${bunny.id}-error`);
                if (errorEl) {
                    errorEl.innerHTML = `${price.toFixed(0)} - ${bunny.optimal} = <strong>${error > 0 ? '+' : ''}${error.toFixed(0)}</strong>`;
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
            
            const wkgBadge = document.getElementById('wkg-badge');
            if (wkgBadge) {
                wkgBadge.textContent = this.kgCoeff.toFixed(1);
            }
            
            const functionWage = document.getElementById('function-wage');
            if (functionWage) {
                functionWage.textContent = this.ageCoeff.toFixed(1);
            }
            
            const functionWkg = document.getElementById('function-wkg');
            if (functionWkg) {
                functionWkg.textContent = this.kgCoeff.toFixed(1);
            }
        }
        
        _calculateAndFillErrors() {
            const bunnies = [
                { id: 'bunny1', kg: 2.0, age: 5, optimal: 250 },
                { id: 'bunny2', kg: 3.0, age: 2, optimal: 380 },
                { id: 'bunny3', kg: 2.5, age: 8, optimal: 180 }
            ];
            
            this.totalError = 0;
            
            // Calculate errors for each bunny
            bunnies.forEach(bunny => {
                const price = this._calculatePrice(bunny.kg, bunny.age);
                const signedError = price - bunny.optimal;
                this.bunnyErrors[bunny.id] = signedError;
                this.totalError += signedError;
            });
            
            // Auto-fill learning rate inputs if empty
            const ageLrInput = document.getElementById('age-lr-input');
            const kgLrInput = document.getElementById('kg-lr-input');
            if (ageLrInput && !ageLrInput.value) {
                ageLrInput.value = this.learningRate;
            }
            if (kgLrInput && !kgLrInput.value) {
                kgLrInput.value = this.learningRate;
            }
            
            this._checkCalculateButtonState();
            
            // Update the bunny farm with the new error
            this._updateBunnyFarm();
            
            // Check for success
            const absTotal = Math.abs(this.bunnyErrors.bunny1) + Math.abs(this.bunnyErrors.bunny2) + Math.abs(this.bunnyErrors.bunny3);
            if (absTotal < 30) {
                this.completeLevel({
                    score: 100,
                    message: 'Perfect pricing formula!'
                });
            }
        }
        
        _calculateUpdate() {
            const ageErrorInput = document.getElementById('age-error-input');
            const kgErrorInput = document.getElementById('kg-error-input');
            const ageLrInput = document.getElementById('age-lr-input');
            const kgLrInput = document.getElementById('kg-lr-input');
            
            if (!ageErrorInput || !kgErrorInput || !ageLrInput || !kgLrInput) return;
            
            const ageError = parseFloat(ageErrorInput.value) || 0;
            const kgError = parseFloat(kgErrorInput.value) || 0;
            const ageLr = parseFloat(ageLrInput.value) || 0;
            const kgLr = parseFloat(kgLrInput.value) || 0;
            
            // Calculate updates
            const ageSum = 15; // 5 + 2 + 8
            const kgSum = 7.5; // 2.0 + 3.0 + 2.5
            
            // For age coefficient
            const ageSign = ageError > 0 ? -1 : 1;
            const absAgeError = Math.abs(ageError);
            this.ageUpdate = ageSign * absAgeError * ageSum * ageLr;
            
            // For kg coefficient
            const kgSign = kgError > 0 ? -1 : 1;
            const absKgError = Math.abs(kgError);
            this.kgUpdate = kgSign * absKgError * kgSum * kgLr;
            
            // Update age result display
            const ageResult = document.getElementById('age-result');
            if (ageResult) {
                const newAgeValue = this.ageCoeff + this.ageUpdate;
                ageResult.innerHTML = `= ${newAgeValue.toFixed(3)}`;
            }
            
            // Update kg result display
            const kgResult = document.getElementById('kg-result');
            if (kgResult) {
                const newKgValue = this.kgCoeff + this.kgUpdate;
                kgResult.innerHTML = `= ${newKgValue.toFixed(3)}`;
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
            this.kgCoeff = Math.max(0, Math.min(100, this.kgCoeff + this.kgUpdate));
            
            // Update displays and recalculate errors
            this._updateTable();
            this._updateCoeffDisplay();
            this._calculateAndFillErrors();
            
            // Clear all inputs and results but keep learning rates
            const ageErrorInput = document.getElementById('age-error-input');
            const kgErrorInput = document.getElementById('kg-error-input');
            const ageLrInput = document.getElementById('age-lr-input');
            const kgLrInput = document.getElementById('kg-lr-input');
            const ageResult = document.getElementById('age-result');
            const kgResult = document.getElementById('kg-result');
            
            if (ageErrorInput) ageErrorInput.value = '';
            if (kgErrorInput) kgErrorInput.value = '';
            // Keep the learning rates for next iteration
            if (ageResult) ageResult.innerHTML = '';
            if (kgResult) kgResult.innerHTML = '';
            
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
            
            const kgCurrent = document.getElementById('kg-current');
            if (kgCurrent) {
                kgCurrent.textContent = this.kgCoeff.toFixed(1);
            }
            
            // Also update the badge displays and function display
            const wageBadge = document.getElementById('wage-badge');
            if (wageBadge) {
                wageBadge.textContent = this.ageCoeff.toFixed(1);
            }
            
            const wkgBadge = document.getElementById('wkg-badge');
            if (wkgBadge) {
                wkgBadge.textContent = this.kgCoeff.toFixed(1);
            }
            
            const functionWage = document.getElementById('function-wage');
            if (functionWage) {
                functionWage.textContent = this.ageCoeff.toFixed(1);
            }
            
            const functionWkg = document.getElementById('function-wkg');
            if (functionWkg) {
                functionWkg.textContent = this.kgCoeff.toFixed(1);
            }
        }
        

        _autofillErrors() {
            // Autofill error inputs with the current total error
            const ageErrorInput = document.getElementById('age-error-input');
            const kgErrorInput = document.getElementById('kg-error-input');
            
            if (ageErrorInput && kgErrorInput) {
                ageErrorInput.value = this.totalError.toFixed(0);
                kgErrorInput.value = this.totalError.toFixed(0);
                
                // Check button state after autofilling
                this._checkCalculateButtonState();
            }
        }
        
        _reset() {
            this.ageCoeff = 20;
            this.kgCoeff = 30;
            this.totalError = 0;
            this.manualTotalError = 0;
            this.ageUpdate = 0;
            this.kgUpdate = 0;
            this.bunnyErrors = { bunny1: 0, bunny2: 0, bunny3: 0 };
            
            // Reset displays and recalculate errors
            this._updateTable();
            this._updateCoeffDisplay();
            this._calculateAndFillErrors();
            
            // Clear all inputs and results
            const ageErrorInput = document.getElementById('age-error-input');
            const kgErrorInput = document.getElementById('kg-error-input');
            const ageLrInput = document.getElementById('age-lr-input');
            const kgLrInput = document.getElementById('kg-lr-input');
            const ageResult = document.getElementById('age-result');
            const kgResult = document.getElementById('kg-result');
            
            if (ageErrorInput) ageErrorInput.value = '';
            if (kgErrorInput) kgErrorInput.value = '';
            if (ageLrInput) ageLrInput.value = this.learningRate;
            if (kgLrInput) kgLrInput.value = this.learningRate;
            if (ageResult) ageResult.innerHTML = '';
            if (kgResult) kgResult.innerHTML = '';
            
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
                'This column shows how much you paid for each bunny using your formula.',
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
            const kgResult = document.getElementById('kg-result');
            
            if (!gradientContainer || !ageResult || !kgResult) return;
            
            // Keep gradient container spotlighted
            this._addSpotlight(gradientContainer);
            
            // Store original styles
            this.ageResultOriginalStyle = ageResult.getAttribute('style') || '';
            this.kgResultOriginalStyle = kgResult.getAttribute('style') || '';
            
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
            
            kgResult.style.cssText += `
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
                    kgResult.setAttribute('style', this.kgResultOriginalStyle);
                    
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
            const kgResult = document.getElementById('kg-result');
            if (ageResult && this.ageResultOriginalStyle !== undefined) {
                ageResult.setAttribute('style', this.ageResultOriginalStyle || '');
            }
            if (kgResult && this.kgResultOriginalStyle !== undefined) {
                kgResult.setAttribute('style', this.kgResultOriginalStyle || '');
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
            const kgResult = document.getElementById('kg-result');
            if (applyBtn && ageResult && kgResult) {
                // If there are results displayed, enable the apply button
                if (ageResult.innerHTML && kgResult.innerHTML) {
                    applyBtn.style.opacity = '1';
                    applyBtn.style.pointerEvents = 'auto';
                } else {
                    applyBtn.style.opacity = '0.5';
                    applyBtn.style.pointerEvents = 'none';
                }
            }
        }
    }
    
    const level = new BunnyPricingLevel();
    level.create().catch(error => {
        console.error('Failed to create Bunny Pricing level:', error);
    });
    
    return level;
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.createPizzaProduction;
}