<script setup lang="ts">
import { ref } from 'vue'
import { categories, pairs } from '@/constants/game'
import BaseButton from './common/BaseButton.vue'
import BaseCard from './common/BaseCard.vue'
import { toKebabCase } from '@/utils/format'
import BaseRadioCard from './common/BaseRadioCard.vue'

const emit = defineEmits<{
  start: [category: string, boardSize: number]
}>()

const selectedCategory = ref('')
const selectedPairs = ref(pairs[0])
const hasValidationError = ref(false)

function submit() {
  if (selectedCategory.value) {
    emit('start', selectedCategory.value, selectedPairs.value)
  } else {
    hasValidationError.value = true
  }
}
</script>

<template>
  <BaseCard>
    <p>Sharpen your mind and let's play! Just a few quick settings before you dive in.</p>

    <form class="form" @submit.prevent="submit">
      <div class="form-group">
        <label class="label" for="categories">Choose a category</label>

        <select
          id="categories"
          class="select"
          v-model="selectedCategory"
          @change="hasValidationError = false"
        >
          <option value="">Please choose an option</option>

          <option v-for="category in categories" :key="category" :value="toKebabCase(category)">
            {{ category }}
          </option>
        </select>

        <span class="error-message" v-if="hasValidationError">Field is required</span>
      </div>

      <fieldset class="fieldset">
        <legend class="label">Pairs</legend>

        <BaseRadioCard v-for="pair in pairs" :key="pair" v-model="selectedPairs" :value="pair">
          {{ pair }}
        </BaseRadioCard>
      </fieldset>

      <BaseButton type="submit"> Start </BaseButton>
    </form>
  </BaseCard>
</template>

<style scoped>
.flex {
  display: flex;
  gap: 0.5rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.select {
  font: inherit;
  appearance: none;
  padding: 0.5rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  max-width: 20rem;
  width: 100%;
  display: block;
  background: #ffffff;
  color: currentColor;
}

.label {
  margin-bottom: 0.25rem;
  font-size: 0.85rem;
  display: block;
}

.form-group {
  position: relative;
}

.error-message {
  color: var(--color-text-danger);
  font-size: 0.875rem;
  position: absolute;
  top: 100%;
  left: 0;
}

.fieldset {
  display: flex;
  border: 0;
  gap: 0.5rem;
}
</style>
