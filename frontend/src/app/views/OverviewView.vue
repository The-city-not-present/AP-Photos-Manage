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
    <p class="apph-page-lede">
      Project <code>{{ projectId }}</code> is loaded.
    </p>

    <ul class="apph-scope-list">
      <li v-for="item in scope" :key="item.name" class="apph-scope-list-item">
        <span>{{ item.name }}</span>
        <span class="apph-scope-status" :class="`apph-scope-status-${item.status}`">
          {{ item.status }}
        </span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.apph-scope-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--apph-space-0-25x);
  max-width: 480px;
}

.apph-scope-list-item {
  display: flex;
  justify-content: space-between;
  padding: var(--apph-space-0-25x) var(--apph-space-0-5x);
  background: var(--apph-color-surface);
  border: 1px solid var(--apph-border-color);
  border-radius: var(--apph-border-radius);
}

.apph-scope-status {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.apph-scope-status-ready {
  color: #15803d;
}

.apph-scope-status-empty {
  color: var(--apph-color-muted);
}
</style>
