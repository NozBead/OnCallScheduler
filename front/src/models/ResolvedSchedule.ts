import type { Employee } from './Employee'
import type { OnCallSchedule } from './OnCallSchedule'

export enum OverlapSide {
  LEFT,
  RIGHT
}

export interface Overlap {
  missing: number
  side: OverlapSide
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

  let overlap = 0
  for (let i = 0; i < schedule.weeksSchedule.length; i++) {
    for (let j = 0; j < 7; j++) {
      if (currentMonth.date.getMonth() != startDate.getMonth()) {
        resolved.push(currentMonth)
        if (j <= 6) {
          currentMonth.weeks.push({
            week: employees[schedule.weeksSchedule[i]],
            weekend: employees[schedule.weekEndsSchedule[i]],
            overlap: {
              missing: 7 - j,
              side: OverlapSide.LEFT
            }
          })

          overlap = j
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
      overlap: {
        missing: overlap,
        side: overlap == 0 ? OverlapSide.LEFT : OverlapSide.RIGHT
      }
    })
    overlap = 0
  }
  return resolved
}
