
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
