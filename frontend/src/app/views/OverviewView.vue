<script setup>
defineProps({
  projectId: { type: String, required: true },
})

// Starter placeholders for the project "scope" — everything that belongs to it.
const scope = [
  { name: 'Catalog database', status: 'ready' },
  { name: 'Search index', status: 'ready' },
  { name: 'Thumbnail cache', status: 'empty' },
  { name: 'Preview cache', status: 'empty' },
]
</script>

<template>
  <section class="container">
    <h2>Overview</h2>
    <p class="apprinter-page-lede">
      Project <code>{{ projectId }}</code> is loaded.
    </p>

    <ul class="apprinter-scope-list">
      <li v-for="item in scope" :key="item.name" class="apprinter-scope-list-item">
        <span>{{ item.name }}</span>
        <span class="apprinter-scope-status" :class="`apprinter-scope-status-${item.status}`">
          {{ item.status }}
        </span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.apprinter-scope-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--apprinter-space-0-25x);
  max-width: 480px;
}

.apprinter-scope-list-item {
  display: flex;
  justify-content: space-between;
  padding: var(--apprinter-space-0-25x) var(--apprinter-space-0-5x);
  background: var(--apprinter-color-surface);
  border: 1px solid var(--apprinter-border-color);
  border-radius: var(--apprinter-border-radius);
}

.apprinter-scope-status {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.apprinter-scope-status-ready {
  color: #15803d;
}

.apprinter-scope-status-empty {
  color: var(--apprinter-color-muted);
}
</style>
