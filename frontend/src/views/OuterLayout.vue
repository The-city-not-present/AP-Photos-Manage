<script setup>
import AppHeader from '../components/AppHeader.vue'
import AppNav from '../components/AppNav.vue'
import BackendStatus from '../components/BackendStatus.vue'
import ErrorBoundary from '../components/ErrorBoundary.vue'

const navLinks = [
  { label: 'Projects', to: { name: 'welcome' } },
  { label: 'Help', to: { name: 'help' } },
]
</script>

<template>
  <div class="apprinter-outer-layout">
    <AppHeader
      title="Rabid Printer"
      subtitle="Manage and sort your photo library"
      visually-hidden
    />
    <AppNav :links="navLinks" />

    <main class="apprinter-outer-layout-main">
      <ErrorBoundary>
        <RouterView />
      </ErrorBoundary>
    </main>

    <footer class="apprinter-outer-layout-footer">
      <BackendStatus />
    </footer>
  </div>
</template>

<style scoped>
.apprinter-outer-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.apprinter-outer-layout-main {
  flex: 1;
  padding: var(--apprinter-space-0-5x) 0;
}

.apprinter-outer-layout-footer {
  padding: var(--apprinter-space-0-5x) var(--apprinter-space);
  border-top: 1px solid var(--apprinter-border-color);
  color: var(--apprinter-color-muted);
  font-size: 0.85rem;
}
</style>
