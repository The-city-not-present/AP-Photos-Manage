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
  <div class="apprinter-dialog" @click.self="emit('close')">
    <div class="apprinter-dialog-window" role="dialog" aria-modal="true" :aria-label="title">
      <header class="apprinter-dialog-header">
        <h2 class="apprinter-dialog-title">{{ title }}</h2>
        <button
          class="apprinter-btn-unstyled apprinter-dialog-close"
          type="button"
          aria-label="Close"
          @click="emit('close')"
        >✕</button>
      </header>

      <div class="apprinter-dialog-body">
        <div v-if="step === 1" class="apprinter-create-project-form">
          <div class="apprinter-create-project-field">
            <label class="apprinter-form-label" for="create-folder">Folder with photos</label>
            <input
              id="create-folder"
              v-model="folder"
              class="apprinter-form-control"
              type="text"
              placeholder="/path/to/photos"
              @keydown.enter.prevent="continueToPhotos"
            />
          </div>
          <p v-if="formError" class="apprinter-u-text-error">{{ formError }}</p>
        </div>

        <div v-else class="apprinter-create-project-review">
          <div class="apprinter-create-project-details">
            <button
              v-if="!detailsOpen"
              type="button"
              class="apprinter-btn apprinter-create-project-details-open"
              @click="detailsOpen = true"
            >
              Project details
            </button>

            <div v-else class="apprinter-create-project-details-panel">
              <div class="apprinter-create-project-details-head">
                <span class="apprinter-create-project-details-title">Project details</span>
                <button
                  type="button"
                  class="apprinter-btn-unstyled apprinter-create-project-details-hide"
                  @click="detailsOpen = false"
                >Hide</button>
              </div>
              <div class="apprinter-create-project-field">
                <label class="apprinter-form-label" for="create-name">Project name</label>
                <input
                  id="create-name"
                  v-model="name"
                  class="apprinter-form-control"
                  type="text"
                  placeholder="e.g. Trip 2025"
                  @keydown.enter.prevent="submit"
                />
              </div>
              <div class="apprinter-create-project-field">
                <label class="apprinter-form-label" for="create-description">Description</label>
                <textarea
                  id="create-description"
                  v-model="description"
                  class="apprinter-form-control"
                  rows="2"
                  placeholder="Optional"
                ></textarea>
              </div>
              <p v-if="formError" class="apprinter-u-text-error">{{ formError }}</p>
            </div>
          </div>

          <p class="apprinter-create-project-count">
            {{ photos.length }} photo{{ photos.length === 1 ? '' : 's' }} · {{ folder.trim() }}
          </p>
          <PhotoGrid v-if="photos.length" :photos="photos" />
          <p v-else class="apprinter-u-text-muted">No photos found in this folder.</p>
        </div>
      </div>

      <footer class="apprinter-dialog-footer">
        <button v-if="step === 2" class="apprinter-btn" type="button" @click="back">Back</button>
        <button class="apprinter-btn" type="button" @click="emit('close')">Cancel</button>
        <button
          v-if="step === 1"
          class="apprinter-btn apprinter-btn-primary"
          type="button"
          :disabled="scanning"
          @click="continueToPhotos"
        >
          {{ scanning ? 'Scanning…' : 'Continue' }}
        </button>
        <button
          v-else
          class="apprinter-btn apprinter-btn-primary"
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
.apprinter-dialog {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--apprinter-space);
  background: rgba(0, 0, 0, 0.45);
}

/* Large window that takes most of the screen for thumbnails. */
.apprinter-dialog-window {
  width: 100%;
  max-width: 1280px;
  height: 88vh;
  display: flex;
  flex-direction: column;
  background: var(--apprinter-color-surface);
  border-radius: 8px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
  overflow: hidden;
}

.apprinter-dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--apprinter-space-0-5x) var(--apprinter-space);
  border-bottom: 1px solid var(--apprinter-border-color);
}

.apprinter-dialog-title {
  margin: 0;
  font-size: 1.15rem;
}

.apprinter-dialog-close {
  font-size: 1.1rem;
  line-height: 1;
  padding: 0.25em 0.5em;
  text-align: center;
  color: var(--apprinter-color-muted);
}

.apprinter-dialog-body {
  flex: 1;
  overflow-y: auto;
  padding: var(--apprinter-space-0-5x) var(--apprinter-space);
}

.apprinter-dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--apprinter-space-0-25x);
  padding: var(--apprinter-space-0-5x) var(--apprinter-space);
  border-top: 1px solid var(--apprinter-border-color);
}

.apprinter-create-project-form {
  display: flex;
  flex-direction: column;
  gap: var(--apprinter-space-0-5x);
  max-width: 560px;
}

.apprinter-create-project-field {
  display: flex;
  flex-direction: column;
  gap: var(--apprinter-space-0-125x);
}

.apprinter-create-project-field .apprinter-form-control {
  width: 100%;
}

.apprinter-create-project-review {
  display: flex;
  flex-direction: column;
  gap: var(--apprinter-space-0-5x);
}

.apprinter-create-project-count {
  margin: 0;
  color: var(--apprinter-color-muted);
}

/* Collapsible project-details panel (step 2). */
.apprinter-create-project-details-open {
  align-self: flex-start;
}

.apprinter-create-project-details-panel {
  border: 1px solid var(--apprinter-border-color);
  border-radius: var(--apprinter-border-radius);
  padding: var(--apprinter-space-0-5x);
  background: var(--apprinter-color-bg);
  display: flex;
  flex-direction: column;
  gap: var(--apprinter-space-0-5x);
}

.apprinter-create-project-details-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.apprinter-create-project-details-title {
  font-weight: 600;
}

.apprinter-create-project-details-hide {
  color: var(--apprinter-color-muted);
  font-size: 0.9rem;
}
</style>


