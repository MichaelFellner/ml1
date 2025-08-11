/**
 * @fileoverview UI helper functions for the MLTEACH application.
 * Contains utility functions for creating common UI components.
 */

/**
 * Creates a standardized level header with title and description
 * @function createLevelHeader
 * @param {number} levelIndex - Index of the level in the levels array
 * @param {number} levelNumber - Display number for the level
 * @param {number} totalLevels - Total number of levels in the game
 * @returns {string} HTML string for the level header
 */
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