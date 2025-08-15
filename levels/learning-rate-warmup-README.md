# Learning Rate Warmup Level

## Overview
Interactive level that teaches the concept of learning rate warmup - gradually increasing the learning rate from a small value to the target value over several training steps.

## File Location
`C:\Users\mikef\Desktop\MLTEACH\.staging\work\learning-rate-warmup.js`

## Level ID
`learning-rate-warmup`

## Concepts Taught
1. **Learning Rate Warmup**: Starting with a small learning rate and gradually increasing it
2. **Linear Warmup Schedule**: Linear interpolation from start LR to target LR
3. **Training Stability**: How warmup prevents early training divergence
4. **Hyperparameter Tuning**: Finding the right warmup duration and learning rates

## Interactive Features

### Controls
- **Warmup Steps Slider** (0-50): Number of steps for the warmup phase
- **Target Learning Rate Slider** (0.01-0.5): The final learning rate after warmup
- **Starting Learning Rate Slider** (0.001-0.1): Initial learning rate at step 0

### Training Simulation
- **Start Training Button**: Begins the training simulation
- **Reset Button**: Resets the training state
- Real-time display of current step and learning rate
- Loss tracking with visual feedback

### Visualizations
Two switchable views:
1. **LR Schedule View**: Shows the learning rate schedule over time
   - Yellow line for warmup phase
   - Blue line for normal training phase
   - Red dot for current position during training

2. **Loss Curve View**: Shows training loss over time
   - Colored by phase (warmup vs normal)
   - Green dashed line for target loss
   - Visual feedback for convergence/divergence

## Success Criteria
- Achieve training loss < 2.0 without diverging
- Demonstrates proper use of warmup to prevent early instability

## Key Learning Outcomes
1. Understanding that high learning rates early in training can cause divergence
2. Learning rate warmup provides stability by starting small
3. Finding the right balance between warmup duration and learning rates
4. Visualizing how warmup affects the training trajectory

## Integration Instructions
To integrate into the main MLTEACH project:

1. Copy the level file to the main levels directory
2. Add to level index:
```javascript
// In levels/index.js
import { createLearningRateWarmup } from './learning-rate-warmup.js';

export const levels = {
    // ... existing levels
    'learning-rate-warmup': createLearningRateWarmup
};
```

3. Add to navigation configuration if needed
4. Test the level thoroughly

## Technical Notes
- Uses UIPatterns for consistent UI components
- Implements real-time training simulation
- Canvas-based visualizations for smooth animations
- Responsive layout that fits without scrolling
- Standard navigation system integration

## Dependencies
- UIPatterns utility functions
- Standard navigation functions
- Canvas API for visualizations

## Testing Checklist
- [ ] All sliders respond correctly
- [ ] Training simulation runs smoothly
- [ ] Visualization switches between views
- [ ] Success/failure conditions trigger appropriately
- [ ] Reset functionality works
- [ ] Navigation to next level enabled on success
- [ ] No console errors
- [ ] Content fits on screen without scrolling

## Future Enhancements
- Add different warmup schedules (cosine, exponential)
- Show comparison with/without warmup
- Add more complex loss landscapes
- Include momentum effects
- Add batch size considerations
