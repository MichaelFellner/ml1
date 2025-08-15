# Add UI Component Prompt Template

## Prompt Structure

Add a [COMPONENT_TYPE] to the [LEVEL_NAME] level that [FUNCTIONALITY_DESCRIPTION].

### Common Component Types:

## 1. Progress Indicator

```
Add a progress indicator to [LEVEL_NAME] that shows how close the user is to the target.
```

### Implementation:
```javascript
// In _generateVisualizationContent or appropriate location:
<div id="progress-container" style="margin: 20px 0;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
        <span style="color: #666; font-size: 0.9rem;">Progress</span>
        <span id="progress-percent" style="color: #667eea; font-weight: bold;">0%</span>
    </div>
    <div style="width: 100%; height: 20px; background: #e0e0e0; border-radius: 10px; overflow: hidden;">
        <div id="progress-bar" style="width: 0%; height: 100%; 
             background: linear-gradient(90deg, #667eea, #764ba2); 
             transition: width 0.3s ease;"></div>
    </div>
</div>

// In updateControl or updateVisualization:
updateProgress() {
    const validation = this.validateParameters();
    const progress = validation.accuracy; // 0-100
    
    const progressBar = document.getElementById('progress-bar');
    const progressPercent = document.getElementById('progress-percent');
    
    if (progressBar && progressPercent) {
        progressBar.style.width = `${progress}%`;
        progressPercent.textContent = `${Math.round(progress)}%`;
        
        // Change color based on progress
        if (progress >= 95) {
            progressBar.style.background = 'linear-gradient(90deg, #2dd573, #20b860)';
        } else if (progress >= 70) {
            progressBar.style.background = 'linear-gradient(90deg, #667eea, #764ba2)';
        } else {
            progressBar.style.background = 'linear-gradient(90deg, #ff6347, #ff8c69)';
        }
    }
}
```

## 2. Real-time Formula Display

```
Add a formula display that updates in real-time showing the current equation.
```

### Using UIPatterns:
```javascript
// If UIPatterns is available:
if (typeof UIPatterns !== 'undefined') {
    const formulaHTML = UIPatterns.createFormulaDisplay({
        w: this.parameters.w,
        b: this.parameters.b,
        showResult: true
    });
    document.getElementById('formula-container').innerHTML = formulaHTML;
}

// Manual implementation:
<div id="formula-display" style="background: white; border: 2px solid #667eea; 
     border-radius: 8px; padding: 15px; text-align: center; 
     font-family: 'Courier New', monospace;">
    <div style="font-size: 1.2rem; color: #333;">
        y = <span id="w-value" style="color: #667eea; font-weight: bold;">1.0</span> × x + 
        <span id="b-value" style="color: #764ba2; font-weight: bold;">0</span>
    </div>
    <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #e0e0e0;">
        <span style="color: #666;">Target: </span>
        <span style="color: #2dd573; font-weight: bold;">y = 7 × x + 2</span>
    </div>
</div>

// Update in updateControl:
updateFormulaDisplay() {
    const wElement = document.getElementById('w-value');
    const bElement = document.getElementById('b-value');
    
    if (wElement) wElement.textContent = this.parameters.w.toFixed(1);
    if (bElement) bElement.textContent = this.parameters.b.toFixed(1);
}
```

## 3. Interactive Chart/Graph

```
Add an interactive chart showing the loss over time or parameter space.
```

### Using Canvas:
```javascript
// Add canvas element:
<canvas id="loss-chart" width="400" height="200" 
        style="border: 1px solid #e0e0e0; border-radius: 8px; background: white;">
</canvas>

// Initialize chart in setup:
setupChart() {
    this.canvas = document.getElementById('loss-chart');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.lossHistory = [];
    this.maxHistory = 50;
}

// Update chart on parameter change:
updateChart(loss) {
    if (!this.ctx) return;
    
    // Add to history
    this.lossHistory.push(loss);
    if (this.lossHistory.length > this.maxHistory) {
        this.lossHistory.shift();
    }
    
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw axes
    this.ctx.strokeStyle = '#e0e0e0';
    this.ctx.beginPath();
    this.ctx.moveTo(30, 10);
    this.ctx.lineTo(30, 170);
    this.ctx.lineTo(380, 170);
    this.ctx.stroke();
    
    // Draw loss line
    this.ctx.strokeStyle = '#ff6347';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    
    const xStep = 350 / this.maxHistory;
    const maxLoss = Math.max(...this.lossHistory, 1);
    
    this.lossHistory.forEach((loss, i) => {
        const x = 30 + (i * xStep);
        const y = 170 - (loss / maxLoss * 150);
        
        if (i === 0) {
            this.ctx.moveTo(x, y);
        } else {
            this.ctx.lineTo(x, y);
        }
    });
    
    this.ctx.stroke();
    
    // Draw current loss text
    this.ctx.fillStyle = '#333';
    this.ctx.font = '14px Arial';
    this.ctx.fillText(`Loss: ${loss.toFixed(2)}`, 320, 30);
}
```

## 4. Feedback Messages

```
Add contextual feedback messages that guide the user based on their actions.
```

### Implementation:
```javascript
// Add message container:
<div id="feedback-container" style="min-height: 60px; margin: 20px 0;">
    <div id="feedback-message" style="padding: 15px; border-radius: 8px; 
         display: none; text-align: center; transition: all 0.3s ease;">
    </div>
</div>

// Feedback system:
showFeedback(message, type = 'info', duration = 3000) {
    const container = document.getElementById('feedback-message');
    if (!container) return;
    
    // Set styles based on type
    const styles = {
        success: {
            background: 'linear-gradient(135deg, #2dd573, #20b860)',
            color: 'white',
            border: 'none'
        },
        warning: {
            background: '#fff3cd',
            color: '#856404',
            border: '1px solid #ffeaa7'
        },
        error: {
            background: '#f8d7da',
            color: '#721c24',
            border: '1px solid #f5c6cb'
        },
        info: {
            background: 'rgba(102,126,234,0.1)',
            color: '#004085',
            border: '1px solid rgba(102,126,234,0.3)'
        }
    };
    
    const style = styles[type] || styles.info;
    Object.assign(container.style, style);
    container.innerHTML = message;
    container.style.display = 'block';
    
    // Auto-hide
    if (duration > 0) {
        this.createTimeout(() => {
            container.style.display = 'none';
        }, duration);
    }
}

// Use in validation:
validateParameters() {
    const result = super.validateParameters();
    
    if (result.success) {
        this.showFeedback('🎉 Perfect! You found the solution!', 'success');
    } else if (result.accuracy > 80) {
        this.showFeedback('Very close! Fine-tune your parameters.', 'warning');
    } else if (result.accuracy > 50) {
        this.showFeedback('Getting warmer! Keep adjusting.', 'info');
    } else {
        this.showFeedback('Try different values. You can do this!', 'error');
    }
    
    return result;
}
```

## 5. Control Panel

```
Add a control panel with grouped controls and clear organization.
```

### Implementation:
```javascript
// Organized control panel:
<div id="control-panel" style="background: white; border-radius: 10px; 
     padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    
    <h3 style="margin: 0 0 20px 0; color: #333; 
         border-bottom: 2px solid #667eea; padding-bottom: 10px;">
        Control Panel
    </h3>
    
    <!-- Parameter Controls Section -->
    <div class="control-section" style="margin-bottom: 20px;">
        <h4 style="color: #666; font-size: 0.9rem; margin-bottom: 10px;">
            PARAMETERS
        </h4>
        <div id="parameter-controls">
            <!-- Sliders go here -->
        </div>
    </div>
    
    <!-- Action Buttons Section -->
    <div class="control-section" style="margin-bottom: 20px;">
        <h4 style="color: #666; font-size: 0.9rem; margin-bottom: 10px;">
            ACTIONS
        </h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <button onclick="currentLevel.resetParameters()" 
                    style="padding: 10px; background: #6c757d; color: white; 
                           border: none; border-radius: 5px; cursor: pointer;">
                Reset
            </button>
            <button onclick="currentLevel.showHint()" 
                    style="padding: 10px; background: #ffc107; color: #333; 
                           border: none; border-radius: 5px; cursor: pointer;">
                Hint
            </button>
        </div>
    </div>
    
    <!-- Status Display Section -->
    <div class="control-section">
        <h4 style="color: #666; font-size: 0.9rem; margin-bottom: 10px;">
            STATUS
        </h4>
        <div style="background: #f8f9fa; padding: 10px; border-radius: 5px;">
            <div style="display: flex; justify-content: space-between;">
                <span>Accuracy:</span>
                <span id="accuracy-display" style="font-weight: bold;">0%</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 5px;">
                <span>Attempts:</span>
                <span id="attempts-display" style="font-weight: bold;">0</span>
            </div>
        </div>
    </div>
</div>
```

## 6. Animation Controls

```
Add animation controls for play/pause/speed adjustment.
```

### Implementation:
```javascript
// Animation control bar:
<div id="animation-controls" style="background: #f8f9fa; border-radius: 8px; 
     padding: 10px; display: flex; align-items: center; gap: 10px;">
    
    <button id="play-pause-btn" onclick="currentLevel.toggleAnimation()"
            style="padding: 8px 16px; background: #28a745; color: white; 
                   border: none; border-radius: 5px; cursor: pointer;">
        ▶️ Play
    </button>
    
    <button onclick="currentLevel.resetAnimation()"
            style="padding: 8px 16px; background: #dc3545; color: white; 
                   border: none; border-radius: 5px; cursor: pointer;">
        ⏹️ Reset
    </button>
    
    <div style="flex: 1; display: flex; align-items: center; gap: 10px;">
        <label style="color: #666;">Speed:</label>
        <input type="range" id="speed-slider" min="0.1" max="3" value="1" step="0.1"
               onchange="currentLevel.setAnimationSpeed(this.value)"
               style="flex: 1;">
        <span id="speed-display">1x</span>
    </div>
</div>

// Animation control methods:
toggleAnimation() {
    this.isPlaying = !this.isPlaying;
    const btn = document.getElementById('play-pause-btn');
    
    if (this.isPlaying) {
        btn.innerHTML = '⏸️ Pause';
        btn.style.background = '#ffc107';
        this.startAnimation();
    } else {
        btn.innerHTML = '▶️ Play';
        btn.style.background = '#28a745';
        this.pauseAnimation();
    }
}

setAnimationSpeed(speed) {
    this.animationSpeed = parseFloat(speed);
    const display = document.getElementById('speed-display');
    if (display) {
        display.textContent = `${speed}x`;
    }
}
```

## Component Integration Best Practices:

1. **Check for existing utilities first:**
   ```javascript
   if (typeof UIPatterns !== 'undefined') {
       // Use UIPatterns
   } else {
       // Manual implementation
   }
   ```

2. **Maintain consistent styling:**
   - Use project color palette
   - Match border radius (8-10px)
   - Use consistent spacing (10px, 15px, 20px)

3. **Handle cleanup properly:**
   ```javascript
   async onTeardown() {
       // Clear any component-specific resources
       this.componentState = null;
       await super.onTeardown();
   }
   ```

4. **Make components responsive:**
   ```javascript
   @media (max-width: 768px) {
       .control-panel {
           padding: 15px;
       }
   }
   ```

5. **Provide accessibility:**
   - Add ARIA labels
   - Ensure keyboard navigation
   - Provide alt text