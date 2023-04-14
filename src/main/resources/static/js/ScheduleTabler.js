export class ScheduleTabler {
    monthLine = document.createElement("tr");
    daysLabelsLine = document.createElement("tr");
    daysNumbersLine = document.createElement("tr");
    daysLabels = ["D","L","M","Me","J","V","S"];
    monthsLabels = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet", "Août", "Septembte", "Novembre", "Décembre"];

    constructor(persons) {
        this.persons = persons;
        const emptySpace = document.createElement("td");
        emptySpace.setAttribute("rowspan", "3");
        this.monthLine.appendChild(emptySpace);
    }

    addPersonDay(person, className) {
        const element = document.createElement("td");
        person.line.appendChild(element);
        element.setAttribute("class", className);
    }

    addDayHeader(date) {
        const numberElement = document.createElement("td");
        numberElement.innerHTML = date.getDate();
        this.daysNumbersLine.appendChild(numberElement);

        const day = date.getDay();
        const labelElement = document.createElement("td");
        labelElement.innerHTML = this.daysLabels[day];
        this.daysLabelsLine.appendChild(labelElement);

        if (day == 0 || day == 6) {
            labelElement.setAttribute("class", "off");
            numberElement.setAttribute("class", "off");
        }
    }

    addMonthHeader(date) {
        const month = date.getMonth();
        const year = date.getFullYear();
        const next = new Date();
        next.setMonth(month + 1);
        next.setFullYear(year);
        next.setDate(-1);
        const monthElement = document.createElement("td");
        monthElement.innerHTML = `${this.monthsLabels[month]} ${year}`;
        monthElement.setAttribute("colspan", next.getDate() + 2 - date.getDate());
        this.monthLine.appendChild(monthElement);
    }

    tableSchedule(data, startDate) {
        let currentMonth = startDate.getMonth();
        this.addMonthHeader(startDate);
        for (let i = 0 ; i < data.weekEndsSchedule.length ; i++) {
            for (let j = 0 ; j < 7 ; j++) {
                let off = j >= 5;
                
                const newMonth = startDate.getMonth();
                if (currentMonth < newMonth) {
                    currentMonth = newMonth;
                    this.addMonthHeader(startDate);
                }

                this.addDayHeader(startDate);
                for (let k = 0 ; k < this.persons.length ; k++) {
                    let className = "";
                    const p = this.persons[k];
                    if (k == data.weeksSchedule[i] && j < 5) {
                        className = p.className;
                    }
                    else if (k == data.weekEndsSchedule[i] && j >= 4) {
                        className = p.className;
                    }
                    else if (off) {
                        className = "off";
                    }
                    this.addPersonDay(p, className);
                }

                startDate.setDate(startDate.getDate() + 1);
            }
        }
    }
}