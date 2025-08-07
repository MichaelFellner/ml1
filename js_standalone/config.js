// config.js - Complete configuration for all levels

const levels = [
    {
        title: "Energy Control",
        goal: "Minimize the loss by tuning the robot to its optimal energy level."
    },
    {
        title: "Gradient Descent 1", 
        goal: "Keep pressing the gradient descent button to automatically find the optimal energy level!",
    },
    {
        title: "Two Loss Terms",
        goal: "Help the witch create the perfect magical brew by balancing yellow and blue potions."
    },
    {
        title: "Multi-Potion Mastery",
        description: "Luckily we have gradient descent now, tuning all of these by hand would be tricky (but feel free to still experiment tuning by hand and seeing what happens if you want).",
        goal: "Help the witch make a more complicated potion."
    },
    {
        title: "Real-World Challenge",
        goal: "Purchase a bone for Max (any size)."
    },
    {
        title: "Training Data Power",
        goal: "Use the training data to buy Max a better bone!"
    },
    {
        title: "Large Scale Prediction",
        description: "Tuning 1000 robots would take a long time, lets just try predicting all of their optimal energy levels at once.",
        goal: "We need to turn each of these robots on by tuning their optimal energy level." 
    },
    {
        title: "Feature Engineering",
        goal: "Improve the prediction function by using gradient descent on training data."
    },
    {
        title: "Improved Predictions",
        goal: "Use the improved prediction model on all the robots again."
    },
    {
        title: "Congratulations!",
        description: "You've learned how A.I works!",
        goal: "Celebrate your journey through the fundamentals of AI optimization!"
    }
];

const images = {
    robot: "pictures/robot.png",
    robotActive: "pictures/robot-active.png", 
    witch: "pictures/witch.png",
    dog: "pictures/dog.png",
    dogHappy: "pictures/dog-happy.png",
    dogSad: "pictures/dog-sad.png",
};

// Constants
const OPTIMAL_ENERGY = 75;
const OPTIMAL_ENERGY_AI = 90;
const OPTIMAL_YELLOW = 60;
const OPTIMAL_BLUE = 40;
const LEARNING_RATE = 0.1;
const OPTIMAL_RED = 70;
const OPTIMAL_YELLOW_MULTI = 60;
const OPTIMAL_GREEN = 10;
const OPTIMAL_BLUE_MULTI = 40;
const OPTIMAL_PURPLE = 30;
const OPTIMAL_ORANGE = 90;

// Application state
let currentLevel = 0;

// Global variables
let userMoney = 10;
let trueBoneSize = null;
let userFirstGuess = null;
let dogBonesPurchased = 0;
let featureWeights = { A: 0.5, B: 0.3, C: 0.2 };
let featureData = [];
let currentLoss = 0;
let robotGridStates = new Array(1000).fill(false);

// Global optimizer instances
let optimizer;
let featureOptimizer;