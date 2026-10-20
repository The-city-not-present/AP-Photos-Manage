import { inject, provide } from 'vue'
import { helpPage } from './help-page.js'

// Global config / content. Components consume it via useAppConfig() instead of
// importing the individual data files, so the source of the data can be changed
// (e.g. fetched from the backend) without touching the consumers.
export const appConfig = {
  helpPage,
}

const configKey = Symbol('appConfig')

export function provideAppConfig(config = appConfig) {
  provide(configKey, config)
}

export function useAppConfig() {
  return inject(configKey, appConfig)
}

