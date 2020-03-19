"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["ACTIVE"] = 0] = "ACTIVE";
    ProjectStatus[ProjectStatus["FINISHED"] = 1] = "FINISHED";
})(ProjectStatus || (ProjectStatus = {}));
/**
 * Validator
 * @param validatable {object}
 * @return {boolean}
 */
function validate(validatable) {
    var isExists = function (entity) {
        return (entity !== null &&
            entity !== undefined);
    };
    var isValid = true;
    // Required
    if (validatable.required) {
        isValid = isValid && validatable.value.toString().trim().length !== 0;
    }
    // String value
    if (typeof validatable.value === 'string') {
        // Min length
        if (isExists(validatable.minLength)) {
            isValid = isValid && validatable.value.length >= validatable.minLength;
        }
        // Max length
        if (isExists(validatable.maxLength)) {
            isValid = isValid && validatable.value.length <= validatable.maxLength;
        }
    }
    if (typeof validatable.value === 'number') {
        if (isExists(validatable.min)) {
            isValid = isValid && validatable.value >= validatable.min;
        }
        if (isExists(validatable.max)) {
            isValid = isValid && validatable.value <= validatable.max;
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
function AutoBind(_, _2, descriptor) {
    var originalMethod = descriptor.value;
    var adjDescriptor = {
        configurable: true,
        get: function () {
            return originalMethod.bind(this);
        }
    };
    return adjDescriptor;
}
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
var State = /** @class */ (function () {
    function State() {
        this.listeners = [];
    }
    State.prototype.addListener = function (listenerFn) {
        this.listeners.push(listenerFn);
    };
    return State;
}());
var ProjectState = /** @class */ (function (_super) {
    __extends(ProjectState, _super);
    function ProjectState() {
        var _this = _super.call(this) || this;
        _this.projects = [];
        return _this;
    }
    ProjectState.getInstance = function () {
        if (!this.instance) {
            this.instance = new ProjectState();
        }
        return this.instance;
    };
    ProjectState.prototype.callAllListeners = function () {
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listenerFn = _a[_i];
            listenerFn(this.getProjects());
        }
    };
    ProjectState.prototype.getProjects = function () {
        return this.projects.slice();
    };
    ProjectState.prototype.addProject = function (title, description, people) {
        var newProject = new Project(Math.random().toString(), title, description, people, ProjectStatus.ACTIVE);
        this.projects.push(newProject);
        this.callAllListeners();
    };
    return ProjectState;
}(State));
var Component = /** @class */ (function () {
    function Component(templateSelector, hostSelector) {
        this.element = null;
        this.templateElement = document.querySelector(templateSelector);
        this.hostElement = document.querySelector(hostSelector);
    }
    /**
     * Return HTMLElement from the stored Fragment
     * @return {HTMLFormElement}
     */
    Component.prototype.getHTMLElementFromFragment = function () {
        if (!this.element) {
            this.element = document.importNode(this.templateElement.content, true)
                .firstElementChild;
        }
        return this.element;
    };
    /**
     * Render the given element
     * @param position {InsertPosition}
     * @param element {HTMLElement}
     */
    Component.prototype.attach = function (position, element) {
        this.hostElement.insertAdjacentElement(position, element);
    };
    Component.prototype.assignIdToElement = function (id) {
        this.getHTMLElementFromFragment().id = id;
    };
    Component.prototype.init = function (position, id) {
        this.assignIdToElement(id);
        this.attach(position, this.getHTMLElementFromFragment());
    };
    return Component;
}());
var ListItem = /** @class */ (function (_super) {
    __extends(ListItem, _super);
    function ListItem(templateSelector, hostSelector, project) {
        var _this = _super.call(this, templateSelector, hostSelector) || this;
        _this.project = project;
        _this.fillListItem(_this.project.title, _this.project.description, _this.persons);
        _this.configure();
        _this.init('beforeend', project.id);
        return _this;
    }
    Object.defineProperty(ListItem.prototype, "persons", {
        get: function () {
            var result;
            if (this.project.people === 1) {
                result = this.project.people + " person";
            }
            else {
                result = this.project.people + " persons";
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    ListItem.prototype.fillListItem = function (title, description, persons) {
        this.getHTMLElementFromFragment()
            .querySelector('h2')
            .textContent = "Title: " + title;
        this.getHTMLElementFromFragment()
            .querySelector('h3')
            .textContent = "Number of people: " + persons;
        this.getHTMLElementFromFragment()
            .querySelector('p')
            .textContent = "Description: " + description;
    };
    ListItem.prototype.configure = function () {
        this.getHTMLElementFromFragment()
            .addEventListener('dragstart', this.dragStartHandler);
        this.getHTMLElementFromFragment()
            .addEventListener('dragend', this.dragEndHandler);
    };
    ListItem.prototype.dragStartHandler = function (event) {
        console.log(event);
    };
    ListItem.prototype.dragEndHandler = function (_) {
        console.log('DragEnd');
    };
    __decorate([
        AutoBind
    ], ListItem.prototype, "dragStartHandler", null);
    return ListItem;
}(Component));
/**
 * @class
 * @classdesc Render a form to the container
 */
var ProjectInput = /** @class */ (function (_super) {
    __extends(ProjectInput, _super);
    /**
     * @constructor
     * @param templateSelector {string}
     * @param hostSelector {string}
     * @param elementId {string}
     */
    function ProjectInput(templateSelector, hostSelector, elementId) {
        var _this = _super.call(this, templateSelector, hostSelector) || this;
        _this.titleInputElement = _this.getHTMLElementFromFragment().querySelector('#title');
        _this.descriptionInputElement = _this.getHTMLElementFromFragment().querySelector('#description');
        _this.peopleInputElement = _this.getHTMLElementFromFragment().querySelector('#people');
        _this.configure();
        _this.init('afterbegin', elementId);
        return _this;
    }
    ProjectInput.prototype.getGatheredInputs = function () {
        var enteredTitle = this.titleInputElement.value;
        var enteredDescription = this.descriptionInputElement.value;
        var enteredPeople = this.peopleInputElement.value;
        var titleValidatable = {
            value: enteredTitle,
            required: true
        };
        var descriptionValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };
        var peopleValidatable = {
            value: enteredPeople,
            required: true,
            min: 1
        };
        var result;
        if (validate(titleValidatable) &&
            validate(descriptionValidatable) &&
            validate(peopleValidatable)) {
            result = [enteredTitle, enteredDescription, +enteredPeople];
        }
        else {
            alert('Invalid input value');
            result = null;
        }
        return result;
    };
    ProjectInput.prototype.clearInputs = function () {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    };
    ProjectInput.prototype.submitHandler = function (event) {
        var userInput = this.getGatheredInputs();
        if (userInput) {
            var title = userInput[0], desc = userInput[1], people = userInput[2];
            ProjectState.getInstance()
                .addProject(title, desc, people);
            this.clearInputs();
        }
        event.preventDefault();
    };
    ProjectInput.prototype.configure = function () {
        this.getHTMLElementFromFragment()
            .addEventListener('submit', this.submitHandler);
    };
    __decorate([
        AutoBind
    ], ProjectInput.prototype, "submitHandler", null);
    return ProjectInput;
}(Component));
var ProjectList = /** @class */ (function (_super) {
    __extends(ProjectList, _super);
    function ProjectList(templateSelector, hostSelector, type) {
        var _this = _super.call(this, templateSelector, hostSelector) || this;
        _this.type = type;
        _this.listId = _this.type + "-project-list";
        ProjectState.getInstance()
            .addListener(function (projects) {
            _this.renderProjects(_this.filterProjectsByStatus(projects));
        });
        _this.configure();
        _this.renderContent();
        _this.init('beforeend', _this.type + "-projects");
        return _this;
    }
    ProjectList.prototype.filterProjectsByStatus = function (projects) {
        var _this = this;
        return projects.filter(function (item) {
            var result;
            switch (_this.type) {
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
    };
    ProjectList.prototype.renderProjects = function (projects) {
        this.getHTMLElementFromFragment()
            .querySelector('ul').innerHTML = '';
        for (var _i = 0, projects_1 = projects; _i < projects_1.length; _i++) {
            var project = projects_1[_i];
            new ListItem('#single-project', "#" + this.listId, project);
        }
    };
    ProjectList.prototype.renderContent = function () {
        this.getHTMLElementFromFragment()
            .querySelector('ul').id = this.listId;
        this.getHTMLElementFromFragment()
            .querySelector('h2').textContent = this.type.toUpperCase() + " PROJECTS";
    };
    ProjectList.prototype.configure = function () {
        this.getHTMLElementFromFragment()
            .addEventListener('dragover', this.dragOverHandler);
        this.getHTMLElementFromFragment()
            .addEventListener('drop', this.dropHandler);
        this.getHTMLElementFromFragment()
            .addEventListener('dragleave', this.dragLeaveHandler);
    };
    ProjectList.prototype.dragOverHandler = function (_) {
        this.getHTMLElementFromFragment()
            .querySelector('ul')
            .classList
            .add('droppable');
    };
    ProjectList.prototype.dropHandler = function (_) {
    };
    ProjectList.prototype.dragLeaveHandler = function (_) {
        this.getHTMLElementFromFragment()
            .querySelector('ul')
            .classList
            .remove('droppable');
    };
    __decorate([
        AutoBind
    ], ProjectList.prototype, "dragOverHandler", null);
    __decorate([
        AutoBind
    ], ProjectList.prototype, "dragLeaveHandler", null);
    return ProjectList;
}(Component));
var projectInput = new ProjectInput('#project-input', '#app', 'user-input');
var projectList = new ProjectList('#project-list', '#app', 'active');
var projectList2 = new ProjectList('#project-list', '#app', 'finished');
