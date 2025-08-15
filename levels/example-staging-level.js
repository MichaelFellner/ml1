/**
 * Example Staging Level
 * 
 * @type interactive
 * @difficulty beginner
 * @estimatedTime 3
 * @description A simple example level to test the staging integration workflow
 * @tags staging, test, example
 * @icon 🚀
 */

function createExampleStagingLevel() {
    const app = document.getElementById('app');
    
    // Create level content
    app.innerHTML = `
        <div class="level-container" style="padding: 40px; text-align: center; color: white;">
            <h1 style="font-size: 3em; margin-bottom: 20px;">
                🚀 Example Staging Level
            </h1>
            
            <div style="max-width: 600px; margin: 0 auto;">
                <p style="font-size: 1.2em; line-height: 1.6; margin-bottom: 30px;">
                    This is a brand new level created in the staging area!
                    It demonstrates the automated integration workflow.
                </p>
                
                <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; margin: 30px 0;">
                    <h2 style="color: #60a5fa;">🎯 Interactive Demo</h2>
                    <p>Click the button to see the counter in action:</p>
                    
                    <div id="counter-display" style="font-size: 3em; margin: 20px 0;">
                        Count: <span id="count">0</span>
                    </div>
                    
                    <button onclick="incrementCounter()" style="
                        background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
                        color: white;
                        border: none;
                        padding: 15px 30px;
                        font-size: 1.1em;
                        border-radius: 5px;
                        cursor: pointer;
                        margin: 5px;
                        transition: transform 0.2s;
                    " onmouseover="this.style.transform='scale(1.05)'" 
                       onmouseout="this.style.transform='scale(1)'">
                        Increment +1
                    </button>
                    
                    <button onclick="resetCounter()" style="
                        background: linear-gradient(135deg, #f87171 0%, #ef4444 100%);
                        color: white;
                        border: none;
                        padding: 15px 30px;
                        font-size: 1.1em;
                        border-radius: 5px;
                        cursor: pointer;
                        margin: 5px;
                        transition: transform 0.2s;
                    " onmouseover="this.style.transform='scale(1.05)'" 
                       onmouseout="this.style.transform='scale(1)'">
                        Reset
                    </button>
                </div>
                
                <div style="margin-top: 40px; padding: 20px; background: rgba(34,197,94,0.2); border-radius: 10px;">
                    <h3 style="color: #4ade80;">✅ Integration Features</h3>
                    <ul style="text-align: left; display: inline-block; margin: 10px 0;">
                        <li>Automatically copied to levels/ directory</li>
                        <li>Added to navigation configuration</li>
                        <li>Registered in levels index</li>
                        <li>Test file generated</li>
                        <li>Ready for immediate use!</li>
                    </ul>
                </div>
            </div>
            
            ${typeof createStandardNavigation === 'function' ? createStandardNavigation() : ''}
        </div>
    `;
    
    // Counter functionality
    window.counterValue = 0;
    
    window.incrementCounter = function() {
        window.counterValue++;
        document.getElementById('count').textContent = window.counterValue;
        
        // Add a little animation
        const display = document.getElementById('counter-display');
        display.style.transform = 'scale(1.1)';
        setTimeout(() => {
            display.style.transform = 'scale(1)';
        }, 200);
    };
    
    window.resetCounter = function() {
        window.counterValue = 0;
        document.getElementById('count').textContent = window.counterValue;
        
        // Flash effect
        const display = document.getElementById('counter-display');
        display.style.color = '#f87171';
        setTimeout(() => {
            display.style.color = 'white';
        }, 300);
    };
    
    // Initialize navigation if available
    if (typeof initializeNavigation === 'function') {
        initializeNavigation('example-staging-level', 'createExampleStagingLevel');
    }
    
    console.log('Example Staging Level loaded successfully!');
}

// Make function globally available
window.createExampleStagingLevel = createExampleStagingLevel;
