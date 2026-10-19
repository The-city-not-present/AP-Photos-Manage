<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  project: { type: Object, required: true },
})

const expanded = ref(false)

function toggle() {
  expanded.value = !expanded.value
}

const colorHex = {
  green: '#2e7d32',
  blue: '#1976d2',
  pink: '#d81b60',
  purple: '#7b1fa2',
  red: '#c62828',
  orange: '#ef6c00',
  teal: '#00796b',
  brown: '#6d4c41',
}

const swatch = computed(() => colorHex[props.project.color] || '#888888')
</script>

<template>
  <article class="apph-project-card">
    <header class="apph-project-card-header">
      <button class="apph-project-card-toggle" type="button" :aria-expanded="expanded" @click="toggle">
        {{ expanded ? '▾' : '▸' }}
      </button>
      <span class="apph-project-card-swatch" :style="{ background: swatch }" />
      <h3 class="apph-project-card-name">
        <RouterLink :to="{ name: 'project-overview', params: { projectId: project.id } }">
          {{ project.name }}
        </RouterLink>
      </h3>
      <p class="apph-project-card-summary">
        <apph-format-datetime :dt="project.eventDate" date-only /> · {{ project.place }} · {{ project.tags.length }} tags
      </p>
      <RouterLink
        class="apph-btn apph-project-card-open"
        :to="{ name: 'project-overview', params: { projectId: project.id } }"
      >
        Open
      </RouterLink>
    </header>

    <div v-if="expanded" class="apph-project-card-body">
      <dl class="apph-project-card-attrs">
        <div v-if="project.description">
          <dt>Description</dt>
          <dd>{{ project.description }}</dd>
        </div>
        <div v-if="project.place">
          <dt>Place</dt>
          <dd>{{ project.place }}</dd>
        </div>
        <div v-if="project.eventDate">
          <dt>Date</dt>
          <dd><apph-format-datetime :dt="project.eventDate" date-only /></dd>
        </div>
        <div v-if="project.tags.length">
          <dt>Tags</dt>
          <dd>{{ project.tags.join(', ') }}</dd>
        </div>
        <div v-if="project.color">
          <dt>Color</dt>
          <dd>{{ project.color }}</dd>
        </div>
        <div v-if="project.backupPaths.length">
          <dt>Backup paths</dt>
          <dd>
            <ul class="apph-project-card-paths">
              <li v-for="path in project.backupPaths" :key="path">{{ path }}</li>
            </ul>
          </dd>
        </div>
        <div v-if="project.createdAt">
          <dt>Created</dt>
          <dd><apph-format-datetime :dt="project.createdAt" /></dd>
        </div>
        <div v-if="project.devStartedAt">
          <dt>Started</dt>
          <dd><apph-format-datetime :dt="project.devStartedAt" /></dd>
        </div>
        <div v-if="project.releasedAt">
          <dt>Released</dt>
          <dd><apph-format-datetime :dt="project.releasedAt" /></dd>
        </div>
      </dl>
    </div>
  </article>
</template>

<style scoped>
.apph-project-card {
  background: var(--apph-color-surface);
  border: 1px solid var(--apph-border-color);
  border-radius: var(--apph-border-radius);
  color: var(--apph-color-text);
}

.apph-project-card-header {
  display: flex;
  align-items: center;
  gap: var(--apph-space-0-5x);
  padding: var(--apph-space-0-5x) var(--apph-space-0-75x);
}

.apph-project-card-toggle {
  border: none;
  background: transparent;
  cursor: pointer;
  font: inherit;
  color: var(--apph-color-muted);
  padding: 0;
  min-width: 1em;
}

.apph-project-card-swatch {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  flex: none;
  border: 1px solid rgba(0, 0, 0, 0.15);
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

.apph-project-card-summary {
  margin: 0;
  color: var(--apph-color-muted);
  font-size: 0.9rem;
}

.apph-project-card-open {
  margin-left: auto;
}

.apph-project-card-body {
  padding: var(--apph-space-0-25x) var(--apph-space-0-75x) var(--apph-space-0-75x);
  border-top: 1px solid var(--apph-border-color);
}

.apph-project-card-attrs {
  margin: 0;
  display: grid;
  gap: var(--apph-space-0-25x);
}

.apph-project-card-attrs div {
  display: grid;
  grid-template-columns: 130px 1fr;
  gap: var(--apph-space-0-5x);
}

.apph-project-card-attrs dt {
  font-weight: 600;
  color: var(--apph-color-muted);
  font-size: 0.9rem;
}

.apph-project-card-attrs dd {
  margin: 0;
}

.apph-project-card-paths {
  margin: 0;
  padding: 0;
  list-style: none;
}

.apph-project-card-paths li {
  padding: 1px 0;
}
</style>
