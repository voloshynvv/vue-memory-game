<script setup lang="ts">
import { ref } from 'vue'
import { categories } from '@/constants/game'
import BaseButton from './common/BaseButton.vue'
import BaseCard from './common/BaseCard.vue'

const selectedCategory = ref('')

const emit = defineEmits<{
  start: [category: string]
}>()

function submit() {
  if (selectedCategory.value) {
    emit('start', selectedCategory.value)
  }
}
</script>

<template>
  <BaseCard>
    <h2>Game Settings</h2>

    <form @submit.prevent="submit">
      <select v-model="selectedCategory">
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>

      <BaseButton type="submit"> Start </BaseButton>
    </form>
  </BaseCard>
</template>
