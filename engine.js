// engine.js

class OptimizationEngine {
    constructor(learningRate = 0.1) {
        this.learningRate = learningRate;
        this.history = [];
    }

    calculateLoss(variables, targets) {
        let totalLoss = 0;
        for (let i = 0; i < variables.length; i++) {
            totalLoss += Math.pow(variables[i] - targets[i], 2);
        }
        return totalLoss / variables.length;
    }

    calculateGradients(variables, targets) {
        const variableTensors = variables.map(v => tf.scalar(v));
        const targetTensors = targets.map(t => tf.scalar(t));

        const gradients = [];
        for (let i = 0; i < variables.length; i++) {
            const gradient = tf.mul(
                tf.scalar(2 / variables.length),
                tf.sub(variableTensors[i], targetTensors[i])
            );
            gradients.push(gradient.dataSync()[0]);
        }

        variableTensors.forEach(t => t.dispose());
        targetTensors.forEach(t => t.dispose());

        return gradients;
    }

    optimizationStep(variables, targets, constraints = null) {
        const loss = this.calculateLoss(variables, targets);
        const gradients = this.calculateGradients(variables, targets);

        const newVariables = variables.map((variable, i) => {
            let rawStep = this.learningRate * gradients[i];
            let newValue = variable - rawStep;

            if (constraints && constraints[i]) {
                const { min, max } = constraints[i];
                newValue = Math.max(min, Math.min(max, newValue));
            }

            let roundedValue = Math.round(newValue);

            if (roundedValue === variable && variable !== targets[i]) {
                const direction = targets[i] > variable ? 1 : -1;
                roundedValue = variable + direction;

                if (constraints && constraints[i]) {
                    const { min, max } = constraints[i];
                    roundedValue = Math.max(min, Math.min(max, roundedValue));
                }
            }

            return roundedValue;
        });

        const stepInfo = {
            step: this.history.length,
            variables: [...variables],
            targets: [...targets],
            loss: loss,
            gradients: [...gradients],
            rawSteps: gradients.map(g => this.learningRate * g),
            newVariables: [...newVariables]
        };

        this.history.push(stepInfo);

        return {
            loss,
            gradients,
            rawSteps: stepInfo.rawSteps,
            newVariables,
            converged: this.checkConvergence(newVariables, targets)
        };
    }

    checkConvergence(variables, targets, tolerance = 0) {
        for (let i = 0; i < variables.length; i++) {
            if (Math.abs(variables[i] - targets[i]) > tolerance) {
                return false;
            }
        }
        return true;
    }

    reset() {
        this.history = [];
    }
}