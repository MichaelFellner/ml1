/**
 * Level Loader - Dynamic Module Loading System
 * 
 * Handles dynamic loading of level modules with caching, error handling,
 * and loading state management for the MLTEACH navigation system.
 * 
 * @fileoverview Dynamic level loading with code splitting and caching
 * @author MLTEACH Team
 * @version 1.0.0
 * 
 * Features:
 * - Dynamic script loading for vanilla JavaScript
 * - Module caching to avoid re-downloads
 * - Loading state management with spinners
 * - Error boundaries for failed loads
 * - Preloading capabilities
 */

/**
 * Level Loader Class
 * Manages dynamic loading of level modules with caching and error handling
 */
class LevelLoader {
    constructor() {
        /** @type {Map<string, Promise>} Cache for loaded modules */
        this.moduleCache = new Map();
        
        /** @type {Map<string, Promise>} Track ongoing loading operations */
        this.loadingPromises = new Map();
        
        /** @type {Map<string, HTMLElement>} Loading UI elements */
        this.loadingElements = new Map();
        
        /** @type {number} Default timeout for loading operations */
        this.loadTimeout = 10000; // 10 seconds
        
        /** @type {boolean} Debug mode flag */
        this.debugMode = false;
    }

    /**
     * Sets debug mode for verbose logging
     * @param {boolean} enabled - Whether to enable debug mode
     */
    setDebugMode(enabled) {
        this.debugMode = enabled;
        if (enabled) {
            console.log('[LevelLoader] Debug mode enabled');
        }
    }

    /**
     * Creates and shows a loading spinner
     * @param {string} levelId - Level identifier
     * @param {HTMLElement} targetElement - Element to show loading in
     * @returns {HTMLElement} Loading element
     */
    showLoading(levelId, targetElement = null) {
        const target = targetElement || document.getElementById('app');
        if (!target) return null;

        // Remove any existing loading elements
        this.hideLoading(levelId);

        const loadingElement = document.createElement('div');
        loadingElement.className = 'level-loading';
        loadingElement.innerHTML = `
            <div class="loading-container" style="
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 40px;
                min-height: 200px;
                background: rgba(255, 255, 255, 0.9);
                border-radius: 15px;
                margin: 20px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            ">
                <div class="loading-spinner" style="
                    width: 40px;
                    height: 40px;
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #667eea;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin-bottom: 20px;
                "></div>
                <div class="loading-text" style="
                    font-size: 1.1rem;
                    color: #555;
                    text-align: center;
                    font-weight: 500;
                ">
                    Loading level...
                </div>
                <div class="loading-details" style="
                    font-size: 0.9rem;
                    color: #777;
                    text-align: center;
                    margin-top: 10px;
                ">
                    Preparing interactive content
                </div>
            </div>

            <style>
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                .loading-container {
                    transition: opacity 0.3s ease;
                }
                
                .level-loading.fade-out .loading-container {
                    opacity: 0;
                }
            </style>
        `;

        target.appendChild(loadingElement);
        this.loadingElements.set(levelId, loadingElement);

        return loadingElement;
    }

    /**
     * Hides the loading spinner
     * @param {string} levelId - Level identifier
     * @param {boolean} animated - Whether to animate the hide
     */
    hideLoading(levelId, animated = true) {
        const loadingElement = this.loadingElements.get(levelId);
        if (!loadingElement) return;

        if (animated) {
            loadingElement.classList.add('fade-out');
            setTimeout(() => {
                if (loadingElement.parentNode) {
                    loadingElement.parentNode.removeChild(loadingElement);
                }
                this.loadingElements.delete(levelId);
            }, 300);
        } else {
            if (loadingElement.parentNode) {
                loadingElement.parentNode.removeChild(loadingElement);
            }
            this.loadingElements.delete(levelId);
        }
    }

    /**
     * Shows an error message for failed level loading
     * @param {string} levelId - Level identifier
     * @param {string} errorMessage - Error message to display
     * @param {HTMLElement} targetElement - Element to show error in
     */
    showError(levelId, errorMessage, targetElement = null) {
        const target = targetElement || document.getElementById('app');
        if (!target) return;

        this.hideLoading(levelId, false);

        const errorElement = document.createElement('div');
        errorElement.className = 'level-error';
        errorElement.innerHTML = `
            <div class="error-container" style="
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 40px;
                min-height: 200px;
                background: rgba(255, 99, 71, 0.1);
                border: 2px solid rgba(255, 99, 71, 0.3);
                border-radius: 15px;
                margin: 20px;
                text-align: center;
            ">
                <div class="error-icon" style="
                    font-size: 48px;
                    color: #ff6347;
                    margin-bottom: 20px;
                ">
                    ⚠️
                </div>
                <div class="error-title" style="
                    font-size: 1.3rem;
                    font-weight: bold;
                    color: #d32f2f;
                    margin-bottom: 15px;
                ">
                    Failed to Load Level
                </div>
                <div class="error-message" style="
                    font-size: 1rem;
                    color: #666;
                    margin-bottom: 20px;
                    max-width: 400px;
                    line-height: 1.5;
                ">
                    ${errorMessage}
                </div>
                <button class="retry-button" style="
                    background: #667eea;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 8px;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: background 0.3s;
                ">
                    Try Again
                </button>
            </div>
        `;

        const retryButton = errorElement.querySelector('.retry-button');
        retryButton.addEventListener('click', () => {
            errorElement.remove();
            this.loadLevel(levelId, target);
        });

        target.appendChild(errorElement);
    }

    /**
     * Dynamically loads a level script
     * @param {string} levelId - Level identifier
     * @param {string} scriptPath - Path to the script file
     * @returns {Promise<void>} Promise resolving when script is loaded
     */
    loadScript(scriptPath) {
        return new Promise((resolve, reject) => {
            // Check if script is already loaded
            const existingScript = document.querySelector(`script[src="${scriptPath}"]`);
            if (existingScript) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = scriptPath;
            script.async = true;
            
            script.onload = () => {
                if (this.debugMode) {
                    console.log(`[LevelLoader] Script loaded: ${scriptPath}`);
                }
                resolve();
            };
            
            script.onerror = () => {
                reject(new Error(`Failed to load script: ${scriptPath}`));
            };

            document.head.appendChild(script);
        });
    }

    /**
     * Loads a level module with full error handling and loading states
     * @param {string} levelId - Level identifier
     * @param {HTMLElement} targetElement - Element to show loading/error in
     * @returns {Promise<Object>} Promise resolving to the level module
     */
    async loadLevel(levelId, targetElement = null) {
        if (this.debugMode) {
            console.log(`[LevelLoader] Loading level: ${levelId}`);
        }

        // Check cache first
        if (this.moduleCache.has(levelId)) {
            if (this.debugMode) {
                console.log(`[LevelLoader] Level ${levelId} loaded from cache`);
            }
            return this.moduleCache.get(levelId);
        }

        // Check if already loading
        if (this.loadingPromises.has(levelId)) {
            if (this.debugMode) {
                console.log(`[LevelLoader] Level ${levelId} already loading, waiting...`);
            }
            return this.loadingPromises.get(levelId);
        }

        // Show loading state
        this.showLoading(levelId, targetElement);

        // Start loading process
        const loadingPromise = this.performLoad(levelId);
        this.loadingPromises.set(levelId, loadingPromise);

        try {
            const result = await loadingPromise;
            this.hideLoading(levelId);
            return result;
        } catch (error) {
            this.hideLoading(levelId, false);
            this.showError(levelId, error.message, targetElement);
            throw error;
        } finally {
            this.loadingPromises.delete(levelId);
        }
    }

    /**
     * Performs the actual level loading logic
     * @param {string} levelId - Level identifier
     * @returns {Promise<Object>} Promise resolving to the level module
     */
    async performLoad(levelId) {
        // Define level configurations
        const levelConfigs = {
            'gradient-descent-intro': {
                script: 'levels/gradient-descent-intro.js',
                functionName: 'createGradientDescentPart1'
            },
            'balloon-inflation': {
                script: 'levels/balloon-inflation.js', 
                functionName: 'createBalloonInflationLevel'
            },
            'balloon-gradient': {
                script: 'levels/balloon-gradient.js',
                functionName: 'createBalloonGradientDescent'
            },
            'bunny-feeding': {
                script: 'levels/bunny-feeding.js',
                functionName: 'createBunnyFeedingLevel'
            },
            'bunny-gradient': {
                script: 'levels/bunny-gradient.js',
                functionName: 'createBunnyGradientDescent'
            },
            // Content levels
            'introduction': {
                script: 'content/instruction_parts_1-2.js',
                functionName: 'createIntroduction'
            },
            'prerequisites': {
                script: 'content/instruction_parts_1-2.js',
                functionName: 'createPrerequisites'
            },
            'core-concepts': {
                script: 'content/instruction_parts_1-2.js',
                functionName: 'createCoreConcepts'
            }
        };

        const config = levelConfigs[levelId];
        if (!config) {
            throw new Error(`No configuration found for level: ${levelId}`);
        }

        // Create timeout promise
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error(`Loading timeout for level: ${levelId}`));
            }, this.loadTimeout);
        });

        try {
            // Load the script with timeout
            await Promise.race([
                this.loadScript(config.script),
                timeoutPromise
            ]);

            // Verify function exists
            const levelFunction = window[config.functionName];
            if (!levelFunction || typeof levelFunction !== 'function') {
                throw new Error(`Level function ${config.functionName} not found or not a function`);
            }

            // Create module object
            const module = {
                [config.functionName]: levelFunction,
                levelId: levelId,
                loaded: new Date().toISOString()
            };

            // Cache the module
            this.moduleCache.set(levelId, module);

            if (this.debugMode) {
                console.log(`[LevelLoader] Successfully loaded level: ${levelId}`);
            }

            return module;

        } catch (error) {
            if (this.debugMode) {
                console.error(`[LevelLoader] Failed to load level ${levelId}:`, error);
            }
            throw new Error(`Failed to load level '${levelId}': ${error.message}`);
        }
    }

    /**
     * Preloads multiple levels for better performance
     * @param {string[]} levelIds - Array of level IDs to preload
     * @param {Function} progressCallback - Optional callback for progress updates
     * @returns {Promise<Object>} Promise resolving to preload results
     */
    async preloadLevels(levelIds, progressCallback = null) {
        if (this.debugMode) {
            console.log(`[LevelLoader] Preloading ${levelIds.length} levels:`, levelIds);
        }

        const results = {
            loaded: [],
            failed: [],
            total: levelIds.length
        };

        let completed = 0;

        const loadPromises = levelIds.map(async (levelId) => {
            try {
                await this.performLoad(levelId);
                results.loaded.push(levelId);
                
                if (this.debugMode) {
                    console.log(`[LevelLoader] Preloaded: ${levelId}`);
                }
            } catch (error) {
                results.failed.push({
                    levelId,
                    error: error.message
                });
                
                if (this.debugMode) {
                    console.warn(`[LevelLoader] Failed to preload ${levelId}:`, error.message);
                }
            } finally {
                completed++;
                if (progressCallback) {
                    progressCallback(completed, results.total, levelId);
                }
            }
        });

        await Promise.allSettled(loadPromises);

        if (this.debugMode) {
            console.log(`[LevelLoader] Preloading complete:`, results);
        }

        return results;
    }

    /**
     * Gets loading statistics and cache information
     * @returns {Object} Statistics object
     */
    getStats() {
        return {
            cachedModules: this.moduleCache.size,
            loadingModules: this.loadingPromises.size,
            cachedLevels: Array.from(this.moduleCache.keys()),
            loadingLevels: Array.from(this.loadingPromises.keys()),
            debugMode: this.debugMode,
            timeout: this.loadTimeout
        };
    }

    /**
     * Checks if a level is currently loading
     * @param {string} levelId - Level identifier
     * @returns {boolean} True if loading
     */
    isLoading(levelId) {
        return this.loadingPromises.has(levelId);
    }

    /**
     * Checks if a level is cached
     * @param {string} levelId - Level identifier
     * @returns {boolean} True if cached
     */
    isCached(levelId) {
        return this.moduleCache.has(levelId);
    }

    /**
     * Clears the cache (useful for development)
     * @param {string} levelId - Optional specific level to clear
     */
    clearCache(levelId = null) {
        if (levelId) {
            this.moduleCache.delete(levelId);
            if (this.debugMode) {
                console.log(`[LevelLoader] Cleared cache for: ${levelId}`);
            }
        } else {
            this.moduleCache.clear();
            if (this.debugMode) {
                console.log('[LevelLoader] Cleared all cache');
            }
        }
    }

    /**
     * Executes a level function safely
     * @param {string} levelId - Level identifier
     * @param {HTMLElement} targetElement - Target element for loading states
     * @returns {Promise<void>} Promise resolving when level is executed
     */
    async executeLevel(levelId, targetElement = null) {
        try {
            const module = await this.loadLevel(levelId, targetElement);
            const functionName = this.getFunctionName(levelId);
            
            if (module[functionName]) {
                if (this.debugMode) {
                    console.log(`[LevelLoader] Executing level: ${levelId}`);
                }
                module[functionName]();
            } else {
                throw new Error(`Function ${functionName} not found in loaded module`);
            }
        } catch (error) {
            console.error(`Failed to execute level ${levelId}:`, error);
            throw error;
        }
    }

    /**
     * Gets the expected function name for a level
     * @param {string} levelId - Level identifier
     * @returns {string} Function name
     */
    getFunctionName(levelId) {
        const functionMap = {
            'gradient-descent-intro': 'createGradientDescentPart1',
            'balloon-inflation': 'createBalloonInflationLevel',
            'balloon-gradient': 'createBalloonGradientDescent',
            'bunny-feeding': 'createBunnyFeedingLevel',
            'bunny-gradient': 'createBunnyGradientDescent',
            'introduction': 'createIntroduction',
            'prerequisites': 'createPrerequisites',
            'core-concepts': 'createCoreConcepts'
        };
        
        return functionMap[levelId] || `create${levelId.replace(/-/g, '')}`;
    }
}

// Create global instance
const levelLoader = new LevelLoader();

// Make available globally for vanilla JS environment
if (typeof window !== 'undefined') {
    window.LevelLoader = LevelLoader;
    window.levelLoader = levelLoader;
}

// Export for module environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LevelLoader, levelLoader };
}