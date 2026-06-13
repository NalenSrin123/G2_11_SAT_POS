<template>
  <div class="min-h-screen bg-[#f8fafc] flex font-sans antialiased text-[#334155]">
    
    <aside class="w-64 bg-white border-r border-[#e2e8f0] flex flex-col p-4 shrink-0">
      <div class="flex items-center gap-3 mb-8 px-2">
        <div class="bg-[#0f4c81] text-white rounded-lg w-10 h-10 flex items-center justify-center shadow-sm">
          <i class="bi bi-utensils-fill text-lg"></i>
        </div>
        <div>
          <h6 class="font-bold text-sm text-[#1e293b] tracking-tight">RestoAdmin</h6>
          <span class="text-[#64748b] block text-[11px] font-medium uppercase tracking-wider">Management Suite</span>
        </div>
      </div>

      <nav class="flex-1 space-y-1">
        <a v-for="item in menuItems" :key="item.name" href="#"
           class="flex items-center gap-3.5 py-2.5 px-4 rounded-lg text-sm font-medium transition-colors group relative"
           :class="item.active 
             ? 'bg-[#f0f7ff] text-[#0f4c81] font-semibold after:absolute after:right-0 after:top-0 after:bottom-0 after:w-1 after:bg-[#0f4c81] after:rounded-l' 
             : 'text-[#64748b] hover:bg-[#f8fafc] hover:text-[#1e293b]'">
          <i :class="['bi', item.icon, 'text-lg', item.active ? 'text-[#0f4c81]' : 'text-[#94a3b8] group-hover:text-[#64748b]']"></i>
          <span>{{ item.name }}</span>
        </a>
      </nav>
    </aside>

    <main class="flex-1 p-8 lg:p-10 max-w-7xl mx-auto w-full">
      
      <header class="flex justify-between items-center mb-8">
        <div class="relative w-80">
          <i class="bi bi-search absolute top-1/2 left-4 -translate-y-1/2 text-[#94a3b8] text-sm"></i>
          <input type="text" 
                 class="w-full pl-11 pr-4 py-2 bg-white border border-[#e2e8f0] rounded-xl text-sm text-[#64748b] placeholder-[#94a3b8] focus:outline-none focus:border-[#0f4c81] focus:ring-1 focus:ring-[#0f4c81] transition-all shadow-sm" 
                 placeholder="Search brand assets...">
        </div>
        <div class="flex items-center gap-4">
          <button class="w-10 h-10 bg-white border border-[#e2e8f0] rounded-full flex items-center justify-center text-[#64748b] hover:text-[#1e293b] transition-colors shadow-sm relative">
            <i class="bi bi-bell"></i>
            <span class="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div class="w-10 h-10 bg-[#1e293b] rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-inner">
            <i class="bi bi-person-fill"></i>
          </div>
        </div>
      </header>

      <nav class="mb-1">
        <ol class="flex items-center gap-2 text-[11px] font-bold tracking-wider text-uppercase text-[#94a3b8]">
          <li><a href="#" class="hover:text-[#64748b] transition-colors">SETTINGS</a></li>
          <li class="text-[#64748b] font-normal">/</li>
          <li class="text-[#0f4c81]">LOGO MANAGEMENT</li>
        </ol>
      </nav>
      
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 class="text-2xl font-bold text-[#1e293b] tracking-tight">Brand Identity Assets</h2>
          <p class="text-sm text-[#64748b] mt-0.5">Manage and update your restaurant's visual brand markers.</p>
        </div>
        <button class="bg-[#0f4c81] hover:bg-[#0a365c] text-white flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl shadow-sm transition-all transform active:scale-95">
          <i class="bi bi-plus-lg"></i> Add New Logo
        </button>
      </div>

      <section class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div v-for="stat in stats" :key="stat.title" class="bg-white border border-[#e2e8f0]/60 rounded-xl p-4 flex justify-between items-center shadow-sm">
          <div>
            <span class="block text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider mb-1">{{ stat.title }}</span>
            <span class="text-2xl font-bold text-[#1e293b] tracking-tight">{{ stat.value }}</span>
          </div>
          <div :class="['w-10 h-10 rounded-lg flex items-center justify-center text-xl bg-[#f8fafc]', stat.iconColor]">
            <i :class="['bi', stat.icon]"></i>
          </div>
        </div>
      </section>

      <section class="bg-white border border-[#e2e8f0] rounded-xl shadow-sm overflow-hidden mb-6">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr class="bg-[#f8fafc] border-b border-[#e2e8f0] text-[11px] font-bold tracking-wider text-[#64748b] uppercase">
                <th class="pl-6 py-3.5 w-24">Logo Preview</th>
                <th class="py-3.5 px-4">Name</th>
                <th class="py-3.5 px-4 w-28">Type</th>
                <th class="py-3.5 px-4 w-32">Dimensions</th>
                <th class="py-3.5 px-4 w-24">Format</th>
                <th class="py-3.5 px-4 w-24">Priority</th>
                <th class="py-3.5 pr-6 text-right w-24">Actions</th>
              </tr>
            </thead>
            <tbody class="text-sm divide-y divide-[#f1f5f9]">
              <tr v-for="asset in assets" :key="asset.id" class="hover:bg-[#f8fafc]/50 transition-colors">
                <td class="pl-6 py-4">
                  <div class="w-16 h-11 border border-[#e2e8f0] rounded-lg flex items-center justify-center overflow-hidden bg-[#f1f5f9]">
                    <div :class="['w-full h-full flex items-center justify-center', asset.bgType]">
                      <i class="bi bi-image text-[#94a3b8] opacity-60 text-base"></i>
                    </div>
                  </div>
                </td>
                <td class="py-4 px-4 font-semibold text-[#1e293b] max-w-[200px] break-words whitespace-normal">{{ asset.name }}</td>
                <td class="py-4 px-4">
                  <span :class="['inline-block text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md', getBadgeClass(asset.type)]">
                    {{ asset.type }}
                  </span>
                </td>
                <td class="py-4 px-4 text-[#64748b] font-medium">{{ asset.dimensions }}</td>
                <td class="py-4 px-4 text-[#475569] font-semibold">{{ asset.format }}</td>
                <td class="py-4 px-4">
                  <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: getPriorityColor(asset.priority) }"></span>
                    <span class="text-[#64748b] font-bold text-xs">#{{ asset.priority }}</span>
                  </div>
                </td>
                <td class="py-4 pr-6 text-right">
                  <div class="flex justify-end gap-1.5">
                    <button class="w-8 h-8 rounded-md flex items-center justify-center text-[#94a3b8] hover:text-[#0f4c81] hover:bg-[#f0f7ff] transition-colors">
                      <i class="bi bi-pencil-fill text-xs"></i>
                    </button>
                    <button class="w-8 h-8 rounded-md flex items-center justify-center text-[#94a3b8] hover:text-red-600 hover:bg-red-50 transition-colors">
                      <i class="bi bi-trash3-fill text-xs"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex justify-between items-center px-6 py-4 border-t border-[#e2e8f0] bg-white text-xs font-medium text-[#64748b]">
          <span>Showing 1-3 of 12 assets</span>
          <nav class="flex gap-1">
            <button class="w-8 h-8 rounded-lg flex items-center justify-center border border-transparent text-[#cbd5e1] cursor-not-allowed" disabled>
              <i class="bi bi-chevron-left text-xs"></i>
            </button>
            <button class="w-8 h-8 rounded-lg flex items-center justify-center bg-[#0f4c81] text-white font-semibold shadow-sm">1</button>
            <button class="w-8 h-8 rounded-lg flex items-center justify-center border border-transparent hover:border-[#e2e8f0] hover:bg-[#f8fafc] text-[#64748b] transition-colors">2</button>
            <button class="w-8 h-8 rounded-lg flex items-center justify-center border border-transparent hover:border-[#e2e8f0] hover:bg-[#f8fafc] text-[#64748b] transition-colors">3</button>
            <button class="w-8 h-8 rounded-lg flex items-center justify-center border border-transparent hover:border-[#e2e8f0] hover:bg-[#f8fafc] text-[#64748b] transition-colors">
              <i class="bi bi-chevron-right text-xs"></i>
            </button>
          </nav>
        </div>
      </section>

      <section class="bg-[#f0f6ff] border border-[#dbeafe] rounded-xl p-5">
        <div class="flex gap-4 items-start">
          <div class="bg-[#0f4c81] text-white rounded-lg w-9 h-9 flex items-center justify-center shrink-0 shadow-sm">
            <i class="bi bi-info-circle-fill text-base"></i>
          </div>
          <div>
            <h6 class="font-bold text-[#0f4c81] text-sm mb-0.5">Asset Requirements</h6>
            <p class="text-[#475569] text-xs leading-relaxed max-w-3xl">
              For optimal rendering across digital and print collateral, please ensure primary logos are uploaded as 
              <strong class="text-[#1e293b] font-semibold">SVG files</strong>. Primary logos should have a minimum clear space of 20px around all edges. 
              Favicons must be square and legible at 16×16px.
            </p>
          </div>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const menuItems = ref([
  { name: 'Overview', icon: 'bi-grid-1x2', active: false },
  { name: 'Menu', icon: 'bi-egg-fried', active: false },
  { name: 'Categories', icon: 'bi-tags', active: false },
  { name: 'Users', icon: 'bi-people', active: false },
  { name: 'Inventory', icon: 'bi-box-seam', active: false },
  { name: 'Ingredients', icon: 'bi-clipboard-data', active: false },
  { name: 'Units', icon: 'bi-moisture', active: false },
  { name: 'Settings', icon: 'bi-gear', active: true },
]);

const stats = ref([
  { title: 'Total Assets', value: '12', icon: 'bi-image', iconColor: 'text-[#0f4c81]' },
  { title: 'Primary Active', value: '1', icon: 'bi-check-circle-fill', iconColor: 'text-emerald-600' },
  { title: 'Storage Used', value: '4.2 MB', icon: 'bi-cloud-fill', iconColor: 'text-amber-500' },
  { title: 'Recent Update', value: '2h ago', icon: 'bi-clock-history', iconColor: 'text-sky-500' },
]);

const assets = ref([
  { id: 1, name: 'Main Brand Horizontal', type: 'primary', dimensions: '1200 × 400 px', format: 'SVG', priority: 1, bgType: 'bg-white' },
  { id: 2, name: 'Favicon Icon Only', type: 'favicon', dimensions: '64 × 64 px', format: 'PNG', priority: 2, bgType: 'bg-sky-50' },
  { id: 3, name: 'Main Logo (White)', type: 'secondary', dimensions: '800 × 300 px', format: 'WEBP', priority: 3, bgType: 'bg-[#1e293b]' },
]);

const getBadgeClass = (type) => {
  switch (type) {
    case 'primary': return 'bg-[#f0f7ff] text-[#0f4c81] border border-[#dbeafe]';
    case 'secondary': return 'bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]';
    case 'favicon': return 'bg-[#f5f3ff] text-[#6b46c1] border border-[#ede9fe]';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const getPriorityColor = (priority) => {
  if (priority === 1) return '#0f4c81';
  if (priority === 2) return '#94a3b8';
  return '#cbd5e1';
};
</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css");
</style>