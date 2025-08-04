function createLevelHeader(levelIndex, levelNumber, totalLevels) {
    const level = levels[levelIndex];
    const hasDescription = level.description && level.description.trim() !== '';
    
    return `
        <div class="level-header">
            Level ${levelNumber}/${totalLevels}: ${level.goal}
            ${hasDescription ? `<div class="level-description">${level.description}</div>` : ''}
        </div>
    `;
}