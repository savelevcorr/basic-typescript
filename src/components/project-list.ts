import {IDropTarget} from '../models/drag-drop.js';
import {Component} from '../components/base-component.js';
import {Project, ProjectStatus} from "../models/project.js";
import {ProjectState} from "../state/project-state.js";
import {AutoBind} from "../decorators/auto-bind.js";
import {ListItem} from "./project-item.js";


export class ProjectList extends Component implements IDropTarget {
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

        this.configure();
        this.renderContent();
        this.init('beforeend', `${this.type}-projects`);
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

    configure() {
        this.getHTMLElementFromFragment()
            .addEventListener('dragover', <EventListener>this.dragOverHandler);
        this.getHTMLElementFromFragment()
            .addEventListener('drop', <EventListener>this.dropHandler);
        this.getHTMLElementFromFragment()
            .addEventListener('dragleave', <EventListener>this.dragLeaveHandler);
    }

    @AutoBind
    dragOverHandler(event: DragEvent): void {
        if (event.dataTransfer?.types[0] === 'text/plane') {
            event.preventDefault();

            this.getHTMLElementFromFragment()
                .querySelector('ul')!
                .classList
                .add('droppable');
        }
    }

    @AutoBind
    dropHandler(event: DragEvent): void {
        const projectId = event.dataTransfer!.getData('text/plane');
        const projectStatus = this.type === 'active' ?
            ProjectStatus.ACTIVE :
            ProjectStatus.FINISHED;

        ProjectState.getInstance().moveProject(projectId, projectStatus)
    }

    @AutoBind
    dragLeaveHandler(_: DragEvent): void {
        this.getHTMLElementFromFragment()
            .querySelector('ul')!
            .classList
            .remove('droppable');
    }
}
