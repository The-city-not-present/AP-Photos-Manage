<script setup>
import AppHeader from '../components/AppHeader.vue'
import AppNav from '../components/AppNav.vue'
import BackendStatus from '../components/BackendStatus.vue'

const navLinks = [
  { label: 'Projects', to: { name: 'welcome' } },
  { label: 'Import photos', to: { name: 'import' } },
  { label: 'Help', to: { name: 'help' } },
]
</script>

<template>
  <div class="apph-outer-layout">
    <AppHeader
      title="App Photo Assistant"
      subtitle="Manage and sort your photo library"
    />
    <AppNav :links="navLinks" />

    <main class="apph-outer-layout-main">
      <RouterView />
    </main>

    <footer class="apph-outer-layout-footer">
      <BackendStatus />
    </footer>
  </div>
</template>

<style scoped>
.apph-outer-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.apph-outer-layout-main {
  flex: 1;
  padding: var(--apph-space-0-5x) 0;
}

.apph-outer-layout-footer {
  padding: var(--apph-space-0-5x) var(--apph-space);
  border-top: 1px solid var(--apph-border-color);
  color: var(--apph-color-muted);
  font-size: 0.85rem;
}
</style>
