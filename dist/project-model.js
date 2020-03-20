"use strict";
var DragDropApp;
(function (DragDropApp) {
    var ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus[ProjectStatus["ACTIVE"] = 0] = "ACTIVE";
        ProjectStatus[ProjectStatus["FINISHED"] = 1] = "FINISHED";
    })(ProjectStatus = DragDropApp.ProjectStatus || (DragDropApp.ProjectStatus = {}));
    var Project = /** @class */ (function () {
        function Project(id, title, description, people, status) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.people = people;
            this.status = status;
        }
        return Project;
    }());
    DragDropApp.Project = Project;
})(DragDropApp || (DragDropApp = {}));
