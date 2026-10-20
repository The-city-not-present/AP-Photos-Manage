import { ref } from 'vue'

// Global error store + reporter. Every error in the app flows through
// `reportError` so it is:
//   1. surfaced in the global error banner (one line per error), and
//   2. logged to the console so the stack trace is printed natively.
//
// Non-Error values (e.g. a rejected promise used as a "cancel" signal) are
// ignored on purpose — they are not real errors.
const errors = ref([])

export function reportError(err) {
  if (!(err instanceof Error)) return
  errors.value.push(err)
  console.error(err)
}

export function clearErrors() {
  errors.value = []
}

// Shared reactive list for the error banner. Returned by reference so the
// component stays bound to the singleton.
export function useErrors() {
  return errors
}
