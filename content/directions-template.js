// directions-template.js - Reusable directions/instructions template

function createDirectionsBeforeLevel5() {
    const container = document.getElementById('app');
    
    container.innerHTML = `
        <div class="current-level">
            <div class="directions-header">
                <h2>🧭 Directions: Getting Started</h2>
                <div class="directions-subtitle">Quick instructions before you begin</div>
            </div>
            <div class="level-content">
                <div class="directions-content">
                    <div class="directions-main">
                        <h3>What You'll Learn</h3>
                        <p>In the next few levels, you'll discover how gradient descent works by:</p>
                        <ul class="directions-list">
                            <li>🎯 Adjusting parameters to minimize loss</li>
                            <li>📊 Understanding how training data helps make predictions</li>
                            <li>🤖 Seeing how AI systems learn automatically</li>
                        </ul>
                        
                        <h3>How to Navigate</h3>
                        <p>Use the <strong>Previous</strong> and <strong>Next</strong> buttons to move between levels. You can also click the hamburger menu (☰) in the top corner to jump to any level.</p>
                        
                        <div class="directions-tips">
                            <div class="tip-box">
                                <h4>💡 Pro Tip</h4>
                                <p>Don't worry if you don't get everything perfect right away. The goal is to understand the concepts, and you can always go back and try again!</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="directions-visual">
                        <div class="preview-box">
                            <h4>🔍 What's Coming Up</h4>
                            <div class="preview-items">
                                <div class="preview-item">
                                    <span class="preview-icon">🤖</span>
                                    <span class="preview-text">Robot Energy Tuning</span>
                                </div>
                                <div class="preview-item">
                                    <span class="preview-icon">🧙‍♀️</span>
                                    <span class="preview-text">Potion Brewing</span>
                                </div>
                                <div class="preview-item">
                                    <span class="preview-icon">📈</span>
                                    <span class="preview-text">Gradient Descent</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                ${createStandardNavigation()}
            </div>
        </div>
    `;
    
    // Initialize navigation - CHANGE THESE VALUES FOR EACH DIRECTIONS PAGE
    initializeNavigation('directions-level5', 'createDirectionsBeforeLevel5');
}

// CSS for directions pages (add this once to your CSS files)
const directionsStyles = `
<style>
.directions-header {
    text-align: center;
    padding: 30px 20px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border-radius: 15px;
    margin-bottom: 30px;
}

.directions-header h2 {
    margin: 0 0 10px 0;
    font-size: 2.2em;
}

.directions-subtitle {
    font-size: 1.1em;
    opacity: 0.9;
}

.directions-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 30px;
    margin: 0 auto;
    max-width: 1000px;
}

.directions-main {
    background: #f8f9fa;
    padding: 30px;
    border-radius: 10px;
    border: 2px solid #e9ecef;
}

.directions-main h3 {
    color: #495057;
    margin-top: 0;
    margin-bottom: 15px;
}

.directions-list {
    margin: 15px 0;
    padding-left: 0;
}

.directions-list li {
    list-style: none;
    padding: 8px 0;
    font-size: 1.1em;
}

.directions-tips {
    margin-top: 25px;
}

.tip-box {
    background: #e7f3ff;
    border: 2px solid #3498db;
    border-radius: 8px;
    padding: 20px;
}

.tip-box h4 {
    margin: 0 0 10px 0;
    color: #2980b9;
}

.directions-visual {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.preview-box {
    background: white;
    border: 2px solid #e9ecef;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
}

.preview-box h4 {
    margin: 0 0 20px 0;
    color: #495057;
}

.preview-items {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.preview-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 10px;
    background: #f8f9fa;
    border-radius: 8px;
}

.preview-icon {
    font-size: 1.5em;
}

.preview-text {
    font-weight: 500;
    color: #495057;
}

@media (max-width: 768px) {
    .directions-content {
        grid-template-columns: 1fr;
        gap: 20px;
    }
    
    .directions-main {
        padding: 20px;
    }
}
</style>
`;

// Add styles to document (only add this once)
if (!document.getElementById('directions-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'directions-styles';
    styleSheet.innerHTML = directionsStyles.replace('<style>', '').replace('</style>', '');
    document.head.appendChild(styleSheet);
}
