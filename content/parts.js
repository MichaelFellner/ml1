
// Updated createIntroduction function

function createIntroduction() {
    const levelId = 'intro';
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration" style="padding: 30px;">
                <h1 style="font-size: 2.5rem; margin-bottom: 30px; background: linear-gradient(45deg, #667eea, #764ba2); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Welcome to Your AI Learning Journey!</h1>
                
                <div style="display: flex; gap: 40px; align-items: center; justify-content: center; margin: 20px 0;">
                    <!-- Static left side content -->
                    <div style="flex: 1; max-width: 500px; text-align: left;">
                        <h2 style="color: #333; margin-bottom: 15px;">The Secret Behind Modern AI</h2>
                        <p style="font-size: 1.1rem; line-height: 1.6; color: #555;">From <strong>ChatGPT</strong> writing poetry to <strong>Tesla</strong> cars driving themselves, 
                        all modern AI systems share one powerful secret: <strong style="color: #667eea;">gradient descent</strong>.</p>
                        <p style="font-size: 1.1rem; line-height: 1.6; color: #555; margin-top: 10px;">It's the algorithm that teaches AI to get better at <em>everything</em> - 
                        and today, you'll master it through fun, interactive games!</p>
                    </div>
                    
                    <!-- Animated carousel on the right side only -->
                    <div style="flex: 1; min-width: 400px; max-width: 400px;">
                        <div id="aiExamples" style="background: rgba(255,255,255,0.5); border-radius: 15px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); height: 120px;">
                            <h3 style="color: #333; margin-bottom: 15px; font-size: 1.2rem;">🤖 Examples of AI Using It:</h3>
                            <div id="exampleCarousel" style="position: relative; height: 50px; width: 360px; margin: 0 auto;">
                                <span id="currentExample" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); transition: opacity 0.5s ease; width: 100%; text-align: center; font-size: 1.05rem; color: #444;">📱 Your phone predicting the next word</span>
                            </div>
                        </div>
                    </div>
                </div>
       
                <div class="button-container" style="margin-top: 30px;">
                    ${createStandardNavigation(true, false)}
                </div>
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation(levelId, 'createIntroduction');
    
    // Add interactive elements
    setTimeout(() => {
        // Carousel of AI examples
        const examples = [
            '📱 Your phone predicting the next word',
            '🚗 Self-driving cars recognizing stop signs',
            '🎵 Spotify recommending your next favorite song',
            '📸 Instagram filters detecting your face',
            '🗣️ Alexa understanding your voice commands',
            '🏥 AI diagnosing diseases from X-rays',
            '🌤️ Weather apps predicting tomorrow\'s forecast',
            '💬 ChatGPT writing human-like responses'
        ];
        
        let currentIndex = 0;
        const exampleElement = document.getElementById('currentExample');
        
        if (exampleElement) {
            setInterval(() => {
                currentIndex = (currentIndex + 1) % examples.length;
                exampleElement.style.opacity = '0';
                setTimeout(() => {
                    exampleElement.textContent = examples[currentIndex];
                    exampleElement.style.opacity = '1';
                }, 250);
            }, 3000);
        }
    }, 100);
}

function createPart1() {
    const levelId = 'part1';
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration">
                <h1>Let's Tune Things Ourselves</h1>
                <p>Gradient descent is a powerful algorithm that can tune variables to their optimal values. But to really appreciate it, lets first 
                try tuning things ourselves.</p>
                <div class="button-container">
                    ${createStandardNavigation()}
                </div>
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation(levelId, 'createPart1');
}

function createPart2() {
    const levelId = 'part2';
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration">
                <h1>Introducing Gradient Descent</h1>
                <p>Gradient descent can do the tuning work all on its own. Gradient descent uses "loss", a measure of how off from the goal it is, in order to tune 
                variables. Similar to how we saw if we were getting warmer or colder in levels 1 and 2.</p>
                <div class="button-container">
                    ${createStandardNavigation()}
                </div>
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation(levelId, 'createPart2');
}

function createPart3() {
    const levelId = 'part3';
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration">
                <h1>Using Data to Make Predictions</h1>
                <p>In the next two levels we'll introduce another important concept in A.I., using data to make better predictions. Later 
                in levels 7-9 we will put everything we learned together.</p>
                <div class="button-container">
                    ${createStandardNavigation()}
                </div>
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation(levelId, 'createPart3');
}

function createPart4() {
    const levelId = 'part4';
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration">
                <h1>Combining Gradient Descent and Training Data</h1>
                <p>We've now seen how gradient descent works and the importance of using data to make better predictions. Now we'll learn how gradient descent can be
                used with data to make better predictions. We'll use gradient descent to make a prediction on training data, and then be able to make a better prediction
                on future data.</p>
                <div class="button-container">
                    ${createStandardNavigation()}
                </div>
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation(levelId, 'createPart4');
}