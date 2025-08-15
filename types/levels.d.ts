// Level Type Definitions for MLTEACH
// These types provide IntelliSense and type checking for level development

/**
 * Level types
 */
type LevelType = 'interactive' | 'tutorial' | 'demonstration' | 'custom';

/**
 * Level parameters - can contain any numeric parameters
 */
interface LevelParameters {
  [key: string]: number;
}

/**
 * Control definition for interactive levels
 */
interface LevelControl {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  default: number;
  description?: string;
  unit?: string;
}

/**
 * Target function definition
 */
interface TargetFunction {
  [key: string]: number | ((x: number) => number);
}

/**
 * Validation configuration
 */
interface ValidationConfig {
  tolerance?: number;
  customValidator?: (params: LevelParameters, target: TargetFunction) => ValidationResult;
  testCases?: Array<{
    input: LevelParameters;
    expected: any;
    description?: string;
  }>;
}

/**
 * Validation result
 */
interface ValidationResult {
  success: boolean;
  accuracy: number;
  avgRelativeError?: number;
  parameters: LevelParameters;
  target: TargetFunction;
  details: string[];
  errors?: string[];
}

/**
 * Tutorial step definition
 */
interface TutorialStep {
  title: string;
  content: string;
  order?: number;
  duration?: number;
  actions?: Array<{
    type: 'button' | 'input' | 'selection';
    label: string;
    action: string;
  }>;
}

/**
 * Level completion data
 */
interface LevelCompletionData {
  score: number;
  solutions?: LevelParameters;
  timeSpent?: number;
  attempts?: number;
  accuracy?: number;
  customData?: Record<string, any>;
}

/**
 * Level metadata
 */
interface LevelMetadata {
  id: string;
  name: string;
  type: LevelType;
  description: string;
  created: string;
  version: string;
  author?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  tags?: string[];
  prerequisites?: string[];
}

/**
 * Base level configuration
 */
interface BaseLevelConfig {
  id: string;
  name: string;
  type: LevelType;
  description: string;
  parameters?: LevelParameters;
  trackProgress?: boolean;
  debug?: boolean;
  metadata?: Partial<LevelMetadata>;
  customization?: {
    setupCode?: string;
    teardownCode?: string;
    customMethods?: string;
    contentHTML?: string;
    visualizationCode?: string;
  };
}

/**
 * Interactive level configuration
 */
interface InteractiveLevelConfig extends BaseLevelConfig {
  type: 'interactive';
  targetFunction: TargetFunction;
  controls: LevelControl[];
  validation?: ValidationConfig;
  showFormula?: boolean;
  showResult?: boolean;
  formulaVariable?: string;
}

/**
 * Tutorial level configuration
 */
interface TutorialLevelConfig extends BaseLevelConfig {
  type: 'tutorial';
  steps: TutorialStep[];
  allowSkip?: boolean;
  showProgress?: boolean;
}

/**
 * Demonstration level configuration
 */
interface DemonstrationLevelConfig extends BaseLevelConfig {
  type: 'demonstration';
  parameters: LevelParameters;
  maxIterations?: number;
  stepDelay?: number;
  autoStart?: boolean;
  showControls?: boolean;
}

/**
 * Union type for all level configurations
 */
type LevelConfig = BaseLevelConfig | InteractiveLevelConfig | TutorialLevelConfig | DemonstrationLevelConfig;

/**
 * Level state
 */
interface LevelState {
  mounted: boolean;
  active: boolean;
  completed: boolean;
  score: number;
  attempts: number;
  startTime: number;
  endTime?: number;
  parameters: LevelParameters;
  currentStep?: number;
  totalSteps?: number;
  errors: string[];
  customState?: Record<string, any>;
}

/**
 * Level event data
 */
interface LevelEventData {
  levelId: string;
  timestamp: number;
  eventType: string;
  data?: any;
}

/**
 * Level action tracking data
 */
interface LevelActionData {
  action: string;
  timestamp: number;
  parameters?: LevelParameters;
  result?: any;
  metadata?: Record<string, any>;
}

/**
 * Base Level Template interface
 */
interface BaseLevelTemplate {
  config: LevelConfig;
  state: LevelState;
  container: HTMLElement | null;
  eventListeners: Array<() => void>;
  
  // Lifecycle methods
  create(): Promise<BaseLevelTemplate>;
  setup(): Promise<void>;
  teardown(): Promise<void>;
  onTeardown(): Promise<void>;
  
  // State management
  getParameters(): LevelParameters;
  updateParameters(params: Partial<LevelParameters>, validate?: boolean): void;
  setState(newState: Partial<LevelState>): void;
  
  // Completion and progress
  completeLevel(data: LevelCompletionData): void;
  trackAction(action: string, data?: LevelActionData): void;
  
  // UI methods
  showSuccess(message: string, duration?: number): void;
  showError(message: string, duration?: number): void;
  showMessage(message: string, type: 'success' | 'error' | 'info' | 'warning', duration?: number): void;
  
  // Event handling
  addEventListenerWithCleanup(element: HTMLElement, event: string, handler: EventListener): void;
  dispatchEvent(eventType: string, data?: any): void;
  
  // Content generation
  _generateMainContent(): string;
  _generateInstructions(): string;
  _generateHeader(): string;
  
  // Utility methods
  log(...args: any[]): void;
  createTimeout(callback: () => void, delay: number): number;
  createInterval(callback: () => void, interval: number): number;
}

/**
 * Interactive Level Template interface
 */
interface InteractiveLevelTemplate extends BaseLevelTemplate {
  config: InteractiveLevelConfig;
  
  // Interactive-specific methods
  validateParameters(testParameters?: LevelParameters): ValidationResult;
  attemptSolution(): ValidationResult;
  updateControl(controlId: string, value: number, validate?: boolean): void;
  resetControls(): void;
  showHint(hintText?: string): void;
  
  // Content generation (interactive-specific)
  _generateVisualizationSection(): string;
  _generateVisualizationContent(): string;
  _generateControlsSection(): string;
  _generateFormulaDisplay(): string;
  _generateControlSliders(): string;
  _generateActionButtons(): string;
}

/**
 * Level creation function type
 */
type LevelCreationFunction = () => Promise<BaseLevelTemplate>;

/**
 * Level registry entry
 */
interface LevelRegistryEntry {
  id: string;
  metadata: LevelMetadata;
  createLevel: LevelCreationFunction;
}

/**
 * Level registry interface
 */
interface LevelRegistry {
  levels: Record<string, LevelCreationFunction>;
  metadata: Record<string, LevelMetadata>;
  count: number;
  types: string[];
  created: string;
}

/**
 * Level statistics
 */
interface LevelStatistics {
  total: number;
  byType: Record<LevelType, number>;
  types: LevelType[];
  hasLevels: boolean;
}

/**
 * Level progress data (for state management)
 */
interface LevelProgressData {
  levelId: string;
  completed: boolean;
  score: number;
  bestScore: number;
  attempts: number;
  totalTime: number;
  bestTime: number;
  solutions: LevelParameters[];
  lastPlayed: string;
  firstCompleted?: string;
}

/**
 * Game state data (for state management)
 */
interface GameStateData {
  currentLevel?: string;
  lastLevel?: string;
  parameters: Record<string, LevelParameters>;
  actions: Record<string, LevelActionData[]>;
  settings: {
    sound: boolean;
    animations: boolean;
    hints: boolean;
    autoSave: boolean;
  };
  statistics: {
    totalPlayTime: number;
    levelsCompleted: number;
    totalAttempts: number;
    averageScore: number;
  };
}

// Global level classes and utilities
declare global {
  interface Window {
    BaseLevelTemplate: new (config: BaseLevelConfig) => BaseLevelTemplate;
    InteractiveLevelTemplate: new (config: InteractiveLevelConfig) => InteractiveLevelTemplate;
    
    // Level management
    MLTeachLevels?: {
      levels: Record<string, LevelCreationFunction>;
      levelMetadata: Record<string, LevelMetadata>;
      getLevel: (levelId: string) => LevelCreationFunction | null;
      getAllLevelIds: () => string[];
      getLevelsByType: (type: LevelType) => string[];
      getLevelMetadata: (levelId: string) => LevelMetadata | null;
      levelExists: (levelId: string) => boolean;
      getAllLevelsWithMetadata: () => LevelRegistryEntry[];
      createLevelRegistry: () => LevelRegistry;
      getLevelStatistics: () => LevelStatistics;
    };
    
    // Current level instance
    currentLevel?: BaseLevelTemplate;
    
    // Level creation functions (dynamically added)
    [key: string]: any;
  }
}

export {
  LevelType,
  LevelParameters,
  LevelControl,
  TargetFunction,
  ValidationConfig,
  ValidationResult,
  TutorialStep,
  LevelCompletionData,
  LevelMetadata,
  BaseLevelConfig,
  InteractiveLevelConfig,
  TutorialLevelConfig,
  DemonstrationLevelConfig,
  LevelConfig,
  LevelState,
  LevelEventData,
  LevelActionData,
  BaseLevelTemplate,
  InteractiveLevelTemplate,
  LevelCreationFunction,
  LevelRegistryEntry,
  LevelRegistry,
  LevelStatistics,
  LevelProgressData,
  GameStateData
};