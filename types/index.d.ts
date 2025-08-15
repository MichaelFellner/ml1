// MLTEACH Type Definitions - Main Index
// This file exports all type definitions and provides global type declarations

// Re-export all component types
export * from './components';

// Re-export all level types  
export * from './levels';

// Re-export all service types
export * from './services';

// Additional global types and utilities

/**
 * Common utility types
 */
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Partial<T> = { [P in keyof T]?: T[P] };
export type Required<T> = { [P in keyof T]-?: T[P] };
export type ReadOnly<T> = { readonly [P in keyof T]: T[P] };

/**
 * Event listener types
 */
export type EventHandler<T = Event> = (event: T) => void;
export type AsyncEventHandler<T = Event> = (event: T) => Promise<void>;

/**
 * Callback function types
 */
export type VoidCallback = () => void;
export type AsyncVoidCallback = () => Promise<void>;
export type ValueCallback<T> = (value: T) => void;
export type AsyncValueCallback<T> = (value: T) => Promise<void>;

/**
 * State update function type
 */
export type StateUpdater<T> = (currentState: T) => Partial<T>;

/**
 * Configuration merger type
 */
export type ConfigMerger<T> = (defaultConfig: T, userConfig: Partial<T>) => T;

/**
 * Logger interface
 */
export interface Logger {
  debug(...args: any[]): void;
  info(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
  log(...args: any[]): void;
}

/**
 * Timer utilities
 */
export interface TimerHandle {
  id: number;
  type: 'timeout' | 'interval';
  callback: VoidCallback;
  delay: number;
  created: number;
}

export interface TimerManager {
  createTimeout(callback: VoidCallback, delay: number): TimerHandle;
  createInterval(callback: VoidCallback, delay: number): TimerHandle;
  clearTimer(handle: TimerHandle): void;
  clearAllTimers(): void;
  getActiveTimers(): TimerHandle[];
}

/**
 * Performance measurement
 */
export interface PerformanceMetrics {
  startTime: number;
  endTime?: number;
  duration?: number;
  memory?: {
    used: number;
    total: number;
  };
  custom?: Record<string, number>;
}

export interface PerformanceTracker {
  start(label: string): void;
  end(label: string): PerformanceMetrics | null;
  mark(label: string): void;
  measure(name: string, startMark: string, endMark?: string): number;
  getMetrics(label: string): PerformanceMetrics | null;
  getAllMetrics(): Record<string, PerformanceMetrics>;
  clear(label?: string): void;
}

/**
 * Error handling
 */
export type ErrorLevel = 'low' | 'medium' | 'high' | 'critical';

export interface ErrorInfo {
  message: string;
  level: ErrorLevel;
  timestamp: number;
  stack?: string;
  context?: Record<string, any>;
  componentId?: string;
  levelId?: string;
}

export interface ErrorHandler {
  handleError(error: Error | ErrorInfo, context?: Record<string, any>): void;
  captureException(error: Error, tags?: Record<string, string>): void;
  addBreadcrumb(message: string, category?: string, data?: Record<string, any>): void;
  setContext(key: string, value: any): void;
  setUser(user: { id: string; [key: string]: any }): void;
  configureScope(callback: (scope: any) => void): void;
}

/**
 * Event system types
 */
export type EventMap = Record<string, any>;

export interface EventEmitter<T extends EventMap = EventMap> {
  on<K extends keyof T>(event: K, listener: (data: T[K]) => void): void;
  off<K extends keyof T>(event: K, listener: (data: T[K]) => void): void;
  emit<K extends keyof T>(event: K, data: T[K]): void;
  once<K extends keyof T>(event: K, listener: (data: T[K]) => void): void;
  removeAllListeners<K extends keyof T>(event?: K): void;
  listenerCount<K extends keyof T>(event: K): number;
}

/**
 * MLTEACH global event types
 */
export interface MLTeachEventMap {
  'mlteach:component:mounted': { componentId: string; timestamp: number };
  'mlteach:component:unmounted': { componentId: string; timestamp: number };
  'mlteach:component:stateChanged': { componentId: string; newState: any; timestamp: number };
  'mlteach:level:levelCompleted': { levelId: string; score: number; solutions: any; timestamp: number };
  'mlteach:level:parameterUpdated': { levelId: string; parameter: string; value: number; timestamp: number };
  'mlteach:level:attemptMade': { levelId: string; attempt: number; parameters: any; result: any; timestamp: number };
  'mlteach:navigation:pageChanged': { from: string; to: string; timestamp: number };
  'mlteach:user:actionTracked': { action: string; data: any; timestamp: number };
  'mlteach:error:occurred': ErrorInfo;
  'mlteach:performance:measured': { label: string; metrics: PerformanceMetrics };
}

/**
 * Storage interface
 */
export interface Storage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
  key(index: number): string | null;
  readonly length: number;
}

export interface StorageManager {
  get<T>(key: string, defaultValue?: T): T;
  set<T>(key: string, value: T): void;
  remove(key: string): void;
  clear(): void;
  has(key: string): boolean;
  keys(): string[];
  size(): number;
}

/**
 * Configuration types
 */
export interface AppConfig {
  debug: boolean;
  version: string;
  environment: 'development' | 'staging' | 'production';
  features: {
    animations: boolean;
    sound: boolean;
    analytics: boolean;
    errorReporting: boolean;
  };
  services: {
    gradientDescent: boolean;
    validation: boolean;
    animation: boolean;
    stateManagement: boolean;
  };
  ui: {
    theme: 'light' | 'dark' | 'auto';
    language: string;
    accessibility: {
      highContrast: boolean;
      reducedMotion: boolean;
      screenReader: boolean;
    };
  };
}

/**
 * Plugin system types
 */
export interface Plugin {
  name: string;
  version: string;
  dependencies?: string[];
  initialize?(context: PluginContext): Promise<void> | void;
  destroy?(): Promise<void> | void;
}

export interface PluginContext {
  config: AppConfig;
  logger: Logger;
  eventEmitter: EventEmitter<MLTeachEventMap>;
  storage: StorageManager;
  performance: PerformanceTracker;
}

export interface PluginManager {
  register(plugin: Plugin): Promise<void>;
  unregister(name: string): Promise<void>;
  get(name: string): Plugin | null;
  list(): Plugin[];
  isRegistered(name: string): boolean;
  initialize(): Promise<void>;
  destroy(): Promise<void>;
}

/**
 * Global MLTEACH namespace
 */
export interface MLTeach {
  version: string;
  config: AppConfig;
  logger: Logger;
  eventEmitter: EventEmitter<MLTeachEventMap>;
  storage: StorageManager;
  performance: PerformanceTracker;
  errorHandler: ErrorHandler;
  pluginManager: PluginManager;
  timers: TimerManager;
  
  // Core systems
  components: import('./components').ComponentRegistry;
  levels: import('./levels').LevelRegistry;
  services: import('./services').ServiceChecker;
  
  // Initialization
  initialize(config?: Partial<AppConfig>): Promise<void>;
  destroy(): Promise<void>;
}

// Global declarations
declare global {
  interface Window {
    MLTeach: MLTeach;
    
    // Development helpers
    __MLTEACH_DEBUG__?: boolean;
    __MLTEACH_VERSION__?: string;
    
    // For debugging and development
    mlteachDebug?: {
      components: any[];
      levels: any[];
      services: any[];
      state: any;
      performance: Record<string, PerformanceMetrics>;
      events: any[];
    };
  }
  
  // Extend global console for better logging
  interface Console {
    group(label?: any, ...data: any[]): void;
    groupCollapsed(label?: any, ...data: any[]): void;
    groupEnd(): void;
    time(label?: string): void;
    timeEnd(label?: string): void;
    timeLog(label?: string, ...data: any[]): void;
    trace(...data: any[]): void;
    table(tabularData?: any, properties?: string[]): void;
  }
}

// Utility type guards
export function isComponent(obj: any): obj is import('./components').Component;
export function isLevel(obj: any): obj is import('./levels').BaseLevelTemplate;
export function isInteractiveLevel(obj: any): obj is import('./levels').InteractiveLevelTemplate;
export function isService(obj: any): obj is import('./services').GradientDescentService | import('./services').LevelValidationService | import('./services').AnimationService;

// Type assertion helpers
export function assertComponent(obj: any): asserts obj is import('./components').Component;
export function assertLevel(obj: any): asserts obj is import('./levels').BaseLevelTemplate;
export function assertInteractiveLevel(obj: any): asserts obj is import('./levels').InteractiveLevelTemplate;

// Version and feature detection
export const VERSION: string;
export const FEATURES: {
  COMPONENTS: boolean;
  LEVELS: boolean;
  SERVICES: boolean;
  STATE_MANAGEMENT: boolean;
  ANIMATIONS: boolean;
  PERFORMANCE_TRACKING: boolean;
};

export function checkFeature(feature: keyof typeof FEATURES): boolean;
export function getVersion(): string;
export function getBuildInfo(): {
  version: string;
  buildDate: string;
  gitHash?: string;
  environment: string;
};