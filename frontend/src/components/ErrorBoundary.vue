<script setup>
import { ref, onErrorCaptured } from 'vue'

const error = ref(null)
const resetKey = ref(0)

onErrorCaptured((err) => {
  error.value = err
  // Force a full remount of the boundary content so the broken subtree is
  // discarded cleanly instead of being patched in-place.
  resetKey.value++
  console.error('[ErrorBoundary]', err)
  return false
})

function retry() {
  error.value = null
  resetKey.value++
}
</script>

<template>
  <div :key="resetKey" class="apph-error-boundary-root">
    <div v-if="error" class="apph-error-boundary">
      <h3 class="apph-error-boundary-title">Something went wrong</h3>
      <p class="apph-error-boundary-message">{{ error.message || String(error) }}</p>
      <button class="apph-btn apph-btn-primary" type="button" @click="retry">Retry</button>
    </div>
    <slot v-else />
  </div>
</template>

<style scoped>
.apph-error-boundary {
  padding: var(--apph-space);
  background: var(--apph-color-surface);
  border: 1px solid var(--apph-color-reject);
  border-radius: var(--apph-border-radius);
}

.apph-error-boundary-title {
  margin: 0 0 var(--apph-space-0-25x);
}

.apph-error-boundary-message {
  margin: 0 0 var(--apph-space-0-5x);
  color: var(--apph-color-muted);
}
</style>
