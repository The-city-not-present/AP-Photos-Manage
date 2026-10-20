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
  <article class="apph-project-card">
    <header class="apph-project-card-header">
      <h3 class="apph-project-card-name">
        <RouterLink :to="{ name: 'project-overview', params: { projectId: project.id } }">
          {{ project.name }}
        </RouterLink>
      </h3>
      <div class="apph-project-card-actions">
        <RouterLink
          class="apph-btn apph-project-card-open"
          :to="{ name: 'project-overview', params: { projectId: project.id } }"
        >
          Open
        </RouterLink>
        <div ref="menuRoot" class="apph-project-card-menu">
          <button
            class="apph-project-card-menu-btn"
            type="button"
            aria-haspopup="menu"
            :aria-expanded="menuOpen"
            aria-label="More actions"
            @click.stop="toggleMenu"
          >⋯</button>
          <div v-if="menuOpen" class="apph-project-card-menu-pop" role="menu">
            <button
              class="apph-project-card-menu-item"
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

    <p v-if="project.description" class="apph-project-card-description">{{ project.description }}</p>

    <dl class="apph-project-card-attrs">
      <div>
        <dt>Folder</dt>
        <dd>{{ project.folder }}</dd>
      </div>
      <div v-if="project.created_at">
        <dt>Created</dt>
        <dd><apph-format-datetime :dt="project.created_at" /></dd>
      </div>
    </dl>
  </article>
</template>

<style scoped>
.apph-project-card {
  background: var(--apph-color-surface);
  border: 1px solid var(--apph-border-color);
  border-radius: var(--apph-border-radius);
  color: var(--apph-color-text);
  padding: var(--apph-space-0-5x) var(--apph-space-0-75x);
}

.apph-project-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--apph-space-0-5x);
}

.apph-project-card-name {
  margin: 0;
  padding: 0;
  font-size: 1.1rem;
}

.apph-project-card-name a {
  color: var(--apph-color-text);
  text-decoration: none;
}

.apph-project-card-name a:hover {
  color: var(--apph-color-link-hover);
  text-decoration: underline;
}

.apph-project-card-actions {
  display: flex;
  align-items: center;
  gap: var(--apph-space-0-25x);
}

.apph-project-card-description {
  margin: var(--apph-space-0-125x) 0 0;
  color: var(--apph-color-muted);
}

.apph-project-card-attrs {
  margin: var(--apph-space-0-25x) 0 0;
  display: grid;
  gap: var(--apph-space-0-125x);
}

.apph-project-card-attrs div {
  display: grid;
  grid-template-columns: 90px 1fr;
  gap: var(--apph-space-0-5x);
}

.apph-project-card-attrs dt {
  font-weight: 600;
  color: var(--apph-color-muted);
  font-size: 0.85rem;
}

.apph-project-card-attrs dd {
  margin: 0;
  overflow-wrap: anywhere;
}

/* Subtle "more actions" menu — deliberately quiet, not red. */
.apph-project-card-menu {
  position: relative;
}

.apph-project-card-menu-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  font: inherit;
  color: var(--apph-color-muted);
  padding: 0.1em 0.45em;
  border-radius: var(--apph-border-radius);
}

.apph-project-card-menu-btn:hover,
.apph-project-card-menu-btn:focus {
  background: var(--apph-color-bg);
  outline: none;
}

.apph-project-card-menu-pop {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 10;
  min-width: 120px;
  background: var(--apph-color-surface);
  border: 1px solid var(--apph-border-color);
  border-radius: var(--apph-border-radius);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  padding: var(--apph-space-0-125x);
}

.apph-project-card-menu-item {
  display: block;
  width: 100%;
  text-align: left;
  border: none;
  background: transparent;
  cursor: pointer;
  font: inherit;
  color: var(--apph-color-text);
  padding: 0.35em 0.6em;
  border-radius: var(--apph-border-radius);
}

.apph-project-card-menu-item:hover,
.apph-project-card-menu-item:focus {
  background: var(--apph-color-bg);
  outline: none;
}
</style>


