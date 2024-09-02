<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{
  date: Date
}>()

const emit = defineEmits<{
  change: [newDate: Date]
  generate: []
}>()

const datePicker = ref()
</script>

<template>
  <div id="actions">
    <button @click="emit('generate')">Générer</button>
    <input
      type="date"
      ref="datePicker"
      :value="date.toISOString().substring(0, 10)"
      step="7"
      @change="() => emit('change', new Date(datePicker.value))"
    />
    <input type="range" min="0" max="104" step="1" />
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
input[type='date'] {
  cursor: pointer;
  background-color: var(--primary-color);
  box-shadow: 0 0 12px hsla(0, 0%, 0%, 0.5);
  border-radius: 10px;
  color: white;
  padding: 1rem;
  border: none;
}
</style>
