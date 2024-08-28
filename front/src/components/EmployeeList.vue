<script setup lang="ts">
import EmployeeCard from './EmployeeCard.vue'
import type { Employee } from '../models/Employee'
import {ref} from 'vue'

const employees = ref(new Array<Employee>())

function addEmployee() {
  let hue = 0
  const length = employees.value.length
  if (length > 0) {
    hue = employees.value[length - 1].color + 30
  }
  employees.value.push({name: "test", color: hue})
}
</script>

<template>
  <div>
    <li v-for="employee in employees">
      <EmployeeCard :employee="employee"></EmployeeCard>
    </li>
    <button @click="addEmployee">+</button>
  </div>
</template>

<style scoped></style>
