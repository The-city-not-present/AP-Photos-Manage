<script setup>
import { ref } from 'vue'
import EmptyState from '../components/EmptyState.vue'
import RecordsFilter from '../components/records-filter/RecordsFilter.vue'
import ProjectCard from '../components/ProjectCard.vue'

// TODO: replace with a real project list fetched from the backend.
const projects = ref([
  {
    id: 'alps-2025',
    name: 'Alps hiking 2025',
    description: 'Two-week hike across the Alps with old friends.',
    place: 'Alps, Switzerland',
    eventDate: '2025-07-12',
    tags: ['hiking', 'friends', 'mountains'],
    color: 'green',
    backupPaths: ['/Volumes/HDD-1/alps-2025', 's3://archive/alps-2025'],
    createdAt: '2025-07-15T10:00:00',
    devStartedAt: '2025-07-16T09:00:00',
    releasedAt: '2025-08-30T18:00:00',
  },
  {
    id: 'family-archive',
    name: 'Family archive',
    description: 'Scanned and digitized family photos spanning decades.',
    place: 'Home',
    eventDate: '1990-01-01',
    tags: ['family', 'archive', 'scans'],
    color: 'blue',
    backupPaths: ['/Volumes/HDD-2/family-archive', '/Volumes/NAS/family-archive'],
    createdAt: '2024-01-10T08:00:00',
    devStartedAt: '2024-01-11T08:00:00',
    releasedAt: '',
  },
  {
    id: 'japan-2024',
    name: 'Japan trip 2024',
    description: 'Cherry blossom season across Tokyo and Kyoto.',
    place: 'Japan',
    eventDate: '2024-04-05',
    tags: ['travel', 'japan', 'spring'],
    color: 'pink',
    backupPaths: ['/Volumes/HDD-1/japan-2024'],
    createdAt: '2024-04-20T12:00:00',
    devStartedAt: '2024-04-22T10:00:00',
    releasedAt: '2024-06-01T20:00:00',
  },
  {
    id: 'iceland-2023',
    name: 'Iceland 2023',
    description: 'Ring road and northern lights.',
    place: 'Iceland',
    eventDate: '2023-09-10',
    tags: ['travel', 'landscape', 'aurora'],
    color: 'purple',
    backupPaths: ['/Volumes/HDD-3/iceland-2023'],
    createdAt: '2023-09-25T09:00:00',
    devStartedAt: '2023-09-26T09:00:00',
    releasedAt: '2023-11-15T19:00:00',
  },
  {
    id: 'wedding-2022',
    name: 'Wedding 2022',
    description: 'Wedding of friends in Prague.',
    place: 'Prague, Czechia',
    eventDate: '2022-06-18',
    tags: ['wedding', 'friends'],
    color: 'red',
    backupPaths: ['/Volumes/HDD-1/wedding-2022', 'cloud://photos/wedding-2022'],
    createdAt: '2022-06-25T11:00:00',
    devStartedAt: '2022-06-27T09:00:00',
    releasedAt: '2022-08-01T21:00:00',
  },
  {
    id: 'wildlife-2021',
    name: 'Wildlife safari 2021',
    description: 'Safari through national parks in Kenya.',
    place: 'Kenya',
    eventDate: '2021-08-20',
    tags: ['wildlife', 'safari', 'travel'],
    color: 'orange',
    backupPaths: ['/Volumes/HDD-2/wildlife-2021'],
    createdAt: '2021-09-05T10:00:00',
    devStartedAt: '2021-09-06T10:00:00',
    releasedAt: '2021-12-10T18:00:00',
  },
  {
    id: 'city-stroll-2020',
    name: 'City stroll 2020',
    description: 'Weekend street photography in New York.',
    place: 'New York, USA',
    eventDate: '2020-11-03',
    tags: ['city', 'street', 'black and white'],
    color: 'teal',
    backupPaths: ['/Volumes/HDD-1/city-stroll-2020'],
    createdAt: '2020-11-10T09:00:00',
    devStartedAt: '2020-11-11T09:00:00',
    releasedAt: '2020-11-30T17:00:00',
  },
  {
    id: 'grandmas-photos',
    name: "Grandma's old photos",
    description: 'Old prints scanned from family albums.',
    place: 'Unknown',
    eventDate: '1960-01-01',
    tags: ['family', 'archive', 'scans'],
    color: 'brown',
    backupPaths: ['/Volumes/NAS/scans/grandma'],
    createdAt: '2024-05-01T08:00:00',
    devStartedAt: '2024-05-02T08:00:00',
    releasedAt: '',
  },
])

const columns = {
  name: 'Name',
  description: 'Description',
  place: 'Place',
  eventDate: 'Date',
  tags: 'Tags',
  color: 'Color',
  backupPaths: 'Backup paths',
  createdAt: 'Created',
  devStartedAt: 'Started',
  releasedAt: 'Released',
}
</script>

<template>
  <section class="container">
    <div class="apph-page-header">
      <h2>Projects</h2>
      <RouterLink class="apph-btn apph-btn-primary" :to="{ name: 'import' }">
        Import photos
      </RouterLink>
    </div>

    <p class="apph-page-lede">
      A project is a self-contained photo catalog — its own database, index and
      caches. Filter and sort below, then pick a project to open it.
    </p>

    <EmptyState
      v-if="projects.length === 0"
      title="No projects yet"
      message="Import a folder of photos to create your first project."
    >
      <RouterLink class="apph-btn apph-btn-primary" :to="{ name: 'import' }">
        Import photos
      </RouterLink>
    </EmptyState>

    <RecordsFilter
      v-else
      :columns="columns"
      :records="projects"
      key-field="id"
      need-sort
      :records-per-page="5"
      v-slot="{ records }"
    >
      <ul class="apph-project-list">
        <li
          v-for="project in records"
          :key="project.id"
          :class="project._filterMeta?.cssClasses"
        >
          <ProjectCard :project="project" />
        </li>
      </ul>
    </RecordsFilter>
  </section>
</template>

<style scoped>
.apph-project-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--apph-space-0-5x);
}

.apph-project-list > li {
  padding: 0;
}
</style>
