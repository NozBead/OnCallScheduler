<script setup lang="ts">
import EmployeeList from './components/EmployeeList.vue'
import Schedule from './components/Schedule.vue'
import type { Employee } from './models/Employee'
import type { OnCallSchedule } from './models/OnCallSchedule'
import { ref, watch } from 'vue'

const employees = ref(new Array<Employee>())
let freeColorIndexes = new Array<number>()
const schedule = ref<OnCallSchedule>()

const savedSchedule = localStorage.getItem('schedule')
const savedEmployees = localStorage.getItem('employees')
const savedFreeColorIndexes = localStorage.getItem('freeColorIndexes')
if (savedEmployees) {
  employees.value = JSON.parse(savedEmployees)
}
if (savedFreeColorIndexes) {
  freeColorIndexes = JSON.parse(savedFreeColorIndexes)
}
if (savedSchedule) {
  schedule.value = JSON.parse(savedSchedule)
}

watch(
  employees,
  async (newEmployee) => {
    localStorage.setItem('employees', JSON.stringify(newEmployee))
    localStorage.setItem('freeColorIndexes', JSON.stringify(freeColorIndexes))
    schedule.value = undefined
  },
  {
    immediate: true,
    deep: true
  }
)

function addEmployee() {
  let colorIndex = employees.value.length
  const lastFree = freeColorIndexes.pop()
  if (lastFree != undefined) {
    colorIndex = lastFree
  }
  employees.value.push({
    name: 'test',
    colorIndex: colorIndex
  })
}

function deleteEmployee(toDelete: Employee) {
  freeColorIndexes.push(toDelete.colorIndex)
  employees.value = employees.value.filter((e) => e != toDelete)
}

async function generateSchedule() {
  const result = await fetch(`http://funetdelire.fr:8082/schedule?startDate=2024-08-05&numberOfPeople=${employees.value.length}&numberOfWeeks=52`)
  if (result.ok) {
    schedule.value = await result.json()
  }
}
</script>

<template>
  <main>
    <EmployeeList @add="addEmployee" @delete="deleteEmployee" :employees="employees" />
    <Schedule v-if="schedule" :employees="employees" :schedule="schedule" />
    <button @click="generateSchedule">Générer</button>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: row;
}
</style>
