<script setup>
import { ref, onErrorCaptured } from 'vue'
import { reportError } from '../services/errors.js'

const error = ref(null)
const resetKey = ref(0)

onErrorCaptured((err) => {
  error.value = err
  // Force a full remount of the boundary content so the broken subtree is
  // discarded cleanly instead of being patched in-place.
  resetKey.value++
  reportError(err)
  return false
})

function retry() {
  error.value = null
  resetKey.value++
}
</script>

<template>
  <div :key="resetKey" class="apprinter-error-boundary-root">
    <div v-if="error" class="apprinter-error-boundary">
      <h3 class="apprinter-error-boundary-title">Something went wrong</h3>
      <p class="apprinter-error-boundary-message">{{ error.message || String(error) }}</p>
      <button class="apprinter-btn apprinter-btn-primary" type="button" @click="retry">Retry</button>
    </div>
    <slot v-else />
  </div>
</template>

<style scoped>
.apprinter-error-boundary {
  padding: var(--apprinter-space);
  background: var(--apprinter-color-surface);
  border: 1px solid var(--apprinter-color-reject);
  border-radius: var(--apprinter-border-radius);
}

.apprinter-error-boundary-title {
  margin: 0 0 var(--apprinter-space-0-25x);
}

.apprinter-error-boundary-message {
  margin: 0 0 var(--apprinter-space-0-5x);
  color: var(--apprinter-color-muted);
}
</style>
