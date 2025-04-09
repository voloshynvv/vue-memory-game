<script setup lang="ts">
import { computed, onWatcherCleanup, ref, watch } from 'vue'

import MemoryCard from '@/components/MemoryCard.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import GameStats from '@/components/GameStats.vue'

import type { MemoryCardStatus } from '@/types/common'
import type { Emoji } from '@/types/api'

const props = defineProps<{
  emojis: Emoji[]
}>()

const emit = defineEmits<{
  reset: []
}>()

const moves = ref(0)
const matchedCards = ref(new Set<number>())
const openedCards = ref(new Set<number>())

const areTwoCardsOpen = computed(() => {
  return openedCards.value.size === 2
})

const CLOSE_TIMEOUT = 1000
watch(areTwoCardsOpen, (opened) => {
  if (!opened) return

  const id = setTimeout(() => {
    openedCards.value.clear()
    moves.value += 1
  }, CLOSE_TIMEOUT)

  const [firstIndex, secondIndex] = openedCards.value

  if (props.emojis[firstIndex].name === props.emojis[secondIndex].name) {
    matchedCards.value.add(firstIndex)
    matchedCards.value.add(secondIndex)

    moves.value += 1

    clearTimeout(id)
    openedCards.value.clear()
  }

  onWatcherCleanup(() => {
    clearTimeout(id)
  })
})

function getStatus(index: number): MemoryCardStatus {
  if (openedCards.value.has(index)) {
    return 'opened'
  }

  if (matchedCards.value.has(index)) {
    return 'matched'
  }

  return 'closed'
}

function openCard(index: number) {
  if (openedCards.value.size === 2) {
    openedCards.value.clear()
    moves.value += 1
  }

  openedCards.value.add(index)
}
</script>

<template>
  <div class="game-wrapper">
    <div class="game-board">
      <MemoryCard
        v-for="(emoji, index) in emojis"
        :key="emoji.name"
        :emoji
        :disabled="matchedCards.has(index)"
        :status="getStatus(index)"
        @click="openCard(index)"
      />
    </div>

    <BaseButton full-width @click="emit('reset')">Reset Game</BaseButton>

    <GameStats :matched="matchedCards.size / 2" :moves :total="emojis.length / 2" />
  </div>
</template>

<style scoped>
.game-wrapper {
  padding-bottom: 10rem;
}

.game-board {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}
</style>
