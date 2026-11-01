<script setup>
import PhotoThumb from './PhotoThumb.vue'

defineProps({
  photos: { type: Array, required: true },
})
</script>

<template>
  <div class="apprinter-photo-grid">
    <PhotoThumb v-for="photo in photos" :key="photo.path" :photo="photo" />
  </div>
</template>

<style scoped>
.apprinter-photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: var(--apprinter-space-0-5x);
}
</style>
