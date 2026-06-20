import { createRouter, createWebHistory } from 'vue-router'

// import Dashboard from '@/pages/dashboard/Dashboard.vue'
// import Create_Logo from '@/pages/dashboard/Create_Logo.vue'
// import Configuration from '@/pages/dashboard/Configuration.vue'
// import Listlogo from '@/pages/dashboard/ListLogo.vue'
// import Unitlish from '@/pages/dashboard/Unitlish.vue'
// import New_Dashboard from '@/pages/dashboard/New_Dashboard.vue'
// import Order_List from '@/pages/dashboard/Order_List.vue'
// import CategoryList from '@/pages/dashboard/CategoryList.vue'
// import Overview_Page from '@/pages/dashboard/Overview_Page.vue'
// import UserList from '@/pages/dashboard/UserList.vue'
// import CreateUnit from '@/pages/dashboard/CreateUnit.vue'
// import CreateMenu from '@/pages/dashboard/CreateMenu.vue'

// Auth Pages
import Login from '@/pages/auth/Login.vue'
import Register from '@/pages/auth/Register.vue'
// import Confirm_OTP from '@/pages/auth/Confirm_OTP.vue'
// import ResetPassword from '@/pages/auth/ResetPassword.vue'

// Other Pages
import Preview from '@/pages/preview/Preview.vue'
import Create_Logo from '@/pages/dashboard/Create_Logo.vue'
import Home from '@/pages/home/Home.vue'
import NotFound from '@/pages/NotFound.vue'
import Configuration from '@/pages/dashboard/Configuration.vue'
import Listlogo from '@/pages/dashboard/ListLogo.vue'
import Unitlish from '@/pages/dashboard/Unitlish.vue'
import Confirm_OTP from '@/pages/auth/Confirm_OTP.vue'
import New_Dashboard from '@/pages/dashboard/New_Dashboard.vue'
import Order_List from '@/pages/dashboard/Order_List.vue'
import CategoryList from '@/pages/dashboard/CategoryList.vue'

import Overview_Page from '@/pages/dashboard/Overview_Page.vue'
import UserList from '@/pages/dashboard/UserList.vue'
import CreateUnit from '@/pages/dashboard/CreateUnit.vue'
import CreateMenu from '@/pages/dashboard/CreateMenu.vue'
import ResetPassword from '@/pages/auth/ResetPassword.vue'
import Design_product_detail from '@/pages/public-site/Design_product_detail.vue'

import Trending from '@/pages/home/home/Trending.vue'
import MenuView from '@/pages/public-site/MenuView.vue'
import NewOrders from '@/pages/kitchen/NewOrders.vue'
import CreateCategory from '@/pages/dashboard/CreateCategory.vue'
import MainTableManagement from '@/pages/cashier/MainTableManagement.vue'
import PaymentConfirmation from '../pages/cashier/PaymentConfirmation.vue'
import FrequentlyBoughtTogether from '../components/ui/FrequentlyBoughtTogether.vue'
import Design_list_product from '@/pages/kitchen/Design_list_product.vue'
import ExploreCategory from '../pages/home/home/ExploreCategory.vue'


const routes = [
  { path: '/', redirect: '/preview' },

  { path: '/preview', component: Preview },

  { path: '/user_list', component: UserList },

  /**
   * Main application dashboard
   * Typically requires authentication (can add guards later)
   */
  { path: '/dashboard', component: New_Dashboard },
  { path: '/listlogo', component: Listlogo },

 
  { path: '/configuration', component: Configuration },
  {path: '/order_list', component: Order_List},
  { path: "/createLogo", component: Create_Logo },

  { path: '/login', component: Login },
  {path: '/confirm_otp',component:Confirm_OTP},
  { path: '/register', component: Register },
  { path: '/resetpassword', component: ResetPassword },

  // Home
  { path: '/home', component: Home },

  { path: '/:pathMatch(.*)*', component: NotFound },
  { path: '/Unitlish', component: Unitlish },
  { path: '/newdashboard', component: New_Dashboard },

  { path: '/categorylist', component: CategoryList},
  {path: '/overview_page' , component: Overview_Page},

  {path :'/create_unitpage' , component: CreateUnit },
  { path: "/create_menu", component: CreateMenu },


  {path:"/Design_product_detail",component: Design_product_detail},
  { path: '/exploreCategory', component: ExploreCategory },
  { path: '/home/trending', name: 'Trending', component: Trending },
  {path:'/explore_menu',component:MenuView },
  { path: '/neworders', component: NewOrders },
  {path:'/createcategory', component: CreateCategory},
  {path: '/maintablemanagement', component: MainTableManagement},
  { path: '/paymentconfirm', component: PaymentConfirmation },
  { path: '/frequently_bought_together', component: FrequentlyBoughtTogether },
  {path: '/Design_List_Product' , component: Design_list_product}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router