function createLevel5() {
    currentLevel = 4;
    userMoney = 10; // Reset money
    const container = document.getElementById('app');
    
    // Check if level is already completed
    const isCompleted = levelCompletions.level5;
    const nextBtnState = isCompleted ? '' : 'disabled';
    const nextBtnText = isCompleted ? '✅ Go to Level 6' : '🔒 Complete Level 5 to Continue';
    
    container.innerHTML = `
        <div class="current-level">
            ${createLevelHeader(4, 5, 9)}
            <div class="level-content">
                <div class="visual-section">
                    <h3>Meet Max - He Needs a Bone!</h3>
                    <img id="dogImg" src="${images.dog}" alt="Max the dog" class="main-image">
                </div>
                <div class="controls-section">
                    <div class="money-display">💰 Money: <span id="moneyDisplay">$${userMoney}</span></div>
                    <label for="boneSizeSlider">🦴 Bone Size (inches):</label>
                    <input type="range" id="boneSizeSlider" min="5" max="95" value="50" step="1">
                    <div class="display">
                        Size: <span id="boneSizeValue">50 inches</span>
                    </div>
                    <div class="ai-controls">
                        <button id="buyBoneBtn" class="action-btn">🛒 Buy Bone ($5)</button>
                        <button id="gradientDisabledBtn" class="action-btn" disabled style="opacity: 0.5; position: relative;">🤖 Gradient Descent</button>
                    </div>
                    <div id="status" class="status">🐕 Max is waiting for his bone! What size do you think he'll like?<br><small>💡 Without knowing his preference, this is just a guess...</small></div>
                    <div class="button-container">
                        <button id="prevLevelBtn" class="prev-btn" onclick="createPart3()">← Back to Part 3</button>
                        <button id="nextLevelBtn" class="next-btn" ${nextBtnState}>${nextBtnText}</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    setupLevel5();
}

function setupLevel5() {
    const boneSizeSlider = document.getElementById('boneSizeSlider');
    const buyBoneBtn = document.getElementById('buyBoneBtn');
    const gradientDisabledBtn = document.getElementById('gradientDisabledBtn');
    const nextBtn = document.getElementById('nextLevelBtn');
    
    // Set up click handler if already completed
    if (levelCompletions.level5) {
        nextBtn.onclick = () => createLevel6();
    }
    
    // Add hover tooltip for disabled gradient descent button
    let tooltip = null;
    
    gradientDisabledBtn.addEventListener('mouseenter', () => {
        tooltip = document.createElement('div');
        tooltip.className = 'gradient-tooltip';
        tooltip.innerHTML = '❌ Gradient descent only works when we know the target!<br><small>We don\'t know Max\'s preference yet.</small>';
        tooltip.style.cssText = `
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 10px 15px;
            border-radius: 8px;
            font-size: 12px;
            line-height: 1.3;
            white-space: nowrap;
            z-index: 1000;
            margin-bottom: 5px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            pointer-events: none;
        `;
        
        // Add arrow pointing down
        const arrow = document.createElement('div');
        arrow.style.cssText = `
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 6px solid rgba(0, 0, 0, 0.9);
        `;
        tooltip.appendChild(arrow);
        
        gradientDisabledBtn.appendChild(tooltip);
    });
    
    gradientDisabledBtn.addEventListener('mouseleave', () => {
        if (tooltip) {
            tooltip.remove();
            tooltip = null;
        }
    });
    
    boneSizeSlider.addEventListener('input', () => {
        const size = parseInt(boneSizeSlider.value);
        document.getElementById('boneSizeValue').textContent = size + ' inches';
    });
    
    buyBoneBtn.addEventListener('click', () => {
        if (userMoney < 5) return;
        
        userFirstGuess = parseInt(boneSizeSlider.value);
        
        // Generate Max's true preference (always make it challenging - user should always be >15" off)
        if (userFirstGuess <= 20) {
            trueBoneSize = userFirstGuess + Math.floor(Math.random() * 30) + 16;
        } else if (userFirstGuess >= 80) {
            trueBoneSize = userFirstGuess - Math.floor(Math.random() * 30) - 16;
        } else {
            const goHigher = Math.random() < 0.5;
            if (goHigher) {
                trueBoneSize = userFirstGuess + Math.floor(Math.random() * 25) + 16;
            } else {
                trueBoneSize = userFirstGuess - Math.floor(Math.random() * 25) - 16;
            }
        }
        trueBoneSize = Math.max(5, Math.min(95, trueBoneSize));
        
        userMoney -= 5;
        dogBonesPurchased++;
        
        // Update feedback (user is always >15" off, so always show sad dog)
        const difference = Math.abs(userFirstGuess - trueBoneSize);
        let reaction;
        if (difference > 30) {
            reaction = "😞 Max sniffs the bone but walks away sadly. This size is way off!";
        } else {
            reaction = "😐 Max tries the bone but seems uninterested. Not quite right...";
        }
        document.getElementById('dogImg').src = images.dogSad;
        
        document.getElementById('status').innerHTML = `
            <strong>Result:</strong><br>
            ${reaction}<br>
        `;
        document.getElementById('status').style.background = 'rgba(255, 107, 107, 0.1)';
        
        document.getElementById('moneyDisplay').textContent = `${userMoney}`;
        buyBoneBtn.disabled = true;
        buyBoneBtn.textContent = '🦴 Bone Purchased';
        
        if (!levelCompletions.level5) {
            levelCompletions.level5 = true;
        }
        nextBtn.disabled = false;
        nextBtn.textContent = '✅ Go to Level 6';
        nextBtn.onclick = () => createLevel6();
    });
}

function createLevel6() {
    currentLevel = 5;
    // Only reset success flag if level wasn't already completed
    if (!levelCompletions.level6) {
        level6Success = false;
    }
    const container = document.getElementById('app');
    
    // Check if level is already completed
    const isCompleted = levelCompletions.level6;
    const nextBtnState = isCompleted ? '' : 'disabled';
    const nextBtnText = isCompleted ? '✅ Go to Part 4' : '🔒 Complete Level 6 to Continue';
    
    container.innerHTML = `
        <div class="current-level">
            ${createLevelHeader(5, 6, 9)}
            <div class="level-content">
                <div class="visual-section">
                    <h3>Second Chance with Training Data!</h3>
                    <div id="trainingDogs" class="training-data">
                        ${generateTrainingDogsHTML()}
                    </div>
                    <img id="dogImg2" src="${images.dog}" alt="Max with training data" class="dog-image2">
                </div>
                <div class="controls-section">
                    <div class="money-display">💰 Money: <span id="moneyDisplay2">$${userMoney}</span></div>
                    <label for="boneSizeSlider2">🦴 Bone Size (inches):</label>
                    <input type="range" id="boneSizeSlider2" min="5" max="95" value="50" step="1">
                    <div class="display">
                        Size: <span id="boneSizeValue2">50 inches</span>
                    </div>
                    <button id="buyBoneBtn2" class="action-btn">🛒 Buy Final Bone ($5)</button>
                    <div id="status" class="status">🎯 Now you have data! Use the training information to make a better guess for Max.<br><small>📊 Machine learning works best with good training data!</small></div>
                    <div class="button-container">
                        <button id="prevLevelBtn" class="prev-btn" onclick="createLevel5()">← Back to Level 5</button>
                        <button id="nextLevelBtn" class="next-btn" ${nextBtnState}>${nextBtnText}</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    setupLevel6();
}

function generateTrainingDogsHTML() {
    if (!trueBoneSize) return '<div>No training data available yet.</div>';
    
    const dogNames = ['Buddy', 'Luna', 'Charlie', 'Bella'];
    let html = '<h4>🐕 Training Data: Other Dogs\' Preferences</h4><div class="dog-grid">';
    
    const trainingData = [];
    for (let i = 0; i < 4; i++) {
        const deviation = (Math.random() - 0.5) * 16;
        let dogBoneSize = Math.round(trueBoneSize + deviation);
        dogBoneSize = Math.max(5, Math.min(95, dogBoneSize));
        trainingData.push(dogBoneSize);
        
        html += `
            <div class="dog-item">
                <img src="${images.dog}" alt="${dogNames[i]}" style="width: 60px; height: 60px; object-fit: contain;">
                <div style="font-weight: bold; font-size: 12px; margin-top: 5px;">${dogNames[i]}</div>
                <div style="font-size: 11px; color: #666; margin-top: 2px;">Likes ${dogBoneSize}" bones</div>
            </div>
        `;
    }
    
    html += '</div>';
    
    const average = trainingData.reduce((sum, val) => sum + val, 0) / trainingData.length;
    
    return html;
}

function setupLevel6() {
    const boneSizeSlider2 = document.getElementById('boneSizeSlider2');
    const buyBoneBtn2 = document.getElementById('buyBoneBtn2');
    const nextBtn = document.getElementById('nextLevelBtn');
    
    // Set up click handler if already completed
    if (levelCompletions.level6) {
        nextBtn.onclick = () => createPart4();
    }
    
    boneSizeSlider2.addEventListener('input', () => {
        const size = parseInt(boneSizeSlider2.value);
        document.getElementById('boneSizeValue2').textContent = size + ' inches';
    });
    
    buyBoneBtn2.addEventListener('click', () => {
        if (userMoney < 5) return;
        
        const userGuess2 = parseInt(boneSizeSlider2.value);
        userMoney -= 5;
        dogBonesPurchased++;
        
        const difference = Math.abs(userGuess2 - trueBoneSize);
        let reaction, success = false;
        
        if (difference <= 5) {
            reaction = "🎉 MAX LOVES IT! Perfect size bone - he's wagging his tail like crazy!";
            success = true;
            document.getElementById('dogImg2').src = images.dogHappy;
        } else if (difference <= 10) {
            reaction = "😊 Great choice! Max is happy with this bone and starts chewing right away!";
            success = true;
            document.getElementById('dogImg2').src = images.dogHappy;
        } else if (difference <= 15) {
            reaction = "😐 Max tries the bone but seems uninterested. Not quite right...";
            document.getElementById('dogImg2').src = images.dogSad;
        } else {
            reaction = "😞 Max sniffs the bone but walks away sadly. This size is way off!";
            document.getElementById('dogImg2').src = images.dogSad;
        }
        
        if (success) {
            // Level completed successfully
            document.getElementById('status').innerHTML = `
                <strong>Final Result:</strong><br>
                ${reaction}<br>
                <small>You guessed ${userGuess2} inches. Max's true preference: ${trueBoneSize} inches (${difference}" off)</small><br>
                <strong>🏆 SUCCESS! Training data helped you succeed!</strong>
            `;
            document.getElementById('status').style.background = 'rgba(45, 213, 115, 0.1)';
            
            buyBoneBtn2.disabled = true;
            buyBoneBtn2.textContent = '🦴 Perfect Bone Purchased!';
            
            level6Success = true; // Set success flag
            if (!levelCompletions.level6) {
                levelCompletions.level6 = true;
            }
            nextBtn.disabled = false;
            nextBtn.textContent = '✅ Go to Part 4';
            nextBtn.onclick = () => createPart4();
        } else {
            // Failed - give another chance
            userMoney += 5; // Found another $5!
            
            document.getElementById('status').innerHTML = `
                <strong>Result:</strong><br>
                ${reaction}<br>
                <small>You guessed ${userGuess2} inches. Max's true preference: ${trueBoneSize} inches (${difference}" off)</small><br>
                <small>💰 Wait! You found another $5 in your back pocket! Try again with the training data.</small><br>
                <strong>📚 Use the training data more carefully - look at the average preferred size!</strong>
            `;
            document.getElementById('status').style.background = 'rgba(255, 193, 7, 0.1)';
            
            // Re-enable the button for another attempt
            buyBoneBtn2.disabled = false;
            buyBoneBtn2.textContent = '🛒 Try Another Bone ($5)';
        }
        
        document.getElementById('moneyDisplay2').textContent = `${userMoney}`;
    });
}
