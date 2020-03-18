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
declare abstract class Project {
    element: HTMLFormElement | HTMLElement | null;
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    protected constructor(templateSelector: string, hostSelector: string);
    /**
     * Return HTMLElement from the stored Fragment
     * @return {HTMLFormElement}
     */
    protected getHTMLElementFromFragment(): HTMLFormElement | HTMLElement;
    /**
     * Render the given element
     * @param position {InsertPosition}
     * @param element {HTMLElement}
     */
    protected attach(position: InsertPosition, element: HTMLElement): void;
    protected assignIdToElement(id: string): void;
    protected init(position: InsertPosition, id: string): void;
}
/**
 * @class
 * @classdesc Render a form to the container
 */
declare class ProjectInput extends Project {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;
    /**
     * @constructor
     * @param templateSelector {string}
     * @param hostSelector {string}
     * @param elementId {string}
     */
    constructor(templateSelector: string, hostSelector: string, elementId: string);
    private getGatheredInputs;
    private clearInputs;
    private submitHandler;
    private configure;
}
declare class ProjectList extends Project {
    type: 'active' | 'finished';
    constructor(templateSelector: string, hostSelector: string, type: 'active' | 'finished');
    private renderContent;
}
declare const projectInput: ProjectInput;
declare const projectList: ProjectList;
declare const projectList2: ProjectList;
