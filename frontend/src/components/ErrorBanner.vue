<script setup>
import { useErrors } from '../services/errors.js'

const errors = useErrors()
</script>

<template>
  <div class="apph-error-banner" role="alert" aria-live="assertive">
    <div v-for="(error, index) in errors" :key="index" class="apph-error-banner-item">
      {{ error.message || String(error) }}
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
