<script setup lang="ts">
import type { OnCallSchedule } from '../models/OnCallSchedule'
import type { Employee } from '../models/Employee'
import { OverlapSide, type Overlap } from '../models/ResolvedSchedule'
import { resolve } from '../models/ResolvedSchedule'
import EmployeeChip from './EmployeeChip.vue'
import { computed } from 'vue'

const props = defineProps<{
  schedule: OnCallSchedule
  employees: Array<Employee>
  date: Date
}>()

const days = ['D', 'L', 'M', 'Me', 'J', 'V', 'S']
const months = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre'
]

function calcWeekEndSize(overlap: Overlap) {
  if (overlap.side == OverlapSide.LEFT) {
    if (overlap.missing < 3) {
      return 2 - overlap.missing
    }
  } else if (overlap.side == OverlapSide.RIGHT) {
    if (overlap.missing <= 5) {
      return 2
    } else if (overlap.missing == 6) {
      return 1
    }
  }
  return 0
}
const resolvedSchedule = computed(() => resolve(props.date, props.schedule, props.employees))
</script>

<template>
  <div id="tables">
    <template v-for="month in resolvedSchedule">
      <table>
        <thead>
          <tr>
            <th :colspan="month.days.length">
              {{ months[month.date.getMonth()] }} {{ month.date.getFullYear() }}
            </th>
          </tr>
          <tr>
            <th
              v-for="day in month.days"
              :class="day.getDay() == 0 || day.getDay() == 6 ? 'greyed' : ''"
            >
              {{ days[day.getDay()] }}
            </th>
          </tr>
          <tr>
            <th
              :class="day.getDay() == 0 || day.getDay() == 6 ? 'greyed' : ''"
              v-for="day in month.days"
            >
              {{ day.getDate() }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr id="days-back">
            <td v-for="day in month.days"></td>
          </tr>
          <tr id="days">
            <template v-for="week in month.weeks">
              <td
                v-if="7 - week.overlap.missing - calcWeekEndSize(week.overlap) != 0"
                :colspan="7 - week.overlap.missing - calcWeekEndSize(week.overlap)"
              >
                <div class="employee-schedule">
                  <EmployeeChip
                    v-if="week.week"
                    :index="0"
                    :editable="false"
                    :employee="week.week"
                  />
                </div>
              </td>
              <td
                v-if="calcWeekEndSize(week.overlap) != 0"
                :colspan="calcWeekEndSize(week.overlap)"
              >
                <div class="employee-schedule">
                  <EmployeeChip
                    v-if="week.weekend"
                    :index="0"
                    :editable="false"
                    :employee="week.weekend"
                  />
                </div>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>

<style scoped>
#tables {
  margin: 0 2rem;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

table {
  border-collapse: collapse;
  padding: 0 0.2rem;
  border-radius: 10px;
}

td > div {
  display: flex;
  justify-content: center;
}

th,
td {
  background-color: var(--primary-color);
  padding: 0.3rem;
  border: solid 1px hsla(0, 0%, 100%, 0.35);
}

.greyed {
  background-color: var(--accent-color);
}

.employee-schedule {
  display: flex;
  flex-direction: column;
}

#days-back {
  height: 3rem;
}

#days {
  position: relative;
  top: -2.8em;
  td {
    border: none;
    background-color: unset;
  }
}
</style>
