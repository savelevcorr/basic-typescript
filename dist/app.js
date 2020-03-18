"use strict";
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
/**
 * @class
 * @classdesc Render a form to the container
 */
var ProjectInput = /** @class */ (function () {
    /**
     * @constructor
     * @param elementId {string}
     */
    function ProjectInput(elementId) {
        this.element = null;
        this.templateElement = document.querySelector('#project-input');
        this.hostElement = document.querySelector('#app');
        this.titleInputElement = this.getHTMLElementFromFragment().querySelector('#title');
        this.descriptionInputElement = this.getHTMLElementFromFragment().querySelector('#description');
        this.peopleInputElement = this.getHTMLElementFromFragment().querySelector('#people');
        this.assignIdToElement(elementId);
        this.configure();
        this.attach(this.getHTMLElementFromFragment());
    }
    /**
     * Return HTMLElement from the stored Fragment
     * @return {HTMLFormElement}
     */
    ProjectInput.prototype.getHTMLElementFromFragment = function () {
        if (!this.element) {
            this.element = document.importNode(this.templateElement.content, true).firstElementChild;
        }
        return this.element;
    };
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
            console.log(title, desc, people);
            this.clearInputs();
        }
        event.preventDefault();
    };
    ProjectInput.prototype.configure = function () {
        this.getHTMLElementFromFragment()
            .addEventListener('submit', this.submitHandler);
    };
    ProjectInput.prototype.assignIdToElement = function (id) {
        this.getHTMLElementFromFragment().id = id;
    };
    /**
     * Render the given element
     * @param element {HTMLElement}
     */
    ProjectInput.prototype.attach = function (element) {
        this.hostElement.insertAdjacentElement('afterbegin', element);
    };
    __decorate([
        AutoBind
    ], ProjectInput.prototype, "submitHandler", null);
    return ProjectInput;
}());
var projectInput = new ProjectInput('user-input');
