<script setup lang="ts">
import EmployeeCard from './EmployeeCard.vue'
import type { Employee } from '../models/Employee'
import {ref, watch} from 'vue'

let freeColorIndexes = new Array<number>()
const employees = ref(new Set<Employee>())

const savedEmployees = localStorage.getItem("employees")
const savedFreeColorIndexes = localStorage.getItem("freeColorIndexes")
if (savedEmployees && savedFreeColorIndexes) {
  employees.value = new Set<Employee>(JSON.parse(savedEmployees))
  freeColorIndexes = JSON.parse(savedFreeColorIndexes)
}

watch(employees, async (newEmployee) => {
  localStorage.setItem("employees", JSON.stringify(Array.from(newEmployee)))
  localStorage.setItem("freeColorIndexes", JSON.stringify(freeColorIndexes))
  },
  { 
    immediate: true, 
    deep: true 
  }
)

function addEmployee() {
  let colorIndex = employees.value.size
  const lastFree = freeColorIndexes.pop()
  if (lastFree != undefined) {
    colorIndex = lastFree
  }
  employees.value.add({
    name: "test", 
    colorIndex: colorIndex
  })
}

function deleteEmployee(toDelete: Employee) {
  freeColorIndexes.push(toDelete.colorIndex)
  employees.value.delete(toDelete)
}
</script>

<template>
  <div>
    <li v-for="employee in employees">
      <EmployeeCard @delete="deleteEmployee" :employee="employee"></EmployeeCard>
    </li>
    <button @click="addEmployee">+</button>
  </div>
</template>

<style scoped></style>
