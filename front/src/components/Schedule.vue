<script setup lang="ts">
import type { OnCallSchedule } from '../models/OnCallSchedule'
import { toCssColor } from '../models/Color'
import type { Employee } from '../models/Employee'
import type { ResolvedSchedule } from '../models/ResolvedSchedule'
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
        <th>Lundi</th>
        <th>Mardi</th>
        <th>Mercredi</th>
        <th>Jeudi</th>
        <th>Vendredi</th>
        <th>Samedi</th>
        <th>Dimanche</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="week in resolvedSchedule">
        <td :style="{ backgroundColor: toCssColor(week.week.colorIndex) }" colspan="5">
          {{ week.week.name }}
        </td>
        <td :style="{ backgroundColor: toCssColor(week.weekend.colorIndex) }" colspan="2">
          {{ week.weekend.name }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
td {
  text-align: center;
  padding: 1em;
}
th {
  padding: 2em;
  color: rgb(243, 243, 243);
  background-color: rgb(20, 165, 117);
}
</style>
