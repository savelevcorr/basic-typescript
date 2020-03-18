interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}
/**
 * Validator
 * @param validatable {object}
 * @return {boolean}
 */
declare function validate(validatable: Validatable): boolean;
/**
 * AutoBing
 * @param _
 * @param _2
 * @param descriptor
 */
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
    private getGatheredInputs;
    private clearInputs;
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
