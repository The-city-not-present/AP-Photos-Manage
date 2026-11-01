<script setup>
defineProps({
  title: { type: String, required: true },
  message: { type: String, default: '' },
})
</script>

<template>
  <div class="apprinter-empty-state">
    <h3 class="apprinter-empty-state-title">{{ title }}</h3>
    <p v-if="message" class="apprinter-empty-state-message">{{ message }}</p>
    <div v-if="$slots.default" class="apprinter-empty-state-actions">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.apprinter-empty-state {
  padding: var(--apprinter-space-2x) var(--apprinter-space);
  text-align: center;
  background: var(--apprinter-color-surface);
  border: 1px dashed var(--apprinter-border-color);
  border-radius: var(--apprinter-border-radius);
}

.apprinter-empty-state-title {
  margin: 0 0 var(--apprinter-space-0-25x);
  padding: 0;
}

.apprinter-empty-state-message {
  margin: 0 0 var(--apprinter-space-0-5x);
  color: var(--apprinter-color-muted);
}

.apprinter-empty-state-actions {
  display: flex;
  justify-content: center;
  gap: var(--apprinter-space-0-25x);
}
</style>
