<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps<{
  isGameOver: boolean
}>()

const elapsed = ref(0)

let intervalId: number

watch(
  () => props.isGameOver,
  () => {
    clearInterval(intervalId)
  },
)

onMounted(() => {
  intervalId = setInterval(() => {
    elapsed.value++
  }, 1000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})

const time = computed(() => {
  const mins = String(Math.floor(elapsed.value / 60)).padStart(2, '0')
  const seconds = String(elapsed.value % 60).padStart(2, '0')

  return `${mins}:${seconds}`
})
</script>

<template>
  <p class="time">{{ time }}</p>
</template>

<style scoped>
.time {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1;
  font-size: 1.25rem;
}
</style>
