<template>
  <section class="container apph-not-found">
    <h2>Page not found</h2>
    <p class="apph-page-lede">Nothing lives at this address.</p>
    <RouterLink class="apph-btn" :to="{ name: 'welcome' }">Back to projects</RouterLink>
  </section>
</template>

<style scoped>
.apph-not-found {
  text-align: center;
}
</style>
