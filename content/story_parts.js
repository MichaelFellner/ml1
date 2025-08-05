function createStoryPart4() {
    const container = document.getElementById('app');
    
    container.innerHTML = `
        <div class="current-level">
            <div class="story-header">
                <h2>🤖 Mission Briefing</h2>
                <div class="story-progress">Story Part 4</div>
            </div>
            <div class="level-content">
                <div class="story-section">
                    <div class="story-text">
                        <h3>The Great Robot Awakening</h3>
                        <p>The facility hums with anticipation. Before you lies the massive robot storage warehouse - home to <strong>1,000 dormant robots</strong> waiting to be activated.</p>
                        
                        <p>Your mission is clear: <em>Wake them all up.</em></p>
                        
                        <p>But this isn't just about flipping a switch. Each robot has its own optimal energy configuration, and the fleet follows complex distribution patterns. You'll need to master individual robot tuning before you can handle the entire population.</p>
                        
                        <p>Ready to begin the awakening process?</p>
                    </div>
                    
                    <div class="story-visual">
                        <h4>Robot Fleet Preview</h4>
                        <div id="storyRobotGrid" class="story-robot-grid"></div>
                        <div class="fleet-stats">
                            <div class="stat-item">
                                <span class="stat-number">1,000</span>
                                <span class="stat-label">Total Robots</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number">0</span>
                                <span class="stat-label">Currently Active</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number">100%</span>
                                <span class="stat-label">Mission Progress</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('story4', 'createStoryPart4');
    setupStoryPart4();
}

function setupStoryPart4() {
    const robotGrid = document.getElementById('storyRobotGrid');
    
    // Create a visual representation of the robot fleet
    createStoryRobotGrid(robotGrid);
    
    // Add some subtle animation to the robots
    setTimeout(() => {
        animateRobotGrid();
    }, 500);
}

function createStoryRobotGrid(container) {
    container.innerHTML = '';
    
    // Create a smaller grid for story visualization (20x20 = 400 dots to represent 1000 robots)
    for (let i = 0; i < 400; i++) {
        const dot = document.createElement('div');
        dot.className = 'story-robot-dot dormant';
        container.appendChild(dot);
    }
}

function animateRobotGrid() {
    const dots = document.querySelectorAll('.story-robot-dot');
    
    // Add a subtle pulsing animation to random dots to show they're "sleeping"
    setInterval(() => {
        // Reset all dots
        dots.forEach(dot => {
            dot.classList.remove('pulse');
        });
        
        // Randomly pulse a few dots
        const numToPulse = Math.floor(Math.random() * 10) + 5;
        for (let i = 0; i < numToPulse; i++) {
            const randomIndex = Math.floor(Math.random() * dots.length);
            dots[randomIndex].classList.add('pulse');
        }
    }, 2000);
}

// Alternative function if you want to create the story part that comes before Level 7
function createRobotFleetIntro() {
    const container = document.getElementById('app');
    
    container.innerHTML = `
        <div class="current-level">
            <div class="story-header">
                <div class="level-indicator">
                    <div class="level-dots">
                        <span class="dot completed"></span>
                        <span class="dot completed"></span>
                        <span class="dot completed"></span>
                        <span class="dot completed"></span>
                        <span class="dot completed"></span>
                        <span class="dot current"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                    </div>
                </div>
                <h2>🏭 The Robot Facility</h2>
            </div>
            <div class="level-content">
                <div class="facility-overview">
                    <div class="story-content">
                        <div class="mission-brief">
                            <h3>Your Ultimate Challenge</h3>
                            <p>Welcome to the central robot facility. Here, <span class="highlight">1,000 advanced robots</span> lie dormant, waiting for activation.</p>
                            
                            <p>Your task: <strong>Activate every single robot</strong> in the facility. But first, you must learn how to properly configure individual robots and understand their energy patterns.</p>
                            
                            <div class="warning-box">
                                ⚠️ <strong>Important:</strong> Each robot has unique optimal energy levels. Mass activation without proper understanding could lead to system failures.
                            </div>
                            
                            <p>Let's start with a small squad to master the fundamentals...</p>
                        </div>
                        
                        <div class="facility-grid-container">
                            <div class="grid-label">Robot Storage Facility</div>
                            <div id="facilityGrid" class="facility-grid"></div>
                            <div class="grid-info">
                                <span class="robot-count">1,000 Robots</span>
                                <span class="status-dormant">● All Dormant</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('story4', 'createRobotFleetIntro');
    setupRobotFleetIntro();
}

function setupRobotFleetIntro() {
    const facilityGrid = document.getElementById('facilityGrid');
    
    // Create facility grid (smaller representation)
    for (let i = 0; i < 500; i++) { // 500 dots to represent 1000 robots
        const dot = document.createElement('div');
        dot.className = 'facility-robot-dot';
        facilityGrid.appendChild(dot);
    }
    
    // Add some visual interest
    setTimeout(() => {
        addFacilityAnimation();
    }, 1000);
}

function addFacilityAnimation() {
    const dots = document.querySelectorAll('.facility-robot-dot');
    
    // Occasionally light up random dots briefly to show they're "alive but sleeping"
    setInterval(() => {
        const randomDot = dots[Math.floor(Math.random() * dots.length)];
        randomDot.classList.add('brief-glow');
        
        setTimeout(() => {
            randomDot.classList.remove('brief-glow');
        }, 1000);
    }, 800);
}


/// Story part 5 - between Level 7 and 8
function createStoryPart5() {
    const container = document.getElementById('app');
    
    container.innerHTML = `
        <div class="current-level">
            <div class="story-header">
                <h2>📊 Training Data Discovery</h2>
                <div class="story-progress">Story Part 5</div>
            </div>
            <div class="level-content">
                <div class="story-section">
                    <div class="story-text">
                        <h3>The Manual Labor Revelation</h3>
                        <p>You've been at this for hours now, manually configuring robot after robot. Your fingers are tired from adjusting sliders, and you've successfully set the energy levels for <strong>50 different robots</strong>.</p>
                        
                        <p>But as you look at all the data you've collected, something catches your eye...</p>
                        
                        <p><em>The average energy level across all 50 robots is exactly <span class="highlight">75</span>!</em></p>
                        
                        <p>Wait a minute... This reminds you of something. Remember when you trained Fido to find his bone using all those examples? You collected training data then too!</p>
                        
                        <p>Maybe instead of manually setting each robot one by one, you could use this <strong>training data</strong> to understand the pattern and configure robots more efficiently...</p>
                        
                        <div class="data-insight">
                            <div class="insight-box">
                                <div class="insight-icon">💡</div>
                                <div class="insight-text">
                                    <strong>Training Data = Power</strong><br>
                                    Just like with Fido's bone, we can use patterns in our data to make predictions!
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="story-visual">
                        <h4>📋 Your Training Data</h4>
                        <div class="spreadsheet-container">
                            <div class="spreadsheet-header">
                                <div class="header-cell">Robot Name</div>
                                <div class="header-cell">Energy Level</div>
                            </div>
                            <div id="robotSpreadsheet" class="spreadsheet-body">
                                <!-- Robot data will be populated here -->
                            </div>
                        </div>
                        
                        <div class="data-summary">
                            <div class="summary-item">
                                <span class="summary-number">50</span>
                                <span class="summary-label">Robots</span>
                            </div>
                            <div class="summary-item">
                                <span class="summary-number" id="averageDisplay">75</span>
                                <span class="summary-label">Average Energy</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('story5', 'createStoryPart5');
    setupStoryPart5();
}

function setupStoryPart5() {
    const spreadsheet = document.getElementById('robotSpreadsheet');
    
    // Generate robot training data
    const robotData = generateTrainingData();
    
    // Populate the spreadsheet
    populateSpreadsheet(spreadsheet, robotData);
    
    // Calculate and display actual average
    const actualAverage = Math.round(robotData.reduce((sum, robot) => sum + robot.energy, 0) / robotData.length);
    document.getElementById('averageDisplay').textContent = actualAverage;
}

function generateTrainingData() {
    const robots = [];
    const targetAverage = 75;
    const numRobots = 50;
    
    // Generate base energy levels with some variation
    const energyLevels = [];
    
    // Create a distribution that will average to 75
    for (let i = 0; i < numRobots; i++) {
        let energy;
        const rand = Math.random();
        
        if (rand < 0.3) {
            // 30% low energy (50-70)
            energy = Math.floor(Math.random() * 21) + 50;
        } else if (rand < 0.7) {
            // 40% medium energy (70-80)
            energy = Math.floor(Math.random() * 11) + 70;
        } else {
            // 30% high energy (80-100)
            energy = Math.floor(Math.random() * 21) + 80;
        }
        
        energyLevels.push(energy);
    }
    
    // Adjust to make average exactly 75
    const currentSum = energyLevels.reduce((sum, val) => sum + val, 0);
    const targetSum = targetAverage * numRobots;
    const difference = targetSum - currentSum;
    const adjustment = Math.floor(difference / numRobots);
    const remainder = difference % numRobots;
    
    // Apply adjustments
    for (let i = 0; i < numRobots; i++) {
        energyLevels[i] += adjustment;
        if (i < remainder) {
            energyLevels[i] += 1;
        }
        // Keep within bounds
        energyLevels[i] = Math.max(1, Math.min(100, energyLevels[i]));
    }
    
    // Create robot objects
    for (let i = 0; i < numRobots; i++) {
        robots.push({
            name: `Robot-${String(i + 1).padStart(3, '0')}`,
            energy: energyLevels[i]
        });
    }
    
    return robots;
}

function populateSpreadsheet(container, robotData) {
    container.innerHTML = robotData.map(robot => `
        <div class="spreadsheet-row">
            <div class="data-cell robot-name">${robot.name}</div>
            <div class="data-cell energy-cell">
                <div class="energy-bar-mini">
                    <div class="energy-fill-mini" style="width: ${robot.energy}%"></div>
                </div>
                <span class="energy-text">${robot.energy}</span>
            </div>
        </div>
    `).join('');
}


// Story part 6 - after Level 8
function createStoryPart6() {
    const container = document.getElementById('app');
    
    container.innerHTML = `
        <div class="current-level">
            <div class="story-header">
                <h2>🔍 More Data Needed</h2>
                <div class="story-progress">Story Part 6</div>
            </div>
            <div class="level-content">
                <div class="story-section">
                    <div class="story-text">
                        <h3>The Average Wasn't Enough</h3>
                        <p>Well, that didn't work as expected... Using just the <strong>average energy level of 75</strong> to configure all the robots led to some pretty mixed results!</p>
                        
                        <p>Some robots worked perfectly, others were completely wrong. It seems like there's more to this puzzle than just a simple average.</p>
                        
                        <p>Maybe we need to look at <em>more information</em> about each robot to make better predictions?</p>
                        
                        <p>Let's examine our training data more carefully. What if each robot's optimal energy level depends on their <strong>physical characteristics</strong> too?</p>
                        
                        <div class="data-insight">
                            <div class="insight-box">
                                <div class="insight-icon">🧩</div>
                                <div class="insight-text">
                                    <strong>More Features = Better Predictions</strong><br>
                                    Physical characteristics might be the missing piece of the puzzle!
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="story-visual">
                        <h4>📋 Expanded Training Data</h4>
                        <p class="data-description">Robot energy levels with physical measurements (in³)</p>
                        <div class="spreadsheet-container">
                            <div class="expanded-spreadsheet-header">
                                <div class="header-cell">Robot</div>
                                <div class="header-cell">Head Size</div>
                                <div class="header-cell">Body Size</div>
                                <div class="header-cell">Leg Size</div>
                                <div class="header-cell">Energy</div>
                            </div>
                            <div id="expandedRobotSpreadsheet" class="spreadsheet-body">
                                <!-- Robot data will be populated here -->
                            </div>
                        </div>
                        
                        <div class="expanded-data-summary">
                            <div class="summary-item">
                                <span class="summary-number">50</span>
                                <span class="summary-label">Robots</span>
                            </div>
                            <div class="summary-item">
                                <span class="summary-number">3</span>
                                <span class="summary-label">Features</span>
                            </div>
                            <div class="summary-item">
                                <span class="summary-number" id="expandedAverageDisplay">75</span>
                                <span class="summary-label">Target (Energy)</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('story6', 'createStoryPart6');
    setupStoryPart6();
}

function setupStoryPart6() {
    const spreadsheet = document.getElementById('expandedRobotSpreadsheet');
    
    // Generate expanded robot training data
    const robotData = generateExpandedTrainingData();
    
    // Populate the spreadsheet
    populateExpandedSpreadsheet(spreadsheet, robotData);
    
    // Calculate and display actual average
    const actualAverage = Math.round(robotData.reduce((sum, robot) => sum + robot.energy, 0) / robotData.length);
    document.getElementById('expandedAverageDisplay').textContent = actualAverage;
}

function generateExpandedTrainingData() {
    const robots = [];
    const targetAverage = 75;
    const numRobots = 50;
    
    for (let i = 0; i < numRobots; i++) {
        // Generate robot physical characteristics between 5-100 inch³
        const headSize = Math.floor(Math.random() * 96) + 5;  // 5-100 inch³
        const bodySize = Math.floor(Math.random() * 96) + 5;  // 5-100 inch³
        const legSize = Math.floor(Math.random() * 96) + 5;   // 5-100 inch³
        
        // Create a realistic energy calculation based on physical characteristics
        // Larger robots generally need more energy, but with some variation
        let baseEnergy = 20; // Base energy
        baseEnergy += (headSize / 100) * 15;  // Head contributes up to 15 energy
        baseEnergy += (bodySize / 100) * 35;  // Body contributes up to 35 energy  
        baseEnergy += (legSize / 100) * 20;   // Legs contribute up to 20 energy
        
        // Add some randomness to make it more realistic
        baseEnergy += Math.floor(Math.random() * 20) - 10; // ±10 random variation
        
        // Clamp to reasonable bounds
        const energy = Math.max(25, Math.min(100, Math.round(baseEnergy)));
        
        robots.push({
            name: `Robot-${String(i + 1).padStart(3, '0')}`,
            headSize: headSize,
            bodySize: bodySize,
            legSize: legSize,
            energy: energy
        });
    }
    
    // Fine-tune to get close to average of 75
    const currentAverage = robots.reduce((sum, robot) => sum + robot.energy, 0) / numRobots;
    const adjustment = targetAverage - currentAverage;
    
    // Apply small adjustments to get closer to 75 average
    robots.forEach(robot => {
        robot.energy = Math.max(25, Math.min(100, Math.round(robot.energy + adjustment)));
    });
    
    return robots;
}

function populateExpandedSpreadsheet(container, robotData) {
    container.innerHTML = robotData.map(robot => `
        <div class="expanded-spreadsheet-row">
            <div class="data-cell robot-name">${robot.name}</div>
            <div class="data-cell size-cell">
                <span class="size-value">${robot.headSize}</span>
                <span class="size-unit">in³</span>
            </div>
            <div class="data-cell size-cell">
                <span class="size-value">${robot.bodySize}</span>
                <span class="size-unit">in³</span>
            </div>
            <div class="data-cell size-cell">
                <span class="size-value">${robot.legSize}</span>
                <span class="size-unit">in³</span>
            </div>
            <div class="data-cell energy-cell">
                <div class="energy-bar-mini">
                    <div class="energy-fill-mini" style="width: ${robot.energy}%"></div>
                </div>
                <span class="energy-text">${robot.energy}</span>
            </div>
        </div>
    `).join('');
}




// Story part 7 - after Level 11
function createStoryPart7() {
    const container = document.getElementById('app');
    
    container.innerHTML = `
        <div class="current-level">
            <div class="story-header">
                <h2>🎉 Congratulations!</h2>
                <div class="story-progress">Story Part 7</div>
            </div>
            <div class="level-content">
                <div class="story-section-full">
                    <div class="congratulations-text">
                        <h3>You've Mastered the Fundamentals!</h3>
                        <p>You've learned about <strong>loss</strong>, <strong>steps</strong>, <strong>training data</strong>, and using <strong>gradient descent</strong> to make predictions. </p>
                        
                        <p class="big-reveal">🤖 <em>This is exactly how ALL AI works - even the most complex ones!</em> 🤖</p>
                        
                        <p>Let's see how the same gradient descent process you just learned powers the AI systems you use every day:</p>
                    </div>
                    
                    <div class="ai-examples">
                        <div class="ai-example">
                            <div class="ai-header">
                                <h4>💬 ChatGPT - Text Generation</h4>
                                <button id="chatgptBtn" class="gradient-btn" data-example="chatgpt" data-step="0">
                                    📉 Gradient Descent Step
                                </button>
                            </div>
                            <div class="ai-output">
                                <div class="output-label">ChatGPT Output:</div>
                                <div id="chatgptOutput" class="output-text">awowoejfoijew xkjqwhe zxmcjkwq</div>
                            </div>
                            <div class="progress-bar">
                                <div id="chatgptProgress" class="progress-fill" style="width: 0%"></div>
                            </div>
                        </div>
                        
                        <div class="ai-example">
                            <div class="ai-header">
                                <h4>👁️ Image Recognition - Object Detection</h4>
                                <button id="visionBtn" class="gradient-btn" data-example="vision" data-step="0">
                                    📉 Gradient Descent Step
                                </button>
                            </div>
                            <div class="ai-output">
                                <div class="output-label">AI Sees:</div>
                                <div id="visionOutput" class="output-text">??? unclear blob ??? noise ???</div>
                            </div>
                            <div class="progress-bar">
                                <div id="visionProgress" class="progress-fill" style="width: 0%"></div>
                            </div>
                        </div>
                        
                        <div class="ai-example">
                            <div class="ai-header">
                                <h4>🚗 Self-Driving Car - Navigation</h4>
                                <button id="carBtn" class="gradient-btn" data-example="car" data-step="0">
                                    📉 Gradient Descent Step
                                </button>
                            </div>
                            <div class="ai-output">
                                <div class="output-label">Driving Behavior:</div>
                                <div id="carOutput" class="output-text">*CRASH* *swerve* *random turns* *BEEP*</div>
                            </div>
                            <div class="progress-bar">
                                <div id="carProgress" class="progress-fill" style="width: 0%"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="final-message">
                        <div class="insight-box">
                            <div class="insight-icon">🧠</div>
                            <div class="insight-text">
                                <strong>The Magic of AI</strong><br>
                                Every AI system uses the same basic process you just learned: adjust parameters using gradient descent to minimize loss on training data!
                            </div>
                        </div>
                    </div>
                </div>
                
                <div id="storyNavigation">
                    ${createStandardNavigation()}
                </div>
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('story7', 'createStoryPart7');
    setupStoryPart7();
}

function setupStoryPart7() {
    // Training progressions for each AI example
    const progressions = {
        chatgpt: [
            "awowoejfoijew xkjqwhe zxmcjkwq",
            "I do... good... learned... talk...",
            "I do say good sir, I've learned to talk!",
            "I do say good sir, it appears I've learned how to talk!"
        ],
        vision: [
            "??? unclear blob ??? noise ???",
            "maybe... animal? four legs?",
            "looks like... a dog? brown fur?",
            "Golden Retriever, sitting, outdoor setting"
        ],
        car: [
            "*CRASH* *swerve* *random turns* *BEEP*",
            "wobbling... staying in lane... mostly...",
            "smooth driving, proper turns, good speed",
            "Perfect navigation: safe, efficient, autonomous"
        ]
    };
    
    // Set up gradient descent buttons
    document.querySelectorAll('.gradient-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const example = e.target.dataset.example;
            let currentStep = parseInt(e.target.dataset.step);
            
            if (currentStep < 3) {
                currentStep++;
                e.target.dataset.step = currentStep;
                
                // Update output text
                const outputElement = document.getElementById(example + 'Output');
                const progressElement = document.getElementById(example + 'Progress');
                
                outputElement.textContent = progressions[example][currentStep];
                progressElement.style.width = (currentStep / 3 * 100) + '%';
                
                // Update button text
                if (currentStep === 3) {
                    e.target.textContent = '✅ Training Complete!';
                    e.target.disabled = true;
                    e.target.style.background = '#4CAF50';
                } else {
                    e.target.textContent = `📉 Gradient Descent Step (${currentStep}/3)`;
                }
            }
        });
    });
}


// Story part 8 - immediately after Story Part 7
function createStoryPart8() {
    const container = document.getElementById('app');
    
    container.innerHTML = `
        <div class="current-level">
            <div class="story-header">
                <h2>🤔 But Wait... What Makes Complex AI Special?</h2>
                <div class="story-progress">Story Part 8</div>
            </div>
            <div class="level-content">
                <div class="story-section-full">
                    <div class="question-intro">
                        <p>You might be wondering: <em>"If all AI uses the same gradient descent process I just learned, what makes something like ChatGPT or image recognition so much more powerful than our simple robot energy predictor?"</em></p>
                        
                        <p><strong>Great question!</strong> It's all about scale and complexity. Let's break it down:</p>
                    </div>
                    
                    <div class="complexity-sections">
                        <div class="complexity-section">
                            <div class="section-header">
                                <span class="section-number">1</span>
                                <h3>🧮 More Complex Functions</h3>
                            </div>
                            <div class="section-content">
                                <p>You used a simple function to predict robot energy:</p>
                                <div class="function-display simple">
                                    <strong>Your Function:</strong><br>
                                    f(x) = w₁×head + w₂×body + w₃×leg + bias
                                </div>
                                
                                <p>But complex AI systems use <em>much more complicated functions</em> with layers upon layers of calculations:</p>
                                <div class="function-display complex">
                                    <strong>Complex AI Function:</strong><br>
                                    f(x) = ReLU(W₄(ReLU(W₃(ReLU(W₂(ReLU(W₁(X))))))))
                                    <div class="function-note">
                                        (This might have millions of parameters instead of just 4!)
                                    </div>
                                </div>
                                
                                <p>Don't worry about what all those symbols mean - the key point is that <strong>complex AI uses incredibly sophisticated mathematical functions</strong> that can capture much more nuanced patterns than our simple linear equation.</p>
                            </div>
                        </div>
                        
                        <div class="complexity-section">
                            <div class="section-header">
                                <span class="section-number">2</span>
                                <h3>📊 Massive Scale: More Data & Features</h3>
                            </div>
                            <div class="section-content">
                                <div class="scale-comparison">
                                    <div class="scale-item your-scale">
                                        <h4>🤖 Your Robot Predictor</h4>
                                        <div class="scale-stats">
                                            <div class="stat-big">50</div>
                                            <div class="stat-label">Training Samples</div>
                                        </div>
                                        <div class="scale-stats">
                                            <div class="stat-big">3</div>
                                            <div class="stat-label">Features</div>
                                        </div>
                                    </div>
                                    
                                    <div class="scale-vs">VS</div>
                                    
                                    <div class="scale-item ai-scale">
                                        <h4>🧠 Complex AI Systems</h4>
                                        <div class="scale-stats">
                                            <div class="stat-big">100M+</div>
                                            <div class="stat-label">Training Samples</div>
                                        </div>
                                        <div class="scale-stats">
                                            <div class="stat-big">1M+</div>
                                            <div class="stat-label">Features</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="example-box">
                                    <h4>🖼️ Real Example: Image Recognition</h4>
                                    <p>When AI looks at photos, <strong>every single pixel is a feature!</strong></p>
                                    <div class="image-example">
                                        <div class="image-size">100×100 image</div>
                                        <div class="feature-calculation">
                                            = 100 × 100 × 3 colors<br>
                                            = <strong>30,000 features</strong>
                                        </div>
                                    </div>
                                    <p>And that's just for a tiny 100×100 photo! Modern AI trains on millions of high-resolution images.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="key-insight">
                        <div class="insight-box">
                            <div class="insight-icon">💡</div>
                            <div class="insight-text">
                                <strong>The Big Picture</strong><br>
                                Complex AI = Same gradient descent process you learned + Much more complex functions + Massive amounts of data and features
                            </div>
                        </div>
                    </div>
                    
                    <div class="congratulations-final">
                        <h3>🎓 You Now Understand AI!</h3>
                        <p>You've learned the fundamental principle that powers all modern artificial intelligence. Whether it's ChatGPT, image recognition, self-driving cars, or any other AI system - they all use the same core process you just mastered!</p>
                    </div>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('story8', 'createStoryPart8');
}

// Optional: Create a final completion screen
function createFinalCompletion() {
    const container = document.getElementById('app');
    
    container.innerHTML = `
        <div class="current-level">
            <div class="completion-header">
                <h1>🎉 Congratulations! 🎉</h1>
                <h2>You've Completed Your AI Education!</h2>
            </div>
            <div class="level-content">
                <div class="completion-content">
                    <p>You now understand the fundamental principles that power all modern AI:</p>
                    <ul class="achievement-list">
                        <li>✅ Loss functions and optimization</li>
                        <li>✅ Training data and features</li>
                        <li>✅ Gradient descent algorithm</li>
                        <li>✅ How simple principles scale to complex systems</li>
                    </ul>
                    <p><strong>You're ready to explore the world of AI with confidence!</strong></p>
                </div>
                
                ${createStandardNavigation(false, true)}
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation('final', 'createFinalCompletion');
}