<template>
  <div class="min-h-screen bg-slate-50 font-sans">
    <!-- MAIN -->
    <main class="max-w-5xl mx-auto px-5 md:px-10 py-10">
      <!-- Page Heading -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div>
          <h1 class="text-2xl font-bold text-slate-800 tracking-tight">Category List</h1>
          <p class="text-slate-500 text-sm mt-0.5">Manage and organize your product categories and service groups.</p>
        </div>
        <button
          @click="openAdd"
          class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-1xl shadow transition-colors shrink-0"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/>
          </svg>
          + Add New Category
        </button>
      </div>
      <!-- Table Card -->
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm mb-6 overflow-hidden">
        <!-- Toolbar -->
        <div class="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-slate-100 bg-slate-50">
          <!-- Status filter -->
          <div class="relative">
            <svg class="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h18v2.172a2 2 0 01-.586 1.414L13 14.414V21l-6-3v-3.586L3.586 7.586A2 2 0 013 6.172V4z"/>
            </svg>
            <select
              v-model="filterStatus"
              class="pl-8 pr-7 py-2 text-sm border border-slate-200 rounded-lg bg-white text-slate-600 font-medium focus:outline-none focus:ring-2 focus:ring-blue-200 appearance-none cursor-pointer"
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <!-- Sort -->
          <div class="relative">
            <svg class="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h18M6 12h12M10 17h4"/>
            </svg>
            <select
              v-model="sortKey"
              class="pl-8 pr-7 py-2 text-sm border border-slate-200 rounded-lg bg-white text-slate-600 font-medium focus:outline-none focus:ring-2 focus:ring-blue-200 appearance-none cursor-pointer"
            >
              <option value="name">Sort by Name</option>
              <option value="items">Sort by Items</option>
              <option value="status">Sort by Status</option>
            </select>
          </div>
          <!-- Count label -->
          <span class="ml-auto text-xs font-medium text-slate-400 shrink-0">
            Showing {{ pageStart }}-{{ pageEnd }} of {{ filteredCategories.length }} categories
          </span>
        </div>
        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-slate-100">
                <th class="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-400">Category Name</th>
                <th class="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-400 hidden md:table-cell">Description</th>
                <th class="px-5 py-3 text-center text-[11px] font-bold uppercase tracking-widest text-slate-400">Items</th>
                <th class="px-5 py-3 text-center text-[11px] font-bold uppercase tracking-widest text-slate-400">Status</th>
                <th class="px-5 py-3 text-center text-[11px] font-bold uppercase tracking-widest text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="cat in paginatedCategories"
                :key="cat.id"
                class="border-b border-slate-50 last:border-0 hover:bg-blue-50 transition-colors"
              >
                <!-- Name -->
                <td class="px-5 py-3.5">
                  <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <component :is="cat.icon" class="w-5 h-5 text-blue-600" />
                    </div>
                    <span class="font-semibold text-slate-800 text-sm">{{ cat.name }}</span>
                  </div>
                </td>
                <!-- Description -->
                <td class="px-5 py-3.5 hidden md:table-cell">
                  <span class="text-slate-500 text-sm line-clamp-1 max-w-xs block">{{ cat.description }}</span>
                </td>
                <!-- Items -->
                <td class="px-5 py-3.5 text-center">
                  <span class="text-slate-700 font-bold text-sm">{{ cat.items }}</span>
                </td>
                <!-- Status -->
                <td class="px-5 py-3.5 text-center">
                  <span
                    :class="cat.status === 'Active'
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'bg-red-100 text-red-600 border border-red-200'"
                    class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                  >
                    <span
                      :class="cat.status === 'Active' ? 'bg-green-500' : 'bg-red-400'"
                      class="w-1.5 h-1.5 rounded-full"
                    ></span>
                    {{ cat.status }}
                  </span>
                </td>
                <!-- Actions -->
                <td class="px-5 py-3.5 text-center">
                  <div class="flex items-center justify-center gap-1.5">
                    <button
                      @click="openEdit(cat)"
                      class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                      </svg>
                    </button>
                    <button
                      @click="deleteCategory(cat.id)"
                      class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <!-- Empty state -->
              <tr v-if="paginatedCategories.length === 0">
                <td colspan="5" class="px-5 py-14 text-center">
                  <div class="text-4xl mb-3">🔍</div>
                  <p class="text-slate-400 text-sm font-medium">No categories found.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-between px-5 py-4 border-t border-slate-100">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="flex items-center gap-1 px-4 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-500 hover:bg-slate-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Previous
          </button>
          <div class="flex items-center gap-1">
            <template v-for="p in visiblePages" :key="'page-' + p">
              <span v-if="p === '...'" class="px-1 text-slate-300 text-sm select-none">…</span>
              <button
                v-else
                @click="currentPage = p"
                :class="[
                  'min-w-[34px] h-[34px] px-2 rounded-lg text-sm font-semibold transition-colors',
                  currentPage === p
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-500 border border-slate-200 hover:bg-slate-100'
                ]"
              >
                {{ p }}
              </button>
            </template>
          </div>
          <button
            @click="nextPage"
            :disabled="currentPage >= totalPages"
            class="flex items-center gap-1 px-4 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-500 hover:bg-slate-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
            Next
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
      <!--Bottom Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <!-- Management Insights -->
        <div class="relative rounded-2xl overflow-hidden min-h-[160px] bg-slate-800 group cursor-pointer">
          <img
            src="https://i.pinimg.com/1200x/e7/3d/6f/e73d6f847384f5ad4866e1254d4d8931.jpg"
            alt="Management Insights"
            class="absolute inset-0 w-full h-full object-cover"/>
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>
          <div class="absolute bottom-0 left-0 p-5 z-20">
            <h3 class="text-white font-bold text-lg leading-tight">Management Insights</h3>
            <p class="text-slate-300 text-xs mt-1">Review category performance metrics and seasonal trends.</p>
          </div>
          <div class="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </div>
        </div>
        <!-- Smart Sorting -->
        <div class="rounded-2xl p-5 min-h-[160px] flex flex-col justify-between bg-blue-500">
          <div>
            <h3 class="text-white font-bold text-lg">Smart Sorting</h3>
            <p class="text-blue-200 text-xs mt-1 leading-relaxed">Auto-categorize items based on AI-driven tags.</p>
          </div>
          <button
            @click="smartEnabled = !smartEnabled"
            :class="smartEnabled
              ? 'bg-white text-blue-700'
              : 'bg-blue-700/60 text-white hover:bg-blue-700/80'"
            class="rounded-2 mt-3 w-fit px-4 py-2 text-xs font-bold transition-all flex items-center gap-1.5">
            <svg v-if="smartEnabled" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
            </svg>
            {{ smartEnabled ? 'Enabled' : 'Enable Feature' }}
          </button>
        </div>
      </div>
    </main>
    <!-- footer -->
    <footer class="text-center text-xs text-slate-400 py-5 border-t border-slate-200 bg-white mt-8">
      © 2024 Workspace Admin. All rights reserved. Precision Built Management.
    </footer>

    <!-- modal -->
    <Transition name="modal">
      <div
        v-if="showModal"
        class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        @click.self="showModal = false">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-7">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-slate-800">
              {{ editMode ? 'Edit Category' : 'Add New Category' }}
            </h2>
            <button
              @click="showModal = false"
              class="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-200 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="space-y-4">
            <!-- Name -->
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                Category Name <span class="text-red-400">*</span>
              </label>
              <input
                v-model="form.name"
                type="text"
                placeholder="e.g. Beverages"
                class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"/>
            </div>
            <!-- Description -->
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                Description
              </label>
              <input
                v-model="form.description"
                type="text"
                placeholder="Short description…"
                class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"/>
            </div>
            <!-- Icon & Items -->
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                  Icon (emoji)
                </label>
                <input
                  v-model="form.icon"
                  type="text"
                  placeholder="🍽️"
                  maxlength="2"
                  class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-center text-2xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"/>
              </div>
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                  Item Count
                </label>
                <input
                  v-model.number="form.items"
                  type="number"
                  min="0"
                  placeholder="0"
                  class="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"/>
              </div>
            </div>
            <!-- Status -->
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                Status
              </label>
              <div class="flex gap-2">
                <button
                  v-for="s in ['Active', 'Inactive']"
                  :key="s"
                  @click="form.status = s"
                  :class="form.status === s
                    ? (s === 'Active' ? 'bg-green-500 text-white border-green-500' : 'bg-red-500 text-white border-red-500')
                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'"
                  class="flex-1 py-2 rounded-xl text-xs font-bold border transition-all">{{ s }}
                </button>
              </div>
            </div>
          </div>
          <!-- Error -->
          <p v-if="formError" class="text-red-500 text-xs font-semibold mt-3">{{ formError }}</p>
          <!-- Buttons -->
          <div class="flex gap-3 mt-6">
            <button
              @click="showModal = false"
              class="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-500 hover:bg-slate-50 transition-colors">Cancel
            </button>
            <button
              @click="saveCategory"
              class="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow transition-colors">
              {{ editMode ? 'Save Changes' : 'Add Category' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
<script>
  import {
    UtensilsCrossed,
    Coffee,
    Cake,
    Soup,
    Salad,
    Sparkles,
    Flame,
    Croissant,
    Fish,
    Leaf,
    Pizza,
    Sandwich,
    IceCreamCone,
    Baby,
    Cookie,
    Beef,
  } from '@lucide/vue'
export default {
  name: 'CategoryList',
  components: {
    UtensilsCrossed,
    Coffee,
    Cake,
    Soup,
    Salad,
     Sparkles,
    Flame,
    Croissant,
    Fish,
    Leaf,
    Pizza,
    Sandwich,
    IceCreamCone,
    Baby,
    Cookie,
    Beef,
  },
  data() {
    return {
      filterStatus: '',
      sortKey: 'name',
      currentPage: 1,
      perPage: 8,
      smartEnabled: false,
      showModal: false,
      editMode: false,
      editId: null,
      formError: '',

      form: {
        name: '',
        description: '',
        icon: '📦',
        items: 0,
        status: 'Active',
      },
      categories: [
        { id: 1,  name: 'Appetizers',   icon: 'UtensilsCrossed', items: 12, status: 'Active' },
        { id: 2,  name: 'Beverages',    icon: 'Coffee',          items: 45, status: 'Active' },
        { id: 3,  name: 'Desserts',     icon: 'Cake',            items: 18, status: 'Inactive' },
        { id: 4,  name: 'Main Courses', icon: 'Soup',            items: 32, status: 'Active' },
        { id: 5,  name: 'Salads',       icon: 'Salad',           items: 10, status: 'Active' },
        { id: 6,  name: 'Soups',        icon: 'Soup',            items: 8,  status: 'Active' },
        { id: 7,  name: 'Sides',        icon: 'Sandwich',        items: 14, status: 'Inactive' },
        { id: 8,  name: 'Specials',     icon: 'Sparkles',        items: 5,  status: 'Active' },
        { id: 9,  name: 'Grills',       icon: 'Flame',           items: 22, status: 'Active' },
        { id: 10, name: 'Breakfast',    icon: 'Croissant',       items: 17, status: 'Active' },
        { id: 11, name: 'Snacks',       icon: 'Cookie',          items: 9,  status: 'Inactive' },
        { id: 12, name: 'Seafood',      icon: 'Fish',            items: 13, status: 'Active' },
        { id: 13, name: 'Pasta',        icon: 'UtensilsCrossed', items: 11, status: 'Active' },
        { id: 14, name: 'Vegan',        icon: 'Leaf',            items: 20, status: 'Active' },
        { id: 15, name: 'Kids Menu',    icon: 'Baby',            items: 7,  status: 'Inactive' },
        { id: 16, name: 'Bakery',       icon: 'Croissant',       items: 15, status: 'Active' },
        { id: 17, name: 'Sushi',        icon: 'Fish',            items: 24, status: 'Active' },
        { id: 18, name: 'Pizza',        icon: 'Pizza',           items: 16, status: 'Active' },
        { id: 19, name: 'Cocktails',    icon: 'Coffee',          items: 30, status: 'Inactive' },
        { id: 20, name: 'Cheese Board', icon: 'Beef',            items: 6,  status: 'Active' },
        { id: 21, name: 'Burgers',      icon: 'Sandwich',        items: 12, status: 'Active' },
        { id: 22, name: 'Dim Sum',      icon: 'UtensilsCrossed', items: 19, status: 'Active' },
        { id: 23, name: 'Ice Cream',    icon: 'IceCreamCone',    items: 8,  status: 'Active' },
        { id: 24, name: 'Wraps',        icon: 'Sandwich',        items: 10, status: 'Inactive' },
      ]
    }
  },
  computed: {
    filteredCategories() {
      let arr = this.categories.filter(c =>
        !this.filterStatus || c.status === this.filterStatus
      )
      if (this.sortKey === 'name')   arr = [...arr].sort((a, b) => a.name.localeCompare(b.name))
      if (this.sortKey === 'items')  arr = [...arr].sort((a, b) => b.items - a.items)
      if (this.sortKey === 'status') arr = [...arr].sort((a, b) => a.status.localeCompare(b.status))
      return arr
    },
    totalPages() {
      return Math.max(1, Math.ceil(this.filteredCategories.length / this.perPage))
    },
    pageStart() {
      return this.filteredCategories.length === 0 ? 0 : (this.currentPage - 1) * this.perPage + 1
    },
    pageEnd() {
      return Math.min(this.currentPage * this.perPage, this.filteredCategories.length)
    },
    paginatedCategories() {
      const start = (this.currentPage - 1) * this.perPage
      return this.filteredCategories.slice(start, start + this.perPage)
    },
    visiblePages() {
      const t = this.totalPages
      const c = this.currentPage
      if (t <= 6) return Array.from({ length: t }, (_, i) => i + 1)
      const pageSet = new Set([1, t, c, c - 1, c + 1].filter(x => x >= 1 && x <= t))
      const sorted  = [...pageSet].sort((a, b) => a - b)
      const result  = []
      for (let i = 0; i < sorted.length; i++) {
        if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push('...')
        result.push(sorted[i])
      }
      return result
    },
  },
  watch: {
    filterStatus() { this.currentPage = 1 },
    sortKey()      { this.currentPage = 1 },
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) this.currentPage--
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++
    },
    openAdd() {
      this.editMode  = false
      this.editId    = null
      this.formError = ''
      this.form      = { name: '', description: '', icon: '📦', items: 0, status: 'Active' }
      this.showModal = true
    },
    openEdit(cat) {
      this.editMode  = true
      this.editId    = cat.id
      this.formError = ''
      this.form      = { name: cat.name, description: cat.description, icon: cat.icon, items: cat.items, status: cat.status }
      this.showModal = true
    },
    saveCategory() {
      if (!this.form.name.trim()) {
        this.formError = 'Category name is required.'
        return
      }
      this.formError = ''
      if (this.editMode) {
        const idx = this.categories.findIndex(c => c.id === this.editId)
        if (idx !== -1) Object.assign(this.categories[idx], { ...this.form })
      } else {
        this.categories.push({ id: Date.now(), ...this.form })
      }
      this.showModal = false
    },
    deleteCategory(id) {
      this.categories = this.categories.filter(c => c.id !== id)
      if (this.currentPage > this.totalPages) this.currentPage = this.totalPages
    },
  },
}
</script>
<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .bg-white {
  transform: scale(0.95) translateY(8px);
}
select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  -webkit-appearance: none;
  appearance: none;
}
</style>