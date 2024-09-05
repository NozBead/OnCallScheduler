import type { Employee } from './Employee'
import type { OnCallSchedule } from './OnCallSchedule'

export interface Overlap {
  weekSize: number
  weekEndSize: number
}

export class ResolvedWeek {
  week: Employee
  weekend: Employee
  overlap: Overlap

  constructor(week: Employee, weekend: Employee, overlap: Overlap) {
    this.week = week
    this.weekend = weekend
    this.overlap = overlap
  }

  clone(): ResolvedWeek {
    return new ResolvedWeek(this.week, this.weekend, {
      weekSize: this.overlap.weekSize,
      weekEndSize: this.overlap.weekEndSize
    })
  }
}

export class ResolvedMonth {
  weeks: Array<ResolvedWeek>
  date: Date
  days: Array<Date>

  constructor(startDate: Date) {
    this.weeks = new Array<ResolvedWeek>()
    this.date = new Date(startDate)
    this.days = new Array<Date>()
  }
}

export function resolve(
  date: Date,
  schedule: OnCallSchedule,
  employees: Array<Employee>
): Array<ResolvedMonth> {
  const resolved = new Array<ResolvedMonth>()
  const startDate = new Date(date)

  let currentMonth = new ResolvedMonth(startDate)

  for (let i = 0; i < schedule.weeksSchedule.length; i++) {
    const newWeek = new ResolvedWeek(
      employees[schedule.weeksSchedule[i]],
      employees[schedule.weekEndsSchedule[i]],
      {
        weekSize: 5,
        weekEndSize: 2
      }
    )
    for (let j = 0; j < 7; j++) {
      if (currentMonth.date.getMonth() != startDate.getMonth()) {
        resolved.push(currentMonth)
        if (j <= 6) {
          let weekEndSize = j - 5
          weekEndSize = weekEndSize < 0 ? 0 : weekEndSize
          newWeek.overlap.weekSize = j - weekEndSize
          newWeek.overlap.weekEndSize = weekEndSize

          currentMonth.weeks.push(newWeek.clone())

          newWeek.overlap.weekSize = 5 - newWeek.overlap.weekSize
          newWeek.overlap.weekEndSize = 2 - newWeek.overlap.weekEndSize
        }
        currentMonth = new ResolvedMonth(startDate)
      }
      currentMonth.days.push(new Date(startDate))
      startDate.setDate(startDate.getDate() + 1)
    }

    currentMonth.weeks.push(newWeek)

    if (i == schedule.weeksSchedule.length - 1) {
      resolved.push(currentMonth)
    }
  }
  return resolved
}
