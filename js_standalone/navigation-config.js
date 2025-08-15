/**
 * Navigation Configuration with Enhanced Metadata and Lazy Loading
 * 
 * Updated to support the new modular level loading system with:
 * - Rich metadata for each level (difficulty, time estimates, prerequisites)
 * - Lazy loading configuration for better performance
 * - Progress tracking and completion states
 * - Enhanced UI information for better user experience
 * 
 * @fileoverview Enhanced navigation configuration with metadata
 * @author MLTEACH Team
 * @version 2.0.0
 */

const NAVIGATION_CONFIG = {
    // Global configuration
    config: {
        enableLazyLoading: true,
        preloadNext: true, // Preload next level for smoother transitions
        showProgress: true, // Show completion progress
        estimatedTotalTime: 150, // Total estimated minutes for full course
        version: '2.0.0',
        enforcePrerequisites: true, // Require completing prerequisites before accessing levels
        allowSkip: false // Allow skipping levels (overrides prerequisites)
    },

    sections: [
        {
            title: "Introduction", 
            id: "introduction-section",
            description: "Welcome to AI optimization learning",
            estimatedTime: 12, // minutes for whole section
            color: "#667eea",
            items: [
                { 
                    id: "intro", 
                    name: "Welcome", 
                    func: "createIntroduction",
                    levelId: "introduction",
                    difficulty: "beginner",
                    estimatedTime: 3,
                    type: "content",
                    description: "Introduction to AI optimization learning journey",
                    prerequisites: [],
                    tags: ["intro", "overview", "welcome"],
                    lazyLoad: true,
                    scriptPath: "content/instruction_parts_1-2.js",
                    icon: "👋",
                    completionCriteria: "viewed"
                },
                { 
                    id: "prerequisites", 
                    name: "Prerequisites & AI Fundamentals", 
                    func: "createPrerequisites",
                    levelId: "prerequisites",
                    difficulty: "beginner",
                    estimatedTime: 5,
                    type: "content", 
                    description: "Essential background knowledge for AI learning",
                    prerequisites: ["intro"],
                    tags: ["fundamentals", "background", "math"],
                    lazyLoad: true,
                    scriptPath: "content/instruction_parts_1-2.js",
                    icon: "📚",
                    completionCriteria: "viewed"
                },
                { 
                    id: "core-concepts", 
                    name: "The 3 Core Concepts of AI", 
                    func: "createCoreConcepts",
                    levelId: "core-concepts",
                    difficulty: "beginner",
                    estimatedTime: 4,
                    type: "content",
                    description: "Overview of the three fundamental AI optimization concepts",
                    prerequisites: ["prerequisites"],
                    tags: ["concepts", "overview", "ai-fundamentals"],
                    lazyLoad: true,
                    scriptPath: "content/instruction_parts_1-2.js",
                    icon: "🧠",
                    completionCriteria: "viewed"
                }
            ]
        },
        {
            title: "Part 1: Understanding Loss",
            id: "loss-section",
            description: "Learn what loss means and how to minimize it",
            estimatedTime: 45,
            color: "#2dd573",
            items: [
                { 
                    id: "ip1", 
                    name: "Understanding Loss", 
                    func: "createInstructionPart1",
                    levelId: "instruction-part-1",
                    difficulty: "beginner",
                    estimatedTime: 6,
                    type: "content",
                    description: "Learn what loss means in machine learning",
                    prerequisites: ["core-concepts"],
                    tags: ["loss", "fundamentals", "theory"],
                    lazyLoad: true,
                    scriptPath: "content/instruction_parts_1-2.js",
                    icon: "📉",
                    completionCriteria: "viewed"
                },
                { 
                    id: "level1", 
                    name: "Level 1: Robot Energy", 
                    func: "createLevel1",
                    levelId: "robot-energy",
                    difficulty: "beginner",
                    estimatedTime: 8,
                    type: "interactive",
                    description: "Interactive level teaching loss through robot energy optimization",
                    prerequisites: ["ip1"],
                    tags: ["interactive", "loss", "optimization", "robots"],
                    lazyLoad: true,
                    scriptPath: "content/levels-1-2.js",
                    icon: "🤖",
                    completionCriteria: "interaction"
                },
                { 
                    id: "ip2a", 
                    name: "Behind the Scenes: Simple View", 
                    func: "createBehindTheScenesSimple",
                    levelId: "behind-scenes-simple",
                    difficulty: "intermediate",
                    estimatedTime: 5,
                    type: "content",
                    description: "Simplified explanation of how loss optimization works",
                    prerequisites: ["level1"],
                    tags: ["theory", "behind-scenes", "simple"],
                    lazyLoad: true,
                    scriptPath: "content/bts-1-2.js",
                    icon: "🔍",
                    completionCriteria: "viewed"
                },
                { 
                    id: "ip2b", 
                    name: "Behind the Scenes: The Math", 
                    func: "createBehindTheScenesLevel1",
                    levelId: "behind-scenes-math",
                    difficulty: "advanced",
                    estimatedTime: 7,
                    type: "content",
                    description: "Mathematical foundations of loss optimization",
                    prerequisites: ["ip2a"],
                    tags: ["math", "theory", "advanced", "calculus"],
                    lazyLoad: true,
                    scriptPath: "content/bts-1-2.js",
                    icon: "🧮",
                    completionCriteria: "viewed"
                },
                { 
                    id: "ip4", 
                    name: "Multiple Variables", 
                    func: "createInstructionPart4",
                    levelId: "multiple-variables",
                    difficulty: "intermediate",
                    estimatedTime: 4,
                    type: "content",
                    description: "Introduction to multi-parameter optimization challenges",
                    prerequisites: ["ip2b"],
                    tags: ["multi-parameter", "complexity", "variables"],
                    lazyLoad: true,
                    scriptPath: "content/instruction_parts_3-4.js",
                    icon: "🔢",
                    completionCriteria: "viewed"
                },
                { 
                    id: "witch-brew", 
                    name: "Level 2: Witch's Brew", 
                    func: "createWitchBrewLevel",
                    levelId: "witch-brew",
                    difficulty: "intermediate",
                    estimatedTime: 10,
                    type: "interactive",
                    description: "Multi-parameter optimization through magical potion brewing",
                    prerequisites: ["ip4"],
                    tags: ["interactive", "multi-parameter", "brewing", "magic"],
                    lazyLoad: true,
                    scriptPath: "content/levels-1-2.js",
                    icon: "🧙‍♀️",
                    completionCriteria: "completion"
                },
                { 
                    id: "ip2c", 
                    name: "Check Your Understanding", 
                    func: "createLossQuizPart",
                    levelId: "loss-quiz",
                    difficulty: "intermediate", 
                    estimatedTime: 6,
                    type: "quiz",
                    description: "Quiz to test your understanding of loss functions",
                    prerequisites: ["witch-brew"],
                    tags: ["quiz", "assessment", "loss", "understanding"],
                    lazyLoad: true,
                    scriptPath: "content/quizzes.js",
                    icon: "❓",
                    completionCriteria: "quiz-pass"
                },
                { 
                    id: "ip2c-congrats", 
                    name: "Quiz Complete!", 
                    func: "createLossQuizCongrats",
                    levelId: "quiz-complete",
                    difficulty: "beginner",
                    estimatedTime: 2,
                    type: "content",
                    description: "Congratulations on mastering loss functions!",
                    prerequisites: ["ip2c"],
                    tags: ["congratulations", "milestone", "achievement"],
                    lazyLoad: true,
                    scriptPath: "content/post-quiz-congrats.js",
                    icon: "🎉",
                    completionCriteria: "viewed"
                }
            ]
        },
        {
            title: "Part 3: Gradient Descent Part 1",
            id: "gradient-descent-section",
            description: "Learn how AI automatically finds optimal solutions",
            estimatedTime: 68,
            color: "#764ba2",
            items: [
                { 
                    id: "test-integration-level", 
                    name: "🧪 Test Integration Level", 
                    func: "createTestIntegrationLevel",
                    levelId: "test-integration-level",
                    difficulty: "beginner",
                    estimatedTime: 5,
                    type: "interactive",
                    description: "A simple test level to verify the integration system works",
                    prerequisites: [],
                    tags: ["test", "example", "integration"],
                    lazyLoad: true,
                    scriptPath: "levels/test-integration-level.js",
                    icon: "🧪",
                    completionCriteria: "completion"
                },
                {
                    id: "color-pattern-memory",
                    name: "🎮 ColorPatternMemory",
                    func: "createColorPatternMemory",
                    levelId: "color-pattern-memory",
                    difficulty: "beginner",
                    estimatedTime: 5,
                    type: "interactive",
                    description: "New level integrated from staging",
                    prerequisites: [],
                    tags: ["new", "staging"],
                    lazyLoad: true,
                    scriptPath: "levels/color-pattern-memory.js",
                    icon: "🎮",
                    completionCriteria: "completion"
                },
                {
                    id: "step-size-teaching",
                    name: "🎮 StepSizeTeaching",
                    func: "createStepSizeTeaching",
                    levelId: "step-size-teaching",
                    difficulty: "beginner",
                    estimatedTime: 5,
                    type: "interactive",
                    description: "New level integrated from staging",
                    prerequisites: [],
                    tags: ["new", "staging"],
                    lazyLoad: true,
                    scriptPath: "levels/step-size-teaching.js",
                    icon: "🎮",
                    completionCriteria: "completion"
                },
                {
                    id: "step-teaching",
                    name: "📈 Understanding Steps",
                    func: "createStepTeachingLevel",
                    levelId: "step-teaching",
                    difficulty: "intermediate",
                    estimatedTime: 8,
                    type: "interactive",
                    description: "Interactive level teaching how steps work in gradient descent",
                    prerequisites: [],
                    tags: ["gradient-descent", "steps", "learning-rate", "interactive"],
                    lazyLoad: true,
                    scriptPath: "levels/step-teaching.js",
                    icon: "📈",
                    completionCriteria: "completion"
                },
                {
                    id: "example-staging-level",
                    name: "🚀 Example Staging Level",
                    func: "createExampleStagingLevel",
                    levelId: "example-staging-level",
                    difficulty: "beginner",
                    estimatedTime: 3,
                    type: "interactive",
                    description: "A simple example level to test the staging integration workflow",
                    prerequisites: [],
                    tags: ["staging", "test", "example"],
                    lazyLoad: true,
                    scriptPath: "levels/example-staging-level.js",
                    icon: "🚀",
                    completionCriteria: "completion"
                },
                { 
                    id: "gd1", 
                    name: "⚡ Gradient Descent Part 1/3", 
                    func: "createGradientDescentPart1",
                    levelId: "gradient-descent-intro",
                    difficulty: "intermediate",
                    estimatedTime: 5,
                    type: "content",
                    description: "Introduction to gradient descent optimization concepts",
                    prerequisites: ["ip2c-congrats"],
                    tags: ["gradient-descent", "optimization", "ai", "intro"],
                    lazyLoad: true,
                    scriptPath: "levels/gradient-descent-intro.js",
                    icon: "⚡",
                    completionCriteria: "viewed"
                },
                { 
                    id: "balloon-level", 
                    name: "🎈 Balloon Inflation Challenge", 
                    func: "createBalloonInflationLevel",
                    levelId: "balloon-inflation",
                    difficulty: "beginner",
                    estimatedTime: 7,
                    type: "interactive",
                    description: "Single parameter optimization through balloon inflation",
                    prerequisites: ["gd1"],
                    tags: ["interactive", "single-parameter", "balloons", "optimization"],
                    lazyLoad: true,
                    scriptPath: "levels/balloon-inflation.js",
                    icon: "🎈",
                    completionCriteria: "optimal-solution"
                },
                { 
                    id: "balloon-gd", 
                    name: "🤖 AI Balloon Optimizer", 
                    func: "createBalloonGradientDescent",
                    levelId: "balloon-gradient",
                    difficulty: "intermediate",
                    estimatedTime: 8,
                    type: "interactive",
                    description: "Watch AI automatically optimize balloon inflation parameters",
                    prerequisites: ["balloon-level"],
                    tags: ["ai", "automation", "gradient-descent", "balloons"],
                    lazyLoad: true,
                    scriptPath: "levels/balloon-gradient.js", 
                    icon: "🤖",
                    completionCriteria: "observation"
                },
                { 
                    id: "gd1b", 
                    name: "⚡ Adding Complexity: The Bias Term", 
                    func: "createGradientDescentPart1b",
                    levelId: "gradient-descent-complexity",
                    difficulty: "intermediate",
                    estimatedTime: 6,
                    type: "content",
                    description: "Introduction to dual-parameter optimization complexity",
                    prerequisites: ["balloon-gd"],
                    tags: ["complexity", "bias-term", "dual-parameter", "theory"],
                    lazyLoad: true,
                    scriptPath: "content/gd-teach-2.js",
                    icon: "⚡",
                    completionCriteria: "viewed"
                },
                { 
                    id: "bunny-level", 
                    name: "🐰 Bunny Feeding Challenge", 
                    func: "createBunnyFeedingLevel",
                    levelId: "bunny-feeding",
                    difficulty: "intermediate",
                    estimatedTime: 10,
                    type: "interactive",
                    description: "Dual parameter optimization through bunny feeding mechanics",
                    prerequisites: ["gd1b"],
                    tags: ["interactive", "dual-parameter", "animals", "complex"],
                    lazyLoad: true,
                    scriptPath: "levels/bunny-feeding.js",
                    icon: "🐰",
                    completionCriteria: "optimal-solution"
                },
                { 
                    id: "bunny-gd", 
                    name: "🤖🐰 AI Bunny Feeder - The Real Power", 
                    func: "createBunnyGradientDescent",
                    levelId: "bunny-gradient",
                    difficulty: "advanced",
                    estimatedTime: 12,
                    type: "interactive",
                    description: "Experience the power of AI with automated dual-parameter optimization",
                    prerequisites: ["bunny-level"],
                    tags: ["ai", "automation", "dual-parameter", "advanced", "power"],
                    lazyLoad: true,
                    scriptPath: "levels/bunny-gradient.js",
                    icon: "🤖",
                    completionCriteria: "observation"
                },
                { 
                    id: "balloon-bts", 
                    name: "Behind the Scenes: Balloon Function Movement", 
                    func: "createBehindTheScenesBalloon",
                    levelId: "balloon-behind-scenes",
                    difficulty: "advanced",
                    estimatedTime: 8,
                    type: "content",
                    description: "Mathematical explanation of single-parameter gradient descent",
                    prerequisites: ["bunny-gd"],
                    tags: ["theory", "math", "behind-scenes", "single-parameter"],
                    lazyLoad: true,
                    scriptPath: "content/gd-main-functions.js",
                    icon: "🔍",
                    completionCriteria: "viewed"
                },
                { 
                    id: "bunny-bts", 
                    name: "Behind the Scenes: Bunny Feeder Function", 
                    func: "createBehindTheScenesBunny",
                    levelId: "bunny-behind-scenes",
                    difficulty: "advanced",
                    estimatedTime: 10,
                    type: "content",
                    description: "Mathematical explanation of dual-parameter gradient descent",
                    prerequisites: ["balloon-bts"],
                    tags: ["theory", "math", "behind-scenes", "dual-parameter"],
                    lazyLoad: true,
                    scriptPath: "content/gd-main-functions.js",
                    icon: "🔍",
                    completionCriteria: "viewed"
                },
                { 
                    id: "coffee-manual", 
                    name: "☕ Manual Coffee Optimizer Challenge", 
                    func: "createCoffeeManualOptimizer",
                    levelId: "coffee-manual",
                    difficulty: "advanced",
                    estimatedTime: 15,
                    type: "interactive", 
                    description: "Complex multi-parameter optimization challenge",
                    prerequisites: ["bunny-bts"],
                    tags: ["interactive", "complex", "manual", "coffee", "challenge"],
                    lazyLoad: true,
                    scriptPath: "content/coffee-optimizer.js",
                    icon: "☕",
                    completionCriteria: "attempt"
                },
                { 
                    id: "coffee-gradient", 
                    name: "☕🤖 Coffee Optimizer - Gradient Descent", 
                    func: "createCoffeeGradientDescent",
                    levelId: "coffee-gradient",
                    difficulty: "advanced",
                    estimatedTime: 12,
                    type: "interactive",
                    description: "Watch AI solve the complex coffee optimization automatically",
                    prerequisites: ["coffee-manual"],
                    tags: ["ai", "automation", "complex", "coffee", "finale"],
                    lazyLoad: true,
                    scriptPath: "content/coffee-gradient-descent.js",
                    icon: "🤖",
                    completionCriteria: "observation"
                }
            ]
        },
        {
            title: "Part 4: Gradient Descent Part 2",
            id: "gradient-descent-part2-section",
            description: "Understand how gradient descent actually works",
            estimatedTime: 30,
            color: "#ff6b6b",
            items: [
                { 
                    id: "gd2-intro", 
                    name: "⚙️ How Does It Actually Work?", 
                    func: "createGradientDescentPart2",
                    levelId: "gradient-descent-part2-intro",
                    difficulty: "intermediate",
                    estimatedTime: 5,
                    type: "content",
                    description: "Recap what we've learned and introduce the mystery of how gradient descent works",
                    prerequisites: ["coffee-gradient"],
                    tags: ["gradient-descent", "theory", "recap", "introduction"],
                    lazyLoad: true,
                    scriptPath: "content/gradient-descent-part2.js",
                    icon: "⚙️",
                    completionCriteria: "viewed"
                }
            ]
        }
    ],
    
    // Dependency graph for understanding level relationships
    dependencies: {
        // Core dependencies - these form the main learning path
        core: {
            "step-teaching": [],
            "step-size-teaching": [],
            "color-pattern-memory": [],
            "test-integration-level": [],
            "example-staging-level": [],
            "intro": [],
            "prerequisites": ["intro"],
            "core-concepts": ["prerequisites"],
            "ip1": ["core-concepts"],
            "level1": ["ip1"],
            "ip2a": ["level1"],
            "ip2b": ["ip2a"],
            "ip4": ["ip2b"],
            "witch-brew": ["ip4"],
            "ip2c": ["witch-brew"],
            "ip2c-congrats": ["ip2c"],
            "gd1": ["ip2c-congrats"],
            "balloon-level": ["gd1"],
            "balloon-gd": ["balloon-level"],
            "gd1b": ["balloon-gd"],
            "bunny-level": ["gd1b"],
            "bunny-gd": ["bunny-level"],
            "balloon-bts": ["bunny-gd"],
            "bunny-bts": ["balloon-bts"],
            "coffee-manual": ["bunny-bts"],
            "coffee-gradient": ["coffee-manual"],
            "gd2-intro": ["coffee-gradient"]
        },
        
        // Optional dependencies - nice to have completed but not required
        optional: {
            "ip2b": ["ip2a"], // Math section is optional
            "balloon-bts": ["balloon-gd"], // Behind the scenes are optional
            "bunny-bts": ["bunny-gd"]
        },
        
        // Conceptual dependencies - levels that share concepts
        conceptual: {
            "single-parameter": ["level1", "balloon-level", "balloon-gd"],
            "dual-parameter": ["witch-brew", "bunny-level", "bunny-gd"],
            "multi-parameter": ["coffee-manual", "coffee-gradient"],
            "gradient-descent": ["balloon-gd", "bunny-gd", "coffee-gradient"],
            "loss-functions": ["level1", "witch-brew", "ip2c"],
            "optimization": ["balloon-level", "bunny-level", "coffee-manual"]
        },
        
        // Related levels - levels that complement each other
        related: {
            "balloon-level": ["balloon-gd", "balloon-bts"],
            "bunny-level": ["bunny-gd", "bunny-bts"],
            "coffee-manual": ["coffee-gradient"],
            "ip2a": ["ip2b"], // Simple and math views of same concept
        }
    },
    
    // Feature flags for experimental or beta features
    features: {
        experimental: [
            // Add experimental level IDs here
        ],
        beta: [
            // Add beta level IDs here
        ],
        deprecated: [
            // Add deprecated level IDs here
        ]
    },
    
    // Learning paths - predefined sequences for different learning goals
    learningPaths: {
        "quick-start": [
            "intro",
            "core-concepts",
            "ip1",
            "level1",
            "gd1",
            "balloon-level"
        ],
        "complete": [
            // All levels in order (generated from sections)
        ],
        "hands-on": [
            "level1",
            "witch-brew",
            "balloon-level",
            "bunny-level",
            "coffee-manual"
        ],
        "theory-focused": [
            "prerequisites",
            "core-concepts",
            "ip1",
            "ip2a",
            "ip2b",
            "gd1",
            "balloon-bts",
            "bunny-bts",
            "gd2-intro"
        ]
    }
};

// Helper function to get current section/item info
function getCurrentNavigationInfo() {
    return {
        currentId: currentNavigationId || 'intro',
        currentTitle: getCurrentLevelTitle()
    };
}

// Helper function to find navigation item by function name
function findNavItemByFunction(functionName) {
    for (const section of NAVIGATION_CONFIG.sections) {
        for (const item of section.items) {
            if (item.func === functionName) {
                return { section: section.title, item };
            }
        }
    }
    return null;
}

// Helper function to get current level title
function getCurrentLevelTitle() {
    const navInfo = findNavItemByFunction(window.currentPageFunction || 'createIntroduction');
    return navInfo ? navInfo.item.name : 'AI Learning Journey';
}

// Helper function to check if prerequisites are met
function checkPrerequisites(levelId, completedLevels = []) {
    const dependencies = NAVIGATION_CONFIG.dependencies.core[levelId] || [];
    const missingPrereqs = dependencies.filter(dep => !completedLevels.includes(dep));
    
    return {
        canAccess: missingPrereqs.length === 0 || !NAVIGATION_CONFIG.config.enforcePrerequisites,
        missingPrerequisites: missingPrereqs,
        hasPrerequisites: dependencies.length > 0
    };
}

// Helper function to get all dependencies for a level (recursive)
function getAllDependencies(levelId, visited = new Set()) {
    if (visited.has(levelId)) return [];
    visited.add(levelId);
    
    const directDeps = NAVIGATION_CONFIG.dependencies.core[levelId] || [];
    const allDeps = [...directDeps];
    
    directDeps.forEach(dep => {
        allDeps.push(...getAllDependencies(dep, visited));
    });
    
    return [...new Set(allDeps)]; // Remove duplicates
}

// Helper function to get levels that depend on this one
function getDependentLevels(levelId) {
    const dependents = [];
    
    Object.entries(NAVIGATION_CONFIG.dependencies.core).forEach(([level, deps]) => {
        if (deps.includes(levelId)) {
            dependents.push(level);
        }
    });
    
    return dependents;
}

// Helper function to get related and optional levels
function getRelatedLevels(levelId) {
    return {
        optional: NAVIGATION_CONFIG.dependencies.optional[levelId] || [],
        related: NAVIGATION_CONFIG.dependencies.related[levelId] || [],
        conceptual: Object.entries(NAVIGATION_CONFIG.dependencies.conceptual)
            .filter(([concept, levels]) => levels.includes(levelId))
            .map(([concept]) => concept)
    };
}

// Helper function to find level by various properties
function findLevel(searchCriteria) {
    for (const section of NAVIGATION_CONFIG.sections) {
        for (const item of section.items) {
            if (
                (searchCriteria.id && item.id === searchCriteria.id) ||
                (searchCriteria.levelId && item.levelId === searchCriteria.levelId) ||
                (searchCriteria.func && item.func === searchCriteria.func)
            ) {
                return { ...item, section: section.title, sectionId: section.id };
            }
        }
    }
    return null;
}

// Helper function to get next level in sequence
function getNextLevel(currentLevelId) {
    let found = false;
    
    for (const section of NAVIGATION_CONFIG.sections) {
        for (const item of section.items) {
            if (found) return item;
            if (item.id === currentLevelId) found = true;
        }
    }
    
    return null; // No next level
}

// Helper function to get previous level in sequence
function getPreviousLevel(currentLevelId) {
    let previousLevel = null;
    
    for (const section of NAVIGATION_CONFIG.sections) {
        for (const item of section.items) {
            if (item.id === currentLevelId) return previousLevel;
            previousLevel = item;
        }
    }
    
    return null; // No previous level
}

// Helper function to get learning path progress
function getLearningPathProgress(pathName, completedLevels = []) {
    const path = NAVIGATION_CONFIG.learningPaths[pathName];
    if (!path) return null;
    
    const completed = path.filter(levelId => completedLevels.includes(levelId));
    
    return {
        totalLevels: path.length,
        completedLevels: completed.length,
        percentComplete: Math.round((completed.length / path.length) * 100),
        nextLevel: path.find(levelId => !completedLevels.includes(levelId)),
        remainingLevels: path.filter(levelId => !completedLevels.includes(levelId))
    };
}

// Helper function to validate navigation config
function validateNavigationConfig() {
    const issues = [];
    const allLevelIds = new Set();
    const allFunctionNames = new Set();
    
    // Check for duplicate IDs and functions
    NAVIGATION_CONFIG.sections.forEach(section => {
        section.items.forEach(item => {
            if (allLevelIds.has(item.id)) {
                issues.push(`Duplicate level ID: ${item.id}`);
            }
            allLevelIds.add(item.id);
            
            if (allFunctionNames.has(item.func)) {
                issues.push(`Duplicate function name: ${item.func}`);
            }
            allFunctionNames.add(item.func);
        });
    });
    
    // Check dependencies reference valid levels
    Object.entries(NAVIGATION_CONFIG.dependencies.core).forEach(([level, deps]) => {
        if (!allLevelIds.has(level) && level !== 'intro') {
            issues.push(`Dependency references unknown level: ${level}`);
        }
        
        deps.forEach(dep => {
            if (!allLevelIds.has(dep)) {
                issues.push(`Level ${level} depends on unknown level: ${dep}`);
            }
        });
    });
    
    // Check for circular dependencies
    allLevelIds.forEach(levelId => {
        const deps = getAllDependencies(levelId);
        if (deps.includes(levelId)) {
            issues.push(`Circular dependency detected for level: ${levelId}`);
        }
    });
    
    return {
        isValid: issues.length === 0,
        issues: issues,
        stats: {
            totalLevels: allLevelIds.size,
            totalSections: NAVIGATION_CONFIG.sections.length,
            totalDependencies: Object.keys(NAVIGATION_CONFIG.dependencies.core).length
        }
    };
}

// Helper to generate complete learning path
function generateCompleteLearningPath() {
    const completePath = [];
    
    NAVIGATION_CONFIG.sections.forEach(section => {
        section.items.forEach(item => {
            completePath.push(item.id);
        });
    });
    
    NAVIGATION_CONFIG.learningPaths.complete = completePath;
    return completePath;
}

// Initialize complete learning path
generateCompleteLearningPath();

// Make navigation config and helper functions globally accessible
// This ensures compatibility with existing code that expects these functions
if (typeof window !== 'undefined') {
    window.NAVIGATION_CONFIG = NAVIGATION_CONFIG;
    window.getCurrentNavigationInfo = getCurrentNavigationInfo;
    window.findNavItemByFunction = findNavItemByFunction;
    window.getCurrentLevelTitle = getCurrentLevelTitle;
    
    // New dependency-aware functions
    window.checkPrerequisites = checkPrerequisites;
    window.getAllDependencies = getAllDependencies;
    window.getDependentLevels = getDependentLevels;
    window.getRelatedLevels = getRelatedLevels;
    window.findLevel = findLevel;
    window.getNextLevel = getNextLevel;
    window.getPreviousLevel = getPreviousLevel;
    window.getLearningPathProgress = getLearningPathProgress;
    window.validateNavigationConfig = validateNavigationConfig;
    
    // Run validation in debug mode
    if (NAVIGATION_CONFIG.config.debug) {
        const validation = validateNavigationConfig();
        if (!validation.isValid) {
            console.warn('Navigation config validation issues:', validation.issues);
        }
        console.log('Navigation config stats:', validation.stats);
    }
}