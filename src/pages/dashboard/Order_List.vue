<template>
  <div class="min-h-screen bg-gray-100 p-3 sm:p-4 md:p-6">
    <!-- Header -->
    <h1 class="text-2xl md:text-3xl font-bold text-blue-800">
      Order Management
    </h1>

    <div
      class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6 mt-1"
    >
      <p class="text-gray-500 max-w-2xl">
        Monitor real-time transactions, track delivery progress, and manage
        customer fulfillment from a single dashboard.
      </p>

      <button
        class="w-full lg:w-auto bg-blue-800 text-white px-4 py-2 rounded flex items-center justify-center gap-2 hover:bg-blue-900 transition"
      >
        <i class="fa-solid fa-circle-plus"></i>
        Create New Order
      </button>
    </div>

    <!-- Tabs -->
    <div
      class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 border-2 border-gray-400 p-2 rounded-2xl mt-5 mb-4"
    >
      <div class="flex flex-wrap gap-1">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="activeTab = tab"
          :class="[
            'px-4 py-2 rounded-xl text-sm font-medium transition duration-200',
            activeTab === tab
              ? 'bg-blue-800 text-gray-200'
              : 'text-gray-600 hover:bg-gray-100'
          ]"
        >
          {{ tab }}
        </button>
      </div>

      <button
        class="w-full lg:w-auto text-gray-600 flex items-center justify-center gap-1 text-sm hover:text-gray-800"
      >
        <i class="fa-solid fa-sliders"></i>
        Advanced Filters
      </button>
    </div>

    <!-- Desktop Table -->
    <div
      class="hidden md:block bg-white shadow rounded-xl border-2 border-gray-300 overflow-x-auto "
    >
      <table class="min-w-225 w-full text-sm ">
        <thead class=" bg-[#dfe7fd]">
          <tr class=" border-b-2 border-gray-300 ">
            <th
              class="px-6 py-6 text-left text-[15px] font-semibold text-gray-700 uppercase tracking-wide"
            >
              Order ID
            </th>
            <th
              class="px-6 py-6 text-left text-[15px] font-semibold text-gray-700 uppercase tracking-wide"
            >
              Customer Name
            </th>
            <th
              class="px-6 py-6 text-left text-[15px]  font-semibold text-gray-700 uppercase tracking-wide"
            >
              Date/Time
            </th>
            <th
              class="px-6 py-6 text-left text-[15px]  font-semibold text-gray-700 uppercase tracking-wide"
            >
              Status
            </th>
            <th
              class="px-6 py-6 text-left text-[15px]  font-semibold text-gray-700 uppercase tracking-wide"
            >
              Total Amount
            </th>
            <th
              class="px-6 py-6 text-left text-[15px]  font-semibold text-gray-700 uppercase tracking-wide"
            >
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="order in filteredOrders"
            :key="order.id"
            class="border-b-2 border-gray-300  hover:bg-gray-50 transition"
          >
            <td class="px-6 py-3 text-blue-800 font-bold">
              {{ order.id }}
            </td>

            <td class="px-6 py-3">
              <div class="flex items-center gap-3">
                <div
                  class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
                  :class="avatarClass(order.customer)"
                >
                  {{ initials(order.customer) }}
                </div>

                <span>{{ order.customer }}</span>
              </div>
            </td>

            <td class="px-6 py-3">
              <div>{{ order.date }}</div>
              <div class="text-gray-500">{{ order.time }}</div>
            </td>

            <td class="px-6 py-3">
              <span
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                :class="statusClass(order.status)"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full"
                  :class="dotClass(order.status)"
                ></span>

                {{ order.status }}
              </span>
            </td>

            <td class="px-6 py-3 font-bold text-blue-950">
              ${{ order.total.toFixed(2) }}
            </td>

            <td class="px-6 py-3">
              <div class="flex items-center gap-3">
                <button class="text-blue-500 hover:text-blue-700">
                  <i class="fa-solid fa-pen"></i>
                </button>

                <button class="text-red-500 hover:text-red-700">
                  <i class="fa-regular fa-trash-can"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot>
    <tr class="border-t-2 border-gray-300 bg-[#dfe7fd]">
      <td colspan="6" class="px-6 py-6">
        
        <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4 text-gray-500 text-sm">
          
          <!-- Left text -->
          <span>
            Showing 1–10 of 1,240 orders
          </span>

          <!-- Pagination -->
          <div class="flex flex-wrap items-center gap-1">
            
            <button class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100">
              <i class="fa-solid fa-chevron-left text-xs"></i>
            </button>

            <button
              v-for="page in visiblePages"
              :key="page"
              :class="[
                'w-8 h-8 flex items-center justify-center rounded text-sm transition',
                page === currentPage
                  ? 'bg-blue-800 text-white'
                  : 'border border-gray-300 hover:bg-gray-100 text-gray-600'
              ]"
            >
              {{ page }}
            </button>

            <span class="px-1 text-gray-400">...</span>

            <button class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100">
              124
            </button>

            <button class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100">
              <i class="fa-solid fa-chevron-right text-xs"></i>
            </button>

          </div>
        </div>

      </td>
    </tr>
  </tfoot>

      </table>
    </div>

    <!-- Mobile Cards -->
    <div class="md:hidden space-y-3">
      <div
        v-for="order in filteredOrders"
        :key="order.id"
        class="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
      >
        <div class="flex justify-between items-start gap-3">
          <div>
            <p class="font-bold text-blue-800">
              {{ order.id }}
            </p>

            <div class="flex items-center gap-2 mt-2">
              <div
                class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
                :class="avatarClass(order.customer)"
              >
                {{ initials(order.customer) }}
              </div>

              <span>{{ order.customer }}</span>
            </div>
          </div>

          <span
            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
            :class="statusClass(order.status)"
          >
            <span
              class="w-1.5 h-1.5 rounded-full"
              :class="dotClass(order.status)"
            ></span>

            {{ order.status }}
          </span>
        </div>

        <div class="grid grid-cols-2 gap-3 mt-4">
          <div>
            <p class="text-gray-500 text-xs">Date</p>
            <p>{{ order.date }}</p>
          </div>

          <div>
            <p class="text-gray-500 text-xs">Time</p>
            <p>{{ order.time }}</p>
          </div>

          <div>
            <p class="text-gray-500 text-xs">Total</p>
            <p class="font-bold text-blue-950">
              ${{ order.total.toFixed(2) }}
            </p>
          </div>

          <div>
            <p class="text-gray-500 text-xs">Actions</p>

            <div class="flex gap-3 mt-1">
              <button class="text-blue-500">
                <i class="fa-solid fa-pen"></i>
              </button>

              <button class="text-red-500">
                <i class="fa-regular fa-trash-can"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Summary Cards -->
    <div
      class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-6"
    >
      <!-- Total Sales -->
      <div
        class="bg-[#dfe7fd] p-4 rounded-xl flex items-center gap-4"
      >
        <div
          class="bg-blue-800 text-white w-11 h-11 rounded-xl flex items-center justify-center"
        >
          <i class="fa-solid fa-arrow-trend-up"></i>
        </div>

        <div>
          <h2
            class="text-xs font-semibold text-blue-800 uppercase tracking-wide"
          >
            Total Sales Today
          </h2>

          <p class="text-xl font-bold text-gray-900">
            $12,450.80
          </p>

          <span
            class="text-green-600 text-xs flex items-center gap-1"
          >
            <i class="fa-solid fa-arrow-up text-[10px]"></i>
            +14% vs yesterday
          </span>
        </div>
      </div>

      <!-- Pending Tasks -->
      <div
        class="bg-white border border-gray-200 p-4 rounded-xl flex items-center gap-4"
      >
        <div
          class="bg-gray-100 text-gray-600 w-11 h-11 rounded-xl flex items-center justify-center"
        >
          <i class="fa-solid fa-clipboard-list"></i>
        </div>

        <div>
          <h2
            class="text-xs font-semibold text-gray-500 uppercase tracking-wide"
          >
            Pending Tasks
          </h2>

          <p class="text-xl font-bold text-gray-900">
            42 Orders
          </p>

          <span
            class=" text-xs flex items-center gap-1"
          >
            Immediate action required
          </span>
        </div>
      </div>

      <!-- Store Capacity -->
      <div class="bg-gray-800 p-4 rounded-xl">
        <div
          class="flex flex-wrap items-center justify-between gap-2"
        >
          <h2
            class="text-xs font-semibold text-blue-300 uppercase tracking-wide"
          >
            Store Capacity
          </h2>

          <span
            class="bg-green-400/20 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded-full"
          >
            OPTIMAL
          </span>
        </div>

        <p class="text-xl font-bold text-white mt-2">
          82% Full
        </p>

        <div class="mt-3 w-full bg-blue-900 rounded-full h-2">
          <div
            class="bg-blue-300 h-2 rounded-full"
            style="width:82%"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const tabs = [
  'All Orders',
  'Pending',
  'Completed',
  'Cancelled'
]

const activeTab = ref('All Orders')
const currentPage = ref(1)

const visiblePages = [1, 2, 3]

const orders = [
  {
    id: '#ORD-8821',
    customer: 'Sarah Miller',
    date: 'Oct 24, 2023',
    time: '02:30 PM',
    status: 'Completed',
    total: 142.5
  },
  {
    id: '#ORD-8822',
    customer: 'James Chen',
    date: 'Oct 24, 2023',
    time: '02:45 PM',
    status: 'Pending',
    total: 89
  },
  {
    id: '#ORD-8823',
    customer: 'Emma Lawson',
    date: 'Oct 24, 2023',
    time: '03:10 PM',
    status: 'Cancelled',
    total: 54.2
  },
  {
    id: '#ORD-8824',
    customer: 'Bruce Wayne',
    date: 'Oct 24, 2023',
    time: '03:45 PM',
    status: 'Processing',
    total: 2140
  }
]

const filteredOrders = computed(() => {
  if (activeTab.value === 'All Orders') {
    return orders
  }

  return orders.filter(
    order => order.status === activeTab.value
  )
})

const initials = name =>
  name
    .split(' ')
    .map(word => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

const avatarColors = {
  'Sarah Miller': 'bg-slate-200 text-slate-700',
  'James Chen': 'bg-blue-100 text-blue-800',
  'Emma Lawson': 'bg-orange-100 text-orange-800',
  'Bruce Wayne': 'bg-blue-800 text-white'
}

const avatarClass = name =>
  avatarColors[name] ??
  'bg-gray-200 text-gray-700'

const statusClass = status =>
  ({
    Completed: 'bg-green-100 text-green-800',
    Pending: 'bg-yellow-100 text-yellow-700',
    Cancelled: 'bg-red-100 text-red-700',
    Processing: 'bg-blue-100 text-blue-700'
  }[status] ?? 'bg-gray-100 text-gray-600')

const dotClass = status =>
  ({
    Completed: 'bg-green-500',
    Pending: 'bg-yellow-500',
    Cancelled: 'bg-red-500',
    Processing: 'bg-blue-500'
  }[status] ?? 'bg-gray-400')
</script>