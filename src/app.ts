interface Validatable {
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
function validate(validatable: Validatable) {
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

/**
 * AutoBing
 * @param _
 * @param _2
 * @param descriptor
 */
function AutoBind(
    _: any,
    _2: string,
    descriptor: PropertyDescriptor
) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            return originalMethod.bind(this);
        }
    };

    return adjDescriptor;
}

/**
 * @class
 * @classdesc Render a form to the container
 */
class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    private element: HTMLFormElement | null;

    /**
     * @constructor
     * @param elementId {string}
     */
    constructor(elementId: string) {
        this.element = null;
        this.templateElement = <HTMLTemplateElement>document.querySelector('#project-input')!;
        this.hostElement = <HTMLDivElement>document.querySelector('#app')!;
        this.titleInputElement = <HTMLInputElement>this.getHTMLElementFromFragment().querySelector('#title')!;
        this.descriptionInputElement = <HTMLInputElement>this.getHTMLElementFromFragment().querySelector('#description')!;
        this.peopleInputElement = <HTMLInputElement>this.getHTMLElementFromFragment().querySelector('#people')!;

        this.assignIdToElement(elementId);
        this.configure();
        this.attach(this.getHTMLElementFromFragment());
    }

    /**
     * Return HTMLElement from the stored Fragment
     * @return {HTMLFormElement}
     */
    private getHTMLElementFromFragment(): HTMLFormElement {
        if (!this.element) {
            this.element = document.importNode(this.templateElement.content, true).firstElementChild as HTMLFormElement;
        }

        return this.element;
    }

    private getGatheredInputs(): [string, string, number] | null {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true
        };
        const descriptionValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };
        const peopleValidatable = {
            value: enteredPeople,
            required: true,
            min: 1
        };

        let result: [string, string, number] | null = null;

        if (
            validate(titleValidatable) &&
            validate(descriptionValidatable) &&
            validate(peopleValidatable)
        ) {
            result = [enteredTitle, enteredDescription, +enteredPeople];
        } else {
            alert('Invalid input value');
            result = null;
        }

        return result;
    }

    private clearInputs(): void {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }

    @AutoBind
    private submitHandler(event: Event): void {
        const userInput = this.getGatheredInputs();

        if (userInput) {
            let [title, desc, people] = userInput;

            console.log(title, desc, people);
            this.clearInputs();
        }

        event.preventDefault();
    }

    private configure() {
        this.getHTMLElementFromFragment()
            .addEventListener('submit', this.submitHandler);
    }

    private assignIdToElement(id: string): void {
        this.getHTMLElementFromFragment().id = id;
    }

    /**
     * Render the given element
     * @param element {HTMLElement}
     */
    private attach(element: HTMLElement): void {
        this.hostElement.insertAdjacentElement('afterbegin', element);
    }
}

const projectInput = new ProjectInput('user-input');