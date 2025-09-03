/**
 * @fileoverview Settings menu component for MLTEACH
 * Provides a gear icon and dropdown menu for various settings including background themes
 */

class SettingsMenu {
    constructor() {
        this.isOpen = false;
        this.init();
    }
    
    init() {
        this.createSettingsButton();
        this.createSettingsMenu();
    }
    
    createSettingsButton() {
        // Create settings button container
        const settingsButton = document.createElement('div');
        settingsButton.className = 'settings-button';
        settingsButton.innerHTML = `
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M12 1v6m0 6v6m4.22-13.22l4.24 4.24M1.54 12l6 0m6 0l6 0"></path>
                <path d="M20.5 7.5L19 9l-1.5-1.5M20.5 16.5L19 15l-1.5 1.5M3.5 7.5L5 9l1.5-1.5M3.5 16.5L5 15l1.5 1.5"></path>
                <path d="M12 1C5.4 1 0 6.4 0 12s5.4 11 12 11 12-5.4 12-11S18.6 1 12 1z"></path>
                <path d="M12 1v22M1 12h22"></path>
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 9.5a2.5 2.5 0 0 0 0 5 2.5 2.5 0 0 0 0-5z"></path>
                <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"></path>
            </svg>
        `;
        
        // Simplified gear icon SVG
        settingsButton.innerHTML = `
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
        `;
        
        settingsButton.addEventListener('click', () => this.toggleMenu());
        
        document.body.appendChild(settingsButton);
    }
    
    createSettingsMenu() {
        // Create settings menu container
        const menu = document.createElement('div');
        menu.className = 'settings-menu';
        menu.innerHTML = `
            <div class="settings-menu-header">
                <h3>Settings</h3>
                <button class="settings-close-btn">&times;</button>
            </div>
            <div class="settings-menu-content">
                <div class="settings-section">
                    <h4>Background Theme</h4>
                    <div class="theme-options"></div>
                </div>
                <div class="settings-section">
                    <h4>Animation Speed</h4>
                    <div class="animation-speed-control">
                        <input type="range" id="animation-speed" min="0" max="2" step="0.1" value="1">
                        <span class="speed-value">1.0x</span>
                    </div>
                </div>
                <div class="settings-section">
                    <h4>Effects</h4>
                    <div class="effects-toggles">
                        <label class="toggle-option">
                            <input type="checkbox" id="particles-toggle" checked>
                            <span>Particles</span>
                        </label>
                        <label class="toggle-option">
                            <input type="checkbox" id="connections-toggle" checked>
                            <span>Connections</span>
                        </label>
                        <label class="toggle-option">
                            <input type="checkbox" id="glow-toggle" checked>
                            <span>Glow Effects</span>
                        </label>
                    </div>
                </div>
                <div class="settings-section">
                    <h4>Performance</h4>
                    <div class="performance-options">
                        <button class="perf-btn" data-quality="low">Low</button>
                        <button class="perf-btn active" data-quality="medium">Medium</button>
                        <button class="perf-btn" data-quality="high">High</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(menu);
        
        // Set up event listeners
        menu.querySelector('.settings-close-btn').addEventListener('click', () => this.closeMenu());
        
        // Create theme options
        this.populateThemeOptions();
        
        // Set up animation speed control
        const speedSlider = menu.querySelector('#animation-speed');
        const speedValue = menu.querySelector('.speed-value');
        speedSlider.addEventListener('input', (e) => {
            speedValue.textContent = e.target.value + 'x';
            this.updateAnimationSpeed(e.target.value);
        });
        
        // Set up performance buttons
        menu.querySelectorAll('.perf-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                menu.querySelectorAll('.perf-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.updatePerformance(e.target.dataset.quality);
            });
        });
    }
    
    populateThemeOptions() {
        const themeContainer = document.querySelector('.theme-options');
        
        if (!window.backgroundSystem) return;
        
        const themes = window.backgroundSystem.themes;
        const currentTheme = window.backgroundSystem.currentTheme;
        
        Object.entries(themes).forEach(([key, theme]) => {
            const themeOption = document.createElement('div');
            themeOption.className = 'theme-option';
            if (key === currentTheme) {
                themeOption.classList.add('active');
            }
            
            // Create color preview
            const colors = theme.colors;
            themeOption.innerHTML = `
                <div class="theme-preview">
                    <div class="color-strip" style="background: linear-gradient(90deg, ${colors.primary}, ${colors.secondary}, ${colors.accent})"></div>
                </div>
                <div class="theme-info">
                    <div class="theme-name">${theme.name}</div>
                    <div class="theme-desc">${theme.description}</div>
                </div>
            `;
            
            themeOption.addEventListener('click', () => {
                // Remove active class from all options
                document.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('active'));
                // Add active class to clicked option
                themeOption.classList.add('active');
                // Change theme
                if (window.backgroundSystem) {
                    window.backgroundSystem.changeTheme(key);
                }
            });
            
            themeContainer.appendChild(themeOption);
        });
    }
    
    toggleMenu() {
        this.isOpen = !this.isOpen;
        const menu = document.querySelector('.settings-menu');
        const button = document.querySelector('.settings-button');
        
        if (this.isOpen) {
            menu.classList.add('open');
            button.classList.add('active');
        } else {
            menu.classList.remove('open');
            button.classList.remove('active');
        }
    }
    
    closeMenu() {
        this.isOpen = false;
        const menu = document.querySelector('.settings-menu');
        const button = document.querySelector('.settings-button');
        menu.classList.remove('open');
        button.classList.remove('active');
    }
    
    updateAnimationSpeed(speed) {
        // Update animation speed in CSS
        document.documentElement.style.setProperty('--animation-speed', speed);
    }
    
    updatePerformance(quality) {
        // Adjust particle count and effects based on quality
        if (window.backgroundSystem) {
            switch(quality) {
                case 'low':
                    // Reduce particles and effects
                    break;
                case 'medium':
                    // Default settings
                    break;
                case 'high':
                    // Maximum particles and effects
                    break;
            }
        }
    }
}

// Initialize settings menu when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.settingsMenu = new SettingsMenu();
    });
} else {
    window.settingsMenu = new SettingsMenu();
}
