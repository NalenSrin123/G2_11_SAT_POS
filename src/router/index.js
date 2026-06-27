/*
|--------------------------------------------------------------------------
| File: router/index.js
|--------------------------------------------------------------------------
|
| Description:
| Defines the application routes and navigation behavior using Vue Router.
|
| Responsibilities:
| - Map URL paths to page components
| - Configure default entry route
| - Organize public and feature routes
|
| Notes:
| - The root path ("/") currently redirects to "/preview" for demo purposes
| - Update the root route to Home when moving to production
|
*/

import { createRouter, createWebHistory } from 'vue-router'

// Page components
import Dashboard from '@/pages/auth/Dashboard.vue'
import Login from '@/pages/auth/Login.vue'
import Register from '@/pages/auth/Register.vue'
import Preview from '@/pages/preview/Preview.vue'
import Create_Logo from '@/pages/dashboard/Create_Logo.vue'
import Home from '@/pages/home/Home.vue'
import NotFound from '@/pages/NotFound.vue'
import LanguageConfig from '@/pages/dashboard/LanguageConfig.vue'
import YourOrder from '../pages/preview/components/YourOrder.vue'
import OrderDelivery from '../pages/home/checkout/OrderDelivery.vue'


/**
 * Route definitions
 * Each route maps a URL path to a specific page component
 */
const routes = [
  /**
   * Default entry route
   * Redirects "/" to "/preview" to showcase the project structure
   */
  { path: '/', redirect: '/preview' },
  { path: '/yourOrder', component: YourOrder },

  /**
   * Preview page (landing/demo screen)
   * Displays project structure and navigation examples
   */
  { path: '/preview', component: Preview },

  /**
   * Main application dashboard
   * Typically requires authentication (can add guards later)
   */
  { path: '/dashboard', component: Dashboard },
  { path: "/createLogo", component: Create_Logo },

  /**
   * Authentication routes
   */
  { path: '/login', component: Login },
  { path: '/register', component: Register },

  /**
   * Optional home route (disabled for now)
   * Uncomment when switching from preview to real landing page
   */
  // { path: '/', component: Home },
  { path: '/home', component: Home },
  { path:'/order_delivery', component: OrderDelivery},
  { path: '/dashboard/language-config', name: 'LanguageConfig', component: LanguageConfig },

  /**
   * Catch-all route
   * Displays a styled 404 page for unknown paths
   */
  { path: '/:pathMatch(.*)*', component: NotFound },

]

/**
 * Router instance configuration
 */
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
