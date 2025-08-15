/**
 * Color Pattern Memory Level
 * 
 * @type interactive
 * @difficulty beginner
 * @estimatedTime 5
 * @description A fun memory game where players repeat color patterns
 * @tags memory, colors, game, interactive
 * @icon 🌈
 */

function createColorPatternMemory() {
    const app = document.getElementById('app');
    
    // Game state
    let sequence = [];
    let playerSequence = [];
    let level = 1;
    let isPlaying = false;
    let isShowingSequence = false;
    
    const colors = [
        { name: 'red', hex: '#ef4444', light: '#fca5a5' },
        { name: 'blue', hex: '#3b82f6', light: '#93bbfc' },
        { name: 'green', hex: '#10b981', light: '#6ee7b7' },
        { name: 'yellow', hex: '#f59e0b', light: '#fcd34d' }
    ];
    
    // Create level content
    app.innerHTML = `
        <div class="level-container" style="padding: 40px; text-align: center; color: white;">
            <h1 style="font-size: 3em; margin-bottom: 20px;">
                🌈 Color Pattern Memory
            </h1>
            
            <div style="max-width: 600px; margin: 0 auto;">
                <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 15px; margin-bottom: 30px;">
                    <p style="font-size: 1.2em; margin-bottom: 10px;">
                        Watch the color sequence, then repeat it!
                    </p>
                    <div style="font-size: 1.5em; margin: 10px 0;">
                        Level: <span id="level-display" style="color: #fbbf24; font-weight: bold;">1</span>
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        Score: <span id="score-display" style="color: #4ade80; font-weight: bold;">0</span>
                    </div>
                </div>
                
                <!-- Game Board -->
                <div id="game-board" style="
                    display: grid;
                    grid-template-columns: repeat(2, 150px);
                    grid-gap: 20px;
                    justify-content: center;
                    margin: 30px auto;
                ">
                    ${colors.map((color, index) => `
                        <button 
                            id="color-${color.name}"
                            data-color="${color.name}"
                            data-index="${index}"
                            onclick="handleColorClick('${color.name}')"
                            style="
                                width: 150px;
                                height: 150px;
                                background: ${color.hex};
                                border: none;
                                border-radius: 15px;
                                cursor: pointer;
                                transition: all 0.3s;
                                box-shadow: 0 4px 6px rgba(0,0,0,0.2);
                                font-size: 2em;
                            "
                            onmouseover="if(!window.isShowingSequence) this.style.transform='scale(1.05)'"
                            onmouseout="this.style.transform='scale(1)'"
                            disabled
                        >
                            ${['🔴', '🔵', '🟢', '🟡'][index]}
                        </button>
                    `).join('')}
                </div>
                
                <!-- Controls -->
                <div style="margin-top: 30px;">
                    <button id="start-btn" onclick="startGame()" style="
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        border: none;
                        padding: 15px 40px;
                        font-size: 1.2em;
                        border-radius: 10px;
                        cursor: pointer;
                        transition: transform 0.2s;
                        margin: 5px;
                    " onmouseover="this.style.transform='scale(1.05)'" 
                       onmouseout="this.style.transform='scale(1)'">
                        Start Game
                    </button>
                    
                    <button onclick="resetGame()" style="
                        background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
                        color: white;
                        border: none;
                        padding: 15px 40px;
                        font-size: 1.2em;
                        border-radius: 10px;
                        cursor: pointer;
                        transition: transform 0.2s;
                        margin: 5px;
                    " onmouseover="this.style.transform='scale(1.05)'" 
                       onmouseout="this.style.transform='scale(1)'">
                        Reset
                    </button>
                </div>
                
                <!-- Message Display -->
                <div id="message" style="
                    margin-top: 20px;
                    font-size: 1.2em;
                    min-height: 30px;
                    color: #fbbf24;
                ">
                    Press "Start Game" to begin!
                </div>
                
                <!-- Instructions -->
                <div style="margin-top: 30px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 10px;">
                    <h3 style="color: #93bbfc;">How to Play:</h3>
                    <ul style="text-align: left; display: inline-block; margin: 10px 0;">
                        <li>Watch the color sequence carefully</li>
                        <li>Click the colors in the same order</li>
                        <li>Each level adds one more color to remember</li>
                        <li>How many can you remember?</li>
                    </ul>
                </div>
            </div>
            
            ${typeof createStandardNavigation === 'function' ? createStandardNavigation() : ''}
        </div>
    `;
    
    // Game functions
    window.startGame = function() {
        if (isPlaying) return;
        
        isPlaying = true;
        level = 1;
        updateDisplay();
        document.getElementById('start-btn').disabled = true;
        playRound();
    };
    
    window.resetGame = function() {
        isPlaying = false;
        isShowingSequence = false;
        level = 1;
        sequence = [];
        playerSequence = [];
        updateDisplay();
        
        document.getElementById('start-btn').disabled = false;
        document.getElementById('message').textContent = 'Press "Start Game" to begin!';
        
        // Reset button states
        colors.forEach(color => {
            const btn = document.getElementById(`color-${color.name}`);
            btn.disabled = true;
            btn.style.opacity = '1';
        });
    };
    
    window.playRound = function() {
        sequence = [];
        playerSequence = [];
        
        // Generate sequence
        for (let i = 0; i < level + 2; i++) {
            sequence.push(colors[Math.floor(Math.random() * colors.length)].name);
        }
        
        document.getElementById('message').textContent = 'Watch the sequence...';
        showSequence();
    };
    
    window.showSequence = function() {
        isShowingSequence = true;
        let index = 0;
        
        const interval = setInterval(() => {
            if (index >= sequence.length) {
                clearInterval(interval);
                isShowingSequence = false;
                enableButtons();
                document.getElementById('message').textContent = 'Your turn! Repeat the sequence.';
                return;
            }
            
            flashColor(sequence[index]);
            index++;
        }, 800);
    };
    
    window.flashColor = function(colorName) {
        const btn = document.getElementById(`color-${colorName}`);
        const originalBg = btn.style.background;
        const color = colors.find(c => c.name === colorName);
        
        btn.style.background = color.light;
        btn.style.transform = 'scale(1.1)';
        
        setTimeout(() => {
            btn.style.background = originalBg;
            btn.style.transform = 'scale(1)';
        }, 400);
    };
    
    window.handleColorClick = function(colorName) {
        if (!isPlaying || isShowingSequence) return;
        
        flashColor(colorName);
        playerSequence.push(colorName);
        
        // Check if correct so far
        const currentIndex = playerSequence.length - 1;
        if (playerSequence[currentIndex] !== sequence[currentIndex]) {
            // Wrong!
            document.getElementById('message').innerHTML = 
                '<span style="color: #ef4444;">❌ Wrong! Game Over!</span>';
            document.getElementById('message').innerHTML += 
                `<br>Final Score: ${(level - 1) * 10}`;
            disableButtons();
            isPlaying = false;
            document.getElementById('start-btn').disabled = false;
            return;
        }
        
        // Check if sequence complete
        if (playerSequence.length === sequence.length) {
            // Correct!
            document.getElementById('message').innerHTML = 
                '<span style="color: #4ade80;">✅ Correct! Well done!</span>';
            disableButtons();
            level++;
            updateDisplay();
            
            setTimeout(() => {
                playRound();
            }, 1500);
        }
    };
    
    window.enableButtons = function() {
        colors.forEach(color => {
            document.getElementById(`color-${color.name}`).disabled = false;
        });
    };
    
    window.disableButtons = function() {
        colors.forEach(color => {
            document.getElementById(`color-${color.name}`).disabled = true;
        });
    };
    
    window.updateDisplay = function() {
        document.getElementById('level-display').textContent = level;
        document.getElementById('score-display').textContent = (level - 1) * 10;
    };
    
    // Make game state accessible globally for debugging
    window.isShowingSequence = false;
    
    // Initialize navigation if available
    if (typeof initializeNavigation === 'function') {
        initializeNavigation('color-pattern-memory', 'createColorPatternMemory');
    }
    
    console.log('Color Pattern Memory Level loaded successfully!');
}

// Make function globally available
window.createColorPatternMemory = createColorPatternMemory;
