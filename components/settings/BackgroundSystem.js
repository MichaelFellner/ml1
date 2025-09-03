/**
 * @fileoverview Background animation and theming system for MLTEACH
 * Provides futuristic AI-themed animated backgrounds with multiple color schemes
 */

class BackgroundSystem {
    constructor() {
        this.themes = {
            'neural-network': {
                name: 'Neural Network',
                colors: {
                    primary: '#00d9ff',
                    secondary: '#0057ff',
                    accent: '#ff00ff',
                    glow: '#00ffff'
                },
                particles: true,
                grid: true,
                description: 'Futuristic neural network visualization'
            },
            'quantum-field': {
                name: 'Quantum Field',
                colors: {
                    primary: '#00ff88',
                    secondary: '#0088ff',
                    accent: '#ff0088',
                    glow: '#88ff00'
                },
                particles: true,
                waves: true,
                description: 'Quantum computing inspired theme'
            },
            'cyber-matrix': {
                name: 'Cyber Matrix',
                colors: {
                    primary: '#00ff00',
                    secondary: '#000000',
                    accent: '#00ff00',
                    glow: '#00ff00'
                },
                matrix: true,
                description: 'Classic matrix-style theme'
            },
            'ai-gradient': {
                name: 'AI Gradient',
                colors: {
                    primary: '#667eea',
                    secondary: '#764ba2',
                    accent: '#f093fb',
                    glow: '#4facfe'
                },
                gradient: true,
                particles: true,
                description: 'Smooth AI-inspired gradients'
            },
            'deep-learning': {
                name: 'Deep Learning',
                colors: {
                    primary: '#1e3c72',
                    secondary: '#2a5298',
                    accent: '#7e8ce0',
                    glow: '#36d1dc'
                },
                layers: true,
                particles: true,
                description: 'Deep neural network layers'
            },
            'data-stream': {
                name: 'Data Stream',
                colors: {
                    primary: '#fc466b',
                    secondary: '#3f5efb',
                    accent: '#ffdd00',
                    glow: '#00ffdd'
                },
                dataFlow: true,
                description: 'Flowing data visualization'
            },
            'classic-orange': {
                name: 'Classic Orange (Original)',
                colors: {
                    primary: '#fb401a',
                    secondary: '#f3960a',
                    accent: '#ffc107',
                    glow: '#ffeb3b'
                },
                gradient: true,
                description: 'Original MLTEACH theme'
            }
        };
        
        this.currentTheme = 'ai-gradient';
        this.animationCanvas = null;
        this.ctx = null;
        this.particles = [];
        this.animationId = null;
        this.matrixColumns = [];
        
        this.loadSavedTheme();
        this.init();
    }
    
    init() {
        // Create and setup canvas for animated background
        this.setupCanvas();
        
        // Apply initial theme
        this.applyTheme(this.currentTheme);
        
        // Start animations
        this.startAnimation();
    }
    
    setupCanvas() {
        // Remove existing canvas if any
        const existingCanvas = document.getElementById('bg-animation-canvas');
        if (existingCanvas) {
            existingCanvas.remove();
        }
        
        // Create new canvas
        this.animationCanvas = document.createElement('canvas');
        this.animationCanvas.id = 'bg-animation-canvas';
        this.animationCanvas.style.position = 'fixed';
        this.animationCanvas.style.top = '0';
        this.animationCanvas.style.left = '0';
        this.animationCanvas.style.width = '100%';
        this.animationCanvas.style.height = '100%';
        this.animationCanvas.style.pointerEvents = 'none';
        this.animationCanvas.style.zIndex = '-1';
        
        document.body.insertBefore(this.animationCanvas, document.body.firstChild);
        
        this.ctx = this.animationCanvas.getContext('2d');
        this.resizeCanvas();
        
        // Handle window resize
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        this.animationCanvas.width = window.innerWidth;
        this.animationCanvas.height = window.innerHeight;
        
        // Reinitialize theme-specific elements on resize
        if (this.themes[this.currentTheme].matrix) {
            this.initMatrixColumns();
        }
    }
    
    applyTheme(themeName) {
        if (!this.themes[themeName]) return;
        
        this.currentTheme = themeName;
        const theme = this.themes[themeName];
        
        // Apply CSS variables for the theme
        const root = document.documentElement;
        
        // Create gradient or solid background
        if (theme.gradient) {
            root.style.setProperty('--bg-gradient', 
                `linear-gradient(135deg, ${theme.colors.primary}dd 0%, ${theme.colors.secondary}dd 50%, ${theme.colors.accent}aa 100%)`);
        } else {
            root.style.setProperty('--bg-gradient', 
                `linear-gradient(135deg, ${theme.colors.primary}ee 0%, ${theme.colors.secondary}ee 100%)`);
        }
        
        // Apply to body
        document.body.style.background = 'var(--bg-gradient)';
        document.body.style.backgroundSize = '400% 400%';
        
        // Add animation for gradient movement
        if (theme.gradient) {
            document.body.style.animation = 'gradientShift 15s ease infinite';
        } else {
            document.body.style.animation = 'gradientShift 20s ease infinite';
        }
        
        // Initialize theme-specific elements
        this.particles = [];
        if (theme.particles) {
            this.initParticles();
        }
        
        if (theme.matrix) {
            this.initMatrixColumns();
        }
        
        // Save theme preference
        this.saveTheme();
    }
    
    initParticles() {
        const particleCount = 50;
        this.particles = [];
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.animationCanvas.width,
                y: Math.random() * this.animationCanvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.3,
                pulseSpeed: Math.random() * 0.02 + 0.01
            });
        }
    }
    
    initMatrixColumns() {
        const columnWidth = 20;
        const columnCount = Math.ceil(this.animationCanvas.width / columnWidth);
        this.matrixColumns = [];
        
        for (let i = 0; i < columnCount; i++) {
            this.matrixColumns.push({
                x: i * columnWidth,
                y: Math.random() * this.animationCanvas.height,
                speed: Math.random() * 2 + 1,
                characters: '01'
            });
        }
    }
    
    startAnimation() {
        const animate = () => {
            this.ctx.clearRect(0, 0, this.animationCanvas.width, this.animationCanvas.height);
            
            const theme = this.themes[this.currentTheme];
            
            // Draw grid if enabled
            if (theme.grid) {
                this.drawGrid();
            }
            
            // Draw particles if enabled
            if (theme.particles) {
                this.drawParticles();
            }
            
            // Draw matrix rain if enabled
            if (theme.matrix) {
                this.drawMatrix();
            }
            
            // Draw waves if enabled
            if (theme.waves) {
                this.drawWaves();
            }
            
            // Draw data flow if enabled
            if (theme.dataFlow) {
                this.drawDataFlow();
            }
            
            // Draw layers if enabled
            if (theme.layers) {
                this.drawLayers();
            }
            
            this.animationId = requestAnimationFrame(animate);
        };
        
        animate();
    }
    
    drawGrid() {
        const theme = this.themes[this.currentTheme];
        const gridSize = 50;
        
        this.ctx.strokeStyle = theme.colors.accent + '20';
        this.ctx.lineWidth = 1;
        
        // Draw vertical lines
        for (let x = 0; x < this.animationCanvas.width; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.animationCanvas.height);
            this.ctx.stroke();
        }
        
        // Draw horizontal lines
        for (let y = 0; y < this.animationCanvas.height; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.animationCanvas.width, y);
            this.ctx.stroke();
        }
        
        // Draw glowing nodes at intersections
        const time = Date.now() * 0.001;
        for (let x = 0; x < this.animationCanvas.width; x += gridSize) {
            for (let y = 0; y < this.animationCanvas.height; y += gridSize) {
                const pulse = Math.sin(time + x * 0.01 + y * 0.01) * 0.5 + 0.5;
                this.ctx.fillStyle = theme.colors.glow + (pulse * 30 + 10).toString(16).padStart(2, '0');
                this.ctx.beginPath();
                this.ctx.arc(x, y, 2, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
    }
    
    drawParticles() {
        const theme = this.themes[this.currentTheme];
        const time = Date.now() * 0.001;
        
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around screen
            if (particle.x < 0) particle.x = this.animationCanvas.width;
            if (particle.x > this.animationCanvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.animationCanvas.height;
            if (particle.y > this.animationCanvas.height) particle.y = 0;
            
            // Pulsing effect
            const pulse = Math.sin(time * particle.pulseSpeed) * 0.5 + 0.5;
            const opacity = particle.opacity * pulse;
            
            // Draw particle with glow
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.size * 3
            );
            gradient.addColorStop(0, theme.colors.glow + Math.floor(opacity * 255).toString(16).padStart(2, '0'));
            gradient.addColorStop(1, theme.colors.glow + '00');
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(
                particle.x - particle.size * 3,
                particle.y - particle.size * 3,
                particle.size * 6,
                particle.size * 6
            );
            
            // Draw core
            this.ctx.fillStyle = theme.colors.accent + Math.floor(opacity * 255).toString(16).padStart(2, '0');
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        // Draw connections between nearby particles
        this.ctx.strokeStyle = theme.colors.primary + '30';
        this.ctx.lineWidth = 0.5;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const opacity = (1 - distance / 100) * 0.5;
                    this.ctx.strokeStyle = theme.colors.primary + Math.floor(opacity * 255).toString(16).padStart(2, '0');
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
    
    drawMatrix() {
        const theme = this.themes[this.currentTheme];
        this.ctx.font = '14px monospace';
        
        this.matrixColumns.forEach(column => {
            // Update position
            column.y += column.speed;
            
            // Reset when reaching bottom
            if (column.y > this.animationCanvas.height) {
                column.y = -20;
                column.speed = Math.random() * 2 + 1;
            }
            
            // Draw characters
            for (let i = 0; i < 20; i++) {
                const char = column.characters[Math.floor(Math.random() * column.characters.length)];
                const y = column.y - i * 20;
                
                if (y > 0 && y < this.animationCanvas.height) {
                    const opacity = (1 - i / 20) * 0.8;
                    this.ctx.fillStyle = theme.colors.primary + Math.floor(opacity * 255).toString(16).padStart(2, '0');
                    this.ctx.fillText(char, column.x, y);
                }
            }
        });
    }
    
    drawWaves() {
        const theme = this.themes[this.currentTheme];
        const time = Date.now() * 0.001;
        
        this.ctx.strokeStyle = theme.colors.accent + '40';
        this.ctx.lineWidth = 2;
        
        for (let wave = 0; wave < 3; wave++) {
            this.ctx.beginPath();
            
            for (let x = 0; x < this.animationCanvas.width; x += 5) {
                const y = this.animationCanvas.height / 2 + 
                         Math.sin(x * 0.01 + time + wave) * 50 * (wave + 1);
                
                if (x === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            
            this.ctx.stroke();
        }
    }
    
    drawDataFlow() {
        const theme = this.themes[this.currentTheme];
        const time = Date.now() * 0.001;
        
        // Draw flowing data streams
        for (let stream = 0; stream < 5; stream++) {
            const x = (time * 50 + stream * 100) % (this.animationCanvas.width + 200) - 100;
            const y = this.animationCanvas.height / 2 + Math.sin(time + stream) * 100;
            
            // Draw data packet
            const gradient = this.ctx.createLinearGradient(x - 50, y, x + 50, y);
            gradient.addColorStop(0, theme.colors.accent + '00');
            gradient.addColorStop(0.5, theme.colors.accent + 'ff');
            gradient.addColorStop(1, theme.colors.accent + '00');
            
            this.ctx.strokeStyle = gradient;
            this.ctx.lineWidth = 3;
            this.ctx.beginPath();
            this.ctx.moveTo(x - 50, y);
            this.ctx.lineTo(x + 50, y);
            this.ctx.stroke();
        }
    }
    
    drawLayers() {
        const theme = this.themes[this.currentTheme];
        const time = Date.now() * 0.001;
        
        // Draw neural network layers
        const layers = 5;
        const layerWidth = this.animationCanvas.width / (layers + 1);
        
        for (let layer = 0; layer < layers; layer++) {
            const x = layerWidth * (layer + 1);
            const nodes = 4 + layer;
            const nodeSpacing = this.animationCanvas.height / (nodes + 1);
            
            for (let node = 0; node < nodes; node++) {
                const y = nodeSpacing * (node + 1);
                const pulse = Math.sin(time + layer * 0.5 + node * 0.3) * 0.5 + 0.5;
                
                // Draw node
                const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, 15);
                gradient.addColorStop(0, theme.colors.glow + Math.floor(pulse * 255).toString(16).padStart(2, '0'));
                gradient.addColorStop(1, theme.colors.glow + '00');
                
                this.ctx.fillStyle = gradient;
                this.ctx.beginPath();
                this.ctx.arc(x, y, 15, 0, Math.PI * 2);
                this.ctx.fill();
                
                // Draw connections to next layer
                if (layer < layers - 1) {
                    const nextX = layerWidth * (layer + 2);
                    const nextNodes = 4 + layer + 1;
                    const nextNodeSpacing = this.animationCanvas.height / (nextNodes + 1);
                    
                    for (let nextNode = 0; nextNode < nextNodes; nextNode++) {
                        const nextY = nextNodeSpacing * (nextNode + 1);
                        
                        this.ctx.strokeStyle = theme.colors.primary + '20';
                        this.ctx.lineWidth = 0.5;
                        this.ctx.beginPath();
                        this.ctx.moveTo(x, y);
                        this.ctx.lineTo(nextX, nextY);
                        this.ctx.stroke();
                    }
                }
            }
        }
    }
    
    changeTheme(themeName) {
        if (this.themes[themeName]) {
            this.applyTheme(themeName);
        }
    }
    
    saveTheme() {
        localStorage.setItem('mlteach_background_theme', this.currentTheme);
    }
    
    loadSavedTheme() {
        const saved = localStorage.getItem('mlteach_background_theme');
        if (saved && this.themes[saved]) {
            this.currentTheme = saved;
        }
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.animationCanvas) {
            this.animationCanvas.remove();
        }
    }
}

// Initialize background system when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.backgroundSystem = new BackgroundSystem();
    });
} else {
    window.backgroundSystem = new BackgroundSystem();
}
