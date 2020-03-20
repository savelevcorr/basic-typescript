declare namespace DragDropApp {
    enum ProjectStatus {
        ACTIVE = 0,
        FINISHED = 1
    }
    class Project {
        id: string;
        title: string;
        description: string;
        people: number;
        status: ProjectStatus;
        constructor(id: string, title: string, description: string, people: number, status: ProjectStatus);
    }
}
