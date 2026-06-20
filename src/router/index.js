/*
|--------------------------------------------------------------------------
| File: router/index.js
|--------------------------------------------------------------------------
|
| Description:
| Defines the application routes and navigation behavior using Vue Router.
|
*/

import { createRouter, createWebHistory } from 'vue-router'

// Dashboard Pages
import Dashboard from '@/pages/dashboard/Dashboard.vue'
import Create_Logo from '@/pages/dashboard/Create_Logo.vue'
import Configuration from '@/pages/dashboard/Configuration.vue'
import Listlogo from '@/pages/dashboard/ListLogo.vue'
import Unitlish from '@/pages/dashboard/Unitlish.vue'
import New_Dashboard from '@/pages/dashboard/New_Dashboard.vue'
import Order_List from '@/pages/dashboard/Order_List.vue'
import CategoryList from '@/pages/dashboard/CategoryList.vue'
import Overview_Page from '@/pages/dashboard/Overview_Page.vue'
import UserList from '@/pages/dashboard/UserList.vue'
import CreateUnit from '@/pages/dashboard/CreateUnit.vue'
import CreateMenu from '@/pages/dashboard/CreateMenu.vue'

// Auth Pages
import Login from '@/pages/auth/Login.vue'
import Register from '@/pages/auth/Register.vue'
import Confirm_OTP from '@/pages/auth/Confirm_OTP.vue'
import ResetPassword from '@/pages/auth/ResetPassword.vue'

// Other Pages
import Preview from '@/pages/preview/Preview.vue'
import Home from '@/pages/home/Home.vue'
import NotFound from '@/pages/NotFound.vue'
import NewOrders from '@/pages/kitchen/NewOrders.vue'

const routes = [
  // Default
  { path: '/', redirect: '/preview' },

  // Preview
  { path: '/preview', component: Preview },

  // Authentication
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/confirm_otp', component: Confirm_OTP },
  { path: '/resetpassword', component: ResetPassword },

  // Home
  { path: '/home', component: Home },

  // Dashboard
  { path: '/dashboard', component: Dashboard },
  { path: '/newdashboard', component: New_Dashboard },

  // Logo
  { path: '/listlogo', component: Listlogo },
  { path: '/createLogo', component: Create_Logo },

  // Configuration
  { path: '/configuration', component: Configuration },

  // Orders
  { path: '/order_list', component: Order_List },
  { path: '/neworders', component: NewOrders },

  // Category
  { path: '/categorylist', component: CategoryList },

  // User
  { path: '/user_list', component: UserList },

  // Unit
  { path: '/Unitlish', component: Unitlish },
  { path: '/create_unitpage', component: CreateUnit },

  // Menu
  { path: '/create_menu', component: CreateMenu },

  // Overview
  { path: '/overview_page', component: Overview_Page },

  // 404
  { path: '/:pathMatch(.*)*', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router