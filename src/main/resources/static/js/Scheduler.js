import {ScheduleTabler} from "./ScheduleTabler.js";
import {PersonCreator} from "./PersonCreator.js";

const persons = [];
const tabler = new ScheduleTabler(persons);
const creator = new PersonCreator(persons);

const tableBody = document.createElement("tbody");
const table = document.createElement("table");
const body = document.querySelector("body");
table.append(tableBody);
body.appendChild(table);
tableBody.appendChild(creator.line);

tabler.names = tableBody;

const generateBox = document.querySelector("#generateBox");
const generateDate = generateBox.querySelector('input[type="date"]');
const generateWeeks = generateBox.querySelector('input[type="number"]');
generateBox.querySelector("button").addEventListener("click", e => {
    localStorage.setItem("persons", JSON.stringify(persons));

    fetch(`/scheduler?startDate=${generateDate.value}&numberOfPeople=${persons.length}&numberOfWeeks=${generateWeeks.value}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.status);
        })
        .then(data => {
            creator.line.style.display = "none"; 
            generateBox.style.display = "none";
            body.removeChild(table);
            tabler.parseData(data, new Date(generateDate.value));
            tabler.tables.forEach(t => body.appendChild(t));
            body.appendChild(tabler.result);
        })
});

const saved = localStorage.getItem("persons");
if (saved != null) {
    JSON.parse(saved).forEach(p => {
        creator.addPerson(p.name, p.color);
    });
}