interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number,
    maxLength?: number,
    min?: number,
    max?: number
}

enum ProjectStatus {ACTIVE, FINISHED}

type Listener<T> = (items: T[]) => void;

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

class Project {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus
    ) {
    }
}

class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
        super()
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new ProjectState();
        }

        return this.instance;
    }

    private callAllListeners() {
        for (let listenerFn of this.listeners) {
            listenerFn(this.getProjects())
        }
    }

    private getProjects() {
        return this.projects.slice();
    }

    addProject(title: string, description: string, people: number) {
        const newProject = new Project(
            Math.random().toString(),
            title,
            description,
            people,
            ProjectStatus.ACTIVE
        );

        this.projects.push(newProject);
        this.callAllListeners();
    }
}

abstract class Component {
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

class ListItem extends Component {
    project: Project;

    get persons(): string {
        let result: string;

        if (this.project.people === 1) {
            result = `${this.project.people} person`;
        } else {
            result = `${this.project.people} persons`;
        }

        return result;
    }

    constructor(templateSelector: string, hostSelector: string, project: Project) {
        super(templateSelector, hostSelector);

        this.project = project;
        this.fillListItem(this.project.title, this.project.description, this.persons);
        this.init('beforeend', project.id);
    }

    private fillListItem(title: string, description: string, persons: string): void {
        this.getHTMLElementFromFragment()
            .querySelector('h2')!
            .textContent = `Title: ${title}`;

        this.getHTMLElementFromFragment()
            .querySelector('h3')!
            .textContent = `Number of people: ${persons}`;

        this.getHTMLElementFromFragment()
            .querySelector('p')!
            .textContent = `Description: ${description}`;
    }
}

/**
 * @class
 * @classdesc Render a form to the container
 */
class ProjectInput extends Component {
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
        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };
        const peopleValidatable: Validatable = {
            value: enteredPeople,
            required: true,
            min: 1
        };

        let result: [string, string, number] | null;

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

            ProjectState.getInstance()
                .addProject(title, desc, people);

            this.clearInputs();
        }

        event.preventDefault();
    }

    private configure() {
        this.getHTMLElementFromFragment()
            .addEventListener('submit', this.submitHandler);
    }
}

class ProjectList extends Component {
    type: 'active' | 'finished';
    listId: string;

    constructor(
        templateSelector: string,
        hostSelector: string,
        type: 'active' | 'finished'
    ) {
        super(templateSelector, hostSelector);

        this.type = type;
        this.listId = `${this.type}-project-list`;

        ProjectState.getInstance()
            .addListener((projects: Project[]) => {
                this.renderProjects(this.filterProjectsByStatus(projects));
            });

        this.init('beforeend', `${this.type}-projects`);
        this.renderContent();
    }

    private filterProjectsByStatus(projects: Project[]): Project[] {
        return projects.filter(item => {
            let result: boolean;

            switch (this.type) {
                case "active":
                    result = item.status === ProjectStatus.ACTIVE;
                    break;

                case "finished":
                    result = item.status === ProjectStatus.FINISHED;
                    break;

                default:
                    result = false;
            }

            return result;
        });
    }

    private renderProjects(projects: Project[]) {
        this.getHTMLElementFromFragment()
            .querySelector('ul')!.innerHTML = '';

        for (let project of projects) {
            new ListItem('#single-project', `#${this.listId}`, project);
        }
    }

    private renderContent() {
        this.getHTMLElementFromFragment()
            .querySelector('ul')!.id = this.listId;
        this.getHTMLElementFromFragment()
            .querySelector('h2')!.textContent = `${this.type.toUpperCase()} PROJECTS`;
    }
}

const projectInput = new ProjectInput('#project-input', '#app', 'user-input');
const projectList = new ProjectList('#project-list', '#app', 'active');
const projectList2 = new ProjectList('#project-list', '#app', 'finished');