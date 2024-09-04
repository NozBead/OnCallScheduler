import type { Employee } from './Employee'
import type { OnCallSchedule } from './OnCallSchedule'

export interface Overlap {
  weekSize: number
  weekEndSize: number
}

export interface ResolvedWeek {
  week: Employee | undefined
  weekend: Employee | undefined
  overlap: Overlap
}

export interface ResolvedMonth {
  weeks: Array<ResolvedWeek>
  date: Date
  days: Array<Date>
}

export function resolve(
  date: Date,
  schedule: OnCallSchedule,
  employees: Array<Employee>
): Array<ResolvedMonth> {
  const resolved = new Array<ResolvedMonth>()
  const startDate = new Date(date)

  let currentMonth = {
    weeks: new Array<ResolvedWeek>(),
    date: new Date(startDate),
    days: new Array<Date>()
  }

  let overlap = {
    weekSize: 5,
    weekEndSize: 2
  }
  for (let i = 0; i < schedule.weeksSchedule.length; i++) {
    for (let j = 0; j < 7; j++) {
      if (currentMonth.date.getMonth() != startDate.getMonth()) {
        resolved.push(currentMonth)
        if (j <= 6) {
          let weekEndSize = j - 5
          weekEndSize = weekEndSize < 0 ? 0 : weekEndSize
          const newWeek = {
            week: employees[schedule.weeksSchedule[i]],
            weekend: employees[schedule.weekEndsSchedule[i]],
            overlap: {
              weekSize: j - weekEndSize,
              weekEndSize: weekEndSize
            }
          }
          overlap.weekSize = 5 - newWeek.overlap.weekSize
          overlap.weekEndSize = 2 - newWeek.overlap.weekEndSize
          currentMonth.weeks.push(newWeek)
        }
        currentMonth = {
          weeks: new Array<ResolvedWeek>(),
          date: new Date(startDate),
          days: new Array<Date>()
        }
      }
      currentMonth.days.push(new Date(startDate))
      startDate.setDate(startDate.getDate() + 1)
    }

    currentMonth.weeks.push({
      week: employees[schedule.weeksSchedule[i]],
      weekend: employees[schedule.weekEndsSchedule[i]],
      overlap: overlap
    })
    overlap = {
      weekSize: 5,
      weekEndSize: 2
    }
  }
  return resolved
}
