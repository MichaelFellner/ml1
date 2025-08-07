// directions-template.js - Reusable directions/instructions template

// Unused function removed - template kept for potential future use

// CSS for directions pages (add this once to your CSS files)
const directionsStyles = `
<style>
.directions-header {
    text-align: center;
    padding: 30px 20px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border-radius: 15px;
    margin-bottom: 30px;
}

.directions-header h2 {
    margin: 0 0 10px 0;
    font-size: 2.2em;
}

.directions-subtitle {
    font-size: 1.1em;
    opacity: 0.9;
}

.directions-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 30px;
    margin: 0 auto;
    max-width: 1000px;
}

.directions-main {
    background: #f8f9fa;
    padding: 30px;
    border-radius: 10px;
    border: 2px solid #e9ecef;
}

.directions-main h3 {
    color: #495057;
    margin-top: 0;
    margin-bottom: 15px;
}

.directions-list {
    margin: 15px 0;
    padding-left: 0;
}

.directions-list li {
    list-style: none;
    padding: 8px 0;
    font-size: 1.1em;
}

.directions-tips {
    margin-top: 25px;
}

.tip-box {
    background: #e7f3ff;
    border: 2px solid #3498db;
    border-radius: 8px;
    padding: 20px;
}

.tip-box h4 {
    margin: 0 0 10px 0;
    color: #2980b9;
}

.directions-visual {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.preview-box {
    background: white;
    border: 2px solid #e9ecef;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
}

.preview-box h4 {
    margin: 0 0 20px 0;
    color: #495057;
}

.preview-items {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.preview-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 10px;
    background: #f8f9fa;
    border-radius: 8px;
}

.preview-icon {
    font-size: 1.5em;
}

.preview-text {
    font-weight: 500;
    color: #495057;
}

@media (max-width: 768px) {
    .directions-content {
        grid-template-columns: 1fr;
        gap: 20px;
    }
    
    .directions-main {
        padding: 20px;
    }
}
</style>
`;

// Add styles to document (only add this once)
if (!document.getElementById('directions-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'directions-styles';
    styleSheet.innerHTML = directionsStyles.replace('<style>', '').replace('</style>', '');
    document.head.appendChild(styleSheet);
}
