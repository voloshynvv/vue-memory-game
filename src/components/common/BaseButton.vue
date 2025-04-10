<script setup lang="ts">
import { computed } from 'vue'

const {
  variant = 'primary',
  size = 'md',
  fullWidth,
} = defineProps<{
  fullWidth?: boolean
  size?: 'sm' | 'md' | 'icon'
  variant?: 'primary' | 'outline' | 'danger'
}>()

const classes = computed(() => {
  return [`button-${size}`, `button-${variant}`, fullWidth && 'button-full']
})
</script>

<template>
  <button class="button" :class="classes">
    <slot></slot>
  </button>
</template>

<style scoped>
.button {
  font: inherit;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  border: 1px solid;
  border-radius: 0.25rem;
  cursor: pointer;

  border-color: var(--border);
  height: var(--height);
  width: var(--width);
  color: var(--color);
  padding-inline: var(--padding-x);
  background-color: var(--bg);
}

/* Variants */
.button-primary {
  --border: transparent;
  --bg: #3730a3;
  --color: #ffffff;
}

.button-outline {
  --border: var(--color-border);
  --bg: #ffffff;
}

.button-danger {
  --bg: red;
  --color: #ffffff;
}

/* Sizes */
.button-sm {
  --height: 36px;
  --padding-x: 6px;
}

.button-md {
  --height: 40px;
  --padding-x: 12px;
}

.button-icon {
  --height: 36px;
  --width: 36px;
}

.button-full {
  width: 100%;
}
</style>
