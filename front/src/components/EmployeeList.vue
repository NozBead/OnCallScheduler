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
</script>

<template>
  <div id="list">
    <span>({{ employees.length }})</span>
    <ul>
      <li v-for="(employee, index) in employees">
        <EmployeeChip
          @delete="(toDelete) => emit('delete', toDelete)"
          @change="(toChange, newName) => emit('change', toChange, newName)"
          :stats="true"
          :employee="employee"
          :index="index"
          :editable="true"
        />
      </li>
    </ul>
    <div id="add" @click="emit('add')">+</div>
  </div>
</template>

<style scoped>
#list {
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-style: italic;
    font-size: 0.8rem;
    color: grey;
  }
}

ul {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  list-style: none;
  padding: 0;
  > * {
    margin: 0.5rem 0.5rem;
  }
}

#add {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  font-weight: bold;
  font-size: 2rem;
  width: 3rem;
  height: 3rem;
  box-shadow: 0 0 12px hsla(0, 0%, 0%, 0.5);
  background-color: var(--primary-color);
}

@media print {
  #add {
    display: none;
  }
}
</style>
