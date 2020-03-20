import {IDraggable} from '../models/drag-drop.js';
import {Component} from '../components/base-component.js';
import {Project} from "../models/project.js";
import {AutoBind} from "../decorators/auto-bind.js";

export class ListItem extends Component implements IDraggable {
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
        this.configure();
        this.init('beforeend', this.project.id);
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

    configure() {
        this.getHTMLElementFromFragment()
            .addEventListener('dragstart', <EventListener>this.dragStartHandler);
        this.getHTMLElementFromFragment()
            .addEventListener('dragend', <EventListener>this.dragEndHandler);
    }

    @AutoBind
    dragStartHandler(event: DragEvent): void {
        event.dataTransfer!.setData('text/plane', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }

    dragEndHandler(_: DragEvent): void {
        console.log('DragEnd');
    }
}
