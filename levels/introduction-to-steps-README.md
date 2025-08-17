# Introduction to Steps Level

## Overview
An interactive level that teaches gradient descent step sizes through a balloon pumping demonstration.

## Concept
Users control a machine that pumps air into balloons. The machine takes 10 units as input and multiplies it by a parameter `w` to produce air. The goal is to find the correct value of `w` to pump exactly 7040 (±2) units of air into the balloon.

## Features
- **Interactive Machine Visualization**: Shows the input (10 units), the machine with parameter w, and the output air amount
- **Balloon States**: The balloon can be deflated (too little air), perfect (just right), or popped (too much air)
- **Manual Parameter Adjustment**: Users can adjust w using a slider (0-1000)
- **Pump Testing**: Press "Pump Balloon" to test the current w value
- **Error Display**: Shows the error after each pump attempt
- **Learning Rate Selection**: Choose between Large, Medium, or Small learning rates
- **Gradient Descent Update**: Click "Update w" to apply a gradient descent step based on the selected learning rate
- **Visual Feedback**: Animations for balloon inflation, popping, and machine operation

## Learning Objectives
1. Understand how parameters affect outputs in a system
2. Learn about errors and how they guide parameter updates
3. Experience different learning rates and their effects on convergence
4. See gradient descent in action through manual updates

## Technical Implementation
- Built using `InteractiveLevelTemplate` 
- Custom validation function to check air amount within tolerance
- Three learning rates with different step sizes:
  - Large: step size of 50
  - Medium: step size of 20 (default)
  - Small: step size of 5
- Update button is only enabled after pumping (getting an error)
- Visual feedback through CSS animations and emoji transitions

## Files
- `levels/introduction-to-steps.js` - Main level implementation
- `levels/test-introduction-to-steps.html` - Standalone test file
- Updated `levels/index.js` - Level registration
- Updated `index.html` - Script inclusion
- Created `js_standalone/navigation-config.js` - Navigation configuration

## Testing
Open `levels/test-introduction-to-steps.html` in a browser to test the level in isolation.

## Target Solution
- Correct w value: 704
- This gives: 704 × 10 = 7040 air units
- Tolerance: ±2 air units (7038-7042 is acceptable)