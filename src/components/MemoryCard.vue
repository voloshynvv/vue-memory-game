<template>
  <button
    class="card"
    :class="{
      flipped: status === 'opened' || status === 'matched',
      matched: status === 'matched',
    }"
    :disabled
  >
    <div class="front">
      <span>{{ label }}</span>
    </div>

    <div class="back">
      <span role="img" v-html="emoji" :aria-label="name"></span>
    </div>
  </button>
</template>

<script setup lang="ts">
import type { Status } from '@/types'

defineProps<{
  emoji: string
  status: Status
  name: string
  label: number
  disabled?: boolean
}>()
</script>

<style scoped>
.card {
  --radius: 0.75rem;

  cursor: pointer;
  position: relative;
  background-color: transparent;
  border-radius: var(--radius);
  border: 0;
  color: black;
}

.card:focus-visible {
  outline: 2px dashed;
}

.front,
.back {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100px;
  transition: transform 500ms;
  backface-visibility: hidden;
  border-radius: var(--radius);
  border: 2px solid;
}

.front {
  font-size: 1.5rem;
  background: lightblue;
  border-color: transparent;
}

.back {
  position: absolute;
  inset: 0;
  font-size: 2rem;
  transform: rotateY(180deg);
  background-color: #ffffff;
  border-color: #e4e4e7;
}

.card.flipped .front {
  transform: rotateY(180deg);
}
.card.flipped .back {
  transform: rotateY(0);
}

.card.matched .back {
  background-color: hsl(112, 50%, 90%);
  border-color: hsl(112, 50%, 66%);
}

.card:disabled {
  cursor: default;
}
</style>
