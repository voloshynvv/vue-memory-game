<script setup lang="ts">
defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  cancel: []
  confirm: []
}>()
</script>

<template>
  <Teleport to="body">
    <div class="overlay"></div>

    <div v-if="isOpen" class="modal">
      <div class="modal-content">
        <slot />
      </div>

      <div class="modal-actions">
        <button @click="emit('confirm')">Agree</button>
        <button @click="emit('cancel')">Cancel</button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.backdrop {
}

.modal {
}
</style>
