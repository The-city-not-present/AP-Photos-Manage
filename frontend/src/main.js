import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import RangeInput from './components/range-input/RangeInput.vue'
import FormatDateTime from './components/format/FormatDateTime.vue'
import FormatFileSize from './components/format/FormatFileSize.vue'
import 'normalize.css'
import './assets/common.css'

const app = createApp(App)

app.config.errorHandler = (err) => {
  console.error('[app] Unhandled error:', err)
}

// Common components, registered globally so they are available in any template.
app.component('apph-range-input', RangeInput)
app.component('apph-format-datetime', FormatDateTime)
app.component('apph-format-filesize', FormatFileSize)

app.use(router).mount('#app')
