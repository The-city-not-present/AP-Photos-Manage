<script setup>
import { provideAppConfig } from './config'
import ErrorBanner from './components/ErrorBanner.vue'

provideAppConfig()
</script>

<template>
  <ErrorBanner />
  <RouterView />
</template>
