// Component Type Definitions for MLTEACH
// These types provide IntelliSense and type checking without converting to TypeScript

/**
 * Base component configuration interface
 */
interface ComponentConfig {
  id?: string;
  className?: string;
  theme?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  [key: string]: any;
}

/**
 * Component state interface
 */
interface ComponentState {
  mounted: boolean;
  active: boolean;
  loading: boolean;
  error?: string;
  [key: string]: any;
}

/**
 * Event listener cleanup function
 */
type EventCleanup = () => void;

/**
 * Base Component interface
 */
interface Component {
  container: HTMLElement | null;
  config: ComponentConfig;
  state: ComponentState;
  eventListeners: EventCleanup[];
  
  // Lifecycle methods
  mount(): void;
  unmount(): void;
  render(): string;
  setState(newState: Partial<ComponentState>): void;
  
  // Event handling
  addEventDelegate(selector: string, event: string, handler: EventListener): void;
  addEventListenerWithCleanup(element: HTMLElement, event: string, handler: EventListener): void;
  
  // Utility methods
  dispatchEvent(eventType: string, data?: any): void;
  log(...args: any[]): void;
}

/**
 * Control Slider Configuration
 */
interface ControlSliderConfig extends ComponentConfig {
  id: string;
  label: string;
  min: number;
  max: number;
  value: number;
  step: number;
  onChange?: (value: number) => void;
  onInput?: (value: number) => void;
  showValue?: boolean;
  formatValue?: (value: number) => string;
}

/**
 * Control Slider Component
 */
interface ControlSlider extends Component {
  config: ControlSliderConfig;
  
  updateValue(value: number): void;
  getValue(): number;
  setValue(value: number): void;
  disable(): void;
  enable(): void;
}

/**
 * Formula Display Configuration
 */
interface FormulaDisplayConfig extends ComponentConfig {
  variables: Record<string, number>;
  template: string;
  target?: string;
  showTarget?: boolean;
  variableNames?: Record<string, string>;
}

/**
 * Formula Display Component
 */
interface FormulaDisplay extends Component {
  config: FormulaDisplayConfig;
  
  updateVariables(variables: Record<string, number>): void;
  setTemplate(template: string): void;
  setTarget(target: string): void;
}

/**
 * Result Message Types
 */
type ResultMessageType = 'success' | 'error' | 'warning' | 'info';

/**
 * Result Message Configuration
 */
interface ResultMessageConfig extends ComponentConfig {
  type?: ResultMessageType;
  duration?: number;
  autoHide?: boolean;
  showIcon?: boolean;
}

/**
 * Result Message Options
 */
interface ResultMessageOptions {
  duration?: number;
  score?: number;
  attempts?: number;
  details?: string[];
  actions?: Array<{
    label: string;
    onClick: () => void;
  }>;
}

/**
 * Result Message Component
 */
interface ResultMessage extends Component {
  config: ResultMessageConfig;
  
  showSuccess(message: string, options?: ResultMessageOptions): void;
  showError(message: string, options?: ResultMessageOptions): void;
  showWarning(message: string, options?: ResultMessageOptions): void;
  showInfo(message: string, options?: ResultMessageOptions): void;
  hide(): void;
  clear(): void;
}

/**
 * Loss Bar Configuration
 */
interface LossBarConfig extends ComponentConfig {
  maxValue: number;
  threshold?: number;
  showTarget?: boolean;
  targetValue?: number;
  color?: string;
  targetColor?: string;
  animate?: boolean;
}

/**
 * Loss Bar Component
 */
interface LossBar extends Component {
  config: LossBarConfig;
  
  updateValue(value: number): void;
  setThreshold(threshold: number): void;
  setTarget(target: number): void;
  reset(): void;
}

/**
 * Navigation Buttons Configuration
 */
interface NavigationButtonsConfig extends ComponentConfig {
  showNext?: boolean;
  showPrevious?: boolean;
  showReset?: boolean;
  showHint?: boolean;
  showHome?: boolean;
  
  nextLabel?: string;
  previousLabel?: string;
  resetLabel?: string;
  hintLabel?: string;
  homeLabel?: string;
  
  onNext?: () => void;
  onPrevious?: () => void;
  onReset?: () => void;
  onHint?: () => void;
  onHome?: () => void;
}

/**
 * Navigation Buttons Component
 */
interface NavigationButtons extends Component {
  config: NavigationButtonsConfig;
  
  enableNext(): void;
  disableNext(): void;
  enablePrevious(): void;
  disablePrevious(): void;
  showButton(button: keyof NavigationButtonsConfig): void;
  hideButton(button: keyof NavigationButtonsConfig): void;
}

/**
 * Interactive Counter Configuration (Example Component)
 */
interface InteractiveCounterConfig extends ComponentConfig {
  initialValue?: number;
  min?: number;
  max?: number;
  step?: number;
  showButtons?: boolean;
  showInput?: boolean;
}

/**
 * Interactive Counter Component (Example)
 */
interface InteractiveCounter extends Component {
  config: InteractiveCounterConfig;
  
  increment(): void;
  decrement(): void;
  setValue(value: number): void;
  getValue(): number;
  reset(): void;
}

/**
 * Component Event Data
 */
interface ComponentEventData {
  componentId: string;
  timestamp: number;
  [key: string]: any;
}

/**
 * Component Factory Function Type
 */
type ComponentFactory<T extends Component> = (
  container: string | HTMLElement,
  config?: ComponentConfig
) => T;

/**
 * Global Component Registry
 */
interface ComponentRegistry {
  register<T extends Component>(name: string, factory: ComponentFactory<T>): void;
  create<T extends Component>(name: string, container: string | HTMLElement, config?: ComponentConfig): T | null;
  get<T extends Component>(name: string): ComponentFactory<T> | null;
  unregister(name: string): void;
  list(): string[];
}

// Global component instances and factories
declare global {
  interface Window {
    Component: new (container: string | HTMLElement, config?: ComponentConfig) => Component;
    ControlSlider: new (container: string | HTMLElement, config: ControlSliderConfig) => ControlSlider;
    FormulaDisplay: new (container: string | HTMLElement, config: FormulaDisplayConfig) => FormulaDisplay;
    ResultMessage: new (container: string | HTMLElement, config?: ResultMessageConfig) => ResultMessage;
    LossBar: new (container: string | HTMLElement, config: LossBarConfig) => LossBar;
    NavigationButtons: new (container: string | HTMLElement, config: NavigationButtonsConfig) => NavigationButtons;
    InteractiveCounter: new (container: string | HTMLElement, config?: InteractiveCounterConfig) => InteractiveCounter;
    
    // Component registry
    MLTeachComponents?: ComponentRegistry;
  }
}

export {
  ComponentConfig,
  ComponentState,
  Component,
  ControlSliderConfig,
  ControlSlider,
  FormulaDisplayConfig,
  FormulaDisplay,
  ResultMessageType,
  ResultMessageConfig,
  ResultMessageOptions,
  ResultMessage,
  LossBarConfig,
  LossBar,
  NavigationButtonsConfig,
  NavigationButtons,
  InteractiveCounterConfig,
  InteractiveCounter,
  ComponentEventData,
  ComponentFactory,
  ComponentRegistry,
  EventCleanup
};