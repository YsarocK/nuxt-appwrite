<template>
  <h1>hello</h1>
  <p v-if="session">{{ session.$id }}</p>
</template>

<script setup lang="ts">
const session = useAuthSession();
</script>
