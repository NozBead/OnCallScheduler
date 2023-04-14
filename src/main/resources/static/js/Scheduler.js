import {ScheduleTabler} from "./ScheduleTabler.js";
import {PersonCreator} from "./PersonCreator.js";

const persons = [];
const tabler = new ScheduleTabler(persons);
const creator = new PersonCreator(persons);

const tableBody = document.querySelector("tbody");
tableBody.appendChild(creator.line);
const tableHeader = document.querySelector("thead");
tableHeader.appendChild(tabler.monthLine);
tableHeader.appendChild(tabler.daysLabelsLine);
tableHeader.appendChild(tabler.daysNumbersLine);

const generateBox = document.querySelector("#generateBox");
const generateDate = generateBox.querySelector('input[type="date"]');
const generateWeeks = generateBox.querySelector('input[type="number"]');
generateBox.querySelector("button").addEventListener("click", e => {
    fetch(`/scheduler?startDate=${generateDate.value}&numberOfPeople=${persons.length}&numberOfWeeks=${generateWeeks.value}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.status);
        })
        .then(data => {
            tabler.tableSchedule(data, new Date(generateDate.value))
            creator.line.style.display = "none"; 
            generateBox.style.display = "none";
        })
});