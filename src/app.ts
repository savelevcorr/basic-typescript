
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

        console.log(this.titleInputElement);

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

    private submitHandler(event: Event): void {
        event.preventDefault();

        console.log(this.titleInputElement.value);
    }

    private configure() {
        this.getHTMLElementFromFragment()
            .addEventListener('submit', this.submitHandler.bind(this));
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