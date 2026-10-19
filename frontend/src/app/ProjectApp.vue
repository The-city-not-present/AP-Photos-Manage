<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

// The encapsulated app can still use common components from the outer root.
import AppHeader from '../components/AppHeader.vue'
import AppNav from '../components/AppNav.vue'

const props = defineProps({
  projectId: { type: String, required: true },
})

const router = useRouter()
const loading = ref(true)
const project = ref(null)

const navLinks = computed(() => [
  {
    label: 'Overview',
    to: { name: 'project-overview', params: { projectId: props.projectId } },
  },
  {
    label: 'Catalog',
    to: { name: 'project-catalog', params: { projectId: props.projectId } },
  },
])

function titleCase(value) {
  return value.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

function loadProject() {
  loading.value = true
  project.value = null

  // TODO: replace with a real call that opens the project environment
  // (database, search index, caches, ...).
  setTimeout(() => {
    project.value = { id: props.projectId, name: titleCase(props.projectId) }
    loading.value = false
  }, 250)
}

function closeProject() {
  router.push({ name: 'welcome' })
}

onMounted(loadProject)
watch(() => props.projectId, loadProject)
</script>

<template>
  <div class="apph-project-app">
    <AppHeader
      :title="loading ? 'Loading project…' : project.name"
      subtitle="Loaded project environment"
    >
      <button class="apph-btn" @click="closeProject">Close project</button>
    </AppHeader>

    <AppNav :links="navLinks" />

    <main class="apph-project-app-main">
      <p v-if="loading" class="apph-project-app-loading">Opening project…</p>
      <RouterView v-else />
    </main>
  </div>
</template>

<style scoped>
.apph-project-app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.apph-project-app-main {
  flex: 1;
  padding: var(--apph-space-0-5x) 0;
}

.apph-project-app-loading {
  padding: var(--apph-space);
  color: var(--apph-color-muted);
}
</style>
