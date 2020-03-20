declare namespace DragDropApp {
    interface IDraggable {
        dragStartHandler(event: DragEvent): void;
        dragEndHandler(event: DragEvent): void;
    }
    interface IDropTarget {
        dragOverHandler(event: DragEvent): void;
        dropHandler(event: DragEvent): void;
        dragLeaveHandler(event: DragEvent): void;
    }
}
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
declare namespace DragDropApp {
}
