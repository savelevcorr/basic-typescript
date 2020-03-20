namespace DragDropApp {
    export interface IValidatable {
        value: string | number;
        required?: boolean;
        minLength?: number,
        maxLength?: number,
        min?: number,
        max?: number
    }

    /**
     * Validator
     * @param validatable {object}
     * @return {boolean}
     */
    export function validate(validatable: IValidatable) {
        const isExists = function (entity: null | undefined | number): boolean {
            return (
                entity !== null &&
                entity !== undefined
            );
        };

        let isValid: boolean = true;

        // Required
        if (validatable.required) {
            isValid = isValid && validatable.value.toString().trim().length !== 0;
        }

        // String value
        if (typeof validatable.value === 'string') {
            // Min length
            if (isExists(validatable.minLength)) {
                isValid = isValid && validatable.value.length >= validatable.minLength!;
            }

            // Max length
            if (isExists(validatable.maxLength)) {
                isValid = isValid && validatable.value.length <= validatable.maxLength!;
            }
        }

        if (typeof validatable.value === 'number') {
            if (isExists(validatable.min)) {
                isValid = isValid && validatable.value >= validatable.min!;
            }

            if (isExists(validatable.max)) {
                isValid = isValid && validatable.value <= validatable.max!;
            }
        }

        return isValid;
    }
}