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
var ProjectState = /** @class */ (function () {
    function ProjectState() {
        this.listeners = [];
        this.projects = [];
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
    ProjectState.prototype.addListener = function (listenerFn) {
        this.listeners.push(listenerFn);
    };
    ProjectState.prototype.addProject = function (title, description, numberOfPeople) {
        var newProject = {
            id: Math.random().toString(),
            title: title,
            description: description,
            numberOfPeople: numberOfPeople
        };
        this.projects.push(newProject);
        this.callAllListeners();
    };
    return ProjectState;
}());
var Project = /** @class */ (function () {
    function Project(templateSelector, hostSelector) {
        this.element = null;
        this.templateElement = document.querySelector(templateSelector);
        this.hostElement = document.querySelector(hostSelector);
    }
    /**
     * Return HTMLElement from the stored Fragment
     * @return {HTMLFormElement}
     */
    Project.prototype.getHTMLElementFromFragment = function () {
        if (!this.element) {
            this.element = document.importNode(this.templateElement.content, true).firstElementChild;
        }
        return this.element;
    };
    /**
     * Render the given element
     * @param position {InsertPosition}
     * @param element {HTMLElement}
     */
    Project.prototype.attach = function (position, element) {
        this.hostElement.insertAdjacentElement(position, element);
    };
    Project.prototype.assignIdToElement = function (id) {
        this.getHTMLElementFromFragment().id = id;
    };
    Project.prototype.init = function (position, id) {
        this.assignIdToElement(id);
        this.attach(position, this.getHTMLElementFromFragment());
    };
    return Project;
}());
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
        var result = null;
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
}(Project));
var ProjectList = /** @class */ (function (_super) {
    __extends(ProjectList, _super);
    function ProjectList(templateSelector, hostSelector, type) {
        var _this = _super.call(this, templateSelector, hostSelector) || this;
        _this.type = type;
        _this.listId = _this.type + "-project-list";
        ProjectState.getInstance()
            .addListener(function (projects) {
            _this.renderProjects(projects);
        });
        _this.init('beforeend', _this.type + "-projects");
        _this.renderContent();
        return _this;
    }
    ProjectList.prototype.renderProjects = function (projects) {
        for (var _i = 0, projects_1 = projects; _i < projects_1.length; _i++) {
            var project = projects_1[_i];
            this.getHTMLElementFromFragment()
                .querySelector('ul').appendChild(this.createListItem(project.title));
        }
    };
    ProjectList.prototype.createListItem = function (title) {
        var listItem = document.createElement('li');
        listItem.textContent = title;
        return listItem;
    };
    ProjectList.prototype.renderContent = function () {
        this.getHTMLElementFromFragment()
            .querySelector('ul').id = this.listId;
        this.getHTMLElementFromFragment()
            .querySelector('h2').textContent = this.type.toUpperCase() + " PROJECTS";
    };
    return ProjectList;
}(Project));
var projectInput = new ProjectInput('#project-input', '#app', 'user-input');
var projectList = new ProjectList('#project-list', '#app', 'active');
var projectList2 = new ProjectList('#project-list', '#app', 'finished');
