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

  transition: border-color 250ms;

  border-color: var(--border);
  height: var(--height);
  width: var(--width);
  color: var(--color);
  padding-inline: var(--padding-x);
  background-color: var(--bg);

  &:hover {
    border-color: var(--border-hover, transparent);
  }
}

/* Variants */
.button-primary {
  --border: transparent;
  --bg: #3730a3;
  --color: #ffffff;
}

.button-outline {
  --border: var(--color-border);
  --border-hover: var(--color-border-hover);
  --bg: #ffffff;
}

.button-danger {
  --bg: red;
  --color: #ffffff;
}

/* Sizes */
.button-sm {
  --height: 2.25rem;
  --padding-x: 0.375rem;
}

.button-md {
  --height: 2.5rem;
  --padding-x: 0.75rem;
}

.button-icon {
  --height: 3.125rem;
  --width: 3.125rem;
}

.button-full {
  width: 100%;
}
</style>
