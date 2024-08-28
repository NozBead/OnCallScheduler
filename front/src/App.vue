<script setup lang="ts">
import EmployeeList from './components/EmployeeList.vue'
import Schedule from './components/Schedule.vue'
</script>

<template>
  <main>
    <EmployeeList />
    <Schedule />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: row;
}
</style>
