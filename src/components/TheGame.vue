<script setup lang="ts">
import { computed, onWatcherCleanup, ref, watch } from 'vue'
import { useSound } from '@vueuse/sound'
import { useLocalStorage } from '@vueuse/core'
import type { MemoryCardStatus } from '@/types/common'
import type { Emoji } from '@/types/api'
import gameSound from '@/assets/audio/game.mp3'

import MemoryCard from '@/components/MemoryCard.vue'
import BaseCard from '@/components/common/BaseCard.vue'
import GameTime from '@/components/GameTime.vue'
import GameLeaveButton from '@/components/GameLeaveButton.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import IconVolumeOn from '@/components/icons/IconVolumeOn.vue'
import IconVolumeOff from '@/components/icons/IconVolumeOff.vue'
import GameOverBanner from './GameOverBanner.vue'

const props = defineProps<{
  emojis: Emoji[]
}>()

const emit = defineEmits<{
  reset: []
}>()

const moves = ref(0)
const matchedCards = ref(new Set<number>())
const openedCards = ref(new Set<number>())
const soundEnabled = useLocalStorage('soundEnabled', false)

const volume = computed(() => {
  return soundEnabled.value ? 1 : 0
})

const { play } = useSound(gameSound, {
  sprite: {
    flip: [0, 600],
    match: [800, 1100],
    sound: [1900, 600],
  },
  interrupt: true,
  volume,
})

const areTwoCardsOpened = computed(() => {
  return openedCards.value.size === 2
})

const isGameOver = computed(() => {
  return matchedCards.value.size === props.emojis.length
})

const CLOSE_TIMEOUT = 1000

watch(areTwoCardsOpened, (opened) => {
  if (!opened) return

  moves.value += 1

  const id = setTimeout(() => {
    openedCards.value.clear()
  }, CLOSE_TIMEOUT)

  const [firstIndex, secondIndex] = openedCards.value

  if (props.emojis[firstIndex].name === props.emojis[secondIndex].name) {
    // @ts-expect-error id should be a string
    play({ id: 'match' })

    matchedCards.value.add(firstIndex)
    matchedCards.value.add(secondIndex)
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
  }

  // @ts-expect-error id should be a string
  play({ id: 'flip' })
  openedCards.value.add(index)
}

function toggleSound() {
  // @ts-expect-error id should be a string
  play({ id: 'sound' })
  soundEnabled.value = !soundEnabled.value
}
</script>

<template>
  <div class="game">
    <h1 class="title fixed">
      Match
      <span>Cards</span>
    </h1>

    <GameTime :is-game-over="isGameOver" />

    <div class="mb">
      <GameOverBanner v-if="isGameOver" @reset="emit('reset')" />
    </div>

    <div class="board">
      <MemoryCard
        v-for="(emoji, index) in emojis"
        :key="emoji.name"
        :emoji
        :disabled="matchedCards.has(index)"
        :status="getStatus(index)"
        @click="openCard(index)"
      />
    </div>

    <div class="controls fixed">
      <BaseButton @click="toggleSound" size="icon" variant="outline">
        <IconVolumeOn v-if="soundEnabled" />
        <IconVolumeOff v-else />
      </BaseButton>

      <GameLeaveButton />
    </div>

    <BaseCard class="stats fixed">
      <p>Moves: {{ moves }}</p>
      <p>Matches: {{ matchedCards.size }} / {{ emojis.length / 2 }}</p>
    </BaseCard>
  </div>
</template>

<style scoped>
.game {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  padding: 4.5rem 3rem 8rem;

  @media (min-width: 768px) {
    padding-block: 4rem;
    justify-content: center;
    align-items: center;
  }
}

.board {
  max-width: 45rem;
  width: 100%;
  display: grid;
  /* grid-template-columns: repeat(6, 1fr); */
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 0.5rem;
}

.fixed {
  position: fixed;
  z-index: 1;
}

.title {
  left: 1.5rem;
  top: 1.5rem;
  line-height: 1;
  font-size: 1.5rem;
  font-weight: 500;

  span {
    display: block;
  }
}

.controls {
  display: flex;
  gap: 0.5rem;
  left: 1.5rem;
  bottom: 1.5rem;
}

.stats {
  bottom: 1.5rem;
  right: 1.5rem;
  padding: 1rem;
  z-index: 1;
}

.mb {
  margin-bottom: 2rem;
}
</style>
