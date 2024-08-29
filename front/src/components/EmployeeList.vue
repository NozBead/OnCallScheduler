<script setup lang="ts">
import EmployeeChip from './EmployeeChip.vue'
import type { Employee } from '../models/Employee'

const props = defineProps<{
  employees: Array<Employee>
}>()
const emit = defineEmits<{
  delete: [toDelete: number]
  add: []
  change: [toChange: number, newName: string]
}>()

function changeEmployee(employee: number, newName: string) {
  emit('change', employee, newName)
}

function deleteEmployee(employee: number) {
  emit('delete', employee)
}
</script>

<template>
  <div>
    <ul>
      <li v-for="(employee, index) in props.employees">
        <EmployeeChip
          @delete="deleteEmployee"
          @change="changeEmployee"
          :employee="employee"
          :index="index"
          :editable="true"
        />
      </li>
    </ul>
    <button @click="$emit('add')">+</button>
  </div>
</template>

<style scoped>
ul {
  display: flex;
  list-style: none;
  padding: 0;
  > * {
    margin: 0.5em 0.5em;
  }
}
</style>
