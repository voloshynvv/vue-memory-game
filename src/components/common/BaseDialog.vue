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
    <template v-if="isOpen">
      <div class="backdrop"></div>

      <div class="dialog">
        <div class="dialog-content">
          <slot />
        </div>

        <div class="dialog-actions">
          <button @click="emit('confirm')">Agree</button>
          <button @click="emit('cancel')">Cancel</button>
        </div>
      </div>
    </template>
  </Teleport>
</template>

<style scoped>
.backdrop {
  background-color: rgb(0 0 0 / 0.3);
  position: fixed;
  inset: 0;
  z-index: 50;
}

.dialog {
  background: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 100px;
  z-index: 50;
}
</style>
