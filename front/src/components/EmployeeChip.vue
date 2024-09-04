<script setup lang="ts">
import type { Employee } from '../models/Employee'
import { toCssColor } from '../models/Color'
import { computed, ref } from 'vue'

const props = defineProps<{
  employee: Employee
  index: number
  editable: boolean
  stats: boolean
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
  <div id="container">
    <div id="employee">
      <span
        ref="name"
        spellcheck="false"
        :contentEditable="editable"
        @focusin="select(name)"
        @focusout="emit('change', index, name.innerText)"
        @keypress="onKey"
      >
        {{ employee.name }}
      </span>
      <div id="delete" v-if="editable" @click="emit('delete', index)">+</div>
    </div>
    <div v-if="stats" id="stats">{{ employee.daysOnCall }}J {{ employee.weekendsOnCall }}WE</div>
  </div>
</template>

<style scoped>
#delete {
  cursor: pointer;
  padding: 0;
  margin-left: 0.5rem;
  border-radius: 100%;
  font-weight: bold;
  font-size: 1.8rem;
  line-height: 1.8rem;
  rotate: 45deg;
}

#employee {
  flex-grow: 1;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: v-bind(color);
  border-radius: 1.5rem;
}

#container {
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-direction: column;
}

#stats {
  margin: 0.5rem 0;
  align-self: center;
  font-weight: bold;
}

@media print {
  #delete {
    display: none;
  }

  #stats {
    color: grey;
  }
}
</style>
