<script setup lang="ts">
const weeks = []
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Lundi</th>
        <th>Mardi</th>
        <th>Mercredi</th>
        <th>Jeudi</th>
        <th>Vendredi</th>
        <th>Samedi</th>
        <th>Dimanche</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="week in weeks"></tr>
    </tbody>
  </table>
</template>

<style scoped></style>
