<script setup lang="ts">
import type { Emoji } from '@/types/api'
import type { MemoryCardStatus } from '@/types/common'
import { computed } from 'vue'

const props = defineProps<{
  status: MemoryCardStatus
  emoji: Emoji
  disabled?: boolean
}>()

const classes = computed(() => {
  return {
    flipped: props.status === 'opened' || props.status === 'matched',
    matched: props.status === 'matched',
  }
})
</script>

<template>
  <button class="card" :class="classes" :disabled>
    <div class="front"></div>

    <Transition>
      <div v-if="status !== 'closed'" class="back">
        <div role="img" :aria-label="emoji.name">
          <span v-for="code in emoji.htmlCode" :key="code" v-html="code"></span>
        </div>
      </div>
    </Transition>
  </button>
</template>

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
  background-color: #ffffff;
  border-color: #e4e4e7;
}

.card.flipped .front {
  transform: rotateY(180deg);
}

.card.matched .back {
  background-color: hsl(112, 50%, 90%);
  border-color: hsl(112, 50%, 66%);
}

.card:disabled {
  cursor: default;
}

.v-enter-from,
.v-leave-to {
  transform: rotateY(-180deg);
}
.v-enter-to,
.v-leave-from {
  transform: rotateY(0);
}

.v-enter-active,
.v-leave-active {
  transition: transform 500ms;
}
</style>
