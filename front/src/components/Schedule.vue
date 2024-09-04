<script setup lang="ts">
import type { OnCallSchedule } from '../models/OnCallSchedule'
import type { Employee } from '../models/Employee'
import { resolve } from '../models/ResolvedSchedule'
import EmployeeChip from './EmployeeChip.vue'
import { computed, h } from 'vue'

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
          <tr id="weekdays">
            <template v-for="(week, index) in month.weeks">
              <td v-if="week.overlap.weekSize != 0" :colspan="week.overlap.weekSize">
                <div class="employee-schedule">
                  <EmployeeChip
                    v-if="week.week"
                    :stats="false"
                    :index="0"
                    :editable="false"
                    :employee="week.week"
                  />
                </div>
              </td>
              <td v-if="week.overlap.weekEndSize != 0" :colspan="week.overlap.weekEndSize"></td>
            </template>
          </tr>
          <tr id="weekend">
            <template v-for="(week, index) in month.weeks">
              <td
                v-if="week.overlap.weekSize - (index == 0 ? 1 : 2) > 0"
                :colspan="week.overlap.weekSize - (index == 0 ? 1 : 2)"
              ></td>
              <td
                :bite="week.overlap.weekEndSize"
                v-if="week.overlap.weekEndSize != 0"
                :colspan="week.overlap.weekEndSize + (week.overlap.weekSize == 0 ? 1 : 2)"
              >
                <div class="employee-schedule">
                  <EmployeeChip
                    v-if="week.weekend"
                    :stats="false"
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
  margin: 2rem 2rem;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

table {
  page-break-inside: avoid;
  border-collapse: collapse;
  padding: 0 0.2rem;
  border-radius: 10px;
  margin: -1.5rem 0;
}

td > div {
  display: flex;
  justify-content: center;
}

th {
  padding: 0.2rem 1rem;
}

td {
  padding: 0 0.2rem;
}

th,
td {
  background-color: var(--primary-color);
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
  height: 5.5rem;
}

#weekdays,
#weekend {
  position: relative;

  td {
    border: none;
    background-color: unset;
  }
}

#weekdays {
  top: -5rem;
}

#weekend {
  top: -4.7rem;
}
</style>
