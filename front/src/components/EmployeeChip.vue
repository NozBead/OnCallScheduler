<script setup lang="ts">
import type { Employee } from '../models/Employee'
import { toCssColor } from '../models/Color'
import { computed, ref } from 'vue'

const props = defineProps<{
  employee: Employee
  index: number
  editable: boolean
}>()
const emit = defineEmits<{
  delete: [toDelete: number]
  change: [toChange: number, newName: string]
}>()

const color = computed(() => toCssColor(props.employee.colorIndex))
const name = ref()
</script>

<template>
  <div id="employee">
    <span ref="name" :contentEditable="editable" @focusout="$emit('change', index, name.innerText)">
      {{ employee.name }}
    </span>
    <button v-if="editable" @click="$emit('delete', index)">x</button>
  </div>
</template>

<style scoped>
#employee {
  padding: 0.5rem;
  display: flex;
  align-items: center;
  background-color: v-bind(color);
  border-radius: 1.5rem;
  color: white;
  width: max-content;

  > * {
    margin: 0 0.2rem;
  }
}

button {
  background-color: v-bind(color);
  border-radius: 100%;
  height: 1.2rem;
  padding: 0 0.3rem;
  border: white 1px solid;
  cursor: pointer;
  color: white;

  img {
    height: 3em;
  }
}
</style>
