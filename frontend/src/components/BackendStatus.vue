<script setup>
import { ref, onMounted } from 'vue'
import { reportError } from '../services/errors.js'

const status = ref('loading')

onMounted(async () => {
  try {
    const res = await fetch('/api/health')
    const data = await res.json()
    status.value = data.status ?? 'unknown'
  } catch (err) {
    status.value = 'unreachable'
    reportError(err)
  }
})
</script>

<template>
  <span class="apph-backend-status" :data-status="status">Backend: {{ status }}</span>
</template>

<style scoped>
.apph-backend-status {
  color: var(--apph-color-muted);
}

.apph-backend-status[data-status='ok'] {
  color: #15803d;
}

.apph-backend-status[data-status='unreachable'] {
  color: #b91c1c;
}

.apph-backend-status[data-status='unknown'] {
  color: #b45309;
}
</style>
