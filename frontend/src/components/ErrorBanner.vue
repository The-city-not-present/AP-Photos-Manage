<script setup>
import { useErrors } from '../services/errors.js'

const errors = useErrors()

// The global list may hold any value `reportError` was given, not just `Error`
// instances, so render each line safely instead of assuming `.message` exists.
function message(error) {
  return error?.message ?? String(error)
}
</script>

<template>
  <div class="apph-error-banner" role="alert" aria-live="assertive">
    <div v-for="(error, index) in errors" :key="index" class="apph-error-banner-item">
      {{ message(error) }}
    </div>
  </div>
</template>

<style scoped>
/* No padding/margin/border on the container: it collapses to zero height when
   there are no errors and grows by exactly one line per error. */
.apph-error-banner {
  display: flex;
  flex-direction: column;
  gap: var(--apph-space-0-125x);
}

.apph-error-banner-item {
  padding: var(--apph-space-0-25x) var(--apph-space-0-5x);
  background: var(--apph-color-reject);
  color: #fff;
  font-size: 0.9rem;
}
</style>
