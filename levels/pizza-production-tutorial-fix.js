        _showTutorialStepApply() {
            console.log('Showing apply step');
            this.tutorialStep = 5;
            this._removeSpotlight();
            
            const applyBtn = document.getElementById('apply-gd-btn');
            const functionContainer = document.querySelector('[style*="Current Function"]')?.parentElement;
            if (!applyBtn || !functionContainer) return;
            
            // Ensure backdrop exists
            const existingBackdrop = document.getElementById('tutorial-backdrop');
            if (!existingBackdrop) {
                const backdrop = this._createBackdrop();
                this.tutorialElements.push(backdrop);
            }
            
            this._createSpotlight(functionContainer);
            
            const message = this._createTutorialMessage(
                'Apply the Updates',
                'The gradient has been calculated! Click "Apply Gradient Descent" to update your weights and improve the formula.',
                functionContainer,
                () => {
                    message.remove();
                    // Wait for apply button click
                    const clickHandler = () => {
                        console.log('Apply clicked');
                        applyBtn.removeEventListener('click', clickHandler, true);
                        this._removeSpotlight();
                        setTimeout(() => this._showTutorialStepSuccess(), 500);
                    };
                    applyBtn.addEventListener('click', clickHandler, true);
                }
            );
            
            this.tutorialElements.push(message);
        }
        
        _showTutorialStepSuccess() {
            console.log('Showing success step');
            this.tutorialStep = 6;
            this._removeSpotlight();