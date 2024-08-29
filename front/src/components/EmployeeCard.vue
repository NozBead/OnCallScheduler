<script setup lang="ts">
import type { Employee } from '../models/Employee'
import { toCssColor } from '../models/Color'
import { computed } from 'vue'

const props = defineProps<{
  employee: Employee
}>()
const emit = defineEmits<{
  delete: []
}>()

const color = computed(() => toCssColor(props.employee.colorIndex))
</script>

<template>
  <div id="employee">
    <div id="color-block">

    </div>
    <div id="info">
      <h2>
        {{ employee.name }}
      </h2>
      <h3>
        {{ employee.daysOnCall }} jours d'astreinte<br>
        {{ employee.weekendsOnCall }} weekends.
      </h3>
    </div>
    <button @click="$emit('delete')">Delete</button>
  </div>
</template>

<style scoped>
#color-block {
  background-color: v-bind(color);
  width: 1em;
  align-self: stretch;
}

#info {
  display: flex;
  flex-direction: column;
  > * {
    margin : 0;
  }

  h3 {
    color: grey;
    font-size: 1em;
  }
}

#employee {
  display: flex;
  flex-direction: row;
  align-items: center;
  > * {
    margin: 0.5em;
  }
}
</style>
