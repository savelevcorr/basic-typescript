declare function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor): PropertyDescriptor;
/**
 * @class
 * @classdesc Render a form to the container
 */
declare class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;
    private element;
    /**
     * @constructor
     * @param elementId {string}
     */
    constructor(elementId: string);
    /**
     * Return HTMLElement from the stored Fragment
     * @return {HTMLFormElement}
     */
    private getHTMLElementFromFragment;
    private submitHandler;
    private configure;
    private assignIdToElement;
    /**
     * Render the given element
     * @param element {HTMLElement}
     */
    private attach;
}
declare const projectInput: ProjectInput;
