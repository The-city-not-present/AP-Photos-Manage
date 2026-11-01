<template>
  <section class="container apprinter-not-found">
    <h2>Page not found</h2>
    <p class="apprinter-page-lede">Nothing lives at this address.</p>
    <RouterLink class="apprinter-btn" :to="{ name: 'welcome' }">Back to projects</RouterLink>
  </section>
</template>

<style scoped>
.apprinter-not-found {
  text-align: center;
}
</style>
