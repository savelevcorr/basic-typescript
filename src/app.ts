/**
 * @class
 * @classdesc Render a form to the container
 */
class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;

    /**
     * @constructor
     * @param elementId {string}
     */
    constructor(elementId: string) {
        this.templateElement = <HTMLTemplateElement>document.querySelector('#project-input')!;
        this.hostElement = <HTMLDivElement>document.querySelector('#app')!;

        this.attach(this.getHTMLElementFromFragment(this.templateElement.content, elementId));
    }

    /**
     * Return HTMLElement from the given DocumentFragment
     * @param node {DocumentFragment}
     * @param elementId {string}
     *
     * @return {HTMLElement}
     */
    private getHTMLElementFromFragment(node: DocumentFragment, elementId: string): HTMLElement {
        const element = document.importNode(node, true).firstElementChild as HTMLElement;

        element.id = elementId;
        return element;
    }

    /**
     * Render the given element
     * @param element {HTMLElement}
     */
    private attach(element: HTMLElement) {
        this.hostElement.insertAdjacentElement('afterbegin', element);
    }
}

const projectInput = new ProjectInput('user-input');