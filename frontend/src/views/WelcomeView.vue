<script setup>
import { ref } from 'vue'
import EmptyState from '../components/EmptyState.vue'
import RecordsFilter from '../components/records-filter/RecordsFilter.vue'
import ProjectCard from '../components/ProjectCard.vue'
import { useAppConfig } from '../config'

// Temporary development data lives in src/config/test-projects.js.
const { testProjects } = useAppConfig()
const projects = ref(testProjects)

const columns = {
  name: 'Name',
  description: 'Description',
  place: 'Place',
  eventDate: 'Date',
  tags: 'Tags',
  color: 'Color',
  backupPaths: 'Backup paths',
  createdAt: 'Created',
  devStartedAt: 'Started',
  releasedAt: 'Released',
}
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
      caches. Filter and sort below, then pick a project to open it.
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

    <RecordsFilter
      v-else
      :columns="columns"
      :records="projects"
      key-field="id"
      need-sort
      :records-per-page="5"
      v-slot="{ records }"
    >
      <ul class="apph-project-list">
        <li
          v-for="project in records"
          :key="project.id"
          :class="project._filterMeta?.cssClasses"
        >
          <ProjectCard :project="project" />
        </li>
      </ul>
    </RecordsFilter>
  </section>
</template>

<style scoped>
.apph-project-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--apph-space-0-5x);
}

.apph-project-list > li {
  padding: 0;
}
</style>
