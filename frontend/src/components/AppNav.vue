<script setup>
defineProps({
  links: { type: Array, required: true },
})
</script>

<template>
  <nav class="apph-app-nav">
    <div class="container apph-app-nav-inner">
      <RouterLink
        v-for="link in links"
        :key="link.label"
        :to="link.to"
        class="apph-app-nav-link"
        exact-active-class="is-active"
      >
        {{ link.label }}
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.apph-app-nav {
  background: var(--apph-color-surface);
  border-bottom: 1px solid var(--apph-border-color);
}

.apph-app-nav-inner {
  display: flex;
  gap: var(--apph-space-0-125x);
  padding-top: var(--apph-space-0-25x);
  padding-bottom: var(--apph-space-0-25x);
  overflow-x: auto;
}

.apph-app-nav-link {
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  color: var(--apph-color-text);
  text-decoration: none;
  white-space: nowrap;
}

.apph-app-nav-link:hover {
  background: #f0f2f5;
  text-decoration: none;
}

.apph-app-nav-link.is-active {
  background: var(--apph-color-primary);
  color: #fff;
}
</style>
