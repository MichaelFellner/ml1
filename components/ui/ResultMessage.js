/**
 * ResultMessage Component
 * 
 * A reusable component for displaying feedback messages with automatic styling:
 * - Success messages (green) for positive outcomes
 * - Warning messages (orange) for cautions
 * - Error messages (red) for problems
 * - Info messages (blue) for neutral information
 * 
 * Features:
 * - Automatic color scheme based on message type
 * - Optional shake animation for attention
 * - Expandable details section
 * - Auto-hide capability
 * - Custom icons and styling
 * 
 * @example
 * const message = new ResultMessage({
 *   type: 'success',
 *   title: 'Perfect!',
 *   details: 'The balloon is just right!',
 *   showAnimation: true
 * });
 * message.mount('#result-container');
 */

// Ensure Component class is available
if (typeof Component === 'undefined') {
    console.error('ResultMessage requires Component class. Include components/base/Component.js first.');
}

/**
 * Result Message Component for user feedback
 * 
 * @extends Component
 */
class ResultMessage extends Component {
    /**
     * Creates a new ResultMessage component
     * 
     * @param {Object} props - Component properties
     * @param {string} [props.type='info'] - Message type: 'success', 'warning', 'error', 'info'
     * @param {string} [props.title=''] - Main message title
     * @param {string} [props.details=''] - Additional details or description
     * @param {boolean} [props.showAnimation=false] - Whether to show shake animation
     * @param {boolean} [props.dismissible=false] - Whether message can be dismissed
     * @param {number} [props.autoHide=0] - Auto-hide delay in ms (0 = don't auto-hide)
     * @param {string} [props.icon=''] - Custom icon (overrides default type icon)
     * @param {string} [props.className=''] - Additional CSS classes
     * @param {Function} [props.onDismiss] - Callback when message is dismissed
     * @param {Function} [props.onClick] - Callback when message is clicked
     */
    constructor(props = {}) {
        super(props);
        
        const defaultProps = {
            type: 'info',
            title: '',
            details: '',
            showAnimation: false,
            dismissible: false,
            autoHide: 0,
            icon: '',
            className: '',
            onDismiss: null,
            onClick: null
        };
        
        this.props = Object.freeze({ ...defaultProps, ...props });
        
        this.state = {
            visible: true,
            animating: this.props.showAnimation,
            autoHideTimer: null
        };
    }
    
    /**
     * Renders the result message HTML
     * 
     * @returns {string} HTML string for the result message
     */
    render() {
        const { type, title, details, dismissible, icon, className } = this.props;
        const { visible, animating } = this.state;
        
        if (!visible) return '';
        
        const typeConfig = this._getTypeConfig(type);
        const displayIcon = icon || typeConfig.icon;
        const hasDetails = details && details.trim();
        
        return `
            <div class="result-message-container ${className} ${type} ${animating ? 'shake' : ''}" 
                 data-type="${type}"
                 data-clickable="${this.props.onClick ? 'true' : 'false'}">
                
                ${dismissible ? `
                    <button class="dismiss-btn" aria-label="Dismiss message">×</button>
                ` : ''}
                
                <div class="message-content">
                    ${displayIcon ? `
                        <div class="message-icon">
                            ${displayIcon}
                        </div>
                    ` : ''}
                    
                    <div class="message-text">
                        ${title ? `
                            <div class="message-title">${title}</div>
                        ` : ''}
                        
                        ${hasDetails ? `
                            <div class="message-details">${details}</div>
                        ` : ''}
                    </div>
                </div>
                
                <style>
                    .result-message-container {
                        display: flex;
                        align-items: flex-start;
                        padding: 15px 20px;
                        margin: 15px 0;
                        border-radius: 10px;
                        border: 2px solid;
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                        position: relative;
                        transition: all 0.3s ease;
                        word-wrap: break-word;
                    }
                    
                    .result-message-container[data-clickable="true"] {
                        cursor: pointer;
                    }
                    
                    .result-message-container[data-clickable="true"]:hover {
                        transform: translateY(-1px);
                        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    }
                    
                    /* Success styling */
                    .result-message-container.success {
                        background: rgba(45,213,115,0.1);
                        border-color: rgba(45,213,115,0.3);
                        color: #1e7e34;
                    }
                    
                    /* Warning styling */
                    .result-message-container.warning {
                        background: rgba(255,215,0,0.1);
                        border-color: rgba(255,215,0,0.3);
                        color: #856404;
                    }
                    
                    /* Error styling */
                    .result-message-container.error {
                        background: rgba(255,99,71,0.1);
                        border-color: rgba(255,99,71,0.3);
                        color: #721c24;
                    }
                    
                    /* Info styling */
                    .result-message-container.info {
                        background: rgba(102,126,234,0.1);
                        border-color: rgba(102,126,234,0.3);
                        color: #004085;
                    }
                    
                    .dismiss-btn {
                        position: absolute;
                        top: 10px;
                        right: 10px;
                        background: none;
                        border: none;
                        font-size: 1.5rem;
                        font-weight: bold;
                        color: inherit;
                        cursor: pointer;
                        opacity: 0.6;
                        transition: opacity 0.2s ease;
                        padding: 0;
                        width: 24px;
                        height: 24px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    
                    .dismiss-btn:hover {
                        opacity: 1;
                    }
                    
                    .message-content {
                        display: flex;
                        align-items: flex-start;
                        gap: 12px;
                        width: 100%;
                        padding-right: ${dismissible ? '30px' : '0'};
                    }
                    
                    .message-icon {
                        font-size: 1.5rem;
                        line-height: 1;
                        flex-shrink: 0;
                        margin-top: 2px;
                    }
                    
                    .message-text {
                        flex: 1;
                        min-width: 0;
                    }
                    
                    .message-title {
                        font-weight: bold;
                        font-size: 1rem;
                        margin-bottom: ${hasDetails ? '8px' : '0'};
                        line-height: 1.4;
                    }
                    
                    .message-details {
                        font-size: 0.9rem;
                        opacity: 0.9;
                        line-height: 1.5;
                    }
                    
                    /* Shake animation */
                    @keyframes shake {
                        0%, 100% { transform: translateX(0); }
                        10%, 30%, 50%, 70%, 90% { transform: translateX(-3px); }
                        20%, 40%, 60%, 80% { transform: translateX(3px); }
                    }
                    
                    .result-message-container.shake {
                        animation: shake 0.5s ease-in-out;
                    }
                    
                    /* Fade-in animation */
                    .result-message-container {
                        animation: fadeIn 0.3s ease;
                    }
                    
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(-10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    
                    /* Responsive adjustments */
                    @media (max-width: 480px) {
                        .result-message-container {
                            padding: 12px 15px;
                            margin: 10px 0;
                        }
                        
                        .message-content {
                            gap: 8px;
                        }
                        
                        .message-icon {
                            font-size: 1.3rem;
                        }
                        
                        .message-title {
                            font-size: 0.95rem;
                        }
                        
                        .message-details {
                            font-size: 0.85rem;
                        }
                    }
                    
                    /* Hover effects for interactive messages */
                    .result-message-container[data-clickable="true"]:hover .message-title {
                        text-decoration: underline;
                    }
                </style>
            </div>
        `;
    }
    
    /**
     * Sets up event listeners for the result message
     */
    attachEventListeners() {
        // Dismiss button
        if (this.props.dismissible) {
            this.addEventDelegate('.dismiss-btn', 'click', (event) => {
                event.stopPropagation();
                this.dismiss();
            });
        }
        
        // Click handler for entire message
        if (this.props.onClick) {
            this.addEventDelegate('.result-message-container', 'click', (event, target) => {
                if (!event.target.classList.contains('dismiss-btn')) {
                    this.props.onClick({
                        type: this.props.type,
                        title: this.props.title,
                        details: this.props.details,
                        component: this
                    });
                }
            });
        }
        
        // Auto-hide timer
        if (this.props.autoHide > 0) {
            const timer = setTimeout(() => {
                this.dismiss();
            }, this.props.autoHide);
            
            this.setState({ autoHideTimer: timer });
        }
        
        // Stop shake animation after it completes
        if (this.props.showAnimation) {
            setTimeout(() => {
                this.setState({ animating: false });
            }, 500);
        }
    }
    
    /**
     * Updates the message content
     * 
     * @param {Object} content - New content
     * @param {string} [content.type] - New message type
     * @param {string} [content.title] - New title
     * @param {string} [content.details] - New details
     * @param {boolean} [animate=false] - Whether to show shake animation
     */
    updateMessage(content, animate = false) {
        // Update props with new content
        this.props = Object.freeze({ ...this.props, ...content });
        
        // Show shake animation if requested
        if (animate) {
            this.setState({ animating: true });
            setTimeout(() => this.setState({ animating: false }), 500);
        }
        
        // Re-render with new content
        if (this.isMounted()) {
            this._rerender();
        }
    }
    
    /**
     * Shows the message with optional animation
     * 
     * @param {boolean} [animate=false] - Whether to show with shake animation
     */
    show(animate = false) {
        this.setState({ 
            visible: true,
            animating: animate 
        });
        
        if (animate) {
            setTimeout(() => this.setState({ animating: false }), 500);
        }
    }
    
    /**
     * Hides/dismisses the message
     */
    dismiss() {
        // Clear auto-hide timer if active
        if (this.state.autoHideTimer) {
            clearTimeout(this.state.autoHideTimer);
            this.setState({ autoHideTimer: null });
        }
        
        // Call dismiss callback
        if (this.props.onDismiss) {
            this.props.onDismiss({
                type: this.props.type,
                component: this
            });
        }
        
        // Hide the message
        this.setState({ visible: false });
    }
    
    /**
     * Checks if message is currently visible
     * 
     * @returns {boolean} True if message is visible
     */
    isVisible() {
        return this.state.visible;
    }
    
    /**
     * Triggers shake animation
     */
    shake() {
        this.setState({ animating: true });
        setTimeout(() => this.setState({ animating: false }), 500);
    }
    
    /**
     * Gets type-specific configuration
     * 
     * @private
     * @param {string} type - Message type
     * @returns {Object} Type configuration
     */
    _getTypeConfig(type) {
        const configs = {
            success: {
                icon: '🎉',
                defaultTitle: 'Success!'
            },
            warning: {
                icon: '⚠️',
                defaultTitle: 'Warning'
            },
            error: {
                icon: '❌',
                defaultTitle: 'Error'
            },
            info: {
                icon: 'ℹ️',
                defaultTitle: 'Info'
            }
        };
        
        return configs[type] || configs.info;
    }
    
    /**
     * Cleanup method - clears timers
     */
    unmount() {
        if (this.state.autoHideTimer) {
            clearTimeout(this.state.autoHideTimer);
        }
        super.unmount();
    }
}

// Export for both ES6 modules and global usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ResultMessage;
} else {
    window.ResultMessage = ResultMessage;
}

/*
 * USAGE EXAMPLES:
 * 
 * 1. Success Message:
 * ==================
 * const successMsg = new ResultMessage({
 *   type: 'success',
 *   title: 'Perfect! The balloon is just right!',
 *   details: 'You found the optimal air pressure.',
 *   showAnimation: true
 * });
 * successMsg.mount('#result-container');
 * 
 * 2. Warning with Auto-hide:
 * =========================
 * const warningMsg = new ResultMessage({
 *   type: 'warning',
 *   title: 'The balloon looks deflated...',
 *   details: 'Try increasing the air pressure.',
 *   autoHide: 3000,
 *   showAnimation: true
 * });
 * warningMsg.mount('#feedback');
 * 
 * 3. Interactive Error Message:
 * ============================
 * const errorMsg = new ResultMessage({
 *   type: 'error',
 *   title: 'POP! Too much air!',
 *   details: 'The balloon burst. Click for tips.',
 *   dismissible: true,
 *   onClick: (data) => {
 *     console.log('Showing help for:', data.type);
 *   },
 *   onDismiss: (data) => {
 *     console.log('Message dismissed');
 *   }
 * });
 * errorMsg.mount('#error-container');
 * 
 * 4. Dynamic Message Updates:
 * ==========================
 * const dynamicMsg = new ResultMessage({
 *   type: 'info',
 *   title: 'Processing...'
 * });
 * dynamicMsg.mount('#status');
 * 
 * // Update the message
 * setTimeout(() => {
 *   dynamicMsg.updateMessage({
 *     type: 'success',
 *     title: 'Complete!',
 *     details: 'Operation finished successfully.'
 *   }, true); // with animation
 * }, 2000);
 * 
 * 5. Programmatic Control:
 * =======================
 * const controlledMsg = new ResultMessage({
 *   type: 'warning',
 *   title: 'Validation Error'
 * });
 * controlledMsg.mount('#validation');
 * 
 * // Show/hide programmatically
 * controlledMsg.show(true); // with shake
 * setTimeout(() => controlledMsg.dismiss(), 3000);
 * 
 * // Check visibility
 * console.log('Visible:', controlledMsg.isVisible());
 * 
 * // Trigger shake animation
 * controlledMsg.shake();
 */