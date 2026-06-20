
<script setup>
import { ref } from 'vue'
import { 
  Trash2, 
  Pen, 
  IceCreamCone, 
  Hamburger, 
  CookingPot, 
  Martini,
  SlidersHorizontal,
  Plus,
  TrendingUp,
  CheckCircle2
} from 'lucide-vue-next'
import New_Dashboard from './New_Dashboard.vue'

// Mock Data matching your interface metrics and table rows
const totalItems = ref(124)
const activeMenus = ref(86)
const avgPrice = ref(24.50)
const soldToday = ref(432)

const menuItems = ref([
  {
    id: '#MNI-9021',
    name: 'Artisan Wagyu Burger',
    category: 'Main Course',
    price: 22.0,
    status: 'Active',
    date: 'Oct 24, 2023'
  },
  {
    id: '#MNI-4432',
    name: 'Signature Old Fashioned',
    category: 'Beverages',
    price: 14.5,
    status: 'Active',
    date: 'Oct 22, 2023'
  },
  {
    id: '#MNI-1120',
    name: 'Truffle Chocolate Soufflé',
    category: 'Desserts',
    price: 12.0,
    status: 'Inactive',
    date: 'Oct 20, 2023'
  },
  {
    id: '#MNI-8871',
    name: 'Seared Sea Scallops',
    category: 'Appetizers',
    price: 18.0,
    status: 'Active',
    date: 'Oct 19, 2023'
  }
])

// Map categories to Lucide Component References dynamically
const getCategoryIcon = (category) => {
  switch (category) {
    case 'Main Course': return Hamburger
    case 'Beverages': return Martini
    case 'Desserts': return IceCreamCone
    case 'Appetizers': return CookingPot
    default: return CookingPot
  }
}
</script>

<template>
  <New_Dashboard>
  <div class="min-h-screen bg-[#f8fafc] p-8 font-sans antialiased text-slate-800">
    
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-slate-900">Menu List</h1>
        <div class="flex items-center gap-2 text-sm text-slate-500 mt-1">
          <span>Dashboard</span>
          <span>/</span>
          <span class="text-slate-800 font-medium">Menu Items</span>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button class="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
          <SlidersHorizontal class="w-4 h-4" />
          Filters
        </button>
        <button class="inline-flex items-center gap-2 bg-[#0e39a7] hover:bg-[#0b2d85] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm">
          <Plus class="w-4 h-4" />
          Add New Item
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden">
        <div>
          <p class="text-sm font-medium text-slate-500">Total Items</p>
          <h2 class="text-3xl font-bold text-slate-900 mt-2">{{ totalItems }}</h2>
        </div>
        <span class="absolute top-5 right-5 inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-green-50 text-green-700">
          +12%
        </span>
      </div>

      <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden">
        <div>
          <p class="text-sm font-medium text-slate-500">Active Menus</p>
          <h2 class="text-3xl font-bold text-slate-900 mt-2">{{ activeMenus }}</h2>
        </div>
        <CheckCircle2 class="absolute top-5 right-5 w-5 h-5 text-blue-600" />
      </div>

      <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden">
        <div>
          <p class="text-sm font-medium text-slate-500">Avg. Price</p>
          <h2 class="text-3xl font-bold text-slate-900 mt-2">${{ avgPrice.toFixed(2) }}</h2>
        </div>
        <TrendingUp class="absolute top-5 right-5 w-5 h-5 text-slate-400" />
      </div>

      <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden">
        <div>
          <p class="text-sm font-medium text-slate-500">Sold Today</p>
          <h2 class="text-3xl font-bold text-slate-900 mt-2">{{ soldToday }}</h2>
        </div>
        <span class="absolute top-5 right-5 inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold tracking-wide uppercase bg-blue-50 text-blue-700">
          Peak
        </span>
      </div>
    </div>

    <div class="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead >
            <tr class="bg-slate-50/70 border-b border-slate-100">
              <th class="p-4 pl-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Item Name</th>
              <th class="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Category</th>
              <th class="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Price</th>
              <th class="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
              <th class="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Last Edited</th>
              <th class="p-4 pr-6 text-xs font-semibold uppercase tracking-wider text-slate-500 text-center">Actions</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-slate-100">
            <tr
              v-for="item in menuItems"
              :key="item.id"
              class="hover:bg-slate-50/50 transition-colors group"
            >
              <td class="p-4 pl-6">
                <div class="flex items-center gap-4">
                  <div class="shrink-0 w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                    <component :is="getCategoryIcon(item.category)" class="w-5 h-5" />
                  </div>
                  <div>
                    <p class="font-semibold text-slate-900 group-hover:text-blue-900 transition-colors">
                      {{ item.name }}
                    </p>
                    <p class="text-xs text-slate-400 font-mono mt-0.5">
                      ID: {{ item.id }}
                    </p>
                  </div>
                </div>
              </td>

              <td class="p-4 whitespace-nowrap">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                  {{ item.category }}
                </span>
              </td>

              <td class="p-4 font-semibold text-slate-900 whitespace-nowrap">
                ${{ item.price.toFixed(2) }}
              </td>

              <td class="p-4 whitespace-nowrap">
                <span 
                  class="inline-flex items-center gap-1.5 text-sm font-medium"
                  :class="item.status === 'Active' ? 'text-emerald-600' : 'text-slate-400'"
                >
                  <span class="w-1.5 h-1.5 rounded-full fill-current" :class="item.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'"></span>
                  {{ item.status }}
                </span>
              </td>

              <td class="p-4 text-sm text-slate-500 whitespace-nowrap">
                {{ item.date }}
              </td>

              <td class="p-4 pr-6 whitespace-nowrap">
                <div class="flex items-center justify-center gap-3">
                  <button class="p-2 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition-all" title="Edit Item">
                    <Pen class="w-4 h-4 text-blue-500" />
                  </button>
                  <button class="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100 transition-all" title="Delete Item">
                    <Trash2 class="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="px-6 py-4 border-t border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-sm text-slate-500">
          Showing <span class="font-medium text-slate-800">1 to 4</span> of <span class="font-medium text-slate-800">{{ totalItems }}</span> entries
        </p>
        
        <nav class="flex items-center gap-1">
          <button class="p-2 text-slate-400 hover:text-slate-700 disabled:opacity-40" disabled>
            <span class="sr-only">Previous</span>
            &lsaquo;
          </button>
          <button class="w-8 h-8 rounded-lg bg-[#0e39a7] text-white text-sm font-medium flex items-center justify-center shadow-sm">1</button>
          <button class="w-8 h-8 rounded-lg text-slate-600 hover:bg-slate-100 text-sm font-medium flex items-center justify-center">2</button>
          <button class="w-8 h-8 rounded-lg text-slate-600 hover:bg-slate-100 text-sm font-medium flex items-center justify-center">3</button>
          <span class="px-1 text-slate-400 text-sm">...</span>
          <button class="w-8 h-8 rounded-lg text-slate-600 hover:bg-slate-100 text-sm font-medium flex items-center justify-center">31</button>
          <button class="p-2 text-slate-400 hover:text-slate-700">
            <span class="sr-only">Next</span>
            &rsaquo;
          </button>
        </nav>
      </div>
    </div>

  </div>
</New_Dashboard>
</template>