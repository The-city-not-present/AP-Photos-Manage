<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: { type: [Number, String], default: null },
})

function formatNumberOfBytes(n) {
  if (n == null || n === '') return '-'
  const num = Number(n)
  if (Number.isNaN(num)) return String(n)

  if (num < 1000) {
    return `${num} byte${num === 1 ? '' : 's'}`
  }

  const units = [
    [1000, 'KB'],
    [1000000, 'MB'],
    [1000000000, 'GB'],
    [1000000000000, 'TB'],
  ]
  let unit = units[0]
  for (const candidate of units) {
    if (candidate[0] <= num) unit = candidate
  }

  const value = Math.round((num / unit[0]) * 100) / 100
  return `${value} ${unit[1]}`
}

const text = computed(() => formatNumberOfBytes(props.size))
</script>

<template>
  <span
    class="apph-format-filesize"
    :title="size != null && size !== '' ? `${size} bytes` : ''"
    :data-value="size"
  >{{ text }}</span>
</template>
