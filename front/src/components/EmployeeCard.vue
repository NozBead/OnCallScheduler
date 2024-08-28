<script setup lang="ts">
import type { Employee } from '../models/Employee'
import { toCssColor } from '../models/Color'
import { computed } from 'vue'

const props = defineProps<{
  employee: Employee
}>()
const emit = defineEmits<{
  delete: [toDelete: Employee]
}>()

const color = computed(() => toCssColor(props.employee.colorIndex))
</script>

<template>
  <div>
    <h2>
      {{ employee.name }}
    </h2>
    <button @click="$emit('delete', employee)">Delete</button>
  </div>
</template>

<style scoped>
div {
  background-color: v-bind(color);
  display: flex;
  flex-direction: row;
}
</style>
