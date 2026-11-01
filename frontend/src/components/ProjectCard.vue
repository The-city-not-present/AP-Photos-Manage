<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  project: { type: Object, required: true },
})

const emit = defineEmits(['delete'])

const menuOpen = ref(false)
const menuRoot = ref(null)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function onDocumentClick(event) {
  if (menuOpen.value && menuRoot.value && !menuRoot.value.contains(event.target)) {
    menuOpen.value = false
  }
}

function requestDelete() {
  menuOpen.value = false
  emit('delete', props.project)
}

onMounted(() => document.addEventListener('click', onDocumentClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocumentClick))
</script>

<template>
  <article class="apprinter-project-card">
    <header class="apprinter-project-card-header">
      <h3 class="apprinter-project-card-name">
        <RouterLink :to="{ name: 'project-overview', params: { projectId: project.id } }">
          {{ project.name }}
        </RouterLink>
      </h3>
      <div class="apprinter-project-card-actions">
        <RouterLink
          class="apprinter-btn apprinter-project-card-open"
          :to="{ name: 'project-overview', params: { projectId: project.id } }"
        >
          Open
        </RouterLink>
        <div ref="menuRoot" class="apprinter-project-card-menu">
          <button
            class="apprinter-project-card-menu-btn"
            type="button"
            aria-haspopup="menu"
            :aria-expanded="menuOpen"
            aria-label="More actions"
            @click.stop="toggleMenu"
          >⋯</button>
          <div v-if="menuOpen" class="apprinter-project-card-menu-pop" role="menu">
            <button
              class="apprinter-project-card-menu-item"
              type="button"
              role="menuitem"
              @click="requestDelete"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </header>

    <p v-if="project.description" class="apprinter-project-card-description">{{ project.description }}</p>

    <dl class="apprinter-project-card-attrs">
      <div>
        <dt>Folder</dt>
        <dd>{{ project.folder }}</dd>
      </div>
      <div v-if="project.created_at">
        <dt>Created</dt>
        <dd><apprinter-format-datetime :dt="project.created_at" /></dd>
      </div>
    </dl>
  </article>
</template>

<style scoped>
.apprinter-project-card {
  background: var(--apprinter-color-surface);
  border: 1px solid var(--apprinter-border-color);
  border-radius: var(--apprinter-border-radius);
  color: var(--apprinter-color-text);
  padding: var(--apprinter-space-0-5x) var(--apprinter-space-0-75x);
}

.apprinter-project-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--apprinter-space-0-5x);
}

.apprinter-project-card-name {
  margin: 0;
  padding: 0;
  font-size: 1.1rem;
}

.apprinter-project-card-name a {
  color: var(--apprinter-color-text);
  text-decoration: none;
}

.apprinter-project-card-name a:hover {
  color: var(--apprinter-color-link-hover);
  text-decoration: underline;
}

.apprinter-project-card-actions {
  display: flex;
  align-items: center;
  gap: var(--apprinter-space-0-25x);
}

.apprinter-project-card-description {
  margin: var(--apprinter-space-0-125x) 0 0;
  color: var(--apprinter-color-muted);
}

.apprinter-project-card-attrs {
  margin: var(--apprinter-space-0-25x) 0 0;
  display: grid;
  gap: var(--apprinter-space-0-125x);
}

.apprinter-project-card-attrs div {
  display: grid;
  grid-template-columns: 90px 1fr;
  gap: var(--apprinter-space-0-5x);
}

.apprinter-project-card-attrs dt {
  font-weight: 600;
  color: var(--apprinter-color-muted);
  font-size: 0.85rem;
}

.apprinter-project-card-attrs dd {
  margin: 0;
  overflow-wrap: anywhere;
}

/* Subtle "more actions" menu — deliberately quiet, not red. */
.apprinter-project-card-menu {
  position: relative;
}

.apprinter-project-card-menu-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  font: inherit;
  color: var(--apprinter-color-muted);
  padding: 0.1em 0.45em;
  border-radius: var(--apprinter-border-radius);
}

.apprinter-project-card-menu-btn:hover,
.apprinter-project-card-menu-btn:focus {
  background: var(--apprinter-color-bg);
  outline: none;
}

.apprinter-project-card-menu-pop {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 10;
  min-width: 120px;
  background: var(--apprinter-color-surface);
  border: 1px solid var(--apprinter-border-color);
  border-radius: var(--apprinter-border-radius);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  padding: var(--apprinter-space-0-125x);
}

.apprinter-project-card-menu-item {
  display: block;
  width: 100%;
  text-align: left;
  border: none;
  background: transparent;
  cursor: pointer;
  font: inherit;
  color: var(--apprinter-color-text);
  padding: 0.35em 0.6em;
  border-radius: var(--apprinter-border-radius);
}

.apprinter-project-card-menu-item:hover,
.apprinter-project-card-menu-item:focus {
  background: var(--apprinter-color-bg);
  outline: none;
}
</style>


