function init() {
    console.log('Initializing...');
    
    if (typeof levels === 'undefined') {
        setTimeout(init, 100);
        return;
    }
    
    optimizer = new OptimizationEngine(LEARNING_RATE);
    createIntroduction();
}


// Initialize
document.addEventListener('DOMContentLoaded', init);