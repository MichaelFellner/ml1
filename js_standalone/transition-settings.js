// transition-settings.js - Default transition settings (UI removed)

class TransitionSettings {
    constructor() {
        // Default settings - no UI to change them
        this.settings = {
            transitionSpeed: 'fast', // Using fast as default
            transitionStyle: 'slide', // Default slide animation
            preloadEnabled: true,
            keyboardShortcuts: true
        };
        
        // No UI elements, no localStorage - just use defaults
    }
    
    applySettings() {
        // Apply speed settings
        const speeds = {
            instant: 0,
            fast: 200,
            normal: 300,
            slow: 500
        };
        
        if (window.fastTransitions) {
            // Update animation duration
            const duration = speeds[this.settings.transitionSpeed];
            
            // Update CSS animation duration
            const style = document.createElement('style');
            style.id = 'dynamic-transition-speed';
            
            // Remove old style if exists
            const oldStyle = document.getElementById('dynamic-transition-speed');
            if (oldStyle) oldStyle.remove();
            
            if (duration === 0) {
                window.fastTransitions.setInstantMode(true);
            } else {
                window.fastTransitions.setInstantMode(false);
                style.textContent = `
                    .level-transition-out,
                    .level-transition-in,
                    .level-transition-out-reverse,
                    .level-transition-in-reverse {
                        animation-duration: ${duration}ms !important;
                    }
                `;
                document.head.appendChild(style);
            }
        }
        
        console.log('Default transition settings applied:', this.settings);
    }
}

// Initialize with default settings only - no UI
document.addEventListener('DOMContentLoaded', () => {
    window.transitionSettings = new TransitionSettings();
    window.transitionSettings.applySettings();
});
