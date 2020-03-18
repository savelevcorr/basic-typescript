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
        let result: [string, string, number] | null = null;

        if (
            enteredTitle.trim().length === 0 ||
            enteredDescription.trim().length === 0 ||
            enteredDescription.trim().length === 0
        ) {
            alert('Invalid input value');
        } else {
            result = [enteredTitle, enteredDescription, +enteredPeople];
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