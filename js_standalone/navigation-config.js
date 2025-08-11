// navigation-config.js - Central navigation configuration

// navigation-config.js - Central navigation configuration

const NAVIGATION_CONFIG = {
    sections: [
        {
            title: "Introduction",
            items: [
                { id: "intro", name: "Welcome", func: "createIntroduction" },
                { id: "prerequisites", name: "Prerequisites & AI Fundamentals", func: "createPrerequisites" },
                { id: "core-concepts", name: "The 3 Core Concepts of AI", func: "createCoreConcepts" }
            ]
        },
        {
            title: "Part 1: Understanding Loss",
            items: [
                { id: "ip1", name: "Understanding Loss", func: "createInstructionPart1" },
                { id: "level1", name: "Level 1: Robot Energy", func: "createLevel1" },
                { id: "ip2a", name: "Behind the Scenes: Simple View", func: "createBehindTheScenesSimple" },
                { id: "ip2b", name: "Behind the Scenes: The Math", func: "createBehindTheScenesLevel1" },

                { id: "ip4", name: "Multiple Variables", func: "createInstructionPart4" },
                { id: "witch-brew", name: "Level 2: Witch's Brew", func: "createWitchBrewLevel" },
                { id: "ip2c", name: "Check Your Understanding", func: "createLossQuizPart" },
                { id: "ip2c-congrats", name: "Quiz Complete!", func: "createLossQuizCongrats" }
            ]
        },

        {
            title: "Part 3: Gradient Descent Part 1",
            items: [
               
                { id: "gd1", name: "⚡ Gradient Descent Part 1/3", func: "createGradientDescentPart1" },
                { id: "balloon-level", name: "🎈 Balloon Inflation Challenge", func: "createBalloonInflationLevel" },
                { id: "balloon-gd", name: "🤖 AI Balloon Optimizer", func: "createBalloonGradientDescent" },
                { id: "gd1b", name: "⚡ Adding Complexity: The Bias Term", func: "createGradientDescentPart1b" },
                { id: "bunny-level", name: "🐰 Bunny Feeding Challenge", func: "createBunnyFeedingLevel" },
                { id: "bunny-gd", name: "🤖🐰 AI Bunny Feeder - The Real Power", func: "createBunnyGradientDescent" },
                { id: "balloon-bts", name: "Behind the Scenes: Balloon Function Movement", func: "createBehindTheScenesBalloon" },
                { id: "bunny-bts", name: "Behind the Scenes: Bunny Feeder Function", func: "createBehindTheScenesBunny" },
                { id: "coffee-manual", name: "☕ Manual Coffee Optimizer Challenge", func: "createCoffeeManualOptimizer" },
                { id: "coffee-gradient", name: "☕🤖 Coffee Optimizer - Gradient Descent", func: "createCoffeeGradientDescent" }
            ]
        }
    ]
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