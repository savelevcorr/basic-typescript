"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
        console.log(this.titleInputElement);
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
    ProjectInput.prototype.submitHandler = function (event) {
        event.preventDefault();
        console.log(this.titleInputElement.value);
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
