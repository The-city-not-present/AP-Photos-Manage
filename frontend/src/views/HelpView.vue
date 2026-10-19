<script setup>
import { useAppConfig } from '../config'

const { helpPage } = useAppConfig()
</script>

<template>
  <section class="container">
    <h2>{{ helpPage.title }}</h2>
    <p class="apph-page-lede">{{ helpPage.lede }}</p>

    <template v-for="section in helpPage.sections" :key="section.title">
      <h3>{{ section.title }}</h3>
      <p v-for="(text, index) in section.paragraphs || []" :key="index">{{ text }}</p>
      <ul v-if="section.list">
        <li v-for="(item, index) in section.list" :key="index">
          <template v-if="typeof item === 'string'">{{ item }}</template>
          <template v-else><strong>{{ item.strong }}</strong>{{ item.text }}</template>
        </li>
      </ul>
    </template>
  </section>
</template>
