<script setup lang="ts">
import { ref } from 'vue'
import { shuffle } from '@/utils/shuffle'
import { getEmojis } from '@/api/game'
import type { GameStatus } from '@/types/common'
import type { Emoji } from '@/types/api'

import GameSettings from '@/components/GameSettings.vue'
import TheGame from '@/components/TheGame.vue'

const emojis = ref<Emoji[]>([])
const gameStatus = ref<GameStatus>('idle')

async function startGame(category: string, pairs: number) {
  try {
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
  <main>
    <template v-if="gameStatus === 'idle'">
      <div class="intro-screen">
        <h1 class="title">Memory game</h1>

        <GameSettings @start="startGame" />
      </div>
    </template>

    <TheGame v-else-if="gameStatus === 'ready'" :emojis @reset="resetGame" />

    <div v-else-if="gameStatus === 'error'">Please, try again later.</div>
  </main>
</template>

<style scoped>
.intro-screen {
  max-width: 60rem;
  padding: 1rem;
  margin: 0 auto;
}

.title {
  margin-bottom: 1.5rem;
}
</style>
