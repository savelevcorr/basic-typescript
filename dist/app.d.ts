interface IDraggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}
interface IDropTarget {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
}
interface IValidatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}
declare enum ProjectStatus {
    ACTIVE = 0,
    FINISHED = 1
}
declare type Listener<T> = (items: T[]) => void;
/**
 * Validator
 * @param validatable {object}
 * @return {boolean}
 */
declare function validate(validatable: IValidatable): boolean;
/**
 * AutoBing
 * @param _
 * @param _2
 * @param descriptor
 */
declare function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor): PropertyDescriptor;
declare class Project {
    id: string;
    title: string;
    description: string;
    people: number;
    status: ProjectStatus;
    constructor(id: string, title: string, description: string, people: number, status: ProjectStatus);
}
declare class State<T> {
    protected listeners: Listener<T>[];
    addListener(listenerFn: Listener<T>): void;
}
declare class ProjectState extends State<Project> {
    private projects;
    private static instance;
    private constructor();
    static getInstance(): ProjectState;
    private callAllListeners;
    private getProjects;
    addProject(title: string, description: string, people: number): void;
}
declare abstract class Component {
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
declare class ListItem extends Component implements IDraggable {
    project: Project;
    get persons(): string;
    constructor(templateSelector: string, hostSelector: string, project: Project);
    private fillListItem;
    configure(): void;
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(_: DragEvent): void;
}
/**
 * @class
 * @classdesc Render a form to the container
 */
declare class ProjectInput extends Component {
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
declare class ProjectList extends Component implements IDropTarget {
    type: 'active' | 'finished';
    listId: string;
    constructor(templateSelector: string, hostSelector: string, type: 'active' | 'finished');
    private filterProjectsByStatus;
    private renderProjects;
    private renderContent;
    configure(): void;
    dragOverHandler(_: DragEvent): void;
    dropHandler(_: DragEvent): void;
    dragLeaveHandler(_: DragEvent): void;
}
declare const projectInput: ProjectInput;
declare const projectList: ProjectList;
declare const projectList2: ProjectList;
