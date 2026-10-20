<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import PhotoGrid from '../photos/PhotoGrid.vue'
import { createProject, scanFolder } from '../../services/api.js'
import { reportError } from '../../services/errors.js'
import { guessProjectName } from './guessName.js'

const emit = defineEmits(['close', 'created'])

const step = ref(1)
const folder = ref('')
const name = ref('')
const description = ref('')
const detailsOpen = ref(true)
const photos = ref([])
const scanning = ref(false)
const creating = ref(false)
const formError = ref('')

const title = computed(() => (step.value === 1 ? 'Choose folder' : 'Review photos'))

function onKeydown(event) {
  if (event.key === 'Escape') emit('close')
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  document.body.style.overflow = 'hidden'
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

async function continueToPhotos() {
  const trimmedFolder = folder.value.trim()

  formError.value = ''
  if (!trimmedFolder) {
    formError.value = 'Choose a folder with photos.'
    return
  }

  scanning.value = true
  try {
    photos.value = await scanFolder(trimmedFolder)
    if (!name.value.trim()) {
      name.value = guessProjectName(trimmedFolder)
    }
    step.value = 2
  } catch (err) {
    reportError(err)
  } finally {
    scanning.value = false
  }
}

async function submit() {
  const trimmedName = name.value.trim()
  const trimmedFolder = folder.value.trim()

  formError.value = ''
  if (!trimmedFolder) {
    formError.value = 'Choose a folder with photos.'
    step.value = 1
    return
  }
  if (!trimmedName) {
    formError.value = 'Enter a project name.'
    detailsOpen.value = true
    return
  }

  creating.value = true
  try {
    const project = await createProject({
      name: trimmedName,
      folder: trimmedFolder,
      description: description.value.trim(),
    })
    emit('created', project)
  } catch (err) {
    reportError(err)
  } finally {
    creating.value = false
  }
}

function back() {
  step.value = 1
}
</script>

<template>
  <div class="apph-dialog" @click.self="emit('close')">
    <div class="apph-dialog-window" role="dialog" aria-modal="true" :aria-label="title">
      <header class="apph-dialog-header">
        <h2 class="apph-dialog-title">{{ title }}</h2>
        <button
          class="apph-btn-unstyled apph-dialog-close"
          type="button"
          aria-label="Close"
          @click="emit('close')"
        >✕</button>
      </header>

      <div class="apph-dialog-body">
        <div v-if="step === 1" class="apph-create-project-form">
          <div class="apph-create-project-field">
            <label class="apph-form-label" for="create-folder">Folder with photos</label>
            <input
              id="create-folder"
              v-model="folder"
              class="apph-form-control"
              type="text"
              placeholder="/path/to/photos"
              @keydown.enter.prevent="continueToPhotos"
            />
          </div>
          <p v-if="formError" class="apph-u-text-error">{{ formError }}</p>
        </div>

        <div v-else class="apph-create-project-review">
          <div class="apph-create-project-details">
            <button
              v-if="!detailsOpen"
              type="button"
              class="apph-btn apph-create-project-details-open"
              @click="detailsOpen = true"
            >
              Project details
            </button>

            <div v-else class="apph-create-project-details-panel">
              <div class="apph-create-project-details-head">
                <span class="apph-create-project-details-title">Project details</span>
                <button
                  type="button"
                  class="apph-btn-unstyled apph-create-project-details-hide"
                  @click="detailsOpen = false"
                >Hide</button>
              </div>
              <div class="apph-create-project-field">
                <label class="apph-form-label" for="create-name">Project name</label>
                <input
                  id="create-name"
                  v-model="name"
                  class="apph-form-control"
                  type="text"
                  placeholder="e.g. Trip 2025"
                  @keydown.enter.prevent="submit"
                />
              </div>
              <div class="apph-create-project-field">
                <label class="apph-form-label" for="create-description">Description</label>
                <textarea
                  id="create-description"
                  v-model="description"
                  class="apph-form-control"
                  rows="2"
                  placeholder="Optional"
                ></textarea>
              </div>
              <p v-if="formError" class="apph-u-text-error">{{ formError }}</p>
            </div>
          </div>

          <p class="apph-create-project-count">
            {{ photos.length }} photo{{ photos.length === 1 ? '' : 's' }} · {{ folder.trim() }}
          </p>
          <PhotoGrid v-if="photos.length" :photos="photos" />
          <p v-else class="apph-u-text-muted">No photos found in this folder.</p>
        </div>
      </div>

      <footer class="apph-dialog-footer">
        <button v-if="step === 2" class="apph-btn" type="button" @click="back">Back</button>
        <button class="apph-btn" type="button" @click="emit('close')">Cancel</button>
        <button
          v-if="step === 1"
          class="apph-btn apph-btn-primary"
          type="button"
          :disabled="scanning"
          @click="continueToPhotos"
        >
          {{ scanning ? 'Scanning…' : 'Continue' }}
        </button>
        <button
          v-else
          class="apph-btn apph-btn-primary"
          type="button"
          :disabled="creating"
          @click="submit"
        >
          {{ creating ? 'Creating…' : 'Create project' }}
        </button>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.apph-dialog {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--apph-space);
  background: rgba(0, 0, 0, 0.45);
}

/* Large window that takes most of the screen for thumbnails. */
.apph-dialog-window {
  width: 100%;
  max-width: 1280px;
  height: 88vh;
  display: flex;
  flex-direction: column;
  background: var(--apph-color-surface);
  border-radius: 8px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
  overflow: hidden;
}

.apph-dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--apph-space-0-5x) var(--apph-space);
  border-bottom: 1px solid var(--apph-border-color);
}

.apph-dialog-title {
  margin: 0;
  font-size: 1.15rem;
}

.apph-dialog-close {
  font-size: 1.1rem;
  line-height: 1;
  padding: 0.25em 0.5em;
  text-align: center;
  color: var(--apph-color-muted);
}

.apph-dialog-body {
  flex: 1;
  overflow-y: auto;
  padding: var(--apph-space-0-5x) var(--apph-space);
}

.apph-dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--apph-space-0-25x);
  padding: var(--apph-space-0-5x) var(--apph-space);
  border-top: 1px solid var(--apph-border-color);
}

.apph-create-project-form {
  display: flex;
  flex-direction: column;
  gap: var(--apph-space-0-5x);
  max-width: 560px;
}

.apph-create-project-field {
  display: flex;
  flex-direction: column;
  gap: var(--apph-space-0-125x);
}

.apph-create-project-field .apph-form-control {
  width: 100%;
}

.apph-create-project-review {
  display: flex;
  flex-direction: column;
  gap: var(--apph-space-0-5x);
}

.apph-create-project-count {
  margin: 0;
  color: var(--apph-color-muted);
}

/* Collapsible project-details panel (step 2). */
.apph-create-project-details-open {
  align-self: flex-start;
}

.apph-create-project-details-panel {
  border: 1px solid var(--apph-border-color);
  border-radius: var(--apph-border-radius);
  padding: var(--apph-space-0-5x);
  background: var(--apph-color-bg);
  display: flex;
  flex-direction: column;
  gap: var(--apph-space-0-5x);
}

.apph-create-project-details-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.apph-create-project-details-title {
  font-weight: 600;
}

.apph-create-project-details-hide {
  color: var(--apph-color-muted);
  font-size: 0.9rem;
}
</style>


