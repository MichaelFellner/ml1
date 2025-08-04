function createLevel5() {
    currentLevel = 4;
    userMoney = 10; // Reset money
    const container = document.getElementById('app');
    
    // Check if level is already completed
    const isCompleted = levelCompletions.level5;
    const nextBtnState = isCompleted ? '' : 'disabled';
    const nextBtnText = isCompleted ? '✅ Go to Level 7' : '🔒 Complete Level 5 to Continue';
    
    container.innerHTML = `
        <div class="current-level">
            ${createLevelHeader(4, 5, 9)}
            <div class="level-content">
                <div class="visual-section">
                    <h3>Meet Max - He Needs a Bone!</h3>
                    <div id="trainingDogs" class="training-data" style="display: none;">
                        <!-- Training data will appear after first bone purchase -->
                    </div>
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
    
    let firstBonePurchased = false;
    let level5Success = false;
    
    // Set up click handler if already completed
    if (levelCompletions.level5) {
        nextBtn.onclick = () => createStoryPart4(); // Updated to go to level 7
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
        
        const userGuess = parseInt(boneSizeSlider.value);
        
        if (!firstBonePurchased) {
            // First bone purchase - always wrong, then show training data
            userFirstGuess = userGuess;
            
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
            firstBonePurchased = true;
            
            // Update feedback (user is always >15" off, so always show sad dog)
            const difference = Math.abs(userFirstGuess - trueBoneSize);
            let reaction;
            if (difference > 30) {
                reaction = "😞 Max sniffs the bone but walks away sadly. This size is way off!";
            } else {
                reaction = "😐 Max tries the bone but seems uninterested. Not quite right...";
            }
            document.getElementById('dogImg').src = images.dogSad;
            
            // Show training data after first failure
            document.getElementById('trainingDogs').innerHTML = generateTrainingDogsHTML();
            document.getElementById('trainingDogs').style.display = 'block';
            
            document.getElementById('status').innerHTML = `
                <strong>Result:</strong><br>
                ${reaction}<br>
                <small>You guessed ${userFirstGuess} inches. Max's true preference: ${trueBoneSize} inches (${difference}" off)</small><br>
                <strong>📊 Training data now available! Use it to make a better guess.</strong>
            `;
            document.getElementById('status').style.background = 'rgba(255, 193, 7, 0.1)';
            
            document.getElementById('moneyDisplay').textContent = `$${userMoney}`;
            buyBoneBtn.textContent = '🛒 Buy Better Bone ($5)';
            
        } else {
            // Second bone purchase - use training data
            userMoney -= 5;
            dogBonesPurchased++;
            
            const difference = Math.abs(userGuess - trueBoneSize);
            let reaction, success = false;
            
            if (difference <= 5) {
                reaction = "🎉 MAX LOVES IT! Perfect size bone - he's wagging his tail like crazy!";
                success = true;
                document.getElementById('dogImg').src = images.dogHappy;
            } else if (difference <= 10) {
                reaction = "😊 Great choice! Max is happy with this bone and starts chewing right away!";
                success = true;
                document.getElementById('dogImg').src = images.dogHappy;
            } else if (difference <= 15) {
                reaction = "😐 Max tries the bone but seems uninterested. Not quite right...";
                document.getElementById('dogImg').src = images.dogSad;
            } else {
                reaction = "😞 Max sniffs the bone but walks away sadly. This size is way off!";
                document.getElementById('dogImg').src = images.dogSad;
            }
            
            if (success) {
                // Level completed successfully
                document.getElementById('status').innerHTML = `
                    <strong>Final Result:</strong><br>
                    ${reaction}<br>
                    <small>You guessed ${userGuess} inches. Max's true preference: ${trueBoneSize} inches (${difference}" off)</small><br>
                    <strong>🏆 SUCCESS! Training data helped you succeed!</strong>
                `;
                document.getElementById('status').style.background = 'rgba(45, 213, 115, 0.1)';
                
                buyBoneBtn.disabled = true;
                buyBoneBtn.textContent = '🦴 Perfect Bone Purchased!';
                
                level5Success = true;
                if (!levelCompletions.level5) {
                    levelCompletions.level5 = true;
                }
                nextBtn.disabled = false;
                nextBtn.textContent = '✅ Go to Level 7';
                nextBtn.onclick = () => createStoryPart4();
                
            } else {
                // Failed - give another chance
                userMoney += 5; // Found another $5!
                
                document.getElementById('status').innerHTML = `
                    <strong>Result:</strong><br>
                    ${reaction}<br>
                    <small>You guessed ${userGuess} inches. Max's true preference: ${trueBoneSize} inches (${difference}" off)</small><br>
                    <small>💰 Wait! You found another $5 in your back pocket! Try again with the training data.</small><br>
                    <strong>📚 Use the training data more carefully - look at the average preferred size!</strong>
                `;
                document.getElementById('status').style.background = 'rgba(255, 193, 7, 0.1)';
                
                // Re-enable the button for another attempt
                buyBoneBtn.disabled = false;
                buyBoneBtn.textContent = '🛒 Try Another Bone ($5)';
            }
            
            document.getElementById('moneyDisplay').textContent = `$${userMoney}`;
        }
    });
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
    
    return html;
}

// Remove the old createLevel6 and setupLevel6 functions since they're now combined