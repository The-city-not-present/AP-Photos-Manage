<script setup>
defineProps({
  photo: { type: Object, required: true },
})
</script>

<template>
  <figure class="apph-photo-thumb">
    <!-- Placeholder frame: real image rendering (thumbnail generation) comes later. -->
    <div class="apph-photo-thumb-frame">
      <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.5" />
        <circle cx="8.5" cy="9.5" r="1.5" fill="currentColor" />
        <path d="M3 17l5-5 4 4 3-3 6 6" fill="none" stroke="currentColor" stroke-width="1.5" />
      </svg>
    </div>
    <figcaption class="apph-photo-thumb-name" :title="photo.name">{{ photo.name }}</figcaption>
  </figure>
</template>

<style scoped>
.apph-photo-thumb {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--apph-space-0-125x);
}

.apph-photo-thumb-frame {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--apph-color-bg);
  border: 1px solid var(--apph-border-color);
  border-radius: var(--apph-border-radius);
  color: var(--apph-color-muted);
}

.apph-photo-thumb-name {
  font-size: 0.8rem;
  color: var(--apph-color-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
