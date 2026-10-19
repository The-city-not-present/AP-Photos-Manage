<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { compareValues, matchValue } from './matchers.js'

const props = defineProps({
  columns: { type: Object, required: true },
  records: { type: Array, required: true },
  keyField: { type: String, required: true },
  needSort: { type: Boolean, default: false },
  recordsPerPage: { type: Number, default: 25 },
})

// How long a record that became hidden stays mounted (css-hidden) before being
// dropped from the rendered list. Preserves component state while the user
// types quickly into the filter boxes.
const HIDE_TTL_MS = 5 * 60 * 1000

const columnsSanitized = computed(() => {
  const out = {}
  for (const [key, def] of Object.entries(props.columns)) {
    if (typeof def === 'string') out[key] = { type: 'text', label: def }
    else if (def && typeof def === 'object') out[key] = { type: def.type || 'text', label: def.label || key }
    else out[key] = { type: 'text', label: key }
  }
  return out
})

const filters = reactive({})
for (const key of Object.keys(props.columns)) filters[key] = ''

const sortingColumn = ref('')
const sortingAscending = ref(true)
const page = ref(0)

const perPage = computed(() => {
  if (props.recordsPerPage === 0) return props.records.length || 1
  return props.recordsPerPage > 0 ? props.recordsPerPage : 25
})

function recordMatches(record) {
  return Object.keys(columnsSanitized.value).every((key) =>
    matchValue(record[key], filters[key], columnsSanitized.value[key].type)
  )
}

const matchedCount = computed(() => props.records.filter((record) => recordMatches(record)).length)
const numPages = computed(() => Math.max(1, Math.ceil(matchedCount.value / perPage.value)))

watch(numPages, (n) => {
  if (page.value >= n) page.value = 0
})

function selectPage(index) {
  page.value = index
}

// Persisted per-record bookkeeping. Intentionally not reactive — it is only a
// cache of "last hidden" timestamps; the reactive `view` below drives rendering.
const meta = new Map()

const view = computed(() => {
  const cols = columnsSanitized.value
  const now = Date.now()
  const pageStart = page.value * perPage.value
  const pageEnd = pageStart + perPage.value

  const list = props.records.slice()
  if (props.needSort && sortingColumn.value && cols[sortingColumn.value]) {
    list.sort((a, b) =>
      compareValues(
        a[sortingColumn.value],
        b[sortingColumn.value],
        cols[sortingColumn.value].type,
        sortingAscending.value
      )
    )
  }

  // 1) filter: mark non-matching records as hidden
  for (const record of list) {
    const key = record[props.keyField]
    let m = meta.get(key)
    if (!m) {
      m = { wasEverShown: false, prevIsHidden: false, isHidden: false, lastHiddenAt: 0 }
      meta.set(key, m)
    }
    m.prevIsHidden = m.isHidden
    m.isHidden = !recordMatches(record)
  }

  // 2) paginate: hide matching records outside the current page
  let matched = 0
  for (const record of list) {
    const m = meta.get(record[props.keyField])
    if (!m.isHidden) {
      if (matched < pageStart || matched >= pageEnd) m.isHidden = true
      matched++
    }
  }

  // 3) build the rendered list, keeping recently-hidden records mounted
  const out = []
  for (const record of list) {
    const m = meta.get(record[props.keyField])
    if (!m.isHidden) {
      m.wasEverShown = true
      m.lastHiddenAt = 0
      out.push({ ...record, _filterMeta: { hidden: false, cssClasses: [] } })
    } else {
      if (!m.prevIsHidden) m.lastHiddenAt = now
      if (m.wasEverShown && now - m.lastHiddenAt < HIDE_TTL_MS) {
        out.push({ ...record, _filterMeta: { hidden: true, cssClasses: ['apph-u-hidden'] } })
      }
    }
  }

  return out
})
</script>

<template>
  <div class="apph-records-filter">
    <form class="apph-records-filter-form" @submit.prevent>
      <div class="apph-records-filter-fields">
        <label v-for="(def, key) in columnsSanitized" :key="key" class="apph-records-filter-field">
          <span class="apph-records-filter-field-label">{{ def.label }}</span>
          <input
            v-model="filters[key]"
            type="text"
            :name="'filter-' + key"
            class="apph-form-control"
            :placeholder="'Filter ' + def.label.toLowerCase() + '…'"
          />
        </label>
      </div>
    </form>

    <div class="apph-records-filter-toolbar">
      <label class="apph-records-filter-sort">
        <span>Sort by</span>
        <select v-model="sortingColumn" name="sort-column" class="apph-form-control">
          <option value="">not sorted</option>
          <option v-for="(def, key) in columnsSanitized" :key="key" :value="key">{{ def.label }}</option>
        </select>
        <select v-model="sortingAscending" name="sort-order" class="apph-form-control">
          <option :value="true">ascending</option>
          <option :value="false">descending</option>
        </select>
      </label>

      <div v-if="numPages > 1" class="apph-records-filter-pagination">
        <span class="apph-records-filter-pagination-label">Page</span>
        <button
          v-for="n in numPages"
          :key="n"
          type="button"
          class="apph-records-filter-page"
          :class="{ 'is-active': n - 1 === page }"
          @click="selectPage(n - 1)"
        >
          {{ n }}
        </button>
      </div>
    </div>

    <div class="apph-records-filter-content">
      <slot :records="view" />
    </div>
  </div>
</template>

<style scoped>
.apph-records-filter {
  display: flex;
  flex-direction: column;
  gap: var(--apph-space-0-5x);
}

.apph-records-filter-fields {
  display: flex;
  flex-wrap: wrap;
  gap: var(--apph-space-0-5x) var(--apph-space-0-75x);
}

.apph-records-filter-field {
  display: flex;
  flex-direction: column;
  gap: var(--apph-space-0-125x);
}

.apph-records-filter-field-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--apph-color-muted);
}

.apph-records-filter-field input {
  width: 180px;
}

.apph-records-filter-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--apph-space-0-5x) var(--apph-space-0-75x);
}

.apph-records-filter-sort {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--apph-space-0-25x);
}

.apph-records-filter-pagination {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--apph-space-0-25x);
}

.apph-records-filter-pagination-label {
  font-size: 0.85rem;
  color: var(--apph-color-muted);
}

.apph-records-filter-page {
  min-width: 28px;
  height: 28px;
  padding: 0 var(--apph-space-0-25x);
  border: 1px solid var(--apph-border-color);
  border-radius: var(--apph-border-radius);
  background: var(--apph-color-surface);
  color: var(--apph-color-text);
  cursor: pointer;
  font: inherit;
}

.apph-records-filter-page:hover {
  border-color: var(--apph-border-color-dark);
}

.apph-records-filter-page.is-active {
  border-color: var(--apph-color-primary);
  border-width: 3px;
  padding: 0 calc(var(--apph-space-0-25x) - 2px);
}
</style>
