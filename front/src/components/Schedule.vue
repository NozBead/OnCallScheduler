<script setup lang="ts">
import type { OnCallSchedule } from '../models/OnCallSchedule'
import type { Employee } from '../models/Employee'
import type { ResolvedSchedule } from '../models/ResolvedSchedule'
import EmployeeChip from './EmployeeChip.vue'
import { computed } from 'vue'

const props = defineProps<{
  schedule: OnCallSchedule
  employees: Array<Employee>
}>()

const resolvedSchedule = computed(() => {
  const resolved = new Array<ResolvedSchedule>()
  for (let i = 0; i < props.schedule.weeksSchedule.length; i++) {
    resolved.push({
      week: props.employees[props.schedule.weeksSchedule[i]],
      weekend: props.employees[props.schedule.weekEndsSchedule[i]]
    })
  }
  return resolved
})
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Semaine</th>
        <th>Jours de semaine</th>
        <th>Weekend</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(week, index) in resolvedSchedule">
        <th id="">{{ index }}</th>
        <td>
          <div>
            <EmployeeChip :employee="week.week" :index="0" :editable="false" />
          </div>
        </td>
        <td>
          <div>
            <EmployeeChip :employee="week.weekend" :index="0" :editable="false" />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
td > div {
  display: flex;
  justify-content: center;
}

th {
  padding: 1em;
  color: rgb(243, 243, 243);
  background-color: rgb(20, 165, 117);
}
</style>
