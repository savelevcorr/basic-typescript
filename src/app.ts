import {ProjectInput} from "./components/project-input.js";
import {ProjectList} from "./components/project-list.js";

new ProjectInput('#project-input', '#app', 'user-input');
new ProjectList('#project-list', '#app', 'active');
new ProjectList('#project-list', '#app', 'finished');