<script setup lang="ts">
defineProps<{
  fullWidth?: boolean
}>()
</script>

<template>
  <button class="button" :class="{ fullWidth }">
    <slot></slot>
  </button>
</template>

<style scoped>
.button {
  border: 0;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.fullWidth {
  width: 100%;
}
</style>
