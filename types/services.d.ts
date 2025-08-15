// Service Type Definitions for MLTEACH
// These types provide IntelliSense and type checking for service layer

/**
 * Data point for gradient descent calculations
 */
interface DataPoint {
  x: number;
  y: number;
}

/**
 * Gradient calculation result
 */
interface GradientResult {
  dw: number;
  db: number;
  loss: number;
}

/**
 * Loss calculation result
 */
interface LossResult {
  loss: number;
  predictions: number[];
  errors: number[];
}

/**
 * Parameter update step result
 */
interface StepResult {
  w: number;
  b: number;
  loss: number;
  iteration: number;
}

/**
 * Optimization configuration
 */
interface OptimizationConfig {
  learningRate: number;
  maxIterations: number;
  tolerance: number;
  lossType: 'L1' | 'L2';
  regularization?: {
    type: 'L1' | 'L2';
    lambda: number;
  };
}

/**
 * Optimization result
 */
interface OptimizationResult {
  parameters: {
    w: number;
    b: number;
  };
  finalLoss: number;
  iterations: number;
  converged: boolean;
  history: Array<{
    iteration: number;
    parameters: { w: number; b: number };
    loss: number;
    gradients: { dw: number; db: number };
  }>;
}

/**
 * Gradient Descent Service interface
 */
interface GradientDescentService {
  /**
   * Calculate L1 loss (Mean Absolute Error)
   */
  calculateL1Loss(predicted: number[], actual: number[]): number;
  
  /**
   * Calculate L2 loss (Mean Squared Error)
   */
  calculateL2Loss(predicted: number[], actual: number[]): number;
  
  /**
   * Calculate gradient for linear function
   */
  calculateGradient(w: number, b: number, data: DataPoint[], lossType?: 'L1' | 'L2'): GradientResult;
  
  /**
   * Perform single gradient descent step
   */
  performStep(params: { w: number; b: number }, gradients: { dw: number; db: number }, learningRate: number): { w: number; b: number };
  
  /**
   * Generate predictions using linear function
   */
  predict(w: number, b: number, xValues: number[]): number[];
  
  /**
   * Perform full optimization
   */
  optimize(data: DataPoint[], config: OptimizationConfig): OptimizationResult;
  
  /**
   * Calculate R-squared coefficient
   */
  calculateRSquared(predicted: number[], actual: number[]): number;
  
  /**
   * Normalize data
   */
  normalizeData(data: DataPoint[]): { data: DataPoint[]; stats: { xMean: number; xStd: number; yMean: number; yStd: number } };
}

/**
 * Validation constraint types
 */
type ValidationConstraintType = 'range' | 'type' | 'required' | 'custom';

/**
 * Validation constraint definition
 */
interface ValidationConstraint {
  type: ValidationConstraintType;
  parameter: string;
  min?: number;
  max?: number;
  required?: boolean;
  dataType?: 'number' | 'string' | 'boolean';
  customValidator?: (value: any) => boolean;
  message?: string;
}

/**
 * Validation error
 */
interface ValidationError {
  parameter: string;
  value: any;
  constraint: ValidationConstraint;
  message: string;
}

/**
 * Validation result
 */
interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: string[];
  normalizedData?: any;
}

/**
 * Feedback generation options
 */
interface FeedbackOptions {
  includeHints?: boolean;
  includeDetails?: boolean;
  maxSuggestions?: number;
  tone?: 'encouraging' | 'neutral' | 'detailed';
}

/**
 * Level Validation Service interface
 */
interface LevelValidationService {
  /**
   * Validate level parameters against constraints
   */
  validateParameters(parameters: Record<string, any>, constraints: ValidationConstraint[]): ValidationResult;
  
  /**
   * Validate interactive level configuration
   */
  validateLevelConfig(config: import('./levels').LevelConfig): ValidationResult;
  
  /**
   * Generate user feedback based on validation results
   */
  generateFeedback(result: ValidationResult, options?: FeedbackOptions): string[];
  
  /**
   * Check if parameters are within acceptable range of target
   */
  checkAccuracy(parameters: Record<string, number>, target: Record<string, number>, tolerance: number): {
    accurate: boolean;
    accuracy: number;
    errors: Record<string, number>;
  };
  
  /**
   * Validate data format for gradient descent
   */
  validateDataFormat(data: any[]): ValidationResult;
  
  /**
   * Generate performance hints
   */
  generateHints(current: Record<string, number>, target: Record<string, number>): string[];
}

/**
 * Animation easing functions
 */
type EasingFunction = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'bounce' | 'elastic';

/**
 * Animation configuration
 */
interface AnimationConfig {
  duration: number;
  easing?: EasingFunction;
  delay?: number;
  iterations?: number;
  direction?: 'normal' | 'reverse' | 'alternate';
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
}

/**
 * Animation keyframe
 */
interface AnimationKeyframe {
  offset: number;
  styles: Record<string, string | number>;
}

/**
 * Animation timeline entry
 */
interface TimelineEntry {
  element: HTMLElement;
  keyframes: AnimationKeyframe[];
  config: AnimationConfig;
  startTime: number;
}

/**
 * Animation Service interface
 */
interface AnimationService {
  /**
   * Animate element with smooth transitions
   */
  smoothTransition(
    element: HTMLElement, 
    fromStyles: Record<string, string | number>, 
    toStyles: Record<string, string | number>, 
    duration: number, 
    easing?: EasingFunction
  ): Promise<void>;
  
  /**
   * Animate numeric value over time
   */
  animateValue(
    from: number, 
    to: number, 
    duration: number, 
    callback: (value: number) => void, 
    easing?: EasingFunction
  ): Promise<void>;
  
  /**
   * Create fade in animation
   */
  fadeIn(element: HTMLElement, duration?: number): Promise<void>;
  
  /**
   * Create fade out animation
   */
  fadeOut(element: HTMLElement, duration?: number): Promise<void>;
  
  /**
   * Create slide animation
   */
  slide(element: HTMLElement, direction: 'up' | 'down' | 'left' | 'right', distance: number, duration?: number): Promise<void>;
  
  /**
   * Create bounce animation
   */
  bounce(element: HTMLElement, intensity?: number, duration?: number): Promise<void>;
  
  /**
   * Create shake animation
   */
  shake(element: HTMLElement, intensity?: number, duration?: number): Promise<void>;
  
  /**
   * Create pulse animation
   */
  pulse(element: HTMLElement, scale?: number, duration?: number): Promise<void>;
  
  /**
   * Animate progress bar
   */
  animateProgressBar(element: HTMLElement, from: number, to: number, duration?: number): Promise<void>;
  
  /**
   * Create timeline animation
   */
  createTimeline(entries: TimelineEntry[]): Promise<void>;
  
  /**
   * Stop all animations on element
   */
  stopAnimations(element: HTMLElement): void;
  
  /**
   * Check if element is currently animating
   */
  isAnimating(element: HTMLElement): boolean;
  
  /**
   * Get easing function by name
   */
  getEasing(name: EasingFunction): (t: number) => number;
  
  /**
   * Request animation frame with fallback
   */
  requestAnimationFrame(callback: () => void): number;
  
  /**
   * Cancel animation frame
   */
  cancelAnimationFrame(id: number): void;
}

/**
 * Service availability checker
 */
interface ServiceChecker {
  hasGradientDescentService(): boolean;
  hasLevelValidationService(): boolean;
  hasAnimationService(): boolean;
  hasStateManagement(): boolean;
  getAvailableServices(): string[];
  getMissingServices(required: string[]): string[];
}

// Global service declarations
declare global {
  interface Window {
    GradientDescentService: GradientDescentService;
    LevelValidationService: LevelValidationService;
    AnimationService: AnimationService;
    
    // Service checker utility
    MLTeachServices?: ServiceChecker;
  }
}

export {
  DataPoint,
  GradientResult,
  LossResult,
  StepResult,
  OptimizationConfig,
  OptimizationResult,
  GradientDescentService,
  ValidationConstraintType,
  ValidationConstraint,
  ValidationError,
  ValidationResult as ServiceValidationResult,
  FeedbackOptions,
  LevelValidationService,
  EasingFunction,
  AnimationConfig,
  AnimationKeyframe,
  TimelineEntry,
  AnimationService,
  ServiceChecker
};