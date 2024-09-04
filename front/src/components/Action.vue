<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{
  date: Date
  weekNumber: Number
}>()

const emit = defineEmits<{
  changeDate: [newDate: Date]
  changeWeekNumber: [newWeekNumber: number]
  generate: []
}>()

const datePicker = ref()
const weekStepper = ref()
</script>

<template>
  <div id="actions">
    <button @click="emit('generate')">Générer</button>
    <input
      type="date"
      ref="datePicker"
      :value="date.toISOString().substring(0, 10)"
      step="7"
      @change="() => emit('changeDate', new Date(datePicker.value))"
    />
    <input
      :value="weekNumber"
      ref="weekStepper"
      type="number"
      min="0"
      max="104"
      step="1"
      @input="() => emit('changeWeekNumber', weekStepper.value)"
    />
  </div>
</template>

<style scoped>
#actions {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  > * {
    margin: 1rem;
  }
}

button,
input {
  cursor: pointer;
  background-color: var(--primary-color);
  box-shadow: 0 0 12px hsla(0, 0%, 0%, 0.5);
  border-radius: 10px;
  color: white;
  padding: 1rem;
  border: none;
}
</style>
