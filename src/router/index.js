import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '@/pages/dashboard/Dashboard.vue'
import Login from '@/pages/auth/Login.vue'
import Register from '@/pages/auth/Register.vue'
import Preview from '@/pages/preview/Preview.vue'
import Home from '@/pages/home/Home.vue'
import NotFound from '@/pages/NotFound.vue'
import Configuration from '@/pages/dashboard/Configuration.vue'
import ListLogo from '../pages/dashboard/ListLogo.vue'
import unitlish from '@/pages/dashboard/unitlish.vue'
import Confirm_OTP from '@/pages/auth/Confirm_OTP.vue'
import New_Dashboard from '@/pages/dashboard/New_Dashboard.vue'
import Order_List from '../pages/dashboard/Order_List.vue'

/**
 * Route definitions
 * Each route maps a URL path to a specific page component
 */
const routes = [
  { path: '/', redirect: '/preview' },

  { path: '/preview', component: Preview },
  { path: '/dashboard', component: Dashboard },
  { path: '/listlogo', component: Listlogo },

 
  { path: '/configuration', component: Configuration },
  {path: '/order_list', component: Order_List},

  { path: '/login', component: Login },
  {path: '/confirm_otp',component:Confirm_OTP},
  { path: '/register', component: Register },
  { path: '/home', component: Home },

  { path: '/:pathMatch(.*)*', component: NotFound },
  { path: '/Unitlish', component: Unitlish },
  { path: '/newdashboard', component: New_Dashboard }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router