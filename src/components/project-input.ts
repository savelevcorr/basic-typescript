import {Component} from "./base-component.js";
import {IValidatable, validate} from "../util/validation.js";
import {ProjectState} from "../state/project-state.js";
import {AutoBind} from "../decorators/auto-bind.js";

/**
 * @class
 * @classdesc Render a form to the container
 */
export class ProjectInput extends Component {
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
        const titleValidatable: IValidatable = {
            value: enteredTitle,
            required: true
        };
        const descriptionValidatable: IValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };
        const peopleValidatable: IValidatable = {
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
