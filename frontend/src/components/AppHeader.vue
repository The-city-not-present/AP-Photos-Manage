<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  visuallyHidden: { type: Boolean, default: false },
})
</script>

<template>
  <header class="apph-app-header" :class="{ 'apph-app-header--visually-hidden': visuallyHidden }">
    <div>
      <h1 class="apph-app-header-title">{{ title }}</h1>
      <p v-if="subtitle" class="apph-app-header-subtitle">{{ subtitle }}</p>
    </div>
    <div v-if="$slots.default" class="apph-app-header-actions">
      <slot />
    </div>
  </header>
</template>

<style scoped>
.apph-app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--apph-space-0-5x);
  padding: var(--apph-space-0-5x) var(--apph-space);
  background: var(--apph-color-surface);
  border-bottom: 1px solid var(--apph-border-color);
}

.apph-app-header-title {
  margin: 0;
  padding: 0;
  font-size: 1.25rem;
}

.apph-app-header-subtitle {
  margin: 0.15rem 0 0;
  color: var(--apph-color-muted);
  font-size: 0.9rem;
}

.apph-app-header-actions {
  display: flex;
  align-items: center;
  gap: var(--apph-space-0-25x);
}

.apph-app-header--visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
