<script setup lang="ts">
import { ref } from 'vue'

import GameSettings from '@/components/GameSettings.vue'
import GameBoard from '@/components/GameBoard.vue'

import { shuffle } from '@/utils/shuffle'
import { getEmojis } from '@/api/game'
import type { GameStatus } from '@/types/common'
import type { Emoji } from '@/types/api'

const emojis = ref<Emoji[]>([])
const gameStatus = ref<GameStatus>('idle')

async function startGame(category: string, pairs: number) {
  try {
    gameStatus.value = 'initializing'

    const data = await getEmojis(category)
    const boardEmojis = data.slice(0, pairs)

    emojis.value = [...shuffle(boardEmojis), ...shuffle(boardEmojis)]
    gameStatus.value = 'ready'
  } catch (e) {
    console.error(e)
    gameStatus.value = 'error'
  }
}

function resetGame() {
  gameStatus.value = 'idle'
  emojis.value = []
}
</script>

<template>
  <main class="container">
    <h1 class="title">Memory game</h1>

    <GameSettings v-if="gameStatus === 'idle'" @start="startGame" />

    <GameBoard v-else-if="gameStatus === 'ready'" :emojis @reset="resetGame" />

    <div v-else-if="gameStatus === 'error'">Errorasd</div>
  </main>
</template>

<style scoped>
.container {
  max-width: 60rem;
  padding: 1rem;
  margin: 0 auto;
}

.title {
  margin-bottom: 1rem;
}
</style>
