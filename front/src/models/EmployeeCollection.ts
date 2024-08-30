import type { Employee } from './Employee'
import type { OnCallSchedule } from './OnCallSchedule'

export class EmployeeCollection {
  employees: Array<Employee> = new Array()
  freeColorIndexes: Array<number> = new Array()

  constructor() {}

  length() {
    return this.employees.length
  }

  add() {
    let colorIndex = this.employees.length
    const lastFree = this.freeColorIndexes.pop()
    if (lastFree != undefined) {
      colorIndex = lastFree
    }
    this.employees.push({
      name: 'Nouvelle',
      colorIndex: colorIndex,
      daysOnCall: 0,
      weekendsOnCall: 0
    })
  }

  delete(index: number) {
    this.freeColorIndexes.push(this.employees[index].colorIndex)
    this.employees.splice(index, 1)
  }

  update(index: number, newName: string) {
    this.employees[index].name = newName
  }

  resetDays() {
    for (let i = 0; i < this.employees.length; i++) {
      this.employees[i].daysOnCall = 0
      this.employees[i].weekendsOnCall = 0
    }
  }

  fillDays(schedule: OnCallSchedule) {
    const totalDays = new Array<number>(this.employees.length)
    const totalWeekends = new Array<number>(this.employees.length)
    totalDays.fill(0)
    totalWeekends.fill(0)
    for (let i = 0; i < schedule.weekEndsSchedule.length; i++) {
      totalDays[schedule.weekEndsSchedule[i]] += 4
      totalDays[schedule.weeksSchedule[i]] += 5
      totalWeekends[schedule.weekEndsSchedule[i]]++
    }
    for (let i = 0; i < this.employees.length; i++) {
      this.employees[i].daysOnCall = totalDays[i]
      this.employees[i].weekendsOnCall = totalWeekends[i]
    }
  }
}
