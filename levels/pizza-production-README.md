# Pizza Production Challenge

## Overview
An interactive level that teaches gradient descent with two parameters through pizza production optimization.

## Concept
Users control a pizza production machine that takes dough batches and cheese blocks as inputs. The machine uses two multipliers (w1 for dough, w2 for cheese) to determine the total pizza output. The goal is to produce exactly 18,320 units (±80) - the day's requirement. Too much means wasted money, too little means unhappy customers.

## Features
- **Two-Parameter Optimization**: Users adjust both w1 (dough multiplier) and w2 (cheese multiplier)
- **Fixed Inputs**: 10 dough batches, 30 cheese blocks
- **Production States**: 
  - Perfect: Within ±80 units of target (18,320)
  - Wasteful: Too much production (money wasted 💸)
  - Insufficient: Not enough for customers (sad customers 😢)
- **Manual Parameter Adjustment**: Two sliders for w1 (0-500) and w2 (0-800)
- **Production Testing**: Press "Make Pizzas" to test current parameters
- **Error Display**: Shows the error after each production attempt
- **Learning Rate Selection**: Choose between Large, Medium, or Small learning rates
- **Gradient Descent Update**: Click "Update Parameters" to apply gradient descent for both parameters simultaneously
- **Visual Feedback**: Animations for pizza production, money waste, and sad customers

## Learning Objectives
1. Understand how multiple parameters affect a single output
2. Learn how gradient descent can optimize multiple parameters simultaneously
3. Experience different learning rates affecting two parameters
4. See how parameters with different scales (w1 vs w2) require different step sizes
5. Understand real-world optimization problems (production efficiency)

## Technical Implementation
- Built using `InteractiveLevelTemplate`
- Custom validation function for production output
- Two-parameter gradient descent:
  - w1 (dough) has less influence (×10 units)
  - w2 (cheese) has more influence (×30 units)
- Three learning rates with different step sizes:
  - Large: w1 step=30, w2 step=50
  - Medium: w1 step=15, w2 step=25 (default)
  - Small: w1 step=5, w2 step=10
- Update button only enabled after production test
- Visual feedback through CSS animations and emoji transitions

## Files
- `levels/pizza-production.js` - Main level implementation
- `levels/test-pizza-production.html` - Standalone test file
- `levels/pizza-production-README.md` - This documentation
- Updated `levels/index.js` - Level registration
- Updated `index.html` - Script inclusion
- Updated `js_standalone/navigation-config.js` - Added after AI Balloon Optimizer

## Testing
Open `levels/test-pizza-production.html` in a browser to test the level in isolation.

## Target Solution
- Correct w1 value: ~280 (dough multiplier)
- Correct w2 value: ~520 (cheese multiplier)
- Formula: 280 × 10 + 520 × 30 = 2,800 + 15,600 = 18,400 units
- Tolerance: ±80 units (18,240-18,400 is acceptable)

## Position in Course
This level appears in the "Gradient Descent - Single Parameter" section, right after the "AI Balloon Optimizer" level. It serves as a bridge between single-parameter optimization (balloon) and the more complex two-parameter optimization that follows (bunny feeding).

## Key Differences from Balloon Level
- **Two parameters** instead of one
- **Fixed inputs** (10 dough, 30 cheese) vs variable balloon sizes
- **Real-world context** (pizza production efficiency)
- **Different parameter scales** requiring different learning rates
- **Business consequences** (money waste vs customer satisfaction)