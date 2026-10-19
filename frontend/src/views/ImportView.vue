<script setup>
import { ref } from 'vue'

const projectName = ref('')
const folderPath = ref('')
const submitted = ref(false)

function onSubmit() {
  // TODO: connect to the backend import flow.
  submitted.value = true
}
</script>

<template>
  <section class="container">
    <h2>Import photos</h2>
    <p class="apph-page-lede">
      Import a folder of photos to create a new project. The project owns its own
      database, index and caches; your originals are never modified.
    </p>

    <form class="apph-import-form" @submit.prevent="onSubmit">
      <div class="apph-import-field">
        <label class="apph-form-label" for="project-name">Project name</label>
        <input
          id="project-name"
          v-model="projectName"
          class="apph-form-control"
          type="text"
          placeholder="e.g. Trip 2025"
          required
        />
      </div>

      <div class="apph-import-field">
        <label class="apph-form-label" for="folder-path">Folder to import</label>
        <input
          id="folder-path"
          v-model="folderPath"
          class="apph-form-control"
          type="text"
          placeholder="/path/to/photos"
          required
        />
      </div>

      <div class="apph-import-form-actions">
        <button class="apph-btn apph-btn-primary" type="submit">
          Create project &amp; import
        </button>
        <RouterLink class="apph-btn" :to="{ name: 'welcome' }">Cancel</RouterLink>
      </div>
    </form>

    <p v-if="submitted" class="apph-notice">
      Import is not wired to the backend yet — this is a starter page. (Project:
      {{ projectName || 'unnamed' }}, folder: {{ folderPath || 'none' }})
    </p>
  </section>
</template>

<style scoped>
.apph-import-form {
  display: flex;
  flex-direction: column;
  gap: var(--apph-space-0-5x);
  max-width: 480px;
}

.apph-import-field {
  display: flex;
  flex-direction: column;
  gap: var(--apph-space-0-125x);
}

.apph-import-field .apph-form-label {
  display: block;
  padding: 0;
  font-weight: 600;
}

.apph-import-field .apph-form-control {
  width: 100%;
}

.apph-import-form-actions {
  display: flex;
  gap: var(--apph-space-0-25x);
}
</style>
