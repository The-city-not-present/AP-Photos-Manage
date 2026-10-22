import { ref } from 'vue'

// Global error store + reporter. Every error in the app flows through
// `reportError` so it is:
//   1. surfaced in the global error banner (one line per error), and
//   2. logged to the console so the stack trace is printed natively.
//
// `reportError` is a plain reporter: it always reports exactly the value it is
// given and never filters its input. Deciding whether a value is an error is
// the caller's job (see the Async note in .clinerules/03-javascript.md).
const errors = ref([])

export function reportError(err) {
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
