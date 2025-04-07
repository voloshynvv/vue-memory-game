<script setup lang="ts">
defineProps<{ moves: number; matched: number; total: number }>()
const model = defineModel()

console.log(model)
</script>

<template>
  <section class="game-stats">
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
      <input v-model="model" type="checkbox" />
      show number
    </label>
  </section>
</template>

<style scoped>
.game-stats {
  display: flex;
  align-items: flex-start;
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
