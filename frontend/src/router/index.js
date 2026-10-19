import { createRouter, createWebHistory } from 'vue-router'

import OuterLayout from '../views/OuterLayout.vue'
import WelcomeView from '../views/WelcomeView.vue'
import ImportView from '../views/ImportView.vue'
import HelpView from '../views/HelpView.vue'
import NotFoundView from '../views/NotFoundView.vue'

import ProjectApp from '../app/ProjectApp.vue'
import OverviewView from '../app/views/OverviewView.vue'
import CatalogView from '../app/views/CatalogView.vue'

// Two areas share one router:
//   - the "outer" area (/) — pick/import projects, before anything is loaded
//   - the "app" area (/project/:projectId) — the encapsulated, loaded project
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: OuterLayout,
      children: [
        { path: '', name: 'welcome', component: WelcomeView },
        { path: 'import', name: 'import', component: ImportView },
        { path: 'help', name: 'help', component: HelpView },
      ],
    },
    {
      path: '/project/:projectId',
      component: ProjectApp,
      props: true,
      children: [
        {
          path: '',
          redirect: (to) => ({ name: 'project-overview', params: to.params }),
        },
        {
          path: 'overview',
          name: 'project-overview',
          component: OverviewView,
          props: true,
        },
        {
          path: 'catalog',
          name: 'project-catalog',
          component: CatalogView,
          props: true,
        },
      ],
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
  ],
})

export default router
