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
  <div class="apprinter-error-banner" role="alert" aria-live="assertive">
    <div v-for="(error, index) in errors" :key="index" class="apprinter-error-banner-item">
      {{ message(error) }}
    </div>
  </div>
</template>

<style scoped>
/* No padding/margin/border on the container: it collapses to zero height when
   there are no errors and grows by exactly one line per error. */
.apprinter-error-banner {
  display: flex;
  flex-direction: column;
  gap: var(--apprinter-space-0-125x);
}

.apprinter-error-banner-item {
  padding: var(--apprinter-space-0-25x) var(--apprinter-space-0-5x);
  background: var(--apprinter-color-reject);
  color: #fff;
  font-size: 0.9rem;
}
</style>
