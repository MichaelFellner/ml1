
// Updated createIntroduction function

function createIntroduction() {
    const levelId = 'intro';
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration">
                <h1>How A.I. Works for Beginners</h1>
                <p>From A.I. models predicting the weather to Chat-GPT predicting 
                what word to write next, almost all A.I. models learn to make better predictions using the same core algorithm: <b>gradient descent</b>. 
                Through a series of 9 levels, this site will introduce you to what gradient descent is and how it powers A.I. systems!</p>
                <div class="button-container">
                    ${createStandardNavigation(true, false)}
                </div>
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation(levelId, 'createIntroduction');
}

function createPart1() {
    const levelId = 'part1';
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration">
                <h1>Let's Tune Things Ourselves</h1>
                <p>Gradient descent is a powerful algorithm that can tune variables to their optimal values. But to really appreciate it, lets first 
                try tuning things ourselves.</p>
                <div class="button-container">
                    ${createStandardNavigation()}
                </div>
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation(levelId, 'createPart1');
}

function createPart2() {
    const levelId = 'part2';
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration">
                <h1>Introducing Gradient Descent</h1>
                <p>Gradient descent can do the tuning work all on its own. Gradient descent uses "loss", a measure of how off from the goal it is, in order to tune 
                variables. Similar to how we saw if we were getting warmer or colder in levels 1 and 2.</p>
                <div class="button-container">
                    ${createStandardNavigation()}
                </div>
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation(levelId, 'createPart2');
}

function createPart3() {
    const levelId = 'part3';
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration">
                <h1>Using Data to Make Predictions</h1>
                <p>In the next two levels we'll introduce another important concept in A.I., using data to make better predictions. Later 
                in levels 7-9 we will put everything we learned together.</p>
                <div class="button-container">
                    ${createStandardNavigation()}
                </div>
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation(levelId, 'createPart3');
}

function createPart4() {
    const levelId = 'part4';
    const container = document.getElementById('app');
    container.innerHTML = `
        <div class="current-level">
            <div class="level-content celebration">
                <h1>Combining Gradient Descent and Training Data</h1>
                <p>We've now seen how gradient descent works and the importance of using data to make better predictions. Now we'll learn how gradient descent can be
                used with data to make better predictions. We'll use gradient descent to make a prediction on training data, and then be able to make a better prediction
                on future data.</p>
                <div class="button-container">
                    ${createStandardNavigation()}
                </div>
            </div>
        </div>
    `;
    
    // Initialize navigation
    initializeNavigation(levelId, 'createPart4');
}