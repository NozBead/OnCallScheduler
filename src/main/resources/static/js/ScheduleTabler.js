export class ScheduleTabler {
    daysLabels = ["D","L","M","Me","J","V","S"];
    monthsLabels = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];

    constructor(persons) {
        this.persons = persons;
    }

    createTable() {
        const table = document.createElement("table");
        table.appendChild(this.createHeader());
        const emptySpace = document.createElement("td");
        emptySpace.setAttribute("rowspan", "3");
        this.monthLine.appendChild(emptySpace);
        table.appendChild(this.names);
        return table;
    }

    createResult(nbDays, nbWeekEnds) {
        this.initTable();
        const table = document.createElement("table");
        const header = document.createElement("thead");
        const nbDaysElement = document.createElement("td");
        nbDaysElement.innerHTML = "Jours d'astreinte";
        const nbWeekEndsElement = document.createElement("td");
        nbWeekEndsElement.innerHTML = "Weekends d'astreinte";
        const emptySpace = document.createElement("td");
        header.appendChild(emptySpace);
        header.appendChild(nbDaysElement);
        header.appendChild(nbWeekEndsElement);
        table.appendChild(header);
        table.appendChild(this.names);
        const lines = this.names.querySelectorAll("tr");
        for (let i = 0 ; i < lines.length ; i++) {
            const nbDaysCell = document.createElement("td");
            nbDaysCell.innerHTML = nbDays[i];
            const nbWeekEndsCell = document.createElement("td");
            nbWeekEndsCell.innerHTML = nbWeekEnds[i];
            lines[i].appendChild(nbDaysCell);
            lines[i].appendChild(nbWeekEndsCell);
        }
        return table;
    }

    createHeader() {
        this.monthLine = document.createElement("tr");
        this.daysLabelsLine = document.createElement("tr");
        this.daysNumbersLine = document.createElement("tr");
        const header = document.createElement("thead");
        header.appendChild(this.monthLine);
        header.appendChild(this.daysLabelsLine);
        header.appendChild(this.daysNumbersLine);
        return header;
    }

    addPersonDay(k, className) {
        const element = document.createElement("td");
        this.lines[k].appendChild(element);
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

    initTable() {
        this.lines = this.names.querySelectorAll("tr");
        this.names = this.names.cloneNode(true);
    }

    splitTable() {
        const table = this.createTable();
        this.tables.push(table);
        this.initTable();
    }

    parseData(data, startDate) {
        this.tables = [];
        this.splitTable();
        const nbDays = new Array(this.persons.length);
        nbDays.fill(0);
        const nbWeekEnds = new Array(this.persons.length);
        nbWeekEnds.fill(0);


        let currentMonth = startDate.getMonth();
        let month = 0;
        this.addMonthHeader(startDate);
        for (let i = 0 ; i < data.weekEndsSchedule.length ; i++) {
            const weekPerson = data.weeksSchedule[i];
            const weekEndPerson = data.weekEndsSchedule[i];
            nbDays[weekPerson] += 5;
            nbDays[weekEndPerson] += 4;
            nbWeekEnds[weekEndPerson]++;
            for (let j = 0 ; j < 7 ; j++) {
                let off = j >= 5;

                const newMonth = startDate.getMonth();
                if (currentMonth != newMonth) {
                    currentMonth = newMonth;
                    month++;
                    if (month != 0 && month % 2 == 0) {
                        this.splitTable();
                    }
                    this.addMonthHeader(startDate);
                }

                this.addDayHeader(startDate);
                for (let k = 0 ; k < this.persons.length ; k++) {
                    let className = "";
                    const p = this.persons[k];
                    if (k == weekPerson && j < 5) {
                        className = p.className;
                    }
                    else if (k == weekEndPerson && j >= 4) {
                        className = p.className;
                    }
                    else if (off) {
                        className = "off";
                    }
                    this.addPersonDay(k, className);
                }

                startDate.setDate(startDate.getDate() + 1);
            }
        }
        this.result = this.createResult(nbDays, nbWeekEnds);
    }
}