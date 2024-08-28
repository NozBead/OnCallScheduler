<script setup lang="ts">
import type { Employee } from '../models/Employee'
const props = defineProps<{
  employee: Employee
}>()

const saturationIndex = Math.floor(props.employee.color / 360) + 1
const saturation = (saturationIndex) * 50
</script>

<template>
  <div>
    {{ employee.name }}
  </div>
</template>

<style scoped>
div {
  background-color: hsl(v-bind(employee.color) v-bind(saturation) 60%);
}
</style>
