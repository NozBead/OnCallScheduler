import {ScheduleTabler} from "./ScheduleTabler.js";
import {PersonCreator} from "./PersonCreator.js";

const persons = [];
const tabler = new ScheduleTabler(persons);
const creator = new PersonCreator(persons);

const tableBody = document.createElement("tbody");
const table = tabler.createTable(tableBody);
const body = document.querySelector("body");
body.appendChild(table);
tableBody.appendChild(creator.line);

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
            tabler.tableSchedule(data, new Date(generateDate.value))
                .forEach(t => body.appendChild(t));
        })
});

const saved = localStorage.getItem("persons");
if (saved != null) {
    JSON.parse(saved).forEach(p => {
        creator.addPerson(p.name, p.color);
    });
}