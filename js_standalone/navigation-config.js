// navigation-config.js - Central navigation configuration

const NAVIGATION_CONFIG = {
    sections: [
        {
            title: "Introduction",
            items: [
                { id: "intro", name: "Welcome", func: "createIntroduction" }
            ]
        },
        {
            title: "Part 1: Manual Tuning",
            items: [
                { id: "part1", name: "Story: Manual Tuning", func: "createPart1" },
                { id: "level1", name: "Level 1: Robot Energy", func: "createLevel1" },
                { id: "level2", name: "Level 2: AI Robot", func: "createLevel2" }
            ]
        },
        {
            title: "Part 2: Gradient Descent Basics",
            items: [
                { id: "part2", name: "Story: Introducing AI", func: "createPart2" },
                { id: "level3", name: "Level 3: Witch's Brew", func: "createLevel3" },
                { id: "level4", name: "Level 4: Master Alchemist", func: "createLevel4" }
            ]
        },
        {
            title: "Gradient Descent Deep Dive",
            items: [
                { id: "gd1", name: "Manual Function Exploration", func: "createGradientDescentPart1" },
                { id: "gd2", name: "Automatic Gradient Descent", func: "createGradientDescentPart2" },
                { id: "gd3", name: "Complex Function Challenge", func: "createGradientDescentPart3" }
            ]
        },
        {
            title: "Multivariable Optimization",
            items: [
                { id: "multi1", name: "Two Variables", func: "createMultivariatePart1" },
                { id: "multi2", name: "Five Variables", func: "createMultivariatePart2" }
            ]
        },
        {
            title: "Part 3: Training Data",
            items: [
                { id: "part3", name: "Story: Using Data", func: "createPart3" },
                { id: "level5", name: "Level 5: Max's Bone", func: "createLevel5" }
            ]
        },
        {
            title: "Part 4: Robot Fleet",
            items: [
                { id: "story4", name: "Story: Robot Awakening", func: "createStoryPart4" },
                { id: "level7", name: "Level 7: Triple Squad", func: "createLevel7" },
                { id: "story5", name: "Story: Training Data", func: "createStoryPart5" },
                { id: "level8", name: "Level 8: Fleet Distribution", func: "createLevel8" },
                { id: "story6", name: "Story: More Data Needed", func: "createStoryPart6" }
            ]
        },
        {
            title: "Advanced Machine Learning",
            items: [
                { id: "level9", name: "Level 9: Coefficient Experimentation", func: "createLevel9" },
                { id: "level10", name: "Level 10: Manual Training", func: "createLevel10" },
                { id: "level11", name: "Level 11: Gradient Descent Training", func: "createLevel11" }
            ]
        },
        {
            title: "Conclusion",
            items: [
                { id: "story7", name: "Story: AI Examples", func: "createStoryPart7" },
                { id: "story8", name: "Story: Why AI is Complex", func: "createStoryPart8" },
                { id: "final", name: "Completion", func: "createFinalCompletion" }
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