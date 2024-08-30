<script setup lang="ts">
import EmployeeList from './components/EmployeeList.vue'
import Schedule from './components/Schedule.vue'
import { EmployeeCollection } from './models/EmployeeCollection'
import type { OnCallSchedule } from './models/OnCallSchedule'
import { ref, watch, computed } from 'vue'

const employees = ref(new EmployeeCollection())
const employeesLength = computed(() => employees.value.length())
const schedule = ref<OnCallSchedule>()

const date = new Date()
date.setDate(date.getDate() - (date.getDay() - 1) + 7)

const savedSchedule = localStorage.getItem('schedule')
const savedEmployees = localStorage.getItem('employees')
if (savedEmployees) {
  const collection = new EmployeeCollection()
  const saved = JSON.parse(savedEmployees)
  Object.assign(collection, saved)
  employees.value = collection
}
if (savedSchedule) {
  schedule.value = JSON.parse(savedSchedule)
}

watch(
  employees,
  async (newEmployee) => {
    localStorage.setItem('employees', JSON.stringify(newEmployee))
  },
  {
    deep: true
  }
)

watch(employeesLength, async () => {
  schedule.value = undefined
})

watch(schedule, async (newSchedule) => {
  if (newSchedule != undefined) {
    localStorage.setItem('schedule', JSON.stringify(newSchedule))
    employees.value.fillDays(newSchedule)
  } else {
    localStorage.removeItem('schedule')
    employees.value.resetDays()
  }
})

async function generateSchedule() {
  const result = await fetch(
    `http://localhost:8080/scheduler?startDate=${date.toISOString().substring(0, 10)}&numberOfPeople=${employees.value.length()}&numberOfWeeks=52`
  )
  if (result.ok) {
    schedule.value = await result.json()
  }
}

function addEmployee() {
  employees.value.add()
}
function deleteEmployee(toDelete: number) {
  employees.value.delete(toDelete)
}
function changeEmployee(toChange: number, newName: string) {
  employees.value.update(toChange, newName)
}
</script>

<template>
  <main>
    <div id="list">
      <EmployeeList
        @add="addEmployee"
        @delete="deleteEmployee"
        @change="changeEmployee"
        :employees="employees.employees"
      />
    </div>
    <div id="actions">
      <button @click="generateSchedule">Générer</button>
      <input type="date" :value="date.toISOString().substring(0, 10)" step="7" />
    </div>
    <div id="schedule">
      <Schedule v-if="schedule" :employees="employees.employees" :schedule="schedule" />
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: start;
  > * {
    margin: 0 2rem;
  }
}

#actions {
  display: flex;
  justify-content: center;
  padding: 1rem;
}
</style>
