/**
 * Test Integration Level
 * 
 * A simple test level to verify the integration system works
 */

window.createTestIntegrationLevel = function() {
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-header">
                🧪 Test Integration Level
            </div>
            <div class="level-content" style="padding: 20px; max-width: 800px; margin: 0 auto;">
                <div style="background: rgba(102,126,234,0.1); border-radius: 10px; padding: 25px; border: 2px solid rgba(102,126,234,0.3); text-align: center;">
                    <h2 style="font-size: 1.5rem; margin: 0 0 20px 0; color: #333;">Integration Test Successful!</h2>
                    
                    <p style="font-size: 1.1rem; line-height: 1.6; color: #555; margin: 0;">
                        This is a test level to verify that the navigation and level loading system works correctly.
                    </p>
                    
                    <div style="margin-top: 20px; padding: 15px; background: rgba(45,213,115,0.1); border-radius: 8px; border: 2px solid rgba(45,213,115,0.3);">
                        <p style="font-size: 1rem; color: #2dd573; margin: 0;">
                            ✅ Level loaded successfully!<br>
                            ✅ Navigation integration working!<br>
                            ✅ Template system functional!
                        </p>
                    </div>
                </div>
                
                ${typeof createStandardNavigation === 'function' ? createStandardNavigation() : ''}
            </div>
        </div>
    `;
    
    // Initialize navigation
    if (typeof initializeNavigation === 'function') {
        initializeNavigation('test-integration-level', 'createTestIntegrationLevel');
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.createTestIntegrationLevel;
}