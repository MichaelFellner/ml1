# 🧩 MLTEACH Component System

A lightweight, vanilla JavaScript component system for building interactive educational content. This system provides state management, event handling, and lifecycle methods without external dependencies.

## 📁 Project Structure

```
components/
├── base/
│   ├── Component.js         # Base component class
│   └── index.js            # Export module
├── examples/
│   └── InteractiveCounter.js # Example component
├── test-component-system.html # Test page
└── README.md               # This file
```

## 🚀 Quick Start

### 1. Include the Component System

```html
<!-- Include the base component -->
<script src="components/base/Component.js"></script>

<!-- Include any specific components you need -->
<script src="components/examples/InteractiveCounter.js"></script>
```

### 2. Create a Simple Component

```javascript
class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { message: 'Hello, World!' };
  }

  render() {
    return `
      <div class="my-component">
        <h1>${this.state.message}</h1>
        <button class="change-btn">Change Message</button>
      </div>
    `;
  }

  attachEventListeners() {
    this.addEventDelegate('.change-btn', 'click', () => {
      this.setState({ message: 'Button clicked!' });
    });
  }
}

// Use the component
const component = new MyComponent();
component.mount('#app');
```

## 🔧 Base Component API

### Constructor
```javascript
constructor(props = {})
```
- **props**: Object containing component properties

### Core Methods

#### `setState(newState)`
Updates component state and triggers re-render.
```javascript
this.setState({ count: this.state.count + 1 });
```

#### `render()`
**Abstract method** - Must be implemented by subclasses. Returns HTML string.
```javascript
render() {
  return `<div>Component content here</div>`;
}
```

#### `mount(container)`
Mounts component to DOM container.
```javascript
component.mount('#app');
component.mount(document.getElementById('container'));
```

#### `unmount()`
Cleans up component and removes from DOM.
```javascript
component.unmount();
```

#### `attachEventListeners()`
Override this method to setup event handlers.
```javascript
attachEventListeners() {
  this.addEventDelegate('button', 'click', this.handleClick.bind(this));
}
```

### Helper Methods

#### `querySelector(selector)`
Find element within component.
```javascript
const button = this.querySelector('.my-button');
```

#### `addEventDelegate(selector, event, handler)`
Add event listener with automatic cleanup.
```javascript
this.addEventDelegate('.btn', 'click', (e, target) => {
  console.log('Button clicked:', target);
});
```

#### `isMounted()`
Check if component is mounted.
```javascript
if (component.isMounted()) {
  // Component is active
}
```

#### `getContainer()`
Get the container element.
```javascript
const container = component.getContainer();
```

## 📊 Component Lifecycle

```
1. constructor()           ← Initialize props and state
2. mount(container)        ← Render HTML and insert into DOM
3. attachEventListeners()  ← Setup event handlers
4. setState()              ← Update state (triggers re-render)
5. unmount()              ← Cleanup and remove from DOM
```

## 🎯 Interactive Counter Example

The `InteractiveCounter` component demonstrates:
- State management
- Event handling
- Props usage
- Keyboard navigation
- Custom styling

### Basic Usage
```javascript
const counter = new InteractiveCounter();
counter.mount('#app');
```

### Advanced Usage
```javascript
const counter = new InteractiveCounter({
  title: 'Score Counter',
  initialValue: 100,
  step: 10,
  showReset: true,
  onChange: (data) => {
    console.log(`Counter ${data.action}: ${data.value}`);
  }
});
counter.mount('#score-container');
```

### Props
- `initialValue` (number): Starting value (default: 0)
- `step` (number): Increment/decrement amount (default: 1)
- `title` (string): Display title (default: 'Counter')
- `showReset` (boolean): Show reset button (default: false)
- `className` (string): Additional CSS classes
- `onChange` (function): Callback when value changes

### Methods
- `getValue()`: Get current counter value
- `setValue(value)`: Set counter value programmatically

## 🎮 Testing

Open `test-component-system.html` in a browser to see:
1. Basic counter functionality
2. Customized counters with different props
3. Synchronized counters with shared state
4. Programmatic control and API testing

## 🔍 Best Practices

### 1. Component Structure
```javascript
class MyComponent extends Component {
  constructor(props) {
    super(props);
    // Set default props
    this.props = Object.freeze({ ...defaultProps, ...props });
    // Initialize state
    this.state = { /* initial state */ };
  }

  render() {
    // Return HTML string
    // Use template literals for complex HTML
    return `<div>${this.state.value}</div>`;
  }

  attachEventListeners() {
    // Use addEventDelegate for event handling
    this.addEventDelegate('.btn', 'click', this.handleClick.bind(this));
  }

  handleClick(event, target) {
    // Handle events
    this.setState({ /* new state */ });
  }
}
```

### 2. State Management
- Use `setState()` for all state updates
- Keep state minimal and normalized
- Avoid direct state mutation

### 3. Event Handling
- Use `addEventDelegate()` for automatic cleanup
- Bind methods properly: `this.method.bind(this)`
- Use event delegation for dynamic content

### 4. Performance
- Minimize DOM queries in render()
- Keep render() pure (no side effects)
- Use CSS for styling, not inline styles in JS

### 5. Error Handling
```javascript
constructor(props) {
  super(props);
  if (!props.required) {
    throw new Error('Required prop missing');
  }
}
```

## 🚀 Integration with MLTEACH

This component system is designed specifically for the MLTEACH project:

1. **No External Dependencies**: Pure vanilla JavaScript
2. **Educational Focus**: Clear, documented code for learning
3. **Interactive Content**: Perfect for educational simulations
4. **Lightweight**: Minimal overhead for fast loading
5. **Browser Compatible**: Works in all modern browsers

### Using in MLTEACH Levels

```javascript
// In a level file
class BalloonSimulation extends Component {
  constructor(props) {
    super(props);
    this.state = { pressure: 0, isPopped: false };
  }

  render() {
    return `
      <div class="balloon-sim">
        <div class="balloon ${this.state.isPopped ? 'popped' : ''}">
          🎈
        </div>
        <div class="controls">
          <button class="pump-btn">Pump Air</button>
          <div>Pressure: ${this.state.pressure}</div>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    this.addEventDelegate('.pump-btn', 'click', () => {
      const newPressure = this.state.pressure + 10;
      this.setState({
        pressure: newPressure,
        isPopped: newPressure > 100
      });
    });
  }
}
```

## 📝 Future Enhancements

- Component composition and nesting
- Props validation system
- Development tools and debugging
- Animation and transition helpers
- Form handling utilities
- Async data loading patterns

## 🤝 Contributing

When adding new components:
1. Extend the base `Component` class
2. Add comprehensive JSDoc documentation
3. Include usage examples
4. Test thoroughly with different props
5. Follow the established patterns

## 📄 License

Part of the MLTEACH project - Educational use.