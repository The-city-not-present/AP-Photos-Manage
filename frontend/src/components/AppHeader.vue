<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  visuallyHidden: { type: Boolean, default: false },
})
</script>

<template>
  <header class="apprinter-app-header" :class="{ 'apprinter-app-header--visually-hidden': visuallyHidden }">
    <div>
      <h1 class="apprinter-app-header-title">{{ title }}</h1>
      <p v-if="subtitle" class="apprinter-app-header-subtitle">{{ subtitle }}</p>
    </div>
    <div v-if="$slots.default" class="apprinter-app-header-actions">
      <slot />
    </div>
  </header>
</template>

<style scoped>
.apprinter-app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--apprinter-space-0-5x);
  padding: var(--apprinter-space-0-5x) var(--apprinter-space);
  background: var(--apprinter-color-surface);
  border-bottom: 1px solid var(--apprinter-border-color);
}

.apprinter-app-header-title {
  margin: 0;
  padding: 0;
  font-size: 1.25rem;
}

.apprinter-app-header-subtitle {
  margin: 0.15rem 0 0;
  color: var(--apprinter-color-muted);
  font-size: 0.9rem;
}

.apprinter-app-header-actions {
  display: flex;
  align-items: center;
  gap: var(--apprinter-space-0-25x);
}

.apprinter-app-header--visually-hidden {
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
