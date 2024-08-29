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
  async (newEmployee, oldEmployee) => {
    localStorage.setItem('employees', JSON.stringify(newEmployee))
    localStorage.setItem('freeColorIndexes', JSON.stringify(freeColorIndexes))
    console.log(newEmployee, oldEmployee)
    if (newEmployee.length != oldEmployee.length) {
      schedule.value = undefined
    }
  }
)

watch(
  schedule,
  async (newSchedule) => {
    if(newSchedule != undefined) {
      localStorage.setItem('schedule', JSON.stringify(newSchedule))
      fillDays(newSchedule, employees.value)
    }
    else {
      localStorage.removeItem('schedule')
      resetDays(employees.value)
    }
  }
)

function resetDays(employees : Array<Employee>) {
  for (let i = 0 ; i < employees.length ; i++) {
    employees[i].daysOnCall = 0
    employees[i].weekendsOnCall = 0
  }
}

function fillDays(schedule : OnCallSchedule, employees : Array<Employee>) {
  const totalDays = new Array<number>(employees.length)
  const totalWeekends = new Array<number>(employees.length)
  totalDays.fill(0)
  totalWeekends.fill(0)
  for (let i = 0 ; i < schedule.weekEndsSchedule.length ; i++) {
    totalDays[schedule.weekEndsSchedule[i]] += 4
    totalDays[schedule.weeksSchedule[i]] += 5
    totalWeekends[schedule.weekEndsSchedule[i]]++
  }
  for (let i = 0 ; i < employees.length ; i++) {
    employees[i].daysOnCall = totalDays[i]
    employees[i].weekendsOnCall = totalWeekends[i]
  }
}

function addEmployee() {
  let colorIndex = employees.value.length
  const lastFree = freeColorIndexes.pop()
  if (lastFree != undefined) {
    colorIndex = lastFree
  }
  employees.value = employees.value.concat({
    name: 'test',
    colorIndex: colorIndex,
    daysOnCall: 0,
    weekendsOnCall: 0,
  })
}

function deleteEmployee(toDelete: Employee) {
  freeColorIndexes.push(toDelete.colorIndex)
  employees.value = employees.value.filter((e) => e != toDelete)
}

async function generateSchedule() {
  const result = await fetch(`http://localhost:8080/scheduler?startDate=2024-08-05&numberOfPeople=${employees.value.length}&numberOfWeeks=52`)
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
  align-items: start;
  > * {
    margin: 0 2em;
  }
}
</style>
