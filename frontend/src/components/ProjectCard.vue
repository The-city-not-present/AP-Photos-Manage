<script setup>
defineProps({
  project: { type: Object, required: true },
})
</script>

<template>
  <article class="apph-project-card">
    <header class="apph-project-card-header">
      <h3 class="apph-project-card-name">
        <RouterLink :to="{ name: 'project-overview', params: { projectId: project.id } }">
          {{ project.name }}
        </RouterLink>
      </h3>
      <RouterLink
        class="apph-btn apph-project-card-open"
        :to="{ name: 'project-overview', params: { projectId: project.id } }"
      >
        Open
      </RouterLink>
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
</style>

