export abstract class Component {
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
            this.element = document.importNode(this.templateElement.content, true)
                .firstElementChild as HTMLFormElement | HTMLElement;
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
