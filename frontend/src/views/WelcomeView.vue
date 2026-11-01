<script setup>
import { onMounted, ref } from 'vue'
import EmptyState from '../components/EmptyState.vue'
import RecordsFilter from '../components/records-filter/RecordsFilter.vue'
import ProjectCard from '../components/ProjectCard.vue'
import CreateProjectDialog from '../components/import/CreateProjectDialog.vue'
import { deleteProject, listProjects } from '../services/api.js'
import { reportError } from '../services/errors.js'

const projects = ref([])
const loading = ref(true)
const showDialog = ref(false)

const columns = {
  name: 'Name',
  description: 'Description',
  folder: 'Folder',
  created_at: { label: 'Created', type: 'date' },
}

async function loadProjects() {
  loading.value = true
  try {
    projects.value = await listProjects()
  } catch (err) {
    reportError(err)
  } finally {
    loading.value = false
  }
}

function openDialog() {
  showDialog.value = true
}

function closeDialog() {
  showDialog.value = false
}

async function handleCreated() {
  closeDialog()
  await loadProjects()
}

async function handleDelete(project) {
  try {
    await deleteProject(project.id)
    await loadProjects()
  } catch (err) {
    reportError(err)
  }
}

onMounted(loadProjects)
</script>

<template>
  <section class="container">
    <div class="apprinter-page-header">
      <h2>Projects</h2>
      <button class="apprinter-btn-create" type="button" @click="openDialog">Create project</button>
    </div>

    <p class="apprinter-page-lede">
      A project is a self-contained photo catalog — its own database, index and
      caches. Create a project from a folder of photos, then open it to curate.
    </p>

    <p v-if="loading" class="apprinter-u-text-muted">Loading projects…</p>

    <EmptyState
      v-else-if="projects.length === 0"
      title="No projects yet"
      message="Create a project from a folder of photos to get started."
    >
      <button class="apprinter-btn-create" type="button" @click="openDialog">Create project</button>
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
      <ul class="apprinter-project-list">
        <li
          v-for="project in records"
          :key="project.id"
          :class="project._filterMeta?.cssClasses"
        >
          <ProjectCard :project="project" @delete="handleDelete" />
        </li>
      </ul>
    </RecordsFilter>

    <CreateProjectDialog v-if="showDialog" @close="closeDialog" @created="handleCreated" />
  </section>
</template>

<style scoped>
.apprinter-project-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--apprinter-space-0-5x);
}

.apprinter-project-list > li {
  padding: 0;
}

/* Bright green "create" action: medium size, bold white text, and a smooth
   350ms background-color transition only (no position/size/border change). */
.apprinter-btn-create {
  display: inline-block;
  padding: 0.55em 1.25em;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid var(--apprinter-color-green);
  border-radius: var(--apprinter-border-radius);
  background-color: var(--apprinter-color-green);
  color: #fff;
  transition: background-color var(--apprinter-transition);
}

.apprinter-btn-create:hover,
.apprinter-btn-create:focus {
  background-color: var(--apprinter-color-green-hover);
  outline: none;
}
</style>


