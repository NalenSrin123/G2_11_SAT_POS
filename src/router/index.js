import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '@/pages/dashboard/Dashboard.vue'
import Login from '@/pages/auth/Login.vue'
import Register from '@/pages/auth/Register.vue'
import Preview from '@/pages/preview/Preview.vue'
import Home from '@/pages/home/Home.vue'
import NotFound from '@/pages/NotFound.vue'
import Configuration from '@/pages/dashboard/Configuration.vue'
import ExploreCategory from '@/Home/home/ExploreCategory.vue'


const routes = [
  { path: '/', redirect: '/preview' },

  { path: '/preview', component: Preview },
  { path: '/dashboard', component: Dashboard },

 
  { path: '/configuration', component: Configuration },
  { path: '/exploreCategory', component: ExploreCategory },

  

  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/home', component: Home },

  { path: '/:pathMatch(.*)*', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router