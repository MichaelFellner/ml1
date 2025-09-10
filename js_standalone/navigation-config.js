/**
 * Navigation Configuration for MLTEACH
 * Defines the structure and flow of the learning journey
 */

const NAVIGATION_CONFIG = {
    config: {
        showProgress: false,  // Disabled - using inline progress bar instead
        allowSkipping: false,
        saveProgress: true
    },
    sections: [
        {
            title: "Intro",
            items: [
                { id: "intro", name: "Welcome", func: "createIntroduction" },
                { id: "core-concepts", name: "3 Core Concepts", func: "createCoreConcepts" },
                { id: "prerequisites", name: "Prerequisites", func: "createPrerequisites" },
                { id: "spoiler-alert", name: "Spoiler Alert", func: "createSpoilerAlert" }
            ]
        },
        {
            title: "Loss",
            items: [
                { id: "ip1", name: "Core Concept 1: Loss", func: "createInstructionPart1" },
                { id: "level1", name: "Level 1: Energy Control", func: "createLevel1" },
                { id: "ip2a", name: "Behind the Scenes: Line Visualization", func: "createBehindTheScenesSimple" },
                { id: "ip2b", name: "Behind the Scenes: Loss Parabola", func: "createBehindTheScenesLevel1" },
                { id: "ip4", name: "Multiple Variables", func: "createInstructionPart4" },
                { id: "witch-brew", name: "Witch's Brew Challenge", func: "createWitchBrewLevel" },
                { id: "ip2c", name: "Loss Quiz", func: "createLossQuizPart" },
                { id: "ip2c-congrats", name: "Quiz Congratulations", func: "createLossQuizCongrats" }

            ]
        },
        {
            title: "What Gradient Descent Is",
            items: [
                { id: "gradient-descent-intro", name: "Gradient Descent Introduction", func: "createGradientDescentPart1" },
                { id: "balloon-inflation", name: "Balloon Inflation Challenge", func: "createBalloonInflationLevel" },
                { id: "balloon-bts", name: "Behind the Scenes: Balloon Function", func: "createBehindTheScenesBalloon" },
                { id: "balloon-gradient", name: "AI Balloon Optimizer", func: "createBalloonGradientDescent" },
                { id: "gd1b", name: "Adding Bias Term", func: "createGradientDescentPart1b" },
                { id: "bunny-feeding", name: "Bunny Feeding Challenge", func: "createBunnyFeedingLevel" },
                { id: "bunny-gradient", name: "AI Bunny Feeder", func: "createBunnyGradientDescent" },
                { id: "bunny-bts", name: "Behind the Scenes: Bunny Function", func: "createBehindTheScenesBunny" },
                { id: "coffee-manual", name: "Coffee Formula Discovery", func: "createCoffeeManualOptimizer" },
                { id: "coffee-gradient", name: "Coffee Gradient Descent", func: "createCoffeeGradientDescent" },
                //{ id: "balloon-inflation-behind-scenes", name: "Balloon: Behind the Mathematical Curtain", func: "createBalloonInflationBehindScenes" },
            ]
        },

        {
            title: "How GD Works",
            items: [
                { id: "gradient-descent-part2", name: "Core Concept 2: Gradient Descent (Part 2)", func: "createGradientDescentPart2" },
                { id: "gradient-descent-overview", name: "How Gradient Descent Works", func: "createGradientDescentOverview" },
                { id: "introduction-to-steps", name: "Introduction to Steps", func: "createIntroductionToSteps" },
                { id: "intro-to-learning-rates", name: "Intro to Learning Rates", func: "createIntroToLearningRates" },
                //{ id: "step-size-teaching", name: "Step Size Teaching", func: "createStepSizeTeaching" },
                { id: "pizza-production", name: "Pizza Production Challenge", func: "createPizzaProduction" },
                //{ id: "pizza-production-behind-scenes", name: "Pizza: Two-Parameter Math Revealed", func: "createPizzaProductionBehindScenes" },
                //{ id: "music-studio-mixer", name: "Music Studio Mixer", func: "createMusicStudioMixer" },
                // { id: "gradient-descent-math-simple", name: "Gradient Math: Simple Case", func: "createGradientDescentMathSimple" },
                // { id: "gradient-descent-math-bias", name: "Gradient Math: Adding Bias", func: "createGradientDescentMathBias" },
                // { id: "gradient-descent-math-multiple", name: "Gradient Math: Multiple Parameters", func: "createGradientDescentMathMultiple" },
                { id: "gradient-descent-math-quiz", name: "Gradient Math Quiz", func: "createGradientDescentMathQuiz" },
                { id: "gradient-descent-congrats", name: "Gradient Descent Congratulations", func: "createGradientDescentCongrats" }
            ]
        },
        {
            title: "Training Data",
            items: [
                { id: "training-data-intro", name: "Training Data Introduction", func: "createTrainingDataIntro" },
                { id: "training-data-spreadsheet", name: "Training Data Spreadsheet", func: "createTrainingDataSpreadsheet" },
                { id: "training-data-interactive", name: "Interactive Weight Adjustment", func: "createTrainingDataInteractive" },
                { id: "training-data-gradient-descent", name: "Gradient Descent Weight Optimizer", func: "createTrainingDataGradientDescent" },
                { id: "training-test-data-explanation", name: "Training vs Test Data", func: "createTrainingTestDataExplanation" },
                { id: "training-data-size-impact", name: "Training Data Size Impact", func: "createTrainingDataSizeImpact" },
                { id: "training-data-size-impact-250", name: "Training Data Size Impact (250 Rows)", func: "createTrainingDataSizeImpact250" },
                { id: "training-features-explanation", name: "Understanding Training Features", func: "createTrainingFeaturesExplanation" },
                { id: "real-world-intro", name: "Real World Introduction", func: "createRealWorldIntro" },
                { id: "real-world-data-1", name: "Real World: California Housing", func: "createRealWorldData1" },
                //{ id: "real-world-data-2", name: "Real World: Bike Sharing", func: "createRealWorldData2" },
                //{ id: "training-data-quiz", name: "Training Data Quiz", func: "createTrainingDataQuiz" }
            ]
        },
        {
            title: "End",
            items: [
                { id: "final-congrats", name: "Final Congratulations", func: "createFinalCongrats" },
                { id: "beyond-linear-regression", name: "From Simple to Complex AI", func: "createBeyondLinearRegression" },
                { id: "next-steps", name: "Your Learning Path Forward", func: "createNextSteps" },
                { id: "thank-you-feedback", name: "Thank You & Feedback", func: "createThankYouFeedback" }
            ]
        }
    ]
};

// Make it globally available
if (typeof window !== 'undefined') {
    window.NAVIGATION_CONFIG = NAVIGATION_CONFIG;
}