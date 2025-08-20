// Spoiler Alert Level - Enhanced with Interactive Examples
// Shows how AI works with fun interactive flip cards

function createSpoilerAlert() {
    const container = document.getElementById('app');
    
    // Add styles for the flip animation
    const style = document.createElement('style');
    style.textContent = `
        .ai-example-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(250px, 1fr));
            gap: 30px;
            margin: 20px auto 25px auto;
            max-width: 600px;
            width: 100%;
        }
        
        .flip-card {
            background-color: transparent;
            width: 100%;
            aspect-ratio: 1.6;
            min-height: 180px;
            perspective: 1000px;
            cursor: pointer;
        }
        
        .flip-card-inner {
            position: relative;
            width: 100%;
            height: 100%;
            text-align: center;
            transition: transform 0.6s;
            transform-style: preserve-3d;
        }
        
        .flip-card:hover .flip-card-inner {
            transform: rotateY(180deg);
        }
        
        .flip-card-front, .flip-card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            border-radius: 15px;
            padding: 25px 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        .flip-card-front {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        
        .flip-card-back {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            transform: rotateY(180deg);
        }
        
        .ai-example-title {
            font-size: 1.3rem;
            font-weight: bold;
            margin-bottom: 15px;
        }
        
        .ai-example-input {
            font-size: 0.95rem;
            opacity: 0.95;
            line-height: 1.4;
            text-align: center;
        }
        
        .ai-example-output {
            font-size: 1rem;
            font-weight: 600;
            line-height: 1.5;
            text-align: center;
        }
        
        .info-section {
            background: linear-gradient(135deg, rgba(102,126,234,0.1), rgba(118,75,162,0.1));
            border-radius: 15px;
            padding: 30px;
            margin: 15px auto;
            max-width: 700px;
            width: 100%;
            border: 2px solid rgba(102,126,234,0.3);
        }
        
        .info-section-bottom {
            background: linear-gradient(135deg, rgba(46,213,115,0.1), rgba(102,126,234,0.1));
            border: 2px solid rgba(46,213,115,0.3);
            margin-top: 0;
        }
        
        @media (max-width: 650px) {
            .ai-example-grid {
                grid-template-columns: 1fr;
                gap: 25px;
                margin: 15px auto 20px auto;
            }
            
            .flip-card {
                min-height: 160px;
                max-width: 350px;
                margin: 0 auto;
            }
            
            .info-section {
                padding: 25px 20px;
                margin: 15px auto;
            }
        }
    `;
    
    // Remove any existing style with same ID to avoid duplicates
    const existingStyle = document.getElementById('spoiler-alert-styles');
    if (existingStyle) {
        existingStyle.remove();
    }
    style.id = 'spoiler-alert-styles';
    document.head.appendChild(style);
    
    container.innerHTML = `
        <div class="current-level">
         
            <div class="level-wrapper">
                <div class="level-content full-width" style="max-width: 900px; margin: 0 auto; gap: 15px;">
                       <h1 style="font-size: 2.3rem; margin-bottom: 25px; background: linear-gradient(45deg, #667eea, #764ba2); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-align: center;">
                    Spoiler Alert!
                </h1>
                    <!-- Top text area -->
                    <div class="info-section">
                        <h2 style="font-size: 1.5rem; color: #333; text-align: center; margin: 0 0 15px 0;">
                            🤖 How Almost All AI Works
                        </h2>
                        <p style="font-size: 1.2rem; line-height: 1.7; color: #555; text-align: center; margin: 0;">
                            AI creates a <strong style="color: #667eea;">function</strong> <strong>f(x)</strong> and then 
                            <strong style="color: #764ba2;">tinkers with it</strong> until it gets 
                            better at <strong style="color: #f5576c;">predicting things</strong>!
                        </p>
                    </div>
                    
                    <!-- 2x2 Grid of AI Examples -->
                    <div class="ai-example-grid">
                        <!-- ChatGPT Example -->
                        <div class="flip-card">
                            <div class="flip-card-inner">
                                <div class="flip-card-front">
                                    <div class="ai-example-title">💬 ChatGPT</div>
                                    <div class="ai-example-input">
                                        <strong>Input:</strong><br>
                                        "Write me a poem"
                                    </div>
                                </div>
                                <div class="flip-card-back">
                                    <div class="ai-example-output">
                                        <strong>Output:</strong><br>
                                        f(x) = A beautiful poem<br>
                                        generated just for you! 📝
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Image Recognition Example -->
                        <div class="flip-card">
                            <div class="flip-card-inner">
                                <div class="flip-card-front">
                                    <div class="ai-example-title">📷 Image AI</div>
                                    <div class="ai-example-input">
                                        <strong>Input:</strong><br>
                                        Photo of your pet
                                    </div>
                                </div>
                                <div class="flip-card-back">
                                    <div class="ai-example-output">
                                        <strong>Output:</strong><br>
                                        f(x) = "That's a cute cat!"<br>
                                        (98% confidence) 🐱
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Voice Assistant Example -->
                        <div class="flip-card">
                            <div class="flip-card-inner">
                                <div class="flip-card-front">
                                    <div class="ai-example-title">🎤 Voice AI</div>
                                    <div class="ai-example-input">
                                        <strong>Input:</strong><br>
                                        "What's the weather?"
                                    </div>
                                </div>
                                <div class="flip-card-back">
                                    <div class="ai-example-output">
                                        f(x) = <strong>Output:</strong><br>
                                        "It's 72°F and sunny"<br>
                                        ☀️
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Recommendation System Example -->
                        <div class="flip-card">
                            <div class="flip-card-inner">
                                <div class="flip-card-front">
                                    <div class="ai-example-title">🎬 Netflix AI</div>
                                    <div class="ai-example-input">
                                        <strong>Input:</strong><br>
                                        Your watch history
                                    </div>
                                </div>
                                <div class="flip-card-back">
                                    <div class="ai-example-output">
                                        <strong>Output:</strong><br>
                                        f(x) = "You'll love this show!"<br>
                                        🍿
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Bottom text area -->
                    <div class="info-section info-section-bottom">
                        <h3 style="font-size: 1.4rem; color: #2dd573; text-align: center; margin: 0 0 15px 0;">
                            🎯 What You'll Learn Here
                        </h3>
                        <p style="font-size: 1.15rem; line-height: 1.7; color: #555; text-align: center; margin: 0;">
                            You'll see <strong>exactly how</strong> a simple function is tuned to make better predictions<br>
                            using the <strong style="color: #667eea;">same tuning algorithm</strong> (<strong>gradient descent</strong>) as complex AI!
                        </p>
                    </div>
                    
                </div>
            </div>
        </div>
        ${createStandardNavigation()}
    `;
    
    // Initialize navigation
    initializeNavigation('spoiler-alert', 'createSpoilerAlert');
}

// Export the function
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createSpoilerAlert };
} else {
    window.createSpoilerAlert = createSpoilerAlert;
}
