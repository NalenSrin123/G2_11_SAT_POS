import { createRouter, createWebHistory } from 'vue-router'

// Auth Pages
import Login from '@/pages/auth/Login.vue'
import Register from '@/pages/auth/Register.vue'
import Confirm_OTP from '@/pages/auth/Confirm_OTP.vue'
import ResetPassword from '@/pages/auth/ResetPassword.vue'

// Dashboard Pages
import New_Dashboard from '@/pages/dashboard/New_Dashboard.vue'
import Listlogo from '@/pages/dashboard/ListLogo.vue'
import Configuration from '@/pages/dashboard/Configuration.vue'
import Order_List from '@/pages/dashboard/Order_List.vue'
import Create_Logo from '@/pages/dashboard/Create_Logo.vue'
import Unitlish from '@/pages/dashboard/Unitlish.vue'
import CategoryList from '@/pages/dashboard/CategoryList.vue'
import Overview_Page from '@/pages/dashboard/Overview_Page.vue'
import UserList from '@/pages/dashboard/UserList.vue'
import CreateUnit from '@/pages/dashboard/CreateUnit.vue'
import CreateMenu from '@/pages/dashboard/CreateMenu.vue'
import CreateCategory from '@/pages/dashboard/CreateCategory.vue'

// Home Pages
import Home from '@/pages/home/Home.vue'
import Trending from '@/pages/home/home/Trending.vue'
import ExploreCategory from '../pages/home/home/ExploreCategory.vue'
import OrderSummary from '../pages/order/OrderSummary.vue'

// Public Site Pages
import Preview from '@/pages/preview/Preview.vue'
import Design_product_detail from '@/pages/public-site/Design_product_detail.vue'
import MenuView from '@/pages/public-site/MenuView.vue'

// Cashier Pages
import Cashier from '@/pages/cashier/index.vue'
import MainTableManagement from '@/pages/cashier/MainTableManagement.vue'
import PaymentConfirmation from '../pages/cashier/PaymentConfirmation.vue'
import FrequentlyBoughtTogether from '../components/ui/FrequentlyBoughtTogether.vue'

// Kitchen Pages (ផ្លូវដែលកំពុងមានបញ្ហា)
import KitchenLayout from '@/pages/kitchen/index.vue' // Import ទំព័រមេដែលមាន Sidebar
import NewOrders from '@/pages/kitchen/NewOrders.vue'
import Completed from '../pages/kitchen/Completed.vue'
import SidebarTable from '@/pages/cashier/SidebarTable.vue'



import OrderSummary from '../pages/order/OrderSummary.vue'
import Menu_List from '@/pages/dashboard/Menu_List.vue'
import DesignProductDetail from '@/pages/public-site/DesignProductDetail.vue'
import section  from '../pages/home/home/Section.vue'
import ReplaceVichka from '../pages/cashier/ReplaceVichka.vue'
import Combines from '../pages/cashier/Combines.vue'

import Header from '../pages/kitchen/Header.vue'
import ShoppingCartPage from '../pages/kitchen/ShoppingCartPage.vue'
import Design_list_product from '@/pages/kitchen/Design_list_product.vue'

// Not Found Page
import NotFound from '@/pages/NotFound.vue'
import AddFooterHeaderToProductDetail from '../pages/public-site/AddFooterHeaderToProductDetail.vue';

const routes = [
  { 
    path: '/add_footer_header_to_product_detail', 
    component: AddFooterHeaderToProductDetail 
  },

  { path: '/', redirect: '/preview' },
  { path: '/preview', component: Preview },

  { path: '/section', component: section },

  { path: '/user_list', component: UserList },

  // Dashboard
  { path: '/dashboard', component: New_Dashboard },
  { path: '/listlogo', component: Listlogo },
  { path: '/configuration', component: Configuration },
  { path: '/order_list', component: Order_List },
  { path: '/createLogo', component: Create_Logo },
  { path: '/Unitlish', component: Unitlish },
  { path: '/newdashboard', component: New_Dashboard },
  { path: '/categorylist', component: CategoryList },
  { path: '/overview_page', component: Overview_Page },
  { path: '/create_unitpage', component: CreateUnit },
  { path: '/create_menu', component: CreateMenu },
  { path: '/createcategory', component: CreateCategory },

  // Auth
  { path: '/login', component: Login },
  { path: '/confirm_otp', component: Confirm_OTP },
  { path: '/register', component: Register },
  { path: '/resetpassword', component: ResetPassword },
  { path: '/combines', component: Combines },

  // Home & Order
  { path: '/home', component: Home },
  { path: '/order', component: OrderSummary },
  { path: '/exploreCategory', component: ExploreCategory },
  { path: '/home/trending', name: 'Trending', component: Trending },
  { path: '/explore_menu', component: MenuView },

  // Cashier
  { path: '/cashier', name: 'Cashier', component: Cashier },
  { path: '/maintablemanagement', component: MainTableManagement },
  { path: '/paymentconfirm', component: PaymentConfirmation },
  { path: '/ordersummary', component: ReplaceVichka },
  { path: '/frequently_bought_together', component: FrequentlyBoughtTogether },
  {path: '/Design_List_Product' , component: Design_list_product},
  {path:'/completed',component:Completed},
  { path: '/cashier', name: 'Cashier', component: Cashier },

  
  {path: '/menu_list', component : Menu_List},
  {path: '/DesignProductDetail',component:DesignProductDetail},
  { path: '/header', name: 'header', component: Header },
  { path: '/ShoppingCartPage', name: 'ShoppingCartPage', component: ShoppingCartPage },
  {path: '/sidebartable', component: SidebarTable},
  { path: '/Design_product_detail', component: Design_product_detail },

  // ==========================================
  // 🛠️ រៀបចំក្រុមផ្លូវរបស់ KITCHEN ឡើងវិញ (Nested Routes)
  // ==========================================
  { 
    path: '/kitchen', 
    component: KitchenLayout, // ហៅទំព័រ index.vue ដែលមានដោត Sidebar
    children: [
      { path: 'new-orders', component: NewOrders },      // URL: /kitchen/new-orders
      { path: 'completed', component: Completed },        // URL: /kitchen/completed
      { path: 'cooking', component: Design_list_product } // URL: /kitchen/cooking (បើសិនជាចង់ដាក់)
    ]
  },

  // 404 Not Found (ទុកខាងក្រោមគេបង្អស់ជានិច្ច)
  { path: '/:pathMatch(.*)*', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router