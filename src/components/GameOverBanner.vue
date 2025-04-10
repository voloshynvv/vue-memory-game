<script setup lang="ts">
import BaseButton from './common/BaseButton.vue'

const emit = defineEmits<{
  reset: []
}>()
</script>

<template>
  <div class="banner">
    <h2 class="title">The Game is Over</h2>
    <p>Congrats! <span role="img">😎</span></p>

    <BaseButton @click="emit('reset')">Play again</BaseButton>
  </div>
</template>

<style scoped>
.banner {
  text-align: center;
}

.title {
  font-weight: 700;
  font-size: 1.5rem;
}

.banner > * + * {
  margin-top: 0.35rem;
}
</style>
