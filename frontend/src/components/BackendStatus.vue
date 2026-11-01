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
  <span class="apprinter-backend-status" :data-status="status">Backend: {{ status }}</span>
</template>

<style scoped>
.apprinter-backend-status {
  color: var(--apprinter-color-muted);
}

.apprinter-backend-status[data-status='ok'] {
  color: #15803d;
}

.apprinter-backend-status[data-status='unreachable'] {
  color: #b91c1c;
}

.apprinter-backend-status[data-status='unknown'] {
  color: #b45309;
}
</style>
