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

abstract class Project {
    element: HTMLFormElement | HTMLElement | null;
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;

    protected constructor(templateSelector: string, hostSelector: string) {
        this.element = null;
        this.templateElement = <HTMLTemplateElement>document.querySelector(templateSelector)!;
        this.hostElement = <HTMLDivElement>document.querySelector(hostSelector)!;
    }

    /**
     * Return HTMLElement from the stored Fragment
     * @return {HTMLFormElement}
     */
    protected getHTMLElementFromFragment(): HTMLFormElement | HTMLElement {
        if (!this.element) {
            this.element = document.importNode(this.templateElement.content, true).firstElementChild as HTMLFormElement | HTMLElement;
        }

        return this.element;
    }

    /**
     * Render the given element
     * @param position {InsertPosition}
     * @param element {HTMLElement}
     */
    protected attach(position: InsertPosition, element: HTMLElement): void {
        this.hostElement.insertAdjacentElement(position, element);
    }

    protected assignIdToElement(id: string): void {
        this.getHTMLElementFromFragment().id = id;
    }

    protected init(position: InsertPosition, id: string) {
        this.assignIdToElement(id);
        this.attach(position, this.getHTMLElementFromFragment());
    }
}

/**
 * @class
 * @classdesc Render a form to the container
 */
class ProjectInput extends Project {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    /**
     * @constructor
     * @param templateSelector {string}
     * @param hostSelector {string}
     * @param elementId {string}
     */
    constructor(templateSelector: string, hostSelector: string, elementId: string) {
        super(templateSelector, hostSelector);
        this.titleInputElement = <HTMLInputElement>this.getHTMLElementFromFragment().querySelector('#title')!;
        this.descriptionInputElement = <HTMLInputElement>this.getHTMLElementFromFragment().querySelector('#description')!;
        this.peopleInputElement = <HTMLInputElement>this.getHTMLElementFromFragment().querySelector('#people')!;

        this.configure();
        this.init('afterbegin', elementId);
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
}

class ProjectList extends Project {
    type: 'active' | 'finished';

    constructor(templateSelector: string, hostSelector: string, type: 'active' | 'finished') {
        super(templateSelector, hostSelector);

        this.type = type;
        this.init('beforeend', `${this.type}-projects`);
        this.renderContent();
    }

    private renderContent() {
        this.getHTMLElementFromFragment()
            .querySelector('ul')!.id = `${this.type}-project-list`;
        this.getHTMLElementFromFragment()
            .querySelector('h2')!.textContent = `${this.type.toUpperCase()} PROJECTS`;
    }
}

const projectInput = new ProjectInput('#project-input', '#app', 'user-input');
const projectList = new ProjectList('#project-list', '#app', 'active');
const projectList2 = new ProjectList('#project-list', '#app', 'finished');