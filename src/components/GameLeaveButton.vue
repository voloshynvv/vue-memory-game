<script setup lang="ts">
import { useConfirmDialog } from '@vueuse/core'

import BaseButton from '@/components/common/BaseButton.vue'
import BaseDialog from '@/components/common/BaseDialog.vue'

const { isRevealed, reveal } = useConfirmDialog()
</script>

<template>
  <BaseButton @click="reveal" variant="outline" size="icon">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  </BaseButton>

  <BaseDialog :is-open="isRevealed"> </BaseDialog>
</template>

<style scoped>
.modal {
  position: fixed;
  background-color: #000;
  top: 20%;
  left: 20%;
  width: 400px;
  height: 400px;
}
</style>
