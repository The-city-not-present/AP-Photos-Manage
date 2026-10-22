import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import RangeInput from './components/range-input/RangeInput.vue'
import FormatDateTime from './components/format/FormatDateTime.vue'
import FormatFileSize from './components/format/FormatFileSize.vue'
import { reportError } from './services/errors.js'
import 'normalize.css'
import './assets/common.css'

const app = createApp(App)

app.config.errorHandler = (err) => {
  reportError(err)
}

// Last-resort handlers so errors from timers, event handlers and unhandled
// promise rejections still reach the banner and the console. `reportError`
// reports everything it is given, so these forward the caught value as-is.
window.addEventListener('error', (event) => {
  event.preventDefault()
  reportError(event.error ?? new Error(event.message))
})

window.addEventListener('unhandledrejection', (event) => {
  event.preventDefault()
  reportError(event.reason)
})

// Common components, registered globally so they are available in any template.
app.component('apph-range-input', RangeInput)
app.component('apph-format-datetime', FormatDateTime)
app.component('apph-format-filesize', FormatFileSize)

app.use(router).mount('#app')
