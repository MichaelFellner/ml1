// transition-settings.js - User preferences for transitions

class TransitionSettings {
    constructor() {
        this.settings = {
            transitionSpeed: 'fast', // 'instant', 'fast', 'normal', 'slow'
            transitionStyle: 'slide', // 'none', 'fade', 'slide', 'scale'
            preloadEnabled: true,
            keyboardShortcuts: true
        };
        
        // Load saved settings
        this.loadSettings();
        
        // Create settings UI
        this.createSettingsButton();
    }
    
    loadSettings() {
        try {
            const saved = localStorage.getItem('mlteach-transitions');
            if (saved) {
                this.settings = { ...this.settings, ...JSON.parse(saved) };
            }
        } catch (e) {
            // localStorage might not be available
        }
    }
    
    saveSettings() {
        try {
            localStorage.setItem('mlteach-transitions', JSON.stringify(this.settings));
        } catch (e) {
            // localStorage might not be available
        }
    }
    
    createSettingsButton() {
        // Create settings button
        const button = document.createElement('button');
        button.innerHTML = '⚙️';
        button.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.9);
            border: 2px solid #4285f4;
            cursor: pointer;
            font-size: 20px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            z-index: 9999;
            transition: transform 0.3s;
        `;
        
        button.onmouseover = () => button.style.transform = 'scale(1.1)';
        button.onmouseout = () => button.style.transform = 'scale(1)';
        button.onclick = () => this.toggleSettingsPanel();
        
        document.body.appendChild(button);
        this.settingsButton = button;
    }
    
    createSettingsPanel() {
        const panel = document.createElement('div');
        panel.id = 'transition-settings-panel';
        panel.style.cssText = `
            position: fixed;
            bottom: 70px;
            right: 20px;
            width: 300px;
            background: white;
            border-radius: 15px;
            box-shadow: 0 5px 30px rgba(0,0,0,0.3);
            padding: 20px;
            z-index: 9998;
            display: none;
            font-family: 'Segoe UI', sans-serif;
        `;
        
        panel.innerHTML = `
            <h3 style="margin: 0 0 15px 0; color: #333;">Transition Settings</h3>
            
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; color: #666; font-size: 14px;">
                    Animation Speed
                </label>
                <select id="transition-speed" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
                    <option value="instant">Instant (No animation)</option>
                    <option value="fast">Fast (200ms)</option>
                    <option value="normal">Normal (300ms)</option>
                    <option value="slow">Slow (500ms)</option>
                </select>
            </div>
            
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; color: #666; font-size: 14px;">
                    Animation Style
                </label>
                <select id="transition-style" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
                    <option value="none">None</option>
                    <option value="fade">Fade</option>
                    <option value="slide">Slide</option>
                    <option value="scale">Scale</option>
                </select>
            </div>
            
            <div style="margin-bottom: 15px;">
                <label style="display: flex; align-items: center; color: #666; font-size: 14px;">
                    <input type="checkbox" id="preload-enabled" style="margin-right: 8px;">
                    Preload next/previous levels
                </label>
            </div>
            
            <div style="margin-bottom: 15px;">
                <label style="display: flex; align-items: center; color: #666; font-size: 14px;">
                    <input type="checkbox" id="keyboard-shortcuts" style="margin-right: 8px;">
                    Keyboard shortcuts (← →)
                </label>
            </div>
            
            <div style="padding-top: 10px; border-top: 1px solid #eee; font-size: 12px; color: #999;">
                <div>💡 Tips:</div>
                <div>• Use arrow keys to navigate</div>
                <div>• Press Space for next level</div>
                <div>• Instant mode for fastest experience</div>
            </div>
        `;
        
        document.body.appendChild(panel);
        this.settingsPanel = panel;
        
        // Set initial values
        document.getElementById('transition-speed').value = this.settings.transitionSpeed;
        document.getElementById('transition-style').value = this.settings.transitionStyle;
        document.getElementById('preload-enabled').checked = this.settings.preloadEnabled;
        document.getElementById('keyboard-shortcuts').checked = this.settings.keyboardShortcuts;
        
        // Add event listeners
        document.getElementById('transition-speed').onchange = (e) => {
            this.settings.transitionSpeed = e.target.value;
            this.applySettings();
            this.saveSettings();
        };
        
        document.getElementById('transition-style').onchange = (e) => {
            this.settings.transitionStyle = e.target.value;
            this.applySettings();
            this.saveSettings();
        };
        
        document.getElementById('preload-enabled').onchange = (e) => {
            this.settings.preloadEnabled = e.target.checked;
            this.applySettings();
            this.saveSettings();
        };
        
        document.getElementById('keyboard-shortcuts').onchange = (e) => {
            this.settings.keyboardShortcuts = e.target.checked;
            this.applySettings();
            this.saveSettings();
        };
        
        // Click outside to close
        document.addEventListener('click', (e) => {
            if (!panel.contains(e.target) && e.target !== this.settingsButton) {
                panel.style.display = 'none';
            }
        });
    }
    
    toggleSettingsPanel() {
        if (!this.settingsPanel) {
            this.createSettingsPanel();
        }
        
        const panel = this.settingsPanel;
        if (panel.style.display === 'none') {
            panel.style.display = 'block';
            // Animate in
            panel.style.opacity = '0';
            panel.style.transform = 'translateY(10px)';
            setTimeout(() => {
                panel.style.transition = 'all 0.3s';
                panel.style.opacity = '1';
                panel.style.transform = 'translateY(0)';
            }, 10);
        } else {
            panel.style.opacity = '0';
            panel.style.transform = 'translateY(10px)';
            setTimeout(() => {
                panel.style.display = 'none';
            }, 300);
        }
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
        
        console.log('Transition settings applied:', this.settings);
    }
}

// Initialize settings UI
document.addEventListener('DOMContentLoaded', () => {
    window.transitionSettings = new TransitionSettings();
    window.transitionSettings.applySettings();
});
