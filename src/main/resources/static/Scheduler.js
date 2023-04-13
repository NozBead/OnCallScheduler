const table = document.querySelector("table");
const tableBody = table.querySelector("tbody");
const header = document.querySelector("thead");

const daysLabel = document.createElement("tr");
daysLabel.appendChild(document.createElement("td"))
const daysNumber = document.createElement("tr");
daysNumber.appendChild(document.createElement("td"))
header.appendChild(daysLabel);
header.appendChild(daysNumber);


table.appendChild(header);

const peopleLines = [];
const peopleColors = [];
const peopleNames = [];
let addLine = document.querySelector("#addLine")
let addBoxParent = addLine.querySelector("td");
const addBox = addBoxParent.querySelector("div");
const addName = addBox.querySelector('input[type="text"]');
const addColor = addBox.querySelector('input[type="color"]');

const generateBox = document.querySelector("#generateBox");
const generateDate = generateBox.querySelector("input");

const style = document.querySelector("style");
addBox.querySelector("button").addEventListener("click", e => {
    peopleLines.push(addLine);
    peopleColors.push(addColor.value);
    peopleNames.push(addName.value);
    addBoxParent.removeChild(addBox);
    addBoxParent.setAttribute("class", addName.value);
    addBoxParent.innerHTML = addName.value;
    addLine = document.createElement("tr");
    addBoxParent = document.createElement("td");
    tableBody.appendChild(addLine);
    addLine.appendChild(addBoxParent);
    addBoxParent.appendChild(addBox);
    style.innerHTML += `.${addName.value}{
        color: white;
        background-color: ${addColor.value};
    }`;
});

generateBox.querySelector("button").addEventListener("click", e => {
    fetch(`/scheduler?startDate=${generateDate.value}&numberOfPeople=${peopleColors.length}`)
    .then(response => 
        response.json()
    )
    .then(data => {
        const labels = ["L","M","Me","J","V","S","D"];
        for (let i = 0 ; i < data.weekEndsSchedule.length ; i++) {
            const date = new Date(data.weeksDate[i]);
            for (let j = 0 ; j < 7 ; j++) {
                const number = document.createElement("td");
                number.innerHTML = date.getDate();
                date.setDate(date.getDate() + 1);
                daysNumber.appendChild(number);
        
                const label = document.createElement("td");
                label.innerHTML = labels[j];
                daysLabel.appendChild(label);
        
                if (j == 5 || j == 6) {
                    label.setAttribute("class", "off");
                    number.setAttribute("class", "off");
                }
        
                for (let k = 0 ; k < peopleNames.length ; k++) {
                    const element = document.createElement("td");
                    peopleLines[k].appendChild(element);
        
                    if (k == data.weeksSchedule[i] && j < 5) {
                        element.setAttribute("class", peopleNames[k]);
                    }
                    else if (k == data.weekEndsSchedule[i] && j >= 4) {
                        element.setAttribute("class", peopleNames[k]);
                    }
                    else if (j >= 5) {
                        element.setAttribute("class", "off");
                    }
                }
            }
        }
    });
})



document.body.appendChild(table);