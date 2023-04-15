import {Person} from "./Person.js";

export class PersonCreator {
    constructor(persons) {
        this.persons = persons;
        this.style = document.querySelector("style");
        this.line = document.createElement("tr");
        this.parent = document.createElement("td");
        this.node = document.createElement("div");
        this.line.appendChild(this.parent);
        this.parent.appendChild(this.node);
        this.createForm(this.node);
    }

    createForm(node) {
        this.name = document.createElement("input");
        this.name.type = "text";
        this.color = document.createElement("input");
        this.color.type = "color";
        this.button = document.createElement("button");
        this.button.addEventListener("click", this.submit.bind(this))
        this.button.innerHTML = "+";
        node.appendChild(this.name);
        node.appendChild(this.color);
        node.appendChild(this.button);
    }

    addPerson(name, color) {
        const className = this.createClass(color);
        const person = new Person(name, className, color);
        this.moveToNewLine(person.name, className);
        this.persons.push(person);
    }

    moveToNewLine(placeHolderText, placeHolderClass) {
        this.name.value = "";
        this.parent.removeChild(this.node);
        this.parent.innerHTML = placeHolderText;
        this.parent.setAttribute("class", placeHolderClass);
        
        const lineParent = this.line.parentNode;
        this.line = document.createElement("tr");
        this.parent = document.createElement("td");
        this.line.appendChild(this.parent);
        this.parent.appendChild(this.node);
        lineParent.appendChild(this.line);
    }

    createClass(color) {
        const className = `color${color.substring(1)}`;
        this.style.innerHTML += `.${className}{
            color: white;
            background-color: ${color};
        }`;
        return className;
    }

    submit(event) {
        this.addPerson(this.name.value, this.color.value);
    }
}