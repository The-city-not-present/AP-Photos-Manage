<script setup>
defineProps({
  links: { type: Array, required: true },
})
</script>

<template>
  <nav class="apprinter-app-nav">
    <div class="container apprinter-app-nav-inner">
      <RouterLink
        v-for="link in links"
        :key="link.label"
        :to="link.to"
        class="apprinter-app-nav-link"
        exact-active-class="is-active"
      >
        {{ link.label }}
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.apprinter-app-nav {
  background: var(--apprinter-color-surface);
  border-bottom: 1px solid var(--apprinter-border-color);
}

.apprinter-app-nav-inner {
  display: flex;
  gap: var(--apprinter-space-0-125x);
  padding-top: var(--apprinter-space-0-25x);
  padding-bottom: var(--apprinter-space-0-25x);
  overflow-x: auto;
}

.apprinter-app-nav-link {
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  color: var(--apprinter-color-text);
  text-decoration: none;
  white-space: nowrap;
}

.apprinter-app-nav-link:hover {
  background: #f0f2f5;
  text-decoration: none;
}

.apprinter-app-nav-link.is-active {
  background: var(--apprinter-color-primary);
  color: #fff;
}
</style>
