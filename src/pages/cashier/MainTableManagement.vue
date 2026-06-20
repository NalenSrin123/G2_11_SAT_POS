<template>
  <!-- Toast Notification -->
  <transition name="toast">
    <div
      v-if="toast.show"
      class="fixed top-4 right-4 z-50 flex items-center gap-3 bg-gray-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl"
    >
      <span>{{ toast.icon }}</span>
      <span>{{ toast.msg }}</span>
    </div>
  </transition>

  <!-- Table Detail Modal -->
  <transition name="modal">
    <div
      v-if="modal.open"
      class="fixed inset-0 z-40 flex items-center justify-center"
      @click.self="modal.open = false"
    >
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      <div class="relative bg-white rounded-2xl shadow-2xl w-80 p-6 z-10">
        <button
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-lg"
          @click="modal.open = false"
        >✕</button>
        <div class="flex items-center gap-3 mb-4">
          <div
            class="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold"
            :class="modal.table?.vip ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600'"
          >{{ modal.table?.label }}</div>
          <div>
            <div class="font-bold text-gray-800 text-sm">{{ modal.table?.name }}</div>
            <div class="text-xs text-gray-400">{{ modal.table?.section }}</div>
            <span
              class="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-bold"
              :class="{
                'bg-red-100 text-red-600': modal.table?.status === 'occupied',
                'bg-green-100 text-green-600': modal.table?.status === 'available',
                'bg-orange-100 text-orange-600': modal.table?.status === 'dirty'
              }"
            >{{ capitalize(modal.table?.status) }}</span>
          </div>
        </div>
        <div v-if="modal.table?.server" class="flex justify-between text-xs text-gray-500 mb-2">
          <span class="font-semibold text-gray-700">Server</span>
          <span>{{ modal.table.server }}</span>
        </div>
        <div v-if="modal.table?.timer" class="flex justify-between text-xs text-gray-500 mb-2">
          <span class="font-semibold text-gray-700">Seated</span>
          <span>{{ modal.table.timer }}</span>
        </div>
        <div v-if="modal.table?.price" class="flex justify-between text-xs text-gray-500 mb-4">
          <span class="font-semibold text-gray-700">Check Total</span>
          <span class="text-red-600 font-bold">${{ modal.table.price }}</span>
        </div>
        <div class="grid grid-cols-3 gap-2 mt-2">
          <button
            v-for="s in ['occupied','available','dirty']" :key="s"
            class="py-1.5 rounded-lg text-xs font-bold border transition-all"
            :class="modal.table?.status === s
              ? 'bg-red-600 text-white border-red-600'
              : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'"
            @click="cycleStatus(modal.table, s)"
          >{{ capitalize(s) }}</button>
        </div>
        <button
          class="w-full mt-3 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors"
          @click="modal.open = false"
        >Close</button>
      </div>
    </div>
  </transition>

  <!-- Main App -->
  <div class="rounded-2xl bg-gray-50 overflow-hidden max-w-4xl mx-auto my-5 shadow-xl font-sans relative">

    <!-- TOP NAV -->
    <nav class="bg-white border-b border-gray-100 px-5 py-3 flex items-center flex-wrap gap-2">
      <span class="text-red-600 font-extrabold text-base mr-4 tracking-tight whitespace-nowrap">Marketplace Terminal</span>
      <button
        v-for="tab in tabs" :key="tab"
        class="text-xs px-3 py-1 rounded border-b-2 transition-all font-medium"
        :class="activeTab === tab
          ? 'text-red-600 border-red-500 font-semibold'
          : 'text-gray-400 border-transparent hover:text-red-500'"
        @click="activeTab = tab"
      >{{ tab }}</button>
      <div class="ml-auto flex items-center gap-2">
        <div class="relative hidden sm:block">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔍</span>
          <input
            v-model="searchQuery"
            class="bg-gray-100 rounded-full pl-7 pr-3 py-1.5 text-xs text-gray-600 outline-none focus:ring-2 focus:ring-red-200 w-44 transition-all"
            placeholder="Search tables or servers…"
          />
        </div>
        <button class="relative text-gray-500 hover:text-red-600 text-base px-1 transition-colors" @click="showAlertPanel = !showAlertPanel">
          🔔
          <span v-if="alertCount > 0" class="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{{ alertCount }}</span>
        </button>
        <button class="text-gray-500 hover:text-red-600 text-base px-1 transition-colors" @click="refreshTimers">⟳</button>
      </div>
    </nav>

    <!-- ALERT PANEL -->
    <transition name="slide-down">
      <div v-if="showAlertPanel" class="bg-red-50 border-b border-red-100 px-5 py-3">
        <div class="text-xs font-bold text-red-700 mb-2 uppercase tracking-widest">Active Alerts</div>
        <div v-for="t in alertTables" :key="t.id" class="flex items-center justify-between py-1.5 border-b border-red-100 last:border-0">
          <span class="text-xs font-semibold text-gray-700">{{ t.name }}</span>
          <span class="text-xs text-red-600 font-bold">{{ t.timer }}</span>
          <button class="text-xs bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700 transition-colors" @click="resolveAlert(t)">Resolve</button>
        </div>
        <div v-if="alertTables.length === 0" class="text-xs text-gray-400 italic">No active alerts</div>
      </div>
    </transition>

    <!-- STATS BAR -->
    <div class="bg-white px-5 py-3 flex items-center flex-wrap gap-6 border-b border-gray-100">
      <div v-for="stat in stats" :key="stat.label">
        <div class="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">{{ stat.label }}</div>
        <div class="text-xl font-extrabold" :class="stat.red ? 'text-red-600' : 'text-gray-800'">{{ stat.value }}</div>
      </div>

      <!-- Capacity Bar -->
      <div class="hidden sm:block flex-1 min-w-[120px]">
        <div class="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Capacity</div>
        <div class="w-full bg-gray-100 rounded-full h-2">
          <div
            class="h-2 rounded-full transition-all duration-700"
            :class="capacityPct > 80 ? 'bg-red-500' : capacityPct > 50 ? 'bg-amber-400' : 'bg-emerald-400'"
            :style="{ width: capacityPct + '%' }"
          ></div>
        </div>
      </div>

      <div class="ml-auto flex gap-2">
        <button
          v-for="v in ['map','list']" :key="v"
          class="text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all"
          :class="view === v
            ? 'bg-white border-gray-300 text-gray-800 shadow-sm'
            : 'bg-gray-50 border-gray-200 text-gray-400 hover:bg-gray-100'"
          @click="view = v"
        >{{ v === 'map' ? '⊞ Floor Map' : '≡ List View' }}</button>
      </div>
    </div>

    <!-- ── FLOOR MAP VIEW ── -->
    <template v-if="view === 'map'">

      <!-- MAIN DINING ROOM -->
      <div class="text-[10px] font-bold tracking-[.12em] text-gray-400 uppercase px-5 pt-5 pb-2">Main Dining Room</div>
      <div class="flex flex-wrap gap-3 px-5 pb-5">
        <div
          v-for="t in filteredMainTables" :key="t.id"
          class="relative flex flex-col items-center rounded-xl border-[1.5px] cursor-pointer transition-all duration-200 pt-4 pb-2.5 px-3 min-w-[112px] flex-1 max-w-[148px]"
          :class="tableCardClass(t)"
          @click="openModal(t)"
          @mouseenter="hoveredId = t.id"
          @mouseleave="hoveredId = null"
        >
          <!-- Timer badge -->
          <span
            v-if="t.timer"
            class="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full whitespace-nowrap z-10"
            :class="t.alert ? 'bg-red-600 animate-pulse' : 'bg-gray-800'"
          >{{ t.timer }}</span>

          <!-- Top seats -->
          <div v-if="t.seats?.top" class="flex gap-1 mb-1">
            <div v-for="(s,i) in t.seats.top" :key="i"
              class="w-2.5 h-2.5 rounded-full border-2 border-white"
              :class="s === 'dim' ? 'bg-gray-300' : 'bg-red-500'"
            ></div>
          </div>

          <!-- Shape row -->
          <div class="flex items-center gap-1">
            <div v-if="t.seats?.left" class="flex flex-col gap-1">
              <div v-for="(s,i) in t.seats.left" :key="i"
                class="w-2.5 h-2.5 rounded-full border-2 border-white"
                :class="s === 'dim' ? 'bg-gray-300' : 'bg-red-500'"
              ></div>
            </div>

            <!-- Table body -->
            <div
              class="flex items-center justify-center font-bold text-lg my-1"
              :class="tableShapeClass(t)"
            >{{ t.label }}</div>

            <div v-if="t.seats?.right" class="flex flex-col gap-1">
              <div v-for="(s,i) in t.seats.right" :key="i"
                class="w-2.5 h-2.5 rounded-full border-2 border-white"
                :class="s === 'dim' ? 'bg-gray-300' : 'bg-red-500'"
              ></div>
            </div>
          </div>

          <!-- Bottom seats -->
          <div v-if="t.seats?.bottom" class="flex gap-1 mt-1">
            <div v-for="(s,i) in t.seats.bottom" :key="i"
              class="w-2.5 h-2.5 rounded-full border-2 border-white"
              :class="s === 'dim' ? 'bg-gray-300' : 'bg-red-500'"
            ></div>
          </div>

          <div class="text-[11px] font-semibold text-gray-600 mt-1.5 text-center leading-tight">{{ t.name }}</div>
          <div v-if="t.tooltip" class="text-[10px] font-semibold text-gray-800 text-center">{{ t.tooltip }}</div>
          <div v-if="t.status === 'available'" class="text-[10px] text-gray-400 text-center">Available</div>
          <div v-if="t.status === 'dirty'" class="text-[9px] font-extrabold text-red-500 uppercase tracking-wider mt-0.5">Needs Clearing</div>
          <div v-if="t.server" class="text-[10px] text-gray-400 text-center">Server: {{ t.server }}</div>
          <div v-if="t.price" class="text-[12px] font-extrabold text-red-600 mt-1">${{ t.price }}</div>

          <!-- Hover tooltip name -->
          <div
            v-if="t.tooltipName && hoveredId === t.id"
            class="absolute -bottom-2.5 left-1/2 -translate-x-1/2 translate-y-full bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-md whitespace-nowrap z-20"
          >{{ t.tooltipName }}</div>
        </div>
      </div>

      <!-- GARDEN PATIO -->
      <div class="text-[10px] font-bold tracking-[.12em] text-gray-400 uppercase px-5 pt-2 pb-2">☀ Garden Patio</div>
      <div class="flex flex-wrap gap-3 px-5 pb-5">
        <div
          v-for="t in filteredPatioTables" :key="t.id"
          class="relative flex flex-col items-center rounded-xl border-[1.5px] cursor-pointer transition-all duration-200 pt-4 pb-2.5 px-3 min-w-[112px] flex-1 max-w-[148px]"
          :class="tableCardClass(t)"
          @click="openModal(t)"
        >
          <span
            v-if="t.timer"
            class="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full whitespace-nowrap z-10"
          >{{ t.timer }}</span>
          <div class="flex items-center justify-center font-bold text-lg my-2" :class="tableShapeClass(t)">{{ t.label }}</div>
          <div class="text-[11px] font-semibold text-gray-600 text-center">{{ t.name }}</div>
          <div v-if="t.sub" class="text-[10px] text-gray-400 text-center">{{ t.sub }}</div>
          <div v-if="t.price" class="text-[12px] font-extrabold text-red-600 mt-1">${{ t.price }}</div>
        </div>
      </div>

      <!-- LEGEND -->
      <div class="flex flex-wrap gap-4 px-5 py-3 border-t border-gray-100">
        <div class="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
          <span class="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span> Occupied
        </div>
        <div class="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
          <span class="w-2.5 h-2.5 rounded-full bg-gray-400 inline-block"></span> Available
        </div>
        <div class="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
          <span class="w-2.5 h-2.5 rounded-full bg-red-200 inline-block"></span> Dirty
        </div>
        <div class="ml-auto text-[10px] text-gray-400 italic">Click any table for details & actions</div>
      </div>
    </template>

    <!--  LIST VIEW  -->
    <template v-if="view === 'list'">
      <div class="px-5 py-4 overflow-x-auto">
        <table class="w-full text-xs border-collapse">
          <thead>
            <tr class="border-b border-gray-200">
              <th
                v-for="col in listCols" :key="col.key"
                class="text-left py-2 px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-600 select-none"
                @click="sortBy(col.key)"
              >
                {{ col.label }}
                <span v-if="sort.key === col.key">{{ sort.asc ? ' ↑' : ' ↓' }}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="t in sortedFilteredTables" :key="t.id"
              class="border-b border-gray-50 hover:bg-red-50/40 cursor-pointer transition-colors"
              @click="openModal(t)"
            >
              <td class="py-2.5 px-3 font-bold text-gray-700">{{ t.name }}</td>
              <td class="py-2.5 px-3 text-gray-500">{{ t.section }}</td>
              <td class="py-2.5 px-3">
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold"
                  :class="{
                    'bg-red-100 text-red-600': t.status === 'occupied',
                    'bg-green-100 text-green-600': t.status === 'available',
                    'bg-orange-100 text-orange-600': t.status === 'dirty'
                  }"
                >{{ capitalize(t.status) }}</span>
              </td>
              <td class="py-2.5 px-3 text-gray-500">{{ t.server || '—' }}</td>
              <td class="py-2.5 px-3 text-gray-500">{{ t.timer || '—' }}</td>
              <td class="py-2.5 px-3 font-bold text-red-600">{{ t.price ? '$' + t.price : '—' }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="border-t border-gray-200 bg-gray-50">
              <td colspan="5" class="py-2 px-3 text-[10px] text-gray-400 font-semibold">Total Revenue</td>
              <td class="py-2 px-3 font-extrabold text-red-600">${{ totalRevenue }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </template>

    <!-- QUICK ACTIONS -->
    <transition name="slide-up">
      <div
        v-if="showQA"
        class="absolute bottom-4 right-4 bg-white rounded-2xl shadow-2xl p-4 w-52 z-30 border border-gray-100"
      >
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-bold text-gray-800">Quick Actions</span>
          <button class="text-gray-300 hover:text-gray-600 text-base transition-colors" @click="showQA = false">✕</button>
        </div>
        <div class="grid grid-cols-2 gap-2 mb-2">
          <button
            class="flex flex-col items-center gap-1 bg-red-50 hover:bg-red-100 border border-red-100 rounded-xl py-3 text-[10px] font-bold text-red-600 transition-colors"
            @click="doAction('Join Tables')"
          >
            <span class="text-lg">🚶</span> Join Tables
          </button>
          <button
            class="flex flex-col items-center gap-1 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-xl py-3 text-[10px] font-bold text-gray-500 transition-colors"
            @click="doAction('Transfer')"
          >
            <span class="text-lg">⇄</span> Transfer
          </button>
        </div>
        <button
          class="w-full bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-xl py-2 text-[10px] font-bold text-gray-600 transition-colors flex items-center justify-center gap-1.5"
          @click="doAction('Reservation Log')"
        >
          🪑 Reservation Log
        </button>
      </div>
    </transition>

    <!-- FAB to reopen QA -->
    <button
      v-if="!showQA"
      class="absolute bottom-4 right-4 bg-red-600 hover:bg-red-700 text-white w-10 h-10 rounded-full shadow-xl flex items-center justify-center text-lg z-30 transition-all"
      @click="showQA = true"
    >⚡</button>
  </div>
</template>
<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
export default {
  name: 'MarketplaceTerminal',
  setup() {
    //  State 
    const tabs        = ['Floor Plan', 'Staffing', 'Inventory']
    const activeTab   = ref('Floor Plan')
    const view        = ref('map')
    const showQA      = ref(true)
    const searchQuery = ref('')
    const hoveredId   = ref(null)
    const showAlertPanel = ref(false)
    const toast = ref({ show: false, msg: '', icon: '' })
    const modal = ref({ open: false, table: null })
    const sort = ref({ key: 'name', asc: true })
    const listCols = [
      { key: 'name',    label: 'Table'   },
      { key: 'section', label: 'Section' },
      { key: 'status',  label: 'Status'  },
      { key: 'server',  label: 'Server'  },
      { key: 'timer',   label: 'Time'    },
      { key: 'price',   label: 'Amount'  },
    ]
    // Data 
    const mainTables = ref([
      {
        id: 1, label: '14', name: 'Table 14', status: 'occupied',
        price: '142.50', timer: '12:45 MIN', alert: false, vip: false,
        section: 'Main Dining Room',
        seats: { top: ['a','a'], left: ['a'], right: ['a'], bottom: ['a','a'] }
      },
      {
        id: 2, label: '08', name: 'Table 08', status: 'available',
        section: 'Main Dining Room',
        seats: { top: ['dim'], left: ['dim'], right: ['dim'], bottom: ['dim'] }
      },
      {
        id: 3, label: '21', name: 'Booth 21', status: 'dirty',
        section: 'Main Dining Room'
      },
      {
        id: 4, label: 'VIP 1', name: 'VIP 1', status: 'occupied',
        price: '284.20', timer: '42:10 MIN (ALERT)', alert: true, vip: true,
        server: 'Sarah J.', tooltip: 'The Miller Party', tooltipName: 'yorn rotha',
        section: 'Main Dining Room',
        seats: { top: ['a','a'], left: ['a'], right: ['a'], bottom: ['a','a'] }
      },
      {
        id: 5, label: '15', name: 'Table 15', status: 'occupied',
        section: 'Main Dining Room',
        seats: { top: ['dim','dim'], left: ['dim'], right: ['dim'], bottom: ['dim','dim'] }
      },
    ])
    const patioTables = ref([
      { id: 6, label: 'P1', name: 'Patio 01', status: 'available', shape: 'round', sub: 'Round 4-Top', section: 'Garden Patio' },
      { id: 7, label: 'P2', name: 'Patio 02', status: 'occupied', shape: 'round', price: '54.00', timer: '05:22 MIN', section: 'Garden Patio' },
    ])
    // Live clock ticker 
    let timerInterval = null
    const tickTimers = () => {
      [...mainTables.value, ...patioTables.value].forEach(t => {
        if (t.status === 'occupied' && t.timerSecs !== undefined) {
          t.timerSecs++
          const m = String(Math.floor(t.timerSecs / 60)).padStart(2, '0')
          const s = String(t.timerSecs % 60).padStart(2, '0')
          t.timer = `${m}:${s} MIN`
          if (t.timerSecs > 40 * 60 && !t.alert) {
            t.alert = true
            showToast('⚠️', `${t.name} has been seated for over 40 minutes!`)
          }
        }
      })
    }
    const initTimerSecs = (tables) => {
      tables.forEach(t => {
        if (t.timer) {
          const match = t.timer.match(/(\d+):(\d+)/)
          if (match) t.timerSecs = parseInt(match[1]) * 60 + parseInt(match[2])
        }
      })
    }
    onMounted(() => {
      initTimerSecs(mainTables.value)
      initTimerSecs(patioTables.value)
      timerInterval = setInterval(tickTimers, 1000)
    })
    onUnmounted(() => clearInterval(timerInterval))
    //  Computed 
    const allTables = computed(() => [...mainTables.value, ...patioTables.value])
    const filterFn = (arr) => arr.filter(t => {
      const q = searchQuery.value.toLowerCase()
      return !q || t.name.toLowerCase().includes(q) || (t.server || '').toLowerCase().includes(q)
    })
    const filteredMainTables  = computed(() => filterFn(mainTables.value))
    const filteredPatioTables = computed(() => filterFn(patioTables.value))
    const allFilteredTables   = computed(() => filterFn(allTables.value))
    const sortedFilteredTables = computed(() => {
      const arr = [...allFilteredTables.value]
      return arr.sort((a, b) => {
        const av = (a[sort.value.key] || '').toString()
        const bv = (b[sort.value.key] || '').toString()
        return sort.value.asc ? av.localeCompare(bv) : bv.localeCompare(av)
      })
    })
    const totalTables   = computed(() => allTables.value.length)
    const occupiedCount = computed(() => allTables.value.filter(t => t.status === 'occupied').length)
    const capacityPct   = computed(() => Math.round(occupiedCount.value / totalTables.value * 100))
    const alertTables   = computed(() => allTables.value.filter(t => t.alert))
    const alertCount    = computed(() => alertTables.value.length)
    const totalRevenue = computed(() => {
      const sum = allTables.value.reduce((acc, t) => acc + (parseFloat(t.price) || 0), 0)
      return sum.toFixed(2)
    })
    const stats = computed(() => [
      { label: 'Total Tables', value: totalTables.value,   red: false },
      { label: 'Occupied',     value: occupiedCount.value, red: true  },
      { label: 'Capacity %',   value: capacityPct.value + '%', red: false },
    ])
    //Methods 
    const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : ''
    const showToast = (icon, msg) => {
      toast.value = { show: true, icon, msg }
      setTimeout(() => { toast.value.show = false }, 3000)
    }
    const openModal = (t) => {
      modal.value = { open: true, table: t }
    }
    const cycleStatus = (t, newStatus) => {
      if (!t) return
      t.status = newStatus
      if (newStatus === 'available') { t.timer = null; t.price = null; t.server = null; t.alert = false; t.timerSecs = undefined }
      if (newStatus === 'occupied' && !t.timerSecs) { t.timerSecs = 0 }
      showToast('✅', `${t.name} marked as ${newStatus}`)
      modal.value.open = false
    }
    const resolveAlert = (t) => {
      t.alert = false
      showToast('✅', `Alert cleared for ${t.name}`)
      if (alertTables.value.length === 0) showAlertPanel.value = false
    }
    const refreshTimers = () => {
      showToast('🔄', 'Timers refreshed')
    }
    const doAction = (action) => {
      showToast('⚡', `${action} — coming soon`)
    }
    const sortBy = (key) => {
      if (sort.value.key === key) sort.value.asc = !sort.value.asc
      else { sort.value.key = key; sort.value.asc = true }
    }
    // CSS Class Helpers 
    const tableCardClass = (t) => {
      const base = 'hover:shadow-lg'
      if (t.alert)              return base + ' border-red-500 shadow-[0_0_0_2px_rgba(192,57,43,0.2)] bg-white'
      if (t.vip)                return base + ' border-red-200 bg-gradient-to-br from-white to-red-50'
      if (t.status === 'available') return base + ' border-dashed border-gray-300 bg-gray-50'
      if (t.status === 'dirty')     return base + ' border-red-200 bg-red-50/50'
      return base + ' border-gray-200 bg-white'
    }
    const tableShapeClass = (t) => {
      const round = t.shape === 'round' ? 'rounded-full w-14 h-14' : 'rounded-xl w-16 h-12'
      if (t.vip)                    return round + ' bg-red-50 text-red-600 text-sm'
      if (t.status === 'available') return round + ' bg-gray-100 text-gray-400'
      if (t.status === 'dirty')     return round + ' bg-red-100 text-red-300'
      return round + ' bg-gray-100 text-gray-700'
    }
    return {
      tabs, activeTab, view, showQA, searchQuery, hoveredId,
      showAlertPanel, toast, modal, sort, listCols,
      mainTables, patioTables,
      filteredMainTables, filteredPatioTables,
      allFilteredTables, sortedFilteredTables,
      totalTables, occupiedCount, capacityPct,
      alertTables, alertCount, totalRevenue, stats,
      capitalize, openModal, cycleStatus,
      resolveAlert, refreshTimers, doAction, sortBy,
      tableCardClass, tableShapeClass,
    }
  }
}
</script>
<style scoped>
.font-sans { font-family: 'Inter', system-ui, sans-serif; }
/* Toast */
.toast-enter-active, .toast-leave-active { transition: all 0.3s cubic-bezier(.4,0,.2,1); }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(-12px) scale(0.95); }
/* Modal */
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
/* Slide down (alert panel) */
.slide-down-enter-active, .slide-down-leave-active { transition: all 0.25s ease; }
.slide-down-enter-from, .slide-down-leave-to { opacity: 0; transform: translateY(-8px); }
/* Slide up (QA panel) */
.slide-up-enter-active, .slide-up-leave-active { transition: all 0.25s ease; }
.slide-up-enter-from, .slide-up-leave-to { opacity: 0; transform: translateY(10px); }
</style>