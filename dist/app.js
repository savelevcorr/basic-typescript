"use strict";
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
            .addEventListener('submit', this.submitHandler.bind(this));
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
    return ProjectInput;
}());
var projectInput = new ProjectInput('user-input');
