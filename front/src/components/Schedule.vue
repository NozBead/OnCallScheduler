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
            <th v-for="day in month.days">{{ days[day.getDay()] }} {{ day.getDate() }}</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="week in month.weeks">
            <td
              v-if="7 - week.overlap.missing - calcWeekEndSize(week.overlap) != 0"
              :colspan="7 - week.overlap.missing - calcWeekEndSize(week.overlap)"
            >
              <div class="employee-schedule">
                <EmployeeChip v-if="week.week" :index="0" :editable="false" :employee="week.week" />
              </div>
            </td>
            <td v-if="calcWeekEndSize(week.overlap) != 0" :colspan="calcWeekEndSize(week.overlap)">
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
        </tbody>
      </table>
    </template>
  </div>
</template>

<style scoped>
#tables {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: start;
}

td > div {
  display: flex;
  justify-content: center;
}

th {
  padding: 0.5rem;
  background-color: rgb(20, 165, 117);
}

.employee-schedule {
  display: flex;
  flex-direction: column;
}
</style>
