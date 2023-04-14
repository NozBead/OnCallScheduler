class Person {
    constructor(name, color, line) {
        this.name = name;
        this.color = color;
        this.line = line;
    }
}

class ScheduleTabler {
    daysLabelsLine = document.createElement("tr");
    daysNumbersLine = document.createElement("tr");
    daysLabels = ["L","M","Me","J","V","S","D"];

    constructor(persons) {
        this.persons = persons;
    }

    addPersonDay(person, className) {
        const element = document.createElement("td");
        person.line.appendChild(element);
        element.setAttribute("class", className);
    }

    addDayHeader(num, label, off) {
        const numberElement = document.createElement("td");
        numberElement.innerHTML = num;
        daysNumbersLine.appendChild(numberElement);

        const labelElement = document.createElement("td");
        labelElement.innerHTML = label;
        daysLabel.appendChild(labelElement);

        if (off) {
            labelElement.setAttribute("class", "off");
            numberElement.setAttribute("class", "off");
        }
    }

    tableSchedule(data) {
        for (let i = 0 ; i < data.weekEndsSchedule.length ; i++) {
            const date = new Date(data.weeksDate[i]);
            for (let j = 0 ; j < 7 ; j++) {
                let off = false;
                if (j == 5 || j == 6) {
                    off = true;
                }
                
                this.addDayHeader(date.getDate(), labels[j], off);
                date.setDate(date.getDate() + 1);
        
                persons.forEach(p => {
                    let className = "";
                    if (k == data.weeksSchedule[i] && j < 5) {
                        className = p.name;
                    }
                    else if (k == data.weekEndsSchedule[i] && j >= 4) {
                        className = p.name;
                    }
                    else if (j >= 5) {
                        className = "off";
                    }
                    this.addPersonDay(p, className);
                });
            }
        }
    }
}

class PersonCreator {
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

    createPerson() {
        return new Person(this.name.value, this.color.value, this.line);
    }

    moveToNewLine(placeHolder) {
        this.parent.removeChild(this.node);
        this.parent.innerHTML = placeHolder;
        this.parent.setAttribute("class", placeHolder);
        
        const lineParent = this.line.parentNode;
        this.line = document.createElement("tr");
        this.parent = document.createElement("td");
        this.line.appendChild(this.parent);
        this.parent.appendChild(this.node);
        lineParent.appendChild(this.line);
    }

    createClass(name, color) {
        this.style.innerHTML += `.${name}{
            color: white;
            background-color: ${color};
        }`;
    }

    submit(event) {
        const person = this.createPerson();
        this.createClass(person.name, person.color);
        this.moveToNewLine(person.name, person.color);
        persons.push(person);
    }
}

const persons = [];
const tabler = new ScheduleTabler(persons);
const creator = new PersonCreator(persons);

const tableBody = document.querySelector("tbody");
tableBody.appendChild(creator.line);
const tableHeader = document.querySelector("thead");
tableHeader.appendChild(tabler.daysLabelsLine);
tableHeader.appendChild(tabler.daysNumbersLine);

const generateBox = document.querySelector("#generateBox");
const generateDate = generateBox.querySelector("input");
generateBox.querySelector("button").addEventListener("click", e => {
    fetch(`/scheduler?startDate=${generateDate.value}&numberOfPeople=${persons.length}`)
    .then(response => 
        response.json()
    )
    .then(data => 
        tabler.tableSchedule(data)
    );
});