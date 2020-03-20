import {Project, ProjectStatus} from "../models/project.js";

type Listener<T> = (items: T[]) => void;

/**
 * @class
 */
class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

/**
 * @class
 */
export class ProjectState extends State<Project> {
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

    moveProject(projectId: string, newStatus: ProjectStatus) {
        const project = this.projects.find(project => project.id === projectId);

        if (project) {
            project.status = newStatus;
            this.callAllListeners();
        }
    }
}
