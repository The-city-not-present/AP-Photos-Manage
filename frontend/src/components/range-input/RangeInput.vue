<script setup>
import { computed, nextTick, ref } from 'vue'

const props = defineProps({
  kind: { type: String, default: 'number' }, // 'number' | 'date' | 'datetime'
  modelValue: { type: [Object, String, Number], default: null },
  name: { type: String, default: undefined },
  placeholder: { type: String, default: 'from..to' },
})

const emit = defineEmits(['update:modelValue', 'change'])

const anchorEl = ref(null)
const fromEl = ref(null)
const toEl = ref(null)
const open = ref(false)
const draft = ref({ from: null, to: null })
const popupStyle = ref({})

const nativeType = computed(() => {
  if (props.kind === 'date') return 'date'
  if (props.kind === 'datetime') return 'datetime-local'
  return 'number'
})

function toInputValue(value) {
  if (value == null || value === '') return ''
  if (typeof value === 'object') {
    const from = value.from ?? ''
    const to = value.to ?? ''
    if (from === '' && to === '') return ''
    return `${from}..${to}`
  }
  return String(value)
}

const displayValue = computed(() => toInputValue(props.modelValue))

function hasValue(value) {
  if (typeof value === 'number') return true
  return value != null && !/^\s*$/.test(String(value))
}

function normalizeValue(value) {
  if (!hasValue(value)) return null
  if (props.kind === 'number') {
    const n = Number(value)
    return Number.isNaN(n) ? null : n
  }
  return value
}

function positionPopup() {
  const rect = anchorEl.value?.getBoundingClientRect()
  if (!rect) return
  const width = 360
  const height = 200
  const margin = 8
  let left = rect.left
  let top = rect.bottom + 4
  if (left + width > window.innerWidth - margin) left = window.innerWidth - margin - width
  if (left < margin) left = margin
  if (top + height > window.innerHeight - margin) top = Math.max(margin, rect.top - height - 4)
  popupStyle.value = { left: `${left}px`, top: `${top}px` }
}

function openPicker() {
  draft.value = {
    from: props.modelValue?.from ?? null,
    to: props.modelValue?.to ?? null,
  }
  positionPopup()
  open.value = true
  nextTick(() => {
    if (hasValue(draft.value.from)) toEl.value?.focus()
    else fromEl.value?.focus()
  })
}

function select() {
  const from = normalizeValue(draft.value.from)
  const to = normalizeValue(draft.value.to)
  const value = from == null && to == null ? null : { from, to }
  emit('update:modelValue', value)
  emit('change', value)
  open.value = false
}

function cancel() {
  open.value = false
}
</script>

<template>
  <div ref="anchorEl" class="apph-range-input">
    <input
      class="apph-form-control apph-range-input-field"
      type="text"
      readonly
      :name="name"
      :value="displayValue"
      :placeholder="placeholder"
      @click="openPicker"
    />

    <Teleport to="body">
      <div v-if="open" class="apph-range-popup-backdrop" />
      <div v-if="open" class="apph-range-popup" :style="popupStyle">
        <form class="apph-range-popup-form" novalidate @submit.prevent="select">
          <fieldset class="apph-range-popup-row">
            <label>
              <span>From</span>
              <input v-model="draft.from" name="from" :type="nativeType" class="apph-form-control" ref="fromEl" />
            </label>
            <label>
              <span>to</span>
              <input v-model="draft.to" name="to" :type="nativeType" class="apph-form-control" ref="toEl" />
            </label>
          </fieldset>
          <fieldset class="apph-range-popup-actions">
            <button type="submit" class="apph-btn apph-btn-primary">Select</button>
            <button type="button" class="apph-btn" @click="cancel">Cancel</button>
          </fieldset>
        </form>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.apph-range-input {
  display: inline-block;
}

.apph-range-input-field {
  width: 180px;
  cursor: pointer;
}

.apph-range-popup-backdrop {
  position: fixed;
  z-index: 1000;
  inset: 0;
  background: rgba(223, 223, 223, 0.4);
}

.apph-range-popup {
  position: fixed;
  z-index: 1001;
  background: var(--apph-color-surface);
  border: none;
  border-radius: 14px;
  padding: var(--apph-space-0-5x);
  box-shadow: 0 0 20px rgba(127, 127, 127, 0.25);
  min-width: 340px;
  max-width: calc(100vw - 32px);
}

.apph-range-popup-form {
  display: flex;
  flex-direction: column;
  gap: var(--apph-space-0-5x);
}

.apph-range-popup-row {
  display: flex;
  gap: var(--apph-space-0-5x);
  margin: 0;
  padding: 0;
  border: none;
}

.apph-range-popup-row label {
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: var(--apph-space-0-125x);
  font-size: 0.85rem;
}

.apph-range-popup-row input {
  width: 100%;
}

.apph-range-popup-actions {
  display: flex;
  gap: var(--apph-space-0-25x);
  margin: 0;
  padding: var(--apph-space-0-25x) 0 0;
  border: none;
}

.apph-range-popup-actions .apph-btn {
  flex: 1 1 0;
}
</style>
