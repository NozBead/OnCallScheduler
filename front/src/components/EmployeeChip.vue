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

function select(element: HTMLElement) {
  getSelection()?.selectAllChildren(element)
}

function onKey(e: KeyboardEvent) {
  if (e.key == 'Enter') {
    name.value.blur()
    getSelection()?.empty()
  }
}
</script>

<template>
  <div id="employee">
    <span
      ref="name"
      spellcheck="false"
      :contentEditable="editable"
      @click="select(name)"
      @focusout="$emit('change', index, name.innerText)"
      @keypress="onKey"
    >
      {{ employee.name }}
    </span>
    <div id="delete" v-if="editable" @click="$emit('delete', index)">+</div>
  </div>
</template>

<style scoped>
#delete {
  cursor: pointer;
  color: white;
  padding: 0;
  margin-left: 0.5rem;

  border-radius: 100%;
  font-weight: bold;
  font-size: 1.8rem;
  line-height: 1.8rem;
  rotate: 45deg;
}

#employee {
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  background-color: v-bind(color);
  border-radius: 1.5rem;
  color: white;
  width: max-content;
}
</style>
