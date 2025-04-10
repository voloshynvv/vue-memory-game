<script setup lang="ts">
import { ref } from 'vue'
import { shuffle } from '@/utils/shuffle'
import { getEmojis } from '@/api/game'
import type { GameStatus } from '@/types/common'
import type { Emoji } from '@/types/api'

import GameSettings from '@/components/GameSettings.vue'
import GameBoard from '@/components/TheGame.vue'

const emojis = ref<Emoji[]>([
  {
    name: 'grapes',
    category: 'food and drink',
    group: 'food fruit',
    htmlCode: ['&#127815;'],
    unicode: ['U+1F347'],
  },
  {
    name: 'melon',
    category: 'food and drink',
    group: 'food fruit',
    htmlCode: ['&#127816;'],
    unicode: ['U+1F348'],
  },
  {
    name: 'watermelon',
    category: 'food and drink',
    group: 'food fruit',
    htmlCode: ['&#127817;'],
    unicode: ['U+1F349'],
  },
  {
    name: 'tangerine',
    category: 'food and drink',
    group: 'food fruit',
    htmlCode: ['&#127818;'],
    unicode: ['U+1F34A'],
  },
  {
    name: 'lemon',
    category: 'food and drink',
    group: 'food fruit',
    htmlCode: ['&#127819;'],
    unicode: ['U+1F34B'],
  },
  {
    name: 'banana',
    category: 'food and drink',
    group: 'food fruit',
    htmlCode: ['&#127820;'],
    unicode: ['U+1F34C'],
  },
  {
    name: 'pineapple',
    category: 'food and drink',
    group: 'food fruit',
    htmlCode: ['&#127821;'],
    unicode: ['U+1F34D'],
  },
  {
    name: 'red apple',
    category: 'food and drink',
    group: 'food fruit',
    htmlCode: ['&#127822;'],
    unicode: ['U+1F34E'],
  },
  {
    name: 'grapes',
    category: 'food and drink',
    group: 'food fruit',
    htmlCode: ['&#127815;'],
    unicode: ['U+1F347'],
  },
  {
    name: 'melon',
    category: 'food and drink',
    group: 'food fruit',
    htmlCode: ['&#127816;'],
    unicode: ['U+1F348'],
  },
  {
    name: 'watermelon',
    category: 'food and drink',
    group: 'food fruit',
    htmlCode: ['&#127817;'],
    unicode: ['U+1F349'],
  },
  {
    name: 'tangerine',
    category: 'food and drink',
    group: 'food fruit',
    htmlCode: ['&#127818;'],
    unicode: ['U+1F34A'],
  },
  {
    name: 'lemon',
    category: 'food and drink',
    group: 'food fruit',
    htmlCode: ['&#127819;'],
    unicode: ['U+1F34B'],
  },
  {
    name: 'banana',
    category: 'food and drink',
    group: 'food fruit',
    htmlCode: ['&#127820;'],
    unicode: ['U+1F34C'],
  },
  {
    name: 'pineapple',
    category: 'food and drink',
    group: 'food fruit',
    htmlCode: ['&#127821;'],
    unicode: ['U+1F34D'],
  },
  {
    name: 'red apple',
    category: 'food and drink',
    group: 'food fruit',
    htmlCode: ['&#127822;'],
    unicode: ['U+1F34E'],
  },
])
const gameStatus = ref<GameStatus>('ready')

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
  <main class="">
    <template v-if="gameStatus === 'idle'">
      <h1 class="title">Memory game</h1>

      <GameSettings @start="startGame" />
      <GameHistory />
    </template>

    <GameBoard v-else-if="gameStatus === 'ready'" :emojis @reset="resetGame" />

    <div v-else-if="gameStatus === 'error'">Error</div>
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
