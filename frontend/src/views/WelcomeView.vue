<script setup>
import { ref } from 'vue'
import EmptyState from '../components/EmptyState.vue'

// TODO: replace with a real project list fetched from the backend.
const projects = ref([
  { id: 'trip-2025', name: 'Trip 2025', photoCount: 1240 },
  { id: 'family-archive', name: 'Family archive', photoCount: 8301 },
])
</script>

<template>
  <section class="container">
    <div class="apph-page-header">
      <h2>Projects</h2>
      <RouterLink class="apph-btn apph-btn-primary" :to="{ name: 'import' }">
        Import photos
      </RouterLink>
    </div>

    <p class="apph-page-lede">
      A project is a self-contained photo catalog — its own database, index and
      caches. Pick one to open it, or import photos to create a new one.
    </p>

    <EmptyState
      v-if="projects.length === 0"
      title="No projects yet"
      message="Import a folder of photos to create your first project."
    >
      <RouterLink class="apph-btn apph-btn-primary" :to="{ name: 'import' }">
        Import photos
      </RouterLink>
    </EmptyState>

    <ul v-else class="apph-project-list">
      <li v-for="project in projects" :key="project.id">
        <RouterLink
          class="apph-project-card"
          :to="{ name: 'project-overview', params: { projectId: project.id } }"
        >
          <h3 class="apph-project-card-name">{{ project.name }}</h3>
          <p class="apph-project-card-meta">
            {{ project.photoCount.toLocaleString() }} photos
          </p>
        </RouterLink>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.apph-project-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--apph-space-0-5x);
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
}

.apph-project-list > li {
  padding: 0;
}

.apph-project-card {
  display: block;
  padding: var(--apph-space-0-5x) var(--apph-space-0-75x);
  background: var(--apph-color-surface);
  border: 1px solid var(--apph-border-color);
  border-radius: var(--apph-border-radius);
  color: var(--apph-color-text);
  text-decoration: none;
}

.apph-project-card:hover {
  border-color: var(--apph-color-primary);
  text-decoration: none;
}

.apph-project-card-name {
  margin: 0 0 var(--apph-space-0-125x);
  padding: 0;
}

.apph-project-card-meta {
  margin: 0;
  color: var(--apph-color-muted);
  font-size: 0.9rem;
}
</style>
