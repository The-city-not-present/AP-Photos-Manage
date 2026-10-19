<script setup>
// The app can reuse common components from the outer root level.
import EmptyState from '../../components/EmptyState.vue'

defineProps({
  projectId: { type: String, required: true },
})
</script>

<template>
  <section class="container">
    <h2>Catalog</h2>
    <p class="apph-page-lede">
      Photos imported into project <code>{{ projectId }}</code> will appear here.
    </p>

    <EmptyState
      title="No photos yet"
      message="Import photos to start building this project's catalog."
    />
  </section>
</template>
