<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import MemoryCard from './components/MemoryCard.vue'
import data from './data.json'
import type { Status } from './types'

const emojies = ref([...data.slice(0, 10), ...data.slice(0, 10)])
const openedCards = ref(new Set<number>([]))
const matchedCards = ref(new Set<number>())

const areTwoCardsOpen = computed(() => {
  return openedCards.value.size === 2
})

watch(areTwoCardsOpen, (flag) => {
  if (!flag) return

  const [firstIndex, secondIndex] = openedCards.value

  const id = setTimeout(() => {
    openedCards.value.clear()
  }, 1000)

  if (emojies.value[firstIndex].name === emojies.value[secondIndex].name) {
    matchedCards.value.add(firstIndex)
    matchedCards.value.add(secondIndex)
    clearTimeout(id)
    openedCards.value.clear()
  }
})

function openCard(index: number) {
  openedCards.value.add(index)
}

function getStatus(index: number): Status {
  if (openedCards.value.has(index)) {
    return 'opened'
  }

  if (matchedCards.value.has(index)) {
    return 'matched'
  }

  return 'closed'
}
</script>

<template>
  <main class="game">
    <h1 class="title">Memory game</h1>

    <div class="game-board">
      <MemoryCard
        v-for="(emoji, index) in emojies"
        :key="emoji.name"
        :emoji="emoji.htmlCode[0]"
        :name="emoji.name"
        :label="index + 1"
        :disabled="areTwoCardsOpen || matchedCards.has(index)"
        :status="getStatus(index)"
        @click="openCard(index)"
      />
    </div>
  </main>
</template>

<style scoped>
.game {
  max-width: 60rem;
  padding: 1rem;
  margin: 0 auto;
}

.title {
  margin-bottom: 0.5rem;
}

.game-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.game-board {
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
