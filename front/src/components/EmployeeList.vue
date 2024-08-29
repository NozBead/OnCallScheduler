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
    <ul>
      <li v-for="employee in props.employees">
        <EmployeeCard @delete="$emit('delete', employee)" :employee="employee"></EmployeeCard>
      </li>
    </ul>
    <button @click="$emit('add')">+</button>
  </div>
</template>

<style scoped>

ul {
  display: flex;
  flex-wrap: wrap;
  max-width: 40vw;
  list-style: none;
  padding: 0;
}
</style>
