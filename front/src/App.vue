<script setup lang="ts">
import EmployeeList from './components/EmployeeList.vue'
import Schedule from './components/Schedule.vue'
import Action from './components/Action.vue'
import { EmployeeCollection } from './models/EmployeeCollection'
import type { OnCallSchedule } from './models/OnCallSchedule'
import { ref, watch, computed } from 'vue'

const employees = ref(new EmployeeCollection())
const employeesLength = computed(() => employees.value.length())
const schedule = ref<OnCallSchedule>()

const date = ref(new Date())
date.value.setDate(date.value.getDate() - (date.value.getDay() - 1) + 7)

const savedDate = localStorage.getItem('date')
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
if (savedDate) {
  date.value = new Date(JSON.parse(savedDate))
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

watch(date, async () => {
  schedule.value = undefined
})

async function generateSchedule() {
  const result = await fetch(
    `http://localhost:8080/scheduler?startDate=${date.value.toISOString().substring(0, 10)}&numberOfPeople=${employees.value.length()}&numberOfWeeks=52`
  )
  if (result.ok) {
    schedule.value = await result.json()
    localStorage.setItem('date', JSON.stringify(date.value))
  }
}
</script>

<template>
  <main>
    <div id="control">
      <EmployeeList
        @add="() => employees.add()"
        @delete="(toDelete) => employees.delete(toDelete)"
        @change="(toChange, newName) => employees.update(toChange, newName)"
        :employees="employees.employees"
      />
      <Action @generate="generateSchedule" @change="(newDate) => (date = newDate)" :date="date" />
    </div>
    <Schedule v-if="schedule" :employees="employees.employees" :schedule="schedule" :date="date" />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#control {
  display: flex;
}

#list {
  margin: 0 1rem;
}

@media print {
  #actions {
    display: none;
  }
}
</style>
