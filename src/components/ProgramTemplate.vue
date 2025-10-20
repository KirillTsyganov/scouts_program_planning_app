<template>
  <div>
    <h1>Program Template Editor</h1>
    <p>Editing program with ID: {{ id }}</p>
    <router-link to="/programs">Back to Programs List</router-link>
  </div>
</template>

<script setup>
defineProps({ id: String });
</script>