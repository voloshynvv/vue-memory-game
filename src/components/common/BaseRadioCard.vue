<script setup lang="ts">
defineProps<{ value: number }>()
const model = defineModel()
</script>

<template>
  <label class="radio-card">
    <slot></slot>
    <input :value v-model="model" type="radio" />
  </label>
</template>

<style scoped>
.radio-card {
  border: 1px solid var(--color-border);
  padding: 0.375rem 1rem;
  border-radius: 0.25rem;
}

.radio-card:has(input:checked) {
  border-color: var(--color-border-hover);
}
</style>
