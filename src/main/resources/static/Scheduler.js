const data = {"weeksSchedule":[7,9,8,5,4,1,0,3,8,6,5,7,1,4,10,5,7,6,0,1,8,4,6,10,8,5,1,3,10,6,4,6,10,1,0,3,7,2,1,10,4,6,8,7,6,2,5,1,3,5,0,9],"weekEndsSchedule":[2,6,3,0,10,7,2,5,9,2,3,10,0,2,8,3,9,5,3,2,10,2,9,3,7,0,7,2,9,8,9,7,2,5,8,4,6,9,5,0,2,3,9,0,10,4,9,8,7,2,4,6],"weeksDate":["2023-01-09","2023-01-16","2023-01-23","2023-01-30","2023-02-06","2023-02-13","2023-02-20","2023-02-27","2023-03-06","2023-03-13","2023-03-20","2023-03-27","2023-04-03","2023-04-10","2023-04-17","2023-04-24","2023-05-01","2023-05-08","2023-05-15","2023-05-22","2023-05-29","2023-06-05","2023-06-12","2023-06-19","2023-06-26","2023-07-03","2023-07-10","2023-07-17","2023-07-24","2023-07-31","2023-08-07","2023-08-14","2023-08-21","2023-08-28","2023-09-04","2023-09-11","2023-09-18","2023-09-25","2023-10-02","2023-10-09","2023-10-16","2023-10-23","2023-10-30","2023-11-06","2023-11-13","2023-11-20","2023-11-27","2023-12-04","2023-12-11","2023-12-18","2023-12-25","2024-01-01"]}

const table = document.createElement("table");
const header = document.createElement("thead");

const daysLabel = document.createElement("tr");
daysLabel.appendChild(document.createElement("td"))
const daysNumber = document.createElement("tr");
daysNumber.appendChild(document.createElement("td"))

table.appendChild(header);
header.appendChild(daysLabel);
header.appendChild(daysNumber);

const numberOfPeople = 11;
const peopleLines = [];
const peopleColors = [];

for (let i = 0 ; i < numberOfPeople ; i++) {
    const line = document.createElement("tr");
    table.appendChild(line);
    line.appendChild(document.createElement("td"))
    peopleLines.push(line);
}
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

        for (let k = 0 ; k < numberOfPeople ; k++) {
            const element = document.createElement("td");
            peopleLines[k].appendChild(element);

            if (k == data.weeksSchedule[i] && j < 5) {
                element.setAttribute("class", "off");
            }
            else if (k == data.weekEndsSchedule[i] && j >= 4) {
                element.setAttribute("class", "off");
            }
            else if (j >= 5) {
                element.setAttribute("class", "off");
            }
        }
    }
}

document.body.appendChild(table);