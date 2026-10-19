<script setup>
defineProps({
  title: { type: String, required: true },
  message: { type: String, default: '' },
})
</script>

<template>
  <div class="apph-empty-state">
    <h3 class="apph-empty-state-title">{{ title }}</h3>
    <p v-if="message" class="apph-empty-state-message">{{ message }}</p>
    <div v-if="$slots.default" class="apph-empty-state-actions">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.apph-empty-state {
  padding: var(--apph-space-2x) var(--apph-space);
  text-align: center;
  background: var(--apph-color-surface);
  border: 1px dashed var(--apph-border-color);
  border-radius: var(--apph-border-radius);
}

.apph-empty-state-title {
  margin: 0 0 var(--apph-space-0-25x);
  padding: 0;
}

.apph-empty-state-message {
  margin: 0 0 var(--apph-space-0-5x);
  color: var(--apph-color-muted);
}

.apph-empty-state-actions {
  display: flex;
  justify-content: center;
  gap: var(--apph-space-0-25x);
}
</style>
