<script setup lang="ts">
import BaseCard from './common/BaseCard.vue'

defineProps<{ moves: number; matched: number; total: number }>()
</script>

<template>
  <BaseCard class="game-stats">
    <div class="row">
      <dl>
        <dt>Moves</dt>
        <dd>{{ moves }}</dd>
      </dl>

      <dl>
        <dt>Matches</dt>
        <dd>{{ matched }} / {{ total }}</dd>
      </dl>
    </div>

    <label class="label">
      <input type="checkbox" />
      show number
    </label>
  </BaseCard>
</template>

<style scoped>
.game-stats {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1rem 4rem;
}

.row {
  display: flex;
  gap: 2rem;
}

.label {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
</style>
