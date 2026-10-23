<script setup>
import { computed } from 'vue'
import { toDate } from './datetime.js'

const props = defineProps({
  dt: { type: [String, Number, Date], default: null },
  dateOnly: { type: Boolean, default: false },
})

const formatter = computed(() =>
  new Intl.DateTimeFormat(
    undefined,
    props.dateOnly
      ? { year: 'numeric', month: '2-digit', day: '2-digit' }
      : {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short',
        }
  )
)

const text = computed(() => {
  const value = props.dt
  if (value == null || value === '') return ''
  const date = toDate(value)
  if (date == null) return String(value)
  return formatter.value.format(date)
})
</script>

<template>
  <span class="apph-format-datetime">{{ text }}</span>
</template>
