<script setup lang="ts">
import { computed, onWatcherCleanup, ref, watch } from 'vue'

import MemoryCard from './components/MemoryCard.vue'
import GameStats from './components/GameStats.vue'
import data from './data.json'
import type { Status } from './types'
import { shuffle } from './utils'

const emojies = ref([...shuffle(data.slice(0, 10)), ...shuffle(data.slice(0, 10))])
const openedCards = ref(new Set<number>([]))
const matchedCards = ref(new Set<number>())
const moves = ref(0)
const isLabelVisible = ref(false)

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

  if (emojies.value[firstIndex].name === emojies.value[secondIndex].name) {
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

function openCard(index: number) {
  if (openedCards.value.size === 2) {
    openedCards.value.clear()
    moves.value += 1
  }

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

function resetGame() {
  const items = data.slice(0, 10)
  emojies.value = []
  emojies.value = [...shuffle(items), ...shuffle(items)]
  moves.value = 0
  isLabelVisible.value = false
  openedCards.value = new Set()
  matchedCards.value = new Set()
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
        :label="isLabelVisible ? `${index + 1}` : ''"
        :disabled="matchedCards.has(index)"
        :status="getStatus(index)"
        @click="openCard(index)"
      />
    </div>

    <GameStats
      :matched="matchedCards.size / 2"
      :moves
      :total="emojies.length / 2"
      v-model="isLabelVisible"
    />

    <button @click="resetGame">Reset game</button>
  </main>
</template>

<style scoped>
.game {
  max-width: 60rem;
  padding: 1rem;
  margin: 0 auto;
}

.title {
  margin-bottom: 1rem;
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

.game-stats {
  box-shadow: 0 0 10px rgb(0 0 0 / 0.1);
  border-radius: 1rem;
  padding: 2rem;
  margin-top: 4rem;
}

.game-stats {
  display: flex;
  justify-content: space-between;
}
</style>
