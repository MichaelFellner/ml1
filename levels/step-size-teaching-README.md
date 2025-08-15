# Step Size Teaching Level

## Purpose
This level teaches the fundamental concept of step size (learning rate) in gradient descent by allowing users to experiment with different step sizes and observe their effects on parameter updates.

## Learning Objectives
1. Understand how step size affects the speed of convergence
2. See the relationship between gradient and parameter updates
3. Experiment with different step sizes (small, large, negative)
4. Understand the update formula: w_new = w - (step_size × gradient)

## Features
- **Interactive Graph**: Shows both target function (f(x) = 7x) and current function (f(x) = wx)
- **Manual Step Control**: User inputs step size and clicks "Go" to perform one update
- **Real-time Feedback**: Shows gradient, loss, and update calculations
- **Update History**: Tracks all parameter updates in a log
- **Visual Comparison**: Clear visualization of how current function approaches target

## How It Works
1. The level starts with w = 1.0 (your function is f(x) = 1x)
2. The target is w = 7.0 (target function is f(x) = 7x)
3. The gradient shows the slope of the loss function
4. User enters a step size and clicks "Go" to update w
5. The new w is calculated as: w_new = w - (step_size × gradient)
6. The graph updates to show the new function

## Key Concepts Demonstrated
- **Small step sizes** (0.1): Slow but stable convergence
- **Large step sizes** (1.0, 2.0): Faster but might overshoot
- **Negative step sizes**: Move in wrong direction
- **Optimal step size**: Balances speed and stability

## Integration Instructions
1. Copy `step-size-teaching.js` to the main levels directory
2. Add navigation entry to `navigation-config.js`:
```javascript
{
    id: 'step-size-teaching',
    title: 'Understanding Step Size',
    createFunction: 'createStepSizeTeaching',
    description: 'Learn how step size affects gradient descent'
}
```
3. Test the level for proper functionality
4. Verify no scrolling occurs at 1920x1080 resolution

## Files
- `step-size-teaching.js`: Main level implementation
- `step-size-teaching-README.md`: This documentation file

## Testing Checklist
- [ ] Graph displays correctly
- [ ] Step size input accepts various values
- [ ] Go button updates w correctly
- [ ] History log shows updates
- [ ] Reset button works
- [ ] No scrolling at standard resolution
- [ ] Navigation works properly