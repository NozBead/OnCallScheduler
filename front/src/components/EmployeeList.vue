<script setup lang="ts">
import EmployeeCard from './EmployeeCard.vue'
import type { Employee } from '../models/Employee'

const props = defineProps<{
  employees: Array<Employee>
}>()
const emit = defineEmits<{
  delete: [toDelete: Employee]
  add: []
}>()
</script>

<template>
  <div>
    <li v-for="employee in props.employees">
      <EmployeeCard @delete="$emit('delete', employee)" :employee="employee"></EmployeeCard>
    </li>
    <button @click="$emit('add')">+</button>
  </div>
</template>

<style scoped></style>
